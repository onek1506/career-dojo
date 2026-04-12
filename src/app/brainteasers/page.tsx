'use client';

import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { BRAIN_TEASERS } from '@/data/brainteasers';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { useState, useEffect } from 'react';
import { Brain, Lightbulb, Eye, EyeOff, ChevronDown, ChevronUp, Sparkles, Calculator, BarChart3, Puzzle, Dice5 } from 'lucide-react';

const DONE_STORAGE_KEY = 'brainteaser_done';

const CATEGORY_INFO: Record<string, { label: string; labelDe: string; icon: React.ReactNode; color: string }> = {
  logic: { label: 'Logic', labelDe: 'Logik', icon: <Puzzle size={14} />, color: '#1CB0F6' },
  math: { label: 'Mental Math', labelDe: 'Kopfrechnen', icon: <Calculator size={14} />, color: '#58CC02' },
  estimation: { label: 'Estimation', labelDe: 'Schätzung', icon: <BarChart3 size={14} />, color: '#FF9600' },
  lateral: { label: 'Lateral', labelDe: 'Querdenken', icon: <Lightbulb size={14} />, color: '#CE82FF' },
  probability: { label: 'Probability', labelDe: 'Wahrscheinlichkeit', icon: <Dice5 size={14} />, color: '#FF4B4B' },
};

const DIFF_COLORS = { easy: '#58CC02', medium: '#FF9600', hard: '#FF4B4B' };

