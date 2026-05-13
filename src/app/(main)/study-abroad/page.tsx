"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, GraduationCap, FileText, Landmark, ShieldCheck, MapPin, MessageSquare, Phone } from "lucide-react";
import { destinations } from "@/lib/data/study-abroad";

const pillars = [
  { 
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop", 
    title: "Academic Support", 
    desc: "Access scholarships, internships, and skill-building workshops for global success." 
  },
  { 
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop", 
    title: "Entrance Exam Prep", 
    desc: "Expert guidance for IELTS, TOEFL, GRE, GMAT, SAT, and PTE exams." 
  },
  { 
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", 
    title: "Expert Advisors", 
    desc: "Personalized mentorship on course selection and top-tier university shortlisting." 
  },
  { 
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop", 
    title: "Application & Visa", 
    desc: "End-to-end support for error-free applications and guaranteed visa processing." 
  },
  { 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", 
    title: "Stress-Free Process", 
    desc: "We handle the bureaucracy, so you can focus on your academic journey." 
  },
  { 
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop", 
    title: "Smooth Transition", 
    desc: "Assistance with housing, international banking, and local cultural orientation." 
  },
];

export default function StudyAbroadHub() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#001529]">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=2000&auto=format&fit=crop" 
            alt="Study Abroad" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 to-[#001529]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-6 py-2 bg-brand-orange text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl shadow-brand-orange/20">
              Global Education Hub
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mt-6">
              Your Gateway to <br />
              <span className="text-brand-orange italic underline decoration-white/30">Top Global Universities</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mt-6 font-medium leading-relaxed">
              From application to arrival, MentorMe provides a seamless journey to your dream international destination. Partnered with world-class agencies for 100% success.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="#destinations" className="px-10 py-5 bg-brand-blue text-white font-black text-lg rounded-2xl shadow-2xl hover:bg-brand-blue/90 transition-all hover:scale-105 flex items-center gap-3">
              Explore Destinations <ArrowRight />
            </Link>
            <a href="https://wa.me/+919392707596" target="_blank" className="px-10 py-5 bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-2xl hover:bg-emerald-600 transition-all hover:scale-105 flex items-center gap-3">
              <Phone size={20} /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">How We <span className="text-brand-blue">Support You</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Comprehensive end-to-end services designed to minimize your burden and maximize your chances of admission.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all group overflow-hidden"
            >
              <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">Top Study <span className="text-brand-orange">Destinations</span></h2>
              <p className="text-slate-500 text-lg">Select a country to explore top universities, visa info, and career growth.</p>
            </div>
            <Link href="/contact" className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2">
              Speak to an Advisor <MessageSquare size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-4xl font-black text-white mb-2">{dest.name}</h3>
                      <p className="text-slate-200 text-sm line-clamp-2 max-w-[250px]">{dest.description}</p>
                    </div>
                    <Link 
                      href={`/study-abroad/${dest.id}`}
                      className="w-14 h-14 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-45 transition-all duration-500"
                    >
                      <ArrowRight size={28} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white">Ready to Start Your <span className="text-brand-orange">Global Career?</span></h2>
          <p className="text-xl text-blue-100">Our experts have helped 500+ students secure admissions in top 1% global universities. Your success starts with a single click.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-12 py-5 bg-white text-brand-blue font-black text-xl rounded-2xl shadow-xl hover:bg-brand-orange hover:text-white transition-all hover:scale-105">
              Apply Now
            </Link>
            <a href="tel:+919392707596" className="px-12 py-5 border-2 border-white/30 text-white font-black text-xl rounded-2xl hover:bg-white/10 transition-all">
              Call Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
