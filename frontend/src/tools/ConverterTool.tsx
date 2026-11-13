// ============================================================
// EMBEDQUEST — Tool: number base converter (bin/oct/dec/hex)
// ============================================================
import { useEffect, useState } from 'react';
import { awardToolXp } from '../lib/progress';
import { Card } from '../components/common';

const BASES = [
  { base: 2, label: 'Binary (base 2)', pattern: /^[01]+$/ },
  { base: 8, label: 'Octal (base 8)', pattern: /^[0-7]+$/ },
  { base: 10, label: 'Decimal (base 10)', pattern: /^\d+$/ },
  { base: 16, label: 'Hexadecimal (base 16)', pattern: /^[0-9a-fA-F]+$/ },
];

export function ConverterTool() {
  const [base, setBase] = useState(10);
  const [raw, setRaw] = useState('42');

  useEffect(() => {
    awardToolXp('converter');
  }, []);

  const def = BASES.find((b) => b.base === base)!;
  const valid = def.pattern.test(raw.trim()) && raw.trim() !== '';
  const num = valid ? parseInt(raw.trim(), base) : NaN;

  const rows = BASES.map((b) => ({
    ...b,
    value: valid ? num.toString(b.base).toUpperCase() : '—',
  }));

  // Two's complement preview for 8-bit when decimal fits
  const twoComp =
    valid && Number.isInteger(num) && num >= -128 && num <= 255
      ? (num < 0 ? num + 256 : num).toString(2).padStart(8, '0')
      : null;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h1 className="text-2xl font-black">Number Converter</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Ovvoru base um live-a convert aagum. World 2 lessons uda connect pannunga!
        </p>
      </div>

      <Card className="space-y-4 p-5">
        <div>
          <label className="text-sm font-bold">Input base</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {BASES.map((b) => (
              <button
                key={b.base}
                onClick={() => setBase(b.base)}
                className={`rounded-xl border px-2 py-2 text-sm font-bold transition-colors ${
                  base === b.base
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                {b.base === 16 ? 'HEX' : b.base === 10 ? 'DEC' : b.base === 2 ? 'BIN' : 'OCT'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold">Value ({def.label})</label>
          <input
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 font-mono text-lg outline-none dark:bg-slate-900 ${
              valid ? 'border-slate-200 dark:border-slate-700' : 'border-rose-400'
            }`}
          />
          {!valid && raw.trim() !== '' && (
            <p className="mt-1 text-xs font-semibold text-rose-500">
              Base {base} ku invalid character! (Example: base 2 la 0/1 mattum)
            </p>
          )}
        </div>

        <div className="space-y-2">
          {rows.map((r) => (
            <div
              key={r.base}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                r.base === base
                  ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-500/40 dark:bg-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {r.base === 2 ? 'Binary' : r.base === 8 ? 'Octal' : r.base === 10 ? 'Decimal' : 'Hex'}
              </span>
              <span className="break-all font-mono text-lg font-bold">{r.value}</span>
            </div>
          ))}
        </div>

        {twoComp && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
            <div className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              8-bit view (two's complement ready)
            </div>
            <div className="mt-1 font-mono text-lg font-bold tracking-widest">{twoComp}</div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              {num >= 0 && num <= 127
                ? 'Positive number — MSB (leftmost bit) = 0'
                : num >= 128
                  ? 'Unsigned interpretation ≥ 128 → MSB = 1'
                  : 'Negative decimal → two\'s complement bit pattern'}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
