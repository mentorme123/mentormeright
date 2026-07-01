"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Globe2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const skillPrograms = {
  k12: [
    {
      slug: "critical-thinking-k12",
      title: "Critical Thinking & Problem Solving",
      tagline: "Think Better. Solve Faster. Lead Smarter.",
      shortDesc: "The Critical Thinking & Problem Solving Course helps students develop strong structured thinking, logical reasoning, analytical skills, and problem-solving abilities through engaging case studies, puzzles, real-world challenges, and interactive activities. This program is designed to build 21st-century thinking skills that improve academic performance and prepare students for future careers.",
      benefits: [
        "Improves analytical thinking skills",
        "Enhances academic performance and learning ability",
        "Builds strong decision-making skills",
        "Encourages independent and logical thinking",
        "Strengthens problem-solving confidence",
        "Develops real-world reasoning ability"
      ],
      modules: ["Understanding Problems", "Root Cause Analysis", "Logical Reasoning", "Creative Problem Solving", "Decision-Making Frameworks", "Real-Life Simulations"],
      keywords: ["Critical Thinking Course for Students", "Problem Solving Skills Training", "Future Skills for School Students"]
    },
    {
      slug: "public-speaking-k12",
      title: "Public Speaking",
      tagline: "Speak with Confidence. Influence with Impact.",
      shortDesc: "A practical program that helps students overcome stage fear, improve communication skills, and become confident speakers.",
      benefits: ["Builds confidence", "Improves communication", "Develops leadership qualities", "Enhances presentation skills"],
      modules: ["Fundamentals of Public Speaking", "Voice and Body Language", "Storytelling Techniques", "Presentation Skills", "Debate and Persuasion", "Stage Performance"],
      keywords: ["Public Speaking for Students", "Communication Skills Training", "Leadership Skills for School Students"]
    },
    {
      slug: "robotics-fundamentals-k12",
      title: "Robotics Fundamentals",
      tagline: "Learn by Building. Innovate through Robotics.",
      shortDesc: "An engaging robotics program where students learn robotics concepts, sensors, motors, automation, and problem-solving through hands-on projects.",
      benefits: ["Develops STEM skills", "Encourages innovation", "Improves technical aptitude", "Enhances teamwork"],
      modules: ["Introduction to Robotics", "Components of Robots", "Sensors and Motors", "Programming Basics", "Robot Design", "Robotics Project"],
      keywords: ["Robotics Training for Schools", "STEM Education India", "Robotics Course for Students"]
    }
  ],
  college: [
    {
      slug: "data-analytics-college",
      title: "Data Analytics",
      tagline: "Transform Data into Decisions.",
      shortDesc: "Learn data analysis, visualization, reporting, and business insights using industry tools and real-world datasets.",
      benefits: ["High-demand career skill", "Better employability", "Data-driven thinking", "Industry relevance"],
      modules: ["Data Analytics Fundamentals", "Data Cleaning", "Data Visualization", "Business Reporting", "Dashboard Development", "Analytics Projects"],
      keywords: ["Data Analytics Course Hyderabad", "Business Analytics Training", "Data Analytics Certification"]
    },
    {
      slug: "digital-marketing-college",
      title: "Digital Marketing",
      tagline: "Master the Skills Behind Modern Business Growth.",
      shortDesc: "A practical digital marketing course covering SEO, social media marketing, content marketing, paid advertising, and analytics.",
      benefits: ["High-demand skill", "Freelancing opportunities", "Entrepreneurial applications", "Career readiness"],
      modules: ["Digital Marketing Overview", "Search Engine Optimization", "Social Media Marketing", "Content Marketing", "Google Ads", "Analytics and Reporting"],
      keywords: ["Digital Marketing Course India", "SEO Training", "Social Media Marketing Course"]
    },
    {
      slug: "financial-modelling-college",
      title: "Financial Modelling",
      tagline: "Build Business Decisions on Strong Financial Insights.",
      shortDesc: "Students learn to create financial models for valuation, budgeting, forecasting, and investment analysis using Excel.",
      benefits: ["Investment analysis skills", "Better finance careers", "Advanced Excel expertise", "Corporate readiness"],
      modules: ["Excel Fundamentals", "Financial Statements", "Forecasting Models", "Valuation Techniques", "Sensitivity Analysis", "Investment Cases"],
      keywords: ["Financial Modelling Course India", "Investment Analysis Training", "Finance Skills Program"]
    }
  ],
  corporate: [
    {
      slug: "leadership-development-corporate",
      title: "Leadership Development",
      tagline: "Develop Leaders Who Deliver Results.",
      shortDesc: "A practical leadership program focused on developing strategic thinking, team leadership, communication, and decision-making capabilities.",
      benefits: ["Stronger leadership capabilities", "Improved team performance", "Better decision-making", "Increased employee engagement"],
      modules: ["Leadership Fundamentals", "Emotional Intelligence", "Strategic Thinking", "Team Leadership", "Conflict Management", "Leading Change"],
      keywords: ["Leadership Training India", "Management Development Program", "Leadership Skills Workshop"]
    },
    {
      slug: "project-management-corporate",
      title: "Project Management",
      tagline: "Plan Better. Execute Faster. Deliver Results.",
      shortDesc: "Learn project planning, scheduling, risk management, stakeholder management, and execution frameworks.",
      benefits: ["Improved project success rates", "Better resource management", "Enhanced planning skills", "Reduced project risks"],
      modules: ["Project Fundamentals", "Planning and Scheduling", "Risk Management", "Stakeholder Management", "Project Monitoring", "Project Closure"],
      keywords: ["Project Management Training India", "PMP Foundation Program", "Project Leadership Skills"]
    },
    {
      slug: "financial-analysis-corporate",
      title: "Financial Analysis",
      tagline: "Convert Financial Data into Business Intelligence.",
      shortDesc: "Designed for managers and finance professionals to interpret financial statements and make informed financial decisions.",
      benefits: ["Better business decisions", "Improved financial understanding", "Strong analytical skills", "Enhanced profitability focus"],
      modules: ["Financial Statements Analysis", "Ratio Analysis", "Cash Flow Analysis", "Budgeting", "Cost Control", "Business Performance Review"],
      keywords: ["Financial Analysis Training", "Finance for Non-Finance Managers", "Business Finance Course"]
    }
  ]
};

