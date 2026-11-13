// ============================================================
// EMBEDQUEST — Tools: Ohm's law + resistor color code +
// series/parallel calculators (three small calculators)
// ============================================================
import { useEffect, useMemo, useState } from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { awardToolXp } from '../lib/progress';
import { Card } from '../components/common';

function fmt(n: number): string {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e6) return `${(n / 1e6).toFixed(2)} M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(2)} k`;
  if (abs !== 0 && abs < 0.01) return `${n.toExponential(2)}`;
  return `${Number(n.toFixed(3))}`;
}

// ---------------- Ohm's law ----------------
export function OhmTool() {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');

  useEffect(() => {
    awardToolXp('ohm');
  }, []);

  const given = { V: v !== '', I: i !== '', R: r !== '' };
  const count = Object.values(given).filter(Boolean).length;

  let out: { label: string; value: string }[] = [];
  if (count === 2) {
    const V = parseFloat(v), I = parseFloat(i), R = parseFloat(r);
    if (given.V && given.I) {
      out = [
        { label: 'Resistance R = V ÷ I', value: `${fmt(V / I)} Ω` },
        { label: 'Power P = V × I', value: `${fmt(V * I)} W` },
      ];
    } else if (given.V && given.R) {
      out = [
        { label: 'Current I = V ÷ R', value: `${fmt(V / R)} A` },
        { label: 'Power P = V² ÷ R', value: `${fmt((V * V) / R)} W` },
      ];
    } else if (given.I && given.R) {
      out = [
        { label: 'Voltage V = I × R', value: `${fmt(I * R)} V` },
        { label: 'Power P = I² × R', value: `${fmt(I * I * R)} W` },
      ];
    }
  }

  const input = (val: string, set: (s: string) => void, label: string, unit: string, self: keyof typeof given) => (
    <div>
      <label className="text-sm font-bold">
        {label} {given[self] && <span className="text-xs text-indigo-500">(given)</span>}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          value={val}
          onChange={(e) => set(e.target.value)}
          inputMode="decimal"
          placeholder={count === 2 && !given[self] ? 'auto' : ''}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
        />
        <span className="w-8 font-mono text-sm font-bold text-slate-400">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h1 className="text-2xl font-black">Ohm's Law Calculator</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          V = I × R. Rendu values enter pannunga, third automatic-a varum. Power um free-a!
        </p>
      </div>
      <Card className="space-y-4 p-5">
        {input(v, setV, 'Voltage', 'V', 'V')}
        {input(i, setI, 'Current', 'A', 'I')}
        {input(r, setR, 'Resistance', 'Ω', 'R')}

        {count < 2 ? (
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Rendu values enter pannunga 👆 (moonu la erase pannitu try pannunga — exactly 2 dhaan!)
          </div>
        ) : (
          <div className="space-y-2">
            {out.map((o) => (
              <div key={o.label} className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 dark:border-emerald-500/40 dark:bg-emerald-500/10">
                <span className="text-sm font-bold">{o.label}</span>
                <span className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">{o.value}</span>
              </div>
            ))}
          </div>
        )}
        {count === 3 && (
          <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            Moonu layum value irukku — ovvonnaium erase pannunga. Exactly 2 given na dhaan solve pannuven (overdetermined!).
          </div>
        )}
      </Card>
    </div>
  );
}

// ---------------- Resistor color code ----------------
const BANDS = [
  { name: 'Black', color: '#000000', digit: 0, mult: 1 },
  { name: 'Brown', color: '#7c4a12', digit: 1, mult: 10 },
  { name: 'Red', color: '#dc2626', digit: 2, mult: 100 },
  { name: 'Orange', color: '#f97316', digit: 3, mult: 1000 },
  { name: 'Yellow', color: '#facc15', digit: 4, mult: 10000 },
  { name: 'Green', color: '#16a34a', digit: 5, mult: 100000 },
  { name: 'Blue', color: '#2563eb', digit: 6, mult: 1000000 },
  { name: 'Violet', color: '#8b5cf6', digit: 7, mult: 10000000 },
  { name: 'Grey', color: '#9ca3af', digit: 8, mult: 100000000 },
  { name: 'White', color: '#f5f5f5', digit: 9, mult: 1000000000 },
];

const TOLERANCES = [
  { name: 'Gold', color: '#d4a017', pct: 5 },
  { name: 'Silver', color: '#c0c0c0', pct: 10 },
  { name: 'Brown', color: '#7c4a12', pct: 1 },
  { name: 'Red', color: '#dc2626', pct: 2 },
];

