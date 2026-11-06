require('dotenv').config({ path: '.env.local' });
const https = require('https');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path) {
  return new Promise((resolve, reject) => {
    const options = { hostname: ref + '.supabase.co', path, method: 'GET', headers: { apikey: key, Authorization: 'Bearer ' + key } };
    const r = https.request(options, (resp) => {
      let d = '';
      resp.on('data', (c) => (d += c));
      resp.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(d); } });
    });
    r.on('error', reject);
    r.end();
  });
}

(async () => {
  const pub = await api('/rest/v1/users?select=id,name,email&role=eq.individual&institution_name=ilike.Oasis%20International%20School&limit=1000');
  const ar = await api('/rest/v1/assessment_results?select=user_id&limit=10000');
  const pubMap = new Map(pub.map((p) => [p.id, p]));
  const authUsers = [];
  let page = 1;
  while (true) { const d = await api('/auth/v1/admin/users?page=' + page + '&per_page=1000'); const u = d.users || []; authUsers.push(...u); if (u.length < 1000) break; page++; }
  const authMap = new Map(authUsers.map((u) => [u.id, u.email]));

  // Oasis students with assessment_results
  const oasisAR = ar.filter((a) => pubMap.has(a.user_id));
  const usersWithResults = [...new Set(oasisAR.map((a) => a.user_id))];
  console.log('Oasis students with results:', usersWithResults.length);

  let mismatch = 0;
  for (const uid of usersWithResults) {
    const p = pubMap.get(uid);
    const authEmail = authMap.get(uid);
    if (!authEmail) { console.log('NO AUTH USER:', p.name, p.email); mismatch++; }
    else if (authEmail !== p.email) { console.log('EMAIL MISMATCH:', p.name, 'auth:', authEmail, 'pub:', p.email); mismatch++; }
  }
  console.log('auth mismatches:', mismatch);
  console.log('total auth users:', authUsers.length);
})();
