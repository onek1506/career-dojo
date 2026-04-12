'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GitBranch, BookOpen, User, Briefcase, Brain } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Home', labelDe: 'Home' },
  { href: '/skill-tree', icon: GitBranch, label: 'Learn', labelDe: 'Lernen' },
  { href: '/cases', icon: Briefcase, label: 'Cases', labelDe: 'Cases' },
  { href: '/brainteasers', icon: Brain, label: 'Brainteasers', labelDe: 'Denksport' },
  { href: '/glossary', icon: BookOpen, label: 'Glossary', labelDe: 'Glossar' },
  { href: '/profile', icon: User, label: 'Profile', labelDe: 'Profil' },
];

export default function BottomNav({ lang = 'de' }: { lang?: 'en' | 'de' }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--duo-card)] border-t-2 border-[var(--duo-border)]">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-[var(--duo-blue)]'
                  : 'text-[var(--duo-text-muted)] hover:text-white'
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
