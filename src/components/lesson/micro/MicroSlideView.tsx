'use client';

import HookSlide from './slides/HookSlide';
import ConceptSlide from './slides/ConceptSlide';
import MiniCheckSlide from './slides/MiniCheckSlide';
import SummarySlide from './slides/SummarySlide';
import RetentionSlide from './slides/RetentionSlide';
import type { MicroRetentionResults, MicroSlide, QuizResult } from './types';

export interface MicroSlideViewProps {
  slide: MicroSlide;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onAnswer: (key: string, result: QuizResult) => void;
  priorStreak: number;
  quizIndex: number;
  quizTotal: number;
  results?: MicroRetentionResults;
}

export default function MicroSlideView({
  slide,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  priorStreak,
  quizIndex,
  quizTotal,
  results,
}: MicroSlideViewProps) {
  const nav = { currentStep, totalSteps, onBack, onNext };

  switch (slide.kind) {
    case 'hook':
      return <HookSlide slide={slide} {...nav} />;
    case 'concept':
      return <ConceptSlide slide={slide} {...nav} />;
    case 'minicheck':
      return (
        <MiniCheckSlide
          slide={slide}
          {...nav}
          onAnswer={onAnswer}
          priorStreak={priorStreak}
          quizIndex={quizIndex}
          quizTotal={quizTotal}
        />
      );
    case 'summary':
      return <SummarySlide slide={slide} {...nav} />;
    case 'retention':
      return <RetentionSlide slide={slide} {...nav} results={results} />;
  }
}
