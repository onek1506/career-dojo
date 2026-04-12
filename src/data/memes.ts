// ============================================================
// CareerDojo Meme Cards — collectible scratch cards
// Drop after lessons. Three rarities, three drop rates.
// ============================================================

export type MemeRarity = 'standard' | 'rare' | 'legendary';
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
  standard: 0.6,
  rare: 0.3,
  legendary: 0.1,
};

// Color helper for the rarity badge
export const RARITY_COLOR: Record<MemeRarity, string> = {
  standard: '#d0d0d0',
  rare: '#185FA5',
  legendary: '#B8860B',
};

export const RARITY_LABEL: Record<MemeRarity, { en: string; de: string }> = {
  standard: { en: 'Standard', de: 'Standard' },
  rare: { en: 'Rare', de: 'Rare' },
  legendary: { en: 'Legendary', de: 'Legendary' },
};

// ============================================================
// MEMES — 30 total, balanced ~60/30/10 across rarities
// Uses recognizable meme formats with finance twist
// ============================================================
export const MEMES: Meme[] = [
  // ============================================================
  // INVESTMENT BANKING (10)
  // ============================================================
  {
    id: 'ib-01',
    rarity: 'rare',
    track: 'ib',
    text: 'Nobody:\nAbsolutely nobody:\nThe MD at 11pm: "Quick comment on page 47"',
    textDe: 'Niemand:\nAbsolut niemand:\nDer MD um 23 Uhr: "Kurze Anmerkung zu Seite 47"',
    emoji: '💀',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'ib-02',
    rarity: 'standard',
    track: 'ib',
    text: 'Me: I should sleep\nThe model that doesn\'t tie: "No."',
    textDe: 'Ich: Ich sollte schlafen\nDas Modell, das nicht aufgeht: "Nein."',
    emoji: '🧮',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-03',
    rarity: 'legendary',
    track: 'ib',
    text: 'Pitch book: 147 slides.\nClient reads: cover page.\nBills: $2M.\nThis is fine. 🔥🐶🔥',
    textDe: 'Pitch Book: 147 Folien.\nKunde liest: Deckblatt.\nRechnung: €2M.\nAlles gut. 🔥🐶🔥',
    emoji: '📚',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'ib-04',
    rarity: 'standard',
    track: 'ib',
    text: 'Expectation: "Wolf of Wall Street"\nReality: CTRL+C, CTRL+V, CTRL+S at 3am',
    textDe: 'Erwartung: "Wolf of Wall Street"\nRealität: STRG+C, STRG+V, STRG+S um 3 Uhr',
    emoji: '☕',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-05',
    rarity: 'rare',
    track: 'ib',
    text: 'Staffer: "Are you free this weekend?"\nMe: *visible confusion*\n"Free? What is free?"',
    textDe: 'Staffer: "Hast du am Wochenende Zeit?"\nIch: *sichtbare Verwirrung*\n"Zeit? Was ist Zeit?"',
    emoji: '📞',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'ib-06',
    rarity: 'standard',
    track: 'ib',
    text: '"It\'s not Comic Sans. It\'s Garamond 11."\n*Always has been* 🔫',
    textDe: '"Das ist nicht Comic Sans. Das ist Garamond 11."\n*War es schon immer* 🔫',
    emoji: '🔠',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-07',
    rarity: 'standard',
    track: 'ib',
    text: 'Excel crashed.\nAutosave: off.\n3 hours of work: gone.\nI\'m fine. Everything is fine.',
    textDe: 'Excel abgestürzt.\nAutoSpeichern: aus.\n3 Stunden Arbeit: weg.\nMir geht\'s gut. Alles gut.',
    emoji: '💾',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-08',
    rarity: 'standard',
    track: 'ib',
    text: 'Adjusted EBITDA =\nReal EBITDA\n+ hopes\n+ dreams\n+ "one-time" costs (recurring annually)',
    textDe: 'Adjusted EBITDA =\nEchtes EBITDA\n+ Hoffnung\n+ Träume\n+ "einmalige" Kosten (jährlich wiederkehrend)',
    emoji: '✨',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-09',
    rarity: 'standard',
    track: 'ib',
    text: 'Drake meme:\n❌ Work-Life-Balance\n✅ Work-Work-Balance',
    textDe: 'Drake Meme:\n❌ Work-Life-Balance\n✅ Work-Work-Balance',
    emoji: '🎵',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-10',
    rarity: 'rare',
    track: 'ib',
    text: 'The deal closes.\nThe closing dinner begins.\nMD orders the Wagyu.\nAnalyst eats breadsticks.\n🥂',
    textDe: 'Der Deal schließt.\nDas Closing Dinner beginnt.\nMD bestellt Wagyu.\nAnalyst isst Brotstangen.\n🥂',
    emoji: '🥂',
    dropRate: RARITY_DROP_RATE.rare,
  },

  // ============================================================
  // CONSULTING (10)
  // ============================================================
  {
    id: 'cons-01',
    rarity: 'standard',
    track: 'consulting',
    text: 'Interviewer: "How many golf balls fit in a school bus?"\nMe: "It depends."\n*gets hired*',
    textDe: 'Interviewer: "Wie viele Golfbälle passen in einen Bus?"\nIch: "Es kommt darauf an."\n*wird eingestellt*',
    emoji: '🔍',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-02',
    rarity: 'rare',
    track: 'consulting',
    text: 'POV: You just said "synergies" for the 47th time today and the client is nodding along',
    textDe: 'POV: Du hast gerade zum 47. Mal "Synergien" gesagt und der Kunde nickt zustimmend',
    emoji: '✅',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'cons-03',
    rarity: 'legendary',
    track: 'consulting',
    text: 'Client: "We know the problem."\nMcKinsey: *charges €2M to confirm*\nClient: "Yes that\'s what we said."\nMcKinsey: "That\'ll be another €500K."',
    textDe: 'Kunde: "Wir kennen das Problem."\nMcKinsey: *berechnet €2M zur Bestätigung*\nKunde: "Ja, das haben wir gesagt."\nMcKinsey: "Das macht nochmal €500K."',
    emoji: '💸',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'cons-04',
    rarity: 'standard',
    track: 'consulting',
    text: 'My brain at 3am:\n*structured framework intensifies*\n"What if life was a 2x2 matrix?"',
    textDe: 'Mein Gehirn um 3 Uhr nachts:\n*strukturiertes Framework intensiviert sich*\n"Was wäre wenn das Leben eine 2x2-Matrix wäre?"',
    emoji: '🧠',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-05',
    rarity: 'rare',
    track: 'consulting',
    text: 'First day at MBB:\n"Here\'s your laptop."\n"Here\'s your Marriott Bonvoy card."\n"Here\'s your will to live. You won\'t need it."',
    textDe: 'Erster Tag bei MBB:\n"Hier ist dein Laptop."\n"Hier ist deine Marriott Bonvoy Karte."\n"Hier ist dein Lebenswille. Brauchst du nicht."',
    emoji: '🏨',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'cons-06',
    rarity: 'standard',
    track: 'consulting',
    text: '"Let\'s take this offline."\nTranslation: We will literally never speak of this again.',
    textDe: '"Lass uns das offline besprechen."\nÜbersetzung: Wir werden buchstäblich nie wieder darüber reden.',
    emoji: '🔄',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-07',
    rarity: 'standard',
    track: 'consulting',
    text: 'PowerPoint at 2am. ✅\nAnimations at 3am. ✅\nExistential crisis at 4am. ✅\nClient cancels meeting. ✅',
    textDe: 'PowerPoint um 2 Uhr. ✅\nAnimationen um 3 Uhr. ✅\nSinnkrise um 4 Uhr. ✅\nKunde sagt Meeting ab. ✅',
    emoji: '🎞️',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-08',
    rarity: 'standard',
    track: 'consulting',
    text: 'Drake meme:\n❌ Having a hypothesis and testing it\n✅ Making it up first, then proving it',
    textDe: 'Drake Meme:\n❌ Hypothese aufstellen und testen\n✅ Erst ausdenken, dann beweisen',
    emoji: '💡',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-09',
    rarity: 'standard',
    track: 'consulting',
    text: 'Every problem:\n→ put it in a 2x2\n→ label the axes\n→ ???\n→ profit',
    textDe: 'Jedes Problem:\n→ in eine 2x2 Matrix packen\n→ Achsen beschriften\n→ ???\n→ Profit',
    emoji: '📊',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-10',
    rarity: 'rare',
    track: 'consulting',
    text: 'Me: *solves the case perfectly in the shower*\nAlso me in the actual interview: "Uhh... could you repeat the question?"',
    textDe: 'Ich: *löst den Case perfekt unter der Dusche*\nIch im echten Interview: "Ähh... können Sie die Frage wiederholen?"',
    emoji: '🚿',
    dropRate: RARITY_DROP_RATE.rare,
  },

  // ============================================================
  // PRIVATE EQUITY (5)
  // ============================================================
  {
    id: 'pe-01',
    rarity: 'rare',
    track: 'pe',
    text: 'GP to LP: "Strong vintage year ahead."\nNarrator: It was not a strong vintage year.',
    textDe: 'GP zum LP: "Starkes Vintage-Jahr voraus."\nErzähler: Es war kein starkes Vintage-Jahr.',
    emoji: '🍷',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'pe-02',
    rarity: 'legendary',
    track: 'pe',
    text: '"The IRR looks amazing!"\n*ignores J-curve*\n*ignores denominator effect*\n*ignores everything*\n"Ship it." 📉➡️📈',
    textDe: '"Die IRR sieht fantastisch aus!"\n*ignoriert J-Kurve*\n*ignoriert Denominator-Effekt*\n*ignoriert alles*\n"Rausschicken." 📉➡️📈',
    emoji: '📈',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'pe-03',
    rarity: 'rare',
    track: 'pe',
    text: 'Day 1: "We believe in the management team."\nDay 100: *replaces entire C-suite*\n"We believe in the NEW management team."',
    textDe: 'Tag 1: "Wir glauben an das Management."\nTag 100: *tauscht komplette C-Suite aus*\n"Wir glauben an das NEUE Management."',
    emoji: '🪓',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'pe-04',
    rarity: 'standard',
    track: 'pe',
    text: 'Dry powder: €200B\nDeals at fair price: 0\nMe: "So you\'re saying there\'s a chance?"',
    textDe: 'Dry Powder: €200 Mrd.\nDeals zu fairen Preisen: 0\nIch: "Also sagen Sie, es gibt eine Chance?"',
    emoji: '💰',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'pe-05',
    rarity: 'standard',
    track: 'pe',
    text: 'The carry waterfall:\nbeautiful on the slide,\nbeautiful on paper,\nbeautiful in my dreams,\nnever in my bank account 💧',
    textDe: 'Der Carry-Wasserfall:\nwunderschön auf der Folie,\nwunderschön auf dem Papier,\nwunderschön in meinen Träumen,\nnie auf meinem Konto 💧',
    emoji: '💧',
    dropRate: RARITY_DROP_RATE.standard,
  },

  // ============================================================
  // VENTURE CAPITAL (5)
  // ============================================================
  {
    id: 'vc-01',
    rarity: 'standard',
    track: 'vc',
    text: '🦄 Unicorn spotted!\nRevenue: $0\nProduct: "coming soon"\nIdea: "it\'s like Uber but for dogs"\nValuation: $1B',
    textDe: '🦄 Einhorn gesichtet!\nUmsatz: €0\nProdukt: "kommt bald"\nIdee: "wie Uber aber für Hunde"\nBewertung: €1 Mrd.',
    emoji: '🦄',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'vc-02',
    rarity: 'legendary',
    track: 'vc',
    text: 'Series A: "We found product-market fit!"\nSeries B: *same slide deck*\nSeries C: *same slide deck*\nSeries D: "Trust the process."',
    textDe: 'Series A: "Wir haben Product-Market Fit!"\nSeries B: *gleiches Pitch Deck*\nSeries C: *gleiches Pitch Deck*\nSeries D: "Vertraut dem Prozess."',
    emoji: '🎤',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'vc-03',
    rarity: 'standard',
    track: 'vc',
    text: 'TAM: $1T\nSAM: $100B\nSOM: "we\'ll figure it out"\nActual revenue: $47',
    textDe: 'TAM: $1 Billion\nSAM: $100 Mrd.\nSOM: "kriegen wir hin"\nTatsächlicher Umsatz: €47',
    emoji: '🌍',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'vc-04',
    rarity: 'rare',
    track: 'vc',
    text: '"We\'re not pre-revenue.\nWe\'re pre-monetization.\nIt\'s completely different."\n*VC nods seriously*',
    textDe: '"Wir sind nicht pre-revenue.\nWir sind pre-monetarisiert.\nDas ist was komplett anderes."\n*VC nickt ernst*',
    emoji: '🚀',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'vc-05',
    rarity: 'standard',
    track: 'vc',
    text: 'Starter pack: VC Associate\n☑️ Patagonia vest\n☑️ "disrupting" in every sentence\n☑️ oat milk latte\n☑️ "let me loop in my partner"',
    textDe: 'Starter Pack: VC Associate\n☑️ Patagonia-Weste\n☑️ "disrupting" in jedem Satz\n☑️ Hafermilch-Latte\n☑️ "ich loop mal meinen Partner ein"',
    emoji: '🦺',
    dropRate: RARITY_DROP_RATE.standard,
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
  if (r < RARITY_DROP_RATE.standard) preferred = 'standard';
  else if (r < RARITY_DROP_RATE.standard + RARITY_DROP_RATE.rare) preferred = 'rare';
  else preferred = 'legendary';

  // Try in preferred order, then fall back to other rarities
  const order: MemeRarity[] = (['standard', 'rare', 'legendary'] as MemeRarity[]).sort(
    (a, b) => (a === preferred ? -1 : b === preferred ? 1 : 0),
  );

  for (const rarity of order) {
    const candidates = lockedMemes.filter((m) => m.rarity === rarity);
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  // Final fallback — any locked meme
  return lockedMemes[Math.floor(Math.random() * lockedMemes.length)];
}
