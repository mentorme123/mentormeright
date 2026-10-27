const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const vars = {};
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
const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
const supabaseClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

async function run() {
  // Get all Oasis student users
  const { data: students, error } = await supabaseAdmin
    .from('users')
    .select('id, email')
    .eq('role', 'individual')
    .ilike('institution_name', 'Oasis International School')
    .like('email', 'student%@mentormeright.com')
    .order('created_at', { ascending: true });

  if (error) { console.error('Error:', error.message); return; }

  console.log('Testing login for all', students.length, 'students...');

  const generatePassword = (email) => {
    const local = email.split('@')[0];
    return 'MM' + local.replace(/[^a-z0-9]/gi, '') + '@123';
  };

  let success = 0;
  let failed = 0;
  const results = [];

  // Process in batches of 10 to avoid rate limiting
  for (let i = 0; i < students.length; i += 10) {
    const batch = students.slice(i, i + 10);
    const promises = batch.map(async (student) => {
      const password = generatePassword(student.email);
      
      // Set password (same as credentials API does)
      await supabaseAdmin.auth.admin.updateUserById(student.id, {
        password: password,
        email_confirm: true,
      });

      // Try to sign in
      const { error: signInError } = await supabaseClient.auth.signInWithPassword({
        email: student.email,
        password,
      });

      if (signInError) {
        return { email: student.email, status: 'FAILED', error: signInError.message };
      }
      return { email: student.email, status: 'SUCCESS' };
    });

    const batchResults = await Promise.all(promises);
    for (const r of batchResults) {
      if (r.status === 'SUCCESS') {
        success++;
      } else {
        failed++;
        console.log(`FAIL: ${r.email} - ${r.error}`);
      }
      results.push(r);
    }
    
    // Brief pause between batches
    if (i + 10 < students.length) await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n=== RESULTS ===');
  console.log('Successful logins:', success);
  console.log('Failed logins:', failed);
  console.log('Total:', students.length);

  // Also test one of the old 13-digit IDs to confirm it no longer exists
  const { data: oldCheck } = await supabaseAdmin.auth.admin.listUsers({
    email: 'student1789537645363@mentormeright.com',
  });
  console.log('\nOld 13-digit email still exists in auth.users:', oldCheck?.users?.length > 0 ? 'YES (ERROR!)' : 'NO (correct)');
}

run().catch(err => console.error('Script error:', err));
