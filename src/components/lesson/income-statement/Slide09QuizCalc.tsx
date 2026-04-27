'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RotateCcw } from 'lucide-react';
import MarcusNote from '../MarcusNote';
import { priorStreakFor, type SlideProps } from './types';

const OPTIONS = [
  { letter: 'A', value: '60%' },
  { letter: 'B', value: '40%' },
  { letter: 'C', value: '80%' },
  { letter: 'D', value: '20%' },
] as const;

const CORRECT_LETTER = 'B';

export default function Slide09QuizCalc({ onAnswer, onCanProceed, onNext, quizResults }: SlideProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ letter: string; correct: boolean } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = submitted?.correct === true;
  const priorStreak = priorStreakFor('q2', quizResults);

  useEffect(() => {
    onCanProceed?.(isCorrect);
  }, [isCorrect, onCanProceed]);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === CORRECT_LETTER;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setSubmitted({ letter: selected, correct });
    if (correct) {
      onAnswer?.('q2', { correct: true, attempts: nextAttempts });
    }
  };

  const handleRetry = () => {
    setSubmitted(null);
    setSelected(null);
    setShowHint(false);
  };

  const ctaLabel =
    isCorrect ? 'Nächste Frage' : submitted ? 'Nochmal versuchen' : 'Antwort prüfen';
  const ctaAction = isCorrect ? () => onNext?.() : submitted ? handleRetry : handleSubmit;
  const ctaDisabled = !isCorrect && !submitted && !selected;

  return (
    <div className="flex flex-col gap-5">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
        Frage 2 / 4 · +{attempts >= 1 ? 5 : 10} XP
      </span>

      <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
        TechCo · Umsatz €200M, COGS €120M. Wie hoch ist die Bruttomarge?
      </h2>

      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.letter;
          const isSubmittedThis = submitted?.letter === opt.letter;
          const isCorrectOpt = opt.letter === CORRECT_LETTER;

          let stateClass = 'border-is-bg-border hover:bg-is-bg-tertiary';
          if (submitted) {
            if (isCorrectOpt && submitted.correct) {
              stateClass = 'border-is-success bg-is-success-muted';
            } else if (isSubmittedThis && !submitted.correct) {
              stateClass = 'border-is-error bg-is-error-muted';
            } else {
              stateClass = 'border-is-bg-border opacity-60';
            }
          } else if (isSelected) {
            stateClass = 'border-is-text-primary';
          }

          return (
            <button
              key={opt.letter}
              type="button"
              onClick={() => !submitted && setSelected(opt.letter)}
              disabled={!!submitted}
              className={[
                'flex items-center gap-4 p-4 rounded-lg bg-is-bg-secondary border text-left',
                'transition-all duration-200 cursor-pointer disabled:cursor-default',
                stateClass,
              ].join(' ')}
            >
              <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                {opt.letter}
              </span>
              <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary tabular-nums">
                {opt.value}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {submitted && submitted.correct && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <MarcusNote
              body={
                <>
                  Korrekt. Rechenweg <span className="not-italic font-[family-name:var(--font-is-mono)]">(200 − 120) / 200 = 40%</span>.
                </>
              }
            />
            <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
              <span aria-hidden className="text-is-accent">🔥</span>
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                {priorStreak + 1} in Folge richtig
              </span>
            </div>
          </motion.div>
        )}
        {submitted && !submitted.correct && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <MarcusNote
              subject="Re: Rechenweg"
              body={
                <>
                  Falsch. <span className="not-italic font-[family-name:var(--font-is-mono)]">Bruttomarge = (Revenue − COGS) / Revenue = (200 − 120) / 200 = 40%</span>. Beim zweiten Versuch gibt&apos;s nur noch +5 XP.
                </>
              }
            />
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-is-bg-secondary border border-is-bg-border text-is-text-secondary hover:text-is-text-primary hover:border-is-text-muted transition-all duration-200 font-[family-name:var(--font-is-mono)] text-xs"
              >
                <Lightbulb size={12} />
                Hinweis zeigen
              </button>
            ) : (
              <div className="bg-is-bg-tertiary border border-is-bg-border rounded-md p-3">
                <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                  Bruttomarge = Bruttoergebnis / Umsatz. Bruttoergebnis = Umsatz − COGS.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={ctaAction}
        disabled={ctaDisabled}
        className={[
          'w-full py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] transition-all duration-200',
          'flex items-center justify-center gap-2',
          ctaDisabled
            ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
            : 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover',
        ].join(' ')}
      >
        {!isCorrect && submitted && <RotateCcw size={14} />}
        {ctaLabel}
      </button>
    </div>
  );
}
