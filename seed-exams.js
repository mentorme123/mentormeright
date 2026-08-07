const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const exams = [
  {
    name: 'JEE Main 2026',
    category: 'Engineering',
    application_deadline: '2026-11-30',
    exam_date: '2027-01-24',
    official_link: 'https://jeemain.nta.nic.in/',
    description: 'Entrance exam for NITs, IIITs and other Centrally Funded Technical Institutions.'
  },
  {
    name: 'JEE Advanced 2026',
    category: 'Engineering',
    application_deadline: '2026-04-30',
    exam_date: '2026-05-24',
    official_link: 'https://jeeadv.ac.in/',
    description: 'Entrance exam for admission to the Indian Institutes of Technology (IITs).'
  },
  {
    name: 'NEET UG 2026',
    category: 'Medical',
    application_deadline: '2026-03-15',
    exam_date: '2026-05-03',
    official_link: 'https://neet.nta.nic.in/',
    description: 'The single entrance test for admission to MBBS and BDS courses in India.'
  },
  {
    name: 'CUET UG 2026',
    category: 'General University',
    application_deadline: '2026-03-31',
    exam_date: '2026-05-15',
    official_link: 'https://cuet.samarth.ac.in/',
    description: 'Common University Entrance Test for admission to all Central Universities.'
  },
  {
    name: 'UPSC Civil Services 2026',
    category: 'Civil Services',
    application_deadline: '2026-02-22',
    exam_date: '2026-05-31',
    official_link: 'https://www.upsc.gov.in/',
    description: 'Preliminary examination for recruitment to the IAS, IFS, and IPS.'
  }
];

async function seedExams() {
  console.log('Seeding exams...');
  const { data, error } = await supabase
    .from('exam_alerts')
    .insert(exams);

  if (error) {
    console.error('Error seeding exams:', error);
  } else {
    console.log('Successfully seeded exams!');
  }
}

seedExams();
