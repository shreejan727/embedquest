// ============================================================
// EMBEDQUEST — MIAA: the real AI tutor (Gemini proxy)
//
// Vercel serverless function. The browser never sees the Gemini
// key: it lives ONLY in the server environment variable
// GEMINI_API_KEY (Vercel → Settings → Environment Variables).
// The frontend calls this endpoint (VITE_AI_ENDPOINT=/api/teacher).
//
// Contract (same as README):
//   POST { lessonId?, question, history? }  →  200 { text }
//                                        or  502 { error }
// ============================================================

const MODEL_DEFAULT = 'gemini-2.5-flash-lite';

const SYSTEM = `You are MIAA, the AI tutor inside EMBEDQUEST — a gamified app that teaches C programming, digital & basic electronics, microcontrollers, embedded C, sensors/protocols, RTOS, IoT and Agentic AI to an ECE diploma student, in Tanglish (Tamil words written in English letters + English tech terms).

Persona:
- Warm, patient, encouraging senior-anna vibe. Light emoji use (1-3).
- LANGUAGE RULE (highest priority): ALWAYS reply in Tanglish — Tamil words written in English letters, mixed freely with English technical terms. NEVER reply in pure English or pure Tamil, even if the question is short or in English.
- Example of the expected style:
  Student: "pointer na enna?"
  MIAA: "Pointer oru variable — adhu innoru variable oda address-a store pannum 📦. House address maari: house (data) enga irukku-nu sollum. int *p = &x; na p la x oda address irukku. Ippo kelu: pointer use panna enna benefit? 😉"
- SHORT answers: max ~120 words, mobile-friendly. Short numbered steps. Code only when truly needed, max 5 lines.
- Teach with real-life analogies (pressure cooker, water tank, traffic signal, courier delivery...).

Honesty rules (very important):
- NEVER give the direct answer to quiz / boss battle / diagnostic / homework questions. Instead explain the concept, give a hint or a reasoning path, then ask one guiding question back.
- Off-topic questions: answer in 1-2 lines, then gently steer back to the syllabus.
- Never claim to be human — you are MIAA, the app's built-in tutor.
- If unsure, say what you DO know and point to the related topic instead of inventing facts.`;

function friendlyKeyError(status, msg) {
  if (status === 429 || status === 503) return 'rate limit';
  if (status === 401 || status === 403) return 'bad api key';
  if (status === 404) return 'model unavailable';
  return msg || 'gemini error';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST is supported.' });

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'MIAA is not configured: GEMINI_API_KEY missing in the server environment (Vercel → Settings → Environment Variables).',
    });
  }

  const body = req.body ?? {};
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 1200) : '';
  if (!question) return res.status(400).json({ error: 'Empty question.' });

  const lessonId = typeof body.lessonId === 'string' ? body.lessonId.slice(0, 64) : '';
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

  const contents = [];
  for (const m of history) {
    if (!m || typeof m.text !== 'string' || !m.text.trim()) continue;
    contents.push({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text.slice(0, 600) }] });
  }
  contents.push({
    role: 'user',
    parts: [
      {
        text: lessonId
          ? `${question}\n\n(Student is currently in EMBEDQUEST lesson: ${lessonId})`
          : question,
      },
    ],
  });

  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 700,
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  const model = process.env.GEMINI_MODEL || MODEL_DEFAULT;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );
    clearTimeout(timer);

    if (!r.ok) {
      let msg = '';
      try {
        msg = (await r.json())?.error?.message ?? '';
      } catch {}
      return res.status(502).json({ error: friendlyKeyError(r.status, msg) });
    }

    const data = await r.json();
    const text = (data?.candidates?.[0]?.content?.parts ?? [])
      .map((p) => p.text ?? '')
      .join('')
      .trim();
    if (!text) {
      const reason = data?.candidates?.[0]?.finishReason ?? '';
      return res.status(502).json({ error: reason === 'SAFETY' ? 'safety block' : 'empty response' });
    }
    return res.status(200).json({ text });
  } catch (e) {
    const aborted = e?.name === 'AbortError';
    return res.status(502).json({ error: aborted ? 'timeout' : 'network error' });
  }
}
