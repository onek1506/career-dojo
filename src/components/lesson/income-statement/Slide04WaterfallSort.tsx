'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { calculateQuizXp } from '@/lib/lesson/xp';
import { shuffle } from '@/lib/utils/shuffle';
import { priorStreakFor, type SlideProps } from './types';

// User must drop the 5 main waterfall stations into the right order, top to
// bottom of an income statement. The XP/streak hooks mirror the existing
// quiz slides so q1 counts toward the per-lesson streak.
type StationChip = { id: string; label: string };

const EXPECTED: readonly string[] = [
  'Umsatz',
  'Bruttoergebnis',
  'EBITDA',
  'EBIT',
  'Jahresüberschuss',
];

const INITIAL_POOL: StationChip[] = EXPECTED.map((label, i) => ({
  id: `station-${i}-${label}`,
  label,
}));

const BASE_XP = 10;

type State = 'idle' | 'submitted-wrong-1' | 'submitted-wrong-2' | 'submitted-correct';

export default function Slide04WaterfallSort({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  quizResults,
  sidePanel,
}: SlideProps) {
  const [slots, setSlots] = useState<(StationChip | null)[]>(() =>
    new Array(EXPECTED.length).fill(null),
  );
  const [errorSlot, setErrorSlot] = useState<number | null>(null);
  const [state, setState] = useState<State>('idle');
  const [solvedOnAttempt, setSolvedOnAttempt] = useState<1 | 2 | null>(null);
  const didCelebrate = useRef(false);
  const [pool] = useState<StationChip[]>(() => shuffle(INITIAL_POOL));

  const isComplete = slots.every((s) => s !== null);
  const isCorrect = state === 'submitted-correct';
  const isWrongFirst = state === 'submitted-wrong-1';
  const isWrongFinal = state === 'submitted-wrong-2';
  const isResolved = isCorrect || isWrongFinal;
  const priorStreak = priorStreakFor('q1', quizResults);

  const usedIds = useMemo(
    () => new Set(slots.filter((s): s is StationChip => s !== null).map((s) => s.id)),
    [slots],
  );
  const availablePool = pool.filter((w) => !usedIds.has(w.id));

  useEffect(() => {
    if (isCorrect && !didCelebrate.current) {
      didCelebrate.current = true;
      const xpInfo = calculateQuizXp(true, solvedOnAttempt ?? 1, BASE_XP);
      if (xpInfo.countsForStreak) window.setTimeout(() => playStreakSound(), 250);
    }
  }, [isCorrect, solvedOnAttempt]);

  const onPickWord = (word: StationChip) => {
    if (isResolved) return;
    const nextSlot = slots.findIndex((s) => s === null);
    if (nextSlot === -1) return;
    setSlots((prev) => {
      const next = [...prev];
      next[nextSlot] = word;
      return next;
    });
  };

  const onSlotClick = (index: number) => {
    if (isResolved) return;
    if (slots[index] === null) return;
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    const filledLabels = slots.map((s) => s!.label);
    const correct = filledLabels.every((label, i) => label === EXPECTED[i]);
    if (correct) {
      const attempts: 1 | 2 = state === 'submitted-wrong-1' ? 2 : 1;
      const xpInfo = calculateQuizXp(true, attempts, BASE_XP);
      playCorrectSound();
      setSolvedOnAttempt(attempts);
      setState('submitted-correct');
      onAnswer?.('q1', { correct: true, attempts, ...xpInfo });
    } else if (state === 'idle') {
      // Highlight first wrong slot
      const firstWrong = filledLabels.findIndex((label, i) => label !== EXPECTED[i]);
      playWrongSound();
      setErrorSlot(firstWrong);
      window.setTimeout(() => setErrorSlot(null), 450);
      setState('submitted-wrong-1');
    } else {
      const xpInfo = calculateQuizXp(false, 2, BASE_XP);
      playWrongSound();
      setState('submitted-wrong-2');
      onAnswer?.('q1', { correct: false, attempts: 2, ...xpInfo });
    }
  };

  const reset = () => {
    // We deliberately keep `state` as-is so a `submitted-wrong-1` retry
    // still registers as attempt 2 on the next submit.
    setSlots(new Array(EXPECTED.length).fill(null));
    setErrorSlot(null);
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  let ctaLabel: string;
  let ctaAction: () => void;
  let ctaDisabled = false;
  let ctaIcon = false;
  if (isResolved) {
    ctaLabel = 'Nächste Übung';
    ctaAction = handleNext;
    ctaIcon = true;
  } else if (isWrongFirst) {
    ctaLabel = 'Nochmal prüfen';
    ctaAction = handleSubmit;
    ctaDisabled = !isComplete;
  } else {
    ctaLabel = 'Reihenfolge prüfen';
    ctaAction = handleSubmit;
    ctaDisabled = !isComplete;
  }

  const footer = (
    <button
      type="button"
      onClick={ctaAction}
      disabled={ctaDisabled}
      className={[
        'w-full min-h-[44px] py-3 sm:py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] transition-all duration-200 flex items-center justify-center gap-2',
        ctaDisabled
          ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
          : 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover',
      ].join(' ')}
    >
      {ctaLabel}
      {ctaIcon && <ArrowRight size={16} />}
    </button>
  );

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      sidePanel={sidePanel}
      footer={footer}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
              Übung 1 / 3 · +{BASE_XP} XP
            </span>
            <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-tight">
              Sortier die 5 Stationen.
            </h2>
            <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
              Von oben (Top Line) nach unten (Bottom Line).
            </p>
          </div>
          {!isResolved && slots.some((s) => s !== null) && (
            <button
              type="button"
              onClick={reset}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-md bg-is-bg-secondary border border-is-bg-border text-is-text-secondary hover:text-is-text-primary hover:border-is-text-muted transition-all duration-200 font-[family-name:var(--font-is-mono)] text-xs"
              aria-label="Zurücksetzen"
            >
              <RotateCcw size={12} />
              Zurück
            </button>
          )}
        </div>

        <LayoutGroup>
          <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-3 sm:p-4">
            <ol className="flex flex-col gap-2">
              {slots.map((slot, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[24px_1fr] items-center gap-3"
                >
                  <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tabular-nums">
                    {i + 1}.
                  </span>
                  <Slot
                    index={i}
                    chip={slot}
                    isResolved={isResolved}
                    isCorrect={isCorrect}
                    isError={errorSlot === i}
                    expectedLabel={EXPECTED[i]}
                    revealCorrect={isWrongFinal}
                    onClick={() => onSlotClick(i)}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              Stationen
            </span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {availablePool.map((word) => (
                <motion.button
                  key={word.id}
                  layoutId={`station-${word.id}`}
                  type="button"
                  onClick={() => onPickWord(word)}
                  disabled={isResolved}
                  className="bg-is-bg-secondary border border-is-bg-border rounded-md px-4 py-3 min-h-[44px] font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary hover:bg-is-bg-tertiary hover:border-is-text-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {word.label}
                </motion.button>
              ))}
              {availablePool.length === 0 && !isResolved && (
                <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                  Alle Stationen platziert. Jetzt prüfen.
                </p>
              )}
            </div>
          </div>
        </LayoutGroup>

        <AnimatePresence>
          {isCorrect && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <MarcusNote
                tone="gentle"
                body={
                  <>
                    Genau diese Reihenfolge. Umsatz oben, Jahresüberschuss unten — dazwischen werden Kosten Stück für Stück abgezogen.
                  </>
                }
              />
              <StreakReadout
                priorStreak={priorStreak}
                outcome={solvedOnAttempt === 1 ? 'first-try' : 'second-try'}
              />
            </motion.div>
          )}
          {isWrongFirst && (
            <motion.div
              key="wrong1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MarcusNote
                tone="gentle"
                subject="Re: Fast"
                body={
                  <>
                    Eine Station sitzt noch falsch. Tipp: <strong className="not-italic">EBITDA</strong> kommt vor <strong className="not-italic">EBIT</strong> — das &bdquo;DA&ldquo; (Abschreibungen) wird erst danach abgezogen. Tipp auf einen Eintrag, um ihn rauszuholen.
                  </>
                }
              />
            </motion.div>
          )}
          {isWrongFinal && (
            <motion.div
              key="wrong2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <MarcusNote
                tone="gentle"
                body={
                  <>
                    Kein Stress. Die richtige Reihenfolge siehst du jetzt oben — die merkst du dir beim nächsten Mal.
                  </>
                }
              />
              <StreakReadout outcome="broken" priorStreak={priorStreak} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}

function Slot({
  index,
  chip,
  isResolved,
  isCorrect,
  isError,
  expectedLabel,
  revealCorrect,
  onClick,
}: {
  index: number;
  chip: StationChip | null;
  isResolved: boolean;
  isCorrect: boolean;
  isError: boolean;
  expectedLabel: string;
  revealCorrect: boolean;
  onClick: () => void;
}) {
  const filled = chip !== null;
  const matchesExpected = chip?.label === expectedLabel;

  let stateClass = 'border-2 border-dashed border-is-bg-border';
  if (isError) {
    stateClass = 'border-2 border-is-error border-dashed animate-[is-pulse-error_0.45s_ease-out]';
  } else if (filled) {
    if (isCorrect) {
      stateClass = 'bg-is-bg-tertiary border-2 border-is-accent';
    } else if (revealCorrect) {
      stateClass = matchesExpected
        ? 'bg-is-bg-tertiary border-2 border-is-success'
        : 'bg-is-bg-tertiary border-2 border-is-error';
    } else {
      stateClass = 'bg-is-bg-tertiary border-2 border-is-text-muted hover:border-is-text-primary cursor-pointer';
    }
  } else if (revealCorrect) {
    stateClass = 'bg-is-bg-tertiary border-2 border-is-error border-dashed';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!filled || isResolved}
      className={[
        'w-full inline-flex items-center justify-between min-h-[44px] px-4 py-2 rounded-md transition-all duration-200',
        stateClass,
      ].join(' ')}
      aria-label={
        filled
          ? `Position ${index + 1}: ${chip?.label} entfernen`
          : `Position ${index + 1} leer`
      }
    >
      <AnimatePresence mode="wait">
        {chip ? (
          <motion.span
            key={chip.id}
            layoutId={`station-${chip.id}`}
            className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {chip.label}
          </motion.span>
        ) : (
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
            ___
          </span>
        )}
      </AnimatePresence>
      {revealCorrect && !matchesExpected && (
        <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-success uppercase tracking-wider">
          → {expectedLabel}
        </span>
      )}
    </button>
  );
}

function StreakReadout({
  outcome,
  priorStreak,
}: {
  outcome: 'first-try' | 'second-try' | 'broken';
  priorStreak: number;
}) {
  if (outcome === 'first-try') {
    return (
      <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
        <span aria-hidden className="text-is-accent">🔥</span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
          {priorStreak + 1} in Folge richtig
        </span>
      </div>
    );
  }
  if (outcome === 'second-try') {
    return (
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
        Beim zweiten Versuch geschafft · +5 XP
      </span>
    );
  }
  return (
    <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-error">
      <span aria-hidden className="text-is-error">🔥</span>
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-error">
        0 · Streak unterbrochen
      </span>
    </div>
  );
}
