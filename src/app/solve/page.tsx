'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ComingSoonModal from '@/components/ComingSoonModal';
import { useStore } from '@/lib/store';
import { getCharacterForTrack } from '@/data/characters';
import { Sparkles, Mail } from 'lucide-react';

export default function SolvePage() {
  const { progress, t } = useStore();
  const character = getCharacterForTrack('consulting');
  const isDE = progress.language === 'de';
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6 pb-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,150,0,0.12)] border border-[var(--accent-streak)]">
            <Sparkles size={12} className="text-[var(--accent-streak)]" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent-streak)]">
              {t('Round 1 Prep', 'Runde 1 Prep')}
            </span>
          </div>
          <h1 className="text-2xl font-black">{t('Online Test Prep', 'Online Test Prep')}</h1>
          <p className="text-sm text-[var(--duo-text-muted)] max-w-md mx-auto">
            {t(
              'These tests replace the classic case interview at top firms. Master them to pass Round 1.',
              'Diese Tests ersetzen das klassische Case Interview bei Top-Firmen. Meistere sie, um Runde 1 zu bestehen.',
            )}
          </p>
        </div>

        {/* Character intro */}
        <div className="flex items-start gap-3 duo-card p-4">
          <span className="text-3xl shrink-0">{character.emoji}</span>
          <div className="text-sm">
            <span className="font-bold" style={{ color: character.color }}>
              {character.name}:
            </span>
            <span className="text-[var(--text-secondary)] ml-1 italic">
              {isDE
                ? '"Wir bauen gerade die volle Übungssuite — McKinsey Solve, BCG Casey, Bain SOVA. Trag dich auf die Warteliste ein, damit du sofort Bescheid weißt, sobald es live geht."'
                : '"We\'re building the full practice suite — McKinsey Solve, BCG Casey, Bain SOVA. Join the waitlist and you\'ll know the second it goes live."'}
            </span>
          </div>
        </div>

        {/* Coming Soon card */}
        <button
          type="button"
          onClick={() => setWaitlistOpen(true)}
          className="w-full duo-card p-6 text-center space-y-4 border-2 border-[var(--border)] hover:border-[var(--accent-purple)] transition-all btn-press cursor-pointer"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
            style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
          >
            Coming Soon
          </span>
          <div className="text-base font-bold leading-snug">
            {t(
              'McKinsey Solve · BCG Casey · Bain SOVA',
              'McKinsey Solve · BCG Casey · Bain SOVA',
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
            {t(
              'Timed drills that mirror the real Round 1 assessments. Launching soon — we\'ll notify you.',
              'Getaktete Übungen, die den echten Round-1-Assessments nachempfunden sind. Wir informieren dich beim Launch.',
            )}
          </p>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
            style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
          >
            <Mail size={14} />
            {t('Join Waitlist', 'Zur Warteliste')}
          </div>
        </button>

        {/* Footer tip */}
        <div className="text-center text-xs text-[var(--duo-text-muted)] italic pb-4">
          💡{' '}
          {t(
            'Until launch: drill brainteasers, market sizing and mental math — they train the same muscles.',
            'Bis zum Launch: übe Brainteasers, Market Sizing und Kopfrechnen — sie trainieren die gleichen Muskeln.',
          )}
        </div>
      </div>

      <ComingSoonModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        featureId="solve"
        featureName="Online Test Prep"
        featureNameDe="Online Test Prep"
        description="Get notified the moment McKinsey Solve, BCG Casey and Bain SOVA drills go live."
        descriptionDe="Wir melden uns, sobald die Übungen für McKinsey Solve, BCG Casey und Bain SOVA verfügbar sind."
      />
    </AppShell>
  );
}
