'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface SidePanelContextValue {
  panel: ReactNode;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const LessonSidePanelContext = createContext<SidePanelContextValue | null>(null);

export function LessonSidePanelProvider({
  value,
  children,
}: {
  value: ReactNode;
  children: ReactNode;
}) {
  // Collapse state lives here — above the per-slide remount — so the
  // Lesson-Map stays open/closed while navigating slides within a lesson.
  // A new lesson remounts this provider, so the state resets per lesson.
  const [collapsed, setCollapsed] = useState(false);
  return (
    <LessonSidePanelContext.Provider value={{ panel: value, collapsed, setCollapsed }}>
      {children}
    </LessonSidePanelContext.Provider>
  );
}

export function useLessonSidePanel(): ReactNode {
  return useContext(LessonSidePanelContext)?.panel ?? null;
}

export function useLessonSidePanelCollapse():
  | { collapsed: boolean; setCollapsed: (v: boolean) => void }
  | null {
  const ctx = useContext(LessonSidePanelContext);
  return ctx ? { collapsed: ctx.collapsed, setCollapsed: ctx.setCollapsed } : null;
}
