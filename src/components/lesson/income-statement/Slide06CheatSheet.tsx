'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Copy, ArrowRight, Check } from 'lucide-react';
import type { SlideProps } from './types';

const CHEAT_SHEET_TEXT = `GUV CHEAT SHEET                       [01]
──────────────────────────────────────────
REVENUE                              €200M
 − COGS                              −120M
 = GROSS PROFIT                       €80M
 − SG&A                               −40M
 = EBITDA                             €40M
 − D&A                                −10M
 = EBIT                               €30M
 − INTEREST                            −5M
 = EBT                                €25M
 − TAXES                               −7M
 = NET INCOME                         €18M
──────────────────────────────────────────
GROSS MARGIN  = (REV − COGS) / REV
EBITDA MARGIN = EBITDA / REV
OP. MARGIN    = EBIT / REV
NET MARGIN    = NET INCOME / REV
──────────────────────────────────────────
RULE OF THUMB
EBITDA blendet CapEx aus.
Buffett hasst EBITDA. Du auch.`;

export default function Slide06CheatSheet({ onCanProceed, onNext }: SlideProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [exportState, setExportState] = useState<'idle' | 'busy' | 'done'>('idle');

  useEffect(() => {
    onCanProceed?.(true);
  }, [onCanProceed]);

  const handleExportPng = async () => {
    if (!cardRef.current || exportState === 'busy') return;
    setExportState('busy');
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: getComputedStyle(cardRef.current).getPropertyValue('background-color') || undefined,
      });
      const link = document.createElement('a');
      link.download = 'guv-cheat-sheet.png';
      link.href = dataUrl;
      link.click();
      setExportState('done');
      window.setTimeout(() => setExportState('idle'), 1600);
    } catch (err) {
      console.error('PNG export failed', err);
      setExportState('idle');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CHEAT_SHEET_TEXT);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1600);
    } catch (err) {
      console.error('Clipboard write failed', err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-is-serif)] text-4xl font-medium text-is-text-primary leading-tight">
          Cheat Sheet
        </h2>
        <p className="font-[family-name:var(--font-is-sans)] italic text-is-text-secondary">
          Screenshot-tauglich.
        </p>
      </div>

      <div
        ref={cardRef}
        className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 overflow-hidden"
      >
        <pre
          className="font-[family-name:var(--font-is-mono)] text-[11px] sm:text-sm leading-relaxed text-is-text-primary whitespace-pre overflow-x-auto"
          style={{ tabSize: 4 }}
        >
{CHEAT_SHEET_TEXT}
        </pre>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionButton
          onClick={handleExportPng}
          disabled={exportState === 'busy'}
          icon={exportState === 'done' ? <Check size={16} /> : <Download size={16} />}
          label={
            exportState === 'busy'
              ? 'Exportiere…'
              : exportState === 'done'
                ? 'Gespeichert'
                : 'Als PNG speichern'
          }
        />
        <ActionButton
          onClick={handleCopy}
          icon={copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
          label={copyState === 'copied' ? 'Kopiert' : 'In Notion kopieren'}
        />
        <ActionButton
          onClick={() => onNext?.()}
          icon={<ArrowRight size={16} />}
          label="Weiter"
          primary
        />
      </div>
    </div>
  );
}

function ActionButton({
  onClick,
  disabled,
  icon,
  label,
  primary,
}: {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex items-center justify-center gap-2 w-full py-3 rounded-lg',
        'font-[family-name:var(--font-is-sans)] text-sm font-semibold',
        'transition-all duration-200',
        primary
          ? 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover'
          : 'bg-is-bg-secondary border border-is-bg-border text-is-text-primary hover:bg-is-bg-tertiary hover:border-is-text-muted',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {icon}
      {label}
    </button>
  );
}
