"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ArrowRight, Loader2, Target, BookOpen, Briefcase,
  ChevronRight, MessageCircle, Send, Bot, User, Map
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
};

// ─── Initial chat messages ─────────────────────────────────────────────────────

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: `👋 Hello! I'm **AI Corner**, your personal MentorMe guide!\n\nI'm here to help you with:\n• 🗺️ Building a **personalized career roadmap**\n• 📚 Exploring the **Career Library** (5000+ paths)\n• 🎯 Taking the **Free Career Assessment Test**\n• 👥 Booking a **1-on-1 Expert Counseling** session (₹4,999)\n• 🌍 **Study Abroad** guidance\n\nHow can I help you today?`,
    suggestions: [
      "Build my career roadmap 🗺️",
      "Tell me about MentorMe",
      "Book a counseling session",
      "Explore Career Library",
    ],
  },
];

// ─── Markdown parser ───────────────────────────────────────────────────────────

function parseBold(content: string) {
  const sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/on\w+='[^']*'/g, "");

  return sanitized.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-black text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderRoadmarkMarkdown(text: string) {
  return text.split("\n").map((line, index) => {
    if (line.startsWith("### "))
      return <h3 key={index} className="text-xl font-bold text-slate-800 mt-6 mb-2">{line.replace("### ", "")}</h3>;
    if (line.startsWith("## "))
      return <h2 key={index} className="text-2xl font-black text-brand-blue mt-8 mb-4 border-b border-slate-100 pb-2">{line.replace("## ", "")}</h2>;
    if (line.startsWith("1. **") || line.match(/^\d+\.\s\*\*/)) {
      const clean = line.replace(/^\d+\.\s\*\*/, "").replace(/\*\*/g, "");
      return (
        <h3 key={index} className="text-xl font-black text-slate-800 mt-6 mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-orange" />{clean}
        </h3>
      );
    }
    if (line.startsWith("**") && line.endsWith("**"))
      return <strong key={index} className="block mt-4 text-slate-800">{line.replace(/\*\*/g, "")}</strong>;
    if (line.startsWith("- "))
      return (
        <li key={index} className="ml-4 mb-2 flex items-start gap-2 text-slate-600">
          <ChevronRight className="w-4 h-4 text-brand-blue flex-shrink-0 mt-1" />
          <span>{line.replace("- ", "").replace(/\*\*/g, "")}</span>
        </li>
      );
    if (line.trim() === "") return <br key={index} />;
    return <p key={index} className="mb-2 text-slate-600 leading-relaxed">{line.replace(/\*\*/g, "")}</p>;
  });
}

// ─── Chat Panel ────────────────────────────────────────────────────────────────

