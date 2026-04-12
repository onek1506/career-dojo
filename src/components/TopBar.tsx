'use client';

import { Zap, Crown } from 'lucide-react';

interface TopBarProps {
  xp: number;
  streak: number;
  levelTitle: string;
  salary: number;
  onBench: boolean;
  benchDays: number;
}

/** Format salary for compact display: 42000 → "42k", 120000 → "120k" */
function compactSalary(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return n.toLocaleString('de-DE');
}

export default function TopBar({
  xp,
  streak,
  levelTitle,
  salary,
  onBench,
  benchDays,
}: TopBarProps) {
  // Color cascades with severity of the bench time
  let salaryColor = 'text-[var(--duo-green)]';
  if (benchDays >= 4) salaryColor = 'text-[var(--duo-red)]';
  else if (benchDays >= 2) salaryColor = 'text-[var(--duo-orange)]';
  else if (benchDays === 1) salaryColor = 'text-[var(--duo-yellow)]';

  const fullSalary = salary.toLocaleString('de-DE');
  const shortSalary = compactSalary(salary);

  const salaryClass = `flex items-center gap-1 text-sm font-bold ${salaryColor} ${
    onBench ? 'animate-shake-loop' : ''
  }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--duo-card)] border-b-2 border-[var(--duo-border)]">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2 min-w-0">
          <Crown size={18} className="text-[var(--duo-gold)] shrink-0" />
          <span className="text-sm font-bold text-[var(--duo-gold)] truncate max-w-[90px] sm:max-w-none">
            {levelTitle}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div
            className={salaryClass}
            title={
              benchDays >= 4
                ? 'Performance Review'
                : benchDays >= 2
                  ? 'Gehaltskürzung'
                  : benchDays === 1
                    ? 'Bench-Zeit'
                    : 'Gehalt'
            }
          >
            <span className="text-base leading-none">💰</span>
            {/* Full number on sm+, compact "42k" on mobile */}
            <span className="hidden sm:inline">{fullSalary}€</span>
            <span className="sm:hidden">{shortSalary}€</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="streak-fire text-lg">🔥</span>
            <span className="text-sm font-bold text-[var(--duo-orange)]">{streak}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={16} className="text-[var(--duo-yellow)]" fill="var(--duo-yellow)" />
            <span className="text-sm font-bold text-[var(--duo-yellow)]">{xp} XP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
