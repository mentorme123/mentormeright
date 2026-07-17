"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Printer, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import CareerDashboard from "@/app/dashboard/student/career-dashboard";
import { createClient } from "@/lib/supabase";

export default function ReportPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams?.userId;
  const [loading, setLoading] = useState(true);
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
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
    fetchReport();
  }, [userId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center bg-background">
        <div className="relative w-48 h-16 mb-6 animate-pulse">
          <Image src="/logo.png" alt="MentorMe" fill className="object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Loading Career Dashboard...</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Preparing your personalised career intelligence dashboard.
        </p>
      </div>
    );
  }

  const targetUserId = userId || authUserId;
  if (!targetUserId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center bg-background">
        <div className="relative w-48 h-16 mb-6">
          <Image src="/logo.png" alt="MentorMe" fill className="object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">User ID Required</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Please log in to view your career dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen print:bg-white print:p-0">
      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          nav, footer, .print-hidden, #ai-chatbot-root, [data-print-ignore="true"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }
      `}</style>

      {/* Floating Web Print Controls */}
      <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[200] print:hidden flex flex-col items-start gap-3 max-w-sm">
        <Button 
          onClick={handlePrint} 
          size="lg" 
          className="bg-gradient-to-r from-brand-blue to-brand-orange hover:from-brand-blue/90 hover:to-brand-orange/90 text-white font-black shadow-2xl rounded-2xl py-6 px-6 sm:px-8 flex gap-3 items-center justify-center border border-white/20 transition-all hover:scale-105 hover:shadow-brand-orange/20"
        >
          <Printer size={20} />
          <span>Download & Print PDF</span>
        </Button>

        <Link href="/">
          <Button 
            size="lg" 
            className="bg-white text-brand-blue hover:bg-slate-50 font-black shadow-2xl rounded-2xl py-6 px-6 sm:px-8 flex gap-3 items-center justify-center border border-slate-200 transition-all hover:scale-105 hover:shadow-brand-blue/20"
          >
            <Home size={20} />
            <span>Go to Home Page</span>
          </Button>
        </Link>
      </div>

      <CareerDashboard userId={targetUserId} />
    </div>
  );
}
