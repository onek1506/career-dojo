'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { waterfallSteps, type WaterfallStep } from './data';
import type { SlideProps } from './types';

export default function Slide03Waterfall({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  sidePanel,
}: SlideProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const onToggle = (index: number) => {
    setOpenIndex((prev) => {
      const next = prev === index ? null : index;
      if (next !== null) playRevealSound();
      return next;
    });
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      sidePanel={sidePanel}
      footer={<LessonFooterCTA onClick={handleNext} label="Verstanden" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Vom Umsatz zum Gewinn
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            5 Stationen, die du kennen musst.
          </p>
        </div>

        <motion.div
          className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-3 sm:p-4 flex flex-col"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
        >
          {waterfallSteps.map((step, i) => (
            <WaterfallRow
              key={i}
              step={step}
              isOpen={openIndex === i}
              onToggle={() => onToggle(i)}
              onClose={() => setOpenIndex(null)}
            />
          ))}
        </motion.div>

        <MarcusNote
          tone="gentle"
          body={
            <>
              Diese 5 Stationen sind alles, was du heute brauchst. Die kleineren Posten dazwischen lernst du in den nächsten Lektionen kennen — jeder einzeln, mit Beispielen. Niemand erwartet, dass du das schon alles kannst.
            </>
          }
        />

        <p className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted text-center">
          Tipp · Auf eine Position tippen für die Erklärung
        </p>
      </div>
    </LessonLayout>
  );
}

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

function WaterfallRow({
  step,
  isOpen,
  onToggle,
  onClose,
}: {
  step: WaterfallStep;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const isMain = step.type === 'main';
  const barColor = step.highlighted
    ? 'var(--is-accent)'
    : step.value < 0
      ? 'rgba(255, 59, 48, 0.4)'
      : 'var(--is-text-primary)';

  return (
    <motion.div variants={rowVariants} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={[
          'w-full grid grid-cols-[1fr_auto] items-center gap-3 px-1 rounded-md text-left',
          'hover:bg-is-bg-tertiary transition-colors duration-200',
          isOpen ? 'bg-is-bg-tertiary' : '',
          isMain ? 'py-2 min-h-[44px]' : 'py-1 min-h-[32px] opacity-80',
        ].join(' ')}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 min-w-0">
            <span
              className={[
                'font-[family-name:var(--font-is-mono)] text-is-text-primary',
                isMain ? 'text-sm font-semibold' : 'text-xs text-is-text-muted',
              ].join(' ')}
            >
              {step.label}
            </span>
            <span
              className={[
                'font-[family-name:var(--font-is-mono)] text-is-text-muted',
                isMain ? 'text-[10px]' : 'text-[10px]',
              ].join(' ')}
            >
              ({step.en})
            </span>
          </div>
          {isMain && step.barWidth !== undefined && (
            <div className="h-2 bg-is-bg-tertiary rounded-sm overflow-hidden">
              <motion.div
                className="h-full rounded-sm"
                initial={{ width: 0 }}
                animate={{ width: `${step.barWidth}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ background: barColor }}
              />
            </div>
          )}
          {!isMain && (
            <div className="h-[2px] rounded-sm" style={{ background: barColor, width: `${Math.abs(step.value)}%`, opacity: 0.5 }} />
          )}
        </div>
        <span
          className={[
            'font-[family-name:var(--font-is-mono)] tabular-nums whitespace-nowrap',
            isMain
              ? step.highlighted
                ? 'text-is-accent text-sm font-semibold'
                : 'text-is-text-primary text-sm'
              : 'text-is-error text-xs',
          ].join(' ')}
        >
          {formatValue(step.value)}M
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="relative my-2 mx-1 bg-is-bg-tertiary border border-is-bg-border rounded-md p-3 pr-9"
          >
            <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
              {step.tooltip}
            </p>
            {step.lessonHint && (
              <p className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-accent mt-1.5 uppercase tracking-wider">
                → {step.lessonHint}
              </p>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-2 right-2 p-1 text-is-text-muted hover:text-is-text-primary"
              aria-label="Schließen"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function formatValue(value: number) {
  const abs = Math.abs(value);
  return value < 0 ? `−€${abs}` : `€${abs}`;
}
