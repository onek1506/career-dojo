'use client';

import { useMemo, useState } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp, X } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import {
  GLOSSARY,
  type GlossaryTerm,
  type GlossaryTrack,
} from '@/data/glossary';
import { getCharacterForTrack, getFirstQuote } from '@/data/characters';
import { playClickSound } from '@/lib/sounds';

type FilterTab = 'all' | 'ib' | 'consulting' | 'pe' | 'vc';

const TABS: { id: FilterTab; label: string; labelDe: string; color: string }[] = [
  { id: 'all', label: 'All', labelDe: 'Alle', color: 'var(--accent-info)' },
  { id: 'ib', label: 'IB', labelDe: 'IB', color: 'var(--accent-info)' },
  { id: 'consulting', label: 'Consulting', labelDe: 'Consulting', color: 'var(--accent-xp)' },
  { id: 'pe', label: 'PE', labelDe: 'PE', color: 'var(--accent-purple)' },
  { id: 'vc', label: 'VC', labelDe: 'VC', color: 'var(--accent-streak)' },
];

const TRACK_LABEL: Record<GlossaryTrack, { label: string; color: string }> = {
  ib: { label: 'IB', color: 'var(--accent-info)' },
  consulting: { label: 'CONS', color: 'var(--accent-xp)' },
  pe: { label: 'PE', color: 'var(--accent-purple)' },
  vc: { label: 'VC', color: 'var(--accent-streak)' },
  all: { label: 'ALL', color: 'var(--duo-text-muted)' },
};

