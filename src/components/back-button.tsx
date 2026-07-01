"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function PathTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isContentPage = !pathname.startsWith("https://mentormeright-gt7dzpp8x-mentorme123s-projects.vercel.app/assessment") && 
                            !pathname.startsWith("/login") && 
                            !pathname.startsWith("/register") && 
                            !pathname.startsWith("/auth");
      if (isContentPage) {
        sessionStorage.setItem("mentorme_last_content_page", pathname);
      }
    }
  }, [pathname]);

  return null;
}

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  const handleBack = () => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: "back_button_click", path: pathname }),
    }).catch(() => {});

    const lastContentPage = typeof window !== "undefined" ? sessionStorage.getItem("mentorme_last_content_page") : null;
    if (lastContentPage && lastContentPage !== pathname) {
      router.push(lastContentPage);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-24 right-4 sm:right-8 z-40 flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-lg hover:text-brand-blue hover:border-brand-blue/30 hover:shadow-brand-blue/10 transition-all duration-200 group"
      aria-label="Go back"
    >
      <ArrowLeft
        size={16}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}

export function BackButtonCompact() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: "back_button_click", path: pathname }),
    }).catch(() => {});

    const lastContentPage = typeof window !== "undefined" ? sessionStorage.getItem("mentorme_last_content_page") : null;
    if (lastContentPage && lastContentPage !== pathname) {
      router.push(lastContentPage);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-[68px] right-4 sm:right-8 z-40 flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-lg hover:text-brand-blue hover:border-brand-blue/30 hover:shadow-brand-blue/10 transition-all duration-200 group"
      aria-label="Go back"
    >
      <ArrowLeft
        size={16}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}
