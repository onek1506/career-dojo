'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../../LessonLayout';
import LessonFooterCTA from '../../LessonFooterCTA';
import MarcusNote from '../../MarcusNote';
import { playClickSound } from '@/lib/sounds';
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

        <MarcusNote tone="gentle" subject={slide.marcus.subject} body={slide.marcus.body} />

        <div className="grid grid-cols-3 gap-3 bg-is-bg-secondary border border-is-bg-border rounded-lg p-3 max-w-md">
          <Stat label="DAUER" value={slide.stats.duration} />
          <Stat label="XP" value={slide.stats.xp} />
          <Stat label="SCHWIERIG." value={slide.stats.difficulty} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary">
            Was du nach dieser Lektion verstehst:
          </p>
          <ul className="flex flex-col gap-2">
            {slide.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-baseline gap-3 font-[family-name:var(--font-is-sans)] text-is-text-primary"
              >
                <ArrowRight size={14} className="text-is-accent shrink-0 translate-y-[2px]" aria-hidden />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LessonLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-widest">
        {label}
      </span>
      <span className="font-[family-name:var(--font-is-mono)] text-xl text-is-text-primary tabular-nums">
        {value}
      </span>
    </div>
  );
}
