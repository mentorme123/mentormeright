"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Heart, 
  Briefcase, 
  Building2,
  GraduationCap,
  MapPin,
  Star,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareerSimulation {
  role: string;
  company: string;
  location: string;
  startingSalary: string;
  fiveYearSalary: string;
  tenYearSalary: string;
  workLifeBalance: number;
  stressLevel: number;
  growthTrajectory: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  dailyRoutine: string[];
  skillsNeeded: string[];
}

const DEMO_CAREERS: Record<string, CareerSimulation> = {
  "software-engineer": {
    role: "Software Engineer",
    company: "Google / Flipkart / Startups",
    location: "Bangalore / Hyderabad / Remote",
    startingSalary: "₹8–15 LPA",
    fiveYearSalary: "₹25–45 LPA",
    tenYearSalary: "₹50L–2 Cr (Staff/Principal)",
    workLifeBalance: 7,
    stressLevel: 6,
    growthTrajectory: "Exponential — tech scales infinitely",
    requirements: ["B.Tech / BCA / Self-taught", "DSA & System Design", "1+ coding language"],
    pros: ["High remote-work flexibility", "Fast salary growth", "Global opportunities", "Creative problem-solving"],
    cons: ["Rapid skill obsolescence", "Sedentary lifestyle", "Interview grind never ends"],
    dailyRoutine: [
      "9:00 AM — Standup & sprint planning",
      "10:30 AM — Deep coding session",
      "1:00 PM — Lunch + learn new tech",
      "3:00 PM — Code review & collaboration",
      "5:00 PM — Deploy & monitor"
    ],
    skillsNeeded: ["Python / Java / Go", "Cloud (AWS/GCP)", "System Design", "DSA"]
  },
  "data-scientist": {
    role: "Data Scientist",
    company: "Swiggy / Ola / consultancies",
    location: "Bangalore / Gurgaon / Pune",
    startingSalary: "₹10–18 LPA",
    fiveYearSalary: "₹30–60 LPA",
    tenYearSalary: "₹70L–3 Cr (Director AI)",
    workLifeBalance: 7,
    stressLevel: 5,
    growthTrajectory: "Steep — AI is eating every industry",
    requirements: ["B.Tech / M.Sc / M.Tech (Stats/CS)", "Strong in math & stats", "Python + SQL mastery"],
    pros: ["High intellectual satisfaction", "Cross-industry demand", "Research-like work", "Great WLB at senior levels"],
    cons: ["Heavy math prerequisites", "Data cleaning is 80% of job", "Harder to break in without pedigree"],
    dailyRoutine: [
      "9:30 AM — Check experiment results",
      "10:30 AM — Data pipeline debugging",
      "1:00 PM — Model training & tuning",
      "3:30 PM — Stakeholder presentations",
      "5:30 PM — Research paper reading"
    ],
    skillsNeeded: ["Python + SQL", "Statistics & Probability", "Machine Learning", "Data Visualization"]
  },
  "doctor": {
    role: "Doctor (General Physician → Specialist)",
    company: "Apollo / AIIMS / Private Practice",
    location: "All major cities",
    startingSalary: "₹6–12 LPA (Post-MD)",
    fiveYearSalary: "₹15–35 LPA",
    tenYearSalary: "₹40L–1.5 Cr (Senior Surgeon)",
    workLifeBalance: 3,
    stressLevel: 9,
    growthTrajectory: "Slow initial, very stable later",
    requirements: ["MBBS + MD/MS (10+ years)", "NEET-UG & NEET-PG clearance", "Long residency hours"],
    pros: ["Unmatched social respect", "Job security for life", "Direct human impact", "Can open own clinic"],
    cons: ["Extremely long training", "24/7 on-call stress", "Physical & emotional burnout", "High malpractice liability"],
    dailyRoutine: [
      "8:00 AM — Ward rounds",
      "10:00 AM — OPD consultations (40+ patients)",
      "1:30 PM — Surgery / procedures",
      "4:00 PM — Case discussions & teaching",
      "7:00 PM — Emergency duty (every 4th day)"
    ],
    skillsNeeded: ["Clinical diagnosis", "Patient communication", "Surgical precision", "Crisis management"]
  },
  "ias-officer": {
    role: "IAS Officer",
    company: "Government of India",
    location: "Posting across India",
    startingSalary: "₹56,100/month + DA + perks",
    fiveYearSalary: "₹78,800/month + bungalow + staff",
    tenYearSalary: "₹1,44,200/month + Secretary-level perks",
    workLifeBalance: 4,
    stressLevel: 8,
    growthTrajectory: "Predictable — time-based promotions",
    requirements: ["Any graduation", "UPSC CSE clearance (0.2% success)", "2–4 years of dedicated prep"],
    pros: ["Maximum social prestige", "Job security + pension", "Power to shape policy", "Free housing, vehicle, staff"],
    cons: ["0.2% selection rate", "Political interference", "Frequent transfers", "Bureaucratic red tape"],
    dailyRoutine: [
      "9:00 AM — Review district reports",
      "11:00 AM — Public grievance hearings",
      "2:00 PM — Policy meetings with ministers",
      "4:00 PM — Field inspection visits",
      "7:00 PM — Prepare for next day's hearings"
    ],
    skillsNeeded: ["Political acumen", "Administration", "Crisis management", "Ethical decision-making"]
  },
  "product-manager": {
    role: "Product Manager",
    company: "Zerodha / CRED / unicorns",
    location: "Bangalore / Mumbai / Remote",
    startingSalary: "₹15–25 LPA",
    fiveYearSalary: "₹40–80 LPA",
    tenYearSalary: "₹1–5 Cr (CPO / VP Product)",
    workLifeBalance: 6,
    stressLevel: 7,
    growthTrajectory: "Very steep — PMs become founders/CEOs",
    requirements: ["Any degree (MBA preferred)", "Strong in communication & strategy", "Technical fluency"],
    pros: ["CEO training ground", "High autonomy", "Cross-functional leadership", "Equity upside at startups"],
    cons: ["Accountable for everything", "Constant stakeholder management", "No clear 'output' metric", "High politics"],
    dailyRoutine: [
      "9:00 AM — Review metrics dashboard",
      "10:30 AM — User research calls",
      "1:00 PM — Sprint planning with engineering",
      "3:30 PM — Stakeholder alignment meetings",
      "5:30 PM — Write PRD for next feature"
    ],
    skillsNeeded: ["User empathy", "Data-driven decisions", "Stakeholder management", "Technical fluency"]
  }
};

