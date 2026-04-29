'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import type { SlideProps } from './types';

const learningOutcomes = [
  'Verstehen, was eine GuV überhaupt zeigt',
  'Den Unterschied zwischen Brutto- und Nettogewinn kennen',
  'Wissen, wann man EBITDA hört (und warum es jeder nennt)',
];

export default function Slide01Briefing({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  sidePanel,
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
      sidePanel={sidePanel}
      footer={<LessonFooterCTA onClick={handleNext} label="Briefing starten" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          MODUL 01 · ACCOUNTING
        </div>

        <h1 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-5xl font-medium text-is-text-primary leading-tight">
          Income Statement
        </h1>

        <p className="font-[family-name:var(--font-is-sans)] text-base sm:text-lg text-is-text-secondary -mt-3">
          Gewinn- und Verlustrechnung (GuV)
        </p>

        <MarcusNote
          tone="gentle"
          subject="Re: Willkommen"
          body={
            <>
              Willkommen bei Lektion 1. Wir starten mit der GuV — dem ersten Bericht, den jeder IB-Analyst lesen muss. Ich gehe das Schritt für Schritt mit dir durch. Keine Vorkenntnisse nötig.
            </>
          }
        />

        <div className="grid grid-cols-3 gap-3 bg-is-bg-secondary border border-is-bg-border rounded-lg p-3">
          <Stat label="DAUER" value="6 MIN" />
          <Stat label="XP" value="+25" />
          <Stat label="SCHWIERIG." value="★☆☆☆☆" />
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
                <ArrowRight
                  size={14}
                  className="text-is-accent shrink-0 translate-y-[2px]"
                  aria-hidden
                />
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
