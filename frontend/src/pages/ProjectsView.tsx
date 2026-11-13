// ============================================================
// EMBEDQUEST — Projects list + guided project detail
// ============================================================
import { useState } from 'react';
import {
  ArrowLeft,
  BatteryLow,
  CheckCircle2,
  CircuitBoard,
  Code2,
  ListChecks,
  Lock,
  ShieldAlert,
  Target,
  Wrench,
} from 'lucide-react';
import { Btn, Card, ProgressBar } from '../components/common';
import { Link, navigate } from '../lib/router';
import { completeProject, toggleProjectStep, useProgress } from '../lib/progress';
import { getLessonsOfWorld, getProject, PROJECTS } from '../lib/curriculum';
import { t } from '../lib/i18n';

const DIFF_COLOR: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Easy: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  Capstone: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
};

/** World 5 complete or 5 projects attempted -> later ones unlock progressively. */
export function ProjectsView() {
  const progress = useProgress();
  const completedWorld5 =
    getLessonsOfWorld('w5').every((l) => progress.lessons[l.id]) || Object.keys(progress.lessons).length >= 30;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black sm:text-3xl">{t('projects_h1')}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('projects_sub')}
        </p>
      </div>

      {progress.language === 'english' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          ℹ️ {t('project_content_note')}
        </div>
      )}

      {!completedWorld5 && (
        <Card className="border-amber-300 p-4 text-sm dark:border-amber-500/40">
          {t('projects_tip')}
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => {
          const rec = progress.projects[p.id];
          const done = Boolean(rec?.completedAt);
          const checked = rec?.checked.filter(Boolean).length ?? 0;
          const pct = p.checklist.length ? Math.round((checked / p.checklist.length) * 100) : 0;
          return (
            <Link key={p.id} to={`/project/${p.id}`}>
              <Card className={`h-full p-4 ${done ? 'border-emerald-300 dark:border-emerald-500/40' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">#{p.num}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${DIFF_COLOR[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                </div>
                <div className="mt-2 font-black">{p.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{p.objective}</div>
                <ProgressBar pct={pct} className="mt-3" barClass={done ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : undefined} />
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <span>{checked}/{p.checklist.length} checks · +{p.xp} XP</span>
                  {done && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectView({ projectId }: { projectId: string }) {
  const progress = useProgress();
  const project = getProject(projectId);
  const [tab, setTab] = useState<'guide' | 'code' | 'explain' | 'checklist'>('guide');

  if (!project) return <Card className="p-6 text-center">{t('project_notfound')}</Card>;

  const rec = progress.projects[project.id];
  const checked = rec?.checked ?? Array(project.checklist.length).fill(false);
  const doneCount = checked.filter(Boolean).length;
  const allDone = project.checklist.length > 0 && doneCount === project.checklist.length;
  const claimed = Boolean(rec?.completedAt);

  const tabs = [
    { id: 'guide' as const, label: 'Guide + Circuit', icon: <CircuitBoard className="h-4 w-4" /> },
    { id: 'code' as const, label: 'Code', icon: <Code2 className="h-4 w-4" /> },
    { id: 'explain' as const, label: 'Line-by-line', icon: <Wrench className="h-4 w-4" /> },
    { id: 'checklist' as const, label: 'Checklist', icon: <ListChecks className="h-4 w-4" /> },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Btn variant="ghost" onClick={() => navigate('/projects')}>
        <ArrowLeft className="mr-1 inline h-4 w-4" /> {t('project_back')}
      </Btn>

      {/* Header */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-sm font-bold text-slate-400">#{project.num}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${DIFF_COLOR[project.difficulty]}`}>
            {project.difficulty}
          </span>
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
            +{project.xp} XP
          </span>
          {claimed && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" /> Completed
            </span>
          )}
        </div>
        <h1 className="mt-2 text-2xl font-black">{project.title}</h1>
        <p className="mt-1 flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" /> {project.objective}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800/70">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Components required
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {project.components.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 dark:border-rose-500/40 dark:bg-rose-500/10">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-4 w-4" /> Safety first
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {project.safety.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-rose-500">
              <BatteryLow className="h-3.5 w-3.5" /> Mains (230V) experiment NEVER — low voltage only!
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
              tab === t.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'guide' && (
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-black">Circuit / connection guide</h2>
            <pre className="eq-diagram mt-3 rounded-xl border border-slate-200 bg-slate-100 p-4 font-mono text-[13px] leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-emerald-300">
              {project.circuit}
            </pre>
          </Card>
          <Card className="p-5">
            <h2 className="font-black">Step-by-step build</h2>
            <ol className="mt-3 space-y-2 text-sm">
              {project.steps.map((s, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-indigo-100 font-mono text-xs font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="p-5">
            <h2 className="font-black">Expected output</h2>
            <pre className="eq-diagram mt-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 font-mono text-[13px] text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
              {project.expectedOutput}
            </pre>
          </Card>
          <Card className="p-5">
            <h2 className="font-black">Troubleshooting</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {project.troubleshooting.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-500">⚠</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {tab === 'code' && (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-black">Full code</h2>
            <button
              onClick={() => navigator.clipboard?.writeText(project.code)}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold dark:bg-slate-800"
            >
              Copy code
            </button>
          </div>
          <pre className="eq-diagram mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-[13px] leading-6 text-emerald-300 dark:border-slate-700">
            {project.code}
          </pre>
        </Card>
      )}

      {tab === 'explain' && (
        <Card className="p-5">
          <h2 className="font-black">Line-by-line explanation</h2>
          <div className="mt-3 space-y-3">
            {project.codeExplanation.map((x, i) => (
              <div key={i} className="grid gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800 sm:grid-cols-[auto_1fr]">
                <pre className="eq-diagram rounded-lg bg-slate-950 px-3 py-2 font-mono text-xs text-emerald-300 sm:min-w-[12rem]">
                  {x.code}
                </pre>
                <p className="self-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">{x.note}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'checklist' && (
        <Card className="p-5">
          <h2 className="font-black">Completion checklist</h2>
          <ProgressBar pct={allDone ? 100 : Math.round((doneCount / project.checklist.length) * 100)} className="mt-3" />
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {doneCount}/{project.checklist.length} done
          </div>
          <div className="mt-3 space-y-2">
            {project.checklist.map((item, i) => (
              <label
                key={i}
                className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm transition-colors ${
                  checked[i]
                    ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked[i] ?? false}
                  onChange={() => toggleProjectStep(project.id, project.checklist.length, i)}
                  className="mt-0.5 h-4 w-4 accent-emerald-500"
                />
                <span className="leading-relaxed">{item}</span>
              </label>
            ))}
          </div>

          {claimed ? (
            <div className="mt-4 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
              🏆 Project completed! +{project.xp} XP credited.
            </div>
          ) : allDone ? (
            <Btn variant="success" className="mt-4 w-full py-3" onClick={() => completeProject(project.id, project.xp)}>
              Claim completion 🏆 (+{project.xp} XP)
            </Btn>
          ) : (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Lock className="h-4 w-4" /> {t('projects_lock_note')}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
