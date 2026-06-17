"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Brain, Briefcase, BookOpen, Globe2, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-brand-blue/[0.06] to-background overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight"
          >
            About <span className="text-brand-orange">MentorMe</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            A scientific approach to career clarity, powered by advanced AI and guided by expert counsellors.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At MentorMe, we prioritize using a scientific approach rooted in deep self-awareness to guide career decisions. Our advanced AI technology is instrumental in conducting comprehensive psychometric and aptitude assessments, analyzing an individual’s personality, skills, and interests with precision. Combining this with the expertise of our counsellors, we ensure students and professionals make informed choices.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At MentorMe, we support from self-discovery to employability with our training programs that bridge the gap between academic knowledge and industry requirements, preparing individuals for successful careers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-orange/20 rounded-3xl blur-3xl transform scale-105" />
            <Image
              src="/images/mentorme-session.jpg"
              alt="MentorMe Session with students"
              width={600}
              height={500}
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[400px] lg:h-[500px]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-brand-blue/[0.03]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose <span className="text-brand-orange">MentorMe?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology, expert guidance, and a holistic approach to empower careers beyond classrooms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-brand-orange" />,
                title: "Holistic Career Guidance",
                desc: "Science-backed psychometric assessments and personalized career roadmaps tailored to every individual's unique profile."
              },
              {
                icon: <Briefcase className="w-8 h-8 text-brand-orange" />,
                title: "Extensive Network of Counsellors",
                desc: "Access to a wide network of expert counsellors and industry mentors who provide real-world insights and guidance."
              },
              {
                icon: <BookOpen className="w-8 h-8 text-brand-orange" />,
                title: "Extensive Career Database",
                desc: "Explore 250+ career pathways with detailed information on skills, qualifications, and growth opportunities."
              },
              {
                icon: <Globe2 className="w-8 h-8 text-brand-orange" />,
                title: "Study Abroad Support",
                desc: "Complete guidance for international education, from university selection to application and visa preparation."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-brand-orange" />,
                title: "Future-Ready Skill Development",
                desc: "Industry-aligned training programs that bridge the gap between academic knowledge and real-world employability."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-orange rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-blue to-brand-blue/90 p-10 md:p-16 text-center shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Ready to discover your true potential?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Take the first step towards a fulfilling career with MentorMe's scientifically-backed assessments and expert mentorship.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/assessment">
                  <button className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-8 py-4 rounded-full shadow-xl transition-transform hover:scale-105">
                    Start Career Assessment
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/30 transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
