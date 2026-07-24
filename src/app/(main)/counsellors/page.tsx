"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, PhoneCall, Mail, CheckCircle2, Loader2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CounsellorsLanding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBookSession = async () => {
    setLoading(true);
    setErrorMsg("");
    const supabase = createClient();
    
    // 1. Check Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?redirect=/counsellors");
      return;
    }

    // 2. Check if they have taken the Career Assessment
    const { data: assessment } = await supabase
      .from("assessment_results")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!assessment) {
      setErrorMsg("You must complete the Career Assessment before booking a session. Redirecting...");
      setTimeout(() => {
        router.push("/career-assessment.html");
      }, 3000);
      return;
    }

    // 3. If passed, send to Booking Slot page
    router.push("/counsellors/book");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-6xl px-4">
        
        {/* Hero Section */}
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-xl overflow-hidden relative mb-12">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue font-black text-xs uppercase tracking-widest rounded-full">
                <Video size={16} /> Live 1-on-1 Sessions
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Transform Your Career with <span className="text-brand-orange">Expert Guidance</span>
              </h1>
              
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Book a dedicated 60-minute session with our top-rated career experts. We&apos;ll analyze your assessment report and build a foolproof roadmap for your future.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="text-emerald-500" /> Deep Dive into your Psychometric Report
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="text-emerald-500" /> Personalized College & Course Shortlisting
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="text-emerald-500" /> Actionable 1-Year Career Roadmap
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner space-y-8">
              <div className="text-center space-y-2">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Session Investment</p>
                <div className="text-6xl font-black text-slate-900">₹4,999</div>
                <p className="text-sm text-slate-400">for a comprehensive 60-minute consultation</p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl font-bold text-sm text-center animate-pulse">
                  {errorMsg}
                </div>
              )}

              <Button 
                onClick={handleBookSession}
                disabled={loading}
                className="w-full h-16 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-xl rounded-2xl shadow-xl shadow-brand-blue/20 transition-all hover:scale-[1.02]"
              >
                {loading && !errorMsg ? (
                  <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Verifying...</>
                ) : (
                  <>Book Your Session Now <ArrowRight className="ml-2" size={24} /></>
                )}
              </Button>
              
              <p className="text-center text-xs text-slate-400 font-medium">
                Payments securely processed via Razorpay. Subject to terms & conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Contact Options */}
        <div className="text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Need immediate assistance?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              If you have quick questions or prefer to book your session manually, our support team is available via chat, email, or phone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://api.whatsapp.com/send?phone=918188824440" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all group block">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="text-emerald-500 w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-slate-800 mb-2">WhatsApp Us</h3>
              <p className="text-emerald-600 font-bold mb-1">+91 93927 07596</p>
              <p className="text-emerald-600 font-bold">+91 81888 24440</p>
            </a>

            <a href="tel:+919392707596" className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-blue hover:shadow-xl transition-all group block">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <PhoneCall className="text-brand-blue w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-slate-800 mb-2">Call Us directly</h3>
              <p className="text-brand-blue font-bold mb-1">+91 93927 07596</p>
              <p className="text-brand-blue font-bold">+91 81888 24440</p>
            </a>

            <a href="mailto:admin@mentormeright.in" className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-orange hover:shadow-xl transition-all group block">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="text-brand-orange w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-slate-800 mb-2">Send an Email</h3>
              <p className="text-brand-orange font-bold">admin@mentormeright.in</p>
              <p className="text-slate-400 text-sm mt-2">We typically reply within 24 hours</p>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
