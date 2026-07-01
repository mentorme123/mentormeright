"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, X, Loader2, Sparkles, ArrowRight,
  BookOpen, Users, Globe, GraduationCap,
  Briefcase, MessageCircle, Star, Phone, FileText
} from "lucide-react";

const QUICK_LINKS = [
  { href: "https://mentormeright-gt7dzpp8x-mentorme123s-projects.vercel.app/assessment",     label: "Career Assessment",   icon: Star,          desc: "Free psychometric test" },
  { href: "/counsellors",    label: "Counsellors",         icon: Users,         desc: "Book a 1-on-1 session" },
  { href: "/career-library", label: "Career Library",      icon: BookOpen,      desc: "5000+ career paths" },
  { href: "/ai-corner",      label: "AI Corner",           icon: Sparkles,      desc: "Chat with AI counselor" },
  { href: "/study-abroad",   label: "Study Abroad",        icon: Globe,         desc: "Global education guidance" },
  { href: "/programs",       label: "Training Programs",   icon: GraduationCap, desc: "Python, AI, SAP & more" },
  { href: "/about",          label: "About MentorMe",      icon: Briefcase,     desc: "Our team & philosophy" },
  { href: "/blogs",          label: "Blogs",               icon: FileText,      desc: "Career insights & tips" },
  { href: "/contact",        label: "Contact Us",          icon: Phone,         desc: "Get in touch" },
  { href: "/community",      label: "Community",           icon: MessageCircle, desc: "Join our network" },
];

const SUGGESTIONS = [
  "How does the career assessment work?",
  "What is the cost of counseling?",
  "Which stream should I choose after 10th?",
  "How to study abroad?",
  "What courses does MentorMe offer?",
  "Who are the co-founders of MentorMe?",
];

type SearchResult = { answer: string } | null;

interface SiteSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SiteSearch({ isOpen, onClose }: SiteSearchProps) {
  const [query, setQuery]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<SearchResult>(null);
  const [visible, setVisible]   = useState(false);
  const inputRef                = useRef<HTMLInputElement>(null);
  const mountedRef              = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setQuery("");
      setResult(null);
      setLoading(false);
      requestAnimationFrame(() => {
        setTimeout(() => inputRef.current?.focus(), 60);
      });
    } else if (visible && !isOpen) {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    if (!mountedRef.current) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: trimmed }],
        }),
      });
      const data = await res.json();
      if (mountedRef.current) {
        setResult({ answer: data.reply || "I couldn't find an answer. Please try rephrasing." });
      }
    } catch {
      if (mountedRef.current) {
        setResult({ answer: "Something went wrong. Please try again or contact us at admin@mentormeright.in" });
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(query);
  };

  const handleSuggestionClick = (s: string) => {
    setQuery(s);
    handleSearch(s);
  };

  if (!visible) return null;

  const filteredLinks = query.trim()
    ? QUICK_LINKS.filter(
        (l) =>
          l.label.toLowerCase().includes(query.toLowerCase()) ||
          l.desc.toLowerCase().includes(query.toLowerCase())
      )
    : QUICK_LINKS;

  return (
    <div className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0, transition: "opacity 200ms" }}
      />
      <div
        className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[1001] px-4"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translate(-50%, 0) scale(1)" : "translate(-50%, -20px) scale(0.97)",
          transition: "opacity 200ms, transform 200ms",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <Search className="w-5 h-5 text-brand-blue flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setResult(null); }}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about MentorMe..."
              className="flex-1 text-base text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            />
            {loading ? (
              <Loader2 className="w-5 h-5 text-brand-blue animate-spin flex-shrink-0" />
            ) : query ? (
              <button
                onClick={() => { setQuery(""); setResult(null); }}
                className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-400 font-mono">
                ESC
              </kbd>
            )}
            {query.trim() && !loading && (
              <button
                onClick={() => handleSearch(query)}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-black rounded-xl transition-all flex-shrink-0"
              >
                Ask <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {result && (
              <div className="px-5 py-4 bg-brand-blue/[0.03] border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-blue uppercase tracking-wider mb-2">AI Corner Answer</p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {result.answer.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!query.trim() && !result && (
              <div className="px-5 py-3 border-b border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-brand-blue/5 border border-slate-200 hover:border-brand-blue/30 text-slate-600 hover:text-brand-blue text-xs font-semibold rounded-xl transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredLinks.length > 0 && (
              <div className="px-5 py-3">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  {query.trim() ? "Matching Pages" : "Quick Navigation"}
                </p>
                <div className="space-y-1">
                  {filteredLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-blue/5 group transition-all"
                      >
                        <div className="w-8 h-8 bg-slate-100 group-hover:bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                          <Icon className="w-4 h-4 text-slate-500 group-hover:text-brand-blue transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-700 group-hover:text-brand-blue transition-colors">{link.label}</p>
                          <p className="text-xs text-slate-400">{link.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {query.trim() && filteredLinks.length === 0 && !result && !loading && (
              <div className="px-5 py-6 text-center">
                <p className="text-slate-500 text-sm">Press <strong>Enter</strong> or click <strong>Ask</strong> to get an AI answer.</p>
              </div>
            )}
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Powered by MentorMe AI • Gemini</p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span><kbd className="font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">↵</kbd> to ask</span>
              <span><kbd className="font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">ESC</kbd> to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useSiteSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}
