"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
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
    router.push("/");
    router.refresh();
  };

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
          <Link href="/" className="hover:text-brand-blue transition-colors text-foreground">Home</Link>
          <Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-brand-blue transition-colors">Services</Link>
          <Link href="/blogs" className="hover:text-brand-blue transition-colors">Blogs</Link>
          <Link href="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link>
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
                className="text-slate-500 hover:text-red-600 font-bold text-xs"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex font-semibold">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-brand-blue text-white hover:bg-brand-blue/90 font-semibold">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
