"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EntrepreneurshipRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "/downloads/entrepreneurship-material.pdf";
  }, [router]);

  return null;
}
