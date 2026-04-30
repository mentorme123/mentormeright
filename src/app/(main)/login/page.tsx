"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Loader2, ArrowRight, ShieldCheck, Mail, Lock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Fetch user role to redirect correctly
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();
      
      if (profile?.role === 'institutional') {
        router.push("/dashboard/institution");
      } else if (profile?.role === 'counselor' || profile?.role === 'admin') {
        router.push("/dashboard/counselor");
      } else {
        router.push("/dashboard/student");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* Left Column: Brand & Visuals */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex lg:w-1/2 bg-brand-slate relative flex-col justify-between p-24 text-white overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-indigo/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-indigo/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-indigo rounded-xl flex items-center justify-center font-black text-lg">M</div>
          <span className="text-2xl font-black tracking-tighter uppercase">MentorMe</span>
        </div>

        <div className="relative z-10 space-y-8">
           <h2 className="text-6xl font-black leading-tight tracking-tighter uppercase">
             Unlock Your <br />
             <span className="text-brand-indigo">Elite Potential</span>
           </h2>
           <p className="text-blue-100/60 text-xl font-medium max-w-md">
             The world&apos;s most advanced career intelligence platform for students and enterprise partners.
           </p>
           <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-brand-slate bg-slate-700 overflow-hidden relative">
                      <Image 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 20}`} 
                        alt="User Avatar" 
                        fill
                        className="object-cover"
                      />
                   </div>
                 ))}
              </div>
              <p className="text-sm font-bold text-blue-100/40 uppercase tracking-widest">Joined by 50,000+ Students</p>
           </div>
        </div>

        <div className="relative z-10 text-sm font-bold text-blue-100/20 uppercase tracking-widest">
           © {new Date().getFullYear()} MentorMe Intelligence Unit
        </div>
      </motion.div>

      {/* Right Column: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md space-y-12 relative z-10"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-brand-slate tracking-tight">Access Dashboard</h1>
            <p className="text-slate-500 font-medium text-lg">Sign in to continue your career journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-2">Professional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-indigo transition-colors" size={20} />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium text-lg bg-slate-50/50"
                    placeholder="name@university.edu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pl-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Security Phrase</label>
                  <Link href="/forgot-password" className="text-xs font-bold text-brand-indigo hover:underline">Forgot password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-indigo transition-colors" size={20} />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium text-lg bg-slate-50/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white font-black py-8 rounded-[32px] text-xl shadow-2xl shadow-brand-indigo/20 transition-all hover:scale-105 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck className="mr-2" /> Authenticate Account</>}
            </Button>
          </form>

          <div className="text-center space-y-6">
            <p className="text-slate-400 font-bold">
              New to the platform? <Link href="/register" className="text-brand-indigo hover:underline">Create an Elite Account</Link>
            </p>
            <div className="flex items-center justify-center gap-8 pt-6 border-t border-slate-100 opacity-50 grayscale hover:grayscale-0 transition-all">
               <Building2 size={24} className="text-slate-400" />
               <ShieldCheck size={24} className="text-slate-400" />
               <ArrowRight size={24} className="text-slate-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
