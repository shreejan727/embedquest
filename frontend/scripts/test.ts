// ============================================================
// EMBEDQUEST — unit tests (no framework, plain asserts)
// Run: npm test
// Covers: progressMerge (cloud sync engine), XP/level math,
// streak logic, lesson-record merge semantics.
// ============================================================
import assert from 'node:assert/strict';
import { mergeProgress } from '../src/lib/progressMerge';
import { levelFromXp, levelProgress, currentStreak, XP_PER_LEVEL, rankFromXp } from '../src/lib/progress';
import { sanitizeCSource } from '../src/lib/cSanitize';
import { DEFAULT_PROGRESS, type ProgressState } from '../src/lib/types';

let passed = 0;
function ok(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

function snap(over: Partial<ProgressState>): ProgressState {
  return {
    ...DEFAULT_PROGRESS,
    updatedAt: new Date().toISOString(),
    ...over,
  } as ProgressState;
}

function daysAgoIso(n: number): string {
  return new Date(Date.now() - n * 86400000).toISOString();
}

function dateKey(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

console.log('\nprogressMerge');
{
  const cloud: ProgressState = snap({
    updatedAt: daysAgoIso(2), // OLD
    xp: 100,
    badges: ['w1-lesson-5'],
    activeDays: ['2026-01-01'],
    lessons: {
      w1l1: { completedAt: daysAgoIso(10), score: 80, taskDone: true },
      w1l2: { completedAt: daysAgoIso(9), score: 60, taskDone: false },
    },
    attempts: [{ id: 'w1l1:1', quizId: 'w1l1', kind: 'lesson', score: 80, at: daysAgoIso(10) }],
  });
  const local: ProgressState = snap({
    updatedAt: daysAgoIso(0), // NEW
    xp: 250, // offline grind on laptop
    badges: ['w1-lesson-5', 'first-lesson'],
    activeDays: ['2026-01-01', '2026-01-02'],
    lessons: {
      w1l2: { completedAt: daysAgoIso(1), score: 90, taskDone: true }, // newer than cloud's
      w2l1: { completedAt: daysAgoIso(0), score: 100, taskDone: false }, // only local
    },
    attempts: [{ id: 'w2l1:2', quizId: 'w2l1', kind: 'lesson', score: 100, at: daysAgoIso(0) }],
  });

  const m = mergeProgress(cloud, local);

  ok('XP comes from the newer snapshot (local=250, not 100)', () => {
    assert.equal(m.xp, 250);
  });
  ok('lesson newer-completedAt wins per item (w1l2 → 90)', () => {
    assert.equal(m.lessons['w1l2'].score, 90);
  });
  ok('lesson present only locally survives (w2l1)', () => {
    assert.ok(m.lessons['w2l1']);
  });
  ok('lesson present only in cloud survives (w1l1)', () => {
    assert.ok(m.lessons['w1l1']);
  });
  ok('badges union', () => {
    assert.ok(m.badges.includes('first-lesson') && m.badges.includes('w1-lesson-5'));
  });
  ok('activeDays union', () => {
    assert.ok(m.activeDays.includes('2026-01-02') && m.activeDays.includes('2026-01-01'));
  });
  ok('attempts union, deduped by id', () => {
    const ids = m.attempts.map((a) => a.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.includes('w1l1:1') && ids.includes('w2l1:2'));
  });
  ok('no lesson record is lost', () => {
    assert.equal(Object.keys(m.lessons).length, 3);
  });

  // Reverse direction: cloud newer than local (e.g. phone did the work)
  const cloudNew: ProgressState = snap({
    updatedAt: daysAgoIso(0),
    xp: 400,
    lessons: { w3l1: { completedAt: daysAgoIso(0), score: 70, taskDone: true } },
  });
  const localStale: ProgressState = snap({
    updatedAt: daysAgoIso(5), // old laptop cache
    xp: 50,
    lessons: { w1l1: { completedAt: daysAgoIso(10), score: 80, taskDone: true } },
  });
  const m2 = mergeProgress(cloudNew, localStale);
  ok('stale local does NOT overwrite newer cloud XP', () => {
    assert.equal(m2.xp, 400);
  });
  ok('stale local lessons are still preserved (union, no loss)', () => {
    assert.ok(m2.lessons['w1l1'] && m2.lessons['w3l1']);
  });

  // dailyXp takes the max per date
  const a = snap({ updatedAt: daysAgoIso(0), dailyXp: { '2026-03-01': 40 } });
  const b = snap({ updatedAt: daysAgoIso(0), dailyXp: { '2026-03-01': 55 } });
  ok('dailyXp per-date max (55)', () => {
    assert.equal(mergeProgress(a, b).dailyXp['2026-03-01'], 55);
  });
}

console.log('\nXP & levels');
{
  ok('level 1 at 0 XP', () => assert.equal(levelFromXp(0), 1));
  ok('level 2 at exactly XP_PER_LEVEL', () => assert.equal(levelFromXp(XP_PER_LEVEL), 2));
  ok('level 3 at 2*XP_PER_LEVEL', () => assert.equal(levelFromXp(2 * XP_PER_LEVEL), 3));
  ok('levelProgress pct math', () => {
    const lp = levelProgress(75); // 75/150 into level 1
    assert.equal(lp.level, 1);
    assert.equal(lp.into, 75);
    assert.equal(lp.need, 150);
    assert.equal(lp.pct, 50);
  });
  ok('rank advances with XP', () => {
    assert.equal(rankFromXp(0), 'Spark');
    assert.notEqual(rankFromXp(600), 'Spark');
  });
}

console.log('\nStreak logic');
{
  const today = dateKey(0);
  const yest = dateKey(1);
  const two = dateKey(2);
  const five = dateKey(5);

  ok('no activity → 0', () => assert.equal(currentStreak([]), 0));
  ok('activity today only → 1', () => assert.equal(currentStreak([today]), 1));
  ok('today + yesterday → 2', () => assert.equal(currentStreak([yest, today]), 2));
  ok('yesterday only (not yet active today) → 1', () => assert.equal(currentStreak([yest]), 1));
  ok('gap breaks the streak (two days ago only → 0)', () => assert.equal(currentStreak([two]), 0));
  ok('consecutive days counted backwards (run ending yesterday → 5)', () => {
    assert.equal(currentStreak([five, dateKey(4), dateKey(3), dateKey(2), yest]), 5);
  });
}

console.log('\nC source sanitizer (JSCPP comma-space bug)');
{
  const s = sanitizeCSource;

  ok('code without comma-space is untouched', () => {
    const code = 'int main() { int a,b; a=1; b=2; return a+b; }';
    assert.equal(s(code), code);
  });
  ok('comma-space inside printf literal becomes adjacent literals', () => {
    assert.equal(s('printf("Hello, World!\\n");'), 'printf("Hello," " World!\\n");');
  });
  ok('every space after comma is preserved (double space)', () => {
    assert.equal(s('"a,  b"'), '"a," "  b"');
  });
  ok('comma without following space is untouched', () => {
    assert.equal(s('printf("a,b\\n");'), 'printf("a,b\\n");');
  });
  ok('comma inside char literal is untouched', () => {
    assert.equal(s("if (c == ',') {}"), "if (c == ',') {}");
  });
  ok('comments are untouched', () => {
    const code = '// a, b\n/* c,  d */\nint x;';
    assert.equal(s(code), code);
  });
  ok('escaped quotes do not confuse the scanner', () => {
    const code = 'printf("say \\"hi, ok\\" now\\n");';
    assert.equal(s(code), 'printf("say \\"hi," " ok\\" now\\n");');
  });
  ok('comma-space at end of literal', () => {
    assert.equal(s('puts("a, ")'), 'puts("a," " ")');
  });
  ok('two comma-spaces in one literal', () => {
    assert.equal(s('"a, b, c"'), '"a," " b," " c"');
  });
  ok('newline after comma is NOT transformed (only space/tab)', () => {
    assert.equal(s('"a,\nb"'), '"a,\nb"');
  });
}

console.log(`\n${passed} test groups passed.`);
if (process.exitCode) {
  console.error('TESTS FAILED');
} else {
  console.log('ALL TESTS PASSED ✅');
}
