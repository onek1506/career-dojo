'use client';

import { useState, useEffect, useCallback } from 'react';
import { getLevelForXp } from '@/data/content';
import {
  ReviewCard,
  calculateNextReview,
  createReviewCard,
  getDueCards,
  upsertCard,
} from './spaced-repetition';
import { rollMeme as rollMemeUtil, type Meme } from '@/data/memes';

// ============================================================
// CareerDojo Global Store — localStorage persistence
// ============================================================

// Salary by XP level — base salary at the start of each level
// Streak loss = bench time, applies temporary penalties (never below base)
export const SALARY_TABLE: Record<number, number> = {
  1: 42000,   // Praktikant
  2: 48000,   // Werkstudent
  3: 60000,   // Junior Analyst
  4: 75000,   // Analyst
  5: 90000,   // Senior Analyst
  6: 120000,  // Associate
  7: 150000,  // Senior Associate
  8: 200000,  // VP
  9: 280000,  // Director
  10: 400000, // Managing Director
};

export function getBaseSalaryForLevel(level: number): number {
  return SALARY_TABLE[level] ?? SALARY_TABLE[1];
}

export function getMaxSalaryForLevel(level: number): number {
  // Cap recovery at the next level's base (or +20% above own base for L10)
  const next = SALARY_TABLE[level + 1];
  if (next) return next - 1;
  return Math.round(SALARY_TABLE[level] * 1.2);
}

