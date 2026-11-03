-- Migration: Grade 9-10 dashboard automation tables
-- Run in Supabase SQL Editor.
-- Creates student_dashboard_results, dashboard_jobs, and secure RPCs.
-- Does NOT alter existing assessment_results or users tables.

create extension if not exists pgcrypto;

create table if not exists public.student_dashboard_results (
  student_id text primary key,
  status text not null default 'pending' check (status in ('pending','ready','awaiting_report','awaiting_marks','error')),
  dashboard_data jsonb,
  source_report_id text,
  source_exam_period text,
  error_message text,
  calculated_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.dashboard_jobs (
  student_id text primary key,
  status text not null default 'pending' check (status in ('pending','processing','failed')),
  attempts integer not null default 0,
  next_run_at timestamptz not null default now(),
  lease_until timestamptz,
  claim_token uuid,
  last_error text,
  updated_at timestamptz not null default now()
);
create index if not exists dashboard_jobs_due_idx on public.dashboard_jobs (next_run_at) where status in ('pending','processing');

alter table public.student_dashboard_results enable row level security;
alter table public.dashboard_jobs enable row level security;

drop policy if exists student_dashboard_read_own on public.student_dashboard_results;
create policy student_dashboard_read_own on public.student_dashboard_results
  for select to authenticated using (student_id = auth.uid()::text);

-- No browser-side INSERT/UPDATE policies. Worker writes with server-only service role.

create or replace function public.enqueue_dashboard_job(p_student_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_student_id is null or length(trim(p_student_id)) = 0 then
    raise exception 'student_id required';
  end if;
  insert into public.dashboard_jobs(student_id,status,attempts,next_run_at,claim_token,lease_until,last_error,updated_at)
  values (p_student_id,'pending',0,now(),null,null,null,now())
  on conflict(student_id) do update set
    status='pending', attempts=0, next_run_at=now(), claim_token=null,
    lease_until=null, last_error=null, updated_at=now();
end; $$;
revoke all on function public.enqueue_dashboard_job(text) from public, anon, authenticated;
grant execute on function public.enqueue_dashboard_job(text) to service_role;

create or replace function public.claim_dashboard_jobs(p_limit integer default 50)
returns table(student_id text, claim_token uuid)
language plpgsql security definer set search_path = public as $$
begin
  return query
  with selected as (
    select j.student_id from public.dashboard_jobs j
    where (j.status='pending' and j.next_run_at<=now())
       or (j.status='processing' and j.lease_until<now())
    order by j.next_run_at, j.updated_at
    for update skip locked
    limit least(greatest(p_limit,1),100)
  ), claimed as (
    update public.dashboard_jobs j set
      status='processing', attempts=j.attempts+1,
      claim_token=gen_random_uuid(), lease_until=now()+interval '4 minutes',
      updated_at=now()
    from selected s where j.student_id=s.student_id
    returning j.student_id,j.claim_token
  ) select c.student_id,c.claim_token from claimed c;
end; $$;
revoke all on function public.claim_dashboard_jobs(integer) from public, anon, authenticated;
grant execute on function public.claim_dashboard_jobs(integer) to service_role;

create or replace function public.finish_dashboard_job(
  p_student_id text, p_claim_token uuid, p_status text, p_dashboard_data jsonb,
  p_source_report_id text default null, p_source_exam_period text default null,
  p_error text default null
) returns boolean language plpgsql security definer set search_path=public as $$
declare v_attempts integer;
begin
  select j.attempts into v_attempts from public.dashboard_jobs j
  where j.student_id=p_student_id and j.claim_token=p_claim_token and j.status='processing'
  for update;
  if not found then return false; end if;
  if p_status='error' then
    update public.dashboard_jobs set
      status=case when v_attempts>=5 then 'failed' else 'pending' end,
      next_run_at=now() + make_interval(mins=>least(60,2^least(v_attempts,5))::int),
      lease_until=null, claim_token=null, last_error=left(p_error,1000), updated_at=now()
    where student_id=p_student_id;
    insert into public.student_dashboard_results(student_id,status,error_message,updated_at)
    values(p_student_id,'error',left(p_error,1000),now())
    on conflict(student_id) do update set status='error',error_message=excluded.error_message,updated_at=now();
  else
    insert into public.student_dashboard_results
      (student_id,status,dashboard_data,source_report_id,source_exam_period,error_message,calculated_at,updated_at)
    values(p_student_id,p_status,p_dashboard_data,p_source_report_id,p_source_exam_period,null,now(),now())
    on conflict(student_id) do update set
      status=excluded.status,dashboard_data=excluded.dashboard_data,
      source_report_id=excluded.source_report_id,source_exam_period=excluded.source_exam_period,
      error_message=null,calculated_at=now(),updated_at=now();
    delete from public.dashboard_jobs where student_id=p_student_id;
  end if;
  return true;
end; $$;
revoke all on function public.finish_dashboard_job(text,uuid,text,jsonb,text,text,text) from public, anon, authenticated;
grant execute on function public.finish_dashboard_job(text,uuid,text,jsonb,text,text,text) to service_role;
