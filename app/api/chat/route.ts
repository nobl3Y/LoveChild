import { NextRequest, NextResponse } from 'next/server';
import { PatientPersona, WalrusMemoryItem } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, patient, withMemory } = body as {
      message: string;
      patient: PatientPersona;
      withMemory: boolean;
    };

    if (!message || !patient) {
      return NextResponse.json({ error: 'Missing message or patient' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if we should call the live Google Gemini API
    if (apiKey) {
      const memoryContext = withMemory && patient.memories && patient.memories.length > 0
        ? `\n\nPATIENT'S LONGITUDINAL MEMORIES STORED ON WALRUS (Total ${patient.memories.length} records):
${patient.memories.map((m) => `- Week ${m.gestationalWeek} (${m.category}): ${m.summary}. Details: ${m.rawDetails} [Tags: ${m.tags.join(', ')}]`).join('\n')}`
        : '\n\nMEMORY MODE IS OFF: You have no access to past records. Treat this interaction as an isolated session without historical memory.';

      const systemPrompt = `You are LoveChild, a compassionate, medically rigorous maternal care AI companion powered by Walrus Memory.
Your purpose: Help expectant mothers track every symptom, vital, and concern across their 40-week pregnancy, so nothing gets missed when they visit their doctor.

PATIENT PROFILE:
- Name: ${patient.name}
- Current Gestational Age: Week ${patient.gestationalWeek} (${patient.trimester})
- Obstetric History: ${patient.gravidaPara}
- Blood Type: ${patient.bloodType}
- Due Date: ${patient.estimatedDueDate}
- Known Clinical Focus: ${patient.coreWatchArea}
${memoryContext}

CRITICAL CLINICAL GUIDELINES:
1. ALWAYS correlate current symptoms with past memories if Memory Mode is ON. Specifically look out for Pre-Eclampsia red flags: persistent frontal headaches in the 3rd trimester combined with sudden ankle/facial edema and prior borderline BP.
2. NEVER prescribe prescription medications. If the user asks about NSAIDs (Ibuprofen, Felvin, Diclofenac), warn them firmly that NSAIDs are contraindicated in pregnancy, especially the 3rd trimester.
3. Be reassuring, warm, clear, and direct. Explain medical issues in simple human terms without jargon.
4. Always note what is recorded for their upcoming Doctor's Visit Report.`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nPatient says: "${message}"` }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const isRedFlag = /pre-eclampsia|preeclampsia|hypertension|blood pressure|urgent|doctor immediately/i.test(candidateText);

          return NextResponse.json({
            reply: candidateText,
            isLiveGemini: true,
            clinicalAlert: isRedFlag
              ? {
                  level: 'warning',
                  title: 'Clinical Notice for Your Next Visit',
                  details: 'Symptom pattern flagged for doctor review based on gestational timeline.',
                }
              : undefined,
          });
        }
      }
    }

    // Built-in Intelligent Fallback Engine (when API key is not yet set or during offline testing)
    return NextResponse.json({
      fallback: true,
      isLiveGemini: false,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
