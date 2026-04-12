'use client';

// ============================================================
// Sound Effects System — Web Audio API (no external files needed)
// ============================================================

let audioCtx: AudioContext | null = null;
let globalUnlockSetup = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  // iOS requires resume after user gesture
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Call on first user touch to unlock iOS audio. */
export function unlockAudioContext() {
  if (typeof window === 'undefined') return;
  try {
    getAudioContext();
  } catch {
    // Audio not available
  }
}

/**
 * Set up global document-level event listeners that unlock the
 * AudioContext on the very first user gesture. Safari (iOS) requires
 * the AudioContext to be created AND resumed inside a user gesture
 * handler. This function attaches listeners to touchstart, touchend,
 * click, and keydown on the document — covering every possible first
 * interaction. Once unlocked, the listeners remove themselves.
 *
 * Call this once from AppShell or a top-level layout useEffect.
 */
export function setupGlobalAudioUnlock() {
  if (typeof window === 'undefined') return;
  if (globalUnlockSetup) return;
  globalUnlockSetup = true;

  const unlock = () => {
    try {
      // Create context if it doesn't exist
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      // Resume if suspended (Safari requires this inside gesture)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      // Play a silent buffer to fully unlock on iOS Safari
      const buffer = audioCtx.createBuffer(1, 1, 22050);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
    } catch {
      // Audio not available
    }
    // Remove all listeners after first successful unlock
    document.removeEventListener('touchstart', unlock, true);
    document.removeEventListener('touchend', unlock, true);
    document.removeEventListener('click', unlock, true);
    document.removeEventListener('keydown', unlock, true);
  };

  document.addEventListener('touchstart', unlock, true);
  document.addEventListener('touchend', unlock, true);
  document.addEventListener('click', unlock, true);
  document.addEventListener('keydown', unlock, true);
}

function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('career-dojo-sound') !== 'off';
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem('career-dojo-sound', enabled ? 'on' : 'off');
}

export function getSoundEnabled(): boolean {
  return isSoundEnabled();
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

// Ka-Ching! Cash register sound
export function playCashSound() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    // High ping
    playTone(1200, 0.1, 'sine', 0.12);
    setTimeout(() => playTone(1600, 0.1, 'sine', 0.12), 50);
    setTimeout(() => playTone(2000, 0.15, 'sine', 0.1), 100);
    // Cash register "ding"
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 2400;
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }, 150);
  } catch { /* */ }
}

// Correct answer — cheerful ascending tones
export function playCorrectSound() {
  if (!isSoundEnabled()) return;
  playTone(523, 0.12, 'sine', 0.12); // C5
  setTimeout(() => playTone(659, 0.12, 'sine', 0.12), 100); // E5
  setTimeout(() => playTone(784, 0.2, 'sine', 0.15), 200); // G5
}

// Wrong answer — descending "wah wah"
export function playWrongSound() {
  if (!isSoundEnabled()) return;
  playTone(400, 0.15, 'sawtooth', 0.06);
  setTimeout(() => playTone(350, 0.2, 'sawtooth', 0.05), 150);
}

// Level up — triumphant fanfare
export function playLevelUpSound() {
  if (!isSoundEnabled()) return;
  playTone(523, 0.15, 'sine', 0.12);
  setTimeout(() => playTone(659, 0.15, 'sine', 0.12), 120);
  setTimeout(() => playTone(784, 0.15, 'sine', 0.12), 240);
  setTimeout(() => playTone(1047, 0.4, 'sine', 0.15), 360);
}

// XP gain — quick sparkle
export function playXpSound() {
  if (!isSoundEnabled()) return;
  playTone(1000, 0.08, 'sine', 0.08);
  setTimeout(() => playTone(1400, 0.1, 'sine', 0.06), 60);
}

// Streak — fire crackling (percussive)
export function playStreakSound() {
  if (!isSoundEnabled()) return;
  playTone(800, 0.05, 'square', 0.04);
  setTimeout(() => playTone(1000, 0.05, 'square', 0.04), 40);
  setTimeout(() => playTone(1200, 0.08, 'triangle', 0.06), 80);
  setTimeout(() => playTone(1600, 0.12, 'sine', 0.08), 120);
}

// Click / tap
export function playClickSound() {
  if (!isSoundEnabled()) return;
  playTone(800, 0.03, 'sine', 0.05);
}

// Lesson complete — satisfying "done" sound
export function playCompleteSound() {
  if (!isSoundEnabled()) return;
  playCashSound();
  setTimeout(() => playLevelUpSound(), 300);
}

// Case reveal / hint
export function playRevealSound() {
  if (!isSoundEnabled()) return;
  playTone(600, 0.1, 'sine', 0.08);
  setTimeout(() => playTone(800, 0.15, 'sine', 0.1), 80);
}
