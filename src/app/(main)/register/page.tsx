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
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["individual", "institutional"]),
  audienceType: z.enum(["ST", "UG", "GR", "WP"]).optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "individual", audienceType: "ST" },
  });

  const role = watch("role");

  const onSubmit = async (values: RegisterForm) => {
    setServerError("");
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (authError) throw authError;

      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert([
          { id: data.user.id, email: values.email, name: values.name, role: values.role },
        ]);
        if (profileError) throw profileError;

        if (values.role === "individual") {
          localStorage.setItem("mentorme_audience", values.audienceType || "ST");
        }
        setSuccess(true);
        router.push(values.role === "individual" ? "/dashboard/student" : "/dashboard/institution");
      }
    } catch (err: unknown) {
      setServerError((err as Error).message || "Failed to register. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { 
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback` 
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setServerError((err as Error).message || "Failed to sign up with Google.");
    }
  };

  const inputClass =
    "w-full p-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm";
  const errorClass = "text-xs text-red-500 font-medium mt-1";
  const inputError = "border-red-400";
  const inputOk = "border-slate-200";

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12 min-h-screen pt-24 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-black text-brand-blue uppercase tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium text-sm">Join MentorMe to unlock your career potential</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium text-center">
            {serverError}
          </div>
        )}
        {success && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg font-medium text-center">
            Registration successful! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`${inputClass} ${errors.name ? inputError : inputOk}`}
              {...register("name")}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`${inputClass} ${errors.email ? inputError : inputOk}`}
              {...register("email")}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700" htmlFor="role">I am a...</label>
            <select
              id="role"
              className={`${inputClass} ${errors.role ? inputError : inputOk}`}
              {...register("role")}
            >
              <option value="individual">Student / Professional</option>
              <option value="institutional">Institution / College</option>
            </select>
          </div>

          {/* Audience – only for individuals */}
          {role === "individual" && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700" htmlFor="audienceType">
                My current status is…
              </label>
              <select
                id="audienceType"
                className={`${inputClass} ${errors.audienceType ? inputError : inputOk}`}
                {...register("audienceType")}
              >
                <option value="ST">School Student (Grade 5–12)</option>
                <option value="UG">University / College Student</option>
                <option value="GR">Graduate / Post-Graduate</option>
                <option value="WP">Working Professional</option>
              </select>
            </div>
          )}

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Min. 8 chars, 1 uppercase, 1 number"
              className={`${inputClass} ${errors.password ? inputError : inputOk}`}
              {...register("password")}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-bold rounded-xl text-white shadow-md bg-brand-orange hover:bg-brand-orange/90 mt-2"
          >
            {isSubmitting ? "Creating…" : "Create Account"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or sign up with</span>
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

        <div className="mt-8 text-center text-sm font-medium border-t border-slate-100 pt-6">
          <span className="text-slate-500">Already have an account? </span>
          <Link href="/login" className="text-brand-blue font-bold hover:underline">Log in here</Link>
        </div>
      </div>
    </div>
  );
}
