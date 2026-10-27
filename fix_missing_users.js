require('dotenv').config({ path: '.env.local' });
const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];
const INSTITUTION = 'Oasis International School';

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
  // Generate 85 credentials
  const credentials = [];
  for (let ts = 1768572921; ts <= 1768573005; ts++) {
    credentials.push({
      email: `student${ts}@mentormeright.com`,
      password: `MMstudent${ts}@123`,
    });
  }
  console.log('Processing', credentials.length, 'users...');

  // Fetch ALL auth users with pagination
  let allAuth = [];
  let page = 1;
  const perPage = 50;
  while (true) {
    const path = `/auth/v1/admin/users?page=${page}&per_page=${perPage}`;
    const result = await apiRequest(path, 'GET');
    const users = result.body?.users || [];
    allAuth = [...allAuth, ...users];
    if (users.length < perPage) break;
    page++;
  }
  console.log('Total auth users:', allAuth.length);

  // Build auth email map
  const authByEmail = {};
  allAuth.forEach(u => { if (u.email) authByEmail[u.email] = u; });

  // Check which auth users exist
  let existing = 0;
  let missing = 0;
  for (const cred of credentials) {
    if (authByEmail[cred.email]) {
      existing++;
    } else {
      missing++;
    }
  }
  console.log('Auth users found:', existing, '/ Missing:', missing);

  // Fetch existing public.users entries for these emails
  let allPublic = [];
  page = 1;
  while (true) {
    // Use OR filter for student17685729 pattern
    const pubPath = page === 1
      ? `/rest/v1/users?select=id,email,name,institution_name,password&or=${encodeURIComponent('email=like.student1768572921@%,email=like.student1768573005@%')}&order=created_at.desc&per_page=200`
      : `/rest/v1/users?select=id,email,name,institution_name,password&or=${encodeURIComponent('email=like.student1768572921@%,email=like.student1768573005@%')}&order=created_at.desc&per_page=200&page=${page}`;
    const result = await apiRequest(pubPath, 'GET');
    const users = Array.isArray(result.body) ? result.body : [];
    allPublic = [...allPublic, ...users];
    if (users.length < 200) break;
    page++;
  }
  console.log('Public users found:', allPublic.length);
  const pubIds = new Set(allPublic.map(u => u.id));
  const pubByEmail = {};
  allPublic.forEach(u => { pubByEmail[u.email] = u; });

  let pubCreated = 0;
  let pubUpdated = 0;
  let errors = 0;

  for (const cred of credentials) {
    const authUser = authByEmail[cred.email];
    const uuid = authUser?.id;

    if (!uuid) {
      console.error(`No auth user for ${cred.email} - skipping (should not happen)`);
      errors++;
      continue;
    }

    // Check if public.users entry exists
    const pubEntry = pubByEmail[cred.email];
    const hasPubEntry = pubIds.has(uuid);

    if (hasPubEntry) {
      // Update: set institution_name, remove plaintext password
      const updateResult = await apiRequest(
        `/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`,
        'PATCH',
        { institution_name: INSTITUTION, password: null }
      );
      if (updateResult.status === 204 || updateResult.status === 200) {
        console.log(`Updated: ${cred.email} (inst: ${pubEntry.institution_name}, pass: ${pubEntry.password ? 'yes' : 'no'})`);
        pubUpdated++;
      } else {
        console.log(`Update failed for ${cred.email}: ${updateResult.status}`);
        errors++;
      }
    } else {
      // Create public.users entry
      const createResult = await apiRequest('/rest/v1/users', 'POST', {
        id: uuid,
        email: cred.email,
        name: authUser.user_metadata?.full_name || 'Student',
        role: 'individual',
        institution_name: INSTITUTION
      });

      if (createResult.status === 201 || createResult.status === 200) {
        console.log(`Created: ${cred.email}`);
        pubCreated++;
      } else if (createResult.status === 409) {
        // Already exists but wasn't found - update it
        const updateResult = await apiRequest(
          `/rest/v1/users?id=eq.${encodeURIComponent(uuid)}`,
          'PATCH',
          { institution_name: INSTITUTION, password: null }
        );
        if (updateResult.status === 204 || updateResult.status === 200) {
          console.log(`Updated (was 409): ${cred.email}`);
          pubUpdated++;
        } else {
          console.log(`Conflict resolution failed for ${cred.email}: ${updateResult.status}`);
        }
      } else {
        console.error(`Create failed for ${cred.email}: ${createResult.status} - ${JSON.stringify(createResult.body)}`);
        errors++;
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Auth users existing: ${existing}`);
  console.log(`Public entries created: ${pubCreated}`);
  console.log(`Public entries updated: ${pubUpdated}`);
  console.log(`Errors: ${errors}`);
}

main().catch(console.error);
