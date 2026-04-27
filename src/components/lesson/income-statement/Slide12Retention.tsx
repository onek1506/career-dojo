'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Trophy } from 'lucide-react';
import MarcusNote from '../MarcusNote';
import { mockRetentionData } from './mockData';
import type { SlideProps } from './types';

export default function Slide12Retention({ results, onNext }: SlideProps) {
  const accuracy = results?.accuracy ?? 0;
  const elapsed = formatTime(results?.elapsedSeconds ?? 0);
  const xp = results?.totalXp ?? 0;
  const correctCount = results
    ? Object.values(results.quizResults).filter((r) => r?.correct).length
    : 0;

  const { streak, level, ranking, nextLesson } = mockRetentionData;
  const levelXp = Math.max(level.currentXp, xp); // reflect just-earned XP
  const xpToNext = Math.max(0, level.requiredXp - levelXp);
  const levelProgress = Math.min(100, (levelXp / level.requiredXp) * 100);

  return (
    <div className="flex flex-col gap-8">
      {/* Section 1: Result Header */}
      <section className="flex flex-col items-center gap-4 text-center">
        <ResultCircle correctCount={correctCount} totalCount={4} />
        <h2 className="font-[family-name:var(--font-is-serif)] text-3xl text-is-text-primary mt-2">
          Modul 01 abgeschlossen.
        </h2>

        <div className="grid grid-cols-3 gap-3 w-full bg-is-bg-secondary border border-is-bg-border rounded-lg p-4">
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
          <span className="font-[family-name:var(--font-is-serif)] text-3xl text-is-text-primary">
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
          <span className="font-[family-name:var(--font-is-serif)] text-3xl text-is-text-primary">
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
          subject="Re: Solid first session"
          body={
            <>
              Du hast die GuV-Mechanik in {elapsed} durch. Realität: 80% der Bewerber verwechseln EBITDA und EBIT. Du nicht mehr. Morgen: Bilanz-Logik — das brauchst du für die DCF-Lektion in Woche 2.
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
          onClick={() => onNext?.()}
          icon={<ArrowRight size={14} />}
        />
        <ActionCard
          title="Cheat Sheet runterladen"
          subtitle="PDF · Druckbar"
          ctaLabel="Download"
          onClick={() => {
            // PDF generation is owned by Slide 06; this is a placeholder.
            // Future: lift the cheat-sheet renderer into a shared util.
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
  );
}

function ResultCircle({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  const radius = 56;
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const dash = (correctCount / totalCount) * circumference;

  return (
    <div className="relative w-[120px] h-[120px]">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle
          cx={60}
          cy={60}
          r={radius}
          fill="none"
          stroke="var(--is-bg-border)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={60}
          cy={60}
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
        <span className="font-[family-name:var(--font-is-serif)] text-4xl text-is-text-primary">
          {correctCount} / {totalCount}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 items-start">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
        {label}
      </span>
      <span className="font-[family-name:var(--font-is-mono)] text-2xl sm:text-3xl text-is-text-primary tabular-nums">
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
          'flex items-center justify-center gap-1.5 py-2 rounded-md font-[family-name:var(--font-is-sans)] text-sm font-semibold',
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

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
