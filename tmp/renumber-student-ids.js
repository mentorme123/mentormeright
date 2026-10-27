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
  // Step 1: Find and delete the duplicate (student1768573005 - Zoya Anees created Oct 27)
  // This is the user created on Oct 27, not part of the Sep 16 import batch
  const duplicateEmail = 'student1768573005@mentormeright.com';
  
  // Get the user's UUID
  const { data: dupUser, error: dupErr } = await supabase
    .from('users')
    .select('id, email, name')
    .eq('email', duplicateEmail)
    .single();

  if (dupUser) {
    console.log(`Deleting duplicate: ${dupUser.email} (${dupUser.name})`);
    
    // Delete from auth.users (cascades to public.users via FK)
    const { error: delAuthError } = await supabase.auth.admin.deleteUser(dupUser.id);
    if (delAuthError) {
      console.error('Error deleting auth user:', delAuthError.message);
    } else {
      // Also explicitly delete from public.users if not cascaded
      await supabase.from('users').delete().eq('id', dupUser.id);
      console.log('Deleted duplicate user.');
    }
  } else {
    console.log('Duplicate user not found, skipping deletion.');
  }

  // Step 2: Get all remaining student@ users sorted by created_at
  const { data: students, error: fetchError } = await supabase
    .from('users')
    .select('id, email, name, created_at')
    .like('email', 'student%@mentormeright.com')
    .order('created_at', { ascending: true });

  if (fetchError) {
    console.error('Error fetching students:', fetchError.message);
    return;
  }

  console.log(`\nFound ${students.length} student@ users to renumber.`);
  if (students.length !== 85) {
    console.log(`WARNING: Expected 85 students, found ${students.length}`);
  }

  // Step 3: Renumber sequentially from 1768572921
  const BASE_ID = 1768572921;
  let updated = 0;
  let failed = 0;

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const newId = BASE_ID + i;
    const newEmail = `student${newId}@mentormeright.com`;

    if (student.email === newEmail) {
      console.log(`SKIP (already correct): ${student.email}`);
      updated++;
      continue;
    }

    console.log(`RENUM: ${student.email} -> ${newEmail} (${student.name})`);

    try {
      // Update auth user email
      const { error: authError } = await supabase.auth.admin.updateUserById(student.id, {
        email: newEmail,
      });

      if (authError) {
        console.error(`  Auth update failed: ${authError.message}`);
        failed++;
        continue;
      }

      // Update public.users email
      const { error: profileError } = await supabase
        .from('users')
        .update({ email: newEmail })
        .eq('id', student.id);

      if (profileError) {
        console.error(`  Profile update failed: ${profileError.message}`);
        failed++;
        continue;
      }

      updated++;
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nSummary: ${updated} updated, ${failed} failed, ${students.length} total.`);
}

run().catch(err => console.error('Script error:', err));
