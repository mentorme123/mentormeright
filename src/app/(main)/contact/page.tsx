"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Phone, Loader2, CheckCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";

function ContactForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const SUBJECT_OPTIONS = [
    { value: "", label: "How can we help?" },
    { value: "General Inquiry", label: "General Inquiry" },
    { value: "Study Abroad", label: "Study Abroad" },
    { value: "Career Guidance", label: "Career Guidance" },
    { value: "Program Inquiry", label: "Program Inquiry" },
    { value: "Partnership Request", label: "Partnership Request" },
    { value: "Feature Suggestion", label: "Feature Suggestion" },
  ];

  useEffect(() => {
    const msg = searchParams.get("message");
    const university = searchParams.get("university");
    const country = searchParams.get("country");
    
    if (msg) {
      setMessage(msg);
    }
    if (university && country) {
      setSubject("Study Abroad");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, subject, message }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Message Sent!</h3>
          <p className="text-muted-foreground">Thank you for reaching out. Our team will get back to you shortly.</p>
        </div>
        <Button variant="outline" onClick={() => setStatus("idle")} className="rounded-xl mt-4">Send another message</Button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
          <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="John" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow"
        >
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} disabled={option.value === ""}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Message <span className="text-red-500">*</span></label>
        <textarea 
          required
          rows={5} 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none transition-shadow" 
          placeholder="Tell us more about your inquiry..."
        ></textarea>
      </div>
      <div className="flex gap-3 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1 py-6 text-lg font-bold rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
        >
          <X className="w-5 h-5 mr-2" /> Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-blue text-white hover:bg-brand-blue/90 py-6 text-lg font-bold rounded-xl transition-all">
          {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...</> : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

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
                  <a href="https://api.whatsapp.com/send?phone=918188824440" target="_blank" rel="noreferrer" className="text-brand-blue font-medium hover:underline block">
                    +91-9392707596
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=918188824440" target="_blank" rel="noreferrer" className="text-brand-blue font-medium hover:underline block">
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

          {/* Contact Form Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-8 sm:p-10 rounded-3xl border shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-bl-full -z-10"></div>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><p className="text-muted-foreground">Loading form...</p></div>}>
              <ContactForm />
            </Suspense>
          </motion.div>
          
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-brand-blue/5">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Visit Our Office</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shop no. 103, Purna Chandra Bhavan, near Ramalayam St, opposite HMT Community Hall, JNTUH, Kukatpally, Hyderabad, Telangana 500085
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[450px] rounded-3xl overflow-hidden border shadow-xl relative bg-muted flex items-center justify-center"
          >
            <iframe 
              src="https://maps.google.com/maps?q=17.4952,78.3916&z=15&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MentorMe Office Location"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
