// ============================================================
// EMBEDQUEST — cloud progress MERGE engine (pure functions)
//
// Strategy: item-wise "newest wins" for per-item records
// (lessons, projects, tasks, daily XP) + union for additive
// collections (badges, active days, revisions) + newer-wins
// for singleton preferences (theme, onboarding, diagnostic,
// toolXp, dailyMission). XP and scalars come from the NEWER
// whole snapshot, then item-wise merges layer on top.
//
// No imports besides types → safely unit-testable in Node.
// ============================================================
import type { ProgressState } from './types';

function iso(x: string | undefined): number {
  if (!x) return 0;
  const t = Date.parse(x);
  return isNaN(t) ? 0 : t;
}

function unionStrings(a: string[], b: string[]): string[] {
  return Array.from(new Set([...a, ...b]));
}

/** Merge two progress snapshots. `newer` wins conflicts item-wise. */
export function mergeProgress(a: ProgressState, b: ProgressState): ProgressState {
  const aNewer = iso(a.updatedAt) >= iso(b.updatedAt);
  // Base snapshot = the NEWER one (scalar fields: xp, onboarding...).
  const base = aNewer ? a : b;
  const other = aNewer ? b : a;

  // ---- lessons: union of ids, newest completedAt wins per lesson ----
  const lessonIds = unionStrings(Object.keys(base.lessons), Object.keys(other.lessons));
  const lessons: ProgressState['lessons'] = {};
  for (const id of lessonIds) {
    const x = base.lessons[id];
    const y = other.lessons[id];
    if (!x) lessons[id] = y;
    else if (!y) lessons[id] = x;
    else lessons[id] = iso(x.completedAt) >= iso(y.completedAt) ? x : y;
  }

  // ---- tasks: newest timestamp wins per task ----
  const taskIds = unionStrings(Object.keys(base.tasks), Object.keys(other.tasks));
  const tasks: ProgressState['tasks'] = {};
  for (const id of taskIds) {
    const x = base.tasks[id];
    const y = other.tasks[id];
    if (!x) tasks[id] = y;
    else if (!y) tasks[id] = x;
    else tasks[id] = iso(x) >= iso(y) ? x : y;
  }

  // ---- projects: newest completedAt wins per project (ties -> base) ----
  const projectIds = unionStrings(Object.keys(base.projects), Object.keys(other.projects));
  const projects: ProgressState['projects'] = {};
  for (const id of projectIds) {
    const x = base.projects[id];
    const y = other.projects[id];
    if (!x) projects[id] = y;
    else if (!y) projects[id] = x;
    else projects[id] = iso(x.completedAt ?? '') >= iso(y.completedAt ?? '') ? x : y;
  }

  // ---- dailyXp: per-date max ----
  const dailyXp: ProgressState['dailyXp'] = { ...other.dailyXp };
  for (const [d, v] of Object.entries(base.dailyXp ?? {})) {
    dailyXp[d] = Math.max(dailyXp[d] ?? 0, v);
  }

  // ---- attempts: union, sorted by time, capped ----
  const attempts = [...(base.attempts ?? []), ...(other.attempts ?? [])]
    .sort((x, y) => iso(y.at) - iso(x.at))
    .filter((r, i, arr) => arr.findIndex((z) => z.id === r.id) === i)
    .slice(0, 200);

  // ---- diagnostic: whichever is actually done / newer date wins ----
  const diagnostic =
    iso(base.diagnostic?.date ?? '') >= iso(other.diagnostic?.date ?? '') && base.diagnostic?.done
      ? base.diagnostic
      : other.diagnostic?.done
        ? other.diagnostic
        : base.diagnostic;

  return {
    ...base,
    lessons,
    tasks,
    projects,
    badges: unionStrings(base.badges, other.badges),
    activeDays: unionStrings(base.activeDays, other.activeDays).sort(),
    revisions: Array.from(new Set([...base.revisions, ...other.revisions])).filter((id) => lessons[id] && (lessons[id].score ?? 0) < 70),
    dailyXp,
    attempts,
    diagnostic,
    // toolXp: only meaningful for "today"; keep the one with more entries for today
    toolXp:
      (base.toolXp?.used.length ?? 0) >= (other.toolXp?.used.length ?? 0) ? base.toolXp : other.toolXp,
    dailyMission: base.dailyMission?.date >= other.dailyMission?.date ? base.dailyMission : other.dailyMission,
    updatedAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString(),
  };
}
