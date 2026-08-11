"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ScoreParam {
  score: number;
  max: number;
}

interface Scores {
  individuality: Record<string, ScoreParam>;
  skills: Record<string, ScoreParam>;
  passion: Record<string, ScoreParam>;
}

const TRAITS: Record<string, string> = {
  "Emotional Intelligence": "You read emotions with rare maturity. This superpower unlocks every people-first career.",
  "Efficiency": "You get more done in less time by working smart. Teams are built around people like you.",
  "Empathy": "You feel what others feel. This rare quality unlocks careers where people matter most.",
  "Engagement": "You bring full energy to what you commit to. This intensity separates good from extraordinary.",
  "Exploration": "Your curiosity never switches off. You thrive wherever lifelong learning is rewarded.",
  "Logical": "You see patterns where others see confusion. A critical advantage for complex careers.",
  "Numerical": "Numbers are a natural language for you — a formidable edge in data, finance, and STEM.",
  "Mechanical": "You understand how things work. Engineering and applied science call to you.",
  "Verbal": "Your command of language is precise and powerful. Communication careers suit you perfectly.",
  "Administrative": "You bring order and reliability to everything. Every great organisation needs you at its core.",
  "Realistic": "You love building tangible things. A hands-on doer who produces real results.",
  "Investigative": "Your mind lives in questions and analysis. Research and deep expertise are your natural home.",
  "Artistic": "You see the world differently and express it powerfully. Creativity is your identity.",
  "Social": "You energise everyone around you. Your career will be built on making genuine differences.",
  "Enterprising": "You are a natural leader and visionary. You do not wait for opportunities — you create them.",
  "Conventional": "You deliver precision and structure. The unsung hero every high-performing organisation needs."
};

const CAREER: Record<string, string> = {
  "Realistic": "You are drawn to practical, hands-on activities and enjoy working with tools, materials, machines, and physical systems. You like learning by doing and solving tangible problems.",
  "Investigative": "You are drawn to questions, analysis, and discovery. You enjoy exploring how things work, identifying patterns, experimenting with ideas, and finding logical explanations.",
  "Artistic": "You are drawn to creativity, imagination, and self-expression. You enjoy creating new ideas, experimenting with different forms of expression, and seeing possibilities in unique ways.",
  "Social": "You are drawn to people, relationships, and meaningful interaction. You enjoy understanding others, helping, guiding, supporting, and working collaboratively with people.",
  "Enterprising": "You are drawn to initiative, influence, leadership, and action. You enjoy taking responsibility, making decisions, persuading others, and turning ideas into meaningful outcomes.",
  "Conventional": "You are drawn to structure, organisation, accuracy, and systematic processes. You enjoy working with information, organising details, following clear processes, and creating order."
};

const SECTION_CONFIG: { key: keyof Scores; title: string; icon: string; badgeColor: string }[] = [
  { key: "individuality", title: "Individuality Profile", icon: "🧠", badgeColor: "bdg-blue" },
  { key: "skills", title: "Skill Proficiency", icon: "⚡", badgeColor: "bdg-amber" },
  { key: "passion", title: "Passion Exploration", icon: "🎯", badgeColor: "bdg-green" },
];

