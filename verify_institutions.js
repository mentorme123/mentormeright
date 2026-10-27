require('dotenv').config({ path: '.env.local' });
const https = require('https');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function request(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: path,
      method: 'GET',
      headers: { 'apikey': serviceKey, 'Authorization': 'Bearer ' + serviceKey }
    };
    const r = https.request(options, (res) => {
      let d = '';
      res.on('data', (c) => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve(d); }
      });
    });
    r.on('error', reject);
    r.end();
  });
}

async function main() {
  // Get institution distribution
  const path = '/rest/v1/users?select=institution_name&role=eq.individual&limit=1000';
  const users = await request(path);

  if (!Array.isArray(users)) {
    console.log('Error:', JSON.stringify(users));
    return;
  }

  const instCount = {};
  users.forEach(u => {
    const inst = u.institution_name || '(null)';
    instCount[inst] = (instCount[inst] || 0) + 1;
  });

  console.log('=== Public.users institution breakdown ===');
  Object.entries(instCount).sort((a, b) => b[1] - a[1]).forEach(([inst, count]) => {
    console.log(`${inst}: ${count}`);
  });

  // Verify Oasis specifically
  const oasisCount = instCount['Oasis International School'] || 0;
  console.log(`\nOasis International School count: ${oasisCount}`);
  console.log(`Total users: ${users.length}`);
}

main().catch(console.error);
