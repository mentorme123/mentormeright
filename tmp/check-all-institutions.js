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
  // Check ALL student@ emails and their institutions
  const { data: allStudents, error: err1 } = await supabase
    .from('users')
    .select('email, institution_name')
    .like('email', 'student%@mentormeright.com');

  if (err1) { console.error('Error:', err1.message); return; }

  // Group by institution
  const byInst = {};
  for (const s of allStudents || []) {
    const inst = s.institution_name || '(null)';
    if (!byInst[inst]) byInst[inst] = [];
    byInst[inst].push(s.email);
  }

  console.log('=== Student@ emails by institution ===');
  for (const [inst, emails] of Object.entries(byInst)) {
    console.log(`${inst}: ${emails.length}`);
    if (inst !== 'Oasis International School') {
      console.log('  *** NON-OAISIS STUDENTS FOUND ***');
      emails.slice(0, 5).forEach(e => console.log('  ' + e));
    }
  }

  // Check ALL @mentormeright.in emails by institution
  const { data: namedUsers, error: err2 } = await supabase
    .from('users')
    .select('email, institution_name')
    .like('email', '%@mentormeright.in');

  if (err2) { console.error('Error:', err2.message); return; }

  const byInstNamed = {};
  for (const s of namedUsers || []) {
    const inst = s.institution_name || '(null)';
    if (!byInstNamed[inst]) byInstNamed[inst] = [];
    byInstNamed[inst].push(s.email);
  }

  console.log('\n=== @mentormeright.in emails by institution ===');
  for (const [inst, emails] of Object.entries(byInstNamed)) {
    console.log(`${inst}: ${emails.length}`);
    if (inst !== 'Oasis International School') {
      console.log('  *** NON-OAISIS USERS FOUND ***');
      emails.slice(0, 5).forEach(e => console.log('  ' + e));
    }
  }

  // Check for 13-digit IDs in ALL of auth.users
  console.log('\n=== Checking ALL auth.users for 13-digit student IDs ===');
  let allAuthUsers = [];
  let page = 1;
  while (true) {
    const { data: pageData } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    const users = pageData?.users || [];
    if (users.length === 0) break;
    allAuthUsers = allAuthUsers.concat(users);
    page++;
    if (page > 10) break;
  }

  const allThirteenDigit = allAuthUsers.filter(u => /^student\d{13}@/.test(u.email || ''));
  const allTenDigit = allAuthUsers.filter(u => /^student\d{10}@/.test(u.email || ''));
  console.log(`Total auth users: ${allAuthUsers.length}`);
  console.log(`13-digit student emails: ${allThirteenDigit.length}`);
  console.log(`10-digit student emails: ${allTenDigit.length}`);

  // Check for any users with email_confirm = false
  const unconfirmed = allUsers.filter(u => !u.email_confirmed_at);
  console.log(`Unconfirmed emails: ${unconfirmed.length}`);
}

run().catch(err => console.error('Error:', err));
