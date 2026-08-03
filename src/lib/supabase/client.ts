// ============================================================
// Browser Supabase client — singleton, lazily created.
// Uses the new publishable-key format (NEXT_PUBLIC_SUPABASE_ANON_KEY
// holds an sb_publishable_... value, not the legacy anon JWT — the
// supabase-js client accepts both transparently).
//
// Returns null whenever the two NEXT_PUBLIC_ vars are missing, so every
// caller treats Supabase as an optional layer on top of the localStorage
// fallback, never a hard dependency (matches the offline / logged-out UX).
// ============================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;
  if (client) return client;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
