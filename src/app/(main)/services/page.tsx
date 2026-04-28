"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap, Building2, Globe2, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const categories = [
    {
      title: "School Programs",
      icon: <BookOpen size={32} />,
      color: "text-brand-orange",
      bg: "bg-brand-orange/10",
      programs: [
        { name: "Robotics Training", desc: "Hands-on training, no lab investment, STEM integration." },
        { name: "AI Training Program", desc: "Generative AI, ML & NLP, Ethics & responsible AI." },
        { name: "Vedic Maths", desc: "Fast-Track Mental Math without tools, expert-led." }
      ]
    },
    {
      title: "College Programs",
      icon: <GraduationCap size={32} />,
      color: "text-brand-blue",
      bg: "bg-brand-blue/10",
      programs: [
        { name: "Machine Learning", desc: "Advanced ML training for engineering students." },
        { name: "Artificial Intelligence", desc: "Deep dive into AI architectures and deployment." },
        { name: "Deep Learning", desc: "Advanced AI neural networks training program." },
        { name: "Communication Skills", desc: "Essential soft skills and corporate communication." }
      ]
    },
    {
      title: "Corporate Programs",
      icon: <Building2 size={32} />,
      color: "text-purple-600",
      bg: "bg-purple-100",
      programs: [
        { name: "Digital Marketing", desc: "Comprehensive modern digital marketing strategies." },
        { name: "Python Full Stack", desc: "End-to-end web development with Python." },
        { name: "SAP FICO", desc: "Financial Accounting and Controlling training." },
        { name: "Power BI", desc: "Data analytics and business intelligence mastery." }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="bg-brand-blue/5 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-brand-blue"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            From deep psychometric evaluations to cutting-edge tech training, explore the comprehensive solutions offered by MentorMe.
          </motion.p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border shadow-sm bg-gradient-to-br from-background to-brand-orange/5"
          >
            <BrainCircuit className="text-brand-orange mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Career Assessments</h3>
            <p className="text-muted-foreground mb-6">
              Scientifically validated tools tailored for 6th-12th graders, college students, and professionals to uncover strengths and ideal career paths.
            </p>
            <Link href="/assessment">
              <Button className="bg-brand-orange text-white hover:bg-brand-orange/90">Take Assessment</Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl border shadow-sm bg-gradient-to-br from-background to-brand-blue/5"
          >
            <Globe2 className="text-brand-blue mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Study Abroad Support</h3>
            <p className="text-muted-foreground mb-6">
              In collaboration with United Educational Services (AIRC & British Council certified), we provide a seamless journey to top universities globally.
            </p>
            <Link href="/contact">
              <Button className="bg-brand-blue text-white hover:bg-brand-blue/90">Get Counselling</Button>
            </Link>
          </motion.div>
        </div>

        {/* Skill Training Categories */}
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Skill Training & Programs</h2>
            <p className="text-muted-foreground mt-4">Bridging the gap between academic knowledge and industry requirements.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border rounded-3xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`${cat.bg} p-8 text-center flex flex-col items-center justify-center border-b`}>
                  <div className={`${cat.color} mb-4`}>{cat.icon}</div>
                  <h3 className={`text-2xl font-bold ${cat.color}`}>{cat.title}</h3>
                </div>
                <div className="p-6 space-y-6">
                  {cat.programs.map((prog, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-bold flex items-center gap-2">
                        <Briefcase size={16} className="text-muted-foreground" />
                        {prog.name}
                      </h4>
                      <p className="text-sm text-muted-foreground pl-6">{prog.desc}</p>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t">
                    <Link href="/contact" className="text-sm font-semibold text-brand-blue hover:underline">
                      Inquire about these programs →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
