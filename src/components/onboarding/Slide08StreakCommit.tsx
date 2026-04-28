'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type { OnboardingSlideProps } from './types';

export default function Slide08StreakCommit({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={onNext} label="Bin dabei" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-2xl text-is-text-primary">
          Eine letzte Sache: Streaks.
        </h2>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isFirst = day === 1;
            return (
              <motion.div
                key={day}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.1 + (day - 1) * 0.05, ease: 'easeOut' }}
                className={[
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-[family-name:var(--font-is-mono)] text-sm transition-all duration-300',
                  isFirst
                    ? 'border-is-accent text-is-accent'
                    : 'border-is-bg-border text-is-text-muted',
                ].join(' ')}
                style={
                  isFirst
                    ? {
                        background: 'rgba(255, 107, 0, 0.18)',
                        boxShadow: '0 0 18px rgba(255, 107, 0, 0.25)',
                      }
                    : undefined
                }
              >
                {day}
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 text-is-text-primary mt-4">
          <p className="font-[family-name:var(--font-is-sans)]">
            Ab morgen läuft dein Streak. Jeden Tag, an dem du eine Lektion abschließt, wächst er.
          </p>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Wenn du einen Tag aussetzt, beginnt er bei Null. Klingt hart, ist aber psychologisch der einzige Mechanismus, der nachweislich funktioniert.
          </p>
          <p className="font-[family-name:var(--font-is-serif)] italic text-base sm:text-lg text-is-text-secondary border-l-2 border-is-accent pl-4 py-2">
            Dein Ziel der ersten Woche: 7 Tage in Folge. Das ist alles. Keine Lektion-Targets, keine XP. Nur 7 Tage.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
