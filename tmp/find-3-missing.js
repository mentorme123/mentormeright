require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');
const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
const [projectRef] = url.hostname.split('.');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
      res.on('end', () => { try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); } catch { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('error', reject);
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

// Parse CSV names
const csv = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8');
const lines = csv.trim().split('\n').slice(1);
const csvNames = new Set();
const csvStudents = [];
for (const line of lines) {
  const cols = line.match(/"([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (cols) {
    const name = cols[1].trim();
    const n = name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    csvNames.add(n);
    csvStudents.push({ name, normName: n });
  }
}

function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

(async () => {
  // Get all Oasis public users
  const { body: publicUsers } = await api(
    '/rest/v1/users?select=id,email,name&role=eq.individual&institution_name=like.Oasis+International+School&limit=500'
  );
  const publicNames = new Set((publicUsers || []).map(u => normalizeName(u.name || '')));
  
  // Check which CSV names are missing
  const missing = csvStudents.filter(s => !publicNames.has(s.normName));
  const extra = publicUsers.filter(u => !csvNames.has(normalizeName(u.name || '')));
  
  console.log('CSV students:', csvStudents.length);
  console.log('DB students (public.users):', publicUsers.length);
  console.log('Missing from DB (in CSV):', missing.length);
  missing.forEach(s => console.log('  ', s.name));
  console.log('Extra in DB (not in CSV):', extra.length);
  extra.forEach(u => console.log('  ', u.name, '<' + u.email + '>'));
  
  // Check auth.users for Oasis-related users by checking assessment_results
  // Also check all users with role=individual that might have @mentormeright.in emails
  const { body: allIndividuals } = await api(
    '/rest/v1/users?select=id,email,name,institution_name&role=eq.individual&institution_name=is.null&limit=500'
  );
  console.log('\nUsers with null institution_name:', allIndividuals?.length || 0);
  // Check if any of these have @mentormeright.in emails (Oasis students)
  const nullInstOasis = (allIndividuals || []).filter(u => 
    (u.email || '').includes('mentormeright.in') || (u.email || '').includes('mentormeright.com')
  );
  console.log('null-inst users with mentormeright emails:', nullInstOasis.length);
})().catch(e => console.error('Error:', e));
