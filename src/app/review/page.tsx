'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Zap,
  CheckCircle,
  XCircle,
  Sparkles,
  Flame,
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { getAllLessons } from '@/data/content';
import type { QuizQuestion } from '@/data/content';
import {
  getCharacterForTrack,
  getRandomEncouragement,
  getRandomWrongReaction,
  getFirstQuote,
} from '@/data/characters';
import {
  playCorrectSound,
  playWrongSound,
  playCompleteSound,
  playClickSound,
  playXpSound,
} from '@/lib/sounds';
import { sortByDueness, getDueCards } from '@/lib/spaced-repetition';

// Each review card earns this much bonus XP on a correct answer.
const XP_PER_CORRECT = 8;

interface ReviewItem {
  question: QuizQuestion;
  lessonId: string;
  lessonTitle: string;
  lessonTitleDe: string;
}

export default function ReviewPage() {
  const router = useRouter();
  const { progress, loaded, t, recordAnswer, update } = useStore();
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');
  const isDE = progress.language === 'de';

  // Build the review queue ONCE at mount — so answering cards
  // doesn't constantly re-sort the list mid-session.
  const reviewItems = useMemo<ReviewItem[]>(() => {
    if (!loaded) return [];
    const due = sortByDueness(getDueCards(progress.reviewCards));
    if (due.length === 0) return [];

    // Index all quiz questions by id for fast lookup.
    const allLessons = getAllLessons();
    const index = new Map<string, ReviewItem>();
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
      .map((card) => index.get(card.questionId))
      .filter((x): x is ReviewItem => !!x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const [phase, setPhase] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);
  const [bonusApplied, setBonusApplied] = useState(false);

  const totalCards = reviewItems.length;
  const current = phase === 'quiz' ? reviewItems[idx] : null;

  // Character intro quote — stable across renders, chosen once per mount.
  const [introQuote] = useState(() =>
    isDE
      ? 'Die Fragen rächen sich. Geh sie nochmal durch.'
      : 'Those questions bite back. Time to face them again.',
  );

  // When the quiz finishes, push XP bonus into the store exactly once.
  useEffect(() => {
    if (phase !== 'results' || bonusApplied) return;
    if (xpEarned > 0) {
      update({ xp: progress.xp + xpEarned });
    }
    setBonusApplied(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // --- No due cards state ---
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
            <h2 className="text-xl font-black text-[var(--duo-green)]">
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
              <button className="w-full py-3 rounded-xl bg-[var(--duo-green)] text-white font-bold btn-press transition">
                {t('Back to Learning', 'Zurück zum Lernen')}
              </button>
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  // --- Intro state ---
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
                  {t('Due Cards', 'Fällige Karten')}
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
                setPhase('quiz');
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

  // --- Quiz state ---
  const handleAnswer = () => {
    if (selected === null || !current) return;
    setAnswered(true);
    const isCorrect = selected === current.question.correctAnswer;
    recordAnswer(current.question.id, current.lessonId, isCorrect);
    if (isCorrect) {
      playCorrectSound();
      playXpSound();
      setCorrectCount((c) => c + 1);
      setXpEarned((x) => x + XP_PER_CORRECT);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 800);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    if (idx < totalCards - 1) {
      setIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      playCompleteSound();
      setPhase('results');
    }
  };

  if (phase === 'quiz' && current) {
    const q = current.question;
    const progressPct = ((idx + (answered ? 1 : 0)) / totalCards) * 100;

    return (
      <AppShell>
        <div className="space-y-6">
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

          <h2 className="text-lg font-black">
            {isDE ? q.questionDe : q.question}
          </h2>

          {showXpPop && (
            <div className="fixed top-20 right-4 text-[var(--duo-yellow)] font-black text-lg animate-float-up z-50">
              +{XP_PER_CORRECT} XP
            </div>
          )}

          <div className="space-y-3">
            {q.options?.map((opt, i) => {
              let cls = 'quiz-option';
              if (answered) {
                if (i === q.correctAnswer) cls += ' correct';
                else if (i === selected) cls += ' wrong';
              } else if (i === selected) cls += ' selected';
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => {
                    if (!answered) {
                      setSelected(i);
                      playClickSound();
                    }
                  }}
                  disabled={answered}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        answered && i === q.correctAnswer
                          ? 'bg-[var(--duo-green)] text-white'
                          : answered && i === selected
                            ? 'bg-[var(--duo-red)] text-white'
                            : i === selected
                              ? 'bg-[var(--duo-blue)] text-white'
                              : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                      }`}
                    >
                      {answered && i === q.correctAnswer ? (
                        <CheckCircle size={16} />
                      ) : answered && i === selected ? (
                        <XCircle size={16} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </div>
                    <span className="text-sm">{isDE ? opt.textDe : opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={`rounded-xl p-4 border-2 ${
                selected === q.correctAnswer
                  ? 'bg-[rgba(88,204,2,0.1)] border-[var(--duo-green)]'
                  : 'bg-[rgba(255,75,75,0.1)] border-[var(--duo-red)]'
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">{character.emoji}</span>
                <span
                  className={`text-sm font-bold ${
                    selected === q.correctAnswer
                      ? 'text-[var(--duo-green)]'
                      : 'text-[var(--duo-red)]'
                  }`}
                >
                  {selected === q.correctAnswer
                    ? getRandomEncouragement(character, progress.language)
                    : getRandomWrongReaction(character, progress.language)}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isDE ? q.explanationDe : q.explanation}
              </p>
            </div>
          )}

          {!answered ? (
            <button
              onClick={handleAnswer}
              disabled={selected === null}
              className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg btn-press transition"
            >
              {t('Check Answer', 'Antwort prüfen')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl bg-[var(--duo-blue)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              {idx < totalCards - 1
                ? t('Next Card', 'Nächste Karte')
                : t('See Results', 'Ergebnis anzeigen')}
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </AppShell>
    );
  }

  // --- Results ---
  const accuracy =
    totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;
  const emoji =
    correctCount === totalCards ? '🏆' : correctCount * 2 >= totalCards ? '⭐' : '🌱';

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
              {t('Correct', 'Richtig')}
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
            <button className="w-full py-3 rounded-xl bg-[var(--duo-green)] text-white font-bold btn-press transition flex items-center justify-center gap-2">
              <Sparkles size={16} />
              {t('Keep Learning', 'Weiterlernen')}
            </button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
