"use client";

import { useEffect, useState, useRef } from "react";

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

export default function CareerReportPage({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const userId = searchParams?.userId;
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

        console.log("[CareerReport] API response for userId", userId, json);
        const v4Data = transformToV4(json);
        console.log("[CareerReport] Transformed V4 data", v4Data);
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

    const handleLoad = () => {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          { type: "generateReport", payload: data },
          "*"
        );
      } catch (e) {
        console.error("Failed to send data to career report engine", e);
      }
    };

    const iframe = iframeRef.current;
    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [data]);

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
    <div className="min-h-screen bg-[#eef2f6]">
      <iframe
        ref={iframeRef}
        src="/career-report-v2.html"
        title="Career Report"
        className="w-full border-0"
        style={{ height: "100vh" }}
      />
    </div>
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

  if (
    typeof scores.passion === "object" ||
    typeof scores.skills === "object" ||
    typeof scores.individuality === "object"
  ) {
    ["passion", "skills", "individuality"].forEach((cat) => {
      const category = scores[cat];
      if (category && typeof category === "object") {
        Object.entries(category).forEach(([key, val]: [string, any]) => {
          flatScores[key] =
            typeof val === "object" ? (val?.score ?? 0) : (val ?? 0);
        });
      }
    });
  } else if (typeof scores.Realistic === "number") {
    flatScores = { ...scores };
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
          flatScores[k] = v;
        }
      });
    };
    walk(scores);
  }

  const maxMap: Record<string, number> = {
    Realistic: 5,
    Investigative: 5,
    Artistic: 5,
    Social: 5,
    Enterprising: 5,
    Conventional: 5,
    "Emotional Intelligence": 6,
    Efficiency: 6,
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
    const max = maxMap[key] || maxMap[key.replace(/ /g, "_")] || 100;
    result[key] = Math.round((value / max) * 100);
  });

  if (result.Efficiency !== undefined) {
    result.Extraversion = result.Efficiency;
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
    "Extraversion",
  ];

  v4Params.forEach((p) => {
    if (result[p] === undefined) {
      result[p] = 0;
    }
  });

  return result;
}