export default function BlogsPage() {
  const [guidanceTab, setGuidanceTab] = useState("institutions");

  const guidancePrograms = {
    institutions: [
      { title: "6th-7th Class Students", desc: "Discover strengths early! MentorMe guides young minds toward the right academic & career path." },
      { title: "8th-10th Class Students", desc: "Critical phase? We help pick subjects & careers with science-backed assessments & expert advice." },
      { title: "11th-12th Class Students", desc: "Decide your future confidently — exams, colleges, careers. MentorMe's guidance ensures no regrets." },
      { title: "College Students", desc: "Have you lost in career options? AI + mentors help you strategize, skill up, and land dream roles." },
    ],
    professionals: [
      { title: "Career Transition", desc: "Looking to switch fields? We analyze your transferable skills and guide your successful transition." },
      { title: "Upskilling Roadmap", desc: "Identify the exact skills and certifications needed to secure that promotion or pay raise." },
      { title: "Resume & Interview Prep", desc: "Expert optimization of your professional profile and mock interviews with industry leaders." },
      { title: "Executive Coaching", desc: "1-on-1 mentorship for mid-to-senior professionals aiming for leadership positions." },
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header */}
      <section className="bg-brand-blue/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            <span>|</span>
            <span>Services</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Our Services
          </motion.h1>

          {/* 3 Core Service Icons */}
          <div className="flex flex-wrap justify-center items-center gap-16 border-b pb-12">
            {[
              { title: "Career Guidance", icon: <Users size={32} className="text-white" />, id: "guidance" },
              { title: "Skill Training", icon: <BookOpen size={32} className="text-white" />, id: "skills" },
              { title: "Study Abroad", icon: <Globe2 size={32} className="text-white" />, id: "abroad" }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 cursor-pointer group"
                onClick={() => {
                  const el = document.getElementById(service.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:bg-blue-700 transition-all">
                  {service.icon}
                </div>
                <span className="font-semibold text-lg">{service.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Career Guidance Section */}
      <section id="guidance" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="border border-blue-200 rounded-3xl p-8 lg:p-12 shadow-sm">
            <h2 className="text-4xl font-bold mb-4">Career Guidance</h2>
            <p className="text-slate-500 text-lg mb-10">Scientifically validated psychometric assessments for every stage of life.</p>

            <div className="relative overflow-hidden mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="flex gap-6 guidance-scroll">
                {[
                  { img: "/images/professional.png", title: "One to one career Guidance for college students", audience: "UG" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 11th-12th grade students", audience: "GR" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 8th-10th grade students", audience: "ST" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 6th-7th grade students", audience: "ST" },
                  { img: "/images/professional.png", title: "One to one career Guidance for college students", audience: "UG" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 11th-12th grade students", audience: "GR" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 8th-10th grade students", audience: "ST" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 6th-7th grade students", audience: "ST" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                    style={{ width: "260px" }}
                  >
                    <div className="h-44 relative bg-slate-200">
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col space-y-4">
                      <h3 className="font-bold text-sm flex-1 leading-snug">{item.title}</h3>
                      <div className="flex flex-col gap-2 mt-auto">
                        <Link href={`/assessment?audience=${item.audience}`}>
                          <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 text-sm">Know More</Button>
                        </Link>
                        <Link href="/contact">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">Contact Us</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              .guidance-scroll {
                animation: scroll-guidance 18s linear infinite;
                width: max-content;
              }
              .guidance-scroll:hover {
                animation-play-state: paused;
              }
              @keyframes scroll-guidance {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>

            <div className="flex gap-4 mb-12">
              <button
                onClick={() => setGuidanceTab("institutions")}
                className={`px-8 py-3 rounded-full border transition-all ${guidanceTab === "institutions" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                For Institutions
              </button>
              <button
                onClick={() => setGuidanceTab("professionals")}
                className={`px-8 py-3 rounded-full border transition-all ${guidanceTab === "professionals" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                For Working Professionals
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {guidancePrograms[guidanceTab as keyof typeof guidancePrograms].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border flex flex-col h-full hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>
                  <Link href="/contact" className="mt-auto">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">View Program Details</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Training Section - Grid Layout */}
      <section id="skills" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-8"
          >
            Skill Training
          </motion.h2>

          <div className="text-lg font-mono text-slate-700 mb-10">
            └── <span className="font-bold">21st Century Skills Hub</span>
          </div>

          {/* K-12 Students */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-700 border-b pb-3">K-12 Students</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skillPrograms.k12.map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 border hover:shadow-lg transition-all flex flex-col"
                >
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h4>
                  <p className="text-brand-orange font-semibold text-sm mb-3">{program.tagline}</p>
                  <p className="text-slate-600 text-sm mb-4 flex-1">{program.shortDesc}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase">Key Benefits:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {program.benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-1">
                          <span className="text-brand-blue">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700 uppercase">Course Modules:</p>
                    <ul className="text-xs text-slate-500 space-y-0.5">
                      {program.modules.map((m, j) => (
                        <li key={j}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/programs/${program.slug}`} className="mt-auto pt-4">
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm">Learn More</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* College Students */}
          <div className="space-y-6 mt-12">
            <h3 className="text-2xl font-bold text-green-700 border-b pb-3">College Students</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skillPrograms.college.map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 border hover:shadow-lg transition-all flex flex-col"
                >
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h4>
                  <p className="text-brand-orange font-semibold text-sm mb-3">{program.tagline}</p>
                  <p className="text-slate-600 text-sm mb-4 flex-1">{program.shortDesc}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase">Key Benefits:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {program.benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-1">
                          <span className="text-brand-blue">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700 uppercase">Course Modules:</p>
                    <ul className="text-xs text-slate-500 space-y-0.5">
                      {program.modules.map((m, j) => (
                        <li key={j}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/programs/${program.slug}`} className="mt-auto pt-4">
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm">Learn More</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Corporate Professionals */}
          <div className="space-y-6 mt-12">
            <h3 className="text-2xl font-bold text-orange-700 border-b pb-3">Corporate Professionals</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skillPrograms.corporate.map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 border hover:shadow-lg transition-all flex flex-col"
                >
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h4>
                  <p className="text-brand-orange font-semibold text-sm mb-3">{program.tagline}</p>
                  <p className="text-slate-600 text-sm mb-4 flex-1">{program.shortDesc}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase">Key Benefits:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {program.benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-1">
                          <span className="text-brand-blue">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700 uppercase">Course Modules:</p>
                    <ul className="text-xs text-slate-500 space-y-0.5">
                      {program.modules.map((m, j) => (
                        <li key={j}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/programs/${program.slug}`} className="mt-auto pt-4">
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm">Learn More</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Study Abroad Section */}
      <section id="abroad" className="py-24 px-4 bg-gradient-to-br from-brand-blue to-[#112D55] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <Globe2 size={64} className="mx-auto text-brand-orange" />
          <h2 className="text-4xl font-bold">Study Abroad Support</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Ready to take your education global? Partnering with certified agencies, we guide you to top universities worldwide.
          </p>
          <Link href="/study-abroad">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-6 text-lg rounded-xl shadow-xl">
              Explore Destinations
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
