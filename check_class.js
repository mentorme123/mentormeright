require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function apiRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co', path, method,
      headers: { 'apikey': serviceKey, 'Authorization': 'Bearer ' + serviceKey, 'Content-Type': 'application/json' }
    };
    const bodyStr = body ? JSON.stringify(body) : '';
    if (body) options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    const req = https.request(options, (res) => {
      let data = ''; res.on('data', c => data += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); } catch (e) { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('error', reject); if (body) req.write(bodyStr); req.end();
  });
}

async function main() {
  const enc = encodeURIComponent('Oasis International School');
  const r = await apiRequest(`/rest/v1/users?select=id,email,name,education_level&role=eq.individual&institution_name=ilike.${enc}&limit=1000`, 'GET');
  const oasis = Array.isArray(r.body) ? r.body : [];
  console.log('Total:', oasis.length);

  const levels = {};
  oasis.forEach(u => { const l = u.education_level || '(null)'; levels[l] = (levels[l]||0)+1; });
  console.log('education_level distribution:');
  Object.entries(levels).forEach(([k,v]) => console.log('  ', JSON.stringify(k), '=', v));

  const raw = fs.readFileSync('credentials_Oasis_International_School.csv','utf8').trim().split('\n');
  const csvMap = {};
  for (let i=1;i<raw.length;i++){const p=raw[i].split(',').map(x=>x.replace(/^"|"$/g,''));csvMap[p[1]]=p[3];}
  let match=0, nomatch=0;
  oasis.forEach(u=>{
    const csvCls = csvMap[u.email];
    if (csvCls === u.education_level) match++;
    else { nomatch++; if (nomatch<=15) console.log('MISMATCH:', u.email, '| csv:', csvCls, '| db:', u.education_level); }
  });
  console.log('Class match: ' + match + ' | Mismatch: ' + nomatch);
}

main().catch(e => console.error(e));