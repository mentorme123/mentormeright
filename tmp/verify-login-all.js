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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  // Get all Oasis student users
  const { data: students, error } = await supabaseAdmin
    .from('users')
    .select('id, email, name')
    .eq('role', 'individual')
    .ilike('institution_name', 'Oasis International School')
    .like('email', 'student%@mentormeright.com')
    .order('created_at', { ascending: true });

  if (error) { console.error('Error:', error.message); return; }

  const generatePassword = (email) => {
    const local = email.split('@')[0];
    return 'MM' + local.replace(/[^a-z0-9]/gi, '') + '@123';
  };

  // Set passwords for all users first (no delay needed for admin API)
  console.log('Setting passwords for', students.length, 'students...');
  for (const student of students) {
    const password = generatePassword(student.email);
    await supabaseAdmin.auth.admin.updateUserById(student.id, {
      password: password,
      email_confirm: true,
    });
  }
  console.log('All passwords set.');

  // Test login for first 5 and last 3 (to verify range)
  const testUsers = students.slice(0, 5).concat(students.slice(-3));
  console.log('\nTesting login for', testUsers.length, 'users...');

  let success = 0;
  let failed = 0;

  for (const student of testUsers) {
    const password = generatePassword(student.email);
    const { data, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email: student.email,
      password,
    });

    if (signInError) {
      console.log(`FAIL: ${student.email} - ${signInError.message}`);
      failed++;
    } else {
      console.log(`OK: ${student.email}`);
      success++;
    }
    
    // Sign out before next attempt
    await supabaseClient.auth.signOut();
    
    // Wait 2 seconds to avoid rate limiting
    await sleep(2000);
  }

  console.log(`\n=== RESULTS ===`);
  console.log('Successful:', success);
  console.log('Failed:', failed);
  console.log('Total tested:', testUsers.length);
}

run().catch(err => console.error('Error:', err));
