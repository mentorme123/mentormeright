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

async function main() {
  const names = fs.readFileSync('/tmp/roster_names.txt','utf8').trim().split('\n').map(s => s.trim());
  const classes = fs.readFileSync('/tmp/roster_classes.txt','utf8').trim().split('\n').map(s => s.trim());
  const nameToClass = {};
  for (let i = 0; i < names.length; i++) {
    if (nameToClass[names[i]] === undefined) nameToClass[names[i]] = classes[i];
  }

  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest(`/rest/v1/users?select=id,email,name,institution_name,role&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Oasis users:', oasis.length);

  let matched = 0, noMatch = [];
  oasis.forEach(u => {
    if (nameToClass[u.name] !== undefined) matched++;
    else noMatch.push(u.name + ' <' + u.email + '>');
  });
  console.log('Matched to roster:', matched, '| No match:', noMatch.length);
  noMatch.forEach(n => console.log('  NO MATCH:', n));
}

main().catch(e => console.error(e));