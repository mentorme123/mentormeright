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
    .eq('role', 'individual')
    .ilike('institution_name', 'Oasis International School')
    .order('name', { ascending: true });

  if (error) { console.error(error); return; }

  const generateCredentials = (email) => {
    const local = String(email || '').split('@')[0];
    if (/^R\d+$/i.test(local)) {
      const digits = local.replace(/^R/i, '').slice(0, 20);
      return { username: email, password: 'R@' + digits };
    }
    return { username: email, password: 'MM' + local.replace(/[^a-z0-9]/gi, '') + '@123' };
  };

  const results = [];
  for (const s of students || []) {
    const { username, password } = generateCredentials(s.email);
    const userNum = username.match(/(\d+)/)?.[1] || '';
    const passNum = password.match(/(\d+)/)?.[1] || '';
    const match = userNum === passNum;
    if (!match) {
      console.log('MISMATCH:', username, '->', password);
    }
    results.push({ username, password, match });
  }

  const mismatches = results.filter(r => !r.match).length;
  const tenDigit = results.filter(r => /^student\d{10}@/.test(r.username)).length;
  const thirteenDigit = results.filter(r => /^student\d{13}@/.test(r.username)).length;

  console.log('Total students:', results.length);
  console.log('Username/password mismatches:', mismatches);
  console.log('10-digit usernames:', tenDigit);
  console.log('13-digit usernames:', thirteenDigit);
  console.log('Sample pairs:');
  results.slice(0, 5).forEach(r => console.log('  ' + r.username + ' -> ' + r.password));
}

run();
