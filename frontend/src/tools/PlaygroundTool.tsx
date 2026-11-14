// ============================================================
// EMBEDQUEST — Tool: C code playground (REAL in-browser runs)
//
// Runs student C programs with the JSCPP interpreter inside a
// Web Worker (no server, offline, instant). HONEST MODE: clearly
// labeled as a teaching-grade browser interpreter, not gcc —
// with a one-click OnlineGDB link for the real-compiler feel.
// Infinite loops are killed automatically (time limit).
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { Copy, ExternalLink, Info, Play, RotateCcw, Save, Square } from 'lucide-react';
import { awardToolXp } from '../lib/progress';
import { Card, Chip } from '../components/common';
import { friendlyRunError, startCRun, type CRunHandle } from '../lib/cRunner';

interface Template {
  id: string;
  name: string;
  code: string;
  tip: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'hello',
    name: 'Hello World',
    code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, Embedded Quest!\\n");\n    return 0;\n}',
    tip: 'printf la \\n = new line. Semicolon maranthaa compiler error!',
  },
  {
    id: 'vars',
    name: 'Variables & printf',
    code: '#include <stdio.h>\n\nint main() {\n    int led = 13;\n    float temp = 27.5;\n    char grade = \'A\';\n    printf("LED pin: %d\\n", led);\n    printf("Temp: %.1f C\\n", temp);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}',
    tip: '%d int, %.1f float (1 decimal), %c char — format specifier match aaganum!',
  },
  {
    id: 'loop',
    name: 'Loop (LED blink style)',
    code: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("Blink %d\\n", i);\n    }\n    printf("Done!\\n");\n    return 0;\n}',
    tip: 'Loop body 5 times run aagum — Arduino la idhu delay(500) uda LED blink logic!',
  },
  {
    id: 'if',
    name: 'If-else (sensor threshold)',
    code: '#include <stdio.h>\n\nint main() {\n    int sensorValue = 750;\n    if (sensorValue > 500) {\n        printf("Alarm: value high!\\n");\n    } else {\n        printf("Normal.\\n");\n    }\n    return 0;\n}',
    tip: 'sensorValue 512 maari maathi Run pannunga — ippo else branch output varum!',
  },
  {
    id: 'func',
    name: 'Function',
    code: '#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int result = square(7);\n    printf("7 squared = %d\\n", result);\n    return 0;\n}',
    tip: 'Function = reusable logic block. n ku 7 pass aagudhu, 49 return.',
  },
  {
    id: 'scanf',
    name: 'scanf (your input!)',
    code: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf("Two numbers kudunga: ");\n    scanf("%d %d", &a, &b);\n    printf("Sum = %d\\n", a + b);\n    return 0;\n}',
    tip: 'scanf ku INPUT box la data kudunga (keezhle) — appo program un values oda run aagum!',
  },
  {
    id: 'array',
    name: 'Array max',
    code: '#include <stdio.h>\n\nint main() {\n    int a[5] = {12, 45, 7, 88, 30};\n    int max = a[0];\n    for (int i = 1; i < 5; i++) {\n        if (a[i] > max) max = a[i];\n    }\n    printf("Max = %d\\n", max);\n    return 0;\n}',
    tip: 'Array elements compare panni max kandupidikum — sensor readings analyze panna idhu maari dhaan!',
  },
];

const STORAGE_KEY = 'embedquest-playground-v1';

