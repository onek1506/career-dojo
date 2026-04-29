'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { lessonMeta, marcusTexts, learningOutcomes } from './data';
import type { SlideProps } from './types';

export default function Slide01Briefing({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} label="Briefing starten" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          {lessonMeta.module}
        </div>

        <h1 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-5xl font-medium text-is-text-primary leading-tight">
          {lessonMeta.title}
        </h1>

        <p className="font-[family-name:var(--font-is-sans)] text-base sm:text-lg text-is-text-secondary -mt-3">
          {lessonMeta.titleDe}
        </p>

        <MarcusNote tone={tone} subject="Re: CFS" body={marcusTexts.briefing[tone]} />

        <div className="grid grid-cols-3 gap-3 bg-is-bg-secondary border border-is-bg-border rounded-lg p-3 max-w-md">
          <Stat label="DAUER" value={`${lessonMeta.duration} MIN`} />
          <Stat label="XP" value={`+${lessonMeta.xp}`} />
          <Stat label="SCHWIERIG." value={'★'.repeat(lessonMeta.difficulty) + '☆'.repeat(5 - lessonMeta.difficulty)} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary">
            Was du nach dieser Lektion verstehst:
          </p>
          <ul className="flex flex-col gap-2">
            {learningOutcomes.map((outcome) => (
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
