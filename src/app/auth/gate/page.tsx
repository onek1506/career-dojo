'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/supabase/AuthProvider';
import { markSignupGateSeen } from '@/lib/auth-gate';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GateContent() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/course';
  const fromLessonGate = params.get('reason') === 'gate';
  const { user, loading: authLoading, signInWithEmail, supabaseConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  // Already logged in (e.g. reached this route by mistake, or a stale link) — nothing to do here.
  useEffect(() => {
    if (!authLoading && user) router.replace(next);
  }, [authLoading, user, next, router]);

  const continueWithoutAccount = () => {
    markSignupGateSeen();
    router.push(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }
    setStatus('sending');
    setError('');
    const result = await signInWithEmail(email.trim(), next);
    if (result.error) {
      setError(result.error);
      setStatus('error');
      return;
    }
    markSignupGateSeen();
    setStatus('sent');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
              {fromLessonGate ? 'Drei Lektionen geschafft' : 'Anmelden'}
            </span>
            <h1 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium leading-tight">
              {fromLessonGate
                ? 'Dein Fortschritt lebt bisher nur in diesem Browser.'
                : 'Melde dich an, um deinen Fortschritt zu sichern.'}
            </h1>
            <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-secondary leading-relaxed">
              Lösch den Cache, wechsle das Gerät oder öffne ein Inkognito-Fenster — und alles ist
              weg. Ein Account braucht kein Passwort: E-Mail eintragen, Link öffnen, fertig.
            </p>
          </div>

          {status === 'sent' ? (
            <div className="rounded-lg border p-4" style={{ borderColor: 'var(--is-bg-border)', background: 'var(--is-bg-secondary)' }}>
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary">
                Link verschickt an <span className="text-is-accent">{email.trim()}</span>. Öffne
                ihn auf diesem Gerät, dann geht's direkt weiter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="du@beispiel.com"
                autoFocus
                disabled={!supabaseConfigured || status === 'sending'}
                className="w-full px-4 py-3 rounded-lg border font-[family-name:var(--font-is-sans)] text-sm bg-transparent outline-none disabled:opacity-50"
                style={{ borderColor: 'var(--is-bg-border)', color: 'var(--is-text-primary)' }}
              />
              {error && (
                <p className="font-[family-name:var(--font-is-sans)] text-xs" style={{ color: 'var(--is-error)' }}>
                  {error}
                </p>
              )}
              {!supabaseConfigured && (
                <p className="font-[family-name:var(--font-is-sans)] text-xs text-is-text-muted">
                  Account-Anlage ist gerade nicht verfügbar.
                </p>
              )}
              <button
                type="submit"
                disabled={!supabaseConfigured || status === 'sending'}
                className="w-full py-3 rounded-lg font-[family-name:var(--font-is-sans)] text-sm font-medium transition disabled:opacity-50"
                style={{ background: 'var(--is-accent)', color: 'var(--is-bg-primary)' }}
              >
                {status === 'sending' ? 'Wird verschickt …' : 'Login-Link senden'}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={continueWithoutAccount}
            className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted hover:text-is-text-primary transition-colors self-center"
          >
            {fromLessonGate ? 'Ohne Account weiter' : 'Zurück'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default function SignupGatePage() {
  return (
    <Suspense fallback={null}>
      <GateContent />
    </Suspense>
  );
}
