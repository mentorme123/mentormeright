import Link from "next/link";
import { CheckCircle2, Brain, HelpCircle, Award, GraduationCap, UserCheck, TrendingUp, Briefcase, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Law & Governance | MentorMe Career Library",
  description: "Explore Law & Governance careers in India including Cyber Law, Corporate Law, Civil Services, and Public Policy. Learn about degrees, colleges, skills, salary and future scope.",
};

export default function LawGovernanceCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Law &amp; Governance
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Law &amp; Governance
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Cyber Law is an emerging legal specialisation that combines Law and Technology. A Cyber Lawyer helps individuals, businesses and organisations deal with legal issues involving computers, the internet, digital transactions, data, privacy, cybercrime and emerging technologies.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            Cyber Law can be an excellent career for students who enjoy Law, Technology, Problem-Solving, Research and Logical Thinking.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Briefcase className="text-brand-blue shrink-0" />
              What Does a Cyber Lawyer Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">A Cyber Lawyer provides legal advice and representation on matters involving technology and cyberspace.</p>
            <p className="font-bold text-slate-800 text-base">Their work may include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cybercrime cases</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Online fraud</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hacking and unauthorised access</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data privacy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data protection</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cybersecurity compliance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital contracts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Online transactions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Intellectual Property Rights in the digital environment</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Social media and online content</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technology contracts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital evidence</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cybercrime investigations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IT compliance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technology-related disputes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AI and emerging technology regulation</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Cyber Lawyers may advise companies, individuals, technology businesses, banks, government organisations and other institutions.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Cyber Lawyer vs Cybersecurity Professional
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">These are different careers.</p>
            <div className="space-y-2 text-slate-700 text-base pl-2">
              <p><span className="text-brand-blue font-bold">Cyber Lawyer</span> focuses primarily on the legal and regulatory aspects of cybersecurity and technology.</p>
              <p><span className="text-brand-blue font-bold">Cybersecurity Professional</span> focuses primarily on protecting computer systems, networks, applications and data from cyber threats.</p>
              <p><span className="text-brand-blue font-bold">Cyber Forensics Professional</span> investigates digital devices, systems and evidence to understand what happened during a cyber incident.</p>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">However, these professionals often work together during cybercrime investigations and cybersecurity incidents.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no compulsory school stream for becoming a Cyber Lawyer.</p>
            <p className="font-bold text-slate-800 text-base">Students can choose:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Commerce</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Arts / Humanities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Science</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Commerce can provide useful exposure to Business, Economics, Accountancy and Commercial concepts. This can be particularly useful if you are interested in corporate cyber law, technology contracts, fintech or data compliance. Arts / Humanities subjects such as Political Science, Economics, Psychology, Sociology and English can help develop reading, writing, reasoning and understanding of society and institutions. Science can be a good choice if you are particularly interested in technology and cybersecurity. Computer Science can give you an understanding of how technology works, which can become a valuable advantage later. There is no requirement to study Computer Science to become a Cyber Lawyer.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Cyber Law?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">No. Mathematics is not compulsory for becoming a Cyber Lawyer. However, basic logical and analytical ability is valuable. You may also benefit from understanding Technology, Computers, Networks, Data, Digital systems and Cybersecurity concepts. You don&apos;t need to become a programmer, but understanding technology can make you a much stronger Cyber Lawyer.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The most important qualification is a recognised law degree.</p>
            <p className="font-bold text-slate-800 text-base">Students can generally choose one of two main pathways.</p>
            <p className="font-bold text-slate-800 text-base">Pathway 1: 5-Year Integrated Law Degree</p>
            <p className="text-slate-700 leading-relaxed text-base">After Class 12: BA LL.B. / BBA LL.B. / B.Com LL.B. / B.Sc. LL.B. This is usually the most direct route for a student who knows early that they want to pursue Law.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Pathway 2: 3-Year LL.B.</p>
            <p className="text-slate-700 leading-relaxed text-base">Students first complete a bachelor&apos;s degree and then pursue: 3-Year LL.B. The Bar Council of India recognises both three-year and five-year law-course pathways, subject to the applicable eligibility and recognition requirements.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Then Specialise in Cyber Law</p>
            <p className="text-slate-700 leading-relaxed text-base">After or during your law education, you can build expertise in Cyber Law, Cybercrime, Data Protection, Privacy Law, Technology Law, Intellectual Property, Digital Evidence, Information Technology Law, AI and Emerging Technology Law. For example, NLSIU offers a one-year Postgraduate Diploma in Cyber Law & Cyber Forensics, open to graduates from law and other fields. Its curriculum includes cyber technology, cybercrime, digital evidence, cyber forensics and internet-related legal issues.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">For students pursuing the 5-year integrated law route, important entrance examinations can include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CLAT – Common Law Admission Test</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AILET</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SLAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific law entrance examinations</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For the three-year LL.B. route, admission depends on the university or institution and may involve entrance examinations or merit-based admission. Students should always check the latest admission requirements of the law school they are targeting.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Cyber Law in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Students should be careful when searching for the “best Cyber Law colleges in India.” Cyber Law is often taught as a specialisation, elective, postgraduate programme or diploma within a broader legal education, rather than as the primary undergraduate law degree.</p>
            <p className="font-bold text-slate-800 text-base">Institutions worth exploring include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Law School of India University (NLSIU), Bengaluru</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Law University Delhi</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Academy of Legal Studies and Research (NALSAR), Hyderabad</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Law University Jodhpur</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Law University, Bengaluru</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Law Institute University, Bhopal</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other BCI-recognised law schools and universities</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">NLSIU offers cyber-law teaching within its LL.B. programmes and also offers a dedicated postgraduate diploma in Cyber Law & Cyber Forensics. NLIU Bhopal&apos;s Master of Cyber Law & Information Security combines areas including cyber law, data privacy, cybersecurity, cybercrime, digital forensics, AI and emerging technology law. Don&apos;t choose a law college only because it advertises Cyber Law. First evaluate the overall quality of its law programme, faculty, internships, moot courts, research opportunities, placements and industry exposure.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              What Is the Future Scope of Cyber Law?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Cyber Law in India is strong because technology is creating new legal questions around data, privacy, cybersecurity, artificial intelligence, digital transactions and online behaviour.</p>
            <p className="font-bold text-slate-800 text-base">Emerging areas include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data Protection and Privacy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AI Regulation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cybercrime</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital Evidence</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cybersecurity Compliance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Fintech Law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Blockchain and Cryptocurrency Regulation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technology Contracts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Intellectual Property in the Digital World</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Online Platform Regulation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cloud and Data Governance</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital Forensics</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">This makes Cyber Law particularly interesting for students who want a legal career but also want to work closely with technology and emerging digital businesses.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become a Cyber Lawyer
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">A successful Cyber Lawyer needs a combination of legal, technological, analytical and communication skills.</p>
            <p className="font-bold text-slate-800 text-base">Legal Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Legal research</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Contract law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Criminal law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cyber law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data protection</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Privacy law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Intellectual Property Rights</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technology law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital evidence</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Regulatory compliance</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Technology Skills</p>
            <p className="text-slate-700 leading-relaxed text-base">You don&apos;t need to become a cybersecurity engineer, but understanding the fundamentals is valuable:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computer systems</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Internet and networks</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cybersecurity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cloud computing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital transactions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AI</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Blockchain</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital forensics</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Analytical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Logical reasoning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Critical thinking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Investigation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Research</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Professional Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Legal writing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Negotiation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Presentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Client management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Advocacy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Ability to explain complex technology in simple language</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">One of the biggest advantages of a strong Cyber Lawyer is the ability to translate technical issues into legal implications.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Cyber Law a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Cyber Law could be a good career choice if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy Law</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are interested in Technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like researching and analysing complex issues</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy solving problems</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong communication skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are curious about cybersecurity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy reading and writing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Want to work in an emerging area of Law</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">It may not be suitable if you dislike extensive reading, legal research, writing, detailed analysis or continuously learning about new technologies and regulations.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Cyber Law?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing Cyber Law should not be based simply on the fact that “cybersecurity is growing.”</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">The right question is: Do you enjoy both Law and Technology? If you do, Cyber Law can provide a distinctive career pathway at the intersection of legal practice, cybersecurity, privacy, technology and business.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">MentorMe&apos;s Career Assessment and Career Guidance can help students understand their interests, strengths, personality and skills and explore whether Cyber Law, Cybersecurity, Law or another technology-related career could be a good fit.</p>
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