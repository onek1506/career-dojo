'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarcusNote from '../MarcusNote';
import { priorStreakFor, type SlideProps } from './types';

const OPTIONS = [
  { letter: 'A', value: 'Net Margin' },
  { letter: 'B', value: 'Operating Margin' },
  { letter: 'C', value: 'Gross Margin' },
  { letter: 'D', value: 'EBITDA Margin' },
] as const;

const CORRECT_LETTER = 'C';

export default function Slide11QuizHierarchy({ onAnswer, onCanProceed, onNext, quizResults }: SlideProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ letter: string; correct: boolean } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const isCorrect = submitted?.correct === true;
  const priorStreak = priorStreakFor('q4', quizResults);
  const streakAfter = isCorrect ? priorStreak + 1 : priorStreak;

  useEffect(() => {
    onCanProceed?.(isCorrect);
  }, [isCorrect, onCanProceed]);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === CORRECT_LETTER;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setSubmitted({ letter: selected, correct });
    onAnswer?.('q4', { correct, attempts: nextAttempts });
  };

  const handleRetry = () => {
    setSubmitted(null);
    setSelected(null);
  };

  const ctaLabel = isCorrect ? 'Ergebnis ansehen' : submitted ? 'Nochmal versuchen' : 'Antwort prüfen';
  const ctaAction = isCorrect ? () => onNext?.() : submitted ? handleRetry : handleSubmit;
  const ctaDisabled = !isCorrect && !submitted && !selected;

  return (
    <div className="flex flex-col gap-5">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
        Frage 4 / 4 · +15 XP
      </span>

      <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
        Welche Marge ist immer am höchsten?
      </h2>

      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.letter;
          const isSubmittedThis = submitted?.letter === opt.letter;
          const isCorrectOpt = opt.letter === CORRECT_LETTER;

          let stateClass = 'border-is-bg-border hover:bg-is-bg-tertiary';
          if (submitted) {
            if (isCorrectOpt) {
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
              <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary">
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
                  Korrekt. Bruttomarge ganz oben in der Hierarchie — nur direkte Kosten abgezogen. Wer das verwechselt, klingt wie ein Bachelor-Erstsemester.
                </>
              }
            />
            <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
              <span aria-hidden className="text-is-accent">🔥</span>
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                {streakAfter} in Folge richtig · Quiz abgeschlossen
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
          >
            <MarcusNote
              subject="Re: Hierarchie"
              body={
                <>
                  Bruttomarge ist immer am höchsten — nur direkte Produktionskosten abgezogen. Reihenfolge merken: Brutto &gt; EBITDA &gt; EBIT &gt; Netto.
                </>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={ctaAction}
        disabled={ctaDisabled}
        className={[
          'w-full py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] transition-all duration-200',
          ctaDisabled
            ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
            : 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover',
        ].join(' ')}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
