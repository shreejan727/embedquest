// ============================================================
// EMBEDQUEST — progress store (LocalStorage backed)
// Tiny observable store so any component can read progress with
// useProgress() and mutations stay consistent (XP, streak, badges).
// Data shape is backend-ready: one JSON object, plain values only.
// ============================================================
import { useSyncExternalStore } from 'react';
import { DEFAULT_PROGRESS, type ProgressState } from './types';

const STORAGE_KEY = 'embedquest-progress-v1';

let state: ProgressState = load();
const listeners = new Set<() => void>();
/** True when there are local changes not yet pushed to the cloud. */
let dirty = false;

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    // Merge over defaults so new fields survive app updates.
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full/blocked — app still works, progress just won't persist
  }
}

function set(next: ProgressState, opts: { touch?: boolean } = {}) {
  // `touch` updates the mutation timestamp used for cloud-sync ordering.
  // Hydration from cloud passes touch:false to avoid a sync feedback loop.
  state = opts.touch === false ? next : { ...next, updatedAt: new Date().toISOString() };
  if (opts.touch !== false) dirty = true;
  save();
  listeners.forEach((l) => l());
}

/** True when there are local changes not yet pushed to the cloud. */
export function isDirty(): boolean {
  return dirty;
}

/** Replace the whole state from the cloud sync layer WITHOUT marking it
 *  as a new local mutation and WITHOUT triggering the auto-sync push. */
