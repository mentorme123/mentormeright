export type University = {
  name: string;
  location: string;
  ranking: string;
  popular_courses: string[];
  avg_tuition: string;
};

export type Destination = {
  id: string;
  name: string;
  image: string;
  description: string;
  visa_type: string;
  post_study_work: string;
  avg_cost_living: string;
  universities: University[];
};

export const destinations: Destination[] = [
  {
    id: "usa",
    name: "USA",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop",
    description: "The top destination for STEM, innovation, and high-tech careers. Home to the Ivy League and Silicon Valley culture.",
    visa_type: "F-1 Student Visa",
    post_study_work: "1-3 years (OPT/STEM OPT)",
    avg_cost_living: "$1,200 - $2,500 / month",
    universities: [
      { name: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, MA", ranking: "#1 Global", popular_courses: ["Engineering", "AI", "Physics"], avg_tuition: "$55,000/yr" },
      { name: "Stanford University", location: "Stanford, CA", ranking: "#2 Global", popular_courses: ["Computer Science", "Business", "Law"], avg_tuition: "$58,000/yr" },
      { name: "Harvard University", location: "Cambridge, MA", ranking: "#3 Global", popular_courses: ["MBA", "Medicine", "Public Policy"], avg_tuition: "$54,000/yr" }
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    description: "Centuries of academic excellence with shorter course durations (1-year Masters) and world-renowned degrees.",
    visa_type: "Student Visa (Tier 4)",
    post_study_work: "2 years (Graduate Route)",
    avg_cost_living: "£800 - £1,500 / month",
    universities: [
      { name: "University of Oxford", location: "Oxford", ranking: "#1 UK", popular_courses: ["Philosophy", "Economics", "Law"], avg_tuition: "£28,000/yr" },
      { name: "University of Cambridge", location: "Cambridge", ranking: "#2 UK", popular_courses: ["Mathematics", "Science", "History"], avg_tuition: "£30,000/yr" },
      { name: "Imperial College London", location: "London", ranking: "#3 UK", popular_courses: ["Engineering", "Medicine", "Business"], avg_tuition: "£32,000/yr" }
    ]
  },
  {
    id: "canada",
    name: "Canada",
    image: "https://images.unsplash.com/photo-1541604193435-22287d32c2c2?q=80&w=800&auto=format&fit=crop",
    description: "Known for its welcoming immigration policies, high quality of life, and affordable world-class education.",
    visa_type: "Study Permit",
    post_study_work: "Up to 3 years (PGWP)",
    avg_cost_living: "CAD 1,000 - 1,800 / month",
    universities: [
      { name: "University of Toronto", location: "Toronto", ranking: "#1 Canada", popular_courses: ["Computer Science", "Finance", "Medicine"], avg_tuition: "CAD 45,000/yr" },
      { name: "University of British Columbia", location: "Vancouver", ranking: "#2 Canada", popular_courses: ["Psychology", "Geography", "Forestry"], avg_tuition: "CAD 40,000/yr" },
      { name: "McGill University", location: "Montreal", ranking: "#3 Canada", popular_courses: ["Engineering", "Arts", "Science"], avg_tuition: "CAD 35,000/yr" }
    ]
  },
  {
    id: "australia",
    name: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop",
    description: "Stunning lifestyle combined with strong research output and high employment rates for graduates.",
    visa_type: "Student Visa (Subclass 500)",
    post_study_work: "2-4 years (Temporary Graduate)",
    avg_cost_living: "AUD 1,500 - 2,500 / month",
    universities: [
      { name: "University of Melbourne", location: "Melbourne", ranking: "#1 Australia", popular_courses: ["MBA", "Law", "Healthcare"], avg_tuition: "AUD 42,000/yr" },
      { name: "University of Sydney", location: "Sydney", ranking: "#2 Australia", popular_courses: ["Medicine", "Architecture", "Engineering"], avg_tuition: "AUD 44,000/yr" },
      { name: "Australian National University", location: "Canberra", ranking: "#3 Australia", popular_courses: ["Politics", "Astronomy", "Economics"], avg_tuition: "AUD 40,000/yr" }
    ]
  },
  {
    id: "germany",
    name: "Germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    description: "The land of ideas. Free or low-cost tuition at public universities for international students in many programs.",
    visa_type: "National Visa (D)",
    post_study_work: "18 months for job search",
    avg_cost_living: "€800 - €1,200 / month",
    universities: [
      { name: "Technical University of Munich", location: "Munich", ranking: "#1 Germany", popular_courses: ["Engineering", "Data Science", "Physics"], avg_tuition: "€0 (Public)" },
      { name: "Ludwig Maximilian University", location: "Munich", ranking: "#2 Germany", popular_courses: ["Humanities", "Medicine", "Social Sciences"], avg_tuition: "€0 (Public)" },
      { name: "Heidelberg University", location: "Heidelberg", ranking: "#3 Germany", popular_courses: ["Biosciences", "Medicine", "Law"], avg_tuition: "€0 (Public)" }
    ]
  },
  {
    id: "ireland",
    name: "Ireland",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=800&auto=format&fit=crop",
    description: "The tech hub of Europe. Home to EMEA headquarters of Google, Meta, and Apple with great work opportunities.",
    visa_type: "Study Visa (C/D)",
    post_study_work: "1-2 years (Third Level Scheme)",
    avg_cost_living: "€1,000 - €1,600 / month",
    universities: [
      { name: "Trinity College Dublin", location: "Dublin", ranking: "#1 Ireland", popular_courses: ["English Lit", "IT", "Pharma"], avg_tuition: "€18,000/yr" },
      { name: "University College Dublin", location: "Dublin", ranking: "#2 Ireland", popular_courses: ["Business", "Vet Science", "Arts"], avg_tuition: "€20,000/yr" }
    ]
  }
];
