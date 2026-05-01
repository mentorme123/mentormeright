"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'student' | 'institution' | 'counselor' | 'admin'>('student');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${siteUrl}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Google Login Failed");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login for:", email);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("No user found");

      console.log("Auth success, checking profile...");

      // 1. Get or Create Profile
      let { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (!userProfile) {
        console.log("Profile missing, creating fallback...");
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert([{ 
            id: data.user.id, 
            email: data.user.email, 
            name: data.user.user_metadata?.full_name || email.split('@')[0], 
            role: 'individual' 
          }])
          .select('role')
          .single();
        
        if (createError) throw createError;
        userProfile = newProfile;
      }

      const userRole = userProfile.role;
      console.log("User Role:", userRole, "Active Tab:", activeTab);

      // 2. Pure Handover to Route Director
      console.log("Authentication successful. Handing over to Route Director...");
      router.push("/auth/route-director");

    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "Login failed. Check your credentials.");
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        <div className="bg-brand-blue p-8 text-center text-white">
          <h1 className="text-3xl font-black uppercase">MentorMe Portal</h1>
          <p className="text-white/80 text-sm mt-2 font-medium">Access your career intelligence dashboard</p>
        </div>

        <div className="p-8">
          {/* Simple Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 border border-slate-200">
            {['student', 'institution', 'counselor', 'admin'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow-md text-brand-blue' : 'text-slate-500'}`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-all font-medium text-slate-700 bg-slate-50"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-500 uppercase">Password</label>
                <Link href="#" className="text-xs font-bold text-brand-blue">Forgot Password?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-all font-medium text-slate-700 bg-slate-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-black text-lg shadow-xl transition-all active:scale-95 ${
                loading ? 'bg-slate-300' : 'bg-brand-orange hover:bg-brand-orange/90'
              }`}
            >
              {loading ? "AUTHENTICATING..." : "SIGN IN NOW"}
            </button>

            <div className="text-center">
              <span className="text-slate-400 text-sm">Or sign in with</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-4 rounded-xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account? <Link href="/register" className="text-brand-orange font-black">Register Free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
