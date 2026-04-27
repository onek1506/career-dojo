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
  // Each row has a label outside the bar (always readable) + a value pill
  // outside the bar on the right (always readable). Bar is purely visual.
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          'group w-full flex flex-col gap-1.5 rounded-md p-2',
          'hover:bg-is-bg-tertiary transition-colors duration-200 text-left',
          isOpen ? 'bg-is-bg-tertiary' : '',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={[
              'font-[family-name:var(--font-is-mono)] text-sm',
              margin.highlighted ? 'text-is-accent font-semibold' : 'text-is-text-primary',
            ].join(' ')}
          >
            {margin.label}
          </span>
          <span className="font-[family-name:var(--font-is-mono)] text-sm tabular-nums text-is-text-primary">
            {margin.value}% <span className="text-is-text-muted">· {margin.abs}</span>
          </span>
        </div>
        <div className="h-3 w-full rounded-md bg-is-bg-secondary border border-is-bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-md"
            initial={{ width: 0 }}
            animate={{ width: `${margin.value}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ background: fillColor }}
          />
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
            <div className="bg-is-bg-secondary border border-is-bg-border rounded-md mt-2 p-3">
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
