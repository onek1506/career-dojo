'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film } from 'lucide-react';
import MarcusNote from '../MarcusNote';
import type { SlideProps } from './types';

type State = 'idle' | 'correct' | 'wrong';

export default function Slide02BalanceVsIS({ onCanProceed }: SlideProps) {
  const [state, setState] = useState<State>('idle');

  useEffect(() => {
    onCanProceed?.(state !== 'idle');
  }, [state, onCanProceed]);

  const onPick = (choice: 'balance' | 'income') => {
    if (state !== 'idle') return;
    setState(choice === 'income' ? 'correct' : 'wrong');
  };

  const showFeedback = state !== 'idle';
  const balanceMarkedWrong = state === 'wrong';
  const incomeMarkedRight = showFeedback;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-is-serif)] text-4xl font-medium text-is-text-primary leading-tight">
          Bilanz oder GuV?
        </h2>
        <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
          Tippe an, was einen Zeitraum zeigt.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Card
          icon={<Camera size={32} className="text-is-text-muted" aria-hidden />}
          title="Bilanz"
          subtitle="Stichtag · 31.12.2024"
          onClick={() => onPick('balance')}
          state={
            !showFeedback
              ? 'idle'
              : balanceMarkedWrong
                ? 'wrong'
                : 'neutral-wrong'
          }
        />
        <Card
          icon={<Film size={32} className="text-is-text-muted" aria-hidden />}
          title="GuV"
          subtitle="Zeitraum · Q1–Q4 2024"
          onClick={() => onPick('income')}
          state={!showFeedback ? 'idle' : incomeMarkedRight ? 'correct' : 'idle'}
        />
      </div>

      <AnimatePresence>
        {state === 'correct' && (
          <motion.div
            key="correct"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <MarcusNote
              body={
                <>
                  Korrekt. GuV = Film über einen Zeitraum. Bilanz = Foto an einem Stichtag. Wer das verwechselt, fliegt im First Round.
                </>
              }
            />
          </motion.div>
        )}
        {state === 'wrong' && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <MarcusNote
              subject="Re: Korrektur"
              body={
                <>
                  Andersrum. Die <strong className="not-italic">GuV</strong> zeigt einen Zeitraum (Film), die Bilanz einen Stichtag (Foto). Merk dir: Income <em>Statement</em> = Story über Zeit. Balance <em>Sheet</em> = Snapshot.
                </>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type CardState = 'idle' | 'correct' | 'wrong' | 'neutral-wrong';

function Card({
  icon,
  title,
  subtitle,
  onClick,
  state,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  state: CardState;
}) {
  const styles =
    state === 'correct'
      ? 'border-is-accent shadow-[0_0_24px_rgba(255,107,0,0.3)]'
      : state === 'wrong'
        ? 'border-is-error animate-[is-pulse-error_0.4s_ease-out]'
        : state === 'neutral-wrong'
          ? 'border-is-error/60 opacity-60'
          : 'border-is-bg-border hover:bg-is-bg-tertiary hover:border-is-text-muted';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state !== 'idle'}
      className={[
        'flex flex-col items-start justify-between min-h-[180px] sm:min-h-[200px]',
        'bg-is-bg-secondary border rounded-xl p-5 sm:p-6 text-left cursor-pointer',
        'transition-all duration-200 ease-out',
        state === 'idle' ? 'cursor-pointer' : 'cursor-default',
        styles,
      ].join(' ')}
      aria-pressed={state === 'correct'}
    >
      <div>{icon}</div>
      <div className="flex flex-col gap-1">
        <span className="font-[family-name:var(--font-is-serif)] text-2xl text-is-text-primary">
          {title}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          {subtitle}
        </span>
      </div>
    </button>
  );
}
