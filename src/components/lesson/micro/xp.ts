import { calculateQuizXp } from '@/lib/lesson/xp';
import type { QuizResult } from './types';

// Re-export the shared per-answer XP rule so slides import from one place.
export { calculateQuizXp };

// Flat completion bonus added on top of earned quiz XP — mirrors the
// income-statement lesson's economy so the tracks feel consistent.
export const MICRO_COMPLETION_BONUS = 5;

export function microTotalXp(results: Record<string, QuizResult | null>): number {
  let xp = MICRO_COMPLETION_BONUS;
  for (const r of Object.values(results)) {
    if (r) xp += r.xpEarned;
  }
  return xp;
}

export function microAccuracy(results: Record<string, QuizResult | null>): number {
  const answered = Object.values(results).filter(
    (r): r is QuizResult => r !== null,
  );
  if (answered.length === 0) return 0;
  const correct = answered.filter((r) => r.correct).length;
  return Math.round((correct / answered.length) * 100);
}
