'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound } from '@/lib/sounds';
import type { SlideProps } from './types';

type State = 'idle' | 'correct' | 'wrong';

export default function Slide02RecapTapReveal({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const [state, setState] = useState<State>('idle');

  const onPick = (choice: 'guv' | 'bilanz') => {
    if (state !== 'idle') return;
    if (choice === 'bilanz') {
      playCorrectSound();
      setState('correct');
    } else {
      playWrongSound();
      setState('wrong');
    }
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const showFeedback = state !== 'idle';

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={
        <LessonFooterCTA
          onClick={handleNext}
          disabled={state === 'idle'}
          icon={<ArrowRight size={16} />}
        />
      }
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Bilanz oder GuV?
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Tippe den Bericht an, der einen Stichtag zeigt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Card
            icon={<Film size={28} aria-hidden />}
            title="GuV"
            subtitle="Zeitraum · Q1–Q4 2024"
            onClick={() => onPick('guv')}
            state={!showFeedback ? 'idle' : state === 'wrong' ? 'wrong' : 'neutral-wrong'}
          />
          <Card
            icon={<Camera size={28} aria-hidden />}
            title="Bilanz"
            subtitle="Stichtag · 31.12.2024"
            onClick={() => onPick('bilanz')}
            state={!showFeedback ? 'idle' : 'correct'}
          />
        </div>

        <AnimatePresence>
          {state === 'correct' && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <MarcusNote
                tone={tone}
                body="Korrekt. Die Bilanz ist immer auf einen Stichtag bezogen. Du wirst in Interviews oft gefragt, ob du den Unterschied kennst — und jetzt weißt du ihn."
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
                tone={tone}
                subject="Re: Korrektur"
                body="Nochmal: Die GuV ist der Film. Die Bilanz ist das Foto. Das Foto wird zu einem festen Datum aufgenommen — dem Stichtag."
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
        state === 'idle' ? 'cursor-pointer text-is-text-muted' : 'cursor-default text-is-text-muted',
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
