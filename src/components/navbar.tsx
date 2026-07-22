"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, User, LogOut } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";
import { createClient } from "@/lib/supabase";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSiteSearch();
  const [aiHubOpen, setAiHubOpen] = useState(false);
  const [skillsHubOpen, setSkillsHubOpen] = useState(false);
  const [aiHubAccordion, setAiHubAccordion] = useState<string | null>("k12");
  const [skillsHubAccordion, setSkillsHubAccordion] = useState<string | null>("k12");

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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfileOpen(false);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileOpen && !(event.target as Element).closest(".profile-dropdown")) {
        setProfileOpen(false);
      }
      if (aiHubOpen && !(event.target as Element).closest(".ai-hub-dropdown")) {
        setAiHubOpen(false);
      }
      if (skillsHubOpen && !(event.target as Element).closest(".skills-hub-dropdown")) {
        setSkillsHubOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen, aiHubOpen, skillsHubOpen]);

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/ai-learning-hub", label: "AI Learning Hub" },
    { href: "/k12-programs", label: "21st Century Skills Hub" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <SiteSearch isOpen={isSearchOpen} onClose={closeSearch} />
      <nav className="w-full border-b border-brand-blue/10 bg-brand-blue/5 sticky top-0 z-50">
        <div className="w-full max-w-[1700px] mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 gap-2">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative h-12 w-36 lg:h-14 lg:w-44 shrink-0 flex items-center justify-center">
              <img src="/logo.png?v=7" alt="MentorMe Logo" className="max-w-full max-h-full object-contain" />
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-3 xl:gap-5 text-[14px] font-bold text-slate-800 whitespace-nowrap shrink">
            <Link href="/" className="relative group py-2">
              <span className="text-foreground group-hover:text-brand-blue transition-colors duration-300">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/about" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <div className="relative group ai-hub-dropdown">
              <button
                onClick={() => setAiHubOpen((prev) => !prev)}
                className="relative flex items-center gap-1 py-2 group-hover:text-brand-blue transition-colors duration-300"
              >
                <span>AI Learning Hub</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${aiHubOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${aiHubOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="p-3 w-80 max-h-[80vh] overflow-y-auto custom-scrollbar bg-white">
                   <div className="mb-2">
                     <button 
                       onClick={(e) => { e.preventDefault(); setAiHubAccordion(aiHubAccordion === "k12" ? null : "k12"); }}
                       className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                     >
                       <span>1. K-12 Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${aiHubAccordion === "k12" ? "rotate-180" : ""}`} />
                     </button>
                      <div className={`overflow-hidden transition-all duration-300 ${aiHubAccordion === "k12" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="bg-slate-50 rounded-xl p-2 space-y-1 mt-1">
                          <Link href="/programs/ai-foundations-k12" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI Foundations for School Students</Link>
                          <Link href="/programs/generative-ai-k12" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>Generative AI & Prompt Engineering for Students</Link>
                          <Link href="/programs/robotics-fundamentals-k12" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI + Robotics Explorer Program</Link>
                        </div>
                      </div>
                   </div>

                   <div className="mb-2">
                     <button 
                       onClick={(e) => { e.preventDefault(); setAiHubAccordion(aiHubAccordion === "college" ? null : "college"); }}
                       className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                     >
                       <span>2. College Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${aiHubAccordion === "college" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${aiHubAccordion === "college" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div className="bg-slate-50 rounded-xl p-2 space-y-1 mt-1">
                         <Link href="/programs/ai-career-accelerator" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI Career Accelerator Program</Link>
                         <Link href="/programs/ai-data-analytics" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI & Data Analytics Professional Program</Link>
                         <Link href="/programs/ai-business-management" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI for Business, Finance & Management</Link>
                       </div>
                     </div>
                   </div>

                   <div className="mb-2">
                     <button 
                       onClick={(e) => { e.preventDefault(); setAiHubAccordion(aiHubAccordion === "corporate" ? null : "corporate"); }}
                       className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                     >
                       <span>3. Corporate Professionals</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${aiHubAccordion === "corporate" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${aiHubAccordion === "corporate" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div className="bg-slate-50 rounded-xl p-2 space-y-1 mt-1">
                         <Link href="/programs/generative-ai-workplace" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>Generative AI for Workplace Productivity</Link>
                         <Link href="/programs/ai-finance-accounting" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI for Finance & Accounting Professionals</Link>
                         <Link href="/programs/ai-leadership" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setAiHubOpen(false)}>AI Leadership & Digital Transformation</Link>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

            <div className="relative group skills-hub-dropdown">
              <button
                onClick={() => setSkillsHubOpen((prev) => !prev)}
                className="relative flex items-center gap-1 py-2 group-hover:text-brand-blue transition-colors duration-300"
              >
                <span>21st Century Skills Hub</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${skillsHubOpen ? "rotate-180" : ""}`} />
              </button>
               <div className={`absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${skillsHubOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                 <div className="p-3 w-80 max-h-[80vh] overflow-y-auto custom-scrollbar bg-white">
                   <div className="mb-2">
                     <button 
                       onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "k12" ? null : "k12"); }}
                       className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                     >
                       <span>1. K-12 Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "k12" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "k12" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div className="bg-slate-50 rounded-xl p-2 space-y-1 mt-1">
                         <Link href="/programs/critical-thinking-k12" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Critical Thinking & Problem Solving</Link>
                         <Link href="/programs/public-speaking-k12" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Public Speaking</Link>
                         <Link href="/programs/robotics-fundamentals-k12" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Robotics Fundamentals</Link>
                       </div>
                     </div>
                   </div>

                   <div className="mb-2">
                     <button 
                       onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "college" ? null : "college"); }}
                       className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                     >
                       <span>2. College Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "college" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "college" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div className="bg-slate-50 rounded-xl p-2 space-y-1 mt-1">
                         <Link href="/programs/data-analytics-college" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Data Analytics</Link>
                         <Link href="/programs/digital-marketing-college" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Digital Marketing</Link>
                         <Link href="/programs/financial-modelling-college" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Financial Modelling</Link>
                       </div>
                     </div>
                   </div>

                   <div className="mb-2">
                     <button 
                       onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "corporate" ? null : "corporate"); }}
                       className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                     >
                       <span>3. Corporate Professionals</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "corporate" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "corporate" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div className="bg-slate-50 rounded-xl p-2 space-y-1 mt-1">
                         <Link href="/programs/leadership-development-corporate" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Leadership Development</Link>
                         <Link href="/programs/project-management-corporate" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Project Management</Link>
                         <Link href="/programs/financial-analysis-corporate" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Financial Analysis</Link>
                       </div>
                     </div>
                   </div>

                   <div className="mb-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "entrepreneurship" ? null : "entrepreneurship"); }}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-slate-900 hover:text-brand-blue transition-colors"
                      >
                        <span>4. Entrepreneurship</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "entrepreneurship" ? "rotate-180" : ""}`} />
                      </button>
                         <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "entrepreneurship" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                           <div className="bg-slate-50 rounded-xl p-2 mt-1">
                             <Link href="/programs/entrepreneurship" className="block px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-white hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Free Entrepreneurship Material</Link>
                             <div className="pl-3 space-y-1">
                               <Link href="/programs/entrepreneurship?module=1" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Module 1: Entrepreneurial Mindset</Link>
                               <Link href="/programs/entrepreneurship?module=2" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Module 2: Opportunity Identification</Link>
                               <Link href="/programs/entrepreneurship?module=3" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-brand-blue hover:shadow-sm transition-all" onClick={() => setSkillsHubOpen(false)}>Module 3: Business Models</Link>
                             </div>
                           </div>
                         </div>
                   </div>
                 </div>
               </div>
             </div>

            <Link href="/blogs" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Blogs</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/contact" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <button onClick={openSearch} className="relative group py-2 flex items-center gap-1">
              <Search size={18} className="text-slate-600 group-hover:text-brand-blue transition-colors duration-300" />
            </button>
          </div>

          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <a href="/free-mini-assessment.html" className="hidden lg:block">
              <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand-orange/20 transition-all duration-300 text-sm whitespace-nowrap">
                Free Mini Psychometric Assessment
              </button>
            </a>

             {user && (
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

                 <div className={`absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${profileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-slate-800 text-sm truncate">{profileName}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
                  </div>
                  <div className="p-2">
                    <Link href="/dashboard/student/profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                      <User size={18} className="text-brand-blue" />
                      <div>
                        <p className="text-sm font-bold text-slate-700">My Profile</p>
                        <p className="text-xs text-slate-500">Account settings and more</p>
                      </div>
                    </Link>
                    <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left border border-red-200">
                      <LogOut size={18} className="text-red-600" />
                      <span className="text-sm font-bold text-red-600">SIGN OUT</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!user && (
              <Link href="/login" className="hidden sm:block">
                <button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/20 text-sm whitespace-nowrap">
                  Login / Register
                </button>
              </Link>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden p-2 rounded-xl hover:bg-muted transition-colors" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-border bg-background">
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
                <button onClick={() => { openSearch(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold py-3 rounded-xl transition-all">
                  <Search size={18} />
                  Search
                </button>
                <a href="/free-mini-assessment.html" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-3 rounded-xl shadow-md">Free Mini Psychometric Assessment</button>
                </a>
                {!user && (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <button className="w-full font-bold py-3 bg-brand-blue text-white hover:bg-brand-blue/90 rounded-xl transition-all shadow-md">Login / Register</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

