"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

interface ScoreParam {
  score: number;
  max: number;
}

interface Scores {
  individuality: Record<string, ScoreParam>;
  skills: Record<string, ScoreParam>;
  passion: Record<string, ScoreParam>;
}

const SECTION_CONFIG = {
  individuality: {
    title: "Individuality Profile",
    icon: "🧠",
    color: "#1A6DD1",
    bgLight: "#EFF6FF",
    params: ["Emotional Intelligence", "Efficiency", "Empathy", "Engagement", "Exploration"],
    bars: ["#1A6DD1", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"]
  },
  skills: {
    title: "Skill Proficiency",
    icon: "⚡",
    color: "#F59E0B",
    bgLight: "#FFFBEB",
    params: ["Logical", "Numerical", "Mechanical", "Verbal", "Administrative"],
    bars: ["#D97706", "#F59E0B", "#B45309", "#92400E", "#FBBF24"]
  },
  passion: {
    title: "Passion Exploration",
    icon: "🎯",
    color: "#16A34A",
    bgLight: "#F0FDF4",
    params: ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"],
    bars: ["#15803D", "#16A34A", "#22C55E", "#4ADE80", "#166534", "#065F46"]
  }
};

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
  "Realistic": "Engineering, architecture, robotics, aviation, or environmental science. You build the infrastructure the world depends on.",
  "Investigative": "Medicine, scientific research, data science, biotechnology, or academia. Your depth will push the boundaries of what humanity knows.",
  "Artistic": "Design, film, writing, music, animation, or advertising. You shape culture — how the world looks, thinks, and feels.",
  "Social": "Teaching, counselling, psychology, social work, or public health. You make individual lives and communities meaningfully better.",
  "Enterprising": "Entrepreneurship, corporate leadership, law, marketing, or politics. You do not just lead teams — you lead movements.",
  "Conventional": "Finance, chartered accountancy, data analytics, IT systems, or public administration. You are the backbone that holds great organisations together."
};

export default function ReportClient({ userId }: { userId: string }) {
  const [scores, setScores] = useState<Scores | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userClass, setUserClass] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(userId)}`);
        const json: { error?: string } = await res.json();
        if (!res.ok) {
          setError(json.error || "Failed to load assessment");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setScores(data.scores);
        setUserName(data.userName);
        setUserClass(data.userClass);
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
    Object.values(scores).forEach(sec => {
      Object.values(sec).forEach(p => {
        tot += p.score;
        mx += p.max;
      });
    });
    return Math.round((tot / Math.max(mx, 0.01)) * 100);
  };

  const getTopPassion = () => {
    if (!scores) return "Social";
    const ps = scores.passion || {};
    let top = "Social", topV = -1;
    Object.entries(ps).forEach(([p, d]) => {
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto bg-white shadow-sm border border-slate-200">
        {/* Header */}
        <div className="bg-[#0f2460] text-white text-center py-16 px-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0f2460] font-black text-xl mx-auto mb-4">
            {getInitials(userName || "Student")}
          </div>
          <h2 className="text-3xl font-black mb-2">
            Outstanding, {firstName}!
          </h2>
          <p className="text-blue-200 text-sm mb-8">All 3 sections complete. Your MentorMe counsellor is preparing your personalised report.</p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/10 rounded-xl px-6 py-4 min-w-[100px]">
              <div className="text-2xl font-black">{overall}%</div>
              <div className="text-xs text-blue-200 mt-1">OVERALL</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4 min-w-[100px]">
              <div className="text-2xl font-black text-amber-400">Class {userClass || "?"}</div>
              <div className="text-xs text-blue-200 mt-1">YOUR CLASS</div>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-4 min-w-[100px]">
              <div className="text-2xl font-black">{(subjects || []).length || 90}</div>
              <div className="text-xs text-blue-200 mt-1">COMPLETED</div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="p-6 space-y-8">
          {(Object.keys(SECTION_CONFIG) as Array<keyof typeof SECTION_CONFIG>).map((secKey) => {
            const sec = SECTION_CONFIG[secKey];
            let top = "", topPct = -1;
            sec.params.forEach(p => {
              const v = getPct(secKey, p);
              if (v > topPct) { topPct = v; top = p; }
            });

            return (
              <div key={secKey}>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-slate-200">
                  <span className="text-2xl">{sec.icon}</span>
                  <h3 className="text-lg font-black text-slate-800">{sec.title}</h3>
                  <span className="ml-auto bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                    {topPct}%
                  </span>
                </div>

                <div className="space-y-4">
                  {sec.params.map((param, idx) => {
                    const pct = getPct(secKey, param);
                    return (
                      <div key={param} className="flex items-center gap-3">
                        <div className="w-30 text-sm text-slate-600 font-medium flex-shrink-0">{param}</div>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, background: sec.bars[idx] }}
                          ></div>
                        </div>
                        <div className="text-sm font-bold text-slate-700 w-10 text-right">{pct}%</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="text-xs font-bold text-blue-600 mb-1">STRONGEST TRAIT</div>
                  <div className="text-lg font-black text-slate-800">{top}</div>
                  <div className="text-sm text-blue-600 mt-1">{TRAITS[top] || ""}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Direction */}
        <div className="px-6 pb-8">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
            <div className="text-xs font-bold text-amber-700 mb-2">YOUR CAREER DIRECTION</div>
            <div className="text-xl font-black text-amber-900 mb-2">{topPassion} personality type</div>
            <div className="text-sm text-amber-800 leading-relaxed">{CAREER[topPassion] || ""}</div>
          </div>
        </div>

        {/* PDF Notice */}
        <div className="px-6 pb-8">
          <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📬</div>
            <div className="text-base font-bold text-slate-800 mb-2">
              Your personalised PDF report is being prepared
            </div>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              A MentorMe counsellor will send your detailed career report within <strong>48 hours</strong> to {userName || "you"}. Check your inbox and spam folder.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-8 flex flex-col gap-3">
          <a
            href={`https://api.whatsapp.com/send?phone=918188824440&text=${encodeURIComponent(`Hi MentorMe! I just completed my Career Discovery Assessment (${userName || "Student"}, Class ${userClass || "?"}). Looking forward to my report!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center py-4 rounded-xl transition-colors"
          >
            Chat with a MentorMe counsellor →
          </a>
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="w-full py-4 text-base font-bold"
          >
            <Printer size={18} className="mr-2" /> Print Report
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="w-full py-4 text-base font-bold"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </Button>
        </div>
      </div>
    </div>
  );
}
