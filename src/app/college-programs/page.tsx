"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ChevronRight, ArrowRight, Star, Zap, Target, Award, Users, Brain, Rocket } from "lucide-react";

const programs: Record<string, { slug: string; title: string; subtitle: string; highlights: string[] }[]> = {
  k12: [
    {
      slug: "ai-foundations-k12",
      title: "AI Foundations for School Students",
      subtitle: "A Beginner-Friendly Introduction to Artificial Intelligence",
      highlights: [
        "Introduction to AI",
        "AI Around Us",
        "Machine Learning Basics",
        "Generative AI Tools",
        "AI Ethics",
        "AI Mini Projects",
      ],
    },
    {
      slug: "generative-ai-k12",
      title: "Generative AI & Prompt Engineering for Students",
      subtitle: "Learn how to use ChatGPT, Gemini, Claude, and Other AI Tools",
      highlights: [
        "Understanding Generative AI",
        "Prompt Engineering Fundamentals",
        "AI for Research",
        "AI for Presentations",
        "AI for Content Creation",
        "AI Safety",
      ],
    },
    {
      slug: "ai-robotics-k12",
      title: "AI + Robotics Explorer Program",
      subtitle: "A Future-Focused Program Combining AI, Robotics, Sensors, and Automation",
      highlights: [
        "Robotics Fundamentals",
        "Sensors & Actuators",
        "Introduction to Coding",
        "AI in Robotics",
        "Automation Concepts",
        "Capstone Project",
      ],
    },
  ],
  college: [
    {
      slug: "ai-career-accelerator",
      title: "AI Career Accelerator Program",
      subtitle: "An Employability-Focused Program for Career Readiness in the AI Era",
      highlights: [
        "AI Fundamentals for all domains",
        "Productivity with AI tools",
        "Research & Analysis with AI assistance",
        "Placement Readiness training",
      ],
    },
    {
      slug: "ai-data-analytics",
      title: "AI & Data Analytics Professional Program",
      subtitle: "A Practical Program Covering AI-Powered Analytics and Business Intelligence",
      highlights: [
        "Data Analytics Fundamentals",
        "AI for Data Analysis",
        "Excel & Power BI mastery",
        "Industry Project with real business impact",
      ],
    },
    {
      slug: "ai-business-management",
      title: "AI for Business, Finance & Management",
      subtitle: "Designed for MBA, BBA, Commerce, Economics, and Management Students",
      highlights: [
        "AI in Business strategy and operations",
        "AI in Finance and accounting",
        "AI in Marketing and customer engagement",
        "AI Strategy Fundamentals for executives",
      ],
    },
  ],
};

const uspIcons: Record<string, React.ReactNode> = {
  "Age-appropriate learning": <Brain className="w-5 h-5" />,
  "Interactive activities and games": <Rocket className="w-5 h-5" />,
  "No coding required": <Target className="w-5 h-5" />,
  "Industry-designed curriculum": <Award className="w-5 h-5" />,
  "Ready-to-use prompt library": <Rocket className="w-5 h-5" />,
  "Academic applications": <Target className="w-5 h-5" />,
  "Hands-on exercises": <Rocket className="w-5 h-5" />,
  "Responsible AI practices": <Star className="w-5 h-5" />,
  "Project-based learning": <Rocket className="w-5 h-5" />,
  "Robotics kits provided": <Award className="w-5 h-5" />,
  "AI-powered robotics projects": <Brain className="w-5 h-5" />,
  "School exhibition support": <Users className="w-5 h-5" />,
  "Industry mentors": <Users className="w-5 h-5" />,
  "Employability focus": <Target className="w-5 h-5" />,
  "Real-world assignments": <Rocket className="w-5 h-5" />,
  "Interview preparation": <Award className="w-5 h-5" />,
  "Power BI integration": <Zap className="w-5 h-5" />,
  "Real datasets": <Target className="w-5 h-5" />,
  "Business case studies": <Star className="w-5 h-5" />,
  "Capstone projects": <Rocket className="w-5 h-5" />,
  "Business-focused curriculum": <Brain className="w-5 h-5" />,
  "Finance and marketing applications": <Zap className="w-5 h-5" />,
  "Case-study methodology": <Target className="w-5 h-5" />,
  "Industry expert sessions": <Users className="w-5 h-5" />,
  "Function-specific examples": <Target className="w-5 h-5" />,
  "Practical implementation": <Rocket className="w-5 h-5" />,
  "Immediate workplace impact": <Zap className="w-5 h-5" />,
  "Customizable workshops": <Award className="w-5 h-5" />,
  "CMA/CA-oriented examples": <Target className="w-5 h-5" />,
  "Real financial datasets": <Star className="w-5 h-5" />,
  "Industry use cases": <Rocket className="w-5 h-5" />,
  "Expert faculty": <Users className="w-5 h-5" />,
  "Leadership-focused framework": <Brain className="w-5 h-5" />,
  "Industry transformation case studies": <Star className="w-5 h-5" />,
  "AI roadmap development": <Rocket className="w-5 h-5" />,
  "Executive learning approach": <Users className="w-5 h-5" />,
};

export default function CollegeProgramsPage() {
  const [skillTab, setSkillTab] = useState<"k12" | "college">("college");

  const getGradient = (slug: string) => {
    if (slug.startsWith("ai-foundations") || slug.startsWith("ai-robotics")) return "from-pink-500 to-purple-500";
    if (slug.startsWith("generative-ai")) return "from-brand-blue to-cyan-500";
    return "from-brand-blue to-slate-800";
  };

  const getAccentColor = (slug: string) => {
    if (slug.startsWith("ai-foundations") || slug.startsWith("ai-robotics")) return "text-brand-orange";
    return "text-brand-blue";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center">Skill Training Programs</h2>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setSkillTab("k12")}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${
              skillTab === "k12"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            AI Learning Hub
          </button>
          <button
            onClick={() => setSkillTab("college")}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${
              skillTab === "college"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            21st Century Skills Hub
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillTab === "k12"
            ? programs.k12.map((program, i) => (
                <div
                  key={program.slug}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-1 text-slate-900">
                    {program.title}
                  </h3>
                  <p className="font-medium text-orange-500 mb-4">
                    {program.subtitle}
                  </p>
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800">
                    Curriculum Modules
                  </h4>
                  <ul className="text-slate-600 text-sm leading-relaxed mb-8 space-y-1">
                    {program.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <Link href={`/programs/${program.slug}`} className="flex-1">
                      <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                        Know more
                      </button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        Contact us
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            : programs.college.map((program, i) => {
                const gradient = getGradient(program.slug);
                const accentColor = getAccentColor(program.slug);
                return (
                  <div
                    key={program.slug}
                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold mb-1 text-slate-900">
                      {program.title}
                    </h3>
                    <p className="font-medium text-orange-500 mb-4">
                      {program.subtitle}
                    </p>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800">
                      Key Highlights
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-8 space-y-1">
                      {program.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-blue-600">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-4">
                      <Link href={`/programs/${program.slug}`} className="flex-1">
                        <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                          Know more
                        </button>
                      </Link>
                      <Link href="/contact" className="flex-1">
                        <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                          Contact us
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
