// ============================================================
// EMBEDQUEST — Tool: logic gate simulator
// Toggle inputs, see output; truth table highlights live row.
// ============================================================
import { useEffect, useMemo, useState } from 'react';
import { awardToolXp } from '../lib/progress';
import { Card } from '../components/common';

type GateName = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

const GATES: Record<GateName, { inputs: 1 | 2; fn: (a: boolean, b: boolean) => boolean; desc: string }> = {
  AND: { inputs: 2, fn: (a, b) => a && b, desc: 'Output 1 ONLY when both inputs are 1 (series switches)' },
  OR: { inputs: 2, fn: (a, b) => a || b, desc: 'Output 1 when ANY input is 1 (parallel switches)' },
  NOT: { inputs: 1, fn: (a) => !a, desc: 'Inverter — flips the input' },
  NAND: { inputs: 2, fn: (a, b) => !(a && b), desc: 'AND ulla NOT — universal gate!' },
  NOR: { inputs: 2, fn: (a, b) => !(a || b), desc: 'OR ulla NOT — universal gate!' },
  XOR: { inputs: 2, fn: (a, b) => a !== b, desc: 'Output 1 when inputs are DIFFERENT (half adder SUM!)' },
  XNOR: { inputs: 2, fn: (a, b) => a === b, desc: 'Output 1 when inputs are SAME' },
};

export function GatesTool() {
  const [gate, setGate] = useState<GateName>('AND');
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);

  useEffect(() => {
    awardToolXp('gates');
  }, []);

  const g = GATES[gate];
  const out = useMemo(() => g.fn(a, b), [g, a, b]);

  // Truth table rows
  const rows = useMemo(() => {
    if (g.inputs === 1) {
      return [
        { a: false, b: false, out: g.fn(false, false) },
        { a: true, b: false, out: g.fn(true, false) },
      ];
    }
    return [
      { a: false, b: false, out: g.fn(false, false) },
      { a: false, b: true, out: g.fn(false, true) },
      { a: true, b: false, out: g.fn(true, false) },
      { a: true, b: true, out: g.fn(true, true) },
    ];
  }, [g]);

  const bit = (v: boolean) => (v ? '1' : '0');

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h1 className="text-2xl font-black">Logic Gate Simulator</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Switch-a toggle pannu, output lamp paaru. Truth table la current row highlight aagum!
        </p>
      </div>

      <Card className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(GATES) as GateName[]).map((name) => (
            <button
              key={name}
              onClick={() => setGate(name)}
              className={`rounded-xl border px-3 py-1.5 font-mono text-sm font-bold transition-colors ${
                gate === name
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400">{g.desc}</p>

        {/* Interactive circuit */}
        <div className="eq-grid-bg rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-center justify-center gap-6">
            {/* inputs */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setA(!a)}
                className={`flex h-14 w-14 items-center justify-center rounded-xl font-mono text-xl font-black transition-colors ${
                  a ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                A={bit(a)}
              </button>
              {g.inputs === 2 && (
                <button
                  onClick={() => setB(!b)}
                  className={`flex h-14 w-14 items-center justify-center rounded-xl font-mono text-xl font-black transition-colors ${
                    b ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  B={bit(b)}
                </button>
              )}
            </div>

            {/* gate */}
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-lg font-black text-white eq-glow">
              {gate}
            </div>

            {/* output */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-14 w-14 rounded-full border-4 transition-all ${
                  out
                    ? 'border-amber-400 bg-amber-300 shadow-[0_0_20px_4px_rgba(251,191,36,0.5)]'
                    : 'border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-700'
                }`}
              />
              <span className="font-mono text-sm font-bold">Y={bit(out)}</span>
            </div>
          </div>
        </div>

        {/* Truth table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-center font-mono text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="py-2">A</th>
                <th className="py-2">{g.inputs === 2 ? 'B' : '—'}</th>
                <th className="py-2">Y</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const active =
                  r.a === a && r.b === b;
                return (
                  <tr
                    key={i}
                    className={active ? 'bg-indigo-50 font-bold dark:bg-indigo-500/10' : ''}
                  >
                    <td className="py-2">{bit(r.a)}</td>
                    <td className="py-2">{g.inputs === 2 ? bit(r.b) : '-'}</td>
                    <td className={`py-2 ${r.out ? 'text-emerald-500' : 'text-slate-400'}`}>{bit(r.out)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
