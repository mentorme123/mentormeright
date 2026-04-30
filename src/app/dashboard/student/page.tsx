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
  Globe,
  UserCircle,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function StudentDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<'not_started' | 'in_progress' | 'completed'>('not_started');
  const [reportData, setReportData] = useState<any>(null);

  // Profile Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    country: "",
    state: "",
    education_level: "",
    current_package: "",
    target_package: ""
  });

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      // Fetch Profile
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(userProfile);

      if (userProfile && (!userProfile.phone || !userProfile.country)) {
        setShowProfileModal(true);
      }

      // Check assessment status
      const { data: assessment } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (assessment) {
        setAssessmentStatus('completed');
        setReportData(assessment.report);
      } else {
        setAssessmentStatus('not_started');
      }
      setLoading(false);
    }
    loadData();
  }, [router, supabase]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          phone: formData.phone,
          gender: formData.gender,
          country: formData.country,
          state: formData.state,
          education_level: formData.education_level,
          current_package: formData.current_package,
          target_package: formData.target_package
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile({ ...profile, ...formData });
      setShowProfileModal(false);
    } catch (err) {
      console.error("Error saving profile", err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-indigo" />
      </div>
    );
  }

  const topTraits = reportData?.career_pathways?.[0] || null;

  return (
    <div className="min-h-screen bg-slate-50/30 pt-24 pb-12 px-4 sm:px-8 relative">
      
      {/* Profile Onboarding Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black text-brand-blue uppercase tracking-tight">Complete Your Profile</h2>
                <p className="text-slate-500 font-medium">We need a few more details to personalize your career intelligence journey.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="+1 234 567 8900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Gender *</label>
                    <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Country *</label>
                    <input type="text" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="United States" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">State / Region *</label>
                    <input type="text" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="California" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700">Education Level / Class *</label>
                    <select required value={formData.education_level} onChange={e => setFormData({...formData, education_level: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20">
                      <option value="">Select Level</option>
                      <option value="High School">High School (Grade 9-12)</option>
                      <option value="Undergraduate">Undergraduate Student</option>
                      <option value="Graduate">Graduate Student</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>
                  
                  {formData.education_level === "Working Professional" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Current Package (Optional)</label>
                        <input type="text" value={formData.current_package} onChange={e => setFormData({...formData, current_package: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="e.g. $80,000 / 12 LPA" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Target Package (Optional)</label>
                        <input type="text" value={formData.target_package} onChange={e => setFormData({...formData, target_package: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-blue/20" placeholder="e.g. $120,000 / 20 LPA" />
                      </div>
                    </>
                  )}
                </div>
                
                <Button type="submit" disabled={savingProfile} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl text-lg shadow-lg">
                  {savingProfile ? "Saving Profile..." : "Save & Continue to Dashboard"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
             
             {/* Profile Details Mini Card */}
             {profile && profile.phone && (
               <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-wrap gap-6 items-center text-sm font-medium text-slate-600">
                 <div className="flex items-center gap-2"><Phone size={16} className="text-brand-orange"/> {profile.phone}</div>
                 <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-blue"/> {profile.state}, {profile.country}</div>
                 <div className="flex items-center gap-2"><GraduationCap size={16} className="text-emerald-600"/> {profile.education_level}</div>
                 {profile.current_package && (
                   <div className="flex items-center gap-2"><Briefcase size={16} className="text-purple-600"/> Target: {profile.target_package}</div>
                 )}
               </div>
             )}

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
                   
                   {/* Track Record Display */}
                   {assessmentStatus === 'completed' && reportData && (
                     <div className="grid sm:grid-cols-2 gap-4 pt-4">
                       <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
                         <h4 className="font-bold text-emerald-800 mb-2">Dominant Trait</h4>
                         <p className="text-emerald-700 text-sm">{reportData.executive_summary?.split('.')[0] || "Highly analytical with strong problem-solving skills."}</p>
                       </div>
                       <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl">
                         <h4 className="font-bold text-orange-800 mb-2">Top Recommendation</h4>
                         <p className="text-orange-700 text-sm font-bold">{topTraits?.title || "Technology & Strategy"}</p>
                       </div>
                     </div>
                   )}

                   <div className="pt-4">
                     <Link href={assessmentStatus === 'completed' ? "/report" : "/assessment"}>
                        <Button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-black px-12 py-8 rounded-2xl text-xl shadow-xl shadow-brand-indigo/20 transition-all hover:scale-105">
                          {assessmentStatus === 'not_started' ? 'Begin Evaluation' : assessmentStatus === 'in_progress' ? 'Continue Journey' : 'View Full AI Report'}
                        </Button>
                     </Link>
                   </div>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
             
             {/* Premium Counseling CTA */}
             <div className="bg-gradient-to-br from-brand-slate to-[#0D1A30] text-white rounded-[40px] p-10 shadow-2xl relative overflow-hidden group border border-white/10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-brand-gold border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span> Highly Recommended
                  </div>
                  <h3 className="text-3xl font-black mb-4 leading-tight">1-on-1 Expert Counseling</h3>
                  <p className="text-blue-100/70 text-sm leading-relaxed mb-8 font-medium">
                     Your AI report provides the map, but an expert provides the compass. Book a session to decode your psychometric results, align them with market realities, and build an actionable roadmap.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-blue-50/90 font-medium">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                      Decode your 12-page report
                    </div>
                    <div className="flex items-center gap-3 text-sm text-blue-50/90 font-medium">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">✓</div>
                      Get unbiased college/job advice
                    </div>
                  </div>

                  <Link href="/counsellors" className="block w-full">
                    <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-7 rounded-2xl shadow-xl transition-all hover:scale-105 border-none">
                       Book Consultation Now
                    </Button>
                  </Link>
                </div>
             </div>

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

          </div>

        </div>

      </div>
    </div>
  );
}
