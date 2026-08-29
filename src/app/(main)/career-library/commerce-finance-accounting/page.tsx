import Link from "next/link";
import { CheckCircle2, TrendingUp, DollarSign, Building2, GraduationCap, Award, Briefcase, Brain, UserCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Investment Banker Career in India | MentorMe Career Library",
  description: "Investment Banking is one of the most competitive and high-impact careers in finance. Learn about 10th/12th stream choices, degrees, entrance exams, top colleges, skills, salary, and future scope.",
};

export default function CommerceFinanceAccountingCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Commerce, Finance &amp; Accounting
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Investment Banker Career in India
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Investment Banking is one of the most competitive and high-impact careers in finance. Investment Bankers help companies raise capital, complete mergers and acquisitions, prepare for IPOs, evaluate businesses and make major financial decisions.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            It is a career suited to students who enjoy Finance, Mathematics, Economics, Business, Analysis and Problem-Solving.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              What Does an Investment Banker Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">An Investment Banker advises companies and institutions on major financial transactions.</p>
            <p className="font-bold text-slate-800 text-base">Typical responsibilities include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mergers &amp; Acquisitions (M&amp;A)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Initial Public Offerings (IPOs)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Raising equity capital</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Raising debt</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Company valuation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial modelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Due diligence</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Preparing financial presentations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Market and industry research</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Strategic financial advisory</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Investment banking therefore combines financial analysis, valuation, strategy, communication and negotiation. India&apos;s securities-market framework and regulatory oversight are established under SEBI (Securities and Exchange Board of India).</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single compulsory stream for becoming an Investment Banker.</p>
            <p className="text-slate-700 leading-relaxed text-base">For students interested in finance, the most natural choice is:</p>
            <p className="font-bold text-slate-800 text-base">Commerce with Mathematics</p>
            <p className="font-bold text-slate-800 text-base">Recommended subjects include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Accountancy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business Studies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Economics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">However, Science students can also become Investment Bankers. Engineering graduates are also recruited into investment banking and finance roles, particularly when they develop strong financial skills.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">If you are confident about a finance career, Commerce + Mathematics provides a particularly relevant foundation.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Investment Banking?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Mathematics is not compulsory for every Investment Banking degree or career pathway, but it is strongly recommended.</p>
            <p className="text-slate-700 leading-relaxed text-base">Investment Banking involves:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial calculations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Ratios</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Valuation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Statistics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial modelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Forecasting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Discounted Cash Flow (DCF) analysis</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">You do not need to be an advanced mathematician, but you should be comfortable with numbers, logical reasoning and quantitative analysis.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single mandatory degree for an Investment Banker.</p>
            <p className="font-bold text-slate-800 text-base">Good undergraduate options include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Com / B.Com (Hons.)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BBA / BBA Finance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BA Economics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Economics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Finance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Tech / B.E., followed by finance specialisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other quantitative or business-related degrees</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For students targeting the most competitive investment-banking roles, a strong undergraduate degree followed by a top MBA in Finance or related specialisation can be an excellent pathway.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For example, IIM Ahmedabad&apos;s flagship MBA accepts graduates from diverse disciplines, including commerce, science, engineering and professional streams, with admission based on CAT and subsequent selection stages.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Popular Career Pathways</p>
            <div className="space-y-2 text-slate-700 text-base pl-2">
              <p><span className="text-brand-blue font-bold">Path 1:</span> Class 10 → Commerce + Maths → B.Com → MBA Finance → Investment Banking</p>
              <p><span className="text-brand-blue font-bold">Path 2:</span> Class 10 → Commerce + Maths → BBA Finance → MBA → Investment Banking</p>
              <p><span className="text-brand-blue font-bold">Path 3:</span> Class 10 → Science + Maths → B.Tech → MBA Finance → Investment Banking</p>
              <p><span className="text-brand-blue font-bold">Path 4:</span> Class 10 → Commerce/Science → Economics/Finance degree → Investment Banking</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The entrance exam depends on the degree you choose.</p>
            <p className="font-bold text-slate-800 text-base">After Class 12</p>
            <p className="text-slate-700 leading-relaxed text-base">Depending on the institution, students may encounter:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CUET-UG</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institution-specific aptitude tests</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">For MBA</p>
            <p className="text-slate-700 leading-relaxed text-base">The most important Indian MBA entrance examination is:</p>
            <p className="font-bold text-slate-800 text-base">CAT – Common Admission Test</p>
            <p className="text-slate-700 leading-relaxed text-base">Other exams can include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> XAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> GMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SNAP</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other institute-specific examinations</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For example, IIM Ahmedabad&apos;s flagship MBA uses CAT for domestic applicants, followed by analytical writing and personal interviews for shortlisted candidates.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Investment Banking in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single list of “Investment Banking colleges.” Students should instead target institutions with strong Finance, Economics, Commerce, Management and placement ecosystems.</p>
            <p className="font-bold text-slate-800 text-base">Well-known institutions include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Ahmedabad</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Bangalore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Calcutta</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Lucknow</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Kozhikode</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIM Indore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIT Bombay</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIT Delhi</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIT Madras</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Shri Ram College of Commerce (SRCC)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> St. Stephen&apos;s College</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NMIMS</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Christ University</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Delhi University colleges offering Commerce/Economics</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For MBA aspirants, the leading IIMs and other top business schools can provide access to investment banking, corporate finance, consulting and related financial-services roles.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Do not select a college simply because it offers “Finance” in the course name. Look at curriculum, internships, finance clubs, industry exposure, alumni network and placement outcomes.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Investment Banker Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The Investment Banker salary in India can vary significantly depending on the employer, qualification, role, experience and location.</p>
            <p className="font-bold text-slate-800 text-base">Typical career progression is:</p>
            <p className="text-slate-700 leading-relaxed text-base">Analyst → Associate → Vice President → Director → Managing Director</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Investment banking is generally considered a high-paying finance career, particularly at leading investment banks and financial institutions.</p>
            <p className="text-slate-700 leading-relaxed text-base">However, compensation can include a combination of fixed salary and performance-linked bonuses, so students should not judge the profession only by advertised salary figures.</p>
            <p className="font-bold text-slate-800 text-base pt-2">The more important factors for long-term earning potential are:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institution</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Deal experience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Employer</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Performance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Networking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Specialisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Experience</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              Future Scope of Investment Banking in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Investment Banking in India is closely connected with the country&apos;s growing capital markets, corporate activity, IPO ecosystem, mergers and acquisitions and financing requirements.</p>
            <p className="text-slate-700 leading-relaxed text-base">Investment Bankers will continue to play an important role in:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IPOs</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mergers &amp; Acquisitions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Private Equity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Venture Capital</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Debt Markets</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Equity Markets</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Corporate Restructuring</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Advisory</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Capital Raising</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">The National Institute of Securities Markets (NISM) describes investment banking as covering areas such as M&amp;A, equity and debt financing, IPOs and financial structuring.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">India&apos;s growing financial ecosystem therefore creates opportunities for professionals with strong finance, valuation and analytical skills.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become an Investment Banker
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Investment Banking requires a combination of technical finance skills and strong interpersonal abilities.</p>
            <p className="font-bold text-slate-800 text-base">Technical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Accounting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Modelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Company Valuation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Excel</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> PowerPoint</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Corporate Finance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Investment Analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Financial Markets</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> M&amp;A</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> DCF Valuation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Comparable Company Analysis</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">NISM specifically highlights areas such as financial modelling, Excel, PowerPoint, financial markets and valuation-related capabilities for investment-banking careers.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Soft Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Presentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Negotiation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Analytical thinking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Time management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Teamwork</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Commercial awareness</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Ability to work under pressure</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Investment Bankers also need strong financial storytelling — the ability to turn complex financial information into a clear business recommendation.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Investment Banking a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Investment Banking could be a good career choice if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy Finance and Business</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like working with numbers</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong analytical skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy solving complex problems</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are interested in companies and financial markets</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong communication skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Can work under pressure</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are willing to put in long hours during important transactions</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">It may not be ideal if you strongly dislike numbers, spreadsheets, financial analysis or high-pressure work environments.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Investment Banking?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing Investment Banking should not be based only on its salary or reputation.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">Students should first understand their interests, strengths, personality and aptitude, and then evaluate whether Finance and Investment Banking are a good fit.</p>
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