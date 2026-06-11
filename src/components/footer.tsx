import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-brand-blue/10 border-b-4 border-b-brand-orange bg-gradient-to-r from-brand-blue/[0.04] to-brand-orange/[0.04] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-12 w-40 flex items-center justify-start">
              <img
                src="/logo.png?v=2"
                alt="MentorMe Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-lg font-semibold text-brand-orange">
              Turning Passions into Professions
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Call us at:</strong> +91-9392707596, +91-8188824440</p>
              <p><strong className="text-foreground">Mail us at:</strong> admin@mentormeright.in</p>
              <p><strong className="text-foreground">Location:</strong> Hyderabad, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">About Us</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/services" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Our Services</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/careers" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Careers</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>

            <h4 className="font-bold text-foreground pt-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Contact Us</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/terms" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Terms & Conditions</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/privacy" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Privacy Policy</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/refund" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Refund Policy</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          {/* School & College Programs */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">AI Learning Hub</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs/robotics" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Robotics</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/ai-school" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">AI</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/vedic-maths" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Vedic Maths</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>

            <h4 className="font-bold text-foreground pt-4">21st Century Skills Hub</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs/ml" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Machine Learning</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/ai-college" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Artificial Intelligence</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/deep-learning" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Deep Learning</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/communication" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Communication Skills</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

          {/* Corporate Programs */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Corporate Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs/digital-marketing" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Digital Marketing</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/python" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Python Full Stack</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/sap-fico" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">SAP FICO</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
              <li><Link href="/programs/power-bi" className="relative group inline-block"><span className="group-hover:text-brand-blue transition-colors">Power BI</span><span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span></Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>Copyright © 2026 Mentor Me | Website Managed by MentrorMe</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-foreground">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
