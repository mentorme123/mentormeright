"use client";

import { useEffect, useState } from "react";
import { Printer, Sparkles, AlertTriangle, Target, Briefcase, GraduationCap, Calendar, Landmark, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import Image from "next/image";

// Match the API route interface
interface ReportData {
  clientName: string;
  grade: string;
  executiveSummary: string;
  coreStrengths: Array<{ name: string; score: number; max: number; desc: string }>;
  areasToDevelop: Array<{ name: string; score: number; max: number; desc: string }>;
  careerInterests: Array<{ name: string; score: number; max: number; desc: string }>;
  excellentFitCareers: Array<{ title: string; salary: string; desc: string }>;
  goodFitCareers: Array<{ title: string; salary: string; desc: string }>;
  academicRoadmap: { recommendedStream: string; focusSubjects: string; programmingNote: string; extraCurricular: string };
  educationPathways: { ugOptions: Array<{ program: string; duration: string; leadsTo: string }>; pgOptions: Array<{ program: string; path: string }> };
  entranceExams: Array<{ exam: string; forTitle: string; timeline: string }>;
  recommendedColleges: Array<{ institution: string; location: string; program: string }>;
  nextSteps: string[];
}

const COLORS = ['#1A6DD1', '#F97316', '#8B5CF6', '#10B981', '#F43F5E'];

const A4Page = ({ children, pageNumber }: { children: React.ReactNode, pageNumber: number }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white mx-auto my-8 shadow-2xl relative overflow-hidden print:m-0 print:shadow-none print:break-after-page flex flex-col shrink-0">
    <div className="flex-1 p-12 flex flex-col">
      {children}
    </div>
    {/* Footer */}
    <div className="absolute bottom-0 left-0 w-full h-16 border-t flex items-center justify-between px-12 text-sm text-slate-500 font-medium bg-white z-50">
      <div className="flex items-center gap-2">
         <span>www.mentormeright.com</span>
         <span className="text-slate-300">|</span>
         <span>+91 8188824440</span>
      </div>
      <div>Page {pageNumber}</div>
    </div>
  </div>
);

const SectionHeader = ({ num, title }: { num: string, title: string }) => (
  <div className="border-b-2 border-brand-blue pb-2 mb-8">
    <h2 className="text-2xl font-black text-brand-blue uppercase tracking-wider">{num}. {title}</h2>
  </div>
);

import { createClient } from "@/lib/supabase";

export default function ReportPage() {
  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    async function fetchReport() {
      // First try to load from local storage for immediate feel
      const saved = localStorage.getItem("mentorme_ai_report");
      if (saved) {
        try {
          setReport(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse report", e);
        }
      }

      // Then attempt to fetch the official one from the DB
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
         const { data: assessment } = await supabase
           .from('assessment_results')
           .select('report')
           .eq('user_id', user.id)
           .order('completed_at', { ascending: false })
           .limit(1)
           .maybeSingle();

         if (assessment?.report) {
           setReport(assessment.report as ReportData);
           // Also sync back to local storage
           localStorage.setItem("mentorme_ai_report", JSON.stringify(assessment.report));
         }
      }
    }
    fetchReport();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!report || !report.coreStrengths) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center bg-background">
        <div className="relative w-48 h-16 mb-6 animate-pulse">
          <Image src="/logo.png" alt="MentorMe" fill className="object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Generating 12-Page Career Intelligence Report...</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Compiling psychometric data, mapping career trajectories, and formulating your academic roadmap.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F5F9] min-h-screen py-8 print:bg-white print:p-0">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          nav, footer { display: none !important; }
        }
      `}} />

      {/* Floating Web Print Controls */}
      <div className="fixed bottom-8 right-8 z-50 print:hidden flex flex-col gap-4">
        <Button onClick={handlePrint} size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-2xl rounded-full h-16 w-16 p-0 flex flex-col items-center justify-center animate-bounce">
          <Printer size={24} />
        </Button>
      </div>

      <div className="flex flex-col items-center">
        
        {/* PAGE 1: TITLE PAGE */}
        <A4Page pageNumber={1}>
          <div className="flex flex-col items-center justify-center h-full text-center space-y-16 mt-32">
             <div className="relative w-64 h-24 mb-12">
               <Image src="/logo.png" alt="MentorMe" fill className="object-contain" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-4">Official Document</h3>
                <h1 className="text-5xl font-black text-brand-blue uppercase tracking-tight leading-tight">Career Guidance <br/>Report</h1>
             </div>
             
             <div className="bg-slate-50 border-2 border-slate-200 p-8 rounded-2xl w-full max-w-md mt-16 text-left space-y-4 shadow-lg">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-slate-500 font-bold uppercase text-sm">Student Name</span>
                  <span className="text-xl font-black text-slate-800">{report.clientName || 'Student'}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500 font-bold uppercase text-sm">Current Grade</span>
                  <span className="text-xl font-black text-brand-orange">{report.grade || 'N/A'}</span>
                </div>
             </div>
          </div>
        </A4Page>

        {/* PAGE 2: CORE STRENGTHS */}
        <A4Page pageNumber={2}>
          <SectionHeader num="1" title="Your Career Profile" />
          <p className="text-slate-600 font-medium leading-relaxed mb-8 bg-brand-blue/5 p-6 rounded-xl border-l-4 border-brand-blue text-lg">
            {report.executiveSummary}
          </p>

          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles className="text-brand-orange" /> Core Strengths</h3>
          
          <div className="flex-1">
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={report.coreStrengths} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <XAxis type="number" domain={[0, 10]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }} width={140} />
                <Tooltip cursor={{ fill: '#F1F5F9' }} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                  {report.coreStrengths.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-8 space-y-4">
              {report.coreStrengths.map((strength, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 text-xl font-black text-brand-blue">{strength.score}/{strength.max}</div>
                  <div>
                    <h4 className="font-bold text-slate-800">{strength.name}</h4>
                    <p className="text-sm text-slate-600">{strength.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </A4Page>

        {/* PAGE 3: AREAS TO DEVELOP */}
        <A4Page pageNumber={3}>
          <SectionHeader num="2" title="Areas to Develop" />
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            Identifying gaps early allows for strategic intervention. The following areas require your focus over the next 12-24 months to ensure a balanced profile for top-tier careers.
          </p>

          <div className="space-y-6">
            {report.areasToDevelop.map((area, i) => (
              <div key={i} className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-6">
                 <div className="w-16 h-16 shrink-0 bg-white rounded-full flex flex-col items-center justify-center border-2 border-red-200 text-red-600 shadow-sm">
                   <AlertTriangle size={20} className="mb-1" />
                   <span className="text-xs font-black">{area.score}/{area.max}</span>
                 </div>
                 <div>
                   <h4 className="text-lg font-bold text-slate-800 mb-2">{area.name}</h4>
                   <p className="text-slate-600 leading-relaxed text-sm">{area.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </A4Page>

        {/* PAGE 4: CAREER INTERESTS */}
        <A4Page pageNumber={4}>
          <SectionHeader num="3" title="Career Interests & Motivations" />
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            Your assessment explored different types of career interests, helping identify roles where you will feel naturally engaged and motivated.
          </p>

          <div className="grid grid-cols-1 gap-6">
             {report.careerInterests.map((interest, i) => (
                <div key={i} className="bg-brand-blue text-white p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <Target className="mb-4 text-brand-orange" size={32} />
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-2xl font-bold">{interest.name}</h3>
                    <div className="text-3xl font-black text-brand-orange">{interest.score}<span className="text-lg text-white/50">/{interest.max}</span></div>
                  </div>
                  <p className="text-white/80 leading-relaxed">{interest.desc}</p>
                </div>
             ))}
          </div>
        </A4Page>

        {/* PAGE 5: EXCELLENT FIT CAREERS */}
        <A4Page pageNumber={5}>
          <SectionHeader num="4" title="Excellent Fit Careers (Top Tier)" />
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            Based on your Individuality Profile, Passion Exploration, and Skill Proficiency, these are your highest probability success trajectories.
          </p>

          <div className="space-y-6">
            {report.excellentFitCareers.map((career, i) => (
              <div key={i} className="border-2 border-slate-100 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-brand-blue flex items-center gap-2"><Briefcase size={20} className="text-brand-orange"/> {career.title}</h3>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {career.salary}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">{career.desc}</p>
              </div>
            ))}
          </div>
        </A4Page>

        {/* PAGE 6: GOOD FIT CAREERS */}
        <A4Page pageNumber={6}>
          <SectionHeader num="5" title="Good Fit Careers (Alternatives)" />
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            These roles align strongly with your secondary traits and act as powerful pivot options or parallel pathways.
          </p>

          <div className="space-y-6">
            {report.goodFitCareers.map((career, i) => (
              <div key={i} className="border border-slate-200 p-6 rounded-2xl bg-slate-50">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-800">{career.title}</h3>
                  <div className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {career.salary}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{career.desc}</p>
              </div>
            ))}
          </div>
        </A4Page>

        {/* PAGE 7: ACADEMIC ROADMAP */}
        <A4Page pageNumber={7}>
          <SectionHeader num="6" title="Your Academic Roadmap" />
          
          <div className="bg-brand-orange text-white p-8 rounded-3xl mb-8 shadow-lg">
             <h3 className="text-sm uppercase tracking-widest font-bold mb-2 text-white/80">Recommended Stream (Grade 11-12)</h3>
             <h2 className="text-3xl font-black leading-tight">{report.academicRoadmap.recommendedStream}</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-brand-blue text-lg mb-2 flex items-center gap-2"><GraduationCap /> Focus Subjects</h4>
              <p className="text-slate-700 leading-relaxed border-l-4 border-brand-orange pl-4 py-2 bg-slate-50">{report.academicRoadmap.focusSubjects}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-brand-blue text-lg mb-2 flex items-center gap-2"><Target /> Programming & Technical</h4>
              <p className="text-slate-700 leading-relaxed border-l-4 border-brand-orange pl-4 py-2 bg-slate-50">{report.academicRoadmap.programmingNote}</p>
            </div>

            <div>
              <h4 className="font-bold text-brand-blue text-lg mb-2 flex items-center gap-2"><Sparkles /> Extra-Curricular Prioritization</h4>
              <p className="text-slate-700 leading-relaxed border-l-4 border-brand-orange pl-4 py-2 bg-slate-50">{report.academicRoadmap.extraCurricular}</p>
            </div>
          </div>
        </A4Page>

        {/* PAGE 8: EDUCATION PATHWAYS */}
        <A4Page pageNumber={8}>
          <SectionHeader num="7" title="Education Pathways (UG to PG)" />
          
          <h3 className="text-xl font-bold mb-6 text-slate-800">Undergraduate (UG) Options</h3>
          <div className="space-y-4 mb-12">
            {report.educationPathways.ugOptions.map((opt, i) => (
              <div key={i} className="border border-slate-200 p-5 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white shadow-sm">
                <div className="flex-1">
                   <h4 className="font-bold text-brand-blue">{opt.program}</h4>
                   <p className="text-xs text-slate-500 mt-1 uppercase font-bold">{opt.duration}</p>
                </div>
                <div className="md:w-1/2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-1">Leads To:</span> {opt.leadsTo}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-6 text-slate-800">Postgraduate (PG) & Professional Qualifications</h3>
          <div className="space-y-4">
            {report.educationPathways.pgOptions.map((opt, i) => (
              <div key={i} className="border-l-4 border-brand-orange pl-4 py-3">
                 <h4 className="font-bold text-lg text-slate-800">{opt.program}</h4>
                 <p className="text-sm text-slate-600 mt-2 leading-relaxed">{opt.path}</p>
              </div>
            ))}
          </div>
        </A4Page>

        {/* PAGE 9: EXAMS & TIMELINE */}
        <A4Page pageNumber={9}>
          <SectionHeader num="8" title="Entrance Exams & Timeline" />
          
          <div className="relative border-l-2 border-brand-blue/20 ml-4 py-4 space-y-12">
             {report.entranceExams.map((exam, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute w-6 h-6 bg-brand-blue rounded-full -left-[13px] top-0 border-4 border-white flex items-center justify-center shadow-md">
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-brand-blue mb-1">{exam.exam}</h3>
                    <p className="font-semibold text-brand-orange mb-4 text-sm">{exam.forTitle}</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium flex gap-3 items-start">
                       <Calendar className="shrink-0 text-slate-400" size={18}/>
                       {exam.timeline}
                    </div>
                  </div>
                </div>
             ))}
          </div>
        </A4Page>

        {/* PAGE 10: COLLEGES */}
        <A4Page pageNumber={10}>
          <SectionHeader num="9" title="Recommended Institutions" />
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            Target institutions mapped specifically to your academic profile and career aspirations.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {report.recommendedColleges.map((college, i) => (
              <div key={i} className="flex bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-brand-blue/5 w-16 flex items-center justify-center shrink-0 border-r border-slate-100">
                  <Landmark className="text-brand-blue" size={24} />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{college.institution}</h3>
                  <div className="flex gap-4 text-sm text-slate-500 mb-3">
                    <span className="font-semibold">{college.location}</span>
                  </div>
                  <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-lg text-sm font-bold inline-block">
                    {college.program}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </A4Page>

        {/* PAGE 11: NEXT STEPS */}
        <A4Page pageNumber={11}>
          <SectionHeader num="10" title="Your Next Steps" />
          
          <div className="bg-slate-800 text-white p-10 rounded-3xl mb-12 shadow-xl">
             <h2 className="text-3xl font-bold mb-4">Execute This Strategy</h2>
             <p className="text-slate-300 leading-relaxed mb-8">
               Connect with MentorMe to take the next confident step in your academic and professional journey. During our 1-on-1 session, we will guide you on:
             </p>
             <div className="space-y-4">
                {report.nextSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <CheckCircle2 className="text-brand-orange shrink-0" size={20} />
                    <p className="font-medium">{step}</p>
                  </div>
                ))}
             </div>
             
             <Button className="mt-10 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-lg py-6 px-10 rounded-xl w-full">
               Book Counselling Session (₹4,999)
             </Button>
          </div>

          <SectionHeader num="11" title="Our Global University Networks" />
          <p className="text-slate-600 text-sm mb-6">MentorMe provides structured university admission support across India and internationally.</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="border p-4 rounded-xl text-center bg-slate-50">
               <div className="text-3xl font-black text-brand-blue">1500+</div>
               <div className="text-xs font-bold uppercase text-slate-500 mt-1">Universities Worldwide</div>
             </div>
             <div className="border p-4 rounded-xl text-center bg-slate-50">
               <div className="text-3xl font-black text-brand-blue">100+</div>
               <div className="text-xs font-bold uppercase text-slate-500 mt-1">Universities in India</div>
             </div>
          </div>
        </A4Page>

        {/* PAGE 12: DISCLAIMER */}
        <A4Page pageNumber={12}>
          <SectionHeader num="12" title="Disclaimer & Closing" />
          
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-slate-600 text-sm leading-relaxed space-y-4 text-justify mb-12">
            <p>
              This Career Assessment Report has been prepared by MentorMe Career Intelligence & Training Pvt. Ltd. based on psychometric assessment results provided at the time of evaluation. 
            </p>
            <p>
              The report is intended for educational and career planning purposes only. Career outcomes depend on a range of personal, academic, and environmental factors that cannot be fully captured by any single assessment. 
            </p>
            <p>
              MentorMe does not guarantee specific career or academic outcomes. This report should be used as one of several inputs in a student&apos;s overall career planning process. Students and parents are encouraged to consult with qualified career counsellors, educators, and professionals before making final decisions.
            </p>
          </div>

          <div className="text-center space-y-4">
            <h3 className="font-bold text-xl text-slate-800">Thank you for trusting MentorMe.</h3>
            <p className="text-slate-500">We are committed to guiding every student towards a fulfilling and purposeful career.</p>
            
            <div className="inline-block mt-8 text-left bg-brand-blue/5 p-6 rounded-xl border border-brand-blue/10">
               <div className="space-y-2 text-sm">
                 <div className="flex gap-4"><span className="w-20 font-bold text-slate-800">Email:</span> <span className="text-brand-blue font-medium">admin@mentormeright.in</span></div>
                 <div className="flex gap-4"><span className="w-20 font-bold text-slate-800">Phone:</span> <span className="text-slate-600">+91 8188824440</span></div>
                 <div className="flex gap-4"><span className="w-20 font-bold text-slate-800">Website:</span> <span className="text-brand-blue font-medium">www.mentormeright.com</span></div>
               </div>
            </div>
          </div>
        </A4Page>

      </div>
    </div>
  );
}
