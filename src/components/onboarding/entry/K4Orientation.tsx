'use client';

import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import type { OnboardingSlideProps } from '../types';

export default function K4Orientation({ currentStep, totalSteps, onBack, onNext }: OnboardingSlideProps) {
  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      showProgress={false}
      footer={<LessonFooterCTA onClick={onNext} label="Verstanden" />}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            Was ist IB, in 60 Sekunden
          </span>
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
            Investment Banks beraten Unternehmen bei Käufen, Verkäufen und Kapitalbeschaffung.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary leading-relaxed">
            Analysten bauen die Zahlen dahinter — Unternehmensbewertung, Fusionsmodelle,
            Finanzierungsstrukturen. Interviews prüfen genau dieses Handwerk: Accounting, Bewertung,
            M&A-Mechanik. Deshalb existiert Career-Dojo.
          </p>
        </div>

        <MarcusNote
          subject="Re: Noch nicht dein Moment"
          body="Ohne konkrete Bewerbung oder Deadline lohnt sich der volle Kurs für dich noch nicht — der zahlt sich erst aus, wenn du wirklich drinsteckst. Merk dir die App. Sobald du dich bewirbst, ist der komplette Lernpfad hier."
        />
      </div>
    </OnboardingLayout>
  );
}
