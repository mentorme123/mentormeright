"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getQuestions, Question, AudienceType } from "@/lib/mock-questions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function loadAssessment() {
      // Load audience-specific questions
      const audience = (localStorage.getItem("mentorme_audience") || "ST") as AudienceType;
      const q = getQuestions(audience);
      setQuestions(q);
      
      const dbAnswers: Record<number, string> = {};

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login?next=/assessment");
          return;
        }

        // Verify role
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
        if (profile?.role !== 'individual' && profile?.role !== 'admin') {
          router.push("/");
          return;
        }

        if (user) {
          // Check for active assessment
          let { data: assessment } = await supabase
            .from('assessments')
            .select('id')
            .eq('user_id', user.id)
            .eq('status', 'in_progress')
            .maybeSingle();

          if (!assessment) {
            // Create new assessment
            const { data: newAssessment } = await supabase
              .from('assessments')
              .insert({ user_id: user.id })
              .select('id')
              .single();
            assessment = newAssessment;
          }

          if (assessment) {
            setAssessmentId(assessment.id);
            // Fetch saved answers
            const { data: answersData } = await supabase
              .from('answers')
              .select('question_id, selected_option')
              .eq('assessment_id', assessment.id);
              
            if (answersData) {
              answersData.forEach(ans => {
                dbAnswers[ans.question_id] = ans.selected_option;
              });
            }
          }
        }
      } catch (err) {
        console.error("Error loading assessment from DB:", err);
      }

      // Merge local storage with DB answers (DB takes precedence)
      let finalAnswers = { ...dbAnswers };
      const savedLocal = localStorage.getItem("mentorme_assessment_progress");
      if (savedLocal) {
        try {
          const parsed = JSON.parse(savedLocal);
          // Only use local if DB is empty, to prevent overwriting cross-device progress with stale local data
          if (Object.keys(dbAnswers).length === 0) {
            finalAnswers = { ...parsed };
          }
        } catch { /* invalid JSON in localStorage, ignore */ }
      }

      setAnswers(finalAnswers);
      
      // Find first unanswered question
      const firstUnanswered = q.findIndex(qn => !finalAnswers[qn.id]);
      if (firstUnanswered !== -1) {
        setCurrentIndex(firstUnanswered);
      } else {
        setCurrentIndex(q.length - 1); // all answered
      }
      
      setIsLoaded(true);
    }
    
    loadAssessment();
  }, [supabase, router]);

  const handleSelectOption = async (optionKey: string) => {
    const currentQ = questions[currentIndex];
    const newAnswers = { ...answers, [currentQ.id]: optionKey };
    setAnswers(newAnswers);
    
    // Save to local storage for quick offline/fallback recovery
    localStorage.setItem("mentorme_assessment_progress", JSON.stringify(newAnswers));

    // Persist to Supabase if logged in
    if (assessmentId) {
      // Fire and forget upsert
      supabase.from('answers').upsert({
        assessment_id: assessmentId,
        question_id: currentQ.id,
        selected_option: optionKey,
        section: currentQ.section
      }, { onConflict: 'assessment_id,question_id' }).then(({ error }) => {
        if (error) console.error("Error saving answer to DB:", error);
      });
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 400);
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const audience = localStorage.getItem("mentorme_audience") || "ST";
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, audience })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      // Save report to localStorage for the report page to pick up
      localStorage.setItem("mentorme_ai_report", JSON.stringify(data.report));
      // Clear stale progress
      localStorage.removeItem("mentorme_assessment_progress");

      // Persist to Supabase: mark assessment complete, save report record
      if (assessmentId) {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Mark assessment as completed
        await supabase
          .from('assessments')
          .update({ status: 'completed', submitted_at: new Date().toISOString() })
          .eq('id', assessmentId);

        // Save the AI report to DB
        if (user) {
          await supabase.from('reports').insert({
            user_id: user.id,
            assessment_id: assessmentId,
            report_content: data.report
          });
        }
      }

      router.push("/report");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("There was an error generating your report. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || questions.length === 0) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);
  const sectionQuestions = questions.filter(q => q.section === currentQ.section);
  const sectionIndex = sectionQuestions.findIndex(q => q.id === currentQ.id) + 1;

  const isLastQuestion = currentIndex === questions.length - 1;
  const isCurrentAnswered = answers[currentQ.id] !== undefined;

  return (
    <div className="flex-1 flex flex-col items-center p-4 py-8 sm:py-16">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Progress Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-muted-foreground uppercase tracking-wider text-xs">Section {currentQ.section}</span>
            <span className="text-brand-blue">Question {sectionIndex} of {sectionQuestions.length}</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-orange transition-all duration-300 ease-in-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-xs text-right text-muted-foreground">
            Overall Progress: {progressPercent}%
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-6 sm:p-12 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-2xl sm:text-4xl font-black leading-tight text-slate-800 relative z-10">
            {currentQ.text}
          </h2>

          <div className="grid grid-cols-1 gap-4 relative z-10">
            {Object.entries(currentQ.options).map(([key, value]) => {
              const isSelected = answers[currentQ.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectOption(key)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group active:scale-[0.99] ${
                    isSelected 
                      ? 'border-brand-blue bg-brand-blue/5 shadow-inner' 
                      : 'border-slate-100 bg-slate-50 hover:border-brand-blue/30 hover:bg-white hover:shadow-lg'
                  }`}
                >
                  <span className={`text-lg font-bold transition-colors ${isSelected ? 'text-brand-blue' : 'text-slate-600 group-hover:text-slate-900'}`}>
                    {value}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-brand-blue bg-brand-blue' : 'border-slate-300 group-hover:border-brand-blue/50'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 relative z-10">
            <Button 
              variant="ghost" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto font-bold text-slate-500"
            >
              ← Previous Question
            </Button>

            {!isLastQuestion ? (
              <Button 
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className="w-full sm:w-auto bg-brand-blue text-white font-bold px-12"
              >
                Next Question →
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!isCurrentAnswered || isSubmitting}
                className="w-full sm:w-auto bg-brand-orange text-white font-black px-12 shadow-lg shadow-brand-orange/20"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating AI Report...
                  </div>
                ) : 'Complete Assessment & Generate Report'}
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
