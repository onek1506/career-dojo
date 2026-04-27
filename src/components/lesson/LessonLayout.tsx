'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { getSoundEnabled, setSoundEnabled } from '@/lib/sounds';

export interface LessonLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideNext?: boolean;
  children: ReactNode;
}

export default function LessonLayout({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextLabel = 'Weiter',
  nextDisabled = false,
  hideNext = false,
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
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      {/* Top-Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 border-b border-is-bg-border"
        style={{ background: 'var(--is-bg-primary)' }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück"
          className="p-2 -ml-2 text-is-text-secondary hover:text-is-text-primary transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 mx-4 max-w-md">
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Sound aus' : 'Sound an'}
            className="p-1 text-is-text-muted hover:text-is-text-primary transition-colors duration-200"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tabular-nums">
            {stepCounter}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-14 pb-28 sm:pb-32">
        <div className="max-w-2xl mx-auto px-6 py-8 sm:py-12 sm:flex sm:flex-col sm:justify-center sm:min-h-[calc(100vh-3.5rem-7rem)]">
          {children}
        </div>
      </main>

      {/* Bottom-CTA */}
      {!hideNext && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 pb-4 border-t border-is-bg-border"
          style={{ background: 'var(--is-bg-primary)', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <div className="max-w-2xl mx-auto">
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className={[
                'w-full py-4 rounded-lg font-semibold transition-all duration-200',
                'font-[family-name:var(--font-is-sans)]',
                nextDisabled
                  ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
                  : 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover',
              ].join(' ')}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
