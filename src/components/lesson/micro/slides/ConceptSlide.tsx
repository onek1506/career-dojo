'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../../LessonLayout';
import LessonFooterCTA from '../../LessonFooterCTA';
import MarcusNote from '../../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { rich } from '../rich';
import type { ConceptSlide as ConceptSlideData } from '../types';

interface Props {
  slide: ConceptSlideData;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export default function ConceptSlide({ slide, currentStep, totalSteps, onBack, onNext }: Props) {
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

        <div className="flex flex-col gap-3">
          {slide.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-is-sans)] text-base text-is-text-secondary leading-relaxed"
            >
              {rich(p)}
            </p>
          ))}
        </div>

        {slide.mono && (
          <pre className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 overflow-x-auto font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-primary leading-relaxed whitespace-pre">
            {slide.mono}
          </pre>
        )}

        {slide.marcus && (
          <MarcusNote tone="gentle" subject={slide.marcus.subject} body={slide.marcus.body} />
        )}
      </div>
    </LessonLayout>
  );
}
