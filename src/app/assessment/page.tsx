"use client";

import { useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

function AssessmentRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const next = searchParams.get('next') || '/career-assessment.html';
    const email = searchParams.get('email') || '';
    const name = searchParams.get('name') || '';
    const cls = searchParams.get('class') || '';
    const school = searchParams.get('school') || '';

    const params = new URLSearchParams();
    params.set('next', next);
    if (email) params.set('email', email);
    if (name) params.set('name', name);
    if (cls) params.set('class', cls);
    if (school) params.set('school', school);

    window.location.href = `/payment?${params.toString()}`;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <p className="text-sm font-semibold text-slate-600">Redirecting to payment...</p>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <p className="text-sm font-semibold text-slate-600">Loading MentorMe Career Intelligence Assessment...</p>
      </div>
    }>
      <AssessmentRedirect />
    </Suspense>
  );
}
