"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, IndianRupee, BookOpen, ArrowLeft, Shield, Search, ZoomIn, ZoomOut } from "lucide-react";
import { B2CPaymentModal } from "@/components/b2c-payment-modal";
import { RazorpayScript } from "@/components/razorpay-script";
import { NoIndex } from "@/components/no-index";
import Link from "next/link";

const STEPS = [
  { id: "assessment", title: "Career Assessment", desc: "Take the assessment" },
  { id: "payment", title: "Complete Payment", desc: "Unlock your report" },
  { id: "report", title: "View Report", desc: "Download your career report" },
];

export default function PaymentPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { full_name?: string; provider?: string; iss?: string } } | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [nextUrl, setNextUrl] = useState("/career-assessment.html");
  const [emailParam, setEmailParam] = useState("");
  const [nameParam, setNameParam] = useState("");
  const [classParam, setClassParam] = useState("");
  const [schoolParam, setSchoolParam] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const url = new URL(window.location.href);
      setNextUrl(url.searchParams.get('next') || '/career-assessment.html');
      setEmailParam(url.searchParams.get('email') || '');
      setNameParam(url.searchParams.get('name') || '');
      setClassParam(url.searchParams.get('class') || '');
      setSchoolParam(url.searchParams.get('school') || '');

      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(userProfile);

        const isGoogleUser = user.user_metadata?.provider === 'google' || user.user_metadata?.iss === 'https://accounts.google.com';

        if (!isGoogleUser) {
          window.location.href = `/career-assessment.html?email=${encodeURIComponent(user.email || '')}&name=${encodeURIComponent(userProfile?.name || user.user_metadata?.full_name || '')}&class=${encodeURIComponent(userProfile?.education_level || '')}&school=${encodeURIComponent(userProfile?.institution_name || '')}`;
          return;
        }

        if (userProfile && userProfile.has_paid_report) {
          window.location.href = `/career-assessment.html?email=${encodeURIComponent(user.email || '')}&name=${encodeURIComponent(userProfile?.name || user.user_metadata?.full_name || '')}&class=${encodeURIComponent(userProfile?.education_level || '')}&school=${encodeURIComponent(userProfile?.institution_name || '')}`;
          return;
        }
      }

      setLoading(false);
    }
    load();
  }, [supabase]);

  const handlePaymentSuccess = async () => {
    setPaymentSuccess(true);
    setShowPaymentModal(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: `payment_${Date.now()}`,
        value: 1999,
        currency: 'INR',
        items: [{
          item_id: 'career_report',
          item_name: 'Career Assessment And Detailed Career Report',
          price: 1999,
          quantity: 1
        }]
      });
    }
    if (user) {
      await supabase
        .from('users')
        .update({ has_paid_report: true, payment_status: 'completed' })
        .eq('id', user.id);
    }
    const email = user?.email || emailParam;
    const name = profile?.name || user?.user_metadata?.full_name || nameParam;
    const cls = profile?.education_level || classParam;
    const school = profile?.institution_name || schoolParam;
    setTimeout(() => {
      window.location.href = `${nextUrl}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&class=${encodeURIComponent(cls)}&school=${encodeURIComponent(school)}`;
    }, 1500);
  };

  const handlePayClick = () => {
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <>
        <NoIndex />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
        </div>
      </>
    );
  }

  return (
    <>
      <NoIndex />
      <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-80px)] lg:overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-[#0a1628] px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <span className="text-white font-bold text-sm">Career Assessment Payment</span>
          </div>
          <Link href="/assessment">
            <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-3 h-7 text-xs flex items-center gap-1.5">
              <ArrowLeft size={12} /> Back
            </Button>
          </Link>
        </div>

        {/* Left Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-full sm:w-80 shrink-0 bg-slate-900 p-6 text-white overflow-y-auto transition-transform duration-300 lg:duration-0`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Career Assessment</h2>
              <p className="text-xs text-slate-400">Payment & Report</p>
            </div>
          </div>
          <div className="space-y-2">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all ${step.id === "payment"
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100"
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${step.id === "payment" ? "bg-white/20" : "bg-slate-100"
                  }`}>
                  <span className={`text-sm font-bold ${step.id === "payment" ? "text-white" : "text-slate-600"}`}>
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{step.title}</p>
                  <p className={`text-xs ${step.id === "payment" ? "text-blue-100" : "text-slate-500"} leading-tight`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Right Content */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          {/* Header */}
          <div className="h-14 bg-[#0a1628] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-md z-10">
            <div className="flex items-center gap-3">
              <Shield className="text-brand-blue" size={20} />
              <h1 className="text-white font-bold text-sm sm:text-base">
                Complete Your Payment
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/career-library/engineering-technology">
                <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-4 h-8 text-xs flex items-center gap-1.5">
                  <ArrowLeft size={14} /> Back to Library
                </Button>
              </Link>
            </div>
          </div>

          {/* Payment Content */}
          <div className="flex-1 relative w-full bg-[#e5e7eb] overflow-y-auto">
            <div className="p-6 sm:p-10 flex items-center justify-center min-h-full">
              <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-center space-y-6">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
                  <Crown className="w-10 h-10 text-brand-orange" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-800">Complete Your Payment</h2>
                  <p className="text-sm text-slate-500">
                    Please complete the payment to access the career assessment and unlock your personalized report.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-600">Career Assessment + Report</span>
                    <div className="flex items-center gap-1 text-xl font-black text-slate-800">
                      <IndianRupee size={20} />
                      1999
                    </div>
                  </div>
                  <ul className="text-left text-sm text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                      Comprehensive career assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                      AI-generated detailed report
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                      Career roadmap & skill plan
                    </li>
                  </ul>
                </div>
                <a
                  href="/view/Sample Career Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-white bg-brand-orange hover:bg-brand-orange/90 font-semibold px-4 py-3 rounded-xl transition-all"
                >
                  Review a Sample Report Before You Buy
                </a>
                <Button
                  onClick={handlePayClick}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl shadow-lg transition-all"
                >
                  <Crown className="mr-2" size={18} />
                  Pay ₹1999 to Continue
                </Button>
                <p className="text-[10px] text-slate-400">
                  Secure payment powered by Razorpay
                </p>
              </div>

              <RazorpayScript />
              <B2CPaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={handlePaymentSuccess}
                itemType="career_report"
                itemName="Career Assessment And Detailed Career Report"
                amount={1999}
                description="AI-generated comprehensive career report with personalized recommendations and skill development plans."
                email={user?.email || emailParam}
                name={profile?.name || user?.user_metadata?.full_name || nameParam}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
