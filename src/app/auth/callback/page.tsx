'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/supabase/AuthProvider';
import { getProfile } from '@/lib/onboarding/profile';

function CallbackContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading } = useAuth();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (loading) return;
    const next = params.get('next') || '/course';
    if (user) {
      // First successful login this browser has seen a goal/timeframe or a
      // dismissal for: ask once, framed as a motivational step, before
      // continuing on. Skippable, never blocks reaching `next`.
      const profile = getProfile();
      const alreadyAskedOrAnswered = Boolean(profile.goal || profile.goalPromptDismissedAt);
      if (!alreadyAskedOrAnswered) {
        router.replace(`/auth/goal?next=${encodeURIComponent(next)}`);
      } else {
        router.replace(next);
      }
      return;
    }
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, [loading, user, params, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <div className="max-w-sm text-center flex flex-col gap-3">
        <p className="font-[family-name:var(--font-is-serif)] text-xl">
          {timedOut ? 'Der Link ist abgelaufen oder wurde schon benutzt.' : 'Du wirst angemeldet …'}
        </p>
        {timedOut && (
          <button
            type="button"
            onClick={() => router.push('/auth/gate')}
            className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent"
          >
            Neuen Link anfordern
          </button>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackContent />
    </Suspense>
  );
}
