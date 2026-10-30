require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');
const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
const [projectRef] = url.hostname.split('.');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function api(path) {
  return new Promise((resolve, reject) => {
    https.get({
      hostname: projectRef + '.supabase.co',
      path,
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(null); } });
    }).on('error', reject);
  });
}

function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse CSV
const csv = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8');
const lines = csv.trim().split('\n').slice(1);
const csvStudents = [];
for (const line of lines) {
  const cols = line.match(/"([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (cols) {
    csvStudents.push({ name: cols[1].trim() });
  }
}
const csvNames = csvStudents.map(s => normalizeName(s.name));

(async () => {
  const users = await api(
    '/rest/v1/users?select=id,email,name,institution_name&role=eq.individual&institution_name=like.Oasis+International+School&order=name.asc&limit=500'
  );

  const dbNames = users.map(u => normalizeName(u.name));
  
  const missing = csvNames.filter(n => !dbNames.includes(n));
  console.log('CSV students:', csvNames.length);
  console.log('DB students:', dbNames.length);
  console.log('Missing students:', missing.length);
  missing.forEach(n => console.log('  MISSING:', n));
  
  // Also check for any extra users not in CSV
  const extra = dbNames.filter(n => !csvNames.includes(n));
  console.log('\nExtra DB users not in CSV:', extra.length);
  extra.forEach(n => console.log('  EXTRA:', n));
})();
