'use client';

import type { TopicPerformance } from '@/lib/stats/stats-utils';

interface Props {
  topics: TopicPerformance[];
}

export default function StrengthsWeaknessMatrix({ topics }: Props) {
  const tested = topics.filter((t) => t.status !== 'untested');
  // Sort weakest first so the user sees what to fix.
  const sorted = [...tested].sort((a, b) => a.score - b.score);
  const visible = sorted.slice(0, 5);

  return (
    <section className="flex flex-col gap-3">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        STÄRKEN &amp; SCHWÄCHEN
      </span>
      {tested.length === 0 ? (
        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5">
          <p className="font-[family-name:var(--font-is-sans)] italic text-sm text-is-text-muted">
            Mach mehr Lektionen, um Daten zu sehen.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5 bg-is-bg-secondary border border-is-bg-border rounded-xl p-4">
          {visible.map((t) => {
            const isStrong = t.status === 'strong';
            const barColor = isStrong ? 'bg-is-success' : 'bg-is-error';
            const textColor = isStrong ? 'text-is-success' : 'text-is-error';
            return (
              <li key={t.topic} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
                <span className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary truncate">
                  {t.topic}
                </span>
                <div className="w-[80px] sm:w-[120px] h-1 bg-is-bg-border rounded-full overflow-hidden">
                  <div
                    className={`${barColor} h-full rounded-full`}
                    style={{ width: `${Math.min(100, t.score)}%` }}
                  />
                </div>
                <span className={`font-[family-name:var(--font-is-mono)] text-xs tabular-nums ${textColor}`}>
                  {t.score}%
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {sorted.length > 5 && (
        <span className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted">
          + {sorted.length - 5} weitere
        </span>
      )}
    </section>
  );
}
