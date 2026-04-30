'use client';

import type { StreakStatus } from '@/lib/home/user-state';

interface StreakBarProps {
  days: number;
  status: StreakStatus;
  targetDays?: number;
}

export default function StreakBar({ days, status, targetDays = 30 }: StreakBarProps) {
  const filled = Math.min(days, targetDays);
  const missing = Math.max(0, targetDays - filled);

  const footnote =
    status === 'at_risk'
      ? { text: 'Heute noch keine Lektion.', color: 'text-is-error' }
      : status === 'broken'
        ? { text: 'Streak unterbrochen. Heute neu starten.', color: 'text-is-error' }
        : { text: 'Weiter so.', color: 'text-is-text-muted' };

  return (
    <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-gold uppercase tracking-wider flex items-center gap-1.5">
          <span aria-hidden>🔥</span> STREAK
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary tabular-nums">
          {days} / {targetDays} Tage
        </span>
      </div>

      <div className="grid grid-cols-[repeat(30,_1fr)] gap-1" aria-hidden>
        {Array.from({ length: filled }).map((_, i) => {
          const isCurrent = i === filled - 1 && status === 'active';
          return (
            <div
              key={`f-${i}`}
              className={['h-2 rounded-sm bg-is-gold', isCurrent ? 'animate-pulse' : ''].join(' ')}
            />
          );
        })}
        {Array.from({ length: missing }).map((_, i) => (
          <div key={`m-${i}`} className="h-2 rounded-sm bg-is-bg-border" />
        ))}
      </div>

      <p className={`font-[family-name:var(--font-is-mono)] text-xs ${footnote.color}`}>
        {footnote.text}
      </p>
    </section>
  );
}
