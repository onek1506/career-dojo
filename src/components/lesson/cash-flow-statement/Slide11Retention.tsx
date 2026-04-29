'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCompleteSound } from '@/lib/sounds';
import { formatDuration } from '@/lib/lesson/format';
import { marcusTexts } from './data';
import type { SlideProps } from './types';

const NEXT_LESSON = {
  title: 'Die drei Statements verlinkt',
  duration: '10 Min',
  xp: 40,
};

export default function Slide11Retention({ currentStep, totalSteps, onBack, onNext, results, tone }: SlideProps) {
  const accuracy = results?.accuracy ?? 0;
  const elapsed = formatDuration(results?.elapsedSeconds ?? 0);
  const xp = results?.totalXp ?? 0;
  const correctCount = results
    ? Object.values(results.quizResults).filter((r) => r?.correct).length
    : 0;
  const totalQuestions = results
    ? Object.values(results.quizResults).filter((r) => r !== null).length
    : 0;

  useEffect(() => {
    playCompleteSound();
  }, []);

  const handleStartNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={null}>
      <div className="flex flex-col gap-6 sm:gap-8">
        <section className="flex flex-col items-center gap-4 text-center">
          <ResultCircle correctCount={correctCount} totalCount={Math.max(totalQuestions, 2)} />
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary mt-2">
            Modul 03 abgeschlossen.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full bg-is-bg-secondary border border-is-bg-border rounded-lg p-4">
            <Stat label="ACCURACY" value={`${accuracy}%`} />
            <Stat label="TIME" value={elapsed} />
            <Stat label="XP EARNED" value={`+${xp}`} />
          </div>
        </section>

        <section>
          <MarcusNote
            tone={tone}
            subject={marcusTexts.retentionEmail.subject}
            body={tone === 'sharp' ? marcusTexts.retentionEmail.sharp : marcusTexts.retentionEmail.gentle}
          />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ActionCard
            tag="EMPFOHLEN"
            title={`Modul 04 — ${NEXT_LESSON.title}`}
            subtitle={`${NEXT_LESSON.duration} · +${NEXT_LESSON.xp} XP`}
            ctaLabel="Jetzt starten"
            primary
            onClick={handleStartNext}
            icon={<ArrowRight size={14} />}
          />
          <ActionCard
            title="Lektion wiederholen"
            subtitle="CFS nochmal durchgehen"
            ctaLabel="Wiederholen"
            onClick={() => onBack()}
            icon={<Trophy size={14} />}
          />
        </section>
      </div>
    </LessonLayout>
  );
}

function ResultCircle({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  const radius = 38;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const dash = (correctCount / totalCount) * circumference;

  return (
    <div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]">
      <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90">
        <circle cx={42} cy={42} r={radius} fill="none" stroke="var(--is-bg-border)" strokeWidth={stroke} />
        <motion.circle
          cx={42}
          cy={42}
          r={radius}
          fill="none"
          stroke="var(--is-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary">
          {correctCount} / {totalCount}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 items-start">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-widest">
        {label}
      </span>
      <span className="font-[family-name:var(--font-is-mono)] text-xl sm:text-3xl text-is-text-primary tabular-nums">
        {value}
      </span>
    </div>
  );
}

function ActionCard({
  tag,
  title,
  subtitle,
  ctaLabel,
  primary,
  onClick,
  icon,
}: {
  tag?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  primary?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={[
        'flex flex-col gap-3 p-4 rounded-lg bg-is-bg-secondary border',
        primary ? 'border-is-accent' : 'border-is-bg-border',
      ].join(' ')}
    >
      {tag && (
        <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-accent uppercase tracking-wider">
          {tag}
        </span>
      )}
      <div className="flex flex-col gap-1 flex-1">
        <span className="font-[family-name:var(--font-is-sans)] text-sm font-semibold text-is-text-primary">
          {title}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          {subtitle}
        </span>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={[
          'flex items-center justify-center gap-1.5 py-2 min-h-[44px] rounded-md font-[family-name:var(--font-is-sans)] text-sm font-semibold',
          'transition-all duration-200',
          primary
            ? 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover'
            : 'bg-is-bg-tertiary border border-is-bg-border text-is-text-primary hover:border-is-text-muted',
        ].join(' ')}
      >
        {ctaLabel}
        {icon}
      </button>
    </div>
  );
}
