"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const leadership = [
    {
      name: "Vijay Kiran Agastya",
      role: "Co-Founder & Managing Director",
      desc: "Ex-Deloitte Vice President | Trainer | Leadership Coach",
      image: "/images/vijay_card.png"
    },
    {
      name: "Sirisha Kode",
      role: "Co-Founder & COO",
      desc: "Ex-Ernst & Young | Corporate Trainer | Women Leader",
      image: "/images/sirisha_card.png"
    },
    {
      name: "Santhi Vedula",
      role: "Advisor - Institutional Relationships",
      desc: "Senior Academician | Author | Research Scholar",
      image: "/images/santhi_card.png"
    }
  ];

  const features = [
    "Holistic Career Guidance Extensive",
    "Network of Counsellors and Industry Mentors",
    "Extensive Career Database",
    "Study Abroad Support",
    "Future-Ready Skill Development"
  ];

  const scrollImages = [
    "/images/session-6.jpg",
    "/images/session-5.jpg",
    "/images/session-1.jpg",
    "/images/session-2.jpg",
    "/images/session-3.jpg",
    "/images/session-4.jpg",
    "/images/about-screenshot.jpg",
    "/images/guidance-session.jpg",
    "/images/mentorme-session.jpg",
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
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
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
            <div className="relative rounded-3xl shadow-2xl border border-white/10 bg-white/90 p-6 overflow-hidden">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-brand-blue font-bold mb-2">COMING LIKE THESE</p>
                  <h3 className="text-2xl font-bold text-slate-900">Real MentorMe sessions in action</h3>
                  <p className="mt-2 text-sm text-slate-500">Browse through our student workshops, counseling moments, and career coaching events.</p>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl bg-slate-50">
                  <Image
                    src="/images/session-6.jpg"
                    alt="MentorMe session example"
                    width={720}
                    height={420}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl shadow-2xl border border-white/10 bg-white/90 p-6">
              <p className="text-xs uppercase tracking-[0.45em] text-brand-blue font-bold mb-4">Scroll through real moments</p>
              <div className="overflow-hidden rounded-3xl">
                <div className="flex gap-4 min-w-max animate-scroll-x py-2">
                  {[...scrollImages, ...scrollImages].map((src, index) => (
                    <div key={index} className="min-w-[260px] flex-shrink-0 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                      <Image
                        src={src}
                        alt={`Our Philosophy gallery ${index % scrollImages.length + 1}`}
                        width={320}
                        height={220}
                        className="object-cover w-full h-56"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes scroll-x {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-x {
                animation: scroll-x 24s linear infinite;
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Meet Our Leadership Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">The visionaries and experts driving the mission behind MentorMe Right.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {leadership.map((leader, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 bg-white"
              >
                <div className="relative aspect-[334/423] w-full">
                  <Image 
                    src={leader.image} 
                    alt={leader.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                  />
                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-700"></div>
                </div>
                
                {/* Hidden text for SEO/Accessibility */}
                <div className="sr-only">
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                  <p>{leader.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
