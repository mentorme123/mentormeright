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
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-brand-blue transition-colors text-foreground">Home</Link>
          <Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link>
          
          {/* Dropdown for remaining features */}
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

        <div className="flex items-center gap-3">
          <Link href="/assessment" className="hidden lg:block">
            <button className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-6 py-2.5 rounded-lg shadow-md shadow-brand-orange/20 animate-pulse-slow transition-all">
              Free Career Assessment Test
            </button>
          </Link>
          <Link href="/register" className="hidden sm:block">
            <button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md">Register</button>
          </Link>
          <Link href="/login">
            <button className="hidden sm:inline-flex font-semibold px-4 py-2 hover:bg-muted rounded-lg transition-colors text-slate-700">Log in</button>
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
