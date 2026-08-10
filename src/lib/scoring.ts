// Scoring map: question ID → parameter name
// All questions: correct answer = A (4pts), B=3, C=2, D=1
// Section 1 (Q1-30): RIASEC passion traits (normalized: A=1.0, B=0.75, C=0.5, D=0.25)
// Section 2 (Q31-60): Individuality traits (normalized: A=1.0, B=0.75, C=0.5, D=0.25)
// Section 3 (Q61-90): Skill proficiency (objective, A=4, B=3, C=2, D=1)

export type ParameterScores = {
  // RIASEC (max 5 each = 5 questions × 1.0)
  Realistic: number;
  Investigative: number;
  Artistic: number;
  Social: number;
  Enterprising: number;
  Conventional: number;
  // Individuality (max 6 each = 6 questions × 1.0)
  EmotionalIntelligence: number;
  Efficiency: number;
  Empathy: number;
  Engagement: number;
  Exploration: number;
  // Skills (max 24 each = 6 questions × 4 pts)
  Logical: number;
  Numerical: number;
  Mechanical: number;
  Verbal: number;
  Administrative: number;
};

// Which question IDs map to which parameter (same for all audience types)
const PARAMETER_MAP: Record<string, number[]> = {
  // Section 1: RIASEC (5 questions each)
  Realistic:          [1, 2, 3, 4, 5],
  Investigative:      [6, 7, 8, 9, 10],
  Artistic:           [11, 12, 13, 14, 15],
  Social:             [16, 17, 18, 19, 20],
  Enterprising:       [21, 22, 23, 24, 25],
  Conventional:       [26, 27, 28, 29, 30],
  // Section 2: Individuality (6 questions each)
  EmotionalIntelligence: [31, 32, 33, 34, 35, 36],
  Efficiency:            [37, 38, 39, 40, 41, 42],
  Empathy:               [43, 44, 45, 46, 47, 48],
  Engagement:            [49, 50, 51, 52, 53, 54],
  Exploration:           [55, 56, 57, 58, 59, 60],
  // Section 3: Skills (6 questions each)
  Logical:        [61, 62, 63, 64, 65, 66],
  Numerical:      [67, 68, 69, 70, 71, 72],
  Mechanical:     [73, 74, 75, 76, 77, 78],
  Verbal:         [79, 80, 81, 82, 83, 84],
  Administrative: [85, 86, 87, 88, 89, 90],
};

const OPTION_SCORE: Record<string, number> = { A: 4, B: 3, C: 2, D: 1 };
const OPTION_SCORE_INDIVIDUALITY_PASSION: Record<string, number> = { A: 1.0, B: 0.75, C: 0.5, D: 0.25 };

export function scoreAnswers(answers: Record<number, string>): ParameterScores {
  const scores: Record<string, number> = {};
  for (const [param, ids] of Object.entries(PARAMETER_MAP)) {
    const isIndividualityOrPassion = ids.some(id => id >= 1 && id <= 60);
    const optionScore = isIndividualityOrPassion ? OPTION_SCORE_INDIVIDUALITY_PASSION : OPTION_SCORE;
    scores[param] = ids.reduce((sum, id) => {
      const answer = answers[id] || "D";
      return sum + (optionScore[answer] ?? (isIndividualityOrPassion ? 0.25 : 1));
    }, 0);
  }
  return scores as unknown as ParameterScores;
}

export function buildScoreSummary(scores: ParameterScores, audience: string): string {
  const maxRIASEC = 5; // 5 questions × 1.0
  const maxIndiv = 6;  // 6 questions × 1.0
  const maxSkill = 24; // 6 questions × 4

  const pct = (v: number, max: number) => `${v}/${max} (${Math.round((v / max) * 100)}%)`;

  return `
AUDIENCE TYPE: ${audience}

=== PASSION / RIASEC SCORES ===
Realistic:      ${pct(scores.Realistic, maxRIASEC)}
Investigative:  ${pct(scores.Investigative, maxRIASEC)}
Artistic:       ${pct(scores.Artistic, maxRIASEC)}
Social:         ${pct(scores.Social, maxRIASEC)}
Enterprising:   ${pct(scores.Enterprising, maxRIASEC)}
Conventional:   ${pct(scores.Conventional, maxRIASEC)}
Top RIASEC code: ${getTopRIASEC(scores)}

=== INDIVIDUALITY SCORES ===
Emotional Intelligence: ${pct(scores.EmotionalIntelligence, maxIndiv)}
Efficiency:             ${pct(scores.Efficiency, maxIndiv)}
Empathy:                ${pct(scores.Empathy, maxIndiv)}
Engagement:             ${pct(scores.Engagement, maxIndiv)}
Exploration:            ${pct(scores.Exploration, maxIndiv)}

=== SKILL PROFICIENCY SCORES ===
Logical:        ${pct(scores.Logical, maxSkill)}
Numerical:      ${pct(scores.Numerical, maxSkill)}
Mechanical:     ${pct(scores.Mechanical, maxSkill)}
Verbal:         ${pct(scores.Verbal, maxSkill)}
Administrative: ${pct(scores.Administrative, maxSkill)}

Overall Skill Score: ${scores.Logical + scores.Numerical + scores.Mechanical + scores.Verbal + scores.Administrative}/120
`.trim();
}

function getTopRIASEC(scores: ParameterScores): string {
  const riasec = {
    R: scores.Realistic,
    I: scores.Investigative,
    A: scores.Artistic,
    S: scores.Social,
    E: scores.Enterprising,
    C: scores.Conventional,
  };
  return Object.entries(riasec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k)
    .join("");
}
