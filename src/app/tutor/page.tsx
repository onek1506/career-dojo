'use client';

import AppShell from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS_DE = [
  { icon: '📊', text: 'Erkläre mir die GuV' },
  { icon: '🔗', text: 'Wie hängen die 3 Statements zusammen?' },
  { icon: '💰', text: 'Was ist Enterprise Value vs. Equity Value?' },
  { icon: '📈', text: 'Erkläre DCF in einfachen Worten' },
  { icon: '🏦', text: 'Was ist ein LBO?' },
  { icon: '🤝', text: 'Warum machen Firmen M&A?' },
  { icon: '🧮', text: 'Wie berechne ich WACC?' },
  { icon: '🎯', text: 'Übe "Tell me about yourself" mit mir' },
];

const QUICK_PROMPTS_EN = [
  { icon: '📊', text: 'Explain the Income Statement' },
  { icon: '🔗', text: 'How do the 3 statements link?' },
  { icon: '💰', text: 'What is EV vs. Equity Value?' },
  { icon: '📈', text: 'Explain DCF in simple terms' },
  { icon: '🏦', text: 'What is an LBO?' },
  { icon: '🤝', text: 'Why do companies do M&A?' },
  { icon: '🧮', text: 'How do I calculate WACC?' },
  { icon: '🎯', text: 'Practice "Tell me about yourself"' },
];

