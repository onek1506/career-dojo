'use client';

import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { getTrackData } from '@/data/content';
import Link from 'next/link';
import { Lock, Check, Star } from 'lucide-react';

export default function SkillTreePage() {
  const { progress, t } = useStore();
  const activeTrack = getTrackData(progress.selectedTrack || 'ib');
  const isPEorVC = progress.selectedTrack === 'pe' || progress.selectedTrack === 'vc';

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-black">{t(activeTrack.title, activeTrack.titleDe)}</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            {t('Master each unit to level up', 'Meistere jede Einheit um aufzusteigen')}
          </p>
        </div>

        {/* Skill Tree — vertical path */}
        <div className="relative">
          {/* Blurred content wrapper for PE/VC */}
          <div className={isPEorVC ? 'blur-[4px] pointer-events-none select-none opacity-50' : ''}>
            <div className="flex flex-col items-center gap-4">
              {activeTrack.units.map((unit, unitIdx) => {
                const isLocked = progress.xp < unit.requiredXp;
                const unitLessons = unit.lessons;
                const completedInUnit = unitLessons.filter(l => progress.completedLessons.includes(l.id)).length;
                const allDone = completedInUnit === unitLessons.length && unitLessons.length > 0;

                return (
                  <div key={unit.id} className="w-full">
                    {/* Unit Header Node */}
                    <div className="flex flex-col items-center mb-4">
                      <div
                        className={`skill-node ${isLocked ? 'locked' : allDone ? 'completed' : 'current'}`}
                        style={{
                          borderColor: isLocked ? 'var(--border)' : unit.color,
                          background: isLocked ? 'var(--bg-card)' : `${unit.color}20`,
                        }}
                      >
                        {isLocked ? <Lock size={24} className="text-[var(--text-muted)]" /> :
                         allDone ? <Check size={28} className="text-[var(--accent-xp)]" /> :
                         <span>{unit.icon}</span>}
                      </div>
                      <h2 className={`font-bold text-sm mt-2 ${isLocked ? 'text-[var(--text-muted)]' : ''}`}>
                        {t(unit.title, unit.titleDe)}
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {completedInUnit}/{unitLessons.length} {t('completed', 'fertig')}
                        {isLocked && ` · 🔒 ${unit.requiredXp} XP`}
                      </p>
                    </div>

                    {/* Lessons in this unit */}
                    {!isLocked && (
                      <div className="grid grid-cols-1 gap-2 mb-2">
                        {unitLessons.map((lesson, i) => {
                          const isDone = progress.completedLessons.includes(lesson.id);
                          const bestScore = progress.completedQuizzes[lesson.id]?.bestScore;
                          const prevDone = i === 0 || progress.completedLessons.includes(unitLessons[i - 1].id);
                          const isAvailable = prevDone && !isLocked;

                          return (
                            <Link
                              key={lesson.id}
                              href={isAvailable ? `/lesson/${lesson.id}` : '#'}
                              className={!isAvailable ? 'pointer-events-none' : ''}
                            >
                              <div className={`duo-card p-4 flex items-center gap-3 ${!isAvailable ? 'opacity-40' : ''}`}>
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                                  style={{
                                    background: isDone ? `${unit.color}30` : 'var(--border)',
                                    border: `2px solid ${isDone ? unit.color : 'var(--border)'}`,
                                  }}
                                >
                                  {isDone ? <Check size={18} style={{ color: unit.color }} /> :
                                   !isAvailable ? <Lock size={14} className="text-[var(--text-muted)]" /> :
                                   <span className="text-sm font-bold">{i + 1}</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-sm truncate">
                                    {t(lesson.title, lesson.titleDe)}
                                  </div>
                                  <div className="text-xs text-[var(--text-secondary)] flex items-center gap-2 mt-0.5">
                                    <span>+{lesson.xpReward} XP</span>
                                    <span>·</span>
                                    <span>{lesson.estimatedMinutes} min</span>
                                    {lesson.type === 'quiz' && <span className="text-[var(--accent-streak)]">Quiz</span>}
                                    {lesson.type === 'calculation' && <span className="text-[var(--duo-purple)]">Calc</span>}
                                  </div>
                                </div>
                                {isDone && bestScore !== undefined && (
                                  <div className="flex items-center gap-1">
                                    <Star size={14} className="text-[var(--duo-gold)]" fill="var(--duo-gold)" />
                                    <span className="text-xs font-bold text-[var(--duo-gold)]">{bestScore}%</span>
                                  </div>
                                )}
                                {isDone && bestScore === undefined && (
                                  <span className="text-[var(--accent-xp)]">✓</span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Connector line between units */}
                    {unitIdx < activeTrack.units.length - 1 && (
                      <div className="flex justify-center">
                        <div className="w-0.5 h-6 bg-[var(--border)]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coming Soon overlay for PE/VC — outside blur wrapper */}
          {isPEorVC && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-black/75 text-white rounded-2xl px-8 py-6 text-center shadow-xl">
                <div className="text-xl font-black">Coming Soon</div>
                <div className="text-sm text-gray-300 mt-1">
                  {t('We\'re working on it 🔨', 'Wir arbeiten daran 🔨')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
