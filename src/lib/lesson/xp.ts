import type { QuizResults } from '@/components/lesson/income-statement/types';

// Beginner variant: 2 questions × 10 XP + 5 completion bonus = 25 XP max.
const BASE_XP_PER_QUESTION = 10;
const COMPLETION_BONUS = 5;
const CONSOLATION_XP = 1;

/**
 * Decide XP and streak eligibility for a single quiz answer.
 * - First-try correct → full XP, counts for streak
 * - Later-try correct → half XP, does NOT count for streak
 * - Wrong (final) → consolation 1 XP, does NOT count for streak
 */
export function calculateQuizXp(
  correct: boolean,
  attempts: number,
  baseXp: number = BASE_XP_PER_QUESTION
): { xpEarned: number; countsForStreak: boolean } {
  if (!correct) {
    return { xpEarned: CONSOLATION_XP, countsForStreak: false };
  }
  if (attempts <= 1) {
    return { xpEarned: baseXp, countsForStreak: true };
  }
  return { xpEarned: Math.floor(baseXp / 2), countsForStreak: false };
}

export function calculateTotalXp(results: QuizResults): number {
  let xp = COMPLETION_BONUS;
  for (const r of Object.values(results)) {
    if (r) xp += r.xpEarned;
  }
  return xp;
}

export function calculateAccuracy(results: QuizResults): number {
  const total = Object.values(results).filter((r) => r !== null).length;
  if (total === 0) return 0;
  const correct = Object.values(results).filter((r) => r?.correct).length;
  return Math.round((correct / total) * 100);
}
