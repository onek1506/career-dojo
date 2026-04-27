'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { BookOpen } from 'lucide-react';
import { findGlossaryTerm } from '@/data/glossary';

interface GlossaryTooltipProps {
  /** English term to look up (case-insensitive). */
  term: string;
  /** Optional German term — tried as a fallback lookup key. */
  termDe?: string;
  /** What to render in-flow (usually the same text as the term). */
  children: ReactNode;
  /** Active UI language — picks which definition to show. */
  language?: 'en' | 'de';
}

/**
 * Inline tooltip that looks up a finance/consulting term from
 * `src/data/glossary.ts` and shows its definition + example in a
 * small popup. Hover on desktop, tap on mobile.
 *
 * If no glossary entry matches, `children` is rendered as plain text
 * with no interaction — so it's safe to wrap any word unconditionally.
 */
export default function GlossaryTooltip({
  term,
  termDe,
  children,
  language = 'de',
}: GlossaryTooltipProps) {
  const entry = useMemo(() => {
    // Try English first, then German, then the literal children string.
    return (
      findGlossaryTerm(term) ??
      (termDe ? findGlossaryTerm(termDe) : undefined) ??
      (typeof children === 'string' ? findGlossaryTerm(children) : undefined)
    );
  }, [term, termDe, children]);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
  const [hShift, setHShift] = useState(0); // horizontal pixel correction
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // Stable close handler for scroll listener
  const close = useCallback(() => setOpen(false), []);

  // Close on outside click / Escape / scroll (mobile-tap flow).
  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    // Close on any scroll — fixes tooltip staying open when user scrolls on mobile
    window.addEventListener('scroll', close, { passive: true, capture: true });
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', close, { capture: true });
    };
  }, [open, close]);

  // Flip the popup to the bottom if there's no room above,
  // and clamp horizontally so it never overflows the viewport.
  useEffect(() => {
    if (!open) {
      setHShift(0);
      return;
    }
    if (!wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    // Rough popup height ~220px — if less space above, open downward.
    setPlacement(wrapperRect.top < 240 ? 'bottom' : 'top');

    // Wait a frame so the tooltip is rendered before measuring it.
    requestAnimationFrame(() => {
      if (!tooltipRef.current) return;
      const rect = tooltipRef.current.getBoundingClientRect();
      const pad = 8; // min distance from viewport edge
      let shift = 0;
      const overflowRight = rect.right - window.innerWidth + pad;
      const overflowLeft = rect.left - pad;
      if (overflowRight > 0) shift = -overflowRight;
      if (overflowLeft < 0) shift = -overflowLeft;
      setHShift(shift);
    });
  }, [open]);

  // Fallback: no entry → render children verbatim, no interaction.
  if (!entry) {
    return <>{children}</>;
  }

  const isDE = language === 'de';

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="inline underline decoration-dotted decoration-[var(--accent-info)] underline-offset-2 cursor-help text-[var(--accent-info)] font-semibold bg-transparent border-0 p-0 m-0"
      >
        {children}
      </button>

      {open && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className={`absolute left-1/2 z-[80] w-[280px] max-w-[90vw] rounded-xl border-2 border-[var(--accent-info)] bg-[var(--duo-card)] shadow-2xl p-4 text-left ${
            placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          style={{
            transform: `translateX(calc(-50% + ${hShift}px))`,
          }}
          // Stop the popup itself from closing on its own clicks
          onClick={(e) => e.stopPropagation()}
        >
          <span className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-[var(--accent-info)] shrink-0" />
            <span className="font-black text-sm text-[var(--text-primary)]">
              {isDE ? entry.termDe : entry.term}
            </span>
          </span>

          <span className="block text-xs leading-relaxed text-[var(--text-primary)] mb-2">
            {isDE ? entry.definitionDe : entry.definition}
          </span>

          {entry.formula && (
            <span className="block text-[11px] font-mono text-[var(--accent-info)] bg-[rgba(28,176,246,0.08)] border border-[var(--accent-info)] rounded px-2 py-1 mb-2">
              {entry.formula}
            </span>
          )}

          <span className="block text-[11px] italic text-[var(--duo-text-muted)] border-t border-[var(--duo-border)] pt-2">
            {isDE ? entry.exampleDe : entry.example}
          </span>

          {/* Little arrow indicator — shifts with the tooltip */}
          <span
            className={`absolute left-1/2 w-3 h-3 rotate-45 bg-[var(--duo-card)] border-[var(--accent-info)] ${
              placement === 'top'
                ? 'bottom-[-7px] border-b-2 border-r-2'
                : 'top-[-7px] border-t-2 border-l-2'
            }`}
            style={{
              transform: `translateX(calc(-50% - ${hShift}px)) rotate(45deg)`,
            }}
          />
        </span>
      )}
    </span>
  );
}
