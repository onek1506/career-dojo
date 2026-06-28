'use client';

import { Fragment, type ReactNode } from 'react';

/**
 * Minimal inline formatter for lesson copy. Supports `**bold**` only — the
 * micro-lesson content is authored by us, so we deliberately keep the markup
 * surface tiny rather than pulling in a full markdown renderer.
 */
export function rich(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-is-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
