'use client';

import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import type { EntryCategory } from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from '../types';

const COPY: Record<'k1' | 'k2' | 'k3', { heading: string; body: string }> = {
  k1: {
    heading: 'Dann fangen wir sauber von vorn an.',
    body: 'Wir bauen die Basics in Ruhe auf — Accounting, Bewertung, die ersten Fit-Fragen. Kein Vorwissen nötig, keine Eile.',
  },
  k2: {
    heading: 'Gut, dann überspringen wir die Grundlagen.',
    body: 'Du steigst direkt bei der Interview-Logik ein — echte Fragen, Accounting-Drills, DCF, M&A, LBO. Die Basics setzen wir voraus.',
  },
  k3: {
    heading: 'Dann direkt volles Tempo.',
    body: 'Du steigst beim Fortgeschrittenen-Drill ein — die Fragen, an denen sich Full-Time-Kandidaten unterscheiden.',
  },
};

export default function Ready({ currentStep, totalSteps, profile, onBack, onNext }: OnboardingSlideProps) {
  const category = (profile.entryCategory ?? 'k1') as EntryCategory;
  const copy = COPY[category as 'k1' | 'k2' | 'k3'] ?? COPY.k1;

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      showProgress={false}
      footer={<LessonFooterCTA onClick={onNext} label="Erste Lektion starten" />}
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
          {copy.heading}
        </h2>
        <MarcusNote subject="Re: Los geht's" body={copy.body} />
      </div>
    </OnboardingLayout>
  );
}
