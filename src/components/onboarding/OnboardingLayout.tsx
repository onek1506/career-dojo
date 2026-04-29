'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  showProgress?: boolean;
  footer: ReactNode;
  children: ReactNode;
}

export default function OnboardingLayout({
  currentStep,
  totalSteps,
  onBack,
  showProgress = true,
  footer,
  children,
}: OnboardingLayoutProps) {
  const router = useRouter();
  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <header
        className="flex-shrink-0 h-12 relative flex items-center px-4 sm:px-6"
        style={{ background: 'var(--is-bg-primary)' }}
      >
        <div className="min-w-[44px]">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Zurück"
              className="p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-is-text-secondary hover:text-is-text-primary transition-colors duration-200"
            >
              <ArrowLeft size={18} />
            </button>
          )}
        </div>

        {showProgress && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <ProgressDots currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        <button
          type="button"
          onClick={() => router.push('/skill-tree')}
          className="ml-auto font-[family-name:var(--font-is-mono)] text-[11px] sm:text-xs text-is-text-muted hover:text-is-text-primary transition-colors duration-200 px-2 -mr-2 min-h-[44px] flex items-center"
        >
          Überspringen
        </button>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-16">
          {children}
        </div>
      </main>

      {footer && (
        <footer
          className="flex-shrink-0"
          style={{
            background: 'var(--is-bg-primary)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="max-w-xl mx-auto px-4 sm:px-6 py-3 sm:py-4">{footer}</div>
        </footer>
      )}
    </div>
  );
}

function ProgressDots({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepIndex = i + 1;
        const status: 'done' | 'current' | 'upcoming' =
          stepIndex < currentStep ? 'done' : stepIndex === currentStep ? 'current' : 'upcoming';
        return (
          <span
            key={i}
            aria-hidden
            className={[
              'inline-block w-2 h-2 rounded-full transition-colors duration-200',
              status === 'current'
                ? 'bg-is-accent'
                : status === 'done'
                  ? 'bg-is-text-muted'
                  : 'bg-is-bg-border',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}
