'use client';

interface TotalStatsRowProps {
  streak: number;
  completedLessons: number;
  totalXp: number;
}

export default function TotalStatsRow({ streak, completedLessons, totalXp }: TotalStatsRowProps) {
  const stats = [
    { label: 'STREAK TAGE', value: streak },
    { label: 'LEKTIONEN', value: completedLessons },
    { label: 'GESAMT XP', value: totalXp },
  ];
  return (
    <section className="grid grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <span className="font-[family-name:var(--font-is-mono)] text-3xl sm:text-4xl text-is-text-primary tabular-nums">
            {s.value}
          </span>
          <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-widest">
            {s.label}
          </span>
        </div>
      ))}
    </section>
  );
}
