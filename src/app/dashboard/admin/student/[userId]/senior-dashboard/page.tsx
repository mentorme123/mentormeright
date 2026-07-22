"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ParameterScores } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, Home } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  education_level: string | null;
  audience_type: string | null;
  phone: string | null;
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

const SUBJECT_KEY_MAP: Record<string, { keys: readonly [string, string]; label: string }> = {
  Mathematics:     { keys: ["Logical", "Numerical"] as const, label: "Mathematics" },
  Physics:         { keys: ["Logical", "Mechanical"] as const, label: "Physics" },
  Chemistry:       { keys: ["Investigative", "Logical"] as const, label: "Chemistry" },
  Biology:         { keys: ["Investigative", "Logical"] as const, label: "Biology" },
  "Computer Science": { keys: ["Logical", "Numerical"] as const, label: "Computer Science" },
  Economics:       { keys: ["Investigative", "Conventional"] as const, label: "Economics" },
  Commerce:        { keys: ["Conventional", "Enterprising"] as const, label: "Commerce" },
  Arts:            { keys: ["Artistic", "Social"] as const, label: "Arts" },
};

const getAcademicFitness = (scores: DashboardScores, selectedSubjects: string[] = []) => {
  const subjects = selectedSubjects.length > 0
    ? selectedSubjects
        .map(name => SUBJECT_KEY_MAP[name])
        .filter(Boolean)
        .map(s => ({ name: s.label, keys: s.keys }))
    : [
        { name: "Mathematics", keys: ["Logical", "Numerical"] as const },
        { name: "Physics", keys: ["Logical", "Mechanical"] as const },
        { name: "Chemistry", keys: ["Investigative", "Logical"] as const },
      ];

  return subjects.map(subject => {
    const score = subject.keys.reduce((sum, key) => sum + (scores[key] || 0), 0);
    const maxPossible = subject.keys.length * MAX_SKILL;
    return { name: subject.name, color: "#1B3A6B", pct: pct(score, maxPossible) };
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

const getCounselorRecommendations = (scores: DashboardScores) => {
  const topSkills = getTopSkills(scores);
  const weakestSkill = [...topSkills].sort((a, b) => a.pct - b.pct)[0];

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

export default function AdminSeniorDashboard({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const userId = params?.userId || "";
  const [scores, setScores] = useState<DashboardScores | null>(null);
  const [report, setReport] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoresMessage, setScoresMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();

        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        setProfile(userProfile || null);

        let resolvedEmail = userProfile?.email || null;
        if (!resolvedEmail) {
          const { data: { user } } = await supabase.auth.getUser();
          resolvedEmail = user?.email || null;
        }
        const emailParam = resolvedEmail ? `&email=${encodeURIComponent(resolvedEmail)}` : '';
        const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(userId)}${emailParam}`);
        const json = await res.json();

        if (!res.ok) {
          setScoresMessage(json.error || 'Unable to load assessment scores.');
          setLoading(false);
          return;
        }

        let normalizedScores = json.scores;
        if (normalizedScores && typeof normalizedScores === 'object') {
          if (typeof normalizedScores.passion === 'object') {
            const flat: Record<string, number> = {};
            const processCategory = (category: any, expectedMax: number) => {
              if (!category || typeof category !== 'object') return;
              Object.entries(category).forEach(([key, val]: [string, any]) => {
                const normalizedKey = key.replace(/\s+/g, '');
                flat[normalizedKey] = ((val?.score ?? 0) / Math.max(val?.max ?? 1, 1)) * expectedMax;
              });
            };
            processCategory(normalizedScores.passion, MAX_RIASEC);
            processCategory(normalizedScores.skills, MAX_SKILL);
            processCategory(normalizedScores.individuality, MAX_SKILL);
            normalizedScores = flat;
          } else if (typeof normalizedScores.Realistic === 'number') {
            const flat: Record<string, number> = {};
            const keyMap: Record<string, string> = {
              Realistic: 'Realistic', Investigative: 'Investigative', Artistic: 'Artistic',
              Social: 'Social', Enterprising: 'Enterprising', Conventional: 'Conventional',
              Logical: 'Logical', Numerical: 'Numerical', Mechanical: 'Mechanical',
              Verbal: 'Verbal', Administrative: 'Administrative',
              EmotionalIntelligence: 'EmotionalIntelligence', Efficiency: 'Efficiency',
              Empathy: 'Empathy', Engagement: 'Engagement', Exploration: 'Exploration',
            };
            Object.entries(normalizedScores).forEach(([k, v]) => {
              const mapped = keyMap[k];
              if (mapped && typeof v === 'number') flat[mapped] = v;
            });
            normalizedScores = flat;
          } else {
            const flat: Record<string, number> = {};
            const walk = (obj: any) => {
              if (!obj || typeof obj !== 'object') return;
              Object.entries(obj).forEach(([k, v]) => {
                if (v && typeof v === 'object' && !(typeof (v as any).score === 'number')) {
                  walk(v);
                } else if (typeof v === 'number') {
                  flat[k.replace(/\s+/g, '')] = v;
                }
              });
            };
            walk(normalizedScores);
            if (Object.keys(flat).length > 0) {
              normalizedScores = flat;
            }
          }
        }

        const hasAnyScore = normalizedScores && Object.values(normalizedScores).some((v: any) => (typeof v === 'number' ? v : 0) > 0);
        if (!hasAnyScore) {
          setScoresMessage('Assessment data was found, but no valid scores could be loaded. Please try retaking the assessment.');
        }

        setScores(normalizedScores);
        setReport(json.report);
        setSubjects((json.subjects || []) as string[]);
      } catch (error) {
        console.error('AdminSeniorDashboard: fetch error', error);
        setScoresMessage('Something went wrong while loading this dashboard. Please refresh or retry.');
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
          <p className="text-slate-600 font-medium">Loading student career dashboard...</p>
        </div>
      </div>
    );
  }

  const displayScores: DashboardScores = scores || {
    Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0,
    Logical: 0, Numerical: 0, Mechanical: 0, Verbal: 0, Administrative: 0,
    EmotionalIntelligence: 0, Efficiency: 0, Empathy: 0, Engagement: 0, Exploration: 0
  };

  const isSchool = false;

  const topRIASEC = getTopRIASEC(displayScores);
  const topSkills = getTopSkills(displayScores);
  const stream = getStreamFromRIASEC(topRIASEC.key);

  const computedCareerMatches = getCareerMatches(displayScores);
  const computedAcademicFitness = getAcademicFitness(displayScores, subjects);
  const computedSubjectReadiness = getSubjectReadiness(displayScores);
  const computedCareerPaths = getCareerPathReadiness(displayScores);

  const adminOverrides = report?.adminOverrides || {};
  const academicFitnessOverride = adminOverrides.academicFitness as Record<string, number> | undefined;
  const careerPathOverride = adminOverrides.careerPathReadiness as Record<string, number> | undefined;

  const academicFitness = academicFitnessOverride
    ? Object.entries(academicFitnessOverride).map(([name, pct]) => ({ name, pct: pct as number, color: "#1B3A6B" }))
    : computedAcademicFitness;

  const careerPaths = careerPathOverride
    ? Object.entries(careerPathOverride).map(([name, pct]) => ({ name, pct: pct as number, color: "#F59E0B" }))
    : computedCareerPaths;

  const overallScore = getOverallScore(displayScores);
  const careerReadinessScore = getCareerReadinessScore(displayScores);
  const profileStrengthScore = Math.round(overallScore * 0.72);

  const counselorRecs = (adminOverrides.counselorRecommendations as string[] | undefined)?.length
    ? (adminOverrides.counselorRecommendations as string[])
    : (report?.nextSteps || getCounselorRecommendations(displayScores));

  return (
    <div className="min-h-screen bg-[#f0f7ff] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-[#0f2460] text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-3">
                <Button
                  onClick={() => router.back()}
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back
                </Button>
                <Button
                  onClick={() => window.location.href = "/dashboard/admin"}
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  <Home size={16} className="mr-2" /> Admin Home
                </Button>
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black mb-1">
                Student Career Dashboard – Class 11 &amp; 12 <span className="text-blue-200 text-lg font-bold">(Admin View)</span>
              </h1>
              <p className="text-blue-200 text-sm">
                {profile?.name ? `${profile.name} — ` : ''}Grades 11 & 12 — Academic fitness, entrance exam tracking & profile strength
              </p>
            </div>
          </div>
        </div>

        {scoresMessage && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 text-sm">
              {scoresMessage}
            </div>
          </div>
        )}

        {/* Student Info */}
        {(profile?.name || profile?.email || profile?.phone || profile?.education_level) && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-lg text-slate-700">
              {profile?.name && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xl">Name:</span>
                  <span className="font-semibold text-xl">{profile.name}</span>
                </div>
              )}
              {profile?.email && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xl">Email:</span>
                  <span className="font-semibold text-xl">{profile.email}</span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xl">Phone:</span>
                  <span className="font-semibold text-xl">{profile.phone}</span>
                </div>
              )}
              {profile?.education_level && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xl">Grade:</span>
                  <span className="font-semibold text-xl">{profile.education_level}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard label="Overall Academic Fit" value={`${pct(topSkills.reduce((s, sk) => s + sk.score, 0), topSkills.length * MAX_SKILL)}%`} color="text-[#1B3A6B]" bg="bg-blue-50" />
          <KPICard label="Profile Strength Score" value={`${profileStrengthScore}/100`} color="text-[#7C3AED]" bg="bg-purple-50" />
          <KPICard label="Career Readiness Score" value={`${careerReadinessScore}%`} color="text-[#15803D]" bg="bg-emerald-50" />
          <KPICard label="Target Course" value={report?.educationPathways?.degrees?.[0] || stream.courses[0]} color="text-[#C2410C]" bg="bg-orange-50" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Academic Fitness */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-4">
                Academic Fitness
              </h3>
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
            </div>
          </div>

          {/* Middle Column: Career Path Readiness */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-4">
                Career Path Readiness
              </h3>
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
            </div>
          </div>

          {/* Right Column: Counselor Recommendation */}
          <div className="lg:col-span-1">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm h-full">
              <h3 className="text-lg font-black text-emerald-800 mb-4">
                Counselor Recommendations
              </h3>
              <p className="text-sm text-emerald-700 mb-4">
                Strong suitability for {stream.courses[0]} and related career pathways based on current performance.
              </p>
              <div className="space-y-3">
                {(counselorRecs || []).map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <ChevronRight size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-emerald-800 font-medium">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <a href="https://www.mentormeright.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 underline">www.mentormeright.com</a>
          <span className="mx-2">|</span>
          <a href="mailto:admin@mentormeright.in" className="hover:text-slate-600 underline">admin@mentormeright.in</a>
          <span className="mx-2">|</span>
          <a href="tel:+919392707596" className="hover:text-slate-600 underline">+91-9392707596</a>
          <span className="mx-2">|</span>
          <a href="tel:+918188824440" className="hover:text-slate-600 underline">+91-8188824440</a>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, color, bg }: { label: string; value: string; color: string; bg?: string }) {
  return (
    <div className={`rounded-2xl p-4 sm:p-6 border shadow-sm ${bg || 'bg-white'} border-slate-200`}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-xl sm:text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}
