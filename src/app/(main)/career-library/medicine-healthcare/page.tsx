import Link from "next/link";
import { CheckCircle2, HeartPulse, Stethoscope, Award, GraduationCap, DollarSign, TrendingUp, Brain, UserCheck, HelpCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Medicine & Healthcare | MentorMe Career Library",
  description: "Explore Medicine & Healthcare careers in India including MBBS, Nursing, Physiotherapy, and Occupational Therapy. Learn about degrees, colleges, skills, salary and future scope.",
};

export default function MedicineHealthcareCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Medicine &amp; Healthcare
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Medicine &amp; Healthcare
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
            <p className="text-slate-700 leading-relaxed text-base">An Occupational Therapist helps people develop, recover or maintain skills needed for daily living and working.</p>
            <p className="font-bold text-slate-800 text-base">Depending on the setting, an Occupational Therapist may work on:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rehabilitation after injury or illness</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Child development and early intervention</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mental health and wellbeing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Geriatric care and ageing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physical disabilities</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Neurological conditions</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Adaptive equipment and assistive technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Home and workplace modifications</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Sensory integration</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Community-based rehabilitation</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Occupational Therapists work in hospitals, rehabilitation centres, schools, special education settings, community health, mental health facilities, nursing homes and independent practice.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">For students interested in Occupational Therapy, the most relevant school pathway after Class 10 is Science with Biology.</p>
            <p className="font-bold text-slate-800 text-base">Recommended subjects include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Biology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Physics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Chemistry</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> English</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Psychology, if available</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Biology is especially important because Occupational Therapy involves understanding the human body, development, conditions and rehabilitation. Psychology is also valuable because the profession involves understanding behaviour, motivation and mental health.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is NEET Required for Occupational Therapy?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">NEET is not always compulsory for Occupational Therapy programmes in India. Some institutions admit students based on Class 12 marks, institution-specific entrance examinations or other eligibility criteria, while others may consider NEET scores depending on their admission policy. Because admission criteria vary by institution, students should check the latest requirements of the colleges they are targeting before applying.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The standard entry-level qualification for Occupational Therapy in India is a Bachelor of Occupational Therapy (BOT).</p>
            <p className="font-bold text-slate-800 text-base">Relevant programmes include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Bachelor of Occupational Therapy (BOT)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. in Occupational Therapy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Diploma in Occupational Therapy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Master of Occupational Therapy (MOT)</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">A Bachelor of Occupational Therapy programme typically includes classroom learning, practical training, clinical internships and fieldwork in hospitals, rehabilitation centres and community settings.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The entrance examination depends on the institution and programme you choose.</p>
            <p className="font-bold text-slate-800 text-base">Depending on the college, students may encounter:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institution-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NEET, where required by the institution</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Merit-based admission</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> State-level or university-level admission processes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Students should verify the latest admission requirements of the institutions they are applying to, because criteria can change.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Occupational Therapy in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Students should look for institutions with strong clinical exposure, recognised programmes, experienced faculty, good hospital or rehabilitation centre affiliations and practical training opportunities.</p>
            <p className="font-bold text-slate-800 text-base">Some well-known institutions include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Christian Medical College (CMC), Vellore</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> All India Institute of Physical Medicine and Rehabilitation (AIIPMR), Mumbai</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SRM Institute of Science and Technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Manipal Academy of Higher Education</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Jamia Millia Islamia</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> KIIT University</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other recognised institutions offering Occupational Therapy programmes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Always check the latest programme structure, accreditation and admission requirements before applying.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Occupational Therapist Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The salary of an Occupational Therapist in India varies depending on qualification, experience, employer, location and specialisation.</p>
            <p className="font-bold text-slate-800 text-base">Career progression can include:</p>
            <p className="text-slate-700 leading-relaxed text-base">Trainee / Junior Occupational Therapist → Occupational Therapist → Senior Occupational Therapist → Specialist / Team Lead → Head of Department / Independent Practitioner</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Experienced Occupational Therapists may also work in rehabilitation management, teaching, research or start their own practice.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              Future Scope of Occupational Therapy
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Occupational Therapy in India is growing because of increased awareness of rehabilitation, child development, mental health, geriatric care and community-based services.</p>
            <p className="font-bold text-slate-800 text-base">Career opportunities exist in:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hospitals</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rehabilitation centres</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Special schools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Community health</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mental health</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Geriatric care</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Paediatrics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Neurology and rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Research and academia</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Independent practice</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Emerging areas include paediatric occupational therapy, neurorehabilitation, mental health, geriatric care, community rehabilitation and assistive technology.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become an Occupational Therapist
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Occupational Therapy requires a combination of medical, psychological, practical and interpersonal skills.</p>
            <p className="font-bold text-slate-800 text-base">Clinical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Assessment and evaluation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Treatment planning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rehabilitation techniques</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Adaptive equipment</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Sensory integration</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hand therapy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Neurological rehabilitation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Paediatric care</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Interpersonal Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Empathy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Observation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Teamwork</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Creativity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Occupational Therapy a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Occupational Therapy could be a good career choice if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy helping people</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are interested in healthcare</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have good observation skills</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy working with children or older people</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are patient and empathetic</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Can combine creativity with practical work</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Want a stable healthcare career</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">It may not be suitable if you are uncomfortable with clinical settings, long hours of standing or working with patients who have complex needs. It may be particularly suitable for students who want to work in healthcare but are looking beyond traditional careers such as MBBS, Dentistry or Nursing.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Occupational Therapy?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing a career is not only about knowing which courses are available. It is also about understanding your interests, personality, strengths and skills.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">MentorMe&apos;s Career Assessment and Career Guidance can help students explore suitable career options and understand possible education pathways before making important decisions.</p>
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