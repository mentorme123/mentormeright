"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="bg-brand-blue/5 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-brand-blue"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            We&apos;re here to help you navigate your career journey. Reach out to the MentorMe team today.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 flex-1">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Official Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re a student looking for guidance, a professional seeking a pivot, or an institution wanting to partner with us, we are just a message away.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <div className="bg-background p-6 rounded-2xl border shadow-sm space-y-4 hover:border-brand-orange/50 transition-colors">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">WhatsApp Us</h3>
                  <p className="text-muted-foreground text-sm mb-3">Instant support from our team.</p>
                  <a href="https://wa.me/919392707596" target="_blank" rel="noreferrer" className="text-brand-blue font-medium hover:underline block">
                    +91-9392707596
                  </a>
                  <a href="https://wa.me/918188824440" target="_blank" rel="noreferrer" className="text-brand-blue font-medium hover:underline block">
                    +91-8188824440
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-background p-6 rounded-2xl border shadow-sm space-y-4 hover:border-brand-blue/50 transition-colors">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Support</h3>
                  <p className="text-muted-foreground text-sm mb-3">For detailed inquiries and partnerships.</p>
                  <a href="mailto:admin@mentormeright.in" className="text-brand-blue font-medium hover:underline break-all">
                    admin@mentormeright.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-background p-6 rounded-2xl border shadow-sm space-y-4 hover:border-brand-orange/50 transition-colors">
                <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-3">Speak directly to our advisors.</p>
                  <a href="tel:+919392707596" className="text-brand-blue font-medium hover:underline block">
                    +91-9392707596
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="bg-background p-6 rounded-2xl border shadow-sm space-y-4 hover:border-brand-blue/50 transition-colors">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Headquarters</h3>
                  <p className="text-muted-foreground text-sm mb-3">Visit us for in-person counseling.</p>
                  <p className="text-brand-blue font-medium">
                    Hyderabad, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-8 sm:p-10 rounded-3xl border shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-bl-full -z-10"></div>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Message</label>
                <textarea rows={5} className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="How can we help you?"></textarea>
              </div>
              <Button type="button" className="w-full bg-brand-blue text-white hover:bg-brand-blue/90 py-6 text-lg font-bold rounded-xl mt-4">
                Send Message
              </Button>
            </form>
          </motion.div>
          
        </div>
      </section>
    </div>
  );
}
