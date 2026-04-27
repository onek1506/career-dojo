import type { QuizResults } from '@/components/lesson/income-statement/types';

const XP_MAP = {
  q1: { full: 10, half: 5 },
  q2: { full: 10, half: 5 },
  q3: { full: 15, half: 8 },
  q4: { full: 15, half: 8 },
} as const;

const COMPLETION_BONUS = 5;

export function calculateTotalXp(results: QuizResults): number {
  let xp = COMPLETION_BONUS;
  (Object.keys(XP_MAP) as Array<keyof typeof XP_MAP>).forEach((key) => {
    const result = results[key];
    if (!result || !result.correct) return;
    const points = XP_MAP[key];
    xp += result.attempts === 1 ? points.full : points.half;
  });
  return xp;
}

export function calculateAccuracy(results: QuizResults): number {
  const total = Object.values(results).filter((r) => r !== null).length;
  if (total === 0) return 0;
  const correct = Object.values(results).filter((r) => r?.correct).length;
  return Math.round((correct / total) * 100);
}
