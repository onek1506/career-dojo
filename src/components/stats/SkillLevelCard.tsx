'use client';

interface SkillLevelCardProps {
  level: number;
  title: string;
  description: string;
  totalXp: number;
  nextLevelXp: number;
}

export default function SkillLevelCard({ level, title, description, totalXp, nextLevelXp }: SkillLevelCardProps) {
  const cap = Number.isFinite(nextLevelXp) ? nextLevelXp : Math.max(totalXp, 1);
  const pct = Math.min(100, (totalXp / cap) * 100);
  return (
    <section className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-6">
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        SKILL-LEVEL
      </span>
      <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary mt-1">
        {title}
      </h2>
      <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary mt-1">
        {description}
      </p>

      <div className="border-t border-is-bg-border my-4" />

      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          LEVEL {level}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tabular-nums">
          {totalXp} / {Number.isFinite(nextLevelXp) ? nextLevelXp : '∞'} XP
        </span>
      </div>
      <div className="h-1 bg-is-bg-border rounded-full mt-2 overflow-hidden">
        <div
          className="bg-is-accent h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
