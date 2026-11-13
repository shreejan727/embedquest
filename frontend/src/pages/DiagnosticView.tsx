// ============================================================
// EMBEDQUEST — diagnostic (catch-up) test + plan building
// ============================================================
import { useState } from 'react';
import { Btn, Card } from '../components/common';
import { QuizRunner } from '../components/QuizRunner';
import { navigate } from '../lib/router';
import { finishDiagnostic, useProgress } from '../lib/progress';
import { diagnosticQuestions } from '../data/diagnostic';
import { getWorlds, getWorldLessonIds } from '../lib/curriculum';
import { t } from '../lib/i18n';

export function DiagnosticView() {
  const progress = useProgress();
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  function onAnswered(index: number, correct: boolean) {
    setAnswers((a) => ({ ...a, [index]: correct }));
  }

  function buildPlan(): { scores: Record<string, number>; plan: string[] } {
    // Per-world percent correct (unanswered counts as wrong).
    const perWorld: Record<string, { right: number; total: number }> = {};
    for (const w of getWorlds()) {
      const qs = diagnosticQuestions.filter((q) => q.worldId === w.id);
      if (!qs.length) continue;
      perWorld[w.id] = { right: 0, total: qs.length };
    }
    diagnosticQuestions.forEach((q, i) => {
      const bucket = perWorld[q.worldId];
      if (!bucket) return;
      if (answers[i]) bucket.right += 1;
    });
    const scores: Record<string, number> = {};
    for (const [wid, b] of Object.entries(perWorld)) {
      scores[wid] = Math.round((b.right / b.total) * 100);
    }
    // Plan = weak worlds first (score ascending), world order as tie-break.
    const plan = Object.entries(scores)
      .sort((a, b) => a[1] - b[1])
      .map(([wid]) => wid);
    return { scores, plan };
  }

  function onDone() {
    const { scores, plan } = buildPlan();
    finishDiagnostic(scores, plan);
    setFinished(true);
  }

  if (finished || progress.diagnostic.done) {
    const plan = progress.diagnostic.plan;
    const scores = progress.diagnostic.scores;
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <Card className="p-6 text-center">
          <div className="text-4xl">🧭</div>
          <h1 className="mt-2 text-2xl font-black">{t('diag_ready')}</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
            {t('diag_ready_msg')}
          </p>
        </Card>
        <Card className="p-5">
          {plan.map((wid, i) => {
            const w = getWorlds().find((x) => x.id === wid)!;
            const lessonCount = getWorldLessonIds(wid).length;
            return (
              <div key={wid} className="flex items-center justify-between border-b border-slate-100 py-2.5 last:border-0 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-bold">{w.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{lessonCount} lessons</div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    scores[wid] >= 70
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                      : 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400'
                  }`}
                >
                  {scores[wid]}%
                </span>
              </div>
            );
          })}
        </Card>
        <div className="text-center">
          <Btn
            className="px-8 py-3"
            onClick={() => navigate(plan[0] ? `/world/${plan[0]}` : '/world/w1')}
          >
            {t('diag_start')}
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="text-center">
        <div className="text-4xl">🩺</div>
        <h1 className="mt-2 text-2xl font-black">{t('diag_h1')}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
          {t('diag_msg', { name: progress.onboarding.name })}
        </p>
      </div>
      <QuizRunner
        questions={diagnosticQuestions.map((d) => ({ q: d.q, options: d.options, answer: d.answer, explain: t('diag_explain', { topic: d.topic }) }))}
        title="Diagnostic Test"
        onAnswered={onAnswered}
        onDone={onDone}
      />
    </div>
  );
}
