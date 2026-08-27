"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function AssessmentPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    async function checkAuthAndRedirect() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const next = searchParams.get('next') || '/career-assessment.html';
      const email = searchParams.get('email') || '';
      const name = searchParams.get('name') || '';
      const cls = searchParams.get('class') || '';
      const school = searchParams.get('school') || '';

      if (!user) {
        const params = new URLSearchParams();
        params.set('next', next);
        if (email) params.set('email', email);
        if (name) params.set('name', name);
        if (cls) params.set('class', cls);
        if (school) params.set('school', school);
        window.location.href = `/payment?${params.toString()}`;
        return;
      }

      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      const isGoogleUser = user.user_metadata?.provider === 'google' || user.user_metadata?.iss === 'https://accounts.google.com';

      if (isGoogleUser) {
        const params = new URLSearchParams();
        params.set('next', next);
        params.set('email', user.email || '');
        params.set('name', userProfile?.name || user.user_metadata?.full_name || '');
        params.set('class', userProfile?.education_level || '');
        params.set('school', userProfile?.institution_name || '');
        window.location.href = `/payment?${params.toString()}`;
        return;
      }

      window.location.href = `${next}?email=${encodeURIComponent(user.email || '')}&name=${encodeURIComponent(userProfile?.name || user.user_metadata?.full_name || '')}&class=${encodeURIComponent(userProfile?.education_level || '')}&school=${encodeURIComponent(userProfile?.institution_name || '')}`;
    }

    checkAuthAndRedirect();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <p className="text-sm font-semibold text-slate-600">Loading MentorMe Career Intelligence Assessment...</p>
    </div>
  );
}
