import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 pt-12 pb-8 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* K-12 Students */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">K-12 Students</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/future-readiness" className="hover:text-brand-blue transition-colors">Future Readiness Skills</Link></li>
              <li><Link href="/programs/communication-leadership" className="hover:text-brand-blue transition-colors">Communication & Leadership</Link></li>
            </ul>
            <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">STEM & Emerging Technologies:</h4>
            <ul className="space-y-2 text-sm text-gray-600 ml-0">
              <li><Link href="/programs/ai-robotics" className="hover:text-brand-blue transition-colors">AI + Robotics Explorer Program</Link></li>
              <li><Link href="/programs/ai-foundations" className="hover:text-brand-blue transition-colors">AI Foundations for School Students</Link></li>
              <li><Link href="/programs/generative-ai" className="hover:text-brand-blue transition-colors">Generative AI & Prompt Engineering</Link></li>
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

          {/* Corporate Professionals */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Corporate Professionals</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/leadership" className="hover:text-brand-blue transition-colors">Leadership Excellence</Link></li>
              <li><Link href="/programs/business-excellence" className="hover:text-brand-blue transition-colors">Business Excellence</Link></li>
              <li><Link href="/programs/digital-transformation" className="hover:text-brand-blue transition-colors">Digital Transformation</Link></li>
              <li><Link href="/programs/workplace-effectiveness" className="hover:text-brand-blue transition-colors">Workplace Effectiveness</Link></li>
              <li><Link href="/programs/finance-compliance" className="hover:text-brand-blue transition-colors">Finance, Compliance & Risk</Link></li>
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
