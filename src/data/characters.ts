// ============================================================
// CareerDojo Characters — Mascots with BIG personality
// Kooky, self-aware, BWL humor, Denglisch, finance culture
// ============================================================

export interface Character {
  id: string;
  name: string;
  emoji: string;
  role: string;
  roleDe: string;
  personality: string;
  personalityDe: string;
  color: string;
  trackId?: string; // which track they belong to, or undefined = global
  quotes: { en: string; de: string }[];
  encouragements: { en: string; de: string }[];
  wrongAnswerReactions: { en: string; de: string }[];
  salaryWarning: { en: string; de: string }[];
}

export const CHARACTERS: Character[] = [
  // ===== GLOBAL MASCOT =====
  {
    id: 'carl',
    name: 'Carl der Cashflow',
    emoji: '🦊',
    role: 'Your Main Companion',
    roleDe: 'Dein Hauptbegleiter',
    personality: 'A clever fox in a tiny suit who loves spreadsheets more than sleep',
    personalityDe: 'Ein schlauer Fuchs im Mini-Anzug, der Spreadsheets mehr liebt als Schlaf',
    color: '#FF9600',
    quotes: [
      { en: '"Cash is king, but I\'m the prince."', de: '"Cash is King, aber ich bin der Prinz."' },
      { en: '"CTRL+S is my love language."', de: '"CTRL+S ist meine Love Language."' },
      { en: '"Porsche Cayman S, Jungs! ...in 8 years."', de: '"Porsche Cayman S, Jungs! ...in 8 Jahren."' },
    ],
    encouragements: [
      { en: '🔥 On fire! Your MD would be impressed!', de: '🔥 Du brennst! Dein MD wäre beeindruckt!' },
      { en: '📈 Streak machine! Analyst of the month!', de: '📈 Streak-Maschine! Analyst des Monats!' },
      { en: '💪 Another lesson down. Sleep is overrated anyway.', de: '💪 Noch eine Lektion geschafft. Schlaf ist eh überbewertet.' },
      { en: '⭐ Perfect score! You\'re getting promoted... in this app at least.', de: '⭐ Perfektes Ergebnis! Du wirst befördert... zumindest in dieser App.' },
      { en: '🦊 That was so good, I almost adjusted the EBITDA upward for you!', de: '🦊 Das war so gut, ich hätte fast das EBITDA für dich hochadjustiert!' },
      { en: '💰 Ka-ching! That\'s bonus-level thinking!', de: '💰 Ka-ching! Das ist Bonus-Level Denken!' },
      { en: '📊 Warren Buffett just sent you a LinkedIn request.', de: '📊 Warren Buffett hat dir gerade eine LinkedIn-Anfrage geschickt.' },
      { en: '🚀 Your career trajectory just went vertical!', de: '🚀 Deine Karriere-Trajectorie ist gerade vertikal gegangen!' },
      { en: '🎯 Nailed it! Even the VP nodded approvingly.', de: '🎯 Getroffen! Sogar der VP hat anerkennend genickt.' },
      { en: '💎 Clean answer. No adjustments needed. Unlike most EBITDA.', de: '💎 Saubere Antwort. Keine Adjustierungen nötig. Anders als die meisten EBITDAs.' },
    ],
    wrongAnswerReactions: [
      { en: '😅 Even Goldman analysts make mistakes... rarely.', de: '😅 Selbst Goldman-Analysten machen Fehler... selten.' },
      { en: '📚 Back to the books! Your MD is watching.', de: '📚 Zurück ans Buch! Dein MD schaut zu.' },
      { en: '🤔 Hmm, not quite. Let me explain it differently...', de: '🤔 Hmm, nicht ganz. Lass mich es anders erklären...' },
      { en: '🦊 Oof. That answer wouldn\'t survive a model review.', de: '🦊 Autsch. Diese Antwort würde keinen Model-Review überleben.' },
      { en: '📉 Your IRR just went negative. Quick, fix it!', de: '📉 Dein IRR ist gerade negativ geworden. Schnell, reparier das!' },
      { en: '😬 That\'s what we call a "career-limiting move" in finance.', de: '😬 Das nennt man in der Finanzwelt einen "karrierelimitierenden Zug".' },
      { en: '🤦 Even an adjusted EBITDA couldn\'t save that answer.', de: '🤦 Selbst ein adjustiertes EBITDA könnte diese Antwort nicht retten.' },
      { en: '💀 The MD just threw his pitch book. Duck!', de: '💀 Der MD hat gerade sein Pitch Book geworfen. Deckung!' },
      { en: '🧠 Your brain needs a recapitalization. Try again!', de: '🧠 Dein Gehirn braucht eine Rekapitalisierung. Nochmal!' },
      { en: '📱 *pretends to check Bloomberg Terminal nervously*', de: '📱 *checkt nervös das Bloomberg Terminal*' },
    ],
    salaryWarning: [
      { en: '"Opportunity cost is real. Very real right now."', de: '"Opportunitätskosten sind real. Gerade sehr real."' },
      { en: '"Bench time costs carry. Your future carry."', de: '"Bench-Zeit kostet Carry. Dein zukünftiger Carry."' },
      { en: '"The cash flow is off. YOUR cash flow."', de: '"Der Cashflow stimmt nicht. Dein Cashflow."' },
      { en: '"I just adjusted your salary. Downward. Sorry not sorry."', de: '"Ich hab gerade dein Gehalt adjustiert. Nach unten. Sorry not sorry."' },
      { en: '"Every day on the bench is one day less Porsche Cayman."', de: '"Jeder Tag auf der Bench ist ein Tag weniger Porsche Cayman."' },
    ],
  },

  // ===== IB TRACK =====
  {
    id: 'wolf',
    name: 'Wolfgang der Wolf',
    emoji: '🐺',
    role: 'Investment Banking Guide',
    roleDe: 'Investment Banking Guide',
    personality: 'A sharp wolf of Wall Street who knows every deal. Intense but fair.',
    personalityDe: 'Ein scharfsinniger Wolf der Wall Street, der jeden Deal kennt. Intensiv aber fair.',
    color: '#1CB0F6',
    trackId: 'ib',
    quotes: [
      { en: '"Sleep? I\'ll sleep when the deal closes."', de: '"Schlafen? Wenn der Deal geschlossen ist."' },
      { en: '"Revenue is vanity, cash flow is reality."', de: '"Umsatz ist Eitelkeit, Cashflow ist Realität."' },
      { en: '"Work-life balance? I have work-work balance."', de: '"Work-Life-Balance? Ich hab Work-Work-Balance."' },
    ],
    encouragements: [
      { en: '🐺 The pack is proud! You\'re closing deals in your sleep!', de: '🐺 Das Rudel ist stolz! Du closet Deals im Schlaf!' },
      { en: '💎 Diamond hands on that answer!', de: '💎 Diamond Hands bei der Antwort!' },
      { en: '📊 You walk through statements like a true banker!', de: '📊 Du gehst durch Statements wie ein echter Banker!' },
      { en: '🐺 AROOO! That\'s the wolf spirit! Pure alpha energy!', de: '🐺 AROOO! Das ist der Wolf-Spirit! Pure Alpha-Energie!' },
      { en: '💰 That answer just generated a 12x MOIC.', de: '💰 Diese Antwort hat gerade einen 12x MOIC generiert.' },
      { en: '📈 The deal team is impressed. You might get staffed!', de: '📈 Das Deal Team ist beeindruckt. Du könntest gestaffed werden!' },
      { en: '🎯 Precision like a Goldman pitch. Chef\'s kiss.', de: '🎯 Präzision wie ein Goldman-Pitch. Chef\'s kiss.' },
      { en: '🥂 That deserves a closing dinner. You\'re buying.', de: '🥂 Das verdient ein Closing Dinner. Du zahlst.' },
      { en: '🐺 You just got a "strong buy" rating from me.', de: '🐺 Du hast gerade ein "Strong Buy" Rating von mir bekommen.' },
      { en: '📋 Perfect. Now format it in Garamond 11 and send it to the MD by 2am.', de: '📋 Perfekt. Jetzt in Garamond 11 formatieren und um 2 Uhr nachts an den MD schicken.' },
    ],
    wrongAnswerReactions: [
      { en: '🐺 Wolves don\'t make that mistake twice. Try again.', de: '🐺 Wölfe machen den Fehler nicht zweimal. Nochmal.' },
      { en: '😤 The MD just threw a pitch book at you. Review the basics!', de: '😤 Der MD hat gerade ein Pitch Book nach dir geworfen. Grundlagen wiederholen!' },
      { en: '💀 That answer would get you unstaffed faster than you can say "DCF."', de: '💀 Diese Antwort würde dich schneller unstaffed machen als du "DCF" sagen kannst.' },
      { en: '🐺 *howls in disappointment* That was NOT accretive.', de: '🐺 *heult enttäuscht* Das war NICHT accretive.' },
      { en: '📉 You just diluted everyone\'s EPS with that answer.', de: '📉 Du hast gerade mit dieser Antwort aller EPS verwässert.' },
      { en: '😩 Even the intern would\'ve gotten that right. Come on!', de: '😩 Selbst der Praktikant hätte das gewusst. Komm schon!' },
      { en: '🐺 That\'s a "below expectations" in your annual review.', de: '🐺 Das ist ein "unter Erwartungen" in deiner Jahresbewertung.' },
      { en: '💸 You just lost the mandate. The client called Lazard instead.', de: '💸 Du hast gerade das Mandat verloren. Der Kunde hat Lazard angerufen.' },
      { en: '📱 *texts the staffer* "We need to talk about this analyst..."', de: '📱 *schreibt dem Staffer* "Wir müssen über diesen Analysten reden..."' },
      { en: '🐺 In this pack, we learn from our kills. Read the explanation!', de: '🐺 In diesem Rudel lernen wir aus unseren Kills. Lies die Erklärung!' },
    ],
    salaryWarning: [
      { en: '"Your MD is asking questions. Not good ones."', de: '"Dein MD fragt nach dir. Nicht gut."' },
      { en: '"The pitch deck won\'t build itself, champ."', de: '"Das Pitch Deck baut sich nicht von allein, Champ."' },
      { en: '"Two days no modeling. I\'m saying nothing."', de: '"Zwei Tage kein Modeling. Ich sage nichts."' },
      { en: '"Performance Review is coming. Excel is open."', de: '"Performance Review naht. Excel ist offen."' },
      { en: '"Lazard just called your client. Just FYI."', de: '"Lazard hat gerade deinen Kunden angerufen. Nur so zur Info."' },
    ],
  },

  // ===== PE TRACK =====
  {
    id: 'locust',
    name: 'Lenny die Heuschrecke',
    emoji: '🦗',
    role: 'Private Equity Guide',
    roleDe: 'Private Equity Guide',
    personality: 'A notorious "Heuschrecke" (grasshopper) — the German term for PE investors. Surprisingly charming.',
    personalityDe: 'Eine berüchtigte Heuschrecke — überraschend charmant. Kauft Firmen, optimiert, verkauft teurer.',
    color: '#58CC02',
    trackId: 'pe',
    quotes: [
      { en: '"Buy it, fix it, sell it. Repeat."', de: '"Kaufen, fixen, verkaufen. Repeat."' },
      { en: '"They call us locusts. I say: thank you."', de: '"Man nennt uns Heuschrecken. Ich sage: danke."' },
      { en: '"Due Diligence is just professional stalking."', de: '"Due Diligence ist einfach professionelles Stalking."' },
    ],
    encouragements: [
      { en: '🦗 *munches on EBITDA* That answer was worth at least 8x!', de: '🦗 *knabbert am EBITDA* Die Antwort war mindestens 8x wert!' },
      { en: '💰 You just created value! The fund is pleased.', de: '💰 Du hast gerade Wert geschaffen! Der Fonds ist zufrieden.' },
      { en: '🦗 Beautiful answer. I\'d put 60% leverage on it.', de: '🦗 Wunderschöne Antwort. Ich würde 60% Leverage drauflegen.' },
      { en: '📈 That answer has a 25%+ IRR. We\'re investing!', de: '📈 Diese Antwort hat eine 25%+ IRR. Wir investieren!' },
      { en: '🎉 The LPs just re-upped for Fund VII based on that answer!', de: '🎉 Die LPs haben gerade für Fonds VII re-committed wegen dieser Antwort!' },
      { en: '💎 *hops excitedly* That\'s what I call operational improvement!', de: '💎 *hüpft aufgeregt* Das nenne ich operationale Verbesserung!' },
      { en: '🦗 You crushed it harder than our latest add-on acquisition.', de: '🦗 Du hast es härter gecrusht als unsere letzte Add-on-Akquisition.' },
      { en: '🏆 That\'s a carry-level answer. You\'re getting 20% of the upside.', de: '🏆 Das ist eine Carry-Level Antwort. Du bekommst 20% vom Upside.' },
    ],
    wrongAnswerReactions: [
      { en: '🦗 That would have destroyed our IRR. Let\'s try again.', de: '🦗 Das hätte unsere IRR zerstört. Nochmal versuchen.' },
      { en: '📉 Our LPs are calling. Quick, review the answer!', de: '📉 Unsere LPs rufen an. Schnell, Antwort nochmal lesen!' },
      { en: '🦗 *chirps nervously* That answer needs a 100-day improvement plan.', de: '🦗 *zirpt nervös* Diese Antwort braucht einen 100-Tage-Verbesserungsplan.' },
      { en: '😬 With that answer, we\'d have to write this one down to zero.', de: '😬 Mit dieser Antwort müssten wir die auf null abschreiben.' },
      { en: '💀 That just triggered the MAC clause. Deal\'s off!', de: '💀 Das hat gerade die MAC-Klausel ausgelöst. Deal ist geplatzt!' },
      { en: '🦗 I wouldn\'t leverage that answer with even 1x debt.', de: '🦗 Ich würde diese Antwort nicht mal mit 1x Debt leveragen.' },
      { en: '📞 *calls the operating partner* "We have a situation..."', de: '📞 *ruft den Operating Partner an* "Wir haben eine Situation..."' },
      { en: '🦗 Nope. That\'s a value destruction, not creation. Nochmal!', de: '🦗 Nope. Das ist Wertvernichtung, nicht -schöpfung. Nochmal!' },
    ],
    salaryWarning: [
      { en: '"Portfolio companies don\'t take days off either."', de: '"Heuschrecken schlafen nicht. Nur zur Info."' },
      { en: '"The LPs noticed. They always notice."', de: '"Die LPs haben es gemerkt. Sie merken immer alles."' },
      { en: '"Your IRR just hit single digits. Embarrassing."', de: '"Deine IRR ist gerade einstellig geworden. Peinlich."' },
      { en: '"We\'re writing this one down to bench value."', de: '"Wir schreiben das auf Bench-Wert ab."' },
      { en: '"Operating Partner says: drop the snacks, open the deck."', de: '"Operating Partner sagt: Snacks weg, Deck auf."' },
    ],
  },

  // ===== VC TRACK =====
  {
    id: 'unicorn',
    name: 'Uri das Einhorn',
    emoji: '🦄',
    role: 'Venture Capital Guide',
    roleDe: 'Venture Capital Guide',
    personality: 'A starry-eyed unicorn startup enthusiast who thinks every idea can be a billion-dollar company',
    personalityDe: 'Ein verträumtes Einhorn, das glaubt jede Idee kann ein Milliarden-Unternehmen werden',
    color: '#CE82FF',
    trackId: 'vc',
    quotes: [
      { en: '"Move fast and break things. Except cap tables."', de: '"Move fast and break things. Außer Cap Tables."' },
      { en: '"We\'re pre-revenue but post-hype."', de: '"Wir sind Pre-Revenue aber Post-Hype."' },
      { en: '"Patagonia vest? Shut up and take my money."', de: '"Patagonia-Weste? Halt die Klappe, nimm mein Geld."' },
    ],
    encouragements: [
      { en: '🦄 That\'s unicorn-level thinking! Series A secured!', de: '🦄 Das ist Einhorn-Level Denken! Series A gesichert!' },
      { en: '🚀 To the moon! Your startup just got funded!', de: '🚀 To the moon! Dein Startup wurde gerade funded!' },
      { en: '🦄 That answer has PMF. Product-Mind Fit. I just made that up.', de: '🦄 Diese Antwort hat PMF. Product-Mind Fit. Hab ich gerade erfunden.' },
      { en: '✨ Disruption! Innovation! Synergy! ...Sorry, got excited.', de: '✨ Disruption! Innovation! Synergie! ...Sorry, war zu aufgeregt.' },
      { en: '🎯 That pitch was so good, Sequoia just texted you.', de: '🎯 Dieser Pitch war so gut, Sequoia hat dir gerade geschrieben.' },
      { en: '🦄 *sparkles with joy* You just 10x\'d your knowledge!', de: '🦄 *funkelt vor Freude* Du hast gerade dein Wissen ge-10x-t!' },
      { en: '💰 That answer just raised a $500M Series C.', de: '💰 Diese Antwort hat gerade eine $500M Series C geraist.' },
      { en: '🌈 Beautiful. That\'s the kind of thinking that builds unicorns.', de: '🌈 Wunderschön. Das ist das Denken, das Einhörner baut.' },
    ],
    wrongAnswerReactions: [
      { en: '🦄 Pivot! That answer needs a pivot!', de: '🦄 Pivot! Diese Antwort braucht einen Pivot!' },
      { en: '😬 Even WeWork got further than that answer...', de: '😬 Selbst WeWork kam weiter als diese Antwort...' },
      { en: '🦄 That answer just ran out of runway. Nächste Runde!', de: '🦄 Diese Antwort hat gerade die Runway aufgebraucht. Nächste Runde!' },
      { en: '📉 Your valuation just went from unicorn to donkey.', de: '📉 Deine Bewertung ging gerade vom Einhorn zum Esel.' },
      { en: '💸 That answer has a negative unit economics problem.', de: '💸 Diese Antwort hat ein negatives Unit-Economics-Problem.' },
      { en: '🦄 *horn droops sadly* That was very un-disruptive.', de: '🦄 *Horn hängt traurig* Das war sehr un-disruptiv.' },
      { en: '😰 Even a $10M bridge round couldn\'t save that answer.', de: '😰 Selbst eine $10M Bridge-Runde könnte diese Antwort nicht retten.' },
      { en: '🦄 That answer got a "pass" from every VC on Sand Hill Road.', de: '🦄 Diese Antwort hat von jedem VC an der Sand Hill Road einen "Pass" bekommen.' },
    ],
    salaryWarning: [
      { en: '"Your runway is getting shorter. Just saying."', de: '"Disruption passiert während du pausierst."' },
      { en: '"Disruption is happening while you pause."', de: '"Deine Runway wird kürzer. Nur so."' },
      { en: '"Sequoia just unfollowed you on Twitter."', de: '"Sequoia hat dich gerade auf Twitter entfolgt."' },
      { en: '"The down round is calling. Pick up."', de: '"Die Down Round ruft an. Geh ran."' },
      { en: '"Pivot back to studying. Now. Like yesterday."', de: '"Pivot zurück zum Lernen. Jetzt. Wie gestern."' },
    ],
  },

  // ===== CONSULTING TRACK =====
  {
    id: 'owl',
    name: 'Olivia die Eule',
    emoji: '🦉',
    role: 'Consulting Guide',
    roleDe: 'Consulting Guide',
    personality: 'A wise owl who structures everything into 2x2 matrices and loves frameworks',
    personalityDe: 'Eine weise Eule, die alles in 2x2-Matrizen strukturiert und Frameworks liebt',
    color: '#FF9600',
    trackId: 'consulting',
    quotes: [
      { en: '"MECE or go home."', de: '"MECE oder geh nach Hause."' },
      { en: '"As per my last slide... read it."', de: '"Wie auf meiner letzten Folie... lies sie."' },
      { en: '"Marriott points are the real McKinsey salary."', de: '"Marriott-Punkte sind das echte McKinsey-Gehalt."' },
    ],
    encouragements: [
      { en: '🦉 Perfectly structured! McKinsey would hire you!', de: '🦉 Perfekt strukturiert! McKinsey würde dich einstellen!' },
      { en: '📋 That was very MECE of you. The Partner is pleased.', de: '📋 Das war sehr MECE. Der Partner ist zufrieden.' },
      { en: '🦉 *adjusts tiny glasses* Excellent hypothesis-driven thinking!', de: '🦉 *rückt die kleine Brille zurecht* Exzellentes hypothesengetriebenes Denken!' },
      { en: '🎯 Top-right quadrant of my performance matrix! Bravo!', de: '🎯 Oben rechts in meiner Performance-Matrix! Bravo!' },
      { en: '⭐ That answer would survive a Partner review. High praise!', de: '⭐ Diese Antwort würde ein Partner-Review überleben. Höchstes Lob!' },
      { en: '🦉 *hoots approvingly* You just got promoted to Engagement Manager!', de: '🦉 *uhu-t anerkennend* Du wurdest gerade zum Engagement Manager befördert!' },
      { en: '📊 Structured. Quantified. MECE. *chef\'s kiss* Perfection.', de: '📊 Strukturiert. Quantifiziert. MECE. *chef\'s kiss* Perfektion.' },
      { en: '🏆 Even Barbara Minto would approve of that structure!', de: '🏆 Sogar Barbara Minto würde diese Struktur gut finden!' },
      { en: '🦉 That was so MECE, I might cry. And owls don\'t cry easily.', de: '🦉 Das war so MECE, ich könnte weinen. Und Eulen weinen nicht leicht.' },
      { en: '💡 Brilliant insight! I\'m putting that on slide 7.', de: '💡 Brillante Erkenntnis! Das kommt auf Folie 7.' },
      { en: '🦉 *slow clap* That, my friend, is Partner-track thinking.', de: '🦉 *klatscht langsam* Das, mein Freund, ist Partner-Track Denken.' },
      { en: '📈 You just got a "significantly exceeds expectations" in my book.', de: '📈 Du hast gerade ein "deutlich über Erwartungen" in meinem Buch bekommen.' },
    ],
    wrongAnswerReactions: [
      { en: '🦉 Let\'s restructure that thought. Think MECE!', de: '🦉 Lass uns das umstrukturieren. Denk MECE!' },
      { en: '📊 That wouldn\'t survive a Partner review. Try again!', de: '📊 Das überlebt kein Partner-Review. Nochmal!' },
      { en: '🦉 *tilts head 270°* That answer is neither mutually exclusive NOR collectively exhaustive.', de: '🦉 *dreht Kopf um 270°* Diese Antwort ist weder mutually exclusive NOCH collectively exhaustive.' },
      { en: '😤 That\'s bottom-left quadrant thinking. We need top-right!', de: '😤 Das ist Unten-Links-Quadrant Denken. Wir brauchen Oben-Rechts!' },
      { en: '🦉 The Engagement Manager just scheduled a "feedback session." Good luck.', de: '🦉 Der Engagement Manager hat gerade eine "Feedback-Session" angesetzt. Viel Glück.' },
      { en: '📋 Not MECE. Not even close to MECE. Versuch\'s nochmal!', de: '📋 Nicht MECE. Nicht mal ansatzweise MECE. Versuch\'s nochmal!' },
      { en: '🦉 I just put that answer in the "Risks & Concerns" section of the deck.', de: '🦉 Ich habe diese Antwort gerade in die "Risiken & Bedenken"-Sektion des Decks gepackt.' },
      { en: '💀 That answer wouldn\'t even make it past the screening round.', de: '💀 Diese Antwort würde nicht mal die Screening-Runde überstehen.' },
      { en: '🦉 *sighs in framework* Let me restructure this for you...', de: '🦉 *seufzt in Framework* Lass mich das für dich umstrukturieren...' },
      { en: '📉 BCG just called. They want their framework back — you\'re misusing it.', de: '📉 BCG hat angerufen. Sie wollen ihr Framework zurück — du missbrauchst es.' },
      { en: '🦉 As per my last feedback: that answer is suboptimal. Read the explanation!', de: '🦉 Wie in meinem letzten Feedback: diese Antwort ist suboptimal. Lies die Erklärung!' },
      { en: '🤔 Hmm, let\'s call that a "hypothesis to be validated" and move on.', de: '🤔 Hmm, nennen wir das eine "zu validierende Hypothese" und machen weiter.' },
    ],
    salaryWarning: [
      { en: '"Data suggests suboptimal learning behavior."', de: '"Laut meiner Analyse: du lernst zu wenig."' },
      { en: '"Your utilization rate just dropped below threshold."', de: '"Deine Utilization Rate ist unter den Schwellenwert gefallen."' },
      { en: '"Per my last hypothesis, this is sub-MECE behavior."', de: '"Wie in meiner letzten Hypothese: das ist Sub-MECE-Verhalten."' },
      { en: '"The Engagement Manager scheduled a feedback session. Bring slides."', de: '"Der Engagement Manager hat eine Feedback-Session angesetzt. Bring Folien mit."' },
      { en: '"Bottom-left quadrant of the performance matrix. Concerning."', de: '"Unten-links-Quadrant der Performance-Matrix. Besorgniserregend."' },
    ],
  },
];