export function PlaygroundTool() {
  const [tplId, setTplId] = useState('hello');
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [stdin, setStdin] = useState('');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stopped, setStopped] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const runRef = useRef<CRunHandle | null>(null);

  useEffect(() => {
    awardToolXp('playground');
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCode(raw);
    } catch {
      /* ignore */
    }
    return () => runRef.current?.stop();
  }, []);

  function loadTemplate(id: string) {
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    setTplId(id);
    setCode(t.code);
    setStdin('');
    setOutput(null);
    setError(null);
    setSaved(null);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, code);
      setSaved('Saved locally ✓');
    } catch {
      setSaved('Save failed (storage blocked)');
    }
    setTimeout(() => setSaved(null), 2000);
  }

  async function run() {
    if (running) return;
    setRunning(true);
    setOutput('');
    setExitCode(null);
    setError(null);
    setStopped(false);
    const handle = startCRun({
      code,
      input: stdin,
      timeoutMs: 5000,
      onOutput: (chunk) => setOutput((o) => (o ?? '') + chunk),
    });
    runRef.current = handle;
    const result = await handle.done;
    if (runRef.current !== handle) return; // a newer run took over
    runRef.current = null;
    setOutput(result.output);
    setExitCode(result.error ? null : result.exitCode);
    setError(result.error);
    setStopped(result.timedOut && /student/i.test(result.error ?? ''));
    setRunning(false);
  }

  function stop() {
    runRef.current?.stop();
  }

  const tpl = TEMPLATES.find((x) => x.id === tplId)!;
  const friendly = error ? friendlyRunError(error) : null;

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div>
        <h1 className="text-2xl font-black">C Code Playground ⚡</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Chip className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
            <Play className="h-3.5 w-3.5" /> Real runs — browser C interpreter (JSCPP)
          </Chip>
          <Chip className="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
            <Info className="h-3.5 w-3.5" /> Teaching grade — not full gcc
          </Chip>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          <b>Nalla news:</b> ippo code <b>run aagum</b> — namma browser la (offline, instant, unlimited). 🎉
          Idhu teaching-grade C interpreter: syllabus ellam support (printf, scanf, loops, functions,
          arrays, pointers) + infinite loop safety (5 sec la auto-stop) + beginner-friendly errors.
          <b> Honest note:</b> idhu real gcc compiler illa. Full-compiler experience venumna{' '}
          <a
            href="https://www.onlinegdb.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-indigo-500 underline underline-offset-2"
          >
            onlinegdb.com ↗
          </a>{' '}
          (Copy button uda paste pannunga).
        </p>
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => loadTemplate(t.id)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${
                tplId === t.id
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          {/* line numbers gutter */}
          <div className="hidden select-none flex-col rounded-xl bg-slate-100 px-2 py-3 font-mono text-xs leading-6 text-slate-400 dark:bg-slate-800 sm:flex">
            {code.split('\n').map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={12}
            className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-950 p-3 font-mono text-[13px] leading-6 text-emerald-300 outline-none focus:border-indigo-500 dark:border-slate-700"
          />
        </div>

        {/* Run controls */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={run}
            disabled={running}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-sm font-black text-white shadow-sm transition-opacity eq-chunky disabled:opacity-60"
          >
            <Play className="h-4 w-4" /> {running ? 'Running…' : 'Run ▶'}
          </button>
          {running && (
            <button
              onClick={stop}
              className="flex items-center gap-1.5 rounded-xl bg-rose-100 px-4 py-2 text-sm font-bold text-rose-600 dark:bg-rose-500/15 dark:text-rose-400"
            >
              <Square className="h-3.5 w-3.5" /> Stop ⏹
            </button>
          )}
          <button
            onClick={() => navigator.clipboard?.writeText(code)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold dark:bg-slate-800"
          >
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
          <button onClick={save} className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold dark:bg-slate-800">
            <Save className="h-3.5 w-3.5" /> Save locally
          </button>
          <button onClick={() => setCode(tpl.code)} className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold dark:bg-slate-800">
            <RotateCcw className="h-3.5 w-3.5" /> Reset template
          </button>
          {saved && <span className="self-center text-xs font-bold text-emerald-500">{saved}</span>}
        </div>

        {/* stdin */}
        <div className="mt-3">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Input (scanf data) — oro value oru line/submit la
          </label>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            spellCheck={false}
            rows={2}
            placeholder={'Example (scanf "%d %d"): 3 4'}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-950 p-2.5 font-mono text-[13px] leading-6 text-sky-300 outline-none focus:border-indigo-500 dark:border-slate-700"
          />
        </div>

        {/* Output */}
        {output !== null && (
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Output</div>
              {exitCode !== null && (
                <div className="text-[11px] font-bold text-emerald-500">exit code: {exitCode} ✓</div>
              )}
            </div>
            <pre className="mt-2 min-h-6 whitespace-pre-wrap font-mono text-[13px] leading-6 text-emerald-300">
              {output || (running ? '' : '(no output)')}
            </pre>
            {error && (
              <div className="mt-2 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3">
                <div className="text-xs font-bold text-rose-500 dark:text-rose-400">
                  {stopped ? 'Stopped ⏹' : 'Error'}
                </div>
                {friendly && <div className="mt-1 text-xs leading-relaxed text-slate-200">{friendly}</div>}
                <pre className="mt-1 whitespace-pre-wrap font-mono text-[11px] leading-5 text-rose-300/80">{error}</pre>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-500/30 dark:bg-indigo-500/10">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
            <ExternalLink className="h-3.5 w-3.5" /> Tip ({tpl.name})
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">💡 {tpl.tip}</p>
        </div>
      </Card>
    </div>
  );
}
