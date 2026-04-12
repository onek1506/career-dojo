// ============================================================
// CareerDojo — Glossary Database
// ============================================================
// Bilingual finance/consulting term definitions used by the
// GlossaryTooltip component and the /glossary page.
// Match is case-insensitive on both `term` and `termDe`.
// ============================================================

export type GlossaryTrack = 'ib' | 'consulting' | 'pe' | 'vc' | 'all';

export interface GlossaryTerm {
  id: string;
  term: string;
  termDe: string;
  definition: string;
  definitionDe: string;
  example: string;
  exampleDe: string;
  track: GlossaryTrack[];
  formula?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  // ============================================================
  // INVESTMENT BANKING (30)
  // ============================================================
  {
    id: 'ebitda',
    term: 'EBITDA',
    termDe: 'EBITDA',
    definition:
      'Earnings Before Interest, Taxes, Depreciation and Amortization. A proxy for operating cash flow before capital structure and accounting choices.',
    definitionDe:
      'Ergebnis vor Zinsen, Steuern und Abschreibungen. Näherungswert für den operativen Cashflow vor Kapitalstruktur- und Bilanzierungsentscheidungen.',
    example:
      'A company with €50M revenue and €10M EBITDA has a 20% EBITDA margin.',
    exampleDe:
      'Eine Firma mit €50M Umsatz und €10M EBITDA hat eine EBITDA-Marge von 20%.',
    track: ['ib', 'pe'],
    formula: 'EBITDA = EBIT + D&A',
  },
  {
    id: 'ev',
    term: 'Enterprise Value',
    termDe: 'Unternehmenswert (EV)',
    definition:
      'Total value of a company to all capital providers (debt + equity) minus cash. Independent of capital structure.',
    definitionDe:
      'Gesamtwert eines Unternehmens für alle Kapitalgeber (Fremd- und Eigenkapital) abzüglich Cash. Unabhängig von der Kapitalstruktur.',
    example: 'Equity Value €500M + Debt €200M − Cash €50M = EV €650M.',
    exampleDe: 'Equity Value €500M + Schulden €200M − Cash €50M = EV €650M.',
    track: ['ib', 'pe'],
    formula: 'EV = Equity Value + Debt − Cash + Minorities + Preferred',
  },
  {
    id: 'equity-value',
    term: 'Equity Value',
    termDe: 'Equity Value',
    definition:
      'The value of a company attributable only to common shareholders. Equal to share price × diluted shares outstanding for a public company.',
    definitionDe:
      'Wert eines Unternehmens, der ausschließlich den Stammaktionären zusteht. Für börsennotierte Firmen: Aktienkurs × voll verwässerte Anzahl Aktien.',
    example: '100M diluted shares × €50 share price = €5B equity value.',
    exampleDe: '100M verwässerte Aktien × €50 Aktienkurs = €5 Mrd. Equity Value.',
    track: ['ib', 'pe'],
  },
  {
    id: 'dcf',
    term: 'DCF',
    termDe: 'DCF',
    definition:
      'Discounted Cash Flow. Values a company by projecting future free cash flows and discounting them back to present value using WACC.',
    definitionDe:
      'Discounted Cash Flow. Bewertungsmethode: zukünftige Free Cash Flows werden mit dem WACC auf den heutigen Barwert abgezinst.',
    example:
      'A 5-year DCF projects UFCF, discounts it at 9% WACC, and adds a terminal value.',
    exampleDe:
      'Ein 5-Jahres-DCF projiziert UFCF, diskontiert mit 9% WACC und addiert einen Terminal Value.',
    track: ['ib', 'pe'],
    formula: 'EV = Σ (FCFₜ / (1+WACC)ᵗ) + TV / (1+WACC)ⁿ',
  },
  {
    id: 'wacc',
    term: 'WACC',
    termDe: 'WACC',
    definition:
      'Weighted Average Cost of Capital. The blended required return across debt and equity, used as the discount rate in a DCF.',
    definitionDe:
      'Gewichtete durchschnittliche Kapitalkosten. Mischkalkulation aus Eigen- und Fremdkapitalkosten, dient als Diskontierungssatz im DCF.',
    example:
      '60% equity at 10% cost + 40% debt at 5% after-tax = 8% WACC.',
    exampleDe:
      '60% Eigenkapital zu 10% + 40% Fremdkapital zu 5% nach Steuern = 8% WACC.',
    track: ['ib', 'pe'],
    formula: 'WACC = E/V × Re + D/V × Rd × (1−T)',
  },
  {
    id: 'beta',
    term: 'Beta',
    termDe: 'Beta',
    definition:
      'Measure of a stock\'s volatility relative to the market. Beta of 1 moves with the market; >1 is more volatile, <1 less.',
    definitionDe:
      'Maß für die Volatilität einer Aktie relativ zum Markt. Beta 1 bewegt sich mit dem Markt, >1 volatiler, <1 defensiver.',
    example: 'Tech stocks often have betas of 1.3–1.8, utilities around 0.5.',
    exampleDe: 'Tech-Aktien haben oft Betas von 1.3–1.8, Utilities um 0.5.',
    track: ['ib', 'pe'],
  },
  {
    id: 'terminal-value',
    term: 'Terminal Value',
    termDe: 'Terminal Value',
    definition:
      'The value of a business beyond the explicit forecast period in a DCF. Usually calculated via Gordon Growth or Exit Multiple method.',
    definitionDe:
      'Wert eines Unternehmens jenseits des expliziten Prognosezeitraums im DCF. Berechnung meist via Gordon Growth oder Exit Multiple.',
    example: 'FCF €100M × (1+2%) / (9%−2%) = €1.46B terminal value.',
    exampleDe: 'FCF €100M × (1+2%) / (9%−2%) = €1,46 Mrd. Terminal Value.',
    track: ['ib', 'pe'],
    formula: 'TV = FCFₙ₊₁ / (WACC − g)',
  },
  {
    id: 'lbo',
    term: 'LBO',
    termDe: 'LBO',
    definition:
      'Leveraged Buyout. Acquisition funded mostly with debt (60–80%), using the target\'s cash flows to pay it down.',
    definitionDe:
      'Leveraged Buyout. Übernahme, die hauptsächlich mit Fremdkapital (60–80%) finanziert wird und aus den Cashflows des Targets getilgt wird.',
    example:
      'A PE firm buys a €1B company with €300M equity and €700M debt.',
    exampleDe:
      'Ein PE-Fonds kauft eine €1 Mrd. Firma mit €300M Eigenkapital und €700M Debt.',
    track: ['ib', 'pe'],
  },
  {
    id: 'irr',
    term: 'IRR',
    termDe: 'IRR',
    definition:
      'Internal Rate of Return. The discount rate at which the NPV of an investment\'s cash flows equals zero. Used to compare PE/LBO returns.',
    definitionDe:
      'Interne Rendite. Der Diskontierungssatz, bei dem der NPV aller Cashflows einer Investition null ergibt. Standard-KPI für PE/LBO-Renditen.',
    example:
      'PE fund target: 20–25% IRR over a 5-year hold.',
    exampleDe:
      'PE-Fonds-Ziel: 20–25% IRR über eine 5-jährige Haltedauer.',
    track: ['ib', 'pe'],
  },
  {
    id: 'moic',
    term: 'MOIC',
    termDe: 'MOIC',
    definition:
      'Multiple on Invested Capital. Total value returned divided by capital invested. Ignores time, unlike IRR.',
    definitionDe:
      'Multiple of Invested Capital. Gesamter Rückfluss geteilt durch investiertes Kapital. Ignoriert die Zeitkomponente, im Gegensatz zum IRR.',
    example: '€200M invested, €600M returned → MOIC = 3.0x.',
    exampleDe: '€200M investiert, €600M zurück → MOIC = 3,0x.',
    track: ['ib', 'pe'],
    formula: 'MOIC = Total Value / Invested Capital',
  },
  {
    id: 'accretion-dilution',
    term: 'Accretion/Dilution',
    termDe: 'Accretion/Dilution',
    definition:
      'Analysis of whether an acquisition increases (accretive) or decreases (dilutive) the acquirer\'s pro-forma EPS.',
    definitionDe:
      'Analyse, ob eine Übernahme den pro-forma Gewinn pro Aktie (EPS) des Käufers erhöht (accretive) oder verringert (dilutive).',
    example:
      'Rule of thumb: deal is accretive if target P/E < acquirer P/E (all-stock).',
    exampleDe:
      'Daumenregel: Deal ist accretive, wenn Target-KGV < Käufer-KGV (reine Aktientransaktion).',
    track: ['ib'],
  },
  {
    id: 'fairness-opinion',
    term: 'Fairness Opinion',
    termDe: 'Fairness Opinion',
    definition:
      'A letter from an investment bank stating that an M&A deal price is fair from a financial point of view to shareholders.',
    definitionDe:
      'Schreiben einer Investmentbank, das bestätigt, dass ein M&A-Deal aus finanzieller Sicht fair für die Aktionäre ist.',
    example:
      'The board hired Goldman Sachs to issue a fairness opinion on the merger.',
    exampleDe:
      'Der Vorstand beauftragte Goldman Sachs mit einer Fairness Opinion zur Fusion.',
    track: ['ib'],
  },
  {
    id: 'staple-financing',
    term: 'Staple Financing',
    termDe: 'Staple Financing',
    definition:
      'Pre-arranged debt package offered by the seller\'s bank to potential buyers in an M&A auction, to speed up bidding.',
    definitionDe:
      'Vom Verkäufer-Bank vorab arrangiertes Finanzierungspaket, das potenziellen Käufern im M&A-Auktionsprozess angeboten wird.',
    example:
      'The seller\'s bank offered staple financing of 5x EBITDA to all bidders.',
    exampleDe:
      'Die Bank des Verkäufers bot allen Bietern Staple Financing von 5x EBITDA.',
    track: ['ib'],
  },
  {
    id: 'book-runner',
    term: 'Book Runner',
    termDe: 'Book Runner',
    definition:
      'The lead investment bank managing the order book during a securities offering (IPO, bond issue).',
    definitionDe:
      'Die federführende Investmentbank, die das Orderbuch während einer Wertpapieremission (IPO, Anleihe) verwaltet.',
    example:
      'Morgan Stanley was the lead book runner on the Facebook IPO.',
    exampleDe:
      'Morgan Stanley war Lead Book Runner beim Facebook-IPO.',
    track: ['ib'],
  },
  {
    id: 'bulge-bracket',
    term: 'Bulge Bracket',
    termDe: 'Bulge Bracket',
    definition:
      'The top tier of global investment banks: Goldman Sachs, Morgan Stanley, JPM, BofA, Citi, etc.',
    definitionDe:
      'Die oberste Liga globaler Investmentbanken: Goldman Sachs, Morgan Stanley, JPM, BofA, Citi etc.',
    example:
      'Bulge brackets dominate the largest M&A and ECM league tables.',
    exampleDe:
      'Bulge Brackets dominieren die größten M&A- und ECM-League-Tables.',
    track: ['ib'],
  },
  {
    id: 'tombstone',
    term: 'Tombstone',
    termDe: 'Tombstone',
    definition:
      'An announcement advertisement listing the transaction and banks involved. Still used as a trophy on bankers\' desks.',
    definitionDe:
      'Ankündigungsanzeige mit den Details einer Transaktion und den beteiligten Banken. Dient als Trophäe auf Banker-Schreibtischen.',
    example:
      'The MD proudly displayed the Google IPO tombstone on his desk.',
    exampleDe:
      'Der MD hatte den Google-IPO-Tombstone stolz auf dem Schreibtisch.',
    track: ['ib'],
  },
  {
    id: 'pitch-book',
    term: 'Pitch Book',
    termDe: 'Pitch Book',
    definition:
      'PowerPoint presentation used by bankers to pitch ideas to clients. Typical analyst time-killer.',
    definitionDe:
      'PowerPoint-Präsentation, mit der Banker Ideen bei Kunden vorstellen. Klassischer Analystenzeit-Fresser.',
    example:
      'The analyst spent 14 hours perfecting a 60-page pitch book.',
    exampleDe:
      'Der Analyst saß 14 Stunden an einem 60-seitigen Pitch Book.',
    track: ['ib'],
  },
  {
    id: 'cim',
    term: 'CIM',
    termDe: 'CIM',
    definition:
      'Confidential Information Memorandum. Detailed sale document describing a company being marketed in an M&A auction.',
    definitionDe:
      'Confidential Information Memorandum. Ausführliches Verkaufsdokument zu einem Unternehmen, das in einer M&A-Auktion vermarktet wird.',
    example:
      'The CIM contained 120 pages on strategy, financials, and management.',
    exampleDe:
      'Das CIM umfasste 120 Seiten zu Strategie, Finanzen und Management.',
    track: ['ib', 'pe'],
  },
  {
    id: 'loi',
    term: 'LOI',
    termDe: 'LOI',
    definition:
      'Letter of Intent. Non-binding document outlining the key terms of a proposed deal before definitive agreement.',
    definitionDe:
      'Letter of Intent. Unverbindliches Dokument, das die wichtigsten Eckpunkte eines geplanten Deals vor Vertragsabschluss festhält.',
    example:
      'The LOI set an exclusivity period of 60 days for due diligence.',
    exampleDe:
      'Der LOI setzte eine 60-tägige Exklusivitätsphase für die Due Diligence.',
    track: ['ib', 'pe'],
  },
  {
    id: 'nda',
    term: 'NDA',
    termDe: 'NDA',
    definition:
      'Non-Disclosure Agreement. Confidentiality contract signed before a target shares sensitive information with bidders.',
    definitionDe:
      'Non-Disclosure Agreement. Vertraulichkeitsvereinbarung, die unterzeichnet wird, bevor sensible Informationen mit Bietern geteilt werden.',
    example:
      'All bidders signed an NDA before receiving the CIM.',
    exampleDe:
      'Alle Bieter unterschrieben eine NDA, bevor sie das CIM erhielten.',
    track: ['ib', 'pe'],
  },
  {
    id: 'mac-clause',
    term: 'MAC Clause',
    termDe: 'MAC-Klausel',
    definition:
      'Material Adverse Change. Clause letting the buyer walk away if the target suffers a major negative event before closing.',
    definitionDe:
      'Material Adverse Change. Klausel, die dem Käufer erlaubt, vom Deal zurückzutreten, wenn das Target vor Closing ein großes negatives Ereignis erleidet.',
    example:
      'COVID-19 triggered MAC-clause disputes in several 2020 deals.',
    exampleDe:
      'COVID-19 löste 2020 in mehreren Deals MAC-Klausel-Streitigkeiten aus.',
    track: ['ib', 'pe'],
  },
  {
    id: 'reps-warranties',
    term: 'Reps & Warranties',
    termDe: 'Reps & Warranties',
    definition:
      'Representations and Warranties: the seller\'s formal statements about the business in the purchase agreement (finances, taxes, IP, etc.).',
    definitionDe:
      'Zusicherungen und Gewährleistungen des Verkäufers im Kaufvertrag zu Zustand des Unternehmens (Finanzen, Steuern, IP etc.).',
    example:
      'The seller provided R&W insurance to cover post-closing claims.',
    exampleDe:
      'Der Verkäufer schloss eine R&W-Versicherung für Post-Closing-Ansprüche ab.',
    track: ['ib', 'pe'],
  },
  {
    id: 'escrow',
    term: 'Escrow',
    termDe: 'Escrow',
    definition:
      'Portion of the purchase price held by a third party post-closing to cover potential indemnification claims.',
    definitionDe:
      'Teil des Kaufpreises, der nach Closing von einem Treuhänder gehalten wird, um mögliche Gewährleistungsansprüche abzudecken.',
    example:
      '10% of the purchase price sat in escrow for 18 months.',
    exampleDe:
      '10% des Kaufpreises blieben 18 Monate im Escrow.',
    track: ['ib', 'pe'],
  },
  {
    id: 'earnout',
    term: 'Earnout',
    termDe: 'Earnout',
    definition:
      'Portion of the purchase price contingent on the target hitting post-closing financial milestones.',
    definitionDe:
      'Teil des Kaufpreises, der daran gekoppelt ist, dass das Target nach Closing bestimmte Finanzziele erreicht.',
    example:
      '€50M upfront + up to €20M earnout if EBITDA grows 15% p.a.',
    exampleDe:
      '€50M sofort + bis zu €20M Earnout, wenn EBITDA p.a. 15% wächst.',
    track: ['ib', 'pe'],
  },
  {
    id: 'break-fee',
    term: 'Break Fee',
    termDe: 'Break Fee',
    definition:
      'Penalty one party pays to the other if they walk away from a signed deal. Typically 1–3% of deal value.',
    definitionDe:
      'Strafzahlung einer Partei an die andere, falls sie von einem unterschriebenen Deal zurücktritt. Üblich: 1–3% des Dealvolumens.',
    example:
      'AT&T paid $4B break fee to T-Mobile when the 2011 deal collapsed.',
    exampleDe:
      'AT&T zahlte $4 Mrd. Break Fee an T-Mobile, als der Deal 2011 scheiterte.',
    track: ['ib'],
  },
  {
    id: 'trading-comps',
    term: 'Trading Comps',
    termDe: 'Trading Comps',
    definition:
      'Comparable Company Analysis. Valuation method using trading multiples of publicly traded peers.',
    definitionDe:
      'Vergleichsanalyse börsennotierter Peers. Bewertung über Trading-Multiples öffentlich gehandelter Wettbewerber.',
    example:
      'Peers trade at 12x EV/EBITDA → implied EV = €10M × 12 = €120M.',
    exampleDe:
      'Peers handeln zu 12x EV/EBITDA → impliziter EV = €10M × 12 = €120M.',
    track: ['ib', 'pe'],
  },
  {
    id: 'precedent-transactions',
    term: 'Precedent Transactions',
    termDe: 'Precedent Transactions',
    definition:
      'Valuation method based on multiples paid in past M&A deals of similar companies. Usually yields higher values than trading comps due to control premium.',
    definitionDe:
      'Bewertung über Multiples aus vergangenen M&A-Deals vergleichbarer Unternehmen. Meist höhere Werte als Trading Comps wegen Kontrollprämie.',
    example:
      'Recent deals in SaaS closed at 8–12x revenue vs. trading comps at 6x.',
    exampleDe:
      'SaaS-Deals der letzten Zeit lagen bei 8–12x Umsatz vs. Trading Comps bei 6x.',
    track: ['ib', 'pe'],
  },
  {
    id: 'football-field',
    term: 'Football Field',
    termDe: 'Football Field',
    definition:
      'Bar chart showing valuation ranges from multiple methodologies (DCF, comps, precedents, LBO) side by side.',
    definitionDe:
      'Balkendiagramm, das Bewertungsspannen verschiedener Methoden (DCF, Comps, Precedents, LBO) nebeneinander darstellt.',
    example:
      'The football field showed a valuation range of €450M–€620M.',
    exampleDe:
      'Das Football Field zeigte eine Bewertungsspanne von €450M–€620M.',
    track: ['ib'],
  },
  {
    id: 'waterfall',
    term: 'Waterfall',
    termDe: 'Waterfall',
    definition:
      'Schedule showing how exit proceeds flow through the capital stack: debt first, preferred, then common equity.',
    definitionDe:
      'Darstellung, wie Exit-Erlöse durch die Kapitalstruktur fließen: zuerst Fremdkapital, dann Preferred, zuletzt Common Equity.',
    example:
      'Senior debt gets €200M, mezzanine €50M, equity gets the rest.',
    exampleDe:
      'Senior Debt erhält €200M, Mezzanine €50M, Equity den Rest.',
    track: ['ib', 'pe'],
  },
  {
    id: 'cap-table',
    term: 'Cap Table',
    termDe: 'Cap Table',
    definition:
      'Spreadsheet showing all securities issued by a company and who owns them, including options and convertibles.',
    definitionDe:
      'Tabelle mit allen ausgegebenen Wertpapieren eines Unternehmens und deren Eignern, inklusive Optionen und Wandelanleihen.',
    example:
      'After Series B: founders 45%, VCs 35%, employee pool 15%, angels 5%.',
    exampleDe:
      'Nach Series B: Gründer 45%, VCs 35%, Mitarbeiterpool 15%, Angels 5%.',
    track: ['ib', 'vc', 'pe'],
  },

