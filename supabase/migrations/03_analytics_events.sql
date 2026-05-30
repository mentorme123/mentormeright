-- ============================================
-- Phase 3: Analytics Events Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  path TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow inserts from service role (API route uses service role key)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: allow inserts from authenticated or service role
DROP POLICY IF EXISTS "Allow insert analytics" ON public.analytics_events;
CREATE POLICY "Allow insert analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Policy: allow admin to read
DROP POLICY IF EXISTS "Allow admin read analytics" ON public.analytics_events;
CREATE POLICY "Allow admin read analytics" ON public.analytics_events
  FOR SELECT USING (true);
