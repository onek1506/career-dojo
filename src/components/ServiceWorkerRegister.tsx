'use client';

import { useEffect } from 'react';

/**
 * Registers the public/sw.js service worker on the client — production
 * only. In `next dev`, files change constantly and Turbopack streams
 * dev-only RSC payloads; a service worker caching navigations against
 * that moving target causes exactly the "page never loads / stuck on
 * an old version" symptoms this app hit in development. So in dev we
 * do the opposite: actively unregister any service worker + clear its
 * cache that a PRODUCTION build previously left behind on localhost,
 * so a dev session never runs behind a stale worker either.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
      return;
    }

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
