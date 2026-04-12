'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Star } from 'lucide-react';
import {
  type Meme,
  RARITY_COLOR,
  RARITY_LABEL,
} from '@/data/memes';
import { type Character } from '@/data/characters';
import { playRevealSound, playLevelUpSound } from '@/lib/sounds';

interface ScratchCardProps {
  meme: Meme;
  lang: 'en' | 'de';
  character: Character;
}

const RARITY_QUOTES: Record<
  Meme['rarity'],
  { en: string; de: string }
> = {
  standard: {
    en: 'A solid classic. Every collection starts somewhere!',
    de: 'Ein solider Klassiker. Jede Sammlung fängt irgendwo an!',
  },
  rare: {
    en: 'Not bad! This one\'s hard to come by. 🎯',
    de: 'Nicht schlecht! Das gibt\'s nicht oft. 🎯',
  },
  legendary: {
    en: 'LEGENDARY! Very few ever see this one. ✨',
    de: 'LEGENDARY! Das sehen die wenigsten. ✨',
  },
};

const REVEAL_THRESHOLD = 0.4; // 40% scratched → auto-reveal
const TOUCH_RADIUS = 30;
const MOUSE_RADIUS = 20;

// ============================================================
// Confetti particle system for legendary reveals
// ============================================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  shape: 'rect' | 'circle' | 'star';
}

function LegendaryConfetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const COLORS = ['#FFD700', '#FFA500', '#FF6347', '#B8860B', '#DAA520', '#FAFAD2', '#fff'];
    const PARTICLE_COUNT = 60;

    // Spawn burst of particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: rect.width / 2,
        y: rect.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 3 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        life: 1,
        maxLife: 60 + Math.random() * 40,
        shape: (['rect', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
      });
    }
    particlesRef.current = particles;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const alive: Particle[] = [];

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0 || p.y > rect.height + 20) continue;
        alive.push(p);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.min(p.life * 2, 1);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 5-point star
          const s = p.size / 2;
          ctx.beginPath();
          for (let j = 0; j < 5; j++) {
            const a = (j * 4 * Math.PI) / 5 - Math.PI / 2;
            const method = j === 0 ? 'moveTo' : 'lineTo';
            ctx[method](Math.cos(a) * s, Math.sin(a) * s);
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      particlesRef.current = alive;
      frame++;

      if (alive.length > 0 && frame < 200) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
    />
  );
}

