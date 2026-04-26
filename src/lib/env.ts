// CareerDojo — typsichere Environment-Variablen
//
// Importiere `env` aus dieser Datei statt `process.env` direkt zu nutzen.
// So bekommst du Autovervollständigung UND einen klaren Fehler beim Start,
// wenn ein Key fehlt — nicht erst zur Laufzeit in irgendeinem API-Handler.
//
// Aufteilung:
//   serverEnv  — nur in Server Components / API Routes verfügbar
//   publicEnv  — NEXT_PUBLIC_* Keys, auch im Browser sichtbar

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Kopiere .env.example nach .env.local und trage den Wert ein.`,
    );
  }
  return value;
}

function optional(key: string, fallback: string = ''): string {
  return process.env[key] ?? fallback;
}

// ---------------------------------------------------------------------------
// Server-only secrets (NICHT mit NEXT_PUBLIC_ prefixen!)
// ---------------------------------------------------------------------------
// Diese werden nur beim ersten Zugriff evaluiert (lazy). So crasht die App
// nicht schon beim Import in einer Client-Datei — der Fehler kommt erst,
// wenn tatsächlich ein Server-Handler die Variable liest.

export const serverEnv = {
  get OPENAI_API_KEY() {
    return required('OPENAI_API_KEY');
  },
  get ANTHROPIC_API_KEY() {
    return required('ANTHROPIC_API_KEY');
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return required('SUPABASE_SERVICE_ROLE_KEY');
  },
};

// ---------------------------------------------------------------------------
// Public keys (im Browser verfügbar via NEXT_PUBLIC_ Prefix)
// ---------------------------------------------------------------------------

export const publicEnv = {
  SUPABASE_URL: optional('NEXT_PUBLIC_SUPABASE_URL'),
  SUPABASE_ANON_KEY: optional('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
};
