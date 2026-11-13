// ============================================================
// EMBEDQUEST — quiz engine
// One question at a time, instant feedback with Tanglish
// explanation, final score. Used by lessons, boss battles and
// the diagnostic test. Teaching style: wrong answers get an
// explanation, never just "wrong".
// ============================================================
import { useState } from 'react';
import { CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../lib/types';
import { t } from '../lib/i18n';
import { Btn, Card, ProgressBar } from './common';

export function QuizRunner({
  questions,
  onDone,
  title = 'Quiz Time!',
  allowRetry = true,
  onAnswered,
}: {
  questions: QuizQuestion[];
  onDone: (scorePct: number) => void;
  title?: string;
  allowRetry?: boolean;
  /** Per-question callback (used by the diagnostic). */
  onAnswered?: (index: number, correct: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions.length) return null;
  const q = questions[idx];

  function choose(i: number) {
    if (picked !== null) return; // already answered
    setPicked(i);
    const ok = i === q.answer;
    if (ok) setCorrectCount((c) => c + 1);
    onAnswered?.(idx, ok);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      onDone(Math.round((correctCount / questions.length) * 100));
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  }

  function retry() {
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const pass = pct >= 70;
    return (
      <Card className="p-6 text-center">
        <div className="text-5xl">{pass ? '🎉' : '🤔'}</div>
        <h3 className="mt-3 text-2xl font-black">
          {correctCount}/{questions.length} — {pct}%
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
          {pass
            ? t('quiz_pass_msg')
            : t('quiz_fail_msg')}
        </p>
        {allowRetry && (
          <div className="mt-4 flex justify-center gap-2">
            <Btn variant="ghost" onClick={retry}>
              {t('retry_quiz')}
            </Btn>
            {pass && <Btn onClick={() => onDone(pct)}>{t('quiz_continue')}</Btn>}
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black">{title}</h3>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Q {idx + 1}/{questions.length}
        </span>
      </div>
      <ProgressBar pct={((idx + (picked !== null ? 1 : 0)) / questions.length) * 100} className="mt-3" />

      <p className="mt-4 text-base font-semibold leading-relaxed">{q.q}</p>

      <div className="mt-4 grid gap-2">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isAnswer = i === q.answer;
          const revealed = picked !== null;
          let cls =
            'border-slate-200 bg-white hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500';
          if (revealed && isAnswer)
            cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10';
          else if (revealed && isPicked && !isAnswer)
            cls = 'border-rose-500 bg-rose-50 dark:bg-rose-500/10';
          else if (revealed) cls = 'border-slate-200 bg-white opacity-60 dark:bg-slate-900';
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${cls}`}
            >
              <span>
                <span className="mr-2 font-mono text-xs text-slate-400">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </span>
              {revealed && isAnswer && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />}
              {revealed && isPicked && !isAnswer && <XCircle className="h-5 w-5 shrink-0 text-rose-500" />}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${
            picked === q.answer
              ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
              : 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10'
          }`}
        >
          <span className="font-bold">{picked === q.answer ? t('correct') : t('wrong_prompt')}</span>
          {q.explain}
        </div>
      )}

      {picked !== null && (
        <div className="mt-4 flex justify-end">
          <Btn onClick={next}>
            {idx + 1 >= questions.length ? t('finish') : t('next')} <ChevronRight className="ml-1 inline h-4 w-4" />
          </Btn>
        </div>
      )}
    </Card>
  );
}
