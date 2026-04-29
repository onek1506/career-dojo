'use client';

import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { calculateAccuracy, calculateTotalXp } from '@/lib/lesson/xp';
import { getProfile, type SkillProfile } from '@/lib/onboarding/profile';
import type { MarcusTone } from '@/components/lesson/MarcusNote';
import Slide01Briefing from './Slide01Briefing';
import Slide02RecapTapReveal from './Slide02RecapTapReveal';
import Slide03ThreeSections from './Slide03ThreeSections';
import Slide04Positions from './Slide04Positions';
import Slide05EquilibriumExample from './Slide05EquilibriumExample';
import Slide06ShareholdersEquity from './Slide06ShareholdersEquity';
import Slide07NegativeEquity from './Slide07NegativeEquity';
import Slide08WorkingCapital from './Slide08WorkingCapital';
import Slide09ProTips from './Slide09ProTips';
import Slide10QuizAssets from './Slide10QuizAssets';
import Slide11QuizCalculation from './Slide11QuizCalculation';
import Slide12Cliffhanger from './Slide12Cliffhanger';
import Slide13Retention from './Slide13Retention';
import { lessonMeta } from './data';
import type { QuizResult, QuizResults, QuizSlideKey, RetentionResults, SlideProps } from './types';

// Index in this array = slide number - 1
const ALL_SLIDES: ComponentType<SlideProps>[] = [
  Slide01Briefing,
  Slide02RecapTapReveal,
  Slide03ThreeSections,
  Slide04Positions,
  Slide05EquilibriumExample,
  Slide06ShareholdersEquity,
  Slide07NegativeEquity,
  Slide08WorkingCapital,
  Slide09ProTips,
  Slide10QuizAssets,
  Slide11QuizCalculation,
  Slide12Cliffhanger,
  Slide13Retention,
];

const NEXT_LESSON_PATH = '/lesson/cash-flow-statement';

export default function BalanceSheetLesson() {
  const router = useRouter();
  const { completeLesson } = useStore();

  const [hydrated, setHydrated] = useState(false);
  const [skillProfile, setSkillProfile] = useState<SkillProfile>('B');
  const [currentStep, setCurrentStep] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResults>({ q1: null, q2: null });
  const [startTime] = useState<number>(() => Date.now());
  const [finalElapsed, setFinalElapsed] = useState<number | null>(null);
  const [completionFinalized, setCompletionFinalized] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    setSkillProfile(profile.skillProfile ?? 'B');
    setHydrated(true);
  }, []);

  const visibleSlides = useMemo(() => {
    const cfg = lessonMeta.trackConfig[skillProfile];
    return cfg.slidesToShow.map((n) => ALL_SLIDES[n - 1]).filter(Boolean);
  }, [skillProfile]);

  const tone: MarcusTone = skillProfile === 'C' ? 'sharp' : 'gentle';

  const totalXp = useMemo(() => calculateTotalXp(quizResults), [quizResults]);
  const accuracy = useMemo(() => calculateAccuracy(quizResults), [quizResults]);

  if (!hydrated) return null;

  const Slide = visibleSlides[currentStep];
  const isLast = currentStep === visibleSlides.length - 1;

  const retentionResults: RetentionResults | undefined =
    isLast && finalElapsed !== null
      ? { quizResults, totalXp, elapsedSeconds: finalElapsed, accuracy }
      : undefined;

  const handleAnswer = (slideKey: QuizSlideKey, result: QuizResult) => {
    setQuizResults((prev) => ({ ...prev, [slideKey]: result }));
  };

  const goNext = () => {
    if (currentStep >= visibleSlides.length - 1) {
      router.push(NEXT_LESSON_PATH);
      return;
    }
    const enteringRetention = currentStep === visibleSlides.length - 2;
    if (enteringRetention && !completionFinalized) {
      setFinalElapsed(Math.floor((Date.now() - startTime) / 1000));
      completeLesson(lessonMeta.id, totalXp);
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

  return (
    <Slide
      key={currentStep}
      currentStep={currentStep + 1}
      totalSteps={visibleSlides.length}
      onBack={goBack}
      onNext={goNext}
      tone={tone}
      onAnswer={handleAnswer}
      quizResults={quizResults}
      results={retentionResults}
    />
  );
}
