'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
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
  analyst: {
    en: 'A common one — but every collection starts somewhere.',
    de: 'Ein häufiger Drop — aber jede Sammlung beginnt irgendwo.',
  },
  associate: {
    en: 'Solid pull. The pack approves.',
    de: 'Solider Drop. Das Rudel ist zufrieden.',
  },
  partner: {
    en: 'PARTNER tier?! That belongs in the corner office.',
    de: 'PARTNER-Tier?! Das gehört ins Eckbüro.',
  },
};

export default function ScratchCard({ meme, lang, character }: ScratchCardProps) {
  const [revealed, setRevealed] = useState(false);
  const isDE = lang === 'de';

  const text = isDE ? meme.textDe : meme.text;
  const rarityLabel = isDE
    ? RARITY_LABEL[meme.rarity].de
    : RARITY_LABEL[meme.rarity].en;
  const rarityColor = RARITY_COLOR[meme.rarity];
  const rarityQuote = isDE
    ? RARITY_QUOTES[meme.rarity].de
    : RARITY_QUOTES[meme.rarity].en;

  const handleScratch = () => {
    if (revealed) return;
    setRevealed(true);
    playRevealSound();
    if (meme.rarity === 'partner') {
      // Extra fanfare for the rarest tier
      setTimeout(() => playLevelUpSound(), 200);
    }
  };

  const headline = revealed
    ? isDE
      ? `Du hast ein ${rarityLabel}-Meme freigeschaltet!`
      : `You unlocked a ${rarityLabel} meme!`
    : isDE
      ? 'Tippe zum Freirubbeln!'
      : 'Tap to scratch!';

  return (
    <div className="duo-card p-5 space-y-4">
      <div className="flex items-center gap-2 justify-center">
        <Sparkles size={16} style={{ color: rarityColor }} />
        <p className="text-sm font-bold text-center" style={{ color: rarityColor }}>
          {headline}
        </p>
      </div>

      {/* Card body — overlay sits on top until clicked */}
      <div
        onClick={handleScratch}
        className={`relative aspect-[5/3] w-full rounded-2xl overflow-hidden border-4 select-none ${
          revealed ? '' : 'cursor-pointer'
        }`}
        style={{ borderColor: rarityColor }}
      >
        {/* Underlying meme content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-br from-[var(--duo-card)] to-[var(--duo-bg)] text-center">
          <div className="text-5xl">{meme.emoji}</div>
          <p className="text-sm font-bold text-white leading-snug">{text}</p>
          <span
            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-black"
            style={{ backgroundColor: rarityColor }}
          >
            {rarityLabel}
          </span>
        </div>

        {/* Scratch overlay — fades out on click, press feedback on mobile */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#3a4a52] to-[#2a3a42] text-center transition-all duration-[1500ms] ease-out ${
            revealed
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 active:scale-[0.98] active:duration-100'
          }`}
        >
          <div className="text-4xl">🎟️</div>
          <p className="text-xs font-bold text-[var(--duo-text-muted)] uppercase tracking-widest">
            {isDE ? 'Geheimes Meme' : 'Hidden Meme'}
          </p>
          <p className="text-[10px] text-[var(--duo-text-muted)]">
            {isDE ? 'Tippen zum Freirubbeln' : 'Tap to scratch'}
          </p>
        </div>
      </div>

      {/* Character reaction (only after reveal) */}
      {revealed && (
        <div className="flex items-start gap-2 bg-[rgba(255,255,255,0.04)] rounded-xl p-3">
          <span className="text-xl shrink-0">{character.emoji}</span>
          <p className="text-xs italic text-[var(--duo-text-muted)] leading-snug">
            {rarityQuote}
          </p>
        </div>
      )}
    </div>
  );
}
