// ============================================================
// EMBEDQUEST — AI Teacher chat (local mode now, API-ready)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { Bot, Feather, Lightbulb, Send, User } from 'lucide-react';
import { Card, Chip } from '../components/common';
import { askTeacher, teacherMode, type TeacherMessage } from '../lib/aiTeacher';
import { navigate } from '../lib/router';
import { useProgress } from '../lib/progress';
import { getLesson } from '../lib/curriculum';
import { t } from '../lib/i18n';

const QUICK = [
  { label: '💡 Explain simpler', prompt: 'Intha lesson ah innum simple-a explain pannunga' },
  { label: '🎯 What should I learn next?', prompt: 'adutha lesson enna plan' },
  { label: '🧠 Quiz hint (no answers!)', prompt: 'hint' },
  { label: '❓ "Binary na enna?"', prompt: 'binary na enna' },
  { label: '🔌 "Pointers na enna?"', prompt: 'pointers na enna' },
  { label: '📡 "MQTT na enna?"', prompt: 'mqtt na enna' },
];

export function TeacherView() {
  const progress = useProgress();
  const mode = teacherMode();
  const currentLesson = Object.keys(progress.lessons).length;
  // Best guess of current lesson: first incomplete in diagnostic plan order (same logic as dashboard).
  const [messages, setMessages] = useState<TeacherMessage[]>([
    {
      role: 'teacher',
      text:
        'Vanakkam! 🤖 Naan un AI Teacher — friendly mentor, patient-a, Tanglish la explain pannuven.\n\nNaan answers direct-a kudukka maaten — think panna vaippem. Doubt kelu, hint keelu, illa "X na enna?" nu kelu.',
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setBusy(true);
    const reply = await askTeacher({ question: text });
    setMessages((m) => [...m, { role: 'teacher', text: reply.text, hintMode: false }]);
    setBusy(false);
  }

  function renderText(text: string) {
    return text.split('\n').map((line, i) => {
      // Bold **x** support (light)
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i} className="block">
          {parts.map((p, j) =>
            p.startsWith('**') && p.endsWith('**') ? <b key={j}>{p.slice(2, -2)}</b> : p,
          )}
        </span>
      );
    });
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-190px)] max-w-2xl flex-col lg:h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">{t('teacher_h1')}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {currentLesson} lessons done · {mode === 'local' ? t('teacher_local_note') : t('teacher_remote_note')}
          </p>
        </div>
        <Chip className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          <Feather className="h-3.5 w-3.5" /> Teaches, never spoils
        </Chip>
      </div>

      {/* Messages */}
      <div className="mt-3 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-white ${
                m.role === 'teacher' ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-slate-400 dark:bg-slate-600'
              }`}
            >
              {m.role === 'teacher' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </span>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'teacher'
                  ? 'bg-white dark:bg-slate-800'
                  : 'bg-indigo-500 text-white'
              }`}
            >
              {renderText(m.text)}
              {m.role === 'teacher' && m.text.includes('#/lesson/') && (
                <button
                  onClick={() => {
                    const match = m.text.match(/#\/lesson\/(w\d+l\d+)/);
                    if (match) navigate(`/lesson/${match[1]}`);
                  }}
                  className="mt-2 rounded-lg bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                >
                  Open lesson →
                </button>
              )}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
              <Bot className="h-4 w-4" />
            </span>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm dark:bg-slate-800 eq-cursor">
              {t('teacher_thinking')}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick actions */}
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {QUICK.map((q) => (
          <button
            key={q.label}
            onClick={() => send(q.prompt)}
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold transition-colors hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-2 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('teacher_ph')}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="grid w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white eq-chunky disabled:opacity-40"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <Lightbulb className="h-3.5 w-3.5" />
        {mode === 'local'
          ? 'Local mode: rule-based offline helper. Real AI model integration ready — server endpoint set pannina automatic-a switch aagum (see README).'
          : 'Remote AI mode active — answers come from your configured teacher endpoint.'}
      </p>
    </div>
  );
}
