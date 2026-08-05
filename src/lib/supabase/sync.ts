'use client';

// ============================================================
// Progress sync — Supabase as source of truth when authenticated,
// localStorage as the always-on fallback (offline / logged out).
//
// Scope (SCHRITT 1): `profiles` (singleton progress/onboarding fields)
// and `lesson_progress` (completedLessons[] + completedQuizzes{}).
// `concept_mastery` / `quiz_attempts` are wired in SCHRITT 2.
//
// Every function here is best-effort: a Supabase failure is logged and
// swallowed, never thrown into the UI — localStorage already has the
// authoritative local copy by the time these run.
// ============================================================

import { getSupabaseClient } from './client';
import type { UserProgress } from '../store';
import { getProfile as getOnboardingProfile, type UserProfile as OnboardingProfile } from '../onboarding/profile';

const MIGRATION_FLAG_KEY = 'career-dojo-migrated';

interface ProfileRow {
  id: string;
  username: string | null;
  language: string;
  selected_track: string;
  theme: string;
  sound_enabled: boolean;
  daily_goal: number;
  xp: number;
  streak: number;
  longest_streak: number;
  last_active_date: string | null;
  lessons_completed_today: number;
  total_questions_answered: number;
  total_correct_answers: number;
  skill_profile: string | null;
  interview_goal: string | null;
  time_frame: string | null;
  explorer_motivation: string | null;
  learning_time: string | null;
  interview_date: string | null;
  onboarding_completed_at: string | null;
  knowledge: Record<string, unknown> | null;
}

interface LessonProgressRow {
  lesson_id: string;
  completed_at: string;
  xp_earned: number;
  best_score: number | null;
  attempts: number;
}

function hasMigratedFor(userId: string): boolean {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem(MIGRATION_FLAG_KEY) === userId;
}

function markMigratedFor(userId: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MIGRATION_FLAG_KEY, userId);
}

function progressToProfileRow(userId: string, progress: UserProgress, onboarding: OnboardingProfile): Partial<ProfileRow> & { id: string } {
  return {
    id: userId,
    username: progress.username || null,
    language: progress.language,
    selected_track: progress.selectedTrack,
    theme: progress.theme,
    sound_enabled: progress.soundEnabled,
    daily_goal: progress.dailyGoal,
    xp: progress.xp,
    streak: progress.streak,
    longest_streak: progress.longestStreak,
    last_active_date: progress.lastActiveDate || null,
    lessons_completed_today: progress.lessonsCompletedToday,
    total_questions_answered: progress.totalQuestionsAnswered,
    total_correct_answers: progress.totalCorrectAnswers,
    skill_profile: onboarding.skillProfile,
    interview_goal: onboarding.interviewGoal,
    time_frame: onboarding.timeFrame,
    explorer_motivation: onboarding.explorerMotivation,
    learning_time: onboarding.learningTime,
    interview_date: onboarding.interviewDate,
    onboarding_completed_at: onboarding.onboardingCompletedAt,
    knowledge: onboarding.knowledge,
  };
}

/**
 * Fire-and-forget upsert of the singleton profile fields. Uses upsert (not
 * update) on purpose: the on-signup trigger creates the row, but if this
 * fires before that transaction is visible, an update would silently touch
 * zero rows — upsert self-heals instead of failing quietly.
 */
export async function pushProfile(userId: string, progress: UserProgress): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const onboarding = getOnboardingProfile();
    const row = progressToProfileRow(userId, progress, onboarding);
    const { error } = await supabase.from('profiles').upsert(row, { onConflict: 'id' });
    if (error) console.error('[supabase] pushProfile failed', error.message);
  } catch (err) {
    console.error('[supabase] pushProfile threw', err);
  }
}

/**
 * Fire-and-forget upsert of a single completed lesson. `xpEarned` is only
 * meaningful on first completion — pass undefined on repeats so a re-run
 * doesn't stomp the originally recorded value back to 0.
 */
export async function pushLessonProgress(
  userId: string,
  lessonId: string,
  xpEarned?: number,
  bestScore?: number,
  attempts?: number,
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    const { error } = await supabase.from('lesson_progress').upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        ...(xpEarned !== undefined ? { xp_earned: xpEarned } : {}),
        ...(bestScore !== undefined ? { best_score: bestScore } : {}),
        ...(attempts !== undefined ? { attempts } : {}),
      },
      { onConflict: 'user_id,lesson_id' },
    );
    if (error) console.error('[supabase] pushLessonProgress failed', error.message);
  } catch (err) {
    console.error('[supabase] pushLessonProgress threw', err);
  }
}

