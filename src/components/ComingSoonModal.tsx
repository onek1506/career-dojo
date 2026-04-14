'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Check } from 'lucide-react';
import { useStore } from '@/lib/store';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Short feature id used as localStorage key, e.g. "solve", "track-ib" */
  featureId: string;
  /** Feature name shown to the user (EN + DE). */
  featureName: string;
  featureNameDe: string;
  /** Optional description shown below the title. */
  description?: string;
  descriptionDe?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ComingSoonModal({
  isOpen,
  onClose,
  featureId,
  featureName,
  featureNameDe,
  description,
  descriptionDe,
}: ComingSoonModalProps) {
  const { progress, t } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Reset state whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setSubmitted(false);
      setError('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(t('Please enter a valid email', 'Bitte gib eine gültige E-Mail ein'));
      return;
    }
    try {
      const key = `waitlist:${featureId}`;
      const existing: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      const normalized = email.trim().toLowerCase();
      if (!existing.includes(normalized)) existing.push(normalized);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch { /* ignore storage errors */ }
    setSubmitted(true);
  };

  const name = progress.language === 'de' ? featureNameDe : featureName;
  const desc = progress.language === 'de' ? descriptionDe : description;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-[var(--bg-card)] border-2 border-[var(--border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t('Close', 'Schließen')}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
        >
          <X size={16} />
        </button>

        <div className="p-6 pb-5 text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg)',
            }}
          >
            Coming Soon
          </span>
          <h2 className="text-lg font-black mt-3">{name}</h2>
          {desc && (
            <p className="text-sm text-[var(--text-muted)] mt-2 leading-snug">
              {desc}
            </p>
          )}
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
            <div className="text-xs text-[var(--text-secondary)] text-center">
              {t(
                'Drop your email — we’ll ping you the moment it’s ready.',
                'Hinterlasse deine E-Mail — wir melden uns, sobald es verfügbar ist.',
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-[var(--border)] bg-[var(--bg)]">
              <Mail size={16} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t('you@example.com', 'du@beispiel.com')}
                className="flex-1 bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]"
                autoFocus
              />
            </div>
            {error && (
              <div className="text-[11px] text-[var(--accent-wrong)] text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-sm btn-press transition"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
            >
              {t('Join Waitlist', 'Zur Warteliste')}
            </button>
            <div className="text-[10px] text-[var(--text-muted)] text-center">
              {t(
                'No spam. One email when this launches.',
                'Kein Spam. Eine E-Mail zum Launch.',
              )}
            </div>
          </form>
        ) : (
          <div className="px-6 pb-6 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-[var(--accent-xp)]">
              <Check size={22} className="text-white" strokeWidth={3} />
            </div>
            <div className="font-bold text-sm">
              {t("You're on the list!", 'Du bist auf der Liste!')}
            </div>
            <div className="text-xs text-[var(--text-muted)] leading-snug">
              {t(
                'We’ll email you as soon as this feature goes live.',
                'Wir schicken dir eine E-Mail, sobald das Feature live ist.',
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-bold text-sm btn-press transition border-2 border-[var(--border)]"
            >
              {t('Close', 'Schließen')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
