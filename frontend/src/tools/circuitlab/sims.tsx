// ============================================================
// EMBEDQUEST — Circuit Lab: animated syllabus simulations
// (Ohm's law flow, series/parallel, RC charging, LED + resistor)
// All physics is textbook-simple and rendered as live SVG with
// animated charge flow. Runs offline, Tanglish hints included.
// ============================================================
import { useRef, useState } from 'react';
import { dotsAlong, fmtAmps, LabeledSlider, Readout, SimFrame, useRaf, useTick, type Pt } from './shared';

const WIRE = 'stroke-slate-400 dark:stroke-slate-500';
const DOT = 'fill-cyan-500 dark:fill-cyan-400';

// ------------------------------------------------------------
// 1. Ohm's law: battery → resistor → lamp, animated current flow
// ------------------------------------------------------------
export function OhmSim() {
  const [v, setV] = useState(12);
  const [r, setR] = useState(200);
  const phase = useRef(0);
  const i = v / r; // amps
  const power = v * i; // watts
  const speed = Math.min(180, 6 + i * 90); // px/s along the wire
  const brightness = Math.max(0.04, Math.min(1, power / 30));

  useRaf(true, (dt) => {
    phase.current += speed * dt;
  });
  useTick();

  const loop: Pt[] = [
    [40, 40], [300, 40], [300, 140], [40, 140],
  ];
  const dots = dotsAlong([loop[0], loop[1], loop[2], loop[3], loop[0]], 24, phase.current);

  return (
    <SimFrame
      title="Ohm's Law — I = V / R"
      hint={
        <>
          Voltage aethina → current aegum; Resistance aethina → current kammi aagum. Lamp brightness = power (P = V × I).
          Slider izaaru → dots speed paarunga! ⚡
        </>
      }
    >
      <svg viewBox="0 0 340 180" className="mx-auto block h-auto w-full max-w-md text-slate-700 dark:text-slate-200">
        {/* wires */}
        <polyline points="40,40 300,40" fill="none" className={WIRE} strokeWidth={2} />
        <polyline points="300,40 300,140 40,140 40,40" fill="none" className={WIRE} strokeWidth={2} />
        {/* battery (left) */}
        <line x1={30} y1={70} x2={50} y2={70} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={35} y1={85} x2={45} y2={85} className="stroke-indigo-500" strokeWidth={2} />
        <line x1={30} y1={100} x2={50} y2={100} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={35} y1={115} x2={45} y2={115} className="stroke-indigo-500" strokeWidth={2} />
        <line x1={40} y1={40} x2={40} y2={70} className={WIRE} strokeWidth={2} />
        <line x1={40} y1={115} x2={40} y2={140} className={WIRE} strokeWidth={2} />
        <text x={20} y={65} className="fill-indigo-500 text-[9px] font-bold">+</text>
        {/* resistor (top, zigzag) */}
        <polyline
          points="150,40 160,32 170,48 180,32 190,48 200,32 210,40"
          fill="none"
          className="stroke-amber-500"
          strokeWidth={2.5}
        />
        <line x1={40} y1={40} x2={150} y2={40} className={WIRE} strokeWidth={2} />
        <line x1={210} y1={40} x2={300} y2={40} className={WIRE} strokeWidth={2} />
        <text x={158} y={22} className="fill-amber-500 text-[10px] font-bold">{r} Ω</text>
        {/* lamp (right) with glow */}
        <circle cx={300} cy={90} r={16} className="stroke-slate-500" fill="none" strokeWidth={2} />
        <line x1={289} y1={79} x2={311} y2={101} className="stroke-slate-500" strokeWidth={2} />
        <line x1={311} y1={79} x2={289} y2={101} className="stroke-slate-500" strokeWidth={2} />
        <circle cx={300} cy={90} r={16} fill="rgba(250, 204, 21, 0.35)" opacity={brightness} />
        <circle cx={300} cy={90} r={26} fill="rgba(250, 204, 21, 0.25)" opacity={brightness * 0.7} />
        <text x={322} y={94} className="fill-slate-400 text-[10px] font-bold">Lamp</text>
        {/* animated current dots */}
        {dots.map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r={3.2} className={DOT} opacity={i > 0.0001 ? 1 : 0.15} />
        ))}
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <LabeledSlider label="Voltage" value={v} min={1} max={24} step={0.5} onChange={setV} display={`${v.toFixed(1)} V`} />
        <LabeledSlider label="Resistance" value={r} min={10} max={1000} step={10} onChange={setR} display={`${r} Ω`} />
        <Readout label="Current (I)" value={fmtAmps(i)} accent />
        <Readout label="Power (P)" value={power < 0.01 ? `${(power * 1000).toFixed(1)} mW` : `${power.toFixed(2)} W`} />
      </div>
    </SimFrame>
  );
}

