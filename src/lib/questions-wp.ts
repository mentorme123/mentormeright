import { Question } from "./mock-questions";

const SA = { A: "Strongly Agree", B: "Agree", C: "Disagree", D: "Strongly Disagree" };

export const WP_QUESTIONS: Question[] = [
  // ── SECTION 1: PASSION (RIASEC) ──────────────────────────────────────────
  // Realistic
  { id: 1, section: 1, text: "You prefer tasks that involve working with your hands or physical tools.", options: SA },
  { id: 2, section: 1, text: "When given a choice, you would rather fix something broken than attend a strategy meeting.", options: { A: "Fix it myself", B: "Ask maintenance", C: "Attend meeting", D: "Delegate both" } },
  { id: 3, section: 1, text: "You find outdoor or field-based roles more energising than desk jobs.", options: SA },
  { id: 4, section: 1, text: "A project requiring you to build a prototype excites you more than writing a report about it.", options: SA },
  { id: 5, section: 1, text: "Your ideal long-term career outcome involves mastery of a specific technical craft rather than broad leadership.", options: SA },
  // Investigative
  { id: 6, section: 1, text: "You enjoy analysing data and forming hypotheses about business trends.", options: SA },
  { id: 7, section: 1, text: "You prefer research-based problem-solving over quick intuitive decisions.", options: SA },
  { id: 8, section: 1, text: "Complex intellectual problems energise you more than social negotiations.", options: SA },
  { id: 9, section: 1, text: "You frequently seek to understand the root cause behind workplace issues rather than applying quick fixes.", options: SA },
  { id: 10, section: 1, text: "You believe rigorous data analysis should precede every major strategic decision in your organisation.", options: SA },
  // Artistic
  { id: 11, section: 1, text: "You enjoy roles that allow for creative problem-solving and original thinking.", options: SA },
  { id: 12, section: 1, text: "You feel most productive when you have the freedom to approach tasks your own way.", options: SA },
  { id: 13, section: 1, text: "Routine, repetitive tasks drain your motivation over time.", options: SA },
  { id: 14, section: 1, text: "You are often the one who brings fresh ideas or unconventional solutions to your team.", options: SA },
  { id: 15, section: 1, text: "You believe organisations need more people willing to challenge conventional thinking, even at the risk of disruption.", options: SA },
  // Social
  { id: 16, section: 1, text: "You find genuine satisfaction in helping colleagues or clients solve their problems.", options: SA },
  { id: 17, section: 1, text: "Mentoring or coaching others is something you actively seek out.", options: SA },
  { id: 18, section: 1, text: "You feel energised after team discussions rather than drained.", options: SA },
  { id: 19, section: 1, text: "You prioritise team harmony and collaboration over individual achievement.", options: SA },
  { id: 20, section: 1, text: "You believe the most meaningful impact in your career comes from developing people, not just delivering results.", options: SA },
  // Enterprising
  { id: 21, section: 1, text: "You enjoy leading projects and influencing others toward a shared goal.", options: SA },
  { id: 22, section: 1, text: "You are motivated by competition and achieving measurable results.", options: SA },
  { id: 23, section: 1, text: "You find negotiation and persuasion come naturally to you.", options: SA },
  { id: 24, section: 1, text: "You are drawn to roles with high autonomy and the ability to make impactful decisions.", options: SA },
  { id: 25, section: 1, text: "You believe calculated risk-taking is essential for significant professional advancement.", options: SA },
  // Conventional
  { id: 26, section: 1, text: "You prefer clearly defined processes and structured workflows.", options: SA },
  { id: 27, section: 1, text: "You take pride in accuracy and attention to detail in your work.", options: SA },
  { id: 28, section: 1, text: "You find comfort in established procedures rather than ambiguous open-ended problems.", options: SA },
  { id: 29, section: 1, text: "You believe consistent compliance with systems and standards is essential for organisational health.", options: SA },
  { id: 30, section: 1, text: "You think robust documentation and standardised processes create more organisational value than individual heroics.", options: SA },

  // ── SECTION 2: INDIVIDUALITY ─────────────────────────────────────────────
  // Emotional Intelligence
  { id: 31, section: 2, text: "You are aware of your own emotions and how they affect your work performance.", options: SA },
  { id: 32, section: 2, text: "You can recognise when a colleague is stressed even if they don't say anything.", options: SA },
  { id: 33, section: 2, text: "When you receive critical feedback, your first response is to reflect rather than react defensively.", options: SA },
  { id: 34, section: 2, text: "You adjust your communication style based on the emotional state of the person you're speaking with.", options: SA },
  { id: 35, section: 2, text: "You consistently separate your emotional state from your professional decision-making, even under pressure.", options: SA },
  { id: 36, section: 2, text: "You actively build psychological safety for your team by acknowledging your own mistakes openly.", options: SA },
  // Efficiency
  { id: 37, section: 2, text: "You consistently complete tasks before their deadlines.", options: SA },
  { id: 38, section: 2, text: "You plan your week in advance to maximise productivity.", options: SA },
  { id: 39, section: 2, text: "You regularly review your processes to eliminate unnecessary steps.", options: SA },
  { id: 40, section: 2, text: "You can effectively prioritise between urgent and important tasks.", options: SA },
  { id: 41, section: 2, text: "You can maintain high output quality while managing multiple concurrent projects.", options: SA },
  { id: 42, section: 2, text: "You systematically measure and improve your own personal productivity over time.", options: SA },
  // Empathy
  { id: 43, section: 2, text: "You take time to understand a colleague's perspective before forming your own opinion.", options: SA },
  { id: 44, section: 2, text: "You notice and respond to the unspoken needs of people around you.", options: SA },
  { id: 45, section: 2, text: "When a team member is struggling, you proactively offer support without being asked.", options: SA },
  { id: 46, section: 2, text: "You can argue the opposing side of a disagreement as convincingly as your own position.", options: SA },
  { id: 47, section: 2, text: "You factor in the emotional impact on stakeholders when making operational decisions.", options: SA },
  { id: 48, section: 2, text: "You can stay present and supportive with a distressed colleague without projecting your own experience onto them.", options: SA },
  // Engagement
  { id: 49, section: 2, text: "You approach your work with consistent energy and enthusiasm.", options: SA },
  { id: 50, section: 2, text: "You actively contribute ideas and input beyond what is strictly required.", options: SA },
  { id: 51, section: 2, text: "You remain committed to your team's goals even during challenging periods.", options: SA },
  { id: 52, section: 2, text: "You find meaning and purpose in the day-to-day tasks of your role.", options: SA },
  { id: 53, section: 2, text: "You consistently go beyond your job description to contribute to the organisation's broader mission.", options: SA },
  { id: 54, section: 2, text: "You actively shape your role to create more alignment between your strengths and your responsibilities.", options: SA },
  // Exploration
  { id: 55, section: 2, text: "You actively seek out new challenges and learning opportunities in your role.", options: SA },
  { id: 56, section: 2, text: "You stay informed about industry trends and emerging developments in your field.", options: SA },
  { id: 57, section: 2, text: "You are comfortable stepping into roles or projects outside your area of expertise.", options: SA },
  { id: 58, section: 2, text: "You regularly experiment with new methods, tools, or approaches in your work.", options: SA },
  { id: 59, section: 2, text: "You proactively pursue cross-functional opportunities to broaden your professional perspective.", options: SA },
  { id: 60, section: 2, text: "You see professional uncertainty as an opportunity to develop new capabilities rather than a threat.", options: SA },

  // ── SECTION 3: SKILL PROFICIENCY ─────────────────────────────────────────
  // Logical
  { id: 61, section: 3, text: "If all managers are leaders and some leaders are coaches, which of the following must be true?", options: { A: "Some managers are coaches", B: "All leaders are managers", C: "No manager is a coach", D: "All coaches are managers" } },
  { id: 62, section: 3, text: "A project takes 6 people 4 days to complete. How many days would 8 people take (same rate)?", options: { A: "3 days", B: "2 days", C: "4 days", D: "5 days" } },
  { id: 63, section: 3, text: "Which pattern comes next: 2, 6, 12, 20, 30, ?", options: { A: "42", B: "40", C: "44", D: "36" } },
  { id: 64, section: 3, text: "A company's profits fell 20% in Year 1 and rose 25% in Year 2. What is the net change?", options: { A: "0%", B: "+5%", C: "-5%", D: "+25%" } },
  { id: 65, section: 3, text: "If no efficient processes waste resources, and some of our processes waste resources, what can we conclude?", options: { A: "Some processes are not efficient", B: "All processes are inefficient", C: "No processes are efficient", D: "No processes waste resources" } },
  { id: 66, section: 3, text: "A CEO makes a decision that is locally optimal but globally suboptimal. This is best described as:", options: { A: "A local maximum fallacy", B: "Groupthink", C: "Confirmation bias", D: "Sunk cost fallacy" } },
  // Numerical
  { id: 67, section: 3, text: "Revenue in Q1 was \u20b912 lakh. In Q2 it grew by 15%. What is Q2 revenue?", options: { A: "\u20b913.8 lakh", B: "\u20b914 lakh", C: "\u20b912.5 lakh", D: "\u20b915 lakh" } },
  { id: 68, section: 3, text: "If operating costs are 60% of revenue and revenue is \u20b950 lakh, what is operating profit?", options: { A: "\u20b920 lakh", B: "\u20b930 lakh", C: "\u20b925 lakh", D: "\u20b910 lakh" } },
  { id: 69, section: 3, text: "A product's price was reduced from \u20b9800 to \u20b9680. What is the percentage discount?", options: { A: "15%", B: "12%", C: "20%", D: "10%" } },
  { id: 70, section: 3, text: "An investment of \u20b91,00,000 grows at 8% compound interest annually. What is the value after 2 years?", options: { A: "\u20b91,16,640", B: "\u20b91,16,000", C: "\u20b91,08,000", D: "\u20b91,20,000" } },
  { id: 71, section: 3, text: "A company's EBITDA margin is 22% and depreciation is \u20b93 lakh on \u20b925 lakh revenue. What is the EBIT?", options: { A: "\u20b92.5 lakh", B: "\u20b95.5 lakh", C: "\u20b93 lakh", D: "\u20b98 lakh" } },
  { id: 72, section: 3, text: "If 3 machines produce 900 units in 5 hours, how long will 5 machines take to produce 1500 units?", options: { A: "5 hours", B: "3 hours", C: "6 hours", D: "4 hours" } },
  // Mechanical
  { id: 73, section: 3, text: "A lever of the first class has the fulcrum between the effort and the load. Which is an example?", options: { A: "Seesaw", B: "Wheelbarrow", C: "Nutcracker", D: "Fishing rod" } },
  { id: 74, section: 3, text: "Which material would best insulate an electrical wire?", options: { A: "Rubber", B: "Copper", C: "Steel", D: "Aluminium" } },
  { id: 75, section: 3, text: "A gear with 20 teeth drives a gear with 40 teeth. If the driving gear rotates at 100 RPM, the driven gear rotates at:", options: { A: "50 RPM", B: "200 RPM", C: "100 RPM", D: "80 RPM" } },
  { id: 76, section: 3, text: "What type of joint allows rotation in all directions?", options: { A: "Ball and socket", B: "Hinge", C: "Pivot", D: "Gliding" } },
  { id: 77, section: 3, text: "Which of the following best explains why a hollow cylinder is stronger than a solid cylinder of the same mass?", options: { A: "Greater second moment of area", B: "Less material density", C: "Higher tensile strength", D: "Greater thermal conductivity" } },
  { id: 78, section: 3, text: "In a hydraulic press, piston A has area 5 cm\u00b2 and piston B has area 50 cm\u00b2. A force of 100 N on A produces force on B of:", options: { A: "1000 N", B: "500 N", C: "50 N", D: "200 N" } },
  // Verbal
  { id: 79, section: 3, text: "Choose the word most similar in meaning to 'Articulate':", options: { A: "Eloquent", B: "Vague", C: "Hesitant", D: "Confused" } },
  { id: 80, section: 3, text: "Which sentence is grammatically correct?", options: { A: "The team has submitted its report.", B: "The team have submitted their reports.", C: "The team has submitted their report.", D: "The teams has submitted its report." } },
  { id: 81, section: 3, text: "Read: 'Despite resistance from stakeholders, the initiative succeeded due to persistent leadership.' What does 'despite' signal?", options: { A: "A contrast between resistance and success", B: "A cause of success", C: "A sequence of events", D: "A condition for failure" } },
  { id: 82, section: 3, text: "Rewrite in passive voice: 'The manager approved the proposal.'", options: { A: "The proposal was approved by the manager.", B: "The manager had approved the proposal.", C: "The proposal approved the manager.", D: "The proposal is being approved." } },
  { id: 83, section: 3, text: "Which rhetorical device is used: 'Our competitors are drowning in their own inefficiencies.'", options: { A: "Metaphor", B: "Simile", C: "Hyperbole", D: "Personification" } },
  { id: 84, section: 3, text: "A business report says: 'The data is not inconsistent with our hypothesis.' This means:", options: { A: "The data may support the hypothesis", B: "The data disproves the hypothesis", C: "The data definitely supports it", D: "The data is irrelevant" } },
  // Administrative
  { id: 85, section: 3, text: "Which tool is most appropriate for tracking a project's task completion across a team?", options: { A: "Project management software (e.g., Asana)", B: "Email threads", C: "Spreadsheets only", D: "Verbal check-ins" } },
  { id: 86, section: 3, text: "A well-structured agenda for a meeting should include:", options: { A: "Objectives, topics, time allocations, and owner", B: "Just the meeting time and location", C: "A list of attendees only", D: "Minutes from the last meeting" } },
  { id: 87, section: 3, text: "When managing multiple deadlines, the most effective approach is:", options: { A: "Prioritise by impact and urgency using a matrix", B: "Complete in order of receipt", C: "Focus only on the most urgent", D: "Delegate all tasks" } },
  { id: 88, section: 3, text: "Which document best captures decisions and action items from a meeting?", options: { A: "Minutes of the meeting", B: "Agenda", C: "Status report", D: "Project charter" } },
  { id: 89, section: 3, text: "When designing an operational procedure, the most important consideration is:", options: { A: "Clarity, consistency, and measurability", B: "Speed of implementation", C: "Length of the document", D: "Number of approvals required" } },
  { id: 90, section: 3, text: "Which governance framework is best for managing risk and compliance in a large organisation?", options: { A: "Three Lines of Defence model", B: "SWOT analysis", C: "OKR framework", D: "Balanced Scorecard" } },
];
