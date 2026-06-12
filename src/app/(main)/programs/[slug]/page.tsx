"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/lib/program-data";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowRight, Star, Zap, Target, Award, Users, Brain, Rocket } from "lucide-react";

const uspIcons: Record<string, React.ReactNode> = {
  "Age-appropriate learning": <Brain className="w-5 h-5" />,
  "Interactive activities and games": <Rocket className="w-5 h-5" />,
  "No coding required": <Target className="w-5 h-5" />,
  "Industry-designed curriculum": <Award className="w-5 h-5" />,
  "Ready-to-use prompt library": <Zap className="w-5 h-5" />,
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

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programsData[params.slug];

  if (!program) {
    notFound();
  }

  // Determine accent color based on category
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden pb-[50px] md:pb-[100px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={program.image}
            alt={program.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="relative z-30 container mx-auto px-4 text-center max-w-4xl text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {program.category}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-xl leading-tight">
            {program.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-slate-200 drop-shadow-lg max-w-2xl mx-auto">
            {program.subtitle}
          </p>
          <div className="pt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" className={`${bgColor} hover:opacity-90 text-white border-0 shadow-2xl scale-100 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-full`}>
                Enroll Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-slate-900 backdrop-blur-md text-lg px-8 py-6 rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-[calc(133%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.22,199.53,108.14Z" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        
        {/* Program Overview */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Program Overview</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {program.description}
          </p>
        </div>

        {/* Benefits & USP Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {program.benefits && (
            <div className="bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Star className={`w-6 h-6 ${accentColor}`} />
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {program.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className={`${accentColor} shrink-0 mt-0.5`} size={20} />
                    <span className="text-slate-700 font-medium leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {program.usp && (
            <div className="bg-gradient-to-br from-brand-orange/5 to-purple-500/5 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Award className={`w-6 h-6 ${accentColor}`} />
                MentorMe USP
              </h3>
              <ul className="space-y-4">
                {program.usp.map((usp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0`}>
                      {uspIcons[usp] || <Award className="w-4 h-4" />}
                    </span>
                    <span className="text-slate-700 font-medium leading-snug">{usp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* How We Offer */}
        {program.howWeOffer && program.howWeOffer.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <ChevronRight className={accentColor} /> How We Offer It
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {program.howWeOffer.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 hover:border-slate-300 transition-colors">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center`}>
                    <span className={`font-bold ${accentColor}`}>{idx + 1}</span>
                  </div>
                  <p className="text-slate-700 font-medium leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modules */}
        {program.modules && program.modules.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Rocket className={accentColor} /> Curriculum Modules
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {program.modules.map((module, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-sm leading-tight group-hover:text-brand-blue transition-colors">
                      {module}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-12 gap-12">
          {/* Left Column: Description & How we offer */}
          <div className="md:col-span-8 space-y-12">
            
            {(!program.benefits || !program.usp) && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-3xl font-bold mb-6 text-slate-800">Program Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            )}

            {(!program.howWeOffer || program.howWeOffer.length === 0) && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <ChevronRight className={accentColor} /> How We Offer It
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.howWeOffer.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 hover:border-slate-300 transition-colors">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center`}>
                        <span className={`font-bold ${accentColor}`}>{idx + 1}</span>
                      </div>
                      <p className="text-slate-700 font-medium leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Highlights & Sticky CTA */}
          <div className="md:col-span-4 space-y-8 relative">
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl sticky top-28">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-brand-orange" />
                Curriculum Highlights
              </h3>
              <ul className="space-y-4 mb-8">
                {program.keyHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className={`${accentColor} shrink-0 mt-0.5`} size={20} />
                    <span className="text-slate-300 text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-slate-800">
                <p className="text-sm text-slate-400 mb-4 text-center">Ready to start your journey?</p>
                <Link href="/contact" className="block w-full">
                  <Button className={`w-full py-6 text-lg font-bold rounded-xl bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-lg`}>
                    Get Started <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/assessment" className="block w-full mt-3">
                  <Button variant="outline" className="w-full py-4 text-sm font-semibold rounded-xl border-slate-600 text-slate-300 hover:bg-white hover:text-slate-900">
                    Take Career Assessment
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* SEO Keywords */}
        {program.seoKeywords && program.seoKeywords.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200">
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
