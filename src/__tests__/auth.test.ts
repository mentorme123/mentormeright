import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '..', '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const vars: Record<string, string> = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    vars[key] = value;
  }
  return vars;
}

const env = loadEnv();
const hasSupabase = !!(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const OASIS_INSTITUTION = 'Oasis International School';

describe('Oasis International School Login', () => {
  describe('Valid Oasis student credentials', () => {
    it('should log in with tsewangthenduplepcha@mentormeright.com', async () => {
      if (!hasSupabase) {
        console.log('SKIP: Supabase env vars not configured');
        return;
      }

      const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const supabaseClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const email = 'tsewangthenduplepcha@mentormeright.com';
      const password = 'MMtsewangthenduplepcha@123';

      const { data: users } = await supabaseAdmin
        .from('users')
        .select('id, email, institution_name')
        .eq('email', email)
        .ilike('institution_name', OASIS_INSTITUTION)
        .maybeSingle();

      expect(users).toBeDefined();
      expect(users?.email).toBe(email);
      expect(users?.institution_name).toBe(OASIS_INSTITUTION);

      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      expect(error).toBeNull();
    });
  });

  describe('Invalid login credentials', () => {
    it('should reject wrong password for an Oasis student', async () => {
      if (!hasSupabase) {
        console.log('SKIP: Supabase env vars not configured');
        return;
      }

      const supabaseClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { error } = await supabaseClient.auth.signInWithPassword({
        email: 'tsewangthenduplepcha@mentormeright.com',
        password: 'wrongpassword123',
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('Invalid login');
    });

    it('should reject non-existent email', async () => {
      if (!hasSupabase) {
        console.log('SKIP: Supabase env vars not configured');
        return;
      }

      const supabaseClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { error } = await supabaseClient.auth.signInWithPassword({
        email: 'nonexistent@mentormeright.com',
        password: 'anypassword123',
      });

      expect(error).toBeDefined();
    });
  });
});
