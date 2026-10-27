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
const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

async function run() {
  // Test 1: Set a password for student1768572921 and try to sign in
  const testEmail = 'student1768572921@mentormeright.com';
  const testPassword = 'MMstudent1768572921@123';

  console.log(`Testing login for: ${testEmail}`);

  // Set the password explicitly
  const { data: users } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', testEmail)
    .single();

  if (!users) {
    console.log('User not found');
    return;
  }

  console.log(`User ID: ${users.id}`);

  // Update password
  const { error: pwError } = await supabaseAdmin.auth.admin.updateUserById(users.id, {
    password: testPassword,
    email_confirm: true,
  });

  if (pwError) {
    console.error('Password update error:', pwError.message);
  } else {
    console.log('Password set successfully');
  }

  // Now try to sign in with a fresh client (no service role)
  const supabaseClient = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error('Login FAILED:', signInError.message);
    console.error('Status:', signInError.status);
    console.error('Code:', signInError.code);
  } else {
    console.log('Login SUCCESS!');
    console.log('User ID:', signInData.user?.id);
    console.log('Email:', signInData.user?.email);
  }
}

run().catch(err => console.error('Script error:', err));
