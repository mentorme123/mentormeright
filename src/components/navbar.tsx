"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

        <div className="flex items-center gap-4">
          <Link href="/assessment" className="hidden lg:block">
            <Button className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-6 shadow-md shadow-brand-orange/20 animate-pulse-slow">
              Free Career Assessment Test
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex font-semibold">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold">Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

