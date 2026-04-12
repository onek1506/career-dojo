'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { getCaseById } from '@/data/cases';
import { getCharacterForTrack, getRandomEncouragement } from '@/data/characters';
import { playClickSound, playRevealSound, playCompleteSound } from '@/lib/sounds';
import { ArrowLeft, ChevronRight, Lightbulb, Eye, EyeOff, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { progress, t, completeCase } = useStore();
  const caseId = params.id as string;
  const cs = getCaseById(caseId);

  const [phase, setPhase] = useState<'briefing' | 'steps' | 'results'>('briefing');
  const [stepIdx, setStepIdx] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const character = getCharacterForTrack(progress.selectedTrack || 'ib');
  const isDE = progress.language === 'de';

  if (!cs) {
    return (
      <div className="min-h-screen bg-[var(--duo-bg)] flex items-center justify-center">
        <p className="text-[var(--duo-text-muted)]">Case not found</p>
      </div>
    );
  }

  const step = cs.steps[stepIdx];
  const progressPct = phase === 'briefing' ? 0 : phase === 'results' ? 100 : ((stepIdx + (showAnswer ? 1 : 0.5)) / cs.steps.length) * 100;

  const nextStep = () => {
    playClickSound();
    setShowHints(false);
    setShowAnswer(false);
    if (stepIdx < cs.steps.length - 1) {
      setStepIdx(s => s + 1);
    } else {
      completeCase(caseId, cs.xpReward);
      playCompleteSound();
      setPhase('results');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--duo-bg)] flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[var(--duo-card)] border-b-2 border-[var(--duo-border)] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => router.back()} className="text-[var(--duo-text-muted)] hover:text-white">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 progress-bar-track h-2.5">
            <div className="progress-bar-fill h-full bg-[var(--duo-orange)] transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs text-[var(--duo-text-muted)] font-bold">{Math.round(progressPct)}%</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* BRIEFING */}
        {phase === 'briefing' && (
          <div className="space-y-5">
            <div className="text-center">
              <span className="text-5xl block mb-3">{cs.clientLogo}</span>
              <h1 className="text-xl font-black">{isDE ? cs.titleDe : cs.title}</h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(255,150,0,0.15)] text-[var(--duo-orange)] font-bold uppercase">{isDE ? cs.typeDe : cs.type.replace('_', ' ')}</span>
                <span className="text-xs text-[var(--duo-text-muted)]">{cs.estimatedMinutes} min</span>
              </div>
            </div>

            {/* Character intro */}
            <div className="flex items-start gap-3 duo-card p-4">
              <span className="text-2xl">{character.emoji}</span>
              <div className="text-sm">
                <span className="font-bold" style={{ color: character.color }}>{character.name}:</span>
                <span className="text-gray-300 ml-1">
                  {isDE
                    ? '"Lass uns diesen Case gemeinsam durchgehen. Denk laut nach — wie im echten Interview!"'
                    : '"Let\'s work through this case together. Think out loud — like in a real interview!"'}
                </span>
              </div>
            </div>

            {/* Briefing */}
            <div className="duo-card p-5">
              <div className="text-xs text-[var(--duo-orange)] font-bold uppercase mb-2">{t('Client Briefing', 'Klienten-Briefing')}</div>
              <p className="text-sm leading-relaxed text-gray-200">{isDE ? cs.briefingDe : cs.briefing}</p>
            </div>

            <div className="text-xs text-[var(--duo-text-muted)] text-center">
              {cs.steps.length} {t('steps', 'Schritte')} · +{cs.xpReward} XP
            </div>

            <button
              onClick={() => { setPhase('steps'); playClickSound(); }}
              className="w-full py-4 rounded-xl bg-[var(--duo-orange)] hover:opacity-90 text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              {t('Start Case', 'Case starten')} <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* STEPS */}
        {phase === 'steps' && step && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs text-[var(--duo-text-muted)]">
              <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                step.type === 'structure' ? 'bg-[rgba(28,176,246,0.15)] text-[var(--duo-blue)]' :
                step.type === 'math' ? 'bg-[rgba(206,130,255,0.15)] text-[var(--duo-purple)]' :
                step.type === 'analysis' ? 'bg-[rgba(255,200,0,0.15)] text-[var(--duo-yellow)]' :
                'bg-[rgba(88,204,2,0.15)] text-[var(--duo-green)]'
              }`}>
                {step.type}
              </span>
              <span>{t('Step', 'Schritt')} {stepIdx + 1}/{cs.steps.length}</span>
            </div>

            <h2 className="text-lg font-black">{isDE ? step.titleDe : step.title}</h2>

            <div className="duo-card p-5">
              <p className="text-sm leading-relaxed text-gray-200">{isDE ? step.promptDe : step.prompt}</p>
            </div>

            {/* Think area prompt */}
            {!showHints && !showAnswer && (
              <div className="text-center py-4">
                <div className="flex items-start gap-3 duo-card p-3 text-left mb-4">
                  <span className="text-xl">{character.emoji}</span>
                  <p className="text-xs italic text-gray-300">
                    {isDE
                      ? '"Nimm dir 2-3 Minuten und strukturiere deine Gedanken. Wie im echten Interview: erst denken, dann reden!"'
                      : '"Take 2-3 minutes to structure your thoughts. Like in a real interview: think first, then speak!"'}
                  </p>
                </div>
                <p className="text-xs text-[var(--duo-text-muted)] mb-3">{t('Think about your approach, then check hints or the sample answer', 'Überlege deinen Ansatz, dann check die Hinweise oder Musterantwort')}</p>
              </div>
            )}

            {/* Hints Button */}
            {!showHints ? (
              <button
                onClick={() => { setShowHints(true); playRevealSound(); }}
                className="w-full py-3 rounded-xl border-2 border-dashed border-[var(--duo-yellow)] text-[var(--duo-yellow)] font-bold text-sm btn-press transition flex items-center justify-center gap-2 hover:bg-[rgba(255,200,0,0.05)]"
              >
                <Lightbulb size={16} /> {t('Show Hints', 'Hinweise anzeigen')} ({step.hints.length})
              </button>
            ) : (
              <div className="bg-[rgba(255,200,0,0.08)] border-2 border-[var(--duo-yellow)] rounded-xl p-4 space-y-2">
                <div className="text-xs text-[var(--duo-yellow)] font-bold uppercase flex items-center gap-1"><Lightbulb size={12} /> {t('Hints', 'Hinweise')}</div>
                {step.hints.map((h, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-300">
                    <span className="text-[var(--duo-yellow)] shrink-0">•</span>
                    <span>{isDE ? h.de : h.en}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Sample Answer */}
            {!showAnswer ? (
              <button
                onClick={() => { setShowAnswer(true); playRevealSound(); }}
                className="w-full py-3 rounded-xl border-2 border-dashed border-[var(--duo-green)] text-[var(--duo-green)] font-bold text-sm btn-press transition flex items-center justify-center gap-2 hover:bg-[rgba(88,204,2,0.05)]"
              >
                <Eye size={16} /> {t('Show Sample Answer', 'Musterantwort anzeigen')}
              </button>
            ) : (
              <div className="bg-[rgba(88,204,2,0.08)] border-2 border-[var(--duo-green)] rounded-xl p-4">
                <div className="text-xs text-[var(--duo-green)] font-bold uppercase mb-2 flex items-center gap-1"><CheckCircle size={12} /> {t('Sample Answer', 'Musterantwort')}</div>
                <div className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">{isDE ? step.sampleAnswerDe : step.sampleAnswer}</div>
              </div>
            )}

            {showAnswer && (
              <button
                onClick={nextStep}
                className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              >
                {stepIdx < cs.steps.length - 1 ? t('Next Step', 'Nächster Schritt') : t('Finish Case', 'Case abschließen')}
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}

        {/* RESULTS */}
        {phase === 'results' && (
          <div className="space-y-6 text-center">
            <div className="text-6xl">🏆</div>
            <h2 className="text-2xl font-black">{t('Case Completed!', 'Case abgeschlossen!')}</h2>

            <div className="flex items-start gap-3 duo-card p-4 text-left">
              <span className="text-2xl">{character.emoji}</span>
              <p className="text-sm italic">{getRandomEncouragement(character, progress.language)}</p>
            </div>

            <div className="duo-card p-5">
              <div className="flex justify-between mb-3">
                <span className="text-[var(--duo-text-muted)]">{t('XP Earned', 'XP verdient')}</span>
                <span className="font-black text-[var(--duo-yellow)]"><Zap size={16} className="inline" fill="var(--duo-yellow)" /> {cs.xpReward}</span>
              </div>
              <div className="text-xs text-[var(--duo-green)] font-bold uppercase mb-2">{t('Key Takeaways', 'Kernerkenntnisse')}</div>
              {cs.keyTakeaways.map((kt, i) => (
                <div key={i} className="flex gap-2 text-sm text-gray-300 mb-1">
                  <span className="text-[var(--duo-green)] shrink-0">✓</span>
                  <span>{isDE ? kt.de : kt.en}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setPhase('briefing'); setStepIdx(0); setShowHints(false); setShowAnswer(false); }} className="flex-1 py-3 rounded-xl border-2 border-[var(--duo-border)] text-white font-bold btn-press transition">
                {t('Redo', 'Wiederholen')}
              </button>
              <Link href="/cases" className="flex-1">
                <button className="w-full py-3 rounded-xl bg-[var(--duo-green)] text-white font-bold btn-press transition">{t('More Cases', 'Weitere Cases')}</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
