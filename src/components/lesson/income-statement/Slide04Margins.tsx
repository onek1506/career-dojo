'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarcusNote from '../MarcusNote';
import { margins, type MarginItem } from './data';
import type { SlideProps } from './types';

export default function Slide04Margins({ onCanProceed }: SlideProps) {
  const [openKey, setOpenKey] = useState<MarginItem['key'] | null>(null);

  useEffect(() => {
    onCanProceed?.(true);
  }, [onCanProceed]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-is-serif)] text-4xl font-medium text-is-text-primary leading-tight">
          Vier Margen, eine Geschichte.
        </h2>
        <p className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted">
          Beispiel · TechCo · FY24 · Umsatz €100M
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {margins.map((m) => (
          <MarginRow
            key={m.key}
            margin={m}
            isOpen={openKey === m.key}
            onToggle={() => setOpenKey((prev) => (prev === m.key ? null : m.key))}
          />
        ))}
      </div>

      <MarcusNote
        body={
          <>
            Im Interview erwartet niemand, dass du Margen exakt nennst. Aber du musst die Hierarchie kennen: Brutto &gt; EBITDA &gt; EBIT &gt; Netto. Immer.
          </>
        }
      />
    </div>
  );
}

function MarginRow({
  margin,
  isOpen,
  onToggle,
}: {
  margin: MarginItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const fillColor = margin.highlighted ? 'var(--is-accent)' : 'var(--is-text-primary)';
  const valueColor = margin.highlighted ? 'text-is-accent' : 'text-is-bg-primary';

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          'group relative w-full h-12 rounded-md overflow-hidden bg-is-bg-secondary border border-is-bg-border',
          'hover:border-is-text-muted transition-colors duration-200',
          isOpen ? 'border-is-text-muted' : '',
        ].join(' ')}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-md"
          initial={{ width: 0 }}
          animate={{ width: `${margin.value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: fillColor }}
        />

        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-bg-primary mix-blend-normal relative z-10">
            <span className={margin.highlighted ? 'text-is-bg-primary' : 'text-is-bg-primary'}>
              {margin.label}
            </span>
          </span>
          <span
            className={[
              'font-[family-name:var(--font-is-mono)] text-sm tabular-nums relative z-10',
              valueColor,
            ].join(' ')}
            style={{ color: 'var(--is-text-primary)' }}
          >
            <span className="px-2 py-0.5 rounded bg-is-bg-primary/70">
              {margin.value}% · {margin.abs}
            </span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="bg-is-bg-tertiary border border-is-bg-border rounded-md mt-2 p-3">
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                {margin.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
