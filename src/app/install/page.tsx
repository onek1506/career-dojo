'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Platform = 'ios' | 'android' | 'desktop' | 'installed';

const STEPS: Record<Platform, {
  icon: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  steps: Array<{ de: string; en: string }>;
}> = {
  installed: {
    icon: '✓',
    title: 'Bereits installiert!',
    titleEn: 'Already installed!',
    body: 'CareerDojo läuft bereits als App auf deinem Gerät.',
    bodyEn: 'CareerDojo is already running as an app on your device.',
    steps: [],
  },
  ios: {
    icon: '📱',
    title: 'Auf dem iPhone installieren',
    titleEn: 'Install on iPhone',
    body: 'Öffne in Safari und folge diesen Schritten:',
    bodyEn: 'Open in Safari and follow these steps:',
    steps: [
      { de: 'Tippe auf Teilen ⬆️ in der unteren Leiste', en: 'Tap Share ⬆️ in the bottom bar' },
      { de: 'Scrolle zu „Zum Home-Bildschirm"', en: 'Scroll to "Add to Home Screen"' },
      { de: 'Tippe „Hinzufügen" oben rechts', en: 'Tap "Add" in the top right' },
    ],
  },
  android: {
    icon: '📱',
    title: 'Auf Android installieren',
    titleEn: 'Install on Android',
    body: 'Öffne in Chrome und folge diesen Schritten:',
    bodyEn: 'Open in Chrome and follow these steps:',
    steps: [
      { de: 'Tippe auf ⋮ Menü oben rechts', en: 'Tap ⋮ menu top right' },
      { de: 'Wähle „App installieren"', en: 'Select "Install app"' },
      { de: 'Bestätige mit „Installieren"', en: 'Confirm with "Install"' },
    ],
  },
  desktop: {
    icon: '💻',
    title: 'Auf dem Handy öffnen',
    titleEn: 'Open on your phone',
    body: 'CareerDojo ist für Mobile optimiert. Öffne diese Seite auf deinem Smartphone für die beste Erfahrung.',
    bodyEn: 'CareerDojo is optimized for mobile. Open this page on your smartphone for the best experience.',
    steps: [],
  },
};

export default function InstallPage() {
  const router = useRouter();
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [lang, setLang] = useState<'de' | 'en'>('de');

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setPlatform('installed');
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      setPlatform('ios');
    } else if (/Android/.test(ua)) {
      setPlatform('android');
    }

    // Read language preference
    try {
      const stored = localStorage.getItem('career-dojo-progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.language === 'en' || parsed.language === 'de') {
          setLang(parsed.language);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const content = STEPS[platform];
  const isDE = lang === 'de';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        textAlign: 'center',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 20 }}>{content.icon}</div>

      <h1
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 10,
        }}
      >
        {isDE ? content.title : content.titleEn}
      </h1>

      <p
        style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
          marginBottom: 28,
          lineHeight: 1.6,
        }}
      >
        {isDE ? content.body : content.bodyEn}
      </p>

      {content.steps.length > 0 && (
        <div
          style={{
            width: '100%',
            background: 'var(--bg-card)',
            border: '0.5px solid var(--border)',
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 28,
            textAlign: 'left',
          }}
        >
          {content.steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                padding: '8px 0',
                borderBottom:
                  i < content.steps.length - 1
                    ? '0.5px solid var(--border)'
                    : 'none',
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  background: 'var(--text-primary)',
                  color: 'var(--accent-primary-text)',
                  borderRadius: '50%',
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                }}
              >
                {isDE ? step.de : step.en}
              </span>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          background: 'color-mix(in srgb, var(--accent-xp) 10%, transparent)',
          border: '0.5px solid var(--accent-xp)',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 24,
          fontSize: 13,
          color: 'var(--text-secondary)',
        }}
      >
        📊{' '}
        {isDE
          ? 'Nutzer die die App installieren lernen 3x häufiger täglich'
          : 'Users who install the app study 3x more consistently'}
      </div>

      <button
        onClick={() => {
          try {
            localStorage.setItem('install-prompt-shown', 'true');
          } catch {
            // ignore
          }
          router.push('/');
        }}
        style={{
          width: '100%',
          background: 'var(--accent-primary)',
          color: 'var(--accent-primary-text)',
          border: 'none',
          borderRadius: 10,
          padding: '14px',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {isDE ? 'Verstanden → Weiter lernen' : 'Got it → Keep learning'}
      </button>
    </div>
  );
}
