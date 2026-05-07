'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { calculateQuizXp } from '@/lib/lesson/xp';
import { shuffle } from '@/lib/utils/shuffle';
import { priorStreakFor, type SlideProps } from './types';

// Tap-to-pair: user taps a term on the left, then a definition on the right
// (or vice-versa). Each correct pair locks in. Wrong pair flashes red.
// On submit, q2 is logged with the same xp/streak hooks as the other quizzes.
type Pair = { id: string; term: string; definition: string };

const PAIRS: Pair[] = [
  {
    id: 'topline',
    term: 'Top Line',
    definition: 'Der Umsatz — ganz oben in der GuV.',
  },
  {
    id: 'bottomline',
    term: 'Bottom Line',
    definition: 'Der Jahresüberschuss — ganz unten, was übrig bleibt.',
  },
  {
    id: 'ebitda',
    term: 'EBITDA',
    definition: 'Operative Profitabilität, bevor Zinsen, Steuern und Abschreibungen.',
  },
];

const BASE_XP = 10;

type State = 'idle' | 'submitted-wrong-1' | 'submitted-wrong-2' | 'submitted-correct';

export default function Slide05TermMatch({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  quizResults,
  sidePanel,
}: SlideProps) {
  // Shuffle term column and definition column independently so positions
  // can't be memorised between sessions.
  const [{ termOrder, defOrder }] = useState(() => ({
    termOrder: shuffle(PAIRS.map((p) => p.id)),
    defOrder: shuffle(PAIRS.map((p) => p.id)),
  }));

  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [state, setState] = useState<State>('idle');
  const [solvedOnAttempt, setSolvedOnAttempt] = useState<1 | 2 | null>(null);
  const [hasMistakeThisAttempt, setHasMistakeThisAttempt] = useState(false);
  const didCelebrate = useRef(false);

  const pairsById = useMemo(() => {
    const map = new Map<string, Pair>();
    PAIRS.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const isCorrect = state === 'submitted-correct';
  const isWrongFirst = state === 'submitted-wrong-1';
  const isWrongFinal = state === 'submitted-wrong-2';
  const isResolved = isCorrect || isWrongFinal;
  const allMatched = matched.size === PAIRS.length;
  const priorStreak = priorStreakFor('q2', quizResults);

  useEffect(() => {
    if (isCorrect && !didCelebrate.current) {
      didCelebrate.current = true;
      const xpInfo = calculateQuizXp(true, solvedOnAttempt ?? 1, BASE_XP);
      if (xpInfo.countsForStreak) window.setTimeout(() => playStreakSound(), 250);
    }
  }, [isCorrect, solvedOnAttempt]);

  // Whenever both sides are picked, evaluate the pair.
  useEffect(() => {
    if (selectedTerm === null || selectedDef === null) return;
    if (selectedTerm === selectedDef) {
      // Correct pair
      playCorrectSound();
      setMatched((prev) => {
        const next = new Set(prev);
        next.add(selectedTerm);
        return next;
      });
      setSelectedTerm(null);
      setSelectedDef(null);
    } else {
      // Wrong pair — flash red on both, clear selection.
      playWrongSound();
      setHasMistakeThisAttempt(true);
      const ids = new Set([selectedTerm, selectedDef]);
      setWrongIds(ids);
      const t = window.setTimeout(() => {
        setWrongIds(new Set());
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 450);
      return () => window.clearTimeout(t);
    }
  }, [selectedTerm, selectedDef]);

  const onPickTerm = (id: string) => {
    if (isResolved) return;
    if (matched.has(id)) return;
    setSelectedTerm(id);
  };

  const onPickDef = (id: string) => {
    if (isResolved) return;
    if (matched.has(id)) return;
    setSelectedDef(id);
  };

  const handleSubmit = () => {
    if (!allMatched) return;
    // All three matched — outcome depends on whether any wrong picks happened.
    const flawless = !hasMistakeThisAttempt;
    if (flawless) {
      const attempts: 1 | 2 = state === 'submitted-wrong-1' ? 2 : 1;
      const xpInfo = calculateQuizXp(true, attempts, BASE_XP);
      setSolvedOnAttempt(attempts);
      setState('submitted-correct');
      onAnswer?.('q2', { correct: true, attempts, ...xpInfo });
    } else if (state === 'idle') {
      // First attempt finished with mistakes — give a retry.
      setState('submitted-wrong-1');
    } else {
      const xpInfo = calculateQuizXp(false, 2, BASE_XP);
      setState('submitted-wrong-2');
      onAnswer?.('q2', { correct: false, attempts: 2, ...xpInfo });
    }
  };

  const reset = () => {
    setMatched(new Set());
    setWrongIds(new Set());
    setSelectedTerm(null);
    setSelectedDef(null);
    setHasMistakeThisAttempt(false);
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
  } else if (allMatched) {
    ctaLabel = state === 'submitted-wrong-1' ? 'Nochmal abschließen' : 'Abschließen';
    ctaAction = handleSubmit;
  } else {
    ctaLabel = `Noch ${PAIRS.length - matched.size} Paar(e)`;
    ctaAction = () => {};
    ctaDisabled = true;
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
              Übung 2 / 3 · +{BASE_XP} XP
            </span>
            <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-tight">
              Begriff trifft Definition.
            </h2>
            <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
              Tipp links, dann rechts — bis alle drei verbunden sind.
            </p>
          </div>
          {!isResolved && (matched.size > 0 || hasMistakeThisAttempt) && (
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

        <div className="grid grid-cols-[1fr_auto_2fr] gap-3 sm:gap-4 items-start">
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              Begriff
            </span>
            {termOrder.map((id) => {
              const pair = pairsById.get(id)!;
              const isMatched = matched.has(id);
              const isSelected = selectedTerm === id;
              const isWrong = wrongIds.has(id);
              return (
                <PillButton
                  key={id}
                  label={pair.term}
                  variant="term"
                  state={
                    isMatched
                      ? 'matched'
                      : isWrong
                        ? 'wrong'
                        : isSelected
                          ? 'selected'
                          : 'idle'
                  }
                  disabled={isResolved || isMatched}
                  onClick={() => onPickTerm(id)}
                />
              );
            })}
          </div>

          <div className="hidden sm:flex flex-col gap-2 pt-7">
            {Array.from({ length: PAIRS.length }).map((_, i) => (
              <div
                key={i}
                className="h-[44px] flex items-center justify-center text-is-text-muted"
              >
                ↔
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              Definition
            </span>
            {defOrder.map((id) => {
              const pair = pairsById.get(id)!;
              const isMatched = matched.has(id);
              const isSelected = selectedDef === id;
              const isWrong = wrongIds.has(id);
              return (
                <PillButton
                  key={id}
                  label={pair.definition}
                  variant="definition"
                  state={
                    isMatched
                      ? 'matched'
                      : isWrong
                        ? 'wrong'
                        : isSelected
                          ? 'selected'
                          : 'idle'
                  }
                  disabled={isResolved || isMatched}
                  onClick={() => onPickDef(id)}
                />
              );
            })}
          </div>
        </div>

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
                    Diese drei Begriffe hörst du täglich. &bdquo;Top Line&ldquo; und &bdquo;Bottom Line&ldquo; sind reine Slang-Wörter für Umsatz und Jahresüberschuss — Analysten lieben sie.
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
                    Du hattest unterwegs einen Fehler. Setz nochmal zurück und versuch es flüssig — dann gibt&apos;s noch +5 XP.
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
                body={<>Kein Stress — die drei prägst du dir mit der Zeit ein.</>}
              />
              <StreakReadout outcome="broken" priorStreak={priorStreak} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}

type PillState = 'idle' | 'selected' | 'matched' | 'wrong';

function PillButton({
  label,
  variant,
  state,
  disabled,
  onClick,
}: {
  label: string;
  variant: 'term' | 'definition';
  state: PillState;
  disabled: boolean;
  onClick: () => void;
}) {
  let stateClass = 'border-is-bg-border hover:border-is-text-muted hover:bg-is-bg-tertiary';
  if (state === 'selected') stateClass = 'border-is-text-primary bg-is-bg-tertiary';
  else if (state === 'matched') stateClass = 'border-is-success bg-is-success-muted';
  else if (state === 'wrong') stateClass = 'border-is-error bg-is-error-muted animate-[is-pulse-error_0.45s_ease-out]';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-md bg-is-bg-secondary border text-left',
        'transition-all duration-200 cursor-pointer disabled:cursor-default',
        variant === 'term'
          ? 'font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary'
          : 'font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary',
        stateClass,
      ].join(' ')}
    >
      {state === 'matched' && (
        <Check size={14} className="text-is-success shrink-0" aria-hidden />
      )}
      <span className="flex-1">{label}</span>
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
