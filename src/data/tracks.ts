// ============================================================
// Track definitions — Duolingo-style "language" selection
// ============================================================

export interface TrackInfo {
  id: string;
  title: string;
  titleDe: string;
  subtitle: string;
  subtitleDe: string;
  description: string;
  descriptionDe: string;
  icon: string;
  characterEmoji: string;
  characterName: string;
  color: string;
  bgGradient: string;
  available: boolean;
  comingSoon?: boolean;
  lessonCount: number;
}

export const TRACKS: TrackInfo[] = [
  {
    id: 'ib',
    title: 'Investment Banking',
    titleDe: 'Investment Banking',
    subtitle: 'M&A, Valuation, Financial Modeling',
    subtitleDe: 'M&A, Bewertung, Financial Modeling',
    description: 'From accounting basics to advanced deal analysis. Master everything you need for IB interviews at Goldman, JPM, or boutique banks.',
    descriptionDe: 'Von Buchhaltungsgrundlagen bis zur Deal-Analyse. Meistere alles, was du für IB-Interviews bei Goldman, JPM oder Boutique-Banken brauchst.',
    icon: '🏦',
    characterEmoji: '🐺',
    characterName: 'Wolfgang der Wolf',
    color: '#1CB0F6',
    bgGradient: 'from-blue-600 to-cyan-500',
    available: true,
    lessonCount: 17,
  },
  {
    id: 'pe',
    title: 'Private Equity',
    titleDe: 'Private Equity',
    subtitle: 'LBO, Portfolio Management, Value Creation',
    subtitleDe: 'LBO, Portfolio Management, Wertschöpfung',
    description: 'Learn how PE firms buy, improve, and sell companies. From LBO mechanics to due diligence and value creation plans.',
    descriptionDe: 'Lerne wie PE-Firmen Unternehmen kaufen, verbessern und verkaufen. Von LBO-Mechanik bis Due Diligence und Wertschöpfungspläne.',
    icon: '🦗',
    characterEmoji: '🦗',
    characterName: 'Lenny die Heuschrecke',
    color: '#58CC02',
    bgGradient: 'from-green-600 to-emerald-500',
    available: true,
    comingSoon: false,
    lessonCount: 8,
  },
  {
    id: 'vc',
    title: 'Venture Capital',
    titleDe: 'Venture Capital',
    subtitle: 'Startups, Pitch Decks, Cap Tables',
    subtitleDe: 'Startups, Pitch Decks, Cap Tables',
    description: 'From seed to Series C: Learn how VCs evaluate startups, structure deals, and build portfolios. Includes cap table math and term sheets.',
    descriptionDe: 'Von Seed bis Series C: Lerne wie VCs Startups bewerten, Deals strukturieren und Portfolios aufbauen. Inkl. Cap-Table-Mathe und Term Sheets.',
    icon: '🦄',
    characterEmoji: '🦄',
    characterName: 'Uri das Einhorn',
    color: '#CE82FF',
    bgGradient: 'from-purple-600 to-pink-500',
    available: true,
    comingSoon: false,
    lessonCount: 6,
  },
  {
    id: 'consulting',
    title: 'Management Consulting',
    titleDe: 'Unternehmensberatung',
    subtitle: 'Cases, Frameworks, Market Sizing',
    subtitleDe: 'Cases, Frameworks, Market Sizing',
    description: 'Crack MBB-level case interviews. Master profitability, market entry, M&A cases, and structured problem solving.',
    descriptionDe: 'Knacke MBB-Level Case Interviews. Meistere Profitabilitäts-, Markteintritts-, M&A-Cases und strukturiertes Problemlösen.',
    icon: '🦉',
    characterEmoji: '🦉',
    characterName: 'Olivia die Eule',
    color: '#FF9600',
    bgGradient: 'from-orange-500 to-amber-500',
    available: true,
    comingSoon: false,
    lessonCount: 15,
  },
];

export function getTrackById(id: string): TrackInfo | undefined {
  return TRACKS.find(t => t.id === id);
}