// ------------------------------------------------------------
// 2. Series vs parallel with two resistors
// ------------------------------------------------------------
export function SeriesParallelSim() {
  const [r1, setR1] = useState(100);
  const [r2, setR2] = useState(200);
  const [parallel, setParallel] = useState(false);
  const phase = useRef(0);
  const V = 12;

  const req = parallel ? (r1 * r2) / (r1 + r2) : r1 + r2;
  const it = V / req;
  const i1 = parallel ? V / r1 : it;
  const i2 = parallel ? V / r2 : it;
  const speed = Math.min(170, 6 + it * 90);

  useRaf(true, (dt) => {
    phase.current += speed * dt;
  });
  useTick();

  // series loop: battery left, R1 top-left, R2 top-right
  const seriesLoop: Pt[] = [[36, 40], [300, 40], [300, 150], [36, 150]];
  const dots = dotsAlong([seriesLoop[0], seriesLoop[1], seriesLoop[2], seriesLoop[3], seriesLoop[0]], 24, phase.current);

  // parallel: battery left, two branches between x=140 and x=290 (y=60 top, y=130 bottom)
  const topBranch: Pt[] = [[140, 60], [290, 60]];
  const bottomBranch: Pt[] = [[140, 130], [290, 130]];
  const d1 = dotsAlong(topBranch, 22, phase.current * Math.max(0.15, i1 / Math.max(it, 0.0001)));
  const d2 = dotsAlong(bottomBranch, 22, phase.current * Math.max(0.15, i2 / Math.max(it, 0.0001)));
  const feeder: Pt[] = [[36, 95], [140, 95], [140, 60], [140, 130], [290, 60], [290, 95], [320, 95]];
  const feederDots = dotsAlong([feeder[0], feeder[1], feeder[2], feeder[3], feeder[4], feeder[5], feeder[6]], 24, phase.current);

  return (
    <SimFrame
      title="Series vs Parallel — R1 · R2"
      hint={
        parallel ? (
          <>
            <b>Parallel:</b> rendu vazhi — current piriyum (I₁ + I₂), resistance <i>koraiyum</i>. Formula: R = (R₁·R₂)/(R₁+R₂) = {req.toFixed(1)} Ω
          </>
        ) : (
          <>
            <b>Series:</b> oru vazhi dhaan — same current ella resistorum oda flow aagum, resistance <i>aagum</i>. R = R₁+R₂ = {req} Ω
          </>
        )
      }
    >
      <svg viewBox="0 0 340 190" className="mx-auto block h-auto w-full max-w-md text-slate-700 dark:text-slate-200">
        {/* battery */}
        <line x1={26} y1={80} x2={46} y2={80} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={31} y1={95} x2={41} y2={95} className="stroke-indigo-500" strokeWidth={2} />
        <line x1={26} y1={110} x2={46} y2={110} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={31} y1={125} x2={41} y2={125} className="stroke-indigo-500" strokeWidth={2} />
        <text x={16} y={76} className="fill-indigo-500 text-[9px] font-bold">+</text>

        {!parallel ? (
          <>
            <polyline points="36,40 300,40 300,150 36,150 36,95" fill="none" className={WIRE} strokeWidth={2} />
            <line x1={36} y1={95} x2={36} y2={80} className={WIRE} strokeWidth={2} />
            <line x1={36} y1={125} x2={36} y2={150} className={WIRE} strokeWidth={2} />
            {/* R1 zigzag */}
            <polyline points="110,40 120,32 130,48 140,32 150,48 160,32 170,40" fill="none" className="stroke-amber-500" strokeWidth={2.5} />
            <line x1={36} y1={40} x2={110} y2={40} className={WIRE} strokeWidth={2} />
            <line x1={170} y1={40} x2={300} y2={40} className={WIRE} strokeWidth={2} />
            <text x={118} y={22} className="fill-amber-500 text-[10px] font-bold">R₁ {r1}Ω</text>
            {/* R2 zigzag */}
            <polyline points="200,40 210,32 220,48 230,32 240,48 250,32 260,40" fill="none" className="stroke-rose-500" strokeWidth={2.5} />
            <line x1={170} y1={40} x2={200} y2={40} className={WIRE} strokeWidth={2} />
            <line x1={260} y1={40} x2={300} y2={40} className={WIRE} strokeWidth={2} />
            <text x={208} y={22} className="fill-rose-500 text-[10px] font-bold">R₂ {r2}Ω</text>
            {dots.map(([x, y], k) => (
              <circle key={k} cx={x} cy={y} r={3.2} className={DOT} />
            ))}
          </>
        ) : (
          <>
            {/* feeders */}
            <polyline points="36,80 36,95 140,95" fill="none" className={WIRE} strokeWidth={2} />
            <polyline points="36,125 36,95" fill="none" className={WIRE} strokeWidth={2} />
            <line x1={140} y1={95} x2={140} y2={60} className={WIRE} strokeWidth={2} />
            <line x1={140} y1={95} x2={140} y2={130} className={WIRE} strokeWidth={2} />
            <line x1={290} y1={60} x2={290} y2={95} className={WIRE} strokeWidth={2} />
            <line x1={290} y1={130} x2={290} y2={95} className={WIRE} strokeWidth={2} />
            <line x1={290} y1={95} x2={320} y2={95} className={WIRE} strokeWidth={2} />
            {/* R1 (top branch) */}
            <polyline points="175,60 185,52 195,68 205,52 215,68 225,52 235,60" fill="none" className="stroke-amber-500" strokeWidth={2.5} />
            <line x1={140} y1={60} x2={175} y2={60} className={WIRE} strokeWidth={2} />
            <line x1={235} y1={60} x2={290} y2={60} className={WIRE} strokeWidth={2} />
            <text x={180} y={45} className="fill-amber-500 text-[10px] font-bold">R₁ {r1}Ω</text>
            {/* R2 (bottom branch) */}
            <polyline points="175,130 185,122 195,138 205,122 215,138 225,122 235,130" fill="none" className="stroke-rose-500" strokeWidth={2.5} />
            <line x1={140} y1={130} x2={175} y2={130} className={WIRE} strokeWidth={2} />
            <line x1={235} y1={130} x2={290} y2={130} className={WIRE} strokeWidth={2} />
            <text x={180} y={158} className="fill-rose-500 text-[10px] font-bold">R₂ {r2}Ω</text>
            {feederDots.map(([x, y], k) => (
              <circle key={`f${k}`} cx={x} cy={y} r={3.2} className="fill-indigo-500 dark:fill-indigo-400" />
            ))}
            {d1.map(([x, y], k) => (
              <circle key={`a${k}`} cx={x} cy={y} r={3} className={DOT} />
            ))}
            {d2.map(([x, y], k) => (
              <circle key={`b${k}`} cx={x} cy={y} r={3} className={DOT} />
            ))}
          </>
        )}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <LabeledSlider label="R1" value={r1} min={10} max={1000} step={10} onChange={setR1} display={`${r1} Ω`} />
        <LabeledSlider label="R2" value={r2} min={10} max={1000} step={10} onChange={setR2} display={`${r2} Ω`} />
        <Readout label="R total" value={`${req.toFixed(1)} Ω`} accent />
        <Readout label={parallel ? 'I1 / I2' : 'Current'} value={parallel ? `${fmtAmps(i1)} / ${fmtAmps(i2)}` : fmtAmps(it)} />
      </div>
      <button
        onClick={() => setParallel((p) => !p)}
        className="mt-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-black text-white eq-chunky"
      >
        {parallel ? '← Series aakunga' : 'Parallel aakunga →'}
      </button>
    </SimFrame>
  );
}

