const { createClient } = require('@supabase/supabase-js');
const url = 'https://fszbbmbaoqigotemhkda.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemJibWJhb3FpZ290ZW1oa2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5MTg2NiwiZXhwIjoyMDkyOTY3ODY2fQ.yl7XwzwlKokoG1OE4EyhXjHEKVM2lJTnbT4JTm1pJmA';
const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase.from('users').select('*').eq('email', 'sharam@mentormeright.in');
  console.log('users:', data);
  if (data && data.length > 0) {
    const userId = data[0].id;
    const { data: results, error: resError } = await supabase.from('assessment_results').select('*').eq('user_id', userId);
    console.log('results for user_id:', userId, results?.length ? results.map(r => ({id: r.id, user_id: r.user_id, email: r.email})) : results, resError);
  }

  // Also query by email if the column exists in assessment_results
  const { data: allRes } = await supabase.from('assessment_results').select('id, user_id, user_email, email').limit(10);
  console.log('sample assessment_results:', allRes);
}
run();
