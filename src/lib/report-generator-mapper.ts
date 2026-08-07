import { ParameterScores } from "@/lib/scoring";

export interface ReportGeneratorData {
  name: string;
  grade: string;
  school: string;
  age: string;
  date: string;
  individuality: {
    engagement: number;
    empathy: number;
    ei: number;
    exploration: number;
  };
  skills: {
    administrative: number;
    numerical: number;
    logical: number;
    mechanical: number;
    verbal: number;
  };
  riasec: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
  };
  preferredCareers: string[];
  parentCareer: string;
  notes: string;
}

export function mapAssessmentToReportGenerator(
  scores: ParameterScores,
  userName: string,
  grade: string,
  school: string,
  age: string,
  date: string,
  preferredCareers: string[] = [],
  parentCareer: string = "",
  notes: string = ""
): ReportGeneratorData {
  return {
    name: userName || "Student",
    grade: grade || "N/A",
    school: school || "",
    age: age || "",
    date: date || new Date().toISOString().split("T")[0],
    individuality: {
      engagement: scores.Engagement || 0,
      empathy: scores.Empathy || 0,
      ei: scores.EmotionalIntelligence || 0,
      exploration: scores.Exploration || 0,
    },
    skills: {
      administrative: scores.Administrative || 0,
      numerical: scores.Numerical || 0,
      logical: scores.Logical || 0,
      mechanical: scores.Mechanical || 0,
      verbal: scores.Verbal || 0,
    },
    riasec: {
      realistic: scores.Realistic || 0,
      investigative: scores.Investigative || 0,
      artistic: scores.Artistic || 0,
      social: scores.Social || 0,
      enterprising: scores.Enterprising || 0,
      conventional: scores.Conventional || 0,
    },
    preferredCareers,
    parentCareer,
    notes,
  };
}

export function getTopTraits(
  traits: Record<string, number>,
  n = 3
): { label: string; val: number }[] {
  return Object.entries(traits)
    .map(([key, val]) => ({ label: key, val }))
    .sort((a, b) => b.val - a.val)
    .slice(0, n);
}

export function getRIASECColor(val: number): string {
  if (val >= 50) return "high";
  if (val >= 30) return "med";
  return "low";
}
