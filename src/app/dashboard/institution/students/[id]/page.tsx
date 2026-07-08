import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StudentViewPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }

  const { data: student } = await supabase
    .from("users")
    .select("id, name, email, education_level, role, created_at")
    .eq("id", params.id)
    .single();

  if (!student) {
    notFound();
  }

  const { data: assessment } = await supabase
    .from("assessment_results")
    .select("report, scores, completed_at")
    .eq("user_id", params.id)
    .order("completed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const report = assessment?.report as Record<string, unknown> | null;
  const scores = assessment?.scores as Record<string, number> | null;

  const getGradeLabel = (level: string | null) => {
    if (!level) return "N/A";
    const lower = level.toLowerCase();
    if (lower.includes("school") || lower.includes("9") || lower.includes("10") || lower.includes("11") || lower.includes("12")) {
      return lower.includes("college") || lower.includes("undergrad") || lower.includes("graduate") ? "11 & 12" : "9 & 10";
    }
    return "9 & 10";
  };

  const gradeLabel = getGradeLabel(student.education_level);
  const is912 = gradeLabel === "11 & 12";

  const careerMatches = (report?.careerMatches || report?.excellentFitCareers || []) as Array<Record<string, unknown>>;
  const subjectReadiness = (report?.coreStrengths || []) as Array<Record<string, number | string>>;
  const recommendations = (report?.nextSteps || report?.areasToDevelop || []) as string[];
  const stream = report?.academicRoadmap?.recommendedStream as string | undefined;

  return (
    <div className="min-h-screen bg-white pt-8 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard/institution"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </a>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Student Career Dashboard</h1>
            <p className="text-sm text-slate-500">{student.name} • {student.email}</p>
          </div>
        </div>

        {!report ? (
          <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-200 text-center">
            <p className="text-slate-500 font-medium text-lg">No assessment completed yet.</p>
            <p className="text-sm text-slate-400 mt-2">This student has not taken the career assessment.</p>
          </div>
        ) : (
          <>
            <div className="relative bg-gradient-to-r from-blue-900 to-brand-blue rounded-3xl p-8 md:p-10 text-white shadow-xl overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black leading-tight">
                  Student Career Dashboard (sample only) — Class {gradeLabel}
                </h2>
                <p className="text-blue-100 text-sm md:text-base mt-2">
                  {is912
                    ? "Grades 11 & 12 — Academic fitness, entrance exam tracking & profile strength"
                    : "Grades 9 & 10 — Career pathway discovery, stream readiness & academic improvement areas"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {is912 ? (
                <>
                  <MetricCard
                    label="Overall Academic Fit"
                    value={`${Math.round(((scores?.Logical || 0) + (scores?.Numerical || 0)) / 48 * 100)}%`}
                    valueColor="text-blue-800"
                  />
                  <MetricCard
                    label="Profile Strength Score"
                    value={`${Math.round(((scores?.Engagement || 0) + (scores?.Exploration || 0)) / 48 * 100)}/100`}
                    valueColor="text-purple-700"
                  />
                  <MetricCard
                    label="Career Readiness Score"
                    value={`${Math.round(((scores?.Enterprising || 0) + (scores?.Social || 0)) / 40 * 100)}%`}
                    valueColor="text-emerald-700"
                  />
                  <MetricCard
                    label="Target Course"
                    value={stream || "B.Tech"}
                    valueColor="text-orange-700"
                  />
                </>
              ) : (
                <>
                  <MetricCard
                    label="Career Clarity Score"
                    value={`${Math.round((scores?.Enterprising || 0) / 20 * 100)}%`}
                    valueColor="text-blue-800"
                  />
                  <MetricCard
                    label="Recommended Stream"
                    value={stream || "Commerce"}
                    valueColor="text-emerald-700"
                  />
                  <MetricCard
                    label="Subject Readiness"
                    value={`${Math.round((scores?.Conventional || 0) / 20 * 100)}%`}
                    valueColor="text-purple-700"
                  />
                  <MetricCard
                    label="Personality & Interest Alignment"
                    value={`${Math.round((scores?.Social || 0) / 20 * 100)}%`}
                    valueColor="text-orange-700"
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {is912 ? (
                <>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 mb-5">Academic Fitness</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">Target: {stream || "B.Tech Computer Science"}</p>
                    <div className="space-y-5">
                      {(subjectReadiness.slice(0, 3) as Array<{name: string; score: number; max: number}>).map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-700">{item.name}</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-blue rounded-full"
                              style={{ width: `${Math.round((item.score) / (item.max) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-orange-700 mb-5">Career Path Readiness</h3>
                    <div className="space-y-4">
                      {careerMatches.slice(0, 5).map((match, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-700">{match.title ? String(match.title) : match.industry ? String(match.industry) : ""}</span>
                            <span className="font-black text-orange-600">
                              {Math.round((typeof match.matchScore === 'string' ? parseInt(match.matchScore) : (match.salary ? 88 : 84)) / 100 * 100)}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full"
                              style={{ width: `${Math.round((typeof match.matchScore === 'string' ? parseInt(match.matchScore) : (match.salary ? 88 : 84)) / 100 * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {stream && (
                      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-sm">✓ Recommended Stream: {stream}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-emerald-700 mb-5">Counselor Recommendations</h3>
                    {recommendations.length > 0 ? (
                      <ul className="space-y-4">
                        {recommendations.slice(0, 4).map((step, i) => (
                          <li key={i} className="text-sm text-slate-700 font-medium flex items-start gap-2">
                            <span className="text-emerald-600 mt-0.5 font-bold">→</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500">No recommendations available.</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 mb-5">Career Match Index</h3>
                    <div className="space-y-4">
                      {careerMatches.slice(0, 4).map((match, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-700">{match.title ? String(match.title) : match.industry ? String(match.industry) : ""}</span>
                            <span className="font-black text-slate-800">
                              {Math.round((typeof match.matchScore === 'string' ? parseInt(match.matchScore) : (match.salary ? 87 : 82)) / 100 * 100)}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-blue rounded-full"
                              style={{ width: `${Math.round((typeof match.matchScore === 'string' ? parseInt(match.matchScore) : (match.salary ? 87 : 82)) / 100 * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-orange-700 mb-5">Subject Readiness</h3>
                    <div className="space-y-4">
                      {subjectReadiness.slice(0, 4).map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-700">{item.name ? String(item.name) : ""}</span>
                            <span className="font-black text-orange-600">{Math.round((item.score as number) / (item.max as number) * 100)}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full"
                              style={{ width: `${Math.round((item.score as number) / (item.max as number) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {stream && (
                      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-sm">✓ Recommended Stream: {stream}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
                    <h3 className="text-lg font-black text-emerald-700 mb-5">Counselor Recommendation</h3>
                    {recommendations.length > 0 ? (
                      <ul className="space-y-3">
                        {recommendations.slice(0, 4).map((step, i) => (
                          <li key={i} className="text-sm text-slate-700 font-medium flex items-start gap-2">
                            <span className="text-emerald-600 mt-0.5 font-bold">→</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500">No recommendations available.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-3xl font-black ${valueColor || "text-slate-800"}`}>{value}</p>
    </div>
  );
}
