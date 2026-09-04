"use client";
import React from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, User, LogOut } from "lucide-react";
import { SiteSearch, useSiteSearch } from "@/components/site-search";
import { createClient } from "@/lib/supabase";

export function NavbarInner({
  isSearchOpen,
  closeSearch,
  user,
  profileOpen,
  profileName,
  aiHubOpen,
  setAiHubOpen,
  aiHubAccordion,
  setAiHubAccordion,
  skillsHubOpen,
  setSkillsHubOpen,
  skillsHubAccordion,
  setSkillsHubAccordion,
  careerRoadmapsOpen,
  setCareerRoadmapsOpen,
  openSearch,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  mobileCareerRoadmapsOpen,
  handleLogout,
}: any) {
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
          </div>
        </div>
      </nav>
    </>
  );
}
