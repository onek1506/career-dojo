'use client';

import { mockRetentionData } from './mockData';

export interface SidePanelProps {
  currentStep: number;
  totalSteps: number;
  sessionXp: number;
}

const SLIDE_LABELS = [
  '01 Briefing',
  '02 Bilanz vs. GuV',
  '03 Wasserfall',
  '04 Margen',
  '05 Formel',
  '06 Cheat Sheet',
  '07 Pro-Tipps',
  '08 Quiz',
  '09 Quiz',
  '10 EBITDA-Vorschau',
  '11 Zusammenfassung',
];

export default function SidePanel({ currentStep, totalSteps, sessionXp }: SidePanelProps) {
  const labels = SLIDE_LABELS.length === totalSteps ? SLIDE_LABELS : Array.from({ length: totalSteps }, (_, i) => `${String(i + 1).padStart(2, '0')}`);
  const { streak } = mockRetentionData;

  return (
    <div className="flex flex-col h-full p-5 gap-5">
      <div className="flex flex-col gap-1">
        <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
          Modul 01
        </span>
        <span className="font-[family-name:var(--font-is-serif)] text-lg text-is-text-primary leading-tight">
          Income Statement
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-3 flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-gold uppercase tracking-wider flex items-center gap-1.5">
            <span aria-hidden>🔥</span> STREAK
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-is-serif)] text-2xl text-is-text-primary">
              Tag {streak.current}
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
              / {streak.target}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: streak.target }).map((_, i) => (
              <div
                key={i}
                className={[
                  'flex-1 h-1.5 rounded-full',
                  i < streak.current ? 'bg-is-gold' : 'bg-is-bg-border',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-3 flex flex-col gap-1">
          <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
            Diese Session
          </span>
          <span className="font-[family-name:var(--font-is-mono)] text-2xl text-is-accent tabular-nums">
            +{sessionXp} XP
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
          Lesson-Map
        </span>
        <ol className="flex flex-col gap-1 overflow-y-auto">
          {labels.map((label, i) => {
            const status: 'done' | 'current' | 'upcoming' =
              i + 1 < currentStep ? 'done' : i + 1 === currentStep ? 'current' : 'upcoming';
            return (
              <li
                key={i}
                className={[
                  'flex items-center gap-2 px-2 py-1.5 rounded-md font-[family-name:var(--font-is-mono)] text-xs',
                  status === 'current'
                    ? 'bg-is-bg-secondary border border-is-accent text-is-text-primary'
                    : status === 'done'
                      ? 'text-is-text-secondary'
                      : 'text-is-text-muted',
                ].join(' ')}
              >
                <span
                  className={[
                    'inline-block w-1.5 h-1.5 rounded-full shrink-0',
                    status === 'current'
                      ? 'bg-is-accent'
                      : status === 'done'
                        ? 'bg-is-text-secondary'
                        : 'bg-is-bg-border',
                  ].join(' ')}
                />
                <span className="truncate">{label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
