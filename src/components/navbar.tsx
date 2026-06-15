"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Search, User, LogOut, ClipboardList, ChevronRight } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";
import { createClient } from "@/lib/supabase";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeK12Program, setActiveK12Program] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSiteSearch();

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
    { href: "/college-programs", label: "21st Century Skills Hub" },
    { href: "/study-abroad", label: "Study Abroad" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <SiteSearch isOpen={isSearchOpen} onClose={closeSearch} />

      <nav className="w-full border-b border-brand-blue/10 bg-gradient-to-r from-brand-blue/[0.04] to-brand-orange/[0.04] backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-[1700px] mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 gap-2">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-12 w-36 lg:h-14 lg:w-44 shrink-0 flex items-center justify-center">
              <img
                src="/logo.png?v=7"
                alt="MentorMe Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-3 xl:gap-5 text-[14px] font-bold text-slate-800 whitespace-nowrap shrink">
            <Link href="/" className="relative group py-2">
              <span className="text-foreground group-hover:text-brand-blue transition-colors duration-300">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/about" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* AI Learning Hub Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsAiDropdownOpen(true)}
              onMouseLeave={() => setIsAiDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-brand-blue py-6 transition-colors duration-300"
                aria-expanded={isAiDropdownOpen}
              >
                <Link href="/ai-learning-hub" className="hover:text-brand-blue">AI Learning Hub</Link>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isAiDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isAiDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[240px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4">
                    <ul className="space-y-1">
                      <li><span className="text-sm font-medium text-slate-700 px-3 py-2 rounded-lg block">AI Foundations</span></li>
                      <li><span className="text-sm font-medium text-slate-700 px-3 py-2 rounded-lg block">Generative AI</span></li>
                      <li><span className="text-sm font-medium text-slate-700 px-3 py-2 rounded-lg block">AI for Business</span></li>
                      <li><span className="text-sm font-medium text-slate-700 px-3 py-2 rounded-lg block">AI for Educators</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 21st Century Skills Hub Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-brand-blue py-6 transition-colors duration-300"
                aria-expanded={isDropdownOpen}
              >
                21st Century Skills Hub{" "}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-4">
                      {/* K-12 Section */}
                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick('k12')}>
                        1. K-12 Students
                      </button>
                      {activeSubmenu === 'k12' && (
                        <div className="pl-4 space-y-5 bg-gray-50 p-2">
                          <div><span className="text-[14px] font-medium text-slate-600 block whitespace-nowrap">Future Readiness Skills</span></div>
                          <div><span className="text-[14px] font-medium text-slate-600 block whitespace-nowrap">Communication &amp; Leadership</span></div>
                          <div className="space-y-4 pt-1">
                            <span className="text-[14px] font-bold text-slate-800 block mb-4 whitespace-nowrap">STEM &amp; Emerging Technologies:</span>
                            <div className="pl-4 space-y-3">
                              
                              {/* Program 1 */}
                              <div>
                                <button type="button" className="text-[13px] font-semibold text-brand-blue hover:underline text-left w-full flex justify-between items-center" onClick={() => setActiveK12Program(activeK12Program === 'prog1' ? null : 'prog1')}>
                                  1. AI Foundations for School Students
                                  <ChevronDown size={12} className={`transition-transform duration-300 ${activeK12Program === 'prog1' ? "rotate-180" : ""}`} />
                                </button>
                                {activeK12Program === 'prog1' && (
                                  <div className="mt-2 pl-2 space-y-2 text-[12px] text-slate-600 border-l-2 border-brand-blue/20">
                                    <p><strong>Short Description:</strong> A beginner-friendly introduction to Artificial Intelligence that helps students understand how AI works and how it impacts everyday life, future careers, and society.</p>
                                    <div><strong>Benefits:</strong><ul className="list-disc pl-4 mt-1"><li>Builds awareness of emerging technologies</li><li>Develops logical thinking</li><li>Encourages innovation and creativity</li><li>Improves problem-solving skills</li></ul></div>
                                    <div><strong>MentorMe USP:</strong><ul className="list-disc pl-4 mt-1"><li>Age-appropriate learning</li><li>Interactive activities and games</li><li>No coding required</li><li>Industry-designed curriculum</li></ul></div>
                                    <div><strong>Modules:</strong><ul className="list-disc pl-4 mt-1"><li>Introduction to AI</li><li>AI Around Us</li><li>Machine Learning Basics</li><li>Generative AI Tools</li><li>AI Ethics</li><li>AI Mini Projects</li></ul></div>
                                  </div>
                                )}
                              </div>

                              {/* Program 2 */}
                              <div>
                                <button type="button" className="text-[13px] font-semibold text-brand-blue hover:underline text-left w-full flex justify-between items-center" onClick={() => setActiveK12Program(activeK12Program === 'prog2' ? null : 'prog2')}>
                                  2. Generative AI &amp; Prompt Engineering for Students
                                  <ChevronDown size={12} className={`transition-transform duration-300 ${activeK12Program === 'prog2' ? "rotate-180" : ""}`} />
                                </button>
                                {activeK12Program === 'prog2' && (
                                  <div className="mt-2 pl-2 space-y-2 text-[12px] text-slate-600 border-l-2 border-brand-blue/20">
                                    <p><strong>Short Description:</strong> Learn how to effectively use ChatGPT, Gemini, Claude, and other AI tools for learning, creativity, research, and productivity.</p>
                                    <div><strong>Benefits:</strong><ul className="list-disc pl-4 mt-1"><li>Faster learning</li><li>Better project work</li><li>Improved communication skills</li><li>Enhanced creativity</li></ul></div>
                                    <div><strong>MentorMe USP:</strong><ul className="list-disc pl-4 mt-1"><li>Ready-to-use prompt library</li><li>Academic applications</li><li>Hands-on exercises</li><li>Responsible AI practices</li></ul></div>
                                    <div><strong>Modules:</strong><ul className="list-disc pl-4 mt-1"><li>Understanding Generative AI</li><li>Prompt Engineering Fundamentals</li><li>AI for Research</li><li>AI for Presentations</li><li>AI for Content Creation</li><li>AI Safety</li></ul></div>
                                  </div>
                                )}
                              </div>

                              {/* Program 3 */}
                              <div>
                                <button type="button" className="text-[13px] font-semibold text-brand-blue hover:underline text-left w-full flex justify-between items-center" onClick={() => setActiveK12Program(activeK12Program === 'prog3' ? null : 'prog3')}>
                                  3. AI + Robotics Explorer Program
                                  <ChevronDown size={12} className={`transition-transform duration-300 ${activeK12Program === 'prog3' ? "rotate-180" : ""}`} />
                                </button>
                                {activeK12Program === 'prog3' && (
                                  <div className="mt-2 pl-2 space-y-2 text-[12px] text-slate-600 border-l-2 border-brand-blue/20">
                                    <p><strong>Short Description:</strong> A future-focused program combining Artificial Intelligence, Robotics, Sensors, and Automation to help students become creators rather than consumers of technology.</p>
                                    <div><strong>Benefits:</strong><ul className="list-disc pl-4 mt-1"><li>Hands-on STEM learning</li><li>Improves innovation mindset</li><li>Builds engineering thinking</li><li>Encourages teamwork</li></ul></div>
                                    <div><strong>MentorMe USP:</strong><ul className="list-disc pl-4 mt-1"><li>Project-based learning</li><li>Robotics kits provided</li><li>AI-powered robotics projects</li><li>School exhibition support</li></ul></div>
                                    <div><strong>Modules:</strong><ul className="list-disc pl-4 mt-1"><li>Robotics Fundamentals</li><li>Sensors &amp; Actuators</li><li>Introduction to Coding</li><li>AI in Robotics</li><li>Automation Concepts</li><li>Capstone Project</li></ul></div>
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>
                          <div className="pt-2"><span className="text-[14px] font-medium text-slate-600 block whitespace-nowrap">Digital Literacy</span></div>
                          <div><span className="text-[14px] font-medium text-slate-600 block whitespace-nowrap">Career &amp; Life Skills</span></div>
                        </div>
                      )}

                      {/* College Section */}
                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick('college')}>
                        2. College Students
                      </button>
                      {activeSubmenu === 'college' && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2">
                          <Link href="/programs/ai-career-accelerator" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI Career Accelerator Program</span></Link>
                          <Link href="/programs/ai-data-analytics" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI &amp; Data Analytics Professional Program</span></Link>
                          <Link href="/programs/ai-business-management" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI for Business, Finance &amp; Management</span></Link>
                        </div>
                      )}

                      {/* Corporate Section */}
                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick('corporate')}>
                        3. Corporate Professionals
                      </button>
                      {activeSubmenu === 'corporate' && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2">
                          <Link href="/programs/ai-leadership" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Leadership Excellence</span></Link>
                          <Link href="/programs/generative-ai-workplace" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Business Excellence</span></Link>
                          <Link href="/programs/ai-leadership" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Digital Transformation</span></Link>
                          <Link href="/programs/generative-ai-workplace" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Workplace Effectiveness</span></Link>
                          <Link href="/programs/ai-finance-accounting" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Finance, Compliance &amp; Risk</span></Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/blogs" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Blogs</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/contact" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <button
              onClick={openSearch}
              title="Search site (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-brand-blue/10 border border-slate-200 hover:border-brand-blue/30 rounded-xl transition-all group"
            >
              <Search className="w-4 h-4 text-slate-500 group-hover:text-brand-blue transition-colors" />
              <span className="hidden md:inline text-sm text-slate-400 group-hover:text-brand-blue transition-colors font-medium">Search...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-mono">⌘K</kbd>
            </button>

            <Link href="/assessment" className="hidden lg:block">
              <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand-orange/20 transition-all duration-300 text-sm whitespace-nowrap">
                Career Assessment
              </button>
            </Link>

            {user ? (
              <Link href="/dashboard/admin" className="hidden sm:block">
                <button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/20 text-sm whitespace-nowrap">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/register" className="hidden sm:block">
                <button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/20 text-sm whitespace-nowrap">
                  Register
                </button>
              </Link>
            )}

            {user ? (
              <Link href="/dashboard/admin" className="hidden sm:block">
                <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20 text-sm whitespace-nowrap">
                  Admin Panel
                </button>
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20 text-sm whitespace-nowrap">
                  Log in
                </button>
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <button className="w-full font-semibold py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                      Log in
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
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
