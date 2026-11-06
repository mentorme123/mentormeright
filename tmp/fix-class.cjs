require('dotenv').config({ path: '.env.local' });
const https = require('https');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = { hostname: ref + '.supabase.co', path, method, headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' } };
    const r = https.request(options, (resp) => {
      let d = '';
      resp.on('data', (c) => (d += c));
      resp.on('end', () => { try { resolve({ status: resp.statusCode, body: JSON.parse(d) }); } catch (e) { resolve({ status: resp.statusCode, body: d }); } });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

(async () => {
  const { body: students } = await api('/rest/v1/users?select=id,education_level&institution_name=ilike.Oasis%20International%20School&limit=1000');
  let updated = 0;
  for (const s of students) {
    const cls = (s.education_level || '').trim();
    if (!cls) continue;
    const newCls = cls.toLowerCase().startsWith('class ') ? cls : `Class ${cls}`;
    if (newCls === cls) continue;
    const { status } = await api(`/rest/v1/users?id=eq.${s.id}`, 'PATCH', { education_level: newCls });
    if (status >= 200 && status < 300) updated++;
    else console.log('FAIL', s.id, status);
  }
  console.log('updated', updated, 'of', students.length);
})();
