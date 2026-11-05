require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: projectRef + '.supabase.co',
      path,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
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
  const r = await api('/rest/v1/users?select=id,name,email,education_level&name=ilike.%25Abdul%20Hadi%25&institution_name=ilike.%25Oasis%25');
  console.log('All Abdul Hadi records:', JSON.stringify(r.body, null, 2));
}

main().catch(e => console.error(e));
