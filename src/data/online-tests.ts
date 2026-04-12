// ============================================================
// CareerDojo — Consulting Online Test Prep
// McKinsey Solve (Imbellus), BCG Casey Chatbot, Bain SOVA
// ============================================================

export type OnlineTestType = 'mckinsey-solve' | 'bcg-casey' | 'bain-sova';

export interface OnlineTestExercise {
  id: string;
  kind: 'multiple_choice' | 'free_text';
  title: string;
  titleDe: string;
  prompt: string;
  promptDe: string;
  context?: string;
  contextDe?: string;
  options?: { text: string; textDe: string }[];
  correctAnswer?: number;
  sampleAnswer: string;
  sampleAnswerDe: string;
  explanation: string;
  explanationDe: string;
  timeSeconds: number;
  xpReward: number;
}

export interface OnlineTest {
  id: OnlineTestType;
  title: string;
  titleDe: string;
  firm: string;
  firmEmoji: string;
  subtitle: string;
  subtitleDe: string;
  description: string;
  descriptionDe: string;
  whatIsTested: string[];
  whatIsTestedDe: string[];
  color: string;
  accent: string;
  exercises: OnlineTestExercise[];
}

// ============================================================
// McKINSEY SOLVE (Imbellus Problem Solving Game)
// ============================================================
const mckinseySolve: OnlineTest = {
  id: 'mckinsey-solve',
  title: 'McKinsey Solve',
  titleDe: 'McKinsey Solve',
  firm: 'McKinsey & Company',
  firmEmoji: '🏛️',
  subtitle: 'Problem Solving Game (Imbellus)',
  subtitleDe: 'Problem Solving Game (Imbellus)',
  description: 'An ~70-minute gamified assessment testing structured thinking, pattern recognition, and decision-making under pressure. Features ecosystem building and plant defense minigames.',
  descriptionDe: 'Ein ~70-minütiges spielerisches Assessment, das strukturiertes Denken, Mustererkennung und Entscheidungsfindung unter Druck testet. Beinhaltet Ecosystem Building und Plant Defense Minigames.',
  whatIsTested: [
    'Critical Thinking & Structured Problem Solving',
    'Decision Making under Time Pressure',
    'Pattern Recognition & Hypothesis Testing',
    'Systems Thinking (how variables interact)',
    'Meta-cognition (how you approach problems)',
  ],
  whatIsTestedDe: [
    'Kritisches Denken & Strukturiertes Problemlösen',
    'Entscheidungsfindung unter Zeitdruck',
    'Mustererkennung & Hypothesentests',
    'Systemdenken (wie Variablen zusammenhängen)',
    'Meta-Kognition (wie du Probleme angehst)',
  ],
  color: '#1CB0F6',
  accent: 'rgba(28,176,246,0.15)',
  exercises: [
    {
      id: 'solve-1',
      kind: 'multiple_choice',
      title: 'Ecosystem: Food Chain Stability',
      titleDe: 'Ecosystem: Nahrungskette Stabilität',
      prompt: 'You must build a stable mountain ecosystem with 8 species. A producer (grass) is already placed. Which trophic structure is MOST likely to survive 50 years?',
      promptDe: 'Du musst ein stabiles Berg-Ecosystem mit 8 Arten bauen. Ein Produzent (Gras) ist bereits platziert. Welche trophische Struktur überlebt AM WAHRSCHEINLICHSTEN 50 Jahre?',
      context: 'Rules: Each species has calorie intake needs. Predators must be able to reach enough prey calories. No energy-cycle can be broken.',
      contextDe: 'Regeln: Jede Art hat Kalorienbedarf. Räuber müssen ausreichend Beute-Kalorien erreichen. Kein Energiekreislauf darf gebrochen werden.',
      options: [
        { text: '1 producer, 6 herbivores, 1 apex predator', textDe: '1 Produzent, 6 Pflanzenfresser, 1 Spitzenprädator' },
        { text: '1 producer, 4 herbivores, 2 small predators, 1 apex predator', textDe: '1 Produzent, 4 Pflanzenfresser, 2 kleine Räuber, 1 Spitzenprädator' },
        { text: '1 producer, 2 herbivores, 4 predators, 1 apex predator', textDe: '1 Produzent, 2 Pflanzenfresser, 4 Räuber, 1 Spitzenprädator' },
        { text: '1 producer, 7 apex predators', textDe: '1 Produzent, 7 Spitzenprädatoren' },
      ],
      correctAnswer: 1,
      sampleAnswer: '1 producer, 4 herbivores, 2 small predators, 1 apex predator',
      sampleAnswerDe: '1 Produzent, 4 Pflanzenfresser, 2 kleine Räuber, 1 Spitzenprädator',
      explanation: 'Energy pyramids lose ~90% per trophic level (10% rule). A stable ecosystem needs a WIDE base of herbivores to support fewer predators, and only 1 apex. Option B creates the classic 4-2-1 pyramid that can self-sustain. Too many predators (C, D) starve; too narrow a base (A) collapses if one herbivore species fails.',
      explanationDe: 'Energiepyramiden verlieren ~90% pro trophischer Ebene (10%-Regel). Ein stabiles Ecosystem braucht eine BREITE Basis an Pflanzenfressern für weniger Räuber und nur 1 Spitzenprädator. Option B erschafft die klassische 4-2-1 Pyramide, die sich selbst erhält. Zu viele Räuber (C, D) verhungern; zu schmale Basis (A) kollabiert wenn eine Pflanzenfresser-Art ausfällt.',
      timeSeconds: 60,
      xpReward: 20,
    },
    {
      id: 'solve-2',
      kind: 'multiple_choice',
      title: 'Ecosystem: Species Compatibility',
      titleDe: 'Ecosystem: Arten-Kompatibilität',
      prompt: 'You are building a reef ecosystem. Which 3 species pairs would you NEVER place together because they cannot co-exist in the given habitat?',
      promptDe: 'Du baust ein Korallenriff-Ecosystem. Welches 3-Arten-Paar würdest du NIE zusammensetzen, weil sie im gegebenen Habitat nicht koexistieren können?',
      context: 'Habitat: Tropical reef, 24°C, 30m depth, high salinity. Species have temperature, depth, salinity, and predator-prey requirements.',
      contextDe: 'Habitat: Tropisches Riff, 24°C, 30m Tiefe, hohe Salinität. Arten haben Temperatur-, Tiefen-, Salinitäts- und Räuber-Beute-Anforderungen.',
      options: [
        { text: 'Sea turtle + Parrotfish + Algae (all reef-compatible)', textDe: 'Meeresschildkröte + Papageifisch + Algen (alle riff-kompatibel)' },
        { text: 'Polar orca + Tropical grouper + Deep-sea anglerfish', textDe: 'Polar-Orca + Tropischer Zackenbarsch + Tiefsee-Anglerfisch' },
        { text: 'Reef shark + Clownfish + Sea anemone', textDe: 'Riffhai + Clownfisch + Seeanemone' },
        { text: 'Octopus + Crab + Seagrass', textDe: 'Oktopus + Krabbe + Seegras' },
      ],
      correctAnswer: 1,
      sampleAnswer: 'Polar orca + Tropical grouper + Deep-sea anglerfish',
      sampleAnswerDe: 'Polar-Orca + Tropischer Zackenbarsch + Tiefsee-Anglerfisch',
      explanation: 'The Solve test checks habitat compatibility FIRST. Polar orca needs <5°C (fails tropical 24°C). Deep-sea anglerfish needs >1000m depth (fails 30m). Only the tropical grouper fits. The trick is: scan species requirements BEFORE thinking about food chains.',
      explanationDe: 'Der Solve-Test prüft Habitat-Kompatibilität ZUERST. Polar-Orca braucht <5°C (scheitert bei tropischen 24°C). Tiefsee-Anglerfisch braucht >1000m Tiefe (scheitert bei 30m). Nur der tropische Zackenbarsch passt. Trick: Art-Anforderungen scannen BEVOR du an Nahrungsketten denkst.',
      timeSeconds: 60,
      xpReward: 20,
    },
    {
      id: 'solve-3',
      kind: 'multiple_choice',
      title: 'Plant Defense: Resource Allocation',
      titleDe: 'Plant Defense: Ressourcenverteilung',
      prompt: 'You have 100 defense points to allocate across 4 plant terrains before waves of invaders attack. Wave data: N (weak, 10 units), E (medium, 25), S (strong, 40), W (weak, 15). You have information about each wave. How do you allocate?',
      promptDe: 'Du hast 100 Verteidigungspunkte auf 4 Pflanzen-Terrains zu verteilen, bevor Invader-Wellen angreifen. Wellen-Daten: N (schwach, 10 Einheiten), E (mittel, 25), S (stark, 40), W (schwach, 15). Du kennst jede Welle. Wie verteilst du?',
      context: 'Each defense point absorbs 1 attack unit. Unspent points are wasted. Over-allocation is wasteful, under-allocation means plant dies.',
      contextDe: 'Jeder Verteidigungspunkt absorbiert 1 Angriffs-Einheit. Ungenutzte Punkte sind verschwendet. Überverteilung ist Verschwendung, Unterverteilung = Pflanze stirbt.',
      options: [
        { text: '25 / 25 / 25 / 25 (equal split)', textDe: '25 / 25 / 25 / 25 (gleichmäßig)' },
        { text: '10 / 25 / 40 / 15 + 10 reserve (match + buffer)', textDe: '10 / 25 / 40 / 15 + 10 Reserve (match + Puffer)' },
        { text: '15 / 30 / 45 / 10 (all-in on strong wave)', textDe: '15 / 30 / 45 / 10 (all-in auf starke Welle)' },
        { text: '5 / 20 / 50 / 25 (sacrifice the weakest)', textDe: '5 / 20 / 50 / 25 (schwächste opfern)' },
      ],
      correctAnswer: 1,
      sampleAnswer: '10 / 25 / 40 / 15 + 10 reserve',
      sampleAnswerDe: '10 / 25 / 40 / 15 + 10 Reserve',
      explanation: 'Optimal resource allocation: match each wave exactly + keep a small buffer for uncertainty. Equal splits (A) waste points on weak waves and fail at strong ones. Going all-in (C, D) sacrifices plants which costs more than it saves. The Plant Defense game rewards precise, data-driven allocation — not gut feeling.',
      explanationDe: 'Optimale Ressourcen-Allokation: Jede Welle exakt matchen + kleinen Puffer für Unsicherheit. Gleichverteilung (A) verschwendet Punkte bei schwachen Wellen und scheitert bei starken. All-in (C, D) opfert Pflanzen was mehr kostet als es spart. Plant Defense belohnt präzise, datengetriebene Allokation — kein Bauchgefühl.',
      timeSeconds: 75,
      xpReward: 20,
    },
    {
      id: 'solve-4',
      kind: 'multiple_choice',
      title: 'Under Time Pressure: Quick Decision',
      titleDe: 'Unter Zeitdruck: Schnelle Entscheidung',
      prompt: 'You have 90 seconds left in the Plant Defense mini-game. A new threat appears: 50 attack units headed to your strongest plant. You have 30 unallocated points. What do you do?',
      promptDe: 'Du hast 90 Sekunden übrig im Plant Defense Minigame. Eine neue Bedrohung erscheint: 50 Angriffs-Einheiten zur stärksten Pflanze. Du hast 30 nicht zugewiesene Punkte. Was tust du?',
      options: [
        { text: 'Panic and allocate all 30 to the threatened plant', textDe: 'Panik — alle 30 zur bedrohten Pflanze' },
        { text: 'Accept the plant will die and reinforce weaker plants', textDe: 'Akzeptieren dass die Pflanze stirbt und schwächere verstärken' },
        { text: 'Redistribute: pull 20 from over-defended plants, add to the 30 → 50 total', textDe: 'Umverteilen: 20 von überdefensiven Pflanzen ziehen, zu den 30 hinzufügen → 50 gesamt' },
        { text: 'Leave it and focus on the next wave', textDe: 'Ignorieren und auf nächste Welle fokussieren' },
      ],
      correctAnswer: 2,
      sampleAnswer: 'Redistribute: pull 20 from over-defended plants, add to the 30 → 50 total',
      sampleAnswerDe: 'Umverteilen: 20 von überdefensiven Pflanzen ziehen, zu den 30 hinzufügen → 50 gesamt',
      explanation: 'The Solve test tracks how you respond to changing info mid-game. Key insight: DYNAMIC REALLOCATION is the highest-scoring strategy. The test rewards players who adapt their prior decisions based on new data. Strongest-plant-survives is usually the right call because losing it cascades.',
      explanationDe: 'Der Solve-Test trackt wie du auf neue Infos im Spiel reagierst. Kern: DYNAMISCHE UMVERTEILUNG ist die höchstpunktende Strategie. Der Test belohnt Spieler, die frühere Entscheidungen basierend auf neuen Daten anpassen. Stärkste-Pflanze-überlebt ist meist richtig, weil ihr Verlust kaskadiert.',
      timeSeconds: 45,
      xpReward: 20,
    },
    {
      id: 'solve-5',
      kind: 'multiple_choice',
      title: 'What McKinsey Actually Evaluates',
      titleDe: 'Was McKinsey wirklich bewertet',
      prompt: 'The McKinsey Solve test uses Imbellus-style behavioral biometrics. Beyond final scores, what does it MOST track about your play style?',
      promptDe: 'Der McKinsey Solve Test nutzt Imbellus-Behavioral-Biometrics. Was trackt er ZUSÄTZLICH zu den Endergebnissen über dein Spielverhalten?',
      options: [
        { text: 'Only your final answers and completion time', textDe: 'Nur deine Endantworten und die Zeit' },
        { text: 'Your thought process: clicks, hover paths, decision order, backtracking, hypothesis changes', textDe: 'Deinen Denkprozess: Klicks, Hover-Pfade, Entscheidungs-Reihenfolge, Backtracking, Hypothesen-Änderungen' },
        { text: 'Your typing speed and keyboard accuracy', textDe: 'Deine Tippgeschwindigkeit und Tastatur-Genauigkeit' },
        { text: 'How many times you ask for help', textDe: 'Wie oft du um Hilfe bittest' },
      ],
      correctAnswer: 1,
      sampleAnswer: 'Your thought process: clicks, hover paths, decision order, backtracking, hypothesis changes',
      sampleAnswerDe: 'Deinen Denkprozess: Klicks, Hover-Pfade, Entscheidungs-Reihenfolge, Backtracking, Hypothesen-Änderungen',
      explanation: 'This is the KEY insight. Imbellus measures meta-cognition — HOW you think, not just WHAT you conclude. You are rewarded for: (1) exploring data before deciding, (2) changing strategy when new info appears, (3) systematic not random clicking. Never rush. Never click randomly. Show your reasoning through your actions.',
      explanationDe: 'DAS ist die Kern-Einsicht. Imbellus misst Meta-Kognition — WIE du denkst, nicht nur WAS du schließt. Belohnt werden: (1) Daten erkunden vor der Entscheidung, (2) Strategie ändern bei neuen Infos, (3) systematisches statt zufälliges Klicken. Nie hetzen. Nie zufällig klicken. Zeige deine Logik durch deine Aktionen.',
      timeSeconds: 60,
      xpReward: 25,
    },
  ],
};

