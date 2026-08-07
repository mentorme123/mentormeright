"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Printer, Home, Crown, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import CareerDashboard from "@/app/dashboard/student/career-dashboard";
import { createClient } from "@/lib/supabase";
import { B2CPaymentModal } from "@/components/b2c-payment-modal";

export default function ReportPage({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams?.userId;
  const [loading, setLoading] = useState(true);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        if (!userId) {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setAuthUserId(user.id);
            const { data: profile } = await supabase
              .from('users')
              .select('has_paid_report')
              .eq('id', user.id)
              .single();
            setHasPaid(profile?.has_paid_report || false);
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

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setShowPaymentModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const targetUserId = userId || authUserId;
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

  if (!userId && !hasPaid) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-background">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-center space-y-6">
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
            <Crown className="w-10 h-10 text-brand-orange" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">Unlock Your Detailed Report</h2>
            <p className="text-sm text-slate-500">
              Get your comprehensive AI-generated career report with personalized recommendations, ideal career matches, and skill development plans.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Detailed Career Report</span>
                <div className="flex items-center gap-1 text-xl font-black text-slate-800">
                  <IndianRupee size={20} />
                  1999
                </div>
              </div>
            <ul className="text-left text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                Comprehensive career analysis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                Top 5 career matches
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                Personalized skill development plan
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                Higher education pathway guidance
              </li>
            </ul>
          </div>
          <Button
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl shadow-lg transition-all"
          >
            <Crown className="mr-2" size={18} />
            Unlock Report - ₹1999
          </Button>
          <p className="text-[10px] text-slate-400">
            Secure payment powered by Razorpay
          </p>
        </div>

        <B2CPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          itemType="career_report"
          itemName="Detailed Career Report"
          amount={1999}
          description="AI-generated comprehensive career report with personalized recommendations."
        />
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
      <div className="fixed bottom-3 left-1 md:bottom-4 md:left-3 z-[200] print:hidden flex flex-col items-start gap-1.5">
        <Button 
          onClick={handlePrint} 
          size="sm"
          className="bg-gradient-to-r from-brand-blue to-brand-orange hover:from-brand-blue/90 hover:to-brand-orange/90 text-white font-black shadow-xl rounded-lg py-2 px-2.5 flex gap-1 items-center justify-center border border-white/20 transition-all hover:scale-105"
        >
          <Printer size={12} />
          <span className="text-[10px] font-bold">PDF</span>
        </Button>

        <Link href="/">
          <Button 
            size="sm"
            variant="ghost"
            className="bg-white/90 backdrop:blur-sm text-brand-blue hover:bg-slate-50 font-bold shadow-lg rounded-lg py-1.5 px-2.5 flex gap-1 items-center justify-center border border-slate-200 transition-all hover:scale-105"
          >
            <Home size={12} />
            <span className="text-[10px] font-bold">Back</span>
          </Button>
        </Link>
      </div>

      <CareerDashboard userId={targetUserId} />
    </div>
  );
}
