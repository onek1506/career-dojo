'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { getSoundEnabled, setSoundEnabled } from '@/lib/sounds';

export interface LessonLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  footer: ReactNode;
  sidePanel?: ReactNode;
  children: ReactNode;
}

export default function LessonLayout({
  currentStep,
  totalSteps,
  onBack,
  footer,
  sidePanel,
  children,
}: LessonLayoutProps) {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(getSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  const stepCounter = `${String(currentStep).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`;

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      {/* Top-Bar */}
      <header
        className="flex-shrink-0 h-12 sm:h-14 flex items-center justify-between px-3 sm:px-4 border-b border-is-bg-border"
        style={{ background: 'var(--is-bg-primary)' }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück"
          className="p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-is-text-secondary hover:text-is-text-primary transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 mx-3 sm:mx-4 max-w-md">
          <div className="h-[3px] rounded-full bg-is-bg-border overflow-hidden">
            <div
              className="h-full bg-is-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Sound aus' : 'Sound an'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-is-text-muted hover:text-is-text-primary transition-colors duration-200"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <span className="font-[family-name:var(--font-is-mono)] text-[11px] sm:text-xs text-is-text-muted tabular-nums">
            {stepCounter}
          </span>
        </div>
      </header>

      {/* Main + optional side panel */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
            {children}
          </div>
        </main>

        {sidePanel && (
          <aside
            className="hidden lg:flex w-72 flex-shrink-0 border-l border-is-bg-border flex-col overflow-y-auto"
            style={{ background: 'var(--is-bg-primary)' }}
          >
            {sidePanel}
          </aside>
        )}
      </div>

      {/* Footer (omitted when no CTA — e.g. Retention Hub) */}
      {footer && (
        <footer
          className="flex-shrink-0 border-t border-is-bg-border"
          style={{
            background: 'var(--is-bg-primary)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">{footer}</div>
        </footer>
      )}
    </div>
  );
}
