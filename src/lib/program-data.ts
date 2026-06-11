export interface Program {
  slug: string;
  title: string;
  category: 'AI Learning Hub' | '21st Century Skills Hub' | 'Corporate Programs';
  image: string;
  subtitle: string;
  description: string;
  howWeOffer: string[];
  keyHighlights: string[];
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
    category: "Corporate Programs",
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
    category: "Corporate Programs",
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
    category: "Corporate Programs",
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
    category: "Corporate Programs",
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
  }
};