// Local AI-like responses (no API needed for MVP)
function generateResponse(question: string, lang: 'de' | 'en'): string {
  const q = question.toLowerCase();

  if (q.includes('guv') || q.includes('income statement') || q.includes('gewinn')) {
    return lang === 'de'
      ? `**Die Gewinn- und Verlustrechnung (GuV)**

Die GuV zeigt Umsätze, Aufwendungen und den Gewinn über einen Zeitraum (Quartal/Jahr). Denk daran wie an einen Film.

**Aufbau (von oben nach unten):**
1. **Umsatzerlöse (Revenue)**
2. **- Herstellungskosten (COGS)**
3. **= Bruttoergebnis (Gross Profit)**
4. **- Vertriebs-/Verwaltungskosten (SG&A)**
5. **= EBITDA**
6. **- Abschreibungen (D&A)**
7. **= EBIT (Betriebsergebnis)**
8. **- Zinsaufwand**
9. **= EBT (Ergebnis vor Steuern)**
10. **- Steuern**
11. **= Jahresüberschuss (Net Income)**

**Interview-Tipp:** Geh die GuV IMMER von oben nach unten durch. Strukturierte Antworten beeindrucken Interviewer!

Soll ich dir die wichtigsten Margen (Gross Margin, EBITDA Margin) erklären?`
      : `**The Income Statement (P&L)**

The IS shows revenues, expenses, and profit over a period (quarter/year). Think of it as a movie.

**Structure (top to bottom):**
1. Revenue → 2. - COGS → 3. = Gross Profit → 4. - SG&A → 5. = EBITDA → 6. - D&A → 7. = EBIT → 8. - Interest → 9. = EBT → 10. - Taxes → 11. = Net Income

**Key Margins:** Gross Margin, EBITDA Margin, Operating Margin, Net Margin

Want me to explain any specific line item?`;
  }

  if (q.includes('3 statements') || q.includes('drei') || q.includes('zusammen') || q.includes('link')) {
    return lang === 'de'
      ? `**Wie die 3 Finanzberichte zusammenhängen:**

Das ist DIE #1 Interview-Frage im Investment Banking!

**Der Kreislauf:**
1. **Jahresüberschuss** aus der GuV fließt an den Anfang der **Kapitalflussrechnung (KFR)**
2. In der KFR: Nicht-zahlungswirksame Posten (z.B. Abschreibungen) werden addiert
3. Am Ende der KFR: **Nettoveränderung des Cashbestands**
4. Diese Veränderung aktualisiert die **Cash-Position auf der Bilanz** (Aktivseite)
5. Der Jahresüberschuss fließt auch in die **Gewinnrücklagen** (Eigenkapital, Passivseite)

**Klassische Folgefrage: "Was passiert, wenn Abschreibungen um 10€ steigen?"**
- GuV: EBIT -10€, bei 40% Steuersatz → Jahresüberschuss -6€
- KFR: -6€ + 10€ (AfA zurückaddiert) = Cash +4€
- Bilanz: Cash +4€, Sachanlagen -10€, Gewinnrücklagen -6€ → Ausgeglichen!

Soll ich dir die Rechnung Schritt für Schritt durchgehen?`
      : `**How the 3 Financial Statements Link:**

This is THE #1 IB interview question!

1. **Net Income** from IS flows to the **top of the CFS**
2. Non-cash items (D&A) are added back
3. End of CFS gives **net change in cash**
4. This updates **Cash on the Balance Sheet** (Assets)
5. Net Income also flows to **Retained Earnings** (Equity)

**Classic follow-up: "$10 increase in Depreciation?"**
- IS: EBIT -$10, at 40% tax → Net Income -$6
- CFS: -$6 + $10 (D&A added back) = Cash +$4
- BS: Cash +$4, PP&E -$10, RE -$6 → Balanced!

Want me to walk through another scenario?`;
  }

  if (q.includes('enterprise value') || q.includes('equity value') || q.includes('ev ')) {
    return lang === 'de'
      ? `**Enterprise Value vs. Equity Value**

**Haus-Analogie:**
- Hauspreis = 500.000€ (Enterprise Value)
- Hypothek = 300.000€ (Debt)
- Dein Eigenkapital = 200.000€ (Equity Value)

**Formel:**
\`EV = Market Cap + Debt - Cash + Minority Interest + Preferred Stock\`

**Warum ist das wichtig?**
Du musst Zähler und Nenner richtig matchen:
- **EV-Multiplikatoren** → Kennzahlen VOR Zinsen: EV/EBITDA, EV/EBIT, EV/Revenue
- **Equity-Multiplikatoren** → Kennzahlen NACH Zinsen: KGV (P/E), KBV (P/B)

**Interview-Falle:** "Warum kann man nicht EV/Jahresüberschuss verwenden?"
→ Weil der Jahresüberschuss NACH Zinsen ist (Equity-Level), EV aber ALLE Investoren repräsentiert!`
      : `**Enterprise Value vs. Equity Value**

**House Analogy:** House Price (EV) = Your Equity + Mortgage (Debt)

**Formula:** EV = Market Cap + Debt - Cash + MI + Preferred

**Matching Rule:**
- EV multiples → pre-interest: EV/EBITDA, EV/Revenue
- Equity multiples → post-interest: P/E, P/B

**Trap question:** "Why not EV/Net Income?" → Net Income is after interest (equity-level), EV is for ALL investors.`;
  }

  if (q.includes('dcf') || q.includes('discounted')) {
    return lang === 'de'
      ? `**DCF-Bewertung einfach erklärt:**

Ein Euro heute ist mehr wert als ein Euro morgen. Der DCF berechnet, was zukünftige Cashflows HEUTE wert sind.

**5 Schritte:**
1. **Freie Cashflows prognostizieren** (5-10 Jahre)
2. **WACC berechnen** (Diskontierungssatz)
3. **FCFs auf heute diskontieren** → PV = FCF / (1+WACC)^t
4. **Terminal Value berechnen** → TV = FCF × (1+g) / (WACC-g)
5. **Alles zusammen** → EV = Summe diskontierter FCFs + diskontierter TV

**Formel:** UFCF = EBIT × (1-t) + D&A - CapEx - ΔWC

**Wichtig im Interview:** Du musst keinen DCF durchrechnen — nur die Schritte erklären können!`
      : `**DCF in Simple Terms:**

A dollar today > a dollar tomorrow. DCF calculates what future cash flows are worth TODAY.

**5 Steps:** 1. Project FCFs → 2. Calculate WACC → 3. Discount FCFs → 4. Terminal Value → 5. Sum up = EV

**Formula:** UFCF = EBIT × (1-t) + D&A - CapEx - ΔWC

In interviews: explain the concept, don't calculate!`;
  }

  if (q.includes('lbo') || q.includes('leveraged')) {
    return lang === 'de'
      ? `**LBO (Leveraged Buyout) einfach erklärt:**

Wie ein Hauskauf mit Hypothek:
- 30% Eigenkapital (Equity)
- 70% Fremdkapital (Debt)
- Mieteinnahmen (Cashflow) tilgen die Hypothek
- Nach 5 Jahren teurer verkaufen

**3 Werttreiber:**
1. **EBITDA-Wachstum** → Umsatz und Margen steigern
2. **Multiple-Expansion** → Bei 6x kaufen, bei 8x verkaufen
3. **Schuldentilgung** → Cash-Flow reduziert Schulden

**Gutes LBO-Ziel:** Stabile Cashflows, starke Marktposition, niedrige CapEx, Verbesserungspotenzial

**IRR-Ziel:** 20-25%+, MOIC 2-3x+`
      : `**LBO in Simple Terms:**

Like buying a house with a mortgage: 30% equity, 70% debt. Rent (cash flow) pays the mortgage. Sell for more in 5 years.

**3 Value Drivers:** EBITDA Growth + Multiple Expansion + Debt Paydown

**Good LBO target:** Stable cash flows, strong market position, low CapEx, improvement potential

**Target returns:** 20-25%+ IRR, 2-3x+ MOIC`;
  }

  if (q.includes('m&a') || q.includes('merger') || q.includes('übernahme') || q.includes('akquisition')) {
    return lang === 'de'
      ? `**Warum Unternehmen M&A machen:**

1. **Wachstum** → Neue Märkte, neue Kunden
2. **Synergien** → Kosteneinsparungen + Umsatzsynergien
3. **Technologie** → Kaufen was man nicht schnell genug selbst bauen kann
4. **Konsolidierung** → Wettbewerb reduzieren
5. **Diversifikation** → Risiko streuen

**Synergien:**
- **Kostensynergien** (zuverlässiger): Personalabbau, Standortkonsolidierung → 3-7% der Kostenbasis
- **Umsatzsynergien** (schwerer): Cross-Selling → oft 50%+ diskontiert

**Accretive vs. Dilutive:**
- Accretive = EPS steigt → gut für Käufer
- Dilutive = EPS sinkt → schlecht für Käufer`
      : `**Why Companies Do M&A:**

1. Growth 2. Synergies 3. Technology 4. Consolidation 5. Diversification

**Synergies:** Cost (reliable, 3-7%) vs. Revenue (harder, often discounted 50%+)

**Key concept:** Accretive (EPS up = good) vs. Dilutive (EPS down = bad)`;
  }

  if (q.includes('wacc') || q.includes('kapitalkosten')) {
    return lang === 'de'
      ? `**WACC (Weighted Average Cost of Capital)**

Gewichtete durchschnittliche Kapitalkosten — der Diskontierungssatz im DCF.

**Formel:**
\`WACC = (EK/GK) × r_EK + (FK/GK) × r_FK × (1-t)\`

**Eigenkapitalkosten (CAPM):**
\`Re = Rf + β × (Rm - Rf)\`
- Rf = Risikoloser Zins (~2-3% in DE)
- β = Volatilität vs. Markt
- (Rm-Rf) = Eigenkapitalrisikoprämie (~5-7%)

**Warum FK günstiger als EK?**
1. Zinsen sind steuerlich absetzbar (Tax Shield)
2. FK-Geber haben Vorrang bei Insolvenz → akzeptieren niedrigere Rendite

**Interview-Frage: "Was passiert mit WACC bei mehr FK?"**
→ Zunächst sinkt WACC (FK günstiger), ab einem Punkt steigt er (höheres Ausfallrisiko)`
      : `**WACC (Weighted Average Cost of Capital)**

Formula: WACC = (E/V) × Re + (D/V) × Rd × (1-t)

Cost of Equity (CAPM): Re = Rf + β × ERP

Why debt is cheaper: tax shield + priority in bankruptcy.`;
  }

  if (q.includes('tell me about') || q.includes('erzähl') || q.includes('über sich') || q.includes('yourself')) {
    return lang === 'de'
      ? `**"Erzählen Sie über sich" — Das perfekte Framework:**

**Gegenwart (30 Sek.):**
"Ich studiere aktuell [Fach] an der [Uni] im [X.] Semester und engagiere mich in [relevante Aktivität]."

**Vergangenheit (60 Sek.):**
"Zuvor habe ich ein Praktikum bei [Firma] gemacht, wo ich [konkreter Erfolg]. Davor [andere Erfahrung], was mir [Skill] beigebracht hat."

**Zukunft (30 Sek.):**
"Deshalb begeistere ich mich für [spezifischer IB-Aspekt], und [Bankname] ist meine erste Wahl weil [spezifischer Grund]."

**Tipps:**
- Maximal 2 Minuten!
- Roter Faden: jede Station führt logisch zur nächsten
- Nicht mit der Kindheit anfangen
- Spezifisches Ende: nicht "Ich will in Finance" sondern "Ich will M&A-Beratung für den Mittelstand"

Soll ich dir bei deinem persönlichen Pitch helfen?`
      : `**"Tell Me About Yourself" Framework:**

Present (30s) → Past (60s) → Future (30s)

Keep it under 2 minutes. Red thread connecting every experience. End with why THIS firm.

Want me to help craft your personal pitch?`;
  }

  // Default response
  return lang === 'de'
    ? `Gute Frage! Das ist ein wichtiges Thema für IB-Interviews.

Ich kann dir bei folgenden Themen helfen:
- **Accounting:** GuV, Bilanz, Kapitalflussrechnung, 3-Statement-Linkage
- **Valuation:** Enterprise Value, DCF, Trading Comps, Multiplikatoren
- **M&A:** Deal-Typen, Synergien, Accretion/Dilution
- **LBO:** Leveraged Buyout, Werttreiber, IRR
- **Behavioral:** "Tell me about yourself", "Why IB?", "Why this bank?"
- **Technicals:** WACC, CAPM, Beta, Working Capital

Stell mir eine konkrete Frage und ich erkläre es dir Schritt für Schritt!`
    : `Great question! I can help with: Accounting, Valuation, M&A, LBO, Behavioral questions, and Advanced Technicals. Ask me anything specific!`;
}

