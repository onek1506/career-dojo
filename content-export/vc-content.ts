// ============================================================
// CareerDojo — VENTURE CAPITAL TRACK — Complete Content
// ============================================================

import { Track } from './content';

export const vcTrack: Track = {
  id: 'vc',
  title: 'Venture Capital',
  titleDe: 'Venture Capital',
  description: 'From seed to Series C — master VC interview prep',
  descriptionDe: 'Von Seed bis Series C — meistere die VC-Interview-Vorbereitung',
  units: [
    // ========== UNIT 1: VC FUNDAMENTALS ==========
    {
      id: 'vc-fundamentals',
      title: 'VC Fundamentals',
      titleDe: 'VC Grundlagen',
      description: 'How VC works, fund economics, and key players',
      descriptionDe: 'Wie VC funktioniert, Fondsökonomie und Key Players',
      icon: '🦄',
      difficulty: 'beginner',
      order: 1,
      requiredXp: 0,
      color: '#CE82FF',
      lessons: [
        {
          id: 'vc-1-what-is-vc',
          unitId: 'vc-fundamentals',
          title: 'What is Venture Capital?',
          titleDe: 'Was ist Venture Capital?',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 15,
          estimatedMinutes: 9,
          content: {
            sections: [
              {
                heading: 'The VC Model',
                headingDe: 'Das VC-Modell',
                body: 'Venture Capital firms invest in **early-stage, high-growth companies** in exchange for equity. Unlike PE, VCs take **minority stakes** and bet on explosive growth.\n\n**VC vs. PE:**\n| | VC | PE |\n|--|--|--|\n| Stage | Early-stage / Growth | Mature |\n| Stake | Minority (10-30%) | Majority (51%+) |\n| Returns | Power law (few big wins) | Consistent returns |\n| Leverage | No debt | Heavy debt |\n| Risk | Very high (most fail) | Moderate |\n\n**The Power Law:**\nIn a typical VC fund, ~60-70% of investments return 0-1x. The fund\'s success depends on 1-3 "home runs" that return 10-100x+. This is why VCs need to invest in companies with the potential to be HUGE.\n\n**VC Fund Economics (2/20):**\n- Management fee: 2% of committed capital\n- Carried interest: 20% of profits\n- Fund life: 10 years (3-5 year investment period)\n- Typical fund size: $50M-$2B+',
                bodyDe: 'Venture-Capital-Firmen investieren in **frühphasige, wachstumsstarke Unternehmen** im Austausch für Eigenkapital. Anders als PE nehmen VCs **Minderheitsbeteiligungen** und setzen auf explosives Wachstum.\n\n**VC vs. PE:**\n| | VC | PE |\n|--|--|--|\n| Phase | Frühphase / Wachstum | Reif |\n| Anteil | Minderheit (10-30%) | Mehrheit (51%+) |\n| Renditen | Power Law (wenige große Gewinne) | Konsistente Renditen |\n| Leverage | Kein FK | Viel FK |\n| Risiko | Sehr hoch (die meisten scheitern) | Moderat |\n\n**Das Power Law:**\nIn einem typischen VC-Fonds geben ~60-70% der Investments 0-1x zurück. Der Fondserfolg hängt von 1-3 "Home Runs" ab, die 10-100x+ zurückgeben.\n\n**VC-Fondsökonomie (2/20):**\n- Management Fee: 2% des zugesagten Kapitals\n- Carried Interest: 20% der Gewinne\n- Fondslaufzeit: 10 Jahre (3-5 Jahre Investitionsperiode)\n- Typische Fondsgröße: $50M-$2 Mrd.+',
                keyTakeaway: 'VC = minority stakes in high-growth startups. Power law: a few winners drive ALL returns.',
                keyTakeawayDe: 'VC = Minderheitsbeteiligungen an wachstumsstarken Startups. Power Law: wenige Gewinner treiben ALLE Renditen.',
              },
              {
                heading: 'Funding Stages',
                headingDe: 'Finanzierungsphasen',
                body: '**Pre-Seed** ($50K-$500K)\n- Idea stage, maybe an MVP\n- Angels, accelerators, friends & family\n\n**Seed** ($500K-$3M)\n- Product built, early traction\n- Seed VCs, angel syndicates\n- Valuation: $3-15M\n\n**Series A** ($5-15M)\n- Product-market fit proven, scaling\n- Institutional VCs (Sequoia, a16z, Index)\n- Valuation: $15-50M\n\n**Series B** ($15-50M)\n- Rapid growth, expanding team/markets\n- Valuation: $50-200M\n\n**Series C+** ($50-200M+)\n- Market leader, pre-IPO\n- Growth equity, crossover funds\n- Valuation: $200M-$1B+ (unicorn territory!)\n\n**Key European VCs:**\n- Index Ventures, Balderton (London)\n- Earlybird, HV Capital, Cherry Ventures (Berlin)\n- Lakestar, Global Founders Capital (DACH)\n- Northzone (Nordics)\n- Atomico (London, Skype founder)',
                bodyDe: '**Pre-Seed** ($50K-$500K)\n- Ideenphase, vielleicht ein MVP\n- Angels, Accelerators, Friends & Family\n\n**Seed** ($500K-$3M)\n- Produkt gebaut, erste Traktion\n- Seed VCs, Angel-Syndikate\n- Bewertung: $3-15M\n\n**Series A** ($5-15M)\n- Product-Market-Fit bewiesen, skalierend\n- Institutionelle VCs (Sequoia, a16z, Index)\n- Bewertung: $15-50M\n\n**Series B** ($15-50M)\n- Schnelles Wachstum, Team/Märkte expandieren\n- Bewertung: $50-200M\n\n**Series C+** ($50-200M+)\n- Marktführer, Pre-IPO\n- Growth Equity, Crossover Funds\n- Bewertung: $200M-$1 Mrd.+ (Einhorn-Territorium!)',
              },
            ]
          },
          quiz: [
            {
              id: 'vc-1-q1',
              question: 'What is the "Power Law" in VC?',
              questionDe: 'Was ist das "Power Law" im VC?',
              type: 'multiple_choice',
              options: [
                { text: 'All investments return equally', textDe: 'Alle Investments geben gleich viel zurück' },
                { text: 'A few big winners drive all fund returns', textDe: 'Wenige große Gewinner treiben alle Fondsrenditen' },
                { text: 'Returns decrease over time', textDe: 'Renditen sinken über die Zeit' },
                { text: 'Larger funds always outperform', textDe: 'Größere Fonds performen immer besser' },
              ],
              correctAnswer: 1,
              explanation: 'The Power Law means most VC investments fail, but 1-3 "home runs" (10-100x returns) generate all the fund\'s profits.',
              explanationDe: 'Das Power Law bedeutet, die meisten VC-Investments scheitern, aber 1-3 "Home Runs" (10-100x Rendite) generieren alle Fondsgewinne.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'vc-1-q2',
              question: 'At which stage is Product-Market Fit typically proven?',
              questionDe: 'In welcher Phase ist Product-Market Fit typischerweise bewiesen?',
              type: 'multiple_choice',
              options: [
                { text: 'Pre-Seed', textDe: 'Pre-Seed' },
                { text: 'Seed', textDe: 'Seed' },
                { text: 'Series A', textDe: 'Series A' },
                { text: 'Series C', textDe: 'Series C' },
              ],
              correctAnswer: 2,
              explanation: 'Series A is where PMF should be proven. VCs at this stage want to see clear evidence that customers love the product and are willing to pay.',
              explanationDe: 'Bei der Series A sollte PMF bewiesen sein. VCs in dieser Phase wollen klare Beweise, dass Kunden das Produkt lieben und bereit sind zu zahlen.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
      ]
    },

    // ========== UNIT 2: STARTUP METRICS ==========
    {
      id: 'vc-metrics',
      title: 'Startup Metrics & Unit Economics',
      titleDe: 'Startup-Metriken & Unit Economics',
      description: 'CAC, LTV, burn rate, and the numbers VCs care about',
      descriptionDe: 'CAC, LTV, Burn Rate und die Zahlen, die VCs interessieren',
      icon: '📊',
      difficulty: 'beginner',
      order: 2,
      requiredXp: 50,
      color: '#1CB0F6',
      lessons: [
        {
          id: 'vc-2-unit-economics',
          unitId: 'vc-metrics',
          title: 'Unit Economics Deep Dive',
          titleDe: 'Unit Economics im Detail',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 20,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'The Key SaaS & Startup Metrics',
                headingDe: 'Die wichtigsten SaaS- & Startup-Metriken',
                body: '**Customer Acquisition Cost (CAC)**\n= Total Sales & Marketing Spend / New Customers Acquired\n- Example: €100K spend / 200 new customers = €500 CAC\n\n**Lifetime Value (LTV)**\n= Average Revenue per Customer × Gross Margin × Average Customer Lifespan\n- Or: ARPU × Gross Margin / Churn Rate\n- Example: €50/month × 80% margin × 24 months = €960 LTV\n\n**LTV:CAC Ratio — THE metric VCs obsess over**\n- <1x: Losing money on every customer (bad!)\n- 1-3x: Unprofitable or breaking even\n- 3x+: Healthy, scalable business ✅\n- >5x: Maybe under-investing in growth\n\n**Other Critical Metrics:**\n- **MRR/ARR**: Monthly/Annual Recurring Revenue\n- **Burn Rate**: Cash spent per month\n- **Runway**: Cash in bank / Monthly burn = months until out of money\n- **Churn Rate**: % of customers lost per period\n- **Net Revenue Retention (NRR)**: >100% means existing customers grow\n- **Rule of 40**: Growth Rate + Profit Margin should be >40%',
                bodyDe: '**Customer Acquisition Cost (CAC)**\n= Gesamte Sales & Marketing Ausgaben / Neu gewonnene Kunden\n- Beispiel: €100K Ausgaben / 200 neue Kunden = €500 CAC\n\n**Lifetime Value (LTV)**\n= Durchschnittlicher Umsatz pro Kunde × Bruttomarge × Durchschnittliche Kundenlebensdauer\n- Oder: ARPU × Bruttomarge / Churn Rate\n- Beispiel: €50/Monat × 80% Marge × 24 Monate = €960 LTV\n\n**LTV:CAC Ratio — DIE Metrik, auf die VCs obsessiv schauen**\n- <1x: Verlust bei jedem Kunden (schlecht!)\n- 1-3x: Unprofitabel oder Break-Even\n- 3x+: Gesundes, skalierbares Geschäft ✅\n- >5x: Vielleicht zu wenig in Wachstum investiert\n\n**Weitere kritische Metriken:**\n- **MRR/ARR**: Monthly/Annual Recurring Revenue\n- **Burn Rate**: Cash-Verbrauch pro Monat\n- **Runway**: Cash auf dem Konto / Monatlicher Burn = Monate bis Geld aus\n- **Churn Rate**: % verlorener Kunden pro Zeitraum\n- **Net Revenue Retention (NRR)**: >100% heißt bestehende Kunden wachsen\n- **Rule of 40**: Wachstumsrate + Gewinnmarge sollte >40% sein',
                formula: 'LTV:CAC ≥ 3x is the benchmark. Payback period should be <18 months.',
                keyTakeaway: 'LTV:CAC ≥ 3x = healthy unit economics. Burn rate × months = runway.',
                keyTakeawayDe: 'LTV:CAC ≥ 3x = gesunde Unit Economics. Burn Rate × Monate = Runway.',
              },
            ]
          },
          quiz: [
            {
              id: 'vc-2-q1',
              question: 'A startup spends €200K on marketing and acquires 400 customers. What is the CAC?',
              questionDe: 'Ein Startup gibt €200K für Marketing aus und gewinnt 400 Kunden. Was ist der CAC?',
              type: 'multiple_choice',
              options: [
                { text: '€200', textDe: '€200' },
                { text: '€400', textDe: '€400' },
                { text: '€500', textDe: '€500' },
                { text: '€800', textDe: '€800' },
              ],
              correctAnswer: 2,
              explanation: 'CAC = €200,000 / 400 customers = €500 per customer.',
              explanationDe: 'CAC = €200.000 / 400 Kunden = €500 pro Kunde.',
              difficulty: 'beginner',
              xpReward: 12,
            },
            {
              id: 'vc-2-q2',
              question: 'What LTV:CAC ratio do VCs consider healthy?',
              questionDe: 'Welches LTV:CAC-Verhältnis halten VCs für gesund?',
              type: 'multiple_choice',
              options: [
                { text: '1:1', textDe: '1:1' },
                { text: '2:1', textDe: '2:1' },
                { text: '3:1 or higher', textDe: '3:1 oder höher' },
                { text: '10:1 minimum', textDe: 'Mindestens 10:1' },
              ],
              correctAnswer: 2,
              explanation: 'LTV:CAC of 3:1 or higher is considered healthy. Below 3x, the company may not be viable at scale. Above 5x might mean under-investing in growth.',
              explanationDe: 'LTV:CAC von 3:1 oder höher gilt als gesund. Unter 3x ist das Unternehmen möglicherweise nicht skalierbar. Über 5x könnte zu wenig in Wachstum investiert werden.',
              difficulty: 'beginner',
              xpReward: 12,
            },
          ]
        },
      ]
    },

    // ========== UNIT 3: TERM SHEETS & CAP TABLES ==========
    {
      id: 'vc-term-sheets',
      title: 'Term Sheets & Cap Tables',
      titleDe: 'Term Sheets & Cap Tables',
      description: 'How VC deals are structured',
      descriptionDe: 'Wie VC-Deals strukturiert sind',
      icon: '📝',
      difficulty: 'intermediate',
      order: 3,
      requiredXp: 200,
      color: '#FF9600',
      lessons: [
        {
          id: 'vc-3-term-sheets',
          unitId: 'vc-term-sheets',
          title: 'Term Sheet Essentials',
          titleDe: 'Term Sheet Grundlagen',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'Key Term Sheet Terms',
                headingDe: 'Wichtige Term-Sheet-Begriffe',
                body: '**Valuation:**\n- **Pre-money valuation**: Company value BEFORE new investment\n- **Post-money valuation**: Pre-money + New investment\n- Example: $10M pre-money + $5M investment = $15M post-money\n- VC gets: $5M / $15M = 33.3% ownership\n\n**Liquidation Preference:**\n- What VCs get paid FIRST in a sale/liquidation\n- **1x non-participating**: VC gets their money back OR shares pro-rata (whichever is higher)\n- **1x participating**: VC gets money back AND shares pro-rata ("double dipping")\n- **2x+**: VC gets 2x their money before anyone else (very investor-friendly)\n\n**Anti-Dilution Protection:**\n- Protects VCs if next round is at lower valuation ("down round")\n- **Full ratchet**: Adjusts to lowest price (very aggressive)\n- **Weighted average**: More common, adjusts proportionally\n\n**Other Key Terms:**\n- **Pro-rata rights**: Right to invest in future rounds\n- **Board seats**: VC gets a seat on the board\n- **Vesting**: Founder shares vest over 4 years (1-year cliff)\n- **Drag-along**: Majority can force minority to sell\n- **ROFR**: Right of first refusal on share transfers',
                bodyDe: '**Bewertung:**\n- **Pre-Money-Bewertung**: Firmenwert VOR neuem Investment\n- **Post-Money-Bewertung**: Pre-Money + Neues Investment\n- Beispiel: $10M Pre-Money + $5M Investment = $15M Post-Money\n- VC bekommt: $5M / $15M = 33,3% Eigentum\n\n**Liquidation Preference:**\n- Was VCs ZUERST bei einem Verkauf/Liquidation bekommen\n- **1x Non-Participating**: VC bekommt Geld zurück ODER Anteile pro-rata\n- **1x Participating**: VC bekommt Geld zurück UND Anteile pro-rata\n\n**Anti-Dilution-Schutz:**\n- Schützt VCs bei niedrigerer Bewertung in nächster Runde ("Down Round")\n- **Full Ratchet**: Passt auf niedrigsten Preis an (sehr aggressiv)\n- **Weighted Average**: Üblicher, passt proportional an\n\n**Weitere wichtige Begriffe:**\n- **Pro-Rata-Rechte**: Recht, in zukünftigen Runden zu investieren\n- **Board Seats**: VC bekommt einen Sitz im Vorstand\n- **Vesting**: Gründer-Anteile vesten über 4 Jahre (1-Jahr Cliff)\n- **Drag-Along**: Mehrheit kann Minderheit zum Verkauf zwingen',
                formula: 'Post-Money = Pre-Money + Investment Amount\nVC Ownership = Investment / Post-Money',
                keyTakeaway: 'Pre-money + investment = Post-money. VC% = investment / post-money.',
                keyTakeawayDe: 'Pre-Money + Investment = Post-Money. VC% = Investment / Post-Money.',
                detailedExample: '**Example: Series A Term Sheet**\nPre-money: $20M\nInvestment: $5M (by Index Ventures)\nPost-money: $25M\nIndex ownership: $5M / $25M = 20%\n\nFounders: 60% → after dilution: 60% × (20/25) = 48%\nSeed investors: 20% → after: 20% × (20/25) = 16%\nESOP: 20% → after: 20% × (20/25) = 16%\nIndex Ventures: 20% (new)',
                detailedExampleDe: '**Beispiel: Series A Term Sheet**\nPre-Money: $20M\nInvestment: $5M (von Index Ventures)\nPost-Money: $25M\nIndex-Anteil: $5M / $25M = 20%\n\nGründer: 60% → nach Verwässerung: 60% × (20/25) = 48%\nSeed-Investoren: 20% → danach: 20% × (20/25) = 16%\nESOP: 20% → danach: 20% × (20/25) = 16%\nIndex Ventures: 20% (neu)',
              },
            ]
          },
          quiz: [
            {
              id: 'vc-3-q1',
              question: 'Pre-money $30M, VC invests $10M. What % does the VC own?',
              questionDe: 'Pre-Money $30M, VC investiert $10M. Wie viel % besitzt der VC?',
              type: 'multiple_choice',
              options: [
                { text: '10%', textDe: '10%' },
                { text: '25%', textDe: '25%' },
                { text: '30%', textDe: '30%' },
                { text: '33%', textDe: '33%' },
              ],
              correctAnswer: 1,
              explanation: 'Post-money = $30M + $10M = $40M. VC% = $10M / $40M = 25%.',
              explanationDe: 'Post-Money = $30M + $10M = $40M. VC% = $10M / $40M = 25%.',
              difficulty: 'intermediate',
              xpReward: 15,
            },
            {
              id: 'vc-3-q2',
              question: 'What is a "1x participating liquidation preference"?',
              questionDe: 'Was ist eine "1x Participating Liquidation Preference"?',
              type: 'multiple_choice',
              options: [
                { text: 'VC gets 1x their money OR pro-rata share', textDe: 'VC bekommt 1x Geld zurück ODER pro-rata Anteil' },
                { text: 'VC gets 1x their money AND pro-rata share', textDe: 'VC bekommt 1x Geld zurück UND pro-rata Anteil' },
                { text: 'VC participates in board meetings', textDe: 'VC nimmt an Vorstandssitzungen teil' },
                { text: 'VC can sell their shares first', textDe: 'VC kann Anteile zuerst verkaufen' },
              ],
              correctAnswer: 1,
              explanation: '"1x participating" means the VC gets their money back first AND then participates pro-rata in the remaining proceeds. This is called "double dipping."',
              explanationDe: '"1x Participating" bedeutet der VC bekommt sein Geld zuerst zurück UND partizipiert dann pro-rata am Rest. Das nennt man "Double Dipping."',
              difficulty: 'intermediate',
              xpReward: 15,
            },
          ]
        },
      ]
    },

    // ========== UNIT 4: VC DEAL ANALYSIS ==========
    {
      id: 'vc-deal-analysis',
      title: 'VC Deal Analysis',
      titleDe: 'VC-Deal-Analyse',
      description: 'How VCs evaluate startups and investment opportunities',
      descriptionDe: 'Wie VCs Startups und Investmentmöglichkeiten bewerten',
      icon: '🔬',
      difficulty: 'intermediate',
      order: 4,
      requiredXp: 500,
      color: '#58CC02',
      lessons: [
        {
          id: 'vc-4-evaluation',
          unitId: 'vc-deal-analysis',
          title: 'Startup Evaluation Framework',
          titleDe: 'Startup-Bewertungs-Framework',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'The VC Investment Criteria',
                headingDe: 'Die VC-Investmentkriterien',
                body: '**What VCs look for (in order of importance):**\n\n**1. Team (40% of decision)**\n- Domain expertise & track record\n- Complementary skill sets (tech + business)\n- Resilience, coachability, vision\n- "Would I want to work with this person for 10 years?"\n\n**2. Market (30%)**\n- TAM > $1B (must be large enough for VC returns)\n- Growing market (>15% CAGR ideal)\n- Secular tailwinds (not just cyclical)\n- Fragmented (opportunity to consolidate)\n\n**3. Product (15%)**\n- Clear problem-solution fit\n- "10x better" than alternatives (not just 2x)\n- Strong user engagement metrics\n- Network effects or switching costs (moat)\n\n**4. Traction (10%)**\n- Revenue growth rate (>3x YoY for early stage)\n- User growth, engagement metrics\n- Notable customers / logos\n- Unit economics trending positive\n\n**5. Defensibility (5%)**\n- Network effects\n- Data moats\n- Brand\n- Regulatory barriers\n- Switching costs',
                bodyDe: '**Worauf VCs achten (nach Wichtigkeit):**\n\n**1. Team (40% der Entscheidung)**\n- Domänenexpertise & Track Record\n- Komplementäre Skill-Sets (Tech + Business)\n- Resilienz, Coachbarkeit, Vision\n- "Möchte ich 10 Jahre mit dieser Person arbeiten?"\n\n**2. Markt (30%)**\n- TAM > $1 Mrd. (muss groß genug für VC-Renditen sein)\n- Wachsender Markt (>15% CAGR ideal)\n- Säkulare Rückenwinde (nicht nur zyklisch)\n\n**3. Produkt (15%)**\n- Klarer Problem-Lösungs-Fit\n- "10x besser" als Alternativen (nicht nur 2x)\n- Starke User-Engagement-Metriken\n- Netzwerkeffekte oder Wechselkosten (Moat)\n\n**4. Traktion (10%)**\n- Umsatzwachstumsrate (>3x YoY für Early Stage)\n- Nutzerwachstum, Engagement-Metriken\n- Namhafte Kunden / Logos\n\n**5. Defensibility (5%)**\n- Netzwerkeffekte, Data Moats, Brand, Regulierung',
                keyTakeaway: 'VCs bet on Team first, then Market, then Product. Traction validates the thesis.',
                keyTakeawayDe: 'VCs setzen zuerst auf das Team, dann auf den Markt, dann aufs Produkt.',
              },
            ]
          },
          quiz: [
            {
              id: 'vc-4-q1',
              question: 'What is the MOST important factor for VC investment decisions?',
              questionDe: 'Was ist der WICHTIGSTE Faktor für VC-Investmententscheidungen?',
              type: 'multiple_choice',
              options: [
                { text: 'Product features', textDe: 'Produkt-Features' },
                { text: 'Current revenue', textDe: 'Aktueller Umsatz' },
                { text: 'Team quality', textDe: 'Team-Qualität' },
                { text: 'Market size', textDe: 'Marktgröße' },
              ],
              correctAnswer: 2,
              explanation: 'Team is #1 for most VCs (~40% of the decision). A great team in an OK market beats an OK team in a great market.',
              explanationDe: 'Team ist #1 für die meisten VCs (~40% der Entscheidung). Ein großartiges Team in einem OK-Markt schlägt ein OK-Team in einem großartigen Markt.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
      ]
    },

    // ========== UNIT 5: VC INTERVIEW PREP ==========
    {
      id: 'vc-interview',
      title: 'VC Interview Mastery',
      titleDe: 'VC-Interview meistern',
      description: 'Fit questions, investment memos, and market analysis',
      descriptionDe: 'Fit-Fragen, Investment Memos und Marktanalysen',
      icon: '🎤',
      difficulty: 'advanced',
      order: 5,
      requiredXp: 900,
      color: '#FF4B4B',
      lessons: [
        {
          id: 'vc-5-fit-questions',
          unitId: 'vc-interview',
          title: 'VC Interview Questions',
          titleDe: 'VC-Interview-Fragen',
          type: 'lesson',
          difficulty: 'advanced',
          xpReward: 30,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'Common VC Interview Questions',
                headingDe: 'Häufige VC-Interview-Fragen',
                body: '**"Walk me through a deal you\'d invest in"**\nThis is THE VC interview question. You need a prepared investment thesis:\n- Name a real startup/company\n- Explain WHY you\'d invest (team, market, product, traction)\n- What are the risks?\n- What milestones would you set?\n- What\'s the potential return?\n\n**"What\'s your investment thesis?"**\n- What sectors/trends are you excited about?\n- Back it up with data and examples\n- Show you follow the startup ecosystem\n\n**"Tell me about a startup you think is overvalued"**\n- Shows contrarian thinking\n- Must have a nuanced, well-reasoned opinion\n- Don\'t just pick a meme stock\n\n**"How would you evaluate [specific market]?"**\n- TAM/SAM/SOM framework\n- Competitive landscape mapping\n- Key success factors\n- Where the puck is going (trends)\n\n**Key trait VCs look for:**\n- "Deal flow" mindset — always be scouting\n- Strong opinions, loosely held\n- Ability to say "no" with good reasoning\n- Genuine passion for startups and technology',
                bodyDe: '**"Walk me through a Deal, in den du investieren würdest"**\nDAS ist DIE VC-Interview-Frage. Du brauchst eine vorbereitete Investment-These:\n- Nenne ein echtes Startup/Unternehmen\n- Erkläre WARUM du investieren würdest (Team, Markt, Produkt, Traktion)\n- Was sind die Risiken?\n- Welche Meilensteine würdest du setzen?\n- Was ist die potenzielle Rendite?\n\n**"Was ist deine Investment-These?"**\n- Welche Sektoren/Trends begeistern dich?\n- Untermauere mit Daten und Beispielen\n- Zeige, dass du das Startup-Ökosystem verfolgst\n\n**"Welches Startup hältst du für überbewertet?"**\n- Zeigt konträres Denken\n- Muss eine nuancierte, gut begründete Meinung sein\n\n**"Wie würdest du [bestimmten Markt] bewerten?"**\n- TAM/SAM/SOM Framework\n- Wettbewerbslandschaft kartieren\n- Schlüsselerfolgsfaktoren\n- Wohin sich der Markt entwickelt (Trends)',
                tip: 'Prepare 3 investment theses and 2 "anti-theses" (overvalued companies). Update them regularly with current market data.',
                tipDe: 'Bereite 3 Investment-Thesen und 2 "Anti-Thesen" (überbewertete Firmen) vor. Aktualisiere sie regelmäßig mit aktuellen Marktdaten.',
              },
            ]
          },
          quiz: [
            {
              id: 'vc-5-q1',
              question: 'What is the #1 thing to prepare for a VC interview?',
              questionDe: 'Was ist das #1 Ding, das man für ein VC-Interview vorbereiten sollte?',
              type: 'multiple_choice',
              options: [
                { text: 'DCF modeling skills', textDe: 'DCF-Modellierungsfähigkeiten' },
                { text: 'A prepared investment thesis on a real startup', textDe: 'Eine vorbereitete Investment-These zu einem echten Startup' },
                { text: 'Knowledge of accounting standards', textDe: 'Wissen über Rechnungslegungsstandards' },
                { text: 'LBO modeling skills', textDe: 'LBO-Modellierungsfähigkeiten' },
              ],
              correctAnswer: 1,
              explanation: 'The "walk me through a deal" question comes up in almost every VC interview. Have 2-3 polished investment theses ready!',
              explanationDe: 'Die "Walk me through a Deal"-Frage kommt in fast jedem VC-Interview. Habe 2-3 ausgearbeitete Investment-Thesen bereit!',
              difficulty: 'advanced',
              xpReward: 15,
            },
          ]
        },
      ]
    },
  ]
};
