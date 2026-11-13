// ============================================================
// EMBEDQUEST — curriculum access layer
// Single place that reads the world/lesson data files. UI and
// progress logic never import lesson data directly.
// ============================================================
import type { Lesson, World, Project } from './types';
import { worlds } from '../data/worlds';
import { projects } from '../data/projects';
import { world1Lessons } from '../data/lessons-w1';
import { world2Lessons } from '../data/lessons-w2';
import { world3Lessons } from '../data/lessons-w3';
import { world4Lessons } from '../data/lessons-w4';
import { world5Lessons } from '../data/lessons-w5';
import { world6Lessons } from '../data/lessons-w6';
import { world7Lessons } from '../data/lessons-w7';
import { world8Lessons } from '../data/lessons-w8';
import { world9Lessons } from '../data/lessons-w9';
import { world10Lessons } from '../data/lessons-w10';
import { world11Lessons } from '../data/lessons-w11';

export const ALL_LESSONS: Lesson[] = [
  ...world1Lessons,
  ...world2Lessons,
  ...world3Lessons,
  ...world4Lessons,
  ...world5Lessons,
  ...world6Lessons,
  ...world7Lessons,
  ...world8Lessons,
  ...world9Lessons,
  ...world10Lessons,
  ...world11Lessons,
];

export { worlds as WORLDS };
export { projects as PROJECTS };

export function getWorlds(): World[] {
  return worlds;
}

export function getWorld(id: string): World | undefined {
  return worlds.find((w) => w.id === id);
}

export function getLessonsOfWorld(worldId: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.worldId === worldId);
}

export function getWorldLessonIds(worldId: string): string[] {
  return getLessonsOfWorld(worldId).map((l) => l.id);
}

export function getLesson(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Neighboring lesson for prev/next navigation inside a world. */
export function lessonNeighbors(lesson: Lesson): { prev?: Lesson; next?: Lesson } {
  const list = getLessonsOfWorld(lesson.worldId);
  const i = list.findIndex((l) => l.id === lesson.id);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}

/**
 * Is a world unlocked for this student?
 * World 1 always unlocked; world N unlocks when the previous world's
 * lessons are ALL completed OR >= 70% completed and its boss passed.
 */
export function isWorldUnlocked(worldId: string, completed: Set<string>, bossPassedIds: Set<string>): boolean {
  const idx = worlds.findIndex((w) => w.id === worldId);
  if (idx <= 0) return true;
  const prev = worlds[idx - 1];
  const prevIds = getWorldLessonIds(prev.id);
  const doneCount = prevIds.filter((id) => completed.has(id)).length;
  const allDone = prevIds.length > 0 && doneCount === prevIds.length;
  const mostlyDone = prevIds.length > 0 && doneCount / prevIds.length >= 0.7 && bossPassedIds.has(prev.id);
  return allDone || mostlyDone;
}
