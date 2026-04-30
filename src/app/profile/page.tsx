'use client';

import { useEffect, useState } from 'react';
import { getUserState, type UserState } from '@/lib/home/user-state';
import { getStoredTestimonials, type MarcusTestimonial } from '@/lib/profile/testimonials';
import { saveProfile } from '@/lib/onboarding/profile';
import { LEVEL_LABELS } from '@/lib/stats/stats-utils';
import BottomNav from '@/components/home/BottomNav';
import IdentityHeader from '@/components/profile/IdentityHeader';
import MarcusTestimonials from '@/components/profile/MarcusTestimonials';
import InterviewDateEditor from '@/components/profile/InterviewDateEditor';
import SettingsSection from '@/components/profile/SettingsSection';

export default function ProfilePage() {
  const [state, setState] = useState<UserState | null>(null);
  const [testimonials, setTestimonials] = useState<MarcusTestimonial[]>([]);

  useEffect(() => {
    setState(getUserState());
    setTestimonials(getStoredTestimonials());
  }, []);

  if (!state) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-muted)' }}
      >
        <span className="font-[family-name:var(--font-is-mono)] text-sm">Lade…</span>
      </div>
    );
  }

  const levelInfo = LEVEL_LABELS[state.currentLevel] ?? LEVEL_LABELS[1];

  const handleInterviewDate = (date: string | null) => {
    saveProfile({ interviewDate: date });
    setState((prev) => (prev ? { ...prev, interviewDate: date } : prev));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto px-6 pt-10 flex flex-col gap-8">
          <IdentityHeader
            statusTitle={levelInfo.title}
            streakDays={state.streakDays}
            totalXp={state.totalXp}
            completedLessons={state.completedLessons.length}
          />
          <MarcusTestimonials testimonials={testimonials} />
          <InterviewDateEditor currentDate={state.interviewDate} onSave={handleInterviewDate} />
          <SettingsSection />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