function daysBetween(fromDateStr: string, toDateStr: string): number {
  if (!fromDateStr || !toDateStr) return 0;
  const from = new Date(fromDateStr + 'T00:00:00');
  const to = new Date(toDateStr + 'T00:00:00');
  const ms = to.getTime() - from.getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: Record<string, { score: number; bestScore: number; attempts: number }>;
  completedCases: string[];
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
  // ===== Salary System =====
  currentSalary: number;     // current salary in EUR
  salaryHistory: number[];   // last 10 salary snapshots (for chart)
  benchDays: number;         // consecutive days without learning activity
  streakFreezes: number;     // available freezes (start with 1)
  // ===== Meme Collection =====
  unlockedMemes: string[];   // collected meme IDs
}

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  completedQuizzes: {},
  completedCases: [],
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
  currentSalary: 42000,
  salaryHistory: [42000],
  benchDays: 0,
  streakFreezes: 1,
  unlockedMemes: [],
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
      // Same day — no bench update
    } else if (isYesterday(p.lastActiveDate)) {
      p.lessonsCompletedToday = 0;
      p.benchDays = 0;
    } else if (p.lastActiveDate) {
      // Multi-day gap — calculate bench days
      const gap = daysBetween(p.lastActiveDate, today);
      p.benchDays = Math.max(0, gap - 1);
      p.streak = 0;
      p.lessonsCompletedToday = 0;
    } else {
      p.benchDays = 0;
    }

    // Apply salary penalty cascade based on benchDays
    const currentLevel = getLevelForXp(p.xp).level;
    const baseSalary = getBaseSalaryForLevel(currentLevel);

    if (p.benchDays === 1) {
      // Warning only — consume freeze if available, no penalty
      if (p.streakFreezes > 0) {
        p.streakFreezes -= 1;
        p.benchDays = 0; // freeze absorbs the bench day
      }
    } else if (p.benchDays === 2) {
      // -8% penalty
      p.currentSalary = Math.max(
        baseSalary,
        Math.round(p.currentSalary * 0.92),
      );
    } else if (p.benchDays === 3) {
      // -15% penalty
      p.currentSalary = Math.max(
        baseSalary,
        Math.round(p.currentSalary * 0.85),
      );
    } else if (p.benchDays >= 4) {
      // -20% performance review
      p.currentSalary = Math.max(
        baseSalary,
        Math.round(p.currentSalary * 0.8),
      );
    }

    // Make sure currentSalary is at least the base of the current level
    if (p.currentSalary < baseSalary) {
      p.currentSalary = baseSalary;
    }

    // Initialise salaryHistory if missing or empty (legacy users)
    if (!Array.isArray(p.salaryHistory) || p.salaryHistory.length === 0) {
      p.salaryHistory = [p.currentSalary];
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

      // ===== Salary recovery =====
      const newLevel = getLevelForXp(newXp).level;
      const baseSalary = getBaseSalaryForLevel(newLevel);
      const maxSalary = getMaxSalaryForLevel(newLevel);

      // First, snap salary to at least the base for the (possibly new) level
      let salary = Math.max(prev.currentSalary, baseSalary);

      // Recover +5% per learning day, but only the first lesson of the day triggers it
      const isFirstLessonToday = prev.lastActiveDate !== today;
      if (isFirstLessonToday) {
        salary = Math.min(maxSalary, Math.round(salary * 1.05));
      }

      // If user just leveled up, jump straight to the new base (if higher)
      if (newLevel > getLevelForXp(prev.xp).level) {
        salary = Math.max(salary, baseSalary);
      }

      // Keep last 10 salary snapshots
      const lastSnapshot = prev.salaryHistory[prev.salaryHistory.length - 1];
      const nextHistory =
        salary !== lastSnapshot
          ? [...prev.salaryHistory, salary].slice(-10)
          : prev.salaryHistory;

      // Earn a streakFreeze every 7-day streak milestone (max 3)
      let freezes = prev.streakFreezes;
      if (newStreak > prev.streak && newStreak % 7 === 0 && freezes < 3) {
        freezes += 1;
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
        currentSalary: salary,
        salaryHistory: nextHistory,
        benchDays: 0,
        streakFreezes: freezes,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeCase = useCallback((caseId: string, xpEarned: number) => {
    setProgress(prev => {
      const alreadyDone = prev.completedCases.includes(caseId);
      const next: UserProgress = {
        ...prev,
        completedCases: alreadyDone ? prev.completedCases : [...prev.completedCases, caseId],
        xp: prev.xp + (alreadyDone ? Math.floor(xpEarned / 2) : xpEarned),
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
   * Upserts the ReviewCard for this questionId and tracks
   * wrong answers for the day.
   */
  const recordAnswer = useCallback(
    (questionId: string, lessonId: string, correct: boolean) => {
      setProgress(prev => {
        const today = getToday();
        const existing = prev.reviewCards.find(c => c.questionId === questionId);
        const updatedCard = existing
          ? calculateNextReview(existing, correct)
          : createReviewCard(questionId, lessonId, correct);
        const nextCards = upsertCard(prev.reviewCards, updatedCard);

        // Track wrong answers today — reset list at day boundary
        const wrongList =
          prev.lastReviewDate === today ? prev.wrongAnswersToday : [];
        const nextWrong = correct
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
          totalCorrectAnswers: prev.totalCorrectAnswers + (correct ? 1 : 0),
        };
        saveProgress(next);
        return next;
      });
    },
    [],
  );

  /** Count of review cards that are due right now. */
  const reviewCount = getDueCards(progress.reviewCards).length;
  const getReviewCount = useCallback(
    () => getDueCards(progress.reviewCards).length,
    [progress.reviewCards],
  );

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

  /**
   * Roll a meme for the given track. Uses the current unlocked list,
   * persists the unlock if a meme is rolled, and returns the rolled
   * meme (or null when every meme of the track is collected).
   */
  const rollMeme = useCallback((track: string): Meme | null => {
    const meme = rollMemeUtil(track, progress.unlockedMemes);
    if (!meme) return null;
    setProgress((prev) => {
      if (prev.unlockedMemes.includes(meme.id)) return prev;
      const next: UserProgress = {
        ...prev,
        unlockedMemes: [...prev.unlockedMemes, meme.id],
      };
      saveProgress(next);
      return next;
    });
    return meme;
  }, [progress.unlockedMemes]);

  const level = getLevelForXp(progress.xp);
  const onBench = progress.benchDays >= 1;

  return {
    progress,
    loaded,
    level,
    update,
    completeLesson,
    completeCase,
    recordQuizAnswer,
    recordAnswer,
    recordQuizScore,
    reviewCount,
    getReviewCount,
    resetProgress,
    salary: progress.currentSalary,
    salaryHistory: progress.salaryHistory,
    benchDays: progress.benchDays,
    streakFreezes: progress.streakFreezes,
    onBench,
    rollMeme,
    unlockedMemes: progress.unlockedMemes,
    t: (en: string, de: string) => progress.language === 'de' ? de : en,
  };
}
