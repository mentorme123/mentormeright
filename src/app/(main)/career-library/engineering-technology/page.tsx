"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { BookOpen, ChevronLeft, ArrowLeft, Shield, Search, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careersData, Career } from "@/lib/data/careers";

const ENGINEERING_CAREERS: Career[] = careersData.filter((c) => c.category === "Engineering & Technology");

function CareerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const careerParam = searchParams.get("career");
  const initialIndex = careerParam
    ? Math.max(0, Math.min(ENGINEERING_CAREERS.length - 1, ENGINEERING_CAREERS.findIndex((c) => c.id === careerParam)))
    : 0;
  const [active, setActive] = useState(initialIndex);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (careerParam) {
      const idx = ENGINEERING_CAREERS.findIndex((c) => c.id === careerParam);
      if (idx >= 0) setActive(idx);
    }
  }, [careerParam]);

  const updateCareer = (idx: number) => {
    setActive(idx);
    setSidebarOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("career", ENGINEERING_CAREERS[idx].id);
    router.replace(url.pathname + url.search, { scroll: false });
  };

  if (!ENGINEERING_CAREERS[active]) {
    return null;
  }

  const career = ENGINEERING_CAREERS[active];

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-80px)] lg:overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#0a1628] px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <span className="text-white font-bold text-sm">Engineering & Technology</span>
        </div>
        <Link href="/career-library">
          <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-3 h-7 text-xs flex items-center gap-1.5">
            <ArrowLeft size={12} /> Back
          </Button>
        </Link>
      </div>

      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-full sm:w-80 shrink-0 bg-slate-900 p-6 text-white overflow-y-auto transition-transform duration-300 lg:duration-0`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Engineering & Technology</h2>
            <p className="text-xs text-slate-400">Career Roadmaps</p>
          </div>
        </div>
        <div className="space-y-2">
          {ENGINEERING_CAREERS.map((item, idx) => (
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
                <span className={`text-sm font-bold ${active === idx ? "text-white" : "text-slate-600"}`}>
                  {idx + 1}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">{item.title}</p>
                <p className={`text-xs ${active === idx ? "text-blue-100" : "text-slate-500"} leading-tight`}>
                  {item.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
              <span className="text-xs">{active + 1} / {ENGINEERING_CAREERS.length}</span>
            </div>

            <Link href="/">
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
          <div className="p-4 sm:p-6 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-black text-slate-900">What does a {career.title} do?</h2>
              <p className="text-slate-700 leading-relaxed text-base">{career.description}</p>
            </div>

            {career.is_real_career && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Is {career.title} a Real Career?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.is_real_career}</p>
              </div>
            )}

            {career.subjects_after_10th && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">What Subjects Should I Take After 10th?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.subjects_after_10th}</p>
              </div>
            )}

            {career.maths_compulsory && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Is Maths Compulsory for {career.title}?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.maths_compulsory}</p>
              </div>
            )}

            {career.degree_choices && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Which Degree Should I Choose?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.degree_choices}</p>
              </div>
            )}

            {career.entrance_exams && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Which Entrance Exams Should I Take?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.entrance_exams}</p>
              </div>
            )}

            {career.best_colleges && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Best Colleges for {career.title} in India</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.best_colleges}</p>
              </div>
            )}

            {career.courses_to_learn && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">What Courses Can I Take to Learn {career.title}?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.courses_to_learn}</p>
              </div>
            )}

            {career.future_scope && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">What is the Future Scope of {career.title}?</h2>
                <p className="text-slate-700 leading-relaxed text-base font-semibold text-emerald-700">{career.future_scope}</p>
              </div>
            )}

            {career.skills_detailed && career.skills_detailed.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">What Skills Are Required to Become a {career.title}?</h2>
                <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
                  {career.skills_detailed.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="text-brand-blue font-bold">•</span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {career.is_good_career && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">Is {career.title} a Good Career for You?</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.is_good_career}</p>
              </div>
            )}

            {career.career_tip && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-slate-900">MentorMe Career Tip</h2>
                <p className="text-slate-700 leading-relaxed text-base">{career.career_tip}</p>
              </div>
            )}
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Engineering & Technology?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Choosing a career should not be based only on popularity.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              Your interests, strengths, personality and skills can help determine whether an engineering or technology career is actually a good fit for you.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              MentorMe's Career Assessment and Career Guidance can help students explore their strengths and discover suitable career pathways before choosing their subjects, degree or specialisation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/assessment">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">
                  Take MentorMe Career Intelligence Assessment
                </Button>
              </Link>
            </div>
            <p className="text-sm font-bold tracking-wider uppercase pt-4 text-white/80">MENTORME – TURNING PASSIONS INTO PROFESSIONS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EngineeringTechnologyContent() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div></div>}>
      <CareerContent />
    </Suspense>
  );
}
