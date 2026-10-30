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

async function main() {
  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest(`/rest/v1/users?select=id,email,name,institution_name,role&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Dashboard query (role=individual, ilike Oasis):', oasis.length);

  const raw = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8').trim().split('\n');
  const csvEmails = new Set();
  for (let i = 1; i < raw.length; i++) {
    const parts = raw[i].split(',').map(p => p.replace(/^"|"$/g, ''));
    csvEmails.add(parts[1]);
  }
  const inCsv = oasis.filter(u => csvEmails.has(u.email)).length;
  const other = oasis.filter(u => !csvEmails.has(u.email));
  console.log('  In CSV list:', inCsv);
  console.log('  Other Oasis users:', other.length);
  other.forEach(u => console.log('     ', u.email, u.name));

  // Completed tests
  const ids = oasis.map(u => u.id);
  let completed = 0;
  if (ids.length) {
    for (let i = 0; i < ids.length; i += 500) {
      const chunk = ids.slice(i, i + 500);
      const ar = await apiRequest(`/rest/v1/assessment_results?select=user_id&user_id=in.(${chunk.join(',')})&limit=1000`, 'GET');
      const rows = Array.isArray(ar.body) ? ar.body : [];
      const set = new Set(rows.map(x => x.user_id));
      completed += set.size;
    }
  }
  console.log('  Tests Completed:', completed);
}

main().catch(e => console.error(e));