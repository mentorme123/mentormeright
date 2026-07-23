"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, Home, Search, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MODULES = [
  {
    title: "Module 1: Entrepreneurial Mindset",
    description: "Building the Foundation for Business Success",
    objectives: [
      "Understand what it means to think like an entrepreneur.",
      "Recognize the characteristics of successful entrepreneurs.",
      "Develop a growth mindset.",
      "Learn to embrace challenges and uncertainty.",
      "Identify your own entrepreneurial strengths and areas for improvement.",
    ],
    quote: "Entrepreneurs don't wait for opportunities—they create them.",
    content: `
      <h2>What is an Entrepreneur?</h2>
      <p>An entrepreneur is someone who identifies opportunities, solves problems, creates value for customers, and builds sustainable businesses by taking calculated risks.</p>
      <h2>Key Characteristics</h2>
      <ul>
        <li> Resilience </li>
        <li> Creativity </li>
        <li> Strong work ethic </li>
        <li> Willingness to learn </li>
        <li> Customer focus </li>
      </ul>
      <h2>Growth Mindset</h2>
      <p>Believe that skills can be developed through dedication and hard work. View challenges as opportunities to grow rather than obstacles.</p>
      <img src="/images/entrepreneurship/entrepreneurial-mindset-hero.png" alt="Entrepreneurial Mindset" className="w-full rounded-2xl mt-8 mb-4" />
      <h2>Examples of Entrepreneurship</h2>
      <ul>
        <li>Opening a café</li>
        <li>Launching a mobile app</li>
        <li>Starting an online clothing brand</li>
        <li>Manufacturing eco-friendly products</li>
      </ul>
    `,
  },
  {
    title: "Module 2: Opportunity Identification",
    description: "Finding and Evaluating Business Ideas",
    objectives: [
      "Understand the importance of opportunity identification.",
      "Learn techniques to spot gaps in the market.",
      "Evaluate ideas using structured frameworks.",
      "Validate demand before building.",
      "Turn observations into viable business concepts.",
    ],
    quote: "The best opportunities hide in plain sight—look for what's missing.",
    content: `
      <h2>The Opportunity Mindset</h2>
      <p>Great businesses start by solving real problems. Train yourself to notice pain points in everyday life.</p>
      <h2>Market Gap Analysis</h2>
      <ul>
        <li> Look for underserved customer segments </li>
        <li> Identify processes that are outdated or inefficient </li>
        <li> Notice where customers complain repeatedly </li>
      </ul>
      <h2>Validation</h2>
      <p>Talk to 50+ potential customers. Test with a minimal prototype. Measure genuine interest before scaling.</p>
      <img src="/images/entrepreneurship/opportunity-identification-hero.png" alt="Opportunity Identification" className="w-full rounded-2xl mt-8 mb-4" />
      <h2>Examples</h2>
      <ul>
        <li>Identifying a gap in local delivery services</li>
        <li>Spotting inefficiency in school administration</li>
        <li>Noticing repeated complaints about a service</li>
      </ul>
    `,
  },
  {
    title: "Module 3: Business Models",
    description: "Designing How Your Business Creates Value",
    objectives: [
      "Understand how businesses create value",
      "Design a Business Model Canvas",
      "Build a compelling Value Proposition",
      "Identify customers, revenue and costs",
      "Create a scalable business model",
    ],
    quote: "Ideas are easy. Business models make ideas profitable.",
    content: `
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Session 4 & 5</span>
              <span className="text-xs font-bold text-slate-300">4 Hours</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">BUSINESS MODELS<br/>MATTER MORE THAN<br/>BUSINESS IDEAS</h2>
            <p className="text-lg text-slate-300 mb-2">A great idea alone doesn't build a successful business.</p>
            <p className="text-lg text-slate-300">A great <span className="text-brand-blue font-bold">business model</span> does.</p>
          </div>
        </div>

        {/* Learning Objectives Section */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">LEARNING OBJECTIVES</h3>
              </div>
              <p className="text-xs text-slate-500">By the end of this session participants will be able to:</p>
            </div>
            <div className="md:w-2/3">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-brand-blue mt-0.5 shrink-0" />
                  <span>Understand how businesses create value</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-brand-blue mt-0.5 shrink-0" />
                  <span>Design a Business Model Canvas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-brand-blue mt-0.5 shrink-0" />
                  <span>Build a compelling Value Proposition</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-brand-blue mt-0.5 shrink-0" />
                  <span>Identify customers, revenue and costs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-brand-blue mt-0.5 shrink-0" />
                  <span>Create a scalable business model</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Module 3 PDF</h3>
          <div className="w-full h-[600px] rounded-xl border border-slate-200 overflow-hidden">
            <iframe
              src="/downloads/Module 3_Business Models.pdf"
              className="w-full h-full"
              title="Module 3 Business Models PDF"
            >
              <p>Your browser does not support PDFs. <a href="/downloads/Module 3_Business Models.pdf">Download the PDF</a> to view it.</p>
            </iframe>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-slate-50 p-8 sm:p-12 border-b border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl text-brand-blue/20 font-serif absolute top-4 left-4">"</div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 italic mb-2">Ideas are easy.</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 italic">Business models<br/>make ideas profitable.</p>
            <div className="text-6xl text-brand-blue/20 font-serif absolute bottom-4 right-4">"</div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Deliverables</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Completed Business Model Canvas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Completed Value Proposition Canvas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0a1628] text-white p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 6.477 9.246 7 7.5 7S4.168 6.477 3 6.253v13C4.168 19.477 5.754 19 7.5 19s3.332.477 4.5 1.253m0-13C13.168 6.477 14.754 7 16.5 7c1.747 0 3.332-.477 4.5-1.253v13C19.832 19.477 18.247 19 16.5 19c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Practical<br/>Learning</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Real-World<br/>Approach</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Mentored<br/>Journey</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Future-Ready<br/>Skills</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.5M3.055 11a9.969 9.969 0 011.5-3.5M3.055 11a9.969 9.969 0 013.5-1.5M3.055 11a9.969 9.969 0 013.5 1.5m0 0a9.969 9.969 0 011.5 3.5m0 0a9.969 9.969 0 013.5 1.5" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Impactful<br/>Ventures</p>
            </div>
          </div>
          <div className="mt-6 text-right">
            <span className="text-xs text-slate-400">www.mentormeright.co</span>
          </div>
        </div>
      </div>
    `,
  },
];

function ModuleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const moduleParam = searchParams.get("module");
  const initialModule = moduleParam ? Math.max(0, Math.min(MODULES.length - 1, parseInt(moduleParam) - 1)) : 0;
  const [active, setActive] = useState(initialModule);

  useEffect(() => {
    if (moduleParam) {
      const idx = Math.max(0, Math.min(MODULES.length - 1, parseInt(moduleParam) - 1));
      setActive(idx);
    }
  }, [moduleParam]);

  const updateModule = (idx: number) => {
    setActive(idx);
    const url = new URL(window.location.href);
    url.searchParams.set("module", String(idx + 1));
    router.replace(url.pathname + url.search, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-64px)]">
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 shrink-0 bg-slate-900 p-6 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Entrepreneurship</h2>
            <p className="text-xs text-slate-400">Study & Learning Modules</p>
          </div>
        </div>
        <div className="space-y-2">
          {MODULES.map((mod, idx) => (
            <button
              key={idx}
              onClick={() => updateModule(idx)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all ${
                active === idx
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                active === idx ? "bg-white/20" : "bg-slate-100"
              }`}>
                <BookOpen size={20} className={active === idx ? "text-white" : "text-slate-600"} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Module {idx + 1}</p>
                <p className={`text-xs ${active === idx ? "text-blue-100" : "text-slate-500"} leading-tight`}>
                  {mod.title.split(": ")[1]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-bold">
              MODULE {active + 1}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2">
            {MODULES[active].title}
          </h1>
          <p className="text-slate-600 font-medium text-lg">{MODULES[active].description}</p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Learning Objectives */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">✓</span>
              Learning Objectives
            </h3>
            <p className="text-sm text-slate-600 mb-3">By the end of this module, you will be able to:</p>
            <ul className="space-y-2">
              {MODULES[active].objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-brand-blue font-bold mt-0.5">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 mb-8 relative">
            <div className="text-4xl text-brand-blue/20 font-serif absolute top-4 left-4">"</div>
            <p className="text-xl sm:text-2xl font-bold text-slate-800 text-center italic relative z-10">
              {MODULES[active].quote}
            </p>
            <div className="text-4xl text-brand-blue/20 font-serif absolute bottom-4 right-4">"</div>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: MODULES[active].content }} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="p-6 sm:p-8 pt-0 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => updateModule(Math.max(0, active - 1))}
            disabled={active === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Previous
          </Button>
          <Button
            onClick={() => updateModule(Math.min(MODULES.length - 1, active + 1))}
            disabled={active === MODULES.length - 1}
            className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90"
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EntrepreneurshipPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
              <div className="h-32 bg-slate-100" />
              <div className="p-2 space-y-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="h-20 bg-slate-50 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
              <div className="h-64 bg-slate-100" />
            </div>
          </div>
        </div>
      }>
        <ModuleContent />
      </Suspense>
    </div>
  );
}
