require('dotenv').config({ path: '.env.local' });
const https = require('https');

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
  const tests = [
    '/rest/v1/users?select=*&limit=5',
    '/rest/v1/users?select=id,email,name,institution_name,role&limit=5',
    '/rest/v1/users?select=id,email,name,institution_name,role&role=eq.individual&limit=5',
    '/rest/v1/users?select=id,email,name,institution_name,role&id=eq.13104cf1-380e-4082-8614-a05af5070432',
  ];
  for (const p of tests) {
    const r = await apiRequest(p, 'GET');
    console.log(p, '->', r.status, JSON.stringify(r.body).slice(0, 300));
  }
}

main().catch(e => console.error(e));