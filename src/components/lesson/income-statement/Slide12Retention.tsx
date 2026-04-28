'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Trophy } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCompleteSound } from '@/lib/sounds';
import { formatDuration } from '@/lib/lesson/format';
import { mockRetentionData } from './mockData';
import type { SlideProps } from './types';

export default function Slide12Retention({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  results,
}: SlideProps) {
  const accuracy = results?.accuracy ?? 0;
  const elapsed = formatDuration(results?.elapsedSeconds ?? 0);
  const xp = results?.totalXp ?? 0;
  const correctCount = results
    ? Object.values(results.quizResults).filter((r) => r?.correct).length
    : 0;
  const totalQuestions = results
    ? Object.values(results.quizResults).filter((r) => r !== null).length
    : 0;

  const { streak, level, ranking, nextLesson } = mockRetentionData;
  const levelXp = Math.max(level.currentXp, xp);
  const xpToNext = Math.max(0, level.requiredXp - levelXp);
  const levelProgress = Math.min(100, (levelXp / level.requiredXp) * 100);

  // Play complete sound once on mount
  useEffect(() => {
    playCompleteSound();
  }, []);

  const handleStartNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
     
      footer={null}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Section 1: Result Header */}
        <section className="flex flex-col items-center gap-4 text-center">
          <ResultCircle correctCount={correctCount} totalCount={Math.max(totalQuestions, 2)} />
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary mt-2">
            Modul 01 abgeschlossen.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full bg-is-bg-secondary border border-is-bg-border rounded-lg p-4">
            <Stat label="ACCURACY" value={`${accuracy}%`} />
            <Stat label="TIME" value={elapsed} />
            <Stat label="XP EARNED" value={`+${xp}`} />
          </div>
        </section>

        {/* Section 2: Streak & Level */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 flex flex-col gap-3">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-gold uppercase tracking-wider flex items-center gap-1.5">
              <span aria-hidden>🔥</span> STREAK
            </span>
            <span className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary">
              Tag {streak.current} / {streak.target}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: streak.target }).map((_, i) => (
                <div
                  key={i}
                  className={[
                    'flex-1 h-2 rounded-full',
                    i < streak.current ? 'bg-is-gold' : 'bg-is-bg-border',
                  ].join(' ')}
                />
              ))}
            </div>
            <p className="font-[family-name:var(--font-is-sans)] text-xs text-is-text-muted">
              Komm morgen wieder, sonst startet&apos;s bei Null.
            </p>
          </div>

          <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 flex flex-col gap-3">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
              LEVEL
            </span>
            <span className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary">
              Level {level.current} → Level {level.next}
            </span>
            <div className="h-2 rounded-full bg-is-bg-border overflow-hidden">
              <motion.div
                className="h-full bg-is-accent"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="font-[family-name:var(--font-is-sans)] text-xs text-is-text-muted">
              Noch {xpToNext} XP bis Level {level.next}.
            </p>
          </div>
        </section>

        {/* Section 3: Marcus Feedback */}
        <section>
          <MarcusNote
            tone="gentle"
            subject="Re: Erste Lektion geschafft"
            body={
              <>
                Gut gemacht. Du verstehst jetzt, was eine GuV ist und wie Brutto- und Nettomarge funktionieren. Das ist die Basis für alles, was kommt. In Lektion 2 schauen wir uns die einzelnen Aufwandsarten an — COGS, SG&amp;A und was sonst noch alles vom Umsatz abgezogen wird. Bis dann.
              </>
            }
          />
        </section>

        {/* Section 4: Next Action */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ActionCard
            tag="EMPFOHLEN"
            title={`Modul 02 — ${nextLesson.title}`}
            subtitle={`${nextLesson.duration} · +${nextLesson.xp} XP`}
            ctaLabel="Jetzt starten"
            primary
            onClick={handleStartNext}
            icon={<ArrowRight size={14} />}
          />
          <ActionCard
            title="Cheat Sheet runterladen"
            subtitle="PDF · Druckbar"
            ctaLabel="Download"
            onClick={() => {
              window.print();
            }}
            icon={<Download size={14} />}
          />
          <ActionCard
            title={`Du bist im Top ${ranking.percentile}%`}
            subtitle={`von ${ranking.totalUsers.toLocaleString('de-DE')} Nutzern dieser Woche`}
            ctaLabel="Leaderboard ansehen"
            onClick={() => {}}
            icon={<Trophy size={14} />}
          />
        </section>

        {/* Footer banner: PWA install hint */}
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
  const radius = 38; // 80px diameter on mobile
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const dash = (correctCount / totalCount) * circumference;

  return (
    <div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]">
      <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90">
        <circle
          cx={42}
          cy={42}
          r={radius}
          fill="none"
          stroke="var(--is-bg-border)"
          strokeWidth={stroke}
        />
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

