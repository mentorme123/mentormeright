"use client";

import { useEffect, useState } from "react";
import { ParameterScores } from "@/lib/scoring";
import { ReportGeneratorData, mapAssessmentToReportGenerator } from "@/lib/report-generator-mapper";

const CAREER_DB: Record<string, {
  fit: "best" | "conditional" | "aspirational";
  riasec: string[];
  skills: string[];
  salaryEarly: string;
  salaryGrowth: string;
  salaryLead: string;
  rationale: string;
  stream: string;
  exam: string;
  colleges: string[];
  ugDegree: string;
  pgDegree: string;
  cost: string;
}> = {
  "Medicine / MBBS": {
    fit: "best",
    riasec: ["realistic", "investigative"],
    skills: ["numerical", "logical"],
    salaryEarly: "₹8L–₹15L+",
    salaryGrowth: "₹18L–₹40L+",
    salaryLead: "₹50L–₹1.5Cr+",
    rationale:
      "Realistic + Investigative RIASEC is the archetypal medical profile: hands-on clinical work combined with deep analytical diagnosis.",
    stream: "Science with PCB (Biology mandatory)",
    exam: "NEET UG",
    colleges: ["AIIMS New Delhi", "JIPMER Puducherry", "Osmania Medical College Hyderabad"],
    ugDegree: "MBBS (5.5 Years)",
    pgDegree: "MD/MS via NEET PG",
    cost: "₹5L–₹15L (Govt) / ₹50L–₹1Cr+ (Private)",
  },
  "Software Engineering": {
    fit: "best",
    riasec: ["investigative", "conventional"],
    skills: ["logical", "numerical"],
    salaryEarly: "₹6L–₹15L+",
    salaryGrowth: "₹18L–₹45L+",
    salaryLead: "₹50L–₹2Cr+",
    rationale:
      "Investigative + Conventional is the core software engineering profile. Logical and Numerical skills directly power algorithm design.",
    stream: "Science with PCM; Computer Science preferred",
    exam: "JEE Main / BITSAT / College Specific",
    colleges: ["IIT (via JEE Advanced)", "BITS Pilani", "NIT Trichy / Warangal", "VIT Vellore"],
    ugDegree: "B.Tech Computer Science / IT (4 Years)",
    pgDegree: "M.Tech CS / MBA (IIMs) / MS (USA/Europe)",
    cost: "₹5L–₹12L (NIT) / ₹12L–₹28L (Private)",
  },
  "Data Science / AI": {
    fit: "conditional",
    riasec: ["investigative", "conventional"],
    skills: ["logical", "numerical"],
    salaryEarly: "₹8L–₹18L+",
    salaryGrowth: "₹20L–₹50L+",
    salaryLead: "₹60L–₹2Cr+",
    rationale:
      "Investigative + Conventional is the data science profile. Strong Logical and Numerical skills are mandatory for machine learning.",
    stream: "Science with PCM; Computer Science a strong plus",
    exam: "JEE / CUET / College specific",
    colleges: ["IIT (CSE with specialisation)", "IIIT Hyderabad", "NIT CS", "VIT / SRM Data Science"],
    ugDegree: "B.Tech CS / B.Sc. Data Science (3–4 Years)",
    pgDegree: "M.Tech AI/ML / MS (USA) / MTech IIT",
    cost: "₹5L–₹20L",
  },
  "Business Management": {
    fit: "best",
    riasec: ["enterprising", "social", "conventional"],
    skills: ["administrative", "numerical", "verbal"],
    salaryEarly: "₹5L–₹10L+",
    salaryGrowth: "₹12L–₹25L+",
    salaryLead: "₹30L–₹80L+",
    rationale:
      "Enterprising + Social + Conventional is the management profile. Administrative and Numerical skills support planning and budgeting.",
    stream: "Commerce / Science / Arts (any)",
    exam: "IPMAT / CUET / DU JAT / SET",
    colleges: ["IIM Indore (IPM)", "Symbiosis Pune", "NMIMS Mumbai", "Christ University Bangalore"],
    ugDegree: "BBA / BMS (3 Years)",
    pgDegree: "MBA (IIM via CAT)",
    cost: "₹4L–₹20L (UG) / ₹15L–₹35L (MBA)",
  },
};

const ALL_CAREERS = Object.keys(CAREER_DB);

