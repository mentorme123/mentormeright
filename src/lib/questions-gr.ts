import { Question } from "./mock-questions";

const SA = { A: "Strongly Agree", B: "Agree", C: "Disagree", D: "Strongly Disagree" };

export const GR_QUESTIONS: Question[] = [
  // ── SECTION 1: PASSION (RIASEC) ──────────────────────────────────────────
  { id: 1, section: 1, text: "I prefer internships that involve hands-on lab or fieldwork over office rotations.", options: SA },
  { id: 2, section: 1, text: "Technical skill-building excites me more than networking events.", options: SA },
  { id: 3, section: 1, text: "I would enjoy a career that involves operating, maintaining, or designing machinery.", options: { A: "Yes, greatly", B: "Somewhat", C: "Not much", D: "Not at all" } },
  { id: 4, section: 1, text: "I find satisfaction in solving problems that have a clear, physical solution.", options: SA },
  { id: 5, section: 1, text: "I am drawn to roles where my output can be directly measured by what I produce or build.", options: SA },
  // Investigative
  { id: 6, section: 1, text: "I enjoy deep-diving into research papers or technical reports.", options: SA },
  { id: 7, section: 1, text: "I am naturally drawn to careers in science, research, or analytics.", options: SA },
  { id: 8, section: 1, text: "I would rather spend an afternoon analysing data than attending a social event.", options: SA },
  { id: 9, section: 1, text: "I frequently question assumptions in textbooks or lectures.", options: SA },
  { id: 10, section: 1, text: "I believe ambiguity in a problem is an opportunity to investigate, not a reason to avoid it.", options: SA },
  // Artistic
  { id: 11, section: 1, text: "I gravitate toward careers in media, design, writing, or the arts.", options: SA },
  { id: 12, section: 1, text: "I prefer projects where I can express originality over following a strict template.", options: SA },
  { id: 13, section: 1, text: "I find standard formats or rigid guidelines limiting rather than helpful.", options: SA },
  { id: 14, section: 1, text: "I am often told my ideas or solutions are unconventional or creative.", options: SA },
  { id: 15, section: 1, text: "I believe the most impactful careers blend technical skill with creative vision.", options: SA },
  // Social
  { id: 16, section: 1, text: "I am drawn to careers in education, counselling, healthcare, or social work.", options: SA },
  { id: 17, section: 1, text: "I enjoy taking on roles that involve supporting or guiding my peers.", options: SA },
  { id: 18, section: 1, text: "I feel most fulfilled when my work directly improves someone else's life.", options: SA },
  { id: 19, section: 1, text: "I prefer collaborative team environments over competitive individual ones.", options: SA },
  { id: 20, section: 1, text: "I believe social impact is a valid measure of professional success alongside financial reward.", options: SA },
  // Enterprising
  { id: 21, section: 1, text: "I am drawn to careers in business, sales, management, or entrepreneurship.", options: SA },
  { id: 22, section: 1, text: "I enjoy taking initiative and making things happen rather than waiting for direction.", options: SA },
  { id: 23, section: 1, text: "I thrive in competitive environments where I can demonstrate my abilities.", options: SA },
  { id: 24, section: 1, text: "I often find myself naturally stepping up to lead when there is a gap.", options: SA },
  { id: 25, section: 1, text: "I see building a personal brand and network as essential professional investments.", options: SA },
  // Conventional
  { id: 26, section: 1, text: "I am attracted to careers in finance, accounting, administration, or compliance.", options: SA },
  { id: 27, section: 1, text: "I prefer well-defined job roles over broad, ambiguous responsibilities.", options: SA },
  { id: 28, section: 1, text: "I am meticulous about deadlines, documentation, and accuracy in my academic work.", options: SA },
  { id: 29, section: 1, text: "I prefer working environments with clear hierarchies and reporting structures.", options: SA },
  { id: 30, section: 1, text: "I believe precision, compliance, and process-mastery are undervalued in most organisations today.", options: SA },

  // ── SECTION 2: INDIVIDUALITY ─────────────────────────────────────────────
  // Emotional Intelligence
  { id: 31, section: 2, text: "I am generally aware of how my mood affects the quality of my academic work.", options: SA },
  { id: 32, section: 2, text: "I can identify when I am feeling overwhelmed and take steps to manage it.", options: SA },
  { id: 33, section: 2, text: "I adapt my communication based on how the other person seems to be feeling.", options: SA },
  { id: 34, section: 2, text: "I reflect on my emotional responses after a difficult interaction to learn from it.", options: SA },
  { id: 35, section: 2, text: "I consistently manage my emotions effectively in high-pressure academic or professional situations.", options: SA },
  { id: 36, section: 2, text: "I can read the emotional dynamics of a group and adjust my behaviour accordingly.", options: SA },
  // Efficiency
  { id: 37, section: 2, text: "I consistently submit assignments and applications on time or early.", options: SA },
  { id: 38, section: 2, text: "I use tools or systems to track my tasks and deadlines.", options: SA },
  { id: 39, section: 2, text: "I regularly review my study or work approach to identify inefficiencies.", options: SA },
  { id: 40, section: 2, text: "I can balance multiple commitments without compromising quality.", options: SA },
  { id: 41, section: 2, text: "I proactively identify and eliminate bottlenecks in my personal workflow.", options: SA },
  { id: 42, section: 2, text: "I track my productivity metrics and adjust my approach based on results.", options: SA },
  // Empathy
  { id: 43, section: 2, text: "I actively consider how my decisions might affect others around me.", options: SA },
  { id: 44, section: 2, text: "I feel motivated to support peers going through difficult times.", options: SA },
  { id: 45, section: 2, text: "I find it natural to put myself in another person's shoes during a disagreement.", options: SA },
  { id: 46, section: 2, text: "I adapt my communication style to make others feel understood.", options: SA },
  { id: 47, section: 2, text: "I can separate my personal biases from my understanding of another person's experience.", options: SA },
  { id: 48, section: 2, text: "I consider the systemic factors that might shape another person's behaviour before judging them.", options: SA },
  // Engagement
  { id: 49, section: 2, text: "I put in genuine effort in all my academic and extracurricular commitments.", options: SA },
  { id: 50, section: 2, text: "I find energy and motivation in the work I am most passionate about.", options: SA },
  { id: 51, section: 2, text: "I stay engaged with projects even when the initial excitement fades.", options: SA },
  { id: 52, section: 2, text: "I contribute beyond the minimum requirements in team or project settings.", options: SA },
  { id: 53, section: 2, text: "I actively seek roles, internships, or projects that align with my long-term purpose.", options: SA },
  { id: 54, section: 2, text: "I redesign or renegotiate my responsibilities when they don't fully utilise my strengths.", options: SA },
  // Exploration
  { id: 55, section: 2, text: "I actively explore different career paths rather than narrowing my focus too early.", options: SA },
  { id: 56, section: 2, text: "I seek out diverse learning experiences across disciplines.", options: SA },
  { id: 57, section: 2, text: "I am open to revising my career goals based on new experiences and insights.", options: SA },
  { id: 58, section: 2, text: "I regularly experiment with new skills, tools, or subject areas.", options: SA },
  { id: 59, section: 2, text: "I deliberately expose myself to perspectives and experiences that challenge my existing worldview.", options: SA },
  { id: 60, section: 2, text: "I treat ambiguity in my career path as an invitation to explore rather than a problem to solve quickly.", options: SA },

  // ── SECTION 3: SKILL PROFICIENCY ─────────────────────────────────────────
  // Logical
  { id: 61, section: 3, text: "Which of the following is a valid deductive argument?", options: { A: "All X are Y; Z is X; therefore Z is Y", B: "All X are Y; Z is Y; therefore Z is X", C: "Some X are Y; Z is X; therefore Z is Y", D: "All X are Y; no Z is Y; therefore some Z is X" } },
  { id: 62, section: 3, text: "A box has 5 red and 3 blue marbles. What is the probability of drawing 2 red marbles in a row without replacement?", options: { A: "5/14", B: "1/2", C: "10/64", D: "5/24" } },
  { id: 63, section: 3, text: "If the conclusion follows necessarily from the premises, the argument is:", options: { A: "Valid", B: "Sound", C: "Strong", D: "Cogent" } },
  { id: 64, section: 3, text: "Identify the logical fallacy: 'We've always done it this way, so we should continue.'", options: { A: "Appeal to tradition", B: "Ad hominem", C: "Straw man", D: "False dilemma" } },
  { id: 65, section: 3, text: "Which of the following best represents a Type II error in hypothesis testing?", options: { A: "Failing to reject a false null hypothesis", B: "Rejecting a true null hypothesis", C: "Accepting a false alternative", D: "Rejecting a false null hypothesis" } },
  { id: 66, section: 3, text: "A decision tree shows option A with 60% chance of \u20b9100 gain and 40% chance of \u20b950 loss. Option B gives a certain \u20b930. Which is better in expected value?", options: { A: "Option A (EV=\u20b940)", B: "Option B (EV=\u20b930)", C: "Both equal", D: "Cannot determine" } },
  // Numerical
  { id: 67, section: 3, text: "A dataset has values: 5, 8, 10, 12, 15. What is the mean?", options: { A: "10", B: "9", C: "11", D: "12" } },
  { id: 68, section: 3, text: "Convert a 30% profit margin to a markup percentage on cost.", options: { A: "42.86%", B: "30%", C: "50%", D: "35%" } },
  { id: 69, section: 3, text: "A project budget of \u20b910 lakh has a 15% contingency. What is the total approved budget?", options: { A: "\u20b911.5 lakh", B: "\u20b910.15 lakh", C: "\u20b911 lakh", D: "\u20b912 lakh" } },
  { id: 70, section: 3, text: "If inflation is 6% and a salary grows by 4%, what is the real change in purchasing power?", options: { A: "-1.89%", B: "-2%", C: "+2%", D: "+1.89%" } },
  { id: 71, section: 3, text: "A portfolio worth \u20b95 lakh loses 20% in Year 1, then gains 25% in Year 2. What is the final value?", options: { A: "\u20b95 lakh", B: "\u20b95.25 lakh", C: "\u20b94.75 lakh", D: "\u20b95.5 lakh" } },
  { id: 72, section: 3, text: "A z-score of 1.96 corresponds to what confidence level in a two-tailed test?", options: { A: "95%", B: "90%", C: "99%", D: "98%" } },
  // Mechanical
  { id: 73, section: 3, text: "Which type of pump is best suited for transferring viscous fluids?", options: { A: "Gear pump", B: "Centrifugal pump", C: "Jet pump", D: "Diaphragm pump" } },
  { id: 74, section: 3, text: "Stress is defined as:", options: { A: "Force per unit area", B: "Area per unit force", C: "Force times area", D: "Pressure times volume" } },
  { id: 75, section: 3, text: "A shaft rotating at high speed requires which type of bearing to minimise friction?", options: { A: "Ball bearing", B: "Plain bearing", C: "Roller bearing", D: "Thrust bearing" } },
  { id: 76, section: 3, text: "In a four-stroke engine, the correct sequence of strokes is:", options: { A: "Intake, Compression, Power, Exhaust", B: "Intake, Power, Compression, Exhaust", C: "Compression, Intake, Power, Exhaust", D: "Power, Intake, Compression, Exhaust" } },
  { id: 77, section: 3, text: "Which failure mode is most critical in fatigue analysis?", options: { A: "Crack propagation at stress concentration", B: "Ductile fracture", C: "Elastic deformation", D: "Thermal expansion" } },
  { id: 78, section: 3, text: "The efficiency of a Carnot engine operating between 300 K and 600 K is:", options: { A: "50%", B: "25%", C: "75%", D: "100%" } },
  // Verbal
  { id: 79, section: 3, text: "Choose the word closest in meaning to 'Prolific':", options: { A: "Productive", B: "Lazy", C: "Talented", D: "Ambitious" } },
  { id: 80, section: 3, text: "Which sentence is in active voice?", options: { A: "The researcher conducted the study.", B: "The study was conducted by the researcher.", C: "The study has been conducted.", D: "It was the researcher who conducted it." } },
  { id: 81, section: 3, text: "Identify the logical structure: 'If A is true, B follows. A is true. Therefore B.'", options: { A: "Modus ponens", B: "Modus tollens", C: "Ad hominem", D: "False dilemma" } },
  { id: 82, section: 3, text: "A passage argues: 'Technology makes us isolated.' What type of claim is this?", options: { A: "Causal claim", B: "Factual claim", C: "Definitional claim", D: "Comparative claim" } },
  { id: 83, section: 3, text: "What does the author imply: 'The report, not without its limitations, provides the most comprehensive view available.'", options: { A: "The report is imperfect but the best available", B: "The report is perfect", C: "The report is useless", D: "Other reports are better" } },
  { id: 84, section: 3, text: "Which transition word best shows contrast: 'She prepared thoroughly ___ the outcome was disappointing.'", options: { A: "yet", B: "and", C: "because", D: "therefore" } },
  // Administrative
  { id: 85, section: 3, text: "Which document formally outlines the scope, objectives, and stakeholders of a project?", options: { A: "Project charter", B: "Meeting minutes", C: "Status report", D: "Risk register" } },
  { id: 86, section: 3, text: "The most effective way to manage an inbox with high email volume is:", options: { A: "Process, delegate, or archive each email systematically", B: "Read but do not respond", C: "Check email only once a week", D: "Delete all emails older than one week" } },
  { id: 87, section: 3, text: "A risk register is used to:", options: { A: "Identify, assess, and track project risks", B: "Record team attendance", C: "Monitor budget only", D: "Store project documents" } },
  { id: 88, section: 3, text: "Which is the most critical feature of a well-designed filing system?", options: { A: "Consistent naming conventions and easy retrieval", B: "Maximum number of files", C: "Password protection on all files", D: "Colour coding only" } },
  { id: 89, section: 3, text: "When implementing a new process across an organisation, the correct order of steps is:", options: { A: "Design, pilot, evaluate, refine, scale", B: "Implement, evaluate, design", C: "Scale, then pilot", D: "Design, scale, evaluate" } },
  { id: 90, section: 3, text: "Which metric best measures the efficiency of an administrative process?", options: { A: "Cycle time and error rate", B: "Number of documents produced", C: "Cost of software used", D: "Number of staff involved" } },
];
