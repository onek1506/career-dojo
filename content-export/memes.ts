// ============================================================
// CareerDojo Meme Cards — collectible scratch cards
// Drop after lessons. Three rarities, three drop rates.
// ============================================================

export type MemeRarity = 'analyst' | 'associate' | 'partner';
export type MemeTrack = 'ib' | 'consulting' | 'pe' | 'vc';

export interface Meme {
  id: string;
  rarity: MemeRarity;
  track: MemeTrack;
  text: string;     // English
  textDe: string;   // German
  emoji: string;
  dropRate: number; // 0..1 — bucket drop chance for the rarity tier
}

export const RARITY_DROP_RATE: Record<MemeRarity, number> = {
  analyst: 0.6,
  associate: 0.3,
  partner: 0.1,
};

// Color helper for the rarity badge
export const RARITY_COLOR: Record<MemeRarity, string> = {
  analyst: 'var(--duo-green)',
  associate: 'var(--duo-blue)',
  partner: 'var(--duo-gold)',
};

export const RARITY_LABEL: Record<MemeRarity, { en: string; de: string }> = {
  analyst: { en: 'Analyst', de: 'Analyst' },
  associate: { en: 'Associate', de: 'Associate' },
  partner: { en: 'Partner', de: 'Partner' },
};

// ============================================================
// MEMES — 30 total, balanced ~60/30/10 across rarities
// ============================================================
export const MEMES: Meme[] = [
  // ============================================================
  // INVESTMENT BANKING (10)
  // ============================================================
  {
    id: 'ib-01',
    rarity: 'associate',
    track: 'ib',
    text: 'When the model finally ties out at 3am 🙏',
    textDe: 'Wenn das Modell um 3 Uhr morgens endlich stimmt 🙏',
    emoji: '🧮',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'ib-02',
    rarity: 'analyst',
    track: 'ib',
    text: 'Due diligence found: everything is fine. Just kidding. 📋',
    textDe: 'Due Diligence ergab: alles in Ordnung. War nur ein Witz. 📋',
    emoji: '📋',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'ib-03',
    rarity: 'partner',
    track: 'ib',
    text: 'Pitch book: 147 slides. Client reads: slide 1 and the appendix.',
    textDe: 'Pitch Book: 147 Folien. Der Kunde liest: Folie 1 und den Appendix.',
    emoji: '📚',
    dropRate: RARITY_DROP_RATE.partner,
  },
  {
    id: 'ib-04',
    rarity: 'analyst',
    track: 'ib',
    text: 'Analyst life: Excel, PowerPoint, Repeat ☕',
    textDe: 'Analyst-Leben: Excel, PowerPoint, Repeat ☕',
    emoji: '☕',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'ib-05',
    rarity: 'associate',
    track: 'ib',
    text: "When MD says 'quick change' 💀",
    textDe: "Wenn der MD 'kurze Änderung' sagt 💀",
    emoji: '💀',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'ib-06',
    rarity: 'analyst',
    track: 'ib',
    text: 'Garamond 11. Always Garamond 11.',
    textDe: 'Garamond 11. Immer Garamond 11.',
    emoji: '🔠',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'ib-07',
    rarity: 'analyst',
    track: 'ib',
    text: 'CTRL+S, CTRL+S, CTRL+S, blackout. Repeat. 💾',
    textDe: 'STRG+S, STRG+S, STRG+S, Blackout. Wiederholen. 💾',
    emoji: '💾',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'ib-08',
    rarity: 'analyst',
    track: 'ib',
    text: "Staffer: 'You free this weekend?' Me: *cries in capacity* 📞",
    textDe: "Staffer: 'Hast du am Wochenende Zeit?' Ich: *weint in Auslastung* 📞",
    emoji: '📞',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'ib-09',
    rarity: 'analyst',
    track: 'ib',
    text: 'Adjusted EBITDA = real EBITDA + hopes and dreams.',
    textDe: 'Adjusted EBITDA = echtes EBITDA + Hoffnung und Träume.',
    emoji: '✨',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'ib-10',
    rarity: 'associate',
    track: 'ib',
    text: 'The deal closes. The closing dinner begins. Wallet trembles. 🥂',
    textDe: 'Der Deal schließt. Das Closing Dinner beginnt. Das Portemonnaie zittert. 🥂',
    emoji: '🥂',
    dropRate: RARITY_DROP_RATE.associate,
  },

  // ============================================================
  // CONSULTING (10)
  // ============================================================
  {
    id: 'cons-01',
    rarity: 'analyst',
    track: 'consulting',
    text: 'The answer is always: it depends. 🔍',
    textDe: 'Die Antwort ist immer: es kommt darauf an. 🔍',
    emoji: '🔍',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'cons-02',
    rarity: 'associate',
    track: 'consulting',
    text: "MECE or it didn't happen. ✅",
    textDe: 'MECE oder es ist nicht passiert. ✅',
    emoji: '✅',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'cons-03',
    rarity: 'partner',
    track: 'consulting',
    text: 'Client: we know the problem. McKinsey: *charges €2M to confirm*',
    textDe: 'Kunde: wir kennen das Problem. McKinsey: *berechnet €2M zur Bestätigung*',
    emoji: '💸',
    dropRate: RARITY_DROP_RATE.partner,
  },
  {
    id: 'cons-04',
    rarity: 'analyst',
    track: 'consulting',
    text: 'Structured thinking intensifies 🧠',
    textDe: 'Strukturiertes Denken intensiviert sich 🧠',
    emoji: '🧠',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'cons-05',
    rarity: 'associate',
    track: 'consulting',
    text: 'When you solve a case in the shower 🚿',
    textDe: 'Wenn du einen Case unter der Dusche löst 🚿',
    emoji: '🚿',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'cons-06',
    rarity: 'analyst',
    track: 'consulting',
    text: 'Every problem fits in a 2x2 matrix. EVERY problem. 📊',
    textDe: 'Jedes Problem passt in eine 2x2-Matrix. JEDES Problem. 📊',
    emoji: '📊',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'cons-07',
    rarity: 'analyst',
    track: 'consulting',
    text: "Marriott Bonvoy points: my actual paycheck. 🏨",
    textDe: 'Marriott Bonvoy Punkte: mein eigentliches Gehalt. 🏨',
    emoji: '🏨',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'cons-08',
    rarity: 'analyst',
    track: 'consulting',
    text: "'Let's circle back offline.' Translation: never speak of this again.",
    textDe: "'Lass uns das offline besprechen.' Übersetzung: nie wieder ansprechen.",
    emoji: '🔄',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'cons-09',
    rarity: 'analyst',
    track: 'consulting',
    text: 'PowerPoint at 2am. Animations at 3am. Existential crisis at 4am.',
    textDe: 'PowerPoint um 2 Uhr. Animationen um 3 Uhr. Sinnkrise um 4 Uhr.',
    emoji: '🎞️',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'cons-10',
    rarity: 'associate',
    track: 'consulting',
    text: "Hypothesis-driven: I made it up first, then I'll prove it.",
    textDe: 'Hypothesengetrieben: erst ausgedacht, dann bewiesen.',
    emoji: '💡',
    dropRate: RARITY_DROP_RATE.associate,
  },

  // ============================================================
  // PRIVATE EQUITY (5)
  // ============================================================
  {
    id: 'pe-01',
    rarity: 'associate',
    track: 'pe',
    text: "GP to LP: 'Strong vintage year ahead.' LP: 🙃",
    textDe: "GP zum LP: 'Starkes Vintage-Jahr voraus.' LP: 🙃",
    emoji: '🍷',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'pe-02',
    rarity: 'partner',
    track: 'pe',
    text: 'IRR looks great if you ignore the J-curve 📉➡️📈',
    textDe: 'Die IRR sieht super aus, wenn man die J-Kurve ignoriert 📉➡️📈',
    emoji: '📈',
    dropRate: RARITY_DROP_RATE.partner,
  },
  {
    id: 'pe-03',
    rarity: 'associate',
    track: 'pe',
    text: 'The carry waterfall: beautiful on paper 💧',
    textDe: 'Der Carry-Wasserfall: wunderschön auf dem Papier 💧',
    emoji: '💧',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'pe-04',
    rarity: 'analyst',
    track: 'pe',
    text: 'Day 1: synergies on the slide. Day 100: management replaced. 🪓',
    textDe: 'Tag 1: Synergien auf der Folie. Tag 100: Management ausgetauscht. 🪓',
    emoji: '🪓',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'pe-05',
    rarity: 'analyst',
    track: 'pe',
    text: 'Dry powder: €200B. Deals at fair price: 0. 💰',
    textDe: 'Dry Powder: €200B. Deals zu fairen Preisen: 0. 💰',
    emoji: '💰',
    dropRate: RARITY_DROP_RATE.analyst,
  },

  // ============================================================
  // VENTURE CAPITAL (5)
  // ============================================================
  {
    id: 'vc-01',
    rarity: 'analyst',
    track: 'vc',
    text: 'Unicorn spotted 🦄 (pre-revenue, pre-product, pre-idea)',
    textDe: 'Einhorn gesichtet 🦄 (pre-revenue, pre-product, pre-idea)',
    emoji: '🦄',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'vc-02',
    rarity: 'partner',
    track: 'vc',
    text: 'Series A: product-market fit. Series D: same slide deck.',
    textDe: 'Series A: Product-Market Fit. Series D: gleiches Pitch Deck.',
    emoji: '🎤',
    dropRate: RARITY_DROP_RATE.partner,
  },
  {
    id: 'vc-03',
    rarity: 'analyst',
    track: 'vc',
    text: "TAM: $1T. SAM: $100B. SOM: 'we'll figure it out.'",
    textDe: "TAM: 1 Billion $. SAM: 100 Mrd. $. SOM: 'kriegen wir hin.'",
    emoji: '🌍',
    dropRate: RARITY_DROP_RATE.analyst,
  },
  {
    id: 'vc-04',
    rarity: 'associate',
    track: 'vc',
    text: "We're not pre-revenue, we're 'pre-monetization.' 💸",
    textDe: "Wir sind nicht pre-revenue, wir sind 'pre-monetarisiert.' 💸",
    emoji: '🚀',
    dropRate: RARITY_DROP_RATE.associate,
  },
  {
    id: 'vc-05',
    rarity: 'analyst',
    track: 'vc',
    text: 'Patagonia vest acquired. Founder mode unlocked. 🦺',
    textDe: 'Patagonia-Weste erhalten. Founder-Modus freigeschaltet. 🦺',
    emoji: '🦺',
    dropRate: RARITY_DROP_RATE.analyst,
  },
];

