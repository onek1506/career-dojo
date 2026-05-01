'use client';

import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';

export default function Screen10({ navigateTo, complete }: ScreenProps) {
  return (
    <OnboardingShell
      step={9}
      showBack
      onBack={() => navigateTo(9)}
      footer={
        <>
          <button
            type="button"
            onClick={() => navigateTo(11)}
            className="w-full rounded bg-[var(--accent-streak)] px-5 py-4 text-base font-semibold text-black transition-colors hover:brightness-110"
          >
            Bin dabei →
          </button>
          <button
            type="button"
            onClick={complete}
            className="mt-3 block w-full text-center text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Direkt starten
          </button>
        </>
      }
    >
      <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,2.5rem)] leading-tight tracking-tight text-[var(--text-primary)]">
        Eine letzte Sache: Streaks.
      </h2>

      <div className="mt-9 mb-8 flex justify-center gap-3 text-3xl sm:gap-4 md:text-4xl" aria-hidden="true">
        <span className="onboarding-flame-glow">🔥</span>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="opacity-20">🔥</span>
        ))}
      </div>

      <p className="text-base leading-relaxed text-[var(--text-primary)]">
        Dein Streak startet heute. Jeden Tag, an dem du eine Lektion abschließt, wächst er.
      </p>

      <blockquote className="mt-6 border-l-2 border-[var(--accent-streak)] pl-4 text-[0.95rem] italic leading-snug text-[var(--text-secondary)]">
        7 Tage in Folge. Das ist dein erstes Ziel.
      </blockquote>
    </OnboardingShell>
  );
}
