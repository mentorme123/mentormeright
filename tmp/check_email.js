const { createClient } = require('@supabase/supabase-js');
const url = 'https://fszbbmbaoqigotemhkda.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemJibWJhb3FpZ290ZW1oa2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5MTg2NiwiZXhwIjoyMDkyOTY3ODY2fQ.yl7XwzwlKokoG1OE4EyhXjHEKVM2lJTnbT4JTm1pJmA';
const supabase = createClient(url, key);

async function run() {
  const { data: cols } = await supabase.from('assessment_results').select('*').limit(1);
  console.log('Columns:', cols.length ? Object.keys(cols[0]) : 'no data');
  // if email exists, check for sharam
  if (cols.length && 'email' in cols[0]) {
    const { data: res } = await supabase.from('assessment_results').select('id, user_id, email').eq('email', 'sharam@mentormeright.in');
    console.log('results for sharam@mentormeright.in:', res);
  } else {
    // maybe check users again to see if they have another record
    const { data: users } = await supabase.from('users').select('*').ilike('email', '%sharam%');
    console.log('users with sharam in email:', users);
  }
}
run();
