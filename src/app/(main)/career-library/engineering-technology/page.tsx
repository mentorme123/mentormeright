import Link from "next/link";
import { 
  ArrowLeft, 
  BrainCircuit, 
  Briefcase, 
  GraduationCap, 
  IndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Code, 
  Compass, 
  Sparkles,
  BarChart3,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Data Scientist Career in India | Engineering & Technology Roadmap | MentorMe",
  description: "A complete guide to becoming a Data Scientist in India — subjects after 10th, degrees, entrance exams, top colleges, skills, salary, and future scope.",
};

export default function EngineeringTechnologyCareerPage() {
  const subjects = [
    { title: "Mathematics", desc: "Core foundation for statistics, calculus, and machine learning algorithms.", compulsory: true },
    { title: "Physics", desc: "Builds problem-solving aptitude and analytical modelling capabilities.", compulsory: false },
    { title: "Computer Science / IP", desc: "Early exposure to programming languages (Python/C++) and data logic.", compulsory: false },
    { title: "Statistics", desc: "Direct application in probability theory, hypothesis testing & data analysis.", compulsory: false },
    { title: "Chemistry", desc: "Required depending on engineering stream / college eligibility.", compulsory: false }
  ];

  const degrees = [
    "B.Tech / B.E. in Computer Science, AI, Data Science or related fields",
    "B.Sc. in Data Science / B.Sc. in Statistics / Mathematics / Computer Science",
    "BCA with Data Science / AI specialisation",
    "Other quantitative degrees followed by a Master's in Data Science, AI or Analytics"
  ];

  const colleges = [
    "IIT Madras", "IIT Hyderabad", "IIT Delhi", "IIT Bombay", "IIT Kharagpur", 
    "IIT Kanpur", "IIIT Hyderabad", "IIIT Delhi", "IISc Bengaluru", "ISI Kolkata", 
    "University of Hyderabad"
  ];

  const entranceExams = [
    { name: "JEE Main", scope: "National level entry for NITs, IIITs & top engineering colleges" },
    { name: "JEE Advanced", scope: "Direct entrance route to IIT undergraduate engineering degrees" },
    { name: "CUET-UG", scope: "Central and participating university undergraduate programs" },
    { name: "State Exams", scope: "State-level engineering entrance tests (EAMCET, MHT-CET, TNEA, etc.)" }
  ];

  const salaryLadder = [
    { role: "Data Analyst", salary: "₹4L - ₹8L LPA", exp: "0-2 Years" },
    { role: "Junior Data Scientist", salary: "₹8L - ₹14L LPA", exp: "1-3 Years" },
    { role: "Data Scientist", salary: "₹14L - ₹25L LPA", exp: "3-6 Years" },
    { role: "Senior Data Scientist", salary: "₹25L - ₹45L LPA", exp: "6-10 Years" },
    { role: "Lead / Principal Data Scientist", salary: "₹45L - ₹80L+ LPA", exp: "10+ Years" }
  ];

  const technicalSkills = ["Python", "SQL", "Statistics", "Probability", "Machine Learning", "Data Visualisation", "Databases", "Excel", "Power BI / Tableau", "Generative AI Tools"];
  const analyticalSkills = ["Problem-solving", "Logical thinking", "Critical thinking", "Pattern identification", "Data interpretation"];
  const professionalSkills = ["Communication", "Business understanding", "Presentation skills", "Curiosity", "Continuous learning"];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-slate-900 via-brand-blue to-indigo-950 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link 
            href="/career-library" 
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white text-sm font-semibold mb-6 transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={16} /> Back to Career Library
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3 py-1 bg-brand-orange text-white font-black rounded-full uppercase tracking-wider">
              Engineering &amp; Technology
            </span>
            <span className="px-3 py-1 bg-white/20 text-white font-medium rounded-full">
              High Growth Career Path
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Data Scientist Career in India
          </h1>
          <p className="text-lg md:text-2xl text-indigo-100 max-w-3xl leading-relaxed font-light">
            Data Science is one of the most promising technology careers in India, combining mathematics, statistics, programming and business problem-solving to turn data into useful insights and decisions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-indigo-200 uppercase font-bold block mb-1">Average Entry Salary</span>
              <div className="flex items-center gap-1 text-xl font-black text-white">
                <IndianRupee size={18} /> ₹6L - ₹15L LPA
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-indigo-200 uppercase font-bold block mb-1">Growth Rate (2026)</span>
              <div className="flex items-center gap-1 text-xl font-black text-emerald-400">
                <TrendingUp size={18} /> 25% YoY Growth
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-indigo-200 uppercase font-bold block mb-1">GCC Talent Base</span>
              <div className="flex items-center gap-1 text-xl font-black text-amber-300">
                <Building2 size={18} /> 2.5L+ AI/ML Roles
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-xs text-indigo-200 uppercase font-bold block mb-1">Core Stream</span>
              <div className="flex items-center gap-1 text-xl font-black text-white">
                <BrainCircuit size={18} /> PCM / Computer Science
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Section 1: What Does a Data Scientist Do? */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-2xl">
                <Briefcase size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">What Does a Data Scientist Do?</h2>
                <p className="text-slate-500 text-sm font-medium">Core Responsibilities &amp; Employer Ecosystem</p>
              </div>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed">
              A Data Scientist collects, analyses and interprets large amounts of data to identify patterns, solve complex business problems and predict future outcomes.
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Code size={20} className="text-brand-blue" /> Key Focus Areas
                </h3>
                <ul className="space-y-2 text-slate-600 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-blue" /> Data Analysis &amp; Visualisation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-blue" /> Machine Learning &amp; Artificial Intelligence</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-blue" /> Predictive Modelling &amp; Forecasting</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-blue" /> Statistical Analysis &amp; A/B Testing</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Building2 size={20} className="text-brand-orange" /> Typical Employers
                </h3>
                <ul className="space-y-2 text-slate-600 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Technology Companies &amp; Startups</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Banks, Fintech &amp; Financial Institutions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Global Capability Centres (GCCs) in India</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-orange" /> Healthcare, E-Commerce &amp; Consulting Firms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Post-10th Subject Choices & Maths Requirement */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">What Subjects After 10th?</h2>
                  <p className="text-slate-500 text-xs font-medium">School Stream Guidance</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                If you want to become a Data Scientist, <strong className="text-slate-900">Science with Mathematics (PCM)</strong> is generally the strongest choice after Class 10.
              </p>
              <div className="space-y-3">
                {subjects.map((sub, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{sub.title}</h4>
                      <p className="text-xs text-slate-500">{sub.desc}</p>
                    </div>
                    {sub.compulsory && (
                      <span className="text-[10px] bg-brand-blue/10 text-brand-blue font-bold px-2 py-0.5 rounded-md">Essential</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                  <BrainCircuit size={28} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Is Maths Compulsory?</h2>
                  <p className="text-slate-500 text-xs font-medium">Mathematics Impact on Data Science</p>
                </div>
              </div>
              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 text-amber-900 text-sm leading-relaxed space-y-3">
                <p>
                  <strong>Mathematics is strongly recommended.</strong> Data Science relies heavily on statistics, probability, linear algebra, calculus, and mathematical optimisation.
                </p>
                <p>
                  For example, the flagship <strong>IIT Madras BS in Data Science</strong> curriculum builds foundational Mathematics and Statistics, advancing into calculus and linear algebra.
                </p>
                <p className="font-bold">
                  💡 Verdict: If choosing subjects after Class 10, keeping Mathematics is the safest and strongest option.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-800">Flexibility Note:</strong> Some programs accept non-maths students via foundation qualification routes (e.g., IIT Madras BS qualifier exam).
              </div>
            </div>
          </div>

          {/* Section 3: Degree Pathways & IIT Madras BS */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                <GraduationCap size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Which Degree Should I Choose?</h2>
                <p className="text-slate-500 text-sm font-medium">Undergraduate Degree Options in India</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {degrees.map((deg, i) => (
                <div key={i} className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="font-semibold text-slate-800 text-sm leading-relaxed">{deg}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3">
              <h3 className="font-bold text-lg text-amber-400 flex items-center gap-2">
                <Sparkles size={20} /> IIT Madras BS Degree in Data Science &amp; Applications
              </h3>
              <p className="text-sm text-indigo-100 leading-relaxed">
                A pioneer program offering structured learning covering Python, Machine Learning, Deep Learning, Computer Vision, Big Data, and Large Language Models (LLMs). Look beyond course titles and prioritize real-world projects and strong mathematical grounding!
              </p>
            </div>
          </div>

          {/* Section 4: Entrance Exams & Best Colleges */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                  <Award size={28} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Which Entrance Exams?</h2>
                  <p className="text-slate-500 text-xs font-medium">Admission Eligibility Pathways</p>
                </div>
              </div>
              <div className="space-y-3">
                {entranceExams.map((exam, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-black text-brand-blue text-sm block">{exam.name}</span>
                    <span className="text-xs text-slate-600 font-medium">{exam.scope}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                  <Building2 size={28} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Best Colleges in India</h2>
                  <p className="text-slate-500 text-xs font-medium">Top Universities for Data Science &amp; AI</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {colleges.map((col, i) => (
                  <span key={i} className="px-3 py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200">
                    {col}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-3 rounded-xl">
                Note: Evaluate curriculum quality, math foundation, faculty, projects, and placements over course naming alone!
              </p>
            </div>
          </div>

          {/* Section 5: Data Scientist Salary & Role Progression */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <IndianRupee size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Data Scientist Salary &amp; Progression</h2>
                <p className="text-slate-500 text-sm font-medium">Career Growth Ladder in India</p>
              </div>
            </div>

            <div className="relative border-l-2 border-brand-blue/30 pl-6 ml-4 space-y-6">
              {salaryLadder.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-blue border-4 border-white shadow-sm" />
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{step.role}</h4>
                      <span className="text-xs text-slate-500 font-semibold">{step.exp} Experience</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm md:text-lg font-black text-brand-blue">{step.salary}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Required Skills */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-2xl">
                <Code size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Skills Required to Become a Data Scientist</h2>
                <p className="text-slate-500 text-sm font-medium">Technical, Analytical &amp; Professional Skillset</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h3 className="font-bold text-brand-blue text-base flex items-center gap-2">
                  <Code size={18} /> Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h3 className="font-bold text-emerald-600 text-base flex items-center gap-2">
                  <BarChart3 size={18} /> Analytical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analyticalSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h3 className="font-bold text-purple-600 text-base flex items-center gap-2">
                  <Compass size={18} /> Professional Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {professionalSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Final CTA Section */}
          <div className="bg-gradient-to-br from-brand-blue to-indigo-700 text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Data Science?</h2>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto leading-relaxed">
              MentorMe&apos;s Career Guidance &amp; Career Assessment helps students understand their interests, skills and personality to explore suitable career pathways before making important education decisions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href="/career-assessment.html">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg">
                  Take Career Assessment
                </Button>
              </a>
              <Link href="/counsellors">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg rounded-2xl">
                  Talk to a Counselor
                </Button>
              </Link>
            </div>
            <p className="text-xs text-indigo-200 font-semibold tracking-wider uppercase pt-4">
              MentorMe – Turning Passions into Professions.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
