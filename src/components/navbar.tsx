"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, ChevronRight } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";
import { createClient } from "@/lib/supabase";

export function Navbar() {
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false);
  const [is21stDropdownOpen, setIs21stDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSiteSearch();

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setProfileName(user.user_metadata?.full_name || user.email || "User");
      }
    };
    fetchUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          setProfileName(session.user.user_metadata?.full_name || session.user.email || "User");
        } else {
          setProfileName("");
        }
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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfileOpen(false);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileOpen && !(event.target as Element).closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <>
      <SiteSearch isOpen={isSearchOpen} onClose={closeSearch} />
      <nav className="w-full border-b border-brand-blue/10 bg-gradient-to-r from-brand-blue/[0.04] to-brand-orange/[0.04] backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-[1700px] mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-12 w-36 lg:h-14 lg:w-44 shrink-0 flex items-center justify-center">
              <img src="/logo.png?v=7" alt="MentorMe Logo" className="max-w-full max-h-full object-contain" />
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
            <div className="relative" onMouseEnter={() => setIsAiDropdownOpen(true)} onMouseLeave={() => setIsAiDropdownOpen(false)}>
              <button type="button" className="flex items-center gap-1 hover:text-brand-blue py-6 transition-colors duration-300" aria-expanded={isAiDropdownOpen}>
                <Link href="/ai-learning-hub" className="hover:text-brand-blue">AI Learning Hub</Link>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isAiDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isAiDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-4">
                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick("k12")}>
                        1. K-12 Students
                      </button>
                      {activeSubmenu === "k12" && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2">
                          <Link href="/programs/ai-foundations-k12" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI Foundations for School Students</span></Link>
                          <Link href="/programs/generative-ai-k12" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Generative AI &amp; Prompt Engineering for Students</span></Link>
                          <Link href="/programs/ai-robotics-k12" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI + Robotics Explorer Program</span></Link>
                        </div>
                      )}

                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick("college")}>
                        2. College Students
                      </button>
                      {activeSubmenu === "college" && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2">
                          <Link href="/programs/ai-career-accelerator" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI Career Accelerator Program</span></Link>
                          <Link href="/programs/ai-data-analytics" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI &amp; Data Analytics Professional Program</span></Link>
                          <Link href="/programs/ai-business-management" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI for Business, Finance &amp; Management</span></Link>
                        </div>
                      )}

                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick("corporate")}>
                        3. Corporate Professionals
                      </button>
                      {activeSubmenu === "corporate" && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2">
                          <Link href="/programs/generative-ai-workplace" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">Generative AI for Workplace Productivity</span></Link>
                          <Link href="/programs/ai-finance-accounting" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI for Finance &amp; Accounting Professionals</span></Link>
                          <Link href="/programs/ai-leadership" className="block hover:bg-gray-100 rounded-md"><span className="text-[14px] font-medium text-slate-500 block whitespace-nowrap hover:text-brand-blue transition-colors">AI Leadership &amp; Digital Transformation Program</span></Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 21st Century Skills Hub Dropdown */}
            <div className="relative" onMouseEnter={() => setIs21stDropdownOpen(true)} onMouseLeave={() => setIs21stDropdownOpen(false)}>
              <button type="button" className="flex items-center gap-1 hover:text-brand-blue py-6 transition-colors duration-300" aria-expanded={is21stDropdownOpen}>
                <Link href="/college-programs" className="hover:text-brand-blue">21st Century Skills Hub</Link>
                <ChevronDown size={14} className={`transition-transform duration-300 ${is21stDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {is21stDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-4">
                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick("21st-k12")}>
                        1. K-12 Students
                      </button>
                      {activeSubmenu === "21st-k12" && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2 rounded-md">
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Future Readiness Skills</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Communication &amp; Leadership</span></Link>
                          <div className="pt-2 pb-1">
                            <span className="text-[14px] font-bold text-slate-700 block px-1">STEM &amp; Emerging Technologies</span>
                            <div className="pl-4 space-y-1 mt-1 border-l-2 border-gray-200 ml-1">
                              <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[13px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Robotics</span></Link>
                              <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[13px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Coding</span></Link>
                              <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[13px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">IoT</span></Link>
                              <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[13px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">AI for School Students</span></Link>
                              <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[13px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Drones</span></Link>
                            </div>
                          </div>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Digital Literacy</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Career &amp; Life Skills</span></Link>
                        </div>
                      )}

                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick("21st-college")}>
                        2. College Students
                      </button>
                      {activeSubmenu === "21st-college" && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2 rounded-md">
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Employability Skills</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Business &amp; Professional Skills</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Digital &amp; Analytics Skills</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Finance &amp; Commerce Skills</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Entrepreneurship &amp; Innovation</span></Link>
                        </div>
                      )}

                      <button type="button" className="block w-full text-left font-bold text-slate-800 text-[16px]" onClick={() => handleSubmenuClick("21st-corporate")}>
                        3. Corporate Professionals
                      </button>
                      {activeSubmenu === "21st-corporate" && (
                        <div className="pl-4 space-y-2 bg-gray-50 p-2 rounded-md">
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Leadership Excellence</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Business Excellence</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Digital Transformation</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Workplace Effectiveness</span></Link>
                          <Link href="#" className="block hover:bg-gray-100 rounded-md p-1"><span className="text-[14px] font-medium text-slate-500 block hover:text-brand-blue transition-colors">Finance, Compliance &amp; Risk</span></Link>
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
              <div className="relative profile-dropdown">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl pl-1 pr-3 py-1 hover:border-brand-blue/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                    {profileName.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="hidden md:inline text-sm font-bold text-slate-700">Hi, {profileName.split(" ")[0]}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <p className="font-bold text-slate-800 text-sm truncate">{profileName}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                        <User size={18} className="text-brand-blue" />
                        <div>
                          <p className="text-sm font-bold text-slate-700">My Profile</p>
                          <p className="text-xs text-slate-500">Account settings and more</p>
                        </div>
                        <ChevronRight size={16} className="ml-auto text-slate-400" />
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                        <ClipboardList size={18} className="text-brand-orange" />
                        <div>
                          <p className="text-sm font-bold text-slate-700">My Tasks</p>
                          <p className="text-xs text-slate-500">Assigned and other tasks</p>
                        </div>
                        <ChevronRight size={16} className="ml-auto text-slate-400" />
                      </button>
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left border border-red-200">
                        <LogOut size={18} className="text-red-600" />
                        <span className="text-sm font-bold text-red-600">SIGN OUT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/20 text-sm whitespace-nowrap">
                    Login
                  </button>
                </Link>
                <Link href="/register" className="hidden sm:block">
                  <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20 text-sm whitespace-nowrap">
                    Register
                  </button>
                </Link>
              </>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden p-2 rounded-xl hover:bg-muted transition-colors" aria-label="Toggle mobile menu">
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
                  <button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-3 rounded-xl shadow-md">Career Assessment</button>
                </Link>
                {!user && (
                  <div className="flex gap-3">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                      <button className="w-full font-bold py-3 bg-brand-blue text-white hover:bg-brand-blue/90 rounded-xl transition-all shadow-md">Log in</button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                      <button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-3 rounded-xl transition-all shadow-md">Register</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
