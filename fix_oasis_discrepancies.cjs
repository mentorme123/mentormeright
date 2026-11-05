require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceKey || serviceKey === 'your-service-role-key-here') {
  console.error('Missing valid SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];
const INSTITUTION = 'Oasis International School';

console.log('Project ref:', projectRef);
console.log('Fixing Oasis discrepancies\n');

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    };
    if (body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
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
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAllUsers() {
  const perPage = 1000;
  let all = [];
  let page = 0;
  while (true) {
    const path = `/rest/v1/users?select=id,email,name,education_level&role=eq.individual&institution_name=ilike.*${encodeURIComponent(INSTITUTION)}*&limit=${perPage}&offset=${page * perPage}`;
    const { body, status } = await api(path);
    if (status !== 200 || !Array.isArray(body) || body.length === 0) break;
    all = all.concat(body);
    if (body.length < perPage) break;
    page++;
  }
  return all;
}

async function updateUser(uuid, updates) {
  const result = await api(`/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`, 'PATCH', updates);
  return result;
}

async function getAllAuthUsers() {
  const all = [];
  let page = 1;
  while (true) {
    const { body, status } = await api(`/auth/v1/admin/users?page=${page}&per_page=1000`);
    if (status !== 200 || !body?.users) break;
    all.push(...body.users);
    if (body.users.length < 1000) break;
    page++;
  }
  return all;
}

async function updateAuthPassword(uuid, password) {
  const result = await api(`/auth/v1/admin/users/${encodeURIComponent(uuid)}`, 'PUT', { password });
  return result;
}

// --- Class corrections: original -> downloaded ---
const classFixes = {
  "A Mohamed Musthaqeem": "10B",
  "A Sidra Khadija": "10B",
  "Aamina Fathima": "12",
  "Abdullah Ahmed": "10A",
  "Akshit Bohra": "12",
  "Atif Mohammed": "11",
  "Bruce DSouza": "11",
  "Daniel Rajan": "12",
  "Hana Kausar": "10A",
  "Harihar Arya Tej": "11",
  "Inara matin Ansari": "9B",
  "Mohammed AyaanM": "9A",
  "Mokksha Mahtani": "9A",
  "Reyyan Rahil Ghaffar": "9A",
  "Rhythm Rai": "10B",
  "Samrah Aftab": "10B"
};

// --- Password corrections ---
const passwordFixes = {
  "Abdul Hadi": "MMabdulhadi1@123",
  "Samrah Aftab": "MMsamrahaftab@123"
};

// --- Username fixes ---
const usernameFixes = {
  "Samrah Aftab": "samrah_aftab@mentormeright.in"
};

async function main() {
  const users = await getAllUsers();
  console.log(`Total Oasis users: ${users.length}\n`);

  // Fetch all auth users for password matching
  const authUsers = await getAllAuthUsers();
  console.log(`Total auth users: ${authUsers.length}\n`);

  // Build name -> user map
  const userByName = {};
  for (const u of users) {
    userByName[u.name] = u;
  }

  let classUpdated = 0, classNotFound = 0, classErrors = 0;
  let passUpdated = 0, passNotFound = 0, passErrors = 0;
  let userUpdated = 0, userNotFound = 0, userErrors = 0;

  // --- Class fixes ---
  console.log('=== Class corrections ===');
  for (const [name, targetClass] of Object.entries(classFixes)) {
    const user = userByName[name];
    if (!user) {
      console.log(`NOT FOUND: ${name} (target class: ${targetClass})`);
      classNotFound++;
      continue;
    }
    if (user.education_level === targetClass) {
      console.log(`SKIP: ${name} already has class ${targetClass}`);
      continue;
    }
    const r = await updateUser(user.id, { education_level: targetClass });
    if (r.status === 200 || r.status === 204) {
      console.log(`UPDATED: ${name} class -> ${targetClass} (was ${user.education_level})`);
      classUpdated++;
    } else {
      console.error(`ERROR: ${name} class update: ${r.status} ${JSON.stringify(r.body)}`);
      classErrors++;
    }
  }

  // --- Password fixes ---
  console.log('\n=== Password corrections ===');
  for (const [name, targetPassword] of Object.entries(passwordFixes)) {
    const user = userByName[name];
    if (!user) {
      console.log(`NOT FOUND: ${name}`);
      passNotFound++;
      continue;
    }
    // Try to find auth user by email
    const authUser = authUsers.find(u => u.email === user.email);
    if (!authUser) {
      console.log(`NO AUTH USER: ${name} <${user.email}>`);
      passNotFound++;
      continue;
    }
    console.log(`DEBUG: ${name} authUser.id=${authUser.id} email=${authUser.email}`);
    const r = await updateAuthPassword(authUser.id, targetPassword);
    if (r.status === 200 || r.status === 204) {
      console.log(`UPDATED: ${name} password`);
      passUpdated++;
    } else {
      console.error(`ERROR: ${name} password update: ${r.status} ${JSON.stringify(r.body)}`);
      passErrors++;
    }
  }

  // --- Username fixes ---
  console.log('\n=== Username corrections ===');
  for (const [name, targetEmail] of Object.entries(usernameFixes)) {
    const user = userByName[name];
    if (!user) {
      console.log(`NOT FOUND: ${name}`);
      userNotFound++;
      continue;
    }
    if (user.email === targetEmail) {
      console.log(`SKIP: ${name} already has email ${targetEmail}`);
      continue;
    }
    const r = await updateUser(user.id, { email: targetEmail });
    if (r.status === 200 || r.status === 204) {
      console.log(`UPDATED: ${name} email -> ${targetEmail} (was ${user.email})`);
      userUpdated++;
    } else {
      console.error(`ERROR: ${name} email update: ${r.status} ${JSON.stringify(r.body)}`);
      userErrors++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Classes updated: ${classUpdated}, not found: ${classNotFound}, errors: ${classErrors}`);
  console.log(`Passwords updated: ${passUpdated}, not found: ${passNotFound}, errors: ${passErrors}`);
  console.log(`Usernames updated: ${userUpdated}, not found: ${userNotFound}, errors: ${userErrors}`);
}

main().catch(err => console.error('Script error:', err));
