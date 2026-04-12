'use client';

import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { getTrackData, getAllLessons } from '@/data/content';
import { TRACKS } from '@/data/tracks';
import { getCharacterForTrack, getRandomQuote } from '@/data/characters';
import { playClickSound } from '@/lib/sounds';
import Link from 'next/link';
import { Zap, Target, BookOpen, ChevronRight, Trophy, TrendingUp, ArrowRightLeft, Sparkles, Flame } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const { progress, level, t, update, reviewCount } = useStore();
  const [showTrackPicker, setShowTrackPicker] = useState(false);

  const currentTrack = TRACKS.find(tr => tr.id === progress.selectedTrack) || TRACKS[0];
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');

  const activeTrack = getTrackData(progress.selectedTrack || 'ib');
  const totalLessons = getAllLessons(progress.selectedTrack).length;
  const completedCount = progress.completedLessons.length;
  const accuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
    : 0;

  const allLessons = getAllLessons(progress.selectedTrack);
  const nextLesson = allLessons.find(l => !progress.completedLessons.includes(l.id));

  const dailyProgress = Math.min(progress.lessonsCompletedToday / progress.dailyGoal, 1);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Track Switcher */}
        <button
          onClick={() => { setShowTrackPicker(!showTrackPicker); playClickSound(); }}
          className="w-full duo-card p-3 flex items-center justify-between hover:border-[var(--duo-blue)] transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentTrack.icon}</span>
            <div className="text-left">
              <div className="text-xs text-[var(--duo-text-muted)] uppercase font-bold">{t('Current Track', 'Aktueller Track')}</div>
              <div className="font-bold text-sm" style={{ color: currentTrack.color }}>{currentTrack.title}</div>
            </div>
          </div>
          <ArrowRightLeft size={16} className="text-[var(--duo-text-muted)]" />
        </button>

        {showTrackPicker && (
          <div className="space-y-2">
            {TRACKS.map(tr => (
              <button
                key={tr.id}
                onClick={() => {
                  update({ selectedTrack: tr.id });
                  setShowTrackPicker(false);
                  playClickSound();
                }}
                disabled={tr.comingSoon}
                className={`w-full duo-card p-3 flex items-center gap-3 text-left transition-all ${
                  tr.id === progress.selectedTrack ? 'border-[var(--duo-green)]' : ''
                } ${tr.comingSoon ? 'opacity-40' : 'hover:border-[var(--duo-blue)]'}`}
              >
                <span className="text-2xl">{tr.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm">{tr.title}</div>
                  <div className="text-xs text-[var(--duo-text-muted)]">
                    {progress.language === 'de' ? tr.subtitleDe : tr.subtitle}
                  </div>
                </div>
                {tr.comingSoon && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--duo-border)] text-[var(--duo-text-muted)] font-bold">SOON</span>}
                {tr.id === progress.selectedTrack && <span className="text-[var(--duo-green)]">✓</span>}
              </button>
            ))}
          </div>
        )}

        {/* Character Quote */}
        <div className="flex items-start gap-3 duo-card p-4">
          <span className="text-2xl">{character.emoji}</span>
          <div className="text-sm">
            <span className="font-bold" style={{ color: character.color }}>{character.name}:</span>
            <span className="text-gray-300 ml-1 italic">{getRandomQuote(character, progress.language)}</span>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="duo-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-black">
                Hey {progress.username || 'Analyst'}!
              </h1>
              <p className="text-[var(--duo-text-muted)] text-sm mt-1">
                {t('Keep up the momentum!', 'Bleib am Ball!')}
              </p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[rgba(255,200,0,0.15)]">
              <Trophy size={16} className="text-[var(--duo-gold)]" />
              <span className="text-sm font-bold text-[var(--duo-gold)]">
                {t(level.title, level.titleDe)}
              </span>
            </div>
          </div>
          <div className="mb-2 flex justify-between text-xs text-[var(--duo-text-muted)]">
            <span>Level {level.level}</span>
            <span>{level.nextLevel ? `${progress.xp} / ${level.nextLevel.xpRequired} XP` : 'MAX'}</span>
          </div>
          <div className="progress-bar-track h-3">
            <div
              className="progress-bar-fill h-full bg-gradient-to-r from-[var(--duo-green)] to-[var(--duo-blue)]"
              style={{ width: `${level.progressToNext * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="duo-card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="streak-fire">🔥</span>
            </div>
            <div className="text-xl font-black text-[var(--duo-orange)]">{progress.streak}</div>
            <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">
              {t('Day Streak', 'Tage Streak')}
            </div>
          </div>
          <div className="duo-card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap size={18} className="text-[var(--duo-yellow)]" fill="var(--duo-yellow)" />
            </div>
            <div className="text-xl font-black text-[var(--duo-yellow)]">{progress.xp}</div>
            <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">
              {t('Total XP', 'Gesamt XP')}
            </div>
          </div>
          <div className="duo-card p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp size={18} className="text-[var(--duo-green)]" />
            </div>
            <div className="text-xl font-black text-[var(--duo-green)]">{accuracy}%</div>
            <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">
              {t('Accuracy', 'Genauigkeit')}
            </div>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="duo-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-[var(--duo-blue)]" />
              <span className="font-bold text-sm">{t('Daily Goal', 'Tagesziel')}</span>
            </div>
            <span className="text-sm text-[var(--duo-text-muted)]">
              {progress.lessonsCompletedToday}/{progress.dailyGoal}
            </span>
          </div>
          <div className="progress-bar-track h-3">
            <div
              className="progress-bar-fill h-full bg-[var(--duo-blue)]"
              style={{ width: `${dailyProgress * 100}%` }}
            />
          </div>
          {dailyProgress >= 1 && (
            <p className="text-[var(--duo-green)] text-sm font-bold mt-2 text-center">
              {t('Goal reached!', 'Ziel erreicht!')} 🎉
            </p>
          )}
        </div>

        {/* Review CTA — only when there are due SR cards */}
        {reviewCount > 0 && (
          <Link href="/review" className="block">
            <div className="duo-card p-5 border-2 border-[var(--duo-red)] hover:border-[var(--duo-red)] transition-all group cursor-pointer bg-gradient-to-br from-[rgba(255,75,75,0.1)] to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[var(--duo-red)] flex items-center justify-center">
                      <Flame size={22} className="text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[var(--duo-yellow)] text-[var(--duo-bg)] text-[11px] font-black flex items-center justify-center border-2 border-[var(--duo-card)]">
                      {reviewCount}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--duo-red)] font-bold uppercase tracking-wide">
                      {t('Spaced Repetition', 'Spaced Repetition')}
                    </div>
                    <div className="font-bold mt-0.5 truncate">
                      {progress.language === 'de'
                        ? `${reviewCount} Karten warten auf dich`
                        : `${reviewCount} cards are waiting for you`}
                    </div>
                    <div className="text-xs text-[var(--duo-text-muted)] mt-0.5 italic truncate">
                      {character.emoji}{' '}
                      {progress.language === 'de'
                        ? '"Die Fragen rächen sich. Geh sie nochmal durch."'
                        : '"Those questions bite back. Time to face them again."'}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-[var(--duo-text-muted)] group-hover:text-[var(--duo-red)] transition shrink-0"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Continue Learning CTA */}
        {nextLesson && (
          <Link href={`/lesson/${nextLesson.id}`} className="block">
            <div className="duo-card p-5 border-[var(--duo-green)] hover:border-[var(--duo-green)] transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--duo-green)] flex items-center justify-center">
                    <BookOpen size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--duo-green)] font-bold uppercase tracking-wide">
                      {t('Continue Learning', 'Weiterlernen')}
                    </div>
                    <div className="font-bold mt-0.5">
                      {t(nextLesson.title, nextLesson.titleDe)}
                    </div>
                    <div className="text-xs text-[var(--duo-text-muted)] mt-0.5">
                      +{nextLesson.xpReward} XP · {nextLesson.estimatedMinutes} min
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--duo-text-muted)] group-hover:text-[var(--duo-green)] transition" />
              </div>
            </div>
          </Link>
        )}

        {/* Solve / Online Test Prep CTA */}
        <Link href="/solve" className="block">
          <div className="duo-card p-5 border-2 border-[var(--duo-purple)] hover:border-[var(--duo-purple)] transition-all group cursor-pointer bg-gradient-to-br from-[rgba(206,130,255,0.08)] to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--duo-purple)] flex items-center justify-center shrink-0">
                  <Sparkles size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[var(--duo-purple)] font-bold uppercase tracking-wide">
                    {t('Round 1 Prep', 'Runde 1 Prep')}
                  </div>
                  <div className="font-bold mt-0.5 truncate">
                    {t('Online Tests: McKinsey · BCG · Bain', 'Online Tests: McKinsey · BCG · Bain')}
                  </div>
                  <div className="text-xs text-[var(--duo-text-muted)] mt-0.5">
                    {t('Solve · Casey · SOVA practice', 'Solve · Casey · SOVA Übungen')}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-[var(--duo-text-muted)] group-hover:text-[var(--duo-purple)] transition shrink-0" />
            </div>
          </div>
        </Link>

        {/* Unit Overview */}
        <div>
          <h2 className="font-black text-lg mb-3">{t('Your Learning Path', 'Dein Lernpfad')}</h2>
          <div className="space-y-3">
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
                  <div className={`duo-card p-4 flex items-center gap-4 ${isLocked ? 'opacity-40' : ''}`}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${unit.color}20`, border: `2px solid ${unit.color}` }}
                    >
                      {unit.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">
                        {t(unit.title, unit.titleDe)}
                      </div>
                      <div className="text-xs text-[var(--duo-text-muted)] mt-0.5">
                        {unitCompleted}/{unitLessons.length} {t('completed', 'abgeschlossen')}
                        {isLocked && ` · ${unit.requiredXp} XP ${t('required', 'benötigt')}`}
                      </div>
                      <div className="progress-bar-track h-1.5 mt-2">
                        <div
                          className="progress-bar-fill h-full"
                          style={{ width: `${pct * 100}%`, background: unit.color }}
                        />
                      </div>
                    </div>
                    {pct === 1 && <span className="text-[var(--duo-green)] text-lg">✓</span>}
                    {isLocked && <span className="text-lg">🔒</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="duo-card p-5 text-center">
          <div className="text-3xl font-black">{completedCount}/{totalLessons}</div>
          <div className="text-sm text-[var(--duo-text-muted)]">
            {t('Lessons Completed', 'Lektionen abgeschlossen')}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