export default function BrainTeasersPage() {
  const { t, progress, update } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [completedTeasers, setCompletedTeasers] = useState<Set<string>>(new Set());

  // Load persisted completion state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(DONE_STORAGE_KEY);
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        if (Array.isArray(arr)) setCompletedTeasers(new Set(arr));
      }
    } catch {
      // corrupt storage, ignore
    }
  }, []);

  const persistCompleted = (next: Set<string>) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(Array.from(next)));
    } catch {
      // storage full, ignore
    }
  };

  const filtered = BRAIN_TEASERS.filter(bt => {
    if (selectedCategory && bt.category !== selectedCategory) return false;
    if (selectedDifficulty && bt.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const toggleHint = (id: string) => {
    playClickSound();
    setRevealedHints(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAnswer = (id: string, xp: number) => {
    const isRevealing = !revealedAnswers.has(id);
    if (isRevealing) {
      playRevealSound();
      if (!completedTeasers.has(id)) {
        setCompletedTeasers(prev => {
          const next = new Set(prev).add(id);
          persistCompleted(next);
          return next;
        });
        update({ xp: progress.xp + xp });
      }
    } else {
      playClickSound();
    }
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain size={28} className="text-[var(--accent-purple)]" />
            <h1 className="text-2xl font-black">{t('Brain Teasers', 'Brain Teasers')}</h1>
          </div>
          <p className="text-[var(--duo-text-muted)] text-sm">
            {t(`${BRAIN_TEASERS.length} puzzles from McKinsey, Goldman & more`, `${BRAIN_TEASERS.length} Rätsel von McKinsey, Goldman & mehr`)}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { setSelectedCategory(null); playClickSound(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              !selectedCategory ? 'bg-[var(--accent-info)] text-white' : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
            }`}
          >
            {t('All', 'Alle')} ({BRAIN_TEASERS.length})
          </button>
          {Object.entries(CATEGORY_INFO).map(([key, info]) => {
            const count = BRAIN_TEASERS.filter(bt => bt.category === key).length;
            return (
              <button
                key={key}
                onClick={() => { setSelectedCategory(selectedCategory === key ? null : key); playClickSound(); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                  selectedCategory === key ? 'text-white' : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                }`}
                style={selectedCategory === key ? { background: info.color } : undefined}
              >
                {info.icon}
                {progress.language === 'de' ? info.labelDe : info.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 justify-center">
          {(['easy', 'medium', 'hard'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => { setSelectedDifficulty(selectedDifficulty === diff ? null : diff); playClickSound(); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                selectedDifficulty === diff ? 'text-white' : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
              }`}
              style={selectedDifficulty === diff ? { background: DIFF_COLORS[diff] } : undefined}
            >
              {diff === 'easy' ? t('Easy', 'Leicht') : diff === 'medium' ? t('Medium', 'Mittel') : t('Hard', 'Schwer')}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="duo-card p-4 flex items-center justify-around text-center">
          <div>
            <div className="text-lg font-black text-[var(--accent-xp)]">{completedTeasers.size}</div>
            <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">{t('Solved', 'Gelöst')}</div>
          </div>
          <div className="w-px h-8 bg-[var(--duo-border)]" />
          <div>
            <div className="text-lg font-black">{filtered.length}</div>
            <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">{t('Available', 'Verfügbar')}</div>
          </div>
          <div className="w-px h-8 bg-[var(--duo-border)]" />
          <div>
            <div className="text-lg font-black text-[var(--duo-yellow)]">{BRAIN_TEASERS.length}</div>
            <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">{t('Total', 'Gesamt')}</div>
          </div>
        </div>

        {/* Brain Teasers List */}
        <div className="space-y-3">
          {filtered.map((bt) => {
            const catInfo = CATEGORY_INFO[bt.category];
            const isExpanded = expandedId === bt.id;
            const hintShown = revealedHints.has(bt.id);
            const answerShown = revealedAnswers.has(bt.id);
            const isDone = completedTeasers.has(bt.id);

            return (
              <div key={bt.id} className={`duo-card overflow-hidden transition-all ${isDone ? 'border-[var(--accent-xp)]' : ''}`}>
                {/* Header */}
                <button
                  onClick={() => { setExpandedId(isExpanded ? null : bt.id); playClickSound(); }}
                  className="w-full p-4 flex items-start gap-3 text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${catInfo.color}20`, border: `2px solid ${catInfo.color}` }}>
                    {isDone ? <span className="text-[var(--accent-xp)] text-sm">✓</span> : catInfo.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm leading-tight">
                      {progress.language === 'de' ? bt.questionDe : bt.question}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${catInfo.color}20`, color: catInfo.color }}>
                        {progress.language === 'de' ? catInfo.labelDe : catInfo.label}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${DIFF_COLORS[bt.difficulty]}20`, color: DIFF_COLORS[bt.difficulty] }}>
                        {bt.difficulty === 'easy' ? t('Easy', 'Leicht') : bt.difficulty === 'medium' ? t('Medium', 'Mittel') : t('Hard', 'Schwer')}
                      </span>
                      <span className="text-[10px] text-[var(--duo-text-muted)]">+{bt.xpReward} XP</span>
                      {bt.source && <span className="text-[10px] text-[var(--duo-text-muted)] italic">{bt.source}</span>}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--duo-text-muted)] mt-1" /> : <ChevronDown size={16} className="text-[var(--duo-text-muted)] mt-1" />}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {/* Hint */}
                    <button
                      onClick={() => toggleHint(bt.id)}
                      className="w-full flex items-center gap-2 p-3 rounded-xl bg-[rgba(255,200,0,0.08)] border border-[rgba(255,200,0,0.2)] transition hover:bg-[rgba(255,200,0,0.15)]"
                    >
                      <Lightbulb size={16} className="text-[var(--duo-yellow)] shrink-0" />
                      <span className="text-sm font-bold text-[var(--duo-yellow)]">{t('Hint', 'Hinweis')}</span>
                      {hintShown ? <EyeOff size={14} className="ml-auto text-[var(--duo-text-muted)]" /> : <Eye size={14} className="ml-auto text-[var(--duo-text-muted)]" />}
                    </button>
                    {hintShown && (
                      <div className="text-sm text-gray-300 pl-4 border-l-2 border-[var(--duo-yellow)]">
                        {progress.language === 'de' ? bt.hintDe : bt.hint}
                      </div>
                    )}

                    {/* Answer */}
                    <button
                      onClick={() => toggleAnswer(bt.id, bt.xpReward)}
                      className="w-full flex items-center gap-2 p-3 rounded-xl bg-[rgba(88,204,2,0.08)] border border-[rgba(88,204,2,0.2)] transition hover:bg-[rgba(88,204,2,0.15)]"
                    >
                      <Sparkles size={16} className="text-[var(--accent-xp)] shrink-0" />
                      <span className="text-sm font-bold text-[var(--accent-xp)]">{t('Show Answer', 'Antwort zeigen')}</span>
                      {answerShown ? <EyeOff size={14} className="ml-auto text-[var(--duo-text-muted)]" /> : <Eye size={14} className="ml-auto text-[var(--duo-text-muted)]" />}
                    </button>
                    {answerShown && (
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-[rgba(88,204,2,0.1)] border border-[rgba(88,204,2,0.2)]">
                          <div className="font-bold text-sm text-[var(--accent-xp)] mb-1">{t('Answer:', 'Antwort:')}</div>
                          <div className="text-sm text-gray-200">{progress.language === 'de' ? bt.answerDe : bt.answer}</div>
                        </div>
                        <div className="text-sm text-gray-400 leading-relaxed">
                          <span className="font-bold text-gray-300">{t('Explanation:', 'Erklärung:')}</span>{' '}
                          {progress.language === 'de' ? bt.explanationDe : bt.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--duo-text-muted)]">
            <Brain size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">{t('No teasers match your filters', 'Keine Rätsel passen zu deinen Filtern')}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
