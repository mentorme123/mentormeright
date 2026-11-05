require('dotenv').config({ path: '.env.local' });
const https = require('https');

const projectRef = 'fszbbmbaoqigotemhkda';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function api(path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: projectRef + '.supabase.co',
      path,
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    };
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d ? JSON.parse(d) : null }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const r1 = await api('/rest/v1/users?select=id,email,name,education_level&name=ilike.%25Test3%25&institution_name=ilike.%25Oasis%25');
  console.log('Test3 users:', JSON.stringify(r1.body, null, 2));

  const r2 = await api('/rest/v1/users?select=id,email,name,education_level&name=ilike.%25Haziqah%25&institution_name=ilike.%25Oasis%25');
  console.log('Haziqah Kasheef users:', JSON.stringify(r2.body, null, 2));
}

main().catch(e => console.error(e));
