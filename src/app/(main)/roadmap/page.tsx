"use client";

import { motion } from "framer-motion";
import { 
  Rocket, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Award, 
  Briefcase, 
  GraduationCap,
  Globe,
  Zap,
  Shield,
  BarChart3,
  MessageCircle
} from "lucide-react";

const phases = [
  {
    phase: "Phase 1: Foundation",
    status: "live",
    items: [
      { icon: <Shield size={18} />, text: "Security hardening & input validation", done: true },
      { icon: <Zap size={18} />, text: "PWA support with offline caching", done: true },
      { icon: <BarChart3 size={18} />, text: "React Query for data fetching", done: true },
      { icon: <Sparkles size={18} />, text: "Loading skeletons & performance", done: true },
      { icon: <TrendingUp size={18} />, text: "Google Analytics & Mixpanel", done: true },
    ]
  },
  {
    phase: "Phase 2: AI Superpowers",
    status: "building",
    items: [
      { icon: <Rocket size={18} />, text: "AI Career Simulator — simulate any career path", done: false },
      { icon: <Sparkles size={18} />, text: "AI Resume & Interview Coach", done: false },
      { icon: <MessageCircle size={18} />, text: "Multi-agent AI architecture", done: false },
      { icon: <GraduationCap size={18} />, text: "College & Exam Predictor with cutoff data", done: false },
    ]
  },
  {
    phase: "Phase 3: Engagement & Growth",
    status: "planned",
    items: [
      { icon: <Award size={18} />, text: "Gamified Career Roadmap with quests & streaks", done: false },
      { icon: <Users size={18} />, text: "Verified Alumni Network for mentorship", done: false },
      { icon: <Briefcase size={18} />, text: "Scholarship & Opportunity Aggregator", done: false },
      { icon: <Globe size={18} />, text: "Community & Peer Circles", done: false },
    ]
  },
  {
    phase: "Phase 4: B2B & Scale",
    status: "planned",
    items: [
      { icon: <TrendingUp size={18} />, text: "Full B2B SaaS for Schools & Colleges", done: false },
      { icon: <Users size={18} />, text: "Parent Dashboard with family counseling", done: false },
      { icon: <BarChart3 size={18} />, text: "Real-time job market intelligence", done: false },
      { icon: <Shield size={18} />, text: "Enterprise SSO & data compliance", done: false },
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold mb-6"
          >
            <Rocket size={16} /> Building the #1 Career App in India
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Product Roadmap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Transparent. Ambitious. Student-first. See what we are building and what is coming next.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {[
            { label: "Features Shipped", value: "21" },
            { label: "Security Fixes", value: "18" },
            { label: "AI Integrations", value: "4" },
            { label: "Uptime Target", value: "99.9%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
              <p className="text-2xl font-black text-brand-blue">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Phases */}
        <div className="space-y-12">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black text-slate-800">{phase.phase}</h2>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  phase.status === 'live' ? 'bg-emerald-100 text-emerald-700' :
                  phase.status === 'building' ? 'bg-brand-blue/10 text-brand-blue' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {phase.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phase.items.map((item, j) => (
                  <div key={j} className={`flex items-center gap-3 p-3 rounded-xl ${
                    item.done ? 'bg-emerald-50/50' : 'bg-slate-50'
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {item.done ? <Sparkles size={16} /> : item.icon}
                    </div>
                    <span className={`text-sm font-bold ${
                      item.done ? 'text-emerald-800' : 'text-slate-600'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-br from-brand-blue to-blue-900 rounded-3xl p-8 sm:p-12 text-white"
        >
          <h3 className="text-2xl font-black mb-3">Have a feature idea?</h3>
          <p className="text-blue-200 mb-6">We build what students actually need. Share your suggestion.</p>
          <a
            href="/contact?subject=Feature%20Suggestion"
            className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            <MessageCircle size={18} /> Suggest a Feature
          </a>
        </motion.div>
      </div>
    </div>
  );
}
