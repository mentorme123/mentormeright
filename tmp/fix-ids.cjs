require('dotenv').config({ path: '.env.local' });
const https = require('https');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = { hostname: ref + '.supabase.co', path, method, headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' } };
    const r = https.request(options, (resp) => {
      let d = '';
      resp.on('data', (c) => (d += c));
      resp.on('end', () => { try { resolve({ status: resp.statusCode, body: JSON.parse(d) }); } catch (e) { resolve({ status: resp.statusCode, body: d }); } });
    });
    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

// old id -> new id mapping
const mapping = {
  '6216630a-576d-4cb9-852b-7ceb22a91047': 'f6215f7d-73a5-42c5-8c96-aa9bc8f58bca', // Mohammed Maaz
  '9f65309b-e67c-491f-8fc0-b43d46fbb12d': '8db2570f-8753-4f82-b575-6b765b3f4da8', // Mohammed Anas
  '42d58509-ee42-498a-9360-46b3b526f224': '5a80c389-4d8a-44f9-98aa-8420b10d0235', // REMOVED_Test3
};

(async () => {
  for (const [oldId, newId] of Object.entries(mapping)) {
    for (const tbl of ['assessment_results', 'assessments', 'reports', 'bookings']) {
      const { status, body } = await api(`/rest/v1/${tbl}?user_id=eq.${oldId}`, 'PATCH', { user_id: newId });
      console.log(tbl, oldId, '->', newId, 'status:', status);
    }
    await api(`/rest/v1/institutions?admin_user_id=eq.${oldId}`, 'PATCH', { admin_user_id: newId });
    // Delete old public.users row (now no FK references)
    const { status: ds } = await api(`/rest/v1/users?id=eq.${oldId}`, 'DELETE');
    console.log('delete old user', oldId, 'status:', ds);
  }
  console.log('done');
})();
