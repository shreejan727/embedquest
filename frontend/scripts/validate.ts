// Temporary validation script (run via esbuild + node).
// Checks curriculum invariants across all worlds/lessons.
import { ALL_LESSONS, WORLDS, PROJECTS } from '../src/lib/curriculum';
import { world7Boss } from '../src/data/lessons-w7';
import { world8Boss } from '../src/data/lessons-w8';
import { world9Boss } from '../src/data/lessons-w9';
import { world10Boss } from '../src/data/lessons-w10';
import { world11Boss } from '../src/data/lessons-w11';
import { diagnosticQuestions } from '../src/data/diagnostic';

let errors = 0;
const fail = (msg: string) => {
  errors++;
  console.log('FAIL: ' + msg);
};

const lessonIds = new Set<string>();
for (const l of ALL_LESSONS) {
  if (lessonIds.has(l.id)) fail('duplicate lesson id ' + l.id);
  lessonIds.add(l.id);
  if (!/^w\d+l\d+$/.test(l.id)) fail('bad id pattern ' + l.id);
  if (l.worldId !== l.id.slice(0, l.id.indexOf('l'))) fail('worldId mismatch ' + l.id);
  if (!l.title || !l.minutes || l.minutes < 1) fail('bad title/minutes ' + l.id);
  if (!l.sections || l.sections.length < 5) fail('too few sections ' + l.id);
  for (const s of l.sections) {
    if (!s.heading) fail('section missing heading in ' + l.id);
    if (s.kind === 'visual' && s.code) {
      for (const line of s.code.split('\n')) {
        if (line.length > 44) fail('visual line too long (' + line.length + ') in ' + l.id + ': ' + line.slice(0, 40));
      }
    }
    if (!s.body && !s.code && !s.list) fail('empty section in ' + l.id);
  }
  if (!l.task || !l.task.title || !Array.isArray(l.task.steps) || l.task.steps.length < 2) fail('bad task in ' + l.id);
  if (!Array.isArray(l.quiz) || l.quiz.length < 3) fail('too few quiz questions in ' + l.id);
  l.quiz.forEach((q, i) => {
    if (!q.q) fail('quiz missing q ' + l.id + '#' + i);
    if (!Array.isArray(q.options) || q.options.length < 2) fail('quiz options < 2 ' + l.id + '#' + i);
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) fail('quiz answer out of range ' + l.id + '#' + i);
    if (!q.explain) fail('quiz missing explain ' + l.id + '#' + i);
  });
}

// per-world lesson counts
for (const w of WORLDS) {
  if (w.id === 'w12') continue; // projects world has no lessons
  const count = ALL_LESSONS.filter((l) => l.worldId === w.id).length;
  const boss = w.boss || [];
  if (count === 0) fail('world has no lessons: ' + w.id);
  if (boss.length < 5) fail('boss too small: ' + w.id + ' (' + boss.length + ')');
  boss.forEach((q, i) => {
    if (!q.q.startsWith('BOSS:')) fail('boss question missing BOSS prefix ' + w.id + '#' + i);
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) fail('boss answer out of range ' + w.id + '#' + i);
    if (!q.explain) fail('boss missing explain ' + w.id + '#' + i);
  });
  console.log(w.id, w.title, '- lessons:', count, '- boss:', boss.length);
}

// boss arrays referenced by worlds must match files
const bossMap: Record<string, any[]> = { w7: world7Boss, w8: world8Boss, w9: world9Boss, w10: world10Boss, w11: world11Boss };
for (const [id, arr] of Object.entries(bossMap)) {
  const w = WORLDS.find((x) => x.id === id);
  if (w!.boss !== arr) fail('worlds.ts not using exported boss for ' + id);
}

// diagnostics reference valid worlds
for (const d of diagnosticQuestions) {
  if (!WORLDS.some((w) => w.id === d.worldId)) fail('diagnostic bad worldId ' + d.worldId);
  if (d.answer < 0 || d.answer >= d.options.length) fail('diagnostic answer out of range: ' + d.q);
}

// projects sanity (written by canary agent earlier — verify still consistent)
if (PROJECTS.length !== 9) fail('projects count = ' + PROJECTS.length);
PROJECTS.forEach((p, i) => {
  if (p.num !== i + 1) fail('project num mismatch ' + p.id);
  if (!p.title || !p.objective || !p.circuit || !p.code) fail('project missing fields ' + p.id);
  if (!Array.isArray(p.checklist) || p.checklist.length < 3) fail('project checklist small ' + p.id);
});

console.log('TOTAL lessons:', ALL_LESSONS.length, '| projects:', PROJECTS.length, '| diagnostics:', diagnosticQuestions.length);
if (errors === 0) console.log('ALL CHECKS PASSED');
else {
  console.log('ERRORS:', errors);
  process.exit(1);
}
