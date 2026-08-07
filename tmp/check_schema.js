const { createClient } = require('@supabase/supabase-js');
const url = 'https://fszbbmbaoqigotemhkda.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemJibWJhb3FpZ290ZW1oa2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5MTg2NiwiZXhwIjoyMDkyOTY3ODY2fQ.yl7XwzwlKokoG1OE4EyhXjHEKVM2lJTnbT4JTm1pJmA';
const supabase = createClient(url, key);

async function run() {
  const { data: allRes, error } = await supabase.from('assessment_results').select('*').limit(5);
  console.log('sample assessment_results:', allRes, error);
}
run();
