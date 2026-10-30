require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');
const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
const [projectRef] = url.hostname.split('.');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const INSTITUTION = 'Oasis International School';

// Parse CSV to get expected emails
const csv = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8');
const lines = csv.trim().split('\n').slice(1);
const expectedEmails = new Set();
for (const line of lines) {
  const cols = line.match(/"([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (cols) {
    const name = cols[1].trim();
    const firstName = (name.split(/\s+/)[0] || '').replace(/[^a-zA-Z0-9]/gi, '');
    const email = firstName ? `${firstName.toLowerCase()}@mentormeright.com` : '';
    if (email) expectedEmails.add(email.toLowerCase());
  }
}
console.log('Expected emails from CSV:', expectedEmails.size);

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    };
    if (body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // Get all users with role=individual and institution_name=null
  const { body: users } = await api(
    '/rest/v1/users?select=id,email,name,institution_name&role=eq.individual&institution_name=is.null&limit=1000'
  );
  
  if (!Array.isArray(users)) {
    console.log('No users found or error');
    return;
  }
  console.log('Users with null institution_name:', users.length);
  
  const toFix = users.filter(u => {
    const email = String(u.email || '').toLowerCase().trim();
    return expectedEmails.has(email);
  });
  console.log('Users to fix (email matches CSV):', toFix.length);
  
  let fixed = 0;
  let errors = 0;
  
  // Fix in batches
  const batchSize = 20;
  for (let i = 0; i < toFix.length; i += batchSize) {
    const batch = toFix.slice(i, i + batchSize);
    const ids = batch.map(u => `'${u.id}'`).join(',');
    const { status } = await api(
      `/rest/v1/users?select=id&email=in.(${batch.map(u => u.email).join(',')})`,
      'PATCH',
      { institution_name: INSTITUTION }
    );
    if (status === 200 || status === 204 || status === 206) {
      fixed += batch.length;
      console.log(`Fixed batch ${i/batchSize + 1}: ${batch.length} users`);
    } else {
      console.error(`Error at batch ${i/batchSize + 1}: HTTP ${status}`);
      errors += batch.length;
    }
  }
  
  console.log(`\nFixed: ${fixed}, Errors: ${errors}`);
}

main().catch(e => console.error('Error:', e));
