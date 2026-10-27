require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

const RESTORE_PASSWORD = 'Restore@MentorMe2026';

// Get Oasis users from users table using REST API
async function getOasisUsers() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: '/rest/v1/users?select=id,email,name,created_at&role=eq.individual&institution_name=ilike.*Oasis%20International%20School*&order=created_at.desc',
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
          if (Array.isArray(users)) {
            resolve(users);
          } else {
            resolve([]);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// Get all auth users via admin API with pagination
async function getAuthUsers() {
  const allUsers = [];
  let page = 1;
  const perPage = 1000;

  while (true) {
    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: projectRef + '.supabase.co',
        path: `/auth/v1/admin/users?page=${page}&per_page=${perPage}`,
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
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', reject);
      req.end();
    });

    const users = result.users || [];
    allUsers.push(...users);

    if (users.length < perPage) {
      break;
    }
    page++;
  }

  return allUsers;
}

// Create auth user with custom UUID
async function createAuthUser(id, email, name) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      id: id,
      email: email,
      password: RESTORE_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: name || '' }
    });

    const options = {
      hostname: projectRef + '.supabase.co',
      path: '/auth/v1/admin/users',
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
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
    req.write(body);
    req.end();
  });
}

async function main() {
  try {
    console.log('Fetching Oasis users from users table...');
    const oasisUsers = await getOasisUsers();
    console.log('Total Oasis users:', oasisUsers.length);

    console.log('Fetching auth users...');
    const authUsers = await getAuthUsers();
    const authUserIds = new Set(authUsers.map(u => u.id));
    console.log('Total auth users:', authUserIds.size);

    const missing = oasisUsers.filter(u => !authUserIds.has(u.id));
    console.log('Missing from auth.users:', missing.length);

    // Restore
    let restored = 0;
    let failed = 0;
    for (const user of missing) {
      try {
        const result = await createAuthUser(user.id, user.email, user.name);
        if (result.status === 200 || result.status === 201) {
          console.log(`Restored: ${user.name} <${user.email}> ID: ${user.id}`);
          restored++;
        } else {
          console.error(`Failed to restore ${user.email}: HTTP ${result.status} - ${result.body}`);
          failed++;
        }
      } catch (err) {
        console.error(`Error restoring ${user.email}:`, err.message);
        failed++;
      }
    }

    console.log(`\nRestoration complete: ${restored} restored, ${failed} failed`);
    console.log(`Default password: ${RESTORE_PASSWORD}`);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
