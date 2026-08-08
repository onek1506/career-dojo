'use client';

import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import type { OnboardingSlideProps } from '../types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_KEY = 'waitlist:k4-orientation';

const POINTS = [
  'Investment Banks beraten Unternehmen bei Käufen, Verkäufen und Kapitalbeschaffung.',
  'Analysten liefern die Zahlen dahinter — Unternehmensbewertung, Fusionsmodelle, Finanzierungsstrukturen.',
  'Interviews prüfen genau dieses Handwerk: Accounting, Bewertung, M&A-Mechanik.',
];

export default function K4Orientation({ currentStep, totalSteps, onBack, onNext }: OnboardingSlideProps) {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveEmail = () => {
    if (!EMAIL_RE.test(email.trim())) return;
    try {
      const key = WAITLIST_KEY;
      const existing: string[] = JSON.parse(window.localStorage.getItem(key) || '[]');
      const normalized = email.trim().toLowerCase();
      if (!existing.includes(normalized)) existing.push(normalized);
      window.localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      /* ignore storage errors */
    }
    setSaved(true);
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      showProgress={false}
      footer={<LessonFooterCTA onClick={onNext} label="Verstanden" />}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            Was ist IB, in 60 Sekunden
          </span>
          <ul className="flex flex-col gap-2">
            {POINTS.map((point) => (
              <li
                key={point}
                className="font-[family-name:var(--font-is-sans)] text-is-text-primary leading-relaxed pl-4 border-l-2 border-is-bg-border"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <MarcusNote
          subject="Re: Noch nicht dein Moment"
          body="Career-Dojo ist für Leute, die sich bald bewerben. Wenn du anfängst dich zu bewerben, komm wieder — dann ist das hier Gold wert. Bis dahin: merk dir die App."
        />

        {!saved ? (
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary">
              Erinnere mich, wenn's relevant wird (optional)
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.com"
                className="flex-1 px-4 py-3 rounded-lg border font-[family-name:var(--font-is-sans)] text-sm bg-transparent outline-none"
                style={{ borderColor: 'var(--is-bg-border)', color: 'var(--is-text-primary)' }}
              />
              <button
                type="button"
                onClick={handleSaveEmail}
                disabled={!EMAIL_RE.test(email.trim())}
                className="px-5 rounded-lg font-[family-name:var(--font-is-sans)] text-sm font-medium disabled:opacity-50"
                style={{ background: 'var(--is-accent)', color: 'var(--is-bg-primary)' }}
              >
                Merken
              </button>
            </div>
          </div>
        ) : (
          <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-accent">
            Gespeichert — wir melden uns, sobald es relevant wird.
          </p>
        )}
      </div>
    </OnboardingLayout>
  );
}
