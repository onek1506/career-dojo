'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ONBOARDING_STATE_KEY = 'careerdojo_onboarding';
const ONBOARDING_PATH = '/onboarding';
const HOME_PATH = '/home';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let completed = false;
    try {
      const raw = window.localStorage.getItem(ONBOARDING_STATE_KEY);
      const state = raw ? (JSON.parse(raw) as { completed?: boolean }) : null;
      completed = Boolean(state?.completed);
    } catch {
      // Corrupt or unavailable localStorage → treat as not completed.
    }
    router.replace(completed ? HOME_PATH : ONBOARDING_PATH);
  }, [router]);

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-muted)' }}
    >
      <span className="font-[family-name:var(--font-is-mono)] text-sm">Lade…</span>
    </div>
  );
}