  // ============================================================
  // CONSULTING (20)
  // ============================================================
  {
    id: 'mece',
    term: 'MECE',
    termDe: 'MECE',
    definition:
      'Mutually Exclusive, Collectively Exhaustive. Framework principle: buckets don\'t overlap and together cover everything.',
    definitionDe:
      'Mutually Exclusive, Collectively Exhaustive. Strukturprinzip: Buckets überschneiden sich nicht und decken zusammen alles ab.',
    example:
      'Splitting revenue by "Price × Volume" is MECE; by "Online vs. Premium" is not.',
    exampleDe:
      'Umsatz nach "Preis × Menge" ist MECE; nach "Online vs. Premium" nicht.',
    track: ['consulting'],
  },
  {
    id: 'scqa',
    term: 'SCQA',
    termDe: 'SCQA',
    definition:
      'Situation–Complication–Question–Answer. Minto\'s storytelling framework for structuring executive communication.',
    definitionDe:
      'Situation–Complication–Question–Answer. Mintos Storytelling-Framework zur Strukturierung von Top-Management-Kommunikation.',
    example:
      '"We grew 20% (S). Now growth stalls (C). Why? (Q) Because… (A)"',
    exampleDe:
      '"Wir wuchsen 20% (S). Jetzt stagniert Wachstum (C). Warum? (F) Weil… (A)"',
    track: ['consulting'],
  },
  {
    id: 'issue-tree',
    term: 'Issue Tree',
    termDe: 'Issue Tree',
    definition:
      'Hierarchical breakdown of a problem into MECE sub-issues. Core tool in case interviews.',
    definitionDe:
      'Hierarchische Zerlegung eines Problems in MECE-Teilprobleme. Kernwerkzeug in Case Interviews.',
    example:
      'Profit drop → Revenue branch vs. Cost branch → further subdivided.',
    exampleDe:
      'Gewinnrückgang → Umsatz-Ast vs. Kosten-Ast → weiter unterteilt.',
    track: ['consulting'],
  },
  {
    id: 'hypothesis-driven',
    term: 'Hypothesis-driven',
    termDe: 'Hypothesen-getrieben',
    definition:
      'Approach where consultants start with a guess ("the answer is probably X") and test it with data. The McKinsey way.',
    definitionDe:
      'Ansatz, bei dem Berater mit einer Vermutung ("die Antwort ist wahrscheinlich X") starten und sie mit Daten validieren. Die McKinsey-Methode.',
    example:
      '"Hypothesis: Margin decline is driven by raw-material costs." Then test it.',
    exampleDe:
      '"Hypothese: Margenrückgang wird durch Rohstoffkosten getrieben." Dann testen.',
    track: ['consulting'],
  },
  {
    id: 'so-what-test',
    term: 'So-What Test',
    termDe: 'So-What Test',
    definition:
      'Self-check: after every slide or insight, ask "so what?" to make sure it drives action.',
    definitionDe:
      'Selbstcheck: frage nach jeder Folie oder Erkenntnis "und was bedeutet das?", um sicherzustellen, dass Handlung abgeleitet wird.',
    example:
      '"Revenue grew 5%" fails; "Revenue grew 5% but margin fell, so cut costs" passes.',
    exampleDe:
      '"Umsatz +5%" fällt durch; "Umsatz +5%, aber Marge sinkt, also Kosten senken" besteht.',
    track: ['consulting'],
  },
  {
    id: 'pyramid-principle',
    term: 'Pyramid Principle',
    termDe: 'Pyramidenprinzip',
    definition:
      'Barbara Minto\'s structure: start with the answer, then supporting arguments, then data. Top-down communication.',
    definitionDe:
      'Barbara Mintos Struktur: zuerst die Kernaussage, dann stützende Argumente, dann Daten. Top-Down-Kommunikation.',
    example:
      'Start the exec summary with the recommendation, not the problem.',
    exampleDe:
      'Executive Summary mit der Empfehlung beginnen, nicht mit dem Problem.',
    track: ['consulting'],
  },
  {
    id: 'bcg-matrix',
    term: 'BCG Matrix',
    termDe: 'BCG-Matrix',
    definition:
      'Portfolio framework plotting business units on market growth (y) vs. market share (x): Stars, Cash Cows, Dogs, Question Marks.',
    definitionDe:
      'Portfolio-Framework: Geschäftseinheiten auf Marktwachstum (y) vs. Marktanteil (x): Stars, Cash Cows, Dogs, Question Marks.',
    example:
      'Apple iPhone = Cash Cow; Vision Pro = Question Mark.',
    exampleDe:
      'Apple iPhone = Cash Cow; Vision Pro = Question Mark.',
    track: ['consulting'],
  },
  {
    id: 'porter-five-forces',
    term: "Porter's Five Forces",
    termDe: 'Porters Five Forces',
    definition:
      'Industry-attractiveness framework: rivalry, new entrants, substitutes, supplier power, buyer power.',
    definitionDe:
      'Framework zur Branchenattraktivität: Wettbewerb, neue Anbieter, Substitute, Lieferantenmacht, Abnehmermacht.',
    example:
      'Airlines = brutal five forces; luxury = much friendlier.',
    exampleDe:
      'Airlines = brutale Five Forces; Luxus = viel freundlicher.',
    track: ['consulting'],
  },
  {
    id: 'value-chain',
    term: 'Value Chain',
    termDe: 'Wertschöpfungskette',
    definition:
      'Porter\'s framework mapping how a company creates value from raw materials to customer delivery.',
    definitionDe:
      'Porters Framework zur Darstellung, wie ein Unternehmen Wert vom Rohstoff bis zur Kundenlieferung schafft.',
    example:
      'Primary: inbound logistics → ops → outbound → marketing → service.',
    exampleDe:
      'Primär: Eingangslogistik → Produktion → Ausgang → Marketing → Service.',
    track: ['consulting'],
  },
  {
    id: 'operating-model',
    term: 'Operating Model',
    termDe: 'Operating Model',
    definition:
      'How a company is organized to deliver on strategy: processes, people, technology, governance.',
    definitionDe:
      'Wie ein Unternehmen organisiert ist, um die Strategie umzusetzen: Prozesse, Menschen, Technologie, Governance.',
    example:
      'Moving from regional to global operating model to cut duplication.',
    exampleDe:
      'Wechsel von regionalem zu globalem Operating Model, um Doppelarbeit zu vermeiden.',
    track: ['consulting'],
  },
  {
    id: 'run-rate',
    term: 'Run Rate',
    termDe: 'Run Rate',
    definition:
      'Annualized estimate of a current metric: (month × 12) or (quarter × 4). Ignores seasonality.',
    definitionDe:
      'Hochrechnung einer aktuellen Kennzahl auf Jahresbasis: (Monat × 12) oder (Quartal × 4). Ignoriert Saisonalität.',
    example:
      'Q1 revenue €25M → run rate €100M.',
    exampleDe:
      'Q1-Umsatz €25M → Run Rate €100M.',
    track: ['consulting'],
  },
  {
    id: 'quick-win',
    term: 'Quick Win',
    termDe: 'Quick Win',
    definition:
      'Low-effort, high-impact action that delivers visible results fast — used to build momentum on projects.',
    definitionDe:
      'Maßnahme mit niedrigem Aufwand und hoher Wirkung, die schnell sichtbare Ergebnisse liefert — wird für Projektmomentum genutzt.',
    example:
      'Renegotiate top-5 supplier contracts in week 2 for €2M savings.',
    exampleDe:
      'Top-5-Lieferantenverträge in Woche 2 neu verhandeln → €2M Einsparung.',
    track: ['consulting'],
  },
  {
    id: 'workstream',
    term: 'Workstream',
    termDe: 'Workstream',
    definition:
      'A parallel track of work within a larger project, typically led by one consultant and focused on a specific problem area.',
    definitionDe:
      'Parallel laufender Arbeitsstrang innerhalb eines größeren Projekts, meist von einem Berater geleitet mit klarem Themenfokus.',
    example:
      'On an M&A integration: IT workstream, HR workstream, Finance workstream.',
    exampleDe:
      'Bei einer M&A-Integration: IT-Workstream, HR-Workstream, Finance-Workstream.',
    track: ['consulting'],
  },
  {
    id: 'deck',
    term: 'Deck',
    termDe: 'Deck',
    definition:
      'Slang for a PowerPoint presentation. The main output and weapon of any consulting project.',
    definitionDe:
      'Slang für eine PowerPoint-Präsentation. Das zentrale Ergebnis und die Hauptwaffe jedes Beratungsprojekts.',
    example:
      'The partner wants the final deck on his desk by Sunday 8pm.',
    exampleDe:
      'Der Partner will das finale Deck Sonntag 20 Uhr auf dem Tisch.',
    track: ['consulting'],
  },
  {
    id: 'storyboard',
    term: 'Storyboard',
    termDe: 'Storyboard',
    definition:
      'Skeleton of a deck with slide titles and key messages before filling in content. Aligns the team early.',
    definitionDe:
      'Skelett eines Decks mit Foliennamen und Kernbotschaften, bevor Inhalte ausgearbeitet werden. Richtet das Team früh aus.',
    example:
      'Storyboard first → slide titles are complete sentences that tell a story.',
    exampleDe:
      'Storyboard zuerst → Folientitel sind vollständige Sätze, die eine Story erzählen.',
    track: ['consulting'],
  },
  {
    id: 'mckinsey-solve',
    term: 'McKinsey Solve',
    termDe: 'McKinsey Solve',
    definition:
      'McKinsey\'s online digital assessment (formerly PSG/Imbellus). Ecosystem and plant-defense mini-games testing meta-cognition under time pressure.',
    definitionDe:
      'McKinseys digitaler Online-Test (früher PSG/Imbellus). Ökosystem- und Pflanzenverteidigungs-Minispiele, die Meta-Kognition unter Zeitdruck testen.',
    example:
      'Solve takes ~70 minutes, cut-off is typically top 30% of applicants.',
    exampleDe:
      'Solve dauert ca. 70 Minuten, Cut-off liegt meist bei den besten 30% der Bewerber.',
    track: ['consulting'],
  },
  {
    id: 'case-interview',
    term: 'Case Interview',
    termDe: 'Case Interview',
    definition:
      'Simulated business problem where the candidate structures, analyzes, and recommends — the core of consulting recruiting.',
    definitionDe:
      'Simuliertes Geschäftsproblem, das der Kandidat strukturiert, analysiert und mit einer Empfehlung löst — Herzstück des Consulting-Recruitings.',
    example:
      '"Your client is a European airline losing €200M/year. What would you do?"',
    exampleDe:
      '"Dein Klient ist eine europäische Airline, die €200M/Jahr verliert. Was tust du?"',
    track: ['consulting'],
  },
  {
    id: 'fit-interview',
    term: 'Fit Interview',
    termDe: 'Fit Interview',
    definition:
      'Behavioral part of consulting interviews testing leadership, teamwork, and motivation using real stories from your past.',
    definitionDe:
      'Behavioraler Teil des Consulting-Interviews, der Leadership, Teamwork und Motivation anhand echter Geschichten aus deiner Vergangenheit prüft.',
    example:
      '"Tell me about a time you led a team through conflict."',
    exampleDe:
      '"Erzähl mir von einer Situation, in der du ein Team durch Konflikt geführt hast."',
    track: ['consulting'],
  },
  {
    id: 'star-method',
    term: 'STAR Method',
    termDe: 'STAR-Methode',
    definition:
      'Behavioral answer framework: Situation → Task → Action → Result. Used in fit and HR interviews.',
    definitionDe:
      'Framework für behavioral Antworten: Situation → Task → Action → Result. Standard in Fit- und HR-Interviews.',
    example:
      'Situation: tight deadline. Task: lead team. Action: reassigned roles. Result: delivered 2 days early.',
    exampleDe:
      'Situation: enge Deadline. Task: Team führen. Action: Rollen neu verteilt. Result: 2 Tage früher geliefert.',
    track: ['consulting'],
  },
  {
    id: 'benchmarking',
    term: 'Benchmarking',
    termDe: 'Benchmarking',
    definition:
      'Comparing a company\'s KPIs, processes, or costs against peers or best-in-class to identify gaps.',
    definitionDe:
      'Vergleich der KPIs, Prozesse oder Kosten eines Unternehmens mit Peers oder Best-in-Class, um Lücken zu identifizieren.',
    example:
      'SG&A is 14% of revenue vs. industry best-in-class at 9% — 5pp gap.',
    exampleDe:
      'SG&A 14% des Umsatzes vs. Branchenbester 9% — 5 Prozentpunkte Lücke.',
    track: ['consulting'],
  },

