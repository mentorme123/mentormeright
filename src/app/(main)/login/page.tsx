"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { X, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setError("");
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      if (!data.user) throw new Error("No user found");

      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      const role = profile?.role || (data.user.user_metadata as Record<string, string | undefined>)?.role || 'individual';

      if (role === 'institutional') {
        window.location.href = '/dashboard/institution';
      } else if (role === 'admin') {
        window.location.href = '/dashboard/admin';
      } else if (role === 'counselor') {
        window.location.href = '/dashboard/counselor';
      } else {
        window.location.href = '/career-assessment.html';
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed. Please check your credentials.";
      if (message.includes("Unexpected token '<'") || message.toLowerCase().includes("rate limit")) {
        setError("Too many login attempts or server error. Please wait a few minutes and try again.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || '');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${siteUrl}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google Sign In Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-brand-blue p-8 text-center text-white relative">
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all"
            aria-label="Back"
          >
            <X size={18} />
          </button>
          <h1 className="text-3xl font-black uppercase">MentorMe Portal</h1>
          <p className="text-white/80 text-sm mt-2 font-medium">Access your career intelligence dashboard</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-bold">
                {error}
                {error.toLowerCase().includes("not confirmed") && (
                  <p className="text-xs text-red-700 mt-2">Please confirm your email before signing in.</p>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-black text-lg shadow-xl transition-all active:scale-95 ${
                loading ? "bg-slate-300" : "bg-brand-orange hover:bg-brand-orange/90"
              }`}
            >
              {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Authenticating...</span> : "Sign In"}
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
          <p className="text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-brand-orange font-black hover:underline transition-all">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
