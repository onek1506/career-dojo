'use client';

export default function InterviewCountdown({ days }: { days: number }) {
  const isClose = days <= 14;
  const isImmediate = days <= 7;

  const numberClass = isClose ? 'text-is-error' : 'text-is-text-primary';
  const containerClass = isImmediate
    ? 'border-is-error'
    : 'border-is-bg-border';

  return (
    <section
      className={[
        'bg-is-bg-secondary border rounded-xl px-5 py-4 flex items-center justify-between gap-4',
        containerClass,
      ].join(' ')}
    >
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        Nächstes Interview
      </span>
      <div className="flex items-baseline gap-1.5 tabular-nums">
        <span className={`font-[family-name:var(--font-is-mono)] text-3xl ${numberClass}`}>
          {days}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary">
          {days === 1 ? 'Tag' : 'Tage'}
        </span>
      </div>
    </section>
  );
}
