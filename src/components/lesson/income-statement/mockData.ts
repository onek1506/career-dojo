// Mock data for the retention hub. Replace with Supabase-backed data later.

export const mockRetentionData = {
  streak: { current: 1, target: 7 },
  level: { current: 1, next: 2, currentXp: 30, requiredXp: 200 },
  ranking: { percentile: 18, totalUsers: 1247 },
  nextLesson: {
    id: 'acc-1b-margins',
    title: 'Margen lesen',
    duration: '6 Min',
    xp: 35,
  },
};
