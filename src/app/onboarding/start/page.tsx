import { redirect } from 'next/navigation';

// Legacy URL — the 9-slide flow lived here. The 11-screen flow lives at
// /onboarding now; redirect any stale links so users land in the right place.
export default function OnboardingStartLegacyPage() {
  redirect('/onboarding');
}
