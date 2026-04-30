'use client';

import { useState } from 'react';

interface Props {
  currentDate: string | null;
  onSave: (date: string | null) => void;
}

export default function InterviewDateEditor({ currentDate, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(currentDate ?? '');

  const formatted = currentDate ? formatDate(currentDate) : null;
  const days = currentDate ? daysUntil(currentDate) : null;

  if (editing) {
    return (
      <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-3">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          INTERVIEW-DATUM
        </span>
        <input
          type="date"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="bg-is-bg-tertiary border border-is-bg-border rounded-lg px-3 py-2 font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary"
          style={{ colorScheme: 'dark' }}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onSave(draft || null);
              setEditing(false);
            }}
            className="bg-is-accent text-is-bg-primary px-4 py-2 rounded-lg font-[family-name:var(--font-is-mono)] text-sm font-semibold hover:bg-is-accent-hover transition-colors"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft(currentDate ?? '');
              setEditing(false);
            }}
            className="px-3 py-2 font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted hover:text-is-text-primary"
          >
            Abbrechen
          </button>
        </div>
      </section>
    );
  }

  if (!currentDate) {
    return (
      <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-3">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          INTERVIEW-DATUM
        </span>
        <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary">
          Setz ein Datum. Marcus passt seinen Ton an.
        </p>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="self-start bg-is-bg-tertiary border border-is-bg-border rounded-lg px-4 py-2 font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary hover:bg-is-bg-secondary hover:border-is-text-muted transition-all duration-200 min-h-[44px]"
        >
          Datum setzen
        </button>
      </section>
    );
  }

  return (
    <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          INTERVIEW-DATUM
        </span>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted underline hover:text-is-text-primary"
        >
          Ändern
        </button>
      </div>
      <span className="font-[family-name:var(--font-is-mono)] text-2xl text-is-text-primary tabular-nums">
        {formatted}
      </span>
      {days !== null && (
        <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary">
          In {days} {days === 1 ? 'Tag' : 'Tagen'}
        </span>
      )}
    </section>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  return Math.max(0, Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24)));
}
