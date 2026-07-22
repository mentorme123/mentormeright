"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle, Shield, FileText, BookOpen } from "lucide-react";

interface Module {
  id: number;
  title: string;
  subtitle: string;
  filename: string;
}

const MODULES: Module[] = [
  {
    id: 1,
    title: "Module 1",
    subtitle: "Entrepreneurial Mindset",
    filename: "/downloads/Module 1_Entrepreneurial Mindset.pdf",
  },
  {
    id: 2,
    title: "Module 2",
    subtitle: "Opportunity Identification",
    filename: "/downloads/Module 2_Opportunity Identification.pdf",
  },
  {
    id: 3,
    title: "Module 3",
    subtitle: "Business Models",
    filename: "/downloads/Module 3_Business Models.pdf",
  },
];

function PDFViewerContent() {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module");

  const [activeModule, setActiveModule] = useState<Module>(MODULES[0]);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfjsLibRef = useRef<any>(null);

  // Sync active module with query parameter
  useEffect(() => {
    if (moduleParam) {
      const id = parseInt(moduleParam, 10);
      const mod = MODULES.find((m) => m.id === id);
      if (mod) {
        setActiveModule(mod);
      }
    }
  }, [moduleParam]);

  // Security restrictions
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+P, Cmd+P, Ctrl+S, Cmd+S, Ctrl+C, Cmd+C, F12, Ctrl+Shift+I
      if (
        (e.ctrlKey && e.key === "p") ||
        (e.metaKey && e.key === "p") ||
        (e.ctrlKey && e.key === "s") ||
        (e.metaKey && e.key === "s") ||
        (e.ctrlKey && e.key === "c") ||
        (e.metaKey && e.key === "c") ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.metaKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault();
        alert("Downloading, printing, or copying this material is restricted for copyright protection.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Load PDF.js from CDN dynamically on component mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      const lib = (window as any)["pdfjs-dist/build/pdf"];
      lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      pdfjsLibRef.current = lib;
      
      // Determine initial document path from query parameters
      let initialUrl = MODULES[0].filename;
      if (moduleParam) {
        const id = parseInt(moduleParam, 10);
        const mod = MODULES.find((m) => m.id === id);
        if (mod) {
          initialUrl = mod.filename;
        }
      }
      loadDocument(initialUrl, lib);
    };
    script.onerror = () => {
      setError("Failed to load PDF library.");
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Load document whenever activeModule changes
  useEffect(() => {
    if (pdfjsLibRef.current) {
      loadDocument(activeModule.filename, pdfjsLibRef.current);
    }
  }, [activeModule]);

  const loadDocument = (url: string, lib: any) => {
    setLoading(true);
    setError(null);
    setPageNum(1);

    const loadingTask = lib.getDocument(url);
    loadingTask.promise.then(
      (pdf: any) => {
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);

        // Auto-adjust scale based on container width
        if (containerRef.current) {
          const containerWidth = containerRef.current.clientWidth;
          pdf.getPage(1).then((page: any) => {
            const viewport = page.getViewport({ scale: 1.0 });
            const newScale = (containerWidth - 48) / viewport.width;
            setScale(Math.min(Math.max(newScale, 0.6), 1.4));
          });
        }
      },
      (err: any) => {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF document.");
        setLoading(false);
      }
    );
  };

  // Render PDF page to canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Support High DPI / Retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.scale(dpr, dpr);

        // Cancel previous render task if active
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (err: any) {
        if (err.name !== "RenderingCancelledException") {
          console.error("Render error:", err);
        }
      }
    };

    renderPage();
  }, [pdfDoc, pageNum, scale]);

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleNextPage = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row select-none">
      {/* Sidebar - Module Switcher */}
      <div className="w-full md:w-80 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-850 flex items-center gap-3">
          <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-xl">
            <BookOpen size={24} className="text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Entrepreneurship</h2>
            <p className="text-xs text-slate-400">Study & Learning Modules</p>
          </div>
        </div>

        {/* Module List */}
        <div className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible custom-scrollbar">
          {MODULES.map((mod) => {
            const isActive = activeModule.id === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all shrink-0 md:shrink ${
                  isActive
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                    : "bg-slate-900/50 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300"
                }`}
              >
                <FileText size={18} className={isActive ? "text-white" : "text-slate-400"} />
                <div className="text-xs md:text-sm">
                  <div className={`font-semibold ${isActive ? "text-white animate-fade-in" : "text-slate-400"}`}>
                    {mod.title}
                  </div>
                  <div className={`font-medium line-clamp-1 ${isActive ? "text-blue-100" : "text-slate-200"}`}>
                    {mod.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Security Alert Badge */}
        <div className="mt-auto p-6 hidden md:block border-t border-slate-850 bg-slate-950/80">
          <div className="flex gap-2.5 text-amber-500 bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/10 text-xs leading-relaxed">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-400 mb-0.5">Protected Document</p>
              <p className="text-slate-400">Downloading, printing, and sharing are restricted for copyright protection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
        {/* Top Control Bar */}
        <div className="bg-slate-950/50 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-blue-400 shrink-0" />
            <h1 className="font-bold text-sm sm:text-base text-white">
              {activeModule.title}: {activeModule.subtitle}
            </h1>
          </div>

          {/* Navigation Controls */}
          {!loading && !error && (
            <div className="flex items-center gap-2 sm:gap-4 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={18} />
              </button>
              <span className="text-xs font-semibold text-slate-400 min-w-10 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>

              <div className="w-[1px] h-6 bg-slate-800 mx-1" />

              <button
                onClick={handlePrevPage}
                disabled={pageNum <= 1}
                className="p-1 hover:bg-slate-800 disabled:opacity-40 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                Page {pageNum} of {numPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pageNum >= numPages}
                className="p-1 hover:bg-slate-800 disabled:opacity-40 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Next Page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* PDF Canvas Viewport */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start bg-slate-950 relative"
        >
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950">
              <div className="animate-spin text-blue-500">
                <Shield size={40} className="opacity-50" />
              </div>
              <p className="text-slate-400 text-sm font-medium animate-pulse">
                Securing and loading document...
              </p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950 p-4 text-center">
              <AlertCircle size={40} className="text-red-500" />
              <p className="text-slate-200 font-semibold">{error}</p>
              <p className="text-slate-400 text-sm max-w-sm">
                Please check your network or try switching to another module.
              </p>
            </div>
          )}

          {/* Secure Document Frame */}
          {!loading && !error && (
            <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-800 bg-white select-none">
              {/* Overlay to disable right-click / selection on Canvas */}
              <div
                className="absolute inset-0 z-10 cursor-default"
                style={{ pointerEvents: "auto" }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <canvas
                ref={canvasRef}
                className="block select-none pointer-events-none"
                style={{ filter: "contrast(1.03)" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EntrepreneurshipViewerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Shield size={40} className="animate-pulse opacity-50" />
        <p className="text-sm font-medium">Loading viewer...</p>
      </div>
    }>
      <PDFViewerContent />
    </Suspense>
  );
}
