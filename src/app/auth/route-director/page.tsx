"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Loader2, ShieldCheck, TrendingUp } from "lucide-react";

export default function RouteDirector() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function directTraffic() {
      console.log("🚦 Route Director: Initializing Handshake...");
      const routeSupabase = createClient();
      
      const { data: { user }, error: authError } = await routeSupabase.auth.getUser();

      if (authError || !user) {
        console.error("❌ Auth Failure. Redirecting to Login.");
        router.push("/login");
        return;
      }

      try {
        // 1. Fetch/Self-Heal Profile
        let { data: profile, error: profileError } = await routeSupabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (!profile || profileError) {
           console.warn("⚠️ Profile missing. Attempting self-healing...");
           const { data: newProfile, error: createError } = await routeSupabase
             .from('users')
             .upsert({
               id: user.id,
               email: user.email,
               name: user.user_metadata?.full_name || user.email?.split('@')[0],
               role: 'individual', // Default
               audience_type: 'ST'
             })
             .select()
             .single();
           
           if (createError) throw createError;
           profile = newProfile;
        }

        if (!profile) {
          router.push("/login");
          return;
        }

        console.log("👤 Profile Verified:", profile.role);

        // 2. Strict Role-Based Routing
        if (profile.role === 'individual') {
          // Check for completed assessment (Condition B)
          const { data: assessment } = await routeSupabase
            .from('assessment_results')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

          const destination = assessment ? "/dashboard/student" : "https://mentormeright-gt7dzpp8x-mentorme123s-projects.vercel.app/assessment";
          console.log(`🎯 Routing Student to: ${destination}`);
          router.push(destination);
        } 
        else if (profile.role === 'institutional') {
          console.log("🎯 Routing to Institutional Dashboard");
          router.push("/dashboard/institution");
        } 
        else if (profile.role === 'admin') {
          console.log("🎯 Routing to Admin Command Center");
          router.push("/dashboard/admin");
        } 
        else if (profile.role === 'counselor') {
          console.log("🎯 Routing to Counselor Portal");
          router.push("/dashboard/counselor");
        } 
        else {
          console.warn("❓ Unknown role. Defaulting to Home.");
          router.push("/");
        }

      } catch (error) {
        console.error("🔥 Critical Routing Failure:", error);
        router.push("/login?error=routing_failed");
      }
    }

    directTraffic();
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-blue/20 rounded-full animate-ping"></div>
          <div className="w-20 h-20 bg-brand-blue text-white rounded-3xl flex items-center justify-center relative z-10 shadow-2xl">
            <ShieldCheck size={40} />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Authenticating</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 justify-center">
            <Loader2 size={14} className="animate-spin" /> Secure Routing in Progress...
          </p>
        </div>
        <div className="mt-8 flex gap-2">
           <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
           <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
           <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
