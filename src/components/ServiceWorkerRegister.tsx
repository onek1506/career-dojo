'use client';

import { useEffect } from 'react';

/**
 * Registers the public/sw.js service worker on the client.
 * Mounted once from the root layout. Skipped during SSR and in
 * environments where the browser does not support service workers.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    // Defer registration to idle so we don't block initial paint
    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          // swallow registration errors — PWA is best-effort
        });
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }, []);

  return null;
}
