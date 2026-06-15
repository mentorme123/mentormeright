import Link from "next/link";
import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export function Footer() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <footer className="w-full border-t border-gray-200 pt-12 pb-8 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* K-12 Students */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">K-12 Students</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/future-readiness" className="hover:text-brand-blue transition-colors">Future Readiness Skills</Link></li>
              <li><Link href="/programs/communication-leadership" className="hover:text-brand-blue transition-colors">Communication & Leadership</Link></li>
            </ul>
            <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">STEM & Emerging Technologies:</h4>
            <ul className="space-y-2 text-sm text-gray-600 ml-0">
              <li><Link href="/programs/robotics" className="hover:text-brand-blue transition-colors">Robotics</Link></li>
              <li><Link href="/programs/ai" className="hover:text-brand-blue transition-colors">AI</Link></li>
              <li><Link href="/programs/vedic-maths" className="hover:text-brand-blue transition-colors">Vedic Maths</Link></li>
            </ul>
            <ul className="space-y-2 text-sm text-gray-600 mt-2">
              <li><Link href="/programs/digital-literacy" className="hover:text-brand-blue transition-colors">Digital Literacy</Link></li>
              <li><Link href="/programs/career-life-skills" className="hover:text-brand-blue transition-colors">Career & Life Skills</Link></li>
            </ul>
          </div>

          {/* College Students */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">College Students</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/employability" className="hover:text-brand-blue transition-colors">Employability Skills</Link></li>
              <li><Link href="/programs/business-professional" className="hover:text-brand-blue transition-colors">Business & Professional Skills</Link></li>
              <li><Link href="/programs/digital-analytics" className="hover:text-brand-blue transition-colors">Digital & Analytics Skills</Link></li>
              <li><Link href="/programs/finance-commerce" className="hover:text-brand-blue transition-colors">Finance & Commerce Skills</Link></li>
              <li><Link href="/programs/entrepreneurship" className="hover:text-brand-blue transition-colors">Entrepreneurship & Innovation</Link></li>
            </ul>
          </div>

          {/* 21st Century Skills Hub */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">21st Century Skills Hub</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/machine-learning" className="hover:text-brand-blue transition-colors">Machine Learning</Link></li>
              <li><Link href="/programs/artificial-intelligence" className="hover:text-brand-blue transition-colors">Artificial Intelligence</Link></li>
              <li><Link href="/programs/deep-learning" className="hover:text-brand-blue transition-colors">Deep Learning</Link></li>
              <li><Link href="/programs/communication-skills" className="hover:text-brand-blue transition-colors">Communication Skills</Link></li>
            </ul>
          </div>

          {/* Corporate Programs */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Corporate Programs</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/leadership" className="hover:text-brand-blue transition-colors">Leadership Excellence</Link></li>
              <li><Link href="/programs/business-excellence" className="hover:text-brand-blue transition-colors">Business Excellence</Link></li>
              <li><Link href="/programs/digital-transformation" className="hover:text-brand-blue transition-colors">Digital Transformation</Link></li>
              <li><Link href="/programs/workplace-effectiveness" className="hover:text-brand-blue transition-colors">Workplace Effectiveness</Link></li>
              <li><Link href="/programs/finance-compliance" className="hover:text-brand-blue transition-colors">Finance, Compliance & Risk</Link></li>
            </ul>

{/* Auth Buttons */}
<div className="flex items-center gap-4 mt-8">
  {user ? (
    <>
      <Link href="/dashboard/admin"><button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg text-sm whitespace-nowrap">Dashboard</button></Link>
      <Link href="/dashboard/admin"><button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg text-sm whitespace-nowrap">Admin Panel</button></Link>
    </>
  ) : (
    <>
      <Link href="/register"><button className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg text-sm whitespace-nowrap">Register</button></Link>
      <Link href="/login"><button className="bg-brand-orange text-white hover:bg-brand-orange/90 hover:scale-105 active:scale-95 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg text-sm whitespace-nowrap">Log in</button></Link>
    </>
  )}
</div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>Copyright © 2026 Mentor Me | Website Managed by MentorMe</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-gray-900">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
