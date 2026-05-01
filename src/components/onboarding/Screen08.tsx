'use client';

import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';
import {
  getProfilLabel,
  getWissensstand,
  getZielinterview,
} from '@/lib/onboarding/state';

interface DiagnosisRow {
  label: string;
  value: string;
  accent?: boolean;
  large?: boolean;
}

export default function Screen08({ state, navigateTo, complete }: ScreenProps) {
  const rows: DiagnosisRow[] = [
    { label: 'PROFIL', value: getProfilLabel(state.profil), accent: true },
    { label: 'ZIELINTERVIEW', value: getZielinterview(state.motivation) },
    { label: 'WISSENSSTAND', value: getWissensstand(state.quiz1, state.quiz2, state.quiz3) },
    { label: 'EMPFOHLENE LEKTIONEN', value: '22', accent: true, large: true },
  ];

  return (
    <OnboardingShell
      step={7}
      showBack
      onBack={() => navigateTo(7)}
      footer={
        <>
          <button
            type="button"
            onClick={() => navigateTo(9)}
            className="w-full rounded bg-[var(--accent-streak)] px-5 py-4 text-base font-semibold text-black transition-colors hover:brightness-110"
          >
            Plan annehmen →
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
        Deine Einschätzung.
      </h2>

      <div className="mt-7 rounded border border-[var(--border)] bg-[var(--bg-card)] px-6">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`onboarding-row flex items-baseline justify-between gap-4 py-3.5 ${
              idx < rows.length - 1 ? 'border-b border-[var(--border)]' : ''
            }`}
            style={{ animationDelay: `${idx * 300}ms` }}
          >
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              {row.label}
            </span>
            <span
              className={`text-right ${row.accent ? 'text-[var(--accent-streak)]' : 'text-[var(--text-primary)]'} ${
                row.large
                  ? 'font-[family-name:var(--font-instrument)] text-2xl font-semibold'
                  : 'text-[0.95rem] font-medium'
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded border border-[var(--border)] bg-[var(--bg-card)] px-6 py-4">
        <div className="flex items-baseline justify-between border-b border-[var(--border)] py-2 text-[var(--text-primary)]">
          <span>Tägliche Übungszeit</span>
          <span>45 Min</span>
        </div>
        <div className="flex items-baseline justify-between border-b border-[var(--border)] py-2">
          <span className="text-[var(--text-primary)]">Lektionen bis Interview-ready</span>
          <span className="font-[family-name:var(--font-instrument)] text-lg font-semibold text-[var(--accent-streak)]">
            22
          </span>
        </div>
        <div className="flex items-baseline justify-between py-2">
          <span className="text-[var(--text-primary)]">Erste Lektion</span>
          <span className="font-semibold text-[var(--accent-streak)]">Income Statement</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--border)] font-[family-name:var(--font-jetbrains)] text-[0.65rem] text-[var(--accent-streak)]">
          MH
        </div>
        <span className="text-sm italic leading-snug text-[var(--text-secondary)]">
          Das ist kein Standard-Plan. Er ist auf deinen Stand zugeschnitten — folge ihm täglich.
        </span>
      </div>
    </OnboardingShell>
  );
}