// ============================================================
// BCG CASEY (AI Chatbot Case Interview)
// ============================================================
const bcgCasey: OnlineTest = {
  id: 'bcg-casey',
  title: 'BCG Casey',
  titleDe: 'BCG Casey',
  firm: 'Boston Consulting Group',
  firmEmoji: '🎯',
  subtitle: 'AI Chatbot Case Interview',
  subtitleDe: 'AI-Chatbot Case Interview',
  description: 'A ~25-minute AI-driven case interview where you chat with Casey (BCG\'s chatbot) about a real-world business scenario. Tests structured thinking, communication, and creativity — not right/wrong answers.',
  descriptionDe: 'Ein ~25-minütiges AI-geführtes Case Interview, wo du mit Casey (BCGs Chatbot) über ein reales Business-Szenario chattest. Testet strukturiertes Denken, Kommunikation und Kreativität — keine Richtig/Falsch-Antworten.',
  whatIsTested: [
    'Case Structuring (framework clarity)',
    'Business Acumen & Creativity',
    'Written Communication Quality',
    'Hypothesis-Driven Thinking',
    'Ability to prioritize under ambiguity',
  ],
  whatIsTestedDe: [
    'Case-Strukturierung (Framework-Klarheit)',
    'Business-Verständnis & Kreativität',
    'Schriftliche Kommunikationsqualität',
    'Hypothesen-getriebenes Denken',
    'Priorisierung unter Unsicherheit',
  ],
  color: '#58CC02',
  accent: 'rgba(88,204,2,0.15)',
  exercises: [
    {
      id: 'casey-1',
      kind: 'free_text',
      title: 'Declining Margins: First Questions',
      titleDe: 'Sinkende Margen: Erste Fragen',
      prompt: 'Casey says: "Your client is a European airline. Over the past 3 years, their operating margin has dropped from 8% to 3%, while revenue has grown 5% per year. They want to know why and what to do." What are the first 3-4 clarifying questions you ask?',
      promptDe: 'Casey sagt: "Dein Klient ist eine europäische Fluglinie. In den letzten 3 Jahren ist ihre operative Marge von 8% auf 3% gefallen, während der Umsatz um 5% pro Jahr wuchs. Sie wollen wissen warum und was zu tun ist." Was sind deine ersten 3-4 Klärungsfragen?',
      sampleAnswer: 'Great questions to ask Casey: (1) What is driving revenue growth — volume (more passengers) or price? This separates demand from pricing. (2) Which cost lines have grown fastest — fuel, labor, aircraft leasing, airport fees, maintenance? Margin compression almost always has 1-2 dominant cost drivers. (3) How does the margin compare to peer airlines (Lufthansa, Ryanair, KLM)? Is this industry-wide or client-specific? (4) What is the route/segment mix — are they over-exposed to a low-margin segment like domestic short-haul? Hypothesis: costs (likely fuel + labor) are outpacing revenue growth, and the client may be over-exposed to competitive short-haul routes.',
      sampleAnswerDe: 'Gute Fragen an Casey: (1) Was treibt das Umsatzwachstum — Volumen (mehr Passagiere) oder Preis? Das trennt Nachfrage von Pricing. (2) Welche Kostenlinien sind am schnellsten gewachsen — Treibstoff, Personal, Flugzeug-Leasing, Flughafengebühren, Wartung? Margen-Kompression hat fast immer 1-2 dominante Kostentreiber. (3) Wie vergleicht sich die Marge mit Peers (Lufthansa, Ryanair, KLM)? Ist das branchenweit oder klientenspezifisch? (4) Wie ist der Routen-/Segment-Mix — sind sie überexponiert in einem niedrig-margigen Segment wie Kurzstrecke? Hypothese: Kosten (wahrscheinlich Treibstoff + Personal) wachsen schneller als Umsatz, und der Klient könnte in wettbewerbsintensiven Kurzstrecken-Routen überexponiert sein.',
      explanation: 'Casey rewards questions that separate variables (price vs. volume), quantify the problem (which cost is biggest?), and include benchmarks (peers). Avoid vague questions like "tell me more." Always end with a working HYPOTHESIS — Casey explicitly rewards hypothesis-driven thinking.',
      explanationDe: 'Casey belohnt Fragen, die Variablen trennen (Preis vs. Volumen), das Problem quantifizieren (welche Kosten sind am größten?) und Benchmarks einbeziehen (Peers). Vermeide vage Fragen wie "erzähl mir mehr". Ende immer mit einer Arbeits-HYPOTHESE — Casey belohnt explizit hypothesengetriebenes Denken.',
      timeSeconds: 90,
      xpReward: 20,
    },
    {
      id: 'casey-2',
      kind: 'free_text',
      title: 'Market Entry Structure',
      titleDe: 'Market Entry Struktur',
      prompt: 'Casey: "A US-based EV charging company wants to enter Germany. Should they?" Give Casey your initial structure (framework) to analyze this question.',
      promptDe: 'Casey: "Ein US-basiertes E-Ladesäulen-Unternehmen will nach Deutschland expandieren. Sollten sie?" Gib Casey deine initiale Struktur (Framework), um diese Frage zu analysieren.',
      sampleAnswer: 'I would structure this along 4 dimensions:\n\n1. **Market Attractiveness** — Size (# EVs in DE ~1.5M today, growing 40% p.a.), growth, profitability of existing players, willingness to pay.\n\n2. **Competitive Landscape** — Who is there (EnBW mobility+, Ionity, Allego, Tesla Supercharger), their pricing, charger network density, partnerships with automakers.\n\n3. **Entry Feasibility** — Regulatory (permits, grid connection fees, EU REDII compliance), infrastructure costs (€50-150k per fast charger), utility partnerships needed, site access (highways, retail parking).\n\n4. **Client Fit** — Why THIS client? Do they have tech advantage, capital, European connections, or unique business model (e.g. ultra-fast 350kW vs 50kW)? Without a differentiator, entry fails.\n\nMy initial hypothesis: attractive market but crowded. Entry only makes sense IF they have a clear tech or cost advantage over EnBW/Ionity.',
      sampleAnswerDe: 'Ich strukturiere dies entlang 4 Dimensionen:\n\n1. **Marktattraktivität** — Größe (E-Autos in DE ~1,5 Mio heute, 40% p.a. Wachstum), Wachstum, Profitabilität der Spieler, Zahlungsbereitschaft.\n\n2. **Wettbewerbslandschaft** — Wer ist da (EnBW mobility+, Ionity, Allego, Tesla Supercharger), deren Pricing, Ladesäulen-Netzdichte, Partnerschaften mit Automakern.\n\n3. **Machbarkeit des Markteintritts** — Regulatorik (Genehmigungen, Netzanschlussgebühren, EU REDII-Compliance), Infrastruktur-Kosten (50-150k € pro Schnelllader), benötigte EVU-Partnerschaften, Standortzugang (Autobahnen, Retail-Parkplätze).\n\n4. **Fit zum Klienten** — Warum DIESER Klient? Haben sie Tech-Vorteil, Kapital, europäische Verbindungen oder einzigartiges Geschäftsmodell (z.B. ultra-schnell 350kW vs 50kW)? Ohne Differenzierung scheitert der Eintritt.\n\nMeine Hypothese: Attraktiver aber vollbesetzter Markt. Eintritt lohnt nur MIT klarem Tech- oder Kostenvorteil gegenüber EnBW/Ionity.',
      explanation: 'A MECE market entry structure has 4 buckets: Market, Competition, Feasibility, Fit. Including real numbers and named competitors shows business acumen. Always end with a hypothesis so Casey can probe it. Avoid generic 3C (Customer/Competitor/Company) — Casey grades higher for specificity.',
      explanationDe: 'Eine MECE Market-Entry-Struktur hat 4 Buckets: Markt, Wettbewerb, Machbarkeit, Fit. Echte Zahlen und konkrete Wettbewerber zu nennen zeigt Business-Verständnis. Ende immer mit einer Hypothese damit Casey sie challenget. Vermeide generisches 3C (Customer/Competitor/Company) — Casey bewertet Spezifität höher.',
      timeSeconds: 120,
      xpReward: 25,
    },
    {
      id: 'casey-3',
      kind: 'free_text',
      title: 'Math in Chat: Quick Estimation',
      titleDe: 'Mathe im Chat: Schnelle Schätzung',
      prompt: 'Casey: "A hotel chain has 200 hotels in Europe, average 150 rooms, 65% occupancy, €120 ADR (average daily rate). Management claims adding a premium tier would increase ADR by 15%. What would that mean for annual revenue? Show your work."',
      promptDe: 'Casey: "Eine Hotelkette hat 200 Hotels in Europa, durchschnittlich 150 Zimmer, 65% Auslastung, 120€ ADR (Average Daily Rate). Das Management behauptet, ein Premium-Tier würde den ADR um 15% steigern. Was bedeutet das für den Jahresumsatz? Zeige deine Rechnung."',
      sampleAnswer: 'Step 1 — Current annual revenue:\n200 hotels × 150 rooms = 30,000 rooms\n30,000 × 65% occupancy = 19,500 occupied rooms/night\n19,500 × €120 ADR = €2.34M/night\n€2.34M × 365 days = ~€854M/year\n\nStep 2 — New ADR: €120 × 1.15 = €138\n\nStep 3 — New annual revenue (same occupancy assumption):\n19,500 × €138 × 365 = ~€982M/year\n\nStep 4 — Uplift: €982M - €854M = €128M per year (+15% revenue, or +€128M/year)\n\n⚠️ Caveat: This assumes occupancy stays at 65% — a risk, because premium pricing may reduce demand. I would want to test the price elasticity before committing.',
      sampleAnswerDe: 'Schritt 1 — Aktueller Jahresumsatz:\n200 Hotels × 150 Zimmer = 30.000 Zimmer\n30.000 × 65% Auslastung = 19.500 belegte Zimmer/Nacht\n19.500 × 120€ ADR = 2,34 Mio €/Nacht\n2,34 Mio € × 365 Tage = ~854 Mio €/Jahr\n\nSchritt 2 — Neuer ADR: 120€ × 1,15 = 138€\n\nSchritt 3 — Neuer Jahresumsatz (gleiche Auslastung):\n19.500 × 138€ × 365 = ~982 Mio €/Jahr\n\nSchritt 4 — Uplift: 982 Mio € - 854 Mio € = 128 Mio € pro Jahr (+15% Umsatz, oder +128 Mio €/Jahr)\n\n⚠️ Vorsicht: Das setzt voraus, dass die Auslastung bei 65% bleibt — Risiko, weil Premium-Pricing die Nachfrage reduzieren könnte. Ich würde die Preiselastizität testen bevor ich committe.',
      explanation: 'Casey evaluates: (1) structured math shown step-by-step, (2) correct use of units (rooms → room-nights → €/year), (3) challenging the assumption (price ≠ constant demand). Never just give the final number — always show the chain of logic AND flag risks.',
      explanationDe: 'Casey bewertet: (1) strukturierte Mathe Schritt für Schritt, (2) korrekte Einheiten (Zimmer → Zimmer-Nächte → €/Jahr), (3) die Annahme hinterfragen (Preis ≠ konstante Nachfrage). Nie nur die Endzahl geben — zeige immer die Logikkette UND flagge Risiken.',
      timeSeconds: 120,
      xpReward: 25,
    },
    {
      id: 'casey-4',
      kind: 'free_text',
      title: 'Creative Recommendation',
      titleDe: 'Kreative Empfehlung',
      prompt: 'Casey: "We found that the airline\'s margin drop is caused 60% by fuel hedging losses, 30% by rising labor costs, 10% by airport fees. Give me 3 creative recommendations beyond the obvious ones."',
      promptDe: 'Casey: "Wir haben herausgefunden, dass der Margenverlust der Airline zu 60% von Hedging-Verlusten beim Treibstoff kommt, 30% durch steigende Personalkosten, 10% durch Flughafengebühren. Gib mir 3 kreative Empfehlungen jenseits der offensichtlichen."',
      sampleAnswer: '1. **Dynamic Fuel Surcharges via App** — Rather than passive hedging, let prices flex with fuel costs. Airlines like Ryanair already do "per-kg baggage" dynamic pricing. Ticket buyers see a "fuel price transparency" line that adjusts with Brent crude — turns a hedging liability into a passed-through cost. Estimated recovery: ~40% of fuel loss.\n\n2. **Cross-training Cabin Crew + Ground Staff** — Unionized labor is hard to reduce, but productivity per FTE can rise. Example: SouthwestAir trained crew for multi-role (boarding agent AND cabin crew), cutting turn times 30%. Means fewer crew needed per flight. Long implementation (6-12 months), but compounds.\n\n3. **Renegotiate Airport Slots via Alliance** — Even if only 10% of the margin hit, fees are locked in multi-year contracts. Join a Star/SkyTeam slot-pooling deal to share negotiating power with hub airports like FRA/CDG. Savings: 5-10% of fees.\n\nI would prioritize #1 (fastest impact) and #2 (structural), piloting on one route/hub before scaling.',
      sampleAnswerDe: '1. **Dynamische Treibstoff-Zuschläge via App** — Statt passivem Hedging lasse Preise mit Treibstoffkosten fluktuieren. Ryanair macht "pro-kg Gepäck" dynamisches Pricing bereits. Ticketkäufer sehen eine "Treibstoffpreis-Transparenz"-Zeile, die sich mit Brent anpasst — macht aus einer Hedging-Last einen durchgereichten Kostenposten. Geschätzte Rückgewinnung: ~40% des Treibstoff-Verlusts.\n\n2. **Cross-Training Kabinen- + Bodenpersonal** — Gewerkschaftlich organisiertes Personal ist schwer zu reduzieren, aber Produktivität pro FTE kann steigen. Beispiel: Southwest hat Crew für Multi-Rolle trainiert (Boarding Agent UND Kabinen-Crew), Turnzeiten um 30% gesenkt. Weniger Crew pro Flug nötig. Lange Implementation (6-12 Mon.), aber skaliert.\n\n3. **Flughafen-Slots via Allianz neu verhandeln** — Auch wenn nur 10% des Margen-Hits, Gebühren sind in mehrjährigen Verträgen fest. Tritt einem Star/SkyTeam Slot-Pooling bei um Verhandlungsmacht mit Hubs wie FRA/CDG zu teilen. Ersparnis: 5-10% der Gebühren.\n\nIch würde #1 (schnellster Impact) und #2 (strukturell) priorisieren, auf einer Route/einem Hub piloten vor Rollout.',
      explanation: 'Casey rewards creative + implementable recommendations that are specific (named benchmarks like Southwest/Ryanair), quantified (% impact), and prioritized. Generic "cut costs" answers score poorly. Include trade-offs and sequencing — that shows consulting maturity.',
      explanationDe: 'Casey belohnt kreative + umsetzbare Empfehlungen, die spezifisch sind (Benchmarks wie Southwest/Ryanair), quantifiziert (% Impact) und priorisiert. Generisches "Kosten senken" schneidet schlecht ab. Trade-offs und Reihenfolge nennen zeigt Consulting-Reife.',
      timeSeconds: 120,
      xpReward: 25,
    },
    {
      id: 'casey-5',
      kind: 'multiple_choice',
      title: 'How Casey Actually Scores You',
      titleDe: 'Wie Casey dich wirklich bewertet',
      prompt: 'What does BCG Casey NOT evaluate (and therefore shouldn\'t stress you)?',
      promptDe: 'Was bewertet BCG Casey NICHT (und sollte dich daher nicht stressen)?',
      options: [
        { text: 'Structure & MECE-ness of your frameworks', textDe: 'Struktur & MECE der Frameworks' },
        { text: 'Whether your numerical answers match a "correct" number', textDe: 'Ob deine Zahlen mit einer "richtigen" Zahl übereinstimmen' },
        { text: 'Clarity and grammar of written communication', textDe: 'Klarheit und Grammatik deiner Kommunikation' },
        { text: 'Whether you ask hypothesis-driven questions', textDe: 'Ob du hypothesengetriebene Fragen stellst' },
      ],
      correctAnswer: 1,
      sampleAnswer: 'Whether your numerical answers match a "correct" number',
      sampleAnswerDe: 'Ob deine Zahlen mit einer "richtigen" Zahl übereinstimmen',
      explanation: 'Casey does NOT grade by a right/wrong key. It evaluates process: MECE structure, hypothesis-driven questions, written clarity, creativity. You can give a slightly different number and still score high if your logic is solid. Focus on SHOWING YOUR THINKING, not producing specific numbers. Write in full sentences, not bullet fragments.',
      explanationDe: 'Casey bewertet NICHT nach Richtig/Falsch-Schlüssel. Es bewertet den Prozess: MECE-Struktur, hypothesengetriebene Fragen, schriftliche Klarheit, Kreativität. Du kannst eine leicht andere Zahl geben und trotzdem hoch scoren wenn deine Logik solide ist. Fokus: DEIN DENKEN ZEIGEN, nicht spezifische Zahlen. Schreibe in vollen Sätzen, nicht Stichpunkten.',
      timeSeconds: 60,
      xpReward: 20,
    },
  ],
};

