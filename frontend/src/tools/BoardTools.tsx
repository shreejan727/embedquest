// ============================================================
// EMBEDQUEST — Tools: virtual breadboard + Arduino pin explorer
// ============================================================
import { useEffect, useState } from 'react';
import { awardToolXp } from '../lib/progress';
import { Card } from '../components/common';

// ---------------- Virtual breadboard ----------------
// 10 columns x (rails + a-e + f-j) educational grid.
// Clicking any hole explains what is connected to it.
const COLS = 10;

export function BreadboardTool() {
  const [sel, setSel] = useState<{ area: string; c: number } | null>(null);

  useEffect(() => {
    awardToolXp('breadboard');
  }, []);

  function info(area: string, c: number): { title: string; desc: string; highlight: [string, number][] } {
    if (area === 'plus') return { title: `+ rail (red line), column ${c + 1}`, desc: 'Full-a horizontal connect aagum — normally +5V inga. Ellaa + rail holes all connected across the row.', highlight: [['plus', c]] };
    if (area === 'minus') return { title: `− rail (blue line), column ${c + 1}`, desc: 'Full-a horizontal connect — normally GND inga. Ellaa − rail holes connected.', highlight: [['minus', c]] };
    if (area === 'top') return { title: `Top block, row a-e, column ${c + 1}`, desc: 'a,b,c,d,e vertical-a connect aagum (inge oru 5-hole strip). Column 1-5 and 6-10 center channel-a separate. LED/resistor legs same column la vecha, automatic-a connect!', highlight: [['top', c]] };
    return { title: `Bottom block, row f-j, column ${c + 1}`, desc: 'f,g,h,i,j vertical-a connect aagum. Center channel la IC vecha, left (a-e) and right (f-j) blocks separate-a irukkum.', highlight: [['bottom', c]] };
  }

  const H = ({ area, c }: { area: string; c: number }) => {
    const active = sel && sel.area === area && sel.c === c;
    const inGroup = sel ? info(sel.area, sel.c).highlight.some(([a2, c2]) => a2 === area && c2 === c) : false;
    return (
      <button
        onClick={() => setSel({ area, c })}
        title={`${area} ${c + 1}`}
        className={`h-3 w-3 rounded-full border transition-colors ${
          active
            ? 'border-indigo-500 bg-indigo-500'
            : inGroup
              ? 'border-indigo-400 bg-indigo-300 dark:bg-indigo-500/60'
              : 'border-slate-300 bg-slate-100 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-800'
        }`}
      />
    );
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div>
        <h1 className="text-2xl font-black">Virtual Breadboard</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Hole-a click pannunga — yedhu yedhu connect aagum nu explain pannum. Solder illama circuit build panna tool idhu!
        </p>
      </div>
      <Card className="p-5">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          {/* rails */}
          <div className="flex items-center gap-1 px-6">
            <span className="w-5 text-right text-[9px] font-bold text-rose-500">+</span>
            {Array.from({ length: COLS }).map((_, c) => (
              <H key={`p${c}`} area="plus" c={c} />
            ))}
          </div>
          <div className="mt-1 flex items-center gap-1 px-6">
            <span className="w-5 text-right text-[9px] font-bold text-blue-500">−</span>
            {Array.from({ length: COLS }).map((_, c) => (
              <H key={`m${c}`} area="minus" c={c} />
            ))}
          </div>
          {/* top block a-e */}
          <div className="mt-3 border-b-2 border-dashed border-slate-300 pb-2 dark:border-slate-600">
            {['a', 'b', 'c', 'd', 'e'].map((row) => (
              <div key={row} className="mt-1 flex items-center gap-1">
                <span className="w-5 text-[9px] font-bold text-slate-400">{row}</span>
                {Array.from({ length: COLS }).map((_, c) => (
                  <H key={`t${row}${c}`} area="top" c={c} />
                ))}
              </div>
            ))}
          </div>
          {/* bottom block f-j */}
          <div className="mt-1">
            {['f', 'g', 'h', 'i', 'j'].map((row) => (
              <div key={row} className="mt-1 flex items-center gap-1">
                <span className="w-5 text-[9px] font-bold text-slate-400">{row}</span>
                {Array.from({ length: COLS }).map((_, c) => (
                  <H key={`b${row}${c}`} area="bottom" c={c} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {sel && (
          <div className="mt-4 rounded-xl border border-indigo-300 bg-indigo-50 p-4 text-sm dark:border-indigo-500/40 dark:bg-indigo-500/10">
            <b>{info(sel.area, sel.c).title}</b>
            <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">{info(sel.area, sel.c).desc}</p>
          </div>
        )}

        <div className="mt-4 rounded-xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          <b>LED + resistor example (classic!):</b> LED long leg (+) → column 1 row e. Resistor oru leg column 1 row d, other leg column 3 row d. Jumper column 3 row a → Arduino pin 13. GND → LED short leg (−) via jumper to − rail. Power on → blink! 🔴
        </div>
      </Card>
    </div>
  );
}

// ---------------- Arduino UNO pin explorer ----------------
interface Pin {
  name: string;
  kind: 'digital' | 'pwm' | 'analog' | 'power' | 'special';
  note: string;
}

const PINS: Pin[] = [
  { name: 'D0 (RX)', kind: 'digital', note: 'Serial receive — USB upload la use aagum, avoid using while uploading!' },
  { name: 'D1 (TX)', kind: 'digital', note: 'Serial transmit — same, avoid during upload.' },
  { name: 'D2', kind: 'digital', note: 'Digital I/O. Interrupt INT0 support (attachInterrupt).' },
  { name: 'D3 (~)', kind: 'pwm', note: 'PWM (analogWrite 0-255) + interrupt INT1.' },
  { name: 'D4', kind: 'digital', note: 'Digital I/O.' },
  { name: 'D5 (~)', kind: 'pwm', note: 'PWM capable.' },
  { name: 'D6 (~)', kind: 'pwm', note: 'PWM capable.' },
  { name: 'D7', kind: 'digital', note: 'Digital I/O — good for buttons.' },
  { name: 'D8', kind: 'digital', note: 'Digital I/O.' },
  { name: 'D9 (~)', kind: 'pwm', note: 'PWM capable.' },
  { name: 'D10 (~)', kind: 'pwm', note: 'PWM + SPI SS (chip select).' },
  { name: 'D11 (~)', kind: 'pwm', note: 'PWM + SPI MOSI.' },
  { name: 'D12', kind: 'digital', note: 'SPI MISO.' },
  { name: 'D13', kind: 'special', note: 'SPI SCK + onboard LED connected! First blink project ithu dhaan.' },
  { name: 'A0', kind: 'analog', note: 'Analog input (analogRead 0-1023). Digital I/O um pannalam.' },
  { name: 'A1', kind: 'analog', note: 'Analog input.' },
  { name: 'A2', kind: 'analog', note: 'Analog input.' },
  { name: 'A3', kind: 'analog', note: 'Analog input.' },
  { name: 'A4', kind: 'analog', note: 'Analog input + I2C SDA!' },
  { name: 'A5', kind: 'analog', note: 'Analog input + I2C SCL!' },
  { name: '5V', kind: 'power', note: 'Regulated 5V output — sensors ku power. Short circuit avoid pannunga!' },
  { name: '3.3V', kind: 'power', note: '3.3V output — low-power modules ku.' },
  { name: 'GND', kind: 'power', note: 'Ground — ellaa circuit um ithu la dhaan complete aagum.' },
  { name: 'VIN', kind: 'power', note: 'External power input (7-12V adapter jack badhila).' },
  { name: 'RESET', kind: 'special', note: 'GND touch pannaa board restart aagum.' },
];

const KIND_COLOR: Record<Pin['kind'], string> = {
  digital: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  pwm: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  analog: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  power: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  special: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
};

export function ArduinoPinsTool() {
  const [pin, setPin] = useState<Pin>(PINS[13]);

  useEffect(() => {
    awardToolXp('arduino');
  }, []);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div>
        <h1 className="text-2xl font-black">Arduino UNO Pin Explorer</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Pin-a click pannunga — yenna use pannalam nu puriyum. ~ symbol = PWM pins!
        </p>
      </div>
      <Card className="p-5">
        <div className="flex flex-wrap gap-1.5">
          {PINS.map((p) => (
            <button
              key={p.name}
              onClick={() => setPin(p)}
              className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-bold transition-colors ${
                pin.name === p.name
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-slate-200 bg-white hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-black">{pin.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${KIND_COLOR[pin.kind]}`}>
              {pin.kind}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pin.note}</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-5">
          <span className="rounded bg-sky-100 px-2 py-1 font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">Digital: 14</span>
          <span className="rounded bg-violet-100 px-2 py-1 font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">PWM: 6</span>
          <span className="rounded bg-emerald-100 px-2 py-1 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">Analog in: 6</span>
          <span className="rounded bg-rose-100 px-2 py-1 font-bold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">Max pin current: 40mA (20mA safe)</span>
          <span className="rounded bg-amber-100 px-2 py-1 font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">Logic: 5V</span>
        </div>
      </Card>
    </div>
  );
}
