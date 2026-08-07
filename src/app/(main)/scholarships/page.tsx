"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  Calendar,
  IndianRupee,
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Star,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  category: string;
  level: string;
  state: string;
  url: string;
  featured: boolean;
  status?: "active" | "maintenance";
}

const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "s1",
    name: "National Merit Scholarship (NMSC)",
    provider: "Ministry of Education",
    amount: "₹12,000/year",
    deadline: "2025-09-30",
    eligibility: ["Class 8-12 students", "Family income < ₹3.5L", "Minimum 55% marks"],
    category: "Merit",
    level: "School",
    state: "All India",
    url: "https://scholarships.gov.in/",
    featured: true,
    status: "maintenance"
  },
  {
    id: "s2",
    name: "Post Matric Scholarship (SC/ST)",
    provider: "Govt of India",
    amount: "Full tuition + maintenance",
    deadline: "2025-10-15",
    eligibility: ["SC/ST students", "Family income < ₹2.5L", "Post-matric education"],
    category: "Caste-based",
    level: "College",
    state: "All India",
    url: "https://scholarships.gov.in/",
    featured: true,
    status: "maintenance"
  },
  {
    id: "s3",
    name: "HDFC Educational Crisis Scholarship",
    provider: "HDFC Bank",
    amount: "₹25,000 - ₹1,00,000",
    deadline: "2025-08-31",
    eligibility: ["Family crisis situation", "Class 6-12 or UG", "Academic record"],
    category: "Need-based",
    level: "All",
    state: "All India",
    url: "https://www.buddy4study.com/page/hdfc-group-social-initiative-scholarship",
    featured: false
  },
  {
    id: "s4",
    name: "Tata Capital Pankh Scholarship",
    provider: "Tata Capital",
    amount: "Up to ₹50,000",
    deadline: "2025-09-15",
    eligibility: ["Class 11-12 or UG", "Meritorious students", "Family income < ₹6L"],
    category: "Merit",
    level: "School",
    state: "All India",
    url: "https://www.buddy4study.com/page/tata-capital-pankh-scholarship",
    featured: false
  },
  {
    id: "s5",
    name: "SBI Youth for India Fellowship",
    provider: "SBI Foundation",
    amount: "₹15,000/month + accommodation",
    deadline: "2025-11-30",
    eligibility: ["Graduates (21-32 years)", "Rural development project", "Full-time commitment"],
    category: "Fellowship",
    level: "Graduate",
    state: "All India",
    url: "https://youthforindia.org/",
    featured: true
  },
  {
    id: "s6",
    name: "KC Mahindra Scholarship for UG",
    provider: "KC Mahindra Trust",
    amount: "₹1,00,000/year",
    deadline: "2025-10-31",
    eligibility: ["UG students in India", "Academic excellence", "Financial need"],
    category: "Merit-cum-need",
    level: "College",
    state: "All India",
    url: "https://www.kcmet.org/what-we-do-Scholarship-Grants.aspx",
    featured: false
  },
  {
    id: "s7",
    name: "Telangana ePass Scholarship",
    provider: "TS Govt",
    amount: "Full fee reimbursement",
    deadline: "2025-11-15",
    eligibility: ["BC/SC/ST students", "Telangana residents", "Family income < ₹2L"],
    category: "Caste-based",
    level: "College",
    state: "Telangana",
    url: "https://telanganaepass.cgg.gov.in/",
    featured: false
  },
  {
    id: "s8",
    name: "Karnataka Vidyasiri Scholarship",
    provider: "KS Govt",
    amount: "₹1,500/month",
    deadline: "2025-09-30",
    eligibility: ["SC/ST students", "Karnataka residents", "Hostellers"],
    category: "Caste-based",
    level: "College",
    state: "Karnataka",
    url: "https://karepass.cgg.gov.in/",
    featured: false
  },
  {
    id: "s9",
    name: "Inlaks Shivdasani Foundation",
    provider: "Inlaks Foundation",
    amount: "Full funding for Masters abroad",
    deadline: "2026-03-15",
    eligibility: ["First class Bachelor's", "Admission to top uni abroad", "Under 30 years"],
    category: "Study Abroad",
    level: "Graduate",
    state: "All India",
    url: "https://www.inlaksfoundation.org/",
    featured: true
  },
  {
    id: "s10",
    name: "Jindal Global University Merit Scholarship",
    provider: "JGU",
    amount: "25-100% tuition waiver",
    deadline: "2025-07-31",
    eligibility: ["UG/PG admission", "High academic scores", "Co-curricular excellence"],
    category: "Merit",
    level: "College",
    state: "Haryana",
    url: "https://jgu.edu.in/admissions/scholarships/",
    featured: false
  }
];

const CATEGORIES = ["All", "Merit", "Need-based", "Caste-based", "Merit-cum-need", "Fellowship", "Study Abroad"];
const LEVELS = ["All", "School", "College", "Graduate"];

