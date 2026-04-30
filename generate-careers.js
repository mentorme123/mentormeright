const fs = require('fs');
const path = require('path');

const streams = ['Science', 'Commerce', 'Arts', 'Vocational', 'Any'];
const categories = {
  'Science': ['Engineering', 'Medical', 'IT & Software', 'Data & AI', 'Research & Development', 'Biotechnology', 'Aviation'],
  'Commerce': ['Finance', 'Accounting', 'Banking', 'Management', 'Marketing', 'Sales', 'Entrepreneurship'],
  'Arts': ['Design', 'Media & Journalism', 'Law', 'Psychology', 'Education', 'Social Work', 'Fine Arts', 'Writing'],
  'Vocational': ['Hospitality', 'Culinary Arts', 'Sports & Fitness', 'Defense & Security', 'Beauty & Wellness', 'Trades & Construction'],
  'Any': ['Human Resources', 'Civil Services', 'Logistics & Supply Chain', 'Digital Marketing', 'Event Management']
};

const adjectives = ['Senior', 'Lead', 'Junior', 'Principal', 'Chief', 'Associate', 'Executive', 'Assistant', 'Specialist', 'Consultant'];
const skillsPool = ['Communication', 'Leadership', 'Problem Solving', 'Data Analysis', 'Project Management', 'Coding', 'Creativity', 'Teamwork', 'Critical Thinking', 'Negotiation', 'Public Speaking', 'Technical Writing', 'Empathy', 'Financial Modeling', 'Strategic Planning', 'Customer Service'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSkills(count) {
  const shuffled = [...skillsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSalary() {
  const min = Math.floor(Math.random() * 10) + 3; // 3 to 12
  const max = min + Math.floor(Math.random() * 15) + 5; // min+5 to min+19
  return `₹${min}L - ₹${max}L per year`;
}

const careers = [];
let idCounter = 1;

for (const stream of streams) {
  for (const category of categories[stream]) {
    // Generate ~40 careers per category to easily hit 1000+ total
    for (let i = 0; i < 40; i++) {
      const isAdjective = Math.random() > 0.5;
      let title = category + ' Professional';
      
      if (category === 'Engineering' || category === 'IT & Software') title = getRandomItem(['Software Engineer', 'DevOps Engineer', 'Systems Architect', 'QA Tester', 'Hardware Engineer', 'Network Administrator']);
      if (category === 'Medical') title = getRandomItem(['General Physician', 'Surgeon', 'Pediatrician', 'Dentist', 'Nurse Practitioner', 'Pharmacist']);
      if (category === 'Finance' || category === 'Accounting') title = getRandomItem(['Financial Analyst', 'Investment Banker', 'Chartered Accountant', 'Risk Manager', 'Auditor']);
      if (category === 'Design') title = getRandomItem(['UI/UX Designer', 'Graphic Designer', 'Interior Designer', 'Fashion Designer', 'Product Designer']);
      if (category === 'Law') title = getRandomItem(['Corporate Lawyer', 'Criminal Defense Attorney', 'Legal Advisor', 'Paralegal', 'Judge']);
      if (category === 'Education') title = getRandomItem(['High School Teacher', 'University Professor', 'Special Education Teacher', 'Curriculum Developer']);
      
      // Make it unique-ish
      if (isAdjective) {
        title = getRandomItem(adjectives) + ' ' + title;
      } else {
        title = title + ' ' + getRandomItem(['I', 'II', 'Specialist', 'Expert', 'Coordinator']);
      }

      careers.push({
        id: `car_${idCounter++}`,
        title: title,
        category: category,
        stream: stream,
        description: `As a ${title} in the ${category} field, you will be responsible for driving results, managing complex projects, and utilizing your expertise to achieve organizational goals. This role requires a strong understanding of industry best practices and a commitment to continuous learning.`,
        salary_range: generateSalary(),
        education_path: `Bachelor's degree in ${category} or a related field. Master's degree or professional certifications often preferred for career advancement.`,
        skills_required: getRandomSkills(Math.floor(Math.random() * 3) + 3), // 3 to 5 skills
        growth_outlook: getRandomItem(['High', 'Moderate', 'Stable']),
        is_trending: Math.random() > 0.8 // 20% chance to be trending
      });
    }
  }
}

const fileContent = `export type Career = {
  id: string;
  title: string;
  category: string;
  stream: string;
  description: string;
  salary_range: string;
  education_path: string;
  skills_required: string[];
  growth_outlook: string;
  is_trending: boolean;
};

export const careersData: Career[] = ${JSON.stringify(careers, null, 2)};
`;

const dir = path.join(__dirname, 'src', 'lib', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'careers.ts'), fileContent);
console.log(`Successfully generated ${careers.length} careers in src/lib/data/careers.ts`);
