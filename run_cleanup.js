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
  const dupes = JSON.parse(fs.readFileSync('/tmp/dupes_to_delete.json','utf8'));
  console.log('Deleting', dupes.length, 'duplicate non-CSV Oasis users...');

  let deleted = 0, failed = 0;
  for (let i = 0; i < dupes.length; i++) {
    const d = dupes[i];
    try {
      // Delete auth user
      const ar = await apiReqRetry(`/auth/v1/admin/users/${encodeURIComponent(d.id)}`, 'DELETE');
      // Delete public user
      const pr = await apiReqRetry(`/rest/v1/users?id=eq.${encodeURIComponent(d.id)}`, 'DELETE');
      if (pr.status === 204 || pr.status === 200) deleted++;
      else { console.log(`Public delete failed ${d.email}: ${pr.status}`); failed++; }
    } catch (e) {
      console.log(`Error ${d.email}:`, e.message);
      failed++;
    }
    if (i % 25 === 0) console.log(`Progress: ${i}/${dupes.length} (deleted=${deleted}, failed=${failed})`);
  }
  console.log(`\nDone. Deleted: ${deleted}, Failed: ${failed}`);
}

main().catch(e => console.error(e));