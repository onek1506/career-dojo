'use client';

import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type { OnboardingSlideProps } from './types';

export default function Slide09FirstLessonHook({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={onNext} label="Lektion starten" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-6 sm:gap-8 text-center sm:text-left">
        <h2 className="font-[family-name:var(--font-is-serif)] text-4xl sm:text-5xl text-is-text-primary leading-tight text-center">
          Bereit?
        </h2>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 mt-4 flex flex-col gap-4 text-left">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            Deine erste Lektion
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary leading-tight">
              Income Statement
            </h3>
            <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
              Gewinn- und Verlustrechnung
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-is-bg-border">
            <Stat label="DAUER" value="6 MIN" />
            <Stat label="SCHWIERIG." value="★☆☆☆☆" />
            <Stat label="XP" value="+25" accent />
          </div>
        </div>

        <blockquote className="font-[family-name:var(--font-is-serif)] italic text-base sm:text-lg text-is-text-secondary text-center mt-2">
          &bdquo;Sechs Minuten. Eine Lektion. Dann hast du Tag 1 deines Streaks. Los.&ldquo;
        </blockquote>
      </div>
    </OnboardingLayout>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-widest">
        {label}
      </span>
      <span
        className={[
          'font-[family-name:var(--font-is-mono)] text-xl sm:text-2xl tabular-nums',
          accent ? 'text-is-accent' : 'text-is-text-primary',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}
