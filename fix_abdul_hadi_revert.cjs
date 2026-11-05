require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    };
    if (body) {
      const bodyStr = JSON.stringify(body);
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(bodyStr);
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
  // Find Abdul Hadi's .com record in public.users
  const r = await api('/rest/v1/users?select=id,name,email,education_level&name=ilike.%25Abdul%20Hadi%25&institution_name=ilike.%25Oasis%25');
  console.log('Abdul Hadi records:', JSON.stringify(r.body, null, 2));

  const abdulHadiCom = (r.body || []).find(u => String(u.email || '').endsWith('@mentormeright.com'));
  if (!abdulHadiCom) {
    console.log('No .com record found for Abdul Hadi');
    return;
  }

  // Update email from .com to .in
  const newEmail = 'abdul_hadi@mentormeright.in';
  const upd = await api(`/rest/v1/users?id=eq.${encodeURIComponent(abdulHadiCom.id)}`, 'PATCH', { email: newEmail });
  console.log('Public users email update:', upd.status, JSON.stringify(upd.body));

  // Update auth user email
  const authUpd = await api(`/auth/v1/admin/users/${encodeURIComponent(abdulHadiCom.id)}`, 'PUT', { email: newEmail });
  console.log('Auth email update:', authUpd.status);

  // Update auth password
  const passUpd = await api(`/auth/v1/admin/users/${encodeURIComponent(abdulHadiCom.id)}`, 'PUT', { password: 'MMabdulhadi@123' });
  console.log('Auth password update:', passUpd.status);
}

main().catch(e => console.error(e));
