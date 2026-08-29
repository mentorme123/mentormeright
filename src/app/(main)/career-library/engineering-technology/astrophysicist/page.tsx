import Link from "next/link";
import { CheckCircle2, Brain, HelpCircle, Award, GraduationCap, UserCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Astrophysicist Career in India | MentorMe Career Library",
  description: "Astrophysics is the branch of science that uses Physics and Mathematics to understand stars, planets, galaxies, black holes, the universe and the fundamental processes that shape the cosmos.",
};

export default function AstrophysicistCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Engineering &amp; Technology
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Astrophysicist Career in India
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Astrophysics is the branch of science that uses Physics and Mathematics to understand stars, planets, galaxies, black holes, the universe and the fundamental processes that shape the cosmos.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            It is an exciting career for students who have a strong interest in Physics, Mathematics, Space, Scientific Research and Problem-Solving.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              What Does an Astrophysicist Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              An Astrophysicist uses Physics, Mathematics, observations, computer simulations and data analysis to study astronomical objects and phenomena.
            </p>
            <p className="font-bold text-slate-800 text-base">Depending on their specialisation, an Astrophysicist may work on:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Stars and stellar evolution</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Galaxies</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Black holes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cosmology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Exoplanets</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Solar physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Gravitational waves</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Dark matter and dark energy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> High-energy astrophysics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computational astrophysics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Interstellar space</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Planetary science</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              There are broadly different approaches to astrophysics: Theoretical Astrophysics uses Mathematics and Physics to develop models; Observational Astrophysics uses telescopes and astronomical observations; Computational Astrophysics uses programming, simulations, numerical methods and large datasets; and Instrumentation involves developing and using sophisticated instruments, detectors and systems used for astronomical observations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              If you want to become an Astrophysicist, the strongest school pathway is Science with Physics + Mathematics.
            </p>
            <p className="font-bold text-slate-800 text-base">After Class 10, choose a combination that includes:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Chemistry</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computer Science, if available</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Physics and Mathematics are the two most important subjects. Computer Science is increasingly valuable because modern astrophysics uses programming, simulations, data analysis and computational methods. If you are serious about becoming a professional Astrophysicist, do not drop Mathematics after Class 10.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Astrophysics?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Yes — Mathematics is extremely important for a career in Astrophysics.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              Astrophysics is not simply about observing stars through a telescope. Professional astrophysics involves areas such as Calculus, Algebra, Geometry, Differential equations, Probability and statistics, Numerical methods, Mathematical modelling and Computational methods.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              The more theoretical your career, the more important advanced Mathematics becomes. This is why students interested in Astrophysics should ideally choose Physics + Mathematics in Classes 11 and 12.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              There is no single mandatory undergraduate degree called “Astrophysics” that every student needs to pursue. In fact, a strong Physics degree is one of the most flexible pathways.
            </p>
            <p className="font-bold text-slate-800 text-base">Good undergraduate options include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. Physics with Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BS / BS (Research) in Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Integrated BS-MS programmes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Tech / Engineering Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Tech in relevant engineering disciplines</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Astronomy / Astrophysics programmes where available</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              A common academic pathway is: Class 10 → Class 12 Science → B.Sc./BS Physics → M.Sc. Physics/Astrophysics → PhD → Astrophysics Research. Another pathway can be: Class 10 → Class 12 Science → BS/BS-MS → PhD → Astrophysics Research.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              IISc's astronomy and astrophysics research programme accepts students from backgrounds including Physical Sciences, Mathematical Sciences, Engineering and four-year Bachelor of Science programmes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The entrance examination depends on the institution and the programme.
            </p>
            <p className="font-bold text-slate-800 text-base">For undergraduate science programmes, students may encounter:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IISER Aptitude Test (IAT)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> JEE Advanced</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other national/institutional admission routes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              For example, IISc's four-year BS (Research) programme currently accepts students through IAT and JEE Advanced routes. The Indian Institute of Space Science and Technology (IIST) currently uses JEE Advanced marks for its undergraduate admissions.
            </p>
            <p className="font-bold text-slate-800 text-base pt-2">At the postgraduate and research level, students may encounter examinations such as:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIT JAM</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> JEST</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> GATE</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CSIR-UGC NET</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institute-specific research entrance processes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Entrance requirements change, so students should always check the latest admission notification of the institution.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Best Colleges for Astrophysics and Physics in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Students should not limit their search only to colleges with “Astrophysics” in the course name. Strong Physics and research institutions can provide an excellent foundation for a future Astrophysics career.
            </p>
            <p className="font-bold text-slate-800 text-base">Institutions worth exploring include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Indian Institute of Science (IISc), Bengaluru</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Indian Institute of Science Education and Research (IISERs)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Indian Institute of Space Science and Technology (IIST), Thiruvananthapuram</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Tata Institute of Fundamental Research (TIFR)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Indian Institute of Astrophysics (IIA), Bengaluru</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Raman Research Institute (RRI), Bengaluru</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IITs with strong Physics programmes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University departments with strong Physics and Astronomy research</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              IIST offers a Dual Degree pathway combining B.Tech in Engineering Physics with an MS/M.Tech, including a specialisation in Astronomy & Astrophysics. IISc's Joint Astronomy Programme is a collaborative programme involving IISc, the Indian Institute of Astrophysics, ISRO and Raman Research Institute.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Do I Need a PhD to Become an Astrophysicist?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              For a professional research career in Astrophysics, a PhD is generally the expected qualification.
            </p>
            <p className="font-bold text-slate-800 text-base">A typical research pathway is:</p>
            <p className="text-slate-700 leading-relaxed text-base">Bachelor's Degree → Master's / Integrated Programme → PhD → Postdoctoral Research → Research / Academic Career</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              This is different from many careers where students can enter the workforce immediately after a bachelor's degree. If your goal is specifically to become a research Astrophysicist, you should be prepared for a long academic journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              What Is the Future Scope of Astrophysics?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The future scope of Astrophysics in India extends beyond traditional astronomy.
            </p>
            <p className="font-bold text-slate-800 text-base">Career and research opportunities can exist in:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Astronomy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Astrophysics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Cosmology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Space Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Planetary Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Solar Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Space Instrumentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computational Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Scientific Computing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data Analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Research and Academia</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Space missions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Scientific institutions</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Astrophysics is also becoming increasingly computational. Modern researchers work with enormous datasets, simulations, astronomical surveys and sophisticated instruments. This creates an intersection between Physics + Mathematics + Programming + Data Science + Artificial Intelligence.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              What Skills Are Required to Become an Astrophysicist?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              An Astrophysicist needs a strong combination of scientific, mathematical and computational skills.
            </p>
            <p className="font-bold text-slate-800 text-base">Physics Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Classical Mechanics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Electromagnetism</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Thermodynamics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Quantum Mechanics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Relativity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Astrophysics</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Mathematics Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Calculus</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Linear Algebra</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Differential Equations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Probability and Statistics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Numerical Methods</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mathematical Modelling</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Technology Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Python</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Scientific Computing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data Analysis</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Simulation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Data Visualisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computational Modelling</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Research Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Critical Thinking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Scientific Reasoning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-Solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Research Methodology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Reading Scientific Papers</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Experimentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Observation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Analytical Thinking</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Personal Qualities</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Curiosity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Persistence</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Intellectual curiosity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Willingness to learn</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Ability to work independently</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Astrophysics a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Astrophysics could be a good career choice if you:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Love Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy Mathematics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are fascinated by space and the universe</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like asking difficult scientific questions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy solving complex problems</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong analytical ability</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy research</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are comfortable with computers and programming</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have patience for long-term learning</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              But there is an important reality students should understand: being fascinated by the universe is not the same as enjoying Astrophysics. Professional Astrophysics involves a lot of Mathematics, Physics, programming, data analysis, research and persistence.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              If you enjoy the science behind the universe rather than only the visual fascination of space, Astrophysics could be an excellent career for you.
            </p>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Astrophysics?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Choosing a career in science should go beyond asking, “Do I like space?”
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              Your interests, personality, strengths and skills can help you understand whether Astrophysics, Physics, Space Science, Engineering or another scientific career is the right fit for you.
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