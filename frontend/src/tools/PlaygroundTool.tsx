// ============================================================
// EMBEDQUEST — Tool: C code playground (educational simulation)
// HONEST MODE: no fake compilation. This is a code editor with
// ready-made templates and their known expected outputs, so
// students can trace and self-verify. Clearly labeled.
// ============================================================
import { useEffect, useState } from 'react';
import { Copy, Info, RotateCcw, Save } from 'lucide-react';
import { awardToolXp } from '../lib/progress';
import { Card, Chip } from '../components/common';

interface Template {
  id: string;
  name: string;
  code: string;
  expected: string;
  tip: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'hello',
    name: 'Hello World',
    code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, Embedded Quest!\\n");\n    return 0;\n}',
    expected: 'Hello, Embedded Quest!',
    tip: 'printf la \\n = new line. Semicolon maranthaa compiler error!',
  },
  {
    id: 'vars',
    name: 'Variables & printf',
    code: '#include <stdio.h>\n\nint main() {\n    int led = 13;\n    float temp = 27.5;\n    char grade = \'A\';\n    printf("LED pin: %d\\n", led);\n    printf("Temp: %.1f C\\n", temp);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}',
    expected: 'LED pin: 13\nTemp: 27.5 C\nGrade: A',
    tip: '%d int, %.1f float (1 decimal), %c char — format specifier match aaganum!',
  },
  {
    id: 'loop',
    name: 'Loop (LED blink style)',
    code: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("Blink %d\\n", i);\n    }\n    printf("Done!\\n");\n    return 0;\n}',
    expected: 'Blink 1\nBlink 2\nBlink 3\nBlink 4\nBlink 5\nDone!',
    tip: 'Loop body 5 times run aagum — Arduino la idhu delay(500) uda LED blink logic!',
  },
  {
    id: 'if',
    name: 'If-else (sensor threshold)',
    code: '#include <stdio.h>\n\nint main() {\n    int sensorValue = 750;\n    if (sensorValue > 500) {\n        printf("Alarm: value high!\\n");\n    } else {\n        printf("Normal.\\n");\n    }\n    return 0;\n}',
    expected: 'Alarm: value high!',
    tip: 'sensorValue 512 maari maathi trace pannunga — else branch run aagum!',
  },
  {
    id: 'func',
    name: 'Function',
    code: '#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int result = square(7);\n    printf("7 squared = %d\\n", result);\n    return 0;\n}',
    expected: '7 squared = 49',
    tip: 'Function = reusable logic block. n ku 7 pass aagudhu, 49 return.',
  },
];

const STORAGE_KEY = 'embedquest-playground-v1';

export function PlaygroundTool() {
  const [tplId, setTplId] = useState('hello');
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    awardToolXp('playground');
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(raw);
    } catch {
      /* ignore */
    }
  }, []);

  function loadTemplate(id: string) {
    const t = TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    setTplId(id);
    setCode(t.code);
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

  const tpl = TEMPLATES.find((x) => x.id === tplId)!;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-black">C Code Playground</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Chip className="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
            <Info className="h-3.5 w-3.5" /> Educational simulation — NO real compilation/execution here
          </Chip>
          <Chip className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
            Trace + self-verify with expected output
          </Chip>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Honest mode: intha editor la code run aagadhu. Naama browser la real C compiler illa (heavy dependency).
          <b> Practice panna vazhi:</b> template choose pannu → code trace pannunga (line by line output yosichi) →
          expected output uda compare pannunga → un code save panni, real compiler la (gcc / onlinegdb.com / Arduino IDE)
          run pannunga. Ellam accurate-a verify aagum — fake "output" illusion illa inga. 👍
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

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => navigator.clipboard?.writeText(code)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold dark:bg-slate-800"
          >
            <Copy className="h-3.5 w-3.5" /> Copy (gcc / online IDE ku paste pannunga)
          </button>
          <button onClick={save} className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold dark:bg-slate-800">
            <Save className="h-3.5 w-3.5" /> Save locally
          </button>
          <button onClick={() => setCode(tpl.code)} className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold dark:bg-slate-800">
            <RotateCcw className="h-3.5 w-3.5" /> Reset template
          </button>
          {saved && <span className="self-center text-xs font-bold text-emerald-500">{saved}</span>}
        </div>

        <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-500/40 dark:bg-emerald-500/10">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Expected output ({tpl.name})
          </div>
          <pre className="mt-2 font-mono text-[13px] leading-6 text-emerald-800 dark:text-emerald-300">{tpl.expected}</pre>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            💡 {tpl.tip}
          </p>
        </div>
      </Card>
    </div>
  );
}
