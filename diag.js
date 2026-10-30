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

async function main() {
  // Exact dashboard query: role=individual, institution_name ilike 'Oasis International School'
  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest(`/rest/v1/users?select=id,email,name,institution_name,role,education_level,created_at&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Dashboard query result (role=individual, ilike Oasis):', oasis.length);

  // CSV emails
  const raw = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8').trim().split('\n');
  const csvRows = [];
  for (let i = 1; i < raw.length; i++) {
    const parts = raw[i].split(',').map(p => p.replace(/^"|"$/g, ''));
    csvRows.push({ name: parts[0], username: parts[1], password: parts[2] });
  }
  const csvEmails = new Set(csvRows.map(c => c.username));
  const csvNames = new Set(csvRows.map(c => c.name.trim().toLowerCase()));

  const inCsv = oasis.filter(u => csvEmails.has(u.email));
  const notInCsv = oasis.filter(u => !csvEmails.has(u.email));
  console.log('  In CSV list:', inCsv.length);
  console.log('  NOT in CSV list:', notInCsv.length);

  // Among not-in-csv, how many have a name matching a CSV name (duplicates)?
  const dupByName = notInCsv.filter(u => csvNames.has((u.name||'').trim().toLowerCase()));
  const trulyOther = notInCsv.filter(u => !csvNames.has((u.name||'').trim().toLowerCase()));
  console.log('  Not-in-CSV but name matches a CSV name (likely duplicates):', dupByName.length);
  console.log('  Not-in-CSV and name NOT in CSV (truly other):', trulyOther.length);
  trulyOther.forEach(u => console.log('      ', u.email, '|', u.name));

  // Duplicate emails anywhere in Oasis?
  const emailCounts = {};
  oasis.forEach(u => { emailCounts[u.email] = (emailCounts[u.email]||0)+1; });
  const dupEmails = Object.entries(emailCounts).filter(([e,c]) => c > 1);
  console.log('Duplicate emails within Oasis:', dupEmails.length);
  dupEmails.slice(0,10).forEach(([e,c]) => console.log('      ', e, c));

  // Completed tests for Oasis users
  const ids = oasis.map(u => u.id);
  let completed = 0;
  if (ids.length) {
    const ar = await apiRequest(`/rest/v1/assessment_results?select=user_id&user_id=in.(${ids.join(',')})&limit=1000`, 'GET');
    const rows = Array.isArray(ar.body) ? ar.body : [];
    const set = new Set(rows.map(r => r.user_id));
    completed = set.size;
    console.log('Oasis users with >=1 assessment_result:', completed);
  }
}

main().catch(e => console.error(e));