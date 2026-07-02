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
      // Directly open career assessment after login
      window.location.href = "/assessment";
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
