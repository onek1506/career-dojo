'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../../LessonLayout';
import LessonFooterCTA from '../../LessonFooterCTA';
import MarcusNote from '../../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { rich } from '../rich';
import type { HookSlide as HookSlideData } from '../types';

interface Props {
  slide: HookSlideData;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export default function HookSlide({ slide, currentStep, totalSteps, onBack, onNext }: Props) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} label="Los geht's" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          {slide.module}
        </div>

        <h1 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-5xl font-medium text-is-text-primary leading-tight">
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p className="font-[family-name:var(--font-is-sans)] text-base sm:text-lg text-is-text-secondary -mt-3">
            {slide.subtitle}
          </p>
        )}

        <MarcusNote tone="gentle" subject={slide.marcus.subject} body={rich(slide.marcus.body)} />
      </div>
    </LessonLayout>
  );
}
