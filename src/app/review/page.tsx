'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Zap,
  Sparkles,
  Flame,
  Eye,
  RotateCcw,
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { getAllLessons } from '@/data/content';
import type { QuizQuestion } from '@/data/content';
import {
  getCharacterForTrack,
  getRandomEncouragement,
  getFirstQuote,
} from '@/data/characters';
import {
  playCompleteSound,
  playClickSound,
  playXpSound,
} from '@/lib/sounds';
import {
  sortByDueness,
  getDueCards,
  getIntervalLabel,
  QUALITY_AGAIN,
  QUALITY_HARD,
  QUALITY_GOOD,
  QUALITY_EASY,
  type Quality,
} from '@/lib/spaced-repetition';

// XP earned per card for any passing grade (Hard/Good/Easy)
const XP_PER_CORRECT = 8;

interface ReviewItem {
  question: QuizQuestion;
  lessonId: string;
  lessonTitle: string;
  lessonTitleDe: string;
  /** The actual ReviewCard — needed for interval label preview */
  card: import('@/lib/spaced-repetition').ReviewCard;
}

export default function ReviewPage() {
  const router = useRouter();
  const { progress, loaded, t, recordAnswer, update, trackLessonIds } = useStore();
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');
  const isDE = progress.language === 'de';

  // Build the review queue ONCE at mount — track-specific
  const reviewItems = useMemo<ReviewItem[]>(() => {
    if (!loaded) return [];
    const due = sortByDueness(getDueCards(progress.reviewCards, trackLessonIds));
    if (due.length === 0) return [];

    const allLessons = getAllLessons(progress.selectedTrack || 'ib');
    const index = new Map<string, { question: QuizQuestion; lessonId: string; lessonTitle: string; lessonTitleDe: string }>();
    for (const lesson of allLessons) {
      for (const q of lesson.quiz) {
        index.set(q.id, {
          question: q,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          lessonTitleDe: lesson.titleDe,
        });
      }
    }

    return due
      .map((card) => {
        const info = index.get(card.questionId);
        if (!info) return null;
        return { ...info, card };
      })
      .filter((x): x is ReviewItem => !!x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const [phase, setPhase] = useState<'intro' | 'review' | 'results'>('intro');
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);
  const [bonusApplied, setBonusApplied] = useState(false);

  const totalCards = reviewItems.length;
  const current = phase === 'review' ? reviewItems[idx] : null;

  // Character intro quote
  const [introQuote] = useState(() =>
    isDE
      ? 'Die Fragen raechen sich. Geh sie nochmal durch.'
      : 'Those questions bite back. Time to face them again.',
  );

  // When results phase starts, push XP bonus into the store
  useEffect(() => {
    if (phase !== 'results' || bonusApplied) return;
    if (xpEarned > 0) {
      update({ xp: progress.xp + xpEarned });
    }
    setBonusApplied(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // --- No due cards ---
  if (loaded && totalCards === 0) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-[var(--duo-text-muted)] hover:text-white"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-black">
              {t('Review', 'Wiederholen')}
            </h1>
          </div>

          <div className="duo-card p-8 text-center space-y-4">
            <div className="text-6xl">🌱</div>
            <h2 className="text-xl font-black text-[var(--accent-xp)]">
              {t('All done!', 'Alles erledigt!')}
            </h2>
            <p className="text-sm text-[var(--duo-text-muted)]">
              {t(
                'Come back tomorrow — new cards will be waiting.',
                'Komm morgen wieder — neue Karten warten auf dich.',
              )}
            </p>

            <div className="flex items-start gap-3 bg-[rgba(28,176,246,0.08)] border border-[var(--duo-border)] rounded-xl p-3 text-left">
              <span className="text-2xl">{character.emoji}</span>
              <div className="text-xs">
                <span
                  className="font-bold"
                  style={{ color: character.color }}
                >
                  {character.name}:
                </span>
                <span className="text-gray-300 ml-1 italic">
                  {getFirstQuote(character, progress.language)}
                </span>
              </div>
            </div>

            <Link href="/skill-tree">
              <button className="w-full py-3 rounded-xl bg-[var(--accent-xp)] text-white font-bold btn-press transition">
                {t('Back to Learning', 'Zurueck zum Lernen')}
              </button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  // --- Intro ---
  if (phase === 'intro') {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-[var(--duo-text-muted)] hover:text-white"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-xl font-black">
              {t('Review', 'Wiederholen')}
            </h1>
          </div>

          <div className="duo-card p-6 space-y-4 border-2 border-[var(--duo-red)]">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[var(--duo-red)] flex items-center justify-center shrink-0">
                <Flame size={26} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-[var(--duo-red)] font-bold uppercase tracking-wide">
                  {t('Spaced Repetition', 'Spaced Repetition')}
                </div>
                <div className="text-2xl font-black">
                  {isDE
                    ? `${totalCards} Karten warten auf dich`
                    : `${totalCards} cards are waiting for you`}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[rgba(255,75,75,0.08)] border border-[var(--duo-border)] rounded-xl p-3">
              <span className="text-2xl">{character.emoji}</span>
              <div className="text-xs">
                <span
                  className="font-bold"
                  style={{ color: character.color }}
                >
                  {character.name}:
                </span>
                <span className="text-gray-300 ml-1 italic">
                  {`"${introQuote}"`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--duo-bg)] rounded-xl p-3 text-center border border-[var(--duo-border)]">
                <div className="text-2xl font-black">{totalCards}</div>
                <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">
                  {t('Due Cards', 'Faellige Karten')}
                </div>
              </div>
              <div className="bg-[var(--duo-bg)] rounded-xl p-3 text-center border border-[var(--duo-border)]">
                <div className="text-2xl font-black text-[var(--duo-yellow)]">
                  ≤{totalCards * XP_PER_CORRECT}
                </div>
                <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold">
                  {t('Bonus XP', 'Bonus XP')}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setPhase('review');
                playClickSound();
              }}
              className="w-full py-4 rounded-xl bg-[var(--duo-red)] hover:opacity-90 text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              {t('Start Review', 'Review starten')}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  // --- Anki-style Review ---
  const handleRate = (quality: Quality) => {
    if (!current) return;
    playClickSound();
    const isPassing = quality >= 3;

    // Record the SM-2 quality rating
    recordAnswer(current.question.id, current.lessonId, quality);

    if (isPassing) {
      playXpSound();
      setCorrectCount((c) => c + 1);
      setXpEarned((x) => x + XP_PER_CORRECT);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 800);
    }

    // Move to next card or results
    if (idx < totalCards - 1) {
      setIdx((i) => i + 1);
      setShowAnswer(false);
    } else {
      playCompleteSound();
      setPhase('results');
    }
  };

  if (phase === 'review' && current) {
    const q = current.question;
    const card = current.card;
    const progressPct = ((idx + (showAnswer ? 0.5 : 0)) / totalCards) * 100;

    // Interval labels for the 4 buttons
    const labelAgain = getIntervalLabel(card, QUALITY_AGAIN);
    const labelHard = getIntervalLabel(card, QUALITY_HARD);
    const labelGood = getIntervalLabel(card, QUALITY_GOOD);
    const labelEasy = getIntervalLabel(card, QUALITY_EASY);

    return (
      <AppShell>
        <div className="space-y-5">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-[var(--duo-text-muted)] hover:text-white"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="flex-1 progress-bar-track h-2.5">
              <div
                className="progress-bar-fill h-full bg-[var(--duo-red)] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs text-[var(--duo-text-muted)] font-bold min-w-[40px] text-right">
              {idx + 1}/{totalCards}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--duo-text-muted)]">
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-[var(--duo-red)]" />
              {t('Review', 'Wiederholen')} ·{' '}
              {isDE ? current.lessonTitleDe : current.lessonTitle}
            </span>
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-[var(--duo-yellow)]" /> +
              {XP_PER_CORRECT} XP
            </span>
          </div>

          {showXpPop && (
            <div className="fixed top-20 right-4 text-[var(--duo-yellow)] font-black text-lg animate-float-up z-50">
              +{XP_PER_CORRECT} XP
            </div>
          )}

          {/* Flashcard */}
          <div className="duo-card p-6 space-y-4">
            {/* Question (always visible) */}
            <h2 className="text-lg font-black">
              {isDE ? q.questionDe : q.question}
            </h2>

            {!showAnswer ? (
              /* --- Front: Show Answer button --- */
              <button
                onClick={() => {
                  setShowAnswer(true);
                  playClickSound();
                }}
                className="w-full py-4 rounded-xl bg-[var(--accent-info)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                {t('Show Answer', 'Antwort zeigen')}
              </button>
            ) : (
              /* --- Back: Answer + Explanation + 4 Buttons --- */
              <>
                {/* Correct answer */}
                <div className="rounded-xl p-4 bg-[rgba(88,204,2,0.1)] border-2 border-[var(--accent-xp)]">
                  <div className="text-xs text-[var(--accent-xp)] font-bold uppercase tracking-wide mb-2">
                    {t('Correct Answer', 'Richtige Antwort')}
                  </div>
                  <div className="text-sm font-bold">
                    {q.options?.[q.correctAnswer as number] &&
                      (isDE
                        ? q.options[q.correctAnswer as number].textDe
                        : q.options[q.correctAnswer as number].text)}
                  </div>
                </div>

                {/* Explanation */}
                <div className="rounded-xl p-4 bg-[rgba(28,176,246,0.06)] border border-[var(--duo-border)]">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xl">{character.emoji}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: character.color }}
                    >
                      {character.name}:
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {isDE ? q.explanationDe : q.explanation}
                  </p>
                </div>

                {/* How well did you know this? */}
                <div className="text-center text-xs text-[var(--duo-text-muted)] font-bold uppercase tracking-wide pt-2">
                  {t('How well did you know this?', 'Wie gut wusstest du das?')}
                </div>

                {/* 4 Anki-style rating buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {/* Again */}
                  <button
                    onClick={() => handleRate(QUALITY_AGAIN)}
                    className="flex flex-col items-center gap-1 py-3 px-1 rounded-xl border-2 border-[var(--duo-red)] bg-[rgba(255,75,75,0.08)] hover:bg-[rgba(255,75,75,0.2)] btn-press transition"
                  >
                    <RotateCcw size={18} className="text-[var(--duo-red)]" />
                    <span className="text-xs font-black text-[var(--duo-red)]">
                      {t('Again', 'Nochmal')}
                    </span>
                    <span className="text-[10px] text-[var(--duo-text-muted)]">
                      {labelAgain}
                    </span>
                  </button>

                  {/* Hard */}
                  <button
                    onClick={() => handleRate(QUALITY_HARD)}
                    className="flex flex-col items-center gap-1 py-3 px-1 rounded-xl border-2 border-[var(--accent-streak)] bg-[rgba(255,150,0,0.08)] hover:bg-[rgba(255,150,0,0.2)] btn-press transition"
                  >
                    <Flame size={18} className="text-[var(--accent-streak)]" />
                    <span className="text-xs font-black text-[var(--accent-streak)]">
                      {t('Hard', 'Schwer')}
                    </span>
                    <span className="text-[10px] text-[var(--duo-text-muted)]">
                      {labelHard}
                    </span>
                  </button>

                  {/* Good */}
                  <button
                    onClick={() => handleRate(QUALITY_GOOD)}
                    className="flex flex-col items-center gap-1 py-3 px-1 rounded-xl border-2 border-[var(--accent-xp)] bg-[rgba(88,204,2,0.08)] hover:bg-[rgba(88,204,2,0.2)] btn-press transition"
                  >
                    <Sparkles size={18} className="text-[var(--accent-xp)]" />
                    <span className="text-xs font-black text-[var(--accent-xp)]">
                      {t('Good', 'Gut')}
                    </span>
                    <span className="text-[10px] text-[var(--duo-text-muted)]">
                      {labelGood}
                    </span>
                  </button>

                  {/* Easy */}
                  <button
                    onClick={() => handleRate(QUALITY_EASY)}
                    className="flex flex-col items-center gap-1 py-3 px-1 rounded-xl border-2 border-[var(--accent-info)] bg-[rgba(28,176,246,0.08)] hover:bg-[rgba(28,176,246,0.2)] btn-press transition"
                  >
                    <Zap size={18} className="text-[var(--accent-info)]" />
                    <span className="text-xs font-black text-[var(--accent-info)]">
                      {t('Easy', 'Leicht')}
                    </span>
                    <span className="text-[10px] text-[var(--duo-text-muted)]">
                      {labelEasy}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </AppShell>
    );
  }

  // --- Results ---
  const accuracy =
    totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;
  const emoji =
    correctCount === totalCards
      ? '🏆'
      : correctCount * 2 >= totalCards
        ? '⭐'
        : '🌱';

  return (
    <AppShell>
      <div className="space-y-6 text-center">
        <div className="text-6xl">{emoji}</div>
        <h2 className="text-2xl font-black">
          {correctCount === totalCards
            ? t('All cards cleared!', 'Alle Karten geschafft!')
            : t('Review complete!', 'Review abgeschlossen!')}
        </h2>

        <div className="duo-card p-4 flex items-start gap-3 text-left">
          <span className="text-2xl">{character.emoji}</span>
          <p className="text-sm italic">
            {getRandomEncouragement(character, progress.language)}
          </p>
        </div>

        <div className="duo-card p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-[var(--duo-text-muted)]">
              {t('Remembered', 'Gewusst')}
            </span>
            <span className="font-black text-lg">
              {correctCount}/{totalCards}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--duo-text-muted)]">
              {t('Accuracy', 'Genauigkeit')}
            </span>
            <span className="font-black text-lg">{accuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--duo-text-muted)]">
              {t('Bonus XP', 'Bonus XP')}
            </span>
            <span className="font-black text-lg text-[var(--duo-yellow)]">
              <Zap size={16} className="inline" fill="var(--duo-yellow)" />{' '}
              {xpEarned}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/" className="flex-1">
            <button className="w-full py-3 rounded-xl border-2 border-[var(--duo-border)] text-white font-bold btn-press transition">
              {t('Home', 'Start')}
            </button>
          </Link>
          <Link href="/skill-tree" className="flex-1">
            <button className="w-full py-3 rounded-xl bg-[var(--accent-xp)] text-white font-bold btn-press transition flex items-center justify-center gap-2">
              <Sparkles size={16} />
              {t('Keep Learning', 'Weiterlernen')}
            </button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
