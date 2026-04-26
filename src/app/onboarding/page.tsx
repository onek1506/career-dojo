'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { TRACKS } from '@/data/tracks';
import { getCharacterForTrack, getGlobalCharacter, getFirstQuote } from '@/data/characters';
import { playClickSound, playLevelUpSound } from '@/lib/sounds';
import { ChevronRight, Zap, BookOpen, Brain, Globe, Volume2, VolumeX, Bell } from 'lucide-react';

type Step = 'welcome' | 'track' | 'language' | 'level' | 'goal' | 'ready';

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('welcome');
  const { update } = useStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [track, setTrack] = useState('consulting');
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
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">

        {/* WELCOME */}
        {step === 'welcome' && (
          <div className="text-center space-y-6">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-black mx-auto"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
            >
              CD
            </div>
            <div>
              <h1 className="text-3xl font-black mb-2">CareerDojo</h1>
              <p className="text-[var(--text-muted)] text-lg">
                Meistere dein Finance-Interview
              </p>
            </div>

            {/* Carl greeting */}
            <div
              className="p-4 flex items-start gap-3 text-left rounded-xl"
              style={{ border: '0.5px solid var(--border)', background: 'var(--bg-card)' }}
            >
              <span className="text-3xl">{carl.emoji}</span>
              <div>
                <div className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{carl.name}</div>
                <p className="text-base mt-1 text-[var(--text-secondary)]">{getFirstQuote(carl, lang)}</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              {[
                { icon: '🏦', text: 'IB, PE, VC & Consulting — wähle deinen Track' },
                { icon: '🐺', text: 'Lustige Charaktere begleiten dich beim Lernen' },
                { icon: '🔥', text: 'Tägliche Streaks, XP & Level wie bei Duolingo' },
                { icon: '📋', text: 'Echte Case Studies wie bei PrepLounge' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 flex items-center gap-3 rounded-xl"
                  style={{ border: '0.5px solid var(--border)', background: 'var(--bg-card)' }}
                >
                  <span className="text-2xl sm:text-3xl">{item.icon}</span>
                  <span className="text-sm sm:text-base text-[var(--text-primary)]">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Dein Vorname"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                onClick={() => goNext('track')}
                className="w-full py-4 rounded-xl font-bold text-lg btn-press transition flex items-center justify-center gap-2"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg)',
                }}
              >
                Los geht&apos;s <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* TRACK SELECTION */}
        {step === 'track' && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-3xl font-black">Was willst du meistern?</h2>
              <p className="text-[var(--text-muted)] text-base mt-1">
                Weitere Tracks folgen bald
              </p>
            </div>
            <div className="space-y-3">
              {TRACKS.map(t => {
                const char = getCharacterForTrack(t.id);
                const isSelected = track === t.id;
                const isComingSoon = t.id === 'pe' || t.id === 'vc';
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (!isComingSoon) {
                        setTrack(t.id);
                        playClickSound();
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      isComingSoon ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                    style={{
                      borderColor: isSelected ? 'var(--text-primary)' : 'var(--border)',
                      background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-card)',
                    }}
                    disabled={isComingSoon}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                        style={{ background: 'var(--border)' }}
                      >
                        {t.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base">{lang === 'de' ? t.titleDe : t.title}</span>
                          {isComingSoon && (
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase"
                              style={{
                                background: 'var(--text-primary)',
                                color: 'var(--bg)',
                              }}
                            >
                              Soon
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[var(--text-muted)] mt-0.5">{lang === 'de' ? t.subtitleDe : t.subtitle}</div>
                        <div className="text-sm mt-1 flex items-center gap-1 text-[var(--text-secondary)]">
                          <span>{char.emoji}</span>
                          <span className="font-bold">{char.name}</span>
                        </div>
                      </div>
                      {isSelected && <span className="text-2xl">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Character preview */}
            {selectedTrackInfo && (
              <div
                className="p-4 flex items-start gap-3 rounded-xl"
                style={{ border: '0.5px solid var(--border)', background: 'var(--bg-card)' }}
              >
                <span className="text-3xl">{getCharacterForTrack(track).emoji}</span>
                <div>
                  <div className="text-xs font-bold text-[var(--text-muted)]">
                    {getCharacterForTrack(track).name}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {lang === 'de'
                      ? getCharacterForTrack(track).personalityDe
                      : getCharacterForTrack(track).personality}
                  </p>
                  <p className="text-sm mt-1 italic text-[var(--text-secondary)]">
                    {getFirstQuote(getCharacterForTrack(track), lang)}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => goNext('language')}
              className="w-full py-4 rounded-xl font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* LANGUAGE */}
        {step === 'language' && (
          <div className="space-y-6">
            <div className="text-center">
              <Globe size={40} className="text-[var(--text-muted)] mx-auto mb-3" />
              <h2 className="text-3xl font-black">Sprache / Language</h2>
            </div>
            <div className="space-y-3">
              {([['de', '🇩🇪', 'Deutsch', 'Lektionen auf Deutsch mit englischen Fachbegriffen'], ['en', '🇬🇧', 'English', 'Lessons in English with German translations']] as const).map(([code, flag, label, desc]) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); playClickSound(); }}
                  className="w-full p-4 rounded-xl border text-left transition flex items-center gap-4"
                  style={{
                    borderColor: lang === code ? 'var(--text-primary)' : 'var(--border)',
                    background: lang === code ? 'var(--bg-secondary)' : 'var(--bg-card)',
                  }}
                >
                  <span className="text-3xl">{flag}</span>
                  <div>
                    <div className="font-bold text-lg text-[var(--text-primary)]">{label}</div>
                    <div className="text-sm text-[var(--text-muted)]">{desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Sound toggle */}
            <div
              className="p-4 flex items-center justify-between rounded-xl"
              style={{ border: '0.5px solid var(--border)', background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-3">
                {soundOn ? <Volume2 size={20} className="text-[var(--text-primary)]" /> : <VolumeX size={20} className="text-[var(--text-muted)]" />}
                <div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">Sound Effects</div>
                  <div className="text-xs text-[var(--text-muted)]">Ka-Ching, Level-Up & mehr</div>
                </div>
              </div>
              <button
                onClick={() => setSoundOn(!soundOn)}
                className="w-12 h-7 rounded-full transition-all"
                style={{ background: soundOn ? 'var(--text-primary)' : 'var(--border)' }}
              >
                <div
                  className="w-5 h-5 rounded-full transition-transform"
                  style={{
                    background: 'var(--bg)',
                    transform: soundOn ? 'translateX(22px)' : 'translateX(4px)',
                  }}
                />
              </button>
            </div>

            <button
              onClick={() => goNext('level')}
              className="w-full py-4 rounded-xl font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* LEVEL SELECTION */}
        {step === 'level' && (
          <div className="space-y-6">
            <div className="text-center">
              <Brain size={40} className="text-[var(--text-muted)] mx-auto mb-3" />
              <h2 className="text-3xl font-black">
                {lang === 'de' ? 'Wie fit bist du?' : 'What\'s your level?'}
              </h2>
            </div>
            <div className="space-y-3">
              {([
                ['beginner', '🌱', lang === 'de' ? 'Anfänger' : 'Beginner', lang === 'de' ? 'Ich starte bei Null' : 'Starting from scratch'],
                ['intermediate', '📈', lang === 'de' ? 'Fortgeschritten' : 'Intermediate', lang === 'de' ? 'Ich kenne die Grundlagen' : 'I know the basics'],
                ['advanced', '🚀', lang === 'de' ? 'Profi' : 'Advanced', lang === 'de' ? 'Ich kann DCF & LBO erklären' : 'I can explain DCF & LBO'],
              ] as const).map(([value, icon, label, desc]) => (
                <button
                  key={value}
                  onClick={() => { setLevel(value); playClickSound(); }}
                  className="w-full p-4 rounded-xl border text-left transition"
                  style={{
                    borderColor: level === value ? 'var(--text-primary)' : 'var(--border)',
                    background: level === value ? 'var(--bg-secondary)' : 'var(--bg-card)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-bold text-lg text-[var(--text-primary)]">{label}</div>
                      <div className="text-sm text-[var(--text-muted)]">{desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => level && goNext('goal')}
              disabled={!level}
              className="w-full py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* DAILY GOAL */}
        {step === 'goal' && (
          <div className="space-y-6">
            <div className="text-center">
              <Zap size={40} className="text-[var(--text-muted)] mx-auto mb-3" />
              <h2 className="text-3xl font-black">
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
                  className="w-full p-4 rounded-xl border text-left transition flex items-center gap-4"
                  style={{
                    borderColor: goal === item.n ? 'var(--text-primary)' : 'var(--border)',
                    background: goal === item.n ? 'var(--bg-secondary)' : 'var(--bg-card)',
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-lg text-[var(--text-primary)]">{item.label}</div>
                    <div className="text-sm text-[var(--text-muted)]">{item.n} {lang === 'de' ? 'Lektionen' : 'lessons'} · {item.desc}/{lang === 'de' ? 'Tag' : 'day'}</div>
                  </div>
                  {goal === item.n && <span className="text-lg">✓</span>}
                </button>
              ))}
            </div>
            <button
              onClick={() => goNext('ready')}
              className="w-full py-4 rounded-xl font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
            >
              Weiter <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* READY */}
        {step === 'ready' && (
          <div className="text-center space-y-6">
            <div className="text-6xl">{getCharacterForTrack(track).emoji}</div>
            <h2 className="text-3xl font-black">
              {lang === 'de' ? `Bereit, ${name || 'Analyst'}!` : `Ready, ${name || 'Analyst'}!`}
            </h2>

            <div
              className="p-4 text-left space-y-2 text-base rounded-xl"
              style={{ border: '0.5px solid var(--border)', background: 'var(--bg-card)' }}
            >
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">Track</span><span className="font-bold">{selectedTrackInfo?.icon} {selectedTrackInfo?.title}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">Level</span><span className="font-bold capitalize">{level}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">{lang === 'de' ? 'Sprache' : 'Language'}</span><span className="font-bold">{lang === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">{lang === 'de' ? 'Tagesziel' : 'Daily Goal'}</span><span className="font-bold">{goal}/{lang === 'de' ? 'Tag' : 'day'}</span></div>
            </div>

            {/* Character message */}
            <div
              className="p-4 flex items-start gap-3 text-left rounded-xl"
              style={{ border: '0.5px solid var(--border)', background: 'var(--bg-card)' }}
            >
              <span className="text-2xl">{getCharacterForTrack(track).emoji}</span>
              <div className="text-base italic text-[var(--text-secondary)]">
                {getFirstQuote(getCharacterForTrack(track), lang)}
              </div>
            </div>

            {/* Streak Protection — Notification Permission */}
            {notifStatus === 'granted' ? (
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--text-primary)',
                }}
              >
                <div className="flex items-center justify-center gap-2 font-bold text-sm text-[var(--text-primary)]">
                  <Bell size={16} />
                  {lang === 'de' ? 'Erinnerungen aktiviert ✓' : 'Reminders enabled ✓'}
                </div>
              </div>
            ) : notifStatus !== 'unsupported' ? (
              <div
                className="rounded-xl text-center"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  padding: '20px 16px',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>🔥</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {lang === 'de' ? 'Behalte deinen Streak' : 'Keep your streak alive'}
                </div>
                <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, margin: '0 auto 16px' }}>
                  {lang === 'de'
                    ? 'Wir erinnern dich täglich wenn du noch nicht gelernt hast.'
                    : "We'll remind you daily if you haven't studied yet."}
                </div>
                <button
                  onClick={requestNotifications}
                  style={{
                    width: '100%',
                    maxWidth: 300,
                    background: 'var(--text-primary)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '14px 20px',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'block',
                    margin: '0 auto 8px',
                  }}
                >
                  {lang === 'de' ? 'Ja, erinnere mich täglich 🔔' : 'Yes, remind me daily 🔔'}
                </button>
                {notifStatus === 'denied' ? (
                  <p className="text-[10px] text-[var(--text-muted)] text-center mt-2">
                    {lang === 'de'
                      ? 'Benachrichtigungen wurden blockiert. Aktiviere sie in den Browser-Einstellungen.'
                      : 'Notifications were blocked. Enable them in browser settings.'}
                  </p>
                ) : (
                  <button
                    onClick={finish}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: 12,
                      cursor: 'pointer',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  >
                    {lang === 'de' ? 'Lieber nicht' : 'Maybe later'}
                  </button>
                )}
              </div>
            ) : null}

            <button
              onClick={finish}
              className="w-full py-4 rounded-xl font-bold text-lg btn-press transition flex items-center justify-center gap-2"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg)',
              }}
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
              className="h-2 rounded-full transition-all"
              style={{
                width: s === step ? 24 : 8,
                background: s === step ? 'var(--text-primary)' : 'var(--border)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
