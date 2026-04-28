'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'career_dojo_profile';
const ONBOARDING_PATH = '/onboarding/start';
const FIRST_LESSON_PATH = '/lesson/acc-1-income-statement';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let target = ONBOARDING_PATH;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const profile = JSON.parse(raw) as { onboardingCompletedAt?: string };
        if (profile?.onboardingCompletedAt) target = FIRST_LESSON_PATH;
      }
    } catch {
      // Corrupt or unavailable localStorage → fall through to onboarding.
    }
    router.replace(target);
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
