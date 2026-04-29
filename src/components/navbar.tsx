"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check current user session
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
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
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-brand-blue transition-colors font-bold"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <Sparkles size={10} /> New Features
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/assessment" className="hidden lg:block">
            <Button className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-6 shadow-md shadow-brand-orange/20">
              Free Career Test
            </Button>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="flex flex-col items-end hidden sm:flex">
                 <span className="text-xs font-bold text-slate-800 leading-none">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                 <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest mt-1">Member</span>
              </div>
              <div className="relative h-10 w-10 rounded-full border-2 border-brand-blue/20 overflow-hidden bg-slate-100">
                <Image 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}&backgroundColor=1B3A6B,0D7377,F0A500&fontFamily=Arial&fontWeight=700`}
                  alt="User Avatar"
                  fill
                />
              </div>
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                size="sm"
                className="text-slate-500 hover:text-red-600 font-bold text-xs hidden sm:block"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex font-bold">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-bold">Register</Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-brand-blue"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-40 flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <div className="space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black text-slate-800 border-b border-slate-100 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/assessment" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-black text-brand-orange border-b border-slate-100 pb-4"
            >
              Free Career Test
            </Link>
          </div>
          <div className="mt-auto pb-10 space-y-4">
             {user ? (
               <Button onClick={handleSignOut} className="w-full bg-slate-100 text-red-600 font-bold py-8 text-xl rounded-2xl">
                 Sign Out
               </Button>
             ) : (
               <div className="grid grid-cols-2 gap-4">
                 <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                   <Button variant="outline" className="w-full py-8 text-xl font-bold rounded-2xl">Log in</Button>
                 </Link>
                 <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                   <Button className="w-full bg-brand-blue text-white py-8 text-xl font-bold rounded-2xl">Register</Button>
                 </Link>
               </div>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}
