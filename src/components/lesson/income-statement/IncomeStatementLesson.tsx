'use client';

import { useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import Slide01Briefing from './Slide01Briefing';
import Slide02BalanceVsIS from './Slide02BalanceVsIS';
import Slide03Waterfall from './Slide03Waterfall';
import Slide04Margins from './Slide04Margins';
import Slide05FormulaDrill from './Slide05FormulaDrill';
import Slide06CheatSheet from './Slide06CheatSheet';
import Slide07ProTips from './Slide07ProTips';
import Slide08QuizSort from './Slide08QuizSort';
import Slide09QuizCalc from './Slide09QuizCalc';
import Slide10EbitdaPreview from './Slide10EbitdaPreview';
import Slide12Retention from './Slide12Retention';
import SidePanel from './SidePanel';
import { useStore } from '@/lib/store';
import { calculateAccuracy, calculateTotalXp } from '@/lib/lesson/xp';
import type {
  QuizResult,
  QuizResults,
  QuizSlideKey,
  RetentionResults,
  SlideProps,
} from './types';

const SLIDES: ComponentType<SlideProps>[] = [
  Slide01Briefing,
  Slide02BalanceVsIS,
  Slide03Waterfall,
  Slide04Margins,
  Slide05FormulaDrill,
  Slide06CheatSheet,
  Slide07ProTips,
  Slide08QuizSort,
  Slide09QuizCalc,
  Slide10EbitdaPreview,
  Slide12Retention,
];

const LESSON_ID = 'acc-1-income-statement';

export default function IncomeStatementLesson() {
  const router = useRouter();
  const { completeLesson } = useStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResults>({
    q1: null,
    q2: null,
  });
  const [startTime] = useState<number>(() => Date.now());
  const [finalElapsed, setFinalElapsed] = useState<number | null>(null);
  const [completionFinalized, setCompletionFinalized] = useState(false);

  const totalXp = useMemo(() => calculateTotalXp(quizResults), [quizResults]);
  const accuracy = useMemo(() => calculateAccuracy(quizResults), [quizResults]);

  const Slide = SLIDES[currentStep];
  const isRetention = currentStep === SLIDES.length - 1;

  const retentionResults: RetentionResults | undefined =
    isRetention && finalElapsed !== null
      ? { quizResults, totalXp, elapsedSeconds: finalElapsed, accuracy }
      : undefined;

  const handleAnswer = (slideKey: QuizSlideKey, result: QuizResult) => {
    setQuizResults((prev) => ({ ...prev, [slideKey]: result }));
  };

  const goNext = () => {
    if (currentStep >= SLIDES.length - 1) {
      router.push('/skill-tree');
      return;
    }
    const enteringRetention = currentStep === SLIDES.length - 2;
    if (enteringRetention && !completionFinalized) {
      setFinalElapsed(Math.floor((Date.now() - startTime) / 1000));
      completeLesson(LESSON_ID, totalXp);
      setCompletionFinalized(true);
    }
    setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    if (currentStep === 0) {
      router.back();
      return;
    }
    setCurrentStep((s) => s - 1);
  };

  const sidePanel = (
    <SidePanel currentStep={currentStep + 1} totalSteps={SLIDES.length} />
  );

  return (
    <Slide
      key={currentStep}
      currentStep={currentStep + 1}
      totalSteps={SLIDES.length}
      onBack={goBack}
      onNext={goNext}
      sidePanel={sidePanel}
      onAnswer={handleAnswer}
      quizResults={quizResults}
      results={retentionResults}
    />
  );
}
