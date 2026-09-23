-- Store temporary password for admin reference only
-- WARNING: This stores password in plaintext for admin viewing. Remove if not needed.
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password TEXT;
