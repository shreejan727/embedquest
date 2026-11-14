// ============================================================
// EMBEDQUEST — AI Teacher service module
//
// Design: works fully offline with a rule-based LocalTeacher.
// Future: set VITE_AI_ENDPOINT + VITE_AI_MODEL (+ optional
// VITE_AI_API_KEY via a small server proxy) to enable a real
// model. The UI always shows which mode is active — and the
// teacher NEVER just hands over quiz answers; it teaches.
// ============================================================
import { ALL_LESSONS, getLesson } from './curriculum';
import type { Lesson } from './types';
import { t } from './i18n';

export interface TeacherMessage {
  role: 'user' | 'teacher';
  text: string;
  hintMode?: boolean;
}

export interface TeacherContext {
  /** Current lesson id, if the student is inside a lesson. */
  lessonId?: string;
  question: string;
  /** Recent conversation (MIAA continuity), oldest first. */
  history?: Array<{ role: 'user' | 'teacher'; text: string }>;
}

export interface TeacherReply {
  text: string;
  mode: 'local' | 'remote';
  /** Suggested lesson id to open next, if relevant. */
  lessonRef?: string;
}

// ---------------- Local rule-based teacher (offline) ----------------

function norm(s: string): string {
  return s.toLowerCase();
}

/** Split a lesson into searchable text. */
function lessonText(l: Lesson): string {
  const parts: string[] = [l.title];
  for (const s of l.sections) {
    parts.push(s.heading, s.body ?? '', (s.list ?? []).join(' '), s.kind);
  }
  return norm(parts.join(' '));
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'what', 'why', 'how', 'na', 'enna', 'yenna', 'yean',
  'epdi', 'panna', 'panranum', 'nu', 'la', 'and', 'or', 'of', 'to', 'in', 'for',
  'me', 'my', 'i', 'you', 'can', 'do', 'does', 'give', 'tell', 'kudu', 'kudunga',
]);

