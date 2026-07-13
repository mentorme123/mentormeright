"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ParameterScores } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, ChevronRight } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  education_level: string | null;
  audience_type: string | null;
}

interface DashboardScores extends ParameterScores {
  [key: string]: number;
}

const MAX_RIASEC = 20;
const MAX_SKILL = 24;

const pct = (score: number, max: number) => Math.round((score / Math.max(max, 0.01)) * 100);

const getTopRIASEC = (scores: DashboardScores) => {
  const riasec: { key: string }[] = [
    { key: "Realistic" },
    { key: "Investigative" },
    { key: "Artistic" },
    { key: "Social" },
    { key: "Enterprising" },
    { key: "Conventional" },
  ];
  return riasec.sort((a, b) => (scores[b.key] || 0) - (scores[a.key] || 0))[0];
};

const getStreamFromRIASEC = (topKey: string) => {
  const map: Record<string, { stream: string; courses: string[] }> = {
    Realistic: { stream: "Science (PCM) / Engineering", courses: ["B.Tech", "B.Arch", "B.Sc"] },
    Investigative: { stream: "Science (PCB) / Engineering", courses: ["B.Tech", "B.Sc", "MBBS"] },
    Artistic: { stream: "Arts / Humanities / Design", courses: ["B.Des", "BFA", "BA"] },
    Social: { stream: "Arts / Commerce / Psychology", courses: ["BA", "BBA", "B.Ed"] },
    Enterprising: { stream: "Commerce / Business / Law", courses: ["BBA", "B.Com", "LLB"] },
    Conventional: { stream: "Commerce / Finance / IT", courses: ["B.Com", "BBA", "BCA"] },
  };
  return map[topKey] || map["Social"];
};

const getCareerMatches = (scores: DashboardScores) => {
  const careers = [
    { name: "Business", color: "#1B3A6B", keys: ["Enterprising", "Social"] as const },
    { name: "Commerce/Finance", color: "#15803D", keys: ["Conventional", "Enterprising"] as const },
    { name: "Law", color: "#7C3AED", keys: ["Enterprising", "Social"] as const },
    { name: "Design", color: "#C2410C", keys: ["Artistic", "Realistic"] as const },
  ];

  return careers
    .map(career => {
      const score = career.keys.reduce((sum, key) => sum + (scores[key] || 0), 0);
      const maxScore = career.keys.length * MAX_RIASEC;
      return { name: career.name, color: career.color, pct: pct(score, maxScore) };
    })
    .sort((a, b) => b.pct - a.pct);
};

const getSubjectReadiness = (scores: DashboardScores) => {
  const subjects = [
    { name: "Accountancy", color: "#F59E0B", keys: ["Conventional", "Numerical"], weights: [1, 1] as number[] },
    { name: "Business Studies", color: "#F59E0B", keys: ["Enterprising", "Social"], weights: [0.8, 0.5] },
    { name: "Economics", color: "#F59E0B", keys: ["Investigative", "Conventional"], weights: [0.8, 0.8] },
    { name: "Mathematics", color: "#F59E0B", keys: ["Logical", "Numerical"], weights: [1, 1] },
  ];

  return subjects.map(subject => {
    const score = subject.keys.reduce((sum, key, i) => sum + (scores[key] || 0) * subject.weights[i], 0);
    const maxPossible = subject.keys.reduce((sum, _, i) => sum + MAX_SKILL * subject.weights[i], 0);
    return { name: subject.name, color: subject.color, pct: pct(score, maxPossible) };
  });
};

const getAcademicFitness = (scores: DashboardScores) => {
  const subjects = [
    { name: "Mathematics", color: "#1B3A6B", keys: ["Logical", "Numerical"] as const },
    { name: "Physics", color: "#1B3A6B", keys: ["Logical", "Mechanical"] as const },
    { name: "Chemistry", color: "#1B3A6B", keys: ["Investigative", "Logical"] as const },
  ];

  return subjects.map(subject => {
    const score = subject.keys.reduce((sum, key) => sum + (scores[key] || 0), 0);
    const maxPossible = subject.keys.length * MAX_SKILL;
    return { name: subject.name, color: subject.color, pct: pct(score, maxPossible) };
  });
};

