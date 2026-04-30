"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, BookOpen, Users, Globe, LayoutGrid, Menu, X } from "lucide-react";

export function Navbar() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    { name: "Career Library", href: "/career-library", icon: <BookOpen className="text-brand-orange" />, desc: "Explore 5000+ career paths" },
    { name: "AI Corner", href: "/ai-corner", icon: <Sparkles className="text-brand-blue" />, desc: "Personalized AI Roadmaps" },
    { name: "Counsellors", href: "/counsellors", icon: <Users className="text-emerald-500" />, desc: "Book 1-on-1 expert sessions" },
    { name: "Study Abroad", href: "/study-abroad", icon: <Globe className="text-purple-500" />, desc: "Apply to global universities" },
  ];

  return (
    <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-[100]">
      <div className="container mx-auto flex h-24 items-center justify-between px-6 lg:px-12">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 relative z-[101]">
          <div className="relative h-14 w-44 hover:scale-105 transition-transform duration-300">
            <Image 
              src="/logo.png" 
              alt="MentorMe Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 text-sm font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors text-slate-900">Home</Link>
            
            {/* Features Dropdown */}
            <div 
              className="relative group py-8"
              onMouseEnter={() => setIsFeaturesOpen(true)}
              onMouseLeave={() => setIsFeaturesOpen(false)}
            >
              <button className="flex items-center gap-2 hover:text-brand-blue transition-colors outline-none">
                Explore <ChevronDown size={16} className={`transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 grid grid-cols-1 gap-2"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100"></div>
                    {features.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group/item"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl group-hover/item:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400 font-medium lowercase tracking-normal">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link>
            <Link href="/blogs" className="hover:text-brand-blue transition-colors">Blogs</Link>
            <Link href="/contact" className="hover:text-brand-blue transition-colors">Contact</Link>
          </div>

          <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

          <div className="flex items-center gap-4">
            <Link href="/assessment">
              <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-black px-8 h-14 rounded-2xl shadow-xl shadow-brand-blue/20 transition-all hover:scale-105">
                Free Assessment
              </Button>
            </Link>
            <Link href="/login">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all cursor-pointer">
                <LayoutGrid size={20} />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-3 bg-slate-50 rounded-2xl text-slate-600 relative z-[101]"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[100] pt-32 px-8 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6 text-2xl font-black text-slate-800">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <div className="h-[1px] bg-slate-100"></div>
              {features.map(f => (
                <Link key={f.name} href={f.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-sm">{f.icon}</span>
                  {f.name}
                </Link>
              ))}
              <div className="h-[1px] bg-slate-100"></div>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
            <Link href="/assessment" className="mt-auto mb-12">
              <Button className="w-full py-8 bg-brand-orange text-white font-black text-xl rounded-2xl shadow-xl">
                Free Assessment Test
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

