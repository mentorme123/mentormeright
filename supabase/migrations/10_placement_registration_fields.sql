-- Add college field to users table for placement assessment registration
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS college TEXT;
