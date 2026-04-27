// Mock data for the retention hub. Replace with Supabase-backed data later.

export const mockRetentionData = {
  streak: { current: 1, target: 7 },
  level: { current: 1, next: 2, currentXp: 55, requiredXp: 200 },
  ranking: { percentile: 18, totalUsers: 1247 },
  nextLesson: {
    id: 'balance-sheet-01',
    title: 'Balance Sheet',
    duration: '9 Min',
    xp: 60,
  },
};
