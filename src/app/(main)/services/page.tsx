"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Globe2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const [guidanceTab, setGuidanceTab] = useState("institutions");
  const [skillTab, setSkillTab] = useState("schools");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const skillPrograms = {
    schools: [
      { img: "/images/programs/vedic-maths.png", title: "Vedic Maths Training Program", highlights: "Fast-Track Mental Math | No Tools Needed | Expert-Led" },
      { img: "/images/programs/ai-school.png", title: "AI Training Program", highlights: "Hands-on projects | Generative AI ML & NLP | Ethics & responsible AI" },
      { img: "/images/programs/robotics.png", title: "Robotics Training Program", highlights: "Hands-on training | No lab investment | Robotics Expo" }
    ],
    colleges: [
      { img: "/images/programs/ml.png", title: "Machine Learning Training", highlights: "Advanced ML training for engineering students | Practical projects" },
      { img: "/images/programs/deep-learning.png", title: "Deep Learning Program", highlights: "Advanced AI neural networks training program | Certification" },
      { img: "/images/programs/communication.png", title: "Communication Skills", highlights: "Essential soft skills | Corporate communication | Interview Prep" }
    ],
    working_professionals: [
      { img: "/images/programs/digital-marketing.png", title: "Digital Marketing", highlights: "Comprehensive modern digital marketing strategies | SEO & SEM" },
      { img: "/images/programs/python.png", title: "Python Full Stack", highlights: "End-to-end web development with Python | Hands-on coding" },
      { img: "/images/programs/sap-fico.png", title: "SAP FICO / Power BI", highlights: "Financial Accounting and Controlling | Data analytics mastery" }
    ]
  };

  const guidancePrograms = {
    institutions: [
      { title: "6th-7th Class Students", desc: "Discover strengths early! MentorMe guides young minds toward the right academic & career path." },
      { title: "8th-10th Class Students", desc: "Critical phase? We help pick subjects & careers with science-backed assessments & expert advice." },
      { title: "11th-12th Class Students", desc: "Decide your future confidently — exams, colleges, careers. MentorMe's guidance ensures no regrets." },
      { title: "College Students", desc: "Have you lost in career options? AI + mentors help you strategize, skill up, and land dream roles." },
    ],
    professionals: [
      { title: "Career Transition", desc: "Looking to switch fields? We analyze your transferable skills and guide your successful transition." },
      { title: "Upskilling Roadmap", desc: "Identify the exact skills and certifications needed to secure that promotion or pay raise." },
      { title: "Resume & Interview Prep", desc: "Expert optimization of your professional profile and mock interviews with industry leaders." },
      { title: "Executive Coaching", desc: "1-on-1 mentorship for mid-to-senior professionals aiming for leadership positions." },
    ]
  };

  const programHierarchy = {
    k12: {
      title: "K-12 Students",
      sections: [
        { title: "Future Readiness Skills", href: "/k12/future-readiness" },
        { title: "Communication & Leadership", href: "/k12/communication" },
        {
          title: "STEM & Emerging Technologies",
          children: [
            { title: "Robotics", href: "/k12/stem/robotics" },
            { title: "Coding", href: "/k12/stem/coding" },
            { title: "IoT", href: "/k12/stem/iot" },
            { title: "AI for School Students", href: "/k12/stem/ai" },
            { title: "Drones", href: "/k12/stem/drones" },
          ]
        },
        { title: "Digital Literacy", href: "/k12/digital-literacy" },
        { title: "Career & Life Skills", href: "/k12/career-life" },
      ]
    },
    college: {
      title: "College Students",
      sections: [
        { title: "Employability Skills", href: "/college/employability" },
        { title: "Business & Professional Skills", href: "/college/business" },
        { title: "Digital & Analytics Skills", href: "/college/digital-analytics" },
        { title: "Finance & Commerce Skills", href: "/college/finance" },
        { title: "Entrepreneurship & Innovation", href: "/college/entrepreneurship" },
      ]
    },
    corporate: {
      title: "Corporate Professionals",
      sections: [
        { title: "Leadership Excellence", href: "/corporate/leadership" },
        { title: "Business Excellence", href: "/corporate/business" },
        { title: "Digital Transformation", href: "/corporate/digital" },
        { title: "Workplace Effectiveness", href: "/corporate/workplace" },
        { title: "Finance, Compliance & Risk", href: "/corporate/finance-compliance" },
      ]
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <section className="bg-brand-blue/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            <span>|</span>
            <span>Services</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Our Services
          </motion.h1>

          {/* 3 Core Service Icons */}
          <div className="flex flex-wrap justify-center items-center gap-16 border-b pb-12">
            {[
              { title: "Career Guidance", icon: <Users size={32} className="text-white" />, id: "guidance" },
              { title: "Skill Training", icon: <BookOpen size={32} className="text-white" />, id: "skills" },
              { title: "Study Abroad", icon: <Globe2 size={32} className="text-white" />, id: "abroad" }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 cursor-pointer group"
                onClick={() => scrollToSection(service.id)}
              >
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:bg-blue-700 transition-all">
                  {service.icon}
                </div>
                <span className="font-semibold text-lg">{service.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Career Guidance Section */}
      <section id="guidance" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="border border-blue-200 rounded-3xl p-8 lg:p-12 shadow-sm">
            <h2 className="text-4xl font-bold mb-4">Career Guidance</h2>
            <p className="text-slate-500 text-lg mb-10">Scientifically validated psychometric assessments for every stage of life.</p>

            {/* Auto-scrolling Assessment Cards Carousel */}
            <div className="relative overflow-hidden mb-12">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="flex gap-6 guidance-scroll">
                {[
                  { img: "/images/professional.png", title: "One to one career Guidance for college students", audience: "UG" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 11th-12th grade students", audience: "GR" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 8th-10th grade students", audience: "ST" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 6th-7th grade students", audience: "ST" },
                  // Duplicated for seamless loop
                  { img: "/images/professional.png", title: "One to one career Guidance for college students", audience: "UG" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 11th-12th grade students", audience: "GR" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 8th-10th grade students", audience: "ST" },
                  { img: "/images/school.png", title: "Group counseling sessions in schools for 6th-7th grade students", audience: "ST" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                    style={{ width: "260px" }}
                  >
                    <div className="h-44 relative bg-slate-200">
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col space-y-4">
                      <h3 className="font-bold text-sm flex-1 leading-snug">{item.title}</h3>
                      <div className="flex flex-col gap-2 mt-auto">
                        <Link href={`/assessment?audience=${item.audience}`}>
                          <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 text-sm">Know More</Button>
                        </Link>
                        <Link href="/contact">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">Contact Us</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              .guidance-scroll {
                animation: scroll-guidance 18s linear infinite;
                width: max-content;
              }
              .guidance-scroll:hover {
                animation-play-state: paused;
              }
              @keyframes scroll-guidance {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>

            <div className="flex gap-4 mb-12">
              <button
                onClick={() => setGuidanceTab("institutions")}
                className={`px-8 py-3 rounded-full border transition-all ${guidanceTab === "institutions" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                For Institutions
              </button>
              <button
                onClick={() => setGuidanceTab("professionals")}
                className={`px-8 py-3 rounded-full border transition-all ${guidanceTab === "professionals" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                For Working Professionals
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {guidancePrograms[guidanceTab as keyof typeof guidancePrograms].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border flex flex-col h-full hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>
                  <Link href="/contact" className="mt-auto">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">View Program Details</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Training Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-8"
          >
            Skill Training
          </motion.h2>

          <p className="text-slate-500 text-lg mb-8">
            └── <span className="font-semibold text-slate-700">21st Century Skills Hub</span>
          </p>

          <div className="space-y-10">
            {(Object.keys(programHierarchy) as Array<keyof typeof programHierarchy>).map((key) => {
              const category = programHierarchy[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    {key !== "k12" && <span className="text-slate-400">│</span>}
                    <span className={key === "k12" ? "text-blue-700" : key === "college" ? "text-green-700" : "text-orange-700"}>
                      {category.title}
                    </span>
                  </h3>

                  <div className="space-y-4 ml-4">
                    {category.sections.map((section, i) => (
                      <div key={i}>
                        {"children" in section ? (
                          <div className="ml-4 space-y-1">
                            <h4 className="font-bold text-slate-800 text-base">├── {section.title}</h4>
                            <ul className="ml-6 space-y-1 border-l-2 border-slate-100 pl-4">
                              {(section.children || []).map((child, j) => (
                                <li key={j}>
                                  <Link
                                    href={child.href}
                                    className="text-sm text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 rounded px-2 py-1 transition-all block"
                                  >
                                    {'  '}├── {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">│</span>
                            <Link
                              href={section.href}
                              className="text-slate-700 hover:text-brand-blue bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                            >
                              {'├── '}{section.title}
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Study Abroad Section */}
      <section id="abroad" className="py-24 px-4 bg-gradient-to-br from-brand-blue to-[#112D55] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <Globe2 size={64} className="mx-auto text-brand-orange" />
          <h2 className="text-4xl font-bold">Study Abroad Support</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Ready to take your education global? Partnering with certified agencies, we guide you to top universities worldwide.
          </p>
          <Link href="/study-abroad">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-6 text-lg rounded-xl shadow-xl">
              Explore Destinations
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