  // ============================================================
  // PRIVATE EQUITY (15)
  // ============================================================
  {
    id: 'gp',
    term: 'GP',
    termDe: 'GP',
    definition:
      'General Partner. The PE firm that manages the fund, makes investment decisions, and earns carry and management fees.',
    definitionDe:
      'General Partner. Der PE-Fonds-Manager, der Investitionsentscheidungen trifft und Carry sowie Management Fees verdient.',
    example:
      'KKR is the GP; pension funds and endowments are LPs.',
    exampleDe:
      'KKR ist GP; Pensionsfonds und Stiftungen sind LPs.',
    track: ['pe', 'vc'],
  },
  {
    id: 'lp',
    term: 'LP',
    termDe: 'LP',
    definition:
      'Limited Partner. Investor in a PE/VC fund — usually pension funds, endowments, sovereign wealth funds, family offices.',
    definitionDe:
      'Limited Partner. Investor in einen PE/VC-Fonds — meist Pensionskassen, Stiftungen, Staatsfonds oder Family Offices.',
    example:
      'CalPERS commits $500M as an LP in a $5B buyout fund.',
    exampleDe:
      'CalPERS zeichnet $500M als LP in einen $5 Mrd. Buyout-Fonds.',
    track: ['pe', 'vc'],
  },
  {
    id: 'carry',
    term: 'Carried Interest',
    termDe: 'Carried Interest',
    definition:
      'The GP\'s share of fund profits above the hurdle rate — typically 20%. The "carry" is where PE partners get rich.',
    definitionDe:
      'Gewinnbeteiligung des GP über der Hurdle Rate — üblich 20%. Hier werden PE-Partner reich.',
    example:
      '2-and-20: 2% management fee + 20% carry above 8% hurdle.',
    exampleDe:
      '2-and-20: 2% Management Fee + 20% Carry über 8% Hurdle.',
    track: ['pe', 'vc'],
  },
  {
    id: 'hurdle-rate',
    term: 'Hurdle Rate',
    termDe: 'Hurdle Rate',
    definition:
      'Minimum return LPs must receive before the GP can earn carry. Usually 7–8% IRR in PE.',
    definitionDe:
      'Mindestrendite, die LPs erhalten müssen, bevor der GP Carry verdient. In PE meist 7–8% IRR.',
    example:
      'Fund returns 15% → GP carry applies only to the 7pp above 8% hurdle.',
    exampleDe:
      'Fondsrendite 15% → GP-Carry nur auf die 7 Prozentpunkte über 8% Hurdle.',
    track: ['pe', 'vc'],
  },
  {
    id: 'vintage-year',
    term: 'Vintage Year',
    termDe: 'Vintage Year',
    definition:
      'The year a PE/VC fund makes its first investment. Used to benchmark fund performance against peers raised the same year.',
    definitionDe:
      'Das Jahr, in dem ein PE/VC-Fonds seine erste Investition tätigt. Dient als Benchmark im Vergleich mit Fonds desselben Jahrgangs.',
    example:
      '2021 vintage funds deployed at peak multiples and will likely underperform.',
    exampleDe:
      '2021er Vintage-Fonds investierten zu Höchstmultiples und werden wohl underperformen.',
    track: ['pe', 'vc'],
  },
  {
    id: 'dpi',
    term: 'DPI',
    termDe: 'DPI',
    definition:
      'Distributions to Paid-in Capital. Cash actually returned to LPs divided by capital called. Real money out the door.',
    definitionDe:
      'Distributions to Paid-in Capital. Tatsächliche Ausschüttungen an LPs geteilt durch abgerufenes Kapital. Echtes Geld zurück.',
    example:
      'DPI of 1.5x means LPs already got back 1.5× their invested capital.',
    exampleDe:
      'DPI 1,5x bedeutet LPs haben bereits 1,5× des investierten Kapitals zurück.',
    track: ['pe', 'vc'],
    formula: 'DPI = Cumulative Distributions / Paid-in Capital',
  },
  {
    id: 'tvpi',
    term: 'TVPI',
    termDe: 'TVPI',
    definition:
      'Total Value to Paid-in Capital. DPI plus unrealized NAV. The full multiple including still-held investments.',
    definitionDe:
      'Total Value to Paid-in Capital. DPI plus unrealisierter NAV. Das gesamte Multiple inklusive noch gehaltener Investments.',
    example:
      'DPI 1.2x + RVPI 0.8x = TVPI 2.0x.',
    exampleDe:
      'DPI 1,2x + RVPI 0,8x = TVPI 2,0x.',
    track: ['pe', 'vc'],
    formula: 'TVPI = (Distributions + NAV) / Paid-in Capital',
  },
  {
    id: 'rvpi',
    term: 'RVPI',
    termDe: 'RVPI',
    definition:
      'Residual Value to Paid-in Capital. Current NAV of unsold portfolio divided by capital called.',
    definitionDe:
      'Residual Value to Paid-in Capital. Aktueller NAV der noch nicht verkauften Portfolios geteilt durch abgerufenes Kapital.',
    example:
      'RVPI 0.8x → there\'s still 80% of paid-in capital sitting in the portfolio.',
    exampleDe:
      'RVPI 0,8x → es stecken noch 80% des einbezahlten Kapitals im Portfolio.',
    track: ['pe', 'vc'],
  },
  {
    id: 'add-on',
    term: 'Add-on Acquisition',
    termDe: 'Add-on-Akquisition',
    definition:
      'Smaller acquisition bolted onto an existing platform company to accelerate growth and build scale ("buy-and-build").',
    definitionDe:
      'Kleinere Zukaufakquisition, die an eine bestehende Plattform angehängt wird, um Wachstum und Skaleneffekte zu beschleunigen ("Buy-and-Build").',
    example:
      'A PE-owned HVAC platform makes 12 add-on acquisitions in 3 years.',
    exampleDe:
      'Eine PE-gehaltene HVAC-Plattform tätigt 12 Add-ons in 3 Jahren.',
    track: ['pe'],
  },
  {
    id: 'platform-company',
    term: 'Platform Company',
    termDe: 'Plattform-Unternehmen',
    definition:
      'Initial larger acquisition in a PE buy-and-build strategy; acts as the base for subsequent add-ons.',
    definitionDe:
      'Erste größere Akquisition in einer PE-Buy-and-Build-Strategie; dient als Basis für weitere Add-ons.',
    example:
      'PE buys a €300M regional leader as the platform, then adds 8 smaller competitors.',
    exampleDe:
      'PE kauft einen €300M Regional-Champion als Plattform, dann 8 kleinere Wettbewerber als Add-ons.',
    track: ['pe'],
  },
  {
    id: '100-day-plan',
    term: '100-Day Plan',
    termDe: '100-Tage-Plan',
    definition:
      'Post-acquisition roadmap with quick wins and value-creation initiatives for the first ~3 months of PE ownership.',
    definitionDe:
      'Roadmap nach dem Deal mit Quick Wins und Wertsteigerungsinitiativen für die ersten ca. 3 Monate unter PE-Eigentum.',
    example:
      'Week 1: replace CFO. Week 4: renegotiate top-10 contracts. Day 100: new org rollout.',
    exampleDe:
      'Woche 1: CFO austauschen. Woche 4: Top-10 Verträge neu verhandeln. Tag 100: neue Organisation.',
    track: ['pe'],
  },
  {
    id: 'management-fee',
    term: 'Management Fee',
    termDe: 'Management Fee',
    definition:
      'Annual fee paid by LPs to the GP to cover operating costs. Typically 1.5–2% of committed or invested capital.',
    definitionDe:
      'Jährliche Gebühr, die LPs an den GP zahlen, um die Betriebskosten zu decken. Üblich: 1,5–2% des zugesagten oder investierten Kapitals.',
    example:
      '2% of $10B fund = $200M/year to the GP regardless of performance.',
    exampleDe:
      '2% eines $10 Mrd. Fonds = $200M/Jahr an den GP, unabhängig von der Performance.',
    track: ['pe', 'vc'],
  },
  {
    id: 'leverage-ratio',
    term: 'Leverage Ratio',
    termDe: 'Verschuldungsgrad',
    definition:
      'Debt divided by EBITDA. Key PE metric — typical LBOs run 5–7x, anything above 7x is considered aggressive.',
    definitionDe:
      'Schulden geteilt durch EBITDA. Zentrale PE-Kennzahl — LBOs laufen typisch mit 5–7x, über 7x gilt als aggressiv.',
    example:
      '€500M debt / €100M EBITDA = 5.0x leverage.',
    exampleDe:
      '€500M Schulden / €100M EBITDA = 5,0x Leverage.',
    track: ['pe', 'ib'],
    formula: 'Leverage = Net Debt / EBITDA',
  },
  {
    id: 'pik-interest',
    term: 'PIK Interest',
    termDe: 'PIK-Zinsen',
    definition:
      'Payment-in-Kind. Interest that accrues to the loan principal rather than being paid in cash — popular in mezzanine financing.',
    definitionDe:
      'Payment-in-Kind. Zinsen, die nicht cash gezahlt, sondern dem Kreditnominal zugeschlagen werden — üblich bei Mezzanine.',
    example:
      '10% PIK: €100M loan grows to €110M after year 1 without any cash paid.',
    exampleDe:
      '10% PIK: €100M Kredit wächst ohne Cash-Zahlung nach einem Jahr auf €110M.',
    track: ['pe', 'ib'],
  },
  {
    id: 'covenant',
    term: 'Covenant',
    termDe: 'Covenant',
    definition:
      'Financial promise in a loan agreement (e.g., max leverage, min interest coverage). Breaching them can trigger default.',
    definitionDe:
      'Finanzielle Zusage im Kreditvertrag (z.B. max. Verschuldung, min. Zinsdeckung). Ein Bruch kann Default auslösen.',
    example:
      'Maintenance covenant: Net Debt / EBITDA must stay below 6.0x.',
    exampleDe:
      'Maintenance-Covenant: Net Debt / EBITDA darf 6,0x nicht überschreiten.',
    track: ['pe', 'ib'],
  },

