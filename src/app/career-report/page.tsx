"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Download, ArrowLeft, Printer } from "lucide-react";

interface V4Data {
  student: {
    name: string;
    grade: number;
    school: string;
    city: string;
    assessmentDate: string;
    aspirationalCareer: string;
  };
  scores: Record<string, number>;
}

function CareerReportContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [data, setData] = useState<V4Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/admin/user-scores?userId=${encodeURIComponent(userId)}`
        );
        const json = await res.json();

        if (!res.ok || !json.scores) {
          setError(json.error || "No assessment data found for this user.");
          setLoading(false);
          return;
        }

        console.log("[CareerReport] Raw API response:", JSON.stringify(json, null, 2));
        const v4Data = transformToV4(json);
        console.log("[CareerReport] Transformed V4 data:", JSON.stringify(v4Data, null, 2));
        setData(v4Data);
      } catch (e) {
        console.error("[CareerReport] Fetch error", e);
        setError("Failed to load assessment data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!data || !iframeRef.current) return;

    const sendData = () => {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          { type: "generateReport", payload: data },
          "*"
        );
      } catch (e) {
        console.error("Failed to send data to career report engine", e);
      }
    };

    sendData();

    const iframe = iframeRef.current;
    iframe.addEventListener("load", sendData);

    return () => {
      iframe.removeEventListener("load", sendData);
    };
  }, [data]);

  const handleDownloadPDF = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    } else {
      window.print();
    }
  };

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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Unable to Load Report
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef2f6] flex flex-col">
      {/* Fixed top toolbar for report actions */}
      <header className="sticky top-0 z-50 bg-[#0d2545] text-white px-4 py-3 shadow-md flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white">
              Mentor<span className="text-[#00a6a6]">Me</span> Career Intelligence Report
            </h1>
            {data?.student?.name && (
              <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00a6a6]/20 text-[#00a6a6] border border-[#00a6a6]/30">
                {data.student.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-[#00a6a6] hover:bg-[#008e8e] active:scale-95 text-white px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            title="Download report as PDF or Print"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Main Report Document Container */}
      <div className="flex-1 w-full">
        <iframe
          ref={iframeRef}
          src="/career-report-v2.html"
          title="Career Report"
          className="w-full border-0"
          style={{ height: "calc(100vh - 57px)", minHeight: "600px" }}
        />
      </div>
    </div>
  );
}

export default function CareerReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">Loading career report...</p>
          </div>
        </div>
      }
    >
      <CareerReportContent />
    </Suspense>
  );
}

function transformToV4(apiData: any): V4Data {
  const scores = normalizeScoresForV4(apiData.scores);

  const userClass = apiData.userClass || "";
  const gradeMatch = userClass.match(/(\d+)/);
  const grade = gradeMatch ? parseInt(gradeMatch[1], 10) : 0;

  const assessmentDate = apiData.completedAt
    ? new Date(apiData.completedAt).toISOString().split("T")[0]
    : "";

  const aspirationalCareer =
    apiData.report?.aspirationalCareer || apiData.report?.aspirational_career || "";

  return {
    student: {
      name: apiData.userName || "Student",
      grade,
      school: apiData.userSchool || apiData.userName || "",
      city: "",
      assessmentDate,
      aspirationalCareer,
    },
    scores,
  };
}

function normalizeScoresForV4(
  scores: any
): Record<string, number> {
  const result: Record<string, number> = {};

  if (!scores || typeof scores !== "object") {
    return result;
  }

  let flatScores: Record<string, number> = {};
  let flatMax: Record<string, number> = {};

  const canonicalKeyMap: Record<string, string> = {
    administrative: "Administrative",
    numerical: "Numerical",
    logical: "Logical",
    mechanical: "Mechanical",
    verbal: "Verbal",
    realistic: "Realistic",
    investigative: "Investigative",
    artistic: "Artistic",
    social: "Social",
    enterprising: "Enterprising",
    conventional: "Conventional",
    empathy: "Empathy",
    emotionalintelligence: "Emotional Intelligence",
    emotional_intelligence: "Emotional Intelligence",
    "emotional intelligence": "Emotional Intelligence",
    ei: "Emotional Intelligence",
    engagement: "Engagement",
    exploration: "Exploration",
    extraversion: "Efficiency",
    efficiency: "Efficiency",
  };

  const getCanonicalKey = (k: string): string => {
    const clean = k.toLowerCase().replace(/[\s_]+/g, "");
    return canonicalKeyMap[clean] || canonicalKeyMap[k.toLowerCase()] || k;
  };

  if (
    typeof scores.passion === "object" ||
    typeof scores.riasec === "object" ||
    typeof scores.skills === "object" ||
    typeof scores.individuality === "object"
  ) {
    ["passion", "riasec", "skills", "individuality"].forEach((cat) => {
      const category = scores[cat];
      if (category && typeof category === "object") {
        Object.entries(category).forEach(([key, val]: [string, any]) => {
          const canonical = getCanonicalKey(key);
          if (typeof val === "object" && val !== null) {
            flatScores[canonical] = typeof val.score === "number" ? val.score : 0;
            flatMax[canonical] = typeof val.max === "number" ? val.max : 100;
          } else if (typeof val === "number") {
            flatScores[canonical] = val;
            flatMax[canonical] = 100;
          }
        });
      }
    });
  } else if (typeof scores.Realistic === "number" || typeof scores.conventional === "number") {
    Object.entries(scores).forEach(([k, v]) => {
      const canonical = getCanonicalKey(k);
      if (typeof v === "number") {
        flatScores[canonical] = v;
        flatMax[canonical] = 100;
      }
    });
  } else {
    const walk = (obj: any) => {
      if (!obj || typeof obj !== "object") return;
      Object.entries(obj).forEach(([k, v]) => {
        if (
          v &&
          typeof v === "object" &&
          !(typeof (v as any).score === "number")
        ) {
          walk(v);
        } else if (typeof v === "number") {
          const canonical = getCanonicalKey(k);
          flatScores[canonical] = v;
          flatMax[canonical] = flatMax[canonical] || 100;
        }
      });
    };
    walk(scores);
  }

  const hardcodedMaxMap: Record<string, number> = {
    Realistic: 5,
    Investigative: 5,
    Artistic: 5,
    Social: 5,
    Enterprising: 5,
    Conventional: 5,
    "Emotional Intelligence": 6,
    EmotionalIntelligence: 6,
    Efficiency: 6,
    Extraversion: 6,
    Empathy: 6,
    Engagement: 6,
    Exploration: 6,
    Logical: 24,
    Numerical: 24,
    Mechanical: 24,
    Verbal: 24,
    Administrative: 24,
  };

  Object.entries(flatScores).forEach(([key, value]) => {
    const fallbackMax = hardcodedMaxMap[key] || hardcodedMaxMap[key.replace(/ /g, "_")] || hardcodedMaxMap[key.replace(/_/g, " ")] || 100;
    const dbMax = flatMax[key];
    const max = (dbMax && dbMax !== 100) ? dbMax : fallbackMax;

    let pct: number;
    if (value > max && max !== 100) {
      pct = Math.min(100, Math.max(0, Math.round(value)));
    } else {
      pct = Math.min(100, Math.max(0, Math.round((value / Math.max(max, 0.01)) * 100)));
    }

    console.log(`[CareerReport] ${key}: raw=${value}, max=${max}, pct=${pct}%`);
    result[key] = pct;
  });

  if (result.Efficiency !== undefined && result.Extraversion === undefined) {
    result.Extraversion = result.Efficiency;
  }
  if (result.Extraversion !== undefined && result.Efficiency === undefined) {
    result.Efficiency = result.Extraversion;
  }
  if (result.EmotionalIntelligence !== undefined && result["Emotional Intelligence"] === undefined) {
    result["Emotional Intelligence"] = result.EmotionalIntelligence;
  }
  if (result["Emotional Intelligence"] !== undefined && result.EmotionalIntelligence === undefined) {
    result.EmotionalIntelligence = result["Emotional Intelligence"];
  }

  const v4Params = [
    "Administrative",
    "Numerical",
    "Logical",
    "Mechanical",
    "Verbal",
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Enterprising",
    "Conventional",
    "Empathy",
    "Emotional Intelligence",
    "Engagement",
    "Exploration",
    "Efficiency",
  ];

  v4Params.forEach((p) => {
    if (result[p] === undefined) {
      result[p] = 0;
    }
  });

  return result;
}
