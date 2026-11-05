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
  const r = await api('/auth/v1/admin/users/0ddb3035-f9e8-4dbe-92e1-68b4a0f7a812', 'PUT', { password: 'MMabdulhadi1@123' });
  console.log('Status:', r.status);
  console.log('Body:', JSON.stringify(r.body));
}

main().catch(e => console.error(e));
