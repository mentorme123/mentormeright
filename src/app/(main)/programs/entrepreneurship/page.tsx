"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export default function EntrepreneurshipMaterialPage() {
  const pdfUrl = "/downloads/entrepreneurship-material.pdf";

  useEffect(() => {
    window.open(pdfUrl, "_blank");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pt-20">
      <section className="relative w-full h-[50vh] min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="relative z-30 container mx-auto px-4 text-center max-w-4xl text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold tracking-wide uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            21st Century Skills Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-xl leading-tight">
            Entrepreneurship
          </h1>
          <p className="text-lg md:text-xl font-medium text-slate-200 drop-shadow-lg max-w-2xl mx-auto">
            Free Entrepreneurship Material & Startup Resources
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-brand-blue" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Free Entrepreneurship Material</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Access free entrepreneurship material, startup guides, business planning resources, and practical modules to kickstart your entrepreneurial journey.
          </p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white text-base px-8 py-5 rounded-full shadow-lg">
              <Download className="mr-2" />
              Open Entrepreneurship Material
            </Button>
          </a>
          <p className="text-sm text-slate-400 mt-4">
            The PDF will open in a new tab. If it does not open automatically, click the button above.
          </p>
        </div>
      </section>
    </div>
  );
}
