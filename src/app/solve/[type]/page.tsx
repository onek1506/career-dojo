'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getOnlineTest, OnlineTestExercise } from '@/data/online-tests';
import { getCharacterForTrack, getRandomEncouragement, getRandomWrongReaction } from '@/data/characters';
import { playClickSound, playRevealSound, playCorrectSound, playWrongSound, playCompleteSound } from '@/lib/sounds';
import { ArrowLeft, ChevronRight, Eye, Zap, CheckCircle, Clock, Target, AlertCircle, RotateCcw } from 'lucide-react';
import Markdown from '@/components/Markdown';

type Phase = 'briefing' | 'exercise' | 'results';

export default function SolveDetailPage() {
  const params = useParams<{ type: string }>();
  const router = useRouter();
  const { progress, t, update, recordQuizAnswer } = useStore();
  const type = params?.type as string;
  const test = getOnlineTest(type);

  const [phase, setPhase] = useState<Phase>('briefing');
  const [exIdx, setExIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const character = getCharacterForTrack('consulting');
  const isDE = progress.language === 'de';

  const exercise: OnlineTestExercise | undefined = test?.exercises[exIdx];

  // Timer effect — runs when exercise phase starts
  useEffect(() => {
    if (phase !== 'exercise' || !exercise) return;
    if (showAnswer) return; // stop timer once answer revealed
    if (secondsLeft <= 0) {
      setTimeUp(true);
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, exercise, secondsLeft, showAnswer]);

  // Start timer when entering new exercise
  useEffect(() => {
    if (phase !== 'exercise' || !exercise) return;
    setSecondsLeft(exercise.timeSeconds);
    setTimeUp(false);
    setSelectedOption(null);
    setShowAnswer(false);
  }, [exIdx, phase, exercise]);

  const startTest = () => {
    playClickSound();
    setExIdx(0);
    setEarnedXp(0);
    setCorrectCount(0);
    setPhase('exercise');
  };

  const revealAnswer = useCallback(() => {
    if (!exercise) return;
    playRevealSound();
    setShowAnswer(true);
    // Only award XP the first time on this exercise
    const isCorrect =
      exercise.kind === 'multiple_choice'
        ? selectedOption !== null && selectedOption === exercise.correctAnswer
        : true; // free text = self-evaluated, always award on reveal
    if (isCorrect && !timeUp) {
      playCorrectSound();
      setEarnedXp((xp) => xp + exercise.xpReward);
      setCorrectCount((c) => c + 1);
      update({ xp: progress.xp + exercise.xpReward });
      recordQuizAnswer(true);
    } else if (exercise.kind === 'multiple_choice' && selectedOption !== null && !timeUp) {
      playWrongSound();
      recordQuizAnswer(false);
    }
  }, [exercise, selectedOption, timeUp, update, progress.xp, recordQuizAnswer]);

  const nextExercise = () => {
    if (!test) return;
    playClickSound();
    if (exIdx < test.exercises.length - 1) {
      setExIdx((i) => i + 1);
    } else {
      playCompleteSound();
      setPhase('results');
    }
  };

  const restart = () => {
    playClickSound();
    setPhase('briefing');
    setExIdx(0);
    setEarnedXp(0);
    setCorrectCount(0);
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-[var(--duo-bg)] flex items-center justify-center flex-col gap-3">
        <p className="text-[var(--duo-text-muted)]">{t('Test not found', 'Test nicht gefunden')}</p>
        <Link href="/solve" className="text-[var(--accent-info)] text-sm underline">
          {t('Back to Online Tests', 'Zurück zu Online Tests')}
        </Link>
      </div>
    );
  }

  const progressPct =
    phase === 'briefing'
      ? 0
      : phase === 'results'
        ? 100
        : ((exIdx + (showAnswer ? 1 : 0.5)) / test.exercises.length) * 100;

  const isMC = exercise?.kind === 'multiple_choice';
  const selectedIsCorrect =
    isMC && exercise && selectedOption !== null && selectedOption === exercise.correctAnswer;

  return (
    <div className="min-h-screen bg-[var(--duo-bg)] flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[var(--duo-card)] border-b-2 border-[var(--duo-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-[var(--duo-text-muted)] hover:text-white"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 progress-bar-track h-2.5">
            <div
              className="progress-bar-fill h-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: test.color }}
            />
          </div>
          {phase === 'exercise' && !showAnswer && (
            <span
              className={`text-xs font-black tabular-nums ${
                secondsLeft <= 10 ? 'text-[var(--duo-red)]' : 'text-[var(--duo-text-muted)]'
              }`}
            >
              <Clock size={12} className="inline mr-1" />
              {secondsLeft}s
            </span>
          )}
          {phase !== 'exercise' && (
            <span className="text-xs text-[var(--duo-text-muted)] font-bold">
              {Math.round(progressPct)}%
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* ==================== BRIEFING ==================== */}
        {phase === 'briefing' && (
          <div className="space-y-5">
            <div className="text-center">
              <span className="text-5xl block mb-3">{test.firmEmoji}</span>
              <h1 className="text-xl font-black">{isDE ? test.titleDe : test.title}</h1>
              <p className="text-sm text-[var(--duo-text-muted)] mt-1">
                {isDE ? test.subtitleDe : test.subtitle}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                  style={{ background: test.accent, color: test.color }}
                >
                  {test.firm}
                </span>
              </div>
            </div>

            {/* Character intro */}
            <div className="flex items-start gap-3 duo-card p-4">
              <span className="text-2xl">{character.emoji}</span>
              <div className="text-sm">
                <span className="font-bold" style={{ color: character.color }}>
                  {character.name}:
                </span>
                <span className="text-[var(--text-secondary)] ml-1 italic">
                  {isDE
                    ? '"Timer läuft, Jungs und Mädels! Keine Panik — erst lesen, dann denken, dann klicken."'
                    : '"Timer is running, folks! Don\'t panic — read first, think, then click."'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="duo-card p-5">
              <div
                className="text-xs font-bold uppercase mb-2"
                style={{ color: test.color }}
              >
                {t('About this test', 'Über diesen Test')}
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                {isDE ? test.descriptionDe : test.description}
              </p>
            </div>

            {/* What is tested */}
            <div className="duo-card p-5">
              <div
                className="text-xs font-bold uppercase mb-3 flex items-center gap-1"
                style={{ color: test.color }}
              >
                <Target size={12} /> {t('What is evaluated', 'Was bewertet wird')}
              </div>
              <ul className="space-y-2">
                {(isDE ? test.whatIsTestedDe : test.whatIsTested).map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="shrink-0" style={{ color: test.color }}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="duo-card p-3">
                <div className="text-xs text-[var(--duo-text-muted)] uppercase mb-1">
                  {t('Questions', 'Fragen')}
                </div>
                <div className="text-lg font-black">{test.exercises.length}</div>
              </div>
              <div className="duo-card p-3">
                <div className="text-xs text-[var(--duo-text-muted)] uppercase mb-1">
                  {t('Time', 'Zeit')}
                </div>
                <div className="text-lg font-black">
                  {Math.round(test.exercises.reduce((s, e) => s + e.timeSeconds, 0) / 60)}m
                </div>
              </div>
              <div className="duo-card p-3">
                <div className="text-xs text-[var(--duo-text-muted)] uppercase mb-1">
                  XP
                </div>
                <div className="text-lg font-black text-[var(--duo-yellow)]">
                  {test.exercises.reduce((s, e) => s + e.xpReward, 0)}
                </div>
              </div>
            </div>

            <button
              onClick={startTest}
              className="w-full py-4 rounded-xl text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              style={{ background: test.color }}
            >
              {t('Start Practice', 'Übung starten')} <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* ==================== EXERCISE ==================== */}
        {phase === 'exercise' && exercise && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs text-[var(--duo-text-muted)]">
              <span
                className="px-2 py-0.5 rounded-full font-bold uppercase"
                style={{ background: test.accent, color: test.color }}
              >
                {exercise.kind === 'multiple_choice'
                  ? t('Multiple Choice', 'Multiple Choice')
                  : t('Open Answer', 'Freitext')}
              </span>
              <span>
                {t('Question', 'Frage')} {exIdx + 1}/{test.exercises.length}
              </span>
              <span className="ml-auto flex items-center gap-1">
                <Zap size={11} fill="currentColor" className="text-[var(--duo-yellow)]" />
                +{exercise.xpReward}
              </span>
            </div>

            <h2 className="text-lg font-black leading-tight">
              {isDE ? exercise.titleDe : exercise.title}
            </h2>

            {/* Context (optional) */}
            {exercise.context && (
              <div className="bg-[rgba(28,176,246,0.06)] border border-[var(--accent-info)] rounded-xl p-4">
                <div className="text-[10px] font-bold uppercase text-[var(--accent-info)] mb-1">
                  {t('Context', 'Kontext')}
                </div>
                <Markdown className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isDE ? exercise.contextDe : exercise.context}
                </Markdown>
              </div>
            )}

            {/* Prompt */}
            <div className="duo-card p-5">
              <Markdown className="text-sm leading-relaxed text-[var(--text-primary)]">
                {isDE ? exercise.promptDe : exercise.prompt}
              </Markdown>
            </div>

            {/* Time-up warning */}
            {timeUp && !showAnswer && (
              <div className="flex items-center gap-2 bg-[rgba(255,75,75,0.08)] border-2 border-[var(--duo-red)] rounded-xl p-3">
                <AlertCircle size={16} className="text-[var(--duo-red)] shrink-0" />
                <p className="text-xs text-[var(--text-secondary)]">
                  {t(
                    'Time up! In the real test, you would move on. Reveal the answer to learn.',
                    'Zeit abgelaufen! Im echten Test müsstest du weitermachen. Antwort aufdecken zum Lernen.',
                  )}
                </p>
              </div>
            )}

            {/* Multiple choice options */}
            {isMC && exercise.options && (
              <div className="space-y-2">
                {exercise.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = showAnswer && i === exercise.correctAnswer;
                  const isWrong = showAnswer && isSelected && i !== exercise.correctAnswer;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (showAnswer) return;
                        playClickSound();
                        setSelectedOption(i);
                      }}
                      disabled={showAnswer}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm leading-relaxed ${
                        isCorrect
                          ? 'border-[var(--accent-xp)] bg-[rgba(88,204,2,0.12)] text-white'
                          : isWrong
                            ? 'border-[var(--duo-red)] bg-[rgba(255,75,75,0.12)] text-white'
                            : isSelected
                              ? 'border-[var(--accent-info)] bg-[rgba(28,176,246,0.08)] text-white'
                              : 'border-[var(--duo-border)] text-[var(--text-primary)] hover:border-[var(--accent-info)]'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                      {isDE ? opt.textDe : opt.text}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Free text: self-rated reveal */}
            {!isMC && !showAnswer && (
              <div className="text-center py-2">
                <div className="flex items-start gap-3 duo-card p-3 text-left mb-4">
                  <span className="text-xl">{character.emoji}</span>
                  <p className="text-xs italic text-[var(--text-secondary)]">
                    {isDE
                      ? '"Schreib deine Antwort erst selbst auf (auf Papier oder im Kopf), DANN Musterlösung aufdecken. Kein Spicken!"'
                      : '"Write your answer first (on paper or mentally), THEN reveal the sample. No cheating!"'}
                  </p>
                </div>
              </div>
            )}

            {/* Reveal / Submit button */}
            {!showAnswer && (
              <button
                onClick={revealAnswer}
                disabled={isMC && selectedOption === null && !timeUp}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2 ${
                  isMC && selectedOption === null && !timeUp
                    ? 'bg-[var(--duo-border)] cursor-not-allowed opacity-60'
                    : ''
                }`}
                style={
                  !(isMC && selectedOption === null && !timeUp)
                    ? { background: test.color }
                    : undefined
                }
              >
                <Eye size={16} />
                {isMC
                  ? t('Check Answer', 'Antwort prüfen')
                  : t('Reveal Sample Answer', 'Musterlösung aufdecken')}
              </button>
            )}

            {/* Answer reveal */}
            {showAnswer && (
              <>
                {/* Correct/Wrong banner for MC */}
                {isMC && (
                  <div
                    className={`flex items-start gap-3 rounded-xl p-4 border-2 ${
                      selectedIsCorrect && !timeUp
                        ? 'bg-[rgba(88,204,2,0.08)] border-[var(--accent-xp)]'
                        : 'bg-[rgba(255,75,75,0.08)] border-[var(--duo-red)]'
                    }`}
                  >
                    <span className="text-xl shrink-0">{character.emoji}</span>
                    <p className="text-sm italic text-[var(--text-primary)]">
                      {selectedIsCorrect && !timeUp
                        ? getRandomEncouragement(character, progress.language)
                        : getRandomWrongReaction(character, progress.language)}
                    </p>
                  </div>
                )}

                {/* Sample Answer */}
                <div className="bg-[rgba(88,204,2,0.08)] border-2 border-[var(--accent-xp)] rounded-xl p-4">
                  <div className="text-xs text-[var(--accent-xp)] font-bold uppercase mb-2 flex items-center gap-1">
                    <CheckCircle size={12} /> {t('Sample Answer', 'Musterlösung')}
                  </div>
                  <Markdown className="text-sm leading-relaxed text-[var(--text-primary)]">
                    {isDE ? exercise.sampleAnswerDe : exercise.sampleAnswer}
                  </Markdown>
                </div>

                {/* Explanation */}
                <div className="bg-[rgba(255,200,0,0.06)] border-2 border-[var(--duo-yellow)] rounded-xl p-4">
                  <div className="text-xs text-[var(--duo-yellow)] font-bold uppercase mb-2">
                    {t('Why this matters', 'Warum das wichtig ist')}
                  </div>
                  <Markdown className="text-sm leading-relaxed text-[var(--text-primary)]">
                    {isDE ? exercise.explanationDe : exercise.explanation}
                  </Markdown>
                </div>

                <button
                  onClick={nextExercise}
                  className="w-full py-4 rounded-xl bg-[var(--accent-xp)] hover:bg-[var(--accent-xp-dark)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
                >
                  {exIdx < test.exercises.length - 1
                    ? t('Next Question', 'Nächste Frage')
                    : t('Finish Test', 'Test abschließen')}
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        )}

        {/* ==================== RESULTS ==================== */}
        {phase === 'results' && (
          <div className="space-y-6 text-center">
            <div className="text-6xl">🏆</div>
            <h2 className="text-2xl font-black">
              {t('Test Completed!', 'Test abgeschlossen!')}
            </h2>
            <p className="text-sm text-[var(--duo-text-muted)]">
              {isDE ? test.titleDe : test.title}
            </p>

            <div className="flex items-start gap-3 duo-card p-4 text-left">
              <span className="text-2xl">{character.emoji}</span>
              <p className="text-sm italic text-[var(--text-primary)]">
                {getRandomEncouragement(character, progress.language)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="duo-card p-4">
                <div className="text-xs text-[var(--duo-text-muted)] uppercase mb-1">
                  {t('Correct', 'Richtig')}
                </div>
                <div className="text-2xl font-black text-[var(--accent-xp)]">
                  {correctCount}/{test.exercises.length}
                </div>
              </div>
              <div className="duo-card p-4">
                <div className="text-xs text-[var(--duo-text-muted)] uppercase mb-1">
                  XP
                </div>
                <div className="text-2xl font-black text-[var(--duo-yellow)]">
                  <Zap size={18} className="inline" fill="currentColor" /> {earnedXp}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex-1 py-3 rounded-xl border-2 border-[var(--duo-border)] text-[var(--text-primary)] font-bold btn-press transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> {t('Redo', 'Wiederholen')}
              </button>
              <Link href="/solve" className="flex-1">
                <button className="w-full py-3 rounded-xl bg-[var(--accent-xp)] text-white font-bold btn-press transition">
                  {t('More Tests', 'Weitere Tests')}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
