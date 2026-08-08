'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getProfile,
  saveProfile,
  isOnboardingComplete,
  type UserProfile,
  type EntryCategory,
} from '@/lib/onboarding/profile';
import Welcome from '@/components/onboarding/entry/Welcome';
import EarlyWin from '@/components/onboarding/entry/EarlyWin';
import CategorySelect from '@/components/onboarding/entry/CategorySelect';
import Ready from '@/components/onboarding/entry/Ready';
import K4Orientation from '@/components/onboarding/entry/K4Orientation';

const TOTAL_STEPS = 4;

const CATEGORY_FIRST_LESSON: Record<Exclude<EntryCategory, 'k4'>, string> = {
  k1: '/lesson/k1-orient-1-spielfeld',
  k2: '/lesson/k2-acc-1-bridge',
  k3: '/lesson/k3-acc-1-advanced-linkages',
};

export default function OnboardingStartPage() {
  const router = useRouter();
  const [profile, setProfileState] = useState<UserProfile>(() => getProfile());
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Refresh profile from localStorage on mount (SSR returns empty profile)
  // and short-circuit if onboarding was already completed — send them to
  // /home, not a hardcoded lesson, since the entry category now varies.
  useEffect(() => {
    const fresh = getProfile();
    setProfileState(fresh);
    setHydrated(true);
    if (isOnboardingComplete(fresh)) {
      router.replace('/home');
    }
  }, [router]);

  const updateProfile = (partial: Partial<UserProfile>) => {
    const merged = saveProfile(partial);
    setProfileState(merged);
  };

  const finishOnboarding = (destination: string) => {
    const today = new Date().toISOString().slice(0, 10);
    saveProfile({ onboardingCompletedAt: new Date().toISOString(), streakStarted: today });
    router.push(destination);
  };

  const goNext = () => {
    if (currentStep < 2) {
      setCurrentStep((s) => s + 1);
      return;
    }
    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }
    // Step 3 (final): route depends on the chosen category.
    const category = profile.entryCategory ?? 'k1';
    if (category === 'k4') {
      finishOnboarding('/home');
    } else {
      finishOnboarding(CATEGORY_FIRST_LESSON[category]);
    }
  };

  const goBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((s) => s - 1);
  };

  // Avoid flicker between SSR-empty profile and hydrated profile.
  if (!hydrated) return null;

  const stepProps = {
    currentStep: currentStep + 1,
    totalSteps: TOTAL_STEPS,
    profile,
    updateProfile,
    onNext: goNext,
    onBack: goBack,
    isFirst: currentStep === 0,
  };

  if (currentStep === 0) return <Welcome {...stepProps} />;
  if (currentStep === 1) return <EarlyWin {...stepProps} />;
  if (currentStep === 2) return <CategorySelect {...stepProps} />;
  return profile.entryCategory === 'k4' ? <K4Orientation {...stepProps} /> : <Ready {...stepProps} />;
}
