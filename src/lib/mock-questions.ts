import { WP_QUESTIONS } from "./questions-wp";
import { GR_QUESTIONS } from "./questions-gr";
import { UG_QUESTIONS } from "./questions-ug";

export type AudienceType = "ST" | "UG" | "GR" | "WP";

export interface Question {
  id: number;
  section: 1 | 2 | 3;
  text: string;
  options: { A: string; B: string; C: string; D: string };
}

const SA = { A: "Strongly Agree", B: "Agree", C: "Disagree", D: "Strongly Disagree" };
const YA = { A: "Yes, always", B: "Sometimes", C: "Rarely", D: "Never" };
const YO = { A: "Yes, often", B: "Sometimes", C: "Rarely", D: "Never" };
const YD = { A: "Yes, definitely", B: "Maybe", C: "Not really", D: "No" };
const YL = { A: "Yes, I love trying", B: "Sometimes if easy", C: "I ask for help", D: "No" };
const YVM = { A: "Yes, very much", B: "Sometimes", C: "Not much", D: "Not at all" };

const ALL_QUESTIONS: Question[] = [
  // ── SECTION 1: PASSION (RIASEC) ──────────────────────────────────────────
  // Realistic
  { id: 1, section: 1, text: "I enjoy building or making things with my hands during free time.", options: YA },
  { id: 2, section: 1, text: "I would rather do an experiment in the lab than write about it.", options: YD },
  { id: 3, section: 1, text: "When something at home breaks, I try to fix it myself.", options: YL },
  { id: 4, section: 1, text: "I prefer activities like woodworking, gardening, or sports over reading.", options: SA },
  { id: 5, section: 1, text: "I believe learning a skilled trade (like carpentry or coding hardware) is as valuable as a university degree.", options: SA },
  // Investigative
  { id: 6, section: 1, text: "I love asking 'why' and 'how' questions about things I learn in school.", options: YA },
  { id: 7, section: 1, text: "Science class is one of my favourites because I enjoy experiments.", options: SA },
  { id: 8, section: 1, text: "I like solving puzzles or brain teasers in my spare time.", options: YVM },
  { id: 9, section: 1, text: "I prefer reading books about how things work over storybooks.", options: SA },
  { id: 10, section: 1, text: "I think finding out why something happened is more interesting than just knowing what happened.", options: SA },
  // Artistic
  { id: 11, section: 1, text: "I enjoy drawing, painting, music, or writing as hobbies.", options: YA },
  { id: 12, section: 1, text: "I like making up my own stories or coming up with new game ideas.", options: YO },
  { id: 13, section: 1, text: "I feel bored when I have to do the same thing the same way every day.", options: SA },
  { id: 14, section: 1, text: "I would rather design a poster than prepare a spreadsheet for a school project.", options: SA },
  { id: 15, section: 1, text: "I believe art, music, or creative writing is just as important as maths or science in school.", options: SA },
  // Social
  { id: 16, section: 1, text: "I enjoy working with others in group projects more than working alone.", options: YA },
  { id: 17, section: 1, text: "I like helping my classmates when they don't understand something.", options: YA },
  { id: 18, section: 1, text: "I enjoy activities like volunteering, community events, or school clubs.", options: SA },
  { id: 19, section: 1, text: "I find it rewarding when my help makes a difference to someone.", options: SA },
  { id: 20, section: 1, text: "I believe working in a job where you help people is more meaningful than a high-paying solo career.", options: SA },
  // Enterprising
  { id: 21, section: 1, text: "I like being the leader in group projects or class activities.", options: YA },
  { id: 22, section: 1, text: "I enjoy persuading others to agree with my ideas.", options: YO },
  { id: 23, section: 1, text: "I like setting goals for myself and working hard to achieve them.", options: SA },
  { id: 24, section: 1, text: "I would enjoy starting my own business or club one day.", options: SA },
  { id: 25, section: 1, text: "I believe confidence and the ability to convince others are among the most important skills to develop.", options: SA },
  // Conventional
  { id: 26, section: 1, text: "I like to keep my notes, books, and room well-organised.", options: YA },
  { id: 27, section: 1, text: "I prefer following a clear set of rules and instructions for tasks.", options: YA },
  { id: 28, section: 1, text: "I feel uncomfortable when there are no clear instructions for an activity.", options: SA },
  { id: 29, section: 1, text: "I enjoy activities like organising events, managing schedules, or keeping records.", options: SA },
  { id: 30, section: 1, text: "I believe following rules carefully is more important than coming up with creative shortcuts.", options: SA },

  // ── SECTION 2: INDIVIDUALITY ─────────────────────────────────────────────
  // Emotional Intelligence
  { id: 31, section: 2, text: "I can usually tell when I am feeling angry, sad, or excited.", options: YA },
  { id: 32, section: 2, text: "I try to calm myself down before reacting when something upsets me.", options: YA },
  { id: 33, section: 2, text: "I notice when my friends are upset even if they say they are fine.", options: SA },
  { id: 34, section: 2, text: "I think before I speak when I am in a disagreement with someone.", options: SA },
  { id: 35, section: 2, text: "I can understand why someone might feel differently from me about the same situation.", options: SA },
  { id: 36, section: 2, text: "I can stay focused and perform well even when I am feeling anxious or stressed.", options: SA },
  // Efficiency
  { id: 37, section: 2, text: "I finish my homework before starting other activities.", options: YA },
  { id: 38, section: 2, text: "I make a to-do list or plan before starting a big assignment.", options: YA },
  { id: 39, section: 2, text: "I usually know which homework or task to do first when I have many things to complete.", options: SA },
  { id: 40, section: 2, text: "I avoid wasting time on unnecessary activities when I have important work to finish.", options: SA },
  { id: 41, section: 2, text: "I review my study methods regularly to see if there is a faster or better way to learn.", options: SA },
  { id: 42, section: 2, text: "I can manage multiple school subjects, activities, and responsibilities without dropping quality.", options: SA },
  // Empathy
  { id: 43, section: 2, text: "I try to understand how my friends feel when they have a problem.", options: YA },
  { id: 44, section: 2, text: "I feel sad when I see someone being left out or treated unfairly.", options: YO },
  { id: 45, section: 2, text: "I listen carefully before giving advice when a friend comes to me with a problem.", options: SA },
  { id: 46, section: 2, text: "I can understand why someone might do something I personally disagree with.", options: SA },
  { id: 47, section: 2, text: "I think about how my words and actions might affect others before I do them.", options: SA },
  { id: 48, section: 2, text: "I can stay calm and supportive when a friend is upset, even if I don't fully understand their situation.", options: SA },
  // Engagement
  { id: 49, section: 2, text: "I give my best effort even in subjects I don't particularly enjoy.", options: YA },
  { id: 50, section: 2, text: "I participate actively in class discussions and activities.", options: YA },
  { id: 51, section: 2, text: "I stay focused on a task even when it becomes difficult or boring.", options: SA },
  { id: 52, section: 2, text: "I feel excited when I learn something new or challenging.", options: SA },
  { id: 53, section: 2, text: "I continue working on something until I am satisfied with the result, even if it takes extra time.", options: SA },
  { id: 54, section: 2, text: "I take on additional responsibilities in school activities because I genuinely want to contribute.", options: SA },
  // Exploration
  { id: 55, section: 2, text: "I like trying new things and activities even if I am not sure I will be good at them.", options: YA },
  { id: 56, section: 2, text: "I enjoy learning about topics outside of what is taught in school.", options: YA },
  { id: 57, section: 2, text: "I am willing to change my opinion if I learn new information that challenges it.", options: SA },
  { id: 58, section: 2, text: "I explore different careers or subjects to find what interests me most.", options: SA },
  { id: 59, section: 2, text: "I believe trying and failing is a valuable part of learning.", options: SA },
  { id: 60, section: 2, text: "I actively seek information about the world around me through reading, podcasts, or documentaries.", options: SA },

  // ── SECTION 3: SKILL PROFICIENCY ─────────────────────────────────────────
  // Logical
  { id: 61, section: 3, text: "If a shape has 4 equal sides and 4 right angles, it is a:", options: { A: "Square", B: "Rectangle", C: "Rhombus", D: "Trapezium" } },
  { id: 62, section: 3, text: "All birds have wings. A penguin is a bird. Therefore:", options: { A: "A penguin has wings", B: "A penguin can fly", C: "All birds are penguins", D: "Wings are for flying" } },
  { id: 63, section: 3, text: "What comes next in the series: 1, 4, 9, 16, ?", options: { A: "25", B: "20", C: "24", D: "30" } },
  { id: 64, section: 3, text: "If you have 3 red balls and 2 blue balls in a bag, what is the chance of picking a red ball?", options: { A: "3/5", B: "2/5", C: "1/2", D: "3/2" } },
  { id: 65, section: 3, text: "A train travels at 60 km/h. Another train travels toward it at 40 km/h. They are 200 km apart. When do they meet?", options: { A: "2 hours", B: "3 hours", C: "4 hours", D: "5 hours" } },
  { id: 66, section: 3, text: "All honest people tell the truth. Tom does not tell the truth. What can you conclude?", options: { A: "Tom is not honest", B: "Tom is dishonest always", C: "All liars are like Tom", D: "Nothing can be concluded" } },
  // Numerical
  { id: 67, section: 3, text: "What is 15% of 200?", options: { A: "30", B: "25", C: "35", D: "20" } },
  { id: 68, section: 3, text: "If a shirt costs \u20b9500 and is discounted by 20%, what is the sale price?", options: { A: "\u20b9400", B: "\u20b9450", C: "\u20b9380", D: "\u20b9420" } },
  { id: 69, section: 3, text: "A rectangle is 12 cm long and 8 cm wide. What is its area?", options: { A: "96 cm\u00b2", B: "80 cm\u00b2", C: "48 cm\u00b2", D: "104 cm\u00b2" } },
  { id: 70, section: 3, text: "A train travels 180 km in 3 hours. What is its average speed?", options: { A: "60 km/h", B: "45 km/h", C: "90 km/h", D: "70 km/h" } },
  { id: 71, section: 3, text: "The ratio of boys to girls in a class is 3:2. If there are 30 students, how many are girls?", options: { A: "12", B: "15", C: "18", D: "10" } },
  { id: 72, section: 3, text: "A principal of \u20b95000 earns simple interest at 6% per annum. What is the total amount after 3 years?", options: { A: "\u20b95900", B: "\u20b95600", C: "\u20b96000", D: "\u20b95300" } },
  // Mechanical
  { id: 73, section: 3, text: "Which simple machine is a screwdriver?", options: { A: "Wheel and axle", B: "Lever", C: "Pulley", D: "Inclined plane" } },
  { id: 74, section: 3, text: "What does a fuse do in an electrical circuit?", options: { A: "Breaks the circuit when current is too high", B: "Increases voltage", C: "Stores electricity", D: "Reduces resistance" } },
  { id: 75, section: 3, text: "If you increase the length of a lever arm, the effort required to lift the same load:", options: { A: "Decreases", B: "Increases", C: "Stays the same", D: "Doubles always" } },
  { id: 76, section: 3, text: "A pulley system with 3 supporting ropes would reduce the effort needed to lift a load by approximately:", options: { A: "3 times", B: "2 times", C: "Half", D: "It doesn't change" } },
  { id: 77, section: 3, text: "Water pressure at the bottom of a 10 m deep pool is greater than at 5 m because:", options: { A: "More water weight above creates more pressure", B: "Temperature is lower", C: "Volume is larger", D: "Flow rate increases" } },
  { id: 78, section: 3, text: "A wooden block floats in water because:", options: { A: "Its density is less than water", B: "Its volume is large", C: "It has air inside", D: "Water repels wood" } },
  // Verbal
  { id: 79, section: 3, text: "Choose the antonym of 'brave':", options: { A: "Cowardly", B: "Bold", C: "Fearless", D: "Daring" } },
  { id: 80, section: 3, text: "Fill in the blank: 'She ___ her homework before dinner.'", options: { A: "finished", B: "finish", C: "finishes", D: "finishing" } },
  { id: 81, section: 3, text: "Read: 'The ancient tree stood silently as storms raged around it.' What does this suggest about the tree?", options: { A: "It is strong and enduring", B: "It is weak", C: "It enjoys storms", D: "It will fall soon" } },
  { id: 82, section: 3, text: "Identify the figure of speech: 'The stars danced in the night sky.'", options: { A: "Personification", B: "Simile", C: "Metaphor", D: "Alliteration" } },
  { id: 83, section: 3, text: "What is the main idea? 'Bees pollinate flowers, helping fruits and vegetables grow. Without bees, food production would fall drastically.'", options: { A: "Bees are essential to food production", B: "Bees make honey", C: "Flowers need water", D: "Fruits grow in summer" } },
  { id: 84, section: 3, text: "Which sentence uses a semicolon correctly?", options: { A: "She studied hard; she passed the exam.", B: "She studied hard; and she passed.", C: "She studied; hard and passed.", D: "She; studied hard and passed." } },
  // Administrative
  { id: 85, section: 3, text: "What is the best way to organise your study schedule for exams?", options: { A: "Plan time for each subject and stick to it", B: "Study only the night before", C: "Study only what you enjoy", D: "Study randomly as you feel like it" } },
  { id: 86, section: 3, text: "Which of these is most useful for keeping track of school assignments and deadlines?", options: { A: "A planner or calendar", B: "Your memory only", C: "A friend's notes", D: "Only your teacher's reminders" } },
  { id: 87, section: 3, text: "Before starting a group project, the most important first step is:", options: { A: "Assign clear roles and responsibilities to each member", B: "Start working immediately", C: "Decide who will present", D: "Find the easiest tasks first" } },
  { id: 88, section: 3, text: "If you realise you will miss a deadline, what should you do first?", options: { A: "Inform the teacher or responsible person immediately", B: "Ignore it and hope for the best", C: "Ask a friend to handle it", D: "Submit incomplete work without notice" } },
  { id: 89, section: 3, text: "A good class representative manages requests from classmates by:", options: { A: "Recording all requests and addressing them systematically", B: "Handling them only when convenient", C: "Passing all requests verbally to the teacher", D: "Ignoring minor requests" } },
  { id: 90, section: 3, text: "To run a successful school event, the most critical administrative step is:", options: { A: "Detailed planning, logistics, and contingency preparation", B: "Choosing the right venue only", C: "Getting the most popular students involved", D: "Announcing it on the last day" } },
];

export function getMockQuestions(): Question[] {
  return ALL_QUESTIONS;
}

export function getQuestions(audience: AudienceType = "ST"): Question[] {
  switch (audience) {
    case "WP": return WP_QUESTIONS;
    case "GR": return GR_QUESTIONS;
    case "UG": return UG_QUESTIONS;
    case "ST":
    default:   return ALL_QUESTIONS;
  }
}
