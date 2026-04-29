'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'career_dojo_profile';
const ONBOARDING_PATH = '/onboarding/start';
const HOME_PATH = '/skill-tree';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // First-time visitors (no profile yet) → onboarding.
    // Returning visitors land on the skill tree, which is the actual home
    // menu. The onboarding flow itself does a one-time hook into the first
    // lesson on its final slide; we don't replicate that here, otherwise
    // every reload would force the user back into the active lesson.
    let target = ONBOARDING_PATH;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const profile = JSON.parse(raw) as { onboardingCompletedAt?: string };
        if (profile?.onboardingCompletedAt) target = HOME_PATH;
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
