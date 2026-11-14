// ============================================================
// EMBEDQUEST — Tool: Circuit Lab 🧪
// Tab 1: our own animated syllabus sims (offline, Tanglish)
// Tab 2: the real Falstad CircuitJS engine embedded in an
// iframe (needs internet, English UI) + paste-your-link import.
// ============================================================
import { useEffect, useState } from 'react';
import { FlaskConical, Globe, PlugZap } from 'lucide-react';
import { awardToolXp } from '../lib/progress';
import { Card, Chip } from '../components/common';
import { LedSim, OhmSim, RCSim, SeriesParallelSim } from './circuitlab/sims';

type Tab = 'ohm' | 'sp' | 'rc' | 'led' | 'falstad';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'ohm', label: "⚡ Ohm's Law" },
  { id: 'sp', label: '🔀 Series / Parallel' },
  { id: 'rc', label: '🔋 RC Charging' },
  { id: 'led', label: '💡 LED + Resistor' },
  { id: 'falstad', label: '🌐 Falstad Full Lab' },
];

const FALSTAD_BASE = 'https://www.falstad.com/circuit/circuitjs.html';

function isAllowedFalstadUrl(url: string): boolean {
  return url.startsWith(FALSTAD_BASE) || url.startsWith('https://lushprojects.com/circuitjs/circuitjs.html');
}

export function CircuitLabTool() {
  const [tab, setTab] = useState<Tab>('ohm');
  const [falstadUrl, setFalstadUrl] = useState<string | null>(null);
  const [linkInput, setLinkInput] = useState('');
  const [linkError, setLinkError] = useState(false);

  useEffect(() => {
    awardToolXp('lab');
  }, []);

  function openFalstadLink() {
    if (isAllowedFalstadUrl(linkInput.trim())) {
      setFalstadUrl(linkInput.trim());
      setLinkError(false);
    } else {
      setLinkError(true);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div>
        <h1 className="text-2xl font-black">Circuit Lab 🧪</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Chip className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
            <PlugZap className="h-3.5 w-3.5" /> Animated sims — offline
          </Chip>
          <Chip className="bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400">
            <Globe className="h-3.5 w-3.5" /> Falstad engine — needs internet
          </Chip>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Syllabus circuits live-a sim pannunga: slider izaaru → current flow, brightness, charging — ellam real-time
          animation. Full experiment venumna Falstad lab (real SPICE-style simulator) — adhuvam inga embed pannirukken.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${
              tab === t.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card className="p-5">
        {tab === 'ohm' && <OhmSim />}
        {tab === 'sp' && <SeriesParallelSim />}
        {tab === 'rc' && <RCSim />}
        {tab === 'led' && <LedSim />}
        {tab === 'falstad' && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
              <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Idhu <b>Falstad CircuitJS</b> — real-time circuit simulator (SPICE style). English UI, internet venum.
                Menu la <b>Circuits →</b> ready-made circuits (LED, transistor, op-amp...) open pannunga; Draw la components
                vechu unga circuit pannunga. Current flow animation <i>automatic</i>! 👌
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFalstadUrl(FALSTAD_BASE)}
                className="rounded-xl bg-indigo-500 px-4 py-2 text-xs font-black text-white eq-chunky"
              >
                {falstadUrl ? '🔄 Reload full lab' : 'Load full lab ▶'}
              </button>
              <a
                href={falstadUrl ?? FALSTAD_BASE}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold dark:bg-slate-800"
              >
                Open in new tab ↗
              </a>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Unga circuit link import — Falstad la File → Export As Link copy panni inga paste pannunga
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  value={linkInput}
                  onChange={(e) => {
                    setLinkInput(e.target.value);
                    setLinkError(false);
                  }}
                  spellCheck={false}
                  placeholder="https://www.falstad.com/circuit/circuitjs.html?ctz=…"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-950 p-2.5 font-mono text-[12px] text-sky-300 outline-none focus:border-indigo-500 dark:border-slate-700"
                />
                <button
                  onClick={openFalstadLink}
                  className="shrink-0 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-black text-white eq-chunky"
                >
                  Open link
                </button>
              </div>
              {linkError && (
                <p className="mt-1 text-[11px] font-semibold text-rose-500">
                  Adhu Falstad / lushprojects circuit link maari theriyala — full URL paste pannunga (circuitjs.html?…).
                </p>
              )}
            </div>
            {falstadUrl && (
              <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
                <iframe
                  key={falstadUrl}
                  src={falstadUrl}
                  title="Falstad CircuitJS simulator"
                  className="h-[560px] w-full bg-white"
                  allow="fullscreen"
                />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
