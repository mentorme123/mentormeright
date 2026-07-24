"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  Target,
  Star,
  Zap,
  BookOpen,
  CheckCircle2,
  Lock,
  Gift,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  xp: number;
  completed: boolean;
  category: "daily" | "weekly" | "milestone";
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const DAILY_QUESTS: Quest[] = [
  { id: "d1", title: "Morning Learner", description: "Read one career article before 10 AM", icon: <BookOpen size={18} />, xp: 50, completed: false, category: "daily" },
  { id: "d2", title: "Skill Builder", description: "Complete one module in your learning path", icon: <Zap size={18} />, xp: 100, completed: false, category: "daily" },
  { id: "d3", title: "Networker", description: "Connect with one alumni or mentor", icon: <Star size={18} />, xp: 75, completed: false, category: "daily" },
];

const WEEKLY_QUESTS: Quest[] = [
  { id: "w1", title: "Assessment Champion", description: "Complete a full psychometric assessment", icon: <Target size={18} />, xp: 500, completed: true, category: "weekly" },
  { id: "w2", title: "Career Explorer", description: "Simulate 3 different career paths", icon: <TrendingUp size={18} />, xp: 300, completed: false, category: "weekly" },
  { id: "w3", title: "Expert Connect", description: "Book and attend a counseling session", icon: <Calendar size={18} />, xp: 400, completed: false, category: "weekly" },
];

const MILESTONE_QUESTS: Quest[] = [
  { id: "m1", title: "First Steps", description: "Complete your profile 100%", icon: <CheckCircle2 size={18} />, xp: 200, completed: true, category: "milestone" },
  { id: "m2", title: "JEE Warrior", description: "Score above 85% in JEE mock test", icon: <Trophy size={18} />, xp: 1000, completed: false, category: "milestone" },
  { id: "m3", title: "Offer Letter Unlocked", description: "Get your first internship or job offer", icon: <Gift size={18} />, xp: 2000, completed: false, category: "milestone" },
  { id: "m4", title: "Mentor Me", description: "Help 5 peers with career advice", icon: <Award size={18} />, xp: 1500, completed: false, category: "milestone" },
];

const BADGES: Badge[] = [
  { id: "b1", name: "Early Bird", description: "Log in for 7 consecutive days", icon: <Flame size={20} />, unlocked: true, rarity: "common" },
  { id: "b2", name: "Knowledge Seeker", description: "Read 50+ career articles", icon: <BookOpen size={20} />, unlocked: true, rarity: "common" },
  { id: "b3", name: "AI Explorer", description: "Complete 10 AI career simulations", icon: <Zap size={20} />, unlocked: false, rarity: "rare" },
  { id: "b4", name: "Counseling Pro", description: "Attend 5 expert sessions", icon: <Star size={20} />, unlocked: false, rarity: "rare" },
  { id: "b5", name: "Career Master", description: "Score 90%+ in all assessment parameters", icon: <Trophy size={20} />, unlocked: false, rarity: "epic" },
  { id: "b6", name: "India's Future", description: "Helped 50+ students with career guidance", icon: <Award size={20} />, unlocked: false, rarity: "legendary" },
];

