'use client';

import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { CASES } from '@/data/cases';
import Link from 'next/link';
import { Clock, Zap, CheckCircle, Lock } from 'lucide-react';

const TYPE_COLORS: Record<string, string> = {
  profitability: '#58CC02',
  market_entry: '#1CB0F6',
  ma: '#CE82FF',
  growth: '#FF9600',
  pricing: '#FFC800',
  restructuring: '#FF4B4B',
};

export default function CasesPage() {
  const { progress, t } = useStore();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black">{t('Case Studies', 'Case Studies')}</h1>
          <p className="text-sm text-[var(--duo-text-muted)] mt-1">
            {t('PrepLounge-style cases to practice structured thinking', 'PrepLounge-Style Cases für strukturiertes Denken')}
          </p>
        </div>

        {/* Case Difficulty Filters */}
        <div className="flex gap-2 justify-center">
          {['beginner', 'intermediate', 'advanced'].map(d => (
            <span key={d} className="text-[10px] px-3 py-1 rounded-full border border-[var(--duo-border)] text-[var(--duo-text-muted)] capitalize">{d}</span>
          ))}
        </div>

        <div className="space-y-4">
          {CASES.map(cs => {
            const isDone = progress.completedCases.includes(cs.id);
            const color = TYPE_COLORS[cs.type] || '#58CC02';

            return (
              <Link key={cs.id} href={`/cases/${cs.id}`}>
                <div className="duo-card p-5 hover:border-[var(--accent-info)] transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: `${color}15` }}>
                      {cs.clientLogo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase" style={{ background: `${color}20`, color }}>
                          {progress.language === 'de' ? cs.typeDe : cs.type.replace('_', ' ')}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          cs.difficulty === 'beginner' ? 'bg-[rgba(88,204,2,0.15)] text-[var(--accent-xp)]' :
                          cs.difficulty === 'intermediate' ? 'bg-[rgba(28,176,246,0.15)] text-[var(--accent-info)]' :
                          'bg-[rgba(206,130,255,0.15)] text-[var(--accent-purple)]'
                        }`}>
                          {cs.difficulty}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm">{progress.language === 'de' ? cs.titleDe : cs.title}</h3>
                      <p className="text-xs text-[var(--duo-text-muted)] mt-1">{progress.language === 'de' ? cs.industryDe : cs.industry}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--duo-text-muted)]">
                        <span className="flex items-center gap-1"><Clock size={11} /> {cs.estimatedMinutes} min</span>
                        <span className="flex items-center gap-1"><Zap size={11} className="text-[var(--duo-yellow)]" /> +{cs.xpReward} XP</span>
                        <span>{cs.steps.length} {t('steps', 'Schritte')}</span>
                      </div>
                    </div>
                    {isDone && <CheckCircle size={20} className="text-[var(--accent-xp)] shrink-0 mt-1" />}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="duo-card p-5 text-center opacity-50">
          <Lock size={24} className="mx-auto text-[var(--duo-text-muted)] mb-2" />
          <p className="text-sm font-bold">{t('More cases coming soon', 'Weitere Cases kommen bald')}</p>
          <p className="text-xs text-[var(--duo-text-muted)] mt-1">{t('Pricing, Growth, Restructuring cases', 'Pricing, Wachstums- & Restrukturierungs-Cases')}</p>
        </div>
      </div>
    </AppShell>
  );
}
