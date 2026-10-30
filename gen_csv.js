require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

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

// Same logic as /api/institution/credentials
function generateCredentials(email) {
  const local = String(email || '').split('@')[0];
  if (/^R\d+$/i.test(local)) {
    const digits = local.replace(/^R/i, '').slice(0, 20);
    return { username: email, password: `R@${digits}` };
  }
  return { username: email, password: `MM${local.replace(/[^a-z0-9]/gi, '')}@123` };
}

async function main() {
  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest(`/rest/v1/users?select=id,name,email,education_level,institution_name&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const students = Array.isArray(r.body) ? r.body : [];
  students.sort((a,b) => (a.name||'').localeCompare(b.name||''));
  console.log('Total students:', students.length);

  const rows = students.map(s => {
    const { username, password } = generateCredentials(s.email);
    return { name: String(s.name||'').trim().slice(0,100), username, password, cls: s.education_level || s.institution_name || '' };
  });

  let csv = 'Name,Username,Password,Class\n';
  rows.forEach(r => {
    csv += `"${r.name.replace(/"/g,'""')}","${r.username.replace(/"/g,'""')}","${r.password.replace(/"/g,'""')}","${String(r.cls).replace(/"/g,'""')}"\n`;
  });
  fs.writeFileSync('/tmp/credentials_download.csv', csv);
  console.log('Saved /tmp/credentials_download.csv');

  // Compare against the CSV the user shared
  const raw = fs.readFileSync('credentials_Oasis_International_School.csv','utf8').trim().split('\n');
  const shared = {};
  for (let i=1;i<raw.length;i++){
    const p = raw[i].split(',').map(x=>x.replace(/^"|"$/g,''));
    shared[p[1]] = { name:p[0], password:p[2] };
  }

  let match = 0, diff = 0;
  rows.forEach(r => {
    const s = shared[r.username];
    if (s && s.password === r.password) match++;
    else { diff++; if (diff<=20) console.log('DIFF:', r.username, '| csv:', s?s.password:'(none)', '| generated:', r.password); }
  });
  console.log(`\nMatch shared CSV: ${match} | Diff: ${diff} | Total: ${rows.length}`);
}

main().catch(e => console.error(e));