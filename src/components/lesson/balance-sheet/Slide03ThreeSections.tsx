'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { threeSections } from './data';
import type { SlideProps } from './types';

export default function Slide03ThreeSections({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Drei Sektionen, eine Gleichung.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Jede Bilanz besteht aus diesen drei Blöcken.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {threeSections.map((sec) => (
            <div
              key={sec.id}
              className={[
                'bg-is-bg-secondary border-l-2 rounded-r-lg p-4 flex flex-col gap-2',
                sec.borderColor,
              ].join(' ')}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className={['font-[family-name:var(--font-is-mono)] text-sm tracking-wider uppercase', sec.textColor].join(' ')}>
                  {sec.label}
                </span>
                <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                  {sec.labelDe}
                </span>
              </div>
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary italic">
                {sec.tag}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sec.examples.map((ex) => (
                  <span
                    key={ex}
                    className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-secondary bg-is-bg-tertiary border border-is-bg-border rounded px-2 py-0.5"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 sm:p-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-[family-name:var(--font-is-mono)] text-sm sm:text-base text-is-text-primary">
          <span>ASSETS</span>
          <span className="text-is-accent text-lg sm:text-xl">=</span>
          <span>LIABILITIES</span>
          <span className="text-is-text-muted">+</span>
          <span>SHAREHOLDERS&apos; EQUITY</span>
        </div>

        <MarcusNote
          tone={tone}
          body="Diese Gleichung ist unverletzlich. Immer. Wenn du ein Modell baust und sie nicht aufgeht, hast du einen Fehler. Diese einfache Wahrheit prüft jeder Banker täglich."
        />
      </div>
    </LessonLayout>
  );
}
