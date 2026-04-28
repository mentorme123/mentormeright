"use client";

import { useState } from "react";
import { CalendarDays, Video, FileText, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CounselorDashboard() {
  const [isJoining, setIsJoining] = useState<number | null>(null);

  const upcomingSessions = [
    { id: 1, name: "Syed Basim Ahmed", time: "10:00 AM", date: "Today", grade: "12", isPaid: true },
    { id: 2, name: "Zainab Imran", time: "02:30 PM", date: "Today", grade: "Graduate", isPaid: true },
    { id: 3, name: "Taaha", time: "11:00 AM", date: "Tomorrow", grade: "Working Professional", isPaid: true },
  ];

  const handleJoinVideo = async (sessionId: number) => {
    setIsJoining(sessionId);
    try {
      // Jitsi Meet is completely free and requires no API key.
      // We generate a unique, secure room name for the session.
      const roomName = `MentorMe-Session-${sessionId}-${Math.random().toString(36).substring(7)}`;
      const jitsiUrl = `https://meet.jit.si/${roomName}`;
      
      window.open(jitsiUrl, "_blank"); // Open the free video call securely in a new tab
      
    } catch (err) {
      alert("Error starting video call. Please try again.");
      console.error(err);
    } finally {
      setIsJoining(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h1 className="text-3xl font-black text-emerald-700 uppercase tracking-tight">Counselor Portal</h1>
             <p className="text-slate-500 font-medium">Welcome back. You have {upcomingSessions.filter(s => s.date === 'Today').length} sessions scheduled for today.</p>
           </div>
           <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md">
              <CalendarDays size={18} className="mr-2" /> Sync with Google Calendar
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Schedule Column */}
           <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Upcoming Sessions</h2>
              
              <div className="space-y-4">
                 {upcomingSessions.map((session) => (
                    <div key={session.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                       
                       <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                             <User size={24} />
                          </div>
                          <div>
                             <h3 className="text-lg font-black text-slate-800">{session.name}</h3>
                             <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                  <CalendarDays size={14} /> {session.date} at {session.time}
                                </span>
                                <span className="bg-slate-100 px-2 py-0.5 rounded-md">Grade: {session.grade}</span>
                                {session.isPaid && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md text-xs font-bold uppercase">₹4,999 Paid</span>}
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-3 w-full sm:w-auto">
                          <Button variant="outline" className="flex-1 sm:flex-none border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold transition-all">
                             <FileText size={16} className="mr-2" /> View Report
                          </Button>
                          <Button 
                            onClick={() => handleJoinVideo(session.id)}
                            disabled={isJoining === session.id}
                            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                          >
                             {isJoining === session.id ? (
                               <><Loader2 size={16} className="mr-2 animate-spin" /> Connecting...</>
                             ) : (
                               <><Video size={16} className="mr-2" /> Join Call</>
                             )}
                          </Button>
                       </div>

                    </div>
                 ))}
              </div>
           </div>

           {/* Insights / Sidebar */}
           <div className="space-y-6">
              <div className="bg-brand-blue text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                 <h3 className="text-xl font-bold mb-2">Jitsi Meet Video Rooms</h3>
                 <p className="text-blue-100 text-sm leading-relaxed mb-6">
                   Your consultation video rooms are fully secure, unlimited, and 100% free. Rooms open 5 minutes before the scheduled time.
                 </p>
                 <Button onClick={() => handleJoinVideo(0)} className="w-full bg-white text-brand-blue font-bold hover:bg-slate-50">
                    {isJoining === 0 ? "Creating Test Room..." : "Test Video & Mic"}
                 </Button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-4">Quick Analytics</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                       <span className="text-slate-500 font-medium">Sessions This Month</span>
                       <span className="font-black text-slate-800">24</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                       <span className="text-slate-500 font-medium">Avg. Student Rating</span>
                       <span className="font-black text-brand-orange">4.9/5.0</span>
                    </div>
                    <div className="flex justify-between items-center pb-1">
                       <span className="text-slate-500 font-medium">Earnings (Pending Payout)</span>
                       <span className="font-black text-emerald-600">₹85,000</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
