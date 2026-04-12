'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useState,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { useStore } from '@/lib/store';
import { type Meme, getMemesForTrack } from '@/data/memes';
import ScratchCard from '@/components/ScratchCard';
import {
  getLessonById,
  type Lesson,
  type QuizQuestion,
} from '@/data/content';
import {
  getCharacterForTrack,
  getRandomEncouragement,
  getRandomWrongReaction,
} from '@/data/characters';
import {
  playCorrectSound,
  playWrongSound,
  playCompleteSound,
  playClickSound,
  playRevealSound,
  playXpSound,
  unlockAudioContext,
  getSoundEnabled,
  setSoundEnabled,
} from '@/lib/sounds';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Zap,
  CheckCircle,
  XCircle,
  Eye,
  RotateCcw,
  BookOpen,
  Calculator,
  Lightbulb,
  CheckCheck,
  HelpCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Link from 'next/link';
import GlossaryTooltip from '@/components/GlossaryTooltip';
import { GLOSSARY, type GlossaryTerm } from '@/data/glossary';

const MAX_TIMES_SHOWN = 3; // show each question at most 3 times in a row

// ============================================================
// Slide model — one idea per screen
// ============================================================

type LessonSlide =
  | { kind: 'intro' }
  | { kind: 'explanation'; sectionIdx: number }
  | {
      kind: 'formula';
      formula: string;
      contextHeading: string;
      contextHeadingDe: string;
      contextBody: string;
      contextBodyDe: string;
    }
  | { kind: 'takeaways'; items: Array<{ en: string; de: string }> }
  | { kind: 'tips'; items: Array<{ en: string; de: string }> };

function buildLessonSlides(lesson: Lesson): LessonSlide[] {
  const slides: LessonSlide[] = [{ kind: 'intro' }];

  // 1 explanation slide per section (detailed example is inline on that slide)
  lesson.content.sections.forEach((_, i) => {
    slides.push({ kind: 'explanation', sectionIdx: i });
  });

  // Formula slides — one per formula found across sections
  lesson.content.sections.forEach((s) => {
    if (s.formula) {
      slides.push({
        kind: 'formula',
        formula: s.formula,
        contextHeading: s.heading,
        contextHeadingDe: s.headingDe,
        contextBody: s.body,
        contextBodyDe: s.bodyDe,
      });
    }
  });

  // Consolidated takeaways (one slide for all of them)
  const takeaways = lesson.content.sections
    .filter((s) => s.keyTakeaway || s.keyTakeawayDe)
    .map((s) => ({
      en: s.keyTakeaway || s.keyTakeawayDe || '',
      de: s.keyTakeawayDe || s.keyTakeaway || '',
    }));
  if (takeaways.length > 0) {
    slides.push({ kind: 'takeaways', items: takeaways });
  }

  // Consolidated interview tips (one slide for all of them)
  const tips = lesson.content.sections
    .filter((s) => s.tip || s.tipDe)
    .map((s) => ({
      en: s.tip || s.tipDe || '',
      de: s.tipDe || s.tip || '',
    }));
  if (tips.length > 0) {
    slides.push({ kind: 'tips', items: tips });
  }

  return slides;
}

// ============================================================
// Glossary term wrapper — wraps matched phrases in <GlossaryTooltip/>
// ============================================================

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Walk `text` and wrap every whole-word match against the glossary in
 * a `<GlossaryTooltip/>`. Longest terms are matched first so that e.g.
 * "Terminal Value" wins over "Value". Whole-word boundary excludes
 * letters, digits, underscore AND hyphens — so "EBITDA" won't match
 * inside "EBITDA-Marge".
 */
