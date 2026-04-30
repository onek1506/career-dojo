'use client';

import { createContext, useContext, type ReactNode } from 'react';

const LessonSidePanelContext = createContext<ReactNode>(null);

export function LessonSidePanelProvider({
  value,
  children,
}: {
  value: ReactNode;
  children: ReactNode;
}) {
  return (
    <LessonSidePanelContext.Provider value={value}>{children}</LessonSidePanelContext.Provider>
  );
}

export function useLessonSidePanel(): ReactNode {
  return useContext(LessonSidePanelContext);
}
