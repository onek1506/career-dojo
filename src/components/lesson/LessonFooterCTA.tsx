'use client';

import type { ReactNode } from 'react';

export interface LessonFooterCTAProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
}

export default function LessonFooterCTA({
  onClick,
  label = 'Weiter',
  disabled = false,
  variant = 'primary',
  icon,
}: LessonFooterCTAProps) {
  const base =
    'w-full min-h-[44px] py-3 sm:py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] transition-all duration-200 flex items-center justify-center gap-2';
  const styles = disabled
    ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
    : variant === 'primary'
      ? 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover'
      : 'bg-is-bg-secondary border border-is-bg-border text-is-text-primary hover:bg-is-bg-tertiary hover:border-is-text-muted';
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={[base, styles].join(' ')}>
      {label}
      {icon}
    </button>
  );
}
