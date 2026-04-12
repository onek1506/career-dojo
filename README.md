# CareerDojo

A Duolingo-style finance interview prep app covering Investment Banking, Private Equity, Venture Capital, and Management Consulting. Bilingual (English / German) with gamified lessons, quizzes, cases, brain teasers, and online test practice for McKinsey Solve, BCG Casey, and Bain SOVA.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- **4 Career Tracks** — Investment Banking, Private Equity, Venture Capital, Management Consulting with dedicated content, units, and lessons per track.
- **Skill Tree Learning** — Duolingo-style progression: units, lessons, XP, streaks, daily goals, level system from Praktikant to Partner.
- **Quizzes & Lessons** — Multiple choice, calculation, and fill-in-the-blank questions with bilingual explanations.
- **PrepLounge-style Cases** — Full interactive case interview sessions (briefing → steps → results) with hints and sample answers.
- **Brain Teasers** — 24+ classic interview puzzles across Logic, Math, Estimation, Lateral, and Probability categories with localStorage persistence.
- **Online Test Prep (Round 1)** — McKinsey Solve (ecosystem building & plant defense), BCG Casey (AI chatbot case), Bain SOVA (numerical & verbal reasoning) with timed practice exercises.
- **AI Tutor Chat** — In-app chat for explaining concepts and follow-up questions.
- **Character System** — 5 kooky finance mascots with hundreds of quotes, encouragements, and wrong-answer reactions (Carl der Cashflow, Wolfgang der Wolf, Lenny die Heuschrecke, Uri das Einhorn, Olivia die Eule).
- **Bilingual** — Every string available in German and English, switchable in settings.
- **Dark UI** — Duolingo-inspired dark theme with Tailwind CSS.
- **Sound Effects** — Web Audio API feedback for correct/wrong/reveal/level-up actions, toggleable.
- **Progress Tracking** — localStorage persistence for XP, streaks, completed lessons, quiz scores, completed cases, brain teasers, and preferences.

## Tech Stack

- **Next.js 16.2.2** (App Router + Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Lucide React** for icons

## Scripts

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint
```

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com). A `vercel.json` is included at the project root.

```bash
npx vercel --prod
```