export default function CareerSimulatorPage() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);

  const simulate = (careerKey: string) => {
    setSimulating(true);
    setSelectedCareer(null);
    setTimeout(() => {
      setSelectedCareer(careerKey);
      setSimulating(false);
    }, 1500);
  };

  const career = selectedCareer ? DEMO_CAREERS[selectedCareer] : null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6"
          >
            <Star size={16} /> AI Career Simulator
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Simulate Your Future Career
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Don't just read about careers — live them. See salary trajectories, daily routines, stress levels, and growth paths for India's top professions.
          </motion.p>
        </div>

        {/* Career Selector */}
        {!selectedCareer && !simulating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          >
            {Object.entries(DEMO_CAREERS).map(([key, c]) => (
              <button
                key={key}
                onClick={() => simulate(key)}
                className="group text-left bg-slate-50 hover:bg-brand-blue hover:text-white p-6 rounded-2xl border border-slate-200 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 group-hover:bg-white/20 flex items-center justify-center">
                    <Play size={20} className="text-brand-blue group-hover:text-white" />
                  </div>
                  <h3 className="font-black text-lg">{c.role}</h3>
                </div>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 mb-2">{c.company}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-blue-200">
                  <MapPin size={12} /> {c.location}
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {simulating && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-brand-blue mb-4" />
            <p className="text-slate-500 font-bold">Running AI simulation...</p>
          </div>
        )}

        {/* Simulation Result */}
        <AnimatePresence>
          {career && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8"
            >
              {/* Top Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<DollarSign size={20} />} label="Starting Salary" value={career.startingSalary} color="text-emerald-600" bg="bg-emerald-50" />
                <StatCard icon={<TrendingUp size={20} />} label="5-Year Salary" value={career.fiveYearSalary} color="text-brand-blue" bg="bg-blue-50" />
                <StatCard icon={<TrendingUp size={20} />} label="10-Year Salary" value={career.tenYearSalary} color="text-purple-600" bg="bg-purple-50" />
                <StatCard icon={<Heart size={20} />} label="Work-Life Balance" value={`${career.workLifeBalance}/10`} color="text-rose-500" bg="bg-rose-50" />
              </div>

              {/* Stress & Growth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500" /> Stress Level
                  </h3>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${career.stressLevel * 10}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        career.stressLevel > 7 ? 'bg-red-500' : career.stressLevel > 4 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2 font-medium">{career.stressLevel}/10 — {career.stressLevel > 7 ? 'High burnout risk' : career.stressLevel > 4 ? 'Moderate — manageable with boundaries' : 'Relatively relaxed'}</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-brand-blue" /> Growth Trajectory
                  </h3>
                  <p className="text-slate-600 font-bold text-lg">{career.growthTrajectory}</p>
                </div>
              </div>

              {/* Requirements & Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <GraduationCap size={18} className="text-brand-blue" /> Requirements
                  </h3>
                  <ul className="space-y-2">
                    {career.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={14} className="text-brand-blue shrink-0" /> {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Star size={18} className="text-brand-orange" /> Skills You Need
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {career.skillsNeeded.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Routine */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-brand-blue" /> A Day in the Life
                </h3>
                <div className="space-y-3">
                  {career.dailyRoutine.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs font-black shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
                  <h3 className="font-black text-emerald-800 mb-4">Pros</h3>
                  <ul className="space-y-2">
                    {career.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-emerald-700">
                        <CheckCircle2 size={14} className="shrink-0" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                  <h3 className="font-black text-red-800 mb-4">Cons</h3>
                  <ul className="space-y-2">
                    {career.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-red-700">
                        <AlertTriangle size={14} className="shrink-0" /> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reset */}
              <div className="text-center pt-8">
                <Button
                  onClick={() => { setSelectedCareer(null); setSimulating(false); }}
                  variant="outline"
                  className="px-8 py-6 rounded-xl font-bold text-lg"
                >
                  <RotateCcw size={18} className="mr-2" /> Simulate Another Career
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: string; color: string; bg: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-lg font-black text-slate-800 mt-1">{value}</p>
    </div>
  );
}
