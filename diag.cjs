require('dotenv').config({ path: '.env.local' });
const https = require('https');

const projectRef = 'fszbbmbaoqigotemhkda';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d ? JSON.parse(d) : null }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  const r1 = await api('/auth/v1/admin/users?page=1&per_page=1000');
  const authUsers = r1.body?.users || [];
  console.log('Auth users count:', authUsers.length);
  const oasisAuth = authUsers.filter(u => String(u.email || '').includes('mentormeright'));
  console.log('Auth users with mentormeright:', oasisAuth.length);
  oasisAuth.forEach(u => console.log(' ', u.email, u.id));

  const r2 = await api('/rest/v1/users?select=id,email,name,institution_name&limit=10');
  console.log('\nPublic users sample:', JSON.stringify(r2.body, null, 2));

  const r3 = await api('/rest/v1/users?select=id,email,name,institution_name&institution_name=ilike.%25Oasis%25&limit=10');
  console.log('\nOasis public users:', JSON.stringify(r3.body, null, 2));
}

main().catch(e => console.error(e));
