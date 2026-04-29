'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound } from '@/lib/sounds';
import { techcoBilanz } from './data';
import type { SlideProps } from './types';

const OPTIONS = [
  { id: 'A', label: 'Der Gewinn dieses Jahres', correct: false },
  { id: 'B', label: 'Kumulierte einbehaltene Gewinne über alle Jahre', correct: true },
] as const;

const FEEDBACK: Record<string, string> = {
  A: 'Nein. Retained Earnings ist kumulativ — alles, was die Firma über die Jahre verdient und NICHT ausgeschüttet hat. Der Gewinn dieses Jahres ist Net Income auf der GuV.',
  B: 'Genau. Retained Earnings = alle Jahresüberschüsse seit Gründung, minus alle Dividenden. Es wächst jedes Jahr, wenn die Firma profitabel ist.',
};

export default function Slide05EquilibriumExample({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  tone,
}: SlideProps) {
  const [picked, setPicked] = useState<string | null>(null);

  const onPick = (id: string) => {
    if (picked) return;
    setPicked(id);
    if (OPTIONS.find((o) => o.id === id)?.correct) playCorrectSound();
    else playWrongSound();
  };

  const handleNext = () => {
    playClickSound();
    onNext();
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
            Warum balanciert die Bilanz?
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Jeder Euro hat eine Quelle: Gläubiger oder Aktionäre.
          </p>
        </div>

        <p className="font-[family-name:var(--font-is-sans)] text-is-text-primary leading-relaxed">
          Die Gleichung Assets = Liabilities + Equity ist buchhalterische Logik. Jeder Euro, den eine Firma besitzt, kommt von irgendwoher: entweder von Gläubigern (Liabilities) oder von Aktionären (Equity). Es gibt keine dritte Quelle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BilanzColumn label="ASSETS" lines={techcoBilanz.assets} total={techcoBilanz.totalAssets} />
          <BilanzColumn
            label="LIABILITIES + EQUITY"
            lines={[...techcoBilanz.liabilities, ...techcoBilanz.equity]}
            total={techcoBilanz.totalLE}
            subtotals={[
              { label: 'Total Liab.', value: techcoBilanz.totalLiabilities },
              { label: 'Total Equity', value: techcoBilanz.totalEquity },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <h3 className="font-[family-name:var(--font-is-serif)] text-xl text-is-text-primary">
            Was sind Retained Earnings?
          </h3>
          <div className="flex flex-col gap-2">
            {OPTIONS.map((opt) => {
              const isPicked = picked === opt.id;
              const stateClass = !picked
                ? 'border-is-bg-border hover:bg-is-bg-tertiary'
                : opt.correct
                  ? 'border-is-success bg-is-success-muted'
                  : isPicked
                    ? 'border-is-error bg-is-error-muted'
                    : 'border-is-bg-border opacity-60';
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onPick(opt.id)}
                  disabled={!!picked}
                  className={[
                    'flex items-center gap-4 p-4 min-h-[44px] rounded-lg bg-is-bg-secondary border text-left',
                    'transition-all duration-200 cursor-pointer disabled:cursor-default',
                    stateClass,
                  ].join(' ')}
                >
                  <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                    {opt.id}
                  </span>
                  <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {picked && (
            <motion.div
              key="fb"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <MarcusNote tone={tone} body={FEEDBACK[picked]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}

function BilanzColumn({
  label,
  lines,
  total,
  subtotals,
}: {
  label: string;
  lines: { label: string; value: number }[];
  total: number;
  subtotals?: { label: string; value: number }[];
}) {
  return (
    <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 flex flex-col gap-2 font-[family-name:var(--font-is-mono)] text-sm">
      <span className="text-[10px] text-is-text-muted uppercase tracking-wider">{label}</span>
      <ul className="flex flex-col gap-1.5 text-is-text-primary">
        {lines.map((l) => (
          <li key={l.label} className="flex justify-between gap-3">
            <span className="text-is-text-secondary">{l.label}</span>
            <span className="tabular-nums">€{l.value}M</span>
          </li>
        ))}
      </ul>
      {subtotals && (
        <ul className="flex flex-col gap-1 mt-1 pt-2 border-t border-is-bg-border text-xs text-is-text-muted">
          {subtotals.map((s) => (
            <li key={s.label} className="flex justify-between">
              <span>{s.label}</span>
              <span className="tabular-nums">€{s.value}M</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-is-bg-border">
        <span className="text-[10px] text-is-text-muted uppercase tracking-wider">Total</span>
        <span className="flex items-center gap-1.5 text-is-accent tabular-nums">
          €{total}M <Check size={12} aria-hidden />
        </span>
      </div>
    </div>
  );
}