/**
 * Reads the cloud state for the logged-in user (profile + all completed
 * lessons). Returns null on ANY read failure — never a partially-empty
 * success object. `useStore` treats null as "skip the merge, keep local
 * state" — a permission/network error must never be read as "the cloud
 * genuinely has zero lessons" and wipe out real local progress.
 */
export async function pullCloudProgress(
  userId: string,
): Promise<{ profile: ProfileRow | null; lessons: LessonProgressRow[] } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  try {
    const [{ data: profile, error: profileError }, { data: lessons, error: lessonsError }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('lesson_progress').select('lesson_id, completed_at, xp_earned, best_score, attempts').eq('user_id', userId),
    ]);
    if (profileError) {
      console.error('[supabase] pull profile failed', profileError.message);
      return null;
    }
    if (lessonsError) {
      console.error('[supabase] pull lesson_progress failed', lessonsError.message);
      return null;
    }
    return { profile: (profile as ProfileRow) ?? null, lessons: (lessons as LessonProgressRow[]) ?? [] };
  } catch (err) {
    console.error('[supabase] pullCloudProgress threw', err);
    return null;
  }
}

/**
 * One-time bulk upsert of the existing localStorage state into Supabase,
 * on the FIRST login of a given browser for a given account. Runs only
 * when this browser hasn't migrated yet AND local progress actually has
 * something worth carrying over — never overwrites cloud data with an
 * empty local state on a second device.
 */
export async function migrateLocalStorageIfNeeded(userId: string, localProgress: UserProgress): Promise<void> {
  if (hasMigratedFor(userId)) return;
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    const hasLocalData = localProgress.completedLessons.length > 0 || localProgress.xp > 0;
    if (!hasLocalData) {
      markMigratedFor(userId);
      return;
    }

    const onboarding = getOnboardingProfile();
    const profileRow = progressToProfileRow(userId, localProgress, onboarding);
    const { error: profileError } = await supabase.from('profiles').upsert(profileRow, { onConflict: 'id' });
    if (profileError) console.error('[supabase] migrate profile failed', profileError.message);

    const lessonRows = localProgress.completedLessons.map((lessonId) => {
      const quiz = localProgress.completedQuizzes[lessonId];
      return {
        user_id: userId,
        lesson_id: lessonId,
        completed_at: localProgress.lastActiveDate
          ? new Date(localProgress.lastActiveDate).toISOString()
          : new Date().toISOString(),
        xp_earned: 0, // per-lesson XP isn't tracked locally, only the running total
        best_score: quiz?.bestScore ?? null,
        attempts: quiz?.attempts ?? 1,
      };
    });

    if (lessonRows.length > 0) {
      const { error: lessonsError } = await supabase
        .from('lesson_progress')
        .upsert(lessonRows, { onConflict: 'user_id,lesson_id' });
      if (lessonsError) console.error('[supabase] migrate lesson_progress failed', lessonsError.message);
    }

    markMigratedFor(userId);
  } catch (err) {
    console.error('[supabase] migrateLocalStorageIfNeeded threw', err);
  }
}

/** Reshapes cloud rows back into the shape `useStore` expects. */
export function cloudToProgressPartial(cloud: { profile: ProfileRow | null; lessons: LessonProgressRow[] }): Partial<UserProgress> {
  const partial: Partial<UserProgress> = {
    completedLessons: cloud.lessons.map((l) => l.lesson_id),
    completedQuizzes: Object.fromEntries(
      cloud.lessons
        .filter((l) => l.best_score !== null)
        .map((l) => [l.lesson_id, { score: l.best_score as number, bestScore: l.best_score as number, attempts: l.attempts }]),
    ),
  };
  if (cloud.profile) {
    const p = cloud.profile;
    Object.assign(partial, {
      username: p.username ?? '',
      language: (p.language as UserProgress['language']) ?? 'de',
      selectedTrack: p.selected_track,
      theme: (p.theme as UserProgress['theme']) ?? 'dark',
      soundEnabled: p.sound_enabled,
      dailyGoal: p.daily_goal,
      xp: p.xp,
      streak: p.streak,
      longestStreak: p.longest_streak,
      lastActiveDate: p.last_active_date ?? '',
      lessonsCompletedToday: p.lessons_completed_today,
      totalQuestionsAnswered: p.total_questions_answered,
      totalCorrectAnswers: p.total_correct_answers,
    });
  }
  return partial;
}
