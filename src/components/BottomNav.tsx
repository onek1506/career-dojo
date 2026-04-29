'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitBranch, BookOpen, User, Brain } from 'lucide-react';

interface BottomNavProps {
  lang?: 'en' | 'de';
  selectedTrack?: string;
}

export default function BottomNav({ lang = 'de' }: BottomNavProps) {
  const pathname = usePathname();

  // Same nav items across all tracks. "Home" was removed — the skill tree
  // ("Lernen") is already the home page, and the redundant entry only
  // produced a loading flash via the root-redirect.
  const NAV_ITEMS = [
    { href: '/skill-tree', icon: GitBranch, label: 'Learn', labelDe: 'Lernen' },
    { href: '/brainteasers', icon: Brain, label: 'Brainteasers', labelDe: 'Brainteasers' },
    { href: '/glossary', icon: BookOpen, label: 'Glossary', labelDe: 'Glossar' },
    { href: '/profile', icon: User, label: 'Profile', labelDe: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-card)] border-t-2 border-[var(--border)]">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-bold uppercase tracking-tight">
                {lang === 'de' ? item.labelDe : item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
