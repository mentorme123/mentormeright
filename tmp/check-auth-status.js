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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

async function run() {
  // List all auth users and check their email confirmation status
  const { data: authList, error } = await supabase.auth.admin.listUsers({
    perPage: 200,
  });

  if (error) { console.error('Error:', error.message); return; }

  // Filter for student@ mentormeright.com users
  const studentUsers = authList.users.filter(u => /^student\d{10}@mentormeright\.com$/.test(u.email || ''));
  const unconfirmed = studentUsers.filter(u => !u.email_confirmed_at);

  console.log(`Total student@ auth users: ${studentUsers.length}`);
  console.log(`Unconfirmed: ${unconfirmed.length}`);
  console.log(`Confirmed: ${studentUsers.length - unconfirmed.length}`);

  if (unconfirmed.length > 0) {
    console.log('\nUnconfirmed students:');
    unconfirmed.slice(0, 5).forEach(u => {
      console.log(`  ${u.email} | confirmed: ${u.email_confirmed_at} | updated: ${u.updated_at}`);
    });
  }

  // Also check the first few confirmed users
  console.log('\nFirst 5 confirmed students:');
  studentUsers.filter(u => u.email_confirmed_at).slice(0, 5).forEach(u => {
    console.log(`  ${u.email} | confirmed: ${u.email_confirmed_at}`);
  });

  // Check for any 13-digit emails still in auth.users
  const thirteenDigit = authList.users.filter(u => /^student\d{13}@/.test(u.email || ''));
  console.log(`\n13-digit emails in auth.users: ${thirteenDigit.length}`);
  if (thirteenDigit.length > 0) {
    thirteenDigit.slice(0, 3).forEach(u => console.log(`  ${u.email}`));
  }

  // Check public.users vs auth.users for Oasis students
  const { data: pubUsers } = await supabase
    .from('users')
    .select('id, email')
    .ilike('institution_name', 'Oasis International School')
    .eq('role', 'individual')
    .like('email', 'student%@mentormeright.com');

  console.log(`\nOasis student users in public.users: ${pubUsers?.length || 0}`);
  console.log('First 3:', (pubUsers || []).slice(0, 3).map(u => u.email));
}

run();
