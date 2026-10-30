require('dotenv').config({ path: '.env.local' });
const https = require('https');
const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
const [projectRef] = url.hostname.split('.');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const INSTITUTION = 'Oasis International School';

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    };
    if (body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); } catch { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('error', reject);
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getUserByName(name) {
  const { body, status } = await api(
    '/rest/v1/users?select=id,email,name,institution_name&name=eq.' + encodeURIComponent(name) + '&institution_name=like.Oasis+International+School&role=eq.individual&limit=10'
  );
  if (status !== 200 || !Array.isArray(body)) return [];
  return body;
}

async function countAssessments(uuid) {
  const { body, status } = await api('/rest/v1/assessment_results?user_id=eq.' + encodeURIComponent(uuid) + '&select=id');
  if (status !== 200 || !Array.isArray(body)) return 0;
  return body.length;
}

async function deleteUser(uuid) {
  const { status: authStatus } = await api('/auth/v1/admin/users/' + encodeURIComponent(uuid), 'DELETE');
  const { status: pubStatus } = await api('/rest/v1/users?id=eq.' + encodeURIComponent(uuid), 'DELETE');
  return { authStatus, pubStatus };
}

function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  // Get all Oasis users
  const { body: users } = await api('/rest/v1/users?select=id,email,name,institution_name&role=eq.individual&institution_name=like.Oasis+International+School&order=name.asc&limit=500');

  // Group by normalized name
  const nameGroups = {};
  users.forEach(u => {
    const n = normalizeName(u.name);
    if (!n) return;
    if (!nameGroups[n]) nameGroups[n] = [];
    nameGroups[n].push(u);
  });

  console.log('Scanning for remaining duplicate name groups...\n');

  let deleted = 0;
  let keptWithTests = 0;
  let skipped = 0;
  let errors = 0;

  for (const [name, group] of Object.entries(nameGroups)) {
    const uniqueEmails = new Set(group.map(u => String(u.email || '').toLowerCase().trim()));
    if (group.length <= 1 || uniqueEmails.size <= 1) continue;

    console.log(`Duplicate: "${name}" — ${group.length} users:`);
    group.forEach(u => console.log(`  ${u.email} (id=${u.id})`));

    // Find which users have completed tests
    let keepId = null;
    const deleteCandidates = [];
    for (const u of group) {
      const testCount = await countAssessments(u.id);
      if (testCount > 0) {
        console.log(`  -> KEEP (has ${testCount} completed tests): ${u.email}`);
        keepId = u.id;
        keptWithTests++;
      } else {
        console.log(`  -> candidate for delete: ${u.email}`);
        deleteCandidates.push(u);
      }
    }

    // Delete candidates that don't have tests
    for (const u of deleteCandidates) {
      // Don't delete if this user is the keep (has tests)
      if (u.id === keepId) continue;
      console.log(`  DELETE: ${u.email} (no completed tests)`);
      await deleteUser(u.id);
      deleted++;
    }

    // If no one had tests, keep the newest (or any one)
    if (!keepId && deleteCandidates.length > 1) {
      const kept = deleteCandidates.pop(); // keep the last one
      console.log(`  No one had tests - keeping: ${kept.email}`);
      keptWithTests++;
      for (const u of deleteCandidates) {
        console.log(`  DELETE: ${u.email} (empty duplicate)`);
        await deleteUser(u.id);
        deleted++;
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Users deleted: ${deleted}`);
  console.log(`Users kept (with tests or no tests): ${keptWithTests}`);
  console.log(`Errors: ${errors}`);
  console.log(`Completed tests were NOT touched.`);
}

main().catch(e => console.error('Error:', e));
