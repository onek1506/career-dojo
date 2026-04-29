'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import type { OnboardingSlideProps } from './types';

export default function Slide01ColdOpen({ currentStep, totalSteps, onNext }: OnboardingSlideProps) {
  const footer = (
    <div className="flex justify-center py-2">
      <button
        type="button"
        onClick={onNext}
        className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary hover:text-is-text-primary transition-colors duration-200 flex items-center gap-2 min-h-[44px] px-2"
      >
        Erzähl mir mehr <ArrowRight size={14} />
      </button>
    </div>
  );

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={totalSteps} showProgress={false} footer={footer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col gap-6 sm:gap-8 min-h-[60vh] justify-center"
      >
        <h1 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-5xl lg:text-6xl text-is-text-primary leading-[1.1]">
          73% der IB-Bewerber scheitern am ersten Technical.
        </h1>
        <p className="font-[family-name:var(--font-is-serif)] italic text-lg sm:text-2xl text-is-text-secondary leading-snug">
          Nicht weil sie dumm sind. Weil sie falsch lernen.
        </p>
      </motion.div>
    </OnboardingLayout>
  );
}
