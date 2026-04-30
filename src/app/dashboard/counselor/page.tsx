"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Video, 
  CalendarDays, 
  FileText, 
  User, 
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CounselorDashboard() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessions, setSessions] = useState<any[]>([]);
  const [isJoining, setIsJoining] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounsellorData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Find the counsellor record for this user
      const { data: counsellor } = await supabase
        .from('counsellors')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (!counsellor) {
        setLoading(false);
        return;
      }

      // 2. Fetch bookings for this counsellor
      const { data: bookings } = await supabase
        .from('bookings')
        .select(`
          *,
          users (
            id,
            name,
            email,
            education_level
          ),
          slots (
            date,
            start_time
          )
        `)
        .eq('counsellor_id', counsellor.id)
        .order('created_at', { ascending: false });
      
      setSessions(bookings || []);
      setLoading(false);
    }
    fetchCounsellorData();
  }, [supabase]);

  const handleJoinVideo = async (jitsiUrl: string, sessionId: string) => {
    setIsJoining(sessionId);
    setTimeout(() => {
      window.open(jitsiUrl, "_blank");
      setIsJoining(null);
    }, 500);
  };

  const handleDownloadReport = async (userId: string, userName: string, sessionId: string) => {
    setIsDownloading(sessionId);
    
    const { data: assessment } = await supabase
      .from('assessment_results')
      .select('report')
      .eq('user_id', userId)
      .maybeSingle();

    if (!assessment || !assessment.report) {
      alert("No assessment report found for this student yet.");
      setIsDownloading(null);
      return;
    }

    const reportContent = JSON.stringify(assessment.report, null, 2);
    const blob = new Blob([reportContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${userName.replace(/\s+/g, '_')}_Career_Report.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h1 className="text-3xl font-black text-emerald-700 uppercase tracking-tight">Counselor Portal</h1>
             <p className="text-slate-500 font-medium">Welcome back. You have {sessions.filter(s => s.slots?.date === new Date().toISOString().split('T')[0]).length} sessions scheduled for today.</p>
           </div>
           <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
              <CalendarDays size={18} className="mr-2" /> Sync with Google Calendar
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Schedule Column */}
           <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Upcoming Sessions</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-brand-blue" size={32} />
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                  <User className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-500 font-medium text-lg">You have no sessions booked yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group">
                        
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0 font-black">
                              {session.users?.name?.charAt(0) || 'S'}
                          </div>
                          <div>
                              <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors">{session.users?.name || 'Student'}</h3>
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs font-bold">
                                  <CalendarDays size={14} /> {session.slots?.date || 'Upcoming'} at {session.slots?.start_time || '--:--'}
                                </span>
                                <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">Grade: {session.users?.education_level || 'N/A'}</span>
                                <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest">Paid</span>
                              </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            onClick={() => handleDownloadReport(session.users.id, session.users.name, session.id)}
                            disabled={isDownloading === session.id}
                            className="flex-1 sm:flex-none border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold transition-all px-6 py-5 rounded-xl"
                          >
                             {isDownloading === session.id ? (
                               <><Loader2 size={16} className="mr-2 animate-spin" /> Fetching...</>
                             ) : (
                               <><FileText size={16} className="mr-2" /> Assessment</>
                             )}
                          </Button>
                          <Button 
                            onClick={() => handleJoinVideo(session.jitsi_link, session.id)}
                            disabled={isJoining === session.id}
                            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 px-6 py-5 rounded-xl"
                          >
                             {isJoining === session.id ? (
                               <><Loader2 size={16} className="mr-2 animate-spin" /> Joining...</>
                             ) : (
                               <><Video size={16} className="mr-2" /> Join Video</>
                             )}
                          </Button>
                        </div>

                    </div>
                  ))}
                </div>
              )}
           </div>

           {/* Insights / Sidebar */}
           <div className="space-y-6">
              <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                 <h3 className="text-xl font-black mb-3">Live Video Rooms</h3>
                 <p className="text-blue-100 text-sm leading-relaxed mb-6 font-medium">
                   Your consultation video rooms are fully secure, end-to-end encrypted, and 100% free. Rooms open instantly for booked slots.
                 </p>
                 <Button onClick={() => window.open('https://meet.jit.si/MentorMe-Test-Room', '_blank')} className="w-full bg-white text-brand-blue font-black hover:bg-slate-50 py-6 rounded-xl shadow-lg">
                    Test Camera & Mic
                 </Button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                 <h3 className="font-black text-slate-800 mb-5 text-lg uppercase tracking-tight">Performance</h3>
                 <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                       <span className="text-slate-500 font-bold text-sm uppercase">Total Sessions</span>
                       <span className="font-black text-slate-800 text-xl">{sessions.length}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                       <span className="text-slate-500 font-bold text-sm uppercase">Avg. Rating</span>
                       <span className="font-black text-brand-orange text-xl">4.9/5.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 font-bold text-sm uppercase">Status</span>
                       <span className="flex items-center gap-1.5 text-emerald-600 font-black text-xs uppercase bg-emerald-50 px-2 py-1 rounded-md">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          Online
                       </span>
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
