require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];
const INSTITUTION = 'Oasis International School';

function apiRequest(path, method, body, extraHeaders) {
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
    if (extraHeaders) Object.assign(options.headers, extraHeaders);
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
    req.on('socket', (s) => s.setTimeout(20000, () => { req.destroy(new Error('timeout')); }));
    if (body) req.write(bodyStr);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function apiRequestWithRetry(path, method, body, extraHeaders, retries = 5) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await apiRequest(path, method, body, extraHeaders);
    } catch (e) {
      lastErr = e;
      await sleep(1500 * (i + 1));
    }
  }
  throw lastErr;
}

// Load credentials CSV: Name,Username,Password,Class
function loadCredentials() {
  const raw = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8').trim().split('\n');
  const rows = [];
  for (let i = 1; i < raw.length; i++) {
    const parts = raw[i].split(',').map(p => p.replace(/^"|"$/g, ''));
    rows.push({ name: parts[0], username: parts[1], password: parts[2] });
  }
  return rows;
}

// Fetch ALL auth users via pagination (email filter param is unreliable)
async function getAllAuthUsers() {
  const all = [];
  let page = 1;
  while (true) {
    const r = await apiRequestWithRetry(`/auth/v1/admin/users?page=${page}&per_page=1000`, 'GET');
    const users = r.body?.users || [];
    all.push(...users);
    if (users.length < 1000) break;
    page++;
  }
  return all;
}

// Upsert public.users row
async function upsertPublicUser(uuid, email, name) {
  const r = await apiRequestWithRetry('/rest/v1/users', 'POST', [{
    id: uuid, email, name, role: 'individual', institution_name: INSTITUTION
  }], { 'Prefer': 'resolution=merge-dupes' });
  if (r.status === 200 || r.status === 201 || r.status === 204) return { ok: true };
  if (r.status === 409) {
    const r2 = await apiRequestWithRetry(`/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`, 'PATCH', {
      name, institution_name: INSTITUTION, password: null
    });
    if (r2.status === 200 || r2.status === 204) return { ok: true };
    return { ok: false, status: r2.status, body: r2.body };
  }
  return { ok: false, status: r.status, body: r.body };
}

async function main() {
  const creds = loadCredentials();
  console.log('Loaded', creds.length, 'credentials');

  const allAuth = await getAllAuthUsers();
  console.log('Total auth users:', allAuth.length);
  const authByEmail = {};
  allAuth.forEach(u => { if (u.email) authByEmail[u.email] = u; });

  let authCreated = 0, authUpdated = 0, authFailed = 0;
  let pubOk = 0, pubFail = 0;

  for (const cred of creds) {
    const email = cred.username;
    const password = cred.password;
    const name = cred.name;
    let authUser = authByEmail[email];

    try {
      if (authUser) {
        // Update password via PUT (PATCH returns 405 on this project)
        const r = await apiRequestWithRetry(`/auth/v1/admin/users/${authUser.id}`, 'PUT', { password });
        if (r.status === 200 || r.status === 204) {
          authUpdated++;
        } else {
          console.error(`Auth update failed ${email}: ${r.status} ${JSON.stringify(r.body)}`);
          authFailed++;
          continue;
        }
      } else {
        const r = await apiRequestWithRetry('/auth/v1/admin/users', 'POST', {
          email, password, email_confirm: true,
          user_metadata: { full_name: name }
        });
        if (r.status === 200 || r.status === 201) {
          authUser = r.body;
          authCreated++;
        } else {
          console.error(`Auth create failed ${email}: ${r.status} ${JSON.stringify(r.body)}`);
          authFailed++;
          continue;
        }
      }

      const pub = await upsertPublicUser(authUser.id, email, name);
      if (pub.ok) pubOk++;
      else { pubFail++; console.error(`Public failed ${email}: ${pub.status} ${JSON.stringify(pub.body)}`); }
    } catch (err) {
      console.error(`Error ${email}:`, err.message);
      authFailed++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Auth: created=${authCreated}, updated=${authUpdated}, failed=${authFailed}`);
  console.log(`Public: ok=${pubOk}, failed=${pubFail}`);
}

main().catch(e => console.error(e));