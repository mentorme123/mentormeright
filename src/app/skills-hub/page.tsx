import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/lib/program-data";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Star, Award, Target, Rocket, Users } from "lucide-react";

const uspIcons: Record<string, React.ReactNode> = {
  "Age-appropriate learning": <Users className="w-5 h-5" />,
  "Interactive activities and games": <Rocket className="w-5 h-5" />,
  "No coding required": <Target className="w-5 h-5" />,
  "Industry-designed curriculum": <Award className="w-5 h-5" />,
  "Ready-to-use prompt library": <Rocket className="w-5 h-5" />,
  "Academic applications": <Target className="w-5 h-5" />,
  "Hands-on exercises": <Rocket className="w-5 h-5" />,
  "Responsible AI practices": <Star className="w-5 h-5" />,
  "Project-based learning": <Rocket className="w-5 h-5" />,
  "Robotics kits provided": <Award className="w-5 h-5" />,
  "AI-powered robotics projects": <Users className="w-5 h-5" />,
  "School exhibition support": <Users className="w-5 h-5" />,
  "Industry mentors": <Users className="w-5 h-5" />,
  "Employability focus": <Target className="w-5 h-5" />,
  "Real-world assignments": <Rocket className="w-5 h-5" />,
  "Interview preparation": <Award className="w-5 h-5" />,
  "Power BI integration": <Star className="w-5 h-5" />,
  "Real datasets": <Target className="w-5 h-5" />,
  "Business case studies": <Rocket className="w-5 h-5" />,
  "Capstone projects": <Award className="w-5 h-5" />,
  "Business-focused curriculum": <Users className="w-5 h-5" />,
  "Finance and marketing applications": <Rocket className="w-5 h-5" />,
  "Case-study methodology": <Target className="w-5 h-5" />,
  "Industry expert sessions": <Users className="w-5 h-5" />,
  "Function-specific examples": <Target className="w-5 h-5" />,
  "Practical implementation": <Rocket className="w-5 h-5" />,
  "Immediate workplace impact": <Rocket className="w-5 h-5" />,
  "Customizable workshops": <Users className="w-5 h-5" />,
  "CMA/CA-oriented examples": <Rocket className="w-5 h-5" />,
  "Real financial datasets": <Star className="w-5 h-5" />,
  "Industry use cases": <Rocket className="w-5 h-5" />,
  "Expert faculty": <Users className="w-5 h-5" />,
  "Leadership-focused framework": <Users className="w-5 h-5" />,
  "Industry transformation case studies": <Rocket className="w-5 h-5" />,
  "AI roadmap development": <Award className="w-5 h-5" />,
  "Executive learning approach": <Star className="w-5 h-5" />,
};

export const metadata = {
  title: "21st Century Skills Hub | MentorMe",
  description: "Explore our 21st Century Skills Hub programs for K-12, College, and Corporate learners.",
};

