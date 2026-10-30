require('dotenv').config({ path: '.env.local' });
const https = require('https');
const fs = require('fs');
const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
const [projectRef] = url.hostname.split('.');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const INSTITUTION = 'Oasis International School';

function api(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: projectRef + '.supabase.co',
      path,
      method,
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    };
    if (body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); } catch { resolve({ status: res.statusCode, body: data }); } });
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
    headers: { apikey: key, Authorization: 'Bearer ' + key }
  };
  if (body !== null) {
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
  }
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null }); } catch { resolve({ status: res.statusCode, body: data }); } });
    });
    req.on('error', reject);
    if (body !== null) req.write(JSON.stringify(body));
    req.end();
  });
}

function normalizeName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse CSV
const csv = fs.readFileSync('credentials_Oasis_International_School.csv', 'utf8');
const lines = csv.trim().split('\n').slice(1);
const csvStudents = [];
for (const line of lines) {
  const cols = line.match(/"([^"]*)","([^"]*)","([^"]*)","([^"]*)"/);
  if (cols) {
    const name = cols[1].trim();
    const className = cols[4].trim();
    const firstName = (name.split(/\s+/)[0] || '').replace(/[^a-zA-Z0-9]/gi, '');
    const fallbackFirstName = firstName ? firstName.toLowerCase() : '';
    const fullNameSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    csvStudents.push({ name, firstName, fallbackFirstName, fullNameSlug, className });
  }
}

async function main() {
  // Get all existing Oasis users to know which emails are taken
  const { body: existingUsers } = await api(
    '/rest/v1/users?select=id,email,name&role=eq.individual&institution_name=like.Oasis+International+School&limit=500'
  );
  const existingEmails = new Set();
  const existingNames = new Set();
  (existingUsers || []).forEach(u => {
    existingEmails.add(String(u.email || '').toLowerCase().trim());
    existingNames.add(normalizeName(u.name || ''));
  });
  console.log('Existing Oasis users:', existingUsers?.length || 0);
  console.log('Existing emails:', existingEmails.size);

  // Find students from CSV that are NOT in DB
  const missing = csvStudents.filter(s => !existingNames.has(normalizeName(s.name)));
  console.log('Missing students:', missing.length);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const student of missing) {
    const email = `${student.fallbackFirstName}@mentormeright.com`;
    const fallbackEmail = `${student.fallbackFirstName}_${student.fullNameSlug}@mentormeright.com`;
    const grade = student.className || '';
    const password = `MM${student.fallbackFirstName || 'student'}@123`;

    // Check if primary email is taken
    let finalEmail = email;
    if (existingEmails.has(email.toLowerCase())) {
      // Try fallback email
      finalEmail = fallbackEmail;
    }

    // If fallback is also taken, skip
    if (existingEmails.has(finalEmail.toLowerCase())) {
      console.log(`SKIP (email taken): ${student.name} <${finalEmail}>`);
      skipped++;
      continue;
    }

    console.log(`CREATE: ${student.name} <${finalEmail}>`);

    // Create auth user
    const { status: authStatus, body: authBody } = await authApi('/auth/v1/admin/users', 'POST', {
      email: finalEmail,
      password,
      email_confirm: true,
      user_metadata: { full_name: student.name }
    });

    if (authStatus !== 200 && authStatus !== 201) {
      console.error(`  ERROR: Auth failed (HTTP ${authStatus}):`, authBody?.message || authBody);
      errors++;
      continue;
    }

    const userId = authBody.id || authBody.user?.id;
    if (!userId) {
      console.error(`  ERROR: No user ID from auth (HTTP ${authStatus}):`, JSON.stringify(authBody).substring(0, 200));
      errors++;
      continue;
    }

    // Create/update public user with correct institution_name
    const { status: pubStatus } = await api('/rest/v1/users', 'POST', {
      id: userId,
      email: finalEmail,
      name: student.name,
      role: 'individual',
      education_level: grade || null,
      institution_name: INSTITUTION,
      audience_type: grade === 'Working Professional' ? 'WP' : (grade === 'Graduate' ? 'GR' : 'ST')
    });

    if (pubStatus === 200 || pubStatus === 201 || pubStatus === 206) {
      created++;
      existingEmails.add(finalEmail.toLowerCase());
    } else if (pubStatus === 409) {
      // Conflict - user might already exist (created by trigger)
      const { status: patchStatus } = await api(`/rest/v1/users?id=eq.${encodeURIComponent(userId)}`, 'PATCH', {
        institution_name: INSTITUTION,
        email: finalEmail,
        name: student.name,
        role: 'individual',
        education_level: grade || null,
        audience_type: grade === 'Working Professional' ? 'WP' : (grade === 'Graduate' ? 'GR' : 'ST')
      });
      if (patchStatus === 200 || patchStatus === 204) {
        created++;
        existingEmails.add(finalEmail.toLowerCase());
      } else {
        console.error(`  ERROR: Could not patch user (HTTP ${patchStatus})`);
        errors++;
      }
    } else {
      console.error(`  ERROR: Public user create failed (HTTP ${pubStatus})`);
      errors++;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Students created: ${created}`);
  console.log(`Students skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(e => console.error('Error:', e));
