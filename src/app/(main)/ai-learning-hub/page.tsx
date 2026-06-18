"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { programsData } from "@/lib/program-data";
import { CheckCircle2, Star, Award, Target, Rocket, Users, Brain } from "lucide-react";

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
  "Expert instructors": <Users className="w-5 h-5" />,
  "No lab investment": <Target className="w-5 h-5" />,
  "Hands-on STEM integration": <Rocket className="w-5 h-5" />,
  "Curriculum aligned": <Award className="w-5 h-5" />,
  "Fast-track mental math": <Rocket className="w-5 h-5" />,
  "Expert-led sessions": <Users className="w-5 h-5" />,
  "Competitive edge": <Target className="w-5 h-5" />,
  "Fun and engaging": <Star className="w-5 h-5" />,
};

export default function AILearningHubPage() {
  const programs = Object.values(programsData).filter((p) => p.category === "AI Learning Hub");

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">AI Learning Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive AI and technology programs designed for school students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.slug}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-pink-200 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-2 text-slate-900">{program.title}</h3>
              <p className="text-brand-orange font-semibold text-sm mb-4">{program.subtitle}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{program.description}</p>

              {(program.howWeOffer.length > 0 || program.keyHighlights.length > 0) && (
                <div className="space-y-3 mb-6">
                  {program.howWeOffer.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-700 uppercase">How We Offer</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {program.howWeOffer.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-blue">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {program.keyHighlights.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-700 uppercase">Key Highlights</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {program.keyHighlights.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-blue">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <Link href={`/programs/${program.slug}`} className="mt-auto">
                <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  Know more
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
