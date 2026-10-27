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
  // Find all users with 13-digit student IDs
  // Fetch users with student@mentormeright.com and filter in JS (regexp not available in this supabase version)
  const { data: allStudentUsers, error: fetchError } = await supabase
    .from('users')
    .select('id, email, name')
    .like('email', 'student%@mentormeright.com');

  if (fetchError) {
    console.error('Error fetching student users:', fetchError);
    return;
  }

  const thirteenDigitRegex = /^student(\d{13})@mentormeright\.com$/;
  const thirteenDigitUsers = (allStudentUsers || []).filter(u => thirteenDigitRegex.test(String(u.email || '')));

  if (!thirteenDigitUsers || thirteenDigitUsers.length === 0) {
    console.log('No 13-digit student IDs found.');
    return;
  }

  console.log(`Found ${thirteenDigitUsers.length} users with 13-digit student IDs.`);

  // Collect all target 10-digit emails to check for conflicts
  const targetEmails = thirteenDigitUsers.map(u => {
    const digits = u.email.match(/^student(\d{13})@mentormeright\.com$/)[1];
    const tenDigit = Math.floor(parseInt(digits) / 1000).toString();
    return `student${tenDigit}@mentormeright.com`;
  });

  // Check which target emails already exist (excluding the source 13-digit users themselves)
  const { data: existingTargets } = await supabase
    .from('users')
    .select('email')
    .in('email', targetEmails);

  const existingTargetSet = new Set(existingTargets?.map(e => e.email) || []);

  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < thirteenDigitUsers.length; i++) {
    const user = thirteenDigitUsers[i];
    const match = user.email.match(/^student(\d{13})@mentormeright\.com$/);
    if (!match) continue;

    const digits = match[1];
    const tenDigit = Math.floor(parseInt(digits) / 1000).toString();
    const newEmail = `student${tenDigit}@mentormeright.com`;

    if (existingTargetSet.has(newEmail)) {
      console.log(`SKIP (conflict): ${user.email} -> ${newEmail} (target already exists)`);
      skipped++;
      continue;
    }

    try {
      // Update auth user email
      const { error: authError } = await supabase.auth.admin.updateUserById(user.id, {
        email: newEmail,
      });

      if (authError) {
        // Might be a conflict in auth.users
        if (authError.message.includes('already')) {
          console.log(`SKIP (auth conflict): ${user.email} -> ${newEmail}`);
          skipped++;
          existingTargetSet.add(newEmail);
          continue;
        }
        console.error(`Auth update error for ${user.email}:`, authError.message);
        continue;
      }

      // Update public.users email
      const { error: profileError } = await supabase
        .from('users')
        .update({ email: newEmail })
        .eq('id', user.id);

      if (profileError) {
        console.error(`Profile update error for ${user.email}:`, profileError.message);
        continue;
      }

      // Check for auth email change confirmation requirement
      // Supabase may require email change confirmation; for admin updates, it's usually immediate
      console.log(`UPDATED: ${user.email} -> ${newEmail}`);
      updated++;
      existingTargetSet.add(newEmail);
    } catch (err) {
      console.error(`Error processing ${user.email}:`, err.message);
    }
  }

  console.log(`\nSummary: ${updated} updated, ${skipped} skipped, ${thirteenDigitUsers.length} total found.`);
}

run().catch(err => {
  console.error('Script error:', err);
});
