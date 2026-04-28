'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound } from '@/lib/sounds';
import type { SlideProps } from './types';

type WordChip = { id: string; label: string };

const EXPECTED = ['Umsatz', 'Herstellungskosten', 'Umsatz'] as const;

const INITIAL_POOL: WordChip[] = [
  { id: 'umsatz-1', label: 'Umsatz' },
  { id: 'cogs-1', label: 'Herstellungskosten' },
  { id: 'umsatz-2', label: 'Umsatz' },
];

export default function Slide05FormulaDrill({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  sidePanel,
}: SlideProps) {
  const [slots, setSlots] = useState<(WordChip | null)[]>([null, null, null]);
  const [errorSlot, setErrorSlot] = useState<number | null>(null);
  const didCelebrate = useRef(false);

  const isComplete = slots.every((s) => s !== null);
  const isCorrect =
    isComplete && slots.every((s, i) => s !== null && s.label === EXPECTED[i]);

  useEffect(() => {
    if (isCorrect && !didCelebrate.current) {
      playCorrectSound();
      didCelebrate.current = true;
    }
  }, [isCorrect]);

  const usedIds = useMemo(
    () => new Set(slots.filter((s) => s !== null).map((s) => s!.id)),
    [slots]
  );
  const availablePool = INITIAL_POOL.filter((w) => !usedIds.has(w.id));

  const onPickWord = (word: WordChip) => {
    if (isCorrect) return;
    const nextSlot = slots.findIndex((s) => s === null);
    if (nextSlot === -1) return;
    if (word.label !== EXPECTED[nextSlot]) {
      playWrongSound();
      setErrorSlot(nextSlot);
      window.setTimeout(() => setErrorSlot(null), 450);
      return;
    }
    setSlots((prev) => {
      const next = [...prev];
      next[nextSlot] = word;
      return next;
    });
  };

  const onSlotClick = (index: number) => {
    if (isCorrect) return;
    if (slots[index] === null) return;
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const reset = () => {
    setSlots([null, null, null]);
    setErrorSlot(null);
    didCelebrate.current = false;
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const footer = (
    <LessonFooterCTA onClick={handleNext} disabled={!isCorrect} icon={<ArrowRight size={16} />} />
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
            <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
              Schreib die Formel.
            </h2>
            <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
              Bruttomarge in 4 Bausteinen.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-md bg-is-bg-secondary border border-is-bg-border text-is-text-secondary hover:text-is-text-primary hover:border-is-text-muted transition-all duration-200 font-[family-name:var(--font-is-mono)] text-xs"
            aria-label="Formel zurücksetzen"
          >
            <RotateCcw size={12} />
            Nochmal
          </button>
        </div>

        <LayoutGroup>
          <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-4 sm:p-6">
            <div className="font-[family-name:var(--font-is-mono)] text-base sm:text-2xl text-is-text-primary flex flex-wrap items-center gap-x-2 gap-y-3 leading-loose">
              <span>Bruttomarge</span>
              <span className="text-is-text-muted">=</span>
              <span className="text-is-text-muted">(</span>
              <Slot index={0} chip={slots[0]} isCorrect={isCorrect} isError={errorSlot === 0} onClick={() => onSlotClick(0)} />
              <span className="text-is-text-muted">−</span>
              <Slot index={1} chip={slots[1]} isCorrect={isCorrect} isError={errorSlot === 1} onClick={() => onSlotClick(1)} />
              <span className="text-is-text-muted">)</span>
              <span className="text-is-text-muted">/</span>
              <Slot index={2} chip={slots[2]} isCorrect={isCorrect} isError={errorSlot === 2} onClick={() => onSlotClick(2)} />
              <span className="text-is-text-muted">× 100%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              Bausteine
            </span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {availablePool.map((word) => (
                <motion.button
                  key={word.id}
                  layoutId={`chip-${word.id}`}
                  type="button"
                  onClick={() => onPickWord(word)}
                  disabled={isCorrect}
                  className="bg-is-bg-secondary border border-is-bg-border rounded-md px-4 py-3 min-h-[44px] font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary hover:bg-is-bg-tertiary hover:border-is-text-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {word.label}
                </motion.button>
              ))}
              {availablePool.length === 0 && !isCorrect && (
                <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                  Alle Bausteine sind im Einsatz.
                </p>
              )}
            </div>
          </div>
        </LayoutGroup>

        <AnimatePresence>
          {isCorrect && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MarcusNote
                tone="gentle"
                body={
                  <>
                    Stark. Diese Formel siehst du immer wieder. Wenn du sie einmal verstehst, hast du den Schlüssel zu allen anderen Margen.
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

function Slot({
  index,
  chip,
  isCorrect,
  isError,
  onClick,
}: {
  index: number;
  chip: WordChip | null;
  isCorrect: boolean;
  isError: boolean;
  onClick: () => void;
}) {
  const filled = chip !== null;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!filled || isCorrect}
      className={[
        'inline-flex items-center justify-center min-w-[6rem] sm:min-w-[10rem] h-9 sm:h-10 px-3 rounded-md',
        'transition-all duration-200',
        filled
          ? isCorrect
            ? 'bg-is-bg-tertiary border-2 border-is-accent shadow-[0_0_18px_rgba(255,107,0,0.25)]'
            : 'bg-is-bg-tertiary border-2 border-is-text-muted hover:border-is-text-primary cursor-pointer'
          : isError
            ? 'border-2 border-is-error border-dashed animate-[is-pulse-error_0.45s_ease-out]'
            : 'border-2 border-dashed border-is-bg-border',
      ].join(' ')}
      aria-label={filled ? `Slot ${index + 1}: ${chip?.label} entfernen` : `Slot ${index + 1} leer`}
    >
      <AnimatePresence mode="wait">
        {chip && (
          <motion.span
            key={chip.id}
            layoutId={`chip-${chip.id}`}
            className="font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-primary"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {chip.label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