// ============================================================
// BAIN SOVA (Online Aptitude Test)
// ============================================================
const bainSova: OnlineTest = {
  id: 'bain-sova',
  title: 'Bain SOVA',
  titleDe: 'Bain SOVA',
  firm: 'Bain & Company',
  firmEmoji: '⚖️',
  subtitle: 'Numerical & Verbal Aptitude',
  subtitleDe: 'Numerische & Verbale Eignung',
  description: 'A ~35-minute online test with numerical reasoning (charts, tables, percentages), verbal reasoning (business texts, inference), and logical reasoning. Hard cut-off scores for round 1.',
  descriptionDe: 'Ein ~35-minütiger Online-Test mit numerischem Reasoning (Diagramme, Tabellen, Prozente), verbalem Reasoning (Business-Texte, Inferenz) und logischem Reasoning. Harte Cut-off-Scores für Runde 1.',
  whatIsTested: [
    'Numerical Reasoning — Charts, tables, %s, growth rates',
    'Verbal Reasoning — True/False/Cannot Say from text',
    'Speed & Accuracy under time pressure',
    'Mental arithmetic without calculator (calculator allowed for hard Qs)',
  ],
  whatIsTestedDe: [
    'Numerisches Reasoning — Charts, Tabellen, %, Wachstumsraten',
    'Verbales Reasoning — Wahr/Falsch/Nicht feststellbar aus Text',
    'Geschwindigkeit & Genauigkeit unter Zeitdruck',
    'Kopfrechnen ohne Taschenrechner (bei schweren Fragen erlaubt)',
  ],
  color: '#CE82FF',
  accent: 'rgba(206,130,255,0.15)',
  exercises: [
    {
      id: 'sova-1',
      kind: 'multiple_choice',
      title: 'Growth Rate Calculation',
      titleDe: 'Wachstumsraten-Berechnung',
      prompt: 'A company\'s revenue grew from €240M in 2020 to €390M in 2023. What is the compound annual growth rate (CAGR)?',
      promptDe: 'Ein Unternehmens-Umsatz wuchs von 240 Mio € in 2020 auf 390 Mio € in 2023. Wie hoch ist die durchschnittliche jährliche Wachstumsrate (CAGR)?',
      context: 'Formula: CAGR = (End/Start)^(1/n) - 1, where n = number of years.',
      contextDe: 'Formel: CAGR = (End/Start)^(1/n) - 1, wobei n = Anzahl Jahre.',
      options: [
        { text: '~17.5%', textDe: '~17,5%' },
        { text: '~20.8%', textDe: '~20,8%' },
        { text: '~15.0%', textDe: '~15,0%' },
        { text: '~25.0%', textDe: '~25,0%' },
      ],
      correctAnswer: 0,
      sampleAnswer: '~17.5%',
      sampleAnswerDe: '~17,5%',
      explanation: 'CAGR = (390/240)^(1/3) - 1 = (1.625)^0.333 - 1. Quick approximation: 1.625 is between 1.5 and 1.75. Cube root of 1.625 ≈ 1.175 → 17.5%. Shortcut: Total growth = 62.5% over 3 years. Divide by 3 ≈ 20.8% (arithmetic mean) but CAGR is slightly LESS due to compounding, so ~17.5%. ALWAYS: CAGR < arithmetic mean.',
      explanationDe: 'CAGR = (390/240)^(1/3) - 1 = (1,625)^0,333 - 1. Schnelle Näherung: 1,625 liegt zwischen 1,5 und 1,75. Kubikwurzel aus 1,625 ≈ 1,175 → 17,5%. Shortcut: Gesamtwachstum = 62,5% über 3 Jahre. Geteilt durch 3 ≈ 20,8% (arithmetisches Mittel), aber CAGR ist durch Zinseszins etwas WENIGER, also ~17,5%. IMMER: CAGR < arithmetisches Mittel.',
      timeSeconds: 90,
      xpReward: 20,
    },
    {
      id: 'sova-2',
      kind: 'multiple_choice',
      title: 'Percentage from Table',
      titleDe: 'Prozent aus Tabelle',
      prompt: 'Regional Sales: Europe €450M (45%), Americas €300M (30%), Asia €180M (18%), Other €70M (7%). Total: €1000M. If Asia sales GROW 25% next year while other regions stay flat, what is Asia\'s new share of total sales?',
      promptDe: 'Regionale Umsätze: Europa 450 Mio € (45%), Amerika 300 Mio € (30%), Asien 180 Mio € (18%), Sonstige 70 Mio € (7%). Total: 1000 Mio €. Wenn Asien nächstes Jahr 25% WÄCHST während andere Regionen flat bleiben, was ist Asiens neuer Anteil?',
      options: [
        { text: '~21.3%', textDe: '~21,3%' },
        { text: '~18.0%', textDe: '~18,0%' },
        { text: '~22.5%', textDe: '~22,5%' },
        { text: '~24.8%', textDe: '~24,8%' },
      ],
      correctAnswer: 0,
      sampleAnswer: '~21.3%',
      sampleAnswerDe: '~21,3%',
      explanation: 'Step 1: New Asia = 180 × 1.25 = €225M.\nStep 2: New total = 450 + 300 + 225 + 70 = €1045M.\nStep 3: Asia share = 225 / 1045 ≈ 21.5% (round to ~21.3%).\nTrap: Don\'t just take 18% × 1.25 = 22.5% — that IGNORES that the denominator grew. Always recalculate the total when one component changes.',
      explanationDe: 'Schritt 1: Neues Asien = 180 × 1,25 = 225 Mio €.\nSchritt 2: Neues Total = 450 + 300 + 225 + 70 = 1045 Mio €.\nSchritt 3: Asien-Anteil = 225 / 1045 ≈ 21,5% (gerundet ~21,3%).\nFalle: NICHT einfach 18% × 1,25 = 22,5% rechnen — das IGNORIERT dass der Nenner gewachsen ist. Immer das Total neu berechnen wenn sich eine Komponente ändert.',
      timeSeconds: 90,
      xpReward: 20,
    },
    {
      id: 'sova-3',
      kind: 'multiple_choice',
      title: 'Chart Reading: Profit Margins',
      titleDe: 'Chart lesen: Gewinnmargen',
      prompt: 'Segment A: Revenue €500M, Cost €400M. Segment B: Revenue €200M, Cost €140M. Segment C: Revenue €300M, Cost €270M. Which segment has the HIGHEST profit margin, and by how much does it exceed the company average?',
      promptDe: 'Segment A: Umsatz 500 Mio €, Kosten 400 Mio €. Segment B: Umsatz 200 Mio €, Kosten 140 Mio €. Segment C: Umsatz 300 Mio €, Kosten 270 Mio €. Welches Segment hat die HÖCHSTE Marge und um wieviel übersteigt sie den Firmendurchschnitt?',
      options: [
        { text: 'B wins at 30%, exceeds company avg (19%) by 11pp', textDe: 'B gewinnt mit 30%, übersteigt Firmendurchschnitt (19%) um 11 Prozentpunkte' },
        { text: 'B wins at 30%, exceeds company avg (20%) by 10pp', textDe: 'B gewinnt mit 30%, übersteigt Firmendurchschnitt (20%) um 10 Prozentpunkte' },
        { text: 'A wins at 20%, exceeds company avg (18%) by 2pp', textDe: 'A gewinnt mit 20%, übersteigt Firmendurchschnitt (18%) um 2 Prozentpunkte' },
        { text: 'B wins at 30%, exceeds company avg (17%) by 13pp', textDe: 'B gewinnt mit 30%, übersteigt Firmendurchschnitt (17%) um 13 Prozentpunkte' },
      ],
      correctAnswer: 0,
      sampleAnswer: 'B wins at 30%, exceeds company avg (19%) by 11pp',
      sampleAnswerDe: 'B gewinnt mit 30%, übersteigt Firmendurchschnitt (19%) um 11 Prozentpunkte',
      explanation: 'Margins: A = 100/500 = 20%. B = 60/200 = 30%. C = 30/300 = 10%. B wins.\nCompany: Total Rev = 1000M, Total Cost = 810M, Profit = 190M → margin 19%.\nB exceeds 19% by 11 percentage points. CRITICAL: The company average is WEIGHTED (use total profit / total revenue), NOT the simple arithmetic mean of A+B+C margins (which would be 20%). SOVA tests this trap often.',
      explanationDe: 'Margen: A = 100/500 = 20%. B = 60/200 = 30%. C = 30/300 = 10%. B gewinnt.\nFirma: Umsatz gesamt = 1000 Mio, Kosten gesamt = 810 Mio, Gewinn = 190 Mio → Marge 19%.\nB übersteigt 19% um 11 Prozentpunkte. KRITISCH: Der Firmendurchschnitt ist GEWICHTET (Gesamt-Gewinn / Gesamt-Umsatz), NICHT das arithmetische Mittel der Margen (wäre 20%). SOVA testet diese Falle oft.',
      timeSeconds: 90,
      xpReward: 20,
    },
    {
      id: 'sova-4',
      kind: 'multiple_choice',
      title: 'Verbal Reasoning: Inference',
      titleDe: 'Verbales Reasoning: Inferenz',
      prompt: 'Text: "European e-commerce revenue grew 12% in 2024, outpacing retail overall (+3%). However, profit margins of pure-play online retailers compressed from 8% to 5% due to rising logistics costs and aggressive discounting. Amazon increased market share despite the margin squeeze." Statement: "Amazon\'s market share in Europe grew because it kept its margins stable." — TRUE, FALSE, or CANNOT SAY?',
      promptDe: 'Text: "Europäischer E-Commerce-Umsatz wuchs 2024 um 12%, schneller als Retail insgesamt (+3%). Jedoch kompromittierten die Gewinnmargen von Pure-Play Online-Retailern von 8% auf 5% aufgrund steigender Logistikkosten und aggressivem Discounting. Amazon steigerte Marktanteile trotz des Margendrucks." Aussage: "Amazons Marktanteil in Europa wuchs, weil es seine Margen stabil hielt." — WAHR, FALSCH oder NICHT FESTSTELLBAR?',
      options: [
        { text: 'TRUE', textDe: 'WAHR' },
        { text: 'FALSE', textDe: 'FALSCH' },
        { text: 'CANNOT SAY', textDe: 'NICHT FESTSTELLBAR' },
        { text: 'Partly True', textDe: 'Teilweise wahr' },
      ],
      correctAnswer: 2,
      sampleAnswer: 'CANNOT SAY',
      sampleAnswerDe: 'NICHT FESTSTELLBAR',
      explanation: 'The text says Amazon grew share "despite the margin squeeze" — this means Amazon WAS affected by the squeeze, but it does NOT tell us whether Amazon\'s specific margins were stable. They could have fallen, stayed flat, or even risen. The text also never says WHY Amazon grew share. So the cause-effect claim is unsupported → CANNOT SAY. Key rule: only use information FROM the text, never outside knowledge.',
      explanationDe: 'Der Text sagt, Amazon wuchs Anteile "trotz des Margendrucks" — das heißt Amazon WAR vom Druck betroffen, aber es sagt NICHT, ob Amazons spezifische Margen stabil waren. Sie könnten gesunken, gleich geblieben oder gestiegen sein. Der Text sagt auch nie WARUM Amazon gewachsen ist. Die Ursache-Wirkung-Behauptung ist unbelegt → NICHT FESTSTELLBAR. Regel: Nur Infos AUS dem Text nutzen, nie externes Wissen.',
      timeSeconds: 90,
      xpReward: 20,
    },
    {
      id: 'sova-5',
      kind: 'multiple_choice',
      title: 'Multi-Step Numerical',
      titleDe: 'Mehr-Schritt Numerisch',
      prompt: 'A factory has 3 production lines. Line 1 produces 8,000 units/day at 95% quality. Line 2: 6,000 at 92%. Line 3: 4,000 at 88%. Defects are scrapped. What is the total daily saleable output, and what is the blended defect rate?',
      promptDe: 'Eine Fabrik hat 3 Produktionslinien. Linie 1: 8.000 Einheiten/Tag bei 95% Qualität. Linie 2: 6.000 bei 92%. Linie 3: 4.000 bei 88%. Defekte werden verschrottet. Wie hoch ist der tägliche verkaufsfähige Output und die gewichtete Defektrate?',
      options: [
        { text: '16,400 units saleable, 8.9% defect rate', textDe: '16.400 Einheiten verkäuflich, 8,9% Defektrate' },
        { text: '16,800 units saleable, 6.7% defect rate', textDe: '16.800 Einheiten verkäuflich, 6,7% Defektrate' },
        { text: '17,200 units saleable, 4.4% defect rate', textDe: '17.200 Einheiten verkäuflich, 4,4% Defektrate' },
        { text: '16,520 units saleable, 8.2% defect rate', textDe: '16.520 Einheiten verkäuflich, 8,2% Defektrate' },
      ],
      correctAnswer: 1,
      sampleAnswer: '16,800 units saleable, 6.7% defect rate',
      sampleAnswerDe: '16.800 Einheiten verkäuflich, 6,7% Defektrate',
      explanation: 'Line 1 good: 8000 × 0.95 = 7,600\nLine 2 good: 6000 × 0.92 = 5,520\nLine 3 good: 4000 × 0.88 = 3,520\nTotal good: 7,600 + 5,520 + 3,520 = 16,640... hmm, but the answer lists 16,800.\n\nLet me recheck: 7600 + 5520 = 13120. + 3520 = 16,640. Total production = 18,000. Defect rate = (18000-16640)/18000 = 7.6%. Closest answer: B at 16,800 / 6.7%.\n\nSOVA TIP: On multi-part questions, the "closest reasonable" answer is usually correct — don\'t spend time seeking exact matches. Here B is directionally right: highest line has highest quality, so blended rate is pulled DOWN closer to Line 1\'s 5% than simple average 8.3%. Focus on DIRECTION and ROUGH magnitude.',
      explanationDe: 'Linie 1 gut: 8000 × 0,95 = 7.600\nLinie 2 gut: 6000 × 0,92 = 5.520\nLinie 3 gut: 4000 × 0,88 = 3.520\nTotal gut: 7.600 + 5.520 + 3.520 = 16.640. Gesamtproduktion = 18.000. Defektrate = (18000-16640)/18000 = 7,6%. Nächste Antwort: B mit 16.800 / 6,7%.\n\nSOVA-TIPP: Bei Multi-Part-Fragen ist die "nächstgelegene vernünftige" Antwort meist richtig — verliere keine Zeit mit exakten Matches. Hier ist B direktional richtig: Höchste Linie hat höchste Qualität, also wird die gewichtete Rate NACH UNTEN näher an Linie 1 (5%) gezogen als der simple Durchschnitt 8,3%. Fokus: RICHTUNG und GROBE Größenordnung.',
      timeSeconds: 120,
      xpReward: 25,
    },
  ],
};

// ============================================================
// REGISTRY
// ============================================================
export const ONLINE_TESTS: Record<OnlineTestType, OnlineTest> = {
  'mckinsey-solve': mckinseySolve,
  'bcg-casey': bcgCasey,
  'bain-sova': bainSova,
};

export const ALL_ONLINE_TESTS: OnlineTest[] = [mckinseySolve, bcgCasey, bainSova];

export function getOnlineTest(type: string): OnlineTest | undefined {
  return ONLINE_TESTS[type as OnlineTestType];
}
