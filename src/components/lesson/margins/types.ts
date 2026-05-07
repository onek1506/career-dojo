// Re-export the shared QuizResult shape so each lesson can import a single
// canonical type while still owning its own QuizResults shape.
export type { QuizResult } from '@/lib/lesson/xp';
import type { QuizResult } from '@/lib/lesson/xp';

// Lesson 1b (Margins) has two graded quizzes: q1 = gross-margin calc,
// q2 = net-margin calc. The formula drill is a guided exercise (always
// resolves correctly) and is intentionally not part of QuizResults.
export type QuizResults = {
  q1: QuizResult | null;
  q2: QuizResult | null;
};

export type QuizSlideKey = keyof QuizResults;

export interface RetentionResults {
  quizResults: QuizResults;
  totalXp: number;
  elapsedSeconds: number;
  accuracy: number;
}

export interface SlideProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  sidePanel?: import('react').ReactNode;
  onAnswer?: (slideKey: QuizSlideKey, result: QuizResult) => void;
  quizResults?: QuizResults;
  results?: RetentionResults;
}

export const QUIZ_ORDER: QuizSlideKey[] = ['q1', 'q2'];

export function priorStreakFor(self: QuizSlideKey, results: QuizResults | undefined): number {
  if (!results) return 0;
  const idx = QUIZ_ORDER.indexOf(self);
  if (idx <= 0) return 0;
  let run = 0;
  for (let i = 0; i < idx; i++) {
    const r = results[QUIZ_ORDER[i]];
    if (r?.correct && r.attempts === 1) run += 1;
    else run = 0;
  }
  return run;
}
