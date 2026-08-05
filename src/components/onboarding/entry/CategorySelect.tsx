'use client';

import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type { EntryCategory } from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from '../types';

interface CategoryOption {
  id: EntryCategory;
  number: string;
  label: string;
  description: string;
}

const OPTIONS: CategoryOption[] = [
  {
    id: 'k1',
    number: '01',
    label: 'ORIENTIERTER EINSTEIGER',
    description: '1.–2. Semester, noch keine Bewerbung, Spring Week liegt 6+ Monate weg.',
  },
  {
    id: 'k2',
    number: '02',
    label: 'VORBEREITENDER',
    description: '3.–5. Semester, erste Bewerbungen laufen oder stehen kurz bevor, Summer Internship im Blick.',
  },
  {
    id: 'k3',
    number: '03',
    label: 'FORTGESCHRITTENER',
    description: 'Höheres Semester oder Master, schon Praktika gemacht, Full-Time oder mehrere Interviews anstehend.',
  },
  {
    id: 'k4',
    number: '04',
    label: 'NOCH ORIENTIERUNGSLOS',
    description: 'Kein Wirtschaftsstudium oder kaum IB-Bezug, keine konkrete Deadline in Sicht.',
  },
];

export default function CategorySelect({
  currentStep,
  totalSteps,
  profile,
  updateProfile,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  const [selected, setSelected] = useState<EntryCategory | null>(profile.entryCategory);

  const handleNext = () => {
    if (!selected) return;
    updateProfile({ entryCategory: selected });
    onNext();
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} disabled={!selected} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
            Wo stehst du gerade?
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Wähl, was am besten passt — danach startest du direkt an der richtigen Stelle.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                className={[
                  'flex flex-col items-start gap-1.5 p-5 min-h-[44px] rounded-lg text-left transition-all duration-200',
                  isSelected
                    ? 'bg-is-accent-muted border border-is-accent'
                    : 'bg-is-bg-secondary border border-is-bg-border hover:bg-is-bg-tertiary hover:border-is-text-muted',
                ].join(' ')}
                aria-pressed={isSelected}
              >
                <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent tracking-wider">
                  {opt.number}
                </span>
                <span className="font-[family-name:var(--font-is-mono)] text-sm sm:text-base text-is-text-primary tracking-wider uppercase">
                  {opt.label}
                </span>
                <span className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary">
                  {opt.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
}
