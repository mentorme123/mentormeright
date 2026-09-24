ALTER TABLE public.users ADD COLUMN IF NOT EXISTS has_paid_assessment BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS assessment_payment_status TEXT DEFAULT 'none' CHECK (assessment_payment_status IN ('none', 'pending', 'completed', 'failed'));
