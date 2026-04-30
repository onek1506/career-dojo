'use client';

import { useEffect, useState } from 'react';
import { getUserState, getNextLevelXp, type UserState } from '@/lib/home/user-state';
import {
  LEVEL_LABELS,
  getTopicPerformance,
  getXpByLesson,
  type TopicPerformance,
  type XpEntry,
} from '@/lib/stats/stats-utils';
import BottomNav from '@/components/home/BottomNav';
import SkillLevelCard from '@/components/stats/SkillLevelCard';
import TotalStatsRow from '@/components/stats/TotalStatsRow';
import StrengthsWeaknessMatrix from '@/components/stats/StrengthsWeaknessMatrix';
import XpProgressCard from '@/components/stats/XpProgressCard';

export default function StatsPage() {
  const [state, setState] = useState<UserState | null>(null);
  const [topicPerf, setTopicPerf] = useState<TopicPerformance[]>([]);
  const [xpHistory, setXpHistory] = useState<XpEntry[]>([]);

  useEffect(() => {
    setState(getUserState());
    setTopicPerf(getTopicPerformance());
    setXpHistory(getXpByLesson());
  }, []);

  if (!state) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-muted)' }}
      >
        <span className="font-[family-name:var(--font-is-mono)] text-sm">Lade…</span>
      </div>
    );
  }

  const levelInfo = LEVEL_LABELS[state.currentLevel] ?? LEVEL_LABELS[1];
  const nextLevelXp = getNextLevelXp(state.currentLevel);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto px-6 pt-10 flex flex-col gap-6">
          <header>
            <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
              DEINE ENTWICKLUNG
            </p>
            <h1 className="font-[family-name:var(--font-is-serif)] text-4xl text-is-text-primary mt-2">
              Statistik
            </h1>
          </header>

          <SkillLevelCard
            level={state.currentLevel}
            title={levelInfo.title}
            description={levelInfo.description}
            totalXp={state.totalXp}
            nextLevelXp={nextLevelXp}
          />

          <TotalStatsRow
            streak={state.streakDays}
            completedLessons={state.completedLessons.length}
            totalXp={state.totalXp}
          />

          <StrengthsWeaknessMatrix topics={topicPerf} />

          <XpProgressCard history={xpHistory} />
        </div>
      </main>
      <BottomNav activeTab="stats" />
    </div>
  );
}