// ============================================================
// Helpers
// ============================================================

export function getMemesForTrack(track: string): Meme[] {
  return MEMES.filter((m) => m.track === track);
}

export function getMemeById(id: string): Meme | undefined {
  return MEMES.find((m) => m.id === id);
}

export function getMemesByRarity(rarity: MemeRarity): Meme[] {
  return MEMES.filter((m) => m.rarity === rarity);
}

/**
 * Roll a meme for the given track. Picks a rarity bucket based on
 * the 60/30/10 distribution, then picks a random meme of that
 * rarity from the track that hasn't been unlocked yet.
 *
 * Falls back across rarities if the chosen bucket is exhausted.
 * Returns null when every meme of the track has been unlocked.
 */
export function rollMeme(
  track: string,
  unlockedIds: string[],
): Meme | null {
  const trackMemes = getMemesForTrack(track);
  const lockedMemes = trackMemes.filter((m) => !unlockedIds.includes(m.id));
  if (lockedMemes.length === 0) return null;

  // Pick a rarity bucket via weighted random
  const r = Math.random();
  let preferred: MemeRarity;
  if (r < RARITY_DROP_RATE.analyst) preferred = 'analyst';
  else if (r < RARITY_DROP_RATE.analyst + RARITY_DROP_RATE.associate) preferred = 'associate';
  else preferred = 'partner';

  // Try in preferred order, then fall back to other rarities
  const order: MemeRarity[] = ['analyst', 'associate', 'partner'].sort(
    (a, b) => (a === preferred ? -1 : b === preferred ? 1 : 0),
  ) as MemeRarity[];

  for (const rarity of order) {
    const candidates = lockedMemes.filter((m) => m.rarity === rarity);
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  // Final fallback — any locked meme
  return lockedMemes[Math.floor(Math.random() * lockedMemes.length)];
}
