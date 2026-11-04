require('dotenv').config({ path: '.env.local' });
const https = require('https');

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = 'fszbbmbaoqigotemhkda';

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
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  // Get all Oasis students from public users
  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest('/rest/v1/users?select=id,email,name,education_level&institution_name=eq.' + enc + '&role=eq.individual&order=name.asc', 'GET');
  const students = Array.isArray(r.body) ? r.body : [];
  console.log('Total Oasis students in DB:', students.length);

  let updated = 0, failed = 0, noAuth = 0;

  for (const s of students) {
    const email = s.email;
    const local = String(email || '').split('@')[0];
    let password;
    if (/^R\d+$/i.test(local)) {
      const digits = local.replace(/^R/i, '').slice(0, 20);
      password = `R@${digits}`;
    } else {
      password = `MM${local.replace(/[^a-z0-9]/gi, '')}@123`;
    }

    // Find auth user by email
    const authR = await apiRequest('/auth/v1/admin/users?email=' + encodeURIComponent(email), 'GET');
    const authUsers = authR.body?.users || [];
    const authUser = authUsers[0];

    if (!authUser) {
      console.log('NO AUTH USER:', email);
      noAuth++;
      continue;
    }

    // Update password via PUT
    const upd = await apiRequest('/auth/v1/admin/users/' + encodeURIComponent(authUser.id), 'PUT', { password });
    if (upd.status === 200 || upd.status === 204) {
      updated++;
      if (updated % 20 === 0) console.log('Updated:', updated, '/', students.length);
    } else {
      console.log('FAILED:', email, upd.status, JSON.stringify(upd.body));
      failed++;
    }

    await sleep(300); // rate limit protection
  }

  console.log(`\n=== Summary ===`);
  console.log('Total:', students.length);
  console.log('Passwords updated:', updated);
  console.log('Failed:', failed);
  console.log('No auth user:', noAuth);
}

main().catch(e => console.error(e));
