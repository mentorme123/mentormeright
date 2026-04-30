"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Zap, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden bg-white">
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24 lg:py-40 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-brand-indigo/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-indigo/5 border border-brand-indigo/10 text-brand-indigo text-sm font-bold tracking-wide uppercase mb-4"
          >
            ✨ The Future of Career Intelligence
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tight text-brand-slate leading-[1.05]"
          >
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-emerald">Elite Career</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Propelling students beyond academics through science-backed psychometrics and AI-driven career roadmaps.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl shadow-brand-indigo/20 transition-all hover:scale-105 active:scale-95">
                Register Now
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-8 rounded-2xl border-2 border-slate-200 hover:border-brand-indigo hover:text-brand-indigo transition-all bg-white/50 backdrop-blur-sm">
                Login to Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Feature Section: Glass Cards */}
      <section className="py-32 px-4 bg-slate-50/50 relative">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-brand-slate uppercase tracking-tighter">Unrivaled Intelligence</h2>
            <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Psychometric Depth", 
                desc: "90-question professional evaluation mapping your DNA to 500+ global career paths.",
                icon: <Sparkles className="text-brand-indigo" size={32} />
              },
              { 
                title: "AI Roadmaps", 
                desc: "Instant 10-page hyper-personalised reports covering strengths, blindspots, and stream selection.",
                icon: <Zap className="text-brand-gold" size={32} />
              },
              { 
                title: "Expert Mentors", 
                desc: "1-on-1 sessions with elite counselors using our secure, unlimited video infrastructure.",
                icon: <Calendar className="text-brand-emerald" size={32} />
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[32px] space-y-6 group transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-indigo/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-slate">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-brand-slate rounded-[40px] p-12 lg:p-24 relative overflow-hidden text-center space-y-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-indigo/20 to-transparent"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Ready to unlock your <br /> true potential?</h2>
            <p className="text-blue-100/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Join 50,000+ students already using MentorMe to navigate their academic and professional journeys.
            </p>
            <div className="pt-6">
              <Link href="/register">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-slate font-black text-xl px-16 py-8 rounded-2xl shadow-xl transition-all hover:scale-105">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center text-white font-black text-sm">M</div>
            <span className="text-xl font-black tracking-tight text-brand-slate uppercase">MentorMe</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-400">
            <Link href="/privacy" className="hover:text-brand-indigo transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-indigo transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-brand-indigo transition-colors">Contact Us</Link>
          </div>
          <p className="text-sm font-bold text-slate-400">
            © {new Date().getFullYear()} MentorMe. Hyderabad, India.
          </p>
        </div>
      </footer>
    </div>
  );
}

