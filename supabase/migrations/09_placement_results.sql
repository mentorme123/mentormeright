CREATE TABLE IF NOT EXISTS public.placement_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  test_id TEXT NOT NULL,
  test_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  message TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_placement_results_user_id ON public.placement_results(user_id);
CREATE INDEX IF NOT EXISTS idx_placement_results_completed_at ON public.placement_results(completed_at DESC);
