-- Migration: Connect existing tables to dashboard automation for Grade 9-10
-- Run AFTER 13_dashboard_queue.sql.
-- Creates academic_marks table, triggers on assessment_results + academic_marks, and bulk backfills existing students.

-- 1. Academic marks table (new - stores subject-wise marks for dashboard calculation)
create table if not exists public.academic_marks (
  id uuid primary key default uuid_generate_v4(),
  student_id text not null,
  subject text not null,
  marks_obtained numeric not null,
  maximum_marks numeric not null check (maximum_marks > 0),
  stage text not null,
  exam_period text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint academic_marks_obtained_check check (marks_obtained >= 0 and marks_obtained <= maximum_marks)
);
create index if not exists academic_marks_student_idx on public.academic_marks (student_id);
create index if not exists academic_marks_period_idx on public.academic_marks (exam_period, stage);

alter table public.academic_marks enable row level security;
drop policy if exists students_view_own_marks on public.academic_marks;
create policy students_view_own_marks on public.academic_marks
  for select to authenticated using (student_id = auth.uid()::text);
drop policy if exists service_role_marks on public.academic_marks;
create policy service_role_marks on public.academic_marks
  for all to authenticated using (auth.role() = 'service_role');

-- 2. Trigger function to enqueue dashboard recalculation on source changes
create or replace function public.queue_dashboard_on_source_change()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  if tg_op='DELETE' then
    perform public.enqueue_dashboard_job(old.student_id::text);
    return old;
  end if;
  perform public.enqueue_dashboard_job(new.student_id::text);
  if tg_op='UPDATE' and old.student_id is distinct from new.student_id then
    perform public.enqueue_dashboard_job(old.student_id::text);
  end if;
  return new;
end; $$;
revoke all on function public.queue_dashboard_on_source_change() from public, anon, authenticated;

-- 3. Triggers on assessment_results (career report source)
drop trigger if exists queue_dashboard_after_report_change on public.assessment_results;
create trigger queue_dashboard_after_report_change
  after insert or update or delete on public.assessment_results
  for each row execute function public.queue_dashboard_on_source_change();

-- 4. Triggers on academic_marks (marks source)
drop trigger if exists queue_dashboard_after_marks_change on public.academic_marks;
create trigger queue_dashboard_after_marks_change
  after insert or update or delete on public.academic_marks
  for each row execute function public.queue_dashboard_on_source_change();

-- 5. One-time backfill: queue all existing students with assessment report OR marks
insert into public.dashboard_jobs(student_id)
select distinct student_id::text from (
  select user_id::text as student_id from public.assessment_results
  union
  select student_id::text as student_id from public.academic_marks
) existing
where student_id is not null
on conflict (student_id) do update set
  status='pending', attempts=0, next_run_at=now(), claim_token=null,
  lease_until=null, last_error=null, updated_at=now();
