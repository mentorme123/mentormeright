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
  // Get all student@ users for Oasis International School
  const { data: students, error } = await supabase
    .from('users')
    .select('id, email')
    .like('email', 'student%@mentormeright.com')
    .ilike('institution_name', 'Oasis International School')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log(`Found ${students?.length || 0} student users to fix.`);

  let fixed = 0;
  let failed = 0;

  for (const student of students || []) {
    try {
      const { error: updateError } = await supabase.auth.admin.updateUserById(student.id, {
        email: student.email,
        email_confirm: true,
      });

      if (updateError) {
        console.error(`Failed to set email_confirm for ${student.email}:`, updateError.message);
        failed++;
      } else {
        console.log(`Fixed: ${student.email}`);
        fixed++;
      }
    } catch (err) {
      console.error(`Error for ${student.email}:`, err.message);
      failed++;
    }
  }

  console.log(`\nSummary: ${fixed} fixed, ${failed} failed.`);

  // Also fix the named emails (@mentormeright.in)
  const { data: namedUsers } = await supabase
    .from('users')
    .select('id, email')
    .like('email', '%@mentormeright.in')
    .ilike('institution_name', 'Oasis International School');

  console.log(`\nFound ${namedUsers?.length || 0} named users to fix.`);

  for (const user of namedUsers || []) {
    try {
      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        email: user.email,
        email_confirm: true,
      });
      if (updateError) {
        console.error(`Failed: ${user.email}:`, updateError.message);
      } else {
        console.log(`Fixed: ${user.email}`);
      }
    } catch (err) {
      console.error(`Error for ${user.email}:`, err.message);
    }
  }
}

run().catch(err => console.error('Script error:', err));
