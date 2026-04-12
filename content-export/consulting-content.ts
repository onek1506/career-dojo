// ============================================================
// CareerDojo — CONSULTING TRACK — Complete Content
// Sources: PrepLounge, Victor Cheng, Case in Point, McKinsey/BCG/Bain Prep,
// Firm Learning, David Döbele, Management Consulted
// ============================================================

import { Track } from './content';

export const consultingTrack: Track = {
  id: 'consulting',
  title: 'Management Consulting',
  titleDe: 'Unternehmensberatung',
  description: 'Crack MBB-level case interviews and master structured problem solving',
  descriptionDe: 'Knacke MBB-Level Case Interviews und meistere strukturiertes Problemlösen',
  units: [
    // ========== UNIT 1: CONSULTING FUNDAMENTALS ==========
    {
      id: 'con-fundamentals',
      title: 'Consulting Fundamentals',
      titleDe: 'Consulting Grundlagen',
      description: 'What consultants actually do and who the big players are',
      descriptionDe: 'Was Berater wirklich tun und wer die großen Player sind',
      icon: '🦉',
      difficulty: 'beginner',
      order: 1,
      requiredXp: 0,
      color: '#FF9600',
      lessons: [
        {
          id: 'con-1-what-is-consulting',
          unitId: 'con-fundamentals',
          title: 'What is Management Consulting?',
          titleDe: 'Was ist Unternehmensberatung?',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 15,
          estimatedMinutes: 8,
          content: {
            sections: [
              {
                heading: 'The World of Consulting',
                headingDe: 'Die Welt der Beratung',
                body: 'Management consultants are hired by companies to solve complex business problems. Think of them as "doctors for businesses" — they diagnose problems, prescribe solutions, and help implement them.\n\nConsulting firms sell **expertise and structured thinking**. A typical project (called an "engagement") lasts 2-12 weeks and involves a team of 3-6 consultants working at the client\'s office.\n\n**What consultants actually do:**\n- Analyze data and market trends\n- Interview stakeholders and experts\n- Develop strategic recommendations\n- Present findings to C-suite executives\n- Help implement changes',
                bodyDe: 'Unternehmensberater werden von Firmen engagiert, um komplexe Geschäftsprobleme zu lösen. Denk an sie wie "Ärzte für Unternehmen" — sie diagnostizieren Probleme, verschreiben Lösungen und helfen bei der Umsetzung.\n\nBeratungsfirmen verkaufen **Expertise und strukturiertes Denken**. Ein typisches Projekt (genannt "Engagement") dauert 2-12 Wochen und umfasst ein Team von 3-6 Beratern, die beim Kunden vor Ort arbeiten.\n\n**Was Berater wirklich tun:**\n- Daten und Markttrends analysieren\n- Stakeholder und Experten interviewen\n- Strategische Empfehlungen entwickeln\n- Ergebnisse vor dem C-Level präsentieren\n- Bei der Umsetzung helfen',
                keyTakeaway: 'Consulting = Solving complex business problems with structured thinking',
                keyTakeawayDe: 'Beratung = Komplexe Geschäftsprobleme mit strukturiertem Denken lösen',
                detailedExample: '**Example: A typical consulting project**\n\nA retail chain sees declining sales. McKinsey gets hired for 8 weeks.\n- Week 1-2: Data analysis, store visits, customer interviews\n- Week 3-4: Identify root causes (pricing too high, wrong product mix, poor store layout)\n- Week 5-6: Develop recommendations (new pricing strategy, store redesign, digital strategy)\n- Week 7-8: Present to CEO, create implementation roadmap\n\nFee: ~€500,000-1,500,000 for this engagement.',
                detailedExampleDe: '**Beispiel: Ein typisches Beratungsprojekt**\n\nEine Einzelhandelskette verzeichnet sinkende Umsätze. McKinsey wird für 8 Wochen engagiert.\n- Woche 1-2: Datenanalyse, Filialbesuche, Kundeninterviews\n- Woche 3-4: Ursachen identifizieren (zu hohe Preise, falscher Produktmix, schlechtes Ladenlayout)\n- Woche 5-6: Empfehlungen entwickeln (neue Preisstrategie, Ladenredesign, Digitalstrategie)\n- Woche 7-8: Präsentation vor CEO, Implementierungs-Roadmap\n\nHonorar: ~€500.000-1.500.000 für dieses Engagement.',
              },
              {
                heading: 'The Consulting Career Path',
                headingDe: 'Der Karriereweg in der Beratung',
                body: '**Typical hierarchy (MBB):**\n\n1. **Business Analyst / Junior Consultant** (2-3 years) — Data crunching, slide building, analysis\n2. **Associate / Consultant** (2-3 years) — Leading workstreams, client interaction\n3. **Engagement Manager / Project Leader** (2-3 years) — Running entire projects\n4. **Associate Partner / Principal** (2-4 years) — Selling projects, managing client relationships\n5. **Partner / Senior Partner** — Firm leadership, major client accounts\n\nThe "up or out" culture means: get promoted on schedule or leave. Most people exit after 2-4 years to industry roles ("Exit Opportunities").',
                bodyDe: '**Typische Hierarchie (MBB):**\n\n1. **Business Analyst / Junior Consultant** (2-3 Jahre) — Datenarbeit, Folien bauen, Analysen\n2. **Associate / Consultant** (2-3 Jahre) — Workstreams leiten, Kundenkontakt\n3. **Engagement Manager / Project Leader** (2-3 Jahre) — Gesamte Projekte führen\n4. **Associate Partner / Principal** (2-4 Jahre) — Projekte verkaufen, Kundenbeziehungen managen\n5. **Partner / Senior Partner** — Firmenleitung, große Kundenaccounts\n\nDie "Up or Out"-Kultur bedeutet: Werde rechtzeitig befördert oder geh. Die meisten steigen nach 2-4 Jahren aus für Industrie-Rollen ("Exit Opportunities").',
                tip: 'Interview tip: Know the exact career path of the firm you\'re applying to — they vary slightly between MBB, Big 4, and boutiques.',
                tipDe: 'Interview-Tipp: Kenne den genauen Karriereweg der Firma, bei der du dich bewirbst — sie unterscheiden sich leicht zwischen MBB, Big 4 und Boutiquen.',
              },
            ]
          },
          quiz: [
            {
              id: 'con-1-q1',
              question: 'What do management consultants primarily sell?',
              questionDe: 'Was verkaufen Unternehmensberater primär?',
              type: 'multiple_choice',
              options: [
                { text: 'Software products', textDe: 'Softwareprodukte' },
                { text: 'Expertise and structured thinking', textDe: 'Expertise und strukturiertes Denken' },
                { text: 'Accounting services', textDe: 'Buchhaltungsdienstleistungen' },
                { text: 'Temporary employees', textDe: 'Zeitarbeitskräfte' },
              ],
              correctAnswer: 1,
              explanation: 'Consulting firms sell expertise and structured problem-solving. They help companies make better decisions by providing an outside perspective backed by analytical rigor.',
              explanationDe: 'Beratungsfirmen verkaufen Expertise und strukturiertes Problemlösen. Sie helfen Unternehmen, bessere Entscheidungen zu treffen, durch eine externe Perspektive mit analytischer Genauigkeit.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'con-1-q2',
              question: 'What does "up or out" mean in consulting?',
              questionDe: 'Was bedeutet "Up or Out" in der Beratung?',
              type: 'multiple_choice',
              options: [
                { text: 'You must travel up to the client\'s office', textDe: 'Du musst zum Büro des Kunden reisen' },
                { text: 'Get promoted on schedule or leave the firm', textDe: 'Werde rechtzeitig befördert oder verlasse die Firma' },
                { text: 'Work overtime or go home early', textDe: 'Überstunden machen oder früh nach Hause gehen' },
                { text: 'Start your own firm or stay as employee', textDe: 'Eigene Firma gründen oder Angestellter bleiben' },
              ],
              correctAnswer: 1,
              explanation: '"Up or out" is the consulting industry culture where you\'re expected to advance through the ranks on a set timeline. If you don\'t get promoted, you\'re typically encouraged to leave.',
              explanationDe: '"Up or Out" ist die Beratungsbranche-Kultur, in der man in einem festen Zeitplan aufsteigen soll. Wenn man nicht befördert wird, wird man typischerweise ermutigt zu gehen.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
        {
          id: 'con-1-big-players',
          unitId: 'con-fundamentals',
          title: 'The Big Players: MBB, Big 4, Boutiques',
          titleDe: 'Die großen Player: MBB, Big 4, Boutiquen',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 15,
          estimatedMinutes: 7,
          content: {
            sections: [
              {
                heading: 'MBB — The Big Three',
                headingDe: 'MBB — Die großen Drei',
                body: '**McKinsey & Company** — "The Firm"\n- Founded 1926, ~30,000 consultants\n- Known for: CEO advisory, organizational transformations\n- Culture: Analytical rigor, "obligation to dissent"\n\n**Boston Consulting Group (BCG)**\n- Founded 1963, ~25,000 consultants\n- Known for: Growth matrix (BCG Matrix), innovation focus\n- Culture: Collaborative, intellectual curiosity\n\n**Bain & Company**\n- Founded 1973, ~14,000 consultants\n- Known for: Results-oriented, PE advisory (Bain Capital connection)\n- Culture: "Bainie" culture, tight-knit, fun\n\nMBB firms work on the most complex, high-stakes problems and charge the highest fees (~€3,000-5,000/day per consultant).',
                bodyDe: '**McKinsey & Company** — "The Firm"\n- Gegründet 1926, ~30.000 Berater\n- Bekannt für: CEO-Beratung, Organisationstransformationen\n- Kultur: Analytische Strenge, "Pflicht zum Widerspruch"\n\n**Boston Consulting Group (BCG)**\n- Gegründet 1963, ~25.000 Berater\n- Bekannt für: BCG-Matrix, Innovationsfokus\n- Kultur: Kollaborativ, intellektuelle Neugier\n\n**Bain & Company**\n- Gegründet 1973, ~14.000 Berater\n- Bekannt für: Ergebnisorientiert, PE-Beratung (Bain Capital Verbindung)\n- Kultur: "Bainie"-Kultur, eng verbunden, Spaß\n\nMBB-Firmen arbeiten an den komplexesten, hochkarätigsten Problemen und verlangen die höchsten Honorare (~€3.000-5.000/Tag pro Berater).',
                keyTakeaway: 'MBB = McKinsey, BCG, Bain — the "gold standard" of consulting',
                keyTakeawayDe: 'MBB = McKinsey, BCG, Bain — der "Goldstandard" der Beratung',
              },
              {
                heading: 'Big 4 & Strategy Boutiques',
                headingDe: 'Big 4 & Strategieboutiquen',
                body: '**Big 4 Consulting Arms:**\n- **Deloitte** (Monitor Deloitte for strategy)\n- **PwC** (Strategy&, formerly Booz & Company)\n- **EY** (EY-Parthenon for strategy)\n- **KPMG** (KPMG Strategy)\n\nBig 4 have the advantage of massive scale and offer everything from strategy to implementation to tech.\n\n**Strategy Boutiques:**\n- **Roland Berger** — Leading European strategy firm (Munich HQ)\n- **Oliver Wyman** — Financial services focus\n- **LEK Consulting** — Strong in M&A and PE advisory\n- **Simon-Kucher** — Pricing and growth specialists\n- **Kearney** (formerly A.T. Kearney) — Operations focus\n\nBoutiques often offer deeper expertise in specific industries.',
                bodyDe: '**Big 4 Beratungsarme:**\n- **Deloitte** (Monitor Deloitte für Strategie)\n- **PwC** (Strategy&, ehemals Booz & Company)\n- **EY** (EY-Parthenon für Strategie)\n- **KPMG** (KPMG Strategy)\n\nBig 4 haben den Vorteil massiver Skalierung und bieten alles von Strategie bis Implementierung bis Tech.\n\n**Strategieboutiquen:**\n- **Roland Berger** — Führende europäische Strategieberatung (HQ München)\n- **Oliver Wyman** — Finanzdienstleistungsfokus\n- **LEK Consulting** — Stark in M&A und PE-Beratung\n- **Simon-Kucher** — Preis- und Wachstumsspezialisten\n- **Kearney** (ehem. A.T. Kearney) — Operations-Fokus\n\nBoutiquen bieten oft tiefere Expertise in bestimmten Branchen.',
              },
            ]
          },
          quiz: [
            {
              id: 'con-1-bp-q1',
              question: 'What does MBB stand for?',
              questionDe: 'Wofür steht MBB?',
              type: 'multiple_choice',
              options: [
                { text: 'McKinsey, BCG, Bain', textDe: 'McKinsey, BCG, Bain' },
                { text: 'McKinsey, Berger, BCG', textDe: 'McKinsey, Berger, BCG' },
                { text: 'Morgan, Blackstone, Bridgewater', textDe: 'Morgan, Blackstone, Bridgewater' },
                { text: 'Management, Business, Banking', textDe: 'Management, Business, Banking' },
              ],
              correctAnswer: 0,
              explanation: 'MBB stands for McKinsey, Boston Consulting Group (BCG), and Bain — the three most prestigious strategy consulting firms.',
              explanationDe: 'MBB steht für McKinsey, Boston Consulting Group (BCG) und Bain — die drei renommiertesten Strategieberatungen.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'con-1-bp-q2',
              question: 'Which firm is known as "The Firm" in consulting?',
              questionDe: 'Welche Firma wird in der Beratung "The Firm" genannt?',
              type: 'multiple_choice',
              options: [
                { text: 'BCG', textDe: 'BCG' },
                { text: 'Bain', textDe: 'Bain' },
                { text: 'McKinsey', textDe: 'McKinsey' },
                { text: 'Deloitte', textDe: 'Deloitte' },
              ],
              correctAnswer: 2,
              explanation: 'McKinsey & Company is colloquially known as "The Firm" — a testament to its dominant reputation in the consulting industry.',
              explanationDe: 'McKinsey & Company wird umgangssprachlich "The Firm" genannt — ein Zeichen ihrer dominanten Reputation in der Beratungsbranche.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
      ]
    },

    // ========== UNIT 2: CASE INTERVIEW FOUNDATIONS ==========
    {
      id: 'con-case-foundations',
      title: 'Case Interview Foundations',
      titleDe: 'Case Interview Grundlagen',
      description: 'Learn the structure and main frameworks for case interviews',
      descriptionDe: 'Lerne Struktur und Haupt-Frameworks für Case Interviews',
      icon: '🧩',
      difficulty: 'beginner',
      order: 2,
      requiredXp: 50,
      color: '#1CB0F6',
      lessons: [
        {
          id: 'con-2-case-structure',
          unitId: 'con-case-foundations',
          title: 'Case Interview Structure & Types',
          titleDe: 'Case Interview Aufbau & Typen',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 20,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'Anatomy of a Case Interview',
                headingDe: 'Anatomie eines Case Interviews',
                body: 'A case interview is a **30-45 minute business problem** you solve live with an interviewer. It tests your structured thinking, business judgment, and communication skills.\n\n**The 5 Phases:**\n1. **Listen & Clarify** (2 min) — Hear the case, ask clarifying questions\n2. **Structure** (3-5 min) — Present your framework/approach\n3. **Analysis** (15-25 min) — Work through the problem, analyze data\n4. **Math** (varies) — Calculate when needed (mental math!)\n5. **Recommendation** (2-3 min) — Give a clear, actionable recommendation\n\n**Golden Rule:** ALWAYS structure before diving in. The interviewer wants to see HOW you think, not just WHAT you think.',
                bodyDe: 'Ein Case Interview ist ein **30-45 minütiges Geschäftsproblem**, das du live mit einem Interviewer löst. Es testet dein strukturiertes Denken, Geschäftsurteil und Kommunikationsfähigkeiten.\n\n**Die 5 Phasen:**\n1. **Zuhören & Klären** (2 Min) — Case hören, Rückfragen stellen\n2. **Strukturieren** (3-5 Min) — Framework/Ansatz präsentieren\n3. **Analyse** (15-25 Min) — Problem durcharbeiten, Daten analysieren\n4. **Mathe** (variiert) — Rechnen wenn nötig (Kopfrechnen!)\n5. **Empfehlung** (2-3 Min) — Klare, umsetzbare Empfehlung geben\n\n**Goldene Regel:** IMMER erst strukturieren, bevor du eintauchst. Der Interviewer will sehen WIE du denkst, nicht nur WAS du denkst.',
                keyTakeaway: 'Structure first, then analyze. Never jump straight into the data.',
                keyTakeawayDe: 'Erst strukturieren, dann analysieren. Nie direkt in die Daten springen.',
              },
              {
                heading: 'The MECE Principle',
                headingDe: 'Das MECE-Prinzip',
                body: '**MECE = Mutually Exclusive, Collectively Exhaustive**\n\nThis is THE most important principle in consulting:\n\n- **Mutually Exclusive:** No overlap between categories. Each item belongs in exactly one bucket.\n- **Collectively Exhaustive:** All possibilities are covered. Nothing is left out.\n\n**Example — Segmenting a market:**\n❌ Not MECE: "Young people, women, premium customers" (overlaps!)\n✅ MECE: "Age 0-25, 26-45, 46-65, 65+" (no overlap, complete coverage)\n\n**Why it matters:** MECE frameworks ensure you don\'t double-count or miss anything. Every consulting slide, every analysis bucket should be MECE.',
                bodyDe: '**MECE = Mutually Exclusive, Collectively Exhaustive**\n\nDas ist DAS wichtigste Prinzip in der Beratung:\n\n- **Mutually Exclusive:** Kein Überlappen zwischen Kategorien. Jedes Element gehört in genau einen Topf.\n- **Collectively Exhaustive:** Alle Möglichkeiten sind abgedeckt. Nichts fehlt.\n\n**Beispiel — Marktsegmentierung:**\n❌ Nicht MECE: "Junge Leute, Frauen, Premium-Kunden" (Überlappung!)\n✅ MECE: "Alter 0-25, 26-45, 46-65, 65+" (keine Überlappung, vollständig)\n\n**Warum es wichtig ist:** MECE-Frameworks stellen sicher, dass du nichts doppelt zählst oder vergisst. Jede Consulting-Folie, jeder Analyse-Bucket sollte MECE sein.',
                keyTakeaway: 'MECE = No overlaps + Nothing missing. Apply this to EVERYTHING.',
                keyTakeawayDe: 'MECE = Keine Überlappung + Nichts fehlt. Wende das auf ALLES an.',
                tip: 'In the interview, explicitly say "I want to make sure my structure is MECE" — interviewers love hearing this.',
                tipDe: 'Im Interview explizit sagen "Ich möchte sicherstellen, dass meine Struktur MECE ist" — Interviewer lieben das.',
              },
              {
                heading: 'Common Case Types',
                headingDe: 'Häufige Case-Typen',
                body: '**The 6 most common case types:**\n\n1. **Profitability** (~30% of cases) — "Our profits are declining, why?"\n2. **Market Entry** (~20%) — "Should we enter market X?"\n3. **Growth Strategy** (~15%) — "How can we grow revenue?"\n4. **M&A** (~15%) — "Should we acquire company X?"\n5. **Pricing** (~10%) — "How should we price product X?"\n6. **Operations** (~10%) — "How can we reduce costs/improve efficiency?"\n\nEvery case boils down to one core question. Your job is to identify the type, apply the right framework, and customize it.',
                bodyDe: '**Die 6 häufigsten Case-Typen:**\n\n1. **Profitabilität** (~30% der Cases) — "Unsere Gewinne sinken, warum?"\n2. **Markteintritt** (~20%) — "Sollten wir in Markt X eintreten?"\n3. **Wachstumsstrategie** (~15%) — "Wie können wir den Umsatz steigern?"\n4. **M&A** (~15%) — "Sollten wir Firma X kaufen?"\n5. **Pricing** (~10%) — "Wie sollten wir Produkt X bepreisen?"\n6. **Operations** (~10%) — "Wie können wir Kosten senken/Effizienz steigern?"\n\nJeder Case läuft auf eine Kernfrage hinaus. Dein Job: Typ identifizieren, richtiges Framework anwenden und anpassen.',
              },
            ]
          },
          quiz: [
            {
              id: 'con-2-cs-q1',
              question: 'What does MECE stand for?',
              questionDe: 'Wofür steht MECE?',
              type: 'multiple_choice',
              options: [
                { text: 'Maximum Efficiency, Cost Effectiveness', textDe: 'Maximum Efficiency, Cost Effectiveness' },
                { text: 'Mutually Exclusive, Collectively Exhaustive', textDe: 'Mutually Exclusive, Collectively Exhaustive' },
                { text: 'Market Entry, Competitive Evaluation', textDe: 'Market Entry, Competitive Evaluation' },
                { text: 'McKinsey Engagement Client Experience', textDe: 'McKinsey Engagement Client Experience' },
              ],
              correctAnswer: 1,
              explanation: 'MECE stands for Mutually Exclusive, Collectively Exhaustive — the foundational principle of consulting frameworks. No overlaps, no gaps.',
              explanationDe: 'MECE steht für Mutually Exclusive, Collectively Exhaustive — das Grundprinzip von Consulting-Frameworks. Keine Überlappungen, keine Lücken.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'con-2-cs-q2',
              question: 'What is the most common case type in consulting interviews?',
              questionDe: 'Was ist der häufigste Case-Typ in Consulting Interviews?',
              type: 'multiple_choice',
              options: [
                { text: 'Market Entry', textDe: 'Markteintritt' },
                { text: 'M&A', textDe: 'M&A' },
                { text: 'Profitability', textDe: 'Profitabilität' },
                { text: 'Pricing', textDe: 'Pricing' },
              ],
              correctAnswer: 2,
              explanation: 'Profitability cases make up about 30% of all consulting interviews — "Our profits are declining, help us figure out why."',
              explanationDe: 'Profitabilitäts-Cases machen ca. 30% aller Consulting-Interviews aus — "Unsere Gewinne sinken, helfen Sie uns herauszufinden warum."',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'con-2-cs-q3',
              question: 'What should you ALWAYS do before analyzing data in a case?',
              questionDe: 'Was solltest du IMMER tun, bevor du Daten in einem Case analysierst?',
              type: 'multiple_choice',
              options: [
                { text: 'Ask for more data', textDe: 'Mehr Daten anfordern' },
                { text: 'Present a structured framework', textDe: 'Ein strukturiertes Framework präsentieren' },
                { text: 'Give your recommendation', textDe: 'Deine Empfehlung geben' },
                { text: 'Calculate the market size', textDe: 'Die Marktgröße berechnen' },
              ],
              correctAnswer: 1,
              explanation: 'Structure first! Always present your approach/framework before diving into analysis. The interviewer wants to see how you organize your thinking.',
              explanationDe: 'Erst strukturieren! Immer deinen Ansatz/Framework präsentieren, bevor du in die Analyse eintauchst. Der Interviewer will sehen, wie du dein Denken organisierst.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
        {
          id: 'con-2-profitability',
          unitId: 'con-case-foundations',
          title: 'The Profitability Framework',
          titleDe: 'Das Profitabilitäts-Framework',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 20,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'Breaking Down Profitability',
                headingDe: 'Profitabilität aufschlüsseln',
                body: 'The profitability framework is the **most important framework** in case interviews. It\'s simple but powerful.\n\n**Profit = Revenue - Costs**\n\nFrom here, you break each side down further:\n\n**Revenue = Price × Quantity**\n- Price: Has pricing changed? Discounts? Competition?\n- Quantity: Are we selling more or fewer units? Customer segments?\n\n**Costs = Fixed Costs + Variable Costs**\n- Fixed: Rent, salaries, overhead, depreciation\n- Variable: Raw materials, shipping, commissions\n\nAlways check: Is this a **revenue problem**, a **cost problem**, or **both**? This determines where you focus.',
                bodyDe: 'Das Profitabilitäts-Framework ist das **wichtigste Framework** in Case Interviews. Es ist einfach aber mächtig.\n\n**Gewinn = Umsatz - Kosten**\n\nVon hier schlüsselst du jede Seite weiter auf:\n\n**Umsatz = Preis × Menge**\n- Preis: Hat sich die Preisgestaltung geändert? Rabatte? Wettbewerb?\n- Menge: Verkaufen wir mehr oder weniger Einheiten? Kundensegmente?\n\n**Kosten = Fixkosten + Variable Kosten**\n- Fix: Miete, Gehälter, Overhead, Abschreibungen\n- Variabel: Rohstoffe, Versand, Provisionen\n\nImmer prüfen: Ist es ein **Umsatzproblem**, ein **Kostenproblem**, oder **beides**? Das bestimmt, worauf du dich fokussierst.',
                formula: 'Profit = (Price × Quantity) - (Fixed Costs + Variable Costs)',
                keyTakeaway: 'Always split into Revenue vs. Cost first, then drill deeper',
                keyTakeawayDe: 'Immer erst in Umsatz vs. Kosten aufteilen, dann tiefer bohren',
                detailedExample: '**Case: Restaurant chain profits dropped 20%**\n\nStep 1: Revenue side\n- Prices unchanged → not a price issue\n- Customer visits down 15% → volume issue!\n- But average order value up 5% → customers spend more when they come\n\nStep 2: Cost side\n- Rent increased 10% (new leases)\n- Food costs up 12% (inflation)\n- Staff costs up 8% (minimum wage increase)\n\nConclusion: Both sides! Revenue down due to fewer visits + costs up due to inflation. Recommend: loyalty program to drive visits + renegotiate supplier contracts.',
                detailedExampleDe: '**Case: Gewinne einer Restaurantkette um 20% gesunken**\n\nSchritt 1: Umsatzseite\n- Preise unverändert → kein Preisproblem\n- Kundenbesuche -15% → Mengenproblem!\n- Aber durchschnittlicher Bestellwert +5% → Kunden geben mehr aus wenn sie kommen\n\nSchritt 2: Kostenseite\n- Miete +10% (neue Mietverträge)\n- Lebensmittelkosten +12% (Inflation)\n- Personalkosten +8% (Mindestlohnerhöhung)\n\nFazit: Beide Seiten! Umsatz runter wegen weniger Besuchen + Kosten rauf wegen Inflation. Empfehlung: Treueprogramm für mehr Besuche + Lieferantenverträge neu verhandeln.',
              },
            ]
          },
          quiz: [
            {
              id: 'con-2-prof-q1',
              question: 'In the profitability framework, Revenue equals:',
              questionDe: 'Im Profitabilitäts-Framework ist Umsatz gleich:',
              type: 'multiple_choice',
              options: [
                { text: 'Profit + Costs', textDe: 'Gewinn + Kosten' },
                { text: 'Price × Quantity', textDe: 'Preis × Menge' },
                { text: 'Fixed + Variable Revenue', textDe: 'Fixer + Variabler Umsatz' },
                { text: 'Sales - Returns', textDe: 'Verkäufe - Retouren' },
              ],
              correctAnswer: 1,
              explanation: 'Revenue = Price × Quantity. This simple decomposition lets you identify whether a revenue problem is driven by pricing changes or volume changes.',
              explanationDe: 'Umsatz = Preis × Menge. Diese einfache Aufschlüsselung zeigt, ob ein Umsatzproblem durch Preisänderungen oder Mengenänderungen verursacht wird.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'con-2-prof-q2',
              question: 'Which is NOT a fixed cost?',
              questionDe: 'Was ist KEIN Fixkostenpunkt?',
              type: 'multiple_choice',
              options: [
                { text: 'Rent', textDe: 'Miete' },
                { text: 'Raw materials', textDe: 'Rohstoffe' },
                { text: 'Management salaries', textDe: 'Managementgehälter' },
                { text: 'Insurance premiums', textDe: 'Versicherungsprämien' },
              ],
              correctAnswer: 1,
              explanation: 'Raw materials are a variable cost — they increase with production volume. Rent, salaries, and insurance stay the same regardless of output.',
              explanationDe: 'Rohstoffe sind variable Kosten — sie steigen mit der Produktionsmenge. Miete, Gehälter und Versicherung bleiben gleich, unabhängig vom Output.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
        {
          id: 'con-2-market-entry',
          unitId: 'con-case-foundations',
          title: 'Market Entry Framework',
          titleDe: 'Markteintritts-Framework',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 20,
          estimatedMinutes: 9,
          content: {
            sections: [
              {
                heading: 'The Market Entry Framework',
                headingDe: 'Das Markteintritts-Framework',
                body: 'The market entry framework answers: **"Should we enter this market?"**\n\nUse these 4 pillars (MECE!):\n\n**1. Market Attractiveness**\n- Market size & growth rate\n- Profitability of the market\n- Customer segments & needs\n- Trends & regulatory environment\n\n**2. Competitive Landscape**\n- Number & strength of competitors\n- Market concentration (fragmented vs. dominated)\n- Barriers to entry (capital, regulation, brand loyalty)\n- Competitive advantages\n\n**3. Company Capabilities**\n- Do we have the right skills/resources?\n- Synergies with existing business\n- Brand transferability\n- Financial capacity for investment\n\n**4. Entry Strategy**\n- Organic build vs. Acquisition vs. Partnership/JV\n- Timeline and investment required\n- Risks and mitigation strategies\n- Expected ROI and payback period',
                bodyDe: 'Das Markteintritts-Framework beantwortet: **"Sollten wir in diesen Markt eintreten?"**\n\nNutze diese 4 Säulen (MECE!):\n\n**1. Marktattraktivität**\n- Marktgröße & Wachstumsrate\n- Profitabilität des Marktes\n- Kundensegmente & Bedürfnisse\n- Trends & regulatorisches Umfeld\n\n**2. Wettbewerbslandschaft**\n- Anzahl & Stärke der Wettbewerber\n- Marktkonzentration (fragmentiert vs. dominiert)\n- Eintrittsbarrieren (Kapital, Regulierung, Markentreue)\n- Wettbewerbsvorteile\n\n**3. Unternehmensfähigkeiten**\n- Haben wir die richtigen Skills/Ressourcen?\n- Synergien mit bestehendem Geschäft\n- Markenübertragbarkeit\n- Finanzielle Kapazität für Investition\n\n**4. Eintrittsstrategie**\n- Organisch aufbauen vs. Akquisition vs. Partnerschaft/JV\n- Zeitplan und benötigte Investition\n- Risiken und Gegenmaßnahmen\n- Erwarteter ROI und Amortisationszeit',
                keyTakeaway: '4 pillars: Market, Competition, Capabilities, Entry Mode',
                keyTakeawayDe: '4 Säulen: Markt, Wettbewerb, Fähigkeiten, Eintrittsmodus',
                tip: 'Don\'t just say "the market is attractive" — always quantify! "The market is €2B, growing at 8% CAGR, with above-average margins of 15%."',
                tipDe: 'Sag nicht einfach "der Markt ist attraktiv" — immer quantifizieren! "Der Markt ist €2 Mrd., wächst mit 8% CAGR, mit überdurchschnittlichen Margen von 15%."',
              },
            ]
          },
          quiz: [
            {
              id: 'con-2-me-q1',
              question: 'Which is NOT one of the 4 pillars of the Market Entry framework?',
              questionDe: 'Was ist KEINE der 4 Säulen des Markteintritts-Frameworks?',
              type: 'multiple_choice',
              options: [
                { text: 'Market Attractiveness', textDe: 'Marktattraktivität' },
                { text: 'Company Valuation', textDe: 'Unternehmensbewertung' },
                { text: 'Competitive Landscape', textDe: 'Wettbewerbslandschaft' },
                { text: 'Entry Strategy', textDe: 'Eintrittsstrategie' },
              ],
              correctAnswer: 1,
              explanation: 'The 4 pillars are: Market Attractiveness, Competitive Landscape, Company Capabilities, and Entry Strategy. Company Valuation is part of M&A, not market entry.',
              explanationDe: 'Die 4 Säulen sind: Marktattraktivität, Wettbewerbslandschaft, Unternehmensfähigkeiten und Eintrittsstrategie. Unternehmensbewertung gehört zu M&A, nicht zum Markteintritt.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
      ]
    },

    // ========== UNIT 3: QUANTITATIVE SKILLS ==========
    {
      id: 'con-quant-skills',
      title: 'Quantitative Skills',
      titleDe: 'Quantitative Skills',
      description: 'Market sizing, break-even, and data interpretation',
      descriptionDe: 'Market Sizing, Break-Even und Dateninterpretation',
      icon: '🔢',
      difficulty: 'intermediate',
      order: 3,
      requiredXp: 200,
      color: '#CE82FF',
      lessons: [
        {
          id: 'con-3-market-sizing',
          unitId: 'con-quant-skills',
          title: 'Market Sizing Mastery',
          titleDe: 'Market Sizing meistern',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'What is Market Sizing?',
                headingDe: 'Was ist Market Sizing?',
                body: 'Market sizing questions test your ability to **estimate the size of a market** using logic and structured math — without any data!\n\n**Common questions:**\n- "How many coffee cups are sold in Germany per day?"\n- "What is the market size for electric scooters in Berlin?"\n- "How many tennis balls fit in this room?"\n\n**Two Approaches:**\n\n**Top-Down:** Start with a big number, then narrow down\n- Population → Relevant segment → Usage → Price = Market Size\n\n**Bottom-Up:** Start with individual units, then scale up\n- One store\'s revenue × Number of stores = Market Size\n\n**Key Rules:**\n1. Structure your approach BEFORE calculating\n2. State your assumptions clearly\n3. Round aggressively (80M Germans ≈ 80M, not 83.2M)\n4. Sanity-check your result at the end',
                bodyDe: 'Market-Sizing-Fragen testen deine Fähigkeit, **die Größe eines Marktes abzuschätzen** — nur mit Logik und strukturierter Mathematik, ohne Daten!\n\n**Typische Fragen:**\n- "Wie viele Kaffeetassen werden pro Tag in Deutschland verkauft?"\n- "Wie groß ist der Markt für E-Scooter in Berlin?"\n- "Wie viele Tennisbälle passen in diesen Raum?"\n\n**Zwei Ansätze:**\n\n**Top-Down:** Mit einer großen Zahl starten, dann einschränken\n- Bevölkerung → Relevantes Segment → Nutzung → Preis = Marktgröße\n\n**Bottom-Up:** Mit einzelnen Einheiten starten, dann hochskalieren\n- Umsatz eines Ladens × Anzahl Läden = Marktgröße\n\n**Schlüsselregeln:**\n1. Strukturiere deinen Ansatz VOR dem Rechnen\n2. Sage deine Annahmen klar\n3. Runde aggressiv (83 Mio. Deutsche ≈ 80 Mio.)\n4. Plausibilitätscheck am Ende',
                keyTakeaway: 'Structure → Assumptions → Calculate → Sanity Check',
                keyTakeawayDe: 'Strukturieren → Annahmen → Rechnen → Plausibilitätscheck',
                detailedExample: '**Market Sizing: Coffee cups sold per day in Germany**\n\nTop-Down approach:\n1. Germany population: ~80M people\n2. Relevant coffee drinkers: ~75% of adults (60M adults × 75% = 45M)\n3. Average cups per day: ~2.5 cups\n4. Total: 45M × 2.5 = ~112.5M cups/day\n5. Sanity check: That\'s ~1.4 cups per person (incl. children) — sounds reasonable!\n\nMarket value: 112.5M × €2.50 average = ~€280M/day = ~€100B/year\n(Actual German coffee market: ~€20B/year for retail, but including café, restaurant, office = higher)',
                detailedExampleDe: '**Market Sizing: Kaffeetassen pro Tag in Deutschland**\n\nTop-Down Ansatz:\n1. Bevölkerung Deutschland: ~80 Mio.\n2. Relevante Kaffeetrinker: ~75% der Erwachsenen (60 Mio. × 75% = 45 Mio.)\n3. Durchschnittliche Tassen/Tag: ~2,5\n4. Gesamt: 45 Mio. × 2,5 = ~112,5 Mio. Tassen/Tag\n5. Plausibilitätscheck: Das sind ~1,4 Tassen pro Person (inkl. Kinder) — klingt vernünftig!\n\nMarktwert: 112,5 Mio. × €2,50 Durchschnitt = ~€280 Mio./Tag = ~€100 Mrd./Jahr',
              },
            ]
          },
          quiz: [
            {
              id: 'con-3-ms-q1',
              question: 'In a top-down market sizing, you start with:',
              questionDe: 'Beim Top-Down Market Sizing startest du mit:',
              type: 'multiple_choice',
              options: [
                { text: 'One unit\'s revenue and scale up', textDe: 'Dem Umsatz einer Einheit und skalierst hoch' },
                { text: 'A large number (e.g. population) and narrow down', textDe: 'Einer großen Zahl (z.B. Bevölkerung) und grenzt ein' },
                { text: 'The competitor\'s market share', textDe: 'Dem Marktanteil des Wettbewerbers' },
                { text: 'The company\'s current revenue', textDe: 'Dem aktuellen Umsatz des Unternehmens' },
              ],
              correctAnswer: 1,
              explanation: 'Top-down starts with a big number (total population, total market) and narrows down through relevant segments, usage rates, and pricing.',
              explanationDe: 'Top-Down startet mit einer großen Zahl (Gesamtbevölkerung, Gesamtmarkt) und grenzt durch relevante Segmente, Nutzungsraten und Preise ein.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
            {
              id: 'con-3-ms-q2',
              question: 'What should you ALWAYS do at the end of a market sizing?',
              questionDe: 'Was solltest du IMMER am Ende eines Market Sizings tun?',
              type: 'multiple_choice',
              options: [
                { text: 'Multiply by a safety factor', textDe: 'Mit einem Sicherheitsfaktor multiplizieren' },
                { text: 'Do a sanity check', textDe: 'Einen Plausibilitätscheck machen' },
                { text: 'Ask the interviewer for the real number', textDe: 'Den Interviewer nach der echten Zahl fragen' },
                { text: 'Recalculate everything', textDe: 'Alles neu berechnen' },
              ],
              correctAnswer: 1,
              explanation: 'Always sanity-check your result! Compare it to something you know (e.g., "That\'s €2 per person in Germany — does that sound right?"). This shows good business judgment.',
              explanationDe: 'Immer einen Plausibilitätscheck machen! Vergleiche mit etwas Bekanntem (z.B. "Das sind €2 pro Person in Deutschland — klingt das richtig?"). Das zeigt gutes Geschäftsurteil.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
        {
          id: 'con-3-breakeven',
          unitId: 'con-quant-skills',
          title: 'Break-Even & Unit Economics',
          titleDe: 'Break-Even & Stückökonomie',
          type: 'calculation',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'Break-Even Analysis',
                headingDe: 'Break-Even-Analyse',
                body: 'Break-even is the point where **Total Revenue = Total Costs** (zero profit).\n\n**Break-Even Quantity = Fixed Costs / (Price - Variable Cost per Unit)**\n\nThe denominator (Price - Variable Cost) is called the **Contribution Margin** per unit.\n\n**Why it matters in cases:**\n- "How many units must we sell to break even?"\n- "When will the new factory become profitable?"\n- "Is this investment worthwhile?"\n\nA low break-even point = less risk. A high break-even = need high volume to become profitable.',
                bodyDe: 'Break-Even ist der Punkt, an dem **Gesamtumsatz = Gesamtkosten** (null Gewinn).\n\n**Break-Even-Menge = Fixkosten / (Preis - Variable Kosten pro Stück)**\n\nDer Nenner (Preis - Variable Kosten) heißt **Deckungsbeitrag** pro Stück.\n\n**Warum es in Cases wichtig ist:**\n- "Wie viele Einheiten müssen wir verkaufen, um Break-Even zu erreichen?"\n- "Wann wird die neue Fabrik profitabel?"\n- "Lohnt sich diese Investition?"\n\nNiedriger Break-Even = weniger Risiko. Hoher Break-Even = hohes Volumen nötig für Profitabilität.',
                formula: 'Break-Even Quantity = Fixed Costs / (Price per Unit - Variable Cost per Unit)',
                detailedExample: '**Example: New coffee shop**\n\nFixed costs: €10,000/month (rent, salaries, insurance)\nPrice per cup: €4.00\nVariable cost per cup: €1.50 (beans, milk, cup)\n\nContribution margin = €4.00 - €1.50 = €2.50\nBreak-even = €10,000 / €2.50 = 4,000 cups/month\n\nThat\'s ~133 cups/day. If open 12 hours/day = ~11 cups/hour. Feasible for a good location!',
                detailedExampleDe: '**Beispiel: Neues Café**\n\nFixkosten: €10.000/Monat (Miete, Gehälter, Versicherung)\nPreis pro Tasse: €4,00\nVariable Kosten pro Tasse: €1,50 (Bohnen, Milch, Becher)\n\nDeckungsbeitrag = €4,00 - €1,50 = €2,50\nBreak-Even = €10.000 / €2,50 = 4.000 Tassen/Monat\n\nDas sind ~133 Tassen/Tag. Bei 12 Stunden/Tag = ~11 Tassen/Stunde. Machbar für eine gute Lage!',
              },
            ]
          },
          quiz: [
            {
              id: 'con-3-be-q1',
              question: 'A product costs €8 variable, sells for €20, with €60,000 fixed costs. Break-even quantity?',
              questionDe: 'Ein Produkt hat €8 variable Kosten, Verkaufspreis €20, Fixkosten €60.000. Break-Even-Menge?',
              type: 'multiple_choice',
              options: [
                { text: '3,000 units', textDe: '3.000 Stück' },
                { text: '5,000 units', textDe: '5.000 Stück' },
                { text: '7,500 units', textDe: '7.500 Stück' },
                { text: '2,400 units', textDe: '2.400 Stück' },
              ],
              correctAnswer: 1,
              explanation: 'Contribution margin = €20 - €8 = €12. Break-even = €60,000 / €12 = 5,000 units.',
              explanationDe: 'Deckungsbeitrag = €20 - €8 = €12. Break-Even = €60.000 / €12 = 5.000 Stück.',
              difficulty: 'intermediate',
              xpReward: 15,
            },
          ]
        },
      ]
    },

    // ========== UNIT 4: ADVANCED FRAMEWORKS ==========
    {
      id: 'con-advanced-frameworks',
      title: 'Advanced Case Frameworks',
      titleDe: 'Fortgeschrittene Case-Frameworks',
      description: 'M&A, Pricing, and Growth Strategy cases',
      descriptionDe: 'M&A, Pricing und Wachstumsstrategie-Cases',
      icon: '🎯',
      difficulty: 'intermediate',
      order: 4,
      requiredXp: 500,
      color: '#FF4B4B',
      lessons: [
        {
          id: 'con-4-ma-cases',
          unitId: 'con-advanced-frameworks',
          title: 'M&A Cases in Consulting',
          titleDe: 'M&A-Cases in der Beratung',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'The M&A Framework',
                headingDe: 'Das M&A-Framework',
                body: 'M&A cases ask: **"Should our client acquire company X?"**\n\nUse these 4 lenses:\n\n**1. Strategic Rationale** — WHY acquire?\n- Market consolidation, geographic expansion, vertical integration\n- Acquire technology, talent, or customer base\n- Defensive move against competitors\n\n**2. Target Assessment** — Is the target attractive?\n- Financial performance (revenue, profitability, growth)\n- Market position and competitive advantages\n- Cultural fit and management quality\n\n**3. Synergies & Value Creation**\n- Cost synergies (headcount, procurement, facilities)\n- Revenue synergies (cross-sell, new markets)\n- Timeline to realize synergies\n\n**4. Valuation & Deal Structure**\n- What is the target worth? (DCF, multiples)\n- How to finance? (cash, stock, debt)\n- Integration risks and plan',
                bodyDe: 'M&A-Cases fragen: **"Sollte unser Kunde Firma X kaufen?"**\n\nNutze diese 4 Perspektiven:\n\n**1. Strategische Begründung** — WARUM kaufen?\n- Marktkonsolidierung, geografische Expansion, vertikale Integration\n- Technologie, Talent oder Kundenbasis erwerben\n- Defensiver Zug gegen Wettbewerber\n\n**2. Target-Bewertung** — Ist das Ziel attraktiv?\n- Finanzielle Performance (Umsatz, Profitabilität, Wachstum)\n- Marktposition und Wettbewerbsvorteile\n- Kulturelle Passung und Managementqualität\n\n**3. Synergien & Wertschöpfung**\n- Kostensynergien (Personal, Beschaffung, Standorte)\n- Umsatzsynergien (Cross-Selling, neue Märkte)\n- Zeitrahmen zur Realisierung\n\n**4. Bewertung & Deal-Struktur**\n- Was ist das Target wert? (DCF, Multiples)\n- Wie finanzieren? (Cash, Aktien, Fremdkapital)\n- Integrationsrisiken und -plan',
              },
            ]
          },
          quiz: [
            {
              id: 'con-4-ma-q1',
              question: 'What is typically the FIRST question to answer in an M&A case?',
              questionDe: 'Was ist typischerweise die ERSTE Frage in einem M&A-Case?',
              type: 'multiple_choice',
              options: [
                { text: 'What is the target worth?', textDe: 'Was ist das Target wert?' },
                { text: 'Why does this acquisition make strategic sense?', textDe: 'Warum macht diese Akquisition strategisch Sinn?' },
                { text: 'How many employees will be laid off?', textDe: 'Wie viele Mitarbeiter werden entlassen?' },
                { text: 'What is the integration timeline?', textDe: 'Was ist der Integrationszeitplan?' },
              ],
              correctAnswer: 1,
              explanation: 'Always start with the strategic rationale — WHY does this deal make sense? Without a clear strategic reason, even a cheap acquisition can destroy value.',
              explanationDe: 'Immer mit der strategischen Begründung starten — WARUM macht dieser Deal Sinn? Ohne klaren strategischen Grund kann selbst eine günstige Akquisition Wert vernichten.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
        {
          id: 'con-4-pricing',
          unitId: 'con-advanced-frameworks',
          title: 'Pricing Strategy Cases',
          titleDe: 'Preisstrategie-Cases',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'The Three Pricing Approaches',
                headingDe: 'Die drei Pricing-Ansätze',
                body: '**1. Cost-Plus Pricing**\n- Calculate total cost, add a markup\n- Simple but ignores demand and competition\n- Best for: commodities, government contracts\n\n**2. Competitor-Based Pricing**\n- Price relative to competitors (premium, parity, discount)\n- Requires understanding of value perception\n- Best for: mature markets with clear benchmarks\n\n**3. Value-Based Pricing**\n- Price based on customer\'s willingness to pay / perceived value\n- Highest margins but hardest to implement\n- Best for: differentiated products, B2B, SaaS\n\n**In a case interview, consider all three!**\nStart with cost (floor), then competition (benchmark), then value (ceiling).\n\nPrice Floor (Cost) ≤ Your Price ≤ Price Ceiling (Value to Customer)',
                bodyDe: '**1. Kosten-Plus-Pricing**\n- Gesamtkosten berechnen, Aufschlag drauf\n- Einfach aber ignoriert Nachfrage und Wettbewerb\n- Am besten für: Commodities, öffentliche Aufträge\n\n**2. Wettbewerbsbasiertes Pricing**\n- Preis relativ zu Wettbewerbern (Premium, Parität, Discount)\n- Erfordert Verständnis der Wertwahrnehmung\n- Am besten für: Reife Märkte mit klaren Benchmarks\n\n**3. Wertbasiertes Pricing**\n- Preis basierend auf Zahlungsbereitschaft / wahrgenommenem Wert\n- Höchste Margen aber am schwersten umzusetzen\n- Am besten für: Differenzierte Produkte, B2B, SaaS\n\n**Im Case Interview alle drei betrachten!**\nStarte mit Kosten (Untergrenze), dann Wettbewerb (Benchmark), dann Wert (Obergrenze).\n\nPreisuntergrenze (Kosten) ≤ Dein Preis ≤ Preisobergrenze (Kundenwert)',
                formula: 'Cost Floor ≤ Price ≤ Value Ceiling',
              },
            ]
          },
          quiz: [
            {
              id: 'con-4-pr-q1',
              question: 'Which pricing approach typically yields the highest margins?',
              questionDe: 'Welcher Pricing-Ansatz erzielt typischerweise die höchsten Margen?',
              type: 'multiple_choice',
              options: [
                { text: 'Cost-plus pricing', textDe: 'Kosten-Plus-Pricing' },
                { text: 'Competitor-based pricing', textDe: 'Wettbewerbsbasiertes Pricing' },
                { text: 'Value-based pricing', textDe: 'Wertbasiertes Pricing' },
                { text: 'Penetration pricing', textDe: 'Penetrationspreisgestaltung' },
              ],
              correctAnswer: 2,
              explanation: 'Value-based pricing captures the most value because you price based on what customers are willing to pay, not just costs or competition.',
              explanationDe: 'Wertbasiertes Pricing schöpft den meisten Wert ab, weil du basierend auf der Zahlungsbereitschaft der Kunden preist, nicht nur nach Kosten oder Wettbewerb.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
        {
          id: 'con-4-growth',
          unitId: 'con-advanced-frameworks',
          title: 'Growth Strategy',
          titleDe: 'Wachstumsstrategie',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 9,
          content: {
            sections: [
              {
                heading: 'The Ansoff Growth Matrix',
                headingDe: 'Die Ansoff-Wachstumsmatrix',
                body: '**The Ansoff Matrix** structures growth options in a 2×2:\n\n|  | Existing Products | New Products |\n|--|---|---|\n| **Existing Markets** | Market Penetration | Product Development |\n| **New Markets** | Market Development | Diversification |\n\n**1. Market Penetration** (lowest risk)\n- Sell more of existing products to existing customers\n- Tactics: pricing, marketing, loyalty programs\n\n**2. Product Development** (medium risk)\n- New products for existing customers\n- Tactics: R&D, line extensions, bundling\n\n**3. Market Development** (medium risk)\n- Existing products in new markets\n- Tactics: geographic expansion, new segments\n\n**4. Diversification** (highest risk)\n- New products in new markets\n- Related vs. unrelated diversification',
                bodyDe: '**Die Ansoff-Matrix** strukturiert Wachstumsoptionen in einem 2×2:\n\n|  | Bestehende Produkte | Neue Produkte |\n|--|---|---|\n| **Bestehende Märkte** | Marktdurchdringung | Produktentwicklung |\n| **Neue Märkte** | Marktentwicklung | Diversifikation |\n\n**1. Marktdurchdringung** (geringstes Risiko)\n- Mehr bestehende Produkte an bestehende Kunden verkaufen\n- Taktiken: Pricing, Marketing, Treueprogramme\n\n**2. Produktentwicklung** (mittleres Risiko)\n- Neue Produkte für bestehende Kunden\n- Taktiken: F&E, Sortimentserweiterung, Bundling\n\n**3. Marktentwicklung** (mittleres Risiko)\n- Bestehende Produkte in neuen Märkten\n- Taktiken: Geografische Expansion, neue Segmente\n\n**4. Diversifikation** (höchstes Risiko)\n- Neue Produkte in neuen Märkten\n- Verwandte vs. unverwandte Diversifikation',
                keyTakeaway: 'Use the Ansoff Matrix to structure ANY growth case',
                keyTakeawayDe: 'Nutze die Ansoff-Matrix, um JEDEN Wachstums-Case zu strukturieren',
              },
            ]
          },
          quiz: [
            {
              id: 'con-4-gr-q1',
              question: 'In the Ansoff Matrix, selling existing products to new markets is called:',
              questionDe: 'In der Ansoff-Matrix heißt der Verkauf bestehender Produkte in neuen Märkten:',
              type: 'multiple_choice',
              options: [
                { text: 'Market Penetration', textDe: 'Marktdurchdringung' },
                { text: 'Product Development', textDe: 'Produktentwicklung' },
                { text: 'Market Development', textDe: 'Marktentwicklung' },
                { text: 'Diversification', textDe: 'Diversifikation' },
              ],
              correctAnswer: 2,
              explanation: 'Market Development = existing products + new markets. Think: German company expanding to France with same product line.',
              explanationDe: 'Marktentwicklung = bestehende Produkte + neue Märkte. Denk: Deutsches Unternehmen expandiert mit gleichem Produkt nach Frankreich.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
      ]
    },

    // ========== UNIT 5: FIT INTERVIEW ==========
    {
      id: 'con-fit-interview',
      title: 'Fit Interview Mastery',
      titleDe: 'Fit Interview meistern',
      description: 'Personal questions, "Why consulting?", and storytelling',
      descriptionDe: 'Persönliche Fragen, "Why Consulting?" und Storytelling',
      icon: '🎤',
      difficulty: 'intermediate',
      order: 5,
      requiredXp: 900,
      color: '#FF9600',
      lessons: [
        {
          id: 'con-5-why-consulting',
          unitId: 'con-fit-interview',
          title: 'Why Consulting? & Tell Me About Yourself',
          titleDe: 'Why Consulting? & Erzählen Sie über sich',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 20,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: '"Tell Me About Yourself"',
                headingDe: '"Erzählen Sie etwas über sich"',
                body: 'This is almost ALWAYS the first question. You need a **2-minute pitch** that is:\n- **Structured** (not rambling!)\n- **Tailored** to consulting\n- **Ending with a forward-looking hook**\n\n**The Perfect Structure:**\n\n1. **Intro Hook** (10 sec) — One attention-grabbing sentence\n2. **Academic Background** (20 sec) — Where you studied, what you focused on\n3. **Professional Experience** (40 sec) — 2-3 key experiences, quantified achievements\n4. **Why Consulting** (30 sec) — Connect your experience to consulting\n5. **Why This Firm** (20 sec) — Specific reasons for THIS firm\n\n**Do NOT:**\n- Start with "My name is..." (they know!)\n- List your entire CV chronologically\n- Be longer than 2 minutes\n- Forget to mention the firm\'s name',
                bodyDe: 'Das ist fast IMMER die erste Frage. Du brauchst einen **2-Minuten-Pitch**, der:\n- **Strukturiert** ist (nicht abschweifen!)\n- **Auf Consulting zugeschnitten** ist\n- **Mit einem zukunftsgerichteten Hook endet**\n\n**Die perfekte Struktur:**\n\n1. **Intro Hook** (10 Sek) — Ein aufmerksamkeitsstarker Satz\n2. **Akademischer Hintergrund** (20 Sek) — Wo studiert, Fokus\n3. **Berufserfahrung** (40 Sek) — 2-3 Schlüsselerfahrungen, quantifizierte Erfolge\n4. **Why Consulting** (30 Sek) — Erfahrung mit Beratung verbinden\n5. **Why This Firm** (20 Sek) — Spezifische Gründe für DIESE Firma\n\n**NICHT:**\n- Mit "Mein Name ist..." anfangen (wissen die!)\n- Den gesamten Lebenslauf chronologisch auflisten\n- Länger als 2 Minuten sein\n- Vergessen, den Firmennamen zu erwähnen',
                keyTakeaway: 'Hook → Academic → Experience → Why Consulting → Why This Firm = 2 min max',
                keyTakeawayDe: 'Hook → Studium → Erfahrung → Why Consulting → Why This Firm = max 2 Min',
                tip: 'Practice this until you can deliver it perfectly every single time. Record yourself and listen back!',
                tipDe: 'Übe das, bis du es jedes Mal perfekt abliefern kannst. Nimm dich auf und höre es dir an!',
              },
              {
                heading: 'Answering "Why Consulting?"',
                headingDe: '"Why Consulting?" beantworten',
                body: '**Credible reasons (use 2-3):**\n✅ Steep learning curve & intellectual challenge\n✅ Variety of industries & problems\n✅ Working with smart, driven people\n✅ Impact — seeing recommendations implemented\n✅ Structured problem-solving methodology\n✅ Excellent training & exit opportunities\n\n**Red flags (avoid these!):**\n❌ "The money is great" (even though it is)\n❌ "I don\'t know what else to do" (yikes)\n❌ "The prestige" (too honest)\n❌ "Exit opportunities" (you haven\'t even started!)\n❌ "I like traveling" (you\'ll hate it after month 3)\n\nAlways make it **personal** — connect your specific experiences to why consulting is the logical next step.',
                bodyDe: '**Glaubwürdige Gründe (nutze 2-3):**\n✅ Steile Lernkurve & intellektuelle Herausforderung\n✅ Vielfalt an Branchen & Problemen\n✅ Arbeit mit smarten, motivierten Leuten\n✅ Impact — Empfehlungen umgesetzt sehen\n✅ Strukturierte Problemlösungs-Methodik\n✅ Exzellentes Training & Exit-Möglichkeiten\n\n**Red Flags (vermeide das!):**\n❌ "Das Geld ist super" (auch wenn es stimmt)\n❌ "Ich weiß nicht, was ich sonst machen soll" (autsch)\n❌ "Das Prestige" (zu ehrlich)\n❌ "Exit Opportunities" (du hast noch nicht mal angefangen!)\n❌ "Ich reise gerne" (nach Monat 3 hasst du es)\n\nMach es immer **persönlich** — verbinde deine spezifischen Erfahrungen damit, warum Consulting der logische nächste Schritt ist.',
              },
            ]
          },
          quiz: [
            {
              id: 'con-5-wc-q1',
              question: 'How long should your "Tell me about yourself" answer be?',
              questionDe: 'Wie lang sollte deine "Erzählen Sie über sich"-Antwort sein?',
              type: 'multiple_choice',
              options: [
                { text: '30 seconds', textDe: '30 Sekunden' },
                { text: 'About 2 minutes', textDe: 'Etwa 2 Minuten' },
                { text: '5 minutes', textDe: '5 Minuten' },
                { text: 'As long as needed', textDe: 'So lang wie nötig' },
              ],
              correctAnswer: 1,
              explanation: '2 minutes is the sweet spot — enough to cover your background meaningfully, short enough to maintain attention. Practice with a timer!',
              explanationDe: '2 Minuten sind der Sweet Spot — genug, um deinen Hintergrund sinnvoll abzudecken, kurz genug um die Aufmerksamkeit zu halten. Übe mit Timer!',
              difficulty: 'intermediate',
              xpReward: 10,
            },
            {
              id: 'con-5-wc-q2',
              question: 'Which is a RED FLAG answer to "Why Consulting?"',
              questionDe: 'Was ist eine RED FLAG-Antwort auf "Why Consulting?"',
              type: 'multiple_choice',
              options: [
                { text: 'Steep learning curve', textDe: 'Steile Lernkurve' },
                { text: 'Variety of problems', textDe: 'Vielfalt an Problemen' },
                { text: 'Exit opportunities', textDe: 'Exit Opportunities' },
                { text: 'Working with driven people', textDe: 'Arbeit mit motivierten Leuten' },
              ],
              correctAnswer: 2,
              explanation: 'Mentioning "exit opportunities" signals you\'re already planning to leave before you\'ve even started. Not a great look in an interview!',
              explanationDe: '"Exit Opportunities" signalisiert, dass du schon planst zu gehen, bevor du angefangen hast. Kein guter Look im Interview!',
              difficulty: 'intermediate',
              xpReward: 10,
            },
          ]
        },
        {
          id: 'con-5-behavioral',
          unitId: 'con-fit-interview',
          title: 'Leadership & Teamwork Stories',
          titleDe: 'Leadership & Teamwork Stories',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 20,
          estimatedMinutes: 8,
          content: {
            sections: [
              {
                heading: 'The STAR Method',
                headingDe: 'Die STAR-Methode',
                body: 'Use **STAR** for all behavioral questions:\n\n**S — Situation** (set the scene, 2 sentences)\n"During my internship at Deutsche Bank, our team had to deliver a pitch book in 48 hours."\n\n**T — Task** (your specific responsibility)\n"As the only intern, I was responsible for all financial analysis and competitor benchmarking."\n\n**A — Action** (what YOU did, be specific)\n"I created a template to parallelize the analysis, stayed until 2am, and coordinated with two senior analysts."\n\n**R — Result** (quantified impact)\n"We delivered on time, won the mandate, and my template was adopted by the team for future pitches."\n\n**Pro Tips:**\n- Always use "I" not "we" — they want YOUR actions\n- Quantify wherever possible (€, %, time saved)\n- Prepare 5-6 stories that cover: leadership, teamwork, failure, conflict, initiative',
                bodyDe: 'Nutze **STAR** für alle Behavioral-Fragen:\n\n**S — Situation** (Szene setzen, 2 Sätze)\n"Während meines Praktikums bei der Deutschen Bank musste unser Team ein Pitch Book in 48 Stunden liefern."\n\n**T — Task** (deine spezifische Aufgabe)\n"Als einziger Praktikant war ich für alle Finanzanalysen und Wettbewerber-Benchmarking verantwortlich."\n\n**A — Action** (was DU getan hast, sei spezifisch)\n"Ich erstellte ein Template um die Analyse zu parallelisieren, blieb bis 2 Uhr nachts und koordinierte mit zwei Senior Analysten."\n\n**R — Result** (quantifizierter Impact)\n"Wir lieferten pünktlich, gewannen das Mandat, und mein Template wurde vom Team für zukünftige Pitches übernommen."\n\n**Pro Tips:**\n- Immer "ich" statt "wir" — sie wollen DEINE Aktionen\n- Wo möglich quantifizieren (€, %, eingesparte Zeit)\n- Bereite 5-6 Stories vor: Leadership, Teamwork, Scheitern, Konflikt, Initiative',
                keyTakeaway: 'STAR = Situation, Task, Action, Result — always quantify the result!',
                keyTakeawayDe: 'STAR = Situation, Task, Action, Result — immer das Ergebnis quantifizieren!',
              },
            ]
          },
          quiz: [
            {
              id: 'con-5-bh-q1',
              question: 'In the STAR method, what does the "A" stand for?',
              questionDe: 'In der STAR-Methode, wofür steht das "A"?',
              type: 'multiple_choice',
              options: [
                { text: 'Analysis', textDe: 'Analyse' },
                { text: 'Achievement', textDe: 'Erfolg' },
                { text: 'Action', textDe: 'Aktion' },
                { text: 'Assessment', textDe: 'Bewertung' },
              ],
              correctAnswer: 2,
              explanation: 'A = Action — the specific steps YOU took. This is the most important part! Be concrete and use "I" not "we."',
              explanationDe: 'A = Action — die konkreten Schritte, die DU unternommen hast. Das ist der wichtigste Teil! Sei konkret und nutze "Ich" statt "Wir."',
              difficulty: 'intermediate',
              xpReward: 10,
            },
          ]
        },
      ]
    },

    // ========== UNIT 6: ADVANCED CASE TYPES ==========
    {
      id: 'con-advanced-cases',
      title: 'Advanced Case Types',
      titleDe: 'Fortgeschrittene Case-Typen',
      description: 'Operations, digital transformation, and CEO-level thinking',
      descriptionDe: 'Operations, Digitale Transformation und CEO-Level Denken',
      icon: '🚀',
      difficulty: 'advanced',
      order: 6,
      requiredXp: 1500,
      color: '#1CB0F6',
      lessons: [
        {
          id: 'con-6-operations',
          unitId: 'con-advanced-cases',
          title: 'Operations & Supply Chain Cases',
          titleDe: 'Operations & Supply-Chain-Cases',
          type: 'lesson',
          difficulty: 'advanced',
          xpReward: 30,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'Operations Framework',
                headingDe: 'Operations-Framework',
                body: 'Operations cases focus on **improving efficiency, reducing costs, or optimizing processes.**\n\n**Key areas to analyze:**\n\n**1. Supply Chain**\n- Procurement: Supplier selection, negotiation, volume discounts\n- Production: Capacity utilization, lean manufacturing, quality\n- Distribution: Warehousing, logistics, last-mile delivery\n\n**2. Process Optimization**\n- Identify bottlenecks (Theory of Constraints)\n- Lean Six Sigma: Eliminate waste, reduce variation\n- Automation opportunities\n\n**3. Capacity Planning**\n- Current utilization vs. max capacity\n- Build vs. buy decision\n- Make vs. outsource decision\n\n**4. Quality & Performance**\n- KPIs: throughput, cycle time, defect rate, OEE\n- Benchmarking against industry standards\n- Continuous improvement (Kaizen)',
                bodyDe: 'Operations-Cases fokussieren auf **Effizienzsteigerung, Kostensenkung oder Prozessoptimierung.**\n\n**Schlüsselbereiche:**\n\n**1. Supply Chain**\n- Beschaffung: Lieferantenauswahl, Verhandlung, Mengenrabatte\n- Produktion: Kapazitätsauslastung, Lean Manufacturing, Qualität\n- Distribution: Lagerhaltung, Logistik, Letzte-Meile-Lieferung\n\n**2. Prozessoptimierung**\n- Engpässe identifizieren (Theory of Constraints)\n- Lean Six Sigma: Verschwendung eliminieren, Variation reduzieren\n- Automatisierungsmöglichkeiten\n\n**3. Kapazitätsplanung**\n- Aktuelle Auslastung vs. Max-Kapazität\n- Build vs. Buy Entscheidung\n- Make vs. Outsource Entscheidung\n\n**4. Qualität & Performance**\n- KPIs: Durchsatz, Zykluszeit, Fehlerrate, OEE\n- Benchmarking gegen Branchenstandards\n- Kontinuierliche Verbesserung (Kaizen)',
              },
            ]
          },
          quiz: [
            {
              id: 'con-6-ops-q1',
              question: 'What methodology focuses on eliminating waste and reducing variation?',
              questionDe: 'Welche Methodik fokussiert auf Verschwendung eliminieren und Variation reduzieren?',
              type: 'multiple_choice',
              options: [
                { text: 'Agile Scrum', textDe: 'Agile Scrum' },
                { text: 'Lean Six Sigma', textDe: 'Lean Six Sigma' },
                { text: 'Design Thinking', textDe: 'Design Thinking' },
                { text: 'Balanced Scorecard', textDe: 'Balanced Scorecard' },
              ],
              correctAnswer: 1,
              explanation: 'Lean Six Sigma combines Lean (eliminate waste) with Six Sigma (reduce variation/defects). It\'s the gold standard for process improvement.',
              explanationDe: 'Lean Six Sigma kombiniert Lean (Verschwendung eliminieren) mit Six Sigma (Variation/Fehler reduzieren). Es ist der Goldstandard für Prozessverbesserung.',
              difficulty: 'advanced',
              xpReward: 15,
            },
          ]
        },
        {
          id: 'con-6-digital',
          unitId: 'con-advanced-cases',
          title: 'Digital Transformation Strategy',
          titleDe: 'Digitale Transformationsstrategie',
          type: 'lesson',
          difficulty: 'advanced',
          xpReward: 30,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'Digital Transformation Framework',
                headingDe: 'Framework für Digitale Transformation',
                body: 'Digital transformation cases are increasingly common. They ask: **"How should our client digitize?"**\n\n**4 Pillars of Digital Transformation:**\n\n**1. Customer Experience**\n- Digital channels (app, website, social media)\n- Personalization (AI/ML recommendations)\n- Omnichannel integration\n\n**2. Operations & Processes**\n- Process automation (RPA, AI)\n- Cloud migration\n- Real-time data & analytics\n\n**3. Business Model Innovation**\n- Platform models (marketplace, subscription)\n- Data monetization\n- New digital revenue streams\n\n**4. People & Organization**\n- Digital skills & upskilling\n- Agile ways of working\n- Change management (biggest challenge!)\n\n**Key insight:** Technology is the easy part. Change management is where 70% of digital transformations fail!',
                bodyDe: 'Digitale Transformations-Cases werden immer häufiger. Sie fragen: **"Wie sollte unser Kunde digitalisieren?"**\n\n**4 Säulen der Digitalen Transformation:**\n\n**1. Customer Experience**\n- Digitale Kanäle (App, Website, Social Media)\n- Personalisierung (AI/ML-Empfehlungen)\n- Omnichannel-Integration\n\n**2. Operations & Prozesse**\n- Prozessautomatisierung (RPA, AI)\n- Cloud Migration\n- Echtzeit-Daten & Analytics\n\n**3. Geschäftsmodell-Innovation**\n- Plattform-Modelle (Marktplatz, Abo)\n- Datenmonetarisierung\n- Neue digitale Umsatzströme\n\n**4. Menschen & Organisation**\n- Digitale Skills & Weiterbildung\n- Agile Arbeitsweisen\n- Change Management (größte Herausforderung!)\n\n**Key Insight:** Technologie ist der einfache Teil. Change Management ist der Grund, warum 70% der Digitaltransformationen scheitern!',
                keyTakeaway: 'Tech is easy, change management is hard — 70% of digital transformations fail on the people side',
                keyTakeawayDe: 'Tech ist einfach, Change Management ist schwer — 70% scheitern am Menschen-Faktor',
              },
            ]
          },
          quiz: [
            {
              id: 'con-6-dig-q1',
              question: 'What is the #1 reason digital transformations fail?',
              questionDe: 'Was ist der #1 Grund, warum digitale Transformationen scheitern?',
              type: 'multiple_choice',
              options: [
                { text: 'Bad technology choice', textDe: 'Falsche Technologiewahl' },
                { text: 'Insufficient budget', textDe: 'Unzureichendes Budget' },
                { text: 'Poor change management', textDe: 'Schlechtes Change Management' },
                { text: 'Lack of data', textDe: 'Mangel an Daten' },
              ],
              correctAnswer: 2,
              explanation: 'About 70% of digital transformations fail due to poor change management — resistance from employees, lack of leadership commitment, and insufficient training.',
              explanationDe: 'Ca. 70% der digitalen Transformationen scheitern an schlechtem Change Management — Widerstand der Mitarbeiter, fehlende Führungscommitment und unzureichende Schulung.',
              difficulty: 'advanced',
              xpReward: 15,
            },
          ]
        },
      ]
    },

    // ========== UNIT 7: PARTNER-LEVEL ==========
    {
      id: 'con-partner-level',
      title: 'Partner-Level Thinking',
      titleDe: 'Partner-Level Denken',
      description: 'CEO advisory, executive communication, and business development',
      descriptionDe: 'CEO-Beratung, Executive Communication und Business Development',
      icon: '👑',
      difficulty: 'advanced',
      order: 7,
      requiredXp: 2500,
      color: '#FFD700',
      lessons: [
        {
          id: 'con-7-ceo-advisory',
          unitId: 'con-partner-level',
          title: 'CEO Advisory & Executive Communication',
          titleDe: 'CEO-Beratung & Executive Communication',
          type: 'lesson',
          difficulty: 'advanced',
          xpReward: 35,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'The Pyramid Principle',
                headingDe: 'Das Pyramidenprinzip',
                body: 'The **Pyramid Principle** (by Barbara Minto, ex-McKinsey) is how consultants structure ALL communication:\n\n**Lead with the answer, then support it.**\n\n❌ Bottom-up (academic style):\n"We analyzed revenue, costs, market trends, competition... and therefore recommend X."\n\n✅ Top-down (consulting style):\n"We recommend X. Here\'s why: 1) Revenue opportunity, 2) Cost advantage, 3) Market timing."\n\n**The Pyramid Structure:**\n- **Top:** Main recommendation / key message\n- **Level 2:** 3-4 supporting arguments (MECE!)\n- **Level 3:** Data and evidence for each argument\n\n**Why it matters:** CEOs are busy. They want the answer first, then decide how deep to go. This also shows you can synthesize complex information into clear messages.\n\n**Rule of 3:** Always use 3 supporting points. Not 2 (too few), not 5 (too many). Three is the magic number.',
                bodyDe: 'Das **Pyramidenprinzip** (von Barbara Minto, ex-McKinsey) ist wie Berater ALLE Kommunikation strukturieren:\n\n**Mit der Antwort anfangen, dann unterstützen.**\n\n❌ Bottom-up (akademischer Stil):\n"Wir haben Umsatz, Kosten, Markttrends, Wettbewerb analysiert... und empfehlen daher X."\n\n✅ Top-down (Consulting-Stil):\n"Wir empfehlen X. Aus drei Gründen: 1) Umsatzchance, 2) Kostenvorteil, 3) Markttiming."\n\n**Die Pyramiden-Struktur:**\n- **Spitze:** Hauptempfehlung / Kernbotschaft\n- **Ebene 2:** 3-4 stützende Argumente (MECE!)\n- **Ebene 3:** Daten und Belege für jedes Argument\n\n**Warum es wichtig ist:** CEOs sind beschäftigt. Sie wollen zuerst die Antwort, dann entscheiden sie wie tief sie gehen. Das zeigt auch, dass du komplexe Informationen in klare Botschaften verdichten kannst.\n\n**Regel der 3:** Immer 3 stützende Punkte nutzen. Nicht 2 (zu wenig), nicht 5 (zu viel). Drei ist die magische Zahl.',
                keyTakeaway: 'Answer first, then support with 3 MECE arguments. Top-down, always.',
                keyTakeawayDe: 'Antwort zuerst, dann 3 MECE-Argumente. Top-down, immer.',
              },
            ]
          },
          quiz: [
            {
              id: 'con-7-ceo-q1',
              question: 'The Pyramid Principle says you should:',
              questionDe: 'Das Pyramidenprinzip sagt, du solltest:',
              type: 'multiple_choice',
              options: [
                { text: 'Build up to your conclusion gradually', textDe: 'Dich langsam zur Schlussfolgerung aufbauen' },
                { text: 'Lead with the answer, then support it', textDe: 'Mit der Antwort anfangen, dann unterstützen' },
                { text: 'Present data first, recommendations last', textDe: 'Zuerst Daten präsentieren, Empfehlungen zuletzt' },
                { text: 'Use as many arguments as possible', textDe: 'So viele Argumente wie möglich nutzen' },
              ],
              correctAnswer: 1,
              explanation: 'The Pyramid Principle = answer first, then support. Top-down communication, not bottom-up. CEOs want to know the "so what?" immediately.',
              explanationDe: 'Das Pyramidenprinzip = Antwort zuerst, dann unterstützen. Top-down Kommunikation, nicht bottom-up. CEOs wollen sofort das "und was bedeutet das?" wissen.',
              difficulty: 'advanced',
              xpReward: 15,
            },
            {
              id: 'con-7-ceo-q2',
              question: 'Who developed the Pyramid Principle?',
              questionDe: 'Wer entwickelte das Pyramidenprinzip?',
              type: 'multiple_choice',
              options: [
                { text: 'Michael Porter', textDe: 'Michael Porter' },
                { text: 'Barbara Minto', textDe: 'Barbara Minto' },
                { text: 'Peter Drucker', textDe: 'Peter Drucker' },
                { text: 'Clayton Christensen', textDe: 'Clayton Christensen' },
              ],
              correctAnswer: 1,
              explanation: 'Barbara Minto developed the Pyramid Principle while at McKinsey. Her book is considered required reading for every consultant.',
              explanationDe: 'Barbara Minto entwickelte das Pyramidenprinzip während ihrer Zeit bei McKinsey. Ihr Buch gilt als Pflichtlektüre für jeden Berater.',
              difficulty: 'advanced',
              xpReward: 15,
            },
          ]
        },
      ]
    },
  ]
};
