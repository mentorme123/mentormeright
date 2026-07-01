export interface Program {
  slug: string;
  title: string;
  category: 'AI Learning Hub' | '21st Century Skills Hub' | 'Corporate Professionals';
  image: string;
  subtitle: string;
  description: string;
  howWeOffer: string[];
  keyHighlights: string[];
  benefits?: string[];
  usp?: string[];
  modules?: string[];
  seoKeywords?: string[];
  learningOutcomes?: string;
  mentorMeAdvantage?: string[];
}

export const programsData: Record<string, Program> = {
  // --- SCHOOL PROGRAMS ---
  "robotics": {
    slug: "robotics",
    title: "Robotics Training for Schools",
    category: "AI Learning Hub",
    image: "/images/programs/robotics.png",
    subtitle: "Building the innovators of tomorrow through hands-on robotics engineering.",
    description: "Our Robotics program is designed to transform middle and high school students from passive technology consumers into active creators. By engaging with real-world engineering challenges, students develop critical thinking, spatial awareness, and a deep understanding of mechanics and coding.",
    howWeOffer: [
      "No Lab Investment Required: We bring the hardware and expertise directly to your school.",
      "Hands-on STEM Integration: Every lesson involves building and programming physical robots.",
      "Expert Instructors: Led by industry professionals with a passion for teaching young minds.",
      "Curriculum Aligned: Seamlessly integrates with existing school physics and math curriculums."
    ],
    keyHighlights: [
      "Fundamentals of Mechanics and Electronics",
      "Block-based and Python programming for robots",
      "Sensor integration and autonomous navigation",
      "End-of-term robotics competition and showcase"
    ]
  },
  "ai-school": {
    slug: "ai-school",
    title: "Artificial Intelligence for Schools",
    category: "AI Learning Hub",
    image: "/images/programs/ai-school.png",
    subtitle: "Demystifying AI for the next generation of digital natives.",
    description: "Artificial Intelligence is no longer the future; it is the present. Our AI program for schools introduces young minds to the foundational concepts of machine learning, natural language processing, and generative AI in a safe, engaging, and highly interactive environment.",
    howWeOffer: [
      "Interactive AI Labs: Students train their own simple AI models.",
      "Ethics First: A strong focus on responsible AI usage and digital citizenship.",
      "Project-Based Learning: Building chatbots and image recognition tools.",
      "Age-Appropriate Curriculum: Tailored complexity for different grade levels."
    ],
    keyHighlights: [
      "Introduction to Generative AI & Prompt Engineering",
      "Understanding algorithms and datasets",
      "Building a working machine learning model",
      "The societal impact and ethics of AI"
    ]
  },
  "vedic-maths": {
    slug: "vedic-maths",
    title: "Vedic Mathematics",
    category: "AI Learning Hub",
    image: "/images/programs/vedic-maths.png",
    subtitle: "Unlock the power of high-speed mental calculation.",
    description: "Vedic Mathematics is an ancient Indian system of calculation that dramatically increases computational speed and accuracy. This program eliminates the fear of math, replacing it with confidence, agility, and a profound appreciation for numbers.",
    howWeOffer: [
      "Fast-Track Mental Math: Learn techniques to calculate without pen or paper.",
      "Expert-Led Sessions: Taught by certified Vedic Math specialists.",
      "Competitive Edge: Prepares students for Olympiads and competitive exams.",
      "Fun & Engaging: We turn complex calculations into enjoyable puzzles."
    ],
    keyHighlights: [
      "High-speed multiplication and division techniques",
      "Mental calculation of squares and square roots",
      "Improved memory and concentration",
      "Elimination of math phobia"
    ]
  },

  // --- COLLEGE PROGRAMS ---
  "ml": {
    slug: "ml",
    title: "Machine Learning Masterclass",
    category: "21st Century Skills Hub",
    image: "/images/programs/ml.png",
    subtitle: "From data to decisions: Mastering predictive analytics.",
    description: "Designed for engineering and computer science students, this intensive Machine Learning program bridges the gap between academic theory and industry application. Students will learn to design, train, and deploy predictive models using real-world datasets.",
    howWeOffer: [
      "Industry-Standard Tools: Extensive training in Python, Scikit-Learn, and Pandas.",
      "Real-World Datasets: Work on case studies from finance, healthcare, and e-commerce.",
      "Capstone Project: Build a fully functional ML pipeline from scratch.",
      "Placement Assistance: Resume building and technical interview prep."
    ],
    keyHighlights: [
      "Supervised vs. Unsupervised Learning",
      "Regression, Classification, and Clustering algorithms",
      "Feature engineering and data preprocessing",
      "Model evaluation and hyperparameter tuning"
    ]
  },
  "ai-college": {
    slug: "ai-college",
    title: "Advanced Artificial Intelligence",
    category: "21st Century Skills Hub",
    image: "/images/programs/ai-college.png",
    subtitle: "Architecting the intelligent systems of the future.",
    description: "Take your technical skills to the cutting edge. This advanced program dives deep into the architecture of modern AI systems, focusing on large language models, computer vision, and autonomous decision-making.",
    howWeOffer: [
      "Cutting-Edge Curriculum: Updated quarterly to reflect the latest AI breakthroughs.",
      "Cloud Deployment: Learn to deploy AI models on AWS and Google Cloud.",
      "Research Opportunities: Collaborate on open-source AI projects.",
      "Expert Mentorship: 1-on-1 guidance from AI researchers and engineers."
    ],
    keyHighlights: [
      "Natural Language Processing (NLP) and LLMs",
      "Computer Vision and Image Segmentation",
      "Reinforcement Learning basics",
      "AI system architecture and deployment strategies"
    ]
  },
  "deep-learning": {
    slug: "deep-learning",
    title: "Deep Learning Neural Networks",
    category: "21st Century Skills Hub",
    image: "/images/programs/deep-learning.png",
    subtitle: "Mastering the algorithms that power modern AI.",
    description: "Deep Learning is the engine driving today's AI revolution. This rigorous program covers the mathematics and programming behind deep neural networks, teaching students how to build solutions using TensorFlow and PyTorch.",
    howWeOffer: [
      "Framework Mastery: In-depth training in PyTorch and TensorFlow.",
      "GPU Computing: Hands-on experience training massive models on cloud GPUs.",
      "Paper Implementation: Learn to read and code solutions from recent AI research papers.",
      "Hackathons: Participate in intensive 48-hour model building challenges."
    ],
    keyHighlights: [
      "Forward and Backward Propagation math",
      "Convolutional Neural Networks (CNNs) for vision",
      "Recurrent Neural Networks (RNNs) and Transformers",
      "Transfer learning and fine-tuning"
    ]
  },
  "communication": {
    slug: "communication",
    title: "Corporate Communication Skills",
    category: "21st Century Skills Hub",
    image: "/images/programs/communication.png",
    subtitle: "The critical soft skills required for corporate success.",
    description: "Technical skills get you the interview; communication skills get you the job—and the promotion. This program transforms students into articulate, confident professionals ready to excel in the global corporate landscape.",
    howWeOffer: [
      "Mock Interviews: Rigorous practice with feedback from HR professionals.",
      "Presentation Labs: Record, review, and refine public speaking skills.",
      "Business Writing: Mastering emails, reports, and professional documentation.",
      "Group Dynamics: Training in leadership, conflict resolution, and teamwork."
    ],
    keyHighlights: [
      "Advanced public speaking and presentation delivery",
      "Cross-cultural corporate communication",
      "Persuasive negotiation techniques",
      "Mastering the technical interview"
    ]
  },

  // --- CORPORATE PROGRAMS ---
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Advanced Digital Marketing",
    category: "Corporate Professionals",
    image: "/images/programs/digital-marketing.png",
    subtitle: "Drive growth through data-driven marketing strategies.",
    description: "A comprehensive immersion into modern digital marketing. This corporate program is designed to upskill marketing teams, teaching them how to leverage SEO, paid media, and analytics to drive exponential business growth.",
    howWeOffer: [
      "Live Ad Campaigns: Trainees manage real budgets and optimize live campaigns.",
      "Analytics First: Deep dive into Google Analytics 4 and conversion tracking.",
      "Platform Mastery: Google Ads, Meta Ads, LinkedIn B2B marketing.",
      "Strategic Planning: Building full-funnel marketing strategies."
    ],
    keyHighlights: [
      "Search Engine Optimization (SEO) & Content Strategy",
      "Performance Marketing and ROI optimization",
      "Social Media Management and Brand Identity",
      "Marketing Automation and CRM integration"
    ]
  },
  "python": {
    slug: "python",
    title: "Python Full Stack Development",
    category: "Corporate Professionals",
    image: "/images/programs/python.png",
    subtitle: "End-to-end web architecture for modern enterprises.",
    description: "Empower your engineering teams to build robust, scalable web applications. This intensive bootcamp covers everything from responsive frontend design to secure, high-performance Python backend architecture.",
    howWeOffer: [
      "Full Stack Mastery: React.js on the frontend, Django/FastAPI on the backend.",
      "Agile Methodology: Training simulates a real-world Agile sprint environment.",
      "Database Design: PostgreSQL optimization and ORM integration.",
      "DevOps Integration: CI/CD pipelines, Docker, and cloud hosting."
    ],
    keyHighlights: [
      "Advanced Python programming and OOP",
      "Building secure RESTful APIs",
      "React.js state management and routing",
      "Application security and performance tuning"
    ]
  },
  "sap-fico": {
    slug: "sap-fico",
    title: "SAP FICO (Finance & Controlling)",
    category: "Corporate Professionals",
    image: "/images/programs/sap-fico.png",
    subtitle: "Master the backbone of enterprise financial management.",
    description: "Our SAP FICO training provides corporate finance teams with the technical proficiency to manage complex financial accounting and reporting within the SAP ERP environment, ensuring global compliance and operational efficiency.",
    howWeOffer: [
      "Live Server Access: Hands-on practice in a real SAP environment.",
      "Scenario-Based Learning: Solving complex, real-world corporate finance issues.",
      "Certification Prep: Curriculum aligned with official SAP certification exams.",
      "Expert Consultants: Taught by senior SAP architects with 10+ years experience."
    ],
    keyHighlights: [
      "General Ledger, AP, and AR configuration",
      "Asset Accounting and Bank Accounting",
      "Cost Center and Profit Center accounting",
      "Financial reporting and period-end closing"
    ]
  },
  "power-bi": {
    slug: "power-bi",
    title: "Data Analytics with Power BI",
    category: "Corporate Professionals",
    image: "/images/programs/power-bi.png",
    subtitle: "Transform raw data into actionable business intelligence.",
    description: "Data is a company's most valuable asset. This program equips professionals with the skills to clean complex data, build dynamic dashboards, and extract insights that drive strategic business decisions using Microsoft Power BI.",
    howWeOffer: [
      "Real Business Data: Practice with massive, messy datasets.",
      "DAX Mastery: Deep dive into Data Analysis Expressions for custom calculations.",
      "Visual Storytelling: Learn to design dashboards that executives actually understand.",
      "Automated Reporting: Setting up scheduled refreshes and gateway connections."
    ],
    keyHighlights: [
      "Data modeling and Power Query optimization",
      "Advanced DAX functions and time intelligence",
      "Interactive dashboard design and UI/UX",
      "Publishing and sharing insights securely"
    ]
  },

  // --- K12 PROGRAMS ---
  "ai-foundations-k12": {
    slug: "ai-foundations-k12",
    title: "AI Foundations for School Students",
    category: "AI Learning Hub",
    image: "/images/programs/ai-foundations-k12.png",
    subtitle: "A beginner-friendly introduction to Artificial Intelligence for young learners.",
    description: "A beginner-friendly introduction to Artificial Intelligence that helps students understand how AI works and how it impacts everyday life, future careers, and society.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Builds awareness of emerging technologies",
      "Develops logical thinking",
      "Encourages innovation and creativity",
      "Improves problem-solving skills"
    ],
    usp: [
      "Age-appropriate learning",
      "Interactive activities and games",
      "No coding required",
      "Industry-designed curriculum"
    ],
    modules: [
      "Introduction to AI",
      "AI Around Us",
      "Machine Learning Basics",
      "Generative AI Tools",
      "AI Ethics",
      "AI Mini Projects"
    ]
  },
  "generative-ai-k12": {
    slug: "generative-ai-k12",
    title: "Generative AI & Prompt Engineering for Students",
    category: "AI Learning Hub",
    image: "/images/programs/generative-ai-k12.png",
    subtitle: "Learn how to effectively use ChatGPT, Gemini, Claude, and other AI tools.",
    description: "Learn how to effectively use ChatGPT, Gemini, Claude, and other AI tools for learning, creativity, research, and productivity.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Faster learning",
      "Better project work",
      "Improved communication skills",
      "Enhanced creativity"
    ],
    usp: [
      "Ready-to-use prompt library",
      "Academic applications",
      "Hands-on exercises",
      "Responsible AI practices"
    ],
    modules: [
      "Understanding Generative AI",
      "Prompt Engineering Fundamentals",
      "AI for Research",
      "AI for Presentations",
      "AI for Content Creation",
      "AI Safety"
    ]
  },
  "ai-robotics-k12": {
    slug: "ai-robotics-k12",
    title: "AI + Robotics Explorer Program",
    category: "AI Learning Hub",
    image: "/images/programs/ai-robotics-k12.png",
    subtitle: "A future-focused program combining AI, Robotics, Sensors, and Automation.",
    description: "A future-focused program combining Artificial Intelligence, Robotics, Sensors, and Automation to help students become creators rather than consumers of technology.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Hands-on STEM learning",
      "Improves innovation mindset",
      "Builds engineering thinking",
      "Encourages teamwork"
    ],
    usp: [
      "Project-based learning",
      "Robotics kits provided",
      "AI-powered robotics projects",
      "School exhibition support"
    ],
    modules: [
      "Robotics Fundamentals",
      "Sensors & Actuators",
      "Introduction to Coding",
      "AI in Robotics",
      "Automation Concepts",
      "Capstone Project"
    ],
    seoKeywords: [
      "AI Robotics Course for Students",
      "Robotics Training for Schools",
      "STEM Education India"
    ]
  },

  // --- COLLEGE PROGRAMS ---
  "ai-career-accelerator": {
    slug: "ai-career-accelerator",
    title: "AI Career Accelerator Program",
    category: "21st Century Skills Hub",
    image: "/images/programs/ai-career-accelerator.png",
    subtitle: "An employability-focused program for career readiness in the AI era.",
    description: "An employability-focused program helping students use AI to enhance productivity, communication, research, and career readiness.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "AI-ready workforce skills",
      "Better placement opportunities",
      "Enhanced professional communication",
      "Portfolio development"
    ],
    usp: [
      "Industry mentors",
      "Employability focus",
      "Real-world assignments",
      "Interview preparation"
    ],
    modules: [
      "AI Fundamentals",
      "Productivity with AI",
      "Research & Analysis",
      "AI Communication Tools",
      "Resume Building with AI",
      "Placement Readiness"
    ]
  },
  "ai-data-analytics": {
    slug: "ai-data-analytics",
    title: "AI & Data Analytics Professional Program",
    category: "21st Century Skills Hub",
    image: "/images/programs/ai-data-analytics.png",
    subtitle: "A practical program covering AI-powered analytics and business intelligence.",
    description: "A practical program covering AI-powered analytics, business intelligence, dashboards, and data-driven decision-making.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Strong analytics foundation",
      "Dashboard development skills",
      "Better business decision-making",
      "Industry-relevant project experience"
    ],
    usp: [
      "Power BI integration",
      "Real datasets",
      "Business case studies",
      "Capstone projects"
    ],
    modules: [
      "Data Analytics Fundamentals",
      "AI for Data Analysis",
      "Excel & Power BI",
      "Data Visualization",
      "Predictive Analytics",
      "Industry Project"
    ]
  },
  "ai-business-management": {
    slug: "ai-business-management",
    title: "AI for Business, Finance & Management",
    category: "21st Century Skills Hub",
    image: "/images/programs/ai-business-management.png",
    subtitle: "Designed for MBA, BBA, Commerce, Economics, and Management students.",
    description: "Designed for MBA, BBA, Commerce, Economics, and Management students to understand how AI is transforming business functions.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Future-ready management skills",
      "Better decision-making capability",
      "Exposure to AI-driven businesses",
      "Increased employability"
    ],
    usp: [
      "Business-focused curriculum",
      "Finance and marketing applications",
      "Case-study methodology",
      "Industry expert sessions"
    ],
    modules: [
      "AI in Business",
      "AI in Finance",
      "AI in Marketing",
      "AI in HR",
      "AI in Operations",
      "AI Strategy Fundamentals"
    ],
    seoKeywords: [
      "AI for MBA Students",
      "AI for Commerce Students",
      "AI in Business Management"
    ]
  },

  // --- CORPORATE PROGRAMS ---
  "generative-ai-workplace": {
    slug: "generative-ai-workplace",
    title: "Generative AI for Workplace Productivity",
    category: "Corporate Professionals",
    image: "/images/programs/generative-ai-workplace.png",
    subtitle: "Help employees leverage AI to automate routine work and boost productivity.",
    description: "Help employees leverage AI to automate routine work, improve communication, enhance productivity, and reduce turnaround times. This program delivers productivity improvement, faster report generation, better communication, and reduced manual effort through function-specific examples and practical implementation.",
    howWeOffer: [
      "Function-Specific Examples: Use cases tailored to your team's role.",
      "Practical Implementation: Hands-on exercises with the tools you use daily.",
      "Immediate Workplace Impact: Apply learnings from day one.",
      "Customizable Workshops: Content adapted to your industry and processes."
    ],
    keyHighlights: [
      "Generative AI Overview and capabilities",
      "ChatGPT for Business applications",
      "AI for Communication and collaboration",
      "AI for Reporting and documentation",
      "AI for Presentations and visuals",
      "Responsible AI in the workplace"
    ],
    benefits: [
      "Productivity improvement",
      "Faster report generation",
      "Better communication",
      "Reduced manual effort"
    ],
    usp: [
      "Function-specific examples",
      "Practical implementation",
      "Immediate workplace impact",
      "Customizable workshops"
    ],
    modules: [
      "Generative AI Overview",
      "ChatGPT for Business",
      "AI for Communication",
      "AI for Reporting",
      "AI for Presentations",
      "Responsible AI"
    ]
  },
  "ai-finance-accounting": {
    slug: "ai-finance-accounting",
    title: "AI for Finance & Accounting Professionals",
    category: "Corporate Professionals",
    image: "/images/programs/ai-finance-accounting.png",
    subtitle: "A specialized program for Finance, Accounting, Costing, Audit, and Tax professionals.",
    description: "A specialized program for Finance, Accounting, Costing, Audit, and Tax professionals to leverage AI in analysis, reporting, forecasting, and compliance. Benefits include faster financial reporting, better forecasting accuracy, improved compliance, and enhanced productivity with CMA/CA-oriented examples and real financial datasets.",
    howWeOffer: [
      "CMA/CA-Oriented Examples: Use cases aligned with professional accounting standards.",
      "Real Financial Datasets: Practice with actual company financial data.",
      "Industry Use Cases: Learn from how top firms use AI in finance.",
      "Expert Faculty: Taught by finance professionals with AI expertise."
    ],
    keyHighlights: [
      "AI in Accounting and bookkeeping",
      "AI in Financial Analysis and reporting",
      "AI for Budgeting and forecasting",
      "AI in Audit and compliance",
      "AI for Cost Management",
      "AI Governance and ethics"
    ],
    benefits: [
      "Faster financial reporting",
      "Better forecasting accuracy",
      "Improved compliance",
      "Enhanced productivity"
    ],
    usp: [
      "CMA/CA-oriented examples",
      "Real financial datasets",
      "Industry use cases",
      "Expert faculty"
    ],
    modules: [
      "AI in Accounting",
      "AI in Financial Analysis",
      "AI for Budgeting",
      "AI in Audit",
      "AI for Cost Management",
      "AI Governance"
    ],
    seoKeywords: [
      "AI for Accountants",
      "AI for Finance Professionals",
      "AI for CMA and CA Students"
    ]
  },
  "ai-leadership": {
    slug: "ai-leadership",
    title: "AI Leadership & Digital Transformation Program",
    category: "Corporate Professionals",
    image: "/images/programs/ai-leadership.png",
    subtitle: "A strategic program for business leaders and senior managers.",
    description: "A strategic program for business leaders, entrepreneurs, and senior managers to understand AI adoption, governance, risk management, and business transformation. Develop AI strategy development skills, improved competitiveness, better technology investments, and organizational readiness through leadership-focused framework and industry transformation case studies.",
    howWeOffer: [
      "Leadership-Focused Framework: Strategic thinking for AI adoption.",
      "Industry Transformation Case Studies: Learn from successful AI implementations.",
      "AI Roadmap Development: Build a customized AI strategy for your organization.",
      "Executive Learning Approach: Peer discussions, boardroom simulations, and expert panels."
    ],
    keyHighlights: [
      "AI Landscape & Trends overview",
      "AI Strategy development and execution",
      "Digital Transformation leadership",
      "AI Governance and compliance",
      "Risk & Compliance management",
      "Change Management for AI initiatives",
      "AI Roadmap Workshop for your organization"
    ],
    benefits: [
      "AI strategy development",
      "Improved competitiveness",
      "Better technology investments",
      "Organizational readiness"
    ],
    usp: [
      "Leadership-focused framework",
      "Industry transformation case studies",
      "AI roadmap development",
      "Executive learning approach"
    ],
    modules: [
      "AI Landscape & Trends",
      "AI Strategy",
      "Digital Transformation",
      "AI Governance",
      "Risk & Compliance",
      "Change Management",
      "AI Roadmap Workshop"
    ],
    seoKeywords: [
      "AI Leadership Training",
      "Digital Transformation Program",
      "AI for Executives"
    ]
  },

  // --- 21st Century Skills Hub - K12 ---
  "critical-thinking-k12": {
    slug: "critical-thinking-k12",
    title: "Critical Thinking & Problem Solving",
    category: "21st Century Skills Hub",
    image: "/images/programs/critical-thinking-k12.png",
    subtitle: "Think Better. Solve Faster. Lead Smarter.",
    description: "The Critical Thinking & Problem Solving Course helps students develop strong structured thinking, logical reasoning, analytical skills, and problem-solving abilities through engaging case studies, puzzles, real-world challenges, and interactive activities. This program is designed to build 21st-century thinking skills that improve academic performance and prepare students for future careers.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Improves analytical thinking skills",
      "Enhances academic performance and learning ability",
      "Builds strong decision-making skills",
      "Encourages independent and logical thinking",
      "Strengthens problem-solving confidence",
      "Develops real-world reasoning ability"
    ],
    usp: [
      "Gamified and interactive learning experience",
      "Industry-inspired case studies",
      "Age-appropriate simulations and activities",
      "Practical, hands-on thinking exercises",
      "Focus on real-world problem-solving skills"
    ],
    modules: [
      "Understanding Problems",
      "Root Cause Analysis",
      "Logical Reasoning",
      "Creative Problem Solving",
      "Decision-Making Frameworks",
      "Real-Life Simulations"
    ],
    learningOutcomes: "After completing this program, students will be able to: Evaluate situations logically and systematically, Break down complex problems effectively, Improve reasoning and analytical thinking skills, Make better and faster decisions, Apply structured problem-solving methods in real life.",
    mentorMeAdvantage: [
      "Gamified and interactive learning experience",
      "Industry-inspired case studies",
      "Age-appropriate simulations and activities",
      "Practical, hands-on thinking exercises",
      "Focus on real-world problem-solving skills"
    ],
    seoKeywords: [
      "Critical Thinking Course for Students",
      "Problem Solving Skills Training",
      "Future Skills for School Students"
    ]
  },
  "public-speaking-k12": {
    slug: "public-speaking-k12",
    title: "Public Speaking",
    category: "21st Century Skills Hub",
    image: "/images/programs/public-speaking-k12.png",
    subtitle: "Speak with Confidence. Influence with Impact.",
    description: "A practical program that helps students overcome stage fear, improve communication skills, and become confident speakers through presentations, storytelling, debates, and public speaking exercises.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Builds confidence",
      "Improves communication",
      "Develops leadership qualities",
      "Enhances presentation skills"
    ],
    usp: [
      "Extensive practice sessions",
      "Individual feedback",
      "Video-based assessments"
    ],
    modules: [
      "Fundamentals of Public Speaking",
      "Voice and Body Language",
      "Storytelling Techniques",
      "Presentation Skills",
      "Debate and Persuasion",
      "Stage Performance"
    ],
    learningOutcomes: "Students confidently communicate ideas in classrooms, competitions, and public forums.",
    mentorMeAdvantage: [
      "Extensive practice sessions",
      "Individual feedback",
      "Video-based assessments"
    ],
    seoKeywords: [
      "Public Speaking for Students",
      "Communication Skills Training",
      "Leadership Skills for School Students"
    ]
  },
  "robotics-fundamentals-k12": {
    slug: "robotics-fundamentals-k12",
    title: "Robotics Fundamentals",
    category: "21st Century Skills Hub",
    image: "/images/programs/robotics-fundamentals-k12.png",
    subtitle: "Learn by Building. Innovate through Robotics.",
    description: "An engaging robotics program where students learn robotics concepts, sensors, motors, automation, and problem-solving through hands-on projects and experiments.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Develops STEM skills",
      "Encourages innovation",
      "Improves technical aptitude",
      "Enhances teamwork"
    ],
    usp: [
      "Hands-on learning",
      "Robotics kits included",
      "Project showcase opportunities"
    ],
    modules: [
      "Introduction to Robotics",
      "Components of Robots",
      "Sensors and Motors",
      "Programming Basics",
      "Robot Design",
      "Robotics Project"
    ],
    learningOutcomes: "Students build and program robots to solve real-world challenges.",
    mentorMeAdvantage: [
      "Hands-on learning",
      "Robotics kits included",
      "Project showcase opportunities"
    ],
    seoKeywords: [
      "Robotics Training for Schools",
      "STEM Education India",
      "Robotics Course for Students"
    ]
  },

  // --- 21st Century Skills Hub - College ---
  "data-analytics-college": {
    slug: "data-analytics-college",
    title: "Data Analytics",
    category: "21st Century Skills Hub",
    image: "/images/programs/data-analytics-college.png",
    subtitle: "Transform Data into Decisions.",
    description: "Learn data analysis, visualization, reporting, and business insights using industry tools and real-world datasets. The program prepares students for careers in analytics, consulting, and business intelligence.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "High-demand career skill",
      "Better employability",
      "Data-driven thinking",
      "Industry relevance"
    ],
    usp: [
      "Industry datasets",
      "Capstone projects",
      "Placement-oriented curriculum"
    ],
    modules: [
      "Data Analytics Fundamentals",
      "Data Cleaning",
      "Data Visualization",
      "Business Reporting",
      "Dashboard Development",
      "Analytics Projects"
    ],
    learningOutcomes: "Students analyze business data and generate actionable insights.",
    mentorMeAdvantage: [
      "Industry datasets",
      "Capstone projects",
      "Placement-oriented curriculum"
    ],
    seoKeywords: [
      "Data Analytics Course Hyderabad",
      "Business Analytics Training",
      "Data Analytics Certification"
    ]
  },
  "digital-marketing-college": {
    slug: "digital-marketing-college",
    title: "Digital Marketing",
    category: "21st Century Skills Hub",
    image: "/images/programs/digital-marketing-college.png",
    subtitle: "Master the Skills Behind Modern Business Growth.",
    description: "A practical digital marketing course covering SEO, social media marketing, content marketing, paid advertising, and analytics to help students build career-ready marketing skills.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "High-demand skill",
      "Freelancing opportunities",
      "Entrepreneurial applications",
      "Career readiness"
    ],
    usp: [
      "Live projects",
      "Campaign simulations",
      "Industry mentors"
    ],
    modules: [
      "Digital Marketing Overview",
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Marketing",
      "Google Ads",
      "Analytics and Reporting"
    ],
    learningOutcomes: "Students execute and manage digital marketing campaigns effectively.",
    mentorMeAdvantage: [
      "Live projects",
      "Campaign simulations",
      "Industry mentors"
    ],
    seoKeywords: [
      "Digital Marketing Course India",
      "SEO Training",
      "Social Media Marketing Course"
    ]
  },
  "financial-modelling-college": {
    slug: "financial-modelling-college",
    title: "Financial Modelling",
    category: "21st Century Skills Hub",
    image: "/images/programs/financial-modelling-college.png",
    subtitle: "Build Business Decisions on Strong Financial Insights.",
    description: "Students learn to create financial models for valuation, budgeting, forecasting, and investment analysis using Excel and industry best practices.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Investment analysis skills",
      "Better finance careers",
      "Advanced Excel expertise",
      "Corporate readiness"
    ],
    usp: [
      "Real company cases",
      "Finance expert faculty",
      "Industry-standard templates"
    ],
    modules: [
      "Excel Fundamentals",
      "Financial Statements",
      "Forecasting Models",
      "Valuation Techniques",
      "Sensitivity Analysis",
      "Investment Cases"
    ],
    learningOutcomes: "Students build professional financial models used by investment and finance professionals.",
    mentorMeAdvantage: [
      "Real company cases",
      "Finance expert faculty",
      "Industry-standard templates"
    ],
    seoKeywords: [
      "Financial Modelling Course India",
      "Investment Analysis Training",
      "Finance Skills Program"
    ]
  },

  // --- 21st Century Skills Hub - Corporate ---
  "leadership-development-corporate": {
    slug: "leadership-development-corporate",
    title: "Leadership Development",
    category: "Corporate Professionals",
    image: "/images/programs/leadership-development-corporate.png",
    subtitle: "Develop Leaders Who Deliver Results.",
    description: "A practical leadership program focused on developing strategic thinking, team leadership, communication, and decision-making capabilities required in today's dynamic workplace.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Stronger leadership capabilities",
      "Improved team performance",
      "Better decision-making",
      "Increased employee engagement"
    ],
    usp: [
      "Leadership simulations",
      "Industry case studies",
      "Practical action plans"
    ],
    modules: [
      "Leadership Fundamentals",
      "Emotional Intelligence",
      "Strategic Thinking",
      "Team Leadership",
      "Conflict Management",
      "Leading Change"
    ],
    learningOutcomes: "Participants become more effective leaders capable of driving organizational performance.",
    mentorMeAdvantage: [
      "Leadership simulations",
      "Industry case studies",
      "Practical action plans"
    ],
    seoKeywords: [
      "Leadership Training India",
      "Management Development Program",
      "Leadership Skills Workshop"
    ]
  },
  "project-management-corporate": {
    slug: "project-management-corporate",
    title: "Project Management",
    category: "Corporate Professionals",
    image: "/images/programs/project-management-corporate.png",
    subtitle: "Plan Better. Execute Faster. Deliver Results.",
    description: "Learn project planning, scheduling, risk management, stakeholder management, and execution frameworks required to successfully manage projects.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Improved project success rates",
      "Better resource management",
      "Enhanced planning skills",
      "Reduced project risks"
    ],
    usp: [
      "Real project simulations",
      "Templates and toolkits",
      "Industry examples"
    ],
    modules: [
      "Project Fundamentals",
      "Planning and Scheduling",
      "Risk Management",
      "Stakeholder Management",
      "Project Monitoring",
      "Project Closure"
    ],
    learningOutcomes: "Participants effectively manage projects from initiation to completion.",
    mentorMeAdvantage: [
      "Real project simulations",
      "Templates and toolkits",
      "Industry examples"
    ],
    seoKeywords: [
      "Project Management Training India",
      "PMP Foundation Program",
      "Project Leadership Skills"
    ]
  },
  "financial-analysis-corporate": {
    slug: "financial-analysis-corporate",
    title: "Financial Analysis",
    category: "Corporate Professionals",
    image: "/images/programs/financial-analysis-corporate.png",
    subtitle: "Convert Financial Data into Business Intelligence.",
    description: "Designed for managers and finance professionals, this program helps participants interpret financial statements, assess business performance, and make informed financial decisions.",
    howWeOffer: [],
    keyHighlights: [],
    benefits: [
      "Better business decisions",
      "Improved financial understanding",
      "Strong analytical skills",
      "Enhanced profitability focus"
    ],
    usp: [
      "Real company financials",
      "Practical business cases",
      "Finance expert facilitators"
    ],
    modules: [
      "Financial Statements Analysis",
      "Ratio Analysis",
      "Cash Flow Analysis",
      "Budgeting",
      "Cost Control",
      "Business Performance Review"
    ],
    learningOutcomes: "Participants confidently evaluate financial performance and support business decision-making.",
    mentorMeAdvantage: [
      "Real company financials",
      "Practical business cases",
      "Finance expert facilitators"
    ],
    seoKeywords: [
      "Financial Analysis Training",
      "Finance for Non-Finance Managers",
      "Business Finance Course"
    ]
  }
};
