"use client";

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

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programsData[params.slug];

  if (!program) {
    notFound();
  }

  const getAccentColor = () => {
    switch (program.category) {
      case "AI Learning Hub": return "text-brand-orange";
      case "21st Century Skills Hub": return "text-brand-blue";
      case "Corporate Professionals": return "text-purple-600";
      default: return "text-brand-blue";
    }
  };

  const getBgColor = () => {
    switch (program.category) {
      case "AI Learning Hub": return "bg-brand-orange";
      case "21st Century Skills Hub": return "bg-brand-blue";
      case "Corporate Professionals": return "bg-purple-600";
      default: return "bg-brand-blue";
    }
  };

  const getGradient = () => {
    switch (program.category) {
      case "AI Learning Hub": return "from-pink-500 to-purple-500";
      case "21st Century Skills Hub": return "from-brand-blue to-cyan-500";
      case "Corporate Professionals": return "from-slate-700 to-slate-900";
      default: return "from-brand-blue to-slate-800";
    }
  };

  const accentColor = getAccentColor();
  const bgColor = getBgColor();
  const gradient = getGradient();

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="relative z-30 container mx-auto px-4 text-center max-w-4xl text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold tracking-wide uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {program.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-xl leading-tight">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl font-medium text-slate-200 drop-shadow-lg max-w-2xl mx-auto">
            {program.subtitle}
          </p>
          <div className="pt-6 flex flex-wrap gap-3 justify-center">
            <a href="/career-assessment.html">
              <Button size="lg" className={`${bgColor} hover:opacity-90 text-white border-0 shadow-2xl scale-100 hover:scale-105 transition-all duration-300 text-base px-6 py-5 rounded-full`}>
                Enroll Now <ArrowRight className="ml-2" />
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-slate-900 backdrop-blur-md text-base px-6 py-5 rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-[calc(133%+1.3px)] h-[40px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.22,199.53,108.14Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">

        {/* Short Description */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-3 text-slate-800">Short Description</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {program.description}
          </p>
        </div>

        {/* Benefits */}
        {program.benefits && program.benefits.length > 0 && (
          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Star className={`w-6 h-6 ${accentColor}`} />
              Key Benefits
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {program.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`${accentColor} shrink-0 mt-0.5`} size={20} />
                  <span className="text-slate-700 font-medium leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* MentorMe Advantage */}
        {(program.mentorMeAdvantage && program.mentorMeAdvantage.length > 0) ||
        (program.usp && program.usp.length > 0) ? (
          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className={`w-6 h-6 ${accentColor}`} />
              MentorMe Advantage
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {(program.mentorMeAdvantage || program.usp || []).map((advantage, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0`}>
                    {uspIcons[advantage] || <Award className="w-4 h-4" />}
                  </span>
                  <span className="text-slate-700 font-medium leading-snug">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Modules */}
        {program.modules && program.modules.length > 0 && (
          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Rocket className={accentColor} /> Modules
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {program.modules.map((module, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 font-medium text-sm leading-tight">
                    {module}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {program.learningOutcomes && (
          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Target className={`w-6 h-6 ${accentColor}`} />
              Learning Outcomes
            </h3>
            <p className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-2xl p-6">
              {program.learningOutcomes}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-slate-300 mb-6">Take the next step and enroll today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button className={`${bgColor} hover:opacity-90 text-white border-0 shadow-lg px-8 py-5 rounded-full text-base font-bold`}>
                  Contact Us <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* SEO Keywords */}
        {program.seoKeywords && program.seoKeywords.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200 max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-slate-600">Related Searches:</span>{" "}
              {program.seoKeywords.map((kw, i) => (
                <span key={i}>
                  <Link href={`/search?q=${encodeURIComponent(kw)}`} className="text-brand-blue hover:text-brand-orange transition-colors">
                    {kw}
                  </Link>
                  {i < program.seoKeywords!.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        )}

      </section>

    </div>
  );
}
