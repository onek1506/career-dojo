// ============================================================
// CareerDojo — PRIVATE EQUITY TRACK — Complete Content
// ============================================================

import { Track } from './content';

export const peTrack: Track = {
  id: 'pe',
  title: 'Private Equity',
  titleDe: 'Private Equity',
  description: 'Master LBOs, value creation, and PE interview technicals',
  descriptionDe: 'Meistere LBOs, Wertschöpfung und PE-Interview-Technicals',
  units: [
    // ========== UNIT 1: PE FUNDAMENTALS ==========
    {
      id: 'pe-fundamentals',
      title: 'PE Fundamentals',
      titleDe: 'PE Grundlagen',
      description: 'How PE firms work, fund structure, and key players',
      descriptionDe: 'Wie PE-Firmen arbeiten, Fondsstruktur und Key Players',
      icon: '🦗',
      difficulty: 'beginner',
      order: 1,
      requiredXp: 0,
      color: '#58CC02',
      lessons: [
        {
          id: 'pe-1-what-is-pe',
          unitId: 'pe-fundamentals',
          title: 'What is Private Equity?',
          titleDe: 'Was ist Private Equity?',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 15,
          estimatedMinutes: 9,
          content: {
            sections: [
              {
                heading: 'The PE Business Model',
                headingDe: 'Das PE-Geschäftsmodell',
                body: 'Private Equity firms **buy companies, improve them, and sell them** for a profit — typically within 3-7 years.\n\n**The PE Fund Structure:**\n- **GP (General Partner):** The PE firm that manages the fund and makes investment decisions\n- **LPs (Limited Partners):** The investors — pension funds, sovereign wealth funds, endowments, family offices — who provide 95%+ of the capital\n- **Fund:** A pool of committed capital (e.g., "$5B Fund VII") with a 10-year life\n\n**How PE firms make money:**\n1. **Management Fee:** 1.5-2% of committed capital per year (~$75-100M/yr on a $5B fund)\n2. **Carried Interest ("Carry"):** 20% of profits above a hurdle rate (usually 8%)\n\n**The Fund Lifecycle:**\n- Years 1-5: **Investment Period** — Deploy capital, buy companies\n- Years 3-10: **Harvesting Period** — Improve and exit portfolio companies\n- Year 10+: **Wind-down** — Final exits, return remaining capital',
                bodyDe: 'Private-Equity-Firmen **kaufen Unternehmen, verbessern sie und verkaufen sie** mit Gewinn — typischerweise innerhalb von 3-7 Jahren.\n\n**Die PE-Fondsstruktur:**\n- **GP (General Partner):** Die PE-Firma, die den Fonds managt und Investitionsentscheidungen trifft\n- **LPs (Limited Partners):** Die Investoren — Pensionsfonds, Staatsfonds, Stiftungen, Family Offices — die 95%+ des Kapitals stellen\n- **Fonds:** Ein Pool von zugesagtem Kapital (z.B. "€5 Mrd. Fonds VII") mit 10 Jahren Laufzeit\n\n**Wie PE-Firmen Geld verdienen:**\n1. **Management Fee:** 1,5-2% des zugesagten Kapitals/Jahr (~€75-100 Mio./Jahr bei €5 Mrd.)\n2. **Carried Interest ("Carry"):** 20% der Gewinne über einer Hurdle Rate (meist 8%)\n\n**Der Fonds-Lebenszyklus:**\n- Jahre 1-5: **Investitionsperiode** — Kapital einsetzen, Unternehmen kaufen\n- Jahre 3-10: **Ernte-Periode** — Portfolio-Unternehmen verbessern und verkaufen\n- Jahr 10+: **Wind-down** — Letzte Exits, restliches Kapital zurückgeben',
                keyTakeaway: 'PE = Buy, Improve, Sell. GPs manage, LPs invest, Carry is the big payday.',
                keyTakeawayDe: 'PE = Kaufen, Verbessern, Verkaufen. GPs managen, LPs investieren, Carry ist der große Zahltag.',
                detailedExample: '**Example: Blackstone buys Hilton Hotels (2007)**\n- Bought for $26B (largest hotel LBO ever)\n- ~$5.6B equity, ~$20B debt\n- Improved operations, expanded internationally\n- IPO in 2013, fully exited by 2018\n- Total return: ~$14B profit on $5.6B equity = ~3x MOIC\n- One of the most successful PE deals in history',
                detailedExampleDe: '**Beispiel: Blackstone kauft Hilton Hotels (2007)**\n- Gekauft für $26 Mrd. (größter Hotel-LBO aller Zeiten)\n- ~$5,6 Mrd. Eigenkapital, ~$20 Mrd. Fremdkapital\n- Operations verbessert, international expandiert\n- IPO 2013, vollständig verkauft bis 2018\n- Gesamtrendite: ~$14 Mrd. Gewinn auf $5,6 Mrd. EK = ~3x MOIC\n- Einer der erfolgreichsten PE-Deals der Geschichte',
              },
              {
                heading: 'Key PE Players',
                headingDe: 'Die großen PE-Player',
                body: '**Global Mega Funds (AUM >$100B):**\n- **Blackstone** — Largest PE firm globally (~$1T AUM)\n- **KKR** — Pioneer of leveraged buyouts\n- **Apollo** — Known for distressed/complex situations\n- **Carlyle** — Strong government/defense connections\n- **TPG** — Tech and healthcare focus\n\n**European Leaders:**\n- **EQT** (Stockholm) — Nordic champion, ~€230B AUM\n- **CVC Capital** — Pan-European, strong consumer/healthcare\n- **Permira** — Tech-focused European PE\n- **BC Partners** — European mid-market champion\n- **Triton** — DACH/Nordics industrial specialist\n\n**DACH-focused:**\n- **DBAG** (Deutsche Beteiligungs AG) — German Mittelstand\n- **Bregal Unternehmerkapital** — German succession deals\n- **Capvis** — Swiss mid-market PE\n- **Waterland** — Benelux/DACH buy-and-build',
                bodyDe: '**Globale Mega-Fonds (AUM >$100 Mrd.):**\n- **Blackstone** — Größte PE-Firma weltweit (~$1 Bio. AUM)\n- **KKR** — Pionier der Leveraged Buyouts\n- **Apollo** — Bekannt für Distressed/komplexe Situationen\n- **Carlyle** — Starke Regierungs-/Verteidigungsverbindungen\n- **TPG** — Tech und Healthcare Fokus\n\n**Europäische Leader:**\n- **EQT** (Stockholm) — Nordischer Champion, ~€230 Mrd. AUM\n- **CVC Capital** — Paneuropäisch, stark in Consumer/Healthcare\n- **Permira** — Tech-fokussiert europäisches PE\n- **BC Partners** — Europäischer Mid-Market Champion\n- **Triton** — DACH/Nordics Industrie-Spezialist\n\n**DACH-fokussiert:**\n- **DBAG** — Deutscher Mittelstand\n- **Bregal Unternehmerkapital** — Deutsche Nachfolge-Deals\n- **Capvis** — Schweizer Mid-Market PE\n- **Waterland** — Benelux/DACH Buy-and-Build',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-1-q1',
              question: 'What is "Carried Interest" in PE?',
              questionDe: 'Was ist "Carried Interest" im PE?',
              type: 'multiple_choice',
              options: [
                { text: 'Annual management fee of 2%', textDe: 'Jährliche Management Fee von 2%' },
                { text: '20% share of profits above the hurdle rate', textDe: '20% Anteil an Gewinnen über der Hurdle Rate' },
                { text: 'Interest on the debt used in buyouts', textDe: 'Zinsen auf das bei Buyouts verwendete Fremdkapital' },
                { text: 'Bonus for the CEO of portfolio companies', textDe: 'Bonus für den CEO der Portfoliounternehmen' },
              ],
              correctAnswer: 1,
              explanation: 'Carried Interest ("Carry") is the GP\'s share of profits — typically 20% of returns above an 8% hurdle rate. This is how PE partners get very wealthy.',
              explanationDe: 'Carried Interest ("Carry") ist der Gewinnanteil des GP — typischerweise 20% der Renditen über einer 8% Hurdle Rate. So werden PE-Partner sehr wohlhabend.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'pe-1-q2',
              question: 'Who are the LPs in a PE fund?',
              questionDe: 'Wer sind die LPs in einem PE-Fonds?',
              type: 'multiple_choice',
              options: [
                { text: 'The PE firm\'s managing partners', textDe: 'Die Managing Partner der PE-Firma' },
                { text: 'The CEOs of portfolio companies', textDe: 'Die CEOs der Portfoliounternehmen' },
                { text: 'Pension funds, sovereign wealth funds, endowments', textDe: 'Pensionsfonds, Staatsfonds, Stiftungen' },
                { text: 'Investment banks providing financing', textDe: 'Investmentbanken, die Finanzierung bereitstellen' },
              ],
              correctAnswer: 2,
              explanation: 'Limited Partners (LPs) are the investors who provide the capital — pension funds, sovereign wealth funds, endowments, family offices. They\'re "limited" because they don\'t make investment decisions.',
              explanationDe: 'Limited Partners (LPs) sind die Investoren, die das Kapital bereitstellen — Pensionsfonds, Staatsfonds, Stiftungen, Family Offices. Sie sind "limited", weil sie keine Investitionsentscheidungen treffen.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
      ]
    },

    // ========== UNIT 2: LBO MECHANICS ==========
    {
      id: 'pe-lbo-mechanics',
      title: 'LBO Mechanics',
      titleDe: 'LBO-Mechanik',
      description: 'How leveraged buyouts work, from debt to returns',
      descriptionDe: 'Wie Leveraged Buyouts funktionieren, von Debt bis Returns',
      icon: '⚙️',
      difficulty: 'beginner',
      order: 2,
      requiredXp: 50,
      color: '#1CB0F6',
      lessons: [
        {
          id: 'pe-2-lbo-basics',
          unitId: 'pe-lbo-mechanics',
          title: 'LBO Fundamentals',
          titleDe: 'LBO-Grundlagen',
          type: 'lesson',
          difficulty: 'beginner',
          xpReward: 20,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'What is an LBO?',
                headingDe: 'Was ist ein LBO?',
                body: 'A **Leveraged Buyout (LBO)** is when a PE firm acquires a company using a mix of **equity (30-40%) and debt (60-70%)**.\n\n**Why use leverage?**\n- Amplifies returns: If you buy a $100M company with $40M equity and sell for $150M, your return on equity is much higher than buying all-cash\n- Tax advantage: Interest on debt is tax-deductible\n- Discipline: Debt repayment forces operational efficiency\n\n**The "LBO Candidate" Checklist:**\n✅ Stable, predictable cash flows\n✅ Low cyclicality\n✅ Strong market position / barriers to entry\n✅ Low capex requirements\n✅ Opportunities for operational improvement\n✅ Experienced management team\n✅ Clear path to exit\n\n**Bad LBO Candidates:**\n❌ High-growth startups (need cash for growth)\n❌ Highly cyclical businesses (can\'t service debt in downturns)\n❌ Capital-intensive industries (all cash goes to capex)\n❌ Companies with no cost-cutting opportunities',
                bodyDe: 'Ein **Leveraged Buyout (LBO)** ist, wenn eine PE-Firma ein Unternehmen mit einer Mischung aus **Eigenkapital (30-40%) und Fremdkapital (60-70%)** kauft.\n\n**Warum Leverage?**\n- Verstärkt Renditen: Kaufst du eine €100 Mio. Firma mit €40 Mio. EK und verkaufst für €150 Mio., ist deine EK-Rendite viel höher als bei Barkauf\n- Steuervorteil: Zinsen auf FK sind steuerlich absetzbar\n- Disziplin: Schuldenrückzahlung erzwingt operationale Effizienz\n\n**Die "LBO-Kandidat" Checkliste:**\n✅ Stabile, vorhersagbare Cashflows\n✅ Geringe Zyklizität\n✅ Starke Marktposition / Eintrittsbarrieren\n✅ Niedriger Capex-Bedarf\n✅ Möglichkeiten für operationale Verbesserung\n✅ Erfahrenes Management-Team\n✅ Klarer Exit-Pfad',
                formula: 'Equity Return = (Exit Enterprise Value - Net Debt at Exit) / Initial Equity Invested',
                keyTakeaway: 'LBO = Buy with mostly debt, use cash flows to repay, sell for more',
                keyTakeawayDe: 'LBO = Mit hauptsächlich FK kaufen, Cashflows zum Tilgen nutzen, teurer verkaufen',
              },
              {
                heading: 'Sources & Uses',
                headingDe: 'Sources & Uses',
                body: '**Sources = Where the money comes from:**\n- Senior Debt (Term Loan A/B): 3-5x EBITDA, lowest interest rate\n- Mezzanine / Subordinated Debt: Higher rate, sometimes with warrants\n- Sponsor Equity: PE firm\'s investment (30-40% of total)\n- Management Rollover: Existing mgmt reinvests equity\n\n**Uses = Where the money goes:**\n- Purchase Price (Enterprise Value)\n- Transaction Fees (advisory, legal, financing: 2-5% of deal value)\n- Debt Financing Fees (OID, arrangement fees)\n- Refinancing existing debt\n\n**Key Rule: Sources MUST equal Uses. Always.**\n\n**Typical Capital Structure:**\n| Tranche | Multiple | Rate |\n|---------|----------|------|\n| Senior Secured (TLA) | 2-3x EBITDA | SOFR + 200-350bps |\n| Senior Secured (TLB) | 1-2x EBITDA | SOFR + 350-500bps |\n| Mezzanine | 0.5-1x EBITDA | 10-14% |\n| Equity | 3-4x EBITDA | — |',
                bodyDe: '**Sources = Woher das Geld kommt:**\n- Senior Debt (Term Loan A/B): 3-5x EBITDA, niedrigster Zinssatz\n- Mezzanine / Nachrangiges FK: Höherer Zins, manchmal mit Warrants\n- Sponsor Equity: Investment der PE-Firma (30-40% der Gesamtsumme)\n- Management Rollover: Bestehendes Management reinvestiert EK\n\n**Uses = Wohin das Geld geht:**\n- Kaufpreis (Enterprise Value)\n- Transaktionskosten (Beratung, Recht, Finanzierung: 2-5% des Deal-Werts)\n- Finanzierungskosten (OID, Arrangement Fees)\n- Refinanzierung bestehender Schulden\n\n**Wichtige Regel: Sources MÜSSEN gleich Uses sein. Immer.**',
                formula: 'Total Sources = Sponsor Equity + Total Debt + Mgmt Rollover = Total Uses',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-2-q1',
              question: 'What is the typical debt/equity split in an LBO?',
              questionDe: 'Was ist der typische FK/EK-Split in einem LBO?',
              type: 'multiple_choice',
              options: [
                { text: '50% debt / 50% equity', textDe: '50% FK / 50% EK' },
                { text: '60-70% debt / 30-40% equity', textDe: '60-70% FK / 30-40% EK' },
                { text: '90% debt / 10% equity', textDe: '90% FK / 10% EK' },
                { text: '20% debt / 80% equity', textDe: '20% FK / 80% EK' },
              ],
              correctAnswer: 1,
              explanation: 'Typical LBO: 60-70% debt and 30-40% equity. The leverage amplifies returns but also increases risk.',
              explanationDe: 'Typischer LBO: 60-70% FK und 30-40% EK. Der Leverage verstärkt Renditen, erhöht aber auch das Risiko.',
              difficulty: 'beginner',
              xpReward: 10,
            },
            {
              id: 'pe-2-q2',
              question: 'Which is NOT a good LBO candidate characteristic?',
              questionDe: 'Was ist KEIN gutes LBO-Kandidaten-Merkmal?',
              type: 'multiple_choice',
              options: [
                { text: 'Stable cash flows', textDe: 'Stabile Cashflows' },
                { text: 'High growth requiring heavy investment', textDe: 'Hohes Wachstum mit hohem Investitionsbedarf' },
                { text: 'Strong market position', textDe: 'Starke Marktposition' },
                { text: 'Low capex requirements', textDe: 'Niedriger Capex-Bedarf' },
              ],
              correctAnswer: 1,
              explanation: 'High-growth companies that need heavy investment are BAD LBO candidates — their cash flows need to go toward growth, not debt repayment.',
              explanationDe: 'Hochgradig wachsende Unternehmen mit hohem Investitionsbedarf sind SCHLECHTE LBO-Kandidaten — ihre Cashflows müssen ins Wachstum fließen, nicht in die Schuldentilgung.',
              difficulty: 'beginner',
              xpReward: 10,
            },
          ]
        },
        {
          id: 'pe-2-returns',
          unitId: 'pe-lbo-mechanics',
          title: 'LBO Returns: IRR & MOIC',
          titleDe: 'LBO-Renditen: IRR & MOIC',
          type: 'calculation',
          difficulty: 'beginner',
          xpReward: 20,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'How PE Measures Returns',
                headingDe: 'Wie PE Renditen misst',
                body: '**Two key metrics:**\n\n**1. MOIC (Multiple of Invested Capital)**\n- Total value returned / Total equity invested\n- Example: Invest $100M equity, get back $300M → 3.0x MOIC\n- Simple, intuitive, but ignores timing\n\n**2. IRR (Internal Rate of Return)**\n- Annualized return accounting for timing of cash flows\n- Example: 3.0x MOIC in 3 years ≈ 44% IRR; 3.0x in 7 years ≈ 17% IRR\n- The industry\'s primary performance metric\n\n**Target Returns:**\n- Minimum: 2.0x MOIC / 20% IRR\n- Good: 2.5-3.0x MOIC / 25-30% IRR\n- Great: 3.0x+ MOIC / 30%+ IRR\n\n**Three drivers of LBO returns:**\n1. **EBITDA Growth** — Grow the business (revenue & margin)\n2. **Multiple Expansion** — Sell at a higher EV/EBITDA multiple than you bought\n3. **Debt Paydown** — Use cash flows to repay debt → more equity value at exit\n\nRule of thumb: A good LBO has roughly equal contribution from all three.',
                bodyDe: '**Zwei Schlüsselkennzahlen:**\n\n**1. MOIC (Multiple of Invested Capital)**\n- Gesamtwert zurück / Gesamtes EK investiert\n- Beispiel: €100 Mio. EK investiert, €300 Mio. zurück → 3,0x MOIC\n- Einfach, intuitiv, aber ignoriert Timing\n\n**2. IRR (Internal Rate of Return)**\n- Annualisierte Rendite unter Berücksichtigung des Cashflow-Timings\n- Beispiel: 3,0x MOIC in 3 Jahren ≈ 44% IRR; 3,0x in 7 Jahren ≈ 17% IRR\n- DIE primäre Performance-Kennzahl der Branche\n\n**Zielrenditen:**\n- Minimum: 2,0x MOIC / 20% IRR\n- Gut: 2,5-3,0x MOIC / 25-30% IRR\n- Super: 3,0x+ MOIC / 30%+ IRR\n\n**Drei Treiber von LBO-Renditen:**\n1. **EBITDA-Wachstum** — Geschäft wachsen lassen (Umsatz & Marge)\n2. **Multiple Expansion** — Zu einem höheren EV/EBITDA-Multiple verkaufen als gekauft\n3. **Debt Paydown** — Cashflows zum Schuldentilgen nutzen → mehr EK-Wert beim Exit',
                formula: 'MOIC = Total Equity Returned / Total Equity Invested\nIRR ≈ MOIC^(1/years) - 1 (simplified)',
                detailedExample: '**Paper LBO Example:**\nBuy company for 8x EBITDA of €50M = €400M EV\nDebt: 5x EBITDA = €250M | Equity: €150M\n\nAfter 5 years:\n- EBITDA grew to €70M (7% CAGR)\n- Debt repaid to €150M (€100M paydown from FCF)\n- Exit at 9x EBITDA = €630M EV\n- Equity value = €630M - €150M debt = €480M\n- MOIC = €480M / €150M = 3.2x\n- IRR ≈ 3.2^(1/5) - 1 ≈ 26%',
                detailedExampleDe: '**Paper-LBO Beispiel:**\nKauf für 8x EBITDA von €50 Mio. = €400 Mio. EV\nDebt: 5x EBITDA = €250 Mio. | EK: €150 Mio.\n\nNach 5 Jahren:\n- EBITDA auf €70 Mio. gewachsen (7% CAGR)\n- Schulden auf €150 Mio. zurückgezahlt (€100 Mio. getilgt aus FCF)\n- Exit bei 9x EBITDA = €630 Mio. EV\n- EK-Wert = €630 Mio. - €150 Mio. Schulden = €480 Mio.\n- MOIC = €480 Mio. / €150 Mio. = 3,2x\n- IRR ≈ 3,2^(1/5) - 1 ≈ 26%',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-2-ret-q1',
              question: 'A PE fund invests €200M and exits for €600M after 4 years. What is the MOIC?',
              questionDe: 'Ein PE-Fonds investiert €200 Mio. und exitiert für €600 Mio. nach 4 Jahren. Was ist der MOIC?',
              type: 'multiple_choice',
              options: [
                { text: '2.0x', textDe: '2,0x' },
                { text: '3.0x', textDe: '3,0x' },
                { text: '4.0x', textDe: '4,0x' },
                { text: '6.0x', textDe: '6,0x' },
              ],
              correctAnswer: 1,
              explanation: 'MOIC = €600M / €200M = 3.0x. Simple ratio of money out to money in.',
              explanationDe: 'MOIC = €600 Mio. / €200 Mio. = 3,0x. Einfaches Verhältnis von Geld raus zu Geld rein.',
              difficulty: 'beginner',
              xpReward: 12,
            },
            {
              id: 'pe-2-ret-q2',
              question: 'Which is NOT a driver of LBO returns?',
              questionDe: 'Was ist KEIN Treiber von LBO-Renditen?',
              type: 'multiple_choice',
              options: [
                { text: 'EBITDA growth', textDe: 'EBITDA-Wachstum' },
                { text: 'Multiple expansion', textDe: 'Multiple Expansion' },
                { text: 'Stock price appreciation', textDe: 'Aktienkurssteigerung' },
                { text: 'Debt paydown', textDe: 'Schuldentilgung' },
              ],
              correctAnswer: 2,
              explanation: 'PE companies are private — there\'s no stock price. The 3 LBO return drivers are: EBITDA growth, multiple expansion, and debt paydown.',
              explanationDe: 'PE-Unternehmen sind privat — es gibt keinen Aktienkurs. Die 3 LBO-Renditetreiber sind: EBITDA-Wachstum, Multiple Expansion und Schuldentilgung.',
              difficulty: 'beginner',
              xpReward: 12,
            },
          ]
        },
      ]
    },

    // ========== UNIT 3: VALUE CREATION ==========
    {
      id: 'pe-value-creation',
      title: 'Value Creation',
      titleDe: 'Wertschöpfung',
      description: 'How PE firms create value in portfolio companies',
      descriptionDe: 'Wie PE-Firmen Wert in Portfoliounternehmen schaffen',
      icon: '📈',
      difficulty: 'intermediate',
      order: 3,
      requiredXp: 200,
      color: '#CE82FF',
      lessons: [
        {
          id: 'pe-3-value-levers',
          unitId: 'pe-value-creation',
          title: 'The Value Creation Playbook',
          titleDe: 'Das Wertschöpfungs-Playbook',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 12,
          content: {
            sections: [
              {
                heading: 'Revenue Growth Levers',
                headingDe: 'Umsatzwachstums-Hebel',
                body: '**Organic Growth:**\n- Pricing optimization (often 2-5% improvement possible)\n- Sales force effectiveness (KPIs, incentives, training)\n- New product/service launches\n- Geographic expansion\n- Channel expansion (D2C, digital, partnerships)\n\n**Inorganic Growth (Buy-and-Build):**\n- Acquire smaller competitors ("add-on acquisitions")\n- Buy at 5-7x EBITDA, platform trades at 10-12x → arbitrage!\n- Consolidate fragmented markets\n- Example: Acquire 5 dental practices, build a chain, sell as "platform" at premium',
                bodyDe: '**Organisches Wachstum:**\n- Preisoptimierung (oft 2-5% Verbesserung möglich)\n- Vertriebseffektivität (KPIs, Anreize, Schulungen)\n- Neue Produkt-/Service-Launches\n- Geografische Expansion\n- Kanal-Expansion (D2C, Digital, Partnerschaften)\n\n**Anorganisches Wachstum (Buy-and-Build):**\n- Kleinere Wettbewerber kaufen ("Add-on-Akquisitionen")\n- Bei 5-7x EBITDA kaufen, Plattform handelt bei 10-12x → Arbitrage!\n- Fragmentierte Märkte konsolidieren\n- Beispiel: 5 Zahnarztpraxen kaufen, Kette aufbauen, als "Plattform" mit Prämie verkaufen',
              },
              {
                heading: 'Margin Expansion & Operational Improvements',
                headingDe: 'Margenerweiterung & Operationale Verbesserungen',
                body: '**Cost Reduction:**\n- Procurement optimization (renegotiate supplier contracts)\n- Headcount optimization (do more with less, not always layoffs)\n- Facility rationalization\n- SG&A reduction\n- IT/system consolidation\n\n**The 100-Day Plan:**\n- First 100 days after acquisition are critical\n- Identify quick wins vs. long-term initiatives\n- Install new KPI dashboards\n- Assess management team (replace if needed)\n- Begin operational improvement programs\n\n**Multiple Expansion:**\n- Buy "messy" → clean up → sell "premium"\n- Improve reporting & governance → de-risk the business\n- Grow into new markets/segments → higher growth = higher multiple\n- Transform from "family business" to "institutional-quality platform"',
                bodyDe: '**Kostensenkung:**\n- Beschaffungsoptimierung (Lieferantenverträge neu verhandeln)\n- Personaloptimierung (mehr mit weniger machen, nicht immer Entlassungen)\n- Standortrationalisierung\n- SG&A-Reduktion\n- IT-/Systemkonsolidierung\n\n**Der 100-Tage-Plan:**\n- Die ersten 100 Tage nach der Akquisition sind entscheidend\n- Quick Wins vs. langfristige Initiativen identifizieren\n- Neue KPI-Dashboards installieren\n- Management-Team bewerten (wenn nötig ersetzen)\n- Operationale Verbesserungsprogramme starten\n\n**Multiple Expansion:**\n- "Messy" kaufen → aufräumen → "premium" verkaufen\n- Reporting & Governance verbessern → Geschäftsrisiko senken\n- In neue Märkte/Segmente wachsen → höheres Wachstum = höheres Multiple\n- Vom "Familienbetrieb" zur "institutionellen Qualitätsplattform" transformieren',
                keyTakeaway: 'PE value creation = Revenue growth + Margin expansion + Multiple expansion + Debt paydown',
                keyTakeawayDe: 'PE-Wertschöpfung = Umsatzwachstum + Margenverbesserung + Multiple Expansion + Schuldenabbau',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-3-q1',
              question: 'What is a "buy-and-build" strategy?',
              questionDe: 'Was ist eine "Buy-and-Build"-Strategie?',
              type: 'multiple_choice',
              options: [
                { text: 'Building a new factory after acquisition', textDe: 'Eine neue Fabrik nach der Akquisition bauen' },
                { text: 'Acquiring a platform company and making add-on acquisitions', textDe: 'Eine Plattform kaufen und Add-on-Akquisitionen machen' },
                { text: 'Building a company from scratch', textDe: 'Ein Unternehmen von Grund auf aufbauen' },
                { text: 'Buying land to build real estate', textDe: 'Land kaufen um Immobilien zu bauen' },
              ],
              correctAnswer: 1,
              explanation: 'Buy-and-build: Acquire a platform company, then do add-on acquisitions at lower multiples to grow and consolidate the market.',
              explanationDe: 'Buy-and-Build: Eine Plattform kaufen, dann Add-on-Akquisitionen zu niedrigeren Multiples machen um den Markt zu wachsen und zu konsolidieren.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
      ]
    },

    // ========== UNIT 4: DUE DILIGENCE ==========
    {
      id: 'pe-due-diligence',
      title: 'Due Diligence',
      titleDe: 'Due Diligence',
      description: 'Commercial & financial DD — how PE firms evaluate targets',
      descriptionDe: 'Commercial & Financial DD — wie PE-Firmen Targets bewerten',
      icon: '🔍',
      difficulty: 'intermediate',
      order: 4,
      requiredXp: 500,
      color: '#FF9600',
      lessons: [
        {
          id: 'pe-4-commercial-dd',
          unitId: 'pe-due-diligence',
          title: 'Commercial Due Diligence',
          titleDe: 'Commercial Due Diligence',
          type: 'lesson',
          difficulty: 'intermediate',
          xpReward: 25,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'The CDD Framework',
                headingDe: 'Das CDD-Framework',
                body: '**Commercial DD answers: "Is this a good business to buy?"**\n\n**Key Areas:**\n\n**1. Market Analysis**\n- Market size (TAM/SAM/SOM)\n- Growth rate and drivers\n- Cyclicality and seasonality\n- Regulatory environment\n\n**2. Competitive Landscape**\n- Market share and concentration\n- Competitive advantages (moat)\n- Threat of new entrants\n- Pricing power\n\n**3. Customer Analysis**\n- Customer concentration (top 10 = what % of revenue?)\n- Customer retention / churn rates\n- Switching costs\n- NPS / satisfaction\n\n**4. Growth Plan Validation**\n- Is management\'s business plan realistic?\n- Expert interviews to validate assumptions\n- Historical accuracy of management forecasts\n\n**Red Flags in CDD:**\n🚩 Top 3 customers = 50%+ revenue (concentration risk)\n🚩 Declining market share\n🚩 No clear competitive advantage\n🚩 Management over-promising on growth',
                bodyDe: '**Commercial DD beantwortet: "Ist das ein gutes Unternehmen zum Kaufen?"**\n\n**Schlüsselbereiche:**\n\n**1. Marktanalyse**\n- Marktgröße (TAM/SAM/SOM)\n- Wachstumsrate und Treiber\n- Zyklizität und Saisonalität\n- Regulatorisches Umfeld\n\n**2. Wettbewerbslandschaft**\n- Marktanteil und Konzentration\n- Wettbewerbsvorteile (Moat)\n- Bedrohung durch neue Marktteilnehmer\n- Preissetzungsmacht\n\n**3. Kundenanalyse**\n- Kundenkonzentration (Top 10 = wie viel % vom Umsatz?)\n- Kundenbindung / Churn Rates\n- Wechselkosten\n- NPS / Zufriedenheit\n\n**Red Flags in der CDD:**\n🚩 Top 3 Kunden = 50%+ Umsatz (Konzentrationsrisiko)\n🚩 Sinkender Marktanteil\n🚩 Kein klarer Wettbewerbsvorteil\n🚩 Management verspricht zu viel Wachstum',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-4-q1',
              question: 'In DD, which is a red flag for customer concentration?',
              questionDe: 'In der DD, was ist ein Red Flag für Kundenkonzentration?',
              type: 'multiple_choice',
              options: [
                { text: 'Top 10 customers = 30% of revenue', textDe: 'Top 10 Kunden = 30% vom Umsatz' },
                { text: 'Top 3 customers = 50%+ of revenue', textDe: 'Top 3 Kunden = 50%+ vom Umsatz' },
                { text: 'No single customer above 5%', textDe: 'Kein einzelner Kunde über 5%' },
                { text: '100+ customers equally distributed', textDe: '100+ Kunden gleichmäßig verteilt' },
              ],
              correctAnswer: 1,
              explanation: 'When top 3 customers make up 50%+ of revenue, losing one could devastate the business. This concentration risk scares PE buyers.',
              explanationDe: 'Wenn die Top-3-Kunden 50%+ des Umsatzes ausmachen, könnte der Verlust eines Kunden das Geschäft ruinieren. Dieses Konzentrationsrisiko schreckt PE-Käufer ab.',
              difficulty: 'intermediate',
              xpReward: 12,
            },
          ]
        },
      ]
    },

    // ========== UNIT 5: PE INTERVIEW ==========
    {
      id: 'pe-interview',
      title: 'PE Interview Mastery',
      titleDe: 'PE-Interview meistern',
      description: 'Paper LBOs, fit questions, and deal discussions',
      descriptionDe: 'Paper LBOs, Fit-Fragen und Deal-Diskussionen',
      icon: '🎯',
      difficulty: 'advanced',
      order: 5,
      requiredXp: 900,
      color: '#FF4B4B',
      lessons: [
        {
          id: 'pe-5-paper-lbo',
          unitId: 'pe-interview',
          title: 'Paper LBO — 10 Minutes on Paper',
          titleDe: 'Paper LBO — 10 Minuten auf Papier',
          type: 'calculation',
          difficulty: 'advanced',
          xpReward: 30,
          estimatedMinutes: 15,
          content: {
            sections: [
              {
                heading: 'How to Do a Paper LBO',
                headingDe: 'Wie man einen Paper LBO macht',
                body: '**The Paper LBO is THE key PE interview exercise.**\n\nYou\'ll get basic info and must calculate returns by hand in ~10 minutes.\n\n**Step-by-Step:**\n\n**Step 1: Sources & Uses**\n- Calculate purchase price (EV = EBITDA × Entry Multiple)\n- Add transaction fees (~2-3%)\n- Determine debt (given as multiple of EBITDA)\n- Equity = Total Uses - Total Debt\n\n**Step 2: Project Cash Flows (5 years)**\n- Start with EBITDA, grow at given rate\n- Subtract: Interest expense, Taxes, Capex, ΔWorking Capital\n- = Free Cash Flow available for debt repayment\n\n**Step 3: Debt Paydown**\n- Cumulative FCF reduces debt each year\n- Net Debt at exit = Initial Debt - Cumulative FCF\n\n**Step 4: Exit Value**\n- Exit EV = Year 5 EBITDA × Exit Multiple\n- Equity at Exit = Exit EV - Net Debt\n\n**Step 5: Calculate Returns**\n- MOIC = Exit Equity / Entry Equity\n- IRR ≈ MOIC^(1/5) - 1\n\n**Speed Tips:**\n- Round aggressively (€97M → €100M)\n- Use the Rule of 72 for quick IRR estimates\n- 2x in 5 years ≈ 15% IRR, 3x in 5 years ≈ 25% IRR',
                bodyDe: '**Der Paper LBO ist DIE zentrale PE-Interview-Übung.**\n\nDu bekommst Basisinfos und musst Renditen in ~10 Min. per Hand berechnen.\n\n**Schritt für Schritt:**\n\n**Schritt 1: Sources & Uses**\n- Kaufpreis berechnen (EV = EBITDA × Entry Multiple)\n- Transaktionskosten addieren (~2-3%)\n- Schulden bestimmen (als Multiple von EBITDA gegeben)\n- EK = Total Uses - Total Debt\n\n**Schritt 2: Cashflows projizieren (5 Jahre)**\n- Mit EBITDA starten, mit gegebener Rate wachsen lassen\n- Abziehen: Zinsaufwand, Steuern, Capex, ΔWorking Capital\n- = Free Cash Flow für Schuldentilgung\n\n**Schritt 3: Schuldenabbau**\n- Kumulierter FCF reduziert Schulden jedes Jahr\n- Nettoverschuldung beim Exit = Anfangsschulden - Kumulierter FCF\n\n**Schritt 4: Exit-Wert**\n- Exit EV = Jahr-5-EBITDA × Exit-Multiple\n- EK beim Exit = Exit EV - Nettoverschuldung\n\n**Schritt 5: Renditen berechnen**\n- MOIC = Exit-EK / Entry-EK\n- IRR ≈ MOIC^(1/5) - 1',
                formula: 'MOIC = Exit Equity / Entry Equity | IRR ≈ MOIC^(1/n) - 1',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-5-q1',
              question: 'In a Paper LBO: EBITDA=€50M, entry 8x, 5x debt. What is the equity check?',
              questionDe: 'Paper LBO: EBITDA=€50M, Entry 8x, 5x Debt. Wie hoch ist der EK-Check?',
              type: 'multiple_choice',
              options: [
                { text: '€100M', textDe: '€100M' },
                { text: '€150M', textDe: '€150M' },
                { text: '€200M', textDe: '€200M' },
                { text: '€250M', textDe: '€250M' },
              ],
              correctAnswer: 1,
              explanation: 'EV = 8 × €50M = €400M. Debt = 5 × €50M = €250M. Equity = €400M - €250M = €150M.',
              explanationDe: 'EV = 8 × €50M = €400M. Debt = 5 × €50M = €250M. EK = €400M - €250M = €150M.',
              difficulty: 'advanced',
              xpReward: 15,
            },
          ]
        },
      ]
    },

    // ========== UNIT 6: ADVANCED PE ==========
    {
      id: 'pe-advanced',
      title: 'Advanced PE Topics',
      titleDe: 'Fortgeschrittene PE-Themen',
      description: 'Exits, DACH PE landscape, and complex deal structures',
      descriptionDe: 'Exits, DACH-PE-Landschaft und komplexe Deal-Strukturen',
      icon: '👑',
      difficulty: 'advanced',
      order: 6,
      requiredXp: 1500,
      color: '#FFD700',
      lessons: [
        {
          id: 'pe-6-exits',
          unitId: 'pe-advanced',
          title: 'Exit Strategies',
          titleDe: 'Exit-Strategien',
          type: 'lesson',
          difficulty: 'advanced',
          xpReward: 30,
          estimatedMinutes: 10,
          content: {
            sections: [
              {
                heading: 'PE Exit Routes',
                headingDe: 'PE-Exit-Wege',
                body: '**1. Trade Sale (Strategic Buyer)**\n- Most common exit (50-60% of exits)\n- Sell to a larger company in the same/related industry\n- Often highest price due to synergies\n- Pros: Usually highest valuation, quick close\n- Cons: Limited buyer universe, regulatory risk\n\n**2. Secondary Buyout (SBO)**\n- Sell to another PE firm (~25-30% of exits)\n- Common for well-run businesses that still have growth potential\n- Pros: PE buyers understand the model, quick DD\n- Cons: "Why is the current PE selling?" question\n\n**3. IPO**\n- Take the company public (~5-10% of exits)\n- Typically only for large companies (>€500M EV)\n- Pros: Can achieve highest valuations, retain partial stake\n- Cons: Long process, market-dependent, lock-up period\n\n**4. Dividend Recapitalization**\n- Not a full exit — refinance with more debt, pay dividend to PE\n- "Take money off the table" while still owning the company\n- Accelerates IRR by returning capital earlier',
                bodyDe: '**1. Trade Sale (Strategischer Käufer)**\n- Häufigster Exit (50-60% aller Exits)\n- An ein größeres Unternehmen in derselben/verwandten Branche verkaufen\n- Oft höchster Preis dank Synergien\n\n**2. Secondary Buyout (SBO)**\n- An eine andere PE-Firma verkaufen (~25-30% der Exits)\n- Üblich für gut geführte Unternehmen mit weiterem Wachstumspotenzial\n\n**3. IPO**\n- Unternehmen an die Börse bringen (~5-10% der Exits)\n- Typischerweise nur für große Unternehmen (>€500 Mio. EV)\n\n**4. Dividend Recapitalization**\n- Kein vollständiger Exit — mit mehr Schulden refinanzieren, Dividende an PE\n- "Geld vom Tisch nehmen" während man das Unternehmen noch besitzt\n- Beschleunigt IRR durch frühere Kapitalrückgabe',
              },
            ]
          },
          quiz: [
            {
              id: 'pe-6-q1',
              question: 'What is the most common PE exit route?',
              questionDe: 'Was ist der häufigste PE-Exit-Weg?',
              type: 'multiple_choice',
              options: [
                { text: 'IPO', textDe: 'IPO' },
                { text: 'Trade sale to a strategic buyer', textDe: 'Trade Sale an strategischen Käufer' },
                { text: 'Liquidation', textDe: 'Liquidation' },
                { text: 'Management buyout', textDe: 'Management Buyout' },
              ],
              correctAnswer: 1,
              explanation: 'Trade sales account for 50-60% of PE exits. Strategic buyers often pay the highest prices due to synergies.',
              explanationDe: 'Trade Sales machen 50-60% aller PE-Exits aus. Strategische Käufer zahlen oft die höchsten Preise wegen Synergien.',
              difficulty: 'advanced',
              xpReward: 15,
            },
          ]
        },
      ]
    },
  ]
};
