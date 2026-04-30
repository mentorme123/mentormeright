"use client";

import { useState, useEffect } from "react";
import { GraduationCap, TrendingUp, Calendar, CheckCircle2, ShieldCheck, ArrowRight, IndianRupee, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ParentDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [student, setStudent] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchParentData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // In a real app, we'd fetch linked student via parent_profiles
        // For this "Victory" demo, we fetch the first student assessment for the linked parent account
        const { data: studentProfile } = await supabase
          .from("users")
          .select("*")
          .eq("audience_type", "ST")
          .limit(1)
          .single();

        if (studentProfile) {
          setStudent(studentProfile);
          
          const { data: results } = await supabase
            .from("assessment_results")
            .select("*")
            .eq("user_id", studentProfile.id)
            .single();
          setAssessment(results);

          const { data: book } = await supabase
            .from("bookings")
            .select("*, counsellors(*)")
            .eq("user_id", studentProfile.id);
          setBookings(book || []);
        }
      }
      setLoading(false);
    }
    fetchParentData();
  }, [supabase]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
    </div>;
  }
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-black uppercase tracking-widest">
              Parent Guardian Portal
            </div>
            <h1 className="text-3xl font-black text-slate-900">
              Welcome back, <span className="text-brand-blue">Parent</span>
            </h1>
            <p className="text-slate-500 font-medium">Monitoring career progress for <span className="text-slate-900 font-bold">{student?.full_name || "Your Student"}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-2 font-bold">Add Another Student</Button>
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-bold px-6 shadow-lg shadow-brand-blue/20">
              Settings
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Col: Student Snapshot */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Assessment Score", value: assessment ? "Completed" : "Pending", icon: <ShieldCheck className="text-emerald-500" /> },
                { label: "Counseling Sessions", value: bookings.length, icon: <Calendar className="text-brand-blue" /> },
                { label: "Roadmap Milestones", value: "4/12", icon: <TrendingUp className="text-brand-orange" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Career Match Analysis */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Star className="text-brand-orange" size={24} fill="currentColor" />
                Top Career Matches for {student?.full_name.split(' ')[0]}
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: "Software Architect", match: 94, salary: "₹18L - ₹45L", trend: "High" },
                  { title: "Data Scientist", match: 88, salary: "₹12L - ₹30L", trend: "Exceptional" },
                  { title: "Product Manager", match: 82, salary: "₹15L - ₹35L", trend: "Growing" }
                ].map((career, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-blue/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-brand-blue border border-slate-100">
                        {career.match}%
                      </div>
                      <div>
                        <p className="font-black text-slate-800">{career.title}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Est. Salary: {career.salary}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="group-hover:text-brand-blue">
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Calendar className="text-brand-blue" size={24} />
                Recent Counseling Activity
              </h3>
              
              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 font-bold">No sessions booked yet.</p>
                  <Button className="mt-4 bg-brand-blue text-white rounded-xl font-bold">Encourage Student to Book</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <img src={booking.counsellors?.photo_url || "https://i.pravatar.cc/150?u=couns"} alt="Counsellor" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{booking.counsellors?.name}</p>
                          <p className="text-xs text-slate-500">{new Date(booking.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase">
                          <CheckCircle2 size={12} /> {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Col: ROI & Actions */}
          <div className="space-y-8">
            
            {/* ROI Insight Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <IndianRupee size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <TrendingUp className="text-brand-orange" />
                  Career ROI Insight
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Based on {student?.full_name.split(' ')[0]}&apos;s current skills and target career, the expected ROI for higher education is <span className="text-white font-bold">2.4x</span> within the first 3 years of graduation.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="block text-xs font-bold text-slate-500 uppercase mb-2">Projected Starting Salary</span>
                  <p className="text-3xl font-black text-white">₹12.5L <span className="text-xs text-slate-400 font-normal">avg/year</span></p>
                </div>
                <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-6 rounded-xl shadow-lg shadow-brand-orange/20">
                  View Education Cost Analysis
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900">Action Items</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <input type="checkbox" className="w-5 h-5 accent-brand-blue" checked readOnly />
                  <span className="text-sm font-bold text-slate-700 line-through opacity-50">Review Assessment Results</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <input type="checkbox" className="w-5 h-5 accent-brand-blue" />
                  <span className="text-sm font-bold text-slate-700">Approve Booking Fee (₹999)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <input type="checkbox" className="w-5 h-5 accent-brand-blue" />
                  <span className="text-sm font-bold text-slate-700">Discuss Roadmap Phase 2</span>
                </div>
              </div>
            </div>

            {/* NEP 2020 Compliance Certificate */}
            <div className="bg-brand-blue/5 border-2 border-brand-blue/20 p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-brand-blue" size={28} />
                <h3 className="text-lg font-black text-slate-900">NEP 2020 Certification</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                MentorMe is fully compliant with the National Education Policy 2020 guidelines for early career intervention and vocational guidance.
              </p>
              <Button variant="outline" className="w-full border-brand-blue text-brand-blue font-bold py-6 rounded-xl hover:bg-brand-blue hover:text-white transition-all">
                Download Career Readiness Certificate
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
