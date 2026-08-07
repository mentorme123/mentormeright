const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fszbbmbaoqigotemhkda.supabase.co';
const serviceRole = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemJibWJhb3FpZ290ZW1oa2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5MTg2NiwiZXhwIjoyMDkyOTY3ODY2fQ.yl7XwzwlKokoG1OE4EyhXjHEKVM2lJTnbT4JTm1pJmA';

const supabase = createClient(supabaseUrl, serviceRole, { auth: { autoRefreshToken: false, persistSession: false } });

(async () => {
  const testEmail = 'teststudent@mentormeright.in';
  const testName = 'Test Student';
  const password = 'MentorMe@123';

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: testEmail,
    password,
    email_confirm: true,
    user_metadata: { full_name: testName }
  });

  if (authError) {
    console.error('Auth error:', authError.message);
    return;
  }

  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: testEmail,
      name: testName,
      role: 'student',
      institution_name: 'Global School System',
      audience_type: 'ST'
    });

  if (profileError) {
    console.error('Profile error:', profileError.message);
    return;
  }

  const { error: linkError } = await supabase
    .from('institution_students')
    .insert({
      institution_id: 'f7a7dc2d-b3e7-4df3-94cc-336f7c7d96d2',
      user_id: authData.user.id
    });

  if (linkError) {
    console.error('Link error:', linkError.message);
    return;
  }

  console.log(json({ success: true, userId: authData.user.id, email: testEmail }));
})();
