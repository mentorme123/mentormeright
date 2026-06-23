"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Mail, MapPin, Briefcase, GraduationCap, Globe2 } from "lucide-react";

function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Parse target number and suffix (e.g. "20+" -> target: 20, suffix: "+", "50k+" -> target: 50, suffix: "k+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        } else {
          setHasStarted(false);
          setCount(0);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad formula: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, target]);

  return (
    <div ref={elementRef} className="text-5xl font-extrabold text-brand-orange">
      {count}
      {suffix}
    </div>
  );
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [skillTab, setSkillTab] = useState("k12");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  const institutions = [
    {
      name: "DG Vaishnav College, Chennai",
      logo: "/images/partners/ddgd-vaishnav.jpg",
      tagline: "Dwaraka Doss Goverdhan Doss Vaishnav College (DG Vaishnav College), Chennai",
      description: "MentorMe partnered with Dwaraka Doss Goverdhan Doss Vaishnav College (DG Vaishnav College), Chennai, to deliver industry-focused value-added certification programs aimed at strengthening students' analytical thinking, problem-solving abilities, and data analytics competencies required in today's professional landscape.",
      website: "https://www.dgvaishnavcollege.edu.in/",
      contact: [{ label: "Location", value: "Chennai, Tamil Nadu" }],
      program: "Critical Thinking, Problem Solving & Data Analytics Certification Programs",
      programOverview: [
        "30-Hour Critical Thinking & Problem Solving Certification",
        "42-Hour MS Excel & Power BI Certification",
        "Industry-Oriented Learning Framework",
        "Hands-On Skill Development",
        "Practical Business Applications",
        "Employability Enhancement Initiative",
        "Future-Ready Professional Skills"
      ],
      keyAreas: [
        "Critical Thinking Frameworks",
        "Analytical Reasoning",
        "Logical Decision-Making",
        "Problem Identification & Analysis",
        "Root Cause Analysis",
        "Creative Problem Solving",
        "Strategic Thinking",
        "Real-World Case Studies",
        "Innovation & Design Thinking",
        "Workplace Problem-Solving Techniques",
        "Advanced MS Excel",
        "Data Cleaning & Transformation",
        "Excel Formulas & Functions",
        "Pivot Tables & Dashboards",
        "Data Visualization Techniques",
        "Business Reporting",
        "Power BI Fundamentals",
        "Interactive Dashboard Development",
        "Data Modeling",
        "Business Intelligence & Analytics"
      ],
      outcomes: [
        "Strong Critical Thinking Skills",
        "Enhanced Problem-Solving Abilities",
        "Data Analysis Competencies",
        "Business Intelligence Knowledge",
        "Analytical Decision-Making Skills",
        "Dashboard & Reporting Expertise",
        "Professional Readiness",
        "Industry-Relevant Technical Skills"
      ],
      partnershipHighlights: "This collaboration demonstrates MentorMe's commitment to empowering students with both cognitive and technical skills. By combining Critical Thinking, Problem Solving, MS Excel, and Power BI training, students gain the ability to analyze challenges, derive insights from data, and make informed decisions in dynamic professional environments.",
      images: [
        "/images/partners/ddgd-vaishnav-session-1.jpeg"
      ],
      imageCrops: [
        "center",
        "center"
      ]
    },

    {
      name: "TSWRDC Nalgonda",
      logo: "/images/partners/tswrdc.jpg",
      description: "TSWRDC Nalgonda is a government residential degree college committed to providing quality higher education to underprivileged students.",
      website: "#",
      contact: [{ label: "Location", value: "Nalgonda, Telangana" }]
    },
    {
      name: "Pragati Mahavidyalaya Junior College, Hyderabad",
      logo: "/images/partners/pragati-maha.jpg",
      tagline: "Pragati Mahavidyalaya Junior College, Hyderabad",
      description: "MentorMe partnered with Pragati Mahavidyalaya Junior College, Hyderabad, to design and deliver a comprehensive 21st Century Skills Development Program focused on building entrepreneurial thinking, digital capabilities, analytical skills, financial literacy, and future career readiness among students.",
      website: "https://www.pragatimahavidyalaya.in/",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }],
      program: "21st Century Skills Development Program",
      programOverview: [
        "300+ Hours of Skill Development Training",
        "Entrepreneurship & Digital Marketing Program",
        "Excel & Power BI Analytics Program",
        "Digital & Financial Literacy Program",
        "Hands-On Project-Based Learning",
        "Industry Expert Sessions",
        "Continuous Assessments & Certifications",
        "Career Readiness & Employability Development"
      ],
      keyAreas: [
        "Entrepreneurship Fundamentals",
        "Business Model Development",
        "Innovation & Design Thinking",
        "Startup Ecosystem Awareness",
        "Digital Marketing Strategies",
        "Social Media Marketing",
        "Personal Branding",
        "Business Communication",
        "Marketing Analytics",
        "Business Growth Frameworks",
        "Advanced MS Excel",
        "Data Cleaning & Transformation",
        "Excel Formulas & Functions",
        "Data Visualization",
        "Dashboard Development",
        "Pivot Tables & Reporting",
        "Business Analytics",
        "Power BI Fundamentals",
        "Interactive Reports",
        "Data-Driven Decision Making",
        "Digital Literacy",
        "Online Productivity Tools",
        "Cyber Safety & Digital Responsibility",
        "Financial Planning Basics",
        "Budgeting & Savings",
        "Banking Fundamentals",
        "Financial Decision Making",
        "Responsible Digital Citizenship",
        "Communication Skills",
        "Personal Effectiveness"
      ],
      outcomes: [
        "Entrepreneurial Thinking Skills",
        "Digital Marketing Knowledge",
        "Data Analytics Competencies",
        "Business Intelligence Skills",
        "Financial Literacy Awareness",
        "Digital Readiness",
        "Problem-Solving Abilities",
        "Career & Employability Skills"
      ],
      partnershipHighlights: "This collaboration demonstrates MentorMe's commitment to delivering holistic student development programs that combine entrepreneurship, technology, analytics, and life skills. Through structured training pathways and practical learning experiences, students are equipped with the competencies required to succeed in the rapidly evolving digital economy.",
      images: [
        "/images/partners/pragati-session-1.jpeg",
        "/images/partners/pragati-session-2.jpeg",
        "/images/partners/pragati-session-3.jpeg",
        "/images/partners/pragati-session-4.jpeg"
      ],
      imageCrops: [
        "center",
        "center",
        "center",
        "center",
        "center"
      ]
    },
    {
      name: "Janani Public School, Bengaluru",
      logo: "/images/partners/Janani%20Public.jpg",
      description: "MentorMe partnered with Janani Public School, Bengaluru, to deliver a comprehensive Career Awareness Workshop and Robotics Program designed to equip students with future-ready skills, career clarity, and hands-on technology exposure.",
      website: "https://jananipublicschool.in/",
      tagline: "Career Awareness & Robotics Excellence Program",
      contact: [{ label: "Location", value: "Bengaluru, Karnataka" }],
      program: "Career Awareness & Robotics Excellence Program",
      programOverview: [
        "Career Awareness Workshop for Grades 9-11",
        "Robotics Training Program",
        "Hands-On STEM Learning Experience",
        "Robotics Expo & Project Showcase",
        "Industry-Aligned Future Skills Development"
      ],
      keyAreas: [
        "Career Opportunities Across Science, Commerce & Arts",
        "Emerging Career Pathways",
        "Future Skills and Industry Trends",
        "Academic Planning & Career Decision-Making",
        "Higher Education Awareness",
        "3 Weeks of Structured Robotics Training",
        "6 Instructor-Led Sessions",
        "Hands-On Learning Methodology",
        "Programming & Electronics Fundamentals",
        "Robotics Innovation Expo",
        "Introduction to Robotics",
        "Circuit Design",
        "Assembly Techniques",
        "Programming Fundamentals",
        "Project Development",
        "Real-World Applications of Technology",
        "Magic LEDs",
        "Overweight Detection System",
        "Burglar Alarm",
        "Automatic Door Alarm",
        "Water Level Indicator",
        "Soil Dry Alarm"
      ],
      images: [
        "/images/partners/Janani-Public-1.jpg",
        "/images/partners/Janani-Public-2.jpg",
        "/images/partners/Janani-Public-3.jpg",
        "/images/partners/Janani-Public-4.jpg"
      ],
      imageCrops: [
        "center top",
        "center top",
        "center top",
        "center top"
      ]
    },
    {
      name: "ELGI Matriculation Higher Secondary School, Coimbatore",
      logo: "/images/partners/elgi-school.png",
      description: "MentorMe partnered with ELGI Matriculation Higher Secondary School, Coimbatore, to deliver a comprehensive Career Guidance Program designed to help students make informed academic and career decisions through scientific assessments, expert counseling, and personalized career planning.",
      website: "https://www.elgischool.com",
      contact: [
        { label: "Address", value: "Kovai Mahalingapuram, Vellalore, Coimbatore, Tamil Nadu 641111" },
        { label: "Email", value: "info@elgischool.org", href: "mailto:info@elgischool.org" },
        { label: "Phone", value: "0422 241 4194", href: "tel:04222414194" }
      ],
      program: "Career Guidance & Career Planning Program",
      programOverview: [
        "Career Guidance Program for Grades 10 & 11",
        "166 Students Benefited",
        "Psychometric Career Assessments",
        "Parent & Student Career Orientation",
        "Career Planning and Stream Selection Support",
        "Digital Career Exploration Platform"
      ],
      keyAreas: [
        "Individualized Psychometric & Career Assessment",
        "Career Stream Selection Guidance",
        "Academic and Career Planning Support",
        "Access to 250+ Career Pathways",
        "College & Course Guidance Sessions",
        "Industry Expert Career Webinars",
        "Parent Awareness & Orientation Programs"
      ],
      outcomes: [
        "Improved Career Awareness and Decision-Making",
        "Better Academic Stream Selection",
        "Increased Understanding of Future Career Opportunities",
        "Enhanced Parent Involvement in Career Planning",
        "Personalized Career Roadmaps for Students",
        "Access to Long-Term Career Development Resources"
      ],
      partnershipHighlights: "This collaboration highlights MentorMe's expertise in delivering large-scale Career Guidance and Career Planning programs that combine psychometric assessments, counseling, technology, and expert mentorship to help students make confident educational and career choices.",
      images: [

      ],
      imageCrops: [
        "center",
        "center"
      ]
    },
    {
      name: "St. Joseph's Degree & PG College, Hyderabad",
      logo: "/images/partners/st-josephs.jpg",
      tagline: "St. Joseph’s Degree & PG College (Autonomous), Hyderabad",
      description: "MentorMe Career Intelligence and Training Pvt. Ltd. partnered with St. Joseph’s Degree & PG College (Autonomous), Hyderabad, affiliated with Osmania University and re-accredited by NAAC, to deliver a comprehensive Artificial Intelligence & Machine Learning Value-Added Certification Program designed to equip students with future-ready technology skills and industry-relevant knowledge.",
      website: "https://stjosephspgcollege.ac.in",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }],
      program: "Artificial Intelligence & Machine Learning Value-Added Certification Program",
      programOverview: [
        "30-Hour Value-Added Certification Program",
        "Artificial Intelligence & Machine Learning Training",
        "Industry-Oriented Curriculum",
        "Hands-On Learning Methodology",
        "Emerging Technology Education",
        "Future Skills Development",
        "Certification-Based Learning",
        "Career Readiness Enhancement"
      ],
      keyAreas: [
        "Introduction to Artificial Intelligence",
        "Machine Learning Fundamentals",
        "Data-Driven Decision Making",
        "AI Applications Across Industries",
        "Predictive Analytics Concepts",
        "Machine Learning Algorithms",
        "AI Ethics & Responsible Innovation",
        "Problem-Solving Using AI",
        "Emerging Technology Trends",
        "Future Career Opportunities in AI",
        "Practical AI Demonstrations",
        "Real-World Use Cases",
        "Interactive Workshops",
        "Project-Based Learning",
        "Industry-Oriented Assignments",
        "Technology Exploration Activities",
        "Innovation Challenges"
      ],
      outcomes: [
        "Foundational AI & Machine Learning Knowledge",
        "Analytical & Critical Thinking Skills",
        "Problem-Solving Capabilities",
        "Technology Awareness",
        "Data Interpretation Skills",
        "Innovation Mindset",
        "Future Career Readiness",
        "Emerging Technology Competencies"
      ],
      partnershipHighlights: "This collaboration showcases MentorMe's expertise in delivering advanced technology education programs that bridge the gap between academic learning and industry requirements. Through structured training and practical exposure, students gain valuable insights into Artificial Intelligence and Machine Learning while building a strong foundation for future careers in technology.",
      images: [
      ],
      imageCrops: [
        "center",
        "center",
        "center",
        "center"
      ]
    },
    {
      name: "Howard Park International School",
      logo: "/images/partners/howard-park.jpg",
      tagline: "Howard Park International School",
      description: "MentorMe Career Intelligence and Training Pvt. Ltd. partnered with Howard Park International School to deliver a hands-on Robotics & Innovation Program designed to inspire young learners through experiential STEM education, robotics engineering, programming, and real-world problem-solving.",
      website: "https://howardinstitutions.org",
      contact: [
        { label: "Address", value: "H. No. 3-6-568, Street No. 8, Himayathnagar, Hyderabad – 500 029" },
        { label: "Email", value: "howardinstitutions@gmail.com", href: "mailto:howardinstitutions@gmail.com" },
        { label: "Phone", value: "040-27630610", href: "tel:04027630610" }
      ],
      program: "Robotics & Innovation Program",
      programOverview: [
        "Robotics & STEM Education Program",
        "Hands-On Learning Methodology",
        "Project-Based Learning",
        "Innovation & Design Thinking",
        "Future Skills Development",
        "Technology Exploration Program",
        "Robotics Project Showcase",
        "Certification-Based Learning"
      ],
      keyAreas: [
        "Introduction to Robotics",
        "Electronics & Circuit Fundamentals",
        "Sensors & Actuators",
        "Robotics Assembly Techniques",
        "Programming Fundamentals",
        "Automation Concepts",
        "Engineering Design Process",
        "Innovation & Creativity",
        "Problem-Solving Techniques",
        "Real-World Robotics Applications",
        "Smart Automation Systems",
        "Sensor-Based Applications",
        "Alarm Systems",
        "Environmental Monitoring Solutions",
        "Robotics-Based Problem Solving",
        "Innovation Challenges"
      ],
      outcomes: [
        "Robotics Fundamentals",
        "STEM & Engineering Skills",
        "Creativity and Innovation Mindset",
        "Programming Awareness",
        "Logical Thinking Skills",
        "Teamwork & Collaboration",
        "Problem-Solving Abilities",
        "Confidence in Technology Applications"
      ],
      partnershipHighlights: "This collaboration reflects MentorMe's commitment to empowering students with future-ready STEM and robotics education. Through hands-on experiences, innovation-driven learning, and practical project development, students gain the confidence and skills needed to thrive in a technology-driven world.",
      images: [
        "/images/partners/howard-park.jpg",
        "/images/partners/howard-park-1.jpg",
        "/images/partners/howard-park-2.jpg",
        "/images/partners/howard-park-3.jpg",
        "/images/partners/howard-park-4.jpg"
      ],
      imageCrops: [
        "center",
        "center",
        "center",
        "center",
        "center"
      ]
    },
    {
      name: "Geetam School",
      logo: "/images/partners/geetam.jpg",
      tagline: "Geetam School, Kakinada",
      description: "MentorMe Career Intelligence and Training Pvt. Ltd. partnered with Geetam School to deliver a comprehensive Robotics & STEM Innovation Program aimed at fostering creativity, problem-solving abilities, and future-ready technology skills through hands-on learning and experiential education.",
      website: "https://www.geetamnextgeniitschool.com",
      contact: [
        { label: "Address", value: "66-5-3, Narasannanagar, near Karanam garu junction, Kakinada" },
        { label: "Phone", value: "0884 235 3144 / +91 8897533222" },
        { label: "Email", value: "geetamschoolkakinada@gmail.com", href: "mailto:geetamschoolkakinada@gmail.com" }
      ],
      program: "Robotics & STEM Innovation Program",
      programOverview: [
        "Robotics & STEM Education Program",
        "Hands-On Project-Based Learning",
        "Innovation & Design Thinking Framework",
        "Technology Exploration Workshops",
        "Practical Engineering Concepts",
        "Robotics Project Development",
        "Future Skills Enhancement",
        "Certification-Based Learning"
      ],
      keyAreas: [
        "Introduction to Robotics",
        "Electronics & Circuit Design",
        "Sensors and Actuators",
        "Robotics Assembly",
        "Programming Fundamentals",
        "Automation & Smart Systems",
        "Engineering Design Process",
        "Innovation & Creative Thinking",
        "Real-World Technology Applications",
        "Problem-Solving Methodologies",
        "Building Functional Robotics Models",
        "Sensor-Based Automation Projects",
        "Electronics Experiments",
        "Interactive Robotics Challenges",
        "Team-Based Engineering Activities",
        "Prototype Development",
        "Innovation Projects",
        "Project Demonstrations"
      ],
      outcomes: [
        "Robotics & Engineering Fundamentals",
        "STEM Knowledge and Application Skills",
        "Critical Thinking Abilities",
        "Creativity & Innovation Mindset",
        "Programming Awareness",
        "Teamwork & Collaboration Skills",
        "Analytical Problem-Solving Skills",
        "Confidence in Emerging Technologies"
      ],
      partnershipHighlights: "This collaboration demonstrates MentorMe's commitment to nurturing young innovators through practical STEM education and robotics learning. By combining technology, creativity, and hands-on experiences, students gain valuable exposure to future technologies and develop skills essential for the careers of tomorrow.",
      images: [
        "/images/partners/geetam.jpg",
        "/images/partners/geetam.jpg",
        "/images/partners/geetam.jpg",
        "/images/partners/geetam.jpg"
      ],
      imageCrops: [
        "center",
        "center",
        "center",
        "center"
      ]
    },
    {
      name: "IIMC Hyderabad",
      logo: "/images/partners/iimc-hyderabad.jpg",
      tagline: "Indian Institute of Management & Commerce (IIMC), Hyderabad",
      description: "Established in 1973, IIMC Hyderabad is a premier institution offering undergraduate, postgraduate, and professional programs, known for academic excellence, holistic student development, and strong industry connections.",
      website: "https://iimchyderabad.com",
      contact: [
        { label: "Location", value: "Hyderabad, Telangana" }
      ],
      program: "Interview Skills Certification Program",
      programOverview: ["30 Hours of Instructor-Led Training", "On-Campus Delivery Model", "50-60 Students per Batch", "Industry-Oriented Curriculum", "Certification-Based Learning"],
      keyAreas: ["Interview Preparation Techniques", "Tailored Job Application Strategies", "Group Discussions", "HR Mock Interviews", "Professional Interview Techniques"],
      outcomes: ["Improved interview confidence and communication skills", "Enhanced job application and placement readiness", "Practical exposure through mock interview simulations", "Better understanding of employer expectations and recruitment processes"],
      partnershipHighlights: "This collaboration demonstrates MentorMe's capability to design and deliver structured employability and career development programs for higher education institutions. Our programs are tailored to bridge the gap between academic learning and industry requirements.",
      images: [
        "/images/partners/iimc-session-2.jpg",
        "/images/partners/iimc-session-3.jpg",
        "/images/partners/iimc-session-4.jpg",
        "/images/partners/iimc-session-5.jpg"
      ],
      imageCrops: [
        "center 50%",   // Photo 1: orange-wall classroom
        "center 65%",   // Photo 2: hall Q&A – shift down to show all seated students
        "center 25%",   // Photo 3: large classroom – keep top students visible
        "center 35%"    // Photo 4: projector room
      ]
    },
    {
      name: "HPS Nizamabad",
      logo: "/images/partners/hps-nizamabad.jpg",
      tagline: "HPS Nizamabad School",
      description: "MentorMe partnered with HPS Nizamabad School to deliver a comprehensive Artificial Intelligence (AI) Certification Program designed to equip students with future-ready technology skills, practical AI knowledge, and hands-on learning experiences.",
      website: "#",
      contact: [{ label: "Location", value: "Nizamabad, Telangana" }],
      program: "Artificial Intelligence Certification Program",
      programOverview: [
        "Academic Year 2025-26",
        "Monthly Training Sessions",
        "Two Consecutive Training Days Every Month",
        "Average Batch Size of 200 Students",
        "Future Skills & Emerging Technology Education"
      ],
      keyAreas: [
        "Introduction to Artificial Intelligence & Ethics",
        "Machine Learning Fundamentals",
        "Computer Vision & Image Processing",
        "Natural Language Processing (NLP)",
        "AI Chatbots & Conversational AI",
        "AI in Robotics",
        "AI for Social Good & Sustainability",
        "Hands-On Learning Experience & Innovation Projects"
      ],
      outcomes: [
        "Foundational Understanding of Artificial Intelligence",
        "Exposure to Machine Learning Concepts",
        "Practical Experience with AI Tools & Technologies",
        "Enhanced Problem-Solving and Analytical Skills",
        "Increased Awareness of Future Career Opportunities in Technology",
        "Development of Innovation and Design Thinking Capabilities"
      ],
      partnershipHighlights: "This collaboration demonstrates MentorMe's expertise in delivering advanced technology education programs for schools. By introducing students to Artificial Intelligence, Machine Learning, Computer Vision, and Natural Language Processing, MentorMe helps institutions prepare learners for the digital future.",
      images: [

        "/images/partners/hps-session-1.jpg",
        "/images/partners/hps-session-2.jpg"
      ],
      imageCrops: [
        "center",
        "center",
        "center"
      ]
    },
    {
      name: "St. Pious X Degree & PG College for Women",
      logo: "/images/partners/st-pious.jpg",
      description: "MentorMe Career Intelligence and Training Pvt. Ltd. partnered with St. Pious X Degree & PG College for Women, Hyderabad, to deliver industry-relevant certification programs designed to enhance employability, strengthen technical competencies, and equip students with practical skills aligned with modern workplace requirements.",
      website: "#",
      tagline: "St. Pious X Degree & PG College for Women, Hyderabad",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }],
      program: "Industry-Oriented Value-Added Certification Programs",
      programOverview: [
        "Industry-Oriented Certification Programs",
        "Hands-On Learning Approach",
        "Commerce Student Skill Development",
        "Technology-Focused Curriculum",
        "Employability Enhancement Initiatives",
        "Expert Faculty-Led Training",
        "Practical Application-Based Learning",
        "Career Readiness Framework"
      ],
      keyAreas: [
        "Advanced Excel 2021 with Tableau",
        "Power BI",
        "Data Analysis Techniques",
        "Dashboard Creation",
        "Business Reporting",
        "Data Visualization",
        "Business Intelligence Fundamentals",
        "Data Modeling",
        "Reporting Automation",
        "Industry-Based Projects"
      ],
      outcomes: [
        "Industry-Relevant Technical Skills",
        "Enhanced Employability",
        "Data Analysis Capabilities",
        "Business Intelligence Knowledge",
        "Practical Tool Proficiency",
        "Certification Credentials",
        "Career Advancement Opportunities",
        "Improved Workplace Readiness"
      ],
      partnershipHighlights: "This collaborative framework ensures a productive and structured learning environment for all participants. Modern employers increasingly seek graduates who possess both academic knowledge and practical tool expertise. Certifications in Advanced Excel, Tableau, and Power BI help students build strong analytical, reporting, and business intelligence capabilities.",
      images: [
        "/images/partners/st-pious-1.jpg",
        "/images/partners/st-pious-2.jpg",
        "/images/partners/st-pious-3.jpg",
        "/images/partners/st-pious-4.jpg"
      ],
      imageCrops: [
        "center top",
        "center top",
        "center top",
        "center top"
      ]
    },
    {
      name: "Edify School Tirupati",
      logo: "/images/partners/edify-school.png",
      tagline: "Edify School, Tirupati",
      description: "MentorMe partnered with Edify School, Tirupati to design and deliver a structured, outcome-driven Career Guidance Ecosystem for students from Grades 8–12. The program combines psychometric assessments, career exploration, academic planning, parent engagement, and personalized counseling to help students make informed decisions about their future careers and education pathways.",
      website: "http://edifyschooltirupati.com/",
      contact: [{ label: "Location", value: "Tirupati, Andhra Pradesh" }],
      program: "The Career Compass Program",
      programOverview: [
        "Career Guidance Program for Grades 8–12",
        "Psychometric Career Assessments",
        "Career Awareness Workshops",
        "Stream Selection Guidance",
        "Parent Orientation & Engagement",
        "Industry Expert Career Sessions",
        "College & Study Abroad Guidance",
        "One-on-One Career Counseling",
        "Digital Career Library Access"
      ],
      keyAreas: [
        "Self-Discovery & Assessments",
        "Career Awareness Workshops",
        "Parent Orientation Program",
        "Industry Expert Sessions",
        "Digital Career Library",
        "Student Well-Being & Life Skills"
      ],
      outcomes: [
        "Clear Career Roadmaps for Students",
        "Data-Driven Career Decisions",
        "Improved Parent Engagement",
        "Enhanced Student Confidence",
        "Better Subject & Stream Selection",
        "Increased Career Awareness",
        "Stronger College & Career Planning",
        "Future-Ready Skill Development"
      ],
      partnershipHighlights: "Through this structured and holistic career development ecosystem, Edify School strengthens its position as a future-ready institution while empowering students with the clarity, confidence, and direction needed to make successful academic and career choices.",
      images: [
        "/images/partners/edify-session-1.jpg",
        "/images/partners/edify-session-2.jpg",
        "/images/partners/edify-session-3.jpg",
        "/images/partners/edify-session-4.jpg"
      ],
      imageCrops: [
        "center 60%", // Photo 1: focus slightly lower than center
        "center 60%", // Photo 2: focus slightly lower than center
        "center 40%", // Photo 3: vertical photo, focus slightly higher than center to keep heads
        "center 30%"  // Photo 4: lady at podium, focus higher to keep head
      ]
    },
    {
      name: "Shree Daksha Academy, Bengaluru",
      logo: "/images/partners/shree-daksha.png",
      description: "MentorMe partnered with Shree Daksha Academy, Bengaluru, to deliver a comprehensive Value-Added Training Program designed to bridge the gap between academic learning and industry expectations. The initiative focused on developing technical, accounting, analytical, and employability skills required for a successful transition from campus to corporate careers.",
      website: "https://shreedakshaacademyedu.in/",
      tagline: "Shree Daksha Academy, Bengaluru",
      contact: [
        { label: "Address", value: "Bengaluru, Karnataka" },
        { label: "Email", value: "info@shreedakshaacademyedu.in", href: "mailto:info@shreedakshaacademyedu.in" }
      ],
      program: "Value-Added Training & Employability Enhancement Program",
      programOverview: [
        "Value-Added Training Programs for B.Com Students",
        "Advanced Excel Certification",
        "Comprehensive Accounting & GST Training",
        "Campus Recruitment Training (CRT)",
        "Profile Building & Career Readiness",
        "Industry-Oriented Curriculum",
        "Practical Learning Framework",
        "Corporate Readiness Development"
      ],
      keyAreas: [
        "Data Handling & Data Cleaning",
        "Advanced Sorting & Filtering",
        "Excel Formulas & Functions",
        "VLOOKUP, XLOOKUP & INDEX-MATCH",
        "Dynamic Arrays & Data Validation",
        "Pivot Tables & Dashboards",
        "Power Query Fundamentals",
        "Macros & VBA Automation",
        "Tally ERP / Tally Prime",
        "GST Compliance & Filing",
        "Financial Accounting Processes",
        "ATS-Compliant Resume Development",
        "Personal Branding & LinkedIn Optimization"
      ],
      outcomes: [
        "Advanced Excel & Data Analytics Skills",
        "Business Intelligence Capabilities",
        "Accounting & GST Expertise",
        "Financial Reporting Knowledge",
        "Corporate Readiness Skills",
        "Enhanced Employability",
        "Industry-Relevant Technical Competencies"
      ],
      partnershipHighlights: "This collaboration demonstrates MentorMe's expertise in delivering outcome-driven employability and professional certification programs that combine technical training, accounting excellence, and career readiness development. Through structured learning pathways and practical exposure, students are empowered with the skills required to excel in today's competitive job market.",
      images: [
        "/images/partners/shree-daksha.png",
        "/images/partners/shree-daksha-1.jpg",
        "/images/partners/shree-daksha-2.jpg",
        "/images/partners/shree-daksha-3.jpg",
        "/images/partners/shree-daksha-4.jpg"
      ],
      imageCrops: [
        "center top",
        "center top",
        "center top",
        "center top",
        "center top"
      ]
    },
    {
      name: "Iqra International School",
      logo: "/images/partners/Iqra International.jpg",
      description: "MentorMe partnered with Iqra International School to deliver a comprehensive Career Guidance Program focused on helping students discover their strengths, explore career opportunities, make informed academic decisions, and prepare for future success through assessments, mentoring, workshops, and personalized guidance.",
      website: "https://www.iqrainternationalschool.com/",
      tagline: "Iqra International School",
      contact: [{ label: "Location", value: "India" }],
      program: "Career Guidance & Future Readiness Program",
      programOverview: [
        "Comprehensive Career Guidance Ecosystem",
        "NEP 2020 Aligned Framework",
        "Students from Grades 8–10",
        "AI-Powered Career Assessments",
        "Personalized Career Counseling",
        "Parent Engagement & Orientation",
        "Industry Expert Sessions",
        "Career Awareness Workshops",
        "Study Abroad Guidance"
      ],
      keyAreas: [
        "Personality Profiling using the 5E Model",
        "RIASEC Interest Assessment",
        "Aptitude Evaluation",
        "Skill Proficiency Analysis",
        "Career Recommendation Reports",
        "Subject Stream Suggestions",
        "Career Mapping & Planning",
        "Digital Career Library with 250+ Careers",
        "Stream-Specific Career Awareness Sessions",
        "Emerging Career Insights",
        "Entrance Examination Guidance",
        "College & Course Selection Support",
        "Study Abroad Opportunities",
        "Industry Trends and Future Careers",
        "One-on-One Career Counseling",
        "Group Guidance Sessions",
        "Admission Guidance",
        "Career Planning Support",
        "Goal Setting Workshops",
        "Academic Pathway Selection",
        "Future Career Roadmaps"
      ],
      outcomes: [
        "Enhanced Self-Awareness",
        "Informed Career Decision-Making",
        "Stream Selection Clarity",
        "Improved Academic Planning",
        "Increased Career Awareness",
        "Better Parent-Student Alignment",
        "Future-Ready Mindset",
        "Strong Career Roadmaps"
      ],
      partnershipHighlights: "This holistic approach ensures students receive continuous support from self-discovery to career planning and higher education readiness. The program follows a structured framework comprising Psychometric Assessments, Career Guidance Workshops, Career Exploration through Digital Career Library, Industry Expert Sessions, New Age Learning Programs, and Entrance Exam & College Guidance.",
      images: [
        "/images/partners/Iqra-session-1.jpg",
        "/images/partners/Iqra-session-2.jpg",
        "/images/partners/Iqra-session-3.jpg",
        "/images/partners/Iqra-session-4.jpg"
      ],
      imageCrops: [
        "center top",
        "center top",
        "center top",
        "center top"
      ]
    },
    {
      name: "Sri Aurobindo International School (SAIS), Hyderabad",
      logo: "/images/partners/sri aurobindo.webp",
      description: "MentorMe partnered with Sri Aurobindo International School (SAIS), Hyderabad, to deliver a comprehensive Robotics & Artificial Intelligence After School Program designed to equip students with future-ready technology skills through experiential learning, innovation, and hands-on project development.",
      website: "https://sriaurobindointernationalschool.org/home.html/",
      tagline: "Robotics & Artificial Intelligence After School Program",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }],
      program: "Robotics & Artificial Intelligence After School Program",
      programOverview: [
        "Robotics & AI After School Program",
        "Students from Grades 5–12",
        "ICSE Curriculum-Aligned Learning",
        "Hands-On Project-Based Training",
        "Design Thinking & DIY Methodology",
        "Robotics & Artificial Intelligence Integration"
      ],
      keyAreas: [
        "Introduction to Robotics & Evolution of Robots",
        "Sensors, Actuators & Controllers",
        "Motion Mechanisms & Degrees of Freedom",
        "AI-Enabled Robot Development",
        "Robotics Project Design",
        "Final Project Showcase",
        "Introduction to Artificial Intelligence",
        "AI Applications in Real Life",
        "Computer Vision",
        "Natural Language Processing (NLP)",
        "Python Programming Fundamentals",
        "AI Ethics & Sustainability",
        "AI Project Framework & Prototyping"
      ],
      outcomes: [
        "Strong Foundation in Robotics & AI",
        "Practical Engineering & Programming Skills",
        "Enhanced Problem-Solving Abilities",
        "Exposure to Emerging Technologies",
        "Innovation and Design Thinking Mindset",
        "Real-World Project Development Experience",
        "Future Career Readiness in Technology"
      ],
      partnershipHighlights: "This collaboration demonstrates MentorMe's expertise in delivering advanced STEM and Emerging Technology programs that combine Robotics, Artificial Intelligence, Programming, and Innovation. Through structured learning pathways and hands-on experiences, students gain the skills needed to thrive in the technology-driven future.",
      images: [
        "/images/partners/pragati-maha.jpg",
        "/images/partners/pragati-session-1.jpeg",
        "/images/partners/pragati-session-2.jpeg",
        "/images/partners/pragati-session-3.jpeg",
        "/images/partners/pragati-session-4.jpeg"
      ],
      imageCrops: [
        "center",
        "center",
        "center",
        "center",
        "center"
      ]
    },
  ];

  const slides = [
    {
      image: "/images/programs/robotics.png",
      heading: "Build Future-Ready Careers ",
      highlight: "with AI",
      subtitle: "MentorMe helps school students, college learners, and working professionals discover career paths, build future-ready skills, and achieve success in an AI-driven world.",
      btn1Text: "Career Assessment",
      btn1Link: "/assessment",
      btn2Text: "Contact Us",
      btn2Link: "/contact"
    },
    {
      image: "/images/programs/ai-school.png",
      heading: "AI-Powered Career ",
      highlight: "Intelligence",
      subtitle: "Discover strengths, ideal career pathways, and growth opportunities through AI-based psychometric assessments, AI-driven career insights, and expert mentoring.",
      btn1Text: "Start Assessment",
      btn1Link: "/assessment",
      btn2Text: "Our Programs",
      btn2Link: "/services"
    },
    {
      image: "/images/programs/vedic-maths.png",
      heading: "Future Skills & ",
      highlight: "Employability",
      subtitle: "Master AI, Robotics, emerging technologies, and workplace skills that drive academic, professional, and career success.",
      btn1Text: "Explore Services",
      btn1Link: "/services",
      btn2Text: "Partner With Us",
      btn2Link: "/contact"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden w-full max-w-full">

      {/* Hero Section Carousel */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 lg:pt-36 lg:pb-28 min-h-[500px] lg:min-h-[600px] text-white overflow-hidden">
        {/* Background Image Carousel (Horizontal Slide transition) */}
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          {slides.map((slide, idx) => {
            let translateClass = "translate-x-full";
            if (idx === currentSlide) {
              translateClass = "translate-x-0";
            } else if (idx === (currentSlide - 1 + slides.length) % slides.length) {
              translateClass = "-translate-x-full";
            }
            return (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[800ms] ease-in-out ${translateClass}`}
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
            );
          })}
          {/* Rich modern dark gradient overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/90 via-[#0a182b]/85 to-[#0b1b30]/95 z-0" />
        </div>

        {/* Dynamic content with horizontal slide animation */}
        <div className="max-w-5xl space-y-8 relative z-10 px-4">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-8"
          >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                {slides[currentSlide].heading}
                <br className="hidden md:block" />
                <span className="text-brand-orange drop-shadow-[0_2px_8px_rgba(244,114,22,0.25)]">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-2 drop-shadow-md">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link href={slides[currentSlide].btn1Link} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold text-lg sm:text-xl px-10 py-5 rounded-full shadow-2xl shadow-brand-orange/30 transition-transform hover:scale-105 border-2 border-white/20">
                    {slides[currentSlide].btn1Text}
                  </Button>
                </Link>
                <Link href={slides[currentSlide].btn2Link} className="w-full sm:w-auto">
                  <Button size="lg" variant="ghost" className="w-full h-auto text-lg sm:text-xl font-extrabold px-10 py-5 rounded-full border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 transition-all">
                    {slides[currentSlide].btn2Text}
                  </Button>
                </Link>
              </div>
            </motion.div>

          {/* Dots Navigation Indicator */}
          <div className="flex justify-center gap-3 pt-12">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${idx === currentSlide
                  ? "w-8 bg-brand-orange"
                  : "w-3 bg-white/40 hover:bg-white/60"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What is MentorMe? (Deep Dive + Image) */}
      <section className="py-24 px-4 bg-background relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold leading-tight text-foreground">
              MentorMe – AI-Powered Career Development &amp; Employability Solutions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MentorMe partners with schools, colleges, and organizations to develop future-ready talent through Career Guidance, Psychometric Assessments, AI &amp; Robotics Programs, Employability Training, Placement Readiness Solutions, and Professional Upskilling.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By combining career intelligence, emerging technologies, and industry-relevant skills, we help learners and professionals succeed in an AI-driven world.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-orange/20 rounded-3xl blur-3xl transform scale-105"></div>
            <Image
              src="/images/mentorme-session.jpg"
              alt="MentorMe Session with students"
              width={600}
              height={500}
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[400px] lg:h-[500px]"
              priority
            />
          </motion.div>
        </div>
      </section>



      {/* Career Guidance & Psychometric Assessments – Section 3 */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative lg:col-span-5 self-start"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-brand-orange/20 to-brand-blue/20 rounded-3xl blur-3xl transform scale-105"></div>
            <Image
              src="/images/guidance-session.jpg"
              alt="Career Guidance & Psychometric Assessment Session"
              width={600}
              height={800}
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[450px] lg:h-[560px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2 lg:col-span-7"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold border border-brand-blue/20">
              🎯 AI-Powered Career Intelligence
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
              Career Guidance, Admissions &amp; Psychometric Assessments{" "}
              <span className="text-brand-blue">for Students and Professionals</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              MentorMe&apos;s AI-powered Career Guidance Platform helps students and professionals make informed academic and career decisions through scientifically validated <strong className="text-foreground">Psychometric Assessments</strong>, Career Counselling, Admission Guidance, and Personalized Career Roadmaps.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              Our comprehensive Career Assessment evaluates interests, personality, aptitude, strengths, and career preferences to help answer important questions such as <em>&ldquo;What should I do after 10th?&rdquo;</em>, <em>&ldquo;What should I do after 12th?&rdquo;</em>, <em>&ldquo;Which subject stream is right for me?&rdquo;</em>, and <em>&ldquo;Which career best matches my potential?&rdquo;</em>
            </p>

            {/* Checkmarks */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "Career Path Recommendations & Career Growth Options",
                "Stream Selection Guidance (PCM, PCB, Commerce, Arts & Humanities)",
                "Course & College Recommendations",
                "Engineering, Medical, B.Com, BBA, BCA, Law, Design, MBA & More",
                "College Admission Guidance for Top Universities in India",
                "Career Growth, Career Transition & Career Change Planning",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">✓</span>
                  <span className="text-sm font-medium text-foreground leading-snug">{point}</span>
                </div>
              ))}
            </div>

            {/* After Assessment box */}
            <div className="mt-2 p-5 bg-gradient-to-r from-brand-blue/5 to-brand-orange/5 rounded-2xl border border-brand-blue/15">
              <p className="text-sm font-semibold text-brand-blue mb-1">📄 After Your Assessment</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every client receives a detailed <strong className="text-foreground">AI-generated Career Report</strong> with actionable recommendations, ideal career matches, higher education pathways, admission guidance, and personalized skill development plans.
              </p>
            </div>
          </motion.div>
          </div>{/* end top grid */}

          {/* Career Guidance by Stage Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Career Guidance for Every Stage</h3>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">Personalized career support at every step of the learning journey — from school to career success.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  grade: "Grades 6–7",
                  icon: "🌱",
                  color: "from-green-400 to-emerald-500",
                  bg: "bg-green-50 border-green-100",
                  desc: "Build self-awareness, identify strengths, and develop a strong foundation for future career planning."
                },
                {
                  grade: "Grades 8–10",
                  icon: "🧭",
                  color: "from-blue-400 to-brand-blue",
                  bg: "bg-blue-50 border-blue-100",
                  desc: "Discover the right path after 10th through career assessments and expert counselling. Get guidance on stream selection — PCM, PCB, Commerce, Arts, and Humanities — based on your aptitude, interests, and future career goals."
                },
                {
                  grade: "Grades 11–12",
                  icon: "🎯",
                  color: "from-purple-400 to-indigo-500",
                  bg: "bg-purple-50 border-purple-100",
                  desc: "Explore what to do after 12th, career options, entrance exams, and higher education pathways. Receive guidance for Engineering, Medicine, B.Com, BBA, BCA, Law, Design, Liberal Arts, Allied Health Sciences, and admission support for top colleges across India."
                },
                {
                  grade: "College & Professionals",
                  icon: "🚀",
                  color: "from-brand-orange to-orange-400",
                  bg: "bg-orange-50 border-orange-100",
                  desc: "Plan career growth, improve employability, explore MBA, MCA, Master's programs, certifications, career transitions, leadership pathways, and achieve long-term professional success."
                },
              ].map((stage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl border p-5 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md ${stage.bg}`}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-xl shadow-md`}>
                    {stage.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-base mb-1">{stage.grade}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>{/* end max-w container */}
      </section>

      {/* Our Recent Program Partners Section */}
      <section className="py-14 px-4 bg-gradient-to-br from-brand-blue via-brand-blue to-[#112D55] text-white overflow-hidden relative w-full max-w-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0"></div>
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <h2 className="text-3xl font-bold text-white">Our Recent Program Partners</h2>
            <p className="text-white/80 text-sm">These are some of our Prestigious Clients</p>
          </motion.div>

          {/* Scrolling Carousel */}
          <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-blue to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-blue to-transparent z-10 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 4 }}
              className="flex gap-5 partners-scroll"
            >
              {(() => {
                const partners = [
                  { name: "DG Vaishnav College, Chennai", logo: "/images/partners/ddgd-vaishnav.jpg", link: "/college-programs" },
                  { name: "Bhavan's Group", logo: "/images/partners/bhavans-group.jpg", link: "/k12-programs" },
                  { name: "TSWRDC Nalgonda", logo: "/images/partners/tswrdc.jpg", link: "/k12-programs" },
                  { name: "Pragati Mahavidyalaya Junior College, Hyderabad", logo: "/images/partners/pragati-maha.jpg", link: "/college-programs" },
                  { name: "Janani Public School, Bengaluru", logo: "/images/partners/Janani%20Public.jpg", link: "/k12-programs" },
                  { name: "ELGI Matriculation Higher Secondary School, Coimbatore", logo: "/images/partners/elgi-school.png", link: "/k12-programs" },
                  { name: "St. Joseph's Degree & PG College, Hyderabad", logo: "/images/partners/st-josephs.jpg", link: "/college-programs" },
                   { name: "Howard Park International School", logo: "/images/partners/howard-park.jpg", link: "/programs/ai-robotics-k12" },
                  { name: "Geetam School", logo: "/images/partners/geetam.jpg", link: "/k12-programs" },

                  { name: "HPS Nizamabad", logo: "/images/partners/hps-nizamabad.jpg", link: "/k12-programs" },
                  { name: "IIMC Hyderabad", logo: "/images/partners/iimc-hyderabad.jpg", link: "/college-programs" },
                  { name: "St. Pious X Degree & PG College for Women", logo: "/images/partners/st-pious.jpg", link: "/k12-programs" },
                  { name: "Edify School Tirupati", logo: "/images/partners/edify-school.png", link: "/k12-programs" },
                  { name: "Shree Daksha Academy, Bengaluru", logo: "/images/partners/shree-daksha.png", link: "/k12-programs" },
                  { name: "Iqra International School", logo: "/images/partners/Iqra%20International.jpg", link: "/k12-programs" },
                  { name: "Sri Aurobindo International School (SAIS), Hyderabad", logo: "/images/partners/sri aurobindo.webp", link: "/k12-programs" },
                ];
                // Duplicate for seamless infinite scroll
                return [...partners, ...partners].map((partner, i) => {
                  const instIdx = institutions.findIndex(inst => inst.name === partner.name);
                  return (
                    <div
                      key={i}
                      onClick={() => { if (instIdx >= 0) setSelectedInstitution(instIdx); }}
                      onMouseEnter={() => { if (instIdx >= 0) setSelectedInstitution(instIdx); }}
                      className="flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-lg border-2 border-blue-100 hover:-translate-y-1 transition-all cursor-pointer"
                      style={{ width: "160px", height: "160px", padding: "20px" }}
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="object-contain"
                          style={{ maxWidth: "140px", maxHeight: "140px", width: "auto", height: "auto" }}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange items-center justify-center text-white font-bold text-lg text-center leading-tight"
                          style={{ display: "none" }}
                        >
                          {partner.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
                        </div>
                      </div>
                    </div>
                  );
                })
              })()}
            </motion.div>
          </div>
        </div>

        <style>{`
          .partners-scroll {
            animation: scroll-partners 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .partners-scroll:hover {
            animation-play-state: paused;
          }
          @keyframes scroll-partners {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Skill Training */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center"
          >
            Skill Training Programs
          </motion.h2>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => setSkillTab("k12")}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 ${skillTab === "k12" ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105" : "bg-white text-muted-foreground border hover:bg-muted"}`}
            >
              <GraduationCap className="w-4 h-4" />
              School Students
            </button>
            <button
              onClick={() => setSkillTab("college")}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 ${skillTab === "college" ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105" : "bg-white text-muted-foreground border hover:bg-muted"}`}
            >
              <GraduationCap className="w-4 h-4" />
              College Students
            </button>
            <button
              onClick={() => setSkillTab("corporate")}
              className={`px-6 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 ${skillTab === "corporate" ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105" : "bg-white text-muted-foreground border hover:bg-muted"}`}
            >
              <Briefcase className="w-4 h-4" />
              Corporate Professionals
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {(skillTab === "k12" ? [
              {
                title: "AI Foundations for School Students",
                subtitle: "Introduction to AI for Young Learners",
                highlights: "Understand how AI works | Impacts everyday life and future careers | Builds logical thinking and creativity | No coding required | Age‑appropriate learning",
                image: "/images/programs/ai-school.png",
                link: "/programs/ai-foundations-k12"
              },
              {
                title: "Generative AI & Prompt Engineering for Students",
                subtitle: "Use AI Tools for Learning & Creativity",
                highlights: "Master ChatGPT, Gemini & Claude | Faster learning and research | Better project work | Academic prompt library | Responsible AI practices",
                image: "/images/programs/ai-school.png",
                link: "/programs/generative-ai-k12"
              },
              {
                title: "AI + Robotics Explorer Program",
                subtitle: "STEM Learning with AI & Robotics",
                highlights: "Hands‑on robotics projects | Sensors and automation | Project‑based learning | Robotics kits provided | Capstone project | Exhibition support",
                image: "/images/programs/robotics.png",
                link: "/programs/ai-robotics-k12"
              }
            ] : skillTab === "college" ? [
              {
                title: "AI Career Accelerator Program",
                subtitle: "Employability & Career Readiness",
                highlights: "AI‑ready workforce skills | Productivity with AI | Research & analysis tools | Resume building with AI | Placement readiness | Industry mentors",
                image: "/images/programs/ai-college.png",
                link: "/programs/ai-career-accelerator"
              },
              {
                title: "AI & Data Analytics Professional Program",
                subtitle: "AI‑Powered Analytics & Business Intelligence",
                highlights: "Data analytics fundamentals | Excel & Power BI | AI for data analysis | Predictive analytics | Real datasets | Industry capstone project",
                image: "/images/programs/power-bi.png",
                link: "/programs/ai-data-analytics"
              },
              {
                title: "AI for Business, Finance & Management",
                subtitle: "AI Transforming Business Functions",
                highlights: "AI in business, finance & marketing | AI in HR & operations | Finance & management focus | Case‑study methodology | Industry expert sessions | MBA/BBA/Commerce relevant",
                image: "/images/programs/ai-college.png",
                link: "/programs/ai-business-management"
              }
            ] : [
              {
                title: "Generative AI for Workplace Productivity",
                subtitle: "Automate Work & Boost Productivity",
                highlights: "Automate routine work | Improve communication | Faster report generation | Function‑specific examples | Immediate workplace impact | Customizable workshops",
                image: "/images/programs/ai-college.png",
                link: "/programs/generative-ai-workplace"
              },
              {
                title: "AI for Finance & Accounting Professionals",
                subtitle: "AI in Analysis, Reporting & Compliance",
                highlights: "Faster financial reporting | Better forecasting | Audit & compliance | Cost management | CMA/CA‑oriented examples | Real financial datasets",
                image: "/images/programs/sap-fico.png",
                link: "/programs/ai-finance-accounting"
              },
              {
                title: "AI Leadership & Digital Transformation Program",
                subtitle: "Strategic AI Adoption for Leaders",
                highlights: "AI strategy development | Digital transformation | Governance & risk management | Change management | AI roadmap workshop | Executive learning",
                image: "/images/programs/ai-college.png",
                link: "/programs/ai-leadership"
              }
            ]).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl border-2 border-slate-100/80 bg-background shadow-md hover:border-brand-blue/40 hover:shadow-[0_30px_60px_rgba(8,112,184,0.15)] transition-all duration-500 hover:-translate-y-3 group flex flex-col justify-between h-full"
              >
                <div className="flex flex-col">
                  {/* Hover Image Reveal */}
                  <div className="relative overflow-hidden rounded-2xl h-0 opacity-0 group-hover:h-48 group-hover:opacity-100 group-hover:mb-6 transition-all duration-500 ease-in-out">
                    <div className="relative w-full h-48">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-1 text-brand-blue group-hover:text-brand-orange transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-medium text-brand-orange mb-6 group-hover:text-brand-blue transition-colors duration-300">
                    {item.subtitle}
                  </p>
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <ul className="text-muted-foreground text-sm leading-relaxed mb-8 list-none space-y-1">
                    {item.highlights.split(" | ").map((h, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-brand-blue">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-auto">
                  <Link href={item.link} className="flex-1">
                    <button className="w-full py-3 border-2 border-brand-blue/20 text-brand-blue font-bold rounded-xl hover:bg-brand-blue hover:text-white transition-all duration-300">
                      Know more
                    </button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full py-3 bg-brand-blue text-white hover:bg-brand-orange border-2 border-transparent font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-brand-orange/30">
                      Contact us
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad Collaboration */}
      <section className="py-24 px-4 bg-gradient-to-tl from-brand-blue via-brand-blue to-[#112D55] text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -ml-64 -mb-64 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Study Abroad Support
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl leading-relaxed text-white/90"
          >
            MentorMe announces a strategic collaboration with <strong>United Educational Services</strong>, an AIRC, British Council, and British High Commission certified agency. We provide students with a seamless journey to top international destinations, including the US, UK, Australia, Canada, Ireland, and New Zealand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/study-abroad">
              <button className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg font-bold px-10 py-4 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95">
                Learn more
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-background border-b">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Why Choose MentorMe?</h2>
          <p className="text-lg text-muted-foreground">We are proud to present the success of our Programs</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "States", value: "20+" },
              { label: "Clients", value: "150+" },
              { label: "Students", value: "50k+" },
              { label: "Hours", value: "10k+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                className="space-y-2"
              >
                <Counter value={stat.value} />
                <div className="text-lg font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Connect with us</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create a win-win opportunity: gain practical AI expertise and unlock new income streams with our innovative Train-the-Trainer program!
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-background/50 rounded-2xl border border-slate-100/80 flex items-center gap-4 shadow-sm">
                  <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Call us</div>
                    <div className="text-sm font-semibold text-foreground">+91-9392707596</div>
                    <div className="text-sm font-semibold text-foreground">+91-8188824440</div>
                  </div>
                </div>

                <div className="p-4 bg-background/50 rounded-2xl border border-slate-100/80 flex items-center gap-4 shadow-sm">
                  <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mail us</div>
                    <div className="text-sm font-semibold text-foreground break-all">admin@mentormeright.in</div>
                  </div>
                </div>

                <div className="p-4 bg-background/50 rounded-2xl border border-slate-100/80 flex items-center gap-4 shadow-sm sm:col-span-2">
                  <div className="p-3 bg-green-500/10 text-green-600 rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</div>
                    <div className="text-sm font-semibold text-foreground">Hyderabad, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Card filling space */}
            <div className="bg-background/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-lg relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full -z-10"></div>
              <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Submit Application", desc: "Fill out the form with your program of interest and contact details." },
                  { step: "2", title: "Expert Callback", desc: "Our executive partner/counselor will connect with you within 24 hours." },
                  { step: "3", title: "Tailored Access", desc: "Receive customized curriculum details, fee structure, and batch schedule." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-sm shadow-inner">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background p-8 rounded-3xl shadow-lg border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-10"></div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Application Received!</h3>
                  <p className="text-muted-foreground">Our Executive Partnership Team will review your profile and contact you within 24 hours.</p>
                </div>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl">Submit another inquiry</Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6">Apply For</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input required type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input required type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email ID</label>
                      <input required type="email" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input required type="tel" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                  </div>

                  {/* I am a - User Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">I am a <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "school", label: "🏫 School Student" },
                        { value: "college", label: "🎓 College Student" },
                        { value: "professional", label: "💼 Working Professional" },
                      ].map((opt) => (
                        <label key={opt.value} className="relative cursor-pointer">
                          <input required type="radio" name="userType" value={opt.value} className="peer sr-only" />
                          <div className="w-full text-center p-3 rounded-xl border-2 border-slate-200 bg-background text-sm font-medium text-muted-foreground transition-all peer-checked:border-brand-blue peer-checked:bg-brand-blue/5 peer-checked:text-brand-blue hover:border-brand-blue/40">
                            {opt.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Interested Course or Department */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interested Course / Department <span className="text-red-500">*</span></label>
                    <select required className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none text-sm">
                      <option value="">Select your interest...</option>
                      <optgroup label="AI Learning Hub">
                        <option value="ai-school">Future AI Leaders Program</option>
                        <option value="robotics">Robotics &amp; STEM Learning</option>
                        <option value="vedic-maths">Smart Maths with Vedic Techniques</option>
                        <option value="career-counseling-school">Career Counseling (School)</option>
                      </optgroup>
                      <optgroup label="21st Century Skills Hub">
                        <option value="ai-college">Advanced AI &amp; Machine Learning</option>
                        <option value="fullstack">Full Stack Web Development</option>
                        <option value="data-science">Data Science &amp; Analytics</option>
                        <option value="crt">Campus Recruitment Training (CRT)</option>
                        <option value="career-counseling-college">Career Counseling (College)</option>
                      </optgroup>
                      <optgroup label="Professional">
                        <option value="career-pivot">Career Change / Pivot</option>
                        <option value="leadership">Leadership Coaching</option>
                        <option value="study-abroad">Study Abroad Guidance</option>
                        <option value="other">Other</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea required rows={4} className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none"></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 py-6 text-lg font-bold rounded-xl mt-4">
                    Submit Application
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {selectedInstitution !== null && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedInstitution(null)}
          />
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                      <img
                        src={institutions[selectedInstitution].logo}
                        alt={institutions[selectedInstitution].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{institutions[selectedInstitution].name}</h3>
                      {institutions[selectedInstitution].website && (
                        <a
                          href={institutions[selectedInstitution].website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue font-semibold hover:underline text-sm mt-1 inline-block"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInstitution(null)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {institutions[selectedInstitution].description}
                </p>
                {(institutions[selectedInstitution] as any).program && (
                  <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{(institutions[selectedInstitution] as any).tagline}</h4>
                    <h4 className="text-xl font-bold text-brand-blue mb-3">{(institutions[selectedInstitution] as any).program}</h4>
                    {(institutions[selectedInstitution] as any).programOverview && (institutions[selectedInstitution] as any).programOverview.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Program Overview</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {(institutions[selectedInstitution] as any).programOverview.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="text-brand-orange mt-0.5">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {(institutions[selectedInstitution] as any).keyAreas && (institutions[selectedInstitution] as any).keyAreas.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Key Areas Covered</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {(institutions[selectedInstitution] as any).keyAreas.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                          <span className="text-blue-500 mt-0.5 shrink-0">◆</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(institutions[selectedInstitution] as any).outcomes && (institutions[selectedInstitution] as any).outcomes.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Outcomes</p>
                    <div className="grid gap-2">
                      {(institutions[selectedInstitution] as any).outcomes.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                          <span className="text-green-600 mt-0.5 shrink-0">✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(institutions[selectedInstitution] as any).partnershipHighlights && (
                  <div className="mt-5 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Partnership Highlights</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{(institutions[selectedInstitution] as any).partnershipHighlights}</p>
                  </div>
                )}
                {(institutions[selectedInstitution] as any).images && (institutions[selectedInstitution] as any).images.length > 0 && (
                  <div className="mt-5 space-y-3">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Program Gallery</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(institutions[selectedInstitution] as any).images.map((src: string, i: number) => {
                        // Read per-photo crop position from institution data or default to center
                        const cropPos = (institutions[selectedInstitution] as any).imageCrops?.[i] || "center";
                        return (
                          <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                            <img
                              src={src}
                              alt={`${institutions[selectedInstitution].name} - Photo ${i + 1}`}
                              className="w-full h-60 object-cover"
                              style={{ objectPosition: cropPos }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {institutions[selectedInstitution].contact && institutions[selectedInstitution].contact.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {institutions[selectedInstitution].contact.map((c: { label: string; value: string; href?: string }, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Globe2 className="text-brand-orange shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.label}</p>
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-blue hover:underline">{c.value}</a>
                          ) : (
                            <p className="text-sm font-medium text-slate-900">{c.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                 )}
                 <div className="mt-8 flex justify-center">
                   <button
                     onClick={() => setSelectedInstitution(null)}
                     className="flex items-center gap-2 px-8 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl transition-all shadow-md"
                   >
                     Close
                   </button>
                 </div>
               </div>
             </div>

           </div>
        </div>
      )}

    </div>
  );
}
