'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { getAllLessons, getTotalQuestions, LEVEL_THRESHOLDS, getTrackData } from '@/data/content';
import { TRACKS } from '@/data/tracks';
import { getCharacterForTrack } from '@/data/characters';
import { playClickSound } from '@/lib/sounds';
import Link from 'next/link';
import { Flame, Zap, Target, Trophy, BarChart3, BookOpen, RefreshCw, Globe, Volume2, VolumeX, ArrowRightLeft, Sparkles, ChevronRight, Brain, Image as ImageIcon, Bell, X, Star } from 'lucide-react';
import { MEMES, RARITY_COLOR, RARITY_LABEL, type Meme, type MemeRarity } from '@/data/memes';

export default function ProfilePage() {
  const { progress, level, t, update, resetProgress, unlockedMemes } = useStore();
  const currentTrack = TRACKS.find(tr => tr.id === progress.selectedTrack) || TRACKS[0];
  const character = getCharacterForTrack(progress.selectedTrack || 'ib');
  const totalLessons = getAllLessons(progress.selectedTrack).length;
  const accuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
    : 0;
  const totalMemes = MEMES.length;
  const collectedCount = unlockedMemes.length;

  // Meme modal + filter tabs
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [memeFilter, setMemeFilter] = useState<'all' | MemeRarity>('all');
  const filteredMemes = memeFilter === 'all'
    ? MEMES
    : MEMES.filter(m => m.rarity === memeFilter);
  const FILTER_TABS: { key: 'all' | MemeRarity; label: string }[] = [
    { key: 'all', label: t('All', 'Alle') },
    { key: 'standard', label: 'Standard' },
    { key: 'rare', label: 'Rare' },
    { key: 'legendary', label: 'Legendary' },
  ];

  // Notification toggle state
  const [notifEnabled, setNotifEnabled] = useState(false);
  useEffect(() => {
    try {
      setNotifEnabled(localStorage.getItem('notifications-enabled') === 'true');
    } catch { /* ignore */ }
  }, []);

  const toggleNotifications = async () => {
    if (notifEnabled) {
      try { localStorage.setItem('notifications-enabled', 'false'); } catch { /* */ }
      setNotifEnabled(false);
    } else {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        try {
          const result = await Notification.requestPermission();
          if (result === 'granted') {
            localStorage.setItem('notifications-enabled', 'true');
            setNotifEnabled(true);
          }
        } catch { /* */ }
      }
    }
  };

  return (
    <AppShell>
      {/* ===== Meme Detail Modal ===== */}
      {selectedMeme && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setSelectedMeme(null)}
        >
          <div
            className={`relative w-full max-w-sm rounded-2xl overflow-hidden ${
              selectedMeme.rarity === 'legendary' ? 'meme-modal-legendary' : ''
            }`}
            style={{
              borderWidth: 4,
              borderStyle: 'solid',
              borderColor: RARITY_COLOR[selectedMeme.rarity],
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] p-6 flex flex-col items-center gap-4 text-center min-h-[280px] justify-center">
              <div className="text-6xl">{selectedMeme.emoji}</div>
              <p className="text-base font-bold text-[var(--text-primary)] leading-snug whitespace-pre-line">
                {progress.language === 'de' ? selectedMeme.textDe : selectedMeme.text}
              </p>
              <span
                className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"
                style={{
                  backgroundColor: RARITY_COLOR[selectedMeme.rarity],
                  color: selectedMeme.rarity === 'standard' ? '#1a1a1a' : '#fff',
                }}
              >
                {selectedMeme.rarity === 'legendary' && <Star size={12} fill="currentColor" />}
                {progress.language === 'de'
                  ? RARITY_LABEL[selectedMeme.rarity].de
                  : RARITY_LABEL[selectedMeme.rarity].en}
                {selectedMeme.rarity === 'legendary' && <Star size={12} fill="currentColor" />}
              </span>
            </div>
            <button
              onClick={() => setSelectedMeme(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              <X size={16} />
            </button>
          </div>
          <style jsx>{`
            .meme-modal-legendary {
              box-shadow: 0 0 30px rgba(184, 134, 11, 0.5), 0 0 60px rgba(184, 134, 11, 0.25);
              animation: modal-glow 2s ease-in-out infinite;
            }
            @keyframes modal-glow {
              0%, 100% { box-shadow: 0 0 30px rgba(184, 134, 11, 0.5), 0 0 60px rgba(184, 134, 11, 0.25); }
              50% { box-shadow: 0 0 40px rgba(184, 134, 11, 0.7), 0 0 80px rgba(184, 134, 11, 0.35); }
            }
          `}</style>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Header */}
        <div className="duo-card p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-xp)] to-[var(--accent-info)] flex items-center justify-center mx-auto mb-3 text-3xl font-black text-white">
            {(progress.username || 'A').charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-black">{progress.username || 'Analyst'}</h1>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Trophy size={14} className="text-[var(--duo-gold)]" />
            <span className="text-sm text-[var(--duo-gold)] font-bold">
              {t(level.title, level.titleDe)}
            </span>
          </div>
          <p className="text-xs text-[var(--duo-text-muted)] mt-1">
            Level {level.level} · {progress.xp} XP
          </p>
        </div>

        {/* Level Progress */}
        <div className="duo-card p-5">
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Trophy size={16} className="text-[var(--duo-gold)]" />
            {t('Level Progress', 'Level-Fortschritt')}
          </h2>
          <div className="space-y-2">
            {LEVEL_THRESHOLDS.map((lv, i) => {
              const isReached = progress.xp >= lv.xpRequired;
              const isCurrent = level.level === lv.level;
              return (
                <div key={lv.level} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isReached ? 'bg-[var(--accent-xp)] text-white' :
                    isCurrent ? 'bg-[var(--accent-info)] text-white' :
                    'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                  }`}>
                    {lv.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-bold ${isReached ? 'text-white' : 'text-[var(--duo-text-muted)]'}`}>
                      {t(lv.title, lv.titleDe)}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--duo-text-muted)]">{lv.xpRequired} XP</span>
                  {isReached && <span className="text-[var(--accent-xp)] text-sm">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="duo-card p-5">
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <BarChart3 size={16} className="text-[var(--accent-info)]" />
            {t('Statistics', 'Statistiken')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatItem icon={<Flame size={16} className="text-[var(--accent-streak)]" />} value={progress.streak} label={t('Current Streak', 'Aktueller Streak')} />
            <StatItem icon={<Flame size={16} className="text-[var(--duo-red)]" />} value={progress.longestStreak} label={t('Longest Streak', 'Längster Streak')} />
            <StatItem icon={<Zap size={16} className="text-[var(--duo-yellow)]" />} value={progress.xp} label={t('Total XP', 'Gesamt XP')} />
            <StatItem icon={<BookOpen size={16} className="text-[var(--accent-xp)]" />} value={`${progress.completedLessons.length}/${totalLessons}`} label={t('Lessons', 'Lektionen')} />
            <StatItem icon={<Target size={16} className="text-[var(--accent-info)]" />} value={`${accuracy}%`} label={t('Accuracy', 'Genauigkeit')} />
            <StatItem icon={<BarChart3 size={16} className="text-[var(--accent-purple)]" />} value={progress.totalQuestionsAnswered} label={t('Questions', 'Fragen')} />
          </div>
        </div>

        {/* Meme Collection */}
        <div className="duo-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm flex items-center gap-2">
              <ImageIcon size={16} className="text-[var(--accent-purple)]" />
              {t('Collection', 'Sammlung')}
            </h2>
            <span className="text-[10px] font-bold text-[var(--text-muted)] tabular-nums">
              {collectedCount} / {totalMemes} {t('Memes', 'Memes')}
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setMemeFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide whitespace-nowrap transition-all ${
                  memeFilter === tab.key
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)]'
                    : 'bg-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                style={
                  memeFilter === tab.key && tab.key !== 'all'
                    ? { backgroundColor: RARITY_COLOR[tab.key as MemeRarity], color: tab.key === 'standard' ? '#1a1a1a' : '#fff' }
                    : {}
                }
              >
                {tab.key === 'legendary' && '★ '}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {filteredMemes.map((m: Meme) => {
              const unlocked = unlockedMemes.includes(m.id);
              const color = RARITY_COLOR[m.rarity];
              const rLabel = progress.language === 'de'
                ? RARITY_LABEL[m.rarity].de
                : RARITY_LABEL[m.rarity].en;
              const isLegendary = m.rarity === 'legendary';
              return (
                <div
                  key={m.id}
                  onClick={() => unlocked && setSelectedMeme(m)}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 p-2 text-center overflow-hidden transition-all ${
                    unlocked
                      ? 'bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] cursor-pointer active:scale-95'
                      : 'bg-[var(--border)] opacity-60'
                  } ${isLegendary && unlocked ? 'ring-2 ring-[#B8860B] ring-offset-1 ring-offset-[var(--bg-card)]' : ''}`}
                  style={{
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: unlocked ? color : 'var(--border)',
                  }}
                  title={unlocked ? (progress.language === 'de' ? m.textDe : m.text) : '???'}
                >
                  {unlocked ? (
                    <>
                      <div className="text-2xl leading-none">{m.emoji}</div>
                      <span
                        className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                        style={{
                          backgroundColor: color,
                          color: m.rarity === 'standard' ? '#1a1a1a' : '#fff',
                        }}
                      >
                        {isLegendary && '★ '}
                        {rLabel}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl text-[var(--text-muted)] grayscale opacity-40">
                        ❔
                      </div>
                      <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-wider">
                        ???
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Track Switcher */}
        <div
          style={{
            border: '0.5px solid var(--border)',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 8,
            }}
          >
            {t('Your Track', 'Dein Track')}
          </div>
          {TRACKS.map(tr => {
            const isComingSoon = tr.id === 'pe' || tr.id === 'vc' || tr.id === 'ib';
            const isSelected = tr.id === progress.selectedTrack;
            return (
              <button
                key={tr.id}
                onClick={() => {
                  update({ selectedTrack: tr.id });
                  playClickSound();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  background: isSelected ? 'var(--bg-secondary)' : 'transparent',
                  border: isSelected
                    ? '1px solid var(--text-primary)'
                    : '0.5px solid var(--border)',
                  borderRadius: 8,
                  marginBottom: 6,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 18 }}>{tr.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {progress.language === 'de' ? (tr.titleDe || tr.title) : tr.title}
                  </div>
                  {isComingSoon && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      Coming Soon
                    </div>
                  )}
                </div>
                {isSelected && (
                  <span style={{ marginLeft: 'auto', fontSize: 16 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Prep Tools */}
        <div className="duo-card p-5">
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--accent-purple)]" />
            {t('Prep Tools', 'Prep-Tools')}
          </h2>
          <div className="space-y-2">
            {progress.selectedTrack === 'consulting' && (
              <Link href="/solve" onClick={() => playClickSound()}>
                <div className="w-full p-3 rounded-xl flex items-center gap-3 border-2 border-[var(--border)] hover:border-[var(--accent-purple)] transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(206,130,255,0.15)] flex items-center justify-center shrink-0">
                    <Sparkles size={18} className="text-[var(--accent-purple)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{t('Online Test Prep', 'Online Test Prep')}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {t('McKinsey Solve · BCG Casey · Bain SOVA', 'McKinsey Solve · BCG Casey · Bain SOVA')}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] transition shrink-0" />
                </div>
              </Link>
            )}
            <Link href="/brainteasers" onClick={() => playClickSound()}>
              <div className="w-full p-3 rounded-xl flex items-center gap-3 border-2 border-[var(--border)] hover:border-[var(--accent-streak)] transition-all cursor-pointer group mt-2">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,150,0,0.15)] flex items-center justify-center shrink-0">
                  <Brain size={18} className="text-[var(--accent-streak)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold">{t('Brainteasers', 'Denksport')}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    {t('Classic interview puzzles', 'Klassische Interview-Rätsel')}
                  </div>
                </div>
                <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-streak)] transition shrink-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* Settings */}
        <div className="duo-card p-5 space-y-4">
          <h2 className="font-bold text-sm flex items-center gap-2">
            {t('Settings', 'Einstellungen')}
          </h2>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{progress.theme === 'light' ? '☀️' : '🌙'}</span>
              <span className="text-sm">{t('Theme', 'Design')}</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  update({ theme: 'dark' });
                  document.documentElement.removeAttribute('data-theme');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  !progress.theme || progress.theme === 'dark'
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)]'
                    : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => {
                  update({ theme: 'light' });
                  document.documentElement.setAttribute('data-theme', 'light');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  progress.theme === 'light'
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)]'
                    : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                }`}
              >
                ☀️ Light
              </button>
            </div>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={16} className={notifEnabled ? 'text-[var(--accent-streak)]' : 'text-[var(--duo-text-muted)]'} />
              <span className="text-sm">{t('Reminders', 'Erinnerungen')}</span>
            </div>
            <button
              onClick={toggleNotifications}
              className={`w-12 h-7 rounded-full transition-all relative ${
                notifEnabled ? 'bg-[var(--accent-streak)]' : 'bg-[var(--duo-border)]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${
                notifEnabled ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {progress.soundEnabled ? <Volume2 size={16} className="text-[var(--accent-xp)]" /> : <VolumeX size={16} className="text-[var(--duo-text-muted)]" />}
              <span className="text-sm">{t('Sound Effects', 'Soundeffekte')}</span>
            </div>
            <button
              onClick={() => {
                const next = !progress.soundEnabled;
                update({ soundEnabled: next });
                if (typeof window !== 'undefined') {
                  localStorage.setItem('career-dojo-sound', next ? 'on' : 'off');
                }
                if (next) playClickSound();
              }}
              className={`w-12 h-7 rounded-full transition-all relative ${
                progress.soundEnabled ? 'bg-[var(--accent-xp)]' : 'bg-[var(--duo-border)]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${
                progress.soundEnabled ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[var(--duo-text-muted)]" />
              <span className="text-sm">{t('Language', 'Sprache')}</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => update({ language: 'de' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  progress.language === 'de'
                    ? 'bg-[var(--accent-xp)] text-white'
                    : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                }`}
              >
                🇩🇪 DE
              </button>
              <button
                onClick={() => update({ language: 'en' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  progress.language === 'en'
                    ? 'bg-[var(--accent-xp)] text-white'
                    : 'bg-[var(--duo-border)] text-[var(--duo-text-muted)]'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-[var(--duo-text-muted)]" />
              <span className="text-sm">{t('Daily Goal', 'Tagesziel')}</span>
            </div>
            <select
              value={progress.dailyGoal}
              onChange={e => update({ dailyGoal: Number(e.target.value) })}
              className="bg-[var(--duo-border)] text-white text-sm rounded-lg px-3 py-1.5 border-none"
            >
              <option value={1}>1/Tag</option>
              <option value={3}>3/Tag</option>
              <option value={5}>5/Tag</option>
              <option value={10}>10/Tag</option>
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              if (confirm(t('Reset all progress? This cannot be undone!', 'Gesamten Fortschritt zurücksetzen? Das kann nicht rückgängig gemacht werden!'))) {
                resetProgress();
                window.location.href = '/onboarding';
              }
            }}
            className="w-full py-3 rounded-xl border-2 border-[var(--duo-red)] text-[var(--duo-red)] font-bold text-sm btn-press transition flex items-center justify-center gap-2 hover:bg-[rgba(255,75,75,0.1)]"
          >
            <RefreshCw size={16} />
            {t('Reset Progress', 'Fortschritt zurücksetzen')}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <div className="text-sm font-black">{value}</div>
        <div className="text-[10px] text-[var(--duo-text-muted)]">{label}</div>
      </div>
    </div>
  );
}
