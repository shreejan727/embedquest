# EMBEDQUEST ⚡🎮

A lightweight, gamified learning platform that teaches **C programming, electronics, embedded systems, and Agentic AI from absolute zero** — explained in friendly **Tanglish** (Tamil + English), built for an ECE diploma student catching up on missed classes.

**Status: v2.1 — bug-fixed core (routing/tools/lessons), Supabase email auth + isolated accounts + cloud progress sync, UI language setting (Tanglish/English), responsive desktop/mobile, `frontend/` + `backend/` structure. 🌐 Live at [https://embedquest-one.vercel.app](https://embedquest-one.vercel.app) — deployed & verified.**

---

## 📂 Project layout

```
frontend/              ← the React app (everything that ships to the browser)
├── src/
│   ├── data/          ← ALL curriculum content as plain data (90 lessons, 9 projects, 12 diagnostic Qs)
│   ├── lib/           ← types, curriculum, progress store, cloud sync, Supabase, auth, i18n, router
│   ├── components/    ← reusable UI (auth screen, quiz engine, lesson renderer, onboarding…)
│   ├── pages/         ← dashboard, worlds, lesson flow, tools hub, projects, profile
│   └── tools/         ← the 8 interactive tools
├── scripts/           ← validate.ts (content gate) + test.ts (unit tests)
├── index.html
├── vite.config.ts / tsconfig.json
├── vercel.json        ← SPA rewrite (no 404 on refresh) + asset caching
├── .env               ← YOUR real Supabase credentials (never commit; git-ignored)
└── .env.example       ← documented template

backend/
└── supabase/
    └── schema.sql     ← full DB schema + Row Level Security policies (already run in your project)
```

All npm commands run **inside `frontend/`**. For convenience, the root `package.json` forwards the same commands — from the project root you can also run `npm run dev`, `npm run build`, `npm test`, etc., and they execute in `frontend/` automatically.

---

## 🚀 Quick start

```bash
# first time only (installs frontend dependencies)
npm --prefix frontend install

# start the app → http://localhost:5173
npm run dev          # from the root, OR: cd frontend && npm run dev
```

Without any configuration the app runs in **local mode**: everything works, progress is saved in your browser only, and the Profile page honestly says so.

Other commands (run from the root — they forward into `frontend/`):

```bash
npm run build    # type-check + production build (frontend/dist)
npm run preview  # serve the production build locally
npm run validate # data-integrity checks on all curriculum content
npm test         # unit tests (cloud-sync merge engine, XP/level math, streak logic)
```

> **Prerequisite:** [Node.js](https://nodejs.org) 18+ (tested on Node 24).

---

## 🌍 Language setting (Tanglish / English)

Switch the **entire interface** between Tanglish 🇮🇳 and English 🇬🇧:

- **Top bar** → the `EN` / `த` button (next to the theme toggle) — instant switch
- **Profile → Settings → Language** → two large buttons, active one highlighted

The choice is saved in your progress and **synced to the cloud with your account**, so every device uses your language automatically. The interface (nav, dashboard, lessons chrome, quizzes, worlds, boss battles, projects, tools hub, AI Teacher screen, auth, profile, errors) is fully translated; the **study content** (lesson bodies, quiz questions, project instructions) currently stays Tanglish in both modes — English mode shows a small honest "content note" banner instead of a fake translation.

---

## 👤 Accounts & cloud sync (how it works)

| Mode | Who | Progress storage |
|---|---|---|
| **Local mode** | No Supabase credentials configured | Browser LocalStorage only (Profile page says so) |
| **Guest mode** | "Continue as guest" chosen | Browser LocalStorage only (honest notice shown) |
| **Account** | Email + password sign-up/login | **Supabase PostgreSQL is the source of truth**; LocalStorage is just an offline cache |

What the cloud layer does:

- **On login** → pulls your cloud progress, merges it with any local progress (`mergeProgress` — item-wise *newest wins*, unions for badges/active days, per-date max for daily XP), hydrates the app, and pushes the merged result back. **Nothing is ever lost, and stale local data never overwrites newer cloud data.**
- **After every learning action** → a debounced (2 s) push updates: `user_progress` (full snapshot), `lesson_progress`, `project_progress`, `quiz_attempts`, `daily_activity`.
- **Offline / network error** → you keep playing locally; on reconnect (browser `online` event or next login) a full reconcile runs. Sync errors surface on the Profile page.
- **Separate accounts are fully isolated** — enforced by Row Level Security (`auth.uid() = user_id` on every table). One user can never read or write another user's rows.
- **Sign-up / login / logout / forgot password / change password / display-name editing** all work, with loading states and friendly Tanglish error messages.
- Guest mode migration: a guest's local progress is **migrated into the account** on the first login (merge → push).

---

## 🗄️ Supabase setup (one-time, ~10 minutes)

Your project is **already created and wired** (`frontend/.env` holds the URL + publishable key; `backend/supabase/schema.sql` was already run in the SQL Editor). These steps are documented for reference / re-setup:

1. **Create a project** at [supabase.com](https://supabase.com) → *New project* (any region close to your users).
2. **Run the schema**: open *SQL Editor* → *New query* → paste the entire contents of [`backend/supabase/schema.sql`](backend/supabase/schema.sql) → *Run*. This creates `profiles`, `user_progress`, `lesson_progress`, `project_progress`, `quiz_attempts`, `daily_activity`, a sign-up trigger, and **enables Row Level Security with per-user isolation policies on every table**.
3. **Copy the public credentials**: *Project Settings → API* → copy **Project URL** and the **anon / publishable** key. (Never use the `service_role`/`sb_secret_…` key in frontend code.)
4. **Create your env file**: copy `frontend/.env.example` to `frontend/.env` and fill in:
   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```
5. **Auth URL settings** (*Project Settings → Authentication → URL Configuration*):
   - **Site URL**: your app's public URL, e.g. `https://embedquest.vercel.app` (or `http://localhost:5173` while developing).
   - **Redirect URLs**: add your public URL with a wildcard — `https://embedquest.vercel.app/**` — plus `http://localhost:5173/**` for dev.
   - The password-reset email links back to the app; the session is picked up from the URL hash automatically, then the user sets the new password via **Profile → Change password**.
6. Optional: the free tier sends confirmation/reset emails from a shared sender with rate limits (~2–4/hour). Add custom SMTP under *Project Settings → Authentication → SMTP* if you need more.

Restart `npm run dev` after creating `frontend/.env`. The Profile page will now show **Account & Cloud Sync** with your email, last-sync time, change-password and sign-out.

---

## 🌐 Deployment (Vercel + Supabase)

The app is deployment-ready: `frontend/vercel.json` routes every path to `index.html` (no 404 on refresh — safe for hash-router deep links) and marks hashed `/assets/*` immutable. Static assets are still served normally by Vercel's filesystem check.

1. Push this folder to a **GitHub repository** (`.gitignore` already protects `frontend/.env`, `node_modules`, `dist`).
2. On [vercel.com](https://vercel.com) → *Add New Project* → import the repo.
3. **Important — Root Directory**: set it to **`frontend`** (the repo root has no build; the app lives in `frontend/`). Framework auto-detects **Vite**; build command `npm run build`, output `dist`.
4. *Environment Variables* → add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (same values as `frontend/.env`). Optional, for the MIAA AI tutor: `GEMINI_API_KEY` (server-side only — see the MIAA section).
5. **Deploy.** You get a public URL like `https://your-project.vercel.app` — same link on laptop and mobile.
6. Add that URL to Supabase **Site URL** + **Redirect URLs** (step 5 above).

> ✅ **Deployed (Nov 13, 2026)** — live at **https://embedquest-one.vercel.app**, imported via the Vercel dashboard with **Root Directory = `frontend`**. Post-deploy verification: root + nested routes HTTP 200 (SPA rewrite active), assets served with immutable caching, Supabase URL + publishable key baked into the bundle.

---

## 🕹️ What's inside

| Area | What you get |
|---|---|
| **Onboarding** | Welcome → daily-time goal → 12-question **diagnostic** → personalized catch-up path (for the 10 missed days) |
| **11 learning worlds** | Computer Fundamentals → Number Systems → C → Digital Electronics → Basic Electronics → Microcontrollers → Embedded C → Sensors & Protocols → RTOS/FreeRTOS → IoT → Agentic AI |
| **90 lessons** | Real-life intro → Tanglish explanation → analogy → visual diagram → technical terms → worked examples → common mistakes → tiny practical task → 3–5 question quiz → XP |
| **Gamification** | XP, levels & RPG ranks (Spark → Quest Master), daily streak 🔥, badges, daily missions, **79 boss questions** across 11 boss battles, world unlock rules |
| **Language setting** | Tanglish / English interface switch (top bar `EN`/`த` or Profile → Settings), remembered & cloud-synced |
| **8 interactive tools** | Number converter, logic-gate simulator, Ohm's-law calc, resistor color code, series/parallel R, virtual breadboard, Arduino pin explorer, C code playground |
| **9 guided projects** | LED blink → night lamp → ultrasonic detector → DHT11 monitor → ESP32 home automation → IoT MQTT dashboard → FreeRTOS multi-tasking → Agentic AI assistant → capstone. Circuit guides, full code, **line-by-line explanations**, troubleshooting, safety notes (low voltage only) |
| **MIAA — AI tutor** | Real AI tutor powered by **Gemini** via a server-side proxy (the key NEVER touches the browser). Honest mode: hints, never quiz answers. Offline rule-based fallback included |

### Honest-mode code playground
The C playground is a **code editor with known expected outputs** — it never fakes compilation.
Verify your code on a real compiler (`gcc`, [onlinegdb.com](https://www.onlinegdb.com), or Arduino IDE).

---

## 🧠 MIAA — the real AI tutor (Gemini, key stays server-side)

MIAA lives on the **Teacher** page. When `GEMINI_API_KEY` is set in Vercel, MIAA is powered by Gemini through the serverless function [`frontend/api/teacher.mjs`](frontend/api/teacher.mjs) — the browser calls `/api/teacher`, the function calls Gemini with the key, the key is **never baked into the public JS bundle**. Without the key, she gracefully falls back to the offline rule-based teacher and the UI says so.

- **Model**: `gemini-2.5-flash-lite` (verified working; override with `GEMINI_MODEL` in Vercel)
- **Persona**: Tanglish tutor, short mobile-friendly answers, real-life analogies — and she **never hands over quiz answers**, she teaches toward them
- **Memory**: the last 6 chat messages are sent as context, so follow-up questions work
- **Free tier**: Gemini rate limits apply — if MIAA is busy, a friendly "try again in a minute" shows up
- **Local dev**: `vite.config.ts` proxies `/api/*` to the deployed function, so localhost uses the same key safely

**Setup (one-time, two variables):** Vercel → your project → *Settings → Environment Variables*:
1. `VITE_AI_ENDPOINT` = `/api/teacher`  (Environments: Production + Preview) — tells the frontend where MIAA lives
2. `GEMINI_API_KEY` = your Gemini key  (Environments: Production + Preview + Development) — **server-side only, never a `VITE_` variable**
3. Then *Deployments → ⋯ → Redeploy* so the new build picks them up.

---

## ✏️ Editing content

**To add a lesson:** append an object to the matching `frontend/src/data/lessons-wX.ts` array (copy an existing one as template). UI, XP, and unlock logic pick it up automatically.

**Content quality gate:** `npm run validate` checks every lesson/boss/boss-prefix/quiz-answer/diagnostic/project invariant and prints per-world lesson/boss counts. Run it after editing anything in `frontend/src/data/`.

**To extend the English interface translations:** edit `frontend/src/lib/i18n.ts` (both dictionaries live there; `{token}` placeholders interpolate values).

---

## ✅ Testing

- `npm test` — 22 assertion groups covering the sync merge engine (stale-overwrite protection, unions, dedup), XP/level math and streak logic.
- `npm run validate` — curriculum integrity (90 lessons, 79 boss questions, 9 projects).
- `npm run build` — full TypeScript check + production bundle.
- `docs/TEST-CHECKLIST.md` — the 20-scenario end-to-end checklist, marking which scenarios were verified in code/build and which need a browser (and, once deployed, a second device).

All gates were re-run from `frontend/` after the folder restructure and pass (tsc 0 errors, 22 test groups, ALL CHECKS PASSED, ✓ built, dev server HTTP 200).

---

## 💾 Data & privacy

- With an **account**: progress lives in your own rows in Supabase (RLS-protected); the browser keeps a cache for offline use. Reset (Profile → Reset progress) clears local **and** pushes an empty state to your cloud row.
- **Guest / local mode**: everything stays in your browser LocalStorage (`embedquest-progress-v1`). Nothing leaves the device.
- Only the **public anon/publishable key** is ever in frontend code. The `service_role`/`sb_secret_…` key must never be committed or shipped.
- `frontend/.env` is local config and git-ignored; `frontend/.env.example` is the documented template.

---

Built with React + TypeScript + Vite + Tailwind CSS + Lucide icons + Supabase. Keep it light, keep it honest, keep learning. 🚀
