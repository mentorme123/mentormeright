"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSiteSearch();

  const handleSubmenuClick = (submenu: string) => {
    setActiveSubmenu((prev) => (prev === submenu ? null : submenu));
  };

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/ai-learning-hub", label: "AI Learning Hub" },
    { href: "/career-library", label: "Career Library" },
    { href: "/career-assessment.html", label: "Career Assessment", external: true },
    { href: "/career-simulator", label: "Career Simulator" },
    { href: "/counsellors", label: "Counsellors" },
    { href: "/k12-programs", label: "K12 Programs" },
    { href: "/college-programs", label: "College Programs" },
    { href: "/study-abroad", label: "Study Abroad" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <SiteSearch isOpen={isSearchOpen} onClose={closeSearch} />

      <nav className="w-full border-b border-brand-blue/10 bg-gradient-to-r from-brand-blue/[0.04] to-brand-orange/[0.04] backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-[1700px] mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 gap-2">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-12 w-36 lg:h-14 lg:w-44 shrink-0 flex items-center justify-center">
              <img
                src="/logo.png?v=2"
                alt="MentorMe Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-3 xl:gap-5 text-[14px] font-bold text-slate-800 whitespace-nowrap shrink">
            <Link
              href="/"
              className="relative group py-2"
            >
              <span className="text-foreground group-hover:text-brand-blue transition-colors duration-300">
                Home
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/about"
              className="relative group py-2"
            >
              <span className="group-hover:text-brand-blue transition-colors duration-300">
                About Us
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsAiDropdownOpen(true)}
              onMouseLeave={() => setIsAiDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-brand-blue py-6 transition-colors duration-300"
                aria-expanded={isAiDropdownOpen}
                onFocus={() => setIsAiDropdownOpen(true)}
                onBlur={() => setIsAiDropdownOpen(false)}
              >
                <Link href="/ai-learning-hub" className="hover:text-brand-blue">
                  AI Learning Hub
                </Link>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isAiDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAiDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[240px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4">
                    <ul className="space-y-1">
                      <li><Link href="/ai-learning-hub/ai-foundations" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-3 py-2 rounded-lg hover:bg-brand-blue/5 block">AI Foundations</Link></li>
                      <li><Link href="/ai-learning-hub/generative-ai" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-3 py-2 rounded-lg hover:bg-brand-blue/5 block">Generative AI</Link></li>
                      <li><Link href="/ai-learning-hub/ai-for-business" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-3 py-2 rounded-lg hover:bg-brand-blue/5 block">AI for Business</Link></li>
                      <li><Link href="/ai-learning-hub/ai-for-educators" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-3 py-2 rounded-lg hover:bg-brand-blue/5 block">AI for Educators</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-brand-blue py-6 transition-colors duration-300"
                aria-expanded={isDropdownOpen}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setIsDropdownOpen(false)}
              >
                MentorMe Learning Ecosystem{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[900px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex p-6 gap-8">
                    {/* AI Learning Hub */}
                    <div className="w-1/4">
                      <h3 className="font-bold text-brand-orange text-sm uppercase tracking-wider mb-4">AI Learning Hub</h3>
                      <ul className="space-y-2">
                        <li><Link href="/ai-learning-hub/ai-foundations" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">AI Foundations</Link></li>
                        <li><Link href="/ai-learning-hub/generative-ai" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Generative AI</Link></li>
                        <li><Link href="/ai-learning-hub/ai-for-business" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">AI for Business</Link></li>
                        <li><Link href="/ai-learning-hub/ai-for-educators" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">AI for Educators</Link></li>
                      </ul>
                    </div>

                    {/* 21st Century Skills Hub */}
                    <div className="w-3/4 border-l border-slate-100 pl-8">
                      <h3 className="font-bold text-brand-blue text-sm uppercase tracking-wider mb-4">21st Century Skills Hub</h3>
                      <div className="grid grid-cols-3 gap-6">
                        {/* K-12 */}
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-3">K-12 Students</h4>
                          <ul className="space-y-1">
                            <li><Link href="/k12/future-readiness" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Future Readiness Skills</Link></li>
                            <li><Link href="/k12/communication" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Communication & Leadership</Link></li>
                            <li className="px-2 py-1">
                              <span className="text-[11px] font-bold text-slate-800 block mb-1">STEM & Emerging Tech:</span>
                              <ul className="pl-2 space-y-0.5 border-l-2 border-brand-blue/20">
                                <li><Link href="/k12/stem/robotics" className="text-[11px] font-medium text-slate-500 hover:text-brand-blue transition-colors px-2 py-1 rounded block hover:bg-brand-blue/5">Robotics</Link></li>
                                <li><Link href="/k12/stem/coding" className="text-[11px] font-medium text-slate-500 hover:text-brand-blue transition-colors px-2 py-1 rounded block hover:bg-brand-blue/5">Coding</Link></li>
                                <li><Link href="/k12/stem/iot" className="text-[11px] font-medium text-slate-500 hover:text-brand-blue transition-colors px-2 py-1 rounded block hover:bg-brand-blue/5">IoT</Link></li>
                                <li><Link href="/k12/stem/ai" className="text-[11px] font-medium text-slate-500 hover:text-brand-blue transition-colors px-2 py-1 rounded block hover:bg-brand-blue/5">AI for School Students</Link></li>
                                <li><Link href="/k12/stem/drones" className="text-[11px] font-medium text-slate-500 hover:text-brand-blue transition-colors px-2 py-1 rounded block hover:bg-brand-blue/5">Drones</Link></li>
                              </ul>
                            </li>
                            <li><Link href="/k12/digital-literacy" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Digital Literacy</Link></li>
                            <li><Link href="/k12/career-life" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Career & Life Skills</Link></li>
                          </ul>
                        </div>

                        {/* College */}
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-3">College Students</h4>
                          <ul className="space-y-1">
                            <li><Link href="/college/employability" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Employability Skills</Link></li>
                            <li><Link href="/college/business" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Business & Professional Skills</Link></li>
                            <li><Link href="/college/digital-analytics" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Digital & Analytics Skills</Link></li>
                            <li><Link href="/college/finance" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Finance & Commerce Skills</Link></li>
                            <li><Link href="/college/entrepreneurship" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Entrepreneurship & Innovation</Link></li>
                          </ul>
                        </div>

                        {/* Corporate */}
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-3">Corporate Professionals</h4>
                          <ul className="space-y-1">
                            <li><Link href="/corporate/leadership" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Leadership Excellence</Link></li>
                            <li><Link href="/corporate/business" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Business Excellence</Link></li>
                            <li><Link href="/corporate/digital" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Digital Transformation</Link></li>
                            <li><Link href="/corporate/workplace" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Workplace Effectiveness</Link></li>
                            <li><Link href="/corporate/finance-compliance" className="text-xs font-medium text-slate-600 hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-brand-blue/5 block">Finance, Compliance & Risk</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blogs"
              className="relative group py-2"
            >
              <span className="group-hover:text-brand-blue transition-colors duration-300">
                Blogs
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/contact"
              className="relative group py-2"
            >
              <span className="group-hover:text-brand-blue transition-colors duration-300">
                Contact Us
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <button
              onClick={openSearch}
              title="Search site (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-brand-blue/10 border border-slate-200 hover:border-brand-blue/30 rounded-xl transition-all group"
            >
              <Search className="w-4 h-4 text-slate-500 group-hover:text-brand-blue transition-colors" />
              <span className="hidden md:inline text-sm text-slate-400 group-hover:text-brand-blue transition-colors font-medium">
                Search...
              </span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            <Link href="/assessment" className="hidden lg:block">
              <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand-orange/20 transition-all duration-300 text-sm whitespace-nowrap">
                Career Assessment
              </button>
            </Link>

            <Link href="/register" className="hidden sm:block">
              <button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/20 text-sm whitespace-nowrap">
                Register
              </button>
            </Link>

            <Link href="/login" className="hidden sm:block">
              <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20 text-sm whitespace-nowrap">
                Log in
              </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 space-y-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-medium"
              >
                <Search className="w-4 h-4" />
                <span>Ask anything about MentorMe...</span>
              </button>

              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-brand-blue/5 hover:text-brand-blue transition-all"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-border mt-3 pt-4 space-y-3 px-4">
                <Link href="/assessment" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-3 rounded-xl shadow-md">
                    Career Assessment
                  </button>
                </Link>
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    <button className="w-full font-semibold py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                      Log in
                    </button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    <button className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold py-2.5 rounded-xl transition-all shadow-sm">
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
