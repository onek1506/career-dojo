'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { recordWeakAreaAnswer } from '@/lib/weak-areas';
import { useSupabaseAuth } from '@/lib/supabase/useAuth';
import { shouldShowSignupGate, markSignupGateSeen } from '@/lib/auth-gate';
import LessonSidePanel from '../LessonSidePanel';
import { LessonSidePanelProvider } from '../LessonSidePanelContext';
import MicroSlideView from './MicroSlideView';
import { microTotalXp, microAccuracy } from './xp';
import type { MicroLessonData, MicroRetentionResults, MicroSlide, QuizResult } from './types';

function slideLabel(slide: MicroSlide, index: number): string {
  const n = String(index + 1).padStart(2, '0');
  switch (slide.kind) {
    case 'hook':
      return `${n} Briefing`;
    case 'minicheck':
      return `${n} Mini-Check`;
    case 'summary':
      return `${n} Zusammenfassung`;
    case 'retention':
      return `${n} Abschluss`;
    default:
      return `${n} Konzept`;
  }
}

export default function MicroLesson({ data }: { data: MicroLessonData }) {
  const router = useRouter();
  const { progress, completeLesson } = useStore();
  const { user, loading: authLoading } = useSupabaseAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult | null>>(() => {
    const init: Record<string, QuizResult | null> = {};
    data.slides.forEach((s) => {
      if (s.kind === 'minicheck') init[s.id] = null;
    });
    return init;
  });
  const [startTime] = useState<number>(() => Date.now());
  const [finalElapsed, setFinalElapsed] = useState<number | null>(null);
  const [completionFinalized, setCompletionFinalized] = useState(false);

  const quizOrder = useMemo(
    () => data.slides.flatMap((s) => (s.kind === 'minicheck' ? [s.id] : [])),
    [data],
  );
  const slideLabels = useMemo(() => data.slides.map((s, i) => slideLabel(s, i)), [data]);

  const totalSteps = data.slides.length;
  const slide = data.slides[currentStep];
  const isLast = currentStep === totalSteps - 1;

  const totalXp = useMemo(() => microTotalXp(quizResults), [quizResults]);
  const accuracy = useMemo(() => microAccuracy(quizResults), [quizResults]);
  const correctCount = Object.values(quizResults).filter((r) => r?.correct).length;

  const results: MicroRetentionResults | undefined =
    isLast && finalElapsed !== null
      ? {
          totalXp,
          accuracy,
          elapsedSeconds: finalElapsed,
          correctCount,
          totalCount: quizOrder.length,
        }
      : undefined;

  // Consecutive first-try-correct streak leading into the current mini-check.
  const priorStreak = useMemo(() => {
    if (slide.kind !== 'minicheck') return 0;
    const idx = quizOrder.indexOf(slide.id);
    let run = 0;
    for (let i = 0; i < idx; i++) {
      const r = quizResults[quizOrder[i]];
      if (r?.correct && r.attempts === 1) run += 1;
      else run = 0;
    }
    return run;
  }, [slide, quizOrder, quizResults]);

  const quizIndex = slide.kind === 'minicheck' ? quizOrder.indexOf(slide.id) + 1 : 0;

  const handleAnswer = (key: string, result: QuizResult) => {
    if (data.topicTag) recordWeakAreaAnswer(data.topicTag, result.correct);
    setQuizResults((prev) => ({ ...prev, [key]: result }));
  };

  const goNext = () => {
    if (currentStep >= totalSteps - 1) {
      if (!authLoading && shouldShowSignupGate(data.id, progress.completedLessons, !!user)) {
        markSignupGateSeen();
        router.push(`/auth/gate?next=${encodeURIComponent(data.nextPath)}`);
      } else {
        router.push(data.nextPath);
      }
      return;
    }
    // Speed-run diagnosis (K3+): a first-try-correct answer on a diagnostic
    // minicheck jumps past the refresher straight to its skip target.
    let nextStep = currentStep + 1;
    if (slide.kind === 'minicheck' && slide.skipIfCorrectToIndex !== undefined) {
      const result = quizResults[slide.id];
      if (result?.correct && result.attempts === 1) {
        nextStep = Math.min(slide.skipIfCorrectToIndex, totalSteps - 1);
      }
    }
    const enteringRetention = nextStep === totalSteps - 1;
    if (enteringRetention && !completionFinalized) {
      setFinalElapsed(Math.floor((Date.now() - startTime) / 1000));
      completeLesson(data.id, microTotalXp(quizResults));
      setCompletionFinalized(true);
    }
    setCurrentStep(nextStep);
  };

  const goBack = () => {
    if (isLast) {
      router.push('/course');
      return;
    }
    if (currentStep === 0) {
      router.back();
      return;
    }
    setCurrentStep((s) => s - 1);
  };

  const sidePanel = (
    <LessonSidePanel
      moduleLabel={data.module}
      lessonTitle={data.titleDe}
      slideLabels={slideLabels}
      currentStep={currentStep + 1}
      totalSteps={totalSteps}
    />
  );

  return (
    <LessonSidePanelProvider value={sidePanel}>
      <MicroSlideView
        key={currentStep}
        slide={slide}
        currentStep={currentStep + 1}
        totalSteps={totalSteps}
        onBack={goBack}
        onNext={goNext}
        onAnswer={handleAnswer}
        priorStreak={priorStreak}
        quizIndex={quizIndex}
        quizTotal={quizOrder.length}
        results={results}
      />
    </LessonSidePanelProvider>
  );
}
