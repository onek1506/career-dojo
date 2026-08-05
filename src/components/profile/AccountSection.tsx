'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/supabase/AuthProvider';

export default function AccountSection() {
  const { user, loading, signOut } = useAuth();

  return (
    <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl overflow-hidden">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider px-5 pt-4 pb-2 block">
        ACCOUNT
      </span>

      {loading ? (
        <div className="px-5 py-4 border-t border-is-bg-border">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">Lade …</span>
        </div>
      ) : user ? (
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-is-bg-border">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary truncate">
              {user.email}
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted">
              Fortschritt wird auf allen Geräten synchronisiert
            </span>
          </div>
          <button
            type="button"
            onClick={() => signOut()}
            className="font-[family-name:var(--font-is-sans)] text-sm text-is-error hover:underline shrink-0 min-h-[44px] px-2"
          >
            Abmelden
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-is-bg-border">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary">
              Nicht angemeldet
            </span>
            <span className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted">
              Fortschritt lebt nur in diesem Browser
            </span>
          </div>
          <Link
            href="/auth/gate"
            className="font-[family-name:var(--font-is-sans)] text-sm text-is-accent hover:underline shrink-0 min-h-[44px] px-2 flex items-center"
          >
            Anmelden
          </Link>
        </div>
      )}
    </section>
  );
}
