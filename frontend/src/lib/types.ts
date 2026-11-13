// ============================================================
// EMBEDQUEST — central data types
// All curriculum content (lessons, quizzes, projects) is plain
// data shaped by these interfaces. Any AI agent can add content
// by editing files in src/data/ without touching UI code.
// ============================================================

/** A themed block inside a lesson page. Rendered by LessonRenderer. */
export type SectionKind =
  | 'intro' // real-life hook: why do we need this?
  | 'explain' // main Tanglish teaching (ELI5 -> technical)
  | 'analogy' // real-life analogy
  | 'visual' // ASCII/CSS diagram (goes in `code` field)
  | 'technical' // correct English terminology and detail
  | 'example' // step-by-step worked example (may include code/list)
  | 'mistakes'; // common mistakes and fixes (use `list`)

export interface LessonSection {
  kind: SectionKind;
  /** Short heading shown above the block, e.g. "Voltage na enna?" */
  heading: string;
  /** Plain text. Separate paragraphs with a blank line. */
  body?: string;
  /** Code block or ASCII diagram. */
  code?: string;
  /** Bullet list items. */
  list?: string[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  /** Index (0-based) of the correct option. */
  answer: number;
  /** Shown after answering: why this is right, in Tanglish. */
  explain: string;
}

export interface LessonTask {
  title: string;
  /** Small practical steps the student does off-screen (notebook/tool). */
  steps: string[];
}

export interface Lesson {
  /** Unique id, pattern: w<world>l<number>, e.g. "w1l1" */
  id: string;
  /** Owning world id, e.g. "w1" */
  worldId: string;
  title: string;
  /** Rough reading + practice time in minutes. */
  minutes: number;
  sections: LessonSection[];
  task: LessonTask;
  /** 3–5 questions. Must be answerable from the lesson content. */
  quiz: QuizQuestion[];
}

/** Boss battle quiz at the end of a world (5–8 questions). */
export type BossQuiz = QuizQuestion[];

export interface World {
  id: string; // "w1"
  num: number;
  title: string;
  /** One-line tagline for the map card. */
  subtitle: string;
  /** Lucide icon name key (mapped in components/WorldIcon.tsx). */
  icon: string;
  /** Tailwind gradient classes, e.g. "from-cyan-500 to-blue-600". */
  color: string;
  boss: BossQuiz;
}

export type ProjectDifficulty = 'Beginner' | 'Easy' | 'Medium' | 'Advanced' | 'Capstone';

export interface Project {
  /** "p1".."p9" */
  id: string;
  num: number;
  title: string;
  difficulty: ProjectDifficulty;
  /** One-line objective shown on the project card. */
  objective: string;
  components: string[];
  /** Text connection guide / simple ASCII circuit. */
  circuit: string;
  steps: string[];
  code: string;
  /** Line-by-line explanation of the code. */
  codeExplanation: { code: string; note: string }[];
  expectedOutput: string;
  troubleshooting: string[];
  safety: string[];
  checklist: string[];
  xp: number;
}

/** Diagnostic (catch-up) question sampling a world's topic. */
export interface DiagnosticQuestion {
  q: string;
  options: string[];
  answer: number;
  worldId: string;
  /** Short topic label, e.g. "Binary basics". */
  topic: string;
}

/** Per-lesson completion record. */
export interface LessonRecord {
  completedAt: string; // ISO date string
  /** Best quiz score percent for this lesson. */
  score: number;
  /** True when the tiny practical task was marked as done. */
  taskDone: boolean;
}

export interface DailyMissionState {
  date: string; // local yyyy-mm-dd
  missionId: string;
  done: boolean;
}

/** One recorded quiz attempt (lesson quiz, boss battle or diagnostic). */
export interface QuizAttemptRecord {
  /** Deterministic id "quizId:isoTime" — used as cloud PK (idempotent upserts). */
  id: string;
  quizId: string;
  kind: 'lesson' | 'boss' | 'diagnostic';
  score: number;
  at: string; // ISO
}

/** Root progress object persisted in LocalStorage. */
export interface ProgressState {
  xp: number;
  onboarding: { done: boolean; name: string; dailyMinutes: number };
  diagnostic: {
    done: boolean;
    date: string;
    /** worldId -> percent correct */
    scores: Record<string, number>;
    /** Ordered list of worldIds recommended for catch-up. */
    plan: string[];
  };
  lessons: Record<string, LessonRecord>;
  /** ISO date strings (yyyy-mm-dd) of meaningful activity. */
  activeDays: string[];
  badges: string[];
  /** Assignments = lesson tasks marked done. Keys are lesson ids. */
  tasks: Record<string, string>;
  /** Project checklists. Key = projectId, value = array of checked flags. */
  projects: Record<string, { checked: boolean[]; completedAt?: string }>;
  /** Tool ids already used today, for small "tool explorer" XP. */
  toolXp: { date: string; used: string[] };
  dailyMission: DailyMissionState;
  /** Lessons answered weakly (<70%) -> suggested for revision. */
  revisions: string[];
  theme: 'dark' | 'light';
  /** UI language: Tanglish (default) or plain English. */
  language: 'tanglish' | 'english';
  /** ISO timestamp of the last local mutation (cloud sync ordering). */
  updatedAt: string;
  /** ISO timestamp of the last successful cloud sync (when cloud is on). */
  lastSyncedAt?: string;
  /** Date (yyyy-mm-dd) -> XP earned that day (feeds daily_activity cloud table). */
  dailyXp: Record<string, number>;
  /** Recent quiz attempts (capped) — feeds quiz_attempts cloud table. */
  attempts: QuizAttemptRecord[];
}

export const DEFAULT_PROGRESS: ProgressState = {
  xp: 0,
  onboarding: { done: false, name: '', dailyMinutes: 20 },
  diagnostic: { done: false, date: '', scores: {}, plan: [] },
  lessons: {},
  activeDays: [],
  badges: [],
  tasks: {},
  projects: {},
  toolXp: { date: '', used: [] },
  dailyMission: { date: '', missionId: '', done: false },
  revisions: [],
  theme: 'dark',
  language: 'tanglish',
  updatedAt: '',
  lastSyncedAt: undefined,
  dailyXp: {},
  attempts: [],
};
