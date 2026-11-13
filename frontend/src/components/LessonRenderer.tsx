// ============================================================
// EMBEDQUEST — lesson page renderer
// Renders lesson sections by kind, then the practical task.
// Quiz + completion live in LessonView (pages/LessonView.tsx).
// ============================================================
import {
  AlertTriangle,
  FlaskConical,
  GraduationCap,
  Heart,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Puzzle,
} from 'lucide-react';
import type { Lesson, LessonSection, SectionKind } from '../lib/types';
import { t } from '../lib/i18n';
import { Card, SectionTitle } from './common';

const KIND_STYLE: Record<
  SectionKind,
  { color: string; icon: typeof Lightbulb; label?: string }
> = {
  intro: { color: 'bg-sky-500', icon: MessageCircle },
  explain: { color: 'bg-indigo-500', icon: GraduationCap },
  analogy: { color: 'bg-pink-500', icon: Heart },
  visual: { color: 'bg-cyan-500', icon: Puzzle },
  technical: { color: 'bg-violet-500', icon: FlaskConical },
  example: { color: 'bg-emerald-500', icon: Lightbulb },
  mistakes: { color: 'bg-amber-500', icon: AlertTriangle },
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} className="leading-relaxed">
          {p}
        </p>
      ))}
    </>
  );
}

function SectionBlock({ section }: { section: LessonSection }) {
  const style = KIND_STYLE[section.kind];
  const Icon = style.icon;
  return (
    <Card className="p-5">
      <SectionTitle color={style.color}>
        <Icon className="h-5 w-5 text-slate-400" />
        {section.heading}
      </SectionTitle>
      {section.body && (
        <div className="mt-3 space-y-3 text-[15px] text-slate-700 dark:text-slate-300">
          <Paragraphs text={section.body} />
        </div>
      )}
      {section.list && (
        <ul className="mt-3 space-y-2 text-[15px] text-slate-700 dark:text-slate-300">
          {section.list.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.code && (
        <pre className="eq-diagram mt-3 rounded-xl border border-slate-200 bg-slate-100 p-4 font-mono text-[13px] leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-emerald-300">
          {section.code}
        </pre>
      )}
    </Card>
  );
}

export function LessonRenderer({
  lesson,
  taskDone,
  onMarkTask,
}: {
  lesson: Lesson;
  taskDone: boolean;
  onMarkTask: () => void;
}) {
  return (
    <div className="space-y-4">
      {lesson.sections.map((s, i) => (
        <SectionBlock key={i} section={s} />
      ))}

      <Card className="border-emerald-300 p-5 dark:border-emerald-500/40">
        <SectionTitle color="bg-emerald-500">
          <ListChecks className="h-5 w-5 text-slate-400" />
          {t('practical_task', { title: lesson.task.title })}
        </SectionTitle>
        <ol className="mt-3 space-y-2 text-[15px] text-slate-700 dark:text-slate-300">
          {lesson.task.steps.map((step, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-100 font-mono text-xs font-bold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        {taskDone ? (
          <div className="mt-4 rounded-xl bg-emerald-100 px-4 py-2.5 text-sm font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
            {t('task_done_msg')}
          </div>
        ) : (
          <button
            onClick={onMarkTask}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 eq-chunky px-4 py-3 text-sm font-bold text-white"
          >
            {t('task_btn')}
          </button>
        )}
      </Card>
    </div>
  );
}
