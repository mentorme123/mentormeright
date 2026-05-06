"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show on homepage
  if (pathname === "/") return null;

  const handleBack = () => {
    // Fire-and-forget analytics
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: "back_button_click", path: pathname }),
    }).catch(() => {});

    router.back();
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="fixed top-24 left-4 z-[100] w-11 h-11 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 hover:scale-105 active:scale-95 print:hidden group"
    >
      <ArrowLeft size={20} className="group-hover:translate-x-[-2px] transition-transform" />
    </button>
  );
}
