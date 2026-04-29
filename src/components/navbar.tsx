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
            <>
              <Link href="/assessment">
                <Button variant="ghost" className="hidden sm:inline-flex font-semibold">Dashboard</Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="font-semibold border-slate-200"
              >
                Sign Out
              </Button>
            </>
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
