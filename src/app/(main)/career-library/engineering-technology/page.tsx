import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careersData, Career } from "@/lib/data/careers";

export const metadata = {
  title: "Engineering & Technology | MentorMe Career Library",
  description: "Explore Engineering & Technology careers in India including Data Science, Software Engineering, AI/ML, and Cybersecurity. Learn about degrees, colleges, skills, salary and future scope.",
  alternates: {
    canonical: 'https://www.mentormeright.com/career-library/engineering-technology',
  },
};

const engineeringCareers = careersData.filter((c) => c.category === "Engineering & Technology");

export default function EngineeringTechnologyCareerPage() {
  const featured = engineeringCareers[0];

  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Engineering &amp; Technology
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Engineering &amp; Technology
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            {featured?.description || "Explore promising technology careers in India including Data Science, Software Engineering, AI/ML, and Cybersecurity."}
          </p>
          <div className="pt-2">
            <span className="text-sm text-white/80">{engineeringCareers.length}+ career roadmaps in this category</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {engineeringCareers.map((career, idx) => (
            <div key={career.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-brand-blue text-sm font-bold">
                <span>{idx + 1}]</span>
                <h2 className="text-2xl font-black text-slate-900">{career.title}</h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-base">{career.description}</p>

              {career.subjects_after_10th && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">What Subjects Should I Take After 10th?</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.subjects_after_10th}</p>
                </div>
              )}

              {career.maths_compulsory && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">Is Maths Compulsory for {career.title}?</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.maths_compulsory}</p>
                </div>
              )}

              {career.degree_choices && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">Which Degree Should I Choose?</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.degree_choices}</p>
                </div>
              )}

              {career.entrance_exams && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">Which Entrance Exams Should I Take?</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.entrance_exams}</p>
                </div>
              )}

              {career.best_colleges && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">Best Colleges for {career.title} in India</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.best_colleges}</p>
                </div>
              )}

              {career.future_scope && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">What Is the Future Scope of {career.title}?</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.future_scope}</p>
                </div>
              )}

              {career.skills_detailed && career.skills_detailed.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">What Skills Are Required to Become a {career.title}?</h3>
                  <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
                    {career.skills_detailed.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 size={18} className="text-brand-blue shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {career.is_good_career && (
                <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">Is {career.title} a Good Career for You?</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.is_good_career}</p>
                </div>
              )}

              {career.career_tip && (
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl space-y-3">
                  <h3 className="text-lg font-black text-slate-900">MentorMe Career Tip</h3>
                  <p className="text-slate-700 leading-relaxed text-base">{career.career_tip}</p>
                </div>
              )}

              {idx < engineeringCareers.length - 1 && (
                <div className="pt-2">
                  <Link href={`/career-library/emerging-careers?career=${career.id}`}>
                    <Button variant="outline" className="group">
                      View Full Roadmap <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}

          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Explore More Career Roadmaps</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Browse {engineeringCareers.length}+ Engineering & Technology careers with detailed roadmaps, salary insights, and skill requirements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/career-library">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">
                  Browse All Careers
                </Button>
              </Link>
              <Link href="/assessment">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">
                  Take Career Assessment
                </Button>
              </Link>
            </div>
            <p className="text-sm font-bold tracking-wider uppercase pt-4 text-white/80">MentorMe – Turning Passions into Professions.</p>
          </div>
        </div>
      </section>
    </>
  );
}
