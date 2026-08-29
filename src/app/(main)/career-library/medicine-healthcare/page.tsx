import Link from "next/link";
import { CheckCircle2, HeartPulse, Stethoscope, Award, GraduationCap, DollarSign, TrendingUp, Brain, UserCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Occupational Therapist Career in India | MentorMe Career Library",
  description: "Occupational Therapy is a healthcare career that helps people become more independent in their everyday lives. Learn about subjects after 10th, degrees, NEET requirements, top colleges, skills, salary, and future scope.",
};

export default function MedicineHealthcareCareerPage() {
  return (
    <div className="space-y-0">
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

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HeartPulse className="text-brand-blue shrink-0" />
              What Does an Occupational Therapist Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              An Occupational Therapist (OT) helps people develop, recover or maintain the skills needed for everyday activities such as studying, working, dressing, eating, writing, playing and living independently.
            </p>
            <p className="font-bold text-slate-800 text-base pt-2">Occupational Therapists may work with:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Children with developmental difficulties</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> People recovering from injuries</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patients with neurological conditions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> People with physical disabilities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Older adults</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> People requiring mental-health support</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patients undergoing rehabilitation</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Their work can include assessment, therapeutic activities, rehabilitation, assistive devices, adapting tasks and modifying environments to improve independence. The National Commission for Allied and Healthcare Professions (NCAHP) defines Occupational Therapy as a client-centred profession focused on enabling participation in everyday activities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              If you are planning to become an Occupational Therapist in India, Science with Biology is the recommended pathway.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              After Class 10, choose:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Chemistry</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Biology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Students should ideally choose PCB (Physics, Chemistry and Biology) in Classes 11 and 12.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Under the current NCAHP admission framework for BOT, candidates are required to have Physics, Chemistry and Biology (or Botany and Zoology) in 10+2, along with English.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Occupational Therapy?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              No. Mathematics is generally not compulsory for Bachelor of Occupational Therapy (BOT).
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              For students interested in Occupational Therapy, Biology is much more important than Mathematics.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              The current NCAHP eligibility criteria specify Physics, Chemistry and Biology for admission to BOT.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The primary undergraduate qualification is:
            </p>
            <p className="font-bold text-brand-blue text-lg">Bachelor of Occupational Therapy (BOT)</p>
            <p className="text-slate-700 leading-relaxed text-base">
              The current NCAHP framework specifies a five-year undergraduate programme including a one-year internship.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              After completing BOT, students can pursue:
            </p>
            <p className="font-bold text-brand-blue text-lg">Master of Occupational Therapy (MOT)</p>
            <p className="text-slate-700 leading-relaxed text-base">
              A Master&apos;s degree can allow students to develop expertise in specialised areas of Occupational Therapy. The current framework specifies a two-year MOT programme for graduates of BOT.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Students interested in teaching, research or advanced clinical practice may consider postgraduate education after their bachelor&apos;s degree.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Which Entrance Exam Is Required?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              This is an important area for students because admission rules are evolving.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              For the 2026–27 academic year, the NCAHP/UGC admission framework states that candidates seeking admission to BOT must have appeared for NEET conducted by the National Testing Agency (NTA). It also states that admission is based on NEET merit/marks, without a minimum NEET qualifying cut-off for application.
            </p>
            <p className="text-slate-700 leading-relaxed text-base font-semibold pt-2">
              Therefore, students should always check the latest admission notification of the college/university before applying.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Best Colleges for Occupational Therapy in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              When choosing an Occupational Therapy college, students should look for:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Recognition and appropriate university affiliation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Clinical training facilities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hospital exposure</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Experienced faculty</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Internship opportunities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patient interaction</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Placement opportunities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Infrastructure and rehabilitation facilities</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Institutions offering Occupational Therapy education include government and private healthcare institutions, medical universities and specialised rehabilitation institutions.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              For example, the National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD) offers a Bachelor of Occupational Therapy programme and provides clinical exposure across areas including paediatrics, psychiatry, geriatrics, orthopaedics, neurology and hand rehabilitation.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Don&apos;t choose a college only because it has a BOT course. Clinical exposure and practical training are especially important in Occupational Therapy.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Occupational Therapist Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The Occupational Therapist salary in India depends on qualifications, experience, location, employer and area of specialisation.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              Fresh graduates may begin their careers in entry-level clinical or rehabilitation roles and can progress with experience into senior clinical, specialist, teaching, research, management or private-practice positions.
            </p>
            <p className="font-bold text-slate-800 text-base pt-2">Career opportunities may exist in:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hospitals</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rehabilitation centres</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Special schools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Child development centres</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mental health facilities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Geriatric care</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Community healthcare</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NGOs</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Private clinics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Home healthcare</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Research and academic institutions</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Because salary information varies considerably across employers, students should evaluate career growth and specialisation opportunities, rather than choosing the profession only based on starting salary.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              What Is the Future Scope of Occupational Therapy?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The future scope of Occupational Therapy in India is promising as the country expands its allied healthcare workforce and rehabilitation services.
            </p>
            <p className="text-slate-700 leading-relaxed text-base">
              The Government announced in 2026 that it intends to add 100,000 Allied Healthcare Professionals over the next five years, alongside increased government support for allied healthcare.
            </p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              Occupational Therapists can develop careers in areas such as:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Paediatric Occupational Therapy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Neurological Rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Orthopaedic Rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mental Health</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Geriatric Care</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hand Therapy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Developmental Therapy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Community Rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Assistive Technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Disability Rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Private Practice</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Teaching and Research</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              The profession is also increasingly supported by a competency-based education framework under NCAHP.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become an Occupational Therapist
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Occupational Therapy requires much more than academic knowledge.
            </p>
            <p className="font-bold text-slate-800 text-base">Technical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Human Anatomy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physiology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Psychology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rehabilitation techniques</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patient assessment</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Therapeutic activities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Assistive technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Clinical documentation</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Personal Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Empathy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Observation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Creativity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Emotional maturity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Teamwork</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              A good Occupational Therapist must be able to understand the person&apos;s needs and design practical ways to help them become more independent.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Occupational Therapy a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              Occupational Therapy could be a good career choice if you:
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy Biology and healthcare</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like helping people</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have patience and empathy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy working directly with people</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are interested in rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like solving practical problems</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Want a career with both healthcare and human interaction</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">
              It may be particularly suitable for students who want to work in healthcare but are looking beyond traditional careers such as MBBS, Dentistry or Nursing.
            </p>
          </div>

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Occupational Therapy?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Choosing a career is not only about knowing which courses are available. It is also about understanding your interests, personality, strengths and skills.
            </p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">
              MentorMe&apos;s Career Assessment and Career Guidance can help students explore suitable career options and understand possible education pathways before making important decisions.
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
