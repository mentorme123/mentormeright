"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteSearch, Search } from "@/components/site-search";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  useEffect(() => {
    console.log("mounted");
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <section>
      <SiteSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <nav>
        <div className="w-[480px]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:bg-brand-blue/5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{link.label}</span>
                <Search size={18} className="text-slate-500" />
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
