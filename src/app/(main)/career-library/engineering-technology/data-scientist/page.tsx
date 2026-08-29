import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Data Scientist Career in India | MentorMe",
  description: "Data Science is one of the most promising technology careers in India, combining mathematics, statistics, programming and business problem-solving to turn data into useful insights and decisions.",
};

export default function DataScientistCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Engineering &amp; Technology
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Data Scientist Career in India
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Data Science is one of the most promising technology careers in India, combining mathematics, statistics, programming and business problem-solving to turn data into useful insights and decisions.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">What Does a Data Scientist Do?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              A Data Scientist collects, analyses and interprets large amounts of data to identify patterns, solve business problems and predict future outcomes.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              A Data Scientist may work on data analysis, machine learning, artificial intelligence, predictive modelling, data visualisation and statistical analysis.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              Typical employers include technology companies, banks, consulting firms, healthcare companies, e-commerce companies, manufacturing organisations and Global Capability Centres (GCCs).
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">What Subjects Should I Take After 10th?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              If you want to become a Data Scientist, Science with Mathematics is generally the strongest choice after Class 10.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              Data Science relies heavily on mathematical and analytical thinking, so keeping Mathematics and taking subjects such as Physics, Chemistry and Computer Science can provide a strong foundation.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              However, students from other streams can also enter Data Science through undergraduate programmes, bootcamps and specialised training.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Which Degree Should I Choose?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              There is no single mandatory degree for Data Science, but quantitative and technical programmes are the most common pathways.
            </p>
            <p className="font-bold text-slate-800 text-base">Relevant undergraduate degrees include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Statistics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Computer Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Tech in relevant engineering disciplines</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BCA / B.Sc. IT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.A. / B.Sc. Economics with quantitative focus</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Data Science / Data Analytics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BBA / B.Com with analytics specialisation</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Many Data Scientists also pursue postgraduate qualifications such as M.Sc. Data Science, M.Tech, MBA in Business Analytics or specialised certification programmes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Which Entrance Exams Should I Take?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The entrance exam depends on the degree and institution you choose.
            </p>
            <p className="font-bold text-slate-800 text-base">Common pathways include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> JEE Main / JEE Advanced for B.Tech programmes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CUET-UG for many central universities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> State-level engineering and science entrance exams</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              For postgraduate studies in Data Science, common entrance exams include GATE, CAT, XAT, GMAT and university-specific tests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Best Colleges for Data Science in India</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              There is no single definitive list, but strong programmes are offered by leading IITs, IISc, top universities and specialised analytics institutes.
            </p>
            <p className="font-bold text-slate-800 text-base">Well-known options include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IITs offering Computer Science, Statistics and analytics programmes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IISc Bangalore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> ISI Kolkata</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIIT Hyderabad</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Delhi University colleges</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Symbiosis, NMIMS and other universities with analytics programmes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Look for programmes with strong mathematics, statistics, programming, machine learning and industry project components.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">What Certifications Can Help?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Certifications can strengthen a Data Science profile, especially when combined with projects and practical experience.
            </p>
            <p className="font-bold text-slate-800 text-base">Useful learning pathways include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Google Data Analytics Certificate</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IBM Data Science Professional Certificate</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Microsoft Azure Data Scientist</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AWS Machine Learning certifications</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data Science courses from NPTEL / IITs</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Kaggle learning paths and competitions</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              While certifications add value, employers also value projects, internships, open-source contributions and demonstrable analytical work.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">What Is the Future Scope of Data Science?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The future scope of Data Science in India is strong across almost every industry.
            </p>
            <p className="font-bold text-slate-800 text-base">Career opportunities exist across:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technology companies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> E-commerce</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Banking and financial services</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Healthcare</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Education</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Consulting</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Manufacturing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Government and public sector</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Start-ups</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Research and academia</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Emerging areas include machine learning, artificial intelligence, generative AI, data engineering, analytics, automation and decision intelligence.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Skills Required to Become a Data Scientist</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              A successful Data Scientist needs a combination of technical, analytical and business skills.
            </p>
            <p className="font-bold text-slate-800 text-base">Technical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Python / R</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SQL</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Statistics and probability</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Machine learning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data visualisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Excel</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Big data tools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cloud platforms</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Analytical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Logical reasoning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data interpretation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Business thinking</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Professional Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Presentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Curiosity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
            </div>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Data Science?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Choosing a career should not be based only on popularity.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              Your interests, strengths, personality and skills can help determine whether Data Science is actually a good fit for you.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              MentorMe&apos;s Career Assessment and Career Guidance can help students explore their strengths and discover suitable career pathways before choosing their subjects, degree or specialisation.
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
    </>
  );
}