import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Data Scientist Career in India | MentorMe",
  description: "Data Science is one of the most promising technology careers in India, combining mathematics, statistics, programming and business problem-solving to turn data into useful insights and decisions.",
};

export default function EngineeringTechnologyCareerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
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

      {/* Main Content Body */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* What Does a Data Scientist Do? */}
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

          {/* What Subjects Should I Take After 10th? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">What Subjects Should I Take After 10th?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              If you want to become a Data Scientist, Science with Mathematics is generally the strongest choice after Class 10.
            </p>
            <p className="font-bold text-slate-800 text-base">Recommended subjects include:</p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mathematics</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physics</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computer Science / Informatics Practices</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Statistics, where available</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Chemistry, depending on your chosen degree and college</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              However, there is no single compulsory school stream for every Data Science degree. Some programmes have different eligibility requirements.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              For example, IIT Madras&apos; BS Degree in Data Science and Applications accepts students from different academic backgrounds, provided they meet its eligibility requirements.
            </p>
          </div>

          {/* Is Maths Compulsory for Data Science? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Is Maths Compulsory for Data Science?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Mathematics is strongly recommended for a career in Data Science.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              It is important because Data Science uses concepts from statistics, probability, algebra, calculus and optimisation.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              For example, the IIT Madras Data Science programme includes Mathematics for Data Science and Statistics as foundational subjects, followed by more advanced mathematics including linear algebra, calculus and optimisation.
            </p>
            <p className="text-slate-700 leading-relaxed text-base font-semibold">
              If you are choosing subjects after Class 10 and are serious about becoming a Data Scientist, keeping Mathematics is the safer option.
            </p>
          </div>

          {/* Which Degree Should I Choose for Data Science? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Which Degree Should I Choose for Data Science?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              There is no single mandatory degree. Popular options include:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> B.Tech / B.E. in Computer Science, AI, Data Science or related fields</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> B.Sc. in Data Science</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> B.Sc. in Statistics / Mathematics / Computer Science</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> BCA with Data Science / AI specialisation</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Other quantitative degrees followed by a Master&apos;s in Data Science, AI or Analytics</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              When choosing a degree, look beyond the title. A strong Data Science programme should provide exposure to Python, statistics, databases, machine learning, data visualisation, algorithms and real-world projects.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              IIT Madras, for example, offers a BS Degree in Data Science and Applications covering areas including Python, machine learning, deep learning, computer vision, big data and LLMs.
            </p>
          </div>

          {/* Which Entrance Exams Should I Take? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Which Entrance Exams Should I Take?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Depending on the degree and college, important entrance routes can include:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> JEE Main – for many engineering programmes</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> JEE Advanced – for IIT undergraduate engineering programmes</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> CUET-UG – for participating universities</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> State-level engineering entrance examinations</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> University-specific entrance examinations</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Admission requirements vary by institution, so students should always check the latest eligibility criteria before applying.
            </p>
          </div>

          {/* Best Colleges for Data Science in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Best Colleges for Data Science in India</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Some well-known institutions and universities offering programmes relevant to Data Science, Computer Science, Statistics or AI include:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIT Madras</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIT Hyderabad</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIT Delhi</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIT Bombay</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIT Kharagpur</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIT Kanpur</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIIT Hyderabad</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IIIT Delhi</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> IISc Bengaluru</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> ISI Kolkata</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> University of Hyderabad</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Other leading universities</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Do not choose a college only because the course has “Data Science” in its name. Curriculum quality, mathematics and statistics foundation, programming exposure, internships, projects, faculty and placements are equally important.
            </p>
          </div>

          {/* Data Scientist Salary in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Data Scientist Salary in India</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The Data Scientist salary in India can vary widely depending on skills, experience, location, industry and employer.
            </p>
            <p className="text-slate-700 leading-relaxed text-base font-semibold">
              Fresh graduates may start in roles such as:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-brand-blue text-sm md:text-base text-center">
              Data Analyst &rarr; Junior Data Scientist &rarr; Data Scientist &rarr; Senior Data Scientist &rarr; Lead / Principal Data Scientist
            </div>
            <p className="text-slate-700 leading-relaxed text-base">
              With experience, professionals can move into higher-paying areas such as Machine Learning, Artificial Intelligence, Generative AI, Data Engineering and AI leadership.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              For students, the important point is this: skills and practical experience can have a major impact on earning potential.
            </p>
          </div>

          {/* Future Scope of Data Science */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Future Scope of Data Science</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The future scope of Data Science in India is strong, particularly as organisations increasingly adopt Artificial Intelligence, Machine Learning and Generative AI.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              India&apos;s AI/ML hiring increased by 25% year-on-year in June 2026, according to IBEF&apos;s summary of employment data. India also has more than 2,117 Global Capability Centres, with over 2.5 lakh professionals working in AI/ML roles.
            </p>
            <p className="font-bold text-slate-800 text-base">Emerging career areas include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div>• Data Science</div>
              <div>• Machine Learning</div>
              <div>• Artificial Intelligence</div>
              <div>• Generative AI</div>
              <div>• Data Engineering</div>
              <div>• Business Analytics</div>
              <div>• Predictive Analytics</div>
              <div>• Computer Vision</div>
              <div>• Natural Language Processing</div>
              <div>• AI Product Management</div>
            </div>
          </div>

          {/* Skills Required to Become a Data Scientist */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Skills Required to Become a Data Scientist</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              A successful Data Scientist needs a combination of technical, analytical and communication skills.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-brand-blue text-base">Technical Skills</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Python</li>
                  <li>• SQL</li>
                  <li>• Statistics</li>
                  <li>• Probability</li>
                  <li>• Machine Learning</li>
                  <li>• Data Visualisation</li>
                  <li>• Databases</li>
                  <li>• Excel</li>
                  <li>• Power BI / Tableau</li>
                  <li>• Generative AI tools</li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-emerald-600 text-base">Analytical Skills</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Problem-solving</li>
                  <li>• Logical thinking</li>
                  <li>• Critical thinking</li>
                  <li>• Ability to identify patterns</li>
                  <li>• Data interpretation</li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="font-bold text-purple-600 text-base">Professional Skills</h3>
                <ul className="space-y-1 text-slate-700 text-sm">
                  <li>• Communication</li>
                  <li>• Business understanding</li>
                  <li>• Presentation skills</li>
                  <li>• Curiosity</li>
                  <li>• Continuous learning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Is Data Science a Good Career for You? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Is Data Science a Good Career for You?</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Data Science can be an excellent career if you enjoy Mathematics, Technology, Problem-Solving and working with data.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              But remember: becoming a Data Scientist is not simply about learning Python. It requires a strong foundation in Mathematics + Statistics + Programming + Analytical Thinking + Domain Knowledge.
            </p>
            <p className="text-slate-700 leading-relaxed text-base font-semibold">
              Start building these skills early, explore the field through projects and understand your own interests and strengths before choosing your degree.
            </p>
          </div>

          {/* Thinking About a Career in Data Science? */}
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Data Science?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              MentorMe&apos;s Career Guidance &amp; MentorMe Career Intelligence Report can help students understand their interests, skills and personality and explore suitable career pathways before making important education decisions.
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
