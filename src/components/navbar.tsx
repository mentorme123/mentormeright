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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About MentorMe" },
    { href: "/career-assessment.html", label: "Career Assessment", external: true },
    { href: "/career-library", label: "Career Library" },
    { href: "/counsellors", label: "Counsellors" },
    { href: "/ai-corner", label: "AI Corner" },
    { href: "/study-abroad", label: "Study Abroad" },
    { href: "/services", label: "Training Programs" },
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
              <span className="group-hover:text-brand-blue transition-colors duration-300">About MentorMe</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/career-assessment.html" className="relative group py-2" target="_blank" rel="noopener noreferrer">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Career Assessment</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/career-library" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Career Library</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/counsellors" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Counsellors</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/ai-corner" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">AI Corner</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/study-abroad" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Study Abroad</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/services" className="relative group py-2">
              <span className="group-hover:text-brand-blue transition-colors duration-300">Training Programs</span>
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

             <Link href="/career-assessment.html" className="hidden lg:block" target="_blank" rel="noopener noreferrer">
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
                <Link href="/career-assessment.html" onClick={() => setIsMobileMenuOpen(false)} target="_blank" rel="noopener noreferrer">
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
