'use client';

import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import type { OnboardingSlideProps } from '../types';

const OPTIONS = ['60 €', '100 €', '40 €'];
const CORRECT_INDEX = 0;

export default function EarlyWin({ currentStep, totalSteps, onBack, onNext }: OnboardingSlideProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = selected === CORRECT_INDEX;

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      showProgress={false}
      footer={
        checked ? (
          <LessonFooterCTA onClick={onNext} label="Weiter" />
        ) : (
          <LessonFooterCTA onClick={() => setChecked(true)} label="Antwort prüfen" disabled={selected === null} />
        )
      }
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
          Du verkaufst Kaffee für 100 €, Zutaten kosten 40 €. Was hast du verdient?
        </h2>

        <div className="flex flex-col gap-3">
          {OPTIONS.map((opt, i) => {
            const isSelected = selected === i;
            const showState = checked && isSelected;
            return (
              <button
                key={opt}
                type="button"
                disabled={checked}
                onClick={() => setSelected(i)}
                className={[
                  'flex items-center gap-3 p-4 min-h-[44px] rounded-lg text-left transition-all duration-200 font-[family-name:var(--font-is-mono)] text-base',
                  showState && i === CORRECT_INDEX
                    ? 'bg-is-accent-muted border border-is-accent text-is-text-primary'
                    : showState
                      ? 'border border-is-error text-is-text-primary'
                      : isSelected
                        ? 'bg-is-accent-muted border border-is-accent'
                        : 'bg-is-bg-secondary border border-is-bg-border hover:bg-is-bg-tertiary hover:border-is-text-muted',
                ].join(' ')}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {checked && (
          <MarcusNote
            subject={isCorrect ? 'Re: Genau richtig' : 'Re: Fast'}
            body={
              isCorrect
                ? 'Du denkst schon in den richtigen Bahnen. 100 € Umsatz minus 40 € Kosten — 60 € Gewinn. Genau dieser Unterschied zwischen Umsatz und Gewinn ist die Basis von allem, was noch kommt.'
                : 'Die richtige Antwort ist 60 €: 100 € Umsatz minus 40 € Kosten. Der Unterschied zwischen Umsatz und Gewinn ist die Basis von allem, was noch kommt — und den hast du damit gerade gesehen.'
            }
          />
        )}
      </div>
    </OnboardingLayout>
  );
}
