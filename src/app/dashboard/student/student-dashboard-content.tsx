"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import {
  ClipboardList, 
  ArrowRight, 
  ArrowLeft,
  Loader2, 
  TrendingUp,
  X,
  Bell,
  Award,
  Timer,
  Sparkles,
  IndianRupee,
  LogOut
} from "lucide-react";
import CareerDashboard from "./career-dashboard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  gender: string | null;
  country: string | null;
  state: string | null;
  education_level: string | null;
  current_package: string | null;
  target_package: string | null;
  target_career: string | null;
  audience_type: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export default function StudentDashboardContent() {
  const supabase = createClient();
  return <StudentDashboardInner supabase={supabase} />;
}

function StudentDashboardInner({ supabase }: { supabase: ReturnType<typeof createClient> }) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<{ id: string; email: string; user_metadata?: { full_name?: string } } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<'not_started' | 'completed'>('not_started');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const [formPhone, setFormPhone] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formState, setFormState] = useState("");
  const [formEducation, setFormEducation] = useState("");
  const [formCurrentPackage, setFormCurrentPackage] = useState("");
  const [formTargetPackage, setFormTargetPackage] = useState("");
  const [formTargetCareer, setFormTargetCareer] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setAuthUser({
        id: user.id,
        email: user.email || '',
        user_metadata: user.user_metadata as { full_name?: string }
      });

      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(userProfile);

      if (userProfile && !userProfile.phone) {
        setShowOnboarding(true);
        if (userProfile.audience_type) {
          const audienceMap: Record<string, string> = { 'ST': 'School Student', 'UG': 'College/Undergraduate', 'GR': 'Graduate', 'WP': 'Working Professional' };
          setFormEducation(audienceMap[userProfile.audience_type] || '');
        }
      }

      const { data: assessment } = await supabase
        .from('assessment_results')
        .select('report, scores')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (assessment) {
        setAssessmentStatus('completed');
      }

      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleSaveProfile = async () => {
    if (!formPhone || !formGender || !formCountry || !formState || !formEducation) {
      alert("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('users')
      .update({
        phone: formPhone,
        gender: formGender,
        country: formCountry,
        state: formState,
        education_level: formEducation,
        current_package: formCurrentPackage || null,
        target_package: formTargetPackage || null,
        target_career: formTargetCareer || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', authUser?.id || '');

    if (error) {
      alert("Failed to save profile. Please try again.");
      console.error(error);
    } else {
      const { data: updatedProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser?.id || '')
        .single();
      setProfile(updatedProfile);
      setShowOnboarding(false);

      try {
        fetch('/api/email/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || 'User',
            email: authUser?.email || ''
          })
        });
      } catch (e) {
        console.error("Welcome email trigger failed:", e);
      }
    }
    setSaving(false);
  };

  const isWorkingProfessional = profile?.audience_type === 'WP' || formEducation === 'Working Professional';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8 relative">

      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Complete Your Profile</h2>
                  <p className="text-slate-500 text-sm mt-1">Help us personalize your career guidance experience.</p>
                </div>
                <button onClick={() => setShowOnboarding(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1 block">Phone Number *</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1 block">Gender *</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">Country *</label>
                    <input
                      type="text"
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      placeholder="India"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 mb-1 block">State *</label>
                    <input
                      type="text"
                      value={formState}
                      onChange={(e) => setFormState(e.target.value)}
                      placeholder="Karnataka"
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1 block">Education Level *</label>
                  <select
                    value={formEducation}
                    onChange={(e) => setFormEducation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="School Student">School Student (8th - 12th)</option>
                    <option value="College/Undergraduate">College / Undergraduate</option>
                    <option value="Graduate">Graduate / Post Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1 block">Target Career Path *</label>
                  <select
                    value={formTargetCareer}
                    onChange={(e) => setFormTargetCareer(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                    required
                  >
                    <option value="">Select Target Career</option>
                    <option value="Engineering / Hardware">Engineering / Hardware</option>
                    <option value="Technology / Software">Technology / Software</option>
                    <option value="Medicine / Healthcare">Medicine / Healthcare</option>
                    <option value="Finance / Accounting">Finance / Accounting</option>
                    <option value="Business / Management">Business / Management</option>
                    <option value="Arts / Design / Media">Arts / Design / Media</option>
                    <option value="Law / Public Policy">Law / Public Policy</option>
                    <option value="Science / Research">Science / Research</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {isWorkingProfessional && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 border-t border-slate-100 pt-4"
                  >
                    <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">Professional Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-1 block">Current Package (LPA)</label>
                        <input
                          type="text"
                          value={formCurrentPackage}
                          onChange={(e) => setFormCurrentPackage(e.target.value)}
                          placeholder="e.g. 8 LPA"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-1 block">Target Package (LPA)</label>
                        <input
                          type="text"
                          value={formTargetPackage}
                          onChange={(e) => setFormTargetPackage(e.target.value)}
                          placeholder="e.g. 15 LPA"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl mt-4 shadow-lg"
                >
                  {saving ? <><Loader2 className="animate-spin mr-2" size={16} /> Saving...</> : "Save & Continue"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="bg-slate-900 text-white py-3 px-6 rounded-2xl flex items-center gap-4 overflow-hidden shadow-xl border border-white/10">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live Alerts</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div 
              animate={{ x: [1000, -2000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex items-center gap-12 whitespace-nowrap text-xs font-bold"
            >
              <span className="flex items-center gap-2"><Bell size={14} className="text-brand-orange" /> JEE Main 2026 Registration is now LIVE! Deadline: Nov 30.</span>
              <span className="flex items-center gap-2"><Sparkles size={14} className="text-brand-blue" /> AI Simulator updated with 120 new Corporate Roles.</span>
              <span className="flex items-center gap-2"><Award size={14} className="text-emerald-400" /> 1,240 NEP Certificates issued this week.</span>
              <span className="flex items-center gap-2"><TrendingUp size={14} className="text-brand-orange" /> Data Science is the #1 trending career in Hyderabad today.</span>
            </motion.div>
          </div>
        </div>
        
        <div className="relative p-8 sm:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-blue to-blue-900 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-4 border-white/10 overflow-hidden shadow-2xl shrink-0 bg-brand-orange flex items-center justify-center">
                {profile?.profile_image ? (
                  <Image 
                    src={profile.profile_image}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl font-black text-white uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-2/3 h-2/3 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="space-y-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight truncate">Welcome, {authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0]}</h1>
                <p className="text-blue-200 font-medium text-sm truncate">{authUser?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={16} /> Back to Home
              </button>
              {assessmentStatus === 'completed' && (
              <Link href="/report">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-xl px-8 py-6 rounded-2xl text-base transition-all hover:scale-105 whitespace-nowrap">
                  View AI Report <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold px-6 py-3 rounded-xl transition-all text-sm"
            >
              <LogOut className="inline mr-2" size={16} />
              Logout
            </button>
          </div>
        </div>
        </div>

        {assessmentStatus === 'completed' ? (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Student Dashboard", icon: <ClipboardList className="text-brand-blue" />, sub: "Your Full Report", link: "/dashboard/student" },
              { label: "Exam War Room", icon: <Timer className="text-brand-orange" />, sub: "JEE/NEET/CUET", link: "/dashboard/student/exams", badge: "LIVE" },
              { label: "NEP Certificates", icon: <Award className="text-emerald-500" />, sub: "Get Certified", badge: "HOT" },
              { label: "Career ROI", icon: <IndianRupee className="text-purple-500" />, sub: "Salary Insights", link: "/career-library" }
            ].map((tool, i) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={i}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-brand-blue hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => {
                  if (tool.link) {
                    window.location.href = tool.link;
                  }
                }}
              >
                {tool.badge && (
                  <div className="absolute top-0 right-0 px-2 py-1 bg-brand-orange text-[8px] font-black text-white rounded-bl-lg">
                    {tool.badge}
                  </div>
                )}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
                    {tool.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{tool.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{tool.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800">App Resources</h3>
            <p className="text-sm text-slate-500 mt-2">Complete the assessment to unlock AI Simulator, Exam War Room, NEP Certificates, and Career ROI.</p>
            <a href="/career-assessment.html" className="inline-block mt-4">
              <button className="bg-brand-orange text-white font-bold px-6 py-3 rounded-xl shadow-lg text-sm">
                Complete Assessment
              </button>
            </a>
          </div>
        )}

        {/* Career Dashboard - shown when assessment is completed */}
        {assessmentStatus === 'completed' && authUser && (
          <div id="career-dashboard">
            <CareerDashboard userId={authUser.id} />
          </div>
        )}

        {assessmentStatus !== 'completed' ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
            <h3 className="text-lg font-black text-slate-800 mb-2">Complete Your Career Assessment</h3>
            <p className="text-sm text-slate-500 mb-6">Take the assessment to unlock your personalized career dashboard.</p>
            <a href="/career-assessment.html">
              <button className="bg-brand-orange text-white font-bold px-6 py-3 rounded-xl shadow-lg text-sm">
                Take Assessment
              </button>
            </a>
          </div>
        ) : null}

      </div>
    </div>
  );
}
