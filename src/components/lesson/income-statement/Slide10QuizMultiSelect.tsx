'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarcusNote from '../MarcusNote';
import { ebitdaWords } from './data';
import { priorStreakFor, type SlideProps } from './types';

export default function Slide10QuizMultiSelect({ onAnswer, onCanProceed, onNext, quizResults }: SlideProps) {
  const allWords = useMemo(
    () => [...ebitdaWords.correct, ...ebitdaWords.distractors] as string[],
    []
  );
  // Stable shuffle (deterministic, avoids hydration mismatch)
  const shuffled = useMemo(() => stableShuffle(allWords, 'ebitda-q3'), [allWords]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctSet = useMemo(() => new Set<string>(ebitdaWords.correct), []);
  const allCorrect =
    selected.size === 4 && [...selected].every((w) => correctSet.has(w));
  const priorStreak = priorStreakFor('q3', quizResults);

  useEffect(() => {
    onCanProceed?.(submitted && allCorrect);
  }, [submitted, allCorrect, onCanProceed]);

  const toggle = (word: string) => {
    if (submitted && allCorrect) return;
    if (submitted) {
      // user wants to retry: clear submission
      setSubmitted(false);
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else if (next.size < 4) {
        next.add(word);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setSubmitted(true);
    onAnswer?.('q3', { correct: allCorrect, attempts: nextAttempts });
  };

  const stateForWord = (word: string): 'idle' | 'selected' | 'correct' | 'wrong' | 'missed' => {
    const isSelected = selected.has(word);
    const isCorrect = correctSet.has(word);
    if (!submitted) return isSelected ? 'selected' : 'idle';
    if (isSelected && isCorrect) return 'correct';
    if (isSelected && !isCorrect) return 'wrong';
    if (!isSelected && isCorrect) return 'missed';
    return 'idle';
  };

  return (
    <div className="flex flex-col gap-5">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
        Frage 3 / 4 · +15 XP
      </span>

      <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
        EBITDA = Earnings Before <span className="text-is-text-muted">___</span>,{' '}
        <span className="text-is-text-muted">___</span>,{' '}
        <span className="text-is-text-muted">___</span> und{' '}
        <span className="text-is-text-muted">___</span>.
      </h2>

      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          {selected.size} / 4 ausgewählt
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {shuffled.map((word) => {
          const s = stateForWord(word);
          const stateClass =
            s === 'correct'
              ? 'border-is-success bg-is-success-muted text-is-text-primary'
              : s === 'wrong'
                ? 'border-is-error bg-is-error-muted text-is-text-primary'
                : s === 'missed'
                  ? 'border-is-success border-dashed text-is-text-secondary'
                  : s === 'selected'
                    ? 'border-is-accent bg-is-accent-muted text-is-text-primary'
                    : 'border-is-bg-border bg-is-bg-secondary text-is-text-primary hover:bg-is-bg-tertiary';
          return (
            <button
              key={word}
              type="button"
              onClick={() => toggle(word)}
              className={[
                'rounded-md border px-3 py-3 font-[family-name:var(--font-is-mono)] text-sm',
                'transition-all duration-200 cursor-pointer',
                stateClass,
              ].join(' ')}
              aria-pressed={selected.has(word)}
            >
              {word}
            </button>
          );
        })}
      </div>

      <div className="bg-is-bg-secondary border border-is-bg-border rounded-md p-3">
        <p className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted leading-relaxed">
          <span className="text-is-text-secondary">D&amp;A</span> = Depreciation &amp; Amortization. Eine Größe, zwei Wörter, weil Sachanlagen abgeschrieben und immaterielle Werte amortisiert werden.
        </p>
      </div>

      <AnimatePresence>
        {submitted && allCorrect && (
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
                  Das musst du wörtlich im Interview aufsagen können. Üb das vor dem Spiegel. Ja, wirklich.
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
        {submitted && !allCorrect && (
          <motion.div
            key="wrong"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <MarcusNote
              subject="Re: Korrektur"
              body={
                <>
                  Nicht ganz. Richtig sind <span className="not-italic font-[family-name:var(--font-is-mono)]">Interest, Taxes, Depreciation, Amortization</span> — die gestrichelten Felder oben. Korrigiere und prüfe nochmal.
                </>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={submitted && allCorrect ? () => onNext?.() : handleSubmit}
        disabled={selected.size !== 4}
        className={[
          'w-full py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] transition-all duration-200',
          selected.size !== 4
            ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
            : 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover',
        ].join(' ')}
      >
        {submitted && allCorrect ? 'Nächste Frage' : 'Antwort prüfen'}
      </button>
    </div>
  );
}

function stableShuffle<T>(arr: T[], seed: string): T[] {
  // Simple deterministic shuffle: hash seed + index, sort by hash
  const tagged = arr.map((item, i) => ({ item, key: hash(`${seed}-${i}`) }));
  tagged.sort((a, b) => a.key - b.key);
  return tagged.map((t) => t.item);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}
