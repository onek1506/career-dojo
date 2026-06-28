'use client';

import { ArrowRight, Check } from 'lucide-react';
import LessonLayout from '../../LessonLayout';
import LessonFooterCTA from '../../LessonFooterCTA';
import MarcusNote from '../../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { rich } from '../rich';
import type { SummarySlide as SummarySlideData } from '../types';

interface Props {
  slide: SummarySlideData;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export default function SummarySlide({ slide, currentStep, totalSteps, onBack, onNext }: Props) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} label="Weiter" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5">
        {slide.eyebrow && (
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            {slide.eyebrow}
          </span>
        )}

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          {slide.heading}
        </h2>

        {slide.formula && (
          <div className="bg-is-accent-muted border border-is-accent rounded-lg p-4 sm:p-5 text-center">
            <code className="font-[family-name:var(--font-is-mono)] text-base sm:text-xl text-is-accent font-semibold break-words">
              {slide.formula}
            </code>
          </div>
        )}

        <ul className="flex flex-col gap-3">
          {slide.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-is-bg-secondary border border-is-bg-border rounded-lg p-3"
            >
              <Check size={16} className="text-is-success shrink-0 translate-y-[3px]" aria-hidden />
              <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-secondary leading-relaxed">
                {rich(point)}
              </span>
            </li>
          ))}
        </ul>

        {slide.marcus && (
          <MarcusNote tone="gentle" subject={slide.marcus.subject} body={slide.marcus.body} />
        )}
      </div>
    </LessonLayout>
  );
}
