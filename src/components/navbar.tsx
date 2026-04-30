"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
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
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-brand-blue transition-colors text-foreground">Home</Link>
          <Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="hover:text-brand-blue transition-colors flex items-center gap-1 font-bold text-brand-orange py-6">
              Our Programs <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-56 bg-background border border-border rounded-xl shadow-lg py-2 flex flex-col gap-1 z-50">
                <Link href="/career-library" className="px-4 py-2 hover:bg-muted text-sm font-medium hover:text-brand-blue transition-colors">Career Library</Link>
                <Link href="/ai-corner" className="px-4 py-2 hover:bg-muted text-sm font-medium hover:text-brand-blue transition-colors flex items-center justify-between">
                  AI Corner 
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                  </span>
                </Link>
                <Link href="/counsellors" className="px-4 py-2 hover:bg-muted text-sm font-medium hover:text-brand-blue transition-colors">Counsellors</Link>
                <Link href="/study-abroad" className="px-4 py-2 hover:bg-muted text-sm font-medium hover:text-brand-blue transition-colors">Study Abroad</Link>
              </div>
            )}
          </div>

          <Link href="/blogs" className="hover:text-brand-blue transition-colors">Blogs</Link>
          <Link href="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/assessment">
            <Button className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-6 shadow-md shadow-brand-orange/20 animate-pulse-slow">
              Free Career Assessment Test
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold">Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600 hover:text-brand-blue transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm lg:hidden flex justify-end"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="font-black text-brand-blue text-lg">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-brand-orange transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-base font-bold text-slate-700">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Home</Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">About Us</Link>
                  <Link href="/career-library" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Career Library</Link>
                  <Link href="/ai-corner" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors flex items-center gap-2">
                    AI Corner <span className="bg-brand-orange text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                  </Link>
                  <Link href="/counsellors" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Counsellors</Link>
                  <Link href="/study-abroad" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Study Abroad</Link>
                  <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Blogs</Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Contact Us</Link>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex flex-col gap-3 bg-slate-50">
                <Link href="/assessment" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold shadow-md">
                    Free Assessment
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue font-bold hover:bg-brand-blue hover:text-white">Log in</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 font-bold">Register</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

