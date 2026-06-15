import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">

          {/* Left Column – Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/">
              <img
                src="/logo.png"
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

          {/* Company + Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-brand-blue transition-colors">Our Services</Link></li>
              <li><Link href="/careers" className="hover:text-brand-blue transition-colors">Careers</Link></li>
            </ul>

            <h4 className="text-sm font-bold text-gray-900 mt-6 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-brand-blue transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-brand-blue transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* AI Learning Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 mb-3">AI Learning Hub</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/robotics" className="hover:text-brand-blue transition-colors">Robotics</Link></li>
              <li><Link href="/programs/ai" className="hover:text-brand-blue transition-colors">AI</Link></li>
              <li><Link href="/programs/vedic-maths" className="hover:text-brand-blue transition-colors">Vedic Maths</Link></li>
            </ul>

            <h4 className="text-sm font-bold text-gray-900 mt-6 mb-3">21st Century Skills Hub</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/machine-learning" className="hover:text-brand-blue transition-colors">Machine Learning</Link></li>
              <li><Link href="/programs/artificial-intelligence" className="hover:text-brand-blue transition-colors">Artificial Intelligence</Link></li>
              <li><Link href="/programs/deep-learning" className="hover:text-brand-blue transition-colors">Deep Learning</Link></li>
              <li><Link href="/programs/communication-skills" className="hover:text-brand-blue transition-colors">Communication Skills</Link></li>
            </ul>
          </div>

          {/* Corporate Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Corporate Programs</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/programs/digital-marketing" className="hover:text-brand-blue transition-colors">Digital Marketing</Link></li>
              <li><Link href="/programs/python-full-stack" className="hover:text-brand-blue transition-colors">Python Full Stack</Link></li>
              <li><Link href="/programs/sap-fico" className="hover:text-brand-blue transition-colors">SAP FICO</Link></li>
              <li><Link href="/programs/power-bi" className="hover:text-brand-blue transition-colors">Power BI</Link></li>
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