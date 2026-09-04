"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const careers = [
  {
    href: "/career-library/engineering-technology",
    label: "1] Engineering & Technology",
  },
  {
    href: "/career-library/medicine-healthcare",
    label: "2] Medicine & Healthcare",
  },
  {
    href: "/career-library/commerce-finance-accounting",
    label: "3] Commerce, Finance & Accounting",
  },
  {
    href: "/career-library/management-business",
    label: "4] Management & Business",
  },
  {
    href: "/career-library/design-creative",
    label: "5] Design & Creative",
  },
  {
    href: "/career-library/law-governance",
    label: "6] Law & Governance",
  },
  {
    href: "/career-library/architecture-construction",
    label: "7] Architecture & Construction",
  },
  {
    href: "/career-library/science-research",
    label: "8] Science & Research",
  },
];

export default function CareerLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEmergingCareers = pathname?.includes("/emerging-careers");

  return (
    <div className={`min-h-screen bg-slate-50 ${isEmergingCareers ? "" : "pt-24 pb-12"}`}>
      <div className={`${isEmergingCareers ? "" : "max-w-7xl mx-auto px-4"}`}>
        {children}
      </div>
    </div>
  );
}