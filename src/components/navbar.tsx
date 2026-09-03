"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, User, LogOut } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";
import { createClient } from "@/lib/supabase";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSiteSearch();
  const [aiHubOpen, setAiHubOpen] = useState(false);
  const [skillsHubOpen, setSkillsHubOpen] = useState(false);
  const [careerRoadmapsOpen, setCareerRoadmapsOpen] = useState(false);
  const [aiHubAccordion, setAiHubAccordion] = useState<string | null>("k12");
  const [skillsHubAccordion, setSkillsHubAccordion] = useState<string | null>("k12");
  const [mobileCareerRoadmapsOpen, setMobileCareerRoadmapsOpen] = useState(false);

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
      if (careerRoadmapsOpen && !(event.target as Element).closest(".career-roadmaps-dropdown")) {
        setCareerRoadmapsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen, aiHubOpen, skillsHubOpen, careerRoadmapsOpen]);

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/ai-learning-hub", label: "AI Learning Hub" },
    { href: "/skills-hub", label: "21st Century Skills Hub" },
    { href: "/career-library", label: "Career Roadmaps", isAccordion: true },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <section>
      <SiteSearch isOpen={isSearchOpen} onClose={closeSearch} />
      <nav>
        <div>
          <Link href="/">
            <div>
              <img src="/logo.png?v=7" alt="MentorMe Logo" />
            </div>
          </Link>

          <div>
            <Link href="/">
              <span>Home</span>
              <span />
            </Link>

            <Link href="/about">
              <span>About</span>
              <span />
            </Link>

            <div>
              <button
                onClick={() => setAiHubOpen((prev) => !prev)}
               
              >
                <span>AI Learning Hub</span>
                <span />
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${aiHubOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${aiHubOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div>
                   <div>
                     <button 
                       onClick={(e) => { e.preventDefault(); setAiHubAccordion(aiHubAccordion === "k12" ? null : "k12"); }}
                      
                     >
                       <span>1. K-12 Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${aiHubAccordion === "k12" ? "rotate-180" : ""}`} />
                     </button>
                      <div className={`overflow-hidden transition-all duration-300 ${aiHubAccordion === "k12" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div>
                          <Link href="/programs/ai-foundations-k12" onClick={() => setAiHubOpen(false)}>AI Foundations for School Students</Link>
                          <Link href="/programs/generative-ai-k12" onClick={() => setAiHubOpen(false)}>Generative AI & Prompt Engineering for Students</Link>
                          <Link href="/programs/robotics-fundamentals-k12" onClick={() => setAiHubOpen(false)}>AI + Robotics Explorer Program</Link>
                  </div>
                </div>
              </div>

              <div>
                     <button 
                       onClick={(e) => { e.preventDefault(); setAiHubAccordion(aiHubAccordion === "college" ? null : "college"); }}
                      
                     >
                       <span>2. College Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${aiHubAccordion === "college" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${aiHubAccordion === "college" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div>
                         <Link href="/programs/ai-career-accelerator" onClick={() => setAiHubOpen(false)}>AI Career Accelerator Program</Link>
                         <Link href="/programs/ai-data-analytics" onClick={() => setAiHubOpen(false)}>AI & Data Analytics Professional Program</Link>
                         <Link href="/programs/ai-business-management" onClick={() => setAiHubOpen(false)}>AI for Business, Finance & Management</Link>
                       </div>
                     </div>
                   </div>

                   <div>
                     <button 
                       onClick={(e) => { e.preventDefault(); setAiHubAccordion(aiHubAccordion === "corporate" ? null : "corporate"); }}
                      
                     >
                       <span>3. Corporate Professionals</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${aiHubAccordion === "corporate" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${aiHubAccordion === "corporate" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div>
                         <Link href="/programs/generative-ai-workplace" onClick={() => setAiHubOpen(false)}>Generative AI for Workplace Productivity</Link>
                         <Link href="/programs/ai-finance-accounting" onClick={() => setAiHubOpen(false)}>AI for Finance & Accounting Professionals</Link>
                         <Link href="/programs/ai-leadership" onClick={() => setAiHubOpen(false)}>AI Leadership & Digital Transformation</Link>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

            <div>
              <button
                onClick={() => setSkillsHubOpen((prev) => !prev)}
               
              >
                <span>21st Century Skills Hub</span>
                <span />
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${skillsHubOpen ? "rotate-180" : ""}`} />
              </button>
               <div className={`absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${skillsHubOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                 <div>
                   <div>
                     <button 
                       onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "k12" ? null : "k12"); }}
                      
                     >
                       <span>1. K-12 Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "k12" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "k12" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div>
                         <Link href="/programs/critical-thinking-k12" onClick={() => setSkillsHubOpen(false)}>Critical Thinking & Problem Solving</Link>
                         <Link href="/programs/public-speaking-k12" onClick={() => setSkillsHubOpen(false)}>Public Speaking</Link>
                         <Link href="/programs/robotics-fundamentals-k12" onClick={() => setSkillsHubOpen(false)}>Robotics Fundamentals</Link>
                       </div>
                     </div>
                   </div>

                   <div>
                     <button 
                       onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "college" ? null : "college"); }}
                      
                     >
                       <span>2. College Students</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "college" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "college" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div>
                         <Link href="/programs/data-analytics-college" onClick={() => setSkillsHubOpen(false)}>Data Analytics</Link>
                         <Link href="/programs/digital-marketing-college" onClick={() => setSkillsHubOpen(false)}>Digital Marketing</Link>
                         <Link href="/programs/financial-modelling-college" onClick={() => setSkillsHubOpen(false)}>Financial Modelling</Link>
                       </div>
                     </div>
                   </div>

                   <div>
                     <button 
                       onClick={(e) => { e.preventDefault(); setSkillsHubAccordion(skillsHubAccordion === "corporate" ? null : "corporate"); }}
                      
                     >
                       <span>3. Corporate Professionals</span>
                       <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "corporate" ? "rotate-180" : ""}`} />
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "corporate" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                       <div>
                         <Link href="/programs/leadership-development-corporate" onClick={() => setSkillsHubOpen(false)}>Leadership Development</Link>
                         <Link href="/programs/project-management-corporate" onClick={() => setSkillsHubOpen(false)}>Project Management</Link>
                         <Link href="/programs/financial-analysis-corporate" onClick={() => setSkillsHubOpen(false)}>Financial Analysis</Link>
                       </div>
                     </div>
                   </div>

                    <div>
                       <button 
                         onClick={(e) => { 
                           e.preventDefault(); 
                           setSkillsHubAccordion(skillsHubAccordion === "entrepreneurship" ? null : "entrepreneurship");
                         }}
                        
                       >
                         <span>4. Entrepreneurship</span>
                         <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${skillsHubAccordion === "entrepreneurship" ? "rotate-180" : ""}`} />
                       </button>
                           <div className={`overflow-hidden transition-all duration-300 ${skillsHubAccordion === "entrepreneurship" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                             <div>
                               <Link href="/programs/entrepreneurship" onClick={() => setSkillsHubOpen(false)}>Free Entrepreneurship Material</Link>
                             </div>
                           </div>
                    </div>
                 </div>
               </div>
             </div>

             <div>
               <button
                 onClick={() => setCareerRoadmapsOpen((prev) => !prev)}
                
               >
                 <span>Career Roadmaps</span>
                 <span />
                 <ChevronDown size={14} className={`text-slate-500 transition-transform ${careerRoadmapsOpen ? "rotate-180" : ""}`} />
               </button>
                 <div className={`absolute top-full left-0 mt-2 w-[480px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${careerRoadmapsOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                   <div>
                     <div>
                       <div>1]</div>
                       <div>2]</div>
                       <div>3]</div>
                       <div>4]</div>
                       <div>5]</div>
                       <div>6]</div>
                       <div>7]</div>
                       <div>8]</div>
                       <div>9]</div>
                     </div>
                     <div>
                       <div>
                         Career Roadmaps (250+)
                       </div>
                       <div>
                      <Link 
                        href="/career-library/engineering-technology" 
                       
                        onClick={() => setCareerRoadmapsOpen(false)}
                      >
                        1] Engineering & Technology
                      </Link>
                      <Link 
                        href="/career-library/medicine-healthcare" 
                       
                        onClick={() => setCareerRoadmapsOpen(false)}
                      >
                        2] Medicine & Healthcare
                      </Link>
                       <Link 
                         href="/career-library/commerce-finance-accounting" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        3] Commerce, Finance & Accounting
                       </Link>
                       <Link 
                         href="/career-library/management-business" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        4] Management & Business
                       </Link>
                       <Link 
                         href="/career-library/design-creative" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        5] Design & Creative Careers
                       </Link>
                       <Link 
                         href="/career-library/architecture-construction" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        6] Architecture, Construction & Infrastructure
                       </Link>
                       <Link 
                         href="/career-library/science-research" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        7] Science & Research
                       </Link>
                       <Link 
                         href="/career-library/law-governance" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        8] Law, Governance & Public Services
                       </Link>
                       <Link 
                         href="/career-library/emerging-careers" 
                        
                         onClick={() => setCareerRoadmapsOpen(false)}
                       >
                        9] Emerging Careers
                       </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <Link href="/blogs">
              <span>Blogs</span>
              <span />
            </Link>

            <Link href="/contact">
              <span>Contact Us</span>
              <span />
            </Link>

            <button onClick={openSearch}>
              <Search size={18} />
            </button>

           <div>
            <a href="/free-mini-assessment.html">
              <button>
                Free Mini Psychometric Assessment
              </button>
            </a>

             {user && (
               <div>
                 <button
                   type="button"
                   onClick={() => setProfileOpen((prev) => !prev)}
                  
                 >
                   <div>
                     {profileName.charAt(0)?.toUpperCase()}
                   </div>
                   <span>Hi, {profileName.split(" ")[0]}</span>
                   <ChevronDown size={14} className={`text-slate-500 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                 </button>

                 <div className={`absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all ${profileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                  <div>
                    <p>{profileName}</p>
                    <p>{user?.email || ""}</p>
                  </div>
                  <div>
                    <Link href="/dashboard/student/profile">
                      <User size={18} />
                      <div>
                        <p>My Profile</p>
                        <p>Account settings and more</p>
                      </div>
                    </Link>
                    <button type="button" onClick={handleLogout}>
                      <LogOut size={18} />
                      <span>SIGN OUT</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!user && (
              <Link href="/login">
                <button>
                  Login / Register
                </button>
              </Link>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
        </div>

        {isMobileMenuOpen && (
          <div>
            <div>
              {mobileLinks.map((link) =>
                link.isAccordion ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileCareerRoadmapsOpen((prev) => !prev)}
                     
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={16} className={`text-slate-500 transition-transform ${mobileCareerRoadmapsOpen ? "rotate-180" : ""}`} />
                    </button>
                      <div className={`overflow-hidden transition-all duration-300 ${mobileCareerRoadmapsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div>
                          <Link href="/career-library/engineering-technology" onClick={() => setIsMobileMenuOpen(false)}>1] Engineering & Technology</Link>
                          <Link href="/career-library/medicine-healthcare" onClick={() => setIsMobileMenuOpen(false)}>2] Medicine & Healthcare</Link>
                          <Link href="/career-library/commerce-finance-accounting" onClick={() => setIsMobileMenuOpen(false)}>3] Commerce, Finance & Accounting</Link>
                          <Link href="/career-library/management-business" onClick={() => setIsMobileMenuOpen(false)}>4] Management & Business</Link>
                          <Link href="/career-library/design-creative" onClick={() => setIsMobileMenuOpen(false)}>5] Design & Creative Careers</Link>
                          <Link href="/career-library/architecture-construction" onClick={() => setIsMobileMenuOpen(false)}>6] Architecture, Construction & Infrastructure</Link>
                          <Link href="/career-library/science-research" onClick={() => setIsMobileMenuOpen(false)}>7] Science & Research</Link>
                          <Link href="/career-library/law-governance" onClick={() => setIsMobileMenuOpen(false)}>8] Law, Governance & Public Services</Link>
                           <Link href="/career-library/emerging-careers" onClick={() => setIsMobileMenuOpen(false)}>9] Emerging Careers</Link>
                       </div>
                     </div>
                   </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                   
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div>
                <button onClick={() => { openSearch(); setIsMobileMenuOpen(false); }}>
                  <Search size={18} />
                  Search
                </button>
                <a href="/free-mini-assessment.html" onClick={() => setIsMobileMenuOpen(false)}>
                  <button>Free Mini Psychometric Assessment</button>
                </a>
                {!user && (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button>Login / Register</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </section>
  );
}

