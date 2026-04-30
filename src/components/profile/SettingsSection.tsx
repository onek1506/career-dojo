'use client';

import { useEffect, useState } from 'react';
import { getProfile, type LearningTime, type SkillProfile } from '@/lib/onboarding/profile';

const LEARNING_TIME_LABELS: Record<LearningTime, string> = {
  morning: 'Morgens 7–9 Uhr',
  lunch: 'Mittags 12–13 Uhr',
  evening: 'Abends 20–22 Uhr',
  flexible: 'Flexibel',
};

const TRACK_LABELS: Record<SkillProfile, string> = {
  A: 'Entdecker',
  B: 'Einsteiger',
  C: 'Profi-Drill',
};

const NOTIFICATION_KEY = 'career_dojo_notifications_enabled';

export default function SettingsSection() {
  const [learningTime, setLearningTime] = useState<string>('—');
  const [track, setTrack] = useState<string>('—');
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    setLearningTime(LEARNING_TIME_LABELS[profile.learningTime ?? 'flexible']);
    setTrack(TRACK_LABELS[profile.skillProfile ?? 'A']);
    try {
      setNotifications(window.localStorage.getItem(NOTIFICATION_KEY) === 'true');
    } catch {
      /* ignore */
    }
  }, []);

  const toggleNotifications = () => {
    const next = !notifications;
    setNotifications(next);
    try {
      window.localStorage.setItem(NOTIFICATION_KEY, String(next));
    } catch {
      /* ignore */
    }
  };

  const onReset = () => {
    if (typeof window === 'undefined') return;
    const ok = window.confirm('Wirklich alles zurücksetzen? Alle Lektionen und XP werden gelöscht.');
    if (!ok) return;
    [
      'career_dojo_profile',
      'career-dojo-progress',
      'career_dojo_quiz_performance',
      'career_dojo_xp_history',
      'career_dojo_testimonials',
      NOTIFICATION_KEY,
    ].forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    });
    window.location.href = '/';
  };

  return (
    <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl overflow-hidden">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider px-5 pt-4 pb-2 block">
        EINSTELLUNGEN
      </span>

      <Row label="Push-Benachrichtigungen" hint="Tägliche Erinnerung zur gewählten Lernzeit">
        <Toggle on={notifications} onClick={toggleNotifications} />
      </Row>
      <Row label="Lernzeit">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
          {learningTime}
        </span>
      </Row>
      <Row label="Lern-Track">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
          {track}
        </span>
      </Row>
      <Row label="Fortschritt zurücksetzen" hint="Alle Lektionen und XP löschen" danger>
        <button
          type="button"
          onClick={onReset}
          className="font-[family-name:var(--font-is-sans)] text-sm text-is-error hover:underline min-h-[44px] px-2"
        >
          Zurücksetzen
        </button>
      </Row>
    </section>
  );
}

function Row({
  label,
  hint,
  children,
  danger,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-is-bg-border">
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          className={[
            'font-[family-name:var(--font-is-sans)] text-sm',
            danger ? 'text-is-error' : 'text-is-text-primary',
          ].join(' ')}
        >
          {label}
        </span>
        {hint && (
          <span className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted">
            {hint}
          </span>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={[
        'w-11 h-6 rounded-full relative transition-colors duration-200 min-w-[44px] min-h-[24px]',
        on ? 'bg-is-accent' : 'bg-is-bg-border',
      ].join(' ')}
    >
      <span
        className="absolute top-0.5 w-5 h-5 bg-is-bg-primary rounded-full transition-all duration-200"
        style={{ left: on ? 'calc(100% - 22px)' : '2px' }}
      />
    </button>
  );
}
