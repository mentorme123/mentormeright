"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to log in with Google.");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Verify Role & Route
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      const userRole = userProfile.role; // 'individual', 'institutional', 'admin'

      if (activeTab === 'student') {
        if (userRole === 'individual') {
          router.push("/assessment");
        } else {
          throw new Error("Invalid role for Student login.");
        }
      } else if (activeTab === 'institution') {
        if (userRole === 'institutional') {
          router.push("/dashboard/institution");
        } else {
          throw new Error("Unauthorized: Not an Institutional account.");
        }
      } else if (activeTab === 'counselor') {
        // Counselors logic: verify if they exist in counselors table or have admin role
        await supabase
          .from('counselors')
          .select('id')
          .limit(1); // Needs proper mapping in a real prod environment (e.g. counselor_user_id)
        
        // For now, if they select counselor, we just route them assuming they have access
        // (In a full app, counselor accounts would be linked to auth.users)
        router.push("/dashboard/counselor");
      } else if (activeTab === 'admin') {
        if (userRole === 'admin') {
          router.push("/dashboard/admin");
        } else {
          throw new Error("Unauthorized: Not an Admin account.");
        }
      }

    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to log in.");
      // Logout if they were unauthorized to clear the stale session
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-slate-50 min-h-screen pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-black text-brand-blue uppercase tracking-tight">MentorMe Portal</h1>
          <p className="text-slate-500 font-medium text-sm">Select your portal to securely log in</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
           <button 
             onClick={() => setActiveTab('student')}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'student' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Student
           </button>
           <button 
             onClick={() => setActiveTab('institution')}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'institution' ? 'bg-white shadow-sm text-brand-orange' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Institution
           </button>
           <button 
             onClick={() => setActiveTab('counselor')}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'counselor' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Counselor
           </button>
           <button 
             onClick={() => setActiveTab('admin')}
             className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Admin
           </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700" htmlFor="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none" 
              placeholder={activeTab === 'institution' ? "director@school.edu" : activeTab === 'admin' ? "admin@mentormeright.in" : "you@example.com"} 
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700" htmlFor="password">Password</label>
              <Link href="#" className="text-xs text-brand-blue hover:underline font-semibold">Forgot?</Link>
            </div>
            <input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none" 
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className={`w-full py-6 text-lg font-bold rounded-xl text-white shadow-md transition-all ${
              activeTab === 'student' ? 'bg-brand-blue hover:bg-brand-blue/90' :
              activeTab === 'institution' ? 'bg-brand-orange hover:bg-brand-orange/90' :
              activeTab === 'admin' ? 'bg-purple-600 hover:bg-purple-700' :
              'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {loading ? "Authenticating..." : `Log In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-6 text-lg font-bold rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>
        </form>
        
        {activeTab === 'student' && (
          <div className="mt-8 text-center text-sm font-medium border-t border-slate-100 pt-6">
            <span className="text-slate-500">New to MentorMe? </span>
            <Link href="/register" className="text-brand-orange font-bold hover:underline">
              Create an account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
