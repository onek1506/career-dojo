'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import {
  getProfile,
  saveProfile,
  isOnboardingComplete,
  type UserProfile,
} from '@/lib/onboarding/profile';
import Slide01ColdOpen from '@/components/onboarding/Slide01ColdOpen';
import Slide02ProblemDiagnosis from '@/components/onboarding/Slide02ProblemDiagnosis';
import Slide03StatusSelection from '@/components/onboarding/Slide03StatusSelection';
import Slide04GoalSelection from '@/components/onboarding/Slide04GoalSelection';
import Slide05KnowledgeCheck from '@/components/onboarding/Slide05KnowledgeCheck';
import Slide06Diagnosis from '@/components/onboarding/Slide06Diagnosis';
import Slide07IdentityAnchor from '@/components/onboarding/Slide07IdentityAnchor';
import Slide08StreakCommit from '@/components/onboarding/Slide08StreakCommit';
import Slide09FirstLessonHook from '@/components/onboarding/Slide09FirstLessonHook';
import type { OnboardingSlideProps } from '@/components/onboarding/types';

const SLIDES: ComponentType<OnboardingSlideProps>[] = [
  Slide01ColdOpen,
  Slide02ProblemDiagnosis,
  Slide03StatusSelection,
  Slide04GoalSelection,
  Slide05KnowledgeCheck,
  Slide06Diagnosis,
  Slide07IdentityAnchor,
  Slide08StreakCommit,
  Slide09FirstLessonHook,
];

const FIRST_LESSON_PATH = '/lesson/acc-1-income-statement';

export default function OnboardingStartPage() {
  const router = useRouter();
  const [profile, setProfileState] = useState<UserProfile>(() => getProfile());
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Refresh profile from localStorage on mount (SSR returns empty profile)
  // and short-circuit if onboarding was already completed.
  useEffect(() => {
    const fresh = getProfile();
    setProfileState(fresh);
    setHydrated(true);
    if (isOnboardingComplete(fresh)) {
      router.replace(FIRST_LESSON_PATH);
    }
  }, [router]);

  const updateProfile = (partial: Partial<UserProfile>) => {
    const merged = saveProfile(partial);
    setProfileState(merged);
  };

  const goNext = () => {
    if (currentStep < SLIDES.length - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }
    // Last slide: lock in completion + streak start, then route to lesson.
    const today = new Date().toISOString().slice(0, 10);
    saveProfile({
      onboardingCompletedAt: new Date().toISOString(),
      streakStarted: today,
    });
    router.push(FIRST_LESSON_PATH);
  };

  const goBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((s) => s - 1);
  };

  // Avoid flicker between SSR-empty profile and hydrated profile.
  if (!hydrated) return null;

  const Slide = SLIDES[currentStep];

  return (
    <Slide
      key={currentStep}
      currentStep={currentStep + 1}
      totalSteps={SLIDES.length}
      profile={profile}
      updateProfile={updateProfile}
      onNext={goNext}
      onBack={goBack}
      isFirst={currentStep === 0}
    />
  );
}
