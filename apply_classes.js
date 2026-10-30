require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function apiRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co', path, method,
      headers: { 'apikey': serviceKey, 'Authorization': 'Bearer ' + serviceKey, 'Content-Type': 'application/json' }
    };
    const bodyStr = body ? JSON.stringify(body) : '';
    if (body) options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    const req = https.request(options, (res) => {
      let data = ''; res.on('data', c => data += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); } catch (e) { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('error', reject); if (body) req.write(bodyStr); req.end();
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

const norm = s => (s || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');

async function main() {
  const names = fs.readFileSync('/tmp/roster_names.txt','utf8').trim().split('\n').map(s => s.trim());
  const classes = fs.readFileSync('/tmp/roster_classes.txt','utf8').trim().split('\n').map(s => s.trim());
  console.log('Roster names:', names.length, '| Classes:', classes.length);

  // Build name -> class. For duplicate normalized names, keep first occurrence's class
  // but track all so we can assign per exact-name match.
  const nameToClass = {};
  for (let i = 0; i < names.length; i++) {
    const key = names[i];
    if (nameToClass[key] === undefined) nameToClass[key] = classes[i];
  }

  const enc = encodeURIComponent('Oasis International School');
  const r = await apiReqRetry(`/rest/v1/users?select=id,email,name,institution_name,role&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Oasis users:', oasis.length);

  let updated = 0, noMatch = 0;
  const noMatchList = [];
  for (const u of oasis) {
    const cls = nameToClass[u.name];
    if (cls) {
      const pr = await apiReqRetry(`/rest/v1/users?id=eq.${encodeURIComponent(u.id)}`, 'PATCH', { education_level: cls });
      if (pr.status === 200 || pr.status === 204) updated++;
      else console.log('Patch fail', u.email, pr.status);
    } else {
      noMatch++;
      noMatchList.push(u.email + ' | ' + u.name);
    }
  }
  console.log('Updated:', updated, '| No class match:', noMatch);
  if (noMatchList.length) { console.log('No match:'); noMatchList.forEach(e => console.log('  ', e)); }
}

main().catch(e => console.error(e));