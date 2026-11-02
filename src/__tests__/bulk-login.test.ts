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

function parseCsv(csv: string) {
  const lines = csv.split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  return lines.slice(1).map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    values.push(current.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] || ''; });
    return obj;
  });
}

const env = loadEnv();
const hasSupabase = !!(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

describe('Bulk Oasis International School Login from CSV', () => {
  it('should bulk log in all Oasis students from credentials CSV', async () => {
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

    const csvPath = path.resolve(__dirname, '..', '..', 'credentials_Oasis_International_School.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const rows = parseCsv(csvContent);

    const oasisRows = rows.filter(r => r.Username && r.Password);

    expect(oasisRows.length).toBeGreaterThan(0);

    let success = 0;
    let failed = 0;
    const failures: string[] = [];

    const BATCH_SIZE = 5;

    for (let i = 0; i < oasisRows.length; i += BATCH_SIZE) {
      const batch = oasisRows.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.all(batch.map(async (row) => {
        const email = row.Username;
        const password = row.Password;

        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', email)
          .maybeSingle();

        if (userData) {
          await supabaseAdmin.auth.admin.updateUserById(userData.id, {
            password,
            email_confirm: true,
          });
        }

        let signInError: { message: string } | null = null;
        for (let attempt = 0; attempt < 3; attempt++) {
          const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
          if (!error) break;
          signInError = error;
          if (error.message.includes('rate limit')) {
            await sleep(1000);
          } else {
            break;
          }
        }

        if (signInError) {
          return { email, success: false, error: signInError.message };
        }
        return { email, success: true };
      }));

      for (const r of batchResults) {
        if (r.success) {
          success++;
        } else {
          failed++;
          failures.push(`${r.email}: ${r.error}`);
        }
      }

      await sleep(1000);
    }

    console.log(`\nBulk login results: ${success} succeeded, ${failed} failed out of ${oasisRows.length}`);
    if (failures.length > 0) {
      console.log('Failures:', failures.slice(0, 10));
    }

    expect(failed).toBe(0);
  }, 180000);
});
