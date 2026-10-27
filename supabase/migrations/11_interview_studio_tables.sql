create extension if not exists "uuid-ossp";

create table if not exists interview_profiles (
  id uuid references auth.users not null primary key,
  name text not null,
  phone text not null,
  email text not null,
  free_used boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists interview_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  assessment text not null,
  created bigint not null,
  expires bigint not null,
  status text not null,
  question text not null,
  history text default '[]' not null,
  order_id text,
  payment_id text,
  busy integer default 0,
  audio_purged integer default 0
);

create table if not exists interview_custom_sets (
  id text primary key,
  data text not null
);

create index if not exists idx_interview_attempts_user_id on interview_attempts(user_id);
create index if not exists idx_interview_attempts_status on interview_attempts(status);

-- Enable Row Level Security
alter table interview_profiles enable row level security;
alter table interview_attempts enable row level security;

-- Profiles: users can view and insert their own profile
create policy "Users can view own interview profile" on interview_profiles
  for select using (auth.uid() = id);
create policy "Users can insert own interview profile" on interview_profiles
  for insert with check (auth.uid() = id);
create policy "Service role can upsert any interview profile" on interview_profiles
  for update using (true);

-- Attempts: users can view and manage their own attempts
create policy "Users can view own interview attempts" on interview_attempts
  for select using (auth.uid() = user_id);
create policy "Users can insert own interview attempts" on interview_attempts
  for insert with check (auth.uid() = user_id);
create policy "Users can update own interview attempts" on interview_attempts
  for update using (auth.uid() = user_id);
create policy "Users can delete own interview attempts" on interview_attempts
  for delete using (auth.uid() = user_id);

-- Custom sets: readable by authenticated users, writable by admins
create policy "Authenticated users can read custom sets" on interview_custom_sets
  for select using (auth.uid() is not null);
create policy "Authenticated users can insert custom sets" on interview_custom_sets
  for insert with check (auth.uid() is not null);
create policy "Authenticated users can update custom sets" on interview_custom_sets
  for update using (auth.uid() is not null);
