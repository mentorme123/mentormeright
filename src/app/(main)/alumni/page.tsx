"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  IndianRupee,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alumni {
  id: string;
  name: string;
  college: string;
  company: string;
  role: string;
  location: string;
  batch: string;
  domain: string;
  rating: number;
  sessions: number;
  price: number;
  verified: boolean;
  bio: string;
}

const ALUMNI_DATA: Alumni[] = [
  {
    id: "a1",
    name: "Rohan Mehta",
    college: "IIT Bombay",
    company: "Google",
    role: "Senior Software Engineer",
    location: "Bangalore",
    batch: "2018",
    domain: "Technology",
    rating: 4.9,
    sessions: 127,
    price: 499,
    verified: true,
    bio: "Ex-Flipkart, now at Google. Can guide on DSA, system design, and cracking FAANG interviews."
  },
  {
    id: "a2",
    name: "Priya Sharma",
    college: "AIIMS Delhi",
    company: "Apollo Hospitals",
    role: "Cardiologist",
    location: "Delhi",
    batch: "2016",
    domain: "Medicine",
    rating: 4.8,
    sessions: 89,
    price: 599,
    verified: true,
    bio: "NEET rank 42. Can share study strategies for medical entrance and guide on MBBS specialization choices."
  },
  {
    id: "a3",
    name: "Arjun Reddy",
    college: "NLSIU Bangalore",
    company: "Trilegal",
    role: "Associate Partner",
    location: "Bangalore",
    batch: "2015",
    domain: "Law",
    rating: 4.7,
    sessions: 64,
    price: 699,
    verified: true,
    bio: "CLAT rank 15. Corporate lawyer with 8+ years experience. Guidance on NLU admissions and law career paths."
  },
  {
    id: "a4",
    name: "Sneha Gupta",
    college: "NIFT Delhi",
    company: "Zara India",
    role: "Design Lead",
    location: "Mumbai",
    batch: "2019",
    domain: "Design",
    rating: 4.9,
    sessions: 45,
    price: 449,
    verified: true,
    bio: "Fashion designer turned UX lead. Can guide on design school admissions, portfolio building, and career switching."
  },
  {
    id: "a5",
    name: "Vikram Iyer",
    college: "IIM Ahmedabad",
    company: "McKinsey",
    role: "Engagement Manager",
    location: "Mumbai",
    batch: "2014",
    domain: "Business",
    rating: 4.8,
    sessions: 156,
    price: 799,
    verified: true,
    bio: "CAT 99.9%iler. Ex-BCG, now McKinsey. MBA admissions, consulting prep, and leadership coaching."
  },
  {
    id: "a6",
    name: "Kavya Nair",
    college: "BITS Pilani",
    company: "Swiggy",
    role: "Product Manager",
    location: "Bangalore",
    batch: "2017",
    domain: "Technology",
    rating: 4.6,
    sessions: 72,
    price: 549,
    verified: true,
    bio: "Engineer turned PM. Can share insights on product management, startup culture, and career transitions."
  }
];

const DOMAINS = ["All", "Technology", "Medicine", "Law", "Design", "Business"];

export default function AlumniPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  const filtered = ALUMNI_DATA.filter(a => {
    const matchesDomain = selectedDomain === "All" || a.domain === selectedDomain;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold mb-6"
          >
            <Users size={16} /> Verified Alumni Network
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Talk to Someone Who's Done It
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Book 1-on-1 video sessions with verified alumni from IITs, IIMs, AIIMS, NLSIU, and top companies.
          </motion.p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, college, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none font-medium text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DOMAINS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedDomain === d
                    ? 'bg-brand-blue text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((alumni) => (
            <motion.div
              key={alumni.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedAlumni(alumni)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 text-white flex items-center justify-center text-lg font-black">
                  {alumni.name.split(' ').map(n => n[0]).join('')}
                </div>
                {alumni.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                )}
              </div>

              <h3 className="font-black text-slate-800 mb-1">{alumni.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{alumni.role} at <span className="font-bold text-slate-700">{alumni.company}</span></p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                  <GraduationCap size={10} className="inline mr-1" />{alumni.college}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                  <MapPin size={10} className="inline mr-1" />{alumni.location}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                  Batch {alumni.batch}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={14} fill="currentColor" /> {alumni.rating}
                </span>
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <MessageCircle size={14} /> {alumni.sessions} sessions
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">15-min session</span>
                  <p className="text-xl font-black text-brand-blue">₹{alumni.price}</p>
                </div>
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl px-4">
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedAlumni && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4"
              onClick={() => setSelectedAlumni(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 text-white flex items-center justify-center text-2xl font-black">
                      {selectedAlumni.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">{selectedAlumni.name}</h2>
                      <p className="text-slate-500 text-sm">{selectedAlumni.role} at {selectedAlumni.company}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAlumni(null)} className="p-2 hover:bg-slate-100 rounded-xl">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">{selectedAlumni.college}</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">Batch {selectedAlumni.batch}</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedAlumni.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <Star size={20} className="text-amber-500 mx-auto mb-1" />
                    <p className="text-xl font-black">{selectedAlumni.rating}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Rating</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <MessageCircle size={20} className="text-brand-blue mx-auto mb-1" />
                    <p className="text-xl font-black">{selectedAlumni.sessions}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Sessions</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-2xl p-6 text-white mb-6">
                  <p className="text-sm text-blue-200 mb-1">15-Minute Video Session</p>
                  <p className="text-3xl font-black">₹{selectedAlumni.price}</p>
                </div>

                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl text-lg">
                  Book Session Now
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
