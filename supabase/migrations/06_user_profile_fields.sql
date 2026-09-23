-- Add missing user profile fields for registration and admin visibility
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS mobile TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS school TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS education_level TEXT;
