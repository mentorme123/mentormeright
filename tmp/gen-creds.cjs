require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path) {
  return new Promise((resolve, reject) => {
    const options = { hostname: ref + '.supabase.co', path, method: 'GET', headers: { apikey: key, Authorization: 'Bearer ' + key } };
    const r = https.request(options, (resp) => {
      let d = '';
      resp.on('data', (c) => (d += c));
      resp.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(d); } });
    });
    r.on('error', reject);
    r.end();
  });
}

function genCred(email) {
  const local = String(email || '').split('@')[0];
  if (/^R\d+$/i.test(local)) {
    const digits = local.replace(/^R/i, '').slice(0, 20);
    return { username: email, password: 'R@' + digits };
  }
  return { username: email, password: 'MM' + local.replace(/[^a-z0-9]/gi, '') + '@123' };
}

function esc(v) { return String(v || '').replace(/"/g, '""'); }

(async () => {
  const students = await api('/rest/v1/users?select=name,email,education_level&role=eq.individual&institution_name=ilike.Oasis%20International%20School&order=name.asc&limit=1000');
  const rows = students.map((s) => {
    const { username, password } = genCred(s.email);
    const cls = esc(s.education_level);
    return `"${esc(s.name)}","${esc(username)}","${esc(password)}","${cls}"`;
  });
  const csv = 'Name,Username,Password,Class\n' + rows.join('\n') + '\n';
  fs.writeFileSync('credentials_Oasis_from_DB.csv', csv);
  console.log('wrote', students.length, 'rows to credentials_Oasis_from_DB.csv');
})();
