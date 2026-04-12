'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import StreakReminder from './StreakReminder';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { progress, loaded, level } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !progress.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [loaded, progress.onboardingComplete, router]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)] flex items-center justify-center text-3xl font-black text-[var(--accent-primary-text)] animate-pulse">
            CD
          </div>
          <p className="text-[var(--text-secondary)] text-sm">Loading...</p>
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
