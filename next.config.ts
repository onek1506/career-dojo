import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

// Next.js 16 — heads-up for anyone reading this file:
//   • `swcMinify` was removed in v15; minification is always on.
//   • `images.domains` is deprecated in v16 → use `remotePatterns`.
//   • `experimental.optimizeCss` was renamed to `experimental.inlineCss`.
//   • `lucide-react` is already on Next's default `optimizePackageImports` list.

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Inline critical CSS into <head> to eliminate a render-blocking round-trip.
  // Works on production builds only. Tailwind's atomic output keeps this cheap.
  experimental: {
    inlineCss: true,
    // Tree-shake named imports from these packages. `lucide-react` is already
    // on Next's default list, so we only extend with extras we actually use.
    optimizePackageImports: ["framer-motion"],
  },

  // Strip `console.log/info/debug` from production bundles; keep warn/error so
  // real runtime issues are still visible.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Let browsers / Vercel's edge cache static chunks hard. Headers live in
  // vercel.json so this config stays platform-agnostic.
};

export default withBundleAnalyzer(nextConfig);
