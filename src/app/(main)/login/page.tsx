"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

// ── Zod schema ───────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
type LoginForm = z.infer<typeof loginSchema>;

type TabType = "student" | "institution" | "counselor" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<TabType>("student");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const handleGoogleLogin = async () => {
    setServerError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { 
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback` 
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setServerError((err as Error).message || "Failed to log in with Google.");
    }
  };

  const onSubmit = async (values: LoginForm) => {
    setServerError("");
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (authError) throw authError;

      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();
      if (profileError) throw profileError;

      const userRole = userProfile.role;

      if (activeTab === "student") {
        if (userRole === "individual") router.push("/dashboard/student");
        else throw new Error("This account is not registered as a Student.");
      } else if (activeTab === "institution") {
        if (userRole === "institutional") router.push("/dashboard/institution");
        else throw new Error("Unauthorized: Not an Institutional account.");
      } else if (activeTab === "counselor") {
        router.push("/dashboard/counselor");
      } else if (activeTab === "admin") {
        if (userRole === "admin") router.push("/dashboard/admin");
        else throw new Error("Unauthorized: Not an Admin account.");
      }
    } catch (err: unknown) {
      setServerError((err as Error).message || "Failed to log in.");
      await supabase.auth.signOut();
    }
  };

  const tabColor: Record<TabType, string> = {
    student: "text-brand-blue",
    institution: "text-brand-orange",
    counselor: "text-emerald-600",
    admin: "text-purple-600",
  };
  const btnColor: Record<TabType, string> = {
    student: "bg-brand-blue hover:bg-brand-blue/90",
    institution: "bg-brand-orange hover:bg-brand-orange/90",
    counselor: "bg-emerald-600 hover:bg-emerald-700",
    admin: "bg-purple-600 hover:bg-purple-700",
  };
  const emailPlaceholder: Record<TabType, string> = {
    student: "you@example.com",
    institution: "director@school.edu",
    counselor: "counselor@mentormeright.in",
    admin: "admin@mentormeright.in",
  };

  const inputClass =
    "w-full p-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm";
  const errorClass = "text-xs text-red-500 font-medium mt-1";

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-slate-50 min-h-screen pt-24">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-black text-brand-blue uppercase tracking-tight">MentorMe Portal</h1>
          <p className="text-slate-500 font-medium text-sm">Select your portal to securely log in</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
          {(["student", "institution", "counselor", "admin"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setServerError(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                activeTab === tab ? `bg-white shadow-sm ${tabColor[tab]}` : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder={emailPlaceholder[activeTab]}
              className={`${inputClass} ${errors.email ? "border-red-400" : "border-slate-200"}`}
              {...register("email")}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700" htmlFor="password">Password</label>
              <Link href="#" className="text-xs text-brand-blue hover:underline font-semibold">Forgot?</Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              className={`${inputClass} ${errors.password ? "border-red-400" : "border-slate-200"}`}
              {...register("password")}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-6 text-lg font-bold rounded-xl text-white shadow-md transition-all ${btnColor[activeTab]}`}
          >
            {isSubmitting
              ? "Authenticating…"
              : `Log In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
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
            className="w-full py-6 text-lg font-bold rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
        </form>

        {activeTab === "student" && (
          <div className="mt-8 text-center text-sm font-medium border-t border-slate-100 pt-6">
            <span className="text-slate-500">New to MentorMe? </span>
            <Link href="/register" className="text-brand-orange font-bold hover:underline">Create an account</Link>
          </div>
        )}
      </div>
    </div>
  );
}
