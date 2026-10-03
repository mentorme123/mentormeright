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

const students = [
  { name: 'Labdhi Jain', email: 'labdhi.jain1806@gmail.com' },
  { name: 'Ann Nishita Joseph', email: '121324086005@sfc.ac.in' },
  { name: 'A Giri Ruthika', email: '121324083002@sfc.ac.in' }
];

(async () => {
  const results = [];
  for (const student of students) {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('email', student.email)
      .maybeSingle();

    if (!existingUser) {
      results.push({ ...student, status: 'not_found', error: 'No profile found' });
      continue;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        name: student.name,
        role: 'individual',
        audience_type: 'ST'
      })
      .eq('id', existingUser.id);

    if (updateError) {
      results.push({ ...student, status: 'update_error', error: updateError.message });
      continue;
    }

    const password = `MentorMe@${Math.floor(100 + Math.random() * 900)}`;
    const { error: passwordError } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password
    });

    if (passwordError) {
      results.push({ ...student, password, status: 'password_error', error: passwordError.message });
      continue;
    }

    results.push({ ...student, password, status: 'ready' });
  }

  console.log(JSON.stringify(results, null, 2));
})();
