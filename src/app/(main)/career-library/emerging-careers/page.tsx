"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, ChevronRight, Home, Search, ZoomIn, ZoomOut, Shield, ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careersData, Career } from "@/lib/data/careers";

const EMERGING_CAREERS: Career[] = careersData.filter((c) => c.category === "Emerging Careers");

const EMERGING_CAREER_NUMBERS: Record<string, string> = {
  "car_emerging_prompt_engineer": "1] Prompt Engineer",
  "car_emerging_generative_ai_specialist": "2] Generative AI Specialist",
  "car_emerging_ai_product_manager": "3] AI Product Manager",
  "car_emerging_ai_ethics_specialist": "4] AI Ethics Specialist",
  "car_emerging_ai_trainer": "5] AI Trainer",
  "car_emerging_robotics_technician": "6] Robotics Technician",
  "car_emerging_drone_technology_specialist": "7] Drone Technology Specialist",
  "car_emerging_renewable_energy_specialist": "8] Renewable Energy Specialist",
  "car_emerging_sustainability_consultant": "9] Sustainability Consultant",
};

function CareerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const careerParam = searchParams.get("career");
  const initialIndex = careerParam
    ? Math.max(0, Math.min(EMERGING_CAREERS.length - 1, EMERGING_CAREERS.findIndex((c) => c.id === careerParam)))
    : 0;
  const [active, setActive] = useState(initialIndex);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (careerParam) {
      const idx = EMERGING_CAREERS.findIndex((c) => c.id === careerParam);
      if (idx >= 0) setActive(idx);
    }
  }, [careerParam]);

  const updateCareer = (idx: number) => {
    setActive(idx);
    const url = new URL(window.location.href);
    url.searchParams.set("career", EMERGING_CAREERS[idx].id);
    router.replace(url.pathname + url.search, { scroll: false });
  };

  if (!EMERGING_CAREERS[active]) {
    return null;
  }

  const career = EMERGING_CAREERS[active];

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-80px)] overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 shrink-0 bg-slate-900 p-6 text-white overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Emerging Careers</h2>
            <p className="text-xs text-slate-400">Career Roadmaps</p>
          </div>
        </div>
        <div className="space-y-2">
          {EMERGING_CAREERS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => updateCareer(idx)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all ${active === idx
                ? "bg-brand-blue text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100"
                }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${active === idx ? "bg-white/20" : "bg-slate-100"
                }`}>
                <BookOpen size={20} className={active === idx ? "text-white" : "text-slate-600"} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">{EMERGING_CAREER_NUMBERS[item.id] || item.title}</p>
                <p className={`text-xs ${active === idx ? "text-blue-100" : "text-slate-500"} leading-tight`}>
                  {item.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {/* Header */}
        <div className="h-14 bg-[#0a1628] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <Shield className="text-brand-blue" size={20} />
            <h1 className="text-white font-bold text-sm sm:text-base">
              {career.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-slate-300">
              <Search size={16} className="cursor-pointer hover:text-white transition-colors" />
              <span className="text-xs font-mono">100%</span>
              <ZoomOut size={16} className="cursor-pointer hover:text-white transition-colors" />
              <ZoomIn size={16} className="cursor-pointer hover:text-white transition-colors" />
            </div>

            <div className="hidden md:flex items-center gap-3 text-slate-300 border-l border-white/20 pl-4 ml-2">
              <span className="text-xs">{active + 1} / {EMERGING_CAREERS.length}</span>
            </div>

            <Link href="/career-library">
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-4 h-8 text-xs flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back
              </Button>
            </Link>
          </div>
        </div>

        {/* Career Content */}
        <div className="flex-1 relative w-full bg-[#e5e7eb] overflow-y-auto">
          <div className="p-6 sm:p-10 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-slate-900">What does a {career.title} do?</h2>
              <p className="text-slate-700 leading-relaxed text-base">{career.description}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Salary Range</h2>
              <p className="text-slate-700 leading-relaxed text-base font-semibold text-brand-blue">{career.salary_range}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Education Path</h2>
              <p className="text-slate-700 leading-relaxed text-base">{career.education_path}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Skills Required</h2>
              <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
                {career.skills_required.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="text-brand-blue font-bold">•</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Future Scope</h2>
              <p className="text-slate-700 leading-relaxed text-base font-semibold text-emerald-700">{career.growth_outlook}</p>
            </div>
          </div>
        </div>

        {/* Comment Toggle */}
        <div className="shrink-0 border-t border-slate-200 bg-white px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowComments(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-blue transition-colors"
          >
            <MessageCircle size={18} />
            {showComments ? "Hide Comments" : "Comments"}
          </button>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="shrink-0 border-t border-slate-200 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = (formData.get("name") as string) || "";
                  const message = (formData.get("message") as string) || "";
                  if (!name.trim() || !message.trim()) return;
                  const stored = JSON.parse(localStorage.getItem(`comments_${career.id}`) || "[]");
                  stored.push({ name, message, date: new Date().toISOString() });
                  localStorage.setItem(`comments_${career.id}`, JSON.stringify(stored));
                  (e.target as HTMLFormElement).reset();
                }}
                className="space-y-3"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  />
                  <input
                    name="message"
                    required
                    placeholder="Write a comment..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-sm">
                    <Send size={16} className="mr-1.5" /> Post Comment
                  </Button>
                </div>
              </form>

              <CommentList careerId={career.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentList({ careerId }: { careerId: string }) {
  const [comments, setComments] = useState<{ name: string; message: string; date: string }[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`comments_${careerId}`) || "[]");
    setComments(stored);
  }, [careerId]);

  return (
    <div className="space-y-4">
      {comments.length === 0 && (
        <p className="text-sm text-slate-500">No comments yet. Be the first to share your thoughts.</p>
      )}
      {comments.map((c, idx) => (
        <div key={idx} className="border border-slate-100 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-800">{c.name}</p>
            <span className="text-[11px] text-slate-400 font-medium">{new Date(c.date).toLocaleString()}</span>
          </div>
          <p className="text-sm text-slate-600 whitespace-pre-wrap">{c.message}</p>
        </div>
      ))}
    </div>
  );
}

export default function EmergingCareersPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Suspense fallback={
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
              <div className="h-32 bg-slate-100" />
              <div className="p-2 space-y-2">
                {[1, 2, 3].map((i) => (
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
        <CareerContent />
      </Suspense>
    </div>
  );
}
