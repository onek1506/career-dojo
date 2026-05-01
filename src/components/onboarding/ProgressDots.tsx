'use client';

interface ProgressDotsProps {
  total: number;
  current: number; // 1-based index of the active dot, 0 = none
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Fortschritt">
      {Array.from({ length: total }).map((_, i) => {
        const active = i < current;
        return (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
              active ? 'bg-[var(--accent-streak)]' : 'bg-[var(--border)]'
            }`}
          />
        );
      })}
    </div>
  );
}
