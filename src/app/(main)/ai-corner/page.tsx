"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, Target, BookOpen, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AICorner() {
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
      const response = await fetch("/api/ai-corner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, goal, currentLevel }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate roadmap");
      }

      setRoadmap(data.roadmap);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple Markdown parser for the output
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-slate-800 mt-6 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-black text-brand-blue mt-8 mb-4 border-b border-slate-100 pb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('1. **') || line.match(/^\d+\.\s\*\*/)) {
        // Numbered bold headers
        const clean = line.replace(/^\d+\.\s\*\*/, '').replace(/\*\*/g, '');
        return <h3 key={index} className="text-xl font-black text-slate-800 mt-6 mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-orange"></div>{clean}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={index} className="block mt-4 text-slate-800">{line.replace(/\*\*/g, '')}</strong>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 mb-2 flex items-start gap-2 text-slate-600">
            <ChevronRight className="w-4 h-4 text-brand-blue flex-shrink-0 mt-1" />
            <span>{line.replace('- ', '').replace(/\*\*/g, '')}</span>
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2 text-slate-600 leading-relaxed">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center space-y-6">
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
            Instantly generate a personalized, step-by-step skill development roadmap tailored to your exact background and career goals.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8">
        
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

              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading || !profile || !goal}
                className="w-full py-6 text-lg font-black bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl shadow-lg shadow-brand-blue/20 transition-all hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    Generate My Roadmap <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Output Section */}
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
                  <div className="absolute inset-0 bg-brand-orange/20 animate-ping rounded-full"></div>
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
                  {renderMarkdown(roadmap)}
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
    </div>
  );
}