const getCareerPathReadiness = (scores: DashboardScores) => {
  const paths = [
    { name: "Software Engineering", color: "#F59E0B", keys: ["Investigative", "Logical", "Numerical"] as const },
    { name: "Artificial Intelligence", color: "#F59E0B", keys: ["Investigative", "Logical", "Numerical"] as const },
    { name: "Data Science", color: "#F59E0B", keys: ["Investigative", "Conventional", "Numerical"] as const },
    { name: "Mechanical Engineering", color: "#F59E0B", keys: ["Realistic", "Mechanical"] as const },
    { name: "Entrepreneurship", color: "#F59E0B", keys: ["Enterprising", "Social"] as const },
  ];

  return paths
    .map(path => {
      const score = path.keys.reduce((sum, key) => sum + (scores[key] || 0), 0);
      const maxPossible = path.keys.length * MAX_RIASEC;
      return { name: path.name, color: path.color, pct: pct(score, maxPossible) };
    })
    .sort((a, b) => b.pct - a.pct);
};

const getCounselorRecommendations = (scores: DashboardScores, isSchool: boolean) => {
  const topSkills = getTopSkills(scores);
  const weakestSkill = [...topSkills].sort((a, b) => a.pct - b.pct)[0];

  if (isSchool) {
    return [
      `Strengthen ${weakestSkill.label.toLowerCase()} fundamentals`,
      `Build logical thinking`,
      `Begin case-study & aptitude practice`,
      `Explore CUET / business entrance prep`,
    ];
  }

  return [
    `Improve ${weakestSkill.label.toLowerCase()} through structured practice`,
    `Explore and understand the recommended career options`,
    `Explore engineering programs across different colleges`,
    `Try short courses on programming or AI`,
  ];
};

const getTopSkills = (scores: DashboardScores) => {
  const skills = [
    { key: "Logical", label: "Logical" },
    { key: "Numerical", label: "Numerical" },
    { key: "Mechanical", label: "Mechanical" },
    { key: "Verbal", label: "Verbal" },
    { key: "Administrative", label: "Administrative" },
  ];
  return skills
    .map(s => ({ ...s, score: scores[s.key] || 0, pct: pct(scores[s.key] || 0, MAX_SKILL) }))
    .sort((a, b) => b.pct - a.pct);
};

const getOverallScore = (scores: DashboardScores) => {
  const allScores = Object.values(scores);
  const totalScore = allScores.reduce((sum, s) => sum + s, 0);
  const maxTotal = 6 * MAX_RIASEC + 5 * MAX_SKILL + 5 * 24;
  return pct(totalScore, maxTotal);
};

const getCareerReadinessScore = (scores: DashboardScores) => {
  const topRIASEC = getTopRIASEC(scores);
  const topSkill = getTopSkills(scores)[0];
  const combined = (scores[topRIASEC.key] || 0) + (topSkill?.score || 0);
  return pct(combined, MAX_RIASEC + MAX_SKILL);
};

