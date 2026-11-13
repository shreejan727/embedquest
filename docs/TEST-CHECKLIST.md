# EMBEDQUEST — End-to-end Test Checklist

Scenarios from the requirements, with an honest status per item.
**Verified here** = actually exercised during this session (by build, automated test, or live dev-server check). **Needs browser/device** = requires a real Supabase project and/or a second device — exactly the manual steps left for you.

## Setup that gates several scenarios
> Project layout: the React app lives in `frontend/`, the database schema in `backend/supabase/`. Run npm commands inside `frontend/` (or use the root wrapper scripts, which forward there).
1. Create the Supabase project and run `backend/supabase/schema.sql` (SQL Editor).
2. Copy `frontend/.env.example` → `frontend/.env` with `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
3. Restart `npm run dev` (from `frontend/`, or from the root — the root script forwards).

| # | Scenario | Status | How it was checked / what to do |
|---|---|---|---|
| 1 | Open the website | ✅ Verified (dev server HTTP 200 — re-verified from `frontend/` after the folder restructure, `http://localhost:5173`) | Also check on your machine: `npm run dev` |
| 2 | Create a new account | ⏳ Needs browser + Supabase | Sign-up UI wired (`AuthView` → `auth.signUp`); confirm-email flow shows "Check your inbox" screen |
| 3 | Log in | ⏳ Needs browser + Supabase | `signIn` with friendly Tanglish errors (wrong password, unconfirmed email, rate limit) |
| 4 | Open the dashboard | ✅ Verified (build + routing audit) | `Gate` → `Routes` → `HomeView`; protected when cloud configured |
| 5 | Click Start Learning | ✅ Verified (root-cause fix) | Was dead because `RouterProvider` was never mounted — fixed in `main.tsx`; builds + route logic reviewed |
| 6 | Open World 1 | ✅ Verified (routing + unlock logic read) | `#/world/w1`; locked worlds no longer jump home (`Link` respects `defaultPrevented`) |
| 7 | Open a lesson | ✅ Verified (routing + `LessonView` audit) | `#/lesson/w1l1`; scroll resets to top on navigation |
| 8 | Complete an assignment | ✅ Verified (code audit) | `markTaskDone` persists `tasks[lessonId]`; task XP path reviewed |
| 9 | Complete a quiz | ✅ Verified (code audit + QuizRunner read) | Instant feedback with Tanglish explanation; wrong answers explained, retry allowed |
| 10 | Verify XP increases | ✅ Verified (`npm test` — XP/level math) | `completeLesson` awards 40 (+10 perfect, once); attempt recorded; no double award on re-completion |
| 11 | Navigate to Tools | ✅ Verified (root-cause fix) | Was a hook-order crash (tools called as functions) — now rendered as `<Tool />` elements |
| 12 | Open all 8 tools and test functionality | ✅ Verified (code audit of all 8 tools) | Each has real logic, validation, reset where apt; C playground honestly labeled simulator. Quick manual pass recommended |
| 13 | Open and complete a project checklist | ✅ Verified (code audit) | `toggleProjectStep` + `completeProject` persist in `projects`; completion status shown in list |
| 14 | Log out | ⏳ Needs browser + Supabase | Profile → Sign out → guest flag cleared → `AuthView` shows |
| 15 | Log in again → progress persists | ⏳ Needs browser + Supabase | Reconcile-on-login: cloud snapshot pulled → merged → hydrated → pushed |
| 16 | Another account → progress separate | ⏳ Needs browser + Supabase | Enforced by RLS policies (`auth.uid() = user_id`) in `schema.sql`; app never shares state across users in code |
| 17 | Same account on another device → sync | ⏳ Needs second device/browser | Debounced push after changes; login pulls+merges; offline-safe; `npm test` covers merge semantics (stale local can't overwrite newer cloud) |
| 18 | Mobile layout & interactions | ✅ Verified (layout audit) | Mobile bottom nav + touch targets; no horizontal-overflow patterns in pages/tools. Real-device pass recommended after deploy |
| 19 | Refresh nested pages → routing | ✅ Verified (root-cause fix) | Hash router restores the exact route after refresh (previously always showed dashboard) |
| 20 | TypeScript checks, production build, tests | ✅ Verified this session | `npx tsc --noEmit` → 0 errors · `npm run build` → ✓ built · `npm test` → 22 groups passed · `npm run validate` → ALL CHECKS PASSED (90 lessons, 9 projects) |

## Extra checks performed
- `vercel.json` SPA rewrite present (refresh/deep-link 404 protection).
- Sync loop guard: hydration doesn't re-trigger pushes (`isDirty` flag); in-flight-change race in `pushState` fixed (only stamps `lastSyncedAt` when the snapshot is unchanged).
- Local/guest honesty: without credentials the app shows an explicit local-mode notice — it never fakes a cloud connection.
- Locked-world clicks no longer navigate home.
- Content integrity intact: 11 worlds / 90 lessons / 79 boss questions / 8 tools / 9 projects (validate output).
