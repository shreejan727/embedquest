// ============================================================
// EMBEDQUEST — cloud progress sync (Supabase PostgreSQL)
//
// Source of truth for authenticated users = Supabase.
// LocalStorage remains a cache + works offline (guest mode).
//
// Reconcile algorithm (protects against stale overwrites):
//   1. Pull cloud snapshot (user_progress.state jsonb).
//   2. mergeProgress(cloud, local) — item-wise newest-wins.
//   3. Hydrate local store with the merged result (no re-sync loop).
//   4. Push the merged result back up.
// Runs on login, on reconnect, and debounced after every change.
// ============================================================
import { getSnapshot, hydrateState, subscribe, currentStreak, levelFromXp, isDirty } from './progress';
import { mergeProgress } from './progressMerge';
import { isCloudEnabled, supabase } from './supabase';
import { ALL_LESSONS, getWorlds, isWorldUnlocked } from './curriculum';
import type { ProgressState } from './types';

let pushTimer: ReturnType<typeof setTimeout> | null = null;
let pushing = false;
let pendingAfterPush = false;
let detachListener: (() => void) | null = null;
let lastError = '';
let lastErrorAt = '';

function warn(scope: string, err: unknown) {
  lastError = err instanceof Error ? err.message : String(err);
  lastErrorAt = new Date().toISOString();
  console.warn(`[cloudSync] ${scope}:`, err);
}

export function getSyncError(): { message: string; at: string } {
  return { message: lastError, at: lastErrorAt };
}

/** First incomplete lesson across unlocked worlds (dashboard-consistent). */
function currentTargets(s: ProgressState): { world: string; lesson: string | null } {
  const completed = new Set(Object.keys(s.lessons));
  const bossIds = new Set(s.badges.filter((b) => b.startsWith('boss-')).map((b) => b.replace('boss-', '')));
  for (const w of getWorlds().filter((w) => w.num < 12)) {
    if (!isWorldUnlocked(w.id, completed, bossIds)) continue;
    for (const l of ALL_LESSONS.filter((x) => x.worldId === w.id)) {
      if (!completed.has(l.id)) return { world: w.id, lesson: l.id };
    }
    // world complete but boss not passed yet
    if (!bossIds.has(w.id) && ALL_LESSONS.some((x) => x.worldId === w.id)) {
      return { world: w.id, lesson: null };
    }
  }
  return { world: 'w1', lesson: null };
}

// ----------------------------------------------------------
// PUSH (local merged state → cloud)
// ----------------------------------------------------------
export async function pushState(userId: string, s: ProgressState): Promise<boolean> {
  if (!supabase) return false;
  const targets = currentTargets(s);
  const updatedAt = new Date().toISOString();

  try {
    // 1. Whole-snapshot summary row (user_progress)
    const { error: e1 } = await supabase.from('user_progress').upsert(
      {
        user_id: userId,
        total_xp: s.xp,
        level: levelFromXp(s.xp),
        streak: currentStreak(s.activeDays),
        current_world: targets.world,
        current_lesson: targets.lesson,
        state: s, // full snapshot jsonb — authoritative for merge
        updated_at: updatedAt,
      },
      { onConflict: 'user_id' },
    );
    if (e1) throw e1;

    // 2. Per-lesson rows (idempotent upsert)
    const lessonRows = Object.entries(s.lessons).map(([lessonId, rec]) => ({
      user_id: userId,
      lesson_id: lessonId,
      completed: true,
      quiz_score: rec.score,
      task_done: rec.taskDone,
      completed_at: rec.completedAt,
      updated_at: rec.completedAt,
    }));
    if (lessonRows.length) {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert(lessonRows, { onConflict: 'user_id,lesson_id' });
      if (error) throw error;
    }

    // 3. Per-project rows
    const projectRows = Object.entries(s.projects).map(([projectId, rec]) => ({
      user_id: userId,
      project_id: projectId,
      completed: Boolean(rec.completedAt),
      checklist_data: rec.checked,
      completed_at: rec.completedAt ?? null,
      updated_at: rec.completedAt ?? updatedAt,
    }));
    if (projectRows.length) {
      const { error } = await supabase
        .from('project_progress')
        .upsert(projectRows, { onConflict: 'user_id,project_id' });
      if (error) throw error;
    }

    // 4. Quiz attempts (attempt history)
    const attemptRows = (s.attempts ?? []).map((a) => ({
      id: a.id,
      user_id: userId,
      quiz_id: a.quizId,
      kind: a.kind,
      score: a.score,
      attempted_at: a.at,
    }));
    if (attemptRows.length) {
      const { error } = await supabase
        .from('quiz_attempts')
        .upsert(attemptRows, { onConflict: 'id' });
      if (error) throw error;
    }

    // 5. Daily activity (per-date XP)
    const dayRows = Object.entries(s.dailyXp ?? {}).map(([date, xp]) => ({
      user_id: userId,
      activity_date: date,
      xp_earned: xp,
    }));
    if (dayRows.length) {
      const { error } = await supabase
        .from('daily_activity')
        .upsert(dayRows, { onConflict: 'user_id,activity_date' });
      if (error) throw error;
    }

    lastError = '';
    // Stamp successful sync locally — ONLY if the snapshot hasn't
    // changed while the push was in flight (otherwise a real change
    // would be reverted; it will be pushed by its own scheduled push).
    if (getSnapshot() === s) {
      hydrateState({ ...s, lastSyncedAt: updatedAt });
    }
    return true;
  } catch (err) {
    warn('push', err);
    return false;
  }
}

// ----------------------------------------------------------
// RECONCILE (cloud ← merge → both) — runs on login/reconnect
// ----------------------------------------------------------
export async function reconcile(userId: string): Promise<void> {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('state, updated_at')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw error;

    const local = getSnapshot();
    const cloudState = (data?.state ?? null) as ProgressState | null;

    if (!cloudState) {
      // New cloud account → first push migrates local progress.
      await pushState(userId, local);
      return;
    }

    // Cloud row exists → merge (cloud is base unless local is newer).
    const merged = mergeProgress(cloudState, local);
    hydrateState(merged);
    await pushState(userId, merged);
  } catch (err) {
    warn('reconcile', err);
  }
}

// ----------------------------------------------------------
// AUTO-SYNC attach/detach (called by AuthProvider)
// ----------------------------------------------------------
export function attachCloudSync(userId: string): void {
  if (!isCloudEnabled || !supabase) return;
  detachCloudSync();

  // initial reconcile (also migrates local-only progress on first login)
  void reconcile(userId);

  const onChange = () => {
    // Hydration (lastSyncedAt stamping) also fires listeners — only
    // schedule a push when there are real unsynced local changes.
    if (!isDirty()) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      pushTimer = null;
      if (pushing) {
        pendingAfterPush = true;
        return;
      }
      pushing = true;
      const s = getSnapshot();
      await pushState(userId, s);
      pushing = false;
      if (pendingAfterPush) {
        pendingAfterPush = false;
        void pushState(userId, getSnapshot());
      }
    }, 2000);
  };
  const unsub = subscribe(onChange);

  // Reconnect after being offline → full reconcile
  const onOnline = () => void reconcile(userId);
  window.addEventListener('online', onOnline);

  detachListener = () => {
    unsub();
    window.removeEventListener('online', onOnline);
    if (pushTimer) {
      clearTimeout(pushTimer);
      pushTimer = null;
    }
    // best-effort final flush
    void pushState(userId, getSnapshot());
  };
}

export function detachCloudSync(): void {
  detachListener?.();
  detachListener = null;
  pendingAfterPush = false;
}