export default function ScholarshipsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maintenanceScholarship, setMaintenanceScholarship] = useState<Scholarship | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySuccess(true);
    setTimeout(() => {
      setNotifySuccess(false);
      setNotifyEmail("");
      setMaintenanceScholarship(null);
    }, 3000);
  };

  const filtered = SCHOLARSHIPS.filter(s => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || s.level === selectedLevel;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const featured = filtered.filter(s => s.featured);
  const regular = filtered.filter(s => !s.featured);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold mb-6"
          >
            <Star size={16} /> Scholarship Finder
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Never Miss a Scholarship
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Every scholarship in India — central, state, private, and international — matched to your profile automatically.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Scholarships Listed", value: "500+" },
            { label: "Total Value", value: "₹200Cr+" },
            { label: "Students Helped", value: "12,000+" },
            { label: "Success Rate", value: "68%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
              <p className="text-2xl font-black text-brand-blue">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search scholarships by name or provider..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none font-medium text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase self-center mr-2">Category:</span>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === c
                      ? 'bg-brand-blue text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase self-center mr-2">Level:</span>
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLevel(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === l
                      ? 'bg-brand-orange text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Featured Scholarships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} onMaintenanceClick={setMaintenanceScholarship} />
              ))}
            </div>
          </div>
        )}

        {/* Regular */}
        <div>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">All Scholarships ({regular.length})</h2>
          <div className="space-y-3">
            {regular.map((s) => (
              <ScholarshipRow key={s.id} scholarship={s} onMaintenanceClick={setMaintenanceScholarship} />
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Modal Dialog */}
      <AnimatePresence>
        {maintenanceScholarship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative overflow-hidden animate-in fade-in duration-300"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setMaintenanceScholarship(null);
                  setNotifySuccess(false);
                  setNotifyEmail("");
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all font-bold text-sm"
              >
                ✕
              </button>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-2 border border-amber-100 shadow-sm animate-pulse">
                  <AlertCircle size={32} />
                </div>
                
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  National Scholarship Portal is Under Scheduled Maintenance
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  The official government portal (<span className="font-mono text-slate-600 text-xs">scholarships.gov.in</span>) for <span className="font-bold text-slate-700">{maintenanceScholarship.name}</span> is temporarily offline for backend maintenance. External application forms are currently unreachable.
                </p>

                <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 text-left">
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    💡 <strong>Note:</strong> We are actively monitoring the portal status. Enter your email below, and we will automatically notify you the moment the server is back online!
                  </p>
                </div>

                {notifySuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-4 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200"
                  >
                    <CheckCircle2 className="text-emerald-500 mx-auto" size={28} />
                    <p className="text-sm font-bold text-emerald-800">You're on the list!</p>
                    <p className="text-xs text-emerald-600">We'll alert you the instant the NSP portal goes live.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNotifySubmit} className="space-y-2 pt-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none font-medium text-sm text-center"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => window.open(maintenanceScholarship.url, "_blank")}
                        className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 text-xs transition-all"
                      >
                        Try Portal Anyway
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 text-xs transition-all shadow-md shadow-amber-500/10"
                      >
                        Notify Me When Online
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScholarshipCard({ scholarship: s, onMaintenanceClick }: { scholarship: Scholarship; onMaintenanceClick: (s: Scholarship) => void }) {
  const daysLeft = Math.ceil((new Date(s.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysLeft <= 30;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="inline-block px-2 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-wider">
                {s.category}
              </span>
              {s.status === "maintenance" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/30 text-amber-200 border border-amber-500/50 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  <AlertCircle size={10} /> Maintenance
                </span>
              )}
            </div>
            <h3 className="text-lg font-black">{s.name}</h3>
            <p className="text-sm text-blue-200">{s.provider}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black">{s.amount}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1">
            <Clock size={14} className={isUrgent ? 'text-red-300' : 'text-blue-200'} />
            {isUrgent ? `${daysLeft} days left` : new Date(s.deadline).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-blue-200" /> {s.state}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {s.eligibility.slice(0, 2).map((e, i) => (
            <span key={i} className="px-2 py-1 bg-white/10 rounded-lg text-xs font-bold">{e}</span>
          ))}
        </div>
      </div>
      {s.status === "maintenance" ? (
        <Button 
          onClick={() => onMaintenanceClick(s)}
          className="w-full bg-amber-500 text-white font-bold py-5 rounded-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
        >
          Check Portal Status <AlertCircle size={16} />
        </Button>
      ) : (
        <Link href={s.url} target="_blank" rel="noopener noreferrer" className="w-full mt-auto block">
          <Button className="w-full bg-white text-brand-blue font-bold py-5 rounded-xl hover:bg-blue-50/90 transition-all flex items-center justify-center gap-2">
            Apply Now <ExternalLink size={16} />
          </Button>
        </Link>
      )}
    </motion.div>
  );
}

function ScholarshipRow({ scholarship: s, onMaintenanceClick }: { scholarship: Scholarship; onMaintenanceClick: (s: Scholarship) => void }) {
  const daysLeft = Math.ceil((new Date(s.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysLeft <= 30;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-blue transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
            <GraduationCap size={24} className="text-brand-blue" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800">{s.name}</h3>
              {s.status === "maintenance" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[9px] font-bold uppercase tracking-wider">
                  <AlertCircle size={10} /> Maintenance
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">{s.provider} · {s.level}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-bold uppercase">Amount</p>
            <p className="font-black text-slate-800">{s.amount}</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-bold uppercase">Deadline</p>
            <p className={`font-bold text-sm ${isUrgent ? 'text-red-600' : 'text-slate-700'}`}>
              {isUrgent ? `${daysLeft} days` : new Date(s.deadline).toLocaleDateString()}
            </p>
          </div>
          {s.status === "maintenance" ? (
            <Button 
              onClick={() => onMaintenanceClick(s)}
              variant="outline" 
              className="border-amber-500 text-amber-600 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2"
            >
              Maintenance <AlertCircle size={14} />
            </Button>
          ) : (
            <Link href={s.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-brand-blue text-brand-blue font-bold rounded-xl hover:bg-brand-blue hover:text-white transition-all flex items-center gap-2">
                Apply <ExternalLink size={14} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
