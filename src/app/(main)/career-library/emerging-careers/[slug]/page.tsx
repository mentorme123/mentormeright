import Link from "next/link";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careersData, Career } from "@/lib/data/careers";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

function getCareer(slug: string): Career | undefined {
  const map: Record<string, string> = {
    "prompt-engineer": "car_emerging_prompt_engineer",
    "generative-ai-specialist": "car_emerging_generative_ai_specialist",
    "ai-product-manager": "car_emerging_ai_product_manager",
    "ai-ethics-specialist": "car_emerging_ai_ethics_specialist",
    "ai-trainer": "car_emerging_ai_trainer",
    "robotics-technician": "car_emerging_robotics_technician",
    "drone-technology-specialist": "car_emerging_drone_technology_specialist",
    "renewable-energy-specialist": "car_emerging_renewable_energy_specialist",
    "sustainability-consultant": "car_emerging_sustainability_consultant",
  };

  const id = map[slug];
  if (!id) return undefined;
  return careersData.find((c) => c.id === id);
}

export function generateStaticParams() {
  return [
    { slug: "prompt-engineer" },
    { slug: "generative-ai-specialist" },
    { slug: "ai-product-manager" },
    { slug: "ai-ethics-specialist" },
    { slug: "ai-trainer" },
    { slug: "robotics-technician" },
    { slug: "drone-technology-specialist" },
    { slug: "renewable-energy-specialist" },
    { slug: "sustainability-consultant" },
  ];
}

export default function EmergingCareerPage({ params }: Props) {
  const career = getCareer(params.slug);

  if (!career) {
    notFound();
  }

  const formatTitle = (title: string) => {
    const map: Record<string, string> = {
      "Prompt Engineer": "Prompt Engineer",
      "Generative AI Specialist": "Generative AI Specialist",
      "AI Product Manager": "AI Product Manager",
      "AI Ethics Specialist": "AI Ethics Specialist",
      "AI Trainer": "AI Trainer",
      "Robotics Technician": "Robotics Technician",
      "Drone Technology Specialist": "Drone Technology Specialist",
      "Renewable Energy Specialist": "Renewable Energy Specialist",
      "Sustainability Consultant": "Sustainability Consultant",
    };
    return map[title] || title;
  };

  const downloadMap: Record<string, string> = {
    "car_emerging_prompt_engineer": "242_Prompt Engineer.docx",
    "car_emerging_generative_ai_specialist": "243_Generative AI Specialist.docx",
    "car_emerging_ai_product_manager": "244_AI Product Manager.docx",
    "car_emerging_ai_ethics_specialist": "245_AI Ethics Specialist.docx",
    "car_emerging_ai_trainer": "246_AI Trainer.docx",
    "car_emerging_robotics_technician": "247_Robotics Technician.docx",
    "car_emerging_drone_technology_specialist": "248_Drone Technology Specialist.docx",
    "car_emerging_renewable_energy_specialist": "249_Renewable Energy Specialist.docx",
    "car_emerging_sustainability_consultant": "250_Sustainability Consultant.docx",
  };

  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Emerging Careers
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            {formatTitle(career.title)}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            {career.description}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">What does a {career.title} do?</h2>
            <p className="text-slate-700 leading-relaxed text-base">{career.description}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Salary Range</h2>
            <p className="text-slate-700 leading-relaxed text-base font-semibold text-brand-blue">{career.salary_range}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Education Path</h2>
            <p className="text-slate-700 leading-relaxed text-base">{career.education_path}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Skills Required</h2>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              {career.skills_required.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-brand-blue shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Future Scope</h2>
            <p className="text-slate-700 leading-relaxed text-base font-semibold text-emerald-700">{career.growth_outlook}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Download Material</h2>
            <p className="text-slate-700 leading-relaxed text-base">Download the complete course material for this career.</p>
                    <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold">
                      <a href={`/downloads/emerging-careers/${downloadMap[career.id] || `${career.id}.docx`}`} download>
                        <Download size={16} className="mr-2" /> Download Course Material
                      </a>
                    </Button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/career-library">
              <Button variant="outline" className="border-slate-200 text-slate-700 font-bold">
                ← Back to Career Library
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
