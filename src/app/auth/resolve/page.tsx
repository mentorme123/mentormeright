"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthResolver() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function resolveRoute() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        // 1. Fetch Role
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!profile) {
          router.push("/assessment"); // Fallback for new users without profiles
          return;
        }

        // 2. Traffic Controller Logic
        if (profile.role === 'individual') {
          const { data: assessment } = await supabase
            .from('assessment_results')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

          router.push(assessment ? "/dashboard/student" : "/assessment");
        } else if (profile.role === 'institutional') {
          router.push("/dashboard/institution");
        } else if (profile.role === 'admin') {
          router.push("/dashboard/admin");
        } else if (profile.role === 'counselor') {
          router.push("/dashboard/counselor");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Routing Error:", error);
        router.push("/");
      }
    }

    resolveRoute();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Resolving Command Center...</p>
      </div>
    </div>
  );
}
