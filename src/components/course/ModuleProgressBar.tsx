'use client';

export default function ModuleProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.min(100, (completed / total) * 100);
  return (
    <div className="h-1 bg-is-bg-border rounded-full mt-2 mb-5 overflow-hidden">
      <div
        className="bg-is-accent h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
