"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Loader2, User, Mail, Lock, Building2, Sparkles, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'individual' | 'institutional' | 'counselor'>('individual');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
          institution_name: role === 'institutional' ? institutionName : null,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Direct redirect for now
      if (role === 'institutional') {
        router.push("/dashboard/institution");
      } else {
        router.push("/dashboard/student");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* Left Column: Visuals */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex lg:w-2/5 bg-brand-slate relative flex-col justify-between p-16 text-white overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-indigo/40 to-transparent"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-indigo rounded-xl flex items-center justify-center font-black">M</div>
          <span className="text-2xl font-black uppercase tracking-tighter">MentorMe</span>
        </div>

        <div className="relative z-10 space-y-12">
           <div className="space-y-4">
              <div className="inline-block px-4 py-1 rounded-full bg-brand-indigo/20 border border-brand-indigo/30 text-[10px] font-black uppercase tracking-widest text-brand-indigo">Account Initialization</div>
              <h2 className="text-5xl font-black leading-tight tracking-tight uppercase">Join the <br /> <span className="text-brand-gold italic">Elite Network</span></h2>
           </div>
           
           <div className="space-y-6">
              {[
                { icon: <Sparkles size={20} />, text: "90-Question Intelligence Assessment" },
                { icon: <GraduationCap size={20} />, text: "AI-Powered Career Roadmaps" },
                { icon: <Briefcase size={20} />, text: "B2B Institutional Infrastructure" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-blue-100/80 font-medium">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-indigo">{item.icon}</div>
                   {item.text}
                </div>
              ))}
           </div>
        </div>

        <div className="relative z-10 text-xs font-black text-blue-100/20 uppercase tracking-widest">
           MentorMe Intelligence Platform v2.0
        </div>
      </motion.div>

      {/* Right Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl space-y-10 relative z-10 py-12"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-brand-slate tracking-tight">Create Identity</h1>
            <p className="text-slate-500 font-medium text-lg">Select your role and initialize your professional account.</p>
          </div>

          {/* Role Switcher */}
          <div className="flex p-2 bg-slate-50 rounded-[32px] border-2 border-slate-50">
             {[
               { id: 'individual', label: 'Student', icon: <User size={16} /> },
               { id: 'institutional', label: 'Institution', icon: <Building2 size={16} /> },
               { id: 'counselor', label: 'Counselor', icon: <Sparkles size={16} /> }
             ].map((r) => (
               <button
                 key={r.id}
                 onClick={() => setRole(r.id as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
                 className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all ${
                   role === r.id ? 'bg-white text-brand-indigo shadow-xl shadow-slate-200/50' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                 {r.icon} {r.label}
               </button>
             ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-2">Full Legal Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-indigo" size={20} />
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium bg-slate-50/50"
                      placeholder="Jane Doe"
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-2">Official Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-indigo" size={20} />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium bg-slate-50/50"
                      placeholder="name@company.com"
                    />
                  </div>
               </div>
            </div>

            {role === 'institutional' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="space-y-2"
              >
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-2">Institution / School Name</label>
                <div className="relative group">
                  <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-indigo" size={20} />
                  <input 
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium bg-slate-50/50"
                    placeholder="Harvard University"
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-2">Security Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-indigo" size={20} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium bg-slate-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white font-black py-8 rounded-[32px] text-xl shadow-2xl shadow-brand-indigo/20 transition-all hover:scale-105"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Initialize Identity"}
            </Button>
          </form>

          <p className="text-center text-slate-400 font-bold">
            Already have an identity? <Link href="/login" className="text-brand-indigo hover:underline">Access Dashboard</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
