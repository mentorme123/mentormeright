require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

// Known orphan Abdhullah Ahmed user IDs with null institution (duplicates)
const IDsToDelete = [
  'e7e9095e-52d4-482a-904b-e9845161f79d',
  '36ff4b8b-6fc7-4d1b-9fa6-c8998f7cbde4',
  'c0f9b925-247c-46e9-ba46-148bf363b092',
  '97c70957-f77f-43b7-99f0-3c3e3d359bad',
  'dcf43ae4-cbc7-496d-bcd5-10b0f0a50aa8',
  '48546b2e-8800-45a3-92b4-132165852468'
];

async function deleteAuthUser(uuid) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: `/auth/v1/admin/users/${encodeURIComponent(uuid)}`,
      method: 'DELETE',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function deletePublicUser(uuid) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: `/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`,
      method: 'DELETE',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Prefer': 'count=exact'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function getUserInfo(uuid) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: `/rest/v1/users?id=eq.${encodeURIComponent(uuid)}&select=id,email,name`,
      method: 'GET',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const users = JSON.parse(data);
          resolve(users[0]);
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('Deleting 6 orphan Abdhullah Ahmed duplicates (null institution)...');
  let deleted = 0;
  let errors = 0;

  for (const uuid of IDsToDelete) {
    const user = await getUserInfo(uuid);
    if (user) {
      console.log('Deleting:', user.name, '<' + user.email + '>', 'ID:', uuid);
    }
    
    try {
      const authResult = await deleteAuthUser(uuid);
      if (authResult.status !== 200 && authResult.status !== 204) {
        console.log('  Auth delete failed: HTTP', authResult.status, '-', authResult.body);
      }
      
      const publicResult = await deletePublicUser(uuid);
      if (publicResult.status !== 200 && publicResult.status !== 204) {
        console.log('  Public delete failed: HTTP', publicResult.status, '-', publicResult.body);
        errors++;
      } else {
        deleted++;
      }
    } catch (err) {
      console.error('Error deleting', uuid, ':', err.message);
      errors++;
    }
  }

  console.log('\nDeletion complete:', deleted, 'deleted,', errors, 'errors');
}

main().catch(console.error);
