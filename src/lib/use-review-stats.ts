'use client';

// Track-aware review stats — split out from `useStore` because it needs the
// full lesson catalog (`getAllLessons`) from `@/data/content`, which pulls in
// ~500 KB of track data. Only the Home and Review pages show review-count UI,
// so isolating the import here keeps the content bundle out of every other
// route that mounts `useStore`.

import { useMemo } from 'react';
import { getAllLessons } from '@/data/content';
import { getDueCards } from './spaced-repetition';
import { useStore } from './store';

export function useReviewStats() {
  const store = useStore();
  const { progress } = store;

  /** Lesson IDs for the currently selected track (for filtering). */
  const trackLessonIds = useMemo(() => {
    const lessons = getAllLessons(progress.selectedTrack || 'ib');
    return new Set(lessons.map(l => l.id));
  }, [progress.selectedTrack]);

  /** Count of review cards that are due right now (track-specific). */
  const reviewCount = getDueCards(progress.reviewCards, trackLessonIds).length;

  return { ...store, trackLessonIds, reviewCount };
}