  // ============================================================
  // VENTURE CAPITAL (15)
  // ============================================================
  {
    id: 'pre-money',
    term: 'Pre-Money Valuation',
    termDe: 'Pre-Money-Bewertung',
    definition:
      'Company valuation immediately before a new funding round. Excludes the incoming investment.',
    definitionDe:
      'Unternehmensbewertung unmittelbar vor einer neuen Finanzierungsrunde. Schließt das neue Investment nicht ein.',
    example:
      'Pre-money €20M + new investment €5M = post-money €25M.',
    exampleDe:
      'Pre-Money €20M + Neu-Investment €5M = Post-Money €25M.',
    track: ['vc'],
  },
  {
    id: 'post-money',
    term: 'Post-Money Valuation',
    termDe: 'Post-Money-Bewertung',
    definition:
      'Company valuation immediately after a new funding round, including the freshly raised capital.',
    definitionDe:
      'Unternehmensbewertung unmittelbar nach einer Finanzierungsrunde, einschließlich des frisch eingesammelten Kapitals.',
    example:
      'Raising €5M at €20M pre = €25M post; investor owns 20%.',
    exampleDe:
      'Runde von €5M bei €20M Pre = €25M Post; Investor hält 20%.',
    track: ['vc'],
    formula: 'Post-Money = Pre-Money + Investment',
  },
  {
    id: 'liquidation-preference',
    term: 'Liquidation Preference',
    termDe: 'Liquidationspräferenz',
    definition:
      'Investor right to get paid first in an exit — typically 1x non-participating preferred gives the higher of return or conversion.',
    definitionDe:
      'Recht des Investors, bei einem Exit zuerst bedient zu werden — meist 1x non-participating Preferred: Max aus Rückzahlung oder Wandlung.',
    example:
      '€10M at 1x pref → investor gets €10M back first, common gets the rest.',
    exampleDe:
      '€10M bei 1x Pref → Investor erhält €10M zuerst, Common bekommt den Rest.',
    track: ['vc'],
  },
  {
    id: 'anti-dilution',
    term: 'Anti-Dilution',
    termDe: 'Verwässerungsschutz',
    definition:
      'Protection for early investors if a later round prices below their entry — adjusts their conversion ratio in their favor.',
    definitionDe:
      'Schutz für frühe Investoren, falls eine spätere Runde unter ihrem Einstiegspreis priced wird — passt das Umtauschverhältnis zu ihren Gunsten an.',
    example:
      'Weighted-average anti-dilution softens the hit in a down-round.',
    exampleDe:
      'Weighted-Average Anti-Dilution mildert den Schlag bei einer Down-Round.',
    track: ['vc'],
  },
  {
    id: 'pro-rata',
    term: 'Pro-Rata',
    termDe: 'Pro-Rata',
    definition:
      'Right to invest in future rounds to maintain your existing ownership percentage and avoid dilution.',
    definitionDe:
      'Recht, in künftigen Runden zu investieren, um die bestehende Beteiligungsquote zu halten und Verwässerung zu vermeiden.',
    example:
      'A seed VC with 15% exercises pro-rata in the Series A to stay at 15%.',
    exampleDe:
      'Ein Seed-VC mit 15% nutzt Pro-Rata in der Series A, um bei 15% zu bleiben.',
    track: ['vc'],
  },
  {
    id: 'lead-investor',
    term: 'Lead Investor',
    termDe: 'Lead Investor',
    definition:
      'VC that sets the terms and valuation of a round and usually takes the largest check and a board seat.',
    definitionDe:
      'VC, der die Konditionen und Bewertung der Runde festlegt und meist den größten Scheck sowie einen Sitz im Board übernimmt.',
    example:
      'Sequoia led the €20M Series B; three existing investors followed.',
    exampleDe:
      'Sequoia führte die €20M Series B; drei bestehende Investoren gingen mit.',
    track: ['vc'],
  },
  {
    id: 'bridge-round',
    term: 'Bridge Round',
    termDe: 'Bridge-Runde',
    definition:
      'Interim financing between two priced rounds to extend runway — usually via convertible notes or SAFEs.',
    definitionDe:
      'Zwischenfinanzierung zwischen zwei priced Runden, um den Runway zu verlängern — meist via Wandelanleihen oder SAFEs.',
    example:
      '€2M bridge in Q3 to push the Series A into Q1 next year.',
    exampleDe:
      '€2M Bridge in Q3, um die Series A ins Q1 des Folgejahres zu verschieben.',
    track: ['vc'],
  },
  {
    id: 'runway',
    term: 'Runway',
    termDe: 'Runway',
    definition:
      'Number of months a startup can operate before running out of cash at the current burn rate.',
    definitionDe:
      'Anzahl der Monate, die ein Startup bei aktuellem Burn Rate noch operieren kann, bevor das Geld ausgeht.',
    example:
      '€6M cash / €500k monthly burn = 12 months runway.',
    exampleDe:
      '€6M Cash / €500k Monats-Burn = 12 Monate Runway.',
    track: ['vc'],
    formula: 'Runway = Cash / Monthly Burn',
  },
  {
    id: 'burn-rate',
    term: 'Burn Rate',
    termDe: 'Burn Rate',
    definition:
      'Net monthly cash outflow of a startup. "Gross burn" = costs; "net burn" = costs − revenue.',
    definitionDe:
      'Netto-Monats-Cashabfluss eines Startups. "Gross Burn" = Kosten; "Net Burn" = Kosten − Umsatz.',
    example:
      '€800k costs − €300k revenue = €500k net burn.',
    exampleDe:
      '€800k Kosten − €300k Umsatz = €500k Net Burn.',
    track: ['vc'],
  },
  {
    id: 'arr',
    term: 'ARR',
    termDe: 'ARR',
    definition:
      'Annual Recurring Revenue. Subscription revenue annualized, excluding one-off fees. Core SaaS metric.',
    definitionDe:
      'Annual Recurring Revenue. Auf das Jahr hochgerechneter Abo-Umsatz, ohne Einmalzahlungen. Zentrale SaaS-Kennzahl.',
    example:
      '1,000 customers × €100/month × 12 = €1.2M ARR.',
    exampleDe:
      '1.000 Kunden × €100/Monat × 12 = €1,2M ARR.',
    track: ['vc'],
    formula: 'ARR = MRR × 12',
  },
  {
    id: 'mrr',
    term: 'MRR',
    termDe: 'MRR',
    definition:
      'Monthly Recurring Revenue. The predictable monthly subscription revenue of a SaaS business.',
    definitionDe:
      'Monthly Recurring Revenue. Der planbare monatliche Abo-Umsatz eines SaaS-Geschäfts.',
    example:
      '200 customers × €50 = €10k MRR.',
    exampleDe:
      '200 Kunden × €50 = €10k MRR.',
    track: ['vc'],
  },
  {
    id: 'unit-economics',
    term: 'Unit Economics',
    termDe: 'Unit Economics',
    definition:
      'Revenue and cost per single unit (customer, order). Key test of whether a business is fundamentally profitable.',
    definitionDe:
      'Umsatz und Kosten pro einzelner Einheit (Kunde, Bestellung). Zentrale Prüfung, ob ein Geschäftsmodell grundsätzlich profitabel ist.',
    example:
      'CAC €200, LTV €900 → LTV/CAC = 4.5x, healthy.',
    exampleDe:
      'CAC €200, LTV €900 → LTV/CAC = 4,5x, gesund.',
    track: ['vc'],
  },
  {
    id: 'power-law',
    term: 'Power Law',
    termDe: 'Power Law',
    definition:
      'VC math reality: a few outlier winners return more than the rest of the portfolio combined. Drives fund strategy.',
    definitionDe:
      'VC-Realität: wenige Ausnahme-Winner generieren mehr Rendite als der gesamte Rest des Portfolios zusammen. Prägt die Fondsstrategie.',
    example:
      'In a 30-company fund, 1–2 unicorns typically drive all the returns.',
    exampleDe:
      'In einem 30-Firmen-Fonds erzeugen meist 1–2 Unicorns die gesamte Rendite.',
    track: ['vc'],
  },
  {
    id: 'term-sheet',
    term: 'Term Sheet',
    termDe: 'Term Sheet',
    definition:
      'Non-binding document summarizing the key economic and control terms of a VC investment before definitive docs.',
    definitionDe:
      'Unverbindliches Dokument, das die wichtigsten wirtschaftlichen und Kontrollrechte einer VC-Investition vor den Vertragsdokumenten zusammenfasst.',
    example:
      'Term sheet: €5M at €20M pre, 1x pref, 1 board seat, pro-rata rights.',
    exampleDe:
      'Term Sheet: €5M bei €20M Pre, 1x Pref, 1 Board-Sitz, Pro-Rata.',
    track: ['vc'],
  },
  {
    id: 'liquidation-waterfall',
    term: 'Liquidation Waterfall',
    termDe: 'Liquidations-Waterfall',
    definition:
      'Step-by-step order in which exit proceeds flow through preferred stacks before common shareholders see a cent.',
    definitionDe:
      'Schrittweise Reihenfolge, in der Exit-Erlöse durch Preferred-Stacks fließen, bevor Stammaktionäre einen Cent sehen.',
    example:
      'Series B 1x → Series A 1x → common. Down-exit often leaves common at €0.',
    exampleDe:
      'Series B 1x → Series A 1x → Common. Bei einem Down-Exit bleibt Common oft bei €0.',
    track: ['vc'],
  },
];

// ============================================================
// LOOKUP HELPERS
// ============================================================

/**
 * Case-insensitive match against a candidate phrase.
 * Checks both English and German term forms.
 */
export function findGlossaryTerm(
  query: string,
): GlossaryTerm | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  return GLOSSARY.find(
    (g) =>
      g.term.toLowerCase() === q || g.termDe.toLowerCase() === q,
  );
}

/**
 * Filter by track ('all' returns everything).
 */
export function getTermsByTrack(
  track: 'all' | 'ib' | 'consulting' | 'pe' | 'vc',
): GlossaryTerm[] {
  if (track === 'all') return GLOSSARY;
  return GLOSSARY.filter((g) => g.track.includes(track) || g.track.includes('all'));
}

/**
 * Live search across both languages — matches term, termDe,
 * definition and definitionDe as a substring (case-insensitive).
 */
export function searchGlossary(query: string): GlossaryTerm[] {
  if (!query.trim()) return GLOSSARY;
  const q = query.trim().toLowerCase();
  return GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      g.termDe.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.definitionDe.toLowerCase().includes(q),
  );
}
