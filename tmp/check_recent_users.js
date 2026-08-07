const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkAssessments() {
  const { data: assessments, error: assessmentError } = await supabase
    .from('assessment_results')
    .select('id, user_id, completed_at')
    .order('completed_at', { ascending: false })
    .limit(10);

  if (assessmentError) {
    console.error('Error fetching assessments:', assessmentError);
    return;
  }

  const userIds = [...new Set(assessments.map(a => a.user_id))];

  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, email, name')
    .in('id', userIds);

  if (usersError) {
    console.error('Error fetching users:', usersError);
    return;
  }

  const results = assessments.map(a => {
    const user = users.find(u => u.id === a.user_id);
    return {
      assessment_id: a.id,
      user_id: a.user_id,
      email: user ? user.email : 'Unknown',
      name: user ? user.name : 'Unknown',
      completed_at: a.completed_at
    };
  });

  console.log('Recent assessments and users:\n', JSON.stringify(results, null, 2));
}

checkAssessments();
