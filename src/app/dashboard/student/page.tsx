"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { 
  ClipboardList, 
  Trophy, 
  ArrowRight, 
  Loader2, 
  Target,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAssessmentStatus(assessment.status as any);
      }
      setLoading(false);
    }
    loadData();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-indigo" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Premium Header */}
        <div className="relative p-10 rounded-[40px] overflow-hidden bg-brand-slate text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 rounded-3xl border-4 border-white/10 overflow-hidden shadow-2xl">
                <Image 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=1B3A6B,0D7377,F0A500`}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tight">Welcome, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}</h1>
                <p className="text-blue-100/60 font-medium text-lg italic">&quot;The best way to predict the future is to create it.&quot;</p>
              </div>
            </div>
            {assessmentStatus === 'completed' && (
              <Link href="/report">
                <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-slate font-black shadow-xl px-10 py-7 rounded-2xl text-lg transition-all hover:scale-105">
                  View AI Career Report <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
             
             {/* Assessment Main Card */}
             <div className="relative bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10 space-y-8">
                   <div className="flex justify-between items-center">
                      <div className="p-4 bg-brand-indigo/5 rounded-2xl">
                        <ClipboardList size={32} className="text-brand-indigo" />
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                        assessmentStatus === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-gold/10 text-brand-gold'
                      }`}>
                        {assessmentStatus.replace('_', ' ')}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-3xl font-black text-brand-slate leading-tight">Professional Career Intelligence Assessment</h2>
                      <p className="text-slate-500 leading-relaxed text-lg font-medium max-w-2xl">
                        Our proprietary 90-question psychometric engine maps your unique traits to over 500+ global career paths.
                      </p>
                   </div>
                   <div className="pt-4">
                     <Link href="/assessment">
                        <Button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-black px-12 py-8 rounded-2xl text-xl shadow-xl shadow-brand-indigo/20 transition-all hover:scale-105">
                          {assessmentStatus === 'not_started' ? 'Begin Evaluation' : assessmentStatus === 'in_progress' ? 'Continue Journey' : 'Retake Assessment'}
                        </Button>
                     </Link>
                   </div>
                </div>
             </div>

             <div className="grid sm:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[32px] flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <Trophy size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Achievements</p>
                    <p className="text-2xl font-black text-brand-slate">2 Unlocked</p>
                  </div>
                </div>
                <div className="glass p-8 rounded-[32px] flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-indigo/10 rounded-2xl flex items-center justify-center text-brand-indigo shadow-inner">
                    <Target size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Goal Progress</p>
                    <p className="text-2xl font-black text-brand-slate">Phase 1</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
             <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl shadow-slate-200/40">
                <h3 className="font-black text-brand-slate mb-8 flex items-center gap-3 text-xl">
                   <Globe size={24} className="text-brand-indigo" /> Market Insights
                </h3>
                <div className="space-y-6">
                   {[
                     { title: "Generative AI FinTech", trend: "+45%", color: "text-emerald-600 bg-emerald-50" },
                     { title: "Sustainability Tech", trend: "+30%", color: "text-brand-indigo bg-brand-indigo/5" },
                     { title: "Cybersecurity", trend: "+60%", color: "text-purple-600 bg-purple-50" },
                   ].map((news, i) => (
                     <div key={i} className="p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-brand-slate group-hover:text-brand-indigo transition-colors">{news.title}</h4>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${news.color}`}>
                            {news.trend}
                          </span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-brand-slate text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform"></div>
                <h3 className="text-2xl font-black mb-4">Expert Consult</h3>
                <p className="text-blue-100/60 text-sm leading-relaxed mb-8 font-medium">
                   Book a 1-on-1 session with elite counselors to decode your AI report.
                </p>
                <Button className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-slate font-black py-7 rounded-2xl shadow-xl transition-all hover:scale-105">
                   Book Consultation
                </Button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