// ============================================================
// ScratchCard component
// ============================================================
export default function ScratchCard({ meme, lang, character }: ScratchCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const hasInitialized = useRef(false);
  const isDE = lang === 'de';

  const text = isDE ? meme.textDe : meme.text;
  const rarityLabel = isDE
    ? RARITY_LABEL[meme.rarity].de
    : RARITY_LABEL[meme.rarity].en;
  const rarityColor = RARITY_COLOR[meme.rarity];
  const rarityQuote = isDE
    ? RARITY_QUOTES[meme.rarity].de
    : RARITY_QUOTES[meme.rarity].en;
  const isLegendary = meme.rarity === 'legendary';

  // Initialize canvas overlay
  useEffect(() => {
    if (hasInitialized.current || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Draw solid opaque scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#3a4a52');
    gradient.addColorStop(0.5, '#2e3e48');
    gradient.addColorStop(1, '#222e36');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle pattern texture
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let y = 0; y < rect.height; y += 4) {
      for (let x = (y % 8 === 0 ? 0 : 2); x < rect.width; x += 4) {
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Draw hint text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('← Wisch zum Aufdecken →', rect.width / 2, rect.height / 2);

    // Draw ticket emoji
    ctx.font = '36px serif';
    ctx.fillText('🎟️', rect.width / 2, rect.height / 2 - 45);

    // Draw small label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.fillText(isDE ? 'GEHEIMES MEME' : 'HIDDEN MEME', rect.width / 2, rect.height / 2 + 35);

    hasInitialized.current = true;
  }, [revealed, isDE]);

  const doReveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    playRevealSound();
    if (isLegendary) {
      setShowConfetti(true);
      setTimeout(() => playLevelUpSound(), 200);
    }
  }, [revealed, isLegendary]);

  const checkRevealThreshold = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sample every 4th pixel for performance
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 16) {
      total++;
      if (pixels[i] === 0) transparent++;
    }
    if (total > 0 && transparent / total >= REVEAL_THRESHOLD) {
      doReveal();
    }
  }, [revealed, doReveal]);

  const scratch = useCallback((x: number, y: number, radius: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cx = (x - rect.left) * dpr;
    const cy = (y - rect.top) * dpr;
    const r = radius * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)'; // Full opacity erase
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = r * 2;
    ctx.strokeStyle = 'rgba(0,0,0,1)';

    // Connect to last point for smooth line scratching
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    }

    // Also draw a circle at current point
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    lastPoint.current = { x: cx, y: cy };
  }, [revealed]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (revealed) return;
    isScratching.current = true;
    lastPoint.current = null;
    scratch(e.clientX, e.clientY, MOUSE_RADIUS);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching.current || revealed) return;
    scratch(e.clientX, e.clientY, MOUSE_RADIUS);
  };
  const handleMouseUp = () => {
    isScratching.current = false;
    lastPoint.current = null;
    checkRevealThreshold();
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (revealed) return;
    e.preventDefault();
    isScratching.current = true;
    lastPoint.current = null;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY, TOUCH_RADIUS);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching.current || revealed) return;
    e.preventDefault();
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY, TOUCH_RADIUS);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    isScratching.current = false;
    lastPoint.current = null;
    checkRevealThreshold();
  };

  const headline = revealed
    ? isDE
      ? `Du hast ein ${rarityLabel}-Meme freigeschaltet!`
      : `You unlocked a ${rarityLabel} meme!`
    : isDE
      ? 'Rubbel die Karte frei!'
      : 'Scratch to reveal!';

  // Badge styles per rarity
  const badgeStyle: React.CSSProperties = meme.rarity === 'legendary'
    ? { backgroundColor: rarityColor, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }
    : meme.rarity === 'rare'
      ? { backgroundColor: rarityColor, color: '#fff' }
      : { backgroundColor: rarityColor, color: '#1a1a1a' };

  return (
    <div className="duo-card p-5 space-y-4">
      <div className="flex items-center gap-2 justify-center">
        {isLegendary ? (
          <Star size={16} style={{ color: rarityColor }} fill={rarityColor} className={revealed ? 'animate-spin' : ''} />
        ) : (
          <Sparkles size={16} style={{ color: rarityColor }} />
        )}
        <p className="text-sm font-bold text-center" style={{ color: rarityColor }}>
          {headline}
        </p>
        {isLegendary && revealed && (
          <Star size={16} style={{ color: rarityColor }} fill={rarityColor} className="animate-spin" />
        )}
      </div>

      {/* Card body — canvas overlay sits on top */}
      <div
        className={`relative aspect-[5/3] w-full rounded-2xl overflow-hidden select-none ${
          isLegendary && revealed ? 'legendary-glow' : ''
        }`}
        style={{ borderWidth: 4, borderStyle: 'solid', borderColor: rarityColor }}
      >
        {/* Underlying meme content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] text-center ${
          isLegendary && revealed ? 'animate-legendary-reveal' : ''
        }`}>
          <div className={`text-5xl ${isLegendary && revealed ? 'animate-bounce' : ''}`}>{meme.emoji}</div>
          <p className="text-sm font-bold text-[var(--text-primary)] leading-snug whitespace-pre-line">
            {text}
          </p>
          <span
            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
            style={badgeStyle}
          >
            {isLegendary && <Star size={10} fill="currentColor" />}
            {rarityLabel}
            {isLegendary && <Star size={10} fill="currentColor" />}
          </span>
        </div>

        {/* Confetti for legendary */}
        <LegendaryConfetti active={showConfetti} />

        {/* Canvas scratch overlay */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none z-10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        )}
      </div>

      {/* Character reaction (only after reveal) */}
      {revealed && (
        <div className={`flex items-start gap-2 bg-[rgba(255,255,255,0.04)] rounded-xl p-3 ${
          isLegendary ? 'border border-[#B8860B]' : ''
        }`}>
          <span className="text-xl shrink-0">{character.emoji}</span>
          <p className="text-xs italic text-[var(--text-secondary)] leading-snug">
            {rarityQuote}
          </p>
        </div>
      )}

      {/* Legendary CSS animations */}
      <style jsx>{`
        .legendary-glow {
          box-shadow: 0 0 20px rgba(184, 134, 11, 0.4), 0 0 40px rgba(184, 134, 11, 0.2);
          animation: legendary-pulse 2s ease-in-out infinite;
        }
        @keyframes legendary-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(184, 134, 11, 0.4), 0 0 40px rgba(184, 134, 11, 0.2); }
          50% { box-shadow: 0 0 30px rgba(184, 134, 11, 0.6), 0 0 60px rgba(184, 134, 11, 0.3); }
        }
        .animate-legendary-reveal {
          animation: legendary-scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes legendary-scale {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
