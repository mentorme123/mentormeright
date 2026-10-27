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
  // Check if the specific 13-digit email still exists
  const targetEmail = 'student1789537645363@mentormeright.com';
  const { data: usersWith13digit, error: err1 } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', targetEmail);

  console.log(`Looking for: ${targetEmail}`);
  console.log(`Found in public.users: ${JSON.stringify(usersWith13digit)}`);
  if (err1) console.error('Error:', err1.message);

  // Check auth.users for the 13-digit email
  const { data: authList, error: err2 } = await supabase.auth.admin.listUsers();
  const auth13digit = authList?.users?.filter(u => /^student\d{13}@mentormeright\.com$/i.test(u.email || ''));
  console.log(`Found in auth.users (13-digit): ${auth13digit?.length || 0}`);
  if (auth13digit && auth13digit.length > 0) {
    auth13digit.slice(0, 5).forEach(u => console.log(`  ${u.email}`));
  }

  // Check if the 10-digit version exists
  const newEmail = 'student1789537645@mentormeright.com';
  const { data: usersWith10digit, error: err3 } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', newEmail);
  console.log(`\nLooking for: ${newEmail}`);
  console.log(`Found in public.users: ${JSON.stringify(usersWith10digit)}`);

  // Total count of all student@ emails
  const { data: allStudents, error: err4 } = await supabase
    .from('users')
    .select('email')
    .like('email', 'student%@mentormeright.com');
  
  const thirteen = allStudents?.filter(u => /^student\d{13}@/.test(u.email || ''));
  const ten = allStudents?.filter(u => /^student\d{10}@/.test(u.email || ''));
  console.log(`\nTotal student@ emails: ${allStudents?.length || 0}`);
  console.log(`  10-digit: ${ten?.length || 0}`);
  console.log(`  13-digit: ${thirteen?.length || 0}`);
  if (thirteen && thirteen.length > 0) {
    console.log('  Remaining 13-digit emails (first 5):');
    thirteen.slice(0, 5).forEach(u => console.log(`    ${u.email}`));
  }
}

run();
