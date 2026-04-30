"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { 
  ClipboardList, 
  ArrowRight, 
  Loader2, 
  Globe,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Star,
  AlertTriangle,
  Video,
  Mail,
  X,
  ChevronRight,
  Download,
  FileText,
  LayoutDashboard,
  Settings,
  User as UserIcon,
  BookOpen,
  DollarSign,
  Users,
  Info,
  Compass,
  PieChart,
  Bell,
  Award,
  ShieldCheck,
  Search,
  MessageSquare,
  Timer,
  Sparkles,
  IndianRupee
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ParameterScores } from "@/lib/scoring";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserProfile = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReportData = any;

export default function StudentDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile>(null);
  const [reportData, setReportData] = useState<ReportData>(null);
  const [assessmentScores, setAssessmentScores] = useState<ParameterScores | null>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<'not_started' | 'completed'>('not_started');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // Onboarding form state
  const [formPhone, setFormPhone] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formState, setFormState] = useState("");
  const [formEducation, setFormEducation] = useState("");
  const [formCurrentPackage, setFormCurrentPackage] = useState("");
  const [formTargetPackage, setFormTargetPackage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setAuthUser(user);

      // Fetch profile from users table
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(userProfile);

      // Check if profile is incomplete (no phone means they haven't filled the form)
      if (userProfile && !userProfile.phone) {
        setShowOnboarding(true);
        // Pre-fill education from audience type
        if (userProfile.audience_type) {
          const audienceMap: Record<string, string> = { 'ST': 'School Student', 'UG': 'College/Undergraduate', 'GR': 'Graduate', 'WP': 'Working Professional' };
          setFormEducation(audienceMap[userProfile.audience_type] || '');
        }
      }

      // Check assessment status and fetch report
      const { data: assessment } = await supabase
        .from('assessment_results')
        .select('report, scores')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (assessment) {
        setAssessmentStatus('completed');
        setReportData(assessment.report);
        setAssessmentScores(assessment.scores as unknown as ParameterScores);
      }

      // Fetch Bookings
      const { data: userBookings } = await supabase
        .from('bookings')
        .select(`
          *,
          counsellors (
            name,
            specialization
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setBookings(userBookings || []);
      setBookingsLoading(false);
      setLoading(false);
    }
    loadData();
  }, [router, supabase]);

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
        updated_at: new Date().toISOString()
      })
      .eq('id', authUser.id);

    if (error) {
      alert("Failed to save profile. Please try again.");
      console.error(error);
    } else {
      // Refresh the profile
      const { data: updatedProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();
      setProfile(updatedProfile);
      setShowOnboarding(false);
    }
    setSaving(false);
  };

  // Extract strengths and weaknesses from report
  const getStrengths = (): string[] => {
    if (!reportData) return [];
    try {
      if (reportData.strengths) return Array.isArray(reportData.strengths) ? reportData.strengths.slice(0, 4) : [];
      if (reportData.top_strengths) return Array.isArray(reportData.top_strengths) ? reportData.top_strengths.slice(0, 4) : [];
      if (reportData.keyStrengths) return Array.isArray(reportData.keyStrengths) ? reportData.keyStrengths.slice(0, 4) : [];
      // Try nested
      if (reportData.summary?.strengths) return reportData.summary.strengths.slice(0, 4);
    } catch { /* ignore */ }
    return [];
  };

  const getWeaknesses = (): string[] => {
    if (!reportData) return [];
    try {
      if (reportData.areas_for_development) return Array.isArray(reportData.areas_for_development) ? reportData.areas_for_development.slice(0, 4) : [];
      if (reportData.weaknesses) return Array.isArray(reportData.weaknesses) ? reportData.weaknesses.slice(0, 4) : [];
      if (reportData.areasForImprovement) return Array.isArray(reportData.areasForImprovement) ? reportData.areasForImprovement.slice(0, 4) : [];
      if (reportData.summary?.areas_for_development) return reportData.summary.areas_for_development.slice(0, 4);
    } catch { /* ignore */ }
    return [];
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">

      {/* Onboarding Modal */}
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
                {/* Phone */}
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
                
                {/* Gender */}
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

                {/* Country & State */}
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

                {/* Education Level */}
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

                {/* Working Professional Fields */}
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
        
        {/* Live Alert Ticker */}
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
        
        {/* Header */}
        <div className="relative p-8 sm:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-blue to-blue-900 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-4 border-white/10 overflow-hidden shadow-2xl shrink-0">
                <Image 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${authUser?.email}&backgroundColor=1B3A6B,0D7377,F0A500`}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight truncate">Welcome, {authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0]}</h1>
                <p className="text-blue-200 font-medium text-sm truncate">{authUser?.email}</p>
              </div>
            </div>
            {assessmentStatus === 'completed' && (
              <Link href="/report">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-xl px-8 py-6 rounded-2xl text-base transition-all hover:scale-105 whitespace-nowrap">
                  View AI Report <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            )}
          </div>
        </div>
        {/* Global Toolkit - THE "WINNING" TOOLS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "AI Simulator", icon: <MessageSquare className="text-brand-blue" />, sub: "Talk to Pros", link: "/career-library", badge: "NEW" },
            { label: "Exam War Room", icon: <Timer className="text-brand-orange" />, sub: "JEE/NEET/CUET", link: "/dashboard/student/exams", badge: "LIVE" },
            { label: "NEP Certificates", icon: <Award className="text-emerald-500" />, sub: "Get Certified", badge: "HOT" },
            { label: "Career ROI", icon: <IndianRupee className="text-purple-500" />, sub: "Salary Insights", link: "/career-library" }
          ].map((tool, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:border-brand-blue hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              {tool.badge && (
                <div className="absolute top-0 right-0 px-2 py-1 bg-brand-orange text-[8px] font-black text-white rounded-bl-lg">
                  {tool.badge}
                </div>
              )}
              <Link href={tool.link || "#"} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
                  {tool.icon}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800">{tool.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{tool.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Profile Details Card */}
            {profile?.phone && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <User size={20} className="text-brand-blue" /> My Profile
                  </h3>
                  <button 
                    onClick={() => setShowOnboarding(true)} 
                    className="text-xs font-bold text-brand-blue hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { icon: <Mail size={14} />, label: "Email", value: profile.email },
                    { icon: <Phone size={14} />, label: "Phone", value: profile.phone },
                    { icon: <User size={14} />, label: "Gender", value: profile.gender },
                    { icon: <MapPin size={14} />, label: "Location", value: `${profile.state || ''}, ${profile.country || ''}` },
                    { icon: <GraduationCap size={14} />, label: "Education", value: profile.education_level },
                    ...(profile.current_package ? [{ icon: <Briefcase size={14} />, label: "Current CTC", value: profile.current_package }] : []),
                    ...(profile.target_package ? [{ icon: <TrendingUp size={14} />, label: "Target CTC", value: profile.target_package }] : []),
                  ].filter(item => item.value && item.value !== ', ').map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                        {item.icon}
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-700 truncate">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RIASEC Chart Card */}
              {assessmentScores && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-slate-800 flex items-center gap-2">
                      <PieChart size={18} className="text-brand-orange" /> Psychometric Profile
                    </h3>
                    <div className="group relative">
                      <Info size={14} className="text-slate-400 cursor-help" />
                      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        RIASEC measures Passion: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                        { subject: 'Realistic', A: assessmentScores.Realistic, fullMark: 20 },
                        { subject: 'Investigative', A: assessmentScores.Investigative, fullMark: 20 },
                        { subject: 'Artistic', A: assessmentScores.Artistic, fullMark: 20 },
                        { subject: 'Social', A: assessmentScores.Social, fullMark: 20 },
                        { subject: 'Enterprising', A: assessmentScores.Enterprising, fullMark: 20 },
                        { subject: 'Conventional', A: assessmentScores.Conventional, fullMark: 20 },
                      ]}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                        <Radar
                          name="Passion"
                          dataKey="A"
                          stroke="#F97316"
                          fill="#F97316"
                          fillOpacity={0.6}
                        />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center italic mt-2">RIASEC Passion Mapping v2.1</p>
                </div>
              )}

              {/* Summary / Status Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-brand-blue" /> Executive Summary
                  </h3>
                  {reportData ? (
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {reportData.executiveSummary}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-slate-500 text-sm italic">Assessment not completed yet.</p>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-brand-orange"></div>
                      </div>
                    </div>
                  )}
                </div>

                {!reportData && (
                  <Link href="/assessment">
                    <Button className="w-full mt-6 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-4 shadow-lg shadow-orange-600/10 transition-all hover:translate-y-[-2px]">
                      Start Assessment <ChevronRight size={18} className="ml-1" />
                    </Button>
                  </Link>
                )}
                
                {reportData && (
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Profile Status</p>
                      <p className="text-sm font-black text-emerald-600">High Resolution Intelligence</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Victory Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exam Tracker Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Bell size={100} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">Exam Tracker</h3>
                    <p className="text-slate-500 text-xs font-medium mt-1">JEE, NEET, CUET & 50+ other Indian exams.</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Live Deadlines & Alerts
                  </div>
                  <Link href="/dashboard/student/exams" className="block">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-xl text-sm">
                      Open War Room <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Certification Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Award size={100} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue border border-brand-blue/20">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">NEP Certificate</h3>
                    <p className="text-slate-500 text-xs font-medium mt-1">Official Career Readiness Certificate (NEP 2020).</p>
                  </div>
                  {assessmentStatus === 'completed' ? (
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                      <ShieldCheck size={12} /> Eligible for Download
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600">
                      <Info size={12} /> Complete Assessment to Unlock
                    </div>
                  )}
                  <Button 
                    disabled={assessmentStatus !== 'completed'}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-xl text-sm disabled:opacity-50"
                  >
                    Download PDF <Download size={16} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
             
            {/* Assessment Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-brand-blue/5 rounded-xl">
                  <ClipboardList size={24} className="text-brand-blue" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  assessmentStatus === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-orange/10 text-brand-orange'
                }`}>
                  {assessmentStatus === 'completed' ? 'Completed' : 'Pending'}
                </div>
              </div>
              <h2 className="text-xl font-black text-slate-800 mb-2">Career Intelligence Assessment</h2>
              <p className="text-slate-500 text-sm mb-6">
                Our proprietary 90-question psychometric engine maps your unique traits to 500+ global career paths.
              </p>
              <Link href={assessmentStatus === 'completed' ? "/report" : "/assessment"}>
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-5 rounded-xl shadow-md transition-all hover:scale-105">
                  {assessmentStatus === 'completed' ? 'View Full Report' : 'Begin Assessment'} <ChevronRight className="ml-1" size={16} />
                </Button>
              </Link>
              {assessmentStatus === 'completed' && (
                <Link href="/report">
                  <Button variant="outline" className="ml-3 font-bold px-6 py-5 rounded-xl">
                    <Download size={16} className="mr-2" /> Download PDF
                  </Button>
                </Link>
              )}
            </div>

            {/* Strengths & Areas for Development */}
            {assessmentStatus === 'completed' && (getStrengths().length > 0 || getWeaknesses().length > 0) && (
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Strengths */}
                {getStrengths().length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-base">
                      <Star size={18} className="text-emerald-600" /> Top Strengths
                    </h3>
                    <div className="space-y-2">
                      {getStrengths().map((s: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 bg-emerald-50 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                          <span className="text-sm font-medium text-emerald-800">{typeof s === 'string' ? s : JSON.stringify(s)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weaknesses */}
                {getWeaknesses().length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-base">
                      <AlertTriangle size={18} className="text-amber-500" /> Areas for Development
                    </h3>
                    <div className="space-y-2">
                      {getWeaknesses().map((s: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                          <span className="text-sm font-medium text-amber-800">{typeof s === 'string' ? s : JSON.stringify(s)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* My Bookings Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <Video size={20} className="text-brand-orange" /> My Counseling Sessions
              </h3>
              
              {bookingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-slate-300" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Video className="mx-auto text-slate-300 mb-3" size={32} />
                  <p className="text-slate-500 font-medium">No sessions booked yet.</p>
                  <Link href="/counsellors">
                    <button className="text-brand-blue font-bold text-sm mt-2 hover:underline">Book your first session →</button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 gap-4 group hover:bg-white hover:border-brand-blue/20 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue font-black">
                          {booking.counsellors?.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{booking.counsellors?.name}</h4>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{booking.counsellors?.specialization}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:items-end gap-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-sm font-bold text-slate-600">
                          Session ID: <span className="font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
                        </p>
                      </div>

                      <a href={booking.jitsi_link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 px-6 rounded-xl shadow-lg shadow-brand-blue/10 transition-all hover:scale-105">
                          Join Call <Video className="ml-2" size={16} />
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Market Insights */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2 text-base">
                <Globe size={18} className="text-brand-blue" /> Market Insights
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Generative AI FinTech", trend: "+45%", color: "text-emerald-600 bg-emerald-50" },
                  { title: "Sustainability Tech", trend: "+30%", color: "text-brand-blue bg-brand-blue/5" },
                  { title: "Cybersecurity", trend: "+60%", color: "text-purple-600 bg-purple-50" },
                ].map((news, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-700 text-sm">{news.title}</h4>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${news.color}`}>
                        {news.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Counseling Matters */}
            <div className="bg-gradient-to-br from-brand-blue to-blue-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
              <div className="relative z-10">
                <Video size={28} className="text-brand-orange mb-3" />
                <h3 className="text-xl font-black mb-3">Why 1-on-1 Counseling?</h3>
                <ul className="space-y-2 text-blue-100 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>Decode your AI report with an expert counselor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>Get a personalized career roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-brand-orange shrink-0 mt-0.5" />
                    <span>Live video session, fully confidential</span>
                  </li>
                </ul>
                <Link href="/counsellors">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-5 rounded-xl shadow-lg transition-all hover:scale-105">
                    Book Counseling Session
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
