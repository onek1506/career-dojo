// CareerDojo — Beispiel API Route
//
// Zeigt wie man die typsicheren env-Variablen aus `lib/env.ts` benutzt.
// Statt `process.env.OPENAI_API_KEY!` (unsicher, kein Fehler wenn leer)
// nimmt man `serverEnv.OPENAI_API_KEY` — crasht sofort mit klarer Message
// wenn der Key nicht gesetzt ist.

import { NextResponse } from 'next/server';
import { serverEnv } from '@/lib/env';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "prompt" field' },
        { status: 400 },
      );
    }

    // Beispiel: OpenAI API Call
    // serverEnv.OPENAI_API_KEY wirft automatisch wenn nicht gesetzt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverEnv.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'AI provider error' },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json({
      answer: data.choices?.[0]?.message?.content ?? '',
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
