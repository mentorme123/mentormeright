"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { 
  ClipboardList, 
  FileText, 
  Video, 
  Trophy, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Target,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      // Check assessment status
      const { data: assessment } = await supabase
        .from('assessments')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (assessment) {
        setAssessmentStatus(assessment.status as any);
      }
      setLoading(false);
    }
    loadData();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="relative h-16 w-16 rounded-2xl border-4 border-slate-50 overflow-hidden shadow-md">
                <Image 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=1B3A6B,0D7377,F0A500`}
                  alt="Avatar"
                  fill
                />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Hello, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}! 👋</h1>
                <p className="text-slate-500 font-medium mt-1">Welcome back to your career intelligence hub.</p>
              </div>
           </div>
           {assessmentStatus === 'completed' && (
             <Link href="/report">
               <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-lg shadow-brand-orange/20 px-8">
                 View Final Report <ArrowRight className="ml-2" size={18} />
               </Button>
             </Link>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Industry Insights (Live API Simulation) */}
             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <Globe size={24} className="text-brand-blue" /> High-Growth Career Insights
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                   {[
                     { title: "Generative AI in FinTech", trend: "+45% Hiring", color: "text-emerald-600 bg-emerald-50" },
                     { title: "Sustainability Consulting", trend: "+30% Hiring", color: "text-blue-600 bg-blue-50" },
                     { title: "Cybersecurity Analyst", trend: "+60% Demand", color: "text-purple-600 bg-purple-50" },
                     { title: "Renewable Energy Tech", trend: "+25% Growth", color: "text-orange-600 bg-orange-50" }
                   ].map((news, i) => (
                     <div key={i} className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all group cursor-pointer">
                        <h4 className="font-bold text-slate-700 group-hover:text-brand-blue transition-colors">{news.title}</h4>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mt-2 inline-block ${news.color}`}>
                          {news.trend}
                        </span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Assessment Card */}
             <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-white/10 rounded-2xl">
                        <ClipboardList size={32} className="text-brand-orange" />
                      </div>
                      <div className="bg-white/20 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {assessmentStatus.replace('_', ' ')}
                      </div>
                   </div>
                   <h2 className="text-2xl font-bold mb-2">90-Question Career Assessment</h2>
                   <p className="text-blue-100 leading-relaxed mb-8 max-w-md font-medium">
                     Discover your dominant personality traits, career interests, and academic roadmap through our AI-powered evaluation.
                   </p>
                   <Link href="/assessment">
                      <Button className="bg-white text-brand-blue hover:bg-blue-50 font-black px-10 py-6 rounded-xl text-lg shadow-xl shadow-black/10">
                        {assessmentStatus === 'not_started' ? 'Start Assessment' : assessmentStatus === 'in_progress' ? 'Continue Journey' : 'Retake Assessment'}
                      </Button>
                   </Link>
                </div>
             </div>

             <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Achievements</p>
                    <p className="text-xl font-black text-slate-800">2 Unlocked</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Target size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Goal Progress</p>
                    <p className="text-xl font-black text-slate-800">Phase 1</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-orange" /> Daily Motivation
                </h3>
                <div className="italic text-slate-600 border-l-4 border-brand-orange pl-4 py-2 text-sm leading-relaxed">
                   "Your career is a marathon, not a sprint. Every question you answer today brings you closer to your true North."
                   <p className="not-italic font-bold text-slate-400 mt-2 text-xs">— MentorMe AI</p>
                </div>
             </div>

             <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
                <h3 className="text-xl font-bold mb-4">Need Expert Guidance?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   Book a 1-on-1 session with our elite counselors to discuss your AI report and academic roadmap.
                </p>
                <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-6 rounded-xl">
                   Book Consultation
                </Button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
