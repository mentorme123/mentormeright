-- 10 free AI-evaluated answers per user per day (resets at midnight UTC).
-- Paid attempts (Razorpay) are unlimited.

create or replace function public.increment_interview_answers(p_attempt_id uuid)
returns void as $$
begin
  update interview_attempts
  set answers_count = answers_count + 1
  where id = p_attempt_id;
end;
$$ language sql security definer;

-- Ensure the column exists on already-created tables (safe no-op if present).
alter table interview_attempts add column if not exists answers_count integer default 0;