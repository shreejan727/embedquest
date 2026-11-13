// ============================================================
// EMBEDQUEST — lesson flow: sections → task → quiz → XP/next
// ============================================================
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, PartyPopper, Repeat } from 'lucide-react';
import { Btn, Card, ProgressBar } from '../components/common';
import { LessonRenderer } from '../components/LessonRenderer';
import { QuizRunner } from '../components/QuizRunner';
import { Link, navigate } from '../lib/router';
import { completeLesson, markTaskDone, useProgress } from '../lib/progress';
import { getLesson, getWorld, lessonNeighbors } from '../lib/curriculum';
import { t } from '../lib/i18n';

export function LessonView({ lessonId }: { lessonId: string }) {
  const progress = useProgress();
  const lesson = getLesson(lessonId);
  const [phase, setPhase] = useState<'read' | 'quiz' | 'done'>('read');
  const [lastScore, setLastScore] = useState<number | null>(null);

  if (!lesson) {
    return <Card className="p-6 text-center">{t('lesson_notfound')}</Card>;
  }

  const world = getWorld(lesson.worldId);
  const record = progress.lessons[lesson.id];
  const { prev, next } = lessonNeighbors(lesson);
  const step = phase === 'read' ? 1 : phase === 'quiz' ? 2 : 3;

  function startQuiz() {
    setPhase('quiz');
    window.scrollTo({ top: 0 });
  }

  function finishQuiz(score: number) {
    setLastScore(score);
    if (score >= 70) {
      completeLesson(lesson!.id, score);
      setPhase('done');
    }
    // below 70: QuizRunner shows retry UI automatically
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link to={`/world/${lesson.worldId}`} className="text-indigo-500">
            World {world?.num}: {world?.title}
          </Link>
          <span>·</span>
          <span>{lesson.minutes} min · +40 XP</span>
        </div>
        <h1 className="mt-1 text-2xl font-black sm:text-3xl">{lesson.title}</h1>
        {record && phase === 'read' && (
          <div className="mt-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            {t('lesson_already', { score: record.score })}
          </div>
        )}
      </div>

      {progress.language === 'english' && phase === 'read' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          ℹ️ {t('content_note')}
        </div>
      )}

      <ProgressBar pct={(step / 3) * 100} />

      {/* Read phase */}
      {phase === 'read' && (
        <>
          <LessonRenderer
            lesson={lesson}
            taskDone={Boolean(progress.tasks[lesson.id])}
            onMarkTask={() => markTaskDone(lesson.id)}
          />
          <div className="flex justify-between gap-2">
            {prev ? (
              <Btn variant="ghost" onClick={() => navigate(`/lesson/${prev.id}`)}>
                <ArrowLeft className="mr-1 inline h-4 w-4" /> {t('prev_lesson')}
              </Btn>
            ) : (
              <span />
            )}
            <Btn onClick={startQuiz}>
              {t('take_quiz')} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Btn>
          </div>
        </>
      )}

      {/* Quiz phase */}
      {phase === 'quiz' && (
        <QuizRunner
          questions={lesson.quiz}
          title={`${lesson.title} — Quiz`}
          onDone={finishQuiz}
        />
      )}

      {/* Done phase */}
      {phase === 'done' && (
        <Card className="p-8 text-center">
          <div className="text-6xl"><PartyPopper className="mx-auto h-14 w-14 text-amber-500" /></div>
          <h2 className="mt-3 text-2xl font-black">{t('lesson_complete')}</h2>
          <div className="mt-2 flex items-center justify-center gap-3 text-sm">
            <span className="rounded-full bg-indigo-100 px-3 py-1 font-bold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
              +40 XP
            </span>
            {lastScore === 100 && (
              <span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
                +10 {t('perfect_bonus')}
              </span>
            )}
          </div>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {lastScore === 100 ? t('done_full') : t('done_ok')}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {next && (
              <Btn onClick={() => navigate(`/lesson/${next.id}`)}>
                {t('next_lesson', { title: next.title })} <ArrowRight className="ml-1 inline h-4 w-4" />
              </Btn>
            )}
            <Btn variant="ghost" onClick={() => navigate(`/world/${lesson.worldId}`)}>
              {t('world_map')}
            </Btn>
          </div>
        </Card>
      )}

      {/* Bottom quick nav */}
      <Card className="flex items-center justify-between p-3 text-sm">
        <Link to={`/lesson/${lesson.id}`} className="flex items-center gap-1.5 font-bold text-indigo-500">
          <BookOpen className="h-4 w-4" /> {t('lesson_top')}
        </Link>
        <div className="flex gap-2">
          {prev && (
            <Link to={`/lesson/${prev.id}`} className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ArrowLeft className="h-4 w-4" /> {prev.title.slice(0, 18)}…
            </Link>
          )}
          {next && (
            <Link to={`/lesson/${next.id}`} className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              {next.title.slice(0, 18)}… <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </Card>

      {/* Revisit controls when done */}
      {record && phase === 'read' && (
        <div className="flex justify-center">
          <Btn variant="ghost" onClick={startQuiz}>
            <Repeat className="mr-1 inline h-4 w-4" /> {t('retake_quiz')}
          </Btn>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex justify-center text-xs text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="mr-1 inline h-4 w-4 text-emerald-500" /> {t('progress_saved')}
        </div>
      )}
    </div>
  );
}
