"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase } from "lucide-react";

const categories = [
  {
    href: "/career-library/engineering-technology",
    label: "Engineering & Technology",
    icon: "💻",
  },
  {
    href: "/career-library/medicine-healthcare",
    label: "Medicine & Healthcare",
    icon: "🏥",
  },
  {
    href: "/career-library/commerce-finance-accounting",
    label: "Commerce, Finance & Accounting",
    icon: "📊",
  },
];

export default function CareerLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-24">
              <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm mb-3 px-2">
                Career Categories
              </h3>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const isActive = pathname === category.href || pathname.startsWith(category.href + "/");
                  return (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-base">{category.icon}</span>
                      <span>{category.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}