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

const REVEAL_THRESHOLD = 0.6; // 60% scratched → auto-reveal
const TOUCH_RADIUS = 30;
const MOUSE_RADIUS = 20;

export default function ScratchCard({ meme, lang, character }: ScratchCardProps) {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
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

    // Draw scratch overlay gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#3a4a52');
    gradient.addColorStop(1, '#2a3a42');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw hint text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('← Wisch zum Aufdecken →', rect.width / 2, rect.height / 2 - 10);

    // Draw ticket emoji
    ctx.font = '32px serif';
    ctx.fillText('🎟️', rect.width / 2, rect.height / 2 - 50);

    // Draw label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(isDE ? 'GEHEIMES MEME' : 'HIDDEN MEME', rect.width / 2, rect.height / 2 + 20);

    hasInitialized.current = true;
  }, [revealed, isDE]);

  const checkRevealThreshold = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    if (transparent / total >= REVEAL_THRESHOLD) {
      setRevealed(true);
      playRevealSound();
      if (isLegendary) {
        setTimeout(() => playLevelUpSound(), 200);
      }
    }
  }, [revealed, isLegendary]);

  const scratch = useCallback((x: number, y: number, radius: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const canvasX = (x - rect.left);
    const canvasY = (y - rect.top);

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX * dpr, canvasY * dpr, radius * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [revealed]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (revealed) return;
    isScratching.current = true;
    scratch(e.clientX, e.clientY, MOUSE_RADIUS);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching.current || revealed) return;
    scratch(e.clientX, e.clientY, MOUSE_RADIUS);
  };
  const handleMouseUp = () => {
    isScratching.current = false;
    checkRevealThreshold();
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (revealed) return;
    e.preventDefault();
    isScratching.current = true;
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
          <Star size={16} style={{ color: rarityColor }} fill={rarityColor} />
        ) : (
          <Sparkles size={16} style={{ color: rarityColor }} />
        )}
        <p className="text-sm font-bold text-center" style={{ color: rarityColor }}>
          {headline}
        </p>
      </div>

      {/* Card body — canvas overlay sits on top */}
      <div
        className={`relative aspect-[5/3] w-full rounded-2xl overflow-hidden select-none ${
          isLegendary && revealed ? 'ring-2 ring-[#B8860B] ring-offset-2 ring-offset-[var(--bg-card)]' : ''
        }`}
        style={{ borderWidth: 4, borderStyle: 'solid', borderColor: rarityColor }}
      >
        {/* Underlying meme content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg)] text-center">
          <div className="text-5xl">{meme.emoji}</div>
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

        {/* Canvas scratch overlay */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none"
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
        <div className="flex items-start gap-2 bg-[rgba(255,255,255,0.04)] rounded-xl p-3">
          <span className="text-xl shrink-0">{character.emoji}</span>
          <p className="text-xs italic text-[var(--text-secondary)] leading-snug">
            {rarityQuote}
          </p>
        </div>
      )}
    </div>
  );
}