export function hydrateState(next: ProgressState) {
  dirty = false; // hydrated state is fully in sync (or will be pushed by caller)
  set(next, { touch: false });
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): ProgressState {
  return state;
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// ---------------- date helpers (local time) ----------------
export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

export function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** Mark today as an active day. Meaningful actions only (never for clicks). */
function stampActivity(s: ProgressState): ProgressState {
  const t = today();
  if (!s.activeDays.includes(t)) s.activeDays = [...s.activeDays, t];
  return s;
}

// ---------------- levels & ranks ----------------
export const XP_PER_LEVEL = 150;

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function levelProgress(xp: number): { level: number; into: number; need: number; pct: number } {
  const level = levelFromXp(xp);
  const into = xp - (level - 1) * XP_PER_LEVEL;
  return { level, into, need: XP_PER_LEVEL, pct: Math.round((into / XP_PER_LEVEL) * 100) };
}

const RANKS: { at: number; name: string }[] = [
  { at: 0, name: 'Spark' },
  { at: 600, name: 'Chip' },
  { at: 1200, name: 'Circuit' },
  { at: 2000, name: 'Logic' },
  { at: 3000, name: 'Byte' },
  { at: 4200, name: 'Signal' },
  { at: 5600, name: 'Core' },
  { at: 7200, name: 'Embed' },
  { at: 9000, name: 'Quest Master' },
];

export function rankFromXp(xp: number): string {
  let name = RANKS[0].name;
  for (const r of RANKS) if (xp >= r.at) name = r.name;
  return name;
}

// ---------------- XP awards ----------------
export const XP = {
  lesson: 40, // completing a lesson + passing its quiz
  perfectQuiz: 10, // 100% on the lesson quiz
  task: 15, // marking the tiny practical task as done
  boss: 100, // passing a world boss quiz
  diagnostic: 30, // finishing the diagnostic test
  tool: 5, // first tool use per day
  project: 0, // per-project, defined in project data
};

/** Add XP for a meaningful action. Also tracks per-day XP for daily_activity. */
function awardXp(s: ProgressState, amount: number): ProgressState {
  const t = today();
  return {
    ...s,
    xp: s.xp + amount,
    dailyXp: { ...s.dailyXp, [t]: (s.dailyXp?.[t] ?? 0) + amount },
  };
}

/** Record a quiz attempt (used for the cloud quiz_attempts table). */
function recordAttempt(
  s: ProgressState,
  quizId: string,
  kind: 'lesson' | 'boss' | 'diagnostic',
  score: number,
): ProgressState {
  const at = new Date().toISOString();
  const rec = { id: `${quizId}:${at}`, quizId, kind, score, at };
  const attempts = [...(s.attempts ?? []), rec].slice(-200); // cap history
  return { ...s, attempts };
}

// ---------------- streaks ----------------
/** Consecutive active days ending today (or yesterday if not active yet today). */
export function currentStreak(activeDays: string[]): number {
  const days = new Set(activeDays);
  let streak = 0;
  const cursor = new Date();
  if (!days.has(today())) {
    if (!days.has(yesterday())) return 0;
    cursor.setDate(cursor.getDate() - 1);
  }
  for (;;) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(
      cursor.getDate(),
    ).padStart(2, '0')}`;
    if (days.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

// ---------------- badges ----------------
export interface BadgeDef {
  id: string;
  name: string;
  desc: string;
  check: (s: ProgressState) => boolean;
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-step',
    name: 'First Step',
    desc: 'Complete your first lesson',
    check: (s) => Object.keys(s.lessons).length >= 1,
  },
  {
    id: 'diagnostic-hero',
    name: 'Diagnostic Hero',
    desc: 'Finish the beginner diagnostic',
    check: (s) => s.diagnostic.done,
  },
  {
    id: 'perfect-quiz',
    name: 'Sharp Shooter',
    desc: 'Score 100% on any quiz',
    check: (s) => Object.values(s.lessons).some((l) => l.score === 100),
  },
  {
    id: 'task-doer',
    name: 'Hands On',
    desc: 'Complete 3 practical tasks',
    check: (s) => Object.keys(s.tasks).length >= 3,
  },
  {
    id: 'lesson-10',
    name: 'Double Digits',
    desc: 'Complete 10 lessons',
    check: (s) => Object.keys(s.lessons).length >= 10,
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    desc: '3-day learning streak',
    check: (s) => currentStreak(s.activeDays) >= 3,
  },
  {
    id: 'streak-7',
    name: 'Unstoppable',
    desc: '7-day learning streak',
    check: (s) => currentStreak(s.activeDays) >= 7,
  },
  {
    id: 'world-1',
    name: 'Computer Tamer',
    desc: 'Complete World 1',
    check: (s) => worldComplete(s, 'w1'),
  },
  {
    id: 'world-2',
    name: 'Binary Brain',
    desc: 'Complete World 2',
    check: (s) => worldComplete(s, 'w2'),
  },
  {
    id: 'boss-1',
    name: 'Boss Slayer',
    desc: 'Pass any boss battle',
    check: (s) => s.badges.some((b) => b.startsWith('boss-')),
  },
  {
    id: 'tool-user',
    name: 'Tool Explorer',
    desc: 'Try any interactive tool',
    check: (s) => s.toolXp.used.length > 0,
  },
  {
    id: 'builder-1',
    name: 'Builder',
    desc: 'Complete your first project',
    check: (s) => Object.values(s.projects).some((p) => p.completedAt),
  },
  {
    id: 'level-5',
    name: 'Level 5 Unlock',
    desc: 'Reach level 5',
    check: (s) => levelFromXp(s.xp) >= 5,
  },
];

/** Simple per-world completion flags also used for unlocks. */
export function worldComplete(s: ProgressState, worldId: string): boolean {
  // Imported lazily to avoid a data/UI cycle: worlds list lives in data/.
  const w = getWorldLessons(worldId);
  if (!w.length) return false;
  return w.every((id) => s.lessons[id]?.score !== undefined);
}

export function bossPassed(s: ProgressState, worldId: string): boolean {
  return s.badges.includes(`boss-${worldId}`);
}

// ---------------- lesson/boss/world actions ----------------
import { getWorldLessonIds as getWorldLessons, getWorlds } from './curriculum';

export function completeLesson(lessonId: string, score: number) {
  const prev = state.lessons[lessonId];
  const best = Math.max(prev?.score ?? 0, score);
  let next: ProgressState = {
    ...state,
    lessons: {
      ...state.lessons,
      [lessonId]: { completedAt: new Date().toISOString(), score: best, taskDone: prev?.taskDone ?? false },
    },
    revisions: state.revisions.filter((id) => id !== lessonId || best >= 70),
  };
  if (score < 70 && !next.revisions.includes(lessonId)) {
    next = { ...next, revisions: [...next.revisions, lessonId] };
  }
  let gained = 0;
  if (!prev) gained += XP.lesson;
  if (score === 100 && prev?.score !== 100) gained += XP.perfectQuiz;
  next = awardXp(next, gained);
  next = stampActivity(next);
  next = recordAttempt(next, lessonId, 'lesson', score);
  set(checkAndGrantBadges(next, state));
}

export function markTaskDone(lessonId: string) {
  if (state.tasks[lessonId]) return;
  const next = awardXp(
    { ...state, tasks: { ...state.tasks, [lessonId]: new Date().toISOString() } },
    XP.task,
  );
  set(checkAndGrantBadges(stampActivity(next), state));
  if (state.lessons[lessonId]) {
    set({ ...state, lessons: { ...state.lessons, [lessonId]: { ...state.lessons[lessonId], taskDone: true } } });
  }
}

export function passBoss(worldId: string) {
  if (state.badges.includes(`boss-${worldId}`)) return;
  let next = awardXp(
    { ...state, badges: [...state.badges, `boss-${worldId}`] },
    XP.boss,
  );
  // Record the boss attempt even when retrying below 70% happens in QuizRunner;
  // passBoss is only called on a pass (pct >= 70).
  next = recordAttempt(next, `boss-${worldId}`, 'boss', 100);
  set(checkAndGrantBadges(stampActivity(next), state));
}

export function failBossAttempt(worldId: string, score: number) {
  const next = recordAttempt(state, `boss-${worldId}`, 'boss', score);
  set(next, { touch: true });
}

export function finishDiagnostic(scores: Record<string, number>, plan: string[]) {
  let next = awardXp(
    {
      ...state,
      diagnostic: { done: true, date: today(), scores, plan },
    },
    XP.diagnostic,
  );
  next = recordAttempt(next, 'diagnostic', 'diagnostic', Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Math.max(1, Object.values(scores).length)));
  set(checkAndGrantBadges(stampActivity(next), state));
}

export function setOnboarding(name: string, dailyMinutes: number) {
  set({ ...state, onboarding: { done: true, name, dailyMinutes } });
}

/** Update display name locally (cloud profile is updated by the auth layer). */
export function setDisplayName(name: string) {
  set({ ...state, onboarding: { ...state.onboarding, name } });
}

export function awardToolXp(toolId: string) {
  const t = today();
  const used = state.toolXp.date === t ? state.toolXp.used : [];
  if (used.includes(toolId)) return;
  const next = awardXp({ ...state, toolXp: { date: t, used: [...used, toolId] } }, XP.tool);
  set(checkAndGrantBadges(stampActivity(next), state));
}

export function toggleProjectStep(projectId: string, totalSteps: number, index: number) {
  const cur = state.projects[projectId]?.checked ?? Array(totalSteps).fill(false);
  const checked = [...cur];
  checked[index] = !checked[index];
  const allDone = checked.every(Boolean) && checked.length > 0;
  const rec = {
    checked,
    completedAt: allDone ? state.projects[projectId]?.completedAt ?? new Date().toISOString() : undefined,
  };
  let next = { ...state, projects: { ...state.projects, [projectId]: rec } };
  if (allDone && !state.projects[projectId]?.completedAt) {
    next = stampActivity(next);
  }
  set(checkAndGrantBadges(next, state));
}

export function completeProject(projectId: string, xp: number) {
  const cur = state.projects[projectId];
  if (cur?.completedAt) return;
  const rec = { ...(cur ?? { checked: [] as boolean[] }), completedAt: new Date().toISOString() };
  let next: ProgressState = { ...state, projects: { ...state.projects, [projectId]: rec } };
  next = awardXp(next, xp);
  next = { ...next, badges: [...new Set([...next.badges, `project-${projectId}`])] };
  set(checkAndGrantBadges(stampActivity(next), state));
}

export function setTheme(theme: 'dark' | 'light') {
  set({ ...state, theme });
}

/** Switch UI language (Tanglish default / English). Persisted + cloud-synced. */
export function setLanguage(language: 'tanglish' | 'english') {
  set({ ...state, language });
}

export function resetProgress() {
  const theme = state.theme;
  const language = state.language;
  state = { ...DEFAULT_PROGRESS, theme, language };
  dirty = false;
  save();
  listeners.forEach((l) => l());
}

// ---------------- daily mission ----------------
export interface DailyMission {
  id: string;
  title: string;
  desc: string;
  xp: number;
}

export const MISSIONS: DailyMission[] = [
  {
    id: 'm-lesson',
    title: 'Daily Mission: Complete 1 lesson',
    desc: 'Finish any one lesson with its quiz today.',
    xp: 20,
  },
  {
    id: 'm-task',
    title: 'Daily Mission: Do 1 practical task',
    desc: 'Mark one tiny practical assignment as done today.',
    xp: 20,
  },
  {
    id: 'm-perfect',
    title: 'Daily Mission: Score 100% on a quiz',
    desc: 'Retake any lesson quiz and get all answers right.',
    xp: 20,
  },
];

function missionForDate(date: string): DailyMission {
  // Deterministic per date: same mission all day, rotates day to day.
  const seed = date.split('-').reduce((a, p) => a + Number(p), 0);
  return MISSIONS[seed % MISSIONS.length];
}

export function getDailyMission(): DailyMission {
  return missionForDate(today());
}

export function missionDone(s: ProgressState): boolean {
  const m = getDailyMission();
  const t = today();
  switch (m.id) {
    case 'm-lesson':
      return Object.entries(s.lessons).some(([, rec]) => rec.completedAt.slice(0, 10) === t);
    case 'm-task':
      return Object.values(s.tasks).some((ts) => ts.slice(0, 10) === t);
    case 'm-perfect':
      return Object.entries(s.lessons).some(
        ([, rec]) => rec.score === 100 && rec.completedAt.slice(0, 10) === t,
      );
    default:
      return false;
  }
}

// ---------------- badge engine ----------------
function checkAndGrantBadges(next: ProgressState, prev: ProgressState): ProgressState {
  let s = next;
  for (const b of BADGES) {
    if (!s.badges.includes(b.id) && b.check(s)) {
      s = { ...s, badges: [...s.badges, b.id], xp: s.xp + 10 };
    }
  }
  // World completion badges
  for (const w of getWorlds()) {
    const id = `world-${w.id}`;
    if (!s.badges.includes(id) && worldComplete(s, w.id)) {
      s = { ...s, badges: [...s.badges, id], xp: s.xp + 50 };
    }
  }
  return s;
}
