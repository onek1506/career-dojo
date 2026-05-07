// Mock data for the margins-lesson retention hub. Replace with Supabase-backed
// data later, mirroring src/components/lesson/income-statement/mockData.ts.

export const mockRetentionData = {
  streak: { current: 2, target: 7 },
  level: { current: 1, next: 2, currentXp: 65, requiredXp: 200 },
  ranking: { percentile: 18, totalUsers: 1247 },
  nextLesson: {
    id: 'acc-2-balance-sheet',
    title: 'Balance Sheet',
    duration: '8 Min',
    xp: 30,
  },
};
