'use client';

import type { ReactNode } from 'react';
import ProgressDots from './ProgressDots';

interface OnboardingShellProps {
  /** 1-based active dot. 0 = no dot active (used on Screen 1). */
  step: number;
  /** Number of progress dots in the indicator. Defaults to 9. */
  totalDots?: number;
  showBack?: boolean;
  onBack?: () => void;
  children: ReactNode;
  /** Sticky CTA / footer content (button(s) + optional text link). */
  footer?: ReactNode;
}

export default function OnboardingShell({
  step,
  totalDots = 9,
  showBack = false,
  onBack,
  children,
  footer,
}: OnboardingShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center px-6 pt-6 pb-4">
        <div className="justify-self-start">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Zurück"
              className="text-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              ←
            </button>
          ) : null}
        </div>
        <div className="justify-self-center">
          <ProgressDots total={totalDots} current={step} />
        </div>
        <div className="justify-self-end">
          <span className="font-[family-name:var(--font-instrument)] text-sm text-[var(--text-secondary)]">
            CareerDojo
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-8">
        <div className="w-full max-w-[680px]">{children}</div>
      </main>

      {footer ? (
        <footer className="px-6 pb-8">
          <div className="mx-auto w-full max-w-[680px]">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
