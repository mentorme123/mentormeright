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

// RIASEC Mappings for categories
const riasecMap = {
  'Engineering': ['R', 'I'],
  'Medical': ['I', 'S'],
  'IT & Software': ['I', 'C'],
  'Data & AI': ['I', 'C'],
  'Research & Development': ['I'],
  'Biotechnology': ['I', 'R'],
  'Aviation': ['R', 'E'],
  'Finance': ['C', 'E'],
  'Accounting': ['C'],
  'Banking': ['C', 'E'],
  'Management': ['E', 'C'],
  'Marketing': ['E', 'A'],
  'Sales': ['E'],
  'Entrepreneurship': ['E', 'A'],
  'Design': ['A'],
  'Media & Journalism': ['A', 'E'],
  'Law': ['E', 'I'],
  'Psychology': ['I', 'S'],
  'Education': ['S', 'A'],
  'Social Work': ['S'],
  'Fine Arts': ['A'],
  'Writing': ['A', 'I'],
  'Hospitality': ['E', 'S'],
  'Culinary Arts': ['A', 'R'],
  'Sports & Fitness': ['R', 'S'],
  'Defense & Security': ['R', 'E'],
  'Beauty & Wellness': ['A', 'S'],
  'Trades & Construction': ['R'],
  'Human Resources': ['S', 'C'],
  'Civil Services': ['E', 'C'],
  'Logistics & Supply Chain': ['C', 'R'],
  'Digital Marketing': ['E', 'A'],
  'Event Management': ['E', 'S']
};

const industryTemplates = {
  'Engineering': "Designing and building the physical and digital infrastructure of tomorrow. Focuses on structural integrity, efficiency, and innovative hardware solutions.",
  'Medical': "Saving lives and improving patient outcomes through diagnostic excellence and compassionate care in hospital and clinical settings.",
  'IT & Software': "Creating the digital backbone of the modern world. Involves high-level problem solving, system optimization, and building scalable software applications.",
  'Data & AI': "Unlocking insights from complex data sets and building intelligent systems that can learn, predict, and automate future outcomes.",
  'Finance': "Managing wealth and financial risk in a global economy. Involves strategic investment, market analysis, and capital optimization.",
  'Design': "Blending aesthetics with functionality to create products, spaces, and digital experiences that delight users and solve complex problems.",
  'Law': "Upholding justice and navigating the complex legal frameworks that govern society, business, and individual rights.",
  'Psychology': "Understanding human behavior and providing the mental health support and organizational insights needed for a healthier society.",
  'Education': "Shaping the next generation through knowledge transfer, curriculum innovation, and mentorship in various academic environments."
};

const adjectives = ['Senior', 'Lead', 'Junior', 'Principal', 'Chief', 'Associate', 'Executive', 'Assistant', 'Specialist', 'Consultant'];
const skillsPool = ['Analytical Thinking', 'Stakeholder Management', 'Cloud Computing', 'Strategic Communication', 'Risk Assessment', 'Agile Methodology', 'Data Visualization', 'Emotional Intelligence', 'Technical Design', 'Negotiation', 'Creative Problem Solving', 'Deep Learning', 'Financial Reporting', 'Regulatory Compliance'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSkills(count) {
  const shuffled = [...skillsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSalary() {
  const min = Math.floor(Math.random() * 12) + 4; // 4 to 16
  const max = min + Math.floor(Math.random() * 20) + 8; // min+8 to min+28
  return `₹${min}L - ₹${max}L per year`;
}

const careers = [];
let idCounter = 1;

for (const stream of streams) {
  for (const category of categories[stream]) {
    for (let i = 0; i < 40; i++) {
      const isAdjective = Math.random() > 0.5;
      let title = category + ' Professional';
      
      if (category === 'Engineering' || category === 'IT & Software') title = getRandomItem(['Software Engineer', 'DevOps Engineer', 'Systems Architect', 'QA Tester', 'Hardware Engineer', 'Network Administrator', 'Cloud Architect', 'Security Analyst']);
      if (category === 'Medical') title = getRandomItem(['General Physician', 'Surgeon', 'Pediatrician', 'Dentist', 'Nurse Practitioner', 'Pharmacist', 'Radiologist', 'Oncologist']);
      if (category === 'Finance' || category === 'Accounting') title = getRandomItem(['Financial Analyst', 'Investment Banker', 'Chartered Accountant', 'Risk Manager', 'Auditor', 'Tax Consultant', 'Portfolio Manager']);
      if (category === 'Design') title = getRandomItem(['UI/UX Designer', 'Graphic Designer', 'Interior Designer', 'Fashion Designer', 'Product Designer', 'Interaction Designer', 'Brand Strategist']);
      if (category === 'Law') title = getRandomItem(['Corporate Lawyer', 'Criminal Defense Attorney', 'Legal Advisor', 'Paralegal', 'Judge', 'Contract Specialist', 'Litigation Associate']);
      if (category === 'Education') title = getRandomItem(['High School Teacher', 'University Professor', 'Special Education Teacher', 'Curriculum Developer', 'Education Consultant', 'Principal']);
      
      if (isAdjective) {
        title = getRandomItem(adjectives) + ' ' + title;
      } else {
        title = title + ' ' + getRandomItem(['I', 'II', 'Specialist', 'Expert', 'Coordinator', 'Strategist', 'Architect']);
      }

      const baseDesc = industryTemplates[category] || `Advanced professional role in the ${category} sector, focusing on operational excellence and industry-leading standards.`;
      const description = `As a ${title}, you will be at the forefront of the ${category} industry. ${baseDesc} This role demands high proficiency in ${getRandomItem(skillsPool).toLowerCase()} and a commitment to professional growth.`;

      careers.push({
        id: `car_${idCounter++}`,
        title: title,
        category: category,
        stream: stream,
        description: description,
        salary_range: generateSalary(),
        education_path: `Typically requires a Degree in ${category} or equivalent professional certification. Advanced roles may require 5+ years of industry experience.`,
        skills_required: getRandomSkills(Math.floor(Math.random() * 3) + 3),
        growth_outlook: getRandomItem(['Exceptional', 'High', 'Moderate', 'Rapidly Growing']),
        is_trending: Math.random() > 0.85,
        riasec_codes: riasecMap[category] || []
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
  riasec_codes: string[];
};

export const careersData: Career[] = ${JSON.stringify(careers, null, 2)};
`;

const dir = path.join(__dirname, 'src', 'lib', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'careers.ts'), fileContent);
console.log(`Successfully generated ${careers.length} careers with RIASEC mappings and unique descriptions.`);