export function ResistorTool() {
  const [b1, setB1] = useState(1); // brown
  const [b2, setB2] = useState(0); // black
  const [mult, setMult] = useState(2); // red => x100
  const [tol, setTol] = useState(0); // gold 5%

  useEffect(() => {
    awardToolXp('resistor');
  }, []);

  const value = (BANDS[b1].digit * 10 + BANDS[b2].digit) * BANDS[mult].mult;
  const tolPct = TOLERANCES[tol].pct;
  const lo = value * (1 - tolPct / 100);
  const hi = value * (1 + tolPct / 100);

  const select = (idx: number, set: (n: number) => void, n: number) => (
    <select
      value={idx}
      onChange={(e) => set(Number(e.target.value))}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none dark:border-slate-700 dark:bg-slate-900"
    >
      {Array.from({ length: n }).map((_, i) => (
        <option key={i} value={i}>
          {i < BANDS.length ? `${BANDS[i].name} (${BANDS[i].digit})` : ''}
        </option>
      ))}
    </select>
  );

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h1 className="text-2xl font-black">Resistor Color Code</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          4-band resistor: Band 1-2 = digits, Band 3 = multiplier, Band 4 = tolerance.
        </p>
      </div>
      <Card className="space-y-4 p-5">
        {/* Visual resistor */}
        <div className="flex justify-center">
          <div className="flex h-14 w-72 items-center rounded-lg bg-[#d8c9a3] px-6 shadow-inner">
            <div className="flex w-full justify-around">
              {[BANDS[b1], BANDS[b2], BANDS[mult], TOLERANCES[tol]].map((band, i) => (
                <span key={i} className="h-10 w-4 rounded-sm" style={{ backgroundColor: band.color }} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className="text-xs font-bold">Band 1</label>
            <div className="mt-1">{select(b1, setB1, 10)}</div>
          </div>
          <div>
            <label className="text-xs font-bold">Band 2</label>
            <div className="mt-1">{select(b2, setB2, 10)}</div>
          </div>
          <div>
            <label className="text-xs font-bold">Multiplier</label>
            <div className="mt-1">
              <select
                value={mult}
                onChange={(e) => setMult(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none dark:border-slate-700 dark:bg-slate-900"
              >
                {BANDS.map((b, i) => (
                  <option key={i} value={i}>
                    {b.name} (×{fmt(b.mult)})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold">Tolerance</label>
            <div className="mt-1">
              <select
                value={tol}
                onChange={(e) => setTol(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none dark:border-slate-700 dark:bg-slate-900"
              >
                {TOLERANCES.map((t, i) => (
                  <option key={i} value={i}>
                    {t.name} (±{t.pct}%)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-500/40 dark:bg-emerald-500/10">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Resistance
          </div>
          <div className="mt-1 font-mono text-3xl font-black text-emerald-700 dark:text-emerald-300">{fmt(value)} Ω</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Tolerance range: {fmt(lo)} Ω – {fmt(hi)} Ω
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Example: Brown-Black-Red-Gold = 1, 0, ×100 → <b>1 kΩ ±5%</b>. B-and mnemonic: <b>B</b>etter <b>B</b>e <b>R</b>ight
          <b> O</b>r <b>Y</b>our <b>G</b>reat <b>B</b>ig <b>V</b>enture <b>G</b>o <b>W</b>est (Black Brown Red Orange Yellow Green Blue Violet Grey White).
        </p>
      </Card>
    </div>
  );
}

// ---------------- Series / parallel resistance ----------------
export function SeriesParallelTool() {
  const [items, setItems] = useState<string[]>(['1000', '2200']);

  useEffect(() => {
    awardToolXp('series-parallel');
  }, []);

  const nums = items.map((s) => parseFloat(s)).filter((n) => !isNaN(n) && n > 0);
  const series = useMemo(() => nums.reduce((a, b) => a + b, 0), [nums]);
  const parallel = useMemo(
    () => (nums.length ? 1 / nums.reduce((a, b) => a + 1 / b, 0) : NaN),
    [nums],
  );

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h1 className="text-2xl font-black">Series / Parallel Resistance</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Series na add (R = R1+R2+...), parallel na reciprocal add (1/R = 1/R1 + 1/R2 + ...).
        </p>
      </div>
      <Card className="space-y-4 p-5">
        <div className="space-y-2">
          {items.map((val, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-10 font-mono text-xs font-bold text-slate-400">R{i + 1}</span>
              <input
                value={val}
                inputMode="decimal"
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  setItems(next);
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setItems([...items, ''])}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 px-4 py-2.5 text-sm font-bold text-indigo-500 hover:bg-indigo-50 dark:border-indigo-500/40 dark:hover:bg-indigo-500/10"
        >
          <Plus className="h-4 w-4" /> Add resistor
        </button>

        {nums.length >= 1 && (
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-4 text-center dark:border-indigo-500/40 dark:bg-indigo-500/10">
              <div className="text-xs font-bold uppercase text-indigo-500">Series total</div>
              <div className="mt-1 font-mono text-2xl font-black">{fmt(series)} Ω</div>
              <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">always bigger than biggest R</div>
            </div>
            <div className="rounded-xl border border-cyan-300 bg-cyan-50 p-4 text-center dark:border-cyan-500/40 dark:bg-cyan-500/10">
              <div className="text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400">Parallel total</div>
              <div className="mt-1 font-mono text-2xl font-black">{fmt(parallel)} Ω</div>
              <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">always smaller than smallest R</div>
            </div>
          </div>
        )}
        {nums.length === 2 && parallel < Math.min(...nums) && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            <Award className="h-4 w-4" /> Parallel result smallest resistor vidayum chinna-va irukku — correct formula! (Sanity check pass)
          </div>
        )}
      </Card>
    </div>
  );
}