function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || "I apologize, I had trouble processing that. Please try again.",
          suggestions: data.suggestions || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm having a moment of difficulty. Please try again or contact us at admin@mentormeright.in 📧",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden" style={{ height: "680px" }}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Bot className="text-white w-6 h-6" />
        </div>
        <div>
          <p className="font-black text-white text-sm">AI Corner — Live Chat</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <p className="text-blue-100 text-xs">MentorMe Agent • Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${
              msg.role === "assistant" ? "bg-gradient-to-br from-brand-blue to-brand-orange" : "bg-slate-200"
            }`}>
              {msg.role === "assistant"
                ? <Sparkles className="text-white w-4 h-4" />
                : <User className="text-slate-500 w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] space-y-2 flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "assistant"
                  ? "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm"
                  : "bg-brand-blue text-white rounded-tr-sm"
              }`}>
                {parseBold(msg.content)}
              </div>

              {/* Quick Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 bg-brand-blue/5 hover:bg-brand-blue/15 border border-brand-blue/20 text-brand-blue text-xs font-bold rounded-xl transition-all flex items-center gap-1"
                    >
                      {s} <ChevronRight size={10} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-brand-blue/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-brand-blue/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Links Bar */}
      <div className="px-5 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto flex-shrink-0">
        {[
          { href: "/assessment", label: "Free Test 🎯", cls: "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20" },
          { href: "/counsellors", label: "Book ₹4,999 Session", cls: "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20" },
          { href: "/career-library", label: "Career Library 📚", cls: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
          { href: "/study-abroad", label: "Study Abroad 🌍", cls: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
        ].map((link) => (
          <a key={link.href} href={link.href} className={`px-3 py-1.5 text-xs font-black rounded-lg whitespace-nowrap transition-colors ${link.cls}`}>
            {link.label}
          </a>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
        <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask AI Corner anything about your career..."
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-300 mt-2 font-medium">Powered by MentorMe AI • Gemini</p>
      </div>
    </div>
  );
}

// ─── Roadmap Panel ─────────────────────────────────────────────────────────────

function RoadmapPanel() {
  const [profile, setProfile] = useState("");
  const [goal, setGoal] = useState("");
  const [currentLevel, setCurrentLevel] = useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !goal) return;
    setLoading(true);
    setError("");
    setRoadmap("");
    try {
      const res = await fetch("/api/ai-corner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, goal, currentLevel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate roadmap");
      setRoadmap(data.roadmap);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <Target className="text-brand-orange" /> Tell Us About You
          </h2>
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Current Background / Education</label>
              <textarea
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                placeholder="e.g. I am a 2nd year B.Tech Computer Science student with basic knowledge of Python and HTML..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none resize-none h-32"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Dream Career Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Become a Machine Learning Engineer"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Current Skill Level</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
              >
                <option value="Complete Beginner">Complete Beginner</option>
                <option value="Beginner">Beginner (Know the basics)</option>
                <option value="Intermediate">Intermediate (Some project experience)</option>
                <option value="Advanced">Advanced (Looking to specialize)</option>
              </select>
            </div>
            {error && <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">{error}</div>}
            <Button
              type="submit"
              disabled={loading || !profile || !goal}
              className="w-full py-6 text-lg font-black bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl shadow-lg shadow-brand-blue/20 transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <><Loader2 className="w-6 h-6 mr-2 animate-spin" />Analyzing Profile...</>
              ) : (
                <>Generate My Roadmap <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Output */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {!roadmap && !loading ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-100 rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center space-y-6 shadow-sm min-h-[500px]"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-slate-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Your Roadmap Awaits</h3>
                <p className="text-slate-500 max-w-md mx-auto">Fill out your details on the left, and our AI will generate a comprehensive, personalized plan to help you reach your goals.</p>
              </div>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-brand-blue/20 rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center space-y-6 shadow-xl shadow-brand-blue/5 min-h-[500px]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-orange/20 animate-ping rounded-full" />
                <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center relative z-10">
                  <Sparkles className="w-10 h-10 text-brand-blue animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Crafting your personalized roadmap...</h3>
                <p className="text-slate-500 max-w-md mx-auto">Our AI is analyzing your profile, identifying required skills, and mapping out your step-by-step journey.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl h-full"
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Your AI Career Roadmap</h2>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Goal: {goal}</p>
                </div>
              </div>
              <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-headings:font-black">
                {renderRoadmarkMarkdown(roadmap)}
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-6 rounded-xl text-lg shadow-xl shadow-brand-orange/20 transition-transform hover:scale-105">
                  Save to My Dashboard
                </Button>
                <Button variant="outline" className="flex-1 py-6 rounded-xl text-lg font-bold border-2 text-slate-700 hover:bg-slate-50">
                  Discuss with a Counsellor
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AICorner() {
  const [activeTab, setActiveTab] = useState<"chat" | "roadmap">("chat");

  const tabs = [
    { id: "chat" as const, label: "Chat with AI", icon: MessageCircle, desc: "Ask anything about your career" },
    { id: "roadmap" as const, label: "Career Roadmap", icon: Map, desc: "Generate a step-by-step plan" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 py-14 px-4 mb-10">
        <div className="max-w-7xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-2">
            <Sparkles className="w-8 h-8 text-brand-orange" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            MentorMe <span className="text-brand-blue">AI Corner</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Chat live with our AI career counselor or generate a personalized step-by-step roadmap tailored to your goals.
          </motion.p>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex bg-slate-100 rounded-2xl p-1.5 gap-1 mt-4"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-brand-blue shadow-md shadow-slate-200"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeTab === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <ChatPanel />
            </motion.div>
          ) : (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <RoadmapPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
