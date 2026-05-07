"use client";

import { motion } from "framer-motion";
import { Search, BrainCircuit, Users, BookOpen, GraduationCap, Globe2, Briefcase, FileSearch } from "lucide-react";
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
      { img: "/images/school.png", title: "Vedic Maths Training Program", highlights: "Fast-Track Mental Math | No Tools Needed | Expert-Led" },
      { img: "/images/school.png", title: "AI Training Program", highlights: "Hands-on projects | Generative AI ML & NLP | Ethics & responsible AI" },
      { img: "/images/school.png", title: "Robotics Training Program", highlights: "Hands-on training | No lab investment | Robotics Expo" }
    ],
    colleges: [
      { img: "/images/school.png", title: "Machine Learning Training", highlights: "Advanced ML training for engineering students | Practical projects" },
      { img: "/images/school.png", title: "Deep Learning Program", highlights: "Advanced AI neural networks training program | Certification" },
      { img: "/images/school.png", title: "Communication Skills", highlights: "Essential soft skills | Corporate communication | Interview Prep" }
    ],
    working_professionals: [
      { img: "/images/professional.png", title: "Digital Marketing", highlights: "Comprehensive modern digital marketing strategies | SEO & SEM" },
      { img: "/images/professional.png", title: "Python Full Stack", highlights: "End-to-end web development with Python | Hands-on coding" },
      { img: "/images/professional.png", title: "SAP FICO / Power BI", highlights: "Financial Accounting and Controlling | Data analytics mastery" }
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

          {/* 4 Core Service Icons */}
          <div className="flex flex-wrap justify-between items-center gap-8 border-b pb-12">
            {[
              { title: "Career Assessments", icon: <FileSearch size={32} className="text-white" />, id: "assessments" },
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

      {/* Career Assessments Section */}
      <section id="assessments" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold">Career Assessments</h2>
          <p className="text-muted-foreground max-w-4xl text-lg leading-relaxed">
            Unlock your full potential with our scientifically validated career assessments. Whether you're a student, a working professional, or someone exploring a career change, our tools provide deep insights into your strengths, preferences, and ideal career paths.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { img: "/images/school.png", title: "Psychometric Assessment Test for 11th-12th grade students" },
              { img: "/images/school.png", title: "Psychometric Assessment Test for 8th-10th grade students" },
              { img: "/images/school.png", title: "Psychometric Assessment Test for 6th-7th grade students" },
              { img: "/images/professional.png", title: "Psychometric Assessment Test for College & Professionals" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="h-40 relative bg-slate-200">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col space-y-4">
                  <h3 className="font-bold text-md flex-1">{item.title}</h3>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link href="/assessment">
                      <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">Know More</Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Guidance Section */}
      <section id="guidance" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="border border-blue-200 rounded-3xl p-8 lg:p-12 shadow-sm">
            <h2 className="text-4xl font-bold mb-8">Career Guidance</h2>
            
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
          <h2 className="text-4xl font-bold mb-8">Skill Training</h2>
          
          <div className="flex flex-wrap gap-4 mb-12">
            {[
              { id: "schools", label: "For Schools" },
              { id: "colleges", label: "For Colleges" },
              { id: "working_professionals", label: "For Working Professionals" }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setSkillTab(tab.id)}
                className={`px-8 py-3 rounded-full border transition-all ${skillTab === tab.id ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillPrograms[skillTab as keyof typeof skillPrograms].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="h-56 relative bg-slate-200">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <div className="flex-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Key Highlights</span>
                    <p className="text-sm font-medium">{item.highlights}</p>
                  </div>
                  <div className="flex gap-4 pt-4 mt-auto">
                    <Link href="/contact" className="flex-1">
                      <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">Know More</Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad Section */}
      <section id="abroad" className="py-20 px-4 bg-brand-blue text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
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
