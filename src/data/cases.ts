// ============================================================
// PrepLounge-style Case Studies
// ============================================================

export interface CaseStep {
  id: string;
  title: string;
  titleDe: string;
  prompt: string;
  promptDe: string;
  hints: { en: string; de: string }[];
  sampleAnswer: string;
  sampleAnswerDe: string;
  type: 'structure' | 'analysis' | 'math' | 'recommendation';
}

export interface CaseStudy {
  id: string;
  title: string;
  titleDe: string;
  industry: string;
  industryDe: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'profitability' | 'market_entry' | 'ma' | 'growth' | 'pricing' | 'restructuring';
  typeDe: string;
  estimatedMinutes: number;
  xpReward: number;
  clientLogo: string;
  briefing: string;
  briefingDe: string;
  steps: CaseStep[];
  keyTakeaways: { en: string; de: string }[];
}

export const CASES: CaseStudy[] = [
  // ===== CASE 1: Profitability (Beginner) =====
  {
    id: 'case-bakery-profit',
    title: 'Schmidt\'s Bakery Chain',
    titleDe: 'Schmidt\'s Bäckereikette',
    industry: 'Retail / F&B',
    industryDe: 'Einzelhandel / Gastronomie',
    difficulty: 'beginner',
    type: 'profitability',
    typeDe: 'Profitabilität',
    estimatedMinutes: 15,
    xpReward: 50,
    clientLogo: '🥐',
    briefing: 'Your client is Schmidt\'s Bakery, a chain of 50 bakeries in Bavaria. Revenue has grown 15% over the past year, but profits have declined by 20%. The CEO has hired your consulting firm to figure out why profits are falling despite growing revenue.',
    briefingDe: 'Dein Klient ist Schmidt\'s Bäckerei, eine Kette mit 50 Bäckereien in Bayern. Der Umsatz ist im letzten Jahr um 15% gewachsen, aber der Gewinn ist um 20% gesunken. Der CEO hat dein Beratungsunternehmen beauftragt herauszufinden, warum die Gewinne trotz steigendem Umsatz fallen.',
    steps: [
      {
        id: 'bakery-s1',
        title: 'Structure the Problem',
        titleDe: 'Problem strukturieren',
        prompt: 'How would you structure your approach to analyze why profits are declining despite revenue growth?',
        promptDe: 'Wie würdest du deinen Ansatz strukturieren, um zu analysieren warum die Gewinne trotz Umsatzwachstum sinken?',
        type: 'structure',
        hints: [
          { en: 'Think about the profit formula: Profit = Revenue - Costs', de: 'Denk an die Gewinnformel: Gewinn = Umsatz - Kosten' },
          { en: 'Break down both revenue and costs into components', de: 'Zerlege sowohl Umsatz als auch Kosten in Komponenten' },
          { en: 'Consider: What could make costs grow faster than revenue?', de: 'Überlege: Was könnte Kosten schneller wachsen lassen als den Umsatz?' },
        ],
        sampleAnswer: '**Framework: Profitability Tree**\n\nProfit = Revenue - Costs\n\n**Revenue Side:**\n- Number of stores × Revenue per store\n- Revenue per store = Customers × Average ticket size\n- Product mix changes?\n- Pricing changes?\n\n**Cost Side:**\n- Fixed Costs: Rent, salaries, equipment\n- Variable Costs: Ingredients, packaging, energy\n- Have any cost categories grown disproportionately?\n\n**Key Questions to ask:**\n1. Which stores are profitable vs. unprofitable?\n2. Have ingredient prices changed?\n3. Did they open new stores (higher costs before revenue ramp-up)?\n4. Has the product mix shifted toward lower-margin products?',
        sampleAnswerDe: '**Framework: Profitabilitätsbaum**\n\nGewinn = Umsatz - Kosten\n\n**Umsatzseite:**\n- Anzahl Filialen × Umsatz pro Filiale\n- Umsatz pro Filiale = Kunden × Durchschnittlicher Bon\n- Produktmix-Veränderungen?\n- Preisänderungen?\n\n**Kostenseite:**\n- Fixkosten: Miete, Gehälter, Ausstattung\n- Variable Kosten: Zutaten, Verpackung, Energie\n- Sind Kostenkategorien überproportional gewachsen?\n\n**Wichtige Fragen:**\n1. Welche Filialen sind profitabel vs. unprofitabel?\n2. Haben sich Zutatenpreise verändert?\n3. Wurden neue Filialen eröffnet (höhere Kosten vor Umsatz-Ramp-up)?\n4. Hat sich der Produktmix hin zu margenschwächeren Produkten verschoben?',
      },
      {
        id: 'bakery-s2',
        title: 'Analyze the Data',
        titleDe: 'Daten analysieren',
        prompt: 'The client shares data: 8 new stores opened last year (each costs €200K/year in rent + €150K in staff). Ingredient costs rose 25% due to wheat and butter prices. Revenue per existing store is flat. New stores are at 60% of target revenue. What\'s the main driver?',
        promptDe: 'Der Klient teilt Daten: 8 neue Filialen eröffnet (jeweils 200.000€/Jahr Miete + 150.000€ Personal). Zutatenkosten stiegen um 25% wegen Weizen- und Butterpreisen. Umsatz pro bestehender Filiale ist stabil. Neue Filialen sind bei 60% des Zielumsatzes. Was ist der Haupttreiber?',
        type: 'math',
        hints: [
          { en: 'Calculate the cost of new stores that aren\'t yet at target revenue', de: 'Berechne die Kosten der neuen Filialen, die noch nicht den Zielumsatz erreichen' },
          { en: 'Calculate the impact of 25% ingredient cost increase across all stores', de: 'Berechne den Effekt der 25% Zutatenkostensteigerung über alle Filialen' },
        ],
        sampleAnswer: '**Two main drivers identified:**\n\n**1. New Store Ramp-up Drag:**\n- 8 new stores × (€200K rent + €150K staff) = €2.8M in new costs\n- At only 60% of target revenue → significant cash burn\n- Estimated drag: ~€1.5-2M in losses from new stores\n\n**2. Ingredient Cost Inflation:**\n- 25% increase in ingredients across 50 stores\n- If ingredients are ~30% of revenue → that\'s a ~7.5% margin hit\n- On estimated total revenue of ~€25M → ~€1.9M impact\n\n**Combined:** These two factors explain ~€3.5-4M in profit decline, which aligns with the 20% profit drop.',
        sampleAnswerDe: '**Zwei Haupttreiber identifiziert:**\n\n**1. Anlaufkosten neuer Filialen:**\n- 8 neue Filialen × (200K€ Miete + 150K€ Personal) = 2,8 Mio. € neue Kosten\n- Bei nur 60% Zielumsatz → signifikanter Cash Burn\n- Geschätzter Verlust: ~1,5-2 Mio. € durch neue Filialen\n\n**2. Zutatenkostinflation:**\n- 25% Anstieg bei Zutaten über 50 Filialen\n- Wenn Zutaten ~30% des Umsatzes → ~7,5% Margen-Einbruch\n- Bei geschätzt ~25 Mio. € Gesamtumsatz → ~1,9 Mio. € Impact\n\n**Zusammen:** ~3,5-4 Mio. € Gewinnrückgang, was zum 20% Drop passt.',
      },
      {
        id: 'bakery-s3',
        title: 'Recommendation',
        titleDe: 'Empfehlung',
        prompt: 'What would you recommend to the CEO?',
        promptDe: 'Was würdest du dem CEO empfehlen?',
        type: 'recommendation',
        hints: [
          { en: 'Think short-term (quick wins) and long-term (strategic)', de: 'Denk kurzfristig (Quick Wins) und langfristig (strategisch)' },
          { en: 'Address both cost drivers separately', de: 'Gehe beide Kostentreiber separat an' },
        ],
        sampleAnswer: '**Recommendation (Top 3 priorities):**\n\n**1. Short-term: Selective price increase (3-5%)**\n- Customers accept small increases given inflation\n- Focus on premium products with higher willingness to pay\n\n**2. Medium-term: Accelerate new store ramp-up**\n- Local marketing campaigns for new locations\n- Loyalty programs to build customer base faster\n- Target: reach 85%+ of target revenue within 6 months\n\n**3. Long-term: Renegotiate supplier contracts**\n- Lock in ingredient prices with futures/contracts\n- Explore alternative suppliers\n- Consider backward integration (own wheat sourcing)\n\n**Next Steps:** Detailed store-by-store analysis, supplier negotiation timeline, pricing elasticity study.',
        sampleAnswerDe: '**Empfehlung (Top 3 Prioritäten):**\n\n**1. Kurzfristig: Gezielte Preiserhöhung (3-5%)**\n- Kunden akzeptieren kleine Erhöhungen bei Inflation\n- Fokus auf Premium-Produkte mit höherer Zahlungsbereitschaft\n\n**2. Mittelfristig: Neue Filialen schneller zum Ziel bringen**\n- Lokale Marketingkampagnen für neue Standorte\n- Treueprogramme zum schnelleren Kundenaufbau\n- Ziel: 85%+ Zielumsatz innerhalb 6 Monaten\n\n**3. Langfristig: Lieferantenverträge neu verhandeln**\n- Zutatenpreise mit Futures/Verträgen absichern\n- Alternative Lieferanten prüfen\n- Rückwärtsintegration erwägen (eigene Weizenbeschaffung)\n\n**Nächste Schritte:** Filial-für-Filial-Analyse, Verhandlungszeitplan Lieferanten, Preiselastizitätsstudie.',
      },
    ],
    keyTakeaways: [
      { en: 'Revenue growth doesn\'t guarantee profit growth — always check margins', de: 'Umsatzwachstum garantiert nicht Gewinnwachstum — immer Margen prüfen' },
      { en: 'New store expansion can be a profit drag before ramp-up', de: 'Filialeröffnungen können den Gewinn vor dem Ramp-up belasten' },
      { en: 'External cost factors (inflation) can silently erode margins', de: 'Externe Kostenfaktoren (Inflation) können Margen still erodieren' },
    ],
  },

  // ===== CASE 2: Market Entry (Intermediate) =====
  {
    id: 'case-ev-germany',
    title: 'ElectroDrive Market Entry',
    titleDe: 'ElectroDrive Markteintritt',
    industry: 'Automotive / EV',
    industryDe: 'Automobil / E-Mobilität',
    difficulty: 'intermediate',
    type: 'market_entry',
    typeDe: 'Markteintritt',
    estimatedMinutes: 20,
    xpReward: 75,
    clientLogo: '⚡',
    briefing: 'ElectroDrive is a Chinese EV manufacturer looking to enter the German market. They produce affordable EVs (€25-35K range) and want to sell 50,000 units in Germany within 3 years. They\'ve asked your firm whether this is feasible and how to approach it.',
    briefingDe: 'ElectroDrive ist ein chinesischer EV-Hersteller, der in den deutschen Markt eintreten möchte. Sie produzieren bezahlbare E-Autos (25-35K€) und wollen innerhalb von 3 Jahren 50.000 Einheiten in Deutschland verkaufen. Sie haben deine Firma gefragt, ob das machbar ist und wie.',
    steps: [
      {
        id: 'ev-s1',
        title: 'Structure the Market Entry',
        titleDe: 'Markteintritt strukturieren',
        prompt: 'How would you structure your analysis of whether ElectroDrive should enter the German EV market?',
        promptDe: 'Wie würdest du deine Analyse strukturieren, ob ElectroDrive in den deutschen EV-Markt eintreten sollte?',
        type: 'structure',
        hints: [
          { en: 'Think: Market, Competition, Capabilities, Economics', de: 'Denk: Markt, Wettbewerb, Fähigkeiten, Wirtschaftlichkeit' },
          { en: 'Consider regulatory and cultural factors for Germany specifically', de: 'Berücksichtige regulatorische und kulturelle Faktoren speziell für Deutschland' },
        ],
        sampleAnswer: '**Market Entry Framework:**\n\n**1. Market Attractiveness**\n- Market size & growth rate\n- Customer segments & needs\n- Regulatory environment (EU emissions, subsidies)\n\n**2. Competitive Landscape**\n- Incumbents: VW ID.3/4, Tesla Model 3, BMW iX\n- Other Chinese entrants: BYD, NIO, XPeng\n- Price positioning vs. competition\n\n**3. Company Capabilities**\n- Product quality & range vs. European standards\n- Brand awareness & trust (critical in Germany!)\n- Distribution & service network\n- Homologation & EU safety standards\n\n**4. Economics**\n- Unit economics: production cost + logistics + margin\n- Required investment for market entry\n- Break-even timeline\n\n**5. Risks**\n- Geopolitical risks (EU-China trade tensions)\n- Brand perception ("Chinese quality")\n- Tariffs & potential EU EV tariffs',
        sampleAnswerDe: '**Markteintritt-Framework:**\n\n**1. Marktattraktivität:** Größe, Wachstum, Kundensegmente, Regulierung\n**2. Wettbewerb:** VW, Tesla, BMW, andere Chinesen (BYD, NIO)\n**3. Eigene Fähigkeiten:** Produktqualität, Marke, Vertrieb, EU-Zulassung\n**4. Wirtschaftlichkeit:** Stückkosten, Investment, Break-even\n**5. Risiken:** Geopolitik, Markenwahrnehmung, EU-Zölle',
      },
      {
        id: 'ev-s2',
        title: 'Market Sizing',
        titleDe: 'Marktgröße schätzen',
        prompt: 'Estimate the addressable market for affordable EVs (€25-35K) in Germany. Is 50,000 units in 3 years realistic?',
        promptDe: 'Schätze den adressierbaren Markt für bezahlbare E-Autos (25-35K€) in Deutschland. Sind 50.000 Einheiten in 3 Jahren realistisch?',
        type: 'math',
        hints: [
          { en: 'Germany has ~3M new car registrations per year', de: 'Deutschland hat ~3 Mio. Neuzulassungen pro Jahr' },
          { en: 'EV share is growing rapidly — think about the trend', de: 'EV-Anteil wächst schnell — denk an den Trend' },
        ],
        sampleAnswer: '**Market Sizing:**\n\n- German new car market: ~3M units/year\n- EV share (2024): ~18% → ~540K EVs/year\n- Growing to ~25-30% by 2027 → ~750-900K EVs/year\n- Affordable segment (€25-35K): ~40% of EV market → ~300-360K units/year\n\n**50K units = ~14-17% market share in the affordable EV segment.**\n\nFor a new, unknown Chinese brand → very ambitious. BYD (much more established) sold ~16K in Germany in 2024.\n\n**Verdict:** 50K in 3 years is aggressive but potentially achievable with the right strategy (strong partnerships, competitive pricing, marketing).',
        sampleAnswerDe: '**Marktgröße:**\n\n- Deutsche Neuzulassungen: ~3 Mio./Jahr\n- EV-Anteil: ~18% → ~540K EVs/Jahr\n- Bis 2027: ~25-30% → ~750-900K EVs/Jahr\n- Bezahlbar-Segment (25-35K€): ~40% → ~300-360K Einheiten/Jahr\n\n**50K = ~14-17% Marktanteil im bezahlbaren EV-Segment.** Ambitioniert aber potenziell machbar.',
      },
      {
        id: 'ev-s3',
        title: 'Go-to-Market Strategy',
        titleDe: 'Go-to-Market Strategie',
        prompt: 'Recommend a go-to-market strategy for ElectroDrive in Germany.',
        promptDe: 'Empfehle eine Go-to-Market-Strategie für ElectroDrive in Deutschland.',
        type: 'recommendation',
        hints: [
          { en: 'Think about: distribution, brand building, partnerships', de: 'Denk an: Vertrieb, Markenaufbau, Partnerschaften' },
        ],
        sampleAnswer: '**Recommended GTM Strategy:**\n\n**Phase 1 (Year 1): Build Trust**\n- Partner with established German dealer groups (avoid direct-to-consumer initially)\n- Heavy investment in German crash test ratings (ADAC, Euro NCAP)\n- PR campaign: "German-engineered quality meets Chinese innovation"\n- Target: 5,000 units\n\n**Phase 2 (Year 2): Scale**\n- Open flagship experience centers in Berlin, Munich, Hamburg\n- Launch subscription/leasing model (reduces purchase risk)\n- Fleet sales to companies (B2B)\n- Target: 15,000 units\n\n**Phase 3 (Year 3): Full Market Presence**\n- Expand to 200+ touchpoints\n- Launch second model (SUV segment)\n- Target: 30,000 units\n\n**Revised target: 50K cumulative over 3 years, not 50K/year.**',
        sampleAnswerDe: '**Empfohlene GTM-Strategie:**\n\n**Phase 1:** Vertrauen aufbauen — Partnerschaften mit Händlern, ADAC-Tests\n**Phase 2:** Skalieren — Flagship-Stores, Leasing-Modell, Flottenverkäufe\n**Phase 3:** Volle Marktpräsenz — 200+ Touchpoints, zweites Modell\n\n**Revidiertes Ziel: 50K kumuliert über 3 Jahre.**',
      },
    ],
    keyTakeaways: [
      { en: 'Market entry requires analyzing market, competition, capabilities, and economics', de: 'Markteintritt erfordert Analyse von Markt, Wettbewerb, Fähigkeiten und Wirtschaftlichkeit' },
      { en: 'Brand trust is critical in Germany — especially for Chinese brands', de: 'Markenvertrauen ist in Deutschland entscheidend — besonders für chinesische Marken' },
      { en: 'Always sanity-check targets with market sizing', de: 'Ziele immer mit Marktgröße gegenprüfen' },
    ],
  },

  // ===== CASE 3: M&A Case (Advanced) =====
  {
    id: 'case-pharma-ma',
    title: 'MediTech Acquisition',
    titleDe: 'MediTech Übernahme',
    industry: 'Pharma / Healthcare',
    industryDe: 'Pharma / Gesundheit',
    difficulty: 'advanced',
    type: 'ma',
    typeDe: 'M&A',
    estimatedMinutes: 25,
    xpReward: 100,
    clientLogo: '💊',
    briefing: 'Your client is HealthCorp, a €5B revenue pharmaceutical company. They are considering acquiring MediTech, a €800M revenue biotech startup with a promising cancer drug in Phase 3 trials. MediTech is asking for €3.5B. Should HealthCorp do the deal?',
    briefingDe: 'Dein Klient ist HealthCorp, ein Pharma-Unternehmen mit 5 Mrd. € Umsatz. Sie erwägen den Kauf von MediTech, einem 800 Mio. € Biotech-Startup mit einem vielversprechenden Krebsmedikament in Phase-3-Studien. MediTech verlangt 3,5 Mrd. €. Soll HealthCorp den Deal machen?',
    steps: [
      {
        id: 'pharma-s1',
        title: 'M&A Framework',
        titleDe: 'M&A-Framework',
        prompt: 'How would you evaluate whether HealthCorp should acquire MediTech for €3.5B?',
        promptDe: 'Wie würdest du bewerten, ob HealthCorp MediTech für 3,5 Mrd. € kaufen sollte?',
        type: 'structure',
        hints: [
          { en: 'Think: Strategic Fit, Valuation, Synergies, Risks, Financing', de: 'Denk: Strategischer Fit, Bewertung, Synergien, Risiken, Finanzierung' },
        ],
        sampleAnswer: '**M&A Evaluation Framework:**\n\n**1. Strategic Rationale**\n- Does MediTech\'s pipeline complement HealthCorp\'s portfolio?\n- Does it fill a therapeutic gap?\n- Is "build vs. buy" faster/cheaper?\n\n**2. Valuation — Is €3.5B fair?**\n- EV/Revenue: €3.5B / €0.8B = 4.4x (reasonable for biotech)\n- DCF of pipeline drug (risk-adjusted)\n- What did comparable biotech acquisitions trade at?\n\n**3. Synergies**\n- Revenue: Cross-sell through HealthCorp\'s distribution\n- Cost: Combine R&D, shared clinical trial infrastructure\n- Quantify: NPV of synergies\n\n**4. Risks**\n- Phase 3 failure risk (~40% fail!)\n- Integration risk\n- Regulatory/approval risk\n- Overpaying risk\n\n**5. Financing & Returns**\n- Cash vs. stock vs. debt\n- EPS accretion/dilution\n- IRR of the investment',
        sampleAnswerDe: '**M&A-Bewertungsframework:**\n\n**1. Strategischer Fit:** Pipeline-Komplementarität, Build vs. Buy\n**2. Bewertung:** EV/Revenue 4,4x, DCF der Pipeline, Comparable Deals\n**3. Synergien:** Umsatz (Vertrieb) + Kosten (F&E)\n**4. Risiken:** Phase-3-Scheitern (~40%), Integration, Regulierung\n**5. Finanzierung:** Cash/Aktien/Schulden, EPS-Effekt, IRR',
      },
      {
        id: 'pharma-s2',
        title: 'Valuation & Risk',
        titleDe: 'Bewertung & Risiko',
        prompt: 'The cancer drug has a 60% approval probability. If approved, expected peak sales are €2B/year with 80% gross margin. Patent expires in 12 years. WACC is 10%. Is €3.5B a fair price?',
        promptDe: 'Das Krebsmedikament hat eine 60% Zulassungswahrscheinlichkeit. Bei Zulassung: erwarteter Spitzenumsatz 2 Mrd. €/Jahr mit 80% Bruttomarge. Patent läuft in 12 Jahren aus. WACC ist 10%. Sind 3,5 Mrd. € ein fairer Preis?',
        type: 'math',
        hints: [
          { en: 'Risk-adjust the cash flows by the approval probability', de: 'Passe die Cashflows um die Zulassungswahrscheinlichkeit an' },
          { en: 'Simplified: Peak sales × margin × probability × annuity factor', de: 'Vereinfacht: Spitzenumsatz × Marge × Wahrscheinlichkeit × Annuitätenfaktor' },
        ],
        sampleAnswer: '**Simplified Risk-Adjusted Valuation:**\n\nPeak annual profit = €2B × 80% margin = €1.6B\nRisk-adjusted = €1.6B × 60% = €960M/year\n\nAssuming ramp-up to peak over 3 years, then 9 years at peak:\n- Simplified NPV (annuity): €960M × ~6.5 PV factor ≈ €6.2B\n- Discount for ramp-up and risk: ~30-40% discount → €3.7-4.3B\n\n**Plus existing €800M business (conservatively 2x = €1.6B)**\n\n**Total value range: €5.3-5.9B**\n\n**At €3.5B, the deal looks attractive** — you\'re buying at a discount to risk-adjusted value. However, if the drug fails (40% chance), you overpay significantly for just the base business.',
        sampleAnswerDe: '**Vereinfachte risikoadjustierte Bewertung:**\n\nJährlicher Spitzengewinn = 2 Mrd. × 80% = 1,6 Mrd. €\nRisikoadjustiert = 1,6 Mrd. × 60% = 960 Mio. €/Jahr\n\nNPV ≈ 6,2 Mrd. € → nach Abschlägen: 3,7-4,3 Mrd. €\nPlus Bestandsgeschäft: ~1,6 Mrd. €\n\n**Bei 3,5 Mrd. € sieht der Deal attraktiv aus** — aber 40% Risiko des Scheiterns.',
      },
      {
        id: 'pharma-s3',
        title: 'Final Recommendation',
        titleDe: 'Finale Empfehlung',
        prompt: 'Give your final recommendation to the HealthCorp board. Deal or no deal?',
        promptDe: 'Gib deine finale Empfehlung an den HealthCorp-Vorstand. Deal oder kein Deal?',
        type: 'recommendation',
        hints: [
          { en: 'Consider deal structure to mitigate risk', de: 'Überlege eine Deal-Struktur zur Risikominimierung' },
        ],
        sampleAnswer: '**Recommendation: PROCEED with deal — but restructure the terms.**\n\n**1. Offer structure:**\n- €2B upfront + €1.5B milestone payment (triggered by FDA approval)\n- This shifts Phase 3 risk back to MediTech shareholders\n- Total potential consideration: €3.5B (same headline number)\n\n**2. Financing:** 60% debt, 40% cash (take advantage of low-cost pharma debt)\n\n**3. Risk mitigation:**\n- Milestone-based payment structure\n- Negotiate break-up fee if Phase 3 fails\n- Retain key MediTech scientists with earnouts\n\n**4. Integration:** Keep MediTech as semi-independent unit initially to preserve R&D culture\n\n**Bottom line:** The strategic fit is strong, the valuation is reasonable, and the milestone structure protects downside. Recommend proceeding.',
        sampleAnswerDe: '**Empfehlung: DEAL MACHEN — aber Konditionen umstrukturieren.**\n\n2 Mrd. € upfront + 1,5 Mrd. € Milestone (bei FDA-Zulassung). Das verschiebt das Risiko. Finanzierung: 60% FK, 40% Cash. Integration: MediTech zunächst semi-unabhängig lassen.',
      },
    ],
    keyTakeaways: [
      { en: 'In pharma M&A, always risk-adjust pipeline values', de: 'Bei Pharma-M&A immer Pipeline-Werte risikoadjustieren' },
      { en: 'Milestone payments are a powerful tool to share risk', de: 'Milestone-Zahlungen sind ein starkes Tool zur Risikoaufteilung' },
      { en: 'Strategic fit matters as much as price', de: 'Strategischer Fit ist so wichtig wie der Preis' },
    ],
  },
];

export function getCaseById(id: string): CaseStudy | undefined {
  return CASES.find(c => c.id === id);
}
