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
  }, [supabase]);

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
  const isCurrentAnswered = !!answers[currentQ.id];

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
        <div className="bg-card border shadow-sm rounded-2xl p-6 sm:p-10 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-foreground">
            {currentQ.text}
          </h2>

          <div className="space-y-4">
            {Object.entries(currentQ.options).map(([key, value]) => {
              const isSelected = answers[currentQ.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectOption(key)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                    isSelected 
                      ? 'border-brand-blue bg-brand-blue/5' 
                      : 'border-muted hover:border-brand-blue/50 hover:bg-muted/50'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full border flex items-center justify-center font-semibold text-sm ${
                    isSelected
                      ? 'border-brand-blue bg-brand-blue text-white'
                      : 'border-muted-foreground/30 text-muted-foreground group-hover:border-brand-blue/50'
                  }`}>
                    {key}
                  </div>
                  <span className={`text-lg ${isSelected ? 'font-medium text-brand-blue' : 'text-foreground'}`}>
                    {value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="w-24"
          >
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!isCurrentAnswered || isSubmitting}
              className="w-32 bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              {isSubmitting ? "Processing..." : "Submit"}
            </Button>
          ) : (
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentAnswered}
              className="w-24 bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              Next
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
