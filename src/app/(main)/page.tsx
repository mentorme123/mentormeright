"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, GraduationCap, Globe2, ArrowRight, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const slides = [
  {
    image: "/images/home-hero-1.png",
    heading: "Build Future-Ready Careers",
    highlight: "with AI",
    subtitle: "MentorMe helps school students, college learners, and working professionals discover career paths, build future-ready skills, and achieve success in an AI-driven world.",
    btn1Text: "Career Assessment",
    btn1Link: "/login",
    btn2Text: "Contact Us",
    btn2Link: "/contact"
  },
  {
    image: "/images/home-hero-2.png",
    heading: "AI-Powered Career ",
    highlight: "Intelligence",
    subtitle: "Discover strengths, ideal career pathways, and growth opportunities through AI-based psychometric assessments, AI-driven career insights, and expert mentoring.",
    btn1Text: "Career Assessment",
    btn1Link: "/login",
    btn2Text: "Our Programs",
    btn2Link: "/services"
  },
  {
    image: "/images/home-hero-3.png",
    heading: "Future Skills & ",
    highlight: "Employability",
    subtitle: "Master AI, Robotics, emerging technologies, and workplace skills that drive academic, professional, and career success.",
    btn1Text: "Explore Services",
    btn1Link: "/services",
    btn2Text: "Partner With Us",
    btn2Link: "/contact"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleCard = (index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  const programs = [
    {
      title: "K-12 Programs",
      description: "AI foundations, robotics, critical thinking, and public speaking for school students.",
      icon: GraduationCap,
      color: "bg-blue-600",
      link: "/skills-hub"
    },
    {
      title: "College Programs",
      description: "AI career accelerators, data analytics, digital marketing, and professional certifications.",
      icon: Briefcase,
      color: "bg-brand-orange",
      link: "/skills-hub"
    },
    {
      title: "Corporate Training",
      description: "Generative AI, leadership, finance, and workplace productivity programs for professionals.",
      icon: Globe2,
      color: "bg-purple-600",
      link: "/skills-hub"
    }
  ];

  const stats = [
    { value: "15+", label: "Partner Institutions" },
    { value: "5000+", label: "Students Trained" },
    { value: "20+", label: "Programs Offered" },
    { value: "95%", label: "Satisfaction Rate" }
  ];

  const institutions = [
    {
      name: "DG Vaishnav College, Chennai",
      logo: "/images/partners/ddgd-vaishnav.jpg",
      description: "MentorMe partnered with DG Vaishnav College to deliver industry-focused certification programs in data analytics and business intelligence.",
      program: "Critical Thinking, Problem Solving & Data Analytics Certification Programs"
    },
    {
      name: "Pragati Mahavidyalaya Junior College, Hyderabad",
      logo: "/images/partners/pragati-maha.jpg",
      description: "MentorMe partnered with Pragati Mahavidyalaya to deliver comprehensive 21st Century Skills Development Programs.",
      program: "21st Century Skills Development Program"
    },
    {
      name: "St. Joseph's Degree & PG College, Hyderabad",
      logo: "/images/partners/st-josephs.jpg",
      description: "MentorMe partnered with St. Joseph's College to deliver AI & Machine Learning certification programs.",
      program: "Artificial Intelligence & Machine Learning Value-Added Certification Program"
    },
    {
      name: "ELGI Matriculation Higher Secondary School, Coimbatore",
      logo: "/images/partners/elgi-school.png",
      description: "MentorMe partnered with ELGI School to deliver comprehensive Career Guidance Programs with psychometric assessments.",
      program: "Career Guidance & Career Planning Program"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Carousel */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 lg:pt-36 lg:pb-28 min-h-[500px] lg:min-h-[600px] text-white overflow-hidden">
        {/* Background Image Carousel (Horizontal Slide transition) */}
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          {slides.map((slide, idx) => {
            let translateClass = "translate-x-full";
            if (idx === currentSlide) {
              translateClass = "translate-x-0";
            } else if (idx === (currentSlide - 1 + slides.length) % slides.length) {
              translateClass = "-translate-x-full";
            }
            return (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[800ms] ease-in-out ${translateClass}`}
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
            );
          })}
          {/* Rich modern dark gradient overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/90 via-[#0a182b]/85 to-[#0b1b30]/95 z-0" />
        </div>

        {/* Dynamic content with horizontal slide animation */}
        <div className="max-w-5xl space-y-8 relative z-10 px-4">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-8"
          >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                {slides[currentSlide].heading}
                <br className="hidden md:block" />
                <span className="text-brand-orange drop-shadow-[0_2px_8px_rgba(244,114,22,0.25)]">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-2 drop-shadow-md">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link href={slides[currentSlide].btn1Link} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold text-lg sm:text-xl px-10 py-5 rounded-full shadow-2xl shadow-brand-orange/30 transition-transform hover:scale-105 border-2 border-white/20">
                    {slides[currentSlide].btn1Text}
                  </Button>
                </Link>
                <Link href={slides[currentSlide].btn2Link} className="w-full sm:w-auto">
                  <Button size="lg" variant="ghost" className="w-full h-auto text-lg sm:text-xl font-extrabold px-10 py-5 rounded-full border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 transition-all">
                    {slides[currentSlide].btn2Text}
                  </Button>
                </Link>
              </div>
            </motion.div>

          {/* Dots Navigation Indicator */}
          <div className="flex justify-center gap-3 pt-12">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${idx === currentSlide
                  ? "w-8 bg-brand-orange"
                  : "w-3 bg-white/40 hover:bg-white/60"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-extrabold text-brand-orange mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Programs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive programs designed for students, college learners, and professionals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className={`w-14 h-14 ${program.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  <program.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{program.title}</h3>
                <p className="text-slate-600 mb-6">{program.description}</p>
                <Link href={program.link} className="text-brand-blue font-semibold hover:underline inline-flex items-center gap-2">
                  Explore Programs <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose MentorMe?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We combine AI technology, industry expertise, and proven methodologies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "AI-powered career assessments",
              "Industry-relevant curriculum",
              "Expert mentors and counselors",
              "Proven track record with 15+ institutions"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Leading Institutions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We have partnered with schools, colleges, and organizations across India.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {institutions.map((institution, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm cursor-pointer transition-all ${expandedIndex === idx ? "ring-2 ring-brand-blue" : ""}`}
                onClick={() => toggleCard(idx)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <Image src={institution.logo} alt={institution.name} width={64} height={64} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{institution.name}</h3>
                    <p className="text-sm text-brand-blue font-medium mb-2">{institution.program}</p>
                    <p className="text-slate-600 text-sm">{institution.description}</p>
                    {expandedIndex === idx && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-sm text-slate-500">Program Overview:</p>
                        <ul className="mt-2 space-y-1">
                          {[1, 2, 3].map((i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-brand-blue" />
                              Program feature {i}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-slate-300 text-lg mb-8">Take the first step towards your future. Get a career assessment or contact us today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-lg px-8 py-5 rounded-full text-base font-bold">
                Take Career Assessment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-5 rounded-full text-base font-bold">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">MentorMe</h3>
            <p className="text-sm leading-relaxed">AI-powered career development and employability solutions for students, colleges, and corporations.</p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail size={16} /> info@mentorme.in</p>
              <p className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> Hyderabad, India</p>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link href="/services" className="block hover:text-white transition-colors">Services</Link>
              <Link href="/contact" className="block hover:text-white transition-colors">Contact Us</Link>
              <Link href="/skills-hub" className="block hover:text-white transition-colors">Programs</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
