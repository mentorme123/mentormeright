"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, BookOpen, Users, Globe, Menu, X, Rocket } from "lucide-react";

export function Navbar() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    { name: "Career Library", href: "/career-library", icon: <BookOpen />, color: "bg-orange-50 text-brand-orange", desc: "5000+ Career Paths" },
    { name: "AI Corner", href: "/ai-corner", icon: <Sparkles />, color: "bg-blue-50 text-brand-blue", desc: "AI Roadmap Engine" },
    { name: "Counsellors", href: "/counsellors", icon: <Users />, color: "bg-emerald-50 text-emerald-600", desc: "Expert Mentorship" },
    { name: "Study Abroad", href: "/study-abroad", icon: <Globe />, color: "bg-purple-50 text-purple-600", desc: "Global Admissions" },
  ];

  return (
    <nav className="w-full sticky top-0 z-[100] px-4 py-4 pointer-events-none">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white/90 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,21,41,0.08)] rounded-[2rem] px-8 h-20 flex items-center justify-between pointer-events-auto relative overflow-hidden">
          
          {/* Brand Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-orange to-brand-blue opacity-80"></div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-36 transition-transform duration-500 group-hover:scale-105">
              <Image src="/logo.png" alt="MentorMe" fill className="object-contain" priority />
            </div>
          </Link>
          
          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-bold text-slate-600 hover:text-brand-blue transition-all">Home</Link>
              
              <div 
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setIsFeaturesOpen(true)}
                onMouseLeave={() => setIsFeaturesOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-sm font-bold text-slate-600 group-hover:text-brand-blue transition-all">
                  Programs <ChevronDown size={14} className={`transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isFeaturesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    >
                      <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 w-[480px] grid grid-cols-2 gap-2">
                        {features.map((f) => (
                          <Link 
                            key={f.name} 
                            href={f.href}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all group/item"
                          >
                            <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center text-lg`}>
                              {f.icon}
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-800">{f.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{f.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/blogs" className="text-sm font-bold text-slate-600 hover:text-brand-blue transition-all">Blogs</Link>
              <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-brand-blue transition-all">Contact</Link>
            </div>

            <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-bold text-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 px-5">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-6 rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5">
                  Register
                </Button>
              </Link>
              <Link href="/assessment">
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-black px-6 rounded-xl shadow-lg shadow-brand-blue/20 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  Take Test <Rocket size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-28 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 z-[100] flex flex-col gap-6 pointer-events-auto"
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map(f => (
                <Link key={f.name} href={f.href} onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl">
                  <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center`}>{f.icon}</div>
                  <span className="text-xs font-black text-slate-800">{f.name}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/login" className="text-center font-bold text-slate-600">Login</Link>
              <Link href="/register">
                <Button className="w-full bg-brand-orange text-white font-black py-6 rounded-2xl">Register Now</Button>
              </Link>
              <Link href="/assessment">
                <Button className="w-full bg-brand-blue text-white font-black py-6 rounded-2xl">Free Assessment</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

