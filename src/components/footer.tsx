"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 pt-12 pb-8 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-brand-blue transition-colors">Our Services</Link></li>
              <li><Link href="/careers" className="hover:text-brand-blue transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-brand-blue transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-brand-blue transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* AI Learning Hub */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">AI Learning Hub</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/robotics" className="hover:text-brand-blue transition-colors">Robotics</Link></li>
              <li><Link href="/programs/ai" className="hover:text-brand-blue transition-colors">AI</Link></li>
              <li><Link href="/programs/vedic-maths" className="hover:text-brand-blue transition-colors">Vedic Maths</Link></li>
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
              <li><Link href="/programs/digital-marketing" className="hover:text-brand-blue transition-colors">Digital Marketing</Link></li>
              <li><Link href="/programs/python-full-stack" className="hover:text-brand-blue transition-colors">Python Full Stack</Link></li>
              <li><Link href="/programs/sap-fico" className="hover:text-brand-blue transition-colors">SAP FICO</Link></li>
              <li><Link href="/programs/power-bi" className="hover:text-brand-blue transition-colors">Power BI</Link></li>
            </ul>
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