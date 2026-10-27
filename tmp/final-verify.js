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
  const { data: students, error } = await supabase
    .from('users')
    .select('id, name, email')
    .like('email', 'student%@mentormeright.com')
    .order('name', { ascending: true });

  if (error) { console.error('Error:', error.message); return; }

  console.log('Total student@ emails:', students.length);
  const tenDigits = students.filter(u => /^student\d{10}@/.test(u.email || ''));
  const thirteenDigits = students.filter(u => /^student\d{13}@/.test(u.email || ''));
  console.log('10-digit:', tenDigits.length);
  console.log('13-digit:', thirteenDigits.length);

  // Check sequential range
  const ids = students.map(s => {
    const m = s.email.match(/^student(\d+)@/);
    return m ? parseInt(m[1]) : 0;
  }).sort((a, b) => a - b);

  const expected = Array.from({length: 85}, (_, i) => 1768572921 + i);
  const match = JSON.stringify(ids) === JSON.stringify(expected);

  console.log('\nIDs sequential from 1768572921 to 1768573005:', match);
  console.log('First 3:', students.slice(0, 3).map(s => s.email));
  console.log('Last 3:', students.slice(-3).map(s => s.email));

  // Also check named emails for Oasis International School
  const { data: namedStudents } = await supabase
    .from('users')
    .select('email')
    .like('email', '%@mentormeright.in')
    .ilike('institution_name', 'Oasis International School');

  console.log('\nNamed emails (Oasis International School):', namedStudents?.length || 0);

  // Verify the credentials API would generate matching username/password
  console.log('\nCredential pairs (first 5):');
  const generateCredentials = (email) => {
    const local = String(email || '').split('@')[0];
    if (/^R\d+$/i.test(local)) {
      return { username: email, password: 'R@' + local.replace(/^R/i, '').slice(0, 20) };
    }
    return { username: email, password: 'MM' + local.replace(/[^a-z0-9]/gi, '') + '@123' };
  };

  for (const s of students.slice(0, 5)) {
    const cred = generateCredentials(s.email);
    console.log(`  Username: ${cred.username}`);
    console.log(`  Password:  ${cred.password}`);
  }
}

run();
