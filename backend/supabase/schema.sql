-- ============================================================
-- EMBEDQUEST — Supabase schema (public/publishable, safe to run
-- in the Supabase SQL Editor on a fresh project).
--
-- Security model:
--   * Row Level Security ON for every table.
--   * Policies use auth.uid() — a user can ONLY ever see/modify
--     their own rows. No cross-user access, even via SQL injection.
--   * Frontend only ever uses the anon key; service-role key must
--     never leave the Supabase dashboard.
-- ============================================================

-- ------------------------------------------------------------
-- 1. profiles — public display name per user
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Learner',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ------------------------------------------------------------
-- 2. user_progress — one row per user; full snapshot jsonb
--    (this is the authoritative cloud copy of ProgressState)
-- ------------------------------------------------------------
create table if not exists public.user_progress (
  user_id        uuid primary key references auth.users (id) on delete cascade,
  total_xp       integer     not null default 0,
  level          integer     not null default 1,
  streak         integer     not null default 0,
  current_world  text        not null default 'w1',
  current_lesson text,
  state          jsonb       not null default '{}'::jsonb,
  updated_at     timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 3. lesson_progress — one row per (user, lesson)
-- ------------------------------------------------------------
create table if not exists public.lesson_progress (
  user_id      uuid not null references auth.users (id) on delete cascade,
  lesson_id    text not null,
  completed    boolean not null default false,
  quiz_score   integer,
  task_done    boolean not null default false,
  completed_at timestamptz,
  updated_at   timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

drop policy if exists "lesson_progress_select_own" on public.lesson_progress;
create policy "lesson_progress_select_own"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

drop policy if exists "lesson_progress_insert_own" on public.lesson_progress;
create policy "lesson_progress_insert_own"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "lesson_progress_update_own" on public.lesson_progress;
create policy "lesson_progress_update_own"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id);

-- ------------------------------------------------------------
-- 4. project_progress — one row per (user, project)
-- ------------------------------------------------------------
create table if not exists public.project_progress (
  user_id        uuid not null references auth.users (id) on delete cascade,
  project_id     text not null,
  completed      boolean not null default false,
  checklist_data jsonb not null default '[]'::jsonb,
  completed_at   timestamptz,
  updated_at     timestamptz not null default now(),
  primary key (user_id, project_id)
);

alter table public.project_progress enable row level security;

drop policy if exists "project_progress_select_own" on public.project_progress;
create policy "project_progress_select_own"
  on public.project_progress for select
  using (auth.uid() = user_id);

drop policy if exists "project_progress_insert_own" on public.project_progress;
create policy "project_progress_insert_own"
  on public.project_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "project_progress_update_own" on public.project_progress;
create policy "project_progress_update_own"
  on public.project_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists project_progress_user_idx on public.project_progress (user_id);

-- ------------------------------------------------------------
-- 5. quiz_attempts — history of lesson/boss/diagnostic attempts
--    (id is client-generated "quizId:isoTime" → idempotent upsert)
-- ------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id           text primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  quiz_id      text not null,
  kind         text not null check (kind in ('lesson', 'boss', 'diagnostic')),
  score        integer not null default 0,
  attempted_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

drop policy if exists "quiz_attempts_select_own" on public.quiz_attempts;
create policy "quiz_attempts_select_own"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

drop policy if exists "quiz_attempts_insert_own" on public.quiz_attempts;
create policy "quiz_attempts_insert_own"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- updates not needed: attempts are immutable, upsert is idempotent by id.
-- (no update policy → rows cannot be modified, only replaced/inserted)

create index if not exists quiz_attempts_user_idx on public.quiz_attempts (user_id);

-- ------------------------------------------------------------
-- 6. daily_activity — XP earned per local calendar day
-- ------------------------------------------------------------
create table if not exists public.daily_activity (
  user_id       uuid not null references auth.users (id) on delete cascade,
  activity_date date not null,
  xp_earned     integer not null default 0,
  primary key (user_id, activity_date)
);

alter table public.daily_activity enable row level security;

drop policy if exists "daily_activity_select_own" on public.daily_activity;
create policy "daily_activity_select_own"
  on public.daily_activity for select
  using (auth.uid() = user_id);

drop policy if exists "daily_activity_insert_own" on public.daily_activity;
create policy "daily_activity_insert_own"
  on public.daily_activity for insert
  with check (auth.uid() = user_id);

drop policy if exists "daily_activity_update_own" on public.daily_activity;
create policy "daily_activity_update_own"
  on public.daily_activity for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 7. Trigger: auto-create a profile row on sign-up
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1), 'Learner')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 8. updated_at auto-touch helper
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists user_progress_touch on public.user_progress;
create trigger user_progress_touch before update on public.user_progress
  for each row execute function public.touch_updated_at();

drop trigger if exists lesson_progress_touch on public.lesson_progress;
create trigger lesson_progress_touch before update on public.lesson_progress
  for each row execute function public.touch_updated_at();

drop trigger if exists project_progress_touch on public.project_progress;
create trigger project_progress_touch before update on public.project_progress
  for each row execute function public.touch_updated_at();
