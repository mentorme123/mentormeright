"use client";

import Link from "next/link";
import { Star, Zap, Target, Award, Users, Brain, Rocket } from "lucide-react";

const programs = [
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
];

const gradientMap: Record<string, string> = {
  "ai-foundations": "from-pink-500 to-purple-500",
  "ai-robotics": "from-pink-500 to-purple-500",
  "generative-ai": "from-brand-blue to-cyan-500",
};

const accentMap: Record<string, string> = {
  "ai-foundations": "text-brand-orange",
  "ai-robotics": "text-brand-orange",
};

const uspIcons: Record<string, React.ReactNode> = {
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center">College Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => {
            const gradient = gradientMap[program.slug] || "from-brand-blue to-slate-800";
            const accentColor = accentMap[program.slug] || "text-brand-blue";
            return (
              <div
                key={program.slug}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <h3 className="text-2xl font-bold mb-1 text-slate-900">{program.title}</h3>
                <p className="font-medium text-orange-500 mb-4">{program.subtitle}</p>
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800">
                  Key Highlights
                </h4>
                <ul className="text-slate-600 text-sm leading-relaxed mb-8 space-y-1">
                  {program.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span><span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <Link href={`/programs/${program.slug}`} className="flex-1">
                    <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Know more</button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Contact us</button>
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
