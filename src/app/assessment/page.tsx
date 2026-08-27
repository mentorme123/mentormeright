"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function AssessmentPage() {
  useEffect(() => {
    async function checkAuthAndRedirect() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/career-assessment.html";
        return;
      }

      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      const email = user.email || '';
      const name = userProfile?.name || user?.user_metadata?.full_name || '';
      const cls = userProfile?.education_level || '';
      const school = userProfile?.institution_name || '';

      window.location.href = `/career-assessment.html?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&class=${encodeURIComponent(cls)}&school=${encodeURIComponent(school)}`;
    }

    checkAuthAndRedirect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
      <p className="text-sm font-semibold text-slate-600">Loading MentorMe Career Intelligence Assessment...</p>
    </div>
  );
}
