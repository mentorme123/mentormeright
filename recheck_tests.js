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
  const dupes = JSON.parse(fs.readFileSync('/tmp/dupes_to_delete.json','utf8'));
  const ids = dupes.map(d => d.id);
  console.log('Checking completed tests for', ids.length, 'duplicate users...');

  const completed = new Set();
  for (let i = 0; i < ids.length; i += 500) {
    const chunk = ids.slice(i, i + 500);
    const r = await apiRequest(`/rest/v1/assessment_results?select=user_id&user_id=in.(${chunk.join(',')})&limit=1000`, 'GET');
    const rows = Array.isArray(r.body) ? r.body : [];
    rows.forEach(r => { if (r.user_id) completed.add(r.user_id); });
  }
  console.log('Duplicates with completed tests:', completed.size);
  if (completed.size) {
    const who = dupes.filter(d => completed.has(d.id)).map(d => d.email);
    console.log('THESE MUST NOT BE DELETED:', who);
  } else {
    console.log('SAFE: none of the duplicates have completed tests. Proceeding with deletion.');
  }
}

main().catch(e => console.error(e));