"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Building2,
  MapPin,
  BookOpen,
  ChevronRight,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollegePrediction {
  name: string;
  branch: string;
  location: string;
  cutoff: number;
  chance: "high" | "medium" | "low";
  type: "IIT" | "NIT" | "IIIT" | "GFTI" | "State";
  fees: string;
  placement: string;
}

const COLLEGE_DATA: Record<string, CollegePrediction[]> = {
  "jee": [
    { name: "IIT Bombay", branch: "Computer Science", location: "Mumbai", cutoff: 99.9, chance: "low", type: "IIT", fees: "₹2.3L/year", placement: "₹25 LPA avg" },
    { name: "IIT Delhi", branch: "Computer Science", location: "Delhi", cutoff: 99.8, chance: "low", type: "IIT", fees: "₹2.2L/year", placement: "₹24 LPA avg" },
    { name: "NIT Trichy", branch: "Computer Science", location: "Trichy", cutoff: 99.2, chance: "medium", type: "NIT", fees: "₹1.8L/year", placement: "₹15 LPA avg" },
    { name: "NIT Surathkal", branch: "Computer Science", location: "Surathkal", cutoff: 99.0, chance: "medium", type: "NIT", fees: "₹1.7L/year", placement: "₹14 LPA avg" },
    { name: "IIIT Hyderabad", branch: "Computer Science", location: "Hyderabad", cutoff: 98.5, chance: "medium", type: "IIIT", fees: "₹3.0L/year", placement: "₹22 LPA avg" },
    { name: "BITS Pilani", branch: "Computer Science", location: "Pilani", cutoff: 98.0, chance: "high", type: "GFTI", fees: "₹5.5L/year", placement: "₹18 LPA avg" },
    { name: "VIT Vellore", branch: "Computer Science", location: "Vellore", cutoff: 95.0, chance: "high", type: "GFTI", fees: "₹3.0L/year", placement: "₹10 LPA avg" },
    { name: "SRM University", branch: "Computer Science", location: "Chennai", cutoff: 90.0, chance: "high", type: "GFTI", fees: "₹3.5L/year", placement: "₹7 LPA avg" },
  ],
  "neet": [
    { name: "AIIMS Delhi", branch: "MBBS", location: "Delhi", cutoff: 99.9, chance: "low", type: "IIT", fees: "₹10K/year", placement: "Govt Service" },
    { name: "CMC Vellore", branch: "MBBS", location: "Vellore", cutoff: 99.5, chance: "medium", type: "NIT", fees: "₹50K/year", placement: "₹12 LPA avg" },
    { name: "KGMU Lucknow", branch: "MBBS", location: "Lucknow", cutoff: 98.0, chance: "medium", type: "NIT", fees: "₹50K/year", placement: "₹10 LPA avg" },
    { name: "MAMC Delhi", branch: "MBBS", location: "Delhi", cutoff: 99.0, chance: "medium", type: "NIT", fees: "₹20K/year", placement: "₹15 LPA avg" },
    { name: "BJMC Pune", branch: "MBBS", location: "Pune", cutoff: 97.0, chance: "high", type: "IIIT", fees: "₹1L/year", placement: "₹10 LPA avg" },
  ],
  "clat": [
    { name: "NLSIU Bangalore", branch: "BA LLB", location: "Bangalore", cutoff: 99.0, chance: "low", type: "IIT", fees: "₹3L/year", placement: "₹18 LPA avg" },
    { name: "NLU Delhi", branch: "BA LLB", location: "Delhi", cutoff: 98.5, chance: "medium", type: "IIT", fees: "₹2.5L/year", placement: "₹16 LPA avg" },
    { name: "NALSAR Hyderabad", branch: "BA LLB", location: "Hyderabad", cutoff: 97.0, chance: "medium", type: "NIT", fees: "₹2.8L/year", placement: "₹14 LPA avg" },
    { name: "NLIU Bhopal", branch: "BA LLB", location: "Bhopal", cutoff: 95.0, chance: "high", type: "NIT", fees: "₹2.2L/year", placement: "₹10 LPA avg" },
    { name: "Symbiosis Law", branch: "BA LLB", location: "Pune", cutoff: 92.0, chance: "high", type: "GFTI", fees: "₹4L/year", placement: "₹8 LPA avg" },
  ]
};

