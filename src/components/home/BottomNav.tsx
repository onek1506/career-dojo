'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart2, User, type LucideIcon } from 'lucide-react';

export type BottomNavTab = 'home' | 'course' | 'stats' | 'profile';

interface TabConfig {
  id: BottomNavTab;
  label: string;
  icon: LucideIcon;
  route: string;
  // Additional path prefixes that should also light this tab up.
  matchPrefixes?: string[];
}

const TABS: TabConfig[] = [
  { id: 'home', label: 'Home', icon: Home, route: '/home' },
  { id: 'course', label: 'Kurs', icon: BookOpen, route: '/course', matchPrefixes: ['/skill-tree'] },
  { id: 'stats', label: 'Statistik', icon: BarChart2, route: '/stats' },
  { id: 'profile', label: 'Profil', icon: User, route: '/profile' },
];

function isTabActive(tab: TabConfig, pathname: string): boolean {
  if (pathname === tab.route) return true;
  if (pathname.startsWith(`${tab.route}/`)) return true;
  return tab.matchPrefixes?.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ?? false;
}

export default function BottomNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-is-bg-border"
      style={{
        background: 'var(--is-bg-primary)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-label="Hauptnavigation"
    >
      <ul className="grid grid-cols-4 max-w-md mx-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = isTabActive(tab, pathname);
          return (
            <li key={tab.id}>
              <Link
                href={tab.route}
                className={[
                  'flex flex-col items-center justify-center gap-0.5 py-2 min-h-[52px]',
                  'transition-colors duration-200',
                  isActive ? 'text-is-accent' : 'text-is-text-muted hover:text-is-text-secondary',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} aria-hidden />
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
