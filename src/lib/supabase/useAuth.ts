'use client';

// ============================================================
// Minimal email-based auth (magic link / OTP, no passwords).
// Wraps supabase.auth so components never touch the raw client.
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseClient, isSupabaseConfigured } from './client';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  supabaseConfigured: boolean;
}

export function useSupabaseAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    supabaseConfigured: isSupabaseConfigured(),
  });

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setState({
        user: data.session?.user ?? null,
        session: data.session,
        loading: false,
        supabaseConfigured: true,
      });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
        supabaseConfigured: true,
      });
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

  return { ...state, signInWithEmail, signOut };
}