export default function MentorMeReport({ userId }: { userId: string }) {
  const [data, setData] = useState<ReportGeneratorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/user-scores?userId=${encodeURIComponent(userId)}`);
        const json: any = await res.json();
        if (!res.ok || !json.scores) {
          console.error("Failed to load report:", json.error);
          setLoading(false);
          return;
        }

        const reportData = mapAssessmentToReportGenerator(
          (json.scores || {}) as ParameterScores,
          json.userName || json.userEmail?.split("@")[0] || "Student",
          json.userClass || "N/A",
          json.userClass || "",
          "",
          json.completedAt ? new Date(json.completedAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          [],
          "",
          ""
        );

        setData(reportData);
      } catch (e) {
        console.error("Failed to load report:", e);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading career report...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 font-medium">No assessment data found for this user.</p>
        </div>
      </div>
    );
  }

  const careers = analyzeCareer(data);
  const summary = generateExecutiveSummary(data);
  const topSkills = getTopTraits(data.skills, 5);
  const topIndiv = getTopTraits(data.individuality, 4);
  const topRiasec = getTopTraits(data.riasec, 3);
  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const allCareersList = [...careers.best, ...careers.conditional];
  const examList = allCareersList
    .map((c) => CAREER_DB[c.replace(/ \(Parent.*\)$/, "")]?.exam)
    .filter((x): x is string => Boolean(x));
  const uniqueExams = Array.from(new Set(examList)).slice(0, 5);

  const educationList = allCareersList
    .slice(0, 3)
    .map((c) => CAREER_DB[c.replace(/ \(Parent.*\)$/, "")])
    .filter((x): x is typeof CAREER_DB[string] => Boolean(x));

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden">
        {/* Cover */}
        <div className="bg-gradient-to-br from-[#1B3A6B] to-[#2A5298] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E8762C]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Premium Career Intelligence & Future Readiness Assessment
            </div>
            <h1 className="text-3xl font-extrabold mb-2 font-['Poppins']">CAREER STRATEGY REPORT</h1>
            <p className="text-sm text-white/60 mb-6 italic">
              Confidential · Generated by MentorMe Career Intelligence & Training Pvt. Ltd.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E8762C] flex items-center justify-center font-bold text-lg">
                {initials}
              </div>
              <div>
                <div className="font-bold text-lg">{data.name}</div>
                <div className="text-sm text-white/60">
                  {[data.grade, data.school, data.age ? `Age ${data.age}` : "", data.date]
                    .filter(Boolean)
                    .join("  ·  ")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* 1. Executive Summary */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              1. EXECUTIVE SUMMARY
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">{summary}</p>
            {data.notes && (
              <p className="text-sm text-slate-500 italic">Counsellor Notes: {data.notes}</p>
            )}
            <div className="mt-4 bg-[#F0FDF4] border-l-3 border-[#2E9E8F] p-3 rounded-r-lg text-sm text-[#155E3E]">
              <strong>Recommended Stream (Grade 11–12):</strong> {getPrimaryStream(topRiasec)}
            </div>
          </section>

          {/* 2. Career Personality Snapshot */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              2. CAREER PERSONALITY SNAPSHOT
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-xs font-bold text-[#1B3A6B] uppercase tracking-wider mb-3">
                  Skill Proficiency
                </h3>
                <div className="space-y-2">
                  {topSkills.map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600 w-32">{t.label}</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#1B3A6B]"
                          style={{ width: `${t.val}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-[#1B3A6B] w-10 text-right">{t.val}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-xs font-bold text-[#1B3A6B] uppercase tracking-wider mb-3">
                  Individuality Profile
                </h3>
                <div className="space-y-2">
                  {topIndiv.map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600 w-32">{t.label}</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3DBDAA] to-[#2E9E8F]"
                          style={{ width: `${t.val}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-[#1B3A6B] w-10 text-right">{t.val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. RIASEC */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              3. RIASEC INTEREST PROFILE
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(data.riasec).map(([key, val]) => {
                const labels: Record<string, string> = {
                  realistic: "Realistic",
                  investigative: "Investigative",
                  artistic: "Artistic",
                  social: "Social",
                  enterprising: "Enterprising",
                  conventional: "Conventional",
                };
                const letters: Record<string, string> = {
                  realistic: "R",
                  investigative: "I",
                  artistic: "A",
                  social: "S",
                  enterprising: "E",
                  conventional: "C",
                };
                return (
                  <div key={key} className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-extrabold text-[#1B3A6B] font-['Poppins']">{letters[key]}</div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">{labels[key]}</div>
                    <div className={`text-lg font-bold ${getRIASECColorClass(val)}`}>{val}%</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. Career Pathways */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              4. CAREER PATHWAYS — MATCHED TO PROFILE
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    <th className="px-3 py-2 text-left text-xs font-semibold">Career</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Early (0–5y)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Growth (5–12y)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Leadership (12y+)</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Why It Fits</th>
                  </tr>
                </thead>
                <tbody>
                  {[...careers.best, ...careers.conditional].slice(0, 4).map((c) => {
                    const key = c.replace(/ \(Parent.*\)$/, "");
                    const info = CAREER_DB[key];
                    if (!info) return null;
                    return (
                      <tr key={c} className="border-b border-slate-100">
                        <td className="px-3 py-2 font-semibold text-slate-800">{c}</td>
                        <td className="px-3 py-2 text-slate-600">{info.salaryEarly}</td>
                        <td className="px-3 py-2 text-slate-600">{info.salaryGrowth}</td>
                        <td className="px-3 py-2 text-slate-600">{info.salaryLead}</td>
                        <td className="px-3 py-2 text-xs text-slate-500">{info.rationale}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Academic Roadmap */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              5. ACADEMIC ROADMAP
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    <th className="px-3 py-2 text-left text-xs font-semibold w-1/3">Stage</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 font-semibold text-slate-800">Grade 11–12 Stream</td>
                    <td className="px-3 py-2 text-slate-600">{getPrimaryStream(topRiasec)}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 font-semibold text-slate-800">Focus Subjects</td>
                    <td className="px-3 py-2 text-slate-600">
                      Develop <strong>{topSkills[0]?.label}</strong> skills (current: {topSkills[0]?.val}%) as highest priority.
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-3 py-2 font-semibold text-slate-800">Skill Development</td>
                    <td className="px-3 py-2 text-slate-600">
                      Begin domain-specific online courses. Participate in Olympiads. Seek internship experience by Grade 12.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold text-slate-800">Extra-Curricular</td>
                    <td className="px-3 py-2 text-slate-600">
                      Science exhibitions, NCC, community service, school committee roles.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Entrance Exams */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              6. ENTRANCE EXAMS & PREPARATION
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    <th className="px-3 py-2 text-left text-xs font-semibold w-1/3">Exam</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Preparation Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueExams.map((exam, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="px-3 py-2 font-semibold text-slate-800">{exam}</td>
                      <td className="px-3 py-2 text-slate-600">Refer detailed preparation plan during counselling session</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. Recommended Colleges */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              7. RECOMMENDED COLLEGES
            </h2>
            <div className="space-y-3">
              {[...careers.best, ...careers.conditional].slice(0, 3).map((c) => {
                const key = c.replace(/ \(Parent.*\)$/, "");
                const info = CAREER_DB[key];
                if (!info) return null;
                return (
                  <div key={c} className="mb-2">
                    <div className="text-sm font-bold text-[#1B3A6B] mb-1">{c}</div>
                    <div className="flex flex-wrap gap-2">
                      {info.colleges.map((college) => (
                        <span
                          key={college}
                          className="bg-[#EEF2FF] text-[#1B3A6B] px-2 py-1 rounded-full text-xs font-semibold"
                        >
                          {college}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 8. Education Investment */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              8. EDUCATION INVESTMENT PLANNING
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1B3A6B] text-white">
                    <th className="px-3 py-2 text-left text-xs font-semibold">Programme</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold">Estimated Cost (India)</th>
                  </tr>
                </thead>
                <tbody>
                  {educationList.map((info, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="px-3 py-2 text-slate-800">{info.ugDegree}</td>
                      <td className="px-3 py-2 text-[#2E9E8F] font-semibold">{info.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-[#FFF8F0] border-l-3 border-[#E8762C] p-3 rounded-r-lg text-xs text-[#7C4A00]">
              <strong>Funding:</strong> National Scholarship Portal (NSP), Vidya Lakshmi Portal, SBI Scholar Loan (8–10% p.a.),
              Institution Merit Scholarships, SC/ST/OBC Fee Waivers. Always apply early — scholarship deadlines are strict.
            </div>
          </section>

          {/* 9. Next Steps */}
          <section>
            <h2 className="text-lg font-bold text-[#1B3A6B] border-b-2 border-slate-200 pb-2 mb-4 font-['Poppins']">
              9. NEXT STEPS
            </h2>
            <p className="text-sm text-slate-700 mb-2">
              To receive a personalised and detailed roadmap, book a one-on-one counselling session with the MentorMe expert team.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Detailed education roadmap and stream selection clarity</li>
              <li>Best-fit colleges in India or abroad based on academic progression</li>
              <li>Entrance exam preparation plan with subject-wise milestone targets</li>
              <li>Financial planning and scholarship application support</li>
              <li>SOP writing, interview preparation, and college application guidance</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1B3A6B] to-[#2A5298] rounded-xl p-6 text-center text-white">
            <h4 className="font-bold text-lg mb-1">Connect with MentorMe Career Intelligence & Training Pvt. Ltd.</h4>
            <p className="text-sm text-white/70 mb-2">Turning Passions into Professions</p>
            <div className="text-sm font-semibold text-[#E8762C]">
              www.mentormeright.com &nbsp;|&nbsp; +91 8188824440 &nbsp;|&nbsp; admin@mentormeright.in
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-200 pt-3 italic">
            DISCLAIMER: This Career Guidance Report has been prepared by MentorMe Career Intelligence & Training Pvt. Ltd.
            based on psychometric assessment results provided at the time of evaluation. The report is intended for educational
            and career planning purposes only. MentorMe does not guarantee specific career or academic outcomes.
          </div>
        </div>
      </div>
    </div>
  );
}

function analyzeCareer(data: ReportGeneratorData) {
  const results = { best: [] as string[], conditional: [] as string[], aspirational: [] as string[] };

  Object.entries(CAREER_DB).forEach(([name, info]) => {
    let score = 0;
    info.riasec.forEach((r) => { score += ((data.riasec as any)[r] || 0) * 0.6; });
    info.skills.forEach((s) => { score += ((data.skills as any)[s] || 0) * 0.4; });
    const normalized = score / (info.riasec.length + info.skills.length);

    if (normalized >= 35) results.best.push(name);
    else if (normalized >= 20) results.conditional.push(name);
    else if (info.fit === "aspirational") results.aspirational.push(name);
  });

  if (data.parentCareer) {
    const match = ALL_CAREERS.find((c) => data.parentCareer.toLowerCase().includes(c.toLowerCase().split("/")[0].trim()));
    if (match && !results.aspirational.includes(match)) {
      results.aspirational.push(match + " (Parent's Choice)");
    }
  }

  return results;
}

function generateExecutiveSummary(data: ReportGeneratorData): string {
  const name = data.name.split(" ")[0];
  const topRiasec = getTopTraits(data.riasec, 2);
  const riasecDesc = topRiasec.map((t) => t.label).join("–") || "Balanced";
  const topSkill = getTopTraits(data.skills, 1)[0];
  const topIndiv = getTopTraits(data.individuality, 1)[0];

  return `${name} demonstrates a strong ${riasecDesc} personality orientation with a pronounced interest in ${topRiasec.map((t) => t.label.toLowerCase()).join(" and ")} environments. ${topSkill ? `The highest demonstrated skill is ${topSkill.label} (${topSkill.val}%), reflecting structured, precision-driven thinking.` : ""} ${topIndiv ? `${name}'s strongest personal trait is ${topIndiv.label} (${topIndiv.val}%), indicating strong interpersonal sensitivity and emotional regulation.` : ""} The assessment indicates strong long-term alignment with multiple professional pathways. This report provides a structured, evidence-based roadmap across academic planning, entrance examinations, college selection, and career development.`;
}

function getTopTraits(traits: Record<string, number>, n = 3): { label: string; val: number }[] {
  return Object.entries(traits)
    .map(([key, val]) => ({ label: key, val }))
    .sort((a, b) => b.val - a.val)
    .slice(0, n);
}

function getRIASECColorClass(val: number): string {
  if (val >= 50) return "text-[#2E9E8F]";
  if (val >= 30) return "text-[#E8762C]";
  return "text-slate-400";
}

function getPrimaryStream(topRiasec: { label: string; val: number }[]): string {
  const top = topRiasec[0]?.label.toLowerCase() || "";
  if (top.includes("realistic") && top.includes("investigative")) return "Science with PCM / Engineering";
  if (top.includes("investigative") && top.includes("artistic")) return "Arts / Humanities / Design";
  if (top.includes("social") && top.includes("enterprising")) return "Commerce / Business / Law";
  if (top.includes("enterprising") && top.includes("conventional")) return "Commerce / Finance / IT";
  if (top.includes("investigative")) return "Science (PCB) / Engineering";
  if (top.includes("artistic")) return "Arts / Humanities / Design";
  if (top.includes("social")) return "Arts / Commerce / Psychology";
  if (top.includes("enterprising")) return "Commerce / Business / Law";
  if (top.includes("conventional")) return "Commerce / Finance / IT";
  if (top.includes("realistic")) return "Science (PCM) / Engineering";
  return "Science with PCM";
}
