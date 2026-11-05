require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    };
    if (body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
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
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAllAuthUsers() {
  const all = [];
  let page = 1;
  while (true) {
    const { body, status } = await api(`/auth/v1/admin/users?page=${page}&per_page=1000`);
    if (status !== 200 || !body?.users) break;
    all.push(...body.users);
    if (body.users.length < 1000) break;
    page++;
  }
  return all;
}

async function main() {
  const authUsers = await getAllAuthUsers();
  console.log('Total auth users:', authUsers.length);
  
  const targetEmails = ['abdul_hadi@mentormeright.in', 'samrah_aftab@mentormeright.in'];
  for (const email of targetEmails) {
    const found = authUsers.find(u => u.email === email);
    if (found) {
      console.log(`Found: ${email} -> id=${found.id} (type: ${typeof found.id})`);
    } else {
      console.log(`Not found: ${email}`);
    }
  }
}

main().catch(err => console.error('Script error:', err));
