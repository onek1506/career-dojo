export type QuizResult = { correct: boolean; attempts: number };

// Beginner variant has 2 quiz questions instead of 4 — q3/q4 were dropped
// in favor of an EBITDA cliffhanger preview slide.
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

// Order of quiz keys as they appear in the lesson — used by quiz slides to
// compute "consecutive correct" streaks based on prior results.
export const QUIZ_ORDER: QuizSlideKey[] = ['q1', 'q2'];

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
