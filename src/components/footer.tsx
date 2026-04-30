import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-12 w-40">
              <Image 
                src="/logo.png" 
                alt="MentorMe Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <p className="text-lg font-semibold text-brand-orange">
              Turning Passions into Professions
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-bold text-slate-900 mb-1">Student Support:</p>
                <p>+91-9392707596 | admin@mentormeright.in</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">Institutions & B2B:</p>
                <p>+91-7674982983 | sandeep@mentormeright.in</p>
              </div>
              <p><strong className="text-foreground">Location:</strong> Hyderabad, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-brand-blue">About Us</Link></li>
              <li><Link href="/services" className="hover:text-brand-blue">Our Services</Link></li>
              <li><Link href="/careers" className="hover:text-brand-blue">Careers</Link></li>
            </ul>
            
            <h4 className="font-bold text-foreground pt-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-brand-blue">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-brand-blue">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-blue">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-brand-blue">Refund Policy</Link></li>
            </ul>
          </div>

          {/* School & College Programs */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">School Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs/robotics" className="hover:text-brand-blue">Robotics</Link></li>
              <li><Link href="/programs/ai-school" className="hover:text-brand-blue">AI</Link></li>
              <li><Link href="/programs/vedic-maths" className="hover:text-brand-blue">Vedic Maths</Link></li>
            </ul>

            <h4 className="font-bold text-foreground pt-4">College Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs/ml" className="hover:text-brand-blue">Machine Learning</Link></li>
              <li><Link href="/programs/ai-college" className="hover:text-brand-blue">Artificial Intelligence</Link></li>
              <li><Link href="/programs/deep-learning" className="hover:text-brand-blue">Deep Learning</Link></li>
              <li><Link href="/programs/communication" className="hover:text-brand-blue">Communication Skills</Link></li>
            </ul>
          </div>

          {/* Corporate Programs */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Corporate Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/programs/digital-marketing" className="hover:text-brand-blue">Digital Marketing</Link></li>
              <li><Link href="/programs/python" className="hover:text-brand-blue">Python Full Stack</Link></li>
              <li><Link href="/programs/sap-fico" className="hover:text-brand-blue">SAP FICO</Link></li>
              <li><Link href="/programs/power-bi" className="hover:text-brand-blue">Power BI</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>Copyright © {new Date().getFullYear()} Mentor Me | Website Managed by Jeh Advertising</p>
          <div className="flex gap-4">
            <Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy Practices</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
