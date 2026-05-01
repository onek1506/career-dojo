'use client';

import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';

export default function Screen01({ navigateTo }: ScreenProps) {
  return (
    <OnboardingShell
      step={0}
      footer={
        <button
          type="button"
          onClick={() => navigateTo(2)}
          className="w-full rounded bg-[var(--accent-streak)] px-5 py-4 text-base font-semibold text-black transition-colors hover:brightness-110"
        >
          Erzähl mir mehr →
        </button>
      }
    >
      <h1 className="font-[family-name:var(--font-instrument)] text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
        73% der IB-Bewerber scheitern am ersten Technical.
      </h1>
      <p className="mt-5 italic text-[var(--text-secondary)]">
        Nicht weil sie dumm sind. Weil sie falsch lernen.
      </p>
    </OnboardingShell>
  );
}
