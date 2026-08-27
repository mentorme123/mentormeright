import Link from "next/link";
import { CheckCircle2, HeartPulse, Stethoscope, Award, GraduationCap, DollarSign, TrendingUp, Brain, UserCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Occupational Therapist Career in India | MentorMe Career Library",
  description: "Occupational Therapy is a healthcare career that helps people become more independent in their everyday lives. Learn about subjects after 10th, degrees, NEET requirements, top colleges, skills, salary, and future scope.",
};

export default function MedicineHealthcareCareerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Medicine &amp; Healthcare
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Occupational Therapist Career in India
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Occupational Therapy is a healthcare career that helps people become more independent in their everyday lives. Occupational Therapists work with children, adults and older people who have physical, developmental, neurological, psychological or other challenges that affect their ability to perform daily activities.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            It can be a rewarding career for students who enjoy Biology, healthcare, psychology, problem-solving and helping people.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* What Does an Occupational Therapist Do? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HeartPulse className="text-brand-blue shrink-0" />
              What Does an Occupational Therapist Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              An Occupational Therapist (OT) helps people develop, recover or maintain the skills needed for everyday activities such as studying, working, dressing, eating, writing, playing and living independently.
            </p>
            <p className="font-bold text-slate-800 text-base pt-2">Occupational Therapists may work with:</p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Children with developmental difficulties</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> People recovering from injuries</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patients with neurological conditions</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> People with physical disabilities</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Older adults</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> People requiring mental-health support</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Typical responsibilities include assessing patients’ needs, creating personalized therapy plans, teaching adaptive techniques, recommending assistive equipment, tracking progress, and working alongside doctors, physiotherapists, speech therapists, and psychologists.
            </p>
          </div>

          {/* What Subjects Should I Take After 10th? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              If you want to become an Occupational Therapist, Physics, Chemistry and Biology (PCB) in Class 11 and Class 12 is the primary pathway.
            </p>
            <p className="font-bold text-slate-800 text-base">Recommended subject combination:</p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physics</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Chemistry</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Biology</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              English is a mandatory medium of instruction for degree admissions. You may also opt for Mathematics, Psychology, Computer Science, or Physical Education as an additional elective.
            </p>
          </div>

          {/* Is NEET Compulsory for Occupational Therapy? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Stethoscope className="text-brand-blue shrink-0" />
              Is NEET Compulsory for Occupational Therapy?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              In most Indian states, NEET is <strong className="text-slate-900">not strictly mandatory</strong> for admission to Bachelor of Occupational Therapy (BOT) programmes.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              However:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Admission to BOT in central institutes, state government colleges, and premier medical universities is generally based on state-level entrance exams, common entrance tests (CETs), university-specific exams, or Class 12 PCB merit scores.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Some private universities and medical colleges may consider NEET scores as part of their eligibility criteria.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-base font-semibold pt-2">
              Always verify individual entrance requirements of target institutions.
            </p>
          </div>

          {/* Which Degree Should I Choose for Occupational Therapy? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose for Occupational Therapy?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              To practice as a licensed Occupational Therapist in India, you must complete:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Primary Undergraduate Degree:</h3>
                <p className="font-bold text-brand-blue text-lg">Bachelor of Occupational Therapy (BOT)</p>
                <p className="text-sm text-slate-600">• Duration: 4.5 years (4 years academic coursework + 6 months compulsory internship).</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Advanced Qualification (Optional):</h3>
                <p className="font-bold text-brand-blue text-lg">Master of Occupational Therapy (MOT) (2 years)</p>
                <p className="text-sm text-slate-600">• Specialisations in Paediatrics, Neurology, Orthopaedics, Mental Health, Rehabilitation, or Hand Therapy.</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Ensure the college and programme are recognised by the <strong className="text-slate-900">All India Occupational Therapists’ Association (AIOTA)</strong> and relevant state council / Healthcare Allied Council.
            </p>
          </div>

          {/* Which Entrance Exams Should I Take? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Key entrance routes for BOT in India include:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">State Level Common Entrance Tests (CETs):</strong> IPU CET (Delhi), KCET (Karnataka), MHT CET (Maharashtra), WBJEE / JENPAS UG (West Bengal), etc.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">National / Institute Level Entrance Tests:</strong> NILD CET / SVNIRTAR CET for national premier rehabilitation institutes.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">CUET-UG:</strong> For central/participating universities offering allied health sciences.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> <strong className="text-slate-900">University Entrance Exams &amp; Merit Admissions:</strong> Conducted by individual private/deemed medical universities.</li>
            </ul>
          </div>

          {/* Top Colleges for Occupational Therapy in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Top Colleges for Occupational Therapy in India</h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Leading government and autonomous institutions offering BOT:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> National Institute for Locomotor Disabilities (NILD), Kolkata</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Swami Vivekanand National Institute of Rehabilitation Training and Research (SVNIRTAR), Cuttack</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Pandit Deendayal Upadhyaya National Institute for Persons with Physical Disabilities (PDUNIPPD), New Delhi</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Seth GS Medical College &amp; KEM Hospital, Mumbai</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Christian Medical College (CMC), Vellore</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Manipal College of Health Professions (MAHE), Manipal</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Jamia Hamdard, New Delhi</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> SRM Institute of Science and Technology, Chennai</div>
            </div>
          </div>

          {/* Occupational Therapist Salary in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Occupational Therapist Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Salary varies depending on experience, employer, specialization, and location.
            </p>
            <p className="font-bold text-slate-800 text-base">Career Progression &amp; Estimated Pay Scale:</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Entry Level (Fresh Graduate / BOT)</p>
                <p className="text-lg font-black text-brand-blue">₹3.5 Lakhs – ₹5.5 Lakhs</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Mid Level (3–5 Years Experience / MOT)</p>
                <p className="text-lg font-black text-emerald-600">₹6.0 Lakhs – ₹10.0 Lakhs</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Senior Level / Private Practice Specialist</p>
                <p className="text-lg font-black text-purple-600">₹12.0 Lakhs – ₹18.0+ Lakhs</p>
                <p className="text-xs text-slate-500">per annum</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Working in international healthcare systems (e.g., UK, USA, UAE, Australia) offers significantly higher compensation following relevant licensing exams (e.g., NBCOT in USA, HCPC in UK).
            </p>
          </div>

          {/* Future Scope of Occupational Therapy in India */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              Future Scope of Occupational Therapy in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The demand for Occupational Therapists in India is growing rapidly due to:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Increasing awareness of early intervention in childhood development disorders (e.g., Autism, ADHD).</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Growing geriatric population requiring stroke, dementia, and movement rehabilitation.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Expansion of corporate ergonomics, mental health facilities, and sports rehabilitation centres.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Growth of special education schools and inclusive learning models.</li>
            </ul>
            <p className="font-bold text-slate-800 text-base pt-2">Key Employment Opportunities:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Multispecialty Hospitals &amp; Medical Centres</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Rehabilitation Centres</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Special Needs Schools &amp; Inclusive Classrooms</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Private Clinics &amp; Home Healthcare</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Mental Health &amp; De-addiction Centres</div>
              <div className="flex items-center gap-2"><span className="text-brand-blue font-bold">•</span> Non-Governmental Organisations (NGOs) &amp; Community Health Projects</div>
            </div>
          </div>

          {/* Skills Required to Become an Occupational Therapist */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become an Occupational Therapist
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              To excel in Occupational Therapy, you need a balance of healthcare expertise and personal empathy:
            </p>
            <ul className="space-y-3 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Patience &amp; Empathy:</strong> Understanding patient struggles and supporting gradual progress.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Problem-Solving:</strong> Designing customized interventions adapted to individual living conditions.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Communication &amp; Interpersonal Skills:</strong> Interacting effectively with patients, families, and healthcare teams.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Physical Stamina &amp; Observation:</strong> Demonstrating exercises and accurately monitoring patient physical/functional mobility.</li>
              <li className="flex items-start gap-2.5"><strong className="text-brand-blue shrink-0">• Creativity:</strong> Crafting adaptive tools and engaging activities for rehabilitation.</li>
            </ul>
          </div>

          {/* Is Occupational Therapy a Good Career for You? */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Occupational Therapy a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Occupational Therapy is ideal if you:
            </p>
            <ul className="space-y-2 text-slate-700 text-base pl-2">
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Want a meaningful healthcare career with direct positive impact on human lives.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Prefer non-surgical, therapy-based clinical practice.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Enjoy working with diverse age groups, from young toddlers to elderly adults.</li>
              <li className="flex items-start gap-2.5"><span className="text-brand-blue font-bold">•</span> Have a strong interest in biology, human anatomy, psychology, and functional rehabilitation.</li>
            </ul>
          </div>

          {/* Thinking About a Career in Occupational Therapy? */}
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Occupational Therapy?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Selecting the right career in healthcare requires understanding your personality, aptitude, and interest in human biology and rehabilitation.
            </p>
            <p className="text-white/90 text-base max-w-xl mx-auto">
              MentorMe’s Career Guidance and Psychometric Assessments empower students to discover their ideal career path early.
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
