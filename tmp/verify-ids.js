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
  const { data: allUsers, error } = await supabase
    .from('users')
    .select('email')
    .like('email', 'student%@mentormeright.com');

  if (error) {
    console.error('Error:', error);
    return;
  }

  const tenDigit = allUsers.filter(u => /^student\d{10}@mentormeright\.com$/.test(u.email));
  const thirteenDigit = allUsers.filter(u => /^student\d{13}@mentormeright\.com$/.test(u.email));

  console.log(`10-digit student IDs: ${tenDigit.length}`);
  console.log(`13-digit student IDs: ${thirteenDigit.length}`);
  console.log('Sample 10-digit:', tenDigit.slice(0, 3).map(u => u.email));
  console.log('Sample 13-digit:', thirteenDigit.slice(0, 3).map(u => u.email));

  if (thirteenDigit.length === 0) {
    console.log('\nAll student IDs are now 10-digit format.');
  } else {
    console.log(`\nWARNING: ${thirteenDigit.length} users still have 13-digit IDs.`);
  }
}

run();
