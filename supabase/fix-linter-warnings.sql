-- Fix function_search_path_mutable warnings
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.get_cohort_misalignment_rate(text) SET search_path = public;
ALTER FUNCTION public.get_cohort_reality_gap(text) SET search_path = public;
ALTER FUNCTION public.rls_auto_enable() SET search_path = public;

-- Fix rls_policy_always_true warning for analytics_events
-- Replace the overly permissive INSERT policy with one that checks the session/user role
-- Only allow insert from authenticated users or service_role
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'analytics_events'
      AND policyname = 'Allow insert analytics'
  ) THEN
    EXECUTE 'DROP POLICY "Allow insert analytics" ON public.analytics_events';
  END IF;
END $$;

CREATE POLICY "Allow insert analytics"
ON public.analytics_events
FOR INSERT
TO authenticated, service_role
WITH CHECK (true);

-- Fix anon_security_definer_function_executable warnings
-- Revoke EXECUTE from anon role for SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_cohort_misalignment_rate(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_cohort_reality_gap(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;

-- Fix authenticated_security_definer_function_executable warnings
-- Revoke EXECUTE from authenticated role for SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_cohort_misalignment_rate(text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_cohort_reality_gap(text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- Note: auth_leaked_password_protection must be enabled via Supabase Auth settings UI.
-- Open Supabase Dashboard -> Authentication -> Password Policies -> Enable leaked password protection.
