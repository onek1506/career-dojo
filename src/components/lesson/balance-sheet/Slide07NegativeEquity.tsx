'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { negativeEquityScenarios } from './data';
import type { SlideProps } from './types';

export default function Slide07NegativeEquity({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
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
        <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
          Kann Shareholders&apos; Equity negativ sein?
        </h2>
        <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
          Ja — in zwei Szenarien.
        </p>

        <ul className="flex flex-col gap-3">
          {negativeEquityScenarios.map((s) => (
            <li
              key={s.number}
              className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg p-4 flex flex-col gap-1"
            >
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent tracking-wider">
                {s.number}
              </span>
              <span className="font-[family-name:var(--font-is-mono)] text-sm uppercase tracking-wider text-is-text-primary">
                {s.title}
              </span>
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ul>

        <MarcusNote
          tone={tone}
          body="Im Interview: Siehst du negatives Shareholders' Equity, frage zuerst: War da ein LBO? Dann ist es normal. Wenn nicht — dann ist das ein Warnsignal, das du erklären können musst."
        />
      </div>
    </LessonLayout>
  );
}