function tokenize(q: string): string[] {
  return norm(q)
    .replace(/[^a-z0-9%.\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/** Score every lesson by keyword overlap and return the best matches. */
function findLessons(question: string): Lesson[] {
  const tokens = tokenize(question);
  if (!tokens.length) return [];
  const scored = ALL_LESSONS.map((l) => {
    const text = lessonText(l);
    let score = 0;
    for (const t of tokens) {
      if (text.includes(t)) score += 1;
    }
    // small bonus for title hits
    for (const t of tokens) {
      if (norm(l.title).includes(t)) score += 1;
    }
    return { lesson: l, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 2).map((s) => s.lesson);
}

function explainLesson(l: Lesson): string {
  const explain = l.sections.find((s) => s.kind === 'explain');
  const analogy = l.sections.find((s) => s.kind === 'analogy');
  let out = `**${l.title}** — idha simple-a paakalaam 👇\n\n`;
  if (explain) out += `${trimBody(explain.body ?? '')}\n\n`;
  if (analogy) out += `Oru analogy: ${trimBody(analogy.body ?? '')}\n\n`;
  out += `Full lesson open pannunga: naan #/lesson/${l.id} link podren. Innum doubt irundha, specific-a kelu — "pointers epdi work aagudhu" maari.`;
  return out;
}

function trimBody(s: string): string {
  const first = s.split('\n\n')[0] ?? s;
  return first.length > 320 ? first.slice(0, 317) + '...' : first;
}

/** Quiz hint mode: teach toward the answer, never give it. */
function quizHint(question: string, lesson?: Lesson): string {
  const clues: string[] = [];
  if (lesson) {
    const mistakes = lesson.sections.find((s) => s.kind === 'mistakes');
    if (mistakes?.list) clues.push(...mistakes.list.slice(0, 2));
  }
  let out = 'Answer direct-a solla maaten 😄 — aana think panna help panren:\n\n';
  out += '1. Options la extremes (always/never) usually trap options.\n';
  out += '2. Lesson la analogy section mela focus pannu — quiz questions analogy base la dhaan varum.\n';
  if (clues.length) out += `3. Common mistake warning: ${clues[0]}\n`;
  out += '\nInnum stuck-a irundha, kelviya konjam simple-a split pannunga: "X na enna?" nu kelu.';
  return out;
}

export function localTeacher(ctx: TeacherContext): TeacherReply {
  const q = norm(ctx.question);
  const lesson = ctx.lessonId ? getLesson(ctx.lessonId) : undefined;

  // Greetings / small talk
  if (/\b(hi|hello|vanakkam|hey|hii)\b/.test(q)) {
    return {
      mode: 'local',
      text: 'Vanakkam! Naan un AI Teacher 🤖 Local mode la irukken (offline). Enna topic la doubt? "binary epdi convert panradhu" maari kelu, or "hint" nu sollu quiz ku.',
    };
  }

  // Hint requests
  if (q.includes('hint') || q.includes('answer kudu') || q.includes('answer sollu')) {
    return {
      mode: 'local',
      lessonRef: lesson?.id,
      text: quizHint(ctx.question, lesson),
    };
  }

  // "What next" guidance
  if (q.includes('next') || q.includes('adutha') || q.includes('plan')) {
    return {
      mode: 'local',
      text: 'Simple rule: **World order follow pannu** (1 → 11), ovvoru lesson um quiz pass pannitu next ku po. Nee missed first 10 days — so World 1 & 2 munnadi solid-a mudichu, appuram C programming. Diagnostic score weak worlds ku adhiga priority. Dashboard la "Continue Learning" button correct lesson-a kootitum!',
    };
  }

  // Lesson-based teaching
  const matches = findLessons(ctx.question);
  if (matches.length) {
    return {
      mode: 'local',
      lessonRef: matches[0].id,
      text: explainLesson(matches[0]),
    };
  }

  // Context lesson recap
  if (lesson) {
    return {
      mode: 'local',
      lessonRef: lesson.id,
      text: `Intha kelvi ku direct mapping illa, aana nee ippo "${lesson.title}" la irukka. Athoda core idea: ${trimBody(
        lesson.sections.find((s) => s.kind === 'explain')?.body ?? lesson.title,
      )}\n\nSpecific doubt-a keelu: "X na enna?" pattern la.`,
    };
  }

  return {
    mode: 'local',
    text: 'Konjam specific-a kelunga — topic name sollu (example: "pointers", "Ohm law", "two\'s complement", "MQTT"). Naan related lesson la irundhu simple Tanglish la explain pannuven. Quiz la stuck-a? "hint" nu kelu — answer solla maaten, aana think panna vaippen 😉',
  };
}

// ---------------- Remote teacher (future, opt-in) ----------------

async function remoteTeacher(ctx: TeacherContext): Promise<TeacherReply | null> {
  const endpoint = import.meta.env.VITE_AI_ENDPOINT as string | undefined;
  if (!endpoint) return null;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: ctx.lessonId,
        question: ctx.question,
        history: ctx.history,
        // The teacher system prompt lives on the server so keys stay safe.
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { text?: string; lessonRef?: string; error?: string };
    if (res.ok && data.text) {
      return { text: data.text, mode: 'remote', lessonRef: data.lessonRef };
    }
    // Rate limit / timeout → friendly busy message instead of a canned answer.
    if (typeof data.error === 'string' && /rate limit|timeout/i.test(data.error)) {
      return { text: t('teacher_busy'), mode: 'local' };
    }
    return null; // any other failure → graceful fallback to local teacher
  } catch {
    return null; // graceful fallback to local teacher
  }
}

export async function askTeacher(ctx: TeacherContext): Promise<TeacherReply> {
  const remote = await remoteTeacher(ctx);
  return remote ?? localTeacher(ctx);
}

export function teacherMode(): 'local' | 'remote' {
  return import.meta.env.VITE_AI_ENDPOINT ? 'remote' : 'local';
}
