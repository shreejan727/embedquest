// ============================================================
// EMBEDQUEST — Tools hub
// ============================================================
import { Binary, CircuitBoard, Columns3, FlaskConical, Grid3x3, Palette, Sigma, Terminal, Waves } from 'lucide-react';
import { Card } from '../components/common';
import { Link } from '../lib/router';
import { t } from '../lib/i18n';
import { useProgress } from '../lib/progress';

const TOOLS = [
  { to: '/tools/lab', icon: <FlaskConical className="h-6 w-6" />, title: 'Circuit Lab 🧪', desc: 'Animated circuit sims (Ohm, RC, LED) + real Falstad lab', world: 'World 5' },
  { to: '/tools/converter', icon: <Binary className="h-6 w-6" />, title: 'Number Converter', desc: 'Binary, decimal, hex, octal — live conversion', world: 'World 2' },
  { to: '/tools/gates', icon: <CircuitBoard className="h-6 w-6" />, title: 'Logic Gate Simulator', desc: 'Toggle switches, see gates output live', world: 'World 4' },
  { to: '/tools/ohm', icon: <Sigma className="h-6 w-6" />, title: "Ohm's Law Calculator", desc: 'V, I, R — enter any two, get the third', world: 'World 5' },
  { to: '/tools/resistor', icon: <Palette className="h-6 w-6" />, title: 'Resistor Color Code', desc: '4-band colors → resistance value', world: 'World 5' },
  { to: '/tools/series-parallel', icon: <Columns3 className="h-6 w-6" />, title: 'Series/Parallel R', desc: 'Add resistors, get both totals', world: 'World 5' },
  { to: '/tools/breadboard', icon: <Grid3x3 className="h-6 w-6" />, title: 'Virtual Breadboard', desc: 'Learn rows, columns & rails safely', world: 'World 5' },
  { to: '/tools/arduino', icon: <Waves className="h-6 w-6" />, title: 'Arduino Pin Explorer', desc: 'UNO pinout, PWM pins, analog pins', world: 'World 6' },
  { to: '/tools/playground', icon: <Terminal className="h-6 w-6" />, title: 'C Code Playground ⚡', desc: 'Write C code — REAL runs in your browser', world: 'World 3' },
];

export function ToolsView() {
  const progress = useProgress();
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black sm:text-3xl">{t('tools_h1')}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('tools_sub')}
        </p>
      </div>
      {progress.language === 'english' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          ℹ️ {t('tools_content_note')}
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link key={t.to} to={t.to}>
            <Card className="h-full p-4">
              <div className="text-indigo-500">{t.icon}</div>
              <div className="mt-2 font-bold">{t.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{t.desc}</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">{t.world}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
