'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { waterfallSteps, type WaterfallStep } from './data';
import type { SlideProps } from './types';

const SECTION_LABELS: Record<WaterfallStep['section'], string> = {
  operative: 'OPERATIVE PERFORMANCE',
  finanz: 'FINANZIERUNGSEBENE',
  staat: 'STAATSANTEIL',
};

export default function Slide03Waterfall({ onCanProceed }: SlideProps) {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);

  useEffect(() => {
    onCanProceed?.(true);
  }, [onCanProceed]);

  // Build a render-ordered list with section dividers prepended
  const items: Array<
    { kind: 'divider'; section: WaterfallStep['section'] } | { kind: 'step'; step: WaterfallStep; index: number }
  > = [];
  let lastSection: WaterfallStep['section'] | null = null;
  waterfallSteps.forEach((step, i) => {
    if (step.section !== lastSection) {
      items.push({ kind: 'divider', section: step.section });
      lastSection = step.section;
    }
    items.push({ kind: 'step', step, index: i });
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-is-serif)] text-4xl font-medium text-is-text-primary leading-tight">
          Vom Umsatz zum Gewinn
        </h2>
        <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
          11 Stationen, 1 Logik.
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
        {items.map((item, i) =>
          item.kind === 'divider' ? (
            <SectionDivider key={`div-${item.section}-${i}`} label={SECTION_LABELS[item.section]} first={i === 0} />
          ) : (
            <WaterfallRow
              key={`row-${item.index}`}
              step={item.step}
              isOpen={openTooltipIndex === item.index}
              onToggle={() => setOpenTooltipIndex((prev) => (prev === item.index ? null : item.index))}
              onClose={() => setOpenTooltipIndex(null)}
            />
          )
        )}
      </motion.div>

      <p className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted text-center">
        Tipp · Auf eine Position tippen für die Erklärung
      </p>
    </div>
  );
}

function SectionDivider({ label, first }: { label: string; first: boolean }) {
  return (
    <motion.div
      variants={rowVariants}
      className={['flex items-center gap-3', first ? 'mt-1' : 'mt-3', 'mb-2'].join(' ')}
    >
      <div className="h-px flex-1 bg-is-bg-border" />
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
        {label}
      </span>
      <div className="h-px flex-1 bg-is-bg-border" />
    </motion.div>
  );
}

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
  const barColor = step.highlighted
    ? 'var(--is-accent)'
    : step.type === 'minus'
      ? 'rgba(255, 59, 48, 0.4)'
      : 'var(--is-text-primary)';
  const labelWeight = step.type === 'sum' ? 'font-semibold' : 'font-normal';

  return (
    <motion.div variants={rowVariants} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={[
          'w-full grid grid-cols-[1fr_auto] items-center gap-3 py-1.5 px-1 rounded-md',
          'hover:bg-is-bg-tertiary transition-colors duration-200 text-left',
          isOpen ? 'bg-is-bg-tertiary' : '',
        ].join(' ')}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={[
                'font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary truncate',
                labelWeight,
              ].join(' ')}
            >
              {step.label}
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted truncate hidden sm:inline">
              {step.de}
            </span>
          </div>
          <div className="h-2 bg-is-bg-tertiary rounded-sm overflow-hidden">
            <motion.div
              className="h-full rounded-sm"
              initial={{ width: 0 }}
              animate={{ width: `${step.barWidth}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ background: barColor }}
            />
          </div>
        </div>
        <span
          className={[
            'font-[family-name:var(--font-is-mono)] text-sm tabular-nums whitespace-nowrap',
            step.type === 'minus' ? 'text-is-error' : step.highlighted ? 'text-is-accent font-semibold' : 'text-is-text-primary',
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

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

function formatValue(value: number) {
  const abs = Math.abs(value);
  return value < 0 ? `−€${abs}` : `€${abs}`;
}
