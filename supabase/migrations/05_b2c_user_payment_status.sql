ALTER TABLE public.users ADD COLUMN IF NOT EXISTS has_paid_report BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'none' CHECK (payment_status IN ('none', 'pending', 'completed', 'failed'));
