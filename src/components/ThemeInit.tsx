'use client';

import { useEffect } from 'react';

/**
 * Client-only component that applies the saved theme from localStorage
 * as early as possible after mount. This prevents FOUC for light-mode
 * users (dark is the CSS default so dark-mode users see no flash).
 *
 * Replaces the <script> / <Script> approach that breaks in Next.js 16
 * App Router because React blocks script execution inside the render tree.
 */
export default function ThemeInit() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('career-dojo-progress');
      if (!stored) return;
      const data = JSON.parse(stored);
      if (data.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {
      // ignore
    }
  }, []);

  return null;
}
