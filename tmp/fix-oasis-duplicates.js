require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

const INSTITUTION = 'Oasis International School';

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-dupes'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function authApi(path, method = 'GET', body = null) {
  const options = {
    hostname: projectRef + '.supabase.co',
    path,
    method,
    headers: { 'apikey': serviceKey, 'Authorization': 'Bearer ' + serviceKey }
  };
  if (body !== null) {
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
  }
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAllUsers(institution) {
  let all = [];
  let page = 0;
  const perPage = 1000;
  while (true) {
    const path = `/rest/v1/users?select=id,email,name,created_at,role,institution_name&role=eq.individual&institution_name=ilike.*Oasis%20International%20School*&order=created_at.desc&limit=${perPage}&offset=${page * perPage}`;
    const { data, status } = await api(path);
    if (status !== 200 || !Array.isArray(data) || data.length === 0) break;
    all = all.concat(data);
    if (data.length < perPage) break;
    page++;
  }
  return all;
}

async function countAssessments(uuid) {
  const { data, status } = await api(`/rest/v1/assessment_results?user_id=eq.${encodeURIComponent(uuid)}&select=id`);
  if (status !== 200) return 0;
  return Array.isArray(data) ? data.length : 0;
}

async function deleteAuthUser(uuid) {
  const { status } = await authApi(`/auth/v1/admin/users/${encodeURIComponent(uuid)}`, 'DELETE');
  return status;
}

async function deletePublicUser(uuid) {
  const { status } = await api(`/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`, 'DELETE');
  return status;
}

// Normalize a name for fuzzy duplicate matching
function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  console.log(`Scanning for duplicates at "${INSTITUTION}"...\n`);

  const users = await getAllUsers(INSTITUTION);
  console.log(`Total users with institution="${INSTITUTION}": ${users.length}\n`);

  // --- Detect duplicates by EMAIL ---
  const emailGroups = {};
  for (const u of users) {
    const key = String(u.email || '').toLowerCase().trim();
    if (!key) continue;
    if (!emailGroups[key]) emailGroups[key] = [];
    emailGroups[key].push(u);
  }

  // --- Detect duplicates by NAME (catches auto-generated student@ emails) ---
  const nameGroups = {};
  for (const u of users) {
    const normName = normalizeName(u.name);
    if (!normName) continue;
    if (!nameGroups[normName]) nameGroups[normName] = [];
    nameGroups[normName].push(u);
  }

  const emailDupes = Object.entries(emailGroups).filter(([k, g]) => g.length > 1);
  const nameDupes = Object.entries(nameGroups).filter(([k, g]) => {
    if (g.length <= 1) return false;
    const uniqueEmails = new Set(g.map(u => String(u.email || '').toLowerCase().trim()));
    return uniqueEmails.size > 1; // same name, different emails = duplicate
  });

  console.log(`Duplicate email groups (same email multiple times): ${emailDupes.length}`);
  console.log(`Duplicate name groups (same name, different emails): ${nameDupes.length}\n`);

  // Collect IDs to remove and IDs to keep
  const idsToRemove = new Set();
  const idsToKeep = new Set();

  for (const [email, group] of emailDupes) {
    const sorted = group.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const [oldest, ...duplicates] = sorted;
    idsToKeep.add(oldest.id);
    for (const d of duplicates) idsToRemove.add(d.id);
    console.log(`[EMAIL] ${oldest.name || 'unnamed'} <${oldest.email}>`);
    console.log(`  KEEP: id=${oldest.id}`);
    for (const d of duplicates) {
      console.log(`  REMOVE: id=${d.id} email=${d.email} created=${d.created_at}`);
    }
  }

  for (const [name, group] of nameDupes) {
    // Only process if not already handled by email dedup
    if (idsToRemove.size === 0 && group.length <= 1) continue;
    const uniqueEmails = new Set(group.map(u => String(u.email || '').toLowerCase().trim()));
    if (uniqueEmails.size <= 1) continue;

    const sorted = group.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const [oldest, ...duplicates] = sorted;
    if (!idsToKeep.has(oldest.id)) idsToKeep.add(oldest.id);
    for (const d of duplicates) idsToRemove.add(d.id);
    console.log(`[NAME] "${oldest.name}" (normalized: "${name}")`);
    console.log(`  KEEP: id=${oldest.id} email=${oldest.email}`);
    for (const d of duplicates) {
      console.log(`  REMOVE: id=${d.id} email=${d.email} created=${d.created_at}`);
    }
  }

  console.log(`\nTotal IDs to remove: ${idsToRemove.size}`);
  console.log(`Total IDs to keep:   ${idsToKeep.size}\n`);

  let deleted = 0;
  let skippedWithTests = 0;
  let errors = 0;

  for (const dupeId of idsToRemove) {
    // Don't delete an ID that's also marked as "keep" in another group
    if (idsToKeep.has(dupeId)) {
      console.log(`SKIP (marked as keep): id=${dupeId}`);
      continue;
    }

    const assessmentCount = await countAssessments(dupeId);

    if (assessmentCount > 0) {
      console.log(`SKIP (has ${assessmentCount} completed test(s)): id=${dupeId} — NOT touching completed tests`);
      skippedWithTests++;
      continue;
    }

    const user = users.find(u => u.id === dupeId);
    const userEmail = user?.email || 'unknown';
    const userName = user?.name || 'unnamed';

    console.log(`DELETE: ${userName} <${userEmail}> id=${dupeId}`);

    // Delete from auth.users
    const authStatus = await deleteAuthUser(dupeId);
    if (authStatus === 200 || authStatus === 204) {
      console.log(`  -> Deleted auth user`);
    } else {
      console.log(`  -> Auth delete: HTTP ${authStatus} (may already be gone)`);
    }

    // Delete from public.users
    const pubStatus = await deletePublicUser(dupeId);
    if (pubStatus === 200 || pubStatus === 204 || pubStatus === 206) {
      deleted++;
      console.log(`  -> Deleted public user`);
    } else {
      console.error(`  -> Public delete FAILED: HTTP ${pubStatus}`);
      errors++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total users scanned: ${users.length}`);
  console.log(`Users deleted: ${deleted}`);
  console.log(`Users skipped (had completed tests): ${skippedWithTests}`);
  console.log(`Users kept: ${users.length - deleted - skippedWithTests}`);
  console.log(`Errors: ${errors}`);
  console.log(`\nCompleted tests were NOT touched — users with completed assessments were skipped.`);
}

main().catch(err => console.error('Script error:', err));
