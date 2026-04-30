"use client"; // Force Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { 
  Video, 
  FileText, 
  User, 
  Loader2, 
  ShieldCheck, 
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CounselorDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [counselor, setCounselor] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isJoining, setIsJoining] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState<number | null>(null);

  useEffect(() => {
    async function verifyRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role === 'individual' || profile?.role === 'institutional') {
        router.push("/");
      } else {
        setCounselor(user);
        setLoading(false);
      }
    }
    verifyRole();
  }, [router, supabase]);

  const upcomingSessions = [
    { id: 1, name: "Syed Basim Ahmed", time: "10:00 AM", date: "Today", grade: "12", isPaid: true, status: 'confirmed' },
    { id: 2, name: "Zainab Imran", time: "02:30 PM", date: "Today", grade: "Graduate", isPaid: true, status: 'pending' },
    { id: 3, name: "Taaha", time: "11:00 AM", date: "Tomorrow", grade: "Working Professional", isPaid: true, status: 'confirmed' },
  ];

  const handleJoinVideo = async (sessionId: number | string) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setIsJoining(Number(sessionId));
    try {
      const roomName = `MentorMe-Session-${sessionId}-${Math.random().toString(36).substring(7)}`;
      const jitsiUrl = `https://meet.jit.si/${roomName}`;
      setTimeout(() => {
        window.open(jitsiUrl, "_blank");
        setIsJoining(null);
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsJoining(null);
    }
  };

  const handleDownloadReport = (session: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setIsDownloading(session.id);
    setTimeout(() => {
      const reportContent = `MentorMe Career Report\n\nStudent: ${session.name}\nGrade: ${session.grade}`;
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${session.name}_Report.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(null);
    }, 1000);
  };

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
        
        {/* Premium Counselor Header */}
        <div className="relative p-12 rounded-[40px] overflow-hidden bg-brand-slate text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="relative h-24 w-24 rounded-3xl border-4 border-white/10 overflow-hidden shadow-2xl">
                <Image 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${counselor?.email}&backgroundColor=0D7377`}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-black tracking-tight">Expert Control Center</h1>
                  <span className="px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald text-[10px] font-black uppercase tracking-widest border border-brand-emerald/30">Active Status</span>
                </div>
                <p className="text-blue-100/60 font-medium text-lg">Lead Counselor: <span className="text-white font-bold">{counselor?.user_metadata?.full_name || counselor?.email}</span></p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="glass-dark px-8 py-4 rounded-3xl text-center border-white/5">
                 <p className="text-[10px] font-black uppercase text-blue-200/50 mb-1 tracking-widest">Sessions</p>
                 <p className="text-2xl font-black">{upcomingSessions.length}</p>
              </div>
              <div className="glass-dark px-8 py-4 rounded-3xl text-center border-brand-indigo/30">
                 <p className="text-[10px] font-black uppercase text-blue-200/50 mb-1 tracking-widest">Global Rank</p>
                 <p className="text-2xl font-black text-brand-gold">TOP 1%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Active Sessions */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-xl shadow-slate-200/40">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-2xl font-black text-brand-slate flex items-center gap-3">
                     <Video size={24} className="text-brand-indigo" /> Live Consultations
                   </h2>
                   <div className="flex items-center gap-2 text-sm font-bold text-brand-indigo">
                      <div className="w-2 h-2 bg-brand-indigo rounded-full animate-pulse"></div>
                      Real-time Sync
                   </div>
                </div>

                <div className="space-y-6">
                  {upcomingSessions.map((session) => (
                    <motion.div 
                      key={session.id} 
                      whileHover={{ scale: 1.01 }}
                      className="p-8 rounded-[32px] border border-slate-50 hover:border-brand-indigo/20 hover:bg-slate-50/30 transition-all group relative overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 bg-brand-indigo/5 rounded-2xl flex items-center justify-center text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-all">
                              <User size={28} />
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-brand-slate">{session.name}</h4>
                              <p className="text-slate-400 font-medium flex items-center gap-2 text-sm">
                                 <Clock size={14} className="text-brand-indigo" /> {session.date} • {session.time}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <Button 
                             variant="outline"
                             onClick={() => handleDownloadReport(session)}
                             disabled={isDownloading === session.id}
                             className="border-2 border-slate-100 hover:border-brand-indigo hover:text-brand-indigo rounded-2xl px-6 py-6 font-bold"
                           >
                             {isDownloading === session.id ? <Loader2 className="animate-spin" /> : <><FileText size={18} className="mr-2" /> Report</>}
                           </Button>
                           <Button 
                             onClick={() => handleJoinVideo(session.id)}
                             disabled={isJoining === session.id}
                             className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-black px-8 py-6 rounded-2xl shadow-lg shadow-brand-indigo/20 transition-all"
                           >
                             {isJoining === session.id ? <Loader2 className="animate-spin" /> : "Join Call"}
                           </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-10">
             <div className="bg-brand-slate text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                   <ShieldCheck size={24} className="text-brand-emerald" /> Security Protocol
                </h3>
                <div className="space-y-4">
                   <div className="p-5 glass-dark rounded-2xl flex items-center gap-4 border-white/5">
                      <div className="w-10 h-10 bg-brand-indigo/20 text-brand-indigo rounded-xl flex items-center justify-center">
                        <Video size={20} />
                      </div>
                      <p className="text-sm font-bold text-blue-100/80">Encrypted Jitsi Stream</p>
                   </div>
                   <div className="p-5 glass-dark rounded-2xl flex items-center gap-4 border-white/5">
                      <div className="w-10 h-10 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <p className="text-sm font-bold text-blue-100/80">Private Consultation</p>
                   </div>
                </div>
                <div className="pt-10">
                  <Button 
                    onClick={() => handleJoinVideo('test')}
                    className="w-full bg-white text-brand-slate font-black py-7 rounded-2xl hover:bg-slate-50 transition-all text-lg shadow-xl"
                  >
                     Instant Video Test
                  </Button>
                </div>
             </div>

             <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl shadow-slate-200/40">
                <h3 className="font-black text-brand-slate mb-6 flex items-center gap-3 text-xl">
                   <Sparkles size={24} className="text-brand-gold" /> Counselor IQ
                </h3>
                <div className="italic text-slate-500 border-l-4 border-brand-gold pl-6 py-2 text-sm leading-relaxed font-medium">
                   &quot;Your career is a marathon, not a sprint. Every session you lead today builds a legacy for tomorrow.&quot;
                   <p className="not-italic font-black text-slate-300 mt-4 uppercase tracking-widest text-[10px]">MentorMe Intelligence</p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
