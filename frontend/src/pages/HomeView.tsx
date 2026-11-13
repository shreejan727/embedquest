// ============================================================
// EMBEDQUEST — Home dashboard
// Level/XP, streak, daily mission, continue learning, world
// progress, weak topics, badges, project progress.
// ============================================================
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  Hammer,
  Layers,
  Target,
  Zap,
} from 'lucide-react';
import { Btn, Card, ProgressBar } from '../components/common';
import { WorldIcon } from '../components/WorldIcon';
import { Link, navigate } from '../lib/router';
import { BADGES, currentStreak, getDailyMission, levelProgress, missionDone, rankFromXp, useProgress } from '../lib/progress';
import { ALL_LESSONS, getLesson, getWorld, getWorldLessonIds, getWorlds, isWorldUnlocked } from '../lib/curriculum';
import { t } from '../lib/i18n';

/** First incomplete lesson, following the catch-up plan if present (unlocked worlds only). */
function nextLessonTarget(
  completed: Set<string>,
  bossIds: Set<string>,
  plan: string[],
): { id: string; title: string } | null {
  const order: string[] = plan.length ? plan : getWorlds().filter((w) => w.num < 12).map((w) => w.id);
  for (const wid of order) {
    if (!isWorldUnlocked(wid, completed, bossIds)) continue;
    for (const lesson of ALL_LESSONS.filter((l) => l.worldId === wid)) {
      if (!completed.has(lesson.id)) return { id: lesson.id, title: lesson.title };
    }
  }
  return null;
}

export function HomeView() {
  const progress = useProgress();
  const lp = levelProgress(progress.xp);
  const streak = currentStreak(progress.activeDays);
  const completed = new Set(Object.keys(progress.lessons));
  const bossPassed = new Set(progress.badges.filter((b) => b.startsWith('boss-')).map((b) => b.replace('boss-', '')));
  const target = nextLessonTarget(completed, bossPassed, progress.diagnostic.plan);
  const mission = getDailyMission();
  const doneMission = missionDone(progress);
  const totalDone = completed.size;
  const overallPct = Math.round((totalDone / ALL_LESSONS.length) * 100);
  const earned = BADGES.filter((b) => progress.badges.includes(b.id));
  const projectEntries = Object.entries(progress.projects).filter(([, p]) => p.completedAt);

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">
            {t('greet', { name: progress.onboarding.name })}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t('home_sub', { rank: rankFromXp(progress.xp) })}
          </p>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Zap className="h-4 w-4 text-amber-500" /> Level {lp.level}
            </span>
            <span className="font-mono text-xs font-bold text-indigo-500">{progress.xp} XP</span>
          </div>
          <ProgressBar pct={lp.pct} className="mt-2.5" />
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            {t('xp_to_next', { into: lp.into, need: lp.need })}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Flame className="h-4 w-4 text-orange-500" /> {t('streak_label')}
            </span>
            <span className="text-2xl font-black text-orange-500">{streak}🔥</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            {streak > 0 ? t('streak_alive') : t('streak_start')}
          </div>
        </Card>

        <Card className={`p-4 ${doneMission ? 'border-emerald-300 dark:border-emerald-500/40' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Target className="h-4 w-4 text-indigo-500" /> {t('daily_mission')}
            </span>
            {doneMission && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          </div>
          <div className="mt-2 text-sm font-bold leading-snug">{mission.title}</div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            +{mission.xp} XP bonus · {doneMission ? t('mission_done') : mission.desc}
          </div>
        </Card>
      </div>

      {/* Continue learning */}
      <Card className="eq-grid-bg relative overflow-hidden p-5 sm:p-6">
        <div className="absolute -right-6 -top-6 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-4xl">
          🎯
        </div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-500">{t('mission_zone')}</h2>
        {target ? (
          <>
            <div className="mt-1 text-xl font-black">{target.title}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              World {getLesson(target.id)?.worldId.replace('w', '')} ·{' '}
              {getLesson(target.id)?.minutes} min · +40 XP
            </div>
            <Btn className="mt-4 px-6" onClick={() => navigate(`/lesson/${target.id}`)}>
              {t('continue_learning')} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Btn>
          </>
        ) : (
          <>
            <div className="mt-1 text-xl font-black">{t('all_done_title')}</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('all_done_msg')}
            </p>
            <Btn className="mt-4 px-6" onClick={() => navigate('/projects')}>
              {t('go_projects')} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Btn>
          </>
        )}
      </Card>

      {/* World progress */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <Layers className="h-5 w-5 text-indigo-500" /> {t('world_progress')}
          </h2>
          <Link to="/worlds" className="text-sm font-bold text-indigo-500">
            {t('world_map_link')}
          </Link>
        </div>
        <ProgressBar pct={overallPct} className="mt-3" />
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {t('overall', { done: totalDone, total: ALL_LESSONS.length, pct: overallPct })}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {getWorlds().map((w) => {
            const ids = getWorldLessonIds(w.id);
            const done = ids.filter((id) => completed.has(id)).length;
            const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;
            return (
              <Link
                to={`/world/${w.id}`}
                key={w.id}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 transition-colors hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${w.color}`}
                >
                  <WorldIcon icon={w.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold">{w.title}</span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                    {done}/{ids.length || '—'} · {pct}%
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Weak topics + badges row */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-5">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <BookOpen className="h-5 w-5 text-rose-500" /> {t('weak_topics')}
          </h2>
          {progress.revisions.length ? (
            <div className="mt-3 space-y-2">
              {progress.revisions.slice(0, 5).map((id) => {
                const l = getLesson(id);
                return (
                  <Link
                    to={`/lesson/${id}`}
                    key={id}
                    className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold transition-colors hover:border-rose-400 dark:border-rose-500/30 dark:bg-rose-500/10"
                  >
                    <span className="truncate">{l?.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-rose-500" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {t('weak_empty')}
            </p>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <Award className="h-5 w-5 text-amber-500" /> {t('recent_achievements')}
          </h2>
          {earned.length ? (
            <div className="mt-3 space-y-2">
              {earned.slice(-4).reverse().map((b) => (
                <div key={b.id} className="flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm dark:border-amber-500/30 dark:bg-amber-500/10">
                  🏅 <b>{b.name}</b>
                  <span className="truncate text-xs text-slate-500 dark:text-slate-400">— {b.desc}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {t('badges_empty')}
            </p>
          )}
        </Card>
      </div>

      {/* Projects progress */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <Hammer className="h-5 w-5 text-orange-500" /> {t('practical_projects')}
          </h2>
          <Link to="/projects" className="text-sm font-bold text-indigo-500">
            {t('all_projects_link')}
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {projectEntries.length
            ? t('projects_done', { n: projectEntries.length })
            : t('projects_none')}
        </p>
      </Card>
    </div>
  );
}
