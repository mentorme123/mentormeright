"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        <div className="w-full max-w-[1700px] mx-auto flex h-20 items-center justify-between px-6 sm:px-10 lg:px-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-14 w-44">
              <Image
                src="/logo.png"
                alt="MentorMe Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[17px] font-bold text-slate-800">
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

            <Link
              href="/ai-learning-hub"
              className="relative group py-2"
            >
              <span className="group-hover:text-brand-blue transition-colors duration-300">
                AI Learning Hub
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
            </Link>

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
                Our Programs{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="py-2">
                    <div className="px-3 pt-2 pb-1">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Career Counseling</p>
                    </div>
                    <div className="flex flex-col pl-4">
                      <Link href="/career-library" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">Career Library</Link>
                      <Link href="/career-assessment.html" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">Career Assessment</Link>
                      <Link href="/career-simulator" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">Career Simulator</Link>
                      <Link href="/counsellors" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">Counsellors</Link>
                    </div>

                    <div className="border-t border-slate-100 my-2" />

                    <div className="px-3 pt-1 pb-1">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Training Programs</p>
                    </div>
                    <div className="flex flex-col pl-4">
                      <Link href="/k12-programs" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">K12 Programs</Link>
                      <Link href="/college-programs" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">College Programs</Link>
                    </div>

                    <div className="border-t border-slate-100 my-2" />

                    <div className="px-3 pt-1 pb-1">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">International</p>
                    </div>
                    <div className="flex flex-col pl-4">
                      <Link href="/study-abroad" className="text-sm font-medium text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors px-3 py-1.5 rounded-lg">Study Abroad</Link>
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

          <div className="flex items-center gap-3">
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
              <button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all duration-300 text-[14px] tracking-tight">
                Career Assessment
              </button>
            </Link>

            <Link href="/register" className="hidden sm:block">
              <button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/20">
                Register
              </button>
            </Link>

            <Link href="/login">
              <button className="hidden sm:inline-flex bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-brand-orange/20">
                Log in
              </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
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
