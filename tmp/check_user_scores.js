const { createClient } = require('@supabase/supabase-js');
const url = 'https://fszbbmbaoqigotemhkda.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemJibWJhb3FpZ290ZW1oa2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5MTg2NiwiZXhwIjoyMDkyOTY3ODY2fQ.yl7XwzwlKokoG1OE4EyhXjHEKVM2lJTnbT4JTm1pJmA';
const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', '15e3bea5-5565-4f86-849c-7607eb97f317')
    .order('completed_at', { ascending: false });
  console.log('Number of results:', data ? data.length : 0);
  if (data && data.length > 0) {
    console.log('Latest result:', JSON.stringify(data[0], null, 2));
  }
}
run();
