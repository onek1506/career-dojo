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
  results?: RetentionResults;
}
