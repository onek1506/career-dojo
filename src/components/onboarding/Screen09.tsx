'use client';

import ChoiceCard from './ChoiceCard';
import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';
import { getLernzeitMeta, type OnboardingLernzeit } from '@/lib/onboarding/state';

interface LernzeitOption {
  value: OnboardingLernzeit;
  label: string;
  range: string;
}

const OPTIONS: LernzeitOption[] = [
  { value: 'morgens', label: 'Morgens vor der Uni', range: '7:00–9:00' },
  { value: 'mittag', label: 'In der Mittagspause', range: '12:00–13:00' },
  { value: 'abends', label: 'Abends nach dem Tag', range: '20:00–22:00' },
  { value: 'flexibel', label: 'Anders / wechselt', range: '' },
];

export default function Screen09({ state, update, navigateTo, complete }: ScreenProps) {
  const ready = state.lernzeit !== null;
  const meta = getLernzeitMeta(state.lernzeit);
  const reminder = meta?.reminder
    ? `Wir erinnern dich täglich um ${meta.reminder}.`
    : state.lernzeit
      ? 'Wir erinnern dich täglich.'
      : '';

  return (
    <OnboardingShell
      step={8}
      showBack
      onBack={() => navigateTo(8)}
      footer={
        <>
          <button
            type="button"
            disabled={!ready}
            onClick={() => navigateTo(10)}
            className={`w-full rounded px-5 py-4 text-base font-semibold transition-colors ${
              ready
                ? 'bg-[var(--accent-streak)] text-black hover:brightness-110'
                : 'cursor-not-allowed bg-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            Weiter →
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
      <p className="text-sm italic text-[var(--text-secondary)]">
        Eine Lektion täglich. Das ist die einzige Regel.
      </p>

      <h2 className="mt-6 font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,2.5rem)] leading-tight tracking-tight text-[var(--text-primary)]">
        Wann lernst du am besten?
      </h2>
      <p className="mt-3 text-[var(--text-secondary)]">
        Damit ich dich genau dann erinnere — nicht öfter.
      </p>

      <div className="mt-7 flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt.value}
            selected={state.lernzeit === opt.value}
            onClick={() => update({ lernzeit: opt.value })}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[0.95rem] font-semibold text-[var(--text-primary)]">{opt.label}</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[var(--accent-streak)]">
                {opt.range}
              </span>
            </div>
          </ChoiceCard>
        ))}
      </div>

      <p
        className={`mt-5 min-h-[1.4em] text-sm text-[var(--accent-streak)] transition-opacity duration-200 ${
          reminder ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {reminder}
      </p>
    </OnboardingShell>
  );
}
