"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

import CareerDashboard from "@/app/dashboard/student/career-dashboard";
import { createClient } from "@/lib/supabase";

export default function AssessmentReportPage({
  searchParams,
}: {
  searchParams: { userId?: string };
}) {
  const userId = searchParams?.userId;
  const [loading, setLoading] = useState(true);
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (!userId) {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setAuthUserId(user.id);
          }
        } else {
          setAuthUserId(userId);
        }
      } catch (e) {
        console.error("Failed to fetch user", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  const targetUserId = userId || authUserId;
  console.log('AssessmentReportPage targetUserId:', targetUserId, 'from userId:', userId, 'authUserId:', authUserId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading career dashboard...</p>
        </div>
      </div>
    );
  }

  if (!targetUserId) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">User ID Required</h2>
          <p className="text-slate-600 mb-6">Please log in to view your career dashboard.</p>
          <Button onClick={() => window.location.href = "/login"} variant="outline">
            <ArrowLeft size={16} className="mr-2" /> Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="bg-white shadow-lg"
        >
          <Printer size={16} className="mr-2" /> Print Dashboard
        </Button>
      </div>
      <CareerDashboard userId={targetUserId} />
    </div>
  );
}
