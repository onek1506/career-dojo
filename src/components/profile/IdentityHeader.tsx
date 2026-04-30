'use client';

interface IdentityHeaderProps {
  statusTitle: string;
  streakDays: number;
  totalXp: number;
  completedLessons: number;
}

export default function IdentityHeader({
  statusTitle,
  streakDays,
  totalXp,
  completedLessons,
}: IdentityHeaderProps) {
  const week = Math.max(1, Math.ceil(completedLessons / 3));
  const streakColor = streakDays === 0
    ? 'text-is-error'
    : streakDays >= 7
      ? 'text-is-gold'
      : 'text-is-text-primary';

  return (
    <header className="flex flex-col gap-1">
      <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        {statusTitle.toUpperCase()} · WOCHE {week} VON 12
      </p>
      <h1 className="font-[family-name:var(--font-is-serif)] text-4xl sm:text-5xl text-is-text-primary mt-1 leading-tight">
        {statusTitle}
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <Stat label="STREAK" value={streakDays} valueColor={streakColor} />
        <Stat label="GESAMT XP" value={totalXp} />
        <Stat label="LEKTIONEN" value={completedLessons} />
      </div>

      <div className="border-t border-is-bg-border mt-6" />
    </header>
  );
}

function Stat({ label, value, valueColor }: { label: string; value: number; valueColor?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={[
          'font-[family-name:var(--font-is-mono)] text-2xl sm:text-3xl tabular-nums',
          valueColor ?? 'text-is-text-primary',
        ].join(' ')}
      >
        {value}
      </span>
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
