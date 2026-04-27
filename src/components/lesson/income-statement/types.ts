export type QuizResult = { correct: boolean; attempts: number };

export type QuizResults = {
  q1: QuizResult | null;
  q2: QuizResult | null;
  q3: QuizResult | null;
  q4: QuizResult | null;
};

export type QuizSlideKey = keyof QuizResults;

export interface RetentionResults {
  quizResults: QuizResults;
  totalXp: number;
  elapsedSeconds: number;
  accuracy: number;
}

export interface SlideProps {
  onAnswer?: (slideKey: QuizSlideKey, result: QuizResult) => void;
  onCanProceed?: (canProceed: boolean) => void;
  onNext?: () => void;
  quizResults?: QuizResults;
  results?: RetentionResults;
}

// Order of quiz keys as they appear in the lesson — used by quiz slides to
// compute "consecutive correct" streaks based on prior results.
export const QUIZ_ORDER: QuizSlideKey[] = ['q1', 'q2', 'q3', 'q4'];

export function priorStreakFor(self: QuizSlideKey, results: QuizResults | undefined): number {
  if (!results) return 0;
  const idx = QUIZ_ORDER.indexOf(self);
  if (idx <= 0) return 0;
  let run = 0;
  for (let i = 0; i < idx; i++) {
    const r = results[QUIZ_ORDER[i]];
    if (r?.correct) run += 1;
    else run = 0;
  }
  return run;
}
