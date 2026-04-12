// ============================================================
// CareerDojo Meme Cards — collectible scratch cards
// Inspired by Hedgefonds Henning, Arbitrage Andy, Finance Bro Memes
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
  dropRate: number;
}

export const RARITY_DROP_RATE: Record<MemeRarity, number> = {
  standard: 0.6,
  rare: 0.3,
  legendary: 0.1,
};

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
// MEMES — 30 total (Hedgefonds Henning / Finance Bro style)
// ============================================================
export const MEMES: Meme[] = [
  // ============================================================
  // INVESTMENT BANKING (10)
  // ============================================================
  {
    id: 'ib-01',
    rarity: 'rare',
    track: 'ib',
    text: '"What do you do for a living?"\n"I make PowerPoints."\n"...for €120k?"',
    textDe: '"Was machst du beruflich?"\n"Ich mache PowerPoints."\n"...für 120k€?"',
    emoji: '💀',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'ib-02',
    rarity: 'standard',
    track: 'ib',
    text: 'Analyst um 3 Uhr morgens:\n"Das Modell geht nicht auf."\n\nDas Modell: eine einzige falsche Zellreferenz in Zeile 4.738',
    textDe: 'Analyst um 3 Uhr morgens:\n"Das Modell geht nicht auf."\n\nDas Modell: eine einzige falsche Zellreferenz in Zeile 4.738',
    emoji: '🧮',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-03',
    rarity: 'legendary',
    track: 'ib',
    text: 'MD: "Ich brauche das Pitch Book bis morgen früh."\nUhrzeit: 23:47\nSeiten: 0 von 84\nKaffee: leer\nWille zu leben: auch leer\n\n"Jawohl, kein Problem."',
    textDe: 'MD: "Ich brauche das Pitch Book bis morgen früh."\nUhrzeit: 23:47\nSeiten: 0 von 84\nKaffee: leer\nWille zu leben: auch leer\n\n"Jawohl, kein Problem."',
    emoji: '📚',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'ib-04',
    rarity: 'standard',
    track: 'ib',
    text: 'Tinder Date: "And what do you do on weekends?"\nIBanker: "Weekends?"',
    textDe: 'Tinder Date: "Und was machst du am Wochenende?"\nIBanker: "Wochenende?"',
    emoji: '💔',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-05',
    rarity: 'rare',
    track: 'ib',
    text: 'Mein Konto: +8.000€ Gehalt\nMein Konto 2 Tage später: -47€\n\nUber Eats wenn man 14h im Büro ist trifft anders',
    textDe: 'Mein Konto: +8.000€ Gehalt\nMein Konto 2 Tage später: -47€\n\nUber Eats wenn man 14h im Büro ist trifft anders',
    emoji: '💸',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'ib-06',
    rarity: 'standard',
    track: 'ib',
    text: 'Adjusted EBITDA be like:\nEchtes EBITDA: 2M\n+ CEO Gehalt rausrechnen\n+ "einmalige" Kosten (seit 5 Jahren)\n+ Wetter war schlecht\n\n= 15M EBITDA 📈',
    textDe: 'Adjusted EBITDA be like:\nEchtes EBITDA: 2M\n+ CEO Gehalt rausrechnen\n+ "einmalige" Kosten (seit 5 Jahren)\n+ Wetter war schlecht\n\n= 15M EBITDA 📈',
    emoji: '✨',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-07',
    rarity: 'standard',
    track: 'ib',
    text: 'Expectation: Wolf of Wall Street 🐺\nReality: Wolf of Microsoft Excel 🐺📊',
    textDe: 'Erwartung: Wolf of Wall Street 🐺\nRealität: Wolf of Microsoft Excel 🐺📊',
    emoji: '🐺',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-08',
    rarity: 'standard',
    track: 'ib',
    text: '"Bro ich hab Goldman"\n"Nice! Was machst du da?"\n"Ich formatiere Tabellen in Garamond 11 und weine."',
    textDe: '"Bro ich hab Goldman"\n"Nice! Was machst du da?"\n"Ich formatiere Tabellen in Garamond 11 und weine."',
    emoji: '🔠',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-09',
    rarity: 'standard',
    track: 'ib',
    text: 'Staffer: "Hast du Kapazität?"\n\nÜbersetzung: "Du hast Kapazität."',
    textDe: 'Staffer: "Hast du Kapazität?"\n\nÜbersetzung: "Du hast Kapazität."',
    emoji: '📞',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'ib-10',
    rarity: 'rare',
    track: 'ib',
    text: 'Closing Dinner:\nMD: Wagyu, Château Margaux\nVP: Steak, guter Wein\nAssociate: was der VP bestellt\nAnalyst: Brot und Wasser\n\nRechnung: 4.700€\n"Geht auf die Firma" 🥂',
    textDe: 'Closing Dinner:\nMD: Wagyu, Château Margaux\nVP: Steak, guter Wein\nAssociate: was der VP bestellt\nAnalyst: Brot und Wasser\n\nRechnung: 4.700€\n"Geht auf die Firma" 🥂',
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
    text: '"Wie viele Friseure gibt es in München?"\n"Es kommt darauf an."\n\nFertig. Eingestellt. 130k. Nächste Frage.',
    textDe: '"Wie viele Friseure gibt es in München?"\n"Es kommt darauf an."\n\nFertig. Eingestellt. 130k. Nächste Frage.',
    emoji: '💇',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-02',
    rarity: 'rare',
    track: 'consulting',
    text: 'Ich bei McKinsey:\nKunde: "Wir wissen was das Problem ist."\nIch: *2M€ Rechnung schreiben*\n"Ja, das sehe ich auch so."',
    textDe: 'Ich bei McKinsey:\nKunde: "Wir wissen was das Problem ist."\nIch: *2M€ Rechnung schreiben*\n"Ja, das sehe ich auch so."',
    emoji: '💰',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'cons-03',
    rarity: 'legendary',
    track: 'consulting',
    text: 'Montag: Flughafen\nDienstag: Kundensite\nMittwoch: Kundensite\nDonnerstag: Flughafen\nFreitag: "Working from home"\n\nMarriott Bonvoy Status: Titanium\nBeziehungsstatus: kompliziert\nKontakt zur Realität: verloren',
    textDe: 'Montag: Flughafen\nDienstag: Kundensite\nMittwoch: Kundensite\nDonnerstag: Flughafen\nFreitag: "Working from home"\n\nMarriott Bonvoy Status: Titanium\nBeziehungsstatus: kompliziert\nKontakt zur Realität: verloren',
    emoji: '✈️',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'cons-04',
    rarity: 'standard',
    track: 'consulting',
    text: '"Lass uns das offline besprechen"\n\nÜbersetzung: Wir werden nie wieder darüber reden. Niemals.',
    textDe: '"Lass uns das offline besprechen"\n\nÜbersetzung: Wir werden nie wieder darüber reden. Niemals.',
    emoji: '🔇',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-05',
    rarity: 'rare',
    track: 'consulting',
    text: 'Case Interview Prep:\nTag 1: "Ich strukturiere jetzt alles"\nTag 30: "Ich strukturiere meinen Kühlschrank"\nTag 60: "Ich hab meinem Date ein Framework erklärt"\nTag 90: "Ich habe keine Freunde mehr"',
    textDe: 'Case Interview Prep:\nTag 1: "Ich strukturiere jetzt alles"\nTag 30: "Ich strukturiere meinen Kühlschrank"\nTag 60: "Ich hab meinem Date ein Framework erklärt"\nTag 90: "Ich habe keine Freunde mehr"',
    emoji: '🧠',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'cons-06',
    rarity: 'standard',
    track: 'consulting',
    text: 'Jedes Problem auf dieser Welt:\n→ 2x2 Matrix\n→ Achsen beschriften\n→ "rechts oben ist gut"\n→ Rechnung: 500k€',
    textDe: 'Jedes Problem auf dieser Welt:\n→ 2x2 Matrix\n→ Achsen beschriften\n→ "rechts oben ist gut"\n→ Rechnung: 500k€',
    emoji: '📊',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-07',
    rarity: 'standard',
    track: 'consulting',
    text: 'Slide um 2 Uhr fertig ✅\nAnimationen um 3 Uhr ✅\nSinnkrise um 4 Uhr ✅\nKunde sagt Meeting ab um 8 Uhr ✅\n\nAlles für die Karriere.',
    textDe: 'Slide um 2 Uhr fertig ✅\nAnimationen um 3 Uhr ✅\nSinnkrise um 4 Uhr ✅\nKunde sagt Meeting ab um 8 Uhr ✅\n\nAlles für die Karriere.',
    emoji: '🎞️',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-08',
    rarity: 'standard',
    track: 'consulting',
    text: 'Hypothesengetrieben arbeiten:\n\nSchritt 1: Ergebnis ausdenken\nSchritt 2: Daten finden die dazu passen\nSchritt 3: "Data-Driven" draufschreiben',
    textDe: 'Hypothesengetrieben arbeiten:\n\nSchritt 1: Ergebnis ausdenken\nSchritt 2: Daten finden die dazu passen\nSchritt 3: "Data-Driven" draufschreiben',
    emoji: '💡',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-09',
    rarity: 'standard',
    track: 'consulting',
    text: 'Ich unter der Dusche:\n*löst den Case perfekt*\n*strukturiert, MECE, Empfehlung*\n\nIch im echten Interview:\n"Ähh... können Sie die Frage wiederholen?"',
    textDe: 'Ich unter der Dusche:\n*löst den Case perfekt*\n*strukturiert, MECE, Empfehlung*\n\nIch im echten Interview:\n"Ähh... können Sie die Frage wiederholen?"',
    emoji: '🚿',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'cons-10',
    rarity: 'rare',
    track: 'consulting',
    text: 'LinkedIn Profil: "Strategy Consultant bei MBB"\n\nRealität: Ich mache Excel-Tabellen im Marriott und esse Room Service für 47€ weil ich zu müde bin rauszugehen',
    textDe: 'LinkedIn Profil: "Strategy Consultant bei MBB"\n\nRealität: Ich mache Excel-Tabellen im Marriott und esse Room Service für 47€ weil ich zu müde bin rauszugehen',
    emoji: '🏨',
    dropRate: RARITY_DROP_RATE.rare,
  },

  // ============================================================
  // PRIVATE EQUITY (5)
  // ============================================================
  {
    id: 'pe-01',
    rarity: 'rare',
    track: 'pe',
    text: 'PE Partner zum LP:\n"Starkes Vintage-Jahr!"\n"Exzellente Pipeline!"\n"Top-Quartile Performance!"\n\n*IRR: 3%*',
    textDe: 'PE Partner zum LP:\n"Starkes Vintage-Jahr!"\n"Exzellente Pipeline!"\n"Top-Quartile Performance!"\n\n*IRR: 3%*',
    emoji: '🍷',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'pe-02',
    rarity: 'legendary',
    track: 'pe',
    text: 'PE Playbook:\nTag 1: "Wir glauben an das Management"\nTag 30: CEO gefeuert\nTag 60: CFO gefeuert\nTag 90: neues Management\nTag 120: "Wir glauben an das neue Management"\nTag 365: Dividenden-Recap\n\n*chef\'s kiss* 🤌',
    textDe: 'PE Playbook:\nTag 1: "Wir glauben an das Management"\nTag 30: CEO gefeuert\nTag 60: CFO gefeuert\nTag 90: neues Management\nTag 120: "Wir glauben an das neue Management"\nTag 365: Dividenden-Recap\n\n*chef\'s kiss* 🤌',
    emoji: '🤌',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'pe-03',
    rarity: 'rare',
    track: 'pe',
    text: '"Wie hoch ist eure IRR?"\n"27%"\n"Und ohne die J-Curve?"\n"..."\n"Und auf Cash-Basis?"\n"...nächste Frage bitte"',
    textDe: '"Wie hoch ist eure IRR?"\n"27%"\n"Und ohne die J-Curve?"\n"..."\n"Und auf Cash-Basis?"\n"...nächste Frage bitte"',
    emoji: '📈',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'pe-04',
    rarity: 'standard',
    track: 'pe',
    text: 'Dry Powder weltweit: $2.5 Billionen\nDeals zu fairen Preisen: 0\n\n"Wir bleiben diszipliniert"\n*kauft bei 14x EBITDA*',
    textDe: 'Dry Powder weltweit: $2,5 Billionen\nDeals zu fairen Preisen: 0\n\n"Wir bleiben diszipliniert"\n*kauft bei 14x EBITDA*',
    emoji: '💰',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'pe-05',
    rarity: 'standard',
    track: 'pe',
    text: 'Carry Waterfall:\nSchön auf der Folie ✅\nSchön auf dem Papier ✅\nSchön in meinen Träumen ✅\nAuf meinem Konto ❌\n\n*cries in J-Curve*',
    textDe: 'Carry Waterfall:\nSchön auf der Folie ✅\nSchön auf dem Papier ✅\nSchön in meinen Träumen ✅\nAuf meinem Konto ❌\n\n*weint in J-Curve*',
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
    text: 'Startup Pitch:\nUmsatz: 0€\nProdukt: gibt es nicht\nTeam: 2 BWL-Studenten\nIdee: "Uber für Hunde"\n\nBewertung: 50M€\nVC: "Ich bin dabei." 🤝',
    textDe: 'Startup Pitch:\nUmsatz: 0€\nProdukt: gibt es nicht\nTeam: 2 BWL-Studenten\nIdee: "Uber für Hunde"\n\nBewertung: 50M€\nVC: "Ich bin dabei." 🤝',
    emoji: '🦄',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'vc-02',
    rarity: 'legendary',
    track: 'vc',
    text: 'Series A Pitch Deck: 🔥\nSeries B Pitch Deck: exakt das gleiche\nSeries C Pitch Deck: exakt das gleiche\nIPO Prospectus: exakt das gleiche aber in Times New Roman\n\nVC: "Die Story ist konsistent" ✅',
    textDe: 'Series A Pitch Deck: 🔥\nSeries B Pitch Deck: exakt das gleiche\nSeries C Pitch Deck: exakt das gleiche\nIPO Prospectus: exakt das gleiche aber in Times New Roman\n\nVC: "Die Story ist konsistent" ✅',
    emoji: '🎤',
    dropRate: RARITY_DROP_RATE.legendary,
  },
  {
    id: 'vc-03',
    rarity: 'standard',
    track: 'vc',
    text: 'TAM: $1 Billion\nSAM: $100 Mrd.\nSOM: "kriegen wir schon hin"\nTatsächlicher Umsatz: 47€\n\n"Wir sind pre-revenue, nicht pre-ambition"',
    textDe: 'TAM: $1 Billion\nSAM: $100 Mrd.\nSOM: "kriegen wir schon hin"\nTatsächlicher Umsatz: 47€\n\n"Wir sind pre-revenue, nicht pre-ambition"',
    emoji: '🌍',
    dropRate: RARITY_DROP_RATE.standard,
  },
  {
    id: 'vc-04',
    rarity: 'rare',
    track: 'vc',
    text: 'VC Associate Starter Pack:\n☑️ Patagonia-Weste\n☑️ AirPods Max\n☑️ "Disruption" in jedem Satz\n☑️ Hafermilch-Flat-White\n☑️ LinkedIn Posts mit 🚀\n☑️ "Ich investiere in People"',
    textDe: 'VC Associate Starter Pack:\n☑️ Patagonia-Weste\n☑️ AirPods Max\n☑️ "Disruption" in jedem Satz\n☑️ Hafermilch-Flat-White\n☑️ LinkedIn Posts mit 🚀\n☑️ "Ich investiere in People"',
    emoji: '🦺',
    dropRate: RARITY_DROP_RATE.rare,
  },
  {
    id: 'vc-05',
    rarity: 'standard',
    track: 'vc',
    text: 'Gründer: "Wir sind nicht pre-revenue."\nVC: "Ah ok, wie viel Umsatz?"\nGründer: "Wir sind pre-monetization."\nVC: "...also pre-revenue?"\nGründer: "Das ist was komplett anderes."',
    textDe: 'Gründer: "Wir sind nicht pre-revenue."\nVC: "Ah ok, wie viel Umsatz?"\nGründer: "Wir sind pre-monetization."\nVC: "...also pre-revenue?"\nGründer: "Das ist was komplett anderes."',
    emoji: '🚀',
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
 */
export function rollMeme(
  track: string,
  unlockedIds: string[],
): Meme | null {
  const trackMemes = getMemesForTrack(track);
  const lockedMemes = trackMemes.filter((m) => !unlockedIds.includes(m.id));
  if (lockedMemes.length === 0) return null;

  const r = Math.random();
  let preferred: MemeRarity;
  if (r < RARITY_DROP_RATE.standard) preferred = 'standard';
  else if (r < RARITY_DROP_RATE.standard + RARITY_DROP_RATE.rare) preferred = 'rare';
  else preferred = 'legendary';

  const order: MemeRarity[] = (['standard', 'rare', 'legendary'] as MemeRarity[]).sort(
    (a, b) => (a === preferred ? -1 : b === preferred ? 1 : 0),
  );

  for (const rarity of order) {
    const candidates = lockedMemes.filter((m) => m.rarity === rarity);
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  return lockedMemes[Math.floor(Math.random() * lockedMemes.length)];
}
