'use client';

import type { XpEntry } from '@/lib/stats/stats-utils';

const SLOTS = 7;

export default function XpProgressCard({ history }: { history: XpEntry[] }) {
  if (history.length < 3) {
    return (
      <section className="flex flex-col gap-3">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          XP VERLAUF
        </span>
        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5">
          <p className="font-[family-name:var(--font-is-sans)] italic text-sm text-is-text-muted">
            Noch zu wenig Daten. Mach mehr Lektionen.
          </p>
        </div>
      </section>
    );
  }

  const recent = history.slice(-SLOTS);
  const padded: (XpEntry | null)[] = [
    ...Array.from({ length: Math.max(0, SLOTS - recent.length) }, () => null),
    ...recent,
  ];
  const maxXp = Math.max(...recent.map((e) => e.xp), 1);

  return (
    <section className="flex flex-col gap-3">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        XP VERLAUF
      </span>
      <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-4 flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-2 items-end h-24">
          {padded.map((entry, i) => {
            if (!entry) {
              return <div key={i} className="h-full flex items-end"><div className="w-full h-2 bg-is-bg-border rounded-sm" /></div>;
            }
            const heightPct = (entry.xp / maxXp) * 100;
            return (
              <div key={i} className="h-full flex items-end">
                <div
                  className="w-full bg-is-accent rounded-sm"
                  style={{ height: `${Math.max(8, heightPct)}%` }}
                  title={`${entry.lessonTitle} · +${entry.xp} XP`}
                />
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {padded.map((entry, i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-is-mono)] text-[9px] text-is-text-muted text-center truncate"
            >
              {entry ? abbrev(entry.lessonTitle) : '—'}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function abbrev(title: string): string {
  return title
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 4)
    .toUpperCase();
}
