const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const vars = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    vars[key] = value;
  }
  return vars;
}

const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

async function run() {
  const institutionName = 'Oasis International School';

  const { data: students, error: studentError } = await supabase
    .from('users')
    .select('id, name, email, education_level, institution_name')
    .eq('role', 'individual')
    .ilike('institution_name', institutionName)
    .order('name', { ascending: true });

  if (studentError) { console.error('Error:', studentError.message); return; }

  const generateCredentials = (email) => {
    const local = String(email || '').split('@')[0];
    if (/^R\d+$/i.test(local)) {
      const digits = local.replace(/^R/i, '').slice(0, 20);
      return { username: email, password: 'R@' + digits };
    }
    return { username: email, password: 'MM' + local.replace(/[^a-z0-9]/gi, '') + '@123' };
  };

  const results = [];
  const CONCURRENT_LIMIT = 20;
  const studentList = students || [];

  for (let i = 0; i < studentList.length; i += CONCURRENT_LIMIT) {
    const batch = studentList.slice(i, i + CONCURRENT_LIMIT);
    const batchPromises = batch.map(async (student) => {
      const sanitizedName = String(student.name || '').trim().slice(0, 100);
      const email = String(student.email || '').trim();
      const { username, password } = generateCredentials(email);
      try {
        await supabase.auth.admin.updateUserById(student.id, {
          password: password,
          email_confirm: true,
        });
        return { name: sanitizedName, username, password };
      } catch (authError) {
        const err = authError;
        return { name: sanitizedName, username, password, error: err.message };
      }
    });

    const settled = await Promise.allSettled(batchPromises);
    for (const r of settled) {
      if (r.status === 'fulfilled') results.push(r.value);
    }
  }

  // Generate CSV like the API does
  const csvHeader = 'Name,Username,Password,Class\n';
  const csvRows = results.map(r => {
    const escapedName = '"' + (r.name || '').replace(/"/g, '""') + '"';
    const escapedUsername = '"' + (r.username || '').replace(/"/g, '""') + '"';
    const escapedPassword = '"' + (r.password || '').replace(/"/g, '""') + '"';
    return escapedName + ',' + escapedUsername + ',' + escapedPassword + ',""';
  }).join('\n');
  const csvContent = csvHeader + csvRows;

  // Save to file
  const filename = path.resolve(__dirname, '..', 'credentials_Oasis_International_School.csv');
  fs.writeFileSync(filename, csvContent, 'utf8');
  console.log('CSV saved to:', filename);
  console.log('Total rows:', results.length);

  // Check for 13-digit IDs
  const thirteenDigit = results.filter(r => /student\d{13}@/.test(r.username || ''));
  const tenDigit = results.filter(r => /student\d{10}@/.test(r.username || ''));
  const mismatches = results.filter(r => {
    const userNum = r.username?.match(/(\d+)/)?.[1] || '';
    const passNum = r.password?.match(/(\d+)/)?.[1] || '';
    return userNum !== passNum && userNum !== '' && passNum !== '123';
  });

  console.log('13-digit usernames:', thirteenDigit.length);
  console.log('10-digit usernames:', tenDigit.length);
  console.log('Username/password mismatches (student IDs):', mismatches.length);

  // Show first 5 and last 5
  console.log('\nFirst 5:');
  results.slice(0, 5).forEach(r => console.log('  ' + r.username + ' -> ' + r.password));
  console.log('\nStudent IDs only:');
  tenDigit.slice(0, 5).forEach(r => console.log('  ' + r.username + ' -> ' + r.password));
  tenDigit.slice(-5).forEach(r => console.log('  ' + r.username + ' -> ' + r.password));
}

run().catch(err => console.error('Error:', err));
