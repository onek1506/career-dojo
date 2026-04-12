'use client';

import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { ALL_ONLINE_TESTS } from '@/data/online-tests';
import { getCharacterForTrack } from '@/data/characters';
import Link from 'next/link';
import { ChevronRight, Zap, Clock, Target, Sparkles, AlertCircle } from 'lucide-react';

export default function SolvePage() {
  const { progress, t } = useStore();
  const character = getCharacterForTrack('consulting');
  const isDE = progress.language === 'de';

  return (
    <AppShell>
      <div className="space-y-6 pb-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,150,0,0.12)] border border-[var(--duo-orange)]">
            <Sparkles size={12} className="text-[var(--duo-orange)]" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--duo-orange)]">
              {t('Round 1 Prep', 'Runde 1 Prep')}
            </span>
          </div>
          <h1 className="text-2xl font-black">{t('Online Test Prep', 'Online Test Prep')}</h1>
          <p className="text-sm text-[var(--duo-text-muted)] max-w-md mx-auto">
            {t(
              'These tests replace the classic case interview at top firms. Master them to pass Round 1.',
              'Diese Tests ersetzen das klassische Case Interview bei Top-Firmen. Meistere sie, um Runde 1 zu bestehen.',
            )}
          </p>
        </div>

        {/* Character intro */}
        <div className="flex items-start gap-3 duo-card p-4">
          <span className="text-3xl shrink-0">{character.emoji}</span>
          <div className="text-sm">
            <span className="font-bold" style={{ color: character.color }}>
              {character.name}:
            </span>
            <span className="text-gray-300 ml-1 italic">
              {isDE
                ? '"Diese Tests entscheiden, ob du in die nächste Runde kommst. Struktur schlägt Glück — und Übung schlägt Panik. Let\'s get MECE!"'
                : '"These tests decide whether you make it to the next round. Structure beats luck — and practice beats panic. Let\'s get MECE!"'}
            </span>
          </div>
        </div>

        {/* Warning callout */}
        <div className="flex items-start gap-3 bg-[rgba(255,75,75,0.08)] border-2 border-[var(--duo-red)] rounded-xl p-4">
          <AlertCircle size={18} className="text-[var(--duo-red)] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-[var(--duo-red)]">
              {t('Important:', 'Wichtig:')}
            </strong>{' '}
            {t(
              'These tests have HARD cut-off scores. Fail them and you\'re out — even with a perfect CV. Practice is non-negotiable.',
              'Diese Tests haben HARTE Cut-off-Scores. Wer sie nicht besteht ist raus — auch mit perfektem Lebenslauf. Übung ist Pflicht.',
            )}
          </div>
        </div>

        {/* Test cards */}
        <div className="space-y-4">
          {ALL_ONLINE_TESTS.map((test) => {
            const isDone = test.exercises.every((ex) =>
              progress.completedLessons.includes(`solve-${test.id}-${ex.id}`),
            );

            return (
              <Link key={test.id} href={`/solve/${test.id}`}>
                <div
                  className="duo-card p-5 hover:border-[var(--duo-blue)] transition-all cursor-pointer group mt-4"
                  style={{ borderColor: test.color, borderWidth: 2 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                      style={{ background: test.accent }}
                    >
                      {test.firmEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                          style={{ background: test.accent, color: test.color }}
                        >
                          {test.firm}
                        </span>
                        {isDone && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-[rgba(88,204,2,0.15)] text-[var(--duo-green)]">
                            ✓ {t('Done', 'Erledigt')}
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-lg leading-tight">
                        {isDE ? test.titleDe : test.title}
                      </h3>
                      <p className="text-xs text-[var(--duo-text-muted)] mt-0.5">
                        {isDE ? test.subtitleDe : test.subtitle}
                      </p>
                      <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                        {isDE ? test.descriptionDe : test.description}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-xs text-[var(--duo-text-muted)]">
                        <span className="flex items-center gap-1">
                          <Target size={12} /> {test.exercises.length} {t('exercises', 'Übungen')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />{' '}
                          {Math.round(test.exercises.reduce((s, e) => s + e.timeSeconds, 0) / 60)} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap size={12} fill="currentColor" />
                          {test.exercises.reduce((s, e) => s + e.xpReward, 0)} XP
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-[var(--duo-text-muted)] group-hover:text-[var(--duo-blue)] transition shrink-0"
                    />
                  </div>

                  {/* "What is tested" preview */}
                  <div className="mt-4 pt-4 border-t border-[var(--duo-border)]">
                    <div className="text-[10px] font-bold uppercase text-[var(--duo-text-muted)] mb-2">
                      {t('What is tested', 'Was getestet wird')}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isDE ? test.whatIsTestedDe : test.whatIsTested).slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-1 rounded-md bg-[var(--duo-bg)] text-gray-400 border border-[var(--duo-border)]"
                        >
                          {item.split('—')[0].trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2.5 rounded-xl text-white font-bold text-sm btn-press transition" style={{ background: test.color }}>
                    {t('Start Practice', 'Übung starten')} →
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="text-center text-xs text-[var(--duo-text-muted)] italic pb-4">
          💡{' '}
          {t(
            'Tip: Do each test at least twice — first to learn, second for speed.',
            'Tipp: Mach jeden Test mindestens zweimal — einmal zum Lernen, einmal für Geschwindigkeit.',
          )}
        </div>
      </div>
    </AppShell>
  );
}
