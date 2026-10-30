require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function apiRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: path,
      method: method,
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
      }
    };
    const bodyStr = body ? JSON.stringify(body) : '';
    if (body) options.headers['Content-Length'] = Buffer.byteLength(bodyStr);

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
    if (body) req.write(bodyStr);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function apiReqRetry(path, method, body, retries = 6) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try { return await apiRequest(path, method, body); }
    catch (e) { lastErr = e; await sleep(1500 * (i + 1)); }
  }
  throw lastErr;
}

async function main() {
  const enc = encodeURIComponent('Oasis International School');
  const r = await apiReqRetry(`/rest/v1/users?select=id,email,name,institution_name,role,created_at&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Oasis individual users:', oasis.length);

  const raw = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8').trim().split('\n');
  const csvRows = [];
  for (let i = 1; i < raw.length; i++) {
    const parts = raw[i].split(',').map(p => p.replace(/^"|"$/g, ''));
    csvRows.push({ name: parts[0], username: parts[1], password: parts[2] });
  }
  const csvEmails = new Set(csvRows.map(c => c.username));

  const norm = (s) => (s||'').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const groups = {};
  oasis.forEach(u => { const k = norm(u.name); if (!groups[k]) groups[k] = []; groups[k].push(u); });

  let dupesToDelete = [];
  let csvUsersInGroup = 0;
  for (const [k, group] of Object.entries(groups)) {
    if (group.length === 1) continue;
    const csvMembers = group.filter(u => csvEmails.has(u.email));
    csvUsersInGroup += csvMembers.length;
    // Delete only members that are NOT CSV users
    const toDelete = group.filter(u => !csvEmails.has(u.email));
    for (const o of toDelete) {
      dupesToDelete.push({ id: o.id, email: o.email, name: o.name, kept: csvMembers.map(c => c.email) });
    }
  }
  console.log('CSV users that share a name group:', csvUsersInGroup);
  console.log('Non-CSV duplicates to delete:', dupesToDelete.length);

  // Check completed tests
  const ids = dupesToDelete.map(d => d.id);
  const completedSet = new Set();
  if (ids.length) {
    for (let i = 0; i < ids.length; i += 500) {
      const chunk = ids.slice(i, i + 500);
      const ar = await apiReqRetry(`/rest/v1/assessment_results?select=user_id&user_id=in.(${chunk.join(',')})&limit=1000`, 'GET');
      const rows = Array.isArray(ar.body) ? ar.body : [];
      rows.forEach(r => { if (r.user_id) completedSet.add(r.user_id); });
    }
  }
  const safeToDelete = dupesToDelete.filter(d => !completedSet.has(d.id));
  const skipTest = dupesToDelete.filter(d => completedSet.has(d.id));
  console.log('Duplicates with completed tests (SKIP):', skipTest.length);
  console.log('Duplicates safe to delete:', safeToDelete.length);

  // Verify none are CSV users
  const csvLeak = safeToDelete.filter(d => csvEmails.has(d.email));
  console.log('CSV users in delete list (must be 0):', csvLeak.length);

  fs.writeFileSync('/tmp/dupes_to_delete.json', JSON.stringify(safeToDelete, null, 2));
  console.log('Plan saved. Sample:');
  safeToDelete.slice(0,10).forEach(d => console.log(' ', d.email, '|', d.name, '| kept:', d.kept));
}

main().catch(e => console.error(e));