// ------------------------------------------------------------
// 3. RC charging / discharging with mini scope
// ------------------------------------------------------------
export function RCSim() {
  const [rk, setRk] = useState(10); // kΩ
  const [cuF, setCuF] = useState(10); // µF
  const [charging, setCharging] = useState(true);
  const t = useRef(0);
  const vc0 = useRef(0); // voltage when mode switched
  const hist = useRef<number[]>([]);

  const V = 9;
  const tau = (rk * 1000) * (cuF * 1e-6); // seconds
  const vc = charging ? V * (1 - Math.exp(-t.current / tau)) : vc0.current * Math.exp(-t.current / tau);

  useRaf(true, (dt) => {
    t.current += dt;
    if (hist.current.length > 240) hist.current.shift();
    hist.current.push(charging ? V * (1 - Math.exp(-t.current / tau)) : vc0.current * Math.exp(-t.current / tau));
  });
  useTick();

  function toggle() {
    const cur = charging ? V * (1 - Math.exp(-t.current / tau)) : vc0.current * Math.exp(-t.current / tau);
    vc0.current = cur;
    t.current = 0;
    hist.current = [];
    setCharging((c) => !c);
  }

  // capacitor fill + scope polyline
  const fill = Math.max(0, Math.min(1, vc / V));
  const scopePts = hist.current
    .map((val, k) => `${30 + (k / 239) * 260},${86 - (val / V) * 60}`)
    .join(' ');

  return (
    <SimFrame
      title="RC Circuit — charging & discharging"
      hint={
        <>
          τ (tau) = R × C = {(tau * 1000).toFixed(0)} ms — idhu dhaan circuit oda "time sense". 5 τ la ≈ 99% full!
          {charging ? ' Ippo charging — capacitor fill aagudu 🔄' : ' Ippo discharging — stored energy release aagudu 🔻'}
        </>
      }
    >
      <svg viewBox="0 0 340 190" className="mx-auto block h-auto w-full max-w-md text-slate-700 dark:text-slate-200">
        {/* battery */}
        <line x1={26} y1={62} x2={46} y2={62} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={31} y1={77} x2={41} y2={77} className="stroke-indigo-500" strokeWidth={2} />
        <line x1={26} y1={92} x2={46} y2={92} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={31} y1={107} x2={41} y2={107} className="stroke-indigo-500" strokeWidth={2} />
        <polyline points="36,62 36,40 130,40 130,86" fill="none" className={WIRE} strokeWidth={2} />
        <polyline points="36,107 36,150 130,150 130,104" fill="none" className={WIRE} strokeWidth={2} />
        {/* resistor */}
        <polyline points="130,86 138,78 146,94 154,78 162,94 170,78 178,86" fill="none" className="stroke-amber-500" strokeWidth={2.5} />
        <polyline points="178,86 178,104 130,104" fill="none" className={WIRE} strokeWidth={2} />
        <text x={128} y={70} className="fill-amber-500 text-[10px] font-bold">{rk} kΩ</text>
        {/* capacitor plates */}
        <line x1={118} y1={104} x2={142} y2={104} className="stroke-slate-500" strokeWidth={3} />
        <line x1={118} y1={150} x2={142} y2={150} className="stroke-slate-500" strokeWidth={3} />
        {/* charge fill between plates */}
        <rect x={122} y={150 - fill * 46} width={16} height={fill * 46} className="fill-cyan-500/40" />
        <text x={150} y={128} className="fill-cyan-500 text-[10px] font-bold">{vc.toFixed(2)} V</text>
        <text x={104} y={170} className="fill-slate-400 text-[10px] font-bold">C = {cuF} µF</text>
        {/* mini scope */}
        <rect x={20} y={20} width={280} height={72} rx={6} className="fill-slate-950 stroke-slate-700" strokeWidth={1.5} />
        <line x1={30} y1={86} x2={300} y2={86} className="stroke-slate-700" strokeWidth={1} strokeDasharray="3 3" />
        <polyline points={scopePts} fill="none" className="stroke-emerald-400" strokeWidth={2} />
        <text x={210} y={34} className="fill-slate-500 text-[9px] font-bold">Vc(t) scope</text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <LabeledSlider label="R" value={rk} min={1} max={50} step={1} onChange={setRk} display={`${rk} kΩ`} />
        <LabeledSlider label="C" value={cuF} min={1} max={100} step={1} onChange={setCuF} display={`${cuF} µF`} />
        <Readout label="τ = RC" value={tau < 0.1 ? `${(tau * 1000).toFixed(0)} ms` : `${tau.toFixed(2)} s`} accent />
        <Readout label="Capacitor Vc" value={`${vc.toFixed(2)} V (${(fill * 100).toFixed(0)}%)`} />
      </div>
      <button onClick={toggle} className="mt-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-black text-white eq-chunky">
        {charging ? '→ Discharge pannu' : '→ Charge pannu'}
      </button>
    </SimFrame>
  );
}

