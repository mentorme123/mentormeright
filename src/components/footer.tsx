import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 mb-10">

          {/* Left Column – Brand Info */}
          <div className="space-y-4">
            <Link href="/">
              <img
                src="/logo.png?v=7"
                alt="MentorMe Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-brand-orange font-semibold text-sm leading-snug">
              Turning Passions into Professions
            </p>
            <div className="text-xs text-gray-700 space-y-1 pt-2">
              <p><span className="font-semibold text-gray-900">Call us at:</span> +91-9392707596, +91-8188824440</p>
              <p><span className="font-semibold text-gray-900">Mail us at:</span> admin@mentormeright.in</p>
              <p><span className="font-semibold text-gray-900">Location:</span> Hyderabad, India</p>
            </div>
          </div>

          {/* Company & Support */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
                <li><Link href="/career-library" className="hover:text-brand-blue transition-colors">Career Roadmaps</Link></li>
                <li><Link href="/payment" className="hover:text-brand-blue transition-colors">MentorMe Career Intelligence Report</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link></li>
                <li><Link href="/terms" className="hover:text-brand-blue transition-colors">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund-policy" className="hover:text-brand-blue transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* K-12 Students */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 mb-3">K-12 Students</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/ai-foundations-k12" className="hover:text-brand-blue transition-colors">AI Foundations for School Students</Link></li>
              <li><Link href="/programs/generative-ai-k12" className="hover:text-brand-blue transition-colors">Generative AI &amp; Prompt Engineering for Students</Link></li>
              <li><Link href="/programs/ai-robotics-k12" className="hover:text-brand-blue transition-colors">AI + Robotics Explorer Program</Link></li>
            </ul>
          </div>

          {/* College Students */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 mb-3">College Students</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/ai-career-accelerator" className="hover:text-brand-blue transition-colors">AI Career Accelerator Program</Link></li>
              <li><Link href="/programs/ai-data-analytics" className="hover:text-brand-blue transition-colors">AI &amp; Data Analytics Professional Program</Link></li>
              <li><Link href="/programs/ai-business-management" className="hover:text-brand-blue transition-colors">AI for Business, Finance &amp; Management</Link></li>
            </ul>
          </div>

          {/* Corporate Professionals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Corporate Professionals</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/generative-ai-workplace" className="hover:text-brand-blue transition-colors">Generative AI for Workplace Productivity</Link></li>
              <li><Link href="/programs/ai-finance-accounting" className="hover:text-brand-blue transition-colors">AI for Finance &amp; Accounting Professionals</Link></li>
              <li><Link href="/programs/ai-leadership" className="hover:text-brand-blue transition-colors">AI Leadership &amp; Digital Transformation Program</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>Copyright © 2026 Mentor Me | Website Managed by MentorMe</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-gray-900">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <p className="text-sm font-bold text-gray-700">Connect with us</p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/MentorMeRight/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://www.instagram.com/mentormeright/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-pink transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/mentormeright/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.youtube.com/@MentorMeRight" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
