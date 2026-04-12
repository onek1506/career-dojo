'use client';

import { useEffect, useState } from 'react';
import { X, Smartphone } from 'lucide-react';

const STORAGE_KEY = 'install-banner-shown';

type DeviceKind = 'ios' | 'android' | 'other';

function detectDevice(): DeviceKind {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || navigator.vendor || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  // iOS Safari uses navigator.standalone, others expose the media query
  const navAny = window.navigator as Navigator & { standalone?: boolean };
  if (navAny.standalone) return true;
  return window.matchMedia('(display-mode: standalone)').matches;
}

/**
 * Subtle install hint that appears once per device on mobile screens.
 * Bilingual instructions for iOS Safari and Android Chrome. Dismiss
 * persists in localStorage so we never nag the user twice.
 */
export default function InstallBanner() {
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState<DeviceKind>('other');
  const [lang, setLang] = useState<'en' | 'de'>('de');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isStandalone()) return; // already installed — never show
    if (window.innerWidth >= 768) return; // mobile only
    if (localStorage.getItem(STORAGE_KEY)) return; // already dismissed

    // Pull language from the persisted store if present
    try {
      const raw = localStorage.getItem('career-dojo-progress');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.language === 'en') setLang('en');
      }
    } catch {
      // ignore
    }

    setDevice(detectDevice());
    // Slight delay so the banner doesn't compete with first paint
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const isDE = lang === 'de';
  const title = isDE
    ? '📱 Tipp: Speichere CareerDojo auf deinem Homescreen!'
    : '📱 Tip: Add CareerDojo to your home screen!';

  let instructions: string;
  if (device === 'ios') {
    instructions = isDE
      ? 'Safari → Teilen → Zum Home-Bildschirm'
      : 'Safari → Share → Add to Home Screen';
  } else if (device === 'android') {
    instructions = isDE
      ? 'Chrome → Menü → Zum Startbildschirm zufügen'
      : 'Chrome → Menu → Add to Home Screen';
  } else {
    instructions = isDE
      ? 'Browser-Menü → App installieren / Zum Startbildschirm'
      : 'Browser menu → Install app / Add to home screen';
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[110] max-w-md mx-auto md:hidden">
      <div className="duo-card bg-[var(--duo-card)] border-2 border-[var(--accent-xp)] rounded-2xl p-4 shadow-2xl flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[rgba(88,204,2,0.15)] flex items-center justify-center shrink-0">
          <Smartphone size={20} className="text-[var(--accent-xp)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white leading-snug">{title}</p>
          <p className="text-[11px] text-[var(--duo-text-muted)] mt-1 leading-snug">
            {instructions}
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-[var(--duo-text-muted)] hover:text-white shrink-0 -mt-1 -mr-1 p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
