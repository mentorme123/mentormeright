require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

const RESTORE_PASSWORD = 'Restore@MentorMe2026';
const INSTITUTION = 'Oasis International School';

// Generate 85 user credentials
const users = [];
for (let ts = 1768572921; ts <= 1768573005; ts++) {
  users.push({
    email: `student${ts}@mentormeright.com`,
    password: `MMstudent${ts}@123`,
    id: null,
    name: null
  });
}

// Check existing auth users for these emails
async function getAuthUsersByEmails(emails) {
  const existing = {};
  for (const email of emails) {
    await new Promise((resolve) => {
      const options = {
        hostname: projectRef + '.supabase.co',
        path: `/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
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
            const result = JSON.parse(data);
            const authUsers = result.users || [];
            if (authUsers.length > 0) {
              existing[email] = authUsers[0];
            }
          } catch (e) {}
          resolve();
        });
      });
      req.on('error', () => resolve());
      req.end();
    });
  }
  return existing;
}

// Create auth user
async function createAuthUser(email, password, name) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: name || 'Student' }
    });

    const options = {
      hostname: projectRef + '.supabase.co',
      path: '/auth/v1/admin/users',
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
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

// Update auth user password
async function updateAuthPassword(uuid, password) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ password: password });

    const options = {
      hostname: projectRef + '.supabase.co',
      path: `/auth/v1/admin/users/${encodeURIComponent(uuid)}`,
      method: 'PATCH',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
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

// Create public users entry
async function createPublicUser(uuid, email, name) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify([{
      id: uuid,
      email: email,
      name: name || 'Student',
      role: 'individual',
      institution_name: INSTITUTION
    }]);

    const options = {
      hostname: projectRef + '.supabase.co',
      path: '/rest/v1/users',
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-dupes'
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

// Update public users entry
async function updatePublicUser(uuid, name) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      name: name || 'Student',
      institution_name: INSTITUTION,
      password: null
    });

    const options = {
      hostname: projectRef + '.supabase.co',
      path: `/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`,
      method: 'PATCH',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-dupes'
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
  console.log('Checking existing auth users for 85 emails...');
  const existingAuth = await getAuthUsersByEmails(users.map(u => u.email));
  console.log('Existing auth users:', Object.keys(existingAuth).length);

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const user of users) {
    try {
      const authUser = existingAuth[user.email];
      const uuid = authUser ? authUser.id : null;
      const name = authUser ? (authUser.user_metadata?.full_name || 'Student') : 'Student';

      if (authUser) {
        // Update password for existing auth user
        const passResult = await updateAuthPassword(uuid, user.password);
        if (passResult.status !== 200 && passResult.status !== 204) {
          console.error(`Failed to update password for ${user.email}: HTTP ${passResult.status} - ${passResult.body}`);
          errors++;
          continue;
        }

        // Update public.users entry (set institution_name if null)
        const updateResult = await updatePublicUser(uuid, name);
        if (updateResult.status === 200 || updateResult.status === 204) {
          console.log(`Updated auth+public for ${user.email} (${name}) - password reset + institution_name set`);
          updated++;
        } else {
          console.log(`Update for ${user.email}: HTTP ${updateResult.status} - ${updateResult.body}`);
        }
      } else {
        // Create new auth user
        const authResult = await createAuthUser(user.email, user.password, 'Student');
        if (authResult.status === 200 || authResult.status === 201) {
          const authData = JSON.parse(authResult.body);
          const newUuid = authData.id;

          // Create public.users entry
          const pubResult = await createPublicUser(newUuid, user.email, 'Student');
          if (pubResult.status === 200 || pubResult.status === 201 || pubResult.status === 409) {
            console.log(`Created: ${user.email} - auth + public entry`);
            created++;
          } else {
            console.warn(`Created auth but failed public for ${user.email}: HTTP ${pubResult.status}`);
          }
        } else {
          console.error(`Failed to create auth user ${user.email}: HTTP ${authResult.status} - ${authResult.body}`);
          errors++;
        }
      }
    } catch (err) {
      console.error(`Error processing ${user.email}:`, err.message);
      errors++;
    }
  }

  console.log(`\nSummary: ${created} created, ${updated} updated, ${errors} errors`);
}

main().catch(console.error);
