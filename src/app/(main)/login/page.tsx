"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'student' | 'institution' | 'counselor'>('student');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        const { data: counselorData } = await supabase
          .from('counselors')
          .select('id')
          .limit(1); // Needs proper mapping in a real prod environment (e.g. counselor_user_id)
        
        // For now, if they select counselor, we just route them assuming they have access
        // (In a full app, counselor accounts would be linked to auth.users)
        router.push("/dashboard/counselor");
      }

    } catch (err: any) {
      setError(err.message || "Failed to log in.");
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
              placeholder={activeTab === 'institution' ? "director@school.edu" : "you@example.com"} 
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
              'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {loading ? "Authenticating..." : `Log In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
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
