import Link from "next/link";
import { CheckCircle2, TrendingUp, DollarSign, Building2, GraduationCap, Award, Briefcase, Brain, UserCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Investment Banker Career in India | MentorMe Career Library",
  description: "Investment Banking is one of the most competitive and high-impact careers in finance. Learn about 10th/12th stream choices, degrees, entrance exams, top colleges, skills, salary, and future scope.",
};

export default function CommerceFinanceAccountingCareerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
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

      {/* Main Content Body */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* What Does an Investment Banker Do? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              What Does an Investment Banker Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              An Investment Banker advises companies and institutions on major financial transactions.
            </p>
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
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Investment banking therefore combines financial analysis, valuation, strategy, communication and negotiation. India&apos;s securities-market framework and regulatory oversight are established under SEBI (Securities and Exchange Board of India).
            </p>
          </div>

          {/* What Subjects Should I Take After 10th? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              To prepare for a career in Investment Banking, both Commerce and Science streams are suitable, provided you build strong quantitative and analytical skills.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-brand-blue text-base">Option 1: Commerce with Mathematics (Recommended)</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Accountancy</li>
                  <li>• Business Studies</li>
                  <li>• Economics</li>
                  <li>• Mathematics</li>
                  <li>• English</li>
                </ul>
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                  Mathematics is strongly recommended because investment banking relies heavily on financial modelling, valuation, statistics and quantitative analysis.
                </p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-emerald-600 text-base">Option 2: Science with Mathematics (PCM)</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Physics</li>
                  <li>• Chemistry</li>
                  <li>• Mathematics</li>
                  <li>• English</li>
                  <li>• Economics / Computer Science</li>
                </ul>
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                  Many successful investment bankers come from engineering or science backgrounds because of their strong mathematical and analytical foundation.
                </p>
              </div>
            </div>
          </div>

          {/* Which Degree Should I Choose for Investment Banking? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose for Investment Banking?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              There is no single mandatory undergraduate degree for investment banking.
            </p>
            <p className="font-bold text-slate-800 text-base">Popular Undergraduate Options:</p>
            <ul className="space-y-1 text-slate-700 text-base pl-2">
              <li className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> B.Com / B.Com (Hons)</li>
              <li className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> BBA / BBS / BMS (Finance)</li>
              <li className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> B.A. Economics / B.Sc. Economics</li>
              <li className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> B.Tech / B.E. (followed by MBA or Finance Master&apos;s)</li>
              <li className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> B.Sc. Mathematics / Statistics</li>
            </ul>
            <p className="font-bold text-slate-800 text-base pt-2">Important Professional Qualifications &amp; Master&apos;s Degrees:</p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">MBA in Finance</strong> from top business schools (IIMs, XLRI, FMS, ISB)</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">CFA (Chartered Financial Analyst)</strong> – globally recognized finance credential</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">CA (Chartered Accountant)</strong> – strong accounting and valuation foundation</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              While an undergraduate degree from a top college can help you secure entry-level analyst roles, an MBA from a tier-1 institute or a CFA charter significantly increases recruitment opportunities at top investment banks.
            </p>
          </div>

          {/* Which Entrance Exams Should I Take? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Depending on your stage of education:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-brand-blue text-base">Undergraduate Admissions</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• <strong className="text-slate-900">CUET-UG</strong> – for admissions to Delhi University (SRCC, Hindu, Hansraj) and other central universities</li>
                  <li>• <strong className="text-slate-900">IPMAT</strong> – for 5-year Integrated MBA programmes at IIM Indore, IIM Rohtak, etc.</li>
                  <li>• <strong className="text-slate-900">JEE Main / Advanced</strong> – for engineering degrees</li>
                </ul>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-emerald-600 text-base">Postgraduate / MBA Admissions</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• <strong className="text-slate-900">CAT</strong> – Common Admission Test for IIMs and top Indian B-schools</li>
                  <li>• <strong className="text-slate-900">XAT</strong> – Xavier Aptitude Test for XLRI and partner institutes</li>
                  <li>• <strong className="text-slate-900">GMAT</strong> – for ISB and global MBA programmes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Colleges for Investment Banking Pathways in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Best Colleges for Investment Banking Pathways in India</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Securing admission to top-tier institutions is crucial, as investment banks heavily recruit from premier campuses.
            </p>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Top Undergraduate Colleges:</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
                <div>• Shri Ram College of Commerce (SRCC), Delhi</div>
                <div>• St. Stephen&apos;s College, Delhi</div>
                <div>• Shaheed Sukhdev College of Business Studies (SSCBS), Delhi</div>
                <div>• Loyola College, Chennai</div>
                <div>• St. Xavier&apos;s College, Mumbai / Kolkata</div>
                <div>• Top IITs (for engineering graduates transitioning into finance)</div>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">Top MBA / Management Institutes:</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
                <div>• IIM Ahmedabad, IIM Bangalore, IIM Calcutta (IIM ABC)</div>
                <div>• IIM Lucknow, IIM Kozhikode, IIM Indore</div>
                <div>• Indian School of Business (ISB), Hyderabad / Mohali</div>
                <div>• Faculty of Management Studies (FMS), Delhi University</div>
                <div>• XLRI Jamshedpur</div>
              </div>
            </div>
          </div>

          {/* Investment Banker Salary in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Investment Banker Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Investment Banking is among the highest-paying career fields in finance, with significant performance-based bonuses.
            </p>
            <p className="font-bold text-slate-800 text-base">Career Levels &amp; Compensation Ranges:</p>
            <div className="grid sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Analyst (Entry Level)</p>
                <p className="text-lg font-black text-brand-blue">₹8L – ₹18L</p>
                <p className="text-xs text-slate-500">B.Com/B.Tech/Fresh Graduate</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Associate</p>
                <p className="text-lg font-black text-emerald-600">₹20L – ₹40L+</p>
                <p className="text-xs text-slate-500">MBA from Top IIMs / CFA / CA</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Vice President (VP)</p>
                <p className="text-lg font-black text-purple-600">₹50L – ₹1Cr+</p>
                <p className="text-xs text-slate-500">6 to 10 Years Experience</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Managing Director (MD)</p>
                <p className="text-lg font-black text-amber-600">₹1.5Cr – ₹3Cr+</p>
                <p className="text-xs text-slate-500">Director / Partner</p>
              </div>
            </div>
            <p className="text-slate-600 text-xs text-center italic">
              Note: Compensation includes base salary plus variable year-end performance bonuses, which can often match or exceed the base pay.
            </p>
          </div>

          {/* Future Scope of Investment Banking in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              Future Scope of Investment Banking in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The future scope of Investment Banking in India is bright due to:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Rapid expansion of Indian corporate capital raising and IPO activity.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Growing cross-border mergers and acquisitions involving Indian companies.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Strong rise of tech startups, unicorn valuations, private equity, and venture capital deals.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Expansion of Global Capability Centres (GCCs) and offshore investment banking operations of global banks (such as Goldman Sachs, J.P. Morgan, Morgan Stanley, Citi) in Bengaluru, Mumbai, and Hyderabad.</li>
            </ul>
            <p className="font-bold text-slate-800 text-base pt-2">Key Career Exit Options:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div>• Private Equity (PE) &amp; Venture Capital (VC)</div>
              <div>• Corporate Development &amp; M&amp;A Strategy</div>
              <div>• Hedge Funds &amp; Asset Management</div>
              <div>• Chief Financial Officer (CFO) pathways</div>
              <div>• Financial Consulting</div>
            </div>
          </div>

          {/* Skills Required to Become an Investment Banker */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become an Investment Banker
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              To build a successful career in Investment Banking, you need a balance of quantitative precision and high-level client management:
            </p>
            <ul className="space-y-3 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Financial Modelling &amp; Valuation:</strong> Discounted Cash Flow (DCF), LBO models, comparable company analysis.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Accounting &amp; Financial Statement Analysis:</strong> Understanding balance sheets, P&amp;L, and cash flows.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Excel &amp; Presentation Skills:</strong> Crafting pitchbooks and complex financial models.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Analytical &amp; Quantitative Aptitude:</strong> Evaluating company performance and market trends.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Communication &amp; Negotiation:</strong> Pitching transaction ideas to corporate executives.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Work Ethic &amp; Resilience:</strong> Handling high-stakes deal deadlines and long working hours.</li>
            </ul>
          </div>

          {/* Is Investment Banking a Good Career for You? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Investment Banking a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Investment Banking can be an extraordinary career if you:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Are passionate about high-finance, financial markets, valuation and corporate strategy</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Excel at quantitative analysis, business problem-solving and numbers</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Thrives in fast-paced, high-reward environments</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Are willing to put in long hours during important transactions</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2 font-medium">
              It may not be ideal if you strongly dislike numbers, spreadsheets, financial analysis or high-pressure work environments.
            </p>
          </div>

          {/* Thinking About a Career in Investment Banking? */}
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Investment Banking?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Choosing Investment Banking should not be based only on its salary or reputation.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              Students should first understand their interests, strengths, personality and aptitude, and then evaluate whether Finance and Investment Banking are a good fit.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              MentorMe&apos;s Career Assessment and Career Guidance can help students explore their strengths and discover suitable career pathways before choosing their subjects, degree and specialisation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/assessment">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">
                  Take MentorMe Career Intelligence Assessment
                </Button>
              </Link>
            </div>
            <p className="text-sm font-bold tracking-wider uppercase pt-4 text-white/80">
              MentorMe – Turning Passions into Professions.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
