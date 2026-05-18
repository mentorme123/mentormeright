"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on homepage — no need for a back button on the landing page
  if (pathname === "/") return null;

  const handleBack = () => {
    // Fire-and-forget analytics
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: "back_button_click", path: pathname }),
    }).catch(() => {});

    if (pathname.startsWith("/assessment")) {
      const referrer = typeof document !== "undefined" ? document.referrer : "";
      const isAuthPage = referrer.includes("/login") || referrer.includes("/register") || referrer.includes("/auth");
      
      if (isAuthPage || !referrer) {
        // If previous page in history is an auth page, redirect to home to break loop
        router.push("/");
      } else {
        // Otherwise, safely go back to the actual previous content page (e.g. /about, /services)
        router.back();
      }
    } else {
      router.back();
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

/** Variant for layouts with a shorter header (e.g. assessment, dashboard) */
export function BackButtonCompact() {
  const router = useRouter();
  const pathname = usePathname();

  // if (pathname === "/") return null;

  const handleBack = () => {
    // Fire-and-forget analytics
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: "back_button_click", path: pathname }),
    }).catch(() => {});

    if (pathname.startsWith("/assessment")) {
      const referrer = typeof document !== "undefined" ? document.referrer : "";
      const isAuthPage = referrer.includes("/login") || referrer.includes("/register") || referrer.includes("/auth");
      
      if (isAuthPage || !referrer) {
        // If previous page in history is an auth page, redirect to home to break loop
        router.push("/");
      } else {
        // Otherwise, safely go back to the actual previous content page (e.g. /about, /services)
        router.back();
      }
    } else {
      router.back();
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
