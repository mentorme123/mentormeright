const { createClient } = require('@supabase/supabase-js');
const url = 'https://fszbbmbaoqigotemhkda.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemJibWJhb3FpZ290ZW1oa2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5MTg2NiwiZXhwIjoyMDkyOTY3ODY2fQ.yl7XwzwlKokoG1OE4EyhXjHEKVM2lJTnbT4JTm1pJmA';
const supabase = createClient(url, key);

async function run() {
  const { data: res } = await supabase.from('assessment_results').select('id, user_id, report->clientName').is('user_id', null);
  console.log('results with null user_id:', res);

  const { data: recent } = await supabase.from('assessment_results').select('id, user_id, report->clientName, completed_at').order('completed_at', {ascending: false}).limit(10);
  console.log('recent results:', recent);
}
run();
