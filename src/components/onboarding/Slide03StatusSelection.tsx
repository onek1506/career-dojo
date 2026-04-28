'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type { UserStatus } from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from './types';

interface StatusOption {
  id: UserStatus;
  number: string;
  label: string;
  description: string;
}

const OPTIONS: StatusOption[] = [
  {
    id: 'explorer',
    number: '01',
    label: 'ENTDECKER',
    description: 'Ich überlege noch, ob IB überhaupt mein Ding ist.',
  },
  {
    id: 'starter',
    number: '02',
    label: 'EINSTEIGER',
    description: 'Ich weiß, dass ich es will — aber ich habe noch keine Ahnung, wo ich anfangen soll.',
  },
  {
    id: 'applicant',
    number: '03',
    label: 'BEWERBER',
    description: 'Ich bewerbe mich aktiv — Spring Week, Summer, oder Off-Cycle.',
  },
  {
    id: 'pro',
    number: '04',
    label: 'PROFI',
    description: 'Ich habe schon Praktikum-Erfahrung und drille gezielt für nächste Interviews.',
  },
];

export default function Slide03StatusSelection({
  currentStep,
  totalSteps,
  profile,
  updateProfile,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  const [selected, setSelected] = useState<UserStatus | null>(profile.status);

  const handleNext = () => {
    if (!selected) return;
    updateProfile({ status: selected });
    onNext();
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={
        <LessonFooterCTA
          onClick={handleNext}
          disabled={!selected}
          icon={<ArrowRight size={16} />}
        />
      }
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
            Wo stehst du gerade?
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Sei ehrlich — das hilft mir, dich richtig einzuschätzen.
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
