import Link from "next/link";
import { CheckCircle2, TrendingUp, DollarSign, Building2, GraduationCap, Award, Briefcase, Brain, UserCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Management & Business | MentorMe Career Library",
  description: "Explore Management & Business careers in India including Digital Marketing, HR, Finance, and Entrepreneurship. Learn about degrees, colleges, skills, salary and future scope.",
};

export default function ManagementBusinessCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Management &amp; Business
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Management &amp; Business
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Digital Marketing is one of the most accessible and rapidly evolving career options in India. A Digital Marketing Specialist helps businesses attract customers, build their brands and generate leads or sales using online channels such as search engines, social media, websites, email and digital advertising.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            This career can be particularly suitable for students who enjoy creativity, communication, technology, business and understanding consumer behaviour.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Briefcase className="text-brand-blue shrink-0" />
              What Does a Digital Marketing Specialist Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">A Digital Marketing Specialist plans, executes and analyses online marketing campaigns to help a business achieve its goals.</p>
            <p className="font-bold text-slate-800 text-base">Depending on the organisation, the role may involve:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Search Engine Optimisation (SEO)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Search Engine Marketing (SEM)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Social Media Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Content Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Ads</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Meta Ads</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Email Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Website Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Influencer Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Marketing Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Lead Generation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> E-commerce Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Conversion Rate Optimisation</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">The National Qualification Register identifies digital marketing roles involving activities such as developing digital marketing strategies, attracting and engaging customers, measuring marketing analytics and managing digital campaigns.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no compulsory stream for a career in Digital Marketing.</p>
            <p className="font-bold text-slate-800 text-base">Students can choose:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Commerce</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Arts / Humanities</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">However, Commerce can be particularly useful because it introduces students to Business Studies, Economics, Marketing and basic business concepts. Students interested in content, media and communication may also find Arts/Humanities a good fit. Science students can also enter Digital Marketing without changing their career pathway.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Useful subjects include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business Studies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Economics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computer Science / Informatics Practices</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">The most important advantage is not the stream itself but developing communication, creativity, analytical thinking and digital skills.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Digital Marketing?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">No. Mathematics is not compulsory for a career in Digital Marketing.</p>
            <p className="text-slate-700 leading-relaxed text-base">However, basic numerical and analytical ability is useful because Digital Marketers regularly work with:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Website traffic</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Conversion rates</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Click-through rates</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Advertising budgets</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cost per lead</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Return on Ad Spend (ROAS)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Customer acquisition costs</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Campaign performance</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">You do not need advanced mathematics, but being comfortable with numbers, percentages and data interpretation is an advantage.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Unlike professions such as Medicine or Law, there is no single mandatory degree to become a Digital Marketing Specialist.</p>
            <p className="font-bold text-slate-800 text-base">Relevant undergraduate degrees include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BBA / BBA Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Com / B.Com Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BA in Mass Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BA Advertising / Brand Management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BA / B.Sc. in related communication or marketing fields</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other bachelor&apos;s degrees followed by specialised Digital Marketing training</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">A degree can provide a strong foundation, but practical Digital Marketing skills and a demonstrable portfolio are extremely important. There are also recognised skill-based pathways. India&apos;s National Qualification Register includes qualifications covering areas such as SEO, SEM, content marketing, social media marketing and data analytics.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Can I Become a Digital Marketer Without a Degree?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Yes. Digital Marketing is one of the careers where students can build skills through: Class 12 → Digital Marketing certification → Projects → Internship → Digital Marketing job</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">However, students should not assume that completing a short certificate automatically leads to a job. Employers increasingly value evidence that you can actually execute campaigns, create content, analyse data and generate results.</p>
            <p className="font-bold text-slate-800 text-base pt-2">A portfolio can include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> A personal website</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SEO projects</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Social media campaigns</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Ads campaigns</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Content calendars</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Email campaigns</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Analytics reports</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> E-commerce projects</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Case studies</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single entrance examination required to become a Digital Marketing Specialist.</p>
            <p className="text-slate-700 leading-relaxed text-base">If you choose a degree such as BBA, B.Com or a communication programme, admission requirements will depend on the institution.</p>
            <p className="font-bold text-slate-800 text-base">Possible admission routes may include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CUET-UG</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Merit-based admission</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">If you later choose an MBA in Marketing, entrance examinations can include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> XAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> MAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NMAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific examinations</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Therefore, the entrance exam depends more on the degree you choose than on Digital Marketing itself.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Digital Marketing in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no universally accepted list of “best Digital Marketing colleges” in India. A good pathway could be a strong undergraduate programme in Marketing, Business Administration, Commerce, Economics, Mass Communication, Advertising or Brand Management, followed by practical Digital Marketing training.</p>
            <p className="font-bold text-slate-800 text-base">When evaluating a college or training institute, look for:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Strong marketing fundamentals</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital marketing curriculum</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Live projects</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Internships</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Industry interaction</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SEO and paid advertising exposure</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Social media</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Content creation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AI tools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Portfolio development</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Placement support</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Google itself recommends learning areas including Google Ads, Google Analytics and digital advertising through its Skillshop ecosystem. Meta also provides a Digital Marketing Associate learning pathway covering areas such as Facebook, Instagram, WhatsApp, Meta Business Suite and advertising fundamentals.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              What Certifications Can Help?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Certifications can strengthen a beginner&apos;s profile, particularly when combined with actual projects.</p>
            <p className="font-bold text-slate-800 text-base">Useful learning pathways include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Ads certifications</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Analytics learning/certification</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Meta Digital Marketing certifications</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> HubSpot certifications</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SEO certifications</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other recognised industry certifications</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Google currently provides training covering Google Ads, Google Analytics and Google Marketing Platform through Skillshop. But remember: certification proves that you studied something; a portfolio demonstrates that you can do it.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              What Is the Future Scope of Digital Marketing?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Digital Marketing in India is strong because businesses increasingly depend on digital channels to acquire, engage and retain customers.</p>
            <p className="font-bold text-slate-800 text-base">Career opportunities exist across:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technology companies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Start-ups</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> E-commerce</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Banking and financial services</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Healthcare</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Education</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Retail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Media</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hospitality</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Advertising agencies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Consulting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> D2C brands</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Digital Marketing is also evolving rapidly because of Artificial Intelligence and automation. Emerging areas include AI-powered marketing, Generative AI for content, Search Engine Optimisation, Generative Engine Optimisation (GEO), Performance Marketing, Marketing Analytics, Marketing Automation, E-commerce Marketing, Influencer Marketing, Video Marketing and Customer Relationship Management (CRM).</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become a Digital Marketing Specialist
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">A successful Digital Marketing Specialist needs a combination of creative, technical and analytical skills.</p>
            <p className="font-bold text-slate-800 text-base">Digital Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SEO</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Ads</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Meta Ads</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Social Media Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Content Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Email Marketing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Marketing Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Website optimisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Basic HTML/CSS</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AI marketing tools</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Creative Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Copywriting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Storytelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Graphic design basics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Video content</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Creative thinking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Understanding consumer behaviour</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Analytical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data interpretation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Campaign analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> A/B testing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Conversion analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Budget management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Performance measurement</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Professional Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Presentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Curiosity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Adaptability</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Time management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business understanding</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Digital Marketing a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Digital Marketing could be a good career choice if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy social media and digital platforms</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like creating content</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are curious about how people make buying decisions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy technology but don&apos;t necessarily want to become a programmer</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like analysing data</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy experimenting and testing ideas</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong communication skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are comfortable continuously learning</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">It may not be suitable if you dislike constant change, experimentation, deadlines, data analysis or performance-driven work.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Digital Marketing?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing a career should not be based simply on the popularity of a profession.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">Your interests, personality, strengths and skills can help determine whether Digital Marketing is actually a good fit for you.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">MentorMe&apos;s Career Assessment and Career Guidance can help students explore their strengths and discover suitable career pathways before choosing their subjects, degree or specialisation.</p>
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