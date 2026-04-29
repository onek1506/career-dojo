'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { equityComponents } from './data';
import type { SlideProps } from './types';

export default function Slide06ShareholdersEquity({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  tone,
}: SlideProps) {
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
            Shareholders&apos; Equity im Detail
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Vier Komponenten, eine wirklich wichtige.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {equityComponents.map((c) => (
            <li
              key={c.label}
              className={[
                'bg-is-bg-secondary border rounded-lg p-4 flex flex-col gap-2',
                c.highlight ? 'border-is-accent' : 'border-is-bg-border',
              ].join(' ')}
            >
              <span
                className={[
                  'font-[family-name:var(--font-is-mono)] text-sm tracking-wider',
                  c.highlight ? 'text-is-accent' : 'text-is-text-primary',
                ].join(' ')}
              >
                {c.label}
              </span>
              {c.formula && (
                <pre className="font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-secondary bg-is-bg-tertiary border border-is-bg-border rounded-md px-3 py-2 whitespace-pre-wrap">
                  {c.formula}
                </pre>
              )}
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                {c.description}
              </p>
            </li>
          ))}
        </ul>

        <MarcusNote
          tone={tone}
          body="Im Interview reicht es fast immer: Retained Earnings ist der wichtigste Posten im Equity. Er verlinkt Bilanz und GuV. Wenn du das verstehst, verstehst du 80% aller Bilanzfragen."
        />
      </div>
    </LessonLayout>
  );
}
