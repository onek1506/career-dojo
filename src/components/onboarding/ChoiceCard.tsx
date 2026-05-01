'use client';

import type { ReactNode } from 'react';

interface ChoiceCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export default function ChoiceCard({ selected, onClick, children, className = '' }: ChoiceCardProps) {
  const ring = selected
    ? 'border-[var(--accent-streak)] ring-2 ring-[var(--accent-streak)]'
    : 'border-[var(--border)] hover:border-[var(--border-strong)]';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`block w-full rounded border bg-[var(--bg-card)] px-6 py-5 text-left transition-colors ${ring} ${className}`}
    >
      {children}
    </button>
  );
}
