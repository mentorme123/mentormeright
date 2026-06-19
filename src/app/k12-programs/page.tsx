"use client";

import Link from "next/link";
import { Star, Rocket, Brain, Target, Award } from "lucide-react";

const programs = [
  {
    slug: "ai-foundations-k12",
    title: "AI Foundations for School Students",
    subtitle: "A Beginner-Friendly Introduction to Artificial Intelligence",
    description: "A beginner-friendly introduction to Artificial Intelligence that helps students understand how AI works and how it impacts everyday life, future careers, and society.",
    benefits: [
      "Builds awareness of emerging technologies",
      "Develops logical thinking",
      "Encourages innovation and creativity",
      "Improves problem-solving skills",
    ],
    usp: [
      "Age-appropriate learning",
      "Interactive activities and games",
      "No coding required",
      "Industry-designed curriculum",
    ],
    modules: [
      "Introduction to AI",
      "AI Around Us",
      "Machine Learning Basics",
      "Generative AI Tools",
      "AI Ethics",
      "AI Mini Projects",
    ],
    gradient: "from-pink-500 to-purple-500",
    accentColor: "text-brand-orange",
    bgColor: "bg-brand-orange",
  },
  {
    slug: "generative-ai-k12",
    title: "Generative AI & Prompt Engineering for Students",
    subtitle: "Learn how to use ChatGPT, Gemini, Claude, and Other AI Tools",
    description: "Learn how to effectively use ChatGPT, Gemini, Claude, and other AI tools for learning, creativity, research, and productivity.",
    benefits: [
      "Faster learning",
      "Better project work",
      "Improved communication skills",
      "Enhanced creativity",
    ],
    usp: [
      "Ready-to-use prompt library",
      "Academic applications",
      "Hands-on exercises",
      "Responsible AI practices",
    ],
    modules: [
      "Understanding Generative AI",
      "Prompt Engineering Fundamentals",
      "AI for Research",
      "AI for Presentations",
      "AI for Content Creation",
      "AI Safety",
    ],
    gradient: "from-brand-blue to-cyan-500",
    accentColor: "text-brand-blue",
    bgColor: "bg-brand-blue",
  },
  {
    slug: "ai-robotics-k12",
    title: "AI + Robotics Explorer Program",
    subtitle: "A Future-Focused Program Combining AI, Robotics, Sensors, and Automation",
    description: "A future-focused program combining Artificial Intelligence, Robotics, Sensors, and Automation to help students become creators rather than consumers of technology.",
    benefits: [
      "Hands-on STEM learning",
      "Improves innovation mindset",
      "Builds engineering thinking",
      "Encourages teamwork",
    ],
    usp: [
      "Project-based learning",
      "Robotics kits provided",
      "AI-powered robotics projects",
      "School exhibition support",
    ],
    modules: [
      "Robotics Fundamentals",
      "Sensors & Actuators",
      "Introduction to Coding",
      "AI in Robotics",
      "Automation Concepts",
      "Capstone Project",
    ],
    gradient: "from-purple-600 to-pink-500",
    accentColor: "text-purple-600",
    bgColor: "bg-purple-600",
  },
];

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
  "School exhibition support": <Rocket className="w-5 h-5" />,
};

export default function K12ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center">Skill Training Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.slug}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-1 text-slate-900">{program.title}</h3>
              <p className="font-medium text-orange-500 mb-4">{program.subtitle}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{program.description}</p>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                <Star className={`w-4 h-4 ${program.accentColor}`} /> Key Benefits
              </h4>
              <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-1">
                {program.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span><span>{b}</span>
                  </li>
                ))}
              </ul>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                <Award className={`w-4 h-4 ${program.accentColor}`} /> MentorMe USP
              </h4>
              <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-2">
                {program.usp.map((u, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${program.gradient} text-white flex items-center justify-center shrink-0 mt-0.5`}>
                      {uspIcons[u] || <Award className="w-3 h-3" />}
                    </span><span>{u}</span>
                  </li>
                ))}
              </ul>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                <Rocket className={`w-4 h-4 ${program.accentColor}`} /> Modules
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {program.modules.map((mod, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                    <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${program.gradient} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                      {idx + 1}
                    </span>{mod}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                <Link href={`/programs/${program.slug}`} className="flex-1">
                  <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Know more</button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Contact us</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
