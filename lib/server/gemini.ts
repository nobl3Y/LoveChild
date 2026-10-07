const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export async function generate(
  prompt: string,
  maxOutputTokens = 1200,
  temperature = 0.65
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set.');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens,
        },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini error ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((p: any) => p.text || '')
    .join('')
    .trim();
  if (!text) throw new Error('Gemini returned an empty reply.');
  return text;
}
