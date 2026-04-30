'use client';

import Link from 'next/link';
import { Home, BookOpen, BarChart2, User, type LucideIcon } from 'lucide-react';

export type BottomNavTab = 'home' | 'course' | 'stats' | 'profile';

interface TabConfig {
  id: BottomNavTab;
  label: string;
  icon: LucideIcon;
  route: string;
}

const TABS: TabConfig[] = [
  { id: 'home', label: 'Home', icon: Home, route: '/home' },
  { id: 'course', label: 'Kurs', icon: BookOpen, route: '/course' },
  { id: 'stats', label: 'Statistik', icon: BarChart2, route: '/stats' },
  { id: 'profile', label: 'Profil', icon: User, route: '/profile' },
];

export default function BottomNav({ activeTab }: { activeTab: BottomNavTab }) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-is-bg-border"
      style={{
        background: 'var(--is-bg-primary)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-label="Hauptnavigation"
    >
      <ul className="grid grid-cols-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <li key={tab.id}>
              <Link
                href={tab.route}
                className={[
                  'flex flex-col items-center justify-center gap-1 py-3 min-h-[64px]',
                  'transition-colors duration-200',
                  isActive ? 'text-is-accent' : 'text-is-text-muted hover:text-is-text-secondary',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={22} aria-hidden />
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] uppercase tracking-wide">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
