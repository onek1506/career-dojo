// CareerDojo Content Database — aggregator
// Sources: 400 Finance Questions, CFA Material, Firm Learning, David Döbele,
// The Financial Controller, Analyst Academy, Wall Street Prep, BIWS
//
// This file used to be ~3800 lines of inline IB data. The track content has
// been split out so consumers that only need types or the level helpers can
// import from `./content-core` directly and skip the ~500 KB of lesson JSON.
//
// Backward compatibility: every public type, helper, and constant previously
// exported from this module is still re-exported here, so existing imports
// from `@/data/content` keep working unchanged.

import type { Lesson, Unit, Track } from './content-core';

// ---------- Types + level helpers (track-data-free) ----------
export type {
  Difficulty,
  Lesson,
  LessonContent,
  ContentSection,
  QuizQuestion,
  Unit,
  Track,
} from './content-core';
export { LEVEL_THRESHOLDS, getLevelForXp } from './content-core';

// ---------- Track data ----------
import { ibTrack } from './ib-content';
import { consultingTrack } from './consulting-content';
import { peTrack } from './pe-content';
import { vcTrack } from './vc-content';

export { ibTrack };

const ALL_TRACKS: Record<string, Track> = {
  ib: ibTrack,
  consulting: consultingTrack,
  pe: peTrack,
  vc: vcTrack,
};

// ============================================================
// HELPERS (support optional trackId parameter)
// ============================================================

export function getTrackData(trackId: string): Track {
  return ALL_TRACKS[trackId] || ibTrack;
}

export function getAllLessons(trackId?: string): Lesson[] {
  if (trackId) {
    const track = ALL_TRACKS[trackId];
    return track ? track.units.flatMap(unit => unit.lessons) : [];
  }
  // Default: return all lessons across all tracks
  return Object.values(ALL_TRACKS).flatMap(t => t.units.flatMap(u => u.lessons));
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find(l => l.id === id);
}

export function getUnitById(id: string): Unit | undefined {
  for (const track of Object.values(ALL_TRACKS)) {
    const unit = track.units.find(u => u.id === id);
    if (unit) return unit;
  }
  return undefined;
}

export function getTotalQuestions(trackId?: string): number {
  return getAllLessons(trackId).reduce((sum, l) => sum + l.quiz.length, 0);
}

export function getTotalLessons(trackId?: string): number {
  return getAllLessons(trackId).length;
}