// ------------------------------------------------------------
// 4. LED + protective resistor
// ------------------------------------------------------------
export function LedSim() {
  const [vs, setVs] = useState(5);
  const [r, setR] = useState(220);
  const phase = useRef(0);
  const VF = 2.0; // red LED forward voltage
  const i = Math.max(0, (vs - VF) / r); // amps
  const brightness = Math.max(0, Math.min(1, i / 0.02));
  const over = i > 0.03; // >30mA — danger zone
  const dead = i <= 0;
  const speed = Math.min(180, 6 + i * 3000);

  useRaf(true, (dt) => {
    phase.current += speed * dt;
  });
  useTick();

  return (
    <SimFrame
      title="LED + Resistor — why the resistor matters"
      hint={
        over ? (
          <span className="font-bold text-rose-500">💥 Overcurrent! R romba kammi — LED ponga/eriyum! (safe range: ~5–20 mA)</span>
        ) : dead ? (
          <>LED OFF 😴 — supply voltage {vs}V, aana LED ku minimum <b>2V (forward voltage)</b> venum. Vs aethunga illa LED eriyadhu.</>
        ) : (
          <>Resistor = LED oda bodyguard 🛡️ — current limit pannum. I = (Vs − Vf) / R. Safe zone ≈ 5–20 mA.</>
        )
      }
    >
      <svg viewBox="0 0 340 180" className="mx-auto block h-auto w-full max-w-md text-slate-700 dark:text-slate-200">
        {/* wires */}
        <polyline points="40,40 300,40" fill="none" className={WIRE} strokeWidth={2} />
        <polyline points="300,40 300,140 40,140 40,40" fill="none" className={WIRE} strokeWidth={2} />
        {/* battery */}
        <line x1={30} y1={70} x2={50} y2={70} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={35} y1={85} x2={45} y2={85} className="stroke-indigo-500" strokeWidth={2} />
        <line x1={30} y1={100} x2={50} y2={100} className="stroke-indigo-500" strokeWidth={3} />
        <line x1={35} y1={115} x2={45} y2={115} className="stroke-indigo-500" strokeWidth={2} />
        <text x={20} y={65} className="fill-indigo-500 text-[9px] font-bold">+</text>
        <text x={22} y={130} className="fill-slate-400 text-[10px] font-bold">{vs} V</text>
        {/* resistor */}
        <polyline points="140,40 150,32 160,48 170,32 180,48 190,32 200,40" fill="none" className="stroke-amber-500" strokeWidth={2.5} />
        <line x1={40} y1={40} x2={140} y2={40} className={WIRE} strokeWidth={2} />
        <line x1={200} y1={40} x2={300} y2={40} className={WIRE} strokeWidth={2} />
        <text x={148} y={22} className="fill-amber-500 text-[10px] font-bold">{r} Ω</text>
        {/* LED: triangle + bar, pointing down on right wire */}
        <polygon points="300,64 288,86 312,86" className={over ? 'fill-rose-500' : 'fill-rose-500'} opacity={dead ? 0.25 : 0.35 + brightness * 0.65} />
        <line x1={288} y1={90} x2={312} y2={90} className="stroke-slate-500" strokeWidth={3} />
        {/* glow */}
        {brightness > 0.02 && (
          <circle cx={300} cy={78} r={20} fill="rgba(244,63,94,0.3)" opacity={brightness * 0.8} />
        )}
        <text x={322} y={80} className="fill-slate-400 text-[10px] font-bold">LED</text>
        {/* current dots */}
        {dotsAlong([[40, 40], [140, 40], [200, 40], [300, 40]], 24, phase.current).map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r={3} className={DOT} opacity={dead ? 0.1 : 1} />
        ))}
        {dotsAlong([[300, 40], [300, 140], [40, 140], [40, 40]], 24, phase.current + 90).map(([x, y], k) => (
          <circle key={`b${k}`} cx={x} cy={y} r={3} className={DOT} opacity={dead ? 0.1 : 1} />
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <LabeledSlider label="Supply (Vs)" value={vs} min={0} max={12} step={0.5} onChange={setVs} display={`${vs.toFixed(1)} V`} />
        <LabeledSlider label="Resistor (R)" value={r} min={10} max={1000} step={10} onChange={setR} display={`${r} Ω`} />
        <Readout label="LED current" value={fmtAmps(i)} accent />
        <Readout label="Vf (red LED)" value="2.0 V" />
      </div>
      {over && (
        <div className="mt-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-500 dark:text-rose-400">
          💥 Overcurrent ({fmtAmps(i)}) — R aethu (min {Math.ceil((vs - VF) / 0.02 / 10) * 10} Ω for 20 mA) illa LED ponga!
        </div>
      )}
    </SimFrame>
  );
}
