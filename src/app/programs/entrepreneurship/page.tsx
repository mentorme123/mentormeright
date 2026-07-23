"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, Home, Search, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      "Learn the core components of a business model.",
      "Use the Business Model Canvas.",
      "Define revenue streams and cost structures.",
      "Map key partnerships and activities.",
      "Build a lean model for your startup idea.",
    ],
    quote: "A great business model turns ideas into sustainable value.",
    content: `
      <h2>What is a Business Model?</h2>
      <p>A business model describes how your company creates, delivers, and captures value.</p>
      <h2>Business Model Canvas</h2>
      <ul>
        <li> Value Propositions </li>
        <li> Customer Segments </li>
        <li> Channels & Relationships </li>
        <li> Revenue Streams </li>
        <li> Key Resources & Activities </li>
      </ul>
      <h2>Lean Thinking</h2>
      <p>Start small. Test assumptions. Iterate fast based on real customer feedback rather than perfect planning.</p>
      <img src="/images/entrepreneurship/business-models-hero.png" alt="Business Models" className="w-full rounded-2xl mt-8 mb-4" />
      <h2>Examples</h2>
      <ul>
        <li>Subscription model for educational content</li>
        <li>Freemium model for SaaS products</li>
        <li>Marketplace model connecting buyers and sellers</li>
      </ul>
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
      {/* Top Dark Bar */}
      <div className="bg-[#0a1628] text-white border-b border-slate-700">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Back
            </Button>
            <div>
              <h2 className="text-sm sm:text-base font-bold">Entrepreneurship</h2>
              <p className="text-xs text-slate-400">Study & Learning Modules</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hidden sm:flex">
              <Search size={16} />
            </Button>
            <span className="text-xs text-slate-400 hidden sm:inline">119%</span>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hidden sm:flex">
              <ZoomIn size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hidden sm:flex">
              <ZoomOut size={16} />
            </Button>
          </div>
        </div>
      </div>

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
