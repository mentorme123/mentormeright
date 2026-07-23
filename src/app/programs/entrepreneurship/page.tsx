"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, Home, Search, ZoomIn, ZoomOut, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MODULES = [
  {
    title: "Module 1",
    subtitle: "Entrepreneurial Mindset",
    pdfUrl: "/downloads/Module 1_Entrepreneurial Mindset.pdf",
  },
  {
    title: "Module 2",
    subtitle: "Opportunity Identification",
    pdfUrl: "/downloads/Module 2_Opportunity Identification.pdf",
  },
  {
    title: "Module 3",
    subtitle: "Business Models",
    pdfUrl: "/downloads/Module 3_Business Models.pdf",
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
                  {mod.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {/* PDF Custom Header */}
        <div className="h-14 bg-[#0a1628] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <Shield className="text-brand-blue" size={20} />
            <h1 className="text-white font-bold text-sm sm:text-base">
              {MODULES[active].title}: {MODULES[active].subtitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-slate-300">
              <Search size={16} className="cursor-pointer hover:text-white transition-colors" />
              <span className="text-xs font-mono">119%</span>
              <ZoomOut size={16} className="cursor-pointer hover:text-white transition-colors" />
              <ZoomIn size={16} className="cursor-pointer hover:text-white transition-colors" />
            </div>
            
            <div className="hidden md:flex items-center gap-3 text-slate-300 border-l border-white/20 pl-4 ml-2">
              <ChevronLeft size={16} className="cursor-pointer hover:text-white transition-colors" />
              <span className="text-xs">Page 1 / 10</span>
              <ChevronRight size={16} className="cursor-pointer hover:text-white transition-colors" />
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-4 h-8 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 relative w-full h-[calc(100vh-64px-56px)] bg-[#e5e7eb]">
          <iframe
            src={`${MODULES[active].pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-none"
            title={`${MODULES[active].title} PDF`}
          />
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
