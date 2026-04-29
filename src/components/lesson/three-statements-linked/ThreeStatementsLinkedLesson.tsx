'use client';

import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { calculateAccuracy, calculateTotalXp } from '@/lib/lesson/xp';
import { getProfile, type SkillProfile } from '@/lib/onboarding/profile';
import type { MarcusTone } from '@/components/lesson/MarcusNote';
import Slide01Briefing from './Slide01Briefing';
import Slide02ThreeLinksOverview from './Slide02ThreeLinksOverview';
import Slide03LinkDiagramInteractive from './Slide03LinkDiagramInteractive';
import Slide04DepreciationWalkthrough from './Slide04DepreciationWalkthrough';
import Slide05WalkThroughRule from './Slide05WalkThroughRule';
import Slide06InventoryScenario from './Slide06InventoryScenario';
import Slide07ProTips from './Slide07ProTips';
import Slide08QuizWhichStatement from './Slide08QuizWhichStatement';
import Slide09QuizWalkThrough from './Slide09QuizWalkThrough';
import Slide10QuizScenario from './Slide10QuizScenario';
import Slide11Retention from './Slide11Retention';
import { lessonMeta } from './data';
import type { QuizResult, QuizResults, QuizSlideKey, RetentionResults, SlideProps } from './types';

const ALL_SLIDES: ComponentType<SlideProps>[] = [
  Slide01Briefing,
  Slide02ThreeLinksOverview,
  Slide03LinkDiagramInteractive,
  Slide04DepreciationWalkthrough,
  Slide05WalkThroughRule,
  Slide06InventoryScenario,
  Slide07ProTips,
  Slide08QuizWhichStatement,
  Slide09QuizWalkThrough,
  Slide10QuizScenario,
  Slide11Retention,
];

const NEXT_LESSON_PATH = '/skill-tree';

export default function ThreeStatementsLinkedLesson() {
  const router = useRouter();
  const { completeLesson } = useStore();

  const [hydrated, setHydrated] = useState(false);
  const [skillProfile, setSkillProfile] = useState<SkillProfile>('B');
  const [currentStep, setCurrentStep] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResults>({ q1: null, q2: null, q3: null });
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
