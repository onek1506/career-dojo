'use client';

import type { MarcusTestimonial } from '@/lib/profile/testimonials';

const MAX_VISIBLE = 5;

export default function MarcusTestimonials({ testimonials }: { testimonials: MarcusTestimonial[] }) {
  const sorted = [...testimonials].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const visible = sorted.slice(0, MAX_VISIBLE);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          MARCUS HART ÜBER DICH
        </span>
        {testimonials.length > 0 && (
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tabular-nums">
            {testimonials.length}
          </span>
        )}
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-is-bg-secondary rounded-xl p-5">
          <p className="font-[family-name:var(--font-is-sans)] italic text-sm text-is-text-muted">
            Schließe 1 Lektion ab. Marcus schreibt seine erste Einschätzung.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((t) => (
            <li
              key={t.date}
              className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-xl p-5 flex flex-col gap-2"
            >
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                Nach Lektion {t.milestone} · {formatDate(t.date)}
              </span>
              <p className="font-[family-name:var(--font-is-serif)] italic text-base text-is-text-primary leading-relaxed">
                {t.text}
              </p>
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                — Marcus Hart, Senior Coach
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}
