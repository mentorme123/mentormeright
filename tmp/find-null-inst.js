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

// Parse CSV names
const csv = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8');
const lines = csv.trim().split('\n').slice(1);
const csvNames = new Set();
for (const line of lines) {
  const cols = line.match(/"([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (cols) {
    const name = cols[1].trim();
    const n = name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    csvNames.add(n);
  }
}
console.log('CSV unique names:', csvNames.size);

(async () => {
  // Get users with null institution_name
  const nullInstUsers = await api(
    '/rest/v1/users?select=id,email,name,institution_name,created_at&role=eq.individual&institution_name=is.null&order=name.asc&limit=500'
  );
  console.log('Users with null institution_name:', Array.isArray(nullInstUsers) ? nullInstUsers.length : 'ERROR');

  // Check which match CSV names
  if (Array.isArray(nullInstUsers)) {
    let matches = 0;
    const matched = [];
    const unmatched = [];
    for (const u of nullInstUsers) {
      const n = (u.name || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      if (csvNames.has(n)) {
        matches++;
        matched.push(u);
      } else {
        unmatched.push(u);
      }
    }
    console.log('Null-inst users matching CSV names:', matches);
    if (matches > 0) {
      console.log('\nMatched (should be Oasis students with wrong/null institution_name):');
      matched.forEach(u => console.log(`  ${u.name} <${u.email}>`));
    }
    
    console.log('\nNon-matching null-inst users (count):', unmatched.length);
    if (unmatched.length < 30) {
      unmatched.forEach(u => console.log(`  ${u.name} <${u.email}>`));
    }
  }
})();
