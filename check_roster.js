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
  console.log('Roster names:', names.length, '| Classes:', classes.length);

  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest(`/rest/v1/users?select=id,email,name,institution_name,role&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Oasis users:', oasis.length);

  const dbNames = new Set(oasis.map(u => u.name));
  const unmatchedRoster = [];
  for (let i = 0; i < names.length; i++) {
    if (!dbNames.has(names[i])) unmatchedRoster.push({ name: names[i], cls: classes[i] });
  }
  console.log('Roster names with no DB match:', unmatchedRoster.length);
  unmatchedRoster.forEach(n => console.log('  ', n.name, '->', n.cls));

  const rosterSet = new Set(names);
  const unmatchedDb = oasis.filter(u => !rosterSet.has(u.name));
  console.log('DB users with no roster match:', unmatchedDb.length);
  unmatchedDb.forEach(u => console.log('  ', u.name, '<' + u.email + '>'));
}

main().catch(e => console.error(e));