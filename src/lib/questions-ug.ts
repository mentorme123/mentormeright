import { Question } from "./mock-questions";

const SA = { A: "Strongly Agree", B: "Agree", C: "Disagree", D: "Strongly Disagree" };

export const UG_QUESTIONS: Question[] = [
  // ── SECTION 1: PASSION (RIASEC) ──────────────────────────────────────────
  { id: 1, section: 1, text: "I enjoy courses that involve practical experiments or workshops over pure theory.", options: SA },
  { id: 2, section: 1, text: "I prefer using tools and instruments to understand a concept rather than reading about it.", options: SA },
  { id: 3, section: 1, text: "I would be excited to work on a project that results in a tangible product or prototype.", options: SA },
  { id: 4, section: 1, text: "I feel more confident when I know exactly what physical steps to take to complete a task.", options: SA },
  { id: 5, section: 1, text: "I see technical certifications and hands-on skills as more immediately valuable than theoretical knowledge.", options: SA },
  // Investigative
  { id: 6, section: 1, text: "I enjoy research assignments that require me to dig deeper than the textbook.", options: SA },
  { id: 7, section: 1, text: "I often search for additional sources beyond what is assigned in class.", options: SA },
  { id: 8, section: 1, text: "I find it more satisfying to understand a topic thoroughly than to get a high grade.", options: SA },
  { id: 9, section: 1, text: "I enjoy coursework that involves forming and testing hypotheses.", options: SA },
  { id: 10, section: 1, text: "I am comfortable challenging a professor's interpretation if I have strong evidence.", options: SA },
  // Artistic
  { id: 11, section: 1, text: "I enjoy courses that give me freedom to express my own perspective.", options: SA },
  { id: 12, section: 1, text: "I prefer open-ended assignments over fixed-answer problem sets.", options: SA },
  { id: 13, section: 1, text: "I often find myself thinking of alternative interpretations or solutions nobody else considers.", options: SA },
  { id: 14, section: 1, text: "I am drawn to electives in design, creative writing, or performing arts even in a technical programme.", options: SA },
  { id: 15, section: 1, text: "I see creativity as a professional competency, not just a personal hobby.", options: SA },
  // Social
  { id: 16, section: 1, text: "I enjoy subjects or modules focused on people, communication, or social systems.", options: SA },
  { id: 17, section: 1, text: "I prefer group discussions and presentations over individual written tests.", options: SA },
  { id: 18, section: 1, text: "I often find myself taking on the role of mediator or supporter in group projects.", options: SA },
  { id: 19, section: 1, text: "I gravitate toward internships or volunteering roles that involve direct interaction with communities.", options: SA },
  { id: 20, section: 1, text: "I see effective communication and interpersonal skills as the most transferable professional assets.", options: SA },
  // Enterprising
  { id: 21, section: 1, text: "I prefer taking the lead in group assignments rather than following others.", options: SA },
  { id: 22, section: 1, text: "I am motivated by the idea of running my own venture after graduation.", options: SA },
  { id: 23, section: 1, text: "I enjoy courses in marketing, strategy, or business development.", options: SA },
  { id: 24, section: 1, text: "I actively seek leadership roles in clubs, societies, or student committees.", options: SA },
  { id: 25, section: 1, text: "I believe the ability to influence and motivate others is the single most valuable graduate competency.", options: SA },
  // Conventional
  { id: 26, section: 1, text: "I keep detailed notes and maintain organised files for all my courses.", options: SA },
  { id: 27, section: 1, text: "I prefer assignments with clear rubrics and marking criteria over open-ended tasks.", options: SA },
  { id: 28, section: 1, text: "I find satisfaction in completing checklists, meeting deadlines, and ticking off tasks.", options: SA },
  { id: 29, section: 1, text: "I am comfortable with roles that involve data entry, record-keeping, or systematic processes.", options: SA },
  { id: 30, section: 1, text: "I believe mastering existing systems and processes is more immediately useful than innovating new ones at an early career stage.", options: SA },

  // ── SECTION 2: INDIVIDUALITY ─────────────────────────────────────────────
  // Emotional Intelligence
  { id: 31, section: 2, text: "I am aware of how stress affects my study habits and decision-making.", options: SA },
  { id: 32, section: 2, text: "I can usually tell what mood I am in and why.", options: SA },
  { id: 33, section: 2, text: "I manage frustration well when a project is not going as planned.", options: SA },
  { id: 34, section: 2, text: "I adjust how I communicate when I sense tension in a group setting.", options: SA },
  { id: 35, section: 2, text: "I proactively address interpersonal tensions in team projects rather than avoiding them.", options: SA },
  { id: 36, section: 2, text: "I can remain objective and effective even when I strongly disagree with a team decision.", options: SA },
  // Efficiency
  { id: 37, section: 2, text: "I plan my study schedule at the beginning of each semester.", options: SA },
  { id: 38, section: 2, text: "I complete tasks in order of priority rather than convenience.", options: SA },
  { id: 39, section: 2, text: "I identify and cut time-wasting habits to improve my academic performance.", options: SA },
  { id: 40, section: 2, text: "I maintain consistent output quality even during high-workload periods.", options: SA },
  { id: 41, section: 2, text: "I use specific productivity frameworks (e.g. Pomodoro, time-blocking) to manage my study time.", options: SA },
  { id: 42, section: 2, text: "I regularly reflect on my performance and make data-driven adjustments to my study approach.", options: SA },
  // Empathy
  { id: 43, section: 2, text: "I try to understand what a lecturer or professor is trying to communicate beyond just the content.", options: SA },
  { id: 44, section: 2, text: "I support group members who are struggling even if it is not my direct responsibility.", options: SA },
  { id: 45, section: 2, text: "I regularly reflect on how my communication style affects others.", options: SA },
  { id: 46, section: 2, text: "I can disagree with someone's behaviour while still understanding their reasoning.", options: SA },
  { id: 47, section: 2, text: "I can provide support to someone in distress without making it about my own emotions.", options: SA },
  { id: 48, section: 2, text: "I actively advocate for inclusive practices in group settings because I understand diverse needs.", options: SA },
  // Engagement
  { id: 49, section: 2, text: "I attend lectures with genuine interest, not just for attendance.", options: SA },
  { id: 50, section: 2, text: "I participate in extracurricular activities that connect to my career interests.", options: SA },
  { id: 51, section: 2, text: "I maintain high commitment to my studies even during personal setbacks.", options: SA },
  { id: 52, section: 2, text: "I contribute actively and constructively in all group projects.", options: SA },
  { id: 53, section: 2, text: "I proactively align my coursework choices with my professional development goals.", options: SA },
  { id: 54, section: 2, text: "I go beyond assigned coursework to develop expertise in areas relevant to my career.", options: SA },
  // Exploration
  { id: 55, section: 2, text: "I take electives in areas outside my main field of study out of curiosity.", options: SA },
  { id: 56, section: 2, text: "I seek out diverse experiences through clubs, events, or travel.", options: SA },
  { id: 57, section: 2, text: "I regularly update my career assumptions based on new knowledge or experience.", options: SA },
  { id: 58, section: 2, text: "I am comfortable with not having my career path fully figured out yet.", options: SA },
  { id: 59, section: 2, text: "I proactively seek internships, projects, or research in areas I know little about.", options: SA },
  { id: 60, section: 2, text: "I treat every new environment or challenge as a source of learning rather than a test of existing skills.", options: SA },

  // ── SECTION 3: SKILL PROFICIENCY ─────────────────────────────────────────
  // Logical
  { id: 61, section: 3, text: "Which of the following is NOT a logical fallacy?", options: { A: "Modus ponens", B: "Ad hominem", C: "Straw man", D: "False dichotomy" } },
  { id: 62, section: 3, text: "If P implies Q, and Q is false, what can you conclude about P?", options: { A: "P is false", B: "P is true", C: "P implies R", D: "Nothing" } },
  { id: 63, section: 3, text: "Identify the error: 'Student exam scores improved after we painted the classrooms. Therefore, painting improved scores.'", options: { A: "Post hoc fallacy", B: "Appeal to authority", C: "Straw man", D: "Ad hominem" } },
  { id: 64, section: 3, text: "Which best describes inductive reasoning?", options: { A: "Drawing probable conclusions from specific observations", B: "Drawing certain conclusions from premises", C: "Disproving a hypothesis", D: "Proving a theorem" } },
  { id: 65, section: 3, text: "In a Venn diagram, A \u2229 B' represents:", options: { A: "Elements in A but not B", B: "Elements in both A and B", C: "Elements in B but not A", D: "Elements in neither A nor B" } },
  { id: 66, section: 3, text: "A researcher uses p<0.05 to reject the null hypothesis. This means:", options: { A: "There is less than 5% probability the result is due to chance", B: "95% of hypotheses are true", C: "The effect size is large", D: "The study is replicable" } },
  // Numerical
  { id: 67, section: 3, text: "Calculate the median of: 3, 7, 5, 11, 9.", options: { A: "7", B: "5", C: "9", D: "8" } },
  { id: 68, section: 3, text: "A loan of \u20b920,000 at 10% simple interest is repaid after 2 years. Total repayment?", options: { A: "\u20b924,000", B: "\u20b922,000", C: "\u20b925,000", D: "\u20b923,000" } },
  { id: 69, section: 3, text: "What is the standard deviation of: 2, 4, 4, 4, 5, 5, 7, 9?", options: { A: "2", B: "1.5", C: "3", D: "2.5" } },
  { id: 70, section: 3, text: "A product sells for \u20b91200 with a 25% profit on cost. What is the cost price?", options: { A: "\u20b9960", B: "\u20b9900", C: "\u20b91000", D: "\u20b9800" } },
  { id: 71, section: 3, text: "If GDP grows at 7% annually, approximately how many years to double (Rule of 72)?", options: { A: "~10.3 years", B: "~7 years", C: "~14 years", D: "~5 years" } },
  { id: 72, section: 3, text: "A regression equation is Y = 3X + 5. If X increases by 2, by how much does Y change?", options: { A: "6", B: "5", C: "8", D: "3" } },
  // Mechanical
  { id: 73, section: 3, text: "Newton's Third Law states that:", options: { A: "Every action has an equal and opposite reaction", B: "Force equals mass times acceleration", C: "Objects at rest stay at rest", D: "Energy is conserved" } },
  { id: 74, section: 3, text: "Ohm's Law relates:", options: { A: "Voltage, current, and resistance", B: "Force, mass, and acceleration", C: "Pressure, volume, and temperature", D: "Energy, power, and time" } },
  { id: 75, section: 3, text: "A cantilever beam has maximum bending moment at:", options: { A: "The fixed end", B: "The free end", C: "The midpoint", D: "Uniformly throughout" } },
  { id: 76, section: 3, text: "Which factor most affects the natural frequency of a spring-mass system?", options: { A: "Spring stiffness and mass", B: "Damping ratio only", C: "Applied force", D: "Temperature" } },
  { id: 77, section: 3, text: "In fluid mechanics, the Reynolds number determines:", options: { A: "Whether flow is laminar or turbulent", B: "The fluid's viscosity", C: "The pressure drop", D: "The flow velocity" } },
  { id: 78, section: 3, text: "The Poisson's ratio of a material describes:", options: { A: "Lateral strain to axial strain ratio", B: "Stress to strain ratio", C: "Shear stress to normal stress ratio", D: "Ultimate strength to yield strength ratio" } },
  // Verbal
  { id: 79, section: 3, text: "Choose the synonym of 'Concise':", options: { A: "Brief", B: "Lengthy", C: "Verbose", D: "Detailed" } },
  { id: 80, section: 3, text: "Identify the subject in: 'The group of students is studying for finals.'", options: { A: "Group", B: "Students", C: "Finals", D: "Is studying" } },
  { id: 81, section: 3, text: "A thesis statement should be:", options: { A: "Specific, arguable, and focused", B: "Broad, general, and descriptive", C: "A question or a fact", D: "A list of main points" } },
  { id: 82, section: 3, text: "What rhetorical strategy uses emotional appeal to persuade?", options: { A: "Pathos", B: "Logos", C: "Ethos", D: "Kairos" } },
  { id: 83, section: 3, text: "Critically evaluate: 'Students who use laptops in class perform worse on exams.' What additional information is needed?", options: { A: "Whether laptop use caused or correlated with performance", B: "How many students were studied", C: "What type of exams were used", D: "Whether professors allowed laptops" } },
  { id: 84, section: 3, text: "Which academic citation format is most common in social sciences?", options: { A: "APA", B: "MLA", C: "Chicago", D: "Harvard" } },
  // Administrative
  { id: 85, section: 3, text: "The purpose of a Gantt chart in project management is to:", options: { A: "Visualise tasks and timelines", B: "Calculate budget allocations", C: "Track team attendance", D: "Measure quality" } },
  { id: 86, section: 3, text: "Effective minutes of a meeting should capture:", options: { A: "Decisions made, action items, owners, and deadlines", B: "Everything said word for word", C: "The agenda for the next meeting", D: "Only the chairperson's comments" } },
  { id: 87, section: 3, text: "Which of the following best describes a Standard Operating Procedure (SOP)?", options: { A: "A step-by-step guide for performing a routine task consistently", B: "A one-time project plan", C: "A strategic vision document", D: "A financial forecast" } },
  { id: 88, section: 3, text: "When coordinating between multiple stakeholders with conflicting priorities, the most effective approach is:", options: { A: "Map priorities, find common ground, and communicate clearly", B: "Focus on the most senior stakeholder only", C: "Avoid escalation at all costs", D: "Delay until priorities align" } },
  { id: 89, section: 3, text: "Which governance document defines the authority levels and decision rights across an organisation?", options: { A: "Delegation of Authority (DoA) matrix", B: "SWOT analysis", C: "Project charter", D: "Risk register" } },
  { id: 90, section: 3, text: "To improve operational efficiency, which approach is most systematic?", options: { A: "Map current processes, identify waste, redesign, and measure improvement", B: "Ask staff for suggestions informally", C: "Implement new software immediately", D: "Reduce staff numbers" } },
];
