const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkAssessments() {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('id, user_id, completed_at, report')
    .order('completed_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching assessments:', error);
  } else {
    // only print keys of report to avoid huge output
    data.forEach(d => {
      d.report_keys = d.report ? Object.keys(d.report) : null;
      d.report_clientName = d.report ? d.report.clientName : null;
      delete d.report;
    });
    console.log('Recent assessments:', JSON.stringify(data, null, 2));
  }
}

checkAssessments();