const EXAMS = [
  { key: "jee", name: "JEE Main / Advanced", icon: <Calculator size={20} /> },
  { key: "neet", name: "NEET UG", icon: <GraduationCap size={20} /> },
  { key: "clat", name: "CLAT", icon: <BookOpen size={20} /> },
];

export default function ExamPredictorPage() {
  const [selectedExam, setSelectedExam] = useState("jee");
  const [percentile, setPercentile] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handlePredict = () => {
    if (percentile) setShowResults(true);
  };

  const colleges = COLLEGE_DATA[selectedExam] || [];
  const numPercentile = parseFloat(percentile) || 0;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-5xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6"
          >
            <TrendingUp size={16} /> AI Exam Predictor
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Predict Your College
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Based on historical cutoff data and your expected percentile, see which colleges you can get into.
          </motion.p>
        </div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl border-2 border-slate-200 p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Exam Selector */}
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 block">Select Exam</label>
              <div className="space-y-2">
                {EXAMS.map((exam) => (
                  <button
                    key={exam.key}
                    onClick={() => { setSelectedExam(exam.key); setShowResults(false); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left font-bold transition-all ${
                      selectedExam === exam.key
                        ? 'bg-brand-blue text-white shadow-lg'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {exam.icon}
                    {exam.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Percentile Input */}
            <div className="md:col-span-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 block">Your Expected Percentile</label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={percentile}
                    onChange={(e) => setPercentile(e.target.value)}
                    placeholder="e.g. 98.5"
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-brand-blue focus:outline-none font-bold text-lg text-slate-800"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
                <Button
                  onClick={handlePredict}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 rounded-xl text-lg"
                >
                  <Search size={20} className="mr-2" /> Predict
                </Button>
              </div>

              {!showResults && (
                <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-800 mb-3">How It Works</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: <Calculator size={20} />, text: "Enter your mock test percentile" },
                      { icon: <TrendingUp size={20} />, text: "We match with historical cutoffs" },
                      { icon: <CheckCircle2 size={20} />, text: "See your admission probability" },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shrink-0">
                          {step.icon}
                        </div>
                        <p className="text-sm font-bold text-slate-600">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-slate-800">
                Predictions for {EXAMS.find(e => e.key === selectedExam)?.name} at {percentile} percentile
              </h2>
              <span className="text-sm text-slate-500">{colleges.length} colleges found</span>
            </div>

            <div className="space-y-3">
              {colleges.map((college, i) => {
                const chance = numPercentile >= college.cutoff ? "high" :
                               numPercentile >= college.cutoff - 2 ? "medium" : "low";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-2xl border p-6 transition-all hover:shadow-lg ${
                      chance === "high" ? 'border-emerald-200 bg-emerald-50/30' :
                      chance === "medium" ? 'border-amber-200 bg-amber-50/30' :
                      'border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm ${
                          college.type === "IIT" ? 'bg-amber-100 text-amber-700' :
                          college.type === "NIT" ? 'bg-blue-100 text-blue-700' :
                          college.type === "IIIT" ? 'bg-purple-100 text-purple-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {college.type}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-800">{college.name}</h3>
                          <p className="text-sm text-slate-500">{college.branch} · <MapPin size={12} className="inline" /> {college.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold uppercase">Cutoff</p>
                          <p className="font-black text-slate-700">{college.cutoff}%ile</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold uppercase">Fees</p>
                          <p className="font-black text-slate-700">{college.fees}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold uppercase">Placements</p>
                          <p className="font-black text-slate-700">{college.placement}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          chance === "high" ? 'bg-emerald-100 text-emerald-700' :
                          chance === "medium" ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {chance === "high" ? 'Safe' : chance === "medium" ? 'Maybe' : 'Tough'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
              <AlertTriangle size={20} className="text-brand-blue shrink-0" />
              <p className="text-sm text-slate-600">
                <strong>Disclaimer:</strong> Predictions are based on historical data and may vary. Actual cutoffs depend on exam difficulty, number of applicants, and reservation categories.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
