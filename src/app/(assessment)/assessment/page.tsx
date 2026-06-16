"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getQuestions, Question, AudienceType } from "@/lib/mock-questions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { Loader2, BrainCircuit, X, Phone, MapPin, User, GraduationCap, Briefcase, TrendingUp, Clock, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);

  // Onboarding form state
  const [formPhone, setFormPhone] = useState("");
  const [formGender, setFormGender] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formState, setFormState] = useState("");
  const [formEducation, setFormEducation] = useState("");

  const [globalTime, setGlobalTime] = useState(5400); // 90 minutes
  const [questionTime, setQuestionTime] = useState(60); // 60 seconds per question
  
  // Ref-Persistent Timers to prevent drift and overlaps
  const globalIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const questionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      // Guest access allowed for assessment
      const userProfile = session ? (await supabase.from('users').select('*').eq('id', session.user.id).single()).data : null;
      setProfile(userProfile);

      if (session && !userProfile?.phone) setShowOnboarding(true);

      // Check query params for audience type
      const params = new URLSearchParams(window.location.search);
      const urlAudience = params.get("audience");
      if (urlAudience && ["ST", "UG", "GR", "WP"].includes(urlAudience)) {
        localStorage.setItem("mentorme_audience", urlAudience);
        // Clear saved progress if user switches test types to prevent loading old answers
        const savedProgress = localStorage.getItem("mentorme_assessment_progress");
        if (savedProgress) {
          localStorage.removeItem("mentorme_assessment_progress");
        }
      }

      const audience = (localStorage.getItem("mentorme_audience") || userProfile?.audience_type || "ST") as AudienceType;
      const q = getQuestions(audience);
      setQuestions(q);
      
      const saved = localStorage.getItem("mentorme_assessment_progress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAnswers(parsed);
          const firstUnanswered = q.findIndex(qn => !parsed[qn.id]);
          if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
          else setCurrentIndex(q.length - 1);
        } catch (e) { console.error(e); }
      }
      setIsLoaded(true);
    };
    checkAuth();

    return () => {
      if (globalIntervalRef.current) clearInterval(globalIntervalRef.current);
      if (questionIntervalRef.current) clearInterval(questionIntervalRef.current);
    };
  }, [router]);

  // Global Session Timer Handler
  useEffect(() => {
    if (!isLoaded || isSubmitting || showOnboarding) {
      if (globalIntervalRef.current) clearInterval(globalIntervalRef.current);
      return;
    }

    globalIntervalRef.current = setInterval(() => {
      setGlobalTime(prev => {
        if (prev <= 1) {
          if (globalIntervalRef.current) clearInterval(globalIntervalRef.current);
          handleSubmit(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (globalIntervalRef.current) clearInterval(globalIntervalRef.current);
    };
  }, [isLoaded, isSubmitting, showOnboarding]);

  // Per-Question Timer Handler
  useEffect(() => {
    if (!isLoaded || isSubmitting || showOnboarding) {
      if (questionIntervalRef.current) clearInterval(questionIntervalRef.current);
      return;
    }

    setQuestionTime(60); // Reset clock for new question
    if (questionIntervalRef.current) clearInterval(questionIntervalRef.current);

    questionIntervalRef.current = setInterval(() => {
      setQuestionTime(prev => {
        if (prev <= 1) {
          handleNext(); // Auto-advance on question timeout
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (questionIntervalRef.current) clearInterval(questionIntervalRef.current);
    };
  }, [currentIndex, isLoaded, isSubmitting, showOnboarding]);

  const handleSelectOption = (optionKey: string) => {
    const currentQ = questions[currentIndex];
    const newAnswers = { ...answers, [currentQ.id]: optionKey };
    setAnswers(newAnswers);
    localStorage.setItem("mentorme_assessment_progress", JSON.stringify(newAnswers));
    
    // Smooth transition
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 300);
  };

  const handleSaveProfile = async () => {
    if (!formPhone || !formGender || !formCountry || !formState || !formEducation) {
      alert("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('users')
      .update({
        phone: formPhone,
        gender: formGender,
        country: formCountry,
        state: formState,
        education_level: formEducation,
        updated_at: new Date().toISOString()
      })
      .eq('id', profile.id);

    if (error) {
      alert("Failed to save details. Please try again.");
    } else {
      setShowOnboarding(false);
    }
    setSaving(false);
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      interval = setInterval(() => {
        setProcessingTime(prev => prev + 1);
      }, 1000);
    } else {
      setProcessingTime(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const audience = localStorage.getItem("mentorme_audience") || profile?.audience_type || "ST";
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          answers, 
          audience, 
          userName: profile?.name || user?.email?.split('@')[0] || "Guest", 
          userId: user?.id || null 
        })
      });
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to generate report');
        localStorage.setItem("mentorme_ai_report", JSON.stringify(data.report));
        router.push("/report");
      } else {
        const errorText = await response.text();
        console.error("Non-JSON error from server:", errorText);
        throw new Error("The AI server is experiencing high traffic or took too long to respond. Please try submitting again in a moment.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert(error instanceof Error ? error.message : "Error generating report.");
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || questions.length === 0) {
    return <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-brand-blue" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Authenticating...</p>
      </div>
    </div>;
  }

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);
  const sectionQuestions = questions.filter(q => q.section === currentQ.section);
  const sectionIndex = sectionQuestions.findIndex(q => q.id === currentQ.id) + 1;
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCurrentAnswered = !!answers[currentQ.id];

  return (
    <div className="flex-1 flex flex-col items-center p-4 py-8 sm:py-16 relative bg-slate-50 min-h-screen">
      
      {/* Onboarding Modal Overlay - BLOCKS THE TEST */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <User size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Wait! One Step Left</h2>
                  <p className="text-slate-500 font-medium text-sm mt-2">To generate an accurate 12-page AI Career Report, we need your contact details.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue outline-none font-bold text-sm bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                      <select 
                        value={formGender}
                        onChange={(e) => setFormGender(e.target.value)}
                        className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue outline-none font-bold text-sm bg-slate-50"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Country</label>
                      <input 
                        type="text" 
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        placeholder="India"
                        className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue outline-none font-bold text-sm bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                      <input 
                        type="text" 
                        value={formState}
                        onChange={(e) => setFormState(e.target.value)}
                        placeholder="Karnataka"
                        className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue outline-none font-bold text-sm bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Education Level</label>
                    <select 
                      value={formEducation}
                      onChange={(e) => setFormEducation(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-blue outline-none font-bold text-sm bg-slate-50"
                    >
                      <option value="">Select Level</option>
                      <option value="School Student">School Student (8th - 12th)</option>
                      <option value="College/Undergraduate">College Student</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>

                  <Button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-black py-6 rounded-2xl shadow-xl mt-4"
                  >
                    {saving ? "SAVING..." : "SAVE & START TEST"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-brand-blue text-white rounded-full flex items-center justify-center mb-6">
                <BrainCircuit size={40} className="animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">Analyzing Profile</h2>
              <p className="text-slate-500 mb-6 text-sm">Generating your 12-page Career Intelligence Report across 17 AI parameters.</p>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
                <motion.div className="h-full bg-brand-blue" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 45 }} />
              </div>
              <div className="text-sm font-bold text-brand-blue">Processing... {processingTime}s</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-3xl space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-bold">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 uppercase tracking-widest text-xs">Section {currentQ.section}</span>
              <span className="text-brand-blue bg-blue-50 px-3 py-1 rounded-lg">Question {currentIndex + 1} of {questions.length}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                <Clock size={16} />
                <span>Q: {questionTime}s</span>
              </div>
              <div className="flex items-center gap-2 text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-lg">
                <Timer size={16} />
                <span>Total: {Math.floor(globalTime / 60)}m {globalTime % 60}s</span>
              </div>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-orange" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white border-2 border-slate-100 shadow-xl rounded-[32px] p-8 sm:p-12 space-y-10">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-slate-800">
            {currentQ.text}
          </h2>

          <div className="space-y-4">
            {Object.entries(currentQ.options).map(([key, value]) => {
              const isSelected = answers[currentQ.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectOption(key)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                    isSelected ? 'border-brand-blue bg-blue-50/50' : 'border-slate-100 hover:border-brand-blue/30'
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl border-2 flex items-center justify-center font-black text-sm ${
                    isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-200 text-slate-400'
                  }`}>
                    {key}
                  </div>
                  <span className={`text-lg font-bold ${isSelected ? 'text-brand-blue' : 'text-slate-700'}`}>
                    {value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0} className="font-bold text-slate-400">Previous</Button>
          {isLastQuestion ? (
            <Button onClick={handleSubmit} disabled={!isCurrentAnswered || isSubmitting} className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-10 py-6 rounded-2xl shadow-xl">SUBMIT TEST</Button>
          ) : (
            <Button onClick={handleNext} disabled={!isCurrentAnswered} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-black px-10 py-6 rounded-2xl shadow-xl">NEXT</Button>
          )}
        </div>
      </div>
    </div>
  );
}
