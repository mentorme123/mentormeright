require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

// Get Oasis users from users table
async function getOasisUsers() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path: '/rest/v1/users?select=id,email,name,created_at,role,institution_name&role=eq.individual&institution_name=ilike.*Oasis%20International%20School*&order=created_at.desc',
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
          resolve(Array.isArray(users) ? users : []);
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

    if (users.length < perPage) break;
    page++;
  }

  return allUsers;
}

// Delete user from auth.users table
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

// Delete user from public.users table
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

async function main() {
  console.log('Fetching Oasis users from users table...');
  const oasisUsers = await getOasisUsers();
  console.log('Total Oasis users:', oasisUsers.length);

  // Find duplicate names
  const nameGroups = {};
  oasisUsers.forEach(u => {
    const name = u.name || 'unnamed';
    if (!nameGroups[name]) nameGroups[name] = [];
    nameGroups[name].push(u);
  });

  const duplicateGroups = Object.entries(nameGroups).filter(([name, group]) => group.length > 1);
  console.log('Duplicate name groups:', duplicateGroups.length);

  // Plan deletions - keep the oldest (by created_at timestamp) in each group
  const usersToDelete = [];
  duplicateGroups.forEach(([name, group]) => {
    // Sort by created_at (ascending) - keep the first one
    const sorted = group.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const toDelete = sorted.slice(1); // Delete all except the oldest
    usersToDelete.push(...toDelete);
    console.log(`  ${name} (${group.length}x): keeping id=${sorted[0].id} (${sorted[0].email}), deleting ${toDelete.length} duplicate(s)`);
  });

  console.log('\nTotal duplicate records to delete:', usersToDelete.length);

  // Fetch auth users to check which duplicates have auth entries
  console.log('\nFetching auth users...');
  const authUsers = await getAuthUsers();
  const authUserMap = new Map(authUsers.map(u => [u.id, u.email]));
  console.log('Total auth users:', authUserMap.size);

  // Delete duplicates
  let deleted = 0;
  let errors = 0;
  for (const user of usersToDelete) {
    try {
      const uuid = user.id;
      const hasAuth = authUserMap.has(uuid);
      
      let msg = `Deleting ${user.name || 'unnamed'} <${user.email}> ID: ${uuid}`;
      if (hasAuth) msg += ' (has auth entry)';
      console.log(msg);

      if (hasAuth) {
        const authResult = await deleteAuthUser(uuid);
        if (authResult.status !== 200) {
          console.log(`  Auth delete failed: HTTP ${authResult.status} - ${authResult.body}`);
        }
      }

      const publicResult = await deletePublicUser(uuid);
      if (publicResult.status !== 204 && publicResult.status !== 200) {
        console.log(`  Public delete failed: HTTP ${publicResult.status} - ${publicResult.body}`);
        errors++;
      } else {
        deleted++;
      }
    } catch (err) {
      console.error(`Error deleting ${user.email}:`, err.message);
      errors++;
    }
  }

  console.log(`\nDeletion complete: ${deleted} deleted, ${errors} errors`);
}

main().catch(console.error);
