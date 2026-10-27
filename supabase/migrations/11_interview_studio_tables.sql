create extension if not exists "uuid-ossp";

create table if not exists interview_profiles (
  id uuid references auth.users not null primary key,
  name text not null,
  phone text not null,
  email text not null,
  free_used boolean default false
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
