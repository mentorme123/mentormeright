"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const commerceCareers = [
  {
    href: "/career-library/commerce-finance-accounting/investment-banker",
    label: "Investment Banker Career in India",
  },
  {
    href: "/career-library/commerce-finance-accounting/digital-marketing-specialist",
    label: "Digital Marketing Specialist Career in India",
  },
];

export default function CommerceFinanceAccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-24">
              <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm mb-3 px-2">
                Commerce, Finance &amp; Accounting
              </h3>
              <nav className="space-y-1">
                {commerceCareers.map((career) => {
                  const isActive = pathname === career.href;
                  return (
                    <Link
                      key={career.href}
                      href={career.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {career.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}