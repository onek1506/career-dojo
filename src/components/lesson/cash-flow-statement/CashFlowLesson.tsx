'use client';

import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { calculateAccuracy, calculateTotalXp } from '@/lib/lesson/xp';
import { getProfile, type SkillProfile } from '@/lib/onboarding/profile';
import type { MarcusTone } from '@/components/lesson/MarcusNote';
import Slide01Briefing from './Slide01Briefing';
import Slide02WhatIsCFS from './Slide02WhatIsCFS';
import Slide03ThreeSections from './Slide03ThreeSections';
import Slide04DepreciationPuzzle from './Slide04DepreciationPuzzle';
import Slide05DesertIsland from './Slide05DesertIsland';
import Slide06NonCashItems from './Slide06NonCashItems';
import Slide07ProTips from './Slide07ProTips';
import Slide08QuizSection from './Slide08QuizSection';
import Slide09QuizDepreciation from './Slide09QuizDepreciation';
import Slide10Cliffhanger from './Slide10Cliffhanger';
import Slide11Retention from './Slide11Retention';
import { lessonMeta } from './data';
import type { QuizResult, QuizResults, QuizSlideKey, RetentionResults, SlideProps } from './types';

const ALL_SLIDES: ComponentType<SlideProps>[] = [
  Slide01Briefing,
  Slide02WhatIsCFS,
  Slide03ThreeSections,
  Slide04DepreciationPuzzle,
  Slide05DesertIsland,
  Slide06NonCashItems,
  Slide07ProTips,
  Slide08QuizSection,
  Slide09QuizDepreciation,
  Slide10Cliffhanger,
  Slide11Retention,
];

const NEXT_LESSON_PATH = '/lesson/three-statements-linked';

export default function CashFlowLesson() {
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
