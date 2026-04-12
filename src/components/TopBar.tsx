'use client';

import { Zap } from 'lucide-react';

interface TopBarProps {
  xp: number;
  streak: number;
  levelTitle: string;
}

export default function TopBar({
  xp,
  streak,
  levelTitle,
}: TopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-card)] border-b-2 border-[var(--border)]">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-bold text-[var(--text-primary)] truncate max-w-[120px] sm:max-w-none">
            {levelTitle}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1">
            <span className="streak-fire text-lg">🔥</span>
            <span className="text-sm font-bold text-[var(--accent-streak)]">{streak}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={16} className="text-[var(--accent-xp)]" fill="var(--accent-xp)" />
            <span className="text-sm font-bold text-[var(--accent-xp)]">{xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