export default function GlossaryPage() {
  const { progress, t } = useStore();
  const isDE = progress.language === 'de';
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>(() => {
    // Default the filter to the user's current track when possible.
    const track = progress.selectedTrack;
    if (track === 'ib' || track === 'consulting' || track === 'pe' || track === 'vc') {
      return track;
    }
    return 'all';
  });
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo<GlossaryTerm[]>(() => {
    const q = query.trim().toLowerCase();

    const byTab = GLOSSARY.filter((g) => {
      if (activeTab === 'all') return true;
      return g.track.includes(activeTab) || g.track.includes('all');
    });

    const bySearch = q
      ? byTab.filter(
          (g) =>
            g.term.toLowerCase().includes(q) ||
            g.termDe.toLowerCase().includes(q) ||
            g.definition.toLowerCase().includes(q) ||
            g.definitionDe.toLowerCase().includes(q),
        )
      : byTab;

    // Alphabetical sort on whichever language is active.
    return [...bySearch].sort((a, b) => {
      const aKey = (isDE ? a.termDe : a.term).toLowerCase();
      const bKey = (isDE ? b.termDe : b.term).toLowerCase();
      return aKey.localeCompare(bKey);
    });
  }, [query, activeTab, isDE]);

  const toggle = (id: string) => {
    playClickSound();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <AppShell>
      <div className="space-y-5 pb-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-info)] flex items-center justify-center shrink-0">
            <BookOpen size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black">
              {t('Glossary', 'Glossar')}
            </h1>
            <p className="text-xs text-[var(--duo-text-muted)]">
              {isDE
                ? `${GLOSSARY.length} Begriffe — IB · Consulting · PE · VC`
                : `${GLOSSARY.length} terms — IB · Consulting · PE · VC`}
            </p>
          </div>
        </div>

        {/* Character quote */}
        <div className="flex items-start gap-3 duo-card p-3">
          <span className="text-2xl">{character.emoji}</span>
          <div className="text-xs">
            <span
              className="font-bold"
              style={{ color: character.color }}
            >
              {character.name}:
            </span>
            <span className="text-[var(--text-secondary)] ml-1 italic">
              {getFirstQuote(character, progress.language)}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--duo-text-muted)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'Search terms, definitions…',
              'Begriffe, Definitionen suchen…',
            )}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-[var(--duo-card)] border-2 border-[var(--duo-border)] text-[var(--text-primary)] text-sm placeholder-[var(--duo-text-muted)] focus:border-[var(--accent-info)] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--duo-text-muted)] hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  playClickSound();
                }}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border-2 transition ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--duo-text-muted)] border-[var(--duo-border)] hover:text-white'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: tab.color,
                        borderColor: tab.color,
                      }
                    : undefined
                }
              >
                {isDE ? tab.labelDe : tab.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="text-[11px] text-[var(--duo-text-muted)] uppercase font-bold tracking-wide">
          {filtered.length}{' '}
          {filtered.length === 1
            ? t('result', 'Ergebnis')
            : t('results', 'Ergebnisse')}
        </div>

        {/* List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="duo-card p-8 text-center space-y-2">
              <div className="text-4xl">🔎</div>
              <p className="text-sm text-[var(--duo-text-muted)]">
                {t(
                  'No terms match your search.',
                  'Keine Begriffe gefunden.',
                )}
              </p>
            </div>
          )}

          {filtered.map((entry) => {
            const isOpen = openId === entry.id;
            // Pick the dominant track for the badge color.
            const primaryTrack: GlossaryTrack =
              entry.track.find((t) => t !== 'all') ?? 'all';
            const badge = TRACK_LABEL[primaryTrack];
            const title = isDE ? entry.termDe : entry.term;
            const shortDef = (isDE ? entry.definitionDe : entry.definition)
              .split('.')[0]
              .slice(0, 110);

            return (
              <button
                key={entry.id}
                onClick={() => toggle(entry.id)}
                className={`w-full duo-card p-4 text-left transition-all ${
                  isOpen ? 'border-[var(--accent-info)]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5 text-[10px] font-black px-2 py-0.5 rounded-md border-2"
                    style={{
                      color: badge.color,
                      borderColor: badge.color,
                      backgroundColor: 'transparent',
                    }}
                  >
                    {badge.label}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-black text-sm text-white truncate">
                        {title}
                      </span>
                      {isOpen ? (
                        <ChevronUp
                          size={16}
                          className="shrink-0 text-[var(--accent-info)]"
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="shrink-0 text-[var(--duo-text-muted)]"
                        />
                      )}
                    </div>

                    {!isOpen && (
                      <p className="text-xs text-[var(--duo-text-muted)] mt-1 line-clamp-2">
                        {shortDef}
                        {shortDef.length >= 110 && '…'}
                      </p>
                    )}

                    {isOpen && (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs leading-relaxed text-[var(--text-primary)]">
                          {isDE ? entry.definitionDe : entry.definition}
                        </p>

                        {entry.formula && (
                          <div className="bg-[rgba(28,176,246,0.08)] border border-[var(--accent-info)] rounded-lg px-3 py-2">
                            <div className="text-[9px] uppercase font-bold tracking-wide text-[var(--accent-info)] mb-1">
                              {t('Formula', 'Formel')}
                            </div>
                            <code className="text-[11px] font-mono text-[var(--accent-info)]">
                              {entry.formula}
                            </code>
                          </div>
                        )}

                        <div className="bg-[rgba(206,130,255,0.08)] border border-[var(--accent-purple)] rounded-lg px-3 py-2">
                          <div className="text-[9px] uppercase font-bold tracking-wide text-[var(--accent-purple)] mb-1">
                            {t('Example', 'Beispiel')}
                          </div>
                          <p className="text-[11px] italic text-[var(--text-primary)]">
                            {isDE ? entry.exampleDe : entry.example}
                          </p>
                        </div>

                        {/* Track chips */}
                        <div className="flex flex-wrap gap-1">
                          {entry.track.map((tr) => {
                            const label = TRACK_LABEL[tr];
                            return (
                              <span
                                key={tr}
                                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                style={{
                                  color: label.color,
                                  backgroundColor: 'rgba(255,255,255,0.05)',
                                  border: `1px solid ${label.color}`,
                                }}
                              >
                                {label.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
