'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { margins, companyExamples, type MarginItem } from './data';
import type { SlideProps } from './types';

export default function Slide04Margins({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: SlideProps) {
  const [openKey, setOpenKey] = useState<MarginItem['key'] | null>(null);

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const onToggle = (key: MarginItem['key']) => {
    setOpenKey((prev) => {
      const next = prev === key ? null : key;
      if (next !== null) playRevealSound();
      return next;
    });
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
     
      footer={<LessonFooterCTA onClick={handleNext} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Zwei Margen, die jeder kennt.
          </h2>
          <p className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted">
            Beispiel · TechCo · FY24 · Umsatz €100M
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {margins.map((m) => (
            <MarginRow key={m.key} margin={m} isOpen={openKey === m.key} onToggle={() => onToggle(m.key)} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CompanyTable label="Echte Firmen · Bruttomarge" rows={companyExamples.map((c) => ({ name: c.name, value: c.grossMargin }))} />
          <CompanyTable label="Echte Firmen · Nettomarge" rows={companyExamples.map((c) => ({ name: c.name, value: c.netMargin }))} />
        </div>

        <MarcusNote
          tone="gentle"
          body={
            <>
              Diese zwei Margen reichen für den Anfang. Brutto = wie viel bleibt nach den Produktionskosten. Netto = wie viel bleibt am Ende. Apple ist top in beiden, Walmart kämpft mit dünnen Margen. Das ist der Unterschied zwischen Tech und Retail.
            </>
          }
        />
      </div>
    </LessonLayout>
  );
}

function CompanyTable({ label, rows }: { label: string; rows: { name: string; value: string }[] }) {
  return (
    <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider mb-3 block">
        {label}
      </span>
      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li
            key={r.name}
            className="grid grid-cols-[1fr_auto] items-center gap-2 font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary tabular-nums"
          >
            <span className="text-is-text-primary">{r.name}</span>
            <span>{r.value}</span>
          </li>
        ))}
      </ul>
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
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          'group w-full flex flex-col gap-1.5 rounded-md p-2 min-h-[44px]',
          'hover:bg-is-bg-tertiary transition-colors duration-200 text-left',
          isOpen ? 'bg-is-bg-tertiary' : '',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span
              className={[
                'font-[family-name:var(--font-is-mono)] text-sm',
                margin.highlighted ? 'text-is-accent font-semibold' : 'text-is-text-primary',
              ].join(' ')}
            >
              {margin.label}
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted">
              (engl. {margin.enLabel})
            </span>
          </div>
          <span className="font-[family-name:var(--font-is-mono)] text-sm tabular-nums text-is-text-primary">
            {margin.value}% <span className="text-is-text-muted">· {margin.abs}</span>
          </span>
        </div>
        <div className="h-2.5 sm:h-3 w-full rounded-md bg-is-bg-secondary border border-is-bg-border overflow-hidden">
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
