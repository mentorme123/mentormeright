require('dotenv').config({ path: '.env.local' });
const https = require('https');
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

(async () => {
  const users = await api('/rest/v1/users?select=id,email,name&role=eq.individual&institution_name=like.Oasis+International+School&order=name.asc&limit=200');
  console.log('Total Oasis users:', Array.isArray(users) ? users.length : 'ERROR');
  
  // Find duplicate name group
  const names = {};
  users.forEach(u => {
    const n = normalizeName(u.name);
    if (!n) return;
    if (!names[n]) names[n] = [];
    names[n].push(u);
  });
  
  for (const [name, group] of Object.entries(names)) {
    const uniqueEmails = new Set(group.map(u => (u.email||'').toLowerCase().trim()));
    if (group.length > 1 && uniqueEmails.size > 1) {
      console.log('Duplicate name group:', name);
      group.forEach(u => console.log(`  ${u.name} <${u.email}>`));
    }
  }
  
  // Find users without @mentormeright.com email
  const nonStd = users.filter(u => !u.email.endsWith('@mentormeright.com'));
  console.log('\nUsers without @mentormeright.com email:', nonStd.length);
  nonStd.forEach(u => console.log(`  ${u.name} <${u.email}>`));
  
  // Check for any student1768 emails
  const autoGen = users.filter(u => /^student\d+@mentormeright\.com$/i.test(u.email||''));
  console.log('\nAuto-gen emails remaining:', autoGen.length);
})().catch(e => console.error('Error:', e));
