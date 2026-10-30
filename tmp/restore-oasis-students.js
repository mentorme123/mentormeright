require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

const INSTITUTION = 'Oasis International School';

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

function authApi(path, method = 'POST', body = null) {
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
  return new Promise((resolve, reject) => {
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

// Parse CSV
const csv = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8');
const lines = csv.trim().split('\n').slice(1);
const students = [];
for (const line of lines) {
  const cols = line.match(/"([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (cols) {
    students.push({
      name: cols[1].trim(),
      email: cols[2].trim(),
      password: cols[3].trim(),
      className: cols[4].trim()
    });
  }
}
console.log(`Parsed ${students.length} students from CSV\n`);

// Generate deterministic email (same logic as bulk-import/route.ts)
function generateEmail(name, institution, counter) {
  const firstName = (name.split(/\s+/)[0] || '').replace(/[^a-zA-Z0-9]/gi, '');
  const nameUser = firstName ? `${firstName.toLowerCase()}@mentormeright.com` : '';
  if (nameUser) {
    return { email: nameUser, password: `MM${firstName || 'student'}@123` };
  }
  // Deterministic fallback: hash the full name + institution + counter
  const stableSeed = `${institution}|${name}|${counter}`;
  let hash = 0;
  for (let i = 0; i < stableSeed.length; i++) {
    hash = ((hash << 5) - hash + stableSeed.charCodeAt(i)) | 0;
  }
  const stableNum = Math.abs(hash).toString().slice(0, 10);
  return { email: `student${stableNum}@mentormeright.com`, password: `MMstudent${stableNum}@123` };
}

async function getUserByName(name) {
  const { body, status } = await api(
    `/rest/v1/users?select=id,email,name,institution_name&name=eq.${encodeURIComponent(name)}&institution_name=eq.${encodeURIComponent(INSTITUTION)}&role=eq.individual&limit=1`
  );
  if (status !== 200 || !Array.isArray(body) || body.length === 0) return null;
  return body[0];
}

async function getUserByEmail(email) {
  const { body, status } = await api(
    `/rest/v1/users?select=id,email,name,institution_name&email=eq.${encodeURIComponent(email)}&limit=1`
  );
  if (status !== 200 || !Array.isArray(body) || body.length === 0) return null;
  return body[0];
}

async function countAssessments(uuid) {
  const { body, status } = await api(`/rest/v1/assessment_results?user_id=eq.${encodeURIComponent(uuid)}&select=id`);
  if (status !== 200 || !Array.isArray(body)) return 0;
  return body.length;
}

async function createUser(email, name, grade, password) {
  // Create auth user
  const { status: authStatus, body: authBody } = await authApi('/auth/v1/admin/users', 'POST', {
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: name }
  });

  if (authStatus !== 200 && authStatus !== 201) {
    return { status: 'error', error: authBody?.msg || authBody?.message || 'Auth error', authStatus };
  }

  const userId = authBody.id || authBody.user?.id;
  if (!userId) {
    return { status: 'error', error: 'No user ID from auth', authStatus };
  }

  // Create public user
  const { status: pubStatus, body: pubBody } = await api('/rest/v1/users', 'POST', {
    id: userId,
    email,
    name,
    role: 'individual',
    education_level: grade || null,
    institution_name: INSTITUTION,
    audience_type: grade === 'Working Professional' ? 'WP' : (grade === 'Graduate' ? 'GR' : 'ST')
  });

  if (pubStatus !== 200 && pubStatus !== 201) {
    return { status: 'error', error: pubBody?.message || 'Public error', pubStatus };
  }

  return { status: 'created', userId };
}

async function updateUserEmail(userId, newEmail, name, grade) {
  // Update auth user email
  const { status: authStatus } = await authApi(`/auth/v1/admin/users/${encodeURIComponent(userId)}`, 'PATCH', {
    email: newEmail
  });

  // Update public user
  const { status: pubStatus } = await api(`/rest/v1/users?id=eq.${encodeURIComponent(userId)}`, 'PATCH', {
    email: newEmail,
    name,
    education_level: grade || null,
    institution_name: INSTITUTION,
    audience_type: grade === 'Working Professional' ? 'WP' : (grade === 'Graduate' ? 'GR' : 'ST')
  });

  return { authStatus, pubStatus };
}

async function main() {
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const counter = i + 1;
    const { email, password } = generateEmail(student.name, INSTITUTION, counter);
    const grade = student.className || '';

    // 1. Check if user with this email already exists
    const existingByEmail = await getUserByEmail(email);
    if (existingByEmail) {
      console.log(`SKIP (email exists): ${student.name} <${email}>`);
      skipped++;
      continue;
    }

    // 2. Check if user with same name + institution exists (different email format)
    const existingByName = await getUserByName(student.name);
    if (existingByName) {
      // Check if this user has completed tests
      const testCount = await countAssessments(existingByName.id);
      console.log(`UPDATE: ${student.name} — changing email from ${existingByName.email} to ${email} (tests: ${testCount})`);
      console.log(`  -> NOT touching completed tests (user_id preserved)`);
      await updateUserEmail(existingByName.id, email, student.name, grade);
      updated++;
      continue;
    }

    // 3. Create new user
    console.log(`CREATE: ${student.name} <${email}>`);
    const result = await createUser(email, student.name, grade, password);
    if (result.status === 'created') {
      created++;
    } else {
      console.error(`  ERROR: ${result.error} (HTTP ${result.authStatus})`);
      errors++;
    }
  }

  console.log(`\n=== RE-IMPORT SUMMARY ===`);
  console.log(`Students in CSV: ${students.length}`);
  console.log(`Created: ${created}`);
  console.log(`Updated (email changed but tests preserved): ${updated}`);
  console.log(`Skipped (email already existed): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(err => console.error('Script error:', err));