export default function TutorPage() {
  const { progress, t } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDE = progress.language === 'de';

  const quickPrompts = isDE ? QUICK_PROMPTS_DE : QUICK_PROMPTS_EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(text, progress.language);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  return (
    <AppShell>
      <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 144px)' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-info)] flex items-center justify-center mx-auto mb-2">
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="text-lg font-black">{t('AI Finance Tutor', 'AI Finance Tutor')}</h1>
          <p className="text-xs text-[var(--duo-text-muted)]">
            {t('Ask me anything about IB interviews', 'Frag mich alles über IB-Interviews')}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-xs text-[var(--duo-text-muted)] text-center mb-2">
                {t('Try one of these:', 'Probiere eine davon:')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(p.text)}
                    className="duo-card p-3 text-left text-xs hover:border-[var(--accent-info)] transition flex items-center gap-2"
                  >
                    <span>{p.icon}</span>
                    <span className="line-clamp-2">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-purple)] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={14} className="text-white" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[var(--accent-info)] text-white rounded-br-sm'
                  : 'bg-[var(--duo-card)] border border-[var(--duo-border)] rounded-bl-sm'
              }`}>
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-xp)] flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-purple)] flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-[var(--duo-card)] border border-[var(--duo-border)] rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--duo-text-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--duo-text-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--duo-text-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="sticky bottom-20 bg-[var(--duo-bg)] pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder={t('Ask a finance question...', 'Stelle eine Finance-Frage...')}
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--duo-card)] border-2 border-[var(--duo-border)] text-[var(--text-primary)] placeholder-[var(--duo-text-muted)] focus:border-[var(--accent-info)] focus:outline-none transition text-sm"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="px-4 py-3 rounded-xl bg-[var(--accent-info)] text-white disabled:opacity-40 btn-press transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
