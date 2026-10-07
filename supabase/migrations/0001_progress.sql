-- Logic Ladder: per-user progress and a real history, for the two actions the site
-- actually has — marking a module complete, and marking a problem solved.
--
-- Design: `activity_log` is the single source of truth, append-only (no update/delete
-- policy exists for it, so even the signed-in user can't rewrite history, only add to
-- it). `module_progress` and `problem_progress` are fast-read summaries, kept in sync
-- by a trigger that runs as the table owner (SECURITY DEFINER), not as the client.
-- Clients can SELECT those two summary tables but have no INSERT/UPDATE grant on them
-- at all — the only way to change them is to log an activity row, so "mark complete"
-- can never silently fail to persist or drift out of sync with the log.
--
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).

create table if not exists public.activity_log (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  kind        text not null check (kind in ('module_complete', 'module_incomplete', 'problem_solved', 'problem_unsolved')),
  item_id     text not null,   -- a module id (e.g. 'py10') or a problem id (e.g. 'two-sum')
  created_at  timestamptz not null default now()
);
create index if not exists activity_log_user_idx on public.activity_log (user_id, created_at desc);

create table if not exists public.module_progress (
  user_id      uuid not null references auth.users (id) on delete cascade,
  module_id    text not null,
  completed    boolean not null default false,
  completed_at timestamptz,
  updated_at   timestamptz not null default now(),
  primary key (user_id, module_id)
);

create table if not exists public.problem_progress (
  user_id      uuid not null references auth.users (id) on delete cascade,
  problem_id   text not null,
  solved       boolean not null default false,
  solved_at    timestamptz,
  updated_at   timestamptz not null default now(),
  primary key (user_id, problem_id)
);

-- ---------- keep the summaries in sync with the log ----------
create or replace function public.handle_activity_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.kind = 'module_complete' then
    insert into public.module_progress (user_id, module_id, completed, completed_at, updated_at)
    values (new.user_id, new.item_id, true, new.created_at, new.created_at)
    on conflict (user_id, module_id)
    do update set completed = true, completed_at = new.created_at, updated_at = new.created_at;

  elsif new.kind = 'module_incomplete' then
    insert into public.module_progress (user_id, module_id, completed, completed_at, updated_at)
    values (new.user_id, new.item_id, false, null, new.created_at)
    on conflict (user_id, module_id)
    do update set completed = false, completed_at = null, updated_at = new.created_at;

  elsif new.kind = 'problem_solved' then
    insert into public.problem_progress (user_id, problem_id, solved, solved_at, updated_at)
    values (new.user_id, new.item_id, true, new.created_at, new.created_at)
    on conflict (user_id, problem_id)
    do update set solved = true, solved_at = new.created_at, updated_at = new.created_at;

  elsif new.kind = 'problem_unsolved' then
    insert into public.problem_progress (user_id, problem_id, solved, solved_at, updated_at)
    values (new.user_id, new.item_id, false, null, new.created_at)
    on conflict (user_id, problem_id)
    do update set solved = false, solved_at = null, updated_at = new.created_at;
  end if;
  return new;
end;
$$;

drop trigger if exists on_activity_log_insert on public.activity_log;
create trigger on_activity_log_insert
  after insert on public.activity_log
  for each row execute function public.handle_activity_log();

-- ---------- row-level security ----------
alter table public.activity_log     enable row level security;
alter table public.module_progress  enable row level security;
alter table public.problem_progress enable row level security;

-- activity_log: a signed-in user may insert and read only their own rows. No update/delete
-- policy is defined for anyone, so once written a row can never be changed — a true history.
create policy "insert own activity" on public.activity_log
  for insert to authenticated with check (auth.uid() = user_id);
create policy "read own activity" on public.activity_log
  for select to authenticated using (auth.uid() = user_id);

-- module_progress / problem_progress: read-only to clients. They are written only by the
-- SECURITY DEFINER trigger above, so they can never go out of sync with the log.
create policy "read own module progress" on public.module_progress
  for select to authenticated using (auth.uid() = user_id);
create policy "read own problem progress" on public.problem_progress
  for select to authenticated using (auth.uid() = user_id);
