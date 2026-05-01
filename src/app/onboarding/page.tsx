'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  loadOnboardingState,
  saveOnboardingState,
  defaultState,
  type OnboardingState,
} from '@/lib/onboarding/state';
import { saveProfile, calculateSkillProfile } from '@/lib/onboarding/profile';
import Screen01 from '@/components/onboarding/Screen01';
import Screen02 from '@/components/onboarding/Screen02';
import Screen03 from '@/components/onboarding/Screen03';
import Screen04 from '@/components/onboarding/Screen04';
import Screen05 from '@/components/onboarding/Screen05';
import Screen06 from '@/components/onboarding/Screen06';
import Screen07 from '@/components/onboarding/Screen07';
import Screen08 from '@/components/onboarding/Screen08';
import Screen09 from '@/components/onboarding/Screen09';
import Screen10 from '@/components/onboarding/Screen10';
import Screen11 from '@/components/onboarding/Screen11';

const HOME_PATH = '/home';

// Map our 11-screen flow into the legacy career_dojo_profile schema so
// the rest of the app (home, lessons, course utils) keeps working.
function bridgeToLegacyProfile(state: OnboardingState) {
  const balance =
    state.quiz1 === null
      ? null
      : state.quiz1 === 'Habe ich noch nie gehört'
        ? 'never_heard'
        : state.quiz1 === 'Was eine Firma zu einem Stichtag besitzt und schuldet'
          ? 'correct'
          : 'wrong';
  const ebitda =
    state.quiz2 === null
      ? null
      : state.quiz2 === 'Habe ich noch nie gehört'
        ? 'never_heard'
        : state.quiz2 === 'Earnings Before Interest, Taxes, Depreciation and Amortization'
          ? 'correct'
          : 'wrong';
  const dcf =
    state.quiz3 === 'Ja, mehrfach'
      ? 'multiple'
      : state.quiz3 === 'Einmal, war kompliziert'
        ? 'once'
        : state.quiz3 === 'Nein, aber ich weiß was es ist'
          ? 'know_it'
          : state.quiz3 === 'Habe ich noch nie gehört'
            ? 'never_heard'
            : null;

  const status =
    state.profil === 'entdecker'
      ? 'explorer'
      : state.profil === 'einsteiger'
        ? 'starter'
        : state.profil === 'bewerber'
          ? 'applicant'
          : state.profil === 'profi'
            ? 'pro'
            : null;

  const learningTime =
    state.lernzeit === 'morgens'
      ? 'morning'
      : state.lernzeit === 'mittag'
        ? 'lunch'
        : state.lernzeit === 'abends'
          ? 'evening'
          : state.lernzeit === 'flexibel'
            ? 'flexible'
            : null;

  const knowledge = { balance, ebitda, dcf } as const;
  const skillProfile = calculateSkillProfile(knowledge);
  const today = new Date().toISOString().slice(0, 10);

  saveProfile({
    status,
    knowledge,
    skillProfile,
    learningTime,
    streakStarted: today,
    onboardingCompletedAt: new Date().toISOString(),
  });
}

export default function OnboardingPage() {
  const router = useRouter();
  const [state, setState] = useState<OnboardingState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const saved = loadOnboardingState();
    if (saved.completed) {
      router.replace(HOME_PATH);
      return;
    }
    setState(saved);
    setHydrated(true);
  }, [router]);

  const navigateTo = useCallback((screen: number) => {
    setVisible(false);
    setTimeout(() => {
      setState((prev) => {
        const next = { ...prev, currentScreen: screen };
        saveOnboardingState(next);
        return next;
      });
      setVisible(true);
    }, 150);
  }, []);

  const update = useCallback((patch: Partial<OnboardingState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      saveOnboardingState(next);
      return next;
    });
  }, []);

  const complete = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, completed: true };
      saveOnboardingState(next);
      bridgeToLegacyProfile(next);
      return next;
    });
    router.replace(HOME_PATH);
  }, [router]);

  if (!hydrated) {
    return <div className="min-h-screen bg-[var(--bg)]" />;
  }

  const screenProps = { state, update, navigateTo, complete };

  const screens: Record<number, React.ReactNode> = {
    1: <Screen01 {...screenProps} />,
    2: <Screen02 {...screenProps} />,
    3: <Screen03 {...screenProps} />,
    4: <Screen04 {...screenProps} />,
    5: <Screen05 {...screenProps} />,
    6: <Screen06 {...screenProps} />,
    7: <Screen07 {...screenProps} />,
    8: <Screen08 {...screenProps} />,
    9: <Screen09 {...screenProps} />,
    10: <Screen10 {...screenProps} />,
    11: <Screen11 {...screenProps} />,
  };

  return (
    <div
      className="min-h-screen bg-[var(--bg)] transition-opacity duration-150"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {screens[state.currentScreen] ?? screens[1]}
    </div>
  );
}
