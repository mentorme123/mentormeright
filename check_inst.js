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
  const all = [];
  let offset = 0;
  while (true) {
    const r = await apiRequest(`/rest/v1/users?select=id,email,name,institution_name,role&limit=1000&offset=${offset}`, 'GET');
    const users = Array.isArray(r.body) ? r.body : [];
    if (users.length === 0) break;
    all.push(...users);
    if (users.length < 1000) break;
    offset += 1000;
  }
  console.log('Total users:', all.length);

  const variants = {};
  all.forEach(u => {
    const i = u.institution_name;
    if (i && i.toLowerCase().includes('oasis')) {
      variants[i] = (variants[i] || 0) + 1;
    }
  });
  console.log('Oasis institution_name variants:');
  Object.entries(variants).forEach(([k,v]) => console.log('  ', JSON.stringify(k), '=', v));

  const exactIndividual = all.filter(u => u.institution_name === 'Oasis International School' && u.role === 'individual').length;
  console.log('Exact "Oasis International School" + individual:', exactIndividual);

  const ilikeIndividual = all.filter(u => u.institution_name && u.institution_name.toLowerCase() === 'oasis international school' && u.role === 'individual').length;
  console.log('ilike exact + individual:', ilikeIndividual);
}

main().catch(e => console.error(e));