export default function SkillsHubPage() {
  const skillsPrograms = Object.values(programsData).filter(
    (p: any) => p.category === "21st Century Skills Hub"
  );

  const k12Programs = skillsPrograms.filter((p: any) =>
    ["critical-thinking-k12", "public-speaking-k12", "robotics-fundamentals-k12"].includes(p.slug)
  );

  const collegePrograms = skillsPrograms.filter((p: any) =>
    ["data-analytics-college", "digital-marketing-college", "financial-modelling-college"].includes(p.slug)
  );

  const entrepreneurshipPrograms = skillsPrograms.filter((p: any) =>
    ["entrepreneurship"].includes(p.slug)
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            21st Century Skills Hub
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Future-ready programs for students, graduates, and professionals.
          </p>
        </div>

        {/* K-12 Students Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-700 border-b pb-3 mb-8">1. K-12 Students</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {k12Programs.map((program: any) => {
              const slugToGradient = (slug: string) => {
                if (slug.startsWith("critical")) return "from-blue-500 to-cyan-500";
                if (slug.startsWith("public-speaking")) return "from-pink-500 to-rose-500";
                if (slug.startsWith("robotics")) return "from-purple-600 to-pink-500";
                return "from-brand-blue to-cyan-500";
              };
              const slugToAccent = (slug: string) => {
                if (slug.startsWith("critical")) return "text-blue-600";
                if (slug.startsWith("public-speaking")) return "text-rose-600";
                if (slug.startsWith("robotics")) return "text-purple-600";
                return "text-brand-blue";
              };
              const gradient = slugToGradient(program.slug);
              const accentColor = slugToAccent(program.slug);
              return (
                <div
                  key={program.slug}
                  className="bg-white rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">{program.title}</h3>
                    <p className={`font-medium mb-3 ${accentColor}`}>{program.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                      {program.description}
                    </p>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Star className={`w-4 h-4 ${accentColor}`} /> Key Benefits
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-1">
                      {program.benefits?.map((b: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Award className={`w-4 h-4 ${accentColor}`} /> MentorMe USP
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-2">
                      {(program.mentorMeAdvantage || program.usp || []).map((u: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 mt-0.5`}>
                            {uspIcons[u] || <Award className="w-3 h-3" />}
                          </span>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Rocket className={`w-4 h-4 ${accentColor}`} /> Modules
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {(program.modules || []).map((mod: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                            {idx + 1}
                          </span>
                          {mod}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <Link href={`/programs/${program.slug}`} className="flex-1">
                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm h-10 rounded-xl">Learn More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* College Students Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-700 border-b pb-3 mb-8">2. College Students</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {collegePrograms.map((program: any) => {
              const slugToGradient = (slug: string) => {
                if (slug.startsWith("data-analytics")) return "from-blue-500 to-cyan-500";
                if (slug.startsWith("digital-marketing")) return "from-pink-500 to-rose-500";
                if (slug.startsWith("financial-modelling")) return "from-emerald-500 to-teal-500";
                return "from-brand-blue to-cyan-500";
              };
              const slugToAccent = (slug: string) => {
                if (slug.startsWith("data-analytics")) return "text-blue-600";
                if (slug.startsWith("digital-marketing")) return "text-rose-600";
                if (slug.startsWith("financial-modelling")) return "text-emerald-600";
                return "text-brand-blue";
              };
              const gradient = slugToGradient(program.slug);
              const accentColor = slugToAccent(program.slug);
              return (
                <div
                  key={program.slug}
                  className="bg-white rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">{program.title}</h3>
                    <p className={`font-medium mb-3 ${accentColor}`}>{program.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                      {program.description}
                    </p>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Star className={`w-4 h-4 ${accentColor}`} /> Key Benefits
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-1">
                      {program.benefits?.map((b: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Award className={`w-4 h-4 ${accentColor}`} /> MentorMe USP
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-2">
                      {(program.mentorMeAdvantage || program.usp || []).map((u: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 mt-0.5`}>
                            {uspIcons[u] || <Award className="w-3 h-3" />}
                          </span>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Rocket className={`w-4 h-4 ${accentColor}`} /> Modules
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {(program.modules || []).map((mod: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                            {idx + 1}
                          </span>
                          {mod}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <Link href={`/programs/${program.slug}`} className="flex-1">
                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm h-10 rounded-xl">Learn More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Professionals Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-orange-700 border-b pb-3 mb-8">3. Corporate Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(programsData)
              .filter((p: any) => p.category === "Corporate Professionals")
              .map((program: any) => {
                const slugToGradient = (slug: string) => {
                  if (slug.startsWith("generative-ai-workplace")) return "from-indigo-500 to-blue-500";
                  if (slug.startsWith("ai-finance")) return "from-emerald-500 to-teal-500";
                  if (slug.startsWith("ai-leadership")) return "from-orange-500 to-amber-500";
                  return "from-brand-blue to-cyan-500";
                };
                const slugToAccent = (slug: string) => {
                  if (slug.startsWith("generative-ai-workplace")) return "text-indigo-600";
                  if (slug.startsWith("ai-finance")) return "text-emerald-600";
                  if (slug.startsWith("ai-leadership")) return "text-orange-600";
                  return "text-brand-blue";
                };
                const gradient = slugToGradient(program.slug);
                const accentColor = slugToAccent(program.slug);
                return (
                  <div
                    key={program.slug}
                    className="bg-white rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">{program.title}</h3>
                      <p className={`font-medium mb-3 ${accentColor}`}>{program.subtitle}</p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                        {program.description}
                      </p>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                        <Star className={`w-4 h-4 ${accentColor}`} /> Key Benefits
                      </h4>
                      <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-1">
                        {program.benefits?.map((b: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600">•</span><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                        <Award className={`w-4 h-4 ${accentColor}`} /> MentorMe USP
                      </h4>
                      <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-2">
                        {(program.mentorMeAdvantage || program.usp || []).map((u: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 mt-0.5`}>
                              {uspIcons[u] || <Award className="w-3 h-3" />}
                            </span>
                            <span>{u}</span>
                          </li>
                        ))}
                      </ul>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                        <Rocket className={`w-4 h-4 ${accentColor}`} /> Modules
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-8">
                        {(program.modules || []).map((mod: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                              {idx + 1}
                            </span>
                            {mod}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-auto">
                        <Link href={`/programs/${program.slug}`} className="flex-1">
                          <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm h-10 rounded-xl">Learn More</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Entrepreneurship Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-700 border-b pb-3 mb-8">4. Entrepreneurship</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {entrepreneurshipPrograms.map((program: any) => {
              const slugToGradient = (slug: string) => {
                if (slug.startsWith("entrepreneurship")) return "from-amber-500 to-orange-500";
                return "from-brand-blue to-cyan-500";
              };
              const slugToAccent = (slug: string) => {
                if (slug.startsWith("entrepreneurship")) return "text-amber-600";
                return "text-brand-blue";
              };
              const gradient = slugToGradient(program.slug);
              const accentColor = slugToAccent(program.slug);
              return (
                <div
                  key={program.slug}
                  className="bg-white rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">{program.title}</h3>
                    <p className={`font-medium mb-3 ${accentColor}`}>{program.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                      {program.description}
                    </p>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Star className={`w-4 h-4 ${accentColor}`} /> Key Benefits
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-1">
                      {program.benefits?.map((b: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Award className={`w-4 h-4 ${accentColor}`} /> MentorMe USP
                    </h4>
                    <ul className="text-slate-600 text-sm leading-relaxed mb-4 space-y-2">
                      {(program.mentorMeAdvantage || program.usp || []).map((u: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 mt-0.5`}>
                            {uspIcons[u] || <Award className="w-3 h-3" />}
                          </span>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800 flex items-center gap-2">
                      <Rocket className={`w-4 h-4 ${accentColor}`} /> Modules
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {(program.modules || []).map((mod: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                          <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                            {idx + 1}
                          </span>
                          {mod}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <Link href={`/programs/${program.slug}`} className="flex-1">
                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm h-10 rounded-xl">Learn More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
