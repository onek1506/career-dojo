'use client';

import type { ReactNode } from 'react';

export type MarcusTone = 'gentle' | 'sharp';

export interface MarcusNoteProps {
  subject?: string;
  body: string | ReactNode;
  tone?: MarcusTone;
}

export default function MarcusNote({ subject, body }: MarcusNoteProps) {
  // tone is currently only a content-side hint for callers; visuals are
  // identical so beginners and pros experience the same UI.
  return (
    <div
      className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg p-4"
      role="note"
      aria-label="Notiz von Marcus Hart"
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          aria-hidden
          className="flex items-center justify-center w-7 h-7 rounded-full border border-is-accent text-is-text-primary text-[10px] font-[family-name:var(--font-is-mono)] tracking-wider"
          style={{ background: 'var(--is-bg-tertiary)' }}
        >
          MH
        </div>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          From: Marcus Hart, Senior Coach
        </span>
      </div>
      {subject && (
        <div className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary mb-2">
          {subject}
        </div>
      )}
      <div className="font-[family-name:var(--font-is-sans)] text-is-text-primary italic leading-relaxed">
        {body}
      </div>
    </div>
  );
}
