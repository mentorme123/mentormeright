export interface Question {
  id: number;
  section: 1 | 2 | 3;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export function getMockQuestions(): Question[] {
  const questions: Question[] = [];
  
  for (let i = 1; i <= 90; i++) {
    const section = i <= 30 ? 1 : i <= 60 ? 2 : 3;
    questions.push({
      id: i,
      section: section as 1 | 2 | 3,
      text: `Mock Question ${i}: This is a placeholder text for question number ${i} in section ${section}.`,
      options: {
        A: `Option A for Q${i}`,
        B: `Option B for Q${i}`,
        C: `Option C for Q${i}`,
        D: `Option D for Q${i}`,
      }
    });
  }
  
  return questions;
}
