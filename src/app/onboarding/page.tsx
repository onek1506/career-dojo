'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { TRACKS } from '@/data/tracks';
import { getCharacterForTrack, getGlobalCharacter, getRandomQuote } from '@/data/characters';
import { playClickSound, playLevelUpSound } from '@/lib/sounds';
import { ChevronRight, Zap, BookOpen, Brain, Globe, Volume2, VolumeX, Bell, BellOff } from 'lucide-react';

type Step = 'welcome' | 'track' | 'language' | 'level' | 'goal' | 'ready';

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('welcome');
  const { update } = useStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [track, setTrack] = useState('ib');
  const [lang, setLang] = useState<'de' | 'en'>('de');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
  const [goal, setGoal] = useState(3);
  const [soundOn, setSoundOn] = useState(true);
  const [notifStatus, setNotifStatus] = useState<'idle' | 'granted' | 'denied' | 'unsupported'>('idle');

  const requestNotifications = async () => {
    playClickSound();
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotifStatus('unsupported');
      return;
    }
    try {
      const result = await Notification.requestPermission();
      if (result === 'granted') {
        setNotifStatus('granted');
        try {
          localStorage.setItem('notifications-enabled', 'true');
        } catch {
          // ignore storage failures
        }
      } else {
        setNotifStatus('denied');
      }
    } catch {
      setNotifStatus('denied');
    }
  };

  const carl = getGlobalCharacter();

  const goNext = (nextStep: Step) => {
    playClickSound();
    setStep(nextStep);
  };

  const finish = () => {
    playLevelUpSound();
    update({
      username: name || 'Analyst',
      language: lang,
      selectedLevel: level,
      selectedTrack: track,
      dailyGoal: goal,
      onboardingComplete: true,
      soundEnabled: soundOn,
      xp: level === 'intermediate' ? 100 : level === 'advanced' ? 750 : 0,
    });
    router.push('/');
  };

  const selectedTrackInfo = TRACKS.find(t => t.id === track);

  return (
    <div className="min-h-screen bg-[var(--duo-bg)] flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">

        {/* WELCOME */}
        {step === 'welcome' && (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--duo-green)] to-[var(--duo-blue)] flex items-center justify-center text-5xl font-black text-white mx-auto shadow-lg shadow-[var(--duo-green)]/20">
              CD
            </div>
            <div>
              <h1 className="text-3xl font-black mb-2">CareerDojo</h1>
              <p className="text-[var(--duo-text-muted)] text-lg">
                Meistere dein Finance-Interview
              </p>
            </div>

            {/* Carl greeting */}
            <div className="duo-card p-4 flex items-start gap-3 text-left">
              <span className="text-3xl">{carl.emoji}</span>
              <div>
                <div className="text-xs text-[var(--duo-orange)] font-bold">{carl.name}</div>
                <p className="text-sm mt-1">{getRandomQuote(carl, lang)}</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              {[
                { icon: '🏦', text: 'IB, PE, VC & Consulting — wähle deinen Track' },
                { icon: '🐺', text: 'Lustige Charaktere begleiten dich beim Lernen' },
                { icon: '🔥', text: 'Tägliche Streaks, XP & Level wie bei Duolingo' },
                { icon: '📋', text: 'Echte Case Studies wie bei PrepLounge' },
              ].map((item, i) => (
                <div key={i} className="duo-card p-3 sm:p-4 flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <span className="text-xs sm:text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Dein Vorname"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--duo-card)] border-2 border-[var(--duo-border)] text-white placeholder-[var(--duo-text-muted)] focus:border-[var(--duo-green)] focus:outline-none transition"
              />
              <button
                onClick={() => goNext('track')}
                className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              >
                Los geht&apos;s <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* TRACK SELECTION — Duolingo-style */}
        {step === 'track' && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-black">Was willst du meistern?</h2>
              <p className="text-[var(--duo-text-muted)] text-sm mt-1">
                Du kannst jederzeit wechseln — wie bei Duolingo
              </p>
            </div>
            <div className="space-y-3">
              {TRACKS.map(t => {
                const char = getCharacterForTrack(t.id);
                const isSelected = track === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setTrack(t.id); playClickSound(); }}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-transparent shadow-lg'
                        : 'border-[var(--duo-border)] bg-[var(--duo-card)] hover:border-[var(--duo-blue)]'
                    }`}
                    style={isSelected ? { borderColor: t.color, background: `${t.color}15` } : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                        style={{ background: `${t.color}25` }}
                      >
                        {t.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm">{lang === 'de' ? t.titleDe : t.title}</span>
                          {t.comingSoon && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--duo-orange)] text-white font-bold uppercase">Soon</span>
                          )}
                        </div>
                        <div className="text-xs text-[var(--duo-text-muted)] mt-0.5">{lang === 'de' ? t.subtitleDe : t.subtitle}</div>
                        <div className="text-xs mt-1 flex items-center gap-1" style={{ color: t.color }}>
                          <span>{char.emoji}</span>
                          <span className="font-bold">{char.name}</span>
                        </div>
                      </div>
                      {isSelected && <span className="text-2xl" style={{ color: t.color }}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Character preview */}
            {selectedTrackInfo && (
              <div className="duo-card p-4 flex items-start gap-3">
                <span className="text-3xl">{getCharacterForTrack(track).emoji}</span>
                <div>
                  <div className="text-xs font-bold" style={{ color: selectedTrackInfo.color }}>
                    {getCharacterForTrack(track).name}
                  </div>
                  <p className="text-xs text-[var(--duo-text-muted)] mt-1">
                    {lang === 'de'
                      ? getCharacterForTrack(track).personalityDe
                      : getCharacterForTrack(track).personality}
                  </p>
                  <p className="text-xs mt-1 italic">
                    {getRandomQuote(getCharacterForTrack(track), lang)}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => goNext('language')}
              className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* LANGUAGE */}
        {step === 'language' && (
          <div className="space-y-6">
            <div className="text-center">
              <Globe size={40} className="text-[var(--duo-blue)] mx-auto mb-3" />
              <h2 className="text-2xl font-black">Sprache / Language</h2>
            </div>
            <div className="space-y-3">
              {([['de', '🇩🇪', 'Deutsch', 'Lektionen auf Deutsch mit englischen Fachbegriffen'], ['en', '🇬🇧', 'English', 'Lessons in English with German translations']] as const).map(([code, flag, label, desc]) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); playClickSound(); }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition flex items-center gap-4 ${
                    lang === code
                      ? 'border-[var(--duo-green)] bg-[rgba(88,204,2,0.1)]'
                      : 'border-[var(--duo-border)] bg-[var(--duo-card)] hover:border-[var(--duo-blue)]'
                  }`}
                >
                  <span className="text-3xl">{flag}</span>
                  <div>
                    <div className="font-bold">{label}</div>
                    <div className="text-xs text-[var(--duo-text-muted)]">{desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Sound toggle */}
            <div className="duo-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundOn ? <Volume2 size={20} className="text-[var(--duo-green)]" /> : <VolumeX size={20} className="text-[var(--duo-text-muted)]" />}
                <div>
                  <div className="font-bold text-sm">Sound Effects</div>
                  <div className="text-xs text-[var(--duo-text-muted)]">Ka-Ching, Level-Up & mehr</div>
                </div>
              </div>
              <button
                onClick={() => setSoundOn(!soundOn)}
                className={`w-12 h-7 rounded-full transition-all ${soundOn ? 'bg-[var(--duo-green)]' : 'bg-[var(--duo-border)]'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${soundOn ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <button
              onClick={() => goNext('level')}
              className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* LEVEL SELECTION */}
        {step === 'level' && (
          <div className="space-y-6">
            <div className="text-center">
              <Brain size={40} className="text-[var(--duo-purple)] mx-auto mb-3" />
              <h2 className="text-2xl font-black">
                {lang === 'de' ? 'Wie fit bist du?' : 'What\'s your level?'}
              </h2>
            </div>
            <div className="space-y-3">
              {([
                ['beginner', '🌱', lang === 'de' ? 'Anfänger' : 'Beginner', lang === 'de' ? 'Ich starte bei Null' : 'Starting from scratch', '#58CC02'],
                ['intermediate', '📈', lang === 'de' ? 'Fortgeschritten' : 'Intermediate', lang === 'de' ? 'Ich kenne die Grundlagen' : 'I know the basics', '#1CB0F6'],
                ['advanced', '🚀', lang === 'de' ? 'Profi' : 'Advanced', lang === 'de' ? 'Ich kann DCF & LBO erklären' : 'I can explain DCF & LBO', '#CE82FF'],
              ] as const).map(([value, icon, label, desc, color]) => (
                <button
                  key={value}
                  onClick={() => { setLevel(value); playClickSound(); }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition ${
                    level === value ? 'bg-[rgba(88,204,2,0.08)]' : 'border-[var(--duo-border)] bg-[var(--duo-card)] hover:border-[var(--duo-blue)]'
                  }`}
                  style={{ borderColor: level === value ? color : undefined }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-bold">{label}</div>
                      <div className="text-xs text-[var(--duo-text-muted)]">{desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => level && goNext('goal')}
              disabled={!level}
              className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* DAILY GOAL */}
        {step === 'goal' && (
          <div className="space-y-6">
            <div className="text-center">
              <Zap size={40} className="text-[var(--duo-yellow)] mx-auto mb-3" />
              <h2 className="text-2xl font-black">
                {lang === 'de' ? 'Tägliches Ziel' : 'Daily Goal'}
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { n: 1, label: lang === 'de' ? 'Entspannt' : 'Casual', desc: '5 min', icon: '🐢' },
                { n: 3, label: lang === 'de' ? 'Normal' : 'Regular', desc: '10 min', icon: '👍' },
                { n: 5, label: lang === 'de' ? 'Ambitioniert' : 'Serious', desc: '15 min', icon: '🔥' },
                { n: 10, label: lang === 'de' ? 'Hardcore' : 'Intense', desc: '30 min', icon: '💀' },
              ].map(item => (
                <button
                  key={item.n}
                  onClick={() => { setGoal(item.n); playClickSound(); }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition flex items-center gap-4 ${
                    goal === item.n
                      ? 'border-[var(--duo-green)] bg-[rgba(88,204,2,0.1)]'
                      : 'border-[var(--duo-border)] bg-[var(--duo-card)] hover:border-[var(--duo-blue)]'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold">{item.label}</div>
                    <div className="text-xs text-[var(--duo-text-muted)]">{item.n} {lang === 'de' ? 'Lektionen' : 'lessons'} · {item.desc}/{lang === 'de' ? 'Tag' : 'day'}</div>
                  </div>
                  {goal === item.n && <span className="text-[var(--duo-green)] text-lg">✓</span>}
                </button>
              ))}
            </div>
            <button
              onClick={() => goNext('ready')}
              className="w-full py-4 rounded-xl bg-[var(--duo-green)] hover:bg-[var(--duo-green-dark)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2"
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* READY */}
        {step === 'ready' && (
          <div className="text-center space-y-6">
            <div className="text-6xl">{getCharacterForTrack(track).emoji}</div>
            <h2 className="text-2xl font-black">
              {lang === 'de' ? `Bereit, ${name || 'Analyst'}!` : `Ready, ${name || 'Analyst'}!`}
            </h2>

            <div className="duo-card p-4 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[var(--duo-text-muted)]">Track</span><span className="font-bold">{selectedTrackInfo?.icon} {selectedTrackInfo?.title}</span></div>
              <div className="flex justify-between"><span className="text-[var(--duo-text-muted)]">Level</span><span className="font-bold capitalize">{level}</span></div>
              <div className="flex justify-between"><span className="text-[var(--duo-text-muted)]">{lang === 'de' ? 'Sprache' : 'Language'}</span><span className="font-bold">{lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}</span></div>
              <div className="flex justify-between"><span className="text-[var(--duo-text-muted)]">{lang === 'de' ? 'Tagesziel' : 'Daily Goal'}</span><span className="font-bold">{goal}/{lang === 'de' ? 'Tag' : 'day'}</span></div>
            </div>

            {/* Character message */}
            <div className="duo-card p-4 flex items-start gap-3 text-left">
              <span className="text-2xl">{getCharacterForTrack(track).emoji}</span>
              <div className="text-sm italic">
                {getRandomQuote(getCharacterForTrack(track), lang)}
              </div>
            </div>

            {/* Notification permission */}
            <button
              onClick={requestNotifications}
              disabled={notifStatus === 'granted' || notifStatus === 'unsupported'}
              className={`w-full p-4 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                notifStatus === 'granted'
                  ? 'border-[var(--duo-green)] bg-[rgba(88,204,2,0.1)]'
                  : notifStatus === 'denied'
                    ? 'border-[var(--duo-orange)] bg-[rgba(255,150,0,0.08)]'
                    : 'border-[var(--duo-border)] bg-[var(--duo-card)] hover:border-[var(--duo-blue)]'
              }`}
            >
              {notifStatus === 'granted' ? (
                <Bell size={20} className="text-[var(--duo-green)] shrink-0" />
              ) : notifStatus === 'denied' || notifStatus === 'unsupported' ? (
                <BellOff size={20} className="text-[var(--duo-orange)] shrink-0" />
              ) : (
                <Bell size={20} className="text-[var(--duo-blue)] shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">
                  {notifStatus === 'granted'
                    ? lang === 'de' ? 'Erinnerungen aktiv ✓' : 'Reminders enabled ✓'
                    : notifStatus === 'denied'
                      ? lang === 'de' ? 'Erinnerungen blockiert' : 'Reminders blocked'
                      : notifStatus === 'unsupported'
                        ? lang === 'de' ? 'Nicht unterstützt' : 'Not supported'
                        : lang === 'de' ? 'Streak-Erinnerungen aktivieren' : 'Enable streak reminders'}
                </div>
                <div className="text-[11px] text-[var(--duo-text-muted)] mt-0.5">
                  {lang === 'de'
                    ? 'Ich erinnere dich, wenn dein Streak in Gefahr ist.'
                    : "I'll ping you when your streak is on the line."}
                </div>
              </div>
            </button>

            <button
              onClick={finish}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--duo-green)] to-[var(--duo-blue)] text-white font-bold text-lg btn-press transition flex items-center justify-center gap-2 shadow-lg"
            >
              <BookOpen size={20} />
              {lang === 'de' ? 'Training starten!' : 'Start Training!'}
            </button>
          </div>
        )}

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {(['welcome', 'track', 'language', 'level', 'goal', 'ready'] as Step[]).map(s => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                s === step ? 'w-6 bg-[var(--duo-green)]' : 'bg-[var(--duo-border)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
