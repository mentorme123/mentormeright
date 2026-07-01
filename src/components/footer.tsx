import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
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
                <li><Link href="/services" className="hover:text-brand-blue transition-colors">Our Services</Link></li>
                <li><Link href="https://mentormeright-gud43a1bj-mentorme123s-projects.vercel.app/career-assessment.html" className="hover:text-brand-blue transition-colors">Career Assessment</Link></li>
                <li><Link href="/careers" className="hover:text-brand-blue transition-colors">Careers</Link></li>
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
      </div>
    </footer>
  );
}
