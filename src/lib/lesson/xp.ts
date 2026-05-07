// Lesson-agnostic XP helpers. Each lesson defines its own QuizResults shape
// (e.g. { q1, q2, q3 } for lesson 1a vs. { q1, q2 } for lesson 1b); these
// helpers iterate over the values and don't care about specific keys.
export type QuizResult = {
  correct: boolean;
  attempts: number;
  xpEarned: number;
  countsForStreak: boolean;
};

export type AnyQuizResults = Record<string, QuizResult | null>;

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

export function calculateTotalXp(results: AnyQuizResults): number {
  let xp = COMPLETION_BONUS;
  for (const r of Object.values(results)) {
    if (r) xp += r.xpEarned;
  }
  return xp;
}

export function calculateAccuracy(results: AnyQuizResults): number {
  const total = Object.values(results).filter((r) => r !== null).length;
  if (total === 0) return 0;
  const correct = Object.values(results).filter((r) => r?.correct).length;
  return Math.round((correct / total) * 100);
}
