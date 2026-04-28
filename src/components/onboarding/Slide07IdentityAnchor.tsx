'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type { LearningTime } from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from './types';

interface Option {
  id: LearningTime;
  label: string;
  hint: string;
}

const OPTIONS: Option[] = [
  { id: 'morning', label: 'Morgens vor der Uni', hint: '7:00–9:00' },
  { id: 'lunch', label: 'In der Mittagspause', hint: '12:00–13:00' },
  { id: 'evening', label: 'Abends nach dem Tag', hint: '20:00–22:00' },
  { id: 'flexible', label: 'Anders / wechselt', hint: '' },
];

export default function Slide07IdentityAnchor({
  currentStep,
  totalSteps,
  profile,
  updateProfile,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  const [selected, setSelected] = useState<LearningTime | null>(profile.learningTime);

  const handleNext = () => {
    if (!selected) return;
    updateProfile({ learningTime: selected });
    onNext();
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} disabled={!selected} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-2xl text-is-text-secondary">
          Eine Sache noch.
        </h2>

        <div className="flex flex-col gap-3">
          <blockquote className="font-[family-name:var(--font-is-serif)] text-xl sm:text-2xl text-is-text-primary leading-snug">
            &bdquo;Du wirst täglich eine Lektion machen. Nicht zwei, nicht drei. Eine. Manche Tage 5 Minuten, manche 30. Aber jeden Tag. Das ist die einzige Regel.&ldquo;
          </blockquote>
          <p className="font-[family-name:var(--font-is-serif)] italic text-base sm:text-lg text-is-text-secondary">
            Wer das durchzieht, schafft 90% der Konkurrenz — allein durch Konsequenz.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div>
            <h3 className="font-[family-name:var(--font-is-serif)] text-lg sm:text-xl text-is-text-primary">
              Wann lernst du am besten?
            </h3>
            <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-muted mt-1">
              Damit ich dich genau dann erinnere — nicht öfter.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {OPTIONS.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={[
                    'min-h-[44px] flex items-center justify-between gap-3 px-4 py-3 rounded-md text-left transition-all duration-200',
                    isSelected
                      ? 'border border-is-accent bg-is-accent-muted'
                      : 'border border-is-bg-border bg-is-bg-secondary hover:bg-is-bg-tertiary',
                  ].join(' ')}
                  aria-pressed={isSelected}
                >
                  <span className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary">
                    {opt.label}
                  </span>
                  {opt.hint && (
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                      {opt.hint}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
