'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playRevealSound } from '@/lib/sounds';
import type { SlideProps } from './types';

type State = 'idle' | 'correct' | 'wrong';

export default function Slide02BalanceVsIS({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  sidePanel,
}: SlideProps) {
  const [state, setState] = useState<State>('idle');

  const onPick = (choice: 'balance' | 'income') => {
    if (state !== 'idle') return;
    const correct = choice === 'income';
    if (correct) {
      playCorrectSound();
      setState('correct');
    } else {
      playWrongSound();
      setState('wrong');
      // After a short delay, also reveal the right answer
      window.setTimeout(() => playRevealSound(), 250);
    }
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const showFeedback = state !== 'idle';
  const balanceMarkedWrong = state === 'wrong';
  const incomeMarkedRight = showFeedback;

  const footer = (
    <LessonFooterCTA
      onClick={handleNext}
      label="Weiter"
      disabled={state === 'idle'}
      icon={<ArrowRight size={16} />}
    />
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} sidePanel={sidePanel} footer={footer}>
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Bilanz oder GuV?
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Tippe an, was einen Zeitraum zeigt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Card
            icon={<Camera size={28} className="text-is-text-muted" aria-hidden />}
            title="Bilanz"
            subtitle="Stichtag · 31.12.2024"
            onClick={() => onPick('balance')}
            state={
              !showFeedback ? 'idle' : balanceMarkedWrong ? 'wrong' : 'neutral-wrong'
            }
          />
          <Card
            icon={<Film size={28} className="text-is-text-muted" aria-hidden />}
            title="GuV"
            subtitle="Gewinn- und Verlustrechnung · Q1–Q4 2024"
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
                tone="gentle"
                body={
                  <>
                    Genau. Eine GuV erzählt eine Geschichte über einen Zeitraum — wie ein Film. Eine Bilanz zeigt einen einzigen Moment — wie ein Foto. Diese Unterscheidung ist der wichtigste erste Schritt.
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
                tone="gentle"
                subject="Re: Kein Stress"
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
    </LessonLayout>
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
        'flex sm:flex-col items-center sm:items-start justify-between sm:justify-between min-h-[120px] sm:min-h-[180px] gap-4 sm:gap-0',
        'bg-is-bg-secondary border rounded-xl p-4 sm:p-6 text-left',
        'transition-all duration-200 ease-out',
        state === 'idle' ? 'cursor-pointer' : 'cursor-default',
        styles,
      ].join(' ')}
      aria-pressed={state === 'correct'}
    >
      <div className="shrink-0 sm:mb-2">{icon}</div>
      <div className="flex flex-col gap-1 flex-1 sm:flex-none">
        <span className="font-[family-name:var(--font-is-serif)] text-xl sm:text-2xl text-is-text-primary">
          {title}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          {subtitle}
        </span>
      </div>
    </button>
  );
}
