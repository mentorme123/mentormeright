require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  console.error('Add them to .env.local then run: node fix_oasis_duplicates.cjs');
  process.exit(1);
}

const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];
const INSTITUTION = 'Oasis International School';

console.log('Project ref:', projectRef);
console.log('Fixing Oasis International School duplicates\n');

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    };
    if (body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
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

async function getAllUsers() {
  const perPage = 1000;
  let all = [];
  let page = 0;
  while (true) {
    const path = `/rest/v1/users?select=id,email,name,created_at,role,institution_name&role=eq.individual&institution_name=ilike.*${encodeURIComponent(INSTITUTION)}*&order=created_at.desc&limit=${perPage}&offset=${page * perPage}`;
    const { body, status } = await api(path);
    if (status !== 200 || !Array.isArray(body) || body.length === 0) break;
    all = all.concat(body);
    if (body.length < perPage) break;
    page++;
  }
  return all;
}

async function getAssessment(uuid) {
  const { body, status } = await api(`/rest/v1/assessment_results?user_id=eq.${encodeURIComponent(uuid)}&select=id,completed_at`);
  if (status !== 200 || !Array.isArray(body)) return null;
  return body.length > 0 ? body[0] : null;
}

async function deleteUser(uuid) {
  const url = new URL('/auth/v1/admin/users/' + encodeURIComponent(uuid), 'https://' + projectRef + '.supabase.co');
  const authResult = await api(url.pathname, 'DELETE');
  const pubResult = await api(`/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`, 'DELETE');
  return { auth: authResult.status, public: pubResult.status };
}

async function updateEmail(uuid, newEmail) {
  const result = await api(`/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`, 'PATCH', { email: newEmail });
  return result;
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
  const users = await getAllUsers();
  console.log(`Total Oasis users: ${users.length}\n`);

  // Group by normalized name
  const nameGroups = {};
  for (const u of users) {
    const key = normalizeName(u.name);
    if (!key) continue;
    if (!nameGroups[key]) nameGroups[key] = [];
    nameGroups[key].push(u);
  }

  const dupGroups = Object.entries(nameGroups).filter(([, g]) => g.length > 1);
  console.log(`Duplicate name groups: ${dupGroups.length}\n`);

  let deleted = 0, updated = 0, errors = 0, skipped = 0;

  for (const [name, group] of dupGroups) {
    // Split into .com and .in
    const comUsers = group.filter(u => String(u.email || '').endsWith('@mentormeright.com'));
    const inUsers = group.filter(u => String(u.email || '').endsWith('@mentormeright.in'));

    if (comUsers.length === 0 || inUsers.length === 0) continue;

    console.log(`=== ${name} ===`);
    console.log(`  .com users:`, comUsers.map(u => ` ${u.email} (${u.id})`).join('\n'));
    console.log(`  .in users:`, inUsers.map(u => ` ${u.email} (${u.id})`).join('\n'));

    // Check assessment status for each .com user
    for (const comUser of comUsers) {
      const assessment = await getAssessment(comUser.id);
      const hasCompleted = assessment !== null;

      console.log(`  .com ${comUser.email}: assessment=${hasCompleted ? 'COMPLETE' : 'none'}`);

      if (hasCompleted) {
        // .com has completed test - update its email to .in, delete the .in record (pending, no data)
        const inUser = inUsers[0];
        const inAssessment = await getAssessment(inUser.id);

        if (inAssessment) {
          console.log(`  SKIP: .in ${inUser.email} also has completed test — cannot merge`);
          skipped++;
          continue;
        }

        // Delete the .in user (pending, no data to lose)
        const delResult = await deleteUser(inUser.id);
        if (delResult.auth === 200 || delResult.auth === 204) {
          console.log(`  Deleted .in ${inUser.email} (pending, no data)`);
          deleted++;
        } else {
          console.error(`  ERROR deleting .in ${inUser.email}: auth=${delResult.auth} public=${delResult.public}`);
          errors++;
          continue;
        }

        // Update .com email to .in
        const inEmail = inUser.email;
        const updResult = await updateEmail(comUser.id, inEmail);
        if (updResult.status === 200 || updResult.status === 204) {
          console.log(`  Updated .com ${comUser.email} -> ${inEmail} (preserved completed test)`);
          updated++;
        } else {
          console.error(`  ERROR updating .com ${comUser.email} to ${inEmail}: ${updResult.status}`);
          errors++;
        }
      } else {
        // .com is pending - just delete it
        const delResult = await deleteUser(comUser.id);
        if (delResult.auth === 200 || delResult.auth === 204) {
          console.log(`  Deleted .com ${comUser.email} (pending, duplicate)`);
          deleted++;
        } else {
          console.error(`  ERROR deleting .com ${comUser.email}: auth=${delResult.auth} public=${delResult.public}`);
          errors++;
        }
      }
    }
    console.log('');
  }

  console.log(`=== SUMMARY ===`);
  console.log(`Deleted: ${deleted}`);
  console.log(`Updated (.com -> .in, preserved completed): ${updated}`);
  console.log(`Skipped (conflict): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(err => console.error('Script error:', err));
