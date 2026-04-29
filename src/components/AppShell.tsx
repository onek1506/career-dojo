'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { isOnboardingComplete } from '@/lib/onboarding/profile';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import StreakReminder from './StreakReminder';
import { setupGlobalAudioUnlock } from '@/lib/sounds';
import { X, Bell } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { progress, loaded, level, t } = useStore();
  const router = useRouter();
  const [showNotifBanner, setShowNotifBanner] = useState(false);

  // Set up global audio unlock for Safari
  useEffect(() => {
    setupGlobalAudioUnlock();
  }, []);

  // Apply theme to <html> so CSS variables switch
  useEffect(() => {
    if (!loaded) return;
    if (progress.theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [loaded, progress.theme]);

  useEffect(() => {
    // Two onboarding stores live in this app: the legacy `useStore.progress`
    // flag and the newer Marcus-onboarding profile in localStorage. Either
    // one being "done" should let the user out of the redirect loop.
    if (!loaded) return;
    if (progress.onboardingComplete) return;
    if (isOnboardingComplete()) return;
    router.push('/onboarding/start');
  }, [loaded, progress.onboardingComplete, router]);

  // Show notification banner once daily if not enabled
  useEffect(() => {
    if (!loaded) return;
    try {
      const enabled = localStorage.getItem('notifications-enabled') === 'true';
      if (enabled) return;
      const today = new Date().toISOString().split('T')[0];
      const dismissed = localStorage.getItem('notif-banner-dismissed');
      if (dismissed === today) return;
      setShowNotifBanner(true);
    } catch { /* ignore */ }
  }, [loaded]);

  const dismissNotifBanner = () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('notif-banner-dismissed', today);
    } catch { /* ignore */ }
    setShowNotifBanner(false);
  };

  const enableNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          localStorage.setItem('notifications-enabled', 'true');
        }
      } catch { /* ignore */ }
    }
    dismissNotifBanner();
  };

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

      {/* Notification enable banner — once daily if not enabled */}
      {showNotifBanner && (
        <div className="fixed top-16 left-4 right-4 z-[80] max-w-lg mx-auto">
          <div className="duo-card border-2 border-[var(--accent-streak)] rounded-2xl p-4 shadow-xl flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,107,53,0.15)] flex items-center justify-center shrink-0">
              <Bell size={18} className="text-[var(--accent-streak)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[var(--accent-streak)] leading-snug">
                🔥 {t('Don\'t lose your streak!', 'Verliere deinen Streak nicht!')}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
                {t(
                  'Enable reminders so we can ping you before your streak resets.',
                  'Aktiviere Erinnerungen, damit wir dich erinnern bevor dein Streak verloren geht.',
                )}
              </p>
              <button
                onClick={enableNotifications}
                className="mt-2 px-4 py-1.5 rounded-lg bg-[var(--accent-streak)] text-white text-xs font-bold btn-press transition"
              >
                {t('Enable Reminders', 'Erinnerungen aktivieren')}
              </button>
            </div>
            <button
              onClick={dismissNotifBanner}
              aria-label="Dismiss"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] shrink-0 -mt-1 -mr-1 p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <main className="pt-16 pb-20 min-h-screen">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>
      <BottomNav lang={progress.language} selectedTrack={progress.selectedTrack} />
    </>
  );
}
