import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { programsData } from "@/lib/program-data";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programsData[params.slug];

  if (!program) {
    notFound();
  }

  // Determine accent color based on category
  const getAccentColor = () => {
    switch (program.category) {
      case "School Programs": return "text-brand-orange";
      case "College Programs": return "text-brand-blue";
      case "Corporate Programs": return "text-purple-600";
      default: return "text-brand-blue";
    }
  };

  const getBgColor = () => {
    switch (program.category) {
      case "School Programs": return "bg-brand-orange";
      case "College Programs": return "bg-brand-blue";
      case "Corporate Programs": return "bg-purple-600";
      default: return "bg-brand-blue";
    }
  };

  const accentColor = getAccentColor();
  const bgColor = getBgColor();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-20">
      
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
          <div className="pt-8">
            <Link href="/assessment">
              <Button size="lg" className={`${bgColor} hover:opacity-90 text-white border-0 shadow-2xl scale-100 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-full`}>
                Career Assessment <ArrowRight className="ml-2" />
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
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Column: Description & How we offer */}
          <div className="md:col-span-8 space-y-12">
            
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Program Overview</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {program.description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <ChevronRight className={accentColor} /> How We Offer It
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.howWeOffer.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3 hover:border-slate-300 transition-colors">
                    <div className={`w-10 h-10 rounded-full ${bgColor} bg-opacity-10 flex items-center justify-center`}>
                      <span className={`font-bold ${accentColor}`}>{idx + 1}</span>
                    </div>
                    <p className="text-slate-700 font-medium leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column: Key Highlights & Sticky CTA */}
          <div className="md:col-span-4 space-y-8 relative">
            
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-28">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
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
                <p className="text-sm text-slate-400 mb-4 text-center">Ready to discover your potential?</p>
                <Link href="/assessment" className="block w-full">
                  <Button className={`w-full py-6 text-lg font-bold rounded-xl ${bgColor} hover:opacity-90 text-white shadow-lg`}>
                    Career Assessment
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