export default function GamifyPage() {
  const [activeTab, setActiveTab] = useState<"quests" | "badges" | "leaderboard">("quests");
  const [quests, setQuests] = useState<Quest[]>([...DAILY_QUESTS, ...WEEKLY_QUESTS, ...MILESTONE_QUESTS]);
  const [streak, setStreak] = useState(5);
  const [totalXP, setTotalXP] = useState(1250);
  const [level, setLevel] = useState(4);

  const toggleQuest = (id: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id === id) {
        const newCompleted = !q.completed;
        if (newCompleted) setTotalXP(xp => xp + q.xp);
        else setTotalXP(xp => xp - q.xp);
        return { ...q, completed: newCompleted };
      }
      return q;
    }));
  };

  const completedCount = quests.filter(q => q.completed).length;
  const progressPercent = (completedCount / quests.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-5xl px-4 sm:px-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-3xl p-8 sm:p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Level {level}</p>
                    <h1 className="text-2xl font-black">Career Warrior</h1>
                  </div>
                </div>
                <p className="text-blue-200 text-sm mt-2">Turn your career journey into an adventure</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-black">{totalXP}</p>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Total XP</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <Flame size={20} className="text-orange-400" />
                    <p className="text-2xl font-black">{streak}</p>
                  </div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Day Streak</p>
                </div>
              </div>
            </div>
            {/* XP Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Level {level}</span>
                <span>Level {level + 1}</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalXP % 1000) / 10}%` }}
                  className="h-full bg-brand-orange rounded-full"
                />
              </div>
              <p className="text-xs text-blue-200 mt-1">{1000 - (totalXP % 1000)} XP to next level</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-slate-800">Weekly Progress</h2>
            <span className="text-sm font-bold text-brand-blue">{completedCount}/{quests.length} Quests</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-brand-blue to-brand-orange rounded-full"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["quests", "badges", "leaderboard"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-brand-blue text-white shadow-lg'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-blue'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Quests Tab */}
        {activeTab === "quests" && (
          <div className="space-y-8">
            {/* Daily */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Daily Quests — Resets in 14h 32m</h3>
              <div className="grid grid-cols-1 gap-3">
                {quests.filter(q => q.category === "daily").map((quest) => (
                  <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id)} />
                ))}
              </div>
            </div>
            {/* Weekly */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Weekly Quests</h3>
              <div className="grid grid-cols-1 gap-3">
                {quests.filter(q => q.category === "weekly").map((quest) => (
                  <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id)} />
                ))}
              </div>
            </div>
            {/* Milestones */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Milestones</h3>
              <div className="grid grid-cols-1 gap-3">
                {quests.filter(q => q.category === "milestone").map((quest) => (
                  <QuestCard key={quest.id} quest={quest} onToggle={() => toggleQuest(quest.id)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BADGES.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border transition-all ${
                  badge.unlocked
                    ? 'bg-white border-slate-200 shadow-sm'
                    : 'bg-slate-100 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  badge.rarity === 'legendary' ? 'bg-purple-100 text-purple-600' :
                  badge.rarity === 'epic' ? 'bg-amber-100 text-amber-600' :
                  badge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                  'bg-slate-200 text-slate-500'
                }`}>
                  {badge.unlocked ? badge.icon : <Lock size={20} />}
                </div>
                <h3 className="font-black text-slate-800 mb-1">{badge.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{badge.description}</p>
                <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  badge.rarity === 'legendary' ? 'bg-purple-100 text-purple-700' :
                  badge.rarity === 'epic' ? 'bg-amber-100 text-amber-700' :
                  badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {badge.rarity}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-black text-slate-800">Top Career Warriors This Week</h3>
            </div>
            {[
              { rank: 1, name: "Rahul Sharma", xp: 3420, streak: 12, avatar: "RS" },
              { rank: 2, name: "Priya Patel", xp: 3180, streak: 8, avatar: "PP" },
              { rank: 3, name: "Arjun Reddy", xp: 2950, streak: 15, avatar: "AR" },
              { rank: 4, name: "Sneha Gupta", xp: 2700, streak: 6, avatar: "SG" },
              { rank: 5, name: "Vikram Iyer", xp: 2450, streak: 9, avatar: "VI" },
              { rank: 42, name: "You", xp: 1250, streak: 5, avatar: "YO", isMe: true },
            ].map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 ${
                  user.isMe ? 'bg-brand-blue/5' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                  user.rank === 1 ? 'bg-amber-100 text-amber-700' :
                  user.rank === 2 ? 'bg-slate-200 text-slate-600' :
                  user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {user.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-black">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${user.isMe ? 'text-brand-blue' : 'text-slate-800'}`}>{user.name}</p>
                  <p className="text-xs text-slate-400">{user.xp} XP · {user.streak} day streak</p>
                </div>
                {user.rank <= 3 && <Trophy size={18} className={
                  user.rank === 1 ? 'text-amber-500' :
                  user.rank === 2 ? 'text-slate-400' :
                  'text-orange-500'
                } />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuestCard({ quest, onToggle }: { quest: Quest; onToggle: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
        quest.completed
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-white border-slate-200 hover:border-brand-blue'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        quest.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
      }`}>
        {quest.completed ? <CheckCircle2 size={20} /> : quest.icon}
      </div>
      <div className="flex-1">
        <h4 className={`font-bold text-sm ${quest.completed ? 'text-emerald-800 line-through' : 'text-slate-800'}`}>
          {quest.title}
        </h4>
        <p className="text-xs text-slate-500">{quest.description}</p>
      </div>
      <div className="text-right">
        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-black ${
          quest.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-orange/10 text-brand-orange'
        }`}>
          +{quest.xp} XP
        </span>
      </div>
    </motion.div>
  );
}
