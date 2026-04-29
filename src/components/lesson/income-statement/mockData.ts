// Mock data for the retention hub. Replace with Supabase-backed data later.

export const mockRetentionData = {
  streak: { current: 1, target: 7 },
  level: { current: 1, next: 2, currentXp: 25, requiredXp: 200 },
  ranking: { percentile: 18, totalUsers: 1247 },
  nextLesson: {
    id: 'expenses-01',
    title: 'Aufwendungen',
    duration: '5 Min',
    xp: 30,
  },
};
