"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Home } from "lucide-react";
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
    `,
  },
];

export default function EntrepreneurshipPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0f2460] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Home size={16} className="mr-2" /> Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black">Entrepreneurship</h1>
              <p className="text-blue-200 text-sm">Study & Learning Modules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Modules</h2>
            </div>
            <div className="p-2">
              {MODULES.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    active === idx
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    active === idx ? "bg-white/20" : "bg-slate-100"
                  }`}>
                    <BookOpen size={18} className={active === idx ? "text-white" : "text-slate-600"} />
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
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-brand-blue text-white text-xs font-bold">
                  MODULE {active + 1}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
                {MODULES[active].title}
              </h2>
              <p className="text-slate-600 font-medium">{MODULES[active].description}</p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Objectives */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">✓</span>
                  Learning Objectives
                </h3>
                <p className="text-sm text-slate-600 mb-3">By the end of this module, you will be able to:</p>
                <ul className="space-y-2">
                  {MODULES[active].objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-brand-blue font-bold mt-0.5">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
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
                onClick={() => setActive((prev) => Math.max(0, prev - 1))}
                disabled={active === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} /> Previous
              </Button>
              <Button
                onClick={() => setActive((prev) => Math.min(MODULES.length - 1, prev + 1))}
                disabled={active === MODULES.length - 1}
                className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90"
              >
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
