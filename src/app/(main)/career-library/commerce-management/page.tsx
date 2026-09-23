import Link from "next/link";
import { CheckCircle2, TrendingUp, DollarSign, Building2, GraduationCap, Award, Briefcase, Brain, UserCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Commerce & Management | MentorMe Career Library",
  description: "Explore Commerce & Management careers in India including Finance, Accounting, Digital Marketing, HR, Consulting, and Entrepreneurship. Learn about degrees, colleges, skills, salary and future scope.",
  alternates: {
    canonical: 'https://www.mentormeright.com/career-library/commerce-management',
  },
};

export default function CommerceManagementCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Commerce &amp; Management
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Commerce &amp; Management
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Commerce and Management together form one of the most diverse and high-impact career domains in India. From Investment Banking, Chartered Accountancy and Financial Analysis to Digital Marketing, Human Resources, Consulting and Entrepreneurship — this domain offers multiple high-growth pathways for students who enjoy business, numbers, strategy and people.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            It is a career domain suited to students who enjoy Finance, Business, Marketing, Analysis, Communication and Leadership.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Briefcase className="text-brand-blue shrink-0" />
              45 COMMERCE &amp; MANAGEMENT CAREERS. WHICH ONES FIT YOU?
            </h2>
            <h3 className="text-xl font-bold text-slate-900">Discover Where You Fit<br/>in Commerce &amp; Management</h3>
            <p className="text-slate-700 leading-relaxed text-base">
              Discover the careers that best match your aptitude, interests and workstyle — and get a personalised roadmap to move forward with confidence.
            </p>
            <p className="font-bold text-slate-800 text-base">Aptitude + Career Interests + Workstyle &amp; Traits</p>
            <div className="pt-2">
              <Link href="/career-intelligence.html">
                <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-bold px-6 py-3 text-base rounded-xl shadow-lg transition-all">TAKE THE COMMERCE &amp; MANAGEMENT CAREER ASSESSMENT</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">For Commerce and Management careers, the most natural and widely recommended stream after Class 10 is:</p>
            <p className="font-bold text-slate-800 text-base">Commerce with Mathematics</p>
            <p className="text-slate-700 leading-relaxed text-base">Commerce provides the foundational knowledge in Accountancy, Business Studies, Economics and Mathematics that most Management and Finance careers require.</p>
            <p className="font-bold text-slate-800 text-base">Recommended subjects include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Accountancy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business Studies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Economics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computer Science / Informatics Practices</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">However, students from any stream — Science, Arts or Commerce — can pursue Management and Business careers. Many successful professionals come from diverse educational backgrounds. The key is developing the right skills, mindset and qualifications over time.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Commerce &amp; Management?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Mathematics is not strictly compulsory for every Commerce and Management career, but it is highly recommended for certain pathways.</p>
            <p className="text-slate-700 leading-relaxed text-base">Maths is especially important for careers such as:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Investment Banking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Chartered Accountancy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Actuarial Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Economics</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For careers in Marketing, HR, Digital Marketing, Entrepreneurship and General Management, Mathematics is less critical. However, basic numerical and analytical ability is still valuable in almost every business role.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">You do not need to be an advanced mathematician, but being comfortable with numbers, percentages, data interpretation and logical reasoning is an advantage in Commerce and Management.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Commerce and Management offer multiple undergraduate and postgraduate pathways depending on your career target.</p>
            <p className="font-bold text-slate-800 text-base">Popular undergraduate degrees include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Com / B.Com (Hons.)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BBA / BBA Finance / BBA Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BA Economics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Economics / Statistics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BMS (Bachelor of Management Studies)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BBA (IB) / BBA (CA)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BA / B.Com in Marketing, HR or related fields</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other business or commerce-related degrees</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Popular Career Pathways</p>
            <div className="space-y-2 text-slate-700 text-base pl-2">
              <p><span className="text-brand-blue font-bold">Path 1:</span> Class 10 → Commerce + Maths → B.Com → CA / CS / CFA → Finance Professional</p>
              <p><span className="text-brand-blue font-bold">Path 2:</span> Class 10 → Commerce + Maths → BBA → MBA Finance → Investment Banking / Consulting</p>
              <p><span className="text-brand-blue font-bold">Path 3:</span> Class 10 → Commerce → BBA Marketing → Digital Marketing Certification → Marketing Professional</p>
              <p><span className="text-brand-blue font-bold">Path 4:</span> Class 10 → Any Stream → BBA → MBA HR → Human Resources Professional</p>
              <p><span className="text-brand-blue font-bold">Path 5:</span> Class 10 → Commerce/Science → B.Com / BBA → Startup / Entrepreneurship</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The entrance exam depends on the degree and college you choose.</p>
            <p className="font-bold text-slate-800 text-base">After Class 12</p>
            <p className="text-slate-700 leading-relaxed text-base">Depending on the institution, students may encounter:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CUET-UG</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institution-specific aptitude tests</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Merit-based admission</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">For MBA and Postgraduate Management Programmes</p>
            <p className="text-slate-700 leading-relaxed text-base">The most important Indian MBA entrance examinations include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CAT – Common Admission Test</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> XAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> GMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SNAP</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> MAT / CMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other institute-specific examinations</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For professional courses like CA, CS and CFA, there are separate dedicated examinations conducted by their respective institutes.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Commerce &amp; Management in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single list of the "best" Commerce and Management colleges. The right choice depends on your specific career target — whether it is Finance, Marketing, HR, Consulting or Entrepreneurship.</p>
            <p className="font-bold text-slate-800 text-base">Well-known institutions include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Ahmedabad</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Bangalore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Calcutta</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Lucknow</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Kozhikode</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Indore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> FMS Delhi</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> XLRI Jamshedpur</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SP Jain Institute, Mumbai</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> MDI Gurgaon</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Shri Ram College of Commerce (SRCC)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> St. Stephen&apos;s College</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Loyola College, Chennai</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NMIMS, Mumbai</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Christ University, Bangalore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Delhi University Commerce/Economics colleges</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For CA and CS aspirants, the Institute of Chartered Accountants of India (ICAI) and the Institute of Company Secretaries of India (ICSI) are the primary professional bodies. For MBA aspirants, leading IIMs and top business schools provide access to the best Management, Finance and Consulting roles.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Salary &amp; Career Progression in Commerce &amp; Management
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Commerce and Management careers offer diverse earning potential depending on the role, qualification, employer and experience.</p>
            <p className="font-bold text-slate-800 text-base">Typical career progressions include:</p>
            <div className="space-y-2 text-slate-700 text-base pl-2">
              <p><span className="text-brand-blue font-bold">Finance:</span> Analyst → Associate → VP → Director → Managing Director</p>
              <p><span className="text-brand-blue font-bold">Marketing:</span> Executive → Manager → Senior Manager → Marketing Head → CMO</p>
              <p><span className="text-brand-blue font-bold">HR:</span> HR Executive → HR Manager → HRBP → HR Head → CHRO</p>
              <p><span className="text-brand-blue font-bold">Consulting:</span> Analyst → Consultant → Manager → Partner / Director</p>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Management and Finance careers are generally considered high-paying, particularly at leading firms, multinational companies and top business schools. However, long-term success depends more on skills, performance, networking and specialisation than on advertised salary figures alone.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Key factors for long-term earning potential:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institution and qualification</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technical and business skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Deal or project experience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Employer reputation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Performance track record</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Networking ability</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Specialisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Industry experience</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              Future Scope of Commerce &amp; Management in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Commerce and Management careers in India is exceptionally strong. India is now the world&apos;s fifth-largest economy and one of the fastest-growing major economies, creating enormous demand across finance, marketing, consulting, HR and entrepreneurship.</p>
            <p className="text-slate-700 leading-relaxed text-base">Commerce and Management professionals will continue to play important roles in:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Capital markets and investment banking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital marketing and brand growth</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Startups and entrepreneurship</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Management consulting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Human resources and people strategy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> E-commerce and D2C brands</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial technology (FinTech)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Corporate strategy and governance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mergers, acquisitions and restructuring</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Supply chain and operations management</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Emerging trends such as AI in business, digital-first marketing, data-driven decision-making, ESG (Environmental, Social and Governance) and the growth of India&apos;s startup ecosystem are creating new and exciting opportunities for Commerce and Management professionals.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required for Commerce &amp; Management Careers
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Commerce and Management careers require a combination of technical business skills and strong interpersonal abilities.</p>
            <p className="font-bold text-slate-800 text-base">Technical / Hard Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Accounting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Excel &amp; Spreadsheet Modelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> PowerPoint &amp; Presentation Skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital Marketing Tools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SEO, SEM and Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CRM and Sales Tools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data Interpretation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Market Research</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Soft Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Presentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Negotiation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Leadership</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Teamwork</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Time management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Commercial awareness</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Adaptability</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Commerce and Management professionals also need strong business storytelling — the ability to translate data, analysis and strategy into clear, persuasive recommendations for stakeholders.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Commerce &amp; Management a Good Career Domain for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Commerce and Management could be an excellent career domain for you if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy Business and Finance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like working with numbers and data</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong analytical and logical skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy strategy and problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are interested in markets, brands or people</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong communication skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy leadership and teamwork</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are comfortable with targets and performance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Can work well under pressure</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are curious about how businesses operate</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">It may not be ideal if you strongly dislike numbers, spreadsheets, business environments, targets, deadlines or people-facing roles.</p>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Commerce &amp; Management?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing a Commerce or Management career should not be based only on salary or popularity.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">Students should first understand their interests, strengths, personality and aptitude, and then evaluate which Commerce and Management career best matches their profile.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">MentorMe&apos;s Career Assessment and Career Guidance can help students explore their strengths and discover suitable career pathways before choosing their subjects, degree and specialisation.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/assessment">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">Take MentorMe Career Intelligence Assessment</Button>
              </Link>
            </div>
            <p className="text-sm font-bold tracking-wider uppercase pt-4 text-white/80">MentorMe – Turning Passions into Professions.</p>
          </div>
        </div>
      </section>
    </>
  );
}