function wrapGlossaryTerms(
  text: string | undefined | null,
  language: 'en' | 'de',
): ReactNode {
  if (!text) return text ?? null;

  // Sort longest-first to prevent sub-term stealing.
  const candidates = [...GLOSSARY].sort((a, b) => {
    const aKey = language === 'de' ? a.termDe : a.term;
    const bKey = language === 'de' ? b.termDe : b.term;
    return bKey.length - aKey.length;
  });

  type Match = {
    start: number;
    end: number;
    entry: GlossaryTerm;
    matched: string;
  };
  const matches: Match[] = [];
  const used: boolean[] = new Array(text.length).fill(false);

  for (const entry of candidates) {
    const phrase = language === 'de' ? entry.termDe : entry.term;
    if (!phrase) continue;
    let re: RegExp;
    try {
      // Guard: no letter/digit/underscore/hyphen on either side.
      // Requires lookbehind — supported in all browsers Next.js 16 targets.
      re = new RegExp(
        `(?<![\\p{L}\\p{N}_-])${escapeRegex(phrase)}(?![\\p{L}\\p{N}_-])`,
        'giu',
      );
    } catch {
      // Fallback to ASCII \b for ancient engines.
      re = new RegExp(`\\b${escapeRegex(phrase)}\\b`, 'gi');
    }
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const start = m.index;
      const end = m.index + m[0].length;
      let overlaps = false;
      for (let i = start; i < end; i++) {
        if (used[i]) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) continue;
      matches.push({ start, end, entry, matched: m[0] });
      for (let i = start; i < end; i++) used[i] = true;
    }
  }

  if (matches.length === 0) return text;
  matches.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start));
    nodes.push(
      <GlossaryTooltip
        key={`gl-${m.entry.id}-${i}-${m.start}`}
        term={m.entry.term}
        termDe={m.entry.termDe}
        language={language}
      >
        {m.matched}
      </GlossaryTooltip>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

// ============================================================
// Small presentational helpers
// ============================================================

function TypeIndicator({
  icon: Icon,
  label,
  color,
}: {
  icon: typeof BookOpen;
  label: string;
  color: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-black border-2"
      style={{
        color,
        borderColor: color,
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
    >
      <Icon size={12} />
      {label}
    </div>
  );
}

// ============================================================
// Main component
// ============================================================

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const {
    progress,
    t,
    completeLesson,
    recordAnswer,
    recordQuizScore,
    rollMeme,
    unlockedMemes,
  } = useStore();
  const lessonId = params.id as string;
  const lesson = getLessonById(lessonId);

  const lessonSlides = useMemo<LessonSlide[]>(
    () => (lesson ? buildLessonSlides(lesson) : []),
    [lesson],
  );
  const initialQueue = useMemo<QuizQuestion[]>(
    () => lesson?.quiz ?? [],
    [lesson],
  );
  const totalLessonSlides = lessonSlides.length;
  const totalQuestions = initialQueue.length;
  const totalSlides = totalLessonSlides + totalQuestions;

  const [phase, setPhase] = useState<'lesson' | 'quiz' | 'results'>('lesson');
  const [slideIdx, setSlideIdx] = useState(0);
  const [showDetailedExample, setShowDetailedExample] = useState(false);
  const [rolledMeme, setRolledMeme] = useState<Meme | null>(null);
  const [memeRolled, setMemeRolled] = useState(false);
  const [allMemesCollected, setAllMemesCollected] = useState(false);

  // Quiz state (queue-based retry logic from session 5) ---------------------
  const [quizQueue, setQuizQueue] = useState<QuizQuestion[]>(initialQueue);
  const [timesShown, setTimesShown] = useState<Record<string, number>>({});
  const [uniqueAnswered, setUniqueAnswered] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);

  const character = getCharacterForTrack(progress.selectedTrack || 'ib');
  const isDE = progress.language === 'de';

  // Sound toggle + iOS audio unlock
  const [soundOn, setSoundOnState] = useState(true);
  const audioUnlocked = useRef(false);

  useEffect(() => {
    setSoundOnState(getSoundEnabled());
  }, []);

  const handleAudioUnlock = () => {
    if (!audioUnlocked.current) {
      audioUnlocked.current = true;
      unlockAudioContext();
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOnState(next);
    setSoundEnabled(next);
  };

  // Roll a meme exactly once when the user reaches the results phase
  useEffect(() => {
    if (phase !== 'results' || memeRolled) return;
    setMemeRolled(true);
    const trackId = progress.selectedTrack || 'ib';
    const trackMemes = getMemesForTrack(trackId);
    const allUnlocked =
      trackMemes.length > 0 &&
      trackMemes.every((m) => unlockedMemes.includes(m.id));
    if (allUnlocked) {
      setAllMemesCollected(true);
      setRolledMeme(null);
    } else {
      const meme = rollMeme(trackId);
      setRolledMeme(meme);
      setAllMemesCollected(meme === null);
    }
  }, [phase, memeRolled, progress.selectedTrack, rollMeme, unlockedMemes]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[var(--duo-bg)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--duo-text-muted)]">Lesson not found</p>
          <Link href="/skill-tree" className="text-[var(--duo-blue)] mt-2 block">
            Back
          </Link>
        </div>
      </div>
    );
  }

  const currentSlide = phase === 'lesson' ? lessonSlides[slideIdx] : null;
  const currentQuestion = quizQueue[0] ?? null;
  const isRetry =
    currentQuestion !== null && (timesShown[currentQuestion.id] ?? 0) > 0;

  // Global step counter used for the top progress bar and "Slide X of Y".
  const currentStepHuman =
    phase === 'lesson'
      ? slideIdx + 1
      : phase === 'quiz'
        ? totalLessonSlides + Math.min(uniqueAnswered.size + 1, totalQuestions)
        : totalSlides;
  const progressPct =
    phase === 'results'
      ? 100
      : ((currentStepHuman - 1 + (phase === 'quiz' && answered ? 1 : 0)) /
          Math.max(totalSlides, 1)) *
        100;

  // ---------------------------------------------------------------
  // Navigation — lesson phase
  // ---------------------------------------------------------------
  const handleNextSlide = () => {
    playClickSound();
    setShowDetailedExample(false);
    if (slideIdx < totalLessonSlides - 1) {
      setSlideIdx((i) => i + 1);
      return;
    }
    // End of lesson phase → enter quiz (or skip straight to results if empty)
    if (totalQuestions === 0) {
      completeLesson(lessonId, lesson.xpReward);
      playCompleteSound();
      setPhase('results');
      return;
    }
    setPhase('quiz');
    setQuizQueue(initialQueue);
    setTimesShown({});
    setUniqueAnswered(new Set());
    setSelected(null);
    setAnswered(false);
  };

  const handleBackSlide = () => {
    if (slideIdx === 0) return;
    playClickSound();
    setShowDetailedExample(false);
    setSlideIdx((i) => i - 1);
  };

  // ---------------------------------------------------------------
  // Navigation — quiz phase
  // ---------------------------------------------------------------
  const handleAnswer = () => {
    if (selected === null || !currentQuestion) return;
    setAnswered(true);
    const q = currentQuestion;
    const isCorrect = selected === q.correctAnswer;
    const shownBefore = timesShown[q.id] ?? 0;
    const isFirstAttempt = shownBefore === 0;

    // SR is only credited for the FIRST attempt so the grade is honest.
    if (isFirstAttempt) {
      recordAnswer(q.id, lessonId, isCorrect);
    }

    if (isCorrect) {
      playCorrectSound();
      playXpSound();
      if (isFirstAttempt) {
        setScore((s) => s + 1);
        setXpEarned((x) => x + q.xpReward);
      }
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 800);
    } else {
      playWrongSound();
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    playClickSound();
    const q = currentQuestion;
    const isCorrect = selected === q.correctAnswer;
    const shownBefore = timesShown[q.id] ?? 0;
    const newShown = shownBefore + 1;

    setTimesShown((prev) => ({ ...prev, [q.id]: newShown }));
    if (isCorrect) {
      setUniqueAnswered((prev) => {
        if (prev.has(q.id)) return prev;
        const next = new Set(prev);
        next.add(q.id);
        return next;
      });
    }

    const rest = quizQueue.slice(1);
    let nextQueue: QuizQuestion[];
    if (!isCorrect && newShown < MAX_TIMES_SHOWN) {
      nextQueue = [...rest, q];
    } else {
      nextQueue = rest;
      if (!isCorrect && newShown >= MAX_TIMES_SHOWN) {
        setUniqueAnswered((prev) => {
          if (prev.has(q.id)) return prev;
          const next = new Set(prev);
          next.add(q.id);
          return next;
        });
      }
    }

    if (nextQueue.length === 0) {
      const totalXp = lesson.xpReward + xpEarned;
      completeLesson(lessonId, totalXp);
      recordQuizScore(lessonId, score, totalQuestions);
      playCompleteSound();
      setPhase('results');
      return;
    }

    setQuizQueue(nextQueue);
    setSelected(null);
    setAnswered(false);
  };

  const handleExit = () => router.back();
  const canGoBack = phase === 'lesson' && slideIdx > 0;

  // ---------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------
  return (
    <div className="h-dvh bg-[var(--bg)] flex flex-col overflow-hidden" onTouchStart={handleAudioUnlock}>
      {/* ---------- Top bar ---------- */}
      <div className="shrink-0 bg-[var(--duo-card)] border-b-2 border-[var(--duo-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {canGoBack ? (
            <button
              onClick={handleBackSlide}
              className="text-[var(--duo-text-muted)] hover:text-white shrink-0"
              aria-label="Back"
            >
              <ChevronLeft size={22} />
            </button>
          ) : (
            <button
              onClick={handleExit}
              className="text-[var(--duo-text-muted)] hover:text-white shrink-0"
              aria-label="Exit"
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <div className="flex-1 progress-bar-track h-2.5">
            <div
              className="progress-bar-fill h-full bg-[var(--duo-green)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] text-[var(--duo-text-muted)] font-bold shrink-0 tabular-nums">
            {phase === 'results' ? totalSlides : currentStepHuman}
            <span className="opacity-60">/{totalSlides}</span>
          </span>
          <button
            onClick={toggleSound}
            className="text-[var(--text-muted)] shrink-0 p-1"
            aria-label={soundOn ? 'Mute' : 'Unmute'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-5 min-h-full">
          {/* ===== LESSON PHASE ===== */}
          {phase === 'lesson' && currentSlide && (
            <LessonSlideView
              slide={currentSlide}
              lesson={lesson}
              isDE={isDE}
              character={character}
              t={t}
              showDetailedExample={showDetailedExample}
              onShowDetailedExample={() => {
                setShowDetailedExample(true);
                playRevealSound();
              }}
            />
          )}

          {/* ===== QUIZ PHASE ===== */}
          {phase === 'quiz' && currentQuestion && (
            <>
              <TypeIndicator
                icon={HelpCircle}
                label={t('Quiz', 'Quiz')}
                color="var(--duo-purple)"
              />

              <div className="flex items-center justify-between text-xs text-[var(--duo-text-muted)]">
                <span>
                  {t('Question', 'Frage')} {uniqueAnswered.size + 1}/
                  {totalQuestions}
                  {quizQueue.length > 1 && (
                    <span className="ml-2 text-[var(--duo-orange)]">
                      · {quizQueue.length - 1} {t('retry', 'Wdh.')}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={12} className="text-[var(--duo-yellow)]" /> +
                  {currentQuestion.xpReward} XP
                </span>
              </div>

              {isRetry && (
                <div className="flex items-start gap-3 bg-[rgba(255,150,0,0.1)] border-2 border-[var(--duo-orange)] rounded-xl p-3">
                  <RotateCcw
                    size={18}
                    className="text-[var(--duo-orange)] mt-0.5 shrink-0"
                  />
                  <div className="text-sm font-bold text-[var(--duo-orange)]">
                    {t(
                      'Try again! You got this wrong.',
                      'Nochmal! Diese Frage hast du falsch.',
                    )}
                  </div>
                </div>
              )}

              <h2 className="text-lg font-black">
                {isDE ? currentQuestion.questionDe : currentQuestion.question}
              </h2>

              {showXpPop && (
                <div className="fixed top-20 right-4 text-[var(--duo-yellow)] font-black text-lg animate-float-up z-50">
                  +{currentQuestion.xpReward} XP
                </div>
              )}

              <div className="space-y-3">
                {currentQuestion.options?.map((opt, i) => {
                  let cls = 'quiz-option';
                  if (answered) {
                    if (i === currentQuestion.correctAnswer) cls += ' correct';
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
                            answered && i === currentQuestion.correctAnswer
                              ? 'bg-[var(--duo-green)] text-white'
                              : answered && i === selected
                                ? 'bg-[var(--duo-red)] text-white'
                                : i === selected
                                  ? 'bg-[var(--duo-blue)] text-white'
                                  : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                          }`}
                        >
                          {answered && i === currentQuestion.correctAnswer ? (
                            <CheckCircle size={16} />
                          ) : answered && i === selected ? (
                            <XCircle size={16} />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </div>
                        <span className="text-sm">
                          {isDE ? opt.textDe : opt.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`rounded-xl p-4 border-2 ${
                    selected === currentQuestion.correctAnswer
                      ? 'bg-[rgba(88,204,2,0.1)] border-[var(--duo-green)]'
                      : 'bg-[rgba(255,75,75,0.1)] border-[var(--duo-red)]'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-xl">{character.emoji}</span>
                    <span
                      className={`text-sm font-bold ${
                        selected === currentQuestion.correctAnswer
                          ? 'text-[var(--duo-green)]'
                          : 'text-[var(--duo-red)]'
                      }`}
                    >
                      {selected === currentQuestion.correctAnswer
                        ? getRandomEncouragement(
                            character,
                            progress.language,
                          )
                        : getRandomWrongReaction(
                            character,
                            progress.language,
                          )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {isDE
                      ? currentQuestion.explanationDe
                      : currentQuestion.explanation}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ===== RESULTS PHASE ===== */}
          {phase === 'results' && (
            <div className="space-y-6 text-center py-6">
              <div className="text-6xl">
                {score === totalQuestions
                  ? '🏆'
                  : score >= totalQuestions / 2
                    ? '⭐'
                    : '📚'}
              </div>
              <h2 className="text-2xl font-black">
                {score === totalQuestions
                  ? t('Perfect Score!', 'Perfektes Ergebnis!')
                  : score >= totalQuestions / 2
                    ? t('Well Done!', 'Gut gemacht!')
                    : t('Keep Practicing!', 'Weiter üben!')}
              </h2>

              <div className="duo-card p-4 flex items-start gap-3 text-left">
                <span className="text-2xl">{character.emoji}</span>
                <p className="text-sm italic">
                  {getRandomEncouragement(character, progress.language)}
                </p>
              </div>

              {/* ===== Meme Drop ===== */}
              {rolledMeme && (
                <ScratchCard
                  meme={rolledMeme}
                  lang={progress.language}
                  character={character}
                />
              )}
              {!rolledMeme && allMemesCollected && (
                <div className="duo-card p-4 text-sm font-bold text-[var(--duo-gold)] flex items-center justify-center gap-2">
                  🏆
                  <span>
                    {t(
                      'You collected every meme of this track!',
                      'Du hast alle Memes dieses Tracks gesammelt!',
                    )}
                  </span>
                </div>
              )}

              <div className="duo-card p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-[var(--duo-text-muted)]">
                    {t('Score', 'Ergebnis')}
                  </span>
                  <span className="font-black text-lg">
                    {score}/{totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--duo-text-muted)]">
                    {t('Accuracy', 'Genauigkeit')}
                  </span>
                  <span className="font-black text-lg">
                    {totalQuestions > 0
                      ? Math.round((score / totalQuestions) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--duo-text-muted)]">
                    {t('XP Earned', 'XP verdient')}
                  </span>
                  <span className="font-black text-lg text-[var(--duo-yellow)]">
                    <Zap
                      size={16}
                      className="inline"
                      fill="var(--duo-yellow)"
                    />{' '}
                    {lesson.xpReward + xpEarned}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPhase('lesson');
                    setSlideIdx(0);
                    setQuizQueue(initialQueue);
                    setTimesShown({});
                    setUniqueAnswered(new Set());
                    setSelected(null);
                    setAnswered(false);
                    setScore(0);
                    setXpEarned(0);
                    setShowDetailedExample(false);
                    setMemeRolled(false);
                    setRolledMeme(null);
                    setAllMemesCollected(false);
                  }}
                  className="flex-1 py-3 rounded-xl border-2 border-[var(--duo-border)] text-white font-bold btn-press transition"
                >
                  {t('Redo', 'Wiederholen')}
                </button>
                <Link href="/skill-tree" className="flex-1">
                  <button className="w-full py-3 rounded-xl bg-[var(--duo-green)] text-white font-bold btn-press transition">
                    {t('Continue', 'Weiter')}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Bottom action bar ---------- */}
      {phase !== 'results' && (
        <div className="shrink-0 sticky bottom-0 z-50 bg-[var(--bg-card)] border-t-2 border-[var(--border)] px-4 py-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <div className="max-w-2xl mx-auto">
            {phase === 'lesson' && (
              <button
                onClick={handleNextSlide}
                className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] text-white font-black text-lg btn-press transition flex items-center justify-center gap-2"
              >
                {slideIdx < totalLessonSlides - 1
                  ? t('Continue', 'Weiter')
                  : totalQuestions === 0
                    ? t('Finish', 'Fertig')
                    : t('Start Quiz', 'Quiz starten')}
                <ChevronRight size={22} />
              </button>
            )}
            {phase === 'quiz' &&
              currentQuestion &&
              (!answered ? (
                <button
                  onClick={handleAnswer}
                  disabled={selected === null}
                  className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-lg btn-press transition"
                >
                  {t('Check Answer', 'Antwort prüfen')}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-4 rounded-xl bg-[var(--duo-blue)] text-white font-black text-lg btn-press transition flex items-center justify-center gap-2"
                >
                  {quizQueue.length > 1 ||
                  (selected !== currentQuestion.correctAnswer &&
                    (timesShown[currentQuestion.id] ?? 0) + 1 < MAX_TIMES_SHOWN)
                    ? t('Next Question', 'Nächste Frage')
                    : t('See Results', 'Ergebnis anzeigen')}
                  <ChevronRight size={22} />
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Lesson slide view — renders one lesson slide
// ============================================================

type TFn = (en: string, de: string) => string;

interface LessonSlideViewProps {
  slide: LessonSlide;
  lesson: Lesson;
  isDE: boolean;
  character: ReturnType<typeof getCharacterForTrack>;
  t: TFn;
  showDetailedExample: boolean;
  onShowDetailedExample: () => void;
}

function LessonSlideView({
  slide,
  lesson,
  isDE,
  character,
  t,
  showDetailedExample,
  onShowDetailedExample,
}: LessonSlideViewProps) {
  const lang: 'en' | 'de' = isDE ? 'de' : 'en';

  // ===== Intro slide =====
  if (slide.kind === 'intro') {
    return (
      <div className="flex flex-col items-center text-center gap-6 my-auto">
        <TypeIndicator
          icon={BookOpen}
          label={t('Lesson', 'Lektion')}
          color="var(--duo-green)"
        />
        <div className="text-6xl">{character.emoji}</div>
        <h1 className="text-2xl font-black leading-tight">
          {isDE ? lesson.titleDe : lesson.title}
        </h1>
        <div className="duo-card p-4 text-left max-w-md w-full">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">{character.emoji}</span>
            <div className="text-sm">
              <div
                className="font-black mb-1"
                style={{ color: character.color }}
              >
                {character.name}
              </div>
              <p className="text-gray-200 italic">
                {isDE
                  ? `"Lass uns ${lesson.titleDe} durchgehen. Das kommt fast immer im Interview!"`
                  : `"Let's go through ${lesson.title}. This comes up in almost every interview!"`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-[var(--duo-text-muted)] uppercase font-bold tracking-wide">
          <span className="flex items-center gap-1">
            <Zap size={12} className="text-[var(--duo-yellow)]" />
            +{lesson.xpReward} XP
          </span>
          <span>·</span>
          <span>~{lesson.estimatedMinutes} min</span>
        </div>
      </div>
    );
  }

  // ===== Explanation slide =====
  if (slide.kind === 'explanation') {
    const section = lesson.content.sections[slide.sectionIdx];
    if (!section) return null;
    return (
      <>
        <TypeIndicator
          icon={BookOpen}
          label={t('Explanation', 'Erklärung')}
          color="var(--duo-green)"
        />
        <h2 className="text-xl font-black leading-snug">
          {isDE ? section.headingDe : section.heading}
        </h2>
        <div className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">
          {wrapGlossaryTerms(isDE ? section.bodyDe : section.body, lang)}
        </div>

        {(section.example || section.exampleDe) && (
          <div className="bg-[rgba(206,130,255,0.1)] border-2 border-[var(--duo-purple)] rounded-xl p-4">
            <div className="text-[10px] text-[var(--duo-purple)] font-black uppercase mb-1 tracking-wider">
              {t('Example', 'Beispiel')}
            </div>
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
              {isDE
                ? section.exampleDe || section.example
                : section.example}
            </pre>
          </div>
        )}

        {(section.detailedExample || section.detailedExampleDe) && (
          <div>
            {!showDetailedExample ? (
              <button
                onClick={onShowDetailedExample}
                className="w-full py-3 rounded-xl border-2 border-dashed border-[var(--duo-purple)] text-[var(--duo-purple)] font-bold text-sm btn-press transition flex items-center justify-center gap-2 hover:bg-[rgba(206,130,255,0.05)]"
              >
                <Eye size={16} />
                {t('Show Detailed Example', 'Ausführliches Beispiel anzeigen')}
              </button>
            ) : (
              <div className="bg-[rgba(206,130,255,0.08)] border-2 border-[var(--duo-purple)] rounded-xl p-4">
                <div className="text-[10px] text-[var(--duo-purple)] font-black uppercase mb-2 flex items-center gap-1 tracking-wider">
                  <Eye size={12} />
                  {t('Detailed Example', 'Ausführliches Beispiel')}
                </div>
                <div className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">
                  {wrapGlossaryTerms(
                    isDE
                      ? section.detailedExampleDe || section.detailedExample
                      : section.detailedExample,
                    lang,
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  // ===== Formula slide =====
  if (slide.kind === 'formula') {
    // First sentence of the section body gives us "what each variable means"
    // without fabricating content we don't have.
    const fullBody = isDE ? slide.contextBodyDe : slide.contextBody;
    const firstSentence = fullBody.split(/(?<=[.!?])\s+/)[0] ?? fullBody;

    return (
      <>
        <TypeIndicator
          icon={Calculator}
          label={t('Formula', 'Formel')}
          color="var(--duo-blue)"
        />
        <div className="text-[10px] text-[var(--duo-text-muted)] uppercase font-bold tracking-wider">
          {t('From', 'Aus')}:{' '}
          {isDE ? slide.contextHeadingDe : slide.contextHeading}
        </div>

        <div className="bg-[rgba(28,176,246,0.12)] border-2 border-[var(--duo-blue)] rounded-2xl p-8 text-center">
          <code className="text-xl sm:text-2xl font-mono text-[var(--duo-blue)] font-black break-words">
            {slide.formula}
          </code>
        </div>

        <div className="duo-card p-4">
          <div className="text-[10px] text-[var(--duo-blue)] font-black uppercase mb-2 tracking-wider">
            {t('What each symbol means', 'Was jede Variable bedeutet')}
          </div>
          <p className="text-sm leading-relaxed text-gray-200">
            {wrapGlossaryTerms(firstSentence, lang)}
          </p>
        </div>

        <div className="flex items-start gap-2 text-xs text-[var(--duo-text-muted)] italic">
          <Lightbulb size={14} className="text-[var(--duo-yellow)] mt-0.5 shrink-0" />
          <span>
            {t(
              'Interviewers love asking you to explain each variable — memorize them cold.',
              'Interviewer fragen gerne, was jede Variable bedeutet — lerne sie auswendig.',
            )}
          </span>
        </div>
      </>
    );
  }

  // ===== Takeaways slide =====
  if (slide.kind === 'takeaways') {
    return (
      <>
        <TypeIndicator
          icon={CheckCheck}
          label={t('Key Takeaways', 'Kernaussagen')}
          color="var(--duo-green)"
        />
        <h2 className="text-xl font-black leading-snug">
          {t('What to remember', 'Das musst du mitnehmen')}
        </h2>
        <div className="space-y-3">
          {slide.items.map((item, i) => (
            <div
              key={i}
              className="bg-[rgba(88,204,2,0.1)] border-2 border-[var(--duo-green)] rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--duo-green)] text-white flex items-center justify-center font-black text-sm shrink-0">
                {i + 1}
              </div>
              <p className="text-sm font-bold text-[var(--duo-green)] leading-relaxed">
                {wrapGlossaryTerms(isDE ? item.de : item.en, lang)}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }

  // ===== Tips slide =====
  if (slide.kind === 'tips') {
    return (
      <>
        <TypeIndicator
          icon={Lightbulb}
          label={t('Interview Tip', 'Interview-Tipp')}
          color="var(--duo-orange)"
        />
        <h2 className="text-xl font-black leading-snug">
          {t('Pro tips for the interview', 'Profi-Tipps fürs Interview')}
        </h2>
        <div className="space-y-3">
          {slide.items.map((item, i) => (
            <div
              key={i}
              className="bg-[rgba(255,150,0,0.1)] border-2 border-[var(--duo-orange)] rounded-xl p-4 flex items-start gap-3"
            >
              <Lightbulb
                size={18}
                className="text-[var(--duo-orange)] mt-0.5 shrink-0"
              />
              <p className="text-sm text-gray-200 leading-relaxed">
                {wrapGlossaryTerms(isDE ? item.de : item.en, lang)}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }

  return null;
}
