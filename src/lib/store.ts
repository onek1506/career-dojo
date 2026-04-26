'use client';

import { useState, useEffect, useCallback } from 'react';
// IMPORTANT: import level helpers from content-core, NOT from @/data/content.
// The latter pulls ~500 KB of track data (IB + Consulting + PE + VC) into
// every chunk that imports useStore — and useStore is used on every page.
import { getLevelForXp } from '@/data/content-core';
import {
  ReviewCard,
  sm2,
  createReviewCard,
  upsertCard,
  type Quality,
  QUALITY_GOOD,
} from './spaced-repetition';

// ============================================================
// CareerDojo Global Store — localStorage persistence
// ============================================================

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: Record<string, { score: number; bestScore: number; attempts: number }>;
xp: number;
  streak: number;
  lastActiveDate: string;
  longestStreak: number;
  lessonsCompletedToday: number;
  dailyGoal: number;
  language: 'en' | 'de';
  onboardingComplete: boolean;
  selectedLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  selectedTrack: string; // 'ib' | 'pe' | 'vc' | 'consulting'
  username: string;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  aiTutorMessages: number;
  soundEnabled: boolean;
  reviewCards: ReviewCard[];
  wrongAnswersToday: string[]; // questionIds the user got wrong today
  lastReviewDate: string; // YYYY-MM-DD of last review session
  // ===== Theme =====
  theme: 'dark' | 'light';
}

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  completedQuizzes: {},
xp: 0,
  streak: 0,
  lastActiveDate: '',
  longestStreak: 0,
  lessonsCompletedToday: 0,
  dailyGoal: 3,
  language: 'de',
  onboardingComplete: false,
  selectedLevel: null,
  selectedTrack: 'ib',
  username: '',
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  aiTutorMessages: 0,
  soundEnabled: true,
  reviewCards: [],
  wrongAnswersToday: [],
  lastReviewDate: '',
  theme: 'dark',
};

const STORAGE_KEY = 'career-dojo-progress';

function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function saveProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable
  }
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function isYesterday(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
}

export function useStore() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    const today = getToday();

    if (p.lastActiveDate === today) {
      // Same day — no changes
    } else if (isYesterday(p.lastActiveDate)) {
      p.lessonsCompletedToday = 0;
    } else if (p.lastActiveDate) {
      // Multi-day gap — streak lost
      p.streak = 0;
      p.lessonsCompletedToday = 0;
    }

    saveProgress(p);
    setProgress(p);
    setLoaded(true);
  }, []);

  const update = useCallback((partial: Partial<UserProgress>) => {
    setProgress(prev => {
      const next = { ...prev, ...partial };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, xpEarned: number) => {
    setProgress(prev => {
      const today = getToday();
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const newXp = prev.xp + (alreadyCompleted ? Math.floor(xpEarned / 2) : xpEarned);

      let newStreak = prev.streak;
      let newLongestStreak = prev.longestStreak;
      if (prev.lastActiveDate !== today) {
        newStreak = isYesterday(prev.lastActiveDate) || !prev.lastActiveDate
          ? prev.streak + 1
          : 1;
        newLongestStreak = Math.max(newLongestStreak, newStreak);
      }

      const next: UserProgress = {
        ...prev,
        completedLessons: alreadyCompleted
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId],
        xp: newXp,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
        lessonsCompletedToday: prev.lastActiveDate === today
          ? prev.lessonsCompletedToday + 1
          : 1,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const recordQuizAnswer = useCallback((correct: boolean) => {
    setProgress(prev => {
      const next: UserProgress = {
        ...prev,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        totalCorrectAnswers: prev.totalCorrectAnswers + (correct ? 1 : 0),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  /**
   * Record a graded answer for spaced-repetition scheduling.
   * Accepts either a boolean (correct/wrong from lesson quiz) or
   * a Quality rating 0-5 (from Anki-style review).
   * Upserts the ReviewCard for this questionId.
   */
  const recordAnswer = useCallback(
    (questionId: string, lessonId: string, grade: boolean | Quality) => {
      setProgress(prev => {
        const today = getToday();
        const existing = prev.reviewCards.find(c => c.questionId === questionId);

        let updatedCard: ReviewCard;
        let isCorrect: boolean;

        if (typeof grade === 'boolean') {
          // Legacy boolean grading from lesson quiz
          isCorrect = grade;
          if (existing) {
            updatedCard = sm2(existing, grade ? QUALITY_GOOD : (0 as Quality));
          } else {
            updatedCard = createReviewCard(questionId, lessonId, grade);
          }
        } else {
          // SM-2 quality rating from Anki-style review
          isCorrect = grade >= 3;
          if (existing) {
            updatedCard = sm2(existing, grade);
          } else {
            updatedCard = createReviewCard(questionId, lessonId, isCorrect);
          }
        }

        const nextCards = upsertCard(prev.reviewCards, updatedCard);

        // Track wrong answers today — reset list at day boundary
        const wrongList =
          prev.lastReviewDate === today ? prev.wrongAnswersToday : [];
        const nextWrong = isCorrect
          ? wrongList.filter(id => id !== questionId)
          : wrongList.includes(questionId)
            ? wrongList
            : [...wrongList, questionId];

        const next: UserProgress = {
          ...prev,
          reviewCards: nextCards,
          wrongAnswersToday: nextWrong,
          lastReviewDate: today,
          totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
          totalCorrectAnswers: prev.totalCorrectAnswers + (isCorrect ? 1 : 0),
        };
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  // NOTE: `trackLessonIds` / `reviewCount` / `getReviewCount` used to live here
  // but pulled the full 500 KB content bundle into every caller. They now live
  // in the `useReviewStats` hook, which only the Home and Review pages import.

  const recordQuizScore = useCallback((lessonId: string, score: number, total: number) => {
    setProgress(prev => {
      const existing = prev.completedQuizzes[lessonId];
      const pct = Math.round((score / total) * 100);
      const next: UserProgress = {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [lessonId]: {
            score: pct,
            bestScore: Math.max(existing?.bestScore ?? 0, pct),
            attempts: (existing?.attempts ?? 0) + 1,
          },
        },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS };
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  const level = getLevelForXp(progress.xp);

  return {
    progress,
    loaded,
    level,
    update,
    completeLesson,
    recordQuizAnswer,
    recordAnswer,
    recordQuizScore,
    resetProgress,
    t: (en: string, de: string) => progress.language === 'de' ? de : en,
  };
}
