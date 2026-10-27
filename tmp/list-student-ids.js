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
    .select('id, email, name, created_at')
    .like('email', 'student%@mentormeright.com')
    .order('created_at', { ascending: true });

  if (error) { console.error('Error:', error.message); return; }

  console.log('Total student@ emails:', students.length);
  students.forEach((s, i) => {
    console.log(`${i+1}. ${s.email} | created: ${s.created_at} | name: "${s.name}"`);
  });
}

run();
