"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { ArrowLeft, Printer, Download } from "lucide-react";

function ScienceReportContent() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  const handlePrint = () => {
    const iframe = iframeRef.current;
    try {
      if (iframe?.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      }
    } catch {
      // fall through to window print
    }
    window.print();
  };

  useEffect(() => {
    document.title = "MentorMe Science Career Intelligence Report";
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      setLoading(false);
      try {
        iframe.contentWindow?.focus();
      } catch { }
    };
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading science career report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef2f6] flex flex-col">
      <header className="sticky top-0 z-50 bg-[#0d2545] text-white px-4 py-3 shadow-md flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white">
              Mentor<span className="text-[#00a6a6]">Me</span> Science Career Intelligence
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#00a6a6] hover:bg-[#008e8e] active:scale-95 text-white px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            title="Download report as PDF or Print"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer"
            title="Print report"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </header>

      <div className="flex-1 w-full">
        <iframe
          ref={iframeRef}
          src="/science-career-intelligence.html"
          title="Science Career Intelligence Report"
          className="w-full border-0"
          style={{ height: "calc(100vh - 57px)", minHeight: "700px" }}
        />
      </div>
    </div>
  );
}

export default function ScienceReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Loading science career report...</p>
          </div>
        </div>
      }
    >
      <ScienceReportContent />
    </Suspense>
  );
}