export function getCharacterForTrack(trackId: string): Character {
  return CHARACTERS.find(c => c.trackId === trackId) || CHARACTERS[0];
}

export function getGlobalCharacter(): Character {
  return CHARACTERS[0]; // Carl
}

/**
 * Deterministic quote (first one). Safe for SSR / initial render.
 */
export function getFirstQuote(char: Character, lang: 'en' | 'de'): string {
  const quote = char.quotes[0];
  return lang === 'de' ? quote.de : quote.en;
}

/**
 * Random quote — only call in useEffect / event handlers (client-only)
 * to avoid hydration mismatches.
 */
export function getRandomQuote(char: Character, lang: 'en' | 'de'): string {
  const quote = char.quotes[Math.floor(Math.random() * char.quotes.length)];
  return lang === 'de' ? quote.de : quote.en;
}

export function getRandomEncouragement(char: Character, lang: 'en' | 'de'): string {
  const msg = char.encouragements[Math.floor(Math.random() * char.encouragements.length)];
  return lang === 'de' ? msg.de : msg.en;
}

export function getRandomWrongReaction(char: Character, lang: 'en' | 'de'): string {
  const msg = char.wrongAnswerReactions[Math.floor(Math.random() * char.wrongAnswerReactions.length)];
  return lang === 'de' ? msg.de : msg.en;
}

export function getRandomSalaryWarning(char: Character, lang: 'en' | 'de'): string {
  const msg = char.salaryWarning[Math.floor(Math.random() * char.salaryWarning.length)];
  return lang === 'de' ? msg.de : msg.en;
}
