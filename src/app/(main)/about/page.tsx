"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const leadership = [
    {
      name: "Vijay Kiran Agastya",
      role: "Founder & Managing Director",
      desc: "Ex-Deloitte Vice President | Trainer | Leadership Coach",
      image: "/images/vijay.jpg"
    },
    {
      name: "Sirisha Kode",
      role: "Chief Operating Officer",
      desc: "Finance Professional | Corporate Trainer",
      image: "/images/sirisha.jpg"
    }
  ];
  // ... (skipping to the render part in the next chunk)

  const features = [
    "Holistic Career Guidance Extensive",
    "Network of Counsellors and Industry Mentors",
    "Extensive Career Database",
    "Study Abroad Support",
    "Future-Ready Skill Development"
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
            About MentorMe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            We prioritize using a scientific approach rooted in deep self-awareness to guide career decisions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Our Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At MentorMe, our advanced AI technology is instrumental in conducting comprehensive psychometric and aptitude assessments, analyzing an individual’s personality, skills, and interests with precision. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Combining this deep data with the expertise of our seasoned counsellors, we ensure students and professionals make highly informed choices. We support our users from self-discovery to employability with training programs that bridge the gap between academic knowledge and industry requirements, preparing individuals for successful careers.
            </p>

            <ul className="space-y-4 pt-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="text-brand-orange" size={24} />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 rounded-3xl blur-3xl transform scale-105"></div>
            <Image 
              src="/images/counselor.png" 
              alt="Mentorship Session" 
              width={600} 
              height={500} 
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover h-[500px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Meet Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground mt-4">The visionaries behind MentorMe Right.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-background p-8 rounded-3xl shadow-lg border text-center space-y-4"
              >
                <div className="h-32 w-32 mx-auto relative rounded-full overflow-hidden border-4 border-brand-blue/10 mb-4">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{leader.name}</h3>
                <p className="text-brand-orange font-semibold">{leader.role}</p>
                <p className="text-muted-foreground">{leader.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
