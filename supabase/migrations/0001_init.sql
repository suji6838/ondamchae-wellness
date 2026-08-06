-- 온담채 웰니스: 진단 결과 + AI 코치 체크 데이터를 계정별로 저장하는 테이블
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  answers jsonb not null default '[]'::jsonb,
  constitution text,
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create table if not exists public.coach_checks (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  checks jsonb not null default '{}'::jsonb,
  primary key (user_id, day)
);
alter table public.coach_checks enable row level security;
create policy "coach_checks_select_own" on public.coach_checks for select using (auth.uid() = user_id);
create policy "coach_checks_insert_own" on public.coach_checks for insert with check (auth.uid() = user_id);
create policy "coach_checks_update_own" on public.coach_checks for update using (auth.uid() = user_id);
