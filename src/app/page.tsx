'use client';

import AppShell from '@/components/AppShell';
import { useReviewStats } from '@/lib/use-review-stats';
import { getTrackData, getAllLessons } from '@/data/content';
import { TRACKS } from '@/data/tracks';
import { getCharacterForTrack, getFirstQuote } from '@/data/characters';
import Link from 'next/link';
import { BookOpen, ChevronRight, Sparkles, Flame, Brain } from 'lucide-react';
import { BRAIN_TEASERS } from '@/data/brainteasers';

export default function HomePage() {
  const { progress, level, t, reviewCount } = useReviewStats();

  const currentTrack = TRACKS.find(tr => tr.id === progress.selectedTrack) || TRACKS[0];
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');

  const activeTrack = getTrackData(progress.selectedTrack || 'ib');
  const totalLessons = getAllLessons(progress.selectedTrack).length;
  const completedCount = progress.completedLessons.length;

  const allLessons = getAllLessons(progress.selectedTrack);
  const nextLesson = allLessons.find(l => !progress.completedLessons.includes(l.id));

  // Daily Brainteaser — deterministic rotation by day-of-year
  const isConsulting = progress.selectedTrack === 'consulting';
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const dailyBrainteaser = BRAIN_TEASERS[dayOfYear % BRAIN_TEASERS.length];

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Review CTA — GANZ OBEN, prominent amber card */}
        {reviewCount > 0 && (
          <Link href="/review" className="block">
            <div
              className="duo-card p-4 border-2 transition-all group cursor-pointer"
              style={{
                background: 'rgba(250,238,218,0.08)',
                borderColor: 'var(--accent-streak)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--accent-streak)' }}
                    >
                      <Flame size={22} className="text-white" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-[var(--accent-wrong)] text-white text-[11px] font-black flex items-center justify-center border-2 border-[var(--bg-card)]">
                      {reviewCount}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--accent-streak)' }}>
                      {t('Spaced Repetition', 'Spaced Repetition')}
                    </div>
                    <div className="font-bold text-sm mt-0.5 truncate">
                      {progress.language === 'de'
                        ? `${reviewCount} Karten warten auf dich`
                        : `${reviewCount} cards waiting`}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      {t('Tap to review with Anki-style cards', 'Tippe um Anki-Karten zu wiederholen')}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-[var(--text-muted)] group-hover:text-[var(--accent-streak)] transition shrink-0"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Track Label — static, switcher is in Profile */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-lg">{currentTrack.icon}</span>
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {currentTrack.title}
          </span>
        </div>

        {/* Character + Quote — only shown conditionally */}
        {(progress.streak % 7 === 0 && progress.streak > 0) ||
         (completedCount % 5 === 0 && completedCount > 0) ||
         progress.lessonsCompletedToday === 0 ? (
          <div className="flex items-center gap-3 duo-card p-3">
            <span className="text-xl shrink-0">{character.emoji}</span>
            <p className="text-sm text-[var(--text-secondary)] italic truncate">
              <span className="font-bold not-italic" style={{ color: character.color }}>{character.name}:</span>{' '}
              {getFirstQuote(character, progress.language)}
            </p>
          </div>
        ) : null}

        {/* Continue Learning CTA — prominent */}
        {nextLesson && (
          <Link href={`/lesson/${nextLesson.id}`} className="block">
            <div className="duo-card p-5 border-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center">
                    <BookOpen size={22} className="text-[var(--accent-primary-text)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wide">
                      {t('Continue Learning', 'Weiterlernen')}
                    </div>
                    <div className="font-bold mt-0.5">
                      {t(nextLesson.title, nextLesson.titleDe)}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      +{nextLesson.xpReward} XP · {nextLesson.estimatedMinutes} min
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition" />
              </div>
            </div>
          </Link>
        )}

        {/* Thin XP Progress Bar */}
        <div className="px-1">
          <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1">
            <span>Lv. {level.level} {t(level.title, level.titleDe)}</span>
            <span>{level.nextLevel ? `${progress.xp}/${level.nextLevel.xpRequired} XP` : 'MAX'}</span>
          </div>
          <div className="progress-bar-track h-[3px] rounded-full">
            <div
              className="progress-bar-fill h-full rounded-full bg-[var(--accent-xp)]"
              style={{ width: `${level.progressToNext * 100}%` }}
            />
          </div>
        </div>

        {/* Daily Brainteaser — Consulting only */}
        {isConsulting && (
          <div>
            <Link href="/brainteasers" className="block">
              <div className="duo-card p-4 border-2 border-[var(--border)] hover:border-[var(--accent-primary)] transition-all group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center shrink-0">
                    <Brain size={18} className="text-[var(--accent-primary-text)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wide">
                      {t('Daily Brainteaser', 'Täglicher Brainteaser')}
                    </div>
                    <div className="font-bold text-sm mt-0.5 line-clamp-2">
                      {progress.language === 'de' ? dailyBrainteaser.questionDe : dailyBrainteaser.question}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-1">
                      +{dailyBrainteaser.xpReward} XP · {dailyBrainteaser.difficulty}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition shrink-0" />
                </div>
              </div>
            </Link>
            <Link
              href="/brainteasers"
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                marginTop: 8,
                padding: '4px 0',
              }}
            >
              {progress.language === 'de'
                ? `Alle ${BRAIN_TEASERS.length} Brainteaser ansehen →`
                : `View all ${BRAIN_TEASERS.length} brainteasers →`}
            </Link>
          </div>
        )}

        {/* Solve / Online Test Prep CTA — only for Consulting track, Coming Soon */}
        {progress.selectedTrack === 'consulting' && (
          <Link href="/solve" className="block">
            <div className="duo-card p-4 border-2 border-[var(--accent-purple)] transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-purple)] flex items-center justify-center shrink-0">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-[var(--accent-purple)] font-bold uppercase tracking-wide">
                        {t('Round 1 Prep', 'Runde 1 Prep')}
                      </div>
                      <span
                        className="text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider"
                        style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
                      >
                        Soon
                      </span>
                    </div>
                    <div className="font-bold text-sm mt-0.5 truncate">
                      {t('Online Tests: McKinsey · BCG · Bain', 'Online Tests: McKinsey · BCG · Bain')}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] transition shrink-0" />
              </div>
            </div>
          </Link>
        )}

        {/* Unit Overview — compact, status-based */}
        <div>
          <h2 className="font-black text-base mb-3">{t('Your Learning Path', 'Dein Lernpfad')}</h2>
          <div className="space-y-2">
            {activeTrack.units.map(unit => {
              const unitLessons = unit.lessons;
              const unitCompleted = unitLessons.filter(l => progress.completedLessons.includes(l.id)).length;
              const pct = unitLessons.length > 0 ? unitCompleted / unitLessons.length : 0;
              const isLocked = progress.xp < unit.requiredXp;

              return (
                <Link
                  key={unit.id}
                  href={isLocked ? '#' : '/skill-tree'}
                  className={`block ${isLocked ? 'pointer-events-none' : ''}`}
                >
                  <div className={`duo-card p-3 flex items-center gap-3 ${isLocked ? 'opacity-40' : ''}`}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${unit.color}15`, border: `2px solid ${unit.color}40` }}
                    >
                      {unit.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">
                        {t(unit.title, unit.titleDe)}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                        {unitCompleted}/{unitLessons.length} {t('completed', 'abgeschlossen')}
                        {isLocked && ` · ${unit.requiredXp} XP ${t('required', 'benötigt')}`}
                      </div>
                      <div className="progress-bar-track h-1 mt-1.5">
                        <div
                          className="progress-bar-fill h-full"
                          style={{ width: `${pct * 100}%`, background: unit.color }}
                        />
                      </div>
                    </div>
                    {pct === 1 && <span className="text-[var(--accent-xp)] text-base">✓</span>}
                    {isLocked && <span className="text-sm">🔒</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="duo-card p-4 text-center">
          <div className="text-2xl font-black">{completedCount}/{totalLessons}</div>
          <div className="text-xs text-[var(--text-muted)]">
            {t('Lessons Completed', 'Lektionen abgeschlossen')}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
