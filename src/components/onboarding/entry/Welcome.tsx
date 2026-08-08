'use client';

import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import type { OnboardingSlideProps } from '../types';

export default function Welcome({ currentStep, totalSteps, onNext }: OnboardingSlideProps) {
  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={totalSteps} showProgress={false} footer={
      <LessonFooterCTA onClick={onNext} label="Los geht's" />
    }>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            Career-Dojo
          </span>
          <h1 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl text-is-text-primary leading-tight">
            Investment-Banking-Interviews trainieren, in kleinen Schritten.
          </h1>
        </div>

        <MarcusNote
          subject="Re: Bevor wir loslegen"
          body="Die meisten fallen im IB-Interview nicht durch, weil sie dumm sind — sondern weil ihnen niemand gezeigt hat, wie man die Fragen wirklich beantwortet. Genau das machen wir hier."
        />
      </div>
    </OnboardingLayout>
  );
}