export default function CareerDashboard({ userId }: { userId: string }) {
  const [scores, setScores] = useState<DashboardScores | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("Please log in to view your dashboard");
          setLoading(false);
          return;
        }

        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(userProfile);

        const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(user.id)}`);
        const json = await res.json();
        
        if (!res.ok) {
          setError(json.error || "Failed to load assessment");
          setLoading(false);
          return;
        }

        setScores(json.scores);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your career dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !scores) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Assessment Found</h2>
          <p className="text-slate-600 mb-6">{error || "Complete your career assessment to view your dashboard."}</p>
          <Button onClick={() => window.location.href = "/career-assessment.html"} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold">
            Take Assessment
          </Button>
        </div>
      </div>
    );
  }

  const topRIASEC = getTopRIASEC(scores);
  const topSkills = getTopSkills(scores);
  const stream = getStreamFromRIASEC(topRIASEC.key);
  const careerMatches = getCareerMatches(scores);
  const subjectReadiness = getSubjectReadiness(scores);
  const academicFitness = getAcademicFitness(scores);
  const careerPaths = getCareerPathReadiness(scores);
  const overallScore = getOverallScore(scores);
  const careerReadinessScore = getCareerReadinessScore(scores);
  const profileStrengthScore = Math.round(overallScore * 0.72);
  const isSchool = profile?.education_level?.toLowerCase().includes("school") || 
                   profile?.audience_type === "ST";

  const counselorRecs = getCounselorRecommendations(scores, isSchool);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-[#0f2460] text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black mb-1">
                Student Career Dashboard (sample only){isSchool ? "– Class 9 & 10" : " – Class 11 & 12"}
              </h1>
              <p className="text-blue-200 text-sm">
                {isSchool 
                  ? "Grades 9 & 10 — Career pathway discovery, stream readiness & academic improvement areas" 
                  : "Grades 11 & 12 — Academic fitness, entrance exam tracking & profile strength"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Printer size={16} className="mr-2" /> Print
              </Button>
              <Button
                onClick={() => window.location.href = "/dashboard/student"}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft size={16} className="mr-2" /> Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {isSchool ? (
            <>
              <KPICard label="Career Clarity Score" value={`${overallScore}%`} color="text-[#1B3A6B]" />
              <KPICard label="Recommended Stream" value={stream.stream} color="text-[#15803D]" />
              <KPICard label="Subject Readiness" value={`${pct(topSkills.reduce((s, sk) => s + sk.score, 0), topSkills.length * MAX_SKILL)}%`} color="text-[#7C3AED]" />
              <KPICard label="Personality & Interest Alignment" value={`${pct(scores[topRIASEC.key] || 0, MAX_RIASEC)}%`} color="text-[#C2410C]" />
            </>
          ) : (
            <>
              <KPICard label="Overall Academic Fit" value={`${pct(topSkills.reduce((s, sk) => s + sk.score, 0), topSkills.length * MAX_SKILL)}%`} color="text-[#1B3A6B]" />
              <KPICard label="Profile Strength Score" value={`${profileStrengthScore}/100`} color="text-[#7C3AED]" />
              <KPICard label="Career Readiness Score" value={`${careerReadinessScore}%`} color="text-[#15803D]" />
              <KPICard label="Target Course" value={stream.courses[0]} color="text-[#C2410C]" />
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Career Match Index / Academic Fitness */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-4">
                {isSchool ? "Career Match Index" : "Academic Fitness"}
              </h3>
              {isSchool && profile?.education_level && (
                <p className="text-xs text-slate-500 mb-4 italic">Target: {stream.courses[0]} Computer Science</p>
              )}
              {isSchool ? (
                <div className="space-y-4">
                  {careerMatches.map((career, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">{career.name}</span>
                        <span className="text-sm font-bold" style={{ color: career.color }}>{career.pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${career.pct}%`, background: career.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {academicFitness.map((subject, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">{subject.name}</span>
                        <span className="text-sm font-bold text-[#1B3A6B]">{subject.pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-[#1B3A6B]"
                          style={{ width: `${subject.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column: Subject Readiness / Career Path Readiness */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-4">
                {isSchool ? "Subject Readiness" : "Career Path Readiness"}
              </h3>
              {isSchool ? (
                <div className="space-y-4">
                  {subjectReadiness.map((subject, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">{subject.name}</span>
                        <span className="text-sm font-bold text-[#F59E0B]">{subject.pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-[#F59E0B]"
                          style={{ width: `${subject.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {careerPaths.map((path, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-600">{path.name}</span>
                        <span className="text-sm font-bold text-[#F59E0B]">{path.pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-[#F59E0B]"
                          style={{ width: `${path.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Counselor Recommendation */}
          <div className="lg:col-span-1">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm h-full">
              <h3 className="text-lg font-black text-emerald-800 mb-4">
                {isSchool ? "Counselor Recommendation" : "Counselor Recommendations"}
              </h3>
              <p className="text-sm text-emerald-700 mb-4">
                {isSchool
                  ? `Strong suitability for Commerce and Business pathways based on current performance.`
                  : `Strong suitability for ${stream.courses[0]} and related career pathways based on current performance.`}
              </p>
              <div className="space-y-3">
                {counselorRecs.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ChevronRight size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-emerald-800 font-medium">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Stream Badge */}
        <div className="mt-8">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 inline-flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span className="text-sm text-emerald-800 font-medium">
              Recommended Stream: <span className="font-bold">{isSchool ? "Commerce" : stream.stream}</span>
            </span>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>www.mentormeright.com</span>
          <span className="mx-2">|</span>
          <span>sirishakode@mentormeright.in</span>
          <span className="mx-2">|</span>
          <span>+91-84310 97872</span>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-xl sm:text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}
