"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  MapPin,
  GraduationCap,
  Briefcase,
  Heart,
  Send,
  Search,
  TrendingUp,
  Star,
  Zap,
  Calendar,
  ChevronRight,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Circle {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  tags: string[];
  trending: boolean;
  joined: boolean;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  circle: string;
}

const CIRCLES: Circle[] = [
  {
    id: "c1",
    name: "JEE 2026 Aspirants",
    description: "Mock tests, strategy sharing, and peer motivation for JEE Main & Advanced",
    members: 1247,
    category: "Exam Prep",
    tags: ["JEE", "Engineering", "IIT"],
    trending: true,
    joined: true
  },
  {
    id: "c2",
    name: "NEET Warriors",
    description: "Medical entrance prep, biology discussions, and study schedules",
    members: 892,
    category: "Exam Prep",
    tags: ["NEET", "Medical", "MBBS"],
    trending: true,
    joined: false
  },
  {
    id: "c3",
    name: "Women in Tech — India",
    description: "Career guidance, mentorship, and job referrals for women in technology",
    members: 2341,
    category: "Career",
    tags: ["Tech", "Women", "Diversity"],
    trending: true,
    joined: true
  },
  {
    id: "c4",
    name: "CAT & MBA Aspirants",
    description: "MBA prep, IIM dreams, and consulting career discussions",
    members: 1567,
    category: "Exam Prep",
    tags: ["CAT", "MBA", "IIM"],
    trending: false,
    joined: false
  },
  {
    id: "c5",
    name: "Study Abroad — Fall 2026",
    description: "GRE, TOEFL, applications, and visa experiences for US/UK/Canada",
    members: 3210,
    category: "Study Abroad",
    tags: ["GRE", "MS", "US", "UK"],
    trending: true,
    joined: false
  },
  {
    id: "c6",
    name: "UPSC Civil Services",
    description: "IAS/IPS preparation, current affairs, and answer writing practice",
    members: 4520,
    category: "Government Jobs",
    tags: ["UPSC", "IAS", "Civil Services"],
    trending: false,
    joined: false
  },
  {
    id: "c7",
    name: "Startup & Entrepreneurship",
    description: "Founder stories, pitch feedback, and funding advice",
    members: 876,
    category: "Career",
    tags: ["Startup", "Entrepreneur", "Funding"],
    trending: false,
    joined: false
  },
  {
    id: "c8",
    name: "Data Science Aspirants",
    description: "Python, ML, Kaggle, and breaking into data science roles",
    members: 1890,
    category: "Career",
    tags: ["Data Science", "Python", "AI"],
    trending: true,
    joined: true
  }
];

const POSTS: Post[] = [
  {
    id: "p1",
    author: "Rahul Sharma",
    avatar: "RS",
    content: "Just cracked 99.2 percentile in JEE Main mock test! Sharing my 6-month study plan — DM me if you want the PDF. Consistency > intensity, always.",
    likes: 45,
    comments: 12,
    time: "2h ago",
    circle: "JEE 2026 Aspirants"
  },
  {
    id: "p2",
    author: "Priya Patel",
    avatar: "PP",
    content: "Got admits from 3 US universities for MS CS — CMU, Georgia Tech, and UIUC. Happy to share my SOP and LOR templates with anyone applying Fall 2026!",
    likes: 89,
    comments: 34,
    time: "5h ago",
    circle: "Study Abroad — Fall 2026"
  },
  {
    id: "p3",
    author: "Ananya Iyer",
    avatar: "AI",
    content: "Day 45 of #100DaysOfCode. Built my first ML model that predicts house prices with 94% accuracy. Started from zero Python knowledge. If I can do it, anyone can!",
    likes: 67,
    comments: 18,
    time: "8h ago",
    circle: "Women in Tech — India"
  }
];

const CATEGORIES = ["All", "Exam Prep", "Career", "Study Abroad", "Government Jobs"];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [joinedCircles, setJoinedCircles] = useState<string[]>(["c1", "c3", "c8"]);
  const [activeTab, setActiveTab] = useState<"explore" | "joined" | "feed">("explore");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleJoin = (id: string) => {
    setJoinedCircles(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filtered = CIRCLES.filter(c => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === "explore" ? true :
                        activeTab === "joined" ? joinedCircles.includes(c.id) :
                        true;
    return matchesCategory && matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-6xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold mb-6"
          >
            <Users size={16} /> Community & Peer Circles
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Find Your Tribe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Join interest-based peer circles. Share experiences, ask questions, and grow together with students on the same journey.
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
            { label: "Active Circles", value: "48" },
            { label: "Members", value: "24,000+" },
            { label: "Daily Posts", value: "350+" },
            { label: "Mentorships", value: "1,200+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 text-center border border-slate-200">
              <p className="text-2xl font-black text-brand-blue">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {(["explore", "joined", "feed"] as const).map((tab) => (
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
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search circles or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none font-medium text-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-brand-orange text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "feed" ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm">
                  YO
                </div>
                <input
                  type="text"
                  placeholder="Share something with your circles..."
                  className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
                <Button className="bg-brand-blue text-white rounded-xl px-4">
                  <Send size={16} />
                </Button>
              </div>
            </div>
            {POSTS.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 text-white flex items-center justify-center font-black text-sm">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{post.author}</p>
                    <p className="text-xs text-slate-400">{post.time} · {post.circle}</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">{post.content}</p>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart size={16} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-brand-blue transition-colors">
                    <MessageCircle size={16} /> {post.comments}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((circle) => (
              <motion.div
                key={circle.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-blue-600 text-white flex items-center justify-center text-lg font-black">
                      {circle.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800">{circle.name}</h3>
                      <p className="text-xs text-slate-400">{circle.members.toLocaleString()} members</p>
                    </div>
                  </div>
                  {circle.trending && (
                    <span className="px-2 py-1 bg-brand-orange/10 text-brand-orange rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                      <TrendingUp size={10} /> Hot
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-4">{circle.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {circle.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Button
                  onClick={() => toggleJoin(circle.id)}
                  className={`w-full font-bold py-4 rounded-xl transition-all ${
                    joinedCircles.includes(circle.id)
                      ? 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600'
                      : 'bg-brand-blue text-white hover:bg-brand-blue/90'
                  }`}
                >
                  {joinedCircles.includes(circle.id) ? 'Leave Circle' : 'Join Circle'}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
