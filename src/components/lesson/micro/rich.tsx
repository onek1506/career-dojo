'use client';

import { Fragment, type ReactNode } from 'react';

/**
 * Minimal inline formatter for lesson copy. Supports `**bold**` (new terms)
 * and `*italic*` (author emphasis). We keep the markup surface tiny rather
 * than pulling in a full markdown renderer.
 */
export function rich(text: string): ReactNode {
  // Split on **bold** first, then split each remaining chunk on *italic*
  // so the two never collide (bold contains asterisks too).
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-is-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const italicParts = part.split(/(\*[^*]+\*)/g);
    return (
      <Fragment key={i}>
        {italicParts.map((seg, j) =>
          seg.length > 2 && seg.startsWith('*') && seg.endsWith('*') ? (
            <em key={j}>{seg.slice(1, -1)}</em>
          ) : (
            <Fragment key={j}>{seg}</Fragment>
          ),
        )}
      </Fragment>
    );
  });
}
