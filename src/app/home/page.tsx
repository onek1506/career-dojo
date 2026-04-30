'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUserState,
  getDaysUntilInterview,
  getStreakStatus,
  type UserState,
} from '@/lib/home/user-state';
import { getNextLesson, getLessonById } from '@/lib/home/lesson-registry';
import { getMarcusDailyMessage } from '@/lib/home/marcus-messages';
import BottomNav from '@/components/home/BottomNav';
import MarcusDailyMessage from '@/components/home/MarcusDailyMessage';
import NextLessonCard from '@/components/home/NextLessonCard';
import StreakBar from '@/components/home/StreakBar';
import InterviewCountdown from '@/components/home/InterviewCountdown';

export default function HomePage() {
  const router = useRouter();
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    setState(getUserState());
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

  const nextLesson = getNextLesson(state.completedLessons, state.skillProfile);
  const daysUntilInterview = getDaysUntilInterview(state.interviewDate);
  const streakStatus = getStreakStatus(state.lastActiveDate);

  const lastCompletedId = state.completedLessons[state.completedLessons.length - 1];
  const lastLessonTitle = lastCompletedId ? getLessonById(lastCompletedId)?.title : undefined;

  const marcusMessage = getMarcusDailyMessage({
    streakStatus,
    streakDays: state.streakDays,
    daysUntilInterview,
    completedCount: state.completedLessons.length,
    lastLessonTitle,
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto px-6 pt-12 flex flex-col gap-6">
          <MarcusDailyMessage message={marcusMessage} />

          {nextLesson ? (
            <NextLessonCard lesson={nextLesson} onStart={() => router.push(nextLesson.route)} />
          ) : (
            <AllLessonsCompleteCard />
          )}

          <StreakBar days={state.streakDays} status={streakStatus} targetDays={30} />

          {daysUntilInterview !== null && <InterviewCountdown days={daysUntilInterview} />}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function AllLessonsCompleteCard() {
  return (
    <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-6 text-center">
      <p className="font-[family-name:var(--font-is-serif)] text-xl text-is-text-primary">
        Alle verfügbaren Lektionen abgeschlossen.
      </p>
      <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted mt-2 uppercase tracking-wider">
        Mehr Inhalte folgen.
      </p>
    </section>
  );
}
