'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import LessonLayout from '../../LessonLayout';
import MarcusNote from '../../MarcusNote';
import { playClickSound, playCompleteSound } from '@/lib/sounds';
import { formatDuration } from '@/lib/lesson/format';
import type { MicroRetentionResults, RetentionSlide as RetentionSlideData } from '../types';

interface Props {
  slide: RetentionSlideData;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  results?: MicroRetentionResults;
}

export default function RetentionSlide({ slide, currentStep, totalSteps, onBack, onNext, results }: Props) {
  const router = useRouter();

  const accuracy = results?.accuracy ?? 0;
  const elapsed = formatDuration(results?.elapsedSeconds ?? 0);
  const xp = results?.totalXp ?? 0;
  const correctCount = results?.correctCount ?? 0;
  const totalCount = Math.max(results?.totalCount ?? 0, 1);

  useEffect(() => {
    playCompleteSound();
  }, []);

  const handleStartNext = () => {
    playClickSound();
    onNext();
  };

  const handleExit = () => {
    playClickSound();
    router.push('/course');
  };

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={null}>
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Result header */}
        <section className="flex flex-col items-center gap-4 text-center">
          <ResultCircle correctCount={correctCount} totalCount={totalCount} />
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary mt-2">
            {slide.doneLabel}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full bg-is-bg-secondary border border-is-bg-border rounded-lg p-4">
            <Stat label="ACCURACY" value={`${accuracy}%`} />
            <Stat label="TIME" value={elapsed} />
            <Stat label="XP EARNED" value={`+${xp}`} />
          </div>
        </section>

        {/* Marcus feedback */}
        <section>
          <MarcusNote tone="gentle" subject={slide.marcus.subject} body={slide.marcus.body} />
        </section>

        {/* Next action + exit */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slide.next ? (
            <ActionCard
              tag={slide.next.tag ?? 'EMPFOHLEN'}
              title={slide.next.title}
              subtitle={slide.next.meta}
              ctaLabel="Jetzt starten"
              primary
              onClick={handleStartNext}
              icon={<ArrowRight size={14} />}
            />
          ) : (
            <ActionCard
              tag="GESCHAFFT"
              title="Alle Lektionen abgeschlossen"
              subtitle="Zurück zum Kurs"
              ctaLabel="Weiter"
              primary
              onClick={handleStartNext}
              icon={<ArrowRight size={14} />}
            />
          )}
          <ActionCard
            tag="PAUSE"
            title="Lektion beenden"
            subtitle="Streak gesichert"
            ctaLabel="Beenden"
            onClick={handleExit}
            icon={<X size={14} />}
            dimmed
          />
        </section>

        {/* PWA install hint */}
        <div className="bg-is-bg-secondary border border-is-bg-border rounded-md p-3 flex items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary flex items-center gap-2">
            <span aria-hidden>💡</span>
            Installiere als App für Push-Reminder und Offline-Modus.
          </p>
          <a
            href="/install"
            className="shrink-0 font-[family-name:var(--font-is-mono)] text-xs text-is-accent hover:text-is-accent-hover transition-colors"
          >
            Installieren →
          </a>
        </div>
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
  dimmed,
  onClick,
  icon,
}: {
  tag?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  primary?: boolean;
  dimmed?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={[
        'flex flex-col gap-3 p-4 rounded-lg bg-is-bg-secondary border transition-opacity duration-200',
        primary ? 'border-is-accent' : 'border-is-bg-border',
        dimmed ? 'opacity-80' : '',
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
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">{subtitle}</span>
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
