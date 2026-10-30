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
  const allPub = [];
  let page = 1;
  while (true) {
    const r = await apiRequest(`/rest/v1/users?select=id,email,name,institution_name,role&limit=1000&offset=${(page-1)*1000}`, 'GET');
    const users = Array.isArray(r.body) ? r.body : [];
    if (users.length === 0) break;
    allPub.push(...users);
    if (users.length < 1000) break;
    page++;
  }

  const oasis = allPub.filter(u => {
    const i = (u.institution_name || '').toLowerCase();
    return i.includes('oasis') && i.includes('international') && i.includes('school');
  });

  const roles = {};
  oasis.forEach(u => { roles[u.role] = (roles[u.role]||0)+1; });
  console.log('Oasis users by role:', roles);

  // Check which of our 151 CSV emails are in the Oasis set
  const fs = require('fs');
  const raw = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8').trim().split('\n');
  const csvEmails = [];
  for (let i = 1; i < raw.length; i++) {
    const parts = raw[i].split(',').map(p => p.replace(/^"|"$/g, ''));
    csvEmails.push(parts[1]);
  }
  const oasisEmails = new Set(oasis.map(u => u.email));
  const inSet = csvEmails.filter(e => oasisEmails.has(e));
  console.log('CSV emails present in Oasis set:', inSet.length, '/', csvEmails.length);

  // Oasis users NOT in our CSV (extra students)
  const extra = oasis.filter(u => !csvEmails.includes(u.email));
  console.log('Oasis users not in our 151 CSV:', extra.length);
  extra.slice(0, 20).forEach(u => console.log('  ', u.email, u.name));
}

main().catch(e => console.error(e));