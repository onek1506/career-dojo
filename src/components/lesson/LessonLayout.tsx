'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useLessonSidePanel, useLessonSidePanelCollapse } from './LessonSidePanelContext';

export interface LessonLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  footer: ReactNode;
  sidePanel?: ReactNode;
  children: ReactNode;
}

export default function LessonLayout({
  currentStep,
  totalSteps,
  onBack,
  footer,
  sidePanel,
  children,
}: LessonLayoutProps) {
  const router = useRouter();
  // Slides may pass `sidePanel` as a prop (income-statement legacy path)
  // or rely on the LessonSidePanelProvider mounted by the lesson root
  // (balance-sheet, cash-flow, three-statements). Prop wins when both exist.
  const contextSidePanel = useLessonSidePanel();
  const effectiveSidePanel = sidePanel ?? contextSidePanel;
  // Collapsible Lesson-Map (desktop only — the panel is hidden below lg).
  // Prefer the provider-backed state so the collapse persists across slide
  // navigation within a lesson; fall back to local state when no provider.
  const collapseCtx = useLessonSidePanelCollapse();
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const panelCollapsed = collapseCtx ? collapseCtx.collapsed : localCollapsed;
  const setPanelCollapsed = collapseCtx ? collapseCtx.setCollapsed : setLocalCollapsed;
  const showPanel = Boolean(effectiveSidePanel) && !panelCollapsed;
  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  const stepCounter = `${String(currentStep).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`;

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      {/* Top-Bar */}
      <header
        className="flex-shrink-0 h-12 sm:h-14 flex items-center justify-between px-3 sm:px-4 border-b border-is-bg-border"
        style={{ background: 'var(--is-bg-primary)' }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück"
          className="p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-is-text-secondary hover:text-is-text-primary transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 mx-3 sm:mx-4 max-w-md">
          <div className="h-[3px] rounded-full bg-is-bg-border overflow-hidden">
            <div
              className="h-full bg-is-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="font-[family-name:var(--font-is-mono)] text-[11px] sm:text-xs text-is-text-muted tabular-nums">
            {stepCounter}
          </span>
          {effectiveSidePanel && (
            <button
              type="button"
              onClick={() => setPanelCollapsed(!panelCollapsed)}
              aria-label={panelCollapsed ? 'Lesson-Map einblenden' : 'Lesson-Map ausblenden'}
              aria-pressed={!panelCollapsed}
              className="hidden lg:flex text-is-text-muted hover:text-is-text-primary transition-colors duration-200 min-h-[44px] min-w-[44px] items-center justify-center"
            >
              {panelCollapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push('/course')}
            className="font-[family-name:var(--font-is-mono)] text-[11px] sm:text-xs text-is-text-muted hover:text-is-text-primary transition-colors duration-200 px-2 -mr-2 min-h-[44px] flex items-center"
          >
            Menü
          </button>
        </div>
      </header>

      {/* Main + optional side panel.
          A phantom spacer mirrors the side panel's width on the left so the
          centered content sits in the true viewport center, matching the
          header's progress bar and the footer CTA. */}
      <div className="flex-1 flex overflow-hidden">
        {showPanel && (
          <div className="hidden lg:block w-72 flex-shrink-0" aria-hidden="true" />
        )}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
            {children}
          </div>
        </main>

        {showPanel && (
          <aside
            className="hidden lg:flex w-72 flex-shrink-0 border-l border-is-bg-border flex-col overflow-y-auto"
            style={{ background: 'var(--is-bg-primary)' }}
          >
            {effectiveSidePanel}
          </aside>
        )}
      </div>

      {/* Footer (omitted when no CTA — e.g. Retention Hub) */}
      {footer && (
        <footer
          className="flex-shrink-0 border-t border-is-bg-border"
          style={{
            background: 'var(--is-bg-primary)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">{footer}</div>
        </footer>
      )}
    </div>
  );
}
