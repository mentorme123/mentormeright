require('dotenv').config({ path: '.env.local' });
const https = require('https');
const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
const [projectRef] = url.hostname.split('.');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

async function main() {
  // Count auth users at Oasis (from auth.users, which has app_metadata with institution)
  // We can't directly filter auth.users by institution - let's try different approaches

  // 1. Check public.users count by exact institution_name
  const { body: publicUsers } = await api(
    '/rest/v1/users?select=id,email,name,institution_name&role=eq.individual&institution_name=like.Oasis+International+School&limit=500'
  );
  console.log('Public users with Oasis International School:', Array.isArray(publicUsers) ? publicUsers.length : 'ERROR');

  // 2. Check all public.users with role=individual (all institutions)
  const { body: allIndividuals } = await api(
    '/rest/v1/users?select=id,email,name,institution_name&role=eq.individual&order=institution_name.asc&limit=500'
  );
  console.log('All individual users (any institution):', Array.isArray(allIndividuals) ? allIndividuals.length : 'ERROR');

  // Count by institution
  if (Array.isArray(allIndividuals)) {
    const byInst = {};
    allIndividuals.forEach(u => {
      const inst = u.institution_name || 'null';
      byInst[inst] = (byInst[inst] || 0) + 1;
    });
    Object.entries(byInst).sort(([,a],[,b]) => b-a).slice(0, 10).forEach(([inst, count]) => {
      if (inst.toLowerCase().includes('oasis') || count > 50)
        console.log(`  ${inst}: ${count}`);
    });
  }

  // 3. Check auth.users for users with Oasis in their email domain
  // Not practical - let's check if there are users with @mentormeright.in emails that have no public.users entry
  // Check for orphaned auth users by looking at assessment_results
  const { body: assessmentResults } = await api(
    '/rest/v1/assessment_results?select=user_id,user_email,user_name&limit=500'
  );
  console.log('\nAssessment results:', Array.isArray(assessmentResults) ? assessmentResults.length : 'ERROR');

  // Count assessment results by user
  if (Array.isArray(assessmentResults)) {
    const byUser = {};
    assessmentResults.forEach(r => {
      const uid = r.user_id || 'unknown';
      byUser[uid] = (byUser[uid] || 0) + 1;
    });
    console.log('Unique users with assessment results:', Object.keys(byUser).length);

    // Check which users with assessment results are NOT in public.users
    if (Array.isArray(publicUsers)) {
      const publicIds = new Set(publicUsers.map(u => u.id));
      const orphanedTests = Object.keys(byUser).filter(uid => !publicIds.has(uid));
      console.log('Users with tests but no public.users entry:', orphanedTests.length);
      orphanedTests.forEach(uid => console.log('  Orphaned test user:', uid));
    }
  }
}

main().catch(e => console.error('Error:', e));
