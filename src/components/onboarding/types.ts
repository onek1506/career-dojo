import type { UserProfile } from '@/lib/onboarding/profile';
import type { OnboardingState } from '@/lib/onboarding/state';

export interface OnboardingSlideProps {
  currentStep: number; // 1-9
  totalSteps: number; // 9
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
}

// Used by the 11-screen flow (Screen01..Screen11).
export interface ScreenProps {
  state: OnboardingState;
  update: (patch: Partial<OnboardingState>) => void;
  navigateTo: (screen: number) => void;
  complete: () => void;
}
