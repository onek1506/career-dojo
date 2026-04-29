'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { balanceSheetPositions, type PositionGroup, type PositionItem } from './data';
import type { SlideProps } from './types';

export default function Slide04Positions({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  // Open key encodes group + item index, e.g. "assets:0:1"
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hasClicked, setHasClicked] = useState(false);

  const onToggle = (key: string) => {
    setOpenKey((prev) => {
      const next = prev === key ? null : key;
      if (next) {
        playRevealSound();
        setHasClicked(true);
      }
      return next;
    });
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
            Die wichtigsten Positionen.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Tippe eine Position an — Erklärung erscheint darunter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Column title="Assets" sectionKey="assets" groups={balanceSheetPositions.assets} openKey={openKey} onToggle={onToggle} />
          <Column
            title="Liabilities + Equity"
            sectionKey="le"
            groups={balanceSheetPositions.liabilitiesAndEquity}
            openKey={openKey}
            onToggle={onToggle}
          />
        </div>

        <AnimatePresence>
          {hasClicked && (
            <motion.div
              key="marcus"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <MarcusNote
                tone={tone}
                body="Du musst das nicht alles auswendig kennen. Aber Cash, AR, Inventory, PP&E auf der Asset-Seite und Debt, AP, Retained Earnings auf der anderen — die musst du reflexartig benennen können."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}

function Column({
  title,
  sectionKey,
  groups,
  openKey,
  onToggle,
}: {
  title: string;
  sectionKey: string;
  groups: PositionGroup[];
  openKey: string | null;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {groups.map((g, gi) => (
          <div key={`${sectionKey}-${gi}`} className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              {g.group}
            </span>
            <ul className="flex flex-col gap-2">
              {g.items.map((item, ii) => {
                const key = `${sectionKey}:${gi}:${ii}`;
                const isOpen = openKey === key;
                return <PositionRow key={key} item={item} isOpen={isOpen} onToggle={() => onToggle(key)} />;
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PositionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: PositionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={[
          'min-h-[44px] flex items-center justify-between gap-3 bg-is-bg-secondary border rounded-lg px-4 py-3 text-left',
          'transition-all duration-200 hover:bg-is-bg-tertiary hover:border-is-text-muted',
          isOpen ? 'border-is-accent' : 'border-is-bg-border',
        ].join(' ')}
      >
        <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary">
          {item.label}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted">
          {isOpen ? '−' : '+'}
        </span>
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
            <div className="bg-is-bg-tertiary border border-is-bg-border rounded-md p-3">
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                {item.tooltip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
