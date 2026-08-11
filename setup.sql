-- DATAPREV Estudos: esquema para Supabase
create extension if not exists pgcrypto;

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  discipline text not null,
  topic text not null,
  status text not null default 'nao_iniciado',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.studies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  study_date date not null,
  discipline text not null,
  topic text not null,
  minutes integer not null check (minutes > 0),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_date date not null,
  discipline text not null,
  topic text not null,
  total integer not null check (total > 0),
  correct integer not null check (correct >= 0 and correct <= total),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  question_goal integer not null default 2000,
  profile text,
  updated_at timestamptz not null default now()
);

alter table public.topics enable row level security;
alter table public.studies enable row level security;
alter table public.questions enable row level security;
alter table public.settings enable row level security;

drop policy if exists "topics_own" on public.topics;
create policy "topics_own" on public.topics
for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "studies_own" on public.studies;
create policy "studies_own" on public.studies
for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "questions_own" on public.questions;
create policy "questions_own" on public.questions
for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "settings_own" on public.settings;
create policy "settings_own" on public.settings
for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.topics to authenticated;
grant select, insert, update, delete on public.studies to authenticated;
grant select, insert, update, delete on public.questions to authenticated;
grant select, insert, update, delete on public.settings to authenticated;
