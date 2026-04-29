import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
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
          <Link href="/services" className="hover:text-brand-blue transition-colors">Services</Link>
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
