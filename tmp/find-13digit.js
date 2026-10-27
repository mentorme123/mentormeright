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
  // Search for the specific 13-digit email
  const targetEmail = 'student1789537645363@mentormeright.com';
  console.log(`Searching for: ${targetEmail}`);

  const { data: searchResults, error: searchError } = await supabaseAdmin.auth.admin.listUsers({
    email: targetEmail,
    perPage: 100,
  });

  console.log(`Direct search result:`, JSON.stringify(searchResults?.users?.map(u => ({
    id: u.id,
    email: u.email,
    confirmed: !!u.email_confirmed_at,
    updated: u.updated_at
  })), null, 2));

  // Also list ALL auth users and find 13-digit emails
  console.log('\n--- Listing all auth users (paginating) ---');
  let allUsers = [];
  let page = 1;
  while (true) {
    const { data: pageData } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    const users = pageData?.users || [];
    if (users.length === 0) break;
    allUsers = allUsers.concat(users);
    console.log(`Page ${page}: ${users.length} users (total: ${allUsers.length})`);
    page++;
    if (page > 10) break;
  }

  // Find 13-digit student emails
  const thirteenDigit = allUsers.filter(u => /^student\d{13}@mentormeright\.com$/i.test(u.email || ''));
  console.log(`\n13-digit student emails in ALL auth.users: ${thirteenDigit.length}`);
  thirteenDigit.forEach(u => console.log(`  ${u.email} | id: ${u.id} | confirmed: ${!!u.email_confirmed_at}`));

  // Also check for 1789... IDs that might have 13 digits in a different format
  const longIds = allUsers.filter(u => {
    const m = u.email?.match(/^student(\d+)@/);
    return m && m[1].length >= 13;
  });
  console.log(`\nAll student@ emails with 13+ digit IDs: ${longIds.length}`);
  longIds.slice(0, 10).forEach(u => console.log(`  ${u.email} | digits: ${u.email?.match(/^student(\d+)@/)?.[1]?.length}`));
}

run().catch(err => console.error('Error:', err));
