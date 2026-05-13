"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/career-library", label: "Career Library" },
    { href: "/ai-corner", label: "AI Corner" },
    { href: "/career-simulator", label: "Career Simulator" },
    { href: "/exam-predictor", label: "Exam Predictor" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/alumni", label: "Alumni Network" },
    { href: "/community", label: "Community" },
    { href: "/gamify", label: "Gamify" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/counsellors", label: "Counsellors" },
    { href: "/study-abroad", label: "Study Abroad" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          {/* User's uploaded logo */}
          <div className="relative h-12 w-40">
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
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-muted-foreground">
          <Link href="/" className="relative group py-2">
            <span className="text-foreground group-hover:text-brand-blue transition-colors duration-300">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="relative group py-2">
            <span className="group-hover:text-brand-blue transition-colors duration-300">About Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* Dropdown for remaining features */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 font-extrabold text-brand-orange py-6 transition-transform hover:scale-105 active:scale-95">
              Our Programs <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[75px] left-1/2 -translate-x-1/2 w-64 bg-background border border-border rounded-2xl shadow-2xl py-3 flex flex-col gap-1 z-50 overflow-hidden"
                >
                  {[
                    { href: "/career-library", label: "Career Library" },
                    { href: "/ai-corner", label: "AI Corner", badge: true },
                    { href: "/career-simulator", label: "Career Simulator" },
                    { href: "/exam-predictor", label: "Exam Predictor" },
                    { href: "/scholarships", label: "Scholarships" },
                    { href: "/alumni", label: "Alumni Network" },
                    { href: "/community", label: "Community" },
                    { href: "/counsellors", label: "Counsellors" },
                    { href: "/study-abroad", label: "Study Abroad" },
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="px-5 py-2.5 hover:bg-brand-blue/5 text-sm font-semibold hover:text-brand-blue transition-all duration-300 flex items-center justify-between group/item"
                    >
                      <span className="group-hover/item:translate-x-1 transition-transform duration-300">{item.label}</span>
                      {item.badge && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
                        </span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blogs" className="relative group py-2">
            <span className="group-hover:text-brand-blue transition-colors duration-300">Blogs</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="relative group py-2">
            <span className="group-hover:text-brand-blue transition-colors duration-300">Contact Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/assessment" className="hidden lg:block">
            <button className="bg-[#FF7A1A] text-white hover:bg-[#FF7A1A]/90 hover:scale-105 active:scale-95 font-black px-7 py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 transition-all duration-300 text-[15px] tracking-tight">
              Free Assessment
            </button>
          </Link>
          <Link href="/register" className="hidden md:block">
            <button className="bg-[#1069C2] text-white hover:bg-[#1069C2]/90 hover:scale-105 active:scale-95 font-black px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/20 text-[15px] tracking-tight">
              Register
            </button>
          </Link>
          <Link href="/login" className="hidden sm:block">
            <button className="font-bold px-6 py-3.5 text-[#334155] hover:text-[#1069C2] transition-colors duration-300 text-[15px]">
              Log in
            </button>
          </Link>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {mobileLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-brand-blue/5 hover:text-brand-blue transition-all"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border mt-3 pt-4 space-y-3 px-4">
                <Link href="/assessment" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-3 rounded-xl shadow-md">
                    Free Career Assessment Test
                  </button>
                </Link>
                <div className="flex gap-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <button className="w-full font-semibold py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Log in</button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold py-2.5 rounded-xl transition-all shadow-sm">Register</button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
