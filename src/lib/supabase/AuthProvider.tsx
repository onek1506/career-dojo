'use client';

// ============================================================
// Single, app-wide Supabase auth subscription. Every component that
// needs to know "am I logged in, and as whom" reads it via useAuth()
// instead of subscribing to supabase.auth itself — one source of
// truth, one onAuthStateChange listener for the whole app.
// ============================================================

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseClient, isSupabaseConfigured } from './client';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  supabaseConfigured: boolean;
  signInWithEmail: (email: string, next?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setUser(nextSession?.user ?? null);
      setSession(nextSession);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWithEmail = useCallback(async (email: string, next?: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return { error: 'Supabase ist nicht konfiguriert.' };

    const redirectTo = new URL('/auth/callback', window.location.origin);
    if (next) redirectTo.searchParams.set('next', next);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo.toString() },
    });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, supabaseConfigured: isSupabaseConfigured(), signInWithEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be called within <AuthProvider>. Is it mounted in app/layout.tsx?');
  }
  return ctx;
}
