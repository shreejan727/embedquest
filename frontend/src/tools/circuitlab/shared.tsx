// ============================================================
// EMBEDQUEST — Circuit Lab shared bits (SVG sim helpers)
// ============================================================
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** requestAnimationFrame loop with dt in seconds (clamped to 50ms). */
export function useRaf(active: boolean, callback: (dt: number) => void) {
  const ref = useRef(callback);
  ref.current = callback;
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ref.current(dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}

/** Re-render counter driven by an rAF loop; returns the tick number. */
export function useTick(active = true): number {
  const [tick, setTick] = useState(0);
  useRaf(active, () => setTick((t) => (t + 1) % 1000000));
  return tick;
}

export type Pt = [number, number];

/** Total polyline length. */
export function polyLen(pts: Pt[]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) {
    l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return l;
}

/** Points along a closed polyline at even spacing, phase-shifted by `offset`. */
export function dotsAlong(pts: Pt[], spacing: number, offset: number): Pt[] {
  const total = polyLen(pts);
  const dots: Pt[] = [];
  if (total <= 0) return dots;
  const step = ((offset % total) + total) % total;
  let d = 0;
  while (d < total) {
    const target = (step + d) % total;
    dots.push(pointAt(pts, target));
    d += spacing;
  }
  return dots;
}

function pointAt(pts: Pt[], target: number): Pt {
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc + seg >= target) {
      const t = seg === 0 ? 0 : (target - acc) / seg;
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
    }
    acc += seg;
  }
  return pts[pts.length - 1];
}

// ---------- small UI pieces ----------

export function SimFrame({ title, hint, children }: { title: string; hint: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 overflow-hidden rounded-lg">{children}</div>
      <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">💡 {hint}</p>
    </div>
  );
}

export function LabeledSlider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
        {props.label}
        <span className="font-mono text-indigo-500 dark:text-indigo-300">{props.display}</span>
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="mt-1 w-full accent-indigo-500"
      />
    </label>
  );
}

export function Readout({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg px-2.5 py-1.5 ${
        accent
          ? 'bg-indigo-50 dark:bg-indigo-500/10'
          : 'bg-slate-100 dark:bg-slate-800'
      }`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`font-mono text-sm font-bold ${accent ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
        {value}
      </div>
    </div>
  );
}

export function fmtAmps(a: number): string {
  if (a >= 1) return `${a.toFixed(2)} A`;
  if (a >= 0.001) return `${(a * 1000).toFixed(1)} mA`;
  return `${(a * 1e6).toFixed(0)} µA`;
}
