"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Parse target number and suffix (e.g. "20+" -> target: 20, suffix: "+", "50k+" -> target: 50, suffix: "k+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        } else {
          setHasStarted(false);
          setCount(0);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, target]);

  return (
    <div ref={elementRef} className="text-5xl font-extrabold text-brand-orange">
      {count}
      {suffix}
    </div>
  );
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/10 via-background to-background"></div>
        <div className="max-w-5xl space-y-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight"
          >
            Transform Your Career with <br className="hidden md:block" />
            <span className="text-brand-blue">MentorMe</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            We provide a comprehensive range of services, spanning from self-discovery to enhancing employability, serving as a one-stop destination for all the support students require beyond their academic institution.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold text-xl px-12 py-8 rounded-full shadow-2xl shadow-brand-orange/30 transition-transform hover:scale-105 border-4 border-white/20">
                Career Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full border-2 hover:bg-muted transition-all">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What is MentorMe? (Deep Dive + Image) */}
      <section className="py-24 px-4 bg-background relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold">What is MentorMe?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MentorMe is an elite career intelligence platform powered by advanced AI. We help students and professionals discover their true potential through deep psychometric evaluations. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              After taking our 90-question assessment, our proprietary AI engine instantly generates a hyper-personalized, 10-page career roadmap outlining your dominant strengths, blind spots, and ideal job matches.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Science-backed Psychometric Analysis",
                "Proprietary AI-Powered Career Reports",
                "1-on-1 Sessions with Elite Counselors",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="h-6 w-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-orange/20 rounded-3xl blur-3xl transform scale-105"></div>
            <Image 
              src="/images/student.png" 
              alt="Student taking assessment" 
              width={600} 
              height={500} 
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Career Assessments Section */}
      <section className="py-24 px-4 bg-muted/20 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold">Career Assessments for All Ages</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Unlock your full potential with our scientifically validated career assessments. Whether you’re a 6th grader just starting to explore, a college student, or a working professional, our tools provide deep insights into your strengths, preferences, and ideal career paths.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 rounded-3xl blur-3xl transform scale-105"></div>
              <Image 
                src="/images/school.png" 
                alt="School student taking assessment" 
                width={600} 
                height={600} 
                className="relative rounded-3xl shadow-2xl border border-white/10 object-cover"
              />
            </motion.div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                { title: "College Students", desc: "Career assessment test for college students", audience: "UG" },
                { title: "11th-12th Grade", desc: "Psychometric assessment test for class 11-12th students", audience: "GR" },
                { title: "8th-10th Grade", desc: "Psychometric assessment test for class 8-10th students", audience: "ST" },
                { title: "6th-7th Grade", desc: "Psychometric Assessment test for class 6 & 7 students", audience: "ST" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-background p-6 rounded-2xl border-2 border-slate-100/80 hover:border-brand-blue/40 hover:shadow-[0_20px_45px_rgba(8,112,184,0.12)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden group shadow-sm"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-brand-blue/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="text-xl font-bold mb-2 text-brand-blue group-hover:text-brand-orange transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 h-16">{item.desc}</p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                    <Link href={`/assessment?audience=${item.audience}`} className="text-xs sm:text-sm font-black text-white bg-brand-orange hover:bg-brand-orange/90 px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 hover:scale-105 active:scale-95">
                      Career Assessment
                    </Link>
                    <Link href="/contact" className="text-xs sm:text-sm font-bold text-slate-500 hover:text-brand-blue transition-colors duration-300">
                      Contact us
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Guidance + Working Professional Image */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
             <div className="absolute inset-0 bg-gradient-to-tl from-brand-orange/20 to-brand-blue/20 rounded-3xl blur-3xl transform scale-105"></div>
             <Image 
              src="/images/professional.png" 
              alt="Working Professional" 
              width={600} 
              height={500} 
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold">Career Guidance for All Stages</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expert advice tailored to your specific academic phase or career transition.
            </p>
            <div className="space-y-4 pt-4">
              {[
                { title: "6th-7th Class Students", desc: "Discover strengths early and guide young minds toward the right path." },
                { title: "8th-10th Class Students", desc: "Pick subjects & careers with science-backed assessments & expert advice." },
                { title: "11th-12th Class Students", desc: "Decide your future confidently—exams, colleges, careers." },
                { title: "College Students & Professionals", desc: "Strategize, skill up, and land your dream roles with our mentors." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-2xl border">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">{i+1}</div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Recent Program Partners Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-brand-blue via-brand-blue to-[#112D55] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0"></div>
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-4xl font-bold text-white">Our Recent Program Partners</h2>
            <p className="text-white/80 text-lg">These are some of our Prestigious Clients</p>
          </motion.div>

          {/* Scrolling Carousel */}
          <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-blue to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-blue to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 partners-scroll">
              {[
                { name: "TSWRDC Nalgonda", logo: "/images/partners/logo1.png" },
                { name: "Pragati Mahavidyalaya", logo: "/images/partners/logo2.png" },
                { name: "Keshav Memorial", logo: "/images/partners/logo3.png" },
                { name: "Fiji School", logo: "/images/partners/logo4.png" },
                { name: "St. Joseph's College", logo: "/images/partners/logo1.png" },
                { name: "Howard Park International", logo: "/images/partners/logo2.png" },
                { name: "Narayana Group", logo: "/images/partners/logo3.png" },
                { name: "Sri Chaitanya", logo: "/images/partners/logo4.png" },
                { name: "Delhi Public School", logo: "/images/partners/logo1.png" },
                { name: "Kendriya Vidyalaya", logo: "/images/partners/logo2.png" },
                // Duplicate for seamless loop
                { name: "TSWRDC Nalgonda", logo: "/images/partners/logo1.png" },
                { name: "Pragati Mahavidyalaya", logo: "/images/partners/logo2.png" },
                { name: "Keshav Memorial", logo: "/images/partners/logo3.png" },
                { name: "Fiji School", logo: "/images/partners/logo4.png" },
                { name: "St. Joseph's College", logo: "/images/partners/logo1.png" },
                { name: "Howard Park International", logo: "/images/partners/logo2.png" },
                { name: "Narayana Group", logo: "/images/partners/logo3.png" },
                { name: "Sri Chaitanya", logo: "/images/partners/logo4.png" },
                { name: "Delhi Public School", logo: "/images/partners/logo1.png" },
                { name: "Kendriya Vidyalaya", logo: "/images/partners/logo2.png" },
              ].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                  style={{ minWidth: "200px" }}
                >
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-800 text-center leading-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .partners-scroll {
            animation: scroll-partners 30s linear infinite;
            width: max-content;
          }
          .partners-scroll:hover {
            animation-play-state: paused;
          }
          @keyframes scroll-partners {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Skill Training */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center"
          >
            Skill Training Programs
          </motion.h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Future AI Leaders Program", 
                subtitle: "AI Classes for School Students",
                highlights: "Hands‑on projects | Generative AI ML & NLP | Ethics & responsible AI | Teacher upskilling"
              },
              { 
                title: "Robotics & STEM Learning for Kids", 
                subtitle: "Robotics Classes for School Students",
                highlights: "Hands‑on training | No lab investment | Robotics Expo | STEM Integration | Robotics Lab Upgrade | Teacher Training"
              },
              { 
                title: "Smart Maths with Vedic Techniques", 
                subtitle: "Vedic Maths Classes for School Students",
                highlights: "Fast‑Track Mental Math | No Tools Needed | Expert‑Led Sessions | Certification"
              },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl border-2 border-slate-100/80 bg-background shadow-md hover:border-brand-blue/40 hover:shadow-[0_30px_60px_rgba(8,112,184,0.15)] transition-all duration-500 hover:-translate-y-3 group"
              >
                <h3 className="text-2xl font-bold mb-1 text-brand-blue group-hover:text-brand-orange transition-colors duration-300">{item.title}</h3>
                <p className="font-medium text-brand-orange mb-6 group-hover:text-brand-blue transition-colors duration-300">{item.subtitle}</p>
                <h4 className="font-semibold text-sm uppercase tracking-wider mb-2">Key Highlights</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{item.highlights}</p>
                <div className="flex gap-4">
                  <Link href="/services" className="flex-1">
                    <button className="w-full py-3 border-2 border-brand-blue/20 text-brand-blue font-bold rounded-xl hover:bg-brand-blue hover:text-white transition-all duration-300">Know more</button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full py-3 bg-brand-blue text-white hover:bg-brand-orange border-2 border-transparent font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-brand-orange/30">Contact us</button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad Collaboration */}
      <section className="py-24 px-4 bg-gradient-to-tl from-brand-blue via-brand-blue to-[#112D55] text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -ml-64 -mb-64 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Study Abroad Support
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl leading-relaxed text-white/90"
          >
            MentorMe announces a strategic collaboration with <strong>United Educational Services</strong>, an AIRC, British Council, and British High Commission certified agency. We provide students with a seamless journey to top international destinations, including the US, UK, Australia, Canada, Ireland, and New Zealand.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
          >
            <Link href="/study-abroad">
              <button className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg font-bold px-10 py-4 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95">
                Learn more
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-background border-b">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Why Choose MentorMe?</h2>
          <p className="text-lg text-muted-foreground">We are proud to present the success of our Programs</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "States", value: "20+" },
              { label: "Clients", value: "150+" },
              { label: "Students", value: "50k+" },
              { label: "Hours", value: "10k+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                className="space-y-2"
              >
                <Counter value={stat.value} />
                <div className="text-lg font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Connect with us</h2>
            <p className="text-lg text-muted-foreground">
              Create a win-win opportunity: gain practical AI expertise and unlock new income streams with our innovative Train-the-Trainer program!
            </p>
            <div className="space-y-4">
              <p><strong>Call us at:</strong><br/> +91-9392707596, +91-8188824440</p>
              <p><strong>Mail us at:</strong><br/> admin@mentormeright.in</p>
              <p><strong>Location:</strong><br/> Hyderabad, India</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background p-8 rounded-3xl shadow-lg border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-10"></div>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Application Received!</h3>
                  <p className="text-muted-foreground">Our Executive Partnership Team will review your profile and contact you within 24 hours.</p>
                </div>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl">Submit another inquiry</Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6">Apply For</h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input required type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input required type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email ID</label>
                      <input required type="email" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input required type="tel" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea required rows={4} className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none"></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 py-6 text-lg font-bold rounded-xl mt-4">
                    Submit Application
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
