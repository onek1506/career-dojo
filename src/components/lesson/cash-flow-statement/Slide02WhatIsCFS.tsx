'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound } from '@/lib/sounds';
import { whatIsCards } from './data';
import type { SlideProps } from './types';

const ICONS = { TrendingUp, DollarSign } as const;

type State = 'idle' | 'correct' | 'wrong';

export default function Slide02WhatIsCFS({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const [state, setState] = useState<State>('idle');
  const [revealedId, setRevealedId] = useState<string | null>(null);

  const onPick = (id: string) => {
    if (state !== 'idle') return;
    setRevealedId(id);
    const isCorrect = whatIsCards.find((c) => c.id === id)?.isCorrect === true;
    if (isCorrect) {
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
            Was ist das CFS?
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Welcher Bericht zeigt den tatsächlichen Cash-Eingang?
          </p>
        </div>

        <p className="font-[family-name:var(--font-is-sans)] text-is-text-primary leading-relaxed">
          Die GuV sagt dir, was eine Firma &bdquo;verdient&ldquo; hat. Das Cash Flow Statement sagt dir, was wirklich auf dem Konto gelandet ist. Das ist ein riesiger Unterschied — wegen Accrual Accounting.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whatIsCards.map((card) => {
            const Icon = ICONS[card.iconName];
            const isPicked = revealedId === card.id;
            const showCorrect = state !== 'idle' && card.isCorrect;
            const showWrong = state === 'wrong' && isPicked && !card.isCorrect;
            const stateClass = showCorrect
              ? 'border-is-accent shadow-[0_0_24px_rgba(255,107,0,0.3)]'
              : showWrong
                ? 'border-is-error animate-[is-pulse-error_0.4s_ease-out]'
                : state !== 'idle' && !isPicked
                  ? 'border-is-bg-border opacity-60'
                  : 'border-is-bg-border hover:bg-is-bg-tertiary hover:border-is-text-muted';
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onPick(card.id)}
                disabled={state !== 'idle'}
                className={[
                  'flex flex-col items-start gap-2 min-h-[160px] bg-is-bg-secondary border rounded-xl p-4 sm:p-5 text-left',
                  'transition-all duration-200 ease-out',
                  state === 'idle' ? 'cursor-pointer' : 'cursor-default',
                  stateClass,
                ].join(' ')}
              >
                <Icon size={24} className="text-is-text-muted" aria-hidden />
                <span className="font-[family-name:var(--font-is-mono)] text-sm sm:text-base text-is-text-primary">
                  {card.title}
                </span>
                <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                  {card.subtitle}
                </span>
                {isPicked && (
                  <p className="font-[family-name:var(--font-is-sans)] text-xs text-is-text-secondary leading-relaxed mt-1">
                    {card.reveal}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {state === 'correct' && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MarcusNote
                tone={tone}
                body='Genau. Das CFS zeigt was wirklich passiert ist. Viele große Firmen sind pleite gegangen, weil sie "profitabel" waren aber kein Cash hatten. Enron ist das bekannteste Beispiel.'
              />
            </motion.div>
          )}
          {state === 'wrong' && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MarcusNote
                tone={tone}
                subject="Re: Korrektur"
                body="Die GuV zeigt, was buchhalterisch verdient wurde. Das CFS zeigt, was tatsächlich an Cash geflossen ist — der ehrlichste Bericht."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
