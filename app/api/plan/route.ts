import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
  const { amne, teknik } = await req.json();

  const teknikInfo: Record<string, string> = {
    'The Study Cycle': 'The Study Cycle (preview → läs aktivt → review inom 24h → fokuserade sessioner 30-50 min → testa dig själv)',
    'Feynman-metoden': 'Feynman-metoden (välj begrepp → förklara högt utan anteckningar → identifiera luckor → gå tillbaka och repetera)',
    'Spaced Retrieval': 'Spaced Retrieval System (lär in dag 1 → repetition dag 2, 4, 8, 15, 30 med aktiv återkallning utan att titta)',
  };

  const prompt = `Du är en expert på forskningsbaserat lärande. Skapa en konkret studieplan för ämnet: "${amne}".

Använd metoden: ${teknikInfo[teknik] || teknik}

Skapa en studieplan med exakt 4 sessioner. Varje session ska ha 3-4 konkreta moment.

Svara ENDAST med giltig JSON i detta format (ingen annan text):
{
  "amne": "${amne}",
  "teknik": "${teknik}",
  "sessioner": [
    {
      "titel": "Session 1 — Dag 1",
      "moment": [
        {
          "titel": "Momentets titel",
          "beskrivning": "Konkret instruktion vad användaren ska göra",
          "tid": "X min"
        }
      ]
    }
  ]
}`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Kunde inte hitta JSON i svaret:', text);
    return NextResponse.json({ error: 'Ogiltigt svar från AI' }, { status: 500 });
  }

  const plan = JSON.parse(jsonMatch[0]);
  return NextResponse.json(plan);
  } catch (error) {
    console.error('API-fel:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
