import Link from "next/link";
import { CheckCircle2, TrendingUp, DollarSign, Building2, GraduationCap, Award, Briefcase, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Investment Banker Career in India | MentorMe Career Library",
  description: "A complete guide to becoming an Investment Banker in India — covering 10th/12th stream choices, undergraduate degrees, CAT/CUET exams, top IIMs, salary trends, and future scope.",
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
              <Building2 className="text-brand-blue" />
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
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Strategic financial advisory</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Investment banking combines financial analysis, valuation, strategy, communication and negotiation under SEBI regulatory framework in India.
            </p>
          </div>

          {/* What Subjects Should I Take After 10th? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Both Commerce and Science streams are suitable, provided you build strong quantitative and analytical skills.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-brand-blue text-base">Option 1: Commerce with Mathematics</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Accountancy</li>
                  <li>• Business Studies</li>
                  <li>• Economics</li>
                  <li>• Mathematics (Highly Recommended)</li>
                  <li>• English</li>
                </ul>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-emerald-600 text-base">Option 2: Science with Mathematics (PCM)</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Physics</li>
                  <li>• Chemistry</li>
                  <li>• Mathematics</li>
                  <li>• English</li>
                  <li>• Economics / Computer Science</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Which Degree Should I Choose for Investment Banking? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue" />
              Which Degree Should I Choose for Investment Banking?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              There is no single mandatory undergraduate degree for investment banking.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base">Popular Undergraduate Options:</h3>
                <p className="text-sm text-slate-700 font-medium">B.Com / B.Com (Hons), BBA / BBS / BMS (Finance), B.A./B.Sc. Economics, B.Tech / B.E., B.Sc. Mathematics or Statistics</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base">Top Professional Qualifications &amp; Master&apos;s:</h3>
                <p className="text-sm text-slate-700 font-medium"><strong className="text-brand-blue">MBA in Finance</strong> from top B-schools (IIM ABC, XLRI, FMS, ISB), <strong className="text-emerald-600">CFA</strong> (Chartered Financial Analyst), or <strong className="text-purple-600">CA</strong> (Chartered Accountant).</p>
              </div>
            </div>
          </div>

          {/* Entrance Exams & Colleges */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Entrance Exams &amp; Premier Institutes</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-brand-blue text-base">Entrance Exams</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• <strong className="text-slate-900">CUET-UG:</strong> Admission to DU (SRCC, St. Stephen&apos;s, Hindu)</li>
                  <li>• <strong className="text-slate-900">IPMAT:</strong> 5-year Integrated MBA at IIM Indore, Rohtak</li>
                  <li>• <strong className="text-slate-900">CAT / XAT / GMAT:</strong> For IIMs, XLRI, ISB</li>
                </ul>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-emerald-600 text-base">Top Colleges &amp; B-Schools</h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• SRCC, St. Stephen&apos;s, SSCBS (Delhi)</li>
                  <li>• St. Xavier&apos;s (Mumbai / Kolkata), Loyola (Chennai)</li>
                  <li>• IIM Ahmedabad, Bangalore, Calcutta (IIM ABC)</li>
                  <li>• ISB Hyderabad, XLRI Jamshedpur, FMS Delhi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Salary & Career Levels */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue" />
              Investment Banker Salary in India
            </h2>
            <div className="grid sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Analyst (Entry Level)</p>
                <p className="text-lg font-black text-brand-blue">₹8L – ₹18L</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Associate (MBA/CFA)</p>
                <p className="text-lg font-black text-emerald-600">₹20L – ₹40L+</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Vice President (VP)</p>
                <p className="text-lg font-black text-purple-600">₹50L – ₹1Cr+</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Managing Director</p>
                <p className="text-lg font-black text-amber-600">₹1.5Cr – ₹3Cr+</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
            </div>
            <p className="text-slate-600 text-xs text-center italic">
              *Note: Compensation includes base salary plus variable year-end performance bonuses, which can often match or exceed the base pay.
            </p>
          </div>

          {/* Future Scope */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue" />
              Future Scope &amp; Exit Options
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The future scope of Investment Banking in India is bright due to rapid expansion of corporate capital raising, startup unicorn dealmaking, and growth of offshore investment banking operations in Mumbai, Bengaluru, and Hyderabad.
            </p>
            <p className="font-bold text-slate-800 text-base">Key Career Exit Options:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div>• Private Equity (PE) &amp; Venture Capital (VC)</div>
              <div>• Corporate Development &amp; M&amp;A Strategy</div>
              <div>• Hedge Funds &amp; Asset Management</div>
              <div>• Chief Financial Officer (CFO) pathways</div>
            </div>
          </div>

          {/* Skills Required */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue" />
              Skills Required to Become an Investment Banker
            </h2>
            <ul className="space-y-3 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Financial Modelling &amp; Valuation:</strong> DCF, LBO models, comparable company analysis.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Financial Statement Analysis:</strong> Deep understanding of balance sheets, P&amp;L, and cash flows.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Excel &amp; Presentation Skills:</strong> Crafting pitchbooks and complex financial models.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Analytical &amp; Quantitative Aptitude:</strong> Evaluating company performance and market trends.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Communication &amp; Negotiation:</strong> Pitching transaction ideas to corporate executives.</li>
            </ul>
          </div>

          {/* CTA Banner */}
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Investment Banking?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              MentorMe&apos;s Career Guidance &amp; Psychometric Assessment help students understand their quantitative aptitude, interests and personality before choosing high-stakes finance careers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href="/career-assessment.html">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">
                  Take MentorMe Career Intelligence Report
                </Button>
              </a>
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
