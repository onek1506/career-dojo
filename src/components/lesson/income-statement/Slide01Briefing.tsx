'use client';

import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import MarcusNote from '../MarcusNote';
import type { SlideProps } from './types';

const learningOutcomes = [
  'GuV von Top zu Bottom durchgehen',
  '4 Margen aus dem Kopf berechnen',
  'EBITDA vs. EBIT in 10 Sekunden erklären',
];

export default function Slide01Briefing({ onCanProceed }: SlideProps) {
  useEffect(() => {
    onCanProceed?.(true);
  }, [onCanProceed]);

  return (
    <div className="flex flex-col gap-6">
      <div className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
        MODUL 01 · ACCOUNTING
      </div>

      <h1 className="font-[family-name:var(--font-is-serif)] text-5xl font-medium text-is-text-primary leading-tight">
        Income Statement
      </h1>

      <p className="font-[family-name:var(--font-is-sans)] text-lg text-is-text-secondary -mt-3">
        Gewinn- und Verlustrechnung (GuV)
      </p>

      <MarcusNote
        subject="Re: Your first session"
        body={
          <>
            Diese Lektion deckt 8 von 12 GuV-Fragen ab, die in 90% aller Spring-Week- und Summer-Internship-Interviews vorkommen. Mach sie ordentlich — beim zweiten Mal mit Live-Interviewer ist es zu spät.
          </>
        }
      />

      <div className="grid grid-cols-3 gap-4 bg-is-bg-secondary border border-is-bg-border rounded-lg p-4">
        <Stat label="DAUER" value="8 MIN" />
        <Stat label="XP" value="+55" />
        <Stat label="SCHWIERIG." value="★☆☆☆☆" />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary">
          Was du nach dieser Lektion können wirst:
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
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
        {label}
      </span>
      <span className="font-[family-name:var(--font-is-mono)] text-2xl text-is-text-primary tabular-nums">
        {value}
      </span>
    </div>
  );
}
