// ============================================================
// EMBEDQUEST — Worlds map (RPG style) + single world view
// ============================================================
import { CheckCircle2, Lock, Play, Skull, Star } from 'lucide-react';
import { Btn, Card, ProgressBar } from '../components/common';
import { QuizRunner } from '../components/QuizRunner';
import { WorldIcon } from '../components/WorldIcon';
import { Link, navigate } from '../lib/router';
import { useProgress, bossPassed, passBoss } from '../lib/progress';
import { getWorldLessonIds, getLessonsOfWorld, getWorlds, isWorldUnlocked } from '../lib/curriculum';
import { t } from '../lib/i18n';

export function WorldsView() {
  const progress = useProgress();
  const completed = new Set(Object.keys(progress.lessons));
  const bossIds = new Set(progress.badges.filter((b) => b.startsWith('boss-')).map((b) => b.replace('boss-', '')));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black sm:text-3xl">{t('worldmap_h1')}</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('worldmap_sub')}
        </p>
      </div>

      <div className="eq-grid-bg rounded-2xl border border-slate-200 p-3 dark:border-slate-800 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {getWorlds().map((w) => {
            const ids = getWorldLessonIds(w.id);
            const done = ids.filter((id) => completed.has(id)).length;
            const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;
            const unlocked = isWorldUnlocked(w.id, completed, bossIds);
            const bossDone = w.boss.length > 0 && bossIds.has(w.id);
            const complete = ids.length > 0 && done === ids.length;
            return (
              <Link
                key={w.id}
                to={unlocked ? `/world/${w.id}` : '#'}
                onClick={(e) => {
                  if (!unlocked) e.preventDefault();
                }}
                className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${
                  unlocked
                    ? 'cursor-pointer border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500'
                    : 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-60 dark:border-slate-800 dark:bg-slate-900/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${
                      unlocked ? `bg-gradient-to-br ${w.color} eq-glow` : 'bg-slate-400 dark:bg-slate-700'
                    }`}
                  >
                    {unlocked ? <WorldIcon icon={w.icon} className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        World {w.num}
                      </span>
                      {complete && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      {bossDone && <Star className="h-4 w-4 text-amber-500" />}
                    </div>
                    <div className="truncate font-black">{w.title}</div>
                    <div className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{w.subtitle}</div>
                    {ids.length > 0 && (
                      <>
                        <ProgressBar
                          pct={pct}
                          className="mt-2"
                          barClass={complete ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : undefined}
                        />
                        <div className="mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                          {done}/{ids.length} lessons · Boss: {bossDone ? t('boss_slain') : unlocked ? t('boss_waiting') : t('boss_locked')}
                        </div>
                      </>
                    )}
                    {ids.length === 0 && (
                      <div className="mt-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {t('project_quests')}
                      </div>
                    )}
                  </div>
                  {!unlocked && (
                    <span className="absolute right-3 top-3 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {t('locked')}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function WorldView({ worldId }: { worldId: string }) {
  const progress = useProgress();
  const world = getWorlds().find((w) => w.id === worldId);
  const lessons = getLessonsOfWorld(worldId);
  const completed = new Set(Object.keys(progress.lessons));
  const bossIds = new Set(progress.badges.filter((b) => b.startsWith('boss-')).map((b) => b.replace('boss-', '')));
  const unlocked = isWorldUnlocked(worldId, completed, bossIds);

  if (!world) {
    return <Card className="p-6 text-center">{t('world_notfound')}</Card>;
  }

  if (world.id === 'w12') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${world.color} text-white`}>
            <WorldIcon icon={world.icon} className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black">{world.title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">{world.subtitle}</p>
          </div>
        </div>
        <Card className="p-6 text-center">
          <div className="text-4xl">🛠️</div>
          <h2 className="mt-2 text-xl font-black">{t('build_quests')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
            {t('build_quests_desc')}
          </p>
          <Btn className="mt-4" onClick={() => navigate('/projects')}>
            {t('open_projects')}
          </Btn>
        </Card>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <Card className="p-8 text-center">
        <Lock className="mx-auto h-10 w-10 text-slate-400" />
        <h2 className="mt-3 text-xl font-black">{t('world_locked_h', { n: world.num })}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
          {t('world_locked_desc')}
        </p>
        <Btn className="mt-4" onClick={() => navigate('/worlds')}>
          {t('go_world_map')}
        </Btn>
      </Card>
    );
  }

  // Sequential unlock inside world: lesson i needs lesson i-1 done.
  let prevDone = true;
  const nodes = lessons.map((l, i) => {
    const done = completed.has(l.id);
    const locked = i > 0 && !completed.has(lessons[i - 1].id);
    void prevDone;
    prevDone = done;
    return { l, done, locked };
  });
  const allDone = lessons.length > 0 && lessons.every((l) => completed.has(l.id));
  const bossUnlocked = allDone;
  const bossDone = bossIds.has(world.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${world.color} text-white eq-glow`}>
          <WorldIcon icon={world.icon} className="h-6 w-6" />
        </span>
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            World {world.num}
          </div>
          <h1 className="text-2xl font-black">{world.title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{world.subtitle}</p>
        </div>
      </div>

      {/* Duolingo-style path */}
      <div className="relative mx-auto max-w-md">
        <div className="absolute bottom-8 left-7 top-8 w-0.5 bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-3">
          {nodes.map(({ l, done, locked }) => (
            <div key={l.id} className="relative flex items-center gap-4">
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white ${
                  done
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                    : locked
                      ? 'bg-slate-400 dark:bg-slate-700'
                      : `bg-gradient-to-br ${world.color} eq-glow animate-pulse`
                }`}
              >
                {done ? <CheckCircle2 className="h-6 w-6" /> : locked ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </span>
              <Link
                to={locked ? '#' : `/lesson/${l.id}`}
                onClick={(e) => {
                  if (locked) e.preventDefault();
                }}
                className={`flex-1 rounded-xl border bg-white p-3 dark:bg-slate-900 ${
                  locked
                    ? 'border-slate-200 opacity-60 dark:border-slate-800'
                    : 'border-slate-200 hover:border-indigo-400 dark:border-slate-800 dark:hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">
                      {l.id.replace('w', 'W').replace('l', ' · L')} — {l.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {l.minutes} min · +40 XP · Quiz: {progress.lessons[l.id]?.score ?? '—'}%
                    </div>
                  </div>
                  {done && progress.lessons[l.id]?.taskDone && <span title="Task done">🛠️</span>}
                </div>
              </Link>
            </div>
          ))}

          {/* Boss node */}
          <div className="relative flex items-center gap-4 pt-2">
            <span
              className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white ${
                bossDone
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                  : bossUnlocked
                    ? 'bg-gradient-to-br from-rose-500 to-red-600 eq-glow animate-pulse'
                    : 'bg-slate-400 dark:bg-slate-700'
              }`}
            >
              {bossDone ? <Star className="h-7 w-7" /> : <Skull className="h-7 w-7" />}
            </span>
            <div
              className={`flex-1 rounded-xl border bg-white p-3 dark:bg-slate-900 ${
                bossUnlocked
                  ? 'border-rose-300 dark:border-rose-500/40'
                  : 'border-slate-200 opacity-60 dark:border-slate-800'
              }`}
            >
              <div className="text-sm font-black">{t('boss_battle', { n: world.num })}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {bossDone
                  ? t('conquered')
                  : bossUnlocked
                    ? t('boss_meta', { n: world.boss.length })
                    : t('complete_first', { n: lessons.length })}
              </div>
            </div>
          </div>
        </div>
        {bossUnlocked && !bossDone && (
          <div className="mt-4 text-center">
            <Btn variant="danger" className="px-8" onClick={() => navigate(`/world/${world.id}/boss`)}>
              {t('fight_boss')}
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}

/** Boss battle page (used via route /world/:id/boss). */
export function BossView({ worldId }: { worldId: string }) {
  const progress = useProgress();
  const world = getWorlds().find((w) => w.id === worldId);
  const lessons = getLessonsOfWorld(worldId);
  const completed = new Set(Object.keys(progress.lessons));
  const allDone = lessons.length > 0 && lessons.every((l) => completed.has(l.id));

  if (!world || world.id === 'w12' || !allDone) {
    return (
      <Card className="p-8 text-center">
        <Skull className="mx-auto h-10 w-10 text-slate-400" />
        <h2 className="mt-3 text-xl font-black">{t('boss_wrong_page')}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {t('boss_wrong_desc')}
        </p>
        <Btn className="mt-4" onClick={() => navigate(`/world/${worldId}`)}>
          {t('back_world')}
        </Btn>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="text-center">
        <div className="text-5xl">⚔️</div>
        <h1 className="mt-2 text-2xl font-black">
          {t('boss_h1', { n: world.num, title: world.title })}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {t('boss_sub')}
        </p>
      </div>
      <QuizRunner
        questions={world.boss}
        title={`BOSS: ${world.title}`}
        onDone={(pct) => {
          if (pct >= 70) {
            passBoss(world.id);
            navigate(`/world/${world.id}`);
          }
        }}
      />
      <div className="text-center">
        <Btn variant="ghost" onClick={() => navigate(`/world/${world.id}`)}>
          {t('back_world')}
        </Btn>
      </div>
    </div>
  );
}

