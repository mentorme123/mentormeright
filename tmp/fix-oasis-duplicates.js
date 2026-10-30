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

async function transferAssessments(fromId, toId) {
  const { data, status } = await api(
    `/rest/v1/assessment_results?user_id=eq.${encodeURIComponent(fromId)}`,
    'PATCH',
    { user_id: toId }
  );
  return { data, status };
}

async function deleteAuthUser(uuid) {
  const { status } = await authApi(`/auth/v1/admin/users/${encodeURIComponent(uuid)}`, 'DELETE');
  return status;
}

async function deletePublicUser(uuid) {
  const { status } = await api(`/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`, 'DELETE');
  return status;
}

async function findAuthUsersByEmail(email) {
  const { data } = await authApi(`/auth/v1/admin/users?email=${encodeURIComponent(email)}`);
  if (!data || !data.users) return [];
  return data.users;
}

// Normalize a name for fuzzy duplicate matching:
// - trim, lowercase, collapse whitespace
// - remove punctuation
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
  console.log(`Total users with institution="${INSTITUTION}": ${users.length}`);

  // --- Detect duplicates by EMAIL (same email, multiple rows) ---
  const emailGroups = {};
  for (const u of users) {
    const key = String(u.email || '').toLowerCase().trim();
    if (!key) continue;
    if (!emailGroups[key]) emailGroups[key] = [];
    emailGroups[key].push(u);
  }

  // --- Detect duplicates by NAME (same normalized name, multiple rows with DIFFERENT emails) ---
  // This catches the auto-generated student@ emails that change on every import run
  const nameGroups = {};
  for (const u of users) {
    const normName = normalizeName(u.name);
    if (!normName) continue;
    if (!nameGroups[normName]) nameGroups[normName] = [];
    nameGroups[normName].push(u);
  }

  // Collect all duplicate groups
  // Email-based: groups with >1 user sharing the same email
  const emailDupes = Object.entries(emailGroups).filter(([k, g]) => g.length > 1);
  // Name-based: groups with >1 user sharing the same normalized name (but different emails)
  const nameDupes = Object.entries(nameGroups).filter(([k, g]) => {
    if (g.length <= 1) return false;
    // If all users in this group share the same email, it's already covered by emailDupes
    const uniqueEmails = new Set(g.map(u => String(u.email || '').toLowerCase().trim()));
    return uniqueEmails.size > 1;
  });

  console.log(`Duplicate email groups: ${emailDupes.length}`);
  console.log(`Duplicate name groups (different emails): ${nameDupes.length}\n`);

  let deleted = 0;
  let transferred = 0;
  let errors = 0;

  // Helper: collect all duplicate IDs to remove across both email and name groups
  // Map: keepId -> Set of dupeIds to remove
  const allDupes = {}; // key: email|name -> { keep: user, dupes: [users] }

  for (const [email, group] of emailDupes) {
    const sorted = group.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const keep = sorted[0];
    const dupes = sorted.slice(1);
    if (!allDupes[email]) allDupes[email] = { keep, dupes: [] };
    allDupes[email].dupes.push(...dupes);
  }

  for (const [name, group] of nameDupes) {
    const sorted = group.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const keep = sorted[0];
    const dupes = sorted.slice(1);
    if (!allDupes['name:' + name]) allDupes['name:' + name] = { keep, dupes: [] };
    allDupes['name:' + name].dupes.push(...dupes);
  }

  for (const key of Object.keys(allDupes)) {
    const { keep, dupes } = allDupes[key];
    if (dupes.length === 0) continue;

    const label = keep.name || 'unnamed';
    console.log(`\n=== ${label} <${keep.email}> ===`);
    console.log(`  KEEP:  id=${keep.id}  created=${keep.created_at}`);

    for (const dupe of dupes) {
      console.log(`  DUP:   id=${dupe.id}  email=${dupe.email}  created=${dupe.created_at}`);

      const assessmentCount = await countAssessments(dupe.id);

      if (assessmentCount > 0) {
        console.log(`  >> This duplicate has ${assessmentCount} completed test(s). Transferring to kept user...`);
        const transferResult = await transferAssessments(dupe.id, keep.id);
        if (transferResult.status === 200 || transferResult.status === 204) {
          transferred += assessmentCount;
          console.log(`  >> Transfer SUCCESS (${assessmentCount} test(s) preserved)`);
        } else {
          console.error(`  >> Transfer FAILED: HTTP ${transferResult.status}`);
          errors++;
          continue;
        }
      }

      // Also delete from auth.users for the duplicate email
      const authDupes = await findAuthUsersByEmail(dupe.email);
      const authDupesToDelete = authDupes.filter(a => a.id !== keep.id && a.id === dupe.id);
      for (const authDupe of authDupesToDelete) {
        const delStatus = await deleteAuthUser(authDupe.id);
        if (delStatus === 200 || delStatus === 204) {
          console.log(`  >> Deleted auth user ${authDupe.id}`);
        } else {
          console.log(`  >> Auth delete ${authDupe.id}: HTTP ${delStatus} (may already be gone)`);
        }
      }

      // Delete from public.users
      const pubStatus = await deletePublicUser(dupe.id);
      if (pubStatus === 200 || pubStatus === 204 || pubStatus === 206) {
        console.log(`  >> Deleted public user ${dupe.id}`);
        deleted++;
      } else {
        console.error(`  >> Public delete FAILED: HTTP ${pubStatus}`);
        errors++;
      }
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total users scanned: ${users.length}`);
  console.log(`Duplicate groups processed: ${Object.keys(allDupes).filter(k => allDupes[k].dupes.length > 0).length}`);
  console.log(`Users deleted: ${deleted}`);
  console.log(`Completed tests preserved (transferred): ${transferred}`);
  console.log(`Errors: ${errors}`);
  console.log(`\nNOTE: Completed assessment results were transferred to the KEPT (oldest) account, never deleted.`);
}

main().catch(err => console.error('Script error:', err));
