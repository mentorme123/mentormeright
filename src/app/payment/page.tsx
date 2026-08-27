"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, IndianRupee } from "lucide-react";
import { B2CPaymentModal } from "@/components/b2c-payment-modal";
import { RazorpayScript } from "@/components/razorpay-script";

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

      if (!user) {
        window.location.href = `/login?redirect=/assessment`;
        return;
      }

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
    setTimeout(async () => {
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
      window.location.href = `${nextUrl}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&class=${encodeURIComponent(cls)}&school=${encodeURIComponent(school)}`;
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
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
        <Button
          onClick={() => setShowPaymentModal(true)}
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
      />
    </div>
  );
}