const BARS: Record<"individuality" | "skills" | "passion", string[]> = {
  individuality: ["#1A6DD1", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"],
  skills:        ["#D97706", "#F59E0B", "#B45309", "#92400E", "#FBBF24"],
  passion:       ["#15803D", "#16A34A", "#22C55E", "#4ADE80", "#166534", "#065F46"],
};

export default function ReportClient({ userId }: { userId: string }) {
  const [scores, setScores] = useState<Scores | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userClass, setUserClass] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(userId)}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load assessment");
          setLoading(false);
          return;
        }
        setScores(data.scores);
        setUserName(data.userName);
        setUserClass(data.userClass);
        setUserEmail(data.userEmail);
        setUserPhone(data.userPhone);
        setSubjects(data.subjects || []);
      } catch {
        setError("Failed to load assessment");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  const getPct = (sec: keyof Scores, param: string) => {
    if (!scores) return 0;
    const d = scores[sec]?.[param];
    if (!d) return 0;
    return Math.round((d.score / Math.max(d.max, 0.01)) * 100);
  };

  const calcOverall = () => {
    if (!scores) return 0;
    let tot = 0, mx = 0;
    (Object.values(scores) as Record<string, ScoreParam>[]).forEach(sec => {
      Object.values(sec).forEach((p: ScoreParam) => { tot += p.score; mx += p.max; });
    });
    return Math.round((tot / Math.max(mx, 0.01)) * 100);
  };

  const getTopPassion = () => {
    if (!scores) return "Social";
    const ps = scores.passion || {};
    let top = "Social", topV = -1;
    Object.entries(ps).forEach(([p, d]: [string, ScoreParam]) => {
      const v = (d.score / Math.max(d.max, 0.01)) * 100;
      if (v > topV) { topV = v; top = p; }
    });
    return top;
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef2fb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading assessment report...</p>
        </div>
      </div>
    );
  }

  if (error || !scores) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Assessment Found</h2>
          <p className="text-slate-600 mb-6">{error || "This user has not completed their career assessment yet."}</p>
          <Button onClick={() => window.history.back()} variant="outline">
            <ArrowLeft size={16} className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  const firstName = userName?.split(" ")[0] || "Student";
  const overall = calcOverall();
  const topPassion = getTopPassion();

  return (
    <div className="min-h-screen bg-[#eef2fb] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-[700px] bg-white rounded-2xl border border-slate-200 overflow-hidden">

        {/* Header Logo */}
        <div className="bg-[#eef2fb] px-5 py-6 flex flex-col items-center justify-center gap-1">
          <div className="relative w-24 h-16">
            <Image src="/logo.png" alt="MentorMe" fill className="object-contain" />
          </div>
          <div className="text-amber-700 text-sm font-semibold tracking-wide" style={{ fontFamily: "Sora, sans-serif" }}>
            Turning Passions into Professions
          </div>
        </div>

        {/* Hero */}
        <div className="pt-8 pb-6 px-6 border-b border-slate-200">
          <h2 className="text-2xl font-black mb-1.5 text-center text-slate-900">
            Outstanding, {firstName}!
          </h2>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            You&apos;ve completed all 3 sections. Your MentorMe counsellor is preparing your personalised career report.
          </p>
          <div className="flex flex-nowrap items-center justify-center gap-2">
            <Link 
              href={`/report?userId=${encodeURIComponent(userId)}`}
              className="inline-flex items-center gap-1.5 bg-[#0f2460] border border-blue-200 text-white hover:bg-blue-800 font-bold px-3 py-2.5 rounded-xl transition-all text-xs whitespace-nowrap shadow-sm"
            >
              <LayoutDashboard size={14} />
              <span>Student Career Dashboard</span>
            </Link>
            <div className="bg-[#0f2460] rounded-xl px-3 py-2.5 min-w-[70px] border border-blue-200 text-center text-white">
              <div className="text-xl font-black">{overall}%</div>
              <div className="text-[9px] text-blue-200 mt-0.5 font-semibold uppercase tracking-wider">Overall</div>
            </div>
            <div className="bg-[#0f2460] rounded-xl px-3 py-2.5 min-w-[70px] border border-blue-200 text-center text-white">
              <div className="text-xl font-black text-amber-400">Class {userClass || "?"}</div>
              <div className="text-[9px] text-blue-200 mt-0.5 font-semibold uppercase tracking-wider">Your Class</div>
            </div>
            <div className="bg-[#0f2460] rounded-xl px-3 py-2.5 min-w-[70px] border border-blue-200 text-center">
              <div className="text-sm font-black leading-tight text-purple-300">{(subjects || []).slice(0, 2).join(', ') || 'N/A'}</div>
              <div className="text-[9px] text-blue-200 mt-0.5 font-semibold uppercase tracking-wider">Subjects</div>
            </div>
          </div>
        </div>

        {/* Student Info */}
        {(userName || userEmail || userPhone || userClass) && (
          <div className="px-6 py-3 bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto flex flex-nowrap items-center justify-center gap-x-4 gap-y-1 text-base">
              {userName && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="font-bold text-slate-900 text-lg">Name:</span>
                  <span className="font-semibold text-base text-slate-700">{userName}</span>
                </div>
              )}
              {userEmail && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="font-bold text-slate-900 text-lg">Email:</span>
                  <span className="font-semibold text-base text-slate-700">{userEmail}</span>
                </div>
              )}
              {userPhone && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="font-bold text-slate-900 text-lg">Phone:</span>
                  <span className="font-semibold text-base text-slate-700">{userPhone}</span>
                </div>
              )}
              {userClass && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="font-bold text-slate-900 text-lg">Grade:</span>
                  <span className="font-semibold text-base text-slate-700">{userClass}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Sections */}
        <div className="divide-y divide-slate-200">
          {SECTION_CONFIG.map(({ key, title, icon, badgeColor }) => {
            const params = key === "individuality"
              ? ["Emotional Intelligence", "Efficiency", "Empathy", "Engagement", "Exploration"]
              : key === "skills"
                ? ["Logical", "Numerical", "Mechanical", "Verbal", "Administrative"]
                : ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];

            let topParam = "", topPct = -1;
            params.forEach(p => {
              const v = getPct(key, p);
              if (v > topPct) { topPct = v; topParam = p; }
            });

            const individualityParams = ["Emotional Intelligence", "Efficiency", "Empathy", "Engagement", "Exploration"];
            let topIndivParam = "", topIndivPct = -1;
            individualityParams.forEach(p => {
              const v = getPct("individuality", p);
              if (v > topIndivPct) { topIndivPct = v; topIndivParam = p; }
            });

            const bars = BARS[key];

            return (
              <div key={key} className="px-5 py-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-lg">{icon}</span>
                  <span className="text-[15px] font-bold text-slate-800">{title}</span>
                  <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${badgeColor === "bdg-blue" ? "bg-blue-100 text-blue-700" : badgeColor === "bdg-amber" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {topPct}%
                  </span>
                </div>

                <div className="space-y-2.5">
                  {params.map((param, idx) => {
                    const pct = getPct(key, param);
                    const barColor = bars[idx] || "#3B82F6";
                    return (
                      <div key={param} className="flex items-center gap-2.5">
                        <div className="w-[125px] text-[13px] text-slate-500 font-medium flex-shrink-0">{param}</div>
                        <div className="flex-1 h-[8px] bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
                        </div>
                        <div className="text-[13px] font-bold text-slate-800 w-8 text-right">{pct}%</div>
                      </div>
                    );
                  })}
                </div>

                {key === "individuality" && (
                  <div className="mt-4 p-4 rounded-xl border" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", borderColor: "#bfdbfe" }}>
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Key Individuality Trait</div>
                    <div className="text-[15px] font-bold text-[#0f2460]">{topIndivParam}</div>
                    <div className="text-[13px] text-blue-600 mt-1 leading-relaxed">{TRAITS[topIndivParam] || ""}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Career Direction */}
        <div className="px-5 py-5">
          <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)", border: "1px solid #fde68a" }}>
            <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Strongest Career Interest</div>
            <div className="text-[16px] font-bold text-amber-900 mb-1">{topPassion} personality type</div>
            <div className="text-[14px] text-amber-800 leading-relaxed">{CAREER[topPassion] || ""}</div>
          </div>
        </div>

        {/* Report Pending */}
        <div className="px-5 pb-5">
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
            <div className="text-[32px] mb-2">📬</div>
            <div className="text-base font-bold text-slate-800 mb-1">Your personalised PDF report is being prepared</div>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              A MentorMe career counsellor will review your complete results and send you a detailed, personalised career report within <strong>48 hours</strong> to {userEmail || userName || "you"}. Watch your inbox — and your spam folder just in case!
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-6 flex flex-col gap-2.5">
          <p className="text-[13px] text-slate-500 text-center max-w-md mx-auto leading-relaxed">
            Questions about your results? Our counsellors are available on WhatsApp — mention your name and the date you took the assessment.
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=918188824440&text=${encodeURIComponent(`Hi MentorMe! I just completed my Career Discovery Assessment (${userName || "Student"}, Class ${userClass || "?"}). Looking forward to my report!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#0f2460] hover:bg-[#2952c4] text-white font-bold text-center py-3.5 rounded-xl transition-colors"
          >
            Chat with a MentorMe counsellor →
          </a>
          <Button
            onClick={() => window.print()}
            variant="ghost"
            className="w-full py-3.5 text-[13px] font-bold border border-slate-200 text-blue-700 hover:bg-blue-50"
          >
            <Printer size={14} className="mr-2" /> Print Report
          </Button>
          <Link href="/">
            <Button variant="ghost" className="w-full py-3.5 text-[13px] font-bold text-slate-500 hover:text-slate-700">
              <ArrowLeft size={14} className="mr-2" /> Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
