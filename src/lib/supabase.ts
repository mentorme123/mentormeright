import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Return a dummy client or handle gracefully during build
    // This prevents the "supabaseUrl is required" error
    return createBrowserClient(
      url || 'https://placeholder.supabase.co',
      anonKey || 'placeholder'
    );
  }

  return createBrowserClient(url, anonKey);
}
