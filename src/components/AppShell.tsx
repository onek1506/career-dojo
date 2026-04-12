'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import StreakReminder from './StreakReminder';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { progress, loaded, level, salary, onBench } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !progress.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [loaded, progress.onboardingComplete, router]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--duo-bg)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--duo-green)] flex items-center justify-center text-3xl font-black text-white animate-pulse">
            CD
          </div>
          <p className="text-[var(--duo-text-muted)] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!progress.onboardingComplete) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar
        xp={progress.xp}
        streak={progress.streak}
        levelTitle={progress.language === 'de' ? level.titleDe : level.title}
        salary={salary}
        onBench={onBench}
        benchDays={progress.benchDays}
      />
      <StreakReminder />
      <main className="pt-16 pb-20 min-h-screen">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>
      <BottomNav lang={progress.language} />
    </>
  );
}
