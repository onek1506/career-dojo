import type { UserProfile } from '@/lib/onboarding/profile';

export interface OnboardingSlideProps {
  currentStep: number; // 1-9
  totalSteps: number; // 9
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
}
