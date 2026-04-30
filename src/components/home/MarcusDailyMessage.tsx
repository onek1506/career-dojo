'use client';

export default function MarcusDailyMessage({ message }: { message: string }) {
  return (
    <aside
      className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg px-4 py-3 flex flex-col gap-1"
      aria-label="Tägliche Nachricht von Marcus Hart"
    >
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
        Marcus Hart
      </span>
      <p className="font-[family-name:var(--font-is-serif)] italic text-base text-is-text-primary leading-relaxed">
        {message}
      </p>
    </aside>
  );
}
