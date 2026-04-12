'use client';

import { useEffect, useState } from 'react';
import { X, Flame } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getCharacterForTrack, getFirstQuote } from '@/data/characters';

const DISMISS_KEY = 'streak-reminder-dismissed-date';

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function isYesterdayStr(dateStr: string): boolean {
  if (!dateStr) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().split('T')[0];
}

/**
 * In-app daily reminder banner. Acts as a stand-in for a real
 * push notification: when the user comes back after missing yesterday,
 * a character pops up with a streak nudge. Dismissal is per-day.
 */
export default function StreakReminder() {
  const { progress, loaded, t } = useStore();
  const [visible, setVisible] = useState(false);
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');

  useEffect(() => {
    if (!loaded) return;
    if (typeof window === 'undefined') return;

    // Only nudge users who actually opted in
    let optedIn = false;
    try {
      optedIn = localStorage.getItem('notifications-enabled') === 'true';
    } catch {
      optedIn = false;
    }
    if (!optedIn) return;

    // Skip if user already trained today
    const today = todayStr();
    if (progress.lastActiveDate === today) return;

    // Only show if user actually has prior activity (i.e. missed yesterday or earlier)
    if (!progress.lastActiveDate) return;

    // Honor per-day dismissal
    try {
      if (localStorage.getItem(DISMISS_KEY) === today) return;
    } catch {
      // ignore
    }

    setVisible(true);
  }, [loaded, progress.lastActiveDate]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, todayStr());
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const headline = isYesterdayStr(progress.lastActiveDate)
    ? t('Your streak is at risk!', 'Dein Streak ist in Gefahr!')
    : t('Welcome back — your streak is gone.', 'Willkommen zurück — dein Streak ist weg.');

  return (
    <div className="fixed top-16 left-4 right-4 z-[90] max-w-lg mx-auto">
      <div className="duo-card bg-[var(--duo-card)] border-2 border-[var(--accent-streak)] rounded-2xl p-4 shadow-2xl flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[rgba(255,150,0,0.15)] flex items-center justify-center shrink-0">
          <Flame size={20} className="text-[var(--accent-streak)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[var(--accent-streak)] leading-snug">
            {headline}
          </p>
          <div className="flex items-start gap-2 mt-2">
            <span className="text-base shrink-0">{character.emoji}</span>
            <p className="text-[11px] italic text-[var(--duo-text-muted)] leading-snug">
              {getFirstQuote(character, progress.language)}
            </p>
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-[var(--duo-text-muted)] hover:text-white shrink-0 -mt-1 -mr-1 p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
