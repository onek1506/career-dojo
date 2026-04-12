'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GitBranch, BookOpen, User, Briefcase, Brain, Sparkles } from 'lucide-react';

interface BottomNavProps {
  lang?: 'en' | 'de';
  selectedTrack?: string;
}

export default function BottomNav({ lang = 'de', selectedTrack = '' }: BottomNavProps) {
  const pathname = usePathname();
  const isConsulting = selectedTrack === 'consulting';

  // Build nav items dynamically based on track
  const NAV_ITEMS = [
    { href: '/', icon: Home, label: 'Home', labelDe: 'Home' },
    { href: '/skill-tree', icon: GitBranch, label: 'Learn', labelDe: 'Lernen' },
    { href: '/cases', icon: Briefcase, label: 'Cases', labelDe: 'Cases' },
    // Show "Solve" for consulting, "Brainteasers" for others
    ...(isConsulting
      ? [{ href: '/solve', icon: Sparkles, label: 'Solve', labelDe: 'Solve' }]
      : [{ href: '/brainteasers', icon: Brain, label: 'Brainteasers', labelDe: 'Denksport' }]),
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
