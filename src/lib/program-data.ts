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
    image: "/images/programs/ai-school.png",
    subtitle: "A beginner-friendly introduction to Artificial Intelligence for young learners.",
    description: "A beginner-friendly introduction to Artificial Intelligence that helps students understand how AI works and how it impacts everyday life, future careers, and society. This course builds awareness of emerging technologies, develops logical thinking, encourages innovation and creativity, and improves problem-solving skills.",
    howWeOffer: [
      "Age-Appropriate Curriculum: Designed specifically for school students with no prior coding experience.",
      "Interactive Activities & Games: Learning through play and hands-on experimentation.",
      "No Coding Required: Focus on concepts and applications rather than syntax.",
      "Industry-Designed Content: Curriculum crafted with input from AI professionals and educators."
    ],
    keyHighlights: [
      "Introduction to AI and its real-world applications",
      "Machine Learning Basics",
      "Generative AI Tools exploration",
      "AI Ethics and responsible use",
      "AI Mini Projects for hands-on learning"
    ]
  },
  "generative-ai-k12": {
    slug: "generative-ai-k12",
    title: "Generative AI & Prompt Engineering for Students",
    category: "AI Learning Hub",
    image: "/images/programs/ai-school.png",
    subtitle: "Learn how to effectively use ChatGPT, Gemini, Claude, and other AI tools.",
    description: "Learn how to effectively use ChatGPT, Gemini, Claude, and other AI tools for learning, creativity, research, and productivity. This program helps students achieve faster learning, better project work, improved communication skills, and enhanced creativity through responsible AI practices.",
    howWeOffer: [
      "Ready-to-Use Prompt Library: Access to hundreds of academic and creative prompts.",
      "Academic Applications: Using AI for research, essays, and presentations.",
      "Hands-On Exercises: Daily practice sessions with immediate feedback.",
      "Responsible AI Practices: Understanding AI safety, bias, and ethical use."
    ],
    keyHighlights: [
      "Understanding Generative AI fundamentals",
      "Prompt Engineering techniques and best practices",
      "AI for Research and academic writing",
      "AI for Presentations and content creation",
      "AI Safety and digital citizenship"
    ]
  },
  "ai-robotics-k12": {
    slug: "ai-robotics-k12",
    title: "AI + Robotics Explorer Program",
    category: "AI Learning Hub",
    image: "/images/programs/robotics.png",
    subtitle: "A future-focused program combining AI, Robotics, Sensors, and Automation.",
    description: "A future-focused program combining Artificial Intelligence, Robotics, Sensors, and Automation to help students become creators rather than consumers of technology. The program provides hands-on STEM learning, improves innovation mindset, builds engineering thinking, and encourages teamwork through project-based learning.",
    howWeOffer: [
      "Project-Based Learning: Every session involves building and programming a robot.",
      "Robotics Kits Provided: All hardware and tools included for the program duration.",
      "AI-Powered Robotics Projects: Combine traditional robotics with intelligent automation.",
      "School Exhibition Support: Guidance and mentorship for showcasing projects."
    ],
    keyHighlights: [
      "Robotics Fundamentals and mechanics",
      "Sensors & Actuators hands-on exploration",
      "Introduction to Coding for robotics",
      "AI in Robotics and automation concepts",
      "Capstone Project to demonstrate learning",
      "STEM Education with real-world applications"
    ]
  },

  // --- COLLEGE PROGRAMS ---
  "ai-career-accelerator": {
    slug: "ai-career-accelerator",
    title: "AI Career Accelerator Program",
    category: "21st Century Skills Hub",
    image: "/images/programs/ai-college.png",
    subtitle: "An employability-focused program for career readiness in the AI era.",
    description: "An employability-focused program helping students use AI to enhance productivity, communication, research, and career readiness. This program builds AI-ready workforce skills, provides better placement opportunities, enhances professional communication, and supports portfolio development with industry mentors.",
    howWeOffer: [
      "Industry Mentors: Learn from professionals working at top tech companies.",
      "Employability Focus: Curriculum designed around real job requirements.",
      "Real-World Assignments: Practical projects that build a strong portfolio.",
      "Interview Preparation: Mock interviews, aptitude prep, and resume reviews."
    ],
    keyHighlights: [
      "AI Fundamentals for all domains",
      "Productivity with AI tools",
      "Research & Analysis with AI assistance",
      "AI Communication Tools",
      "Resume Building with AI",
      "Placement Readiness training"
    ]
  },
  "ai-data-analytics": {
    slug: "ai-data-analytics",
    title: "AI & Data Analytics Professional Program",
    category: "21st Century Skills Hub",
    image: "/images/programs/power-bi.png",
    subtitle: "A practical program covering AI-powered analytics and business intelligence.",
    description: "A practical program covering AI-powered analytics, business intelligence, dashboards, and data-driven decision-making. Students gain a strong analytics foundation, dashboard development skills, better business decision-making ability, and industry-relevant project experience with Power BI integration and real datasets.",
    howWeOffer: [
      "Power BI Integration: Full proficiency in Microsoft's leading BI tool.",
      "Real Datasets: Work with messy, real-world data from actual businesses.",
      "Business Case Studies: Analyze scenarios from finance, retail, and healthcare.",
      "Capstone Projects: End-to-end analytics projects for your portfolio."
    ],
    keyHighlights: [
      "Data Analytics Fundamentals",
      "AI for Data Analysis",
      "Excel & Power BI mastery",
      "Data Visualization techniques",
      "Predictive Analytics",
      "Industry Project with real business impact"
    ]
  },
  "ai-business-management": {
    slug: "ai-business-management",
    title: "AI for Business, Finance & Management",
    category: "21st Century Skills Hub",
    image: "/images/programs/ai-college.png",
    subtitle: "Designed for MBA, BBA, Commerce, Economics, and Management students.",
    description: "Designed for MBA, BBA, Commerce, Economics, and Management students to understand how AI is transforming business functions. Gain future-ready management skills, better decision-making capability, exposure to AI-driven businesses, and increased employability through business-focused curriculum and case-study methodology.",
    howWeOffer: [
      "Business-Focused Curriculum: Tailored for management and commerce students.",
      "Finance and Marketing Applications: Real use cases from industry leaders.",
      "Case-Study Methodology: Learn from real business transformations.",
      "Industry Expert Sessions: Interactive sessions with AI business leaders."
    ],
    keyHighlights: [
      "AI in Business strategy and operations",
      "AI in Finance and accounting",
      "AI in Marketing and customer engagement",
      "AI in HR and talent management",
      "AI in Operations and supply chain",
      "AI Strategy Fundamentals for executives"
    ]
  },

  // --- CORPORATE PROGRAMS ---
  "generative-ai-workplace": {
    slug: "generative-ai-workplace",
    title: "Generative AI for Workplace Productivity",
    category: "Corporate Professionals",
    image: "/images/programs/ai-college.png",
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
    image: "/images/programs/sap-fico.png",
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
    image: "/images/programs/ai-college.png",
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
    ]
  }
};
