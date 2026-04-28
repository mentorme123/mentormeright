"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMockQuestions, Question } from "@/lib/mock-questions";
import { Button } from "@/components/ui/button";

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load questions and previous answers
    const q = getMockQuestions();
    setQuestions(q);
    
    const saved = localStorage.getItem("mentorme_assessment_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        // Find first unanswered question
        const firstUnanswered = q.findIndex(qn => !parsed[qn.id]);
        if (firstUnanswered !== -1) {
          setCurrentIndex(firstUnanswered);
        } else {
          setCurrentIndex(q.length - 1); // all answered
        }
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSelectOption = (optionKey: string) => {
    const currentQ = questions[currentIndex];
    const newAnswers = { ...answers, [currentQ.id]: optionKey };
    setAnswers(newAnswers);
    
    // Save to local storage (mocking real-time save to Supabase)
    localStorage.setItem("mentorme_assessment_progress", JSON.stringify(newAnswers));

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
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      // Save report to localStorage for the report page to pick up
      localStorage.setItem("mentorme_ai_report", JSON.stringify(data.report));
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
