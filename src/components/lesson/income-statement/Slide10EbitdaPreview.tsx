'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import { playClickSound } from '@/lib/sounds';
import type { SlideProps } from './types';

export default function Slide10EbitdaPreview({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  sidePanel,
}: SlideProps) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      sidePanel={sidePanel}
      footer={<LessonFooterCTA onClick={handleNext} label="Lektion abschließen" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-tight">
            Da war noch ein Begriff: EBITDA.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Den hast du im Wasserfall gesehen. Hier ein Vorgeschmack.
          </p>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-[family-name:var(--font-is-serif)] text-2xl text-is-text-primary">
              EBITDA
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
              /ˈiː.bɪt.dɑː/
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary italic">
              Substantiv
            </span>
          </div>
          <p className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary leading-relaxed">
            Earnings Before Interest, Taxes, Depreciation and Amortization
          </p>
          <div className="border-t border-is-bg-border pt-3">
            <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed">
              = Gewinn, <em>bevor</em> Bank, Staat und Buchhalter ihren Anteil bekommen haben.
            </p>
          </div>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-success uppercase tracking-wider">
              Warum jeder EBITDA nennt
            </span>
            <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
              Es zeigt die operative Profitabilität, unabhängig davon, wie eine Firma finanziert ist oder wo sie steuerlich sitzt. Perfekt zum Vergleichen.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-error uppercase tracking-wider">
              Warum manche es hassen
            </span>
            <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
              Es blendet echte Kosten aus (z.B. für Maschinen). Warren Buffett ist berühmt dafür, EBITDA als &bdquo;BS-Kennzahl&ldquo; zu bezeichnen.
            </p>
          </div>
          <div className="border-t border-is-bg-border pt-3">
            <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary leading-relaxed">
              <strong className="font-semibold">Lektion 3 widmet sich komplett EBITDA.</strong> Heute reicht es zu wissen: Du wirst diesen Begriff täglich hören.
            </p>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
