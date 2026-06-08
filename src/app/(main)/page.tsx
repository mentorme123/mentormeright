"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Phone, Mail, MapPin, Globe2 } from "lucide-react";

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
  const [skillTab, setSkillTab] = useState("k12");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  const institutions = [
    {
      name: "DDGD Vaishnav Chennai",
      logo: "/images/partners/ddgd-vaishnav.jpg",
      description: "DDGD Vaishnav Chennai is a prestigious institution known for academic excellence and holistic student development.",
      website: "#",
      contact: [{ label: "Location", value: "Chennai, Tamil Nadu" }]
    },
    {
      name: "ICBM School of Business",
      logo: "/images/partners/icbm.jpg",
      description: "ICBM School of Business Excellence is a premier business school offering quality management education and industry-focused programs.",
      website: "#",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }]
    },
    {
      name: "TSWRDC Nalgonda",
      logo: "/images/partners/tswrdc.jpg",
      description: "TSWRDC Nalgonda is a government residential degree college committed to providing quality higher education to underprivileged students.",
      website: "#",
      contact: [{ label: "Location", value: "Nalgonda, Telangana" }]
    },
    {
      name: "Pragati Mahavidyalaya",
      logo: "/images/partners/pragati-maha.jpg",
      description: "Pragati Mahavidyalaya is a leading educational institution dedicated to empowering students through quality education and career guidance.",
      website: "#",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }]
    },
    {
      name: "Keshav Memorial",
      logo: "/images/partners/keshav-memorial.jpg",
      description: "Keshav Memorial Educational Society is a renowned group of institutions providing excellence in education from school to college level.",
      website: "#",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }]
    },
    {
      name: "ELGI School",
      logo: "/images/partners/elgi-school.jpg",
      description: "ELGI School, Coimbatore — Aspire & Excel. Established in 1987 with 67 students and 3 teachers, ELGI School has grown into a thriving institution with 1,400 students and 60+ teaching staff, spread across a 4-acre campus with a 200m athletic track. The school follows the CBSE syllabus and emphasizes holistic education, career guidance, club activities, sports, and global exposure.",
      website: "https://www.elgischool.com",
      contact: [
        { label: "Address", value: "Kovai Mahalingapuram, Vellalore, Coimbatore, Tamil Nadu 641111" },
        { label: "Email", value: "info@elgischool.org", href: "mailto:info@elgischool.org" },
        { label: "Phone", value: "0422 241 4194", href: "tel:04222414194" }
      ]
    },
    {
      name: "St. Joseph's Degree & PG College",
      logo: "/images/partners/st-josephs.jpg",
      description: "St. Joseph's Degree & PG College, Hyderabad — A premier institution offering undergraduate and postgraduate programs, known for academic excellence, holistic student development, and strong industry connections.",
      website: "https://stjosephspgcollege.ac.in",
      contact: [{ label: "Location", value: "Hyderabad, Telangana" }]
    },
    {
      name: "Howard Park International",
      logo: "/images/partners/howard-park.jpg",
      description: "Howard Public School CBSE, Himayathnagar, Hyderabad — Established in 1986, Howard Public School is one of the finest CBSE institutions dedicated to academic excellence, self-discipline, rational thinking, and global vision. Celebrating 40 glorious years of educational excellence.",
      website: "https://howardinstitutions.org",
      contact: [
        { label: "Address", value: "H. No. 3-6-568, Street No. 8, Himayathnagar, Hyderabad – 500 029" },
        { label: "Email", value: "howardinstitutions@gmail.com", href: "mailto:howardinstitutions@gmail.com" },
        { label: "Phone", value: "040-27630610", href: "tel:04027630610" }
      ]
    },
    {
      name: "Geetam School",
      logo: "/images/partners/geetam.jpg",
      description: "Geetam The Next Gen IIT School, Kakinada — Established in 2014, Geetam School has emerged as one of Kakinada's most unique and trusted institutions, integrating CBSE with IIT foundation programs.",
      website: "https://www.geetamnextgeniitschool.com",
      contact: [
        { label: "Address", value: "66-5-3, Narasannanagar, near Karanam garu junction, Kakinada" },
        { label: "Phone", value: "0884 235 3144 / +91 8897533222" },
        { label: "Email", value: "geetamschoolkakinada@gmail.com", href: "mailto:geetamschoolkakinada@gmail.com" }
      ]
    },
    {
      name: "IIMC Hyderabad",
      logo: "/images/partners/iimc-hyderabad.jpg",
      tagline: "Indian Institute of Management & Commerce (IIMC), Hyderabad",
      description: "Established in 1973, IIMC Hyderabad is a premier institution offering undergraduate, postgraduate, and professional programs, known for academic excellence, holistic student development, and strong industry connections.",
      website: "https://iimchyderabad.com",
      contact: [
        { label: "Location", value: "Hyderabad, Telangana" }
      ],
      program: "Interview Skills Certification Program",
      programOverview: ["30 Hours of Instructor-Led Training", "On-Campus Delivery Model", "50-60 Students per Batch", "Industry-Oriented Curriculum", "Certification-Based Learning"],
      keyAreas: ["Interview Preparation Techniques", "Tailored Job Application Strategies", "Group Discussions", "HR Mock Interviews", "Professional Interview Techniques"],
      outcomes: ["Improved interview confidence and communication skills", "Enhanced job application and placement readiness", "Practical exposure through mock interview simulations", "Better understanding of employer expectations and recruitment processes"],
      partnershipHighlights: "This collaboration demonstrates MentorMe's capability to design and deliver structured employability and career development programs for higher education institutions. Our programs are tailored to bridge the gap between academic learning and industry requirements.",
      images: [
        "/images/partners/iimc-session-2.jpg",
        "/images/partners/iimc-session-3.jpg",
        "/images/partners/iimc-session-4.jpg",
        "/images/partners/iimc-session-5.jpg"
      ]
    }
  ];

  const slides = [
    {
      image: "/images/programs/robotics.png",
      heading: "Transform Your Career with ",
      highlight: "MentorMe",
      subtitle: "We provide a comprehensive range of services, spanning from self-discovery to enhancing employability, serving as a one-stop destination for all the support students require beyond academic institutions.",
      btn1Text: "Career Assessment",
      btn1Link: "/assessment",
      btn2Text: "Contact Us",
      btn2Link: "/contact"
    },
    {
      image: "/images/programs/ai-school.png",
      heading: "Unlock Your Future ",
      highlight: "Potential",
      subtitle: "Discover your true strengths, career matches, and development pathways through our advanced science-backed AI evaluations and elite mentorship.",
      btn1Text: "Start Assessment",
      btn1Link: "/assessment",
      btn2Text: "Our Programs",
      btn2Link: "/services"
    },
    {
      image: "/images/programs/vedic-maths.png",
      heading: "Bridging Education and ",
      highlight: "Success",
      subtitle: "Empowering students and colleges with cutting-edge Robotics, AI certification, full-stack development, and campus recruitment training.",
      btn1Text: "Explore Services",
      btn1Link: "/services",
      btn2Text: "Partner With Us",
      btn2Link: "/contact"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden w-full max-w-full">

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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
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
          </AnimatePresence>

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

      {/* What is MentorMe? (Deep Dive + Image) */}
      <section className="py-24 px-4 bg-background relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold leading-tight text-foreground">
              MentorMe – Empowering Careers Beyond Classrooms
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MentorMe Career Intelligence is a one-stop career and skill development partner helping students move from self-discovery to employability. We specialize in career counseling, psychometric assessments, Robotics & AI training for schools, value-added programs for colleges, and Campus Recruitment Training (CRT).
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to bridge classroom learning with real-world success and prepare students for future-ready careers.
            </p>
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
              src="/images/mentorme-session.jpg"
              alt="MentorMe Session with students"
              width={600}
              height={500}
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[400px] lg:h-[500px]"
              priority
            />
          </motion.div>
        </div>
      </section>



      {/* Career Guidance + Working Professional Image */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative lg:col-span-5"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-brand-orange/20 to-brand-blue/20 rounded-3xl blur-3xl transform scale-105"></div>
            <Image
              src="/images/guidance-session.jpg"
              alt="Career Guidance Session"
              width={600}
              height={800}
              className="relative rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[450px] lg:h-[550px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2 lg:col-span-7"
          >
            <h2 className="text-4xl font-bold">Career Guidance for All Stages</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MentorMe is an elite career intelligence platform powered by advanced AI — helping students & professionals discover their true potential through deep psychometric evaluations.{` `}
              <details className="inline">
                <summary className="inline cursor-pointer text-brand-blue font-semibold hover:underline list-none">Read more</summary>
                <span className="block mt-3 space-y-3 text-base">
                  <span className="block">After taking our 90-question assessment, our proprietary AI engine instantly generates a hyper-personalized, 10-page career roadmap outlining your dominant strengths, blind spots, and ideal job matches.</span>
                  <span className="block space-y-2 pt-1">
                    {["Science-backed Psychometric Analysis", "Proprietary AI-Powered Career Reports", "1-on-1 Sessions with Elite Counselors"].map((point, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm flex-shrink-0">✓</span>
                        <span className="font-medium text-foreground">{point}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </details>
            </p>
            <div className="space-y-4 pt-4">
              {[
                { title: "6th-7th Class Students", desc: "Discover strengths early and guide young minds toward the right path." },
                { title: "8th-10th Class Students", desc: "Pick subjects & careers with science-backed assessments & expert advice." },
                { title: "11th-12th Class Students", desc: "Decide your future confidently—exams, colleges, careers." },
                { title: "College Students & Professionals", desc: "Strategize, skill up, and land your dream roles with our mentors." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-2xl border">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">{i + 1}</div>
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
      <section className="py-14 px-4 bg-gradient-to-br from-brand-blue via-brand-blue to-[#112D55] text-white overflow-hidden relative w-full max-w-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0"></div>
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <h2 className="text-3xl font-bold text-white">Our Recent Program Partners</h2>
            <p className="text-white/80 text-sm">These are some of our Prestigious Clients</p>
          </motion.div>

          {/* Scrolling Carousel */}
          <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-blue to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-blue to-transparent z-10 pointer-events-none" />

            <div className="flex gap-5 partners-scroll">
              {(() => {
                const partners = [
                  { name: "DDGD Vaishnav Chennai", logo: "/images/partners/ddgd-vaishnav.jpg", link: "/k12-programs" },
                  { name: "Bhavan's Group", logo: "/images/partners/bhavans-group.jpg", link: "/k12-programs" },
                  { name: "ICBM School of Business", logo: "/images/partners/icbm.jpg", link: "/college-programs" },
                  { name: "TSWRDC Nalgonda", logo: "/images/partners/tswrdc.jpg", link: "/k12-programs" },
                  { name: "Pragati Mahavidyalaya", logo: "/images/partners/pragati-maha.jpg", link: "/college-programs" },
                  { name: "Keshav Memorial", logo: "/images/partners/keshav-memorial.jpg", link: "/k12-programs" },
                  { name: "ELGI School", logo: "/images/partners/elgi-school.jpg", link: "/k12-programs" },
                  { name: "St. Joseph's Degree & PG College", logo: "/images/partners/st-josephs.jpg", link: "/college-programs" },
                  { name: "Howard Park International", logo: "/images/partners/howard-park.jpg", link: "/k12-programs" },
                  { name: "Geetam School", logo: "/images/partners/geetam.jpg", link: "/k12-programs" },
                  { name: "Pantheon Digital", logo: "/images/partners/pantheon-digital.jpg", link: "/college-programs" },
                  { name: "Avanthi Degree & PG Colleges", logo: "/images/partners/avanthi.png", link: "/college-programs" },
                  { name: "HPS Nizamabad", logo: "/images/partners/hps-nizamabad.png", link: "/k12-programs" },
                  { name: "IIMC Hyderabad", logo: "/images/partners/iimc-hyderabad.jpg", link: "/college-programs" },
                  { name: "St Pious Hyderabad", logo: "/images/partners/st-pious.jpg", link: "/k12-programs" },
                ];
                // Duplicate for seamless infinite scroll
                return [...partners, ...partners].map((partner, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const idx = institutions.findIndex(inst => inst.name === partner.name);
                      if (idx >= 0) setSelectedInstitution(idx);
                    }}
                    className="flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-lg border-2 border-blue-100 hover:-translate-y-1 transition-transform cursor-pointer"
                    style={{ width: "160px", height: "160px", padding: "20px" }}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="object-contain"
                        style={{ maxWidth: "140px", maxHeight: "140px", width: "auto", height: "auto" }}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange items-center justify-center text-white font-bold text-lg text-center leading-tight"
                        style={{ display: "none" }}
                      >
                        {partner.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
                      </div>
                    </div>
                  </div>
                ));
              })()}

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
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => setSkillTab("k12")}
              className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${skillTab === "k12" ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105" : "bg-white text-muted-foreground border hover:bg-muted"}`}
            >
              K-12 Programs
            </button>
            <button
              onClick={() => setSkillTab("college")}
              className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${skillTab === "college" ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105" : "bg-white text-muted-foreground border hover:bg-muted"}`}
            >
              College Programs
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {(skillTab === "k12" ? [
              {
                title: "Future AI Leaders Program",
                subtitle: "AI Classes for School Students",
                highlights: "Hands‑on projects | Generative AI ML & NLP | Ethics & responsible AI | Teacher upskilling",
                image: "/images/programs/ai-school.png",
                link: "/programs/ai-school"
              },
              {
                title: "Robotics & STEM Learning for Kids",
                subtitle: "Robotics Classes for School Students",
                highlights: "Hands‑on training | No lab investment | Robotics Expo | STEM Integration | Robotics Lab Upgrade | Teacher Training",
                image: "/images/programs/robotics.png",
                link: "/programs/robotics"
              },
              {
                title: "Smart Maths with Vedic Techniques",
                subtitle: "Vedic Maths Classes for School Students",
                highlights: "Fast‑Track Mental Math | No Tools Needed | Expert‑Led Sessions | Certification",
                image: "/images/programs/vedic-maths.png",
                link: "/programs/vedic-maths"
              },
            ] : [
              {
                title: "Advanced AI & Machine Learning",
                subtitle: "AI Certification for College Students",
                highlights: "Deep Learning | Computer Vision | NLP Projects | Industry Capstone | Placement Assistance",
                image: "/images/programs/ai-college.png",
                link: "/programs/ai-college"
              },
              {
                title: "Full Stack Web Development",
                subtitle: "Web & App Development Training",
                highlights: "MERN Stack | Next.js | Cloud Deployment | Real-world Projects | Technical Interview Prep",
                image: "/images/programs/python.png",
                link: "/programs/python"
              },
              {
                title: "Data Science & Analytics",
                subtitle: "Data Analytics Training Program",
                highlights: "Python & SQL | Tableau & PowerBI | Predictive Modeling | Business Analytics | Live Projects",
                image: "/images/programs/power-bi.png",
                link: "/programs/ml"
              },
            ]).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl border-2 border-slate-100/80 bg-background shadow-md hover:border-brand-blue/40 hover:shadow-[0_30px_60px_rgba(8,112,184,0.15)] transition-all duration-500 hover:-translate-y-3 group flex flex-col justify-between h-full"
              >
                <div className="flex flex-col">
                  {/* Hover Image Reveal */}
                  <div className="relative overflow-hidden rounded-2xl h-0 opacity-0 group-hover:h-48 group-hover:opacity-100 group-hover:mb-6 transition-all duration-500 ease-in-out">
                    <div className="relative w-full h-48">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-1 text-brand-blue group-hover:text-brand-orange transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-medium text-brand-orange mb-6 group-hover:text-brand-blue transition-colors duration-300">
                    {item.subtitle}
                  </p>
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-2">
                    Key Highlights
                  </h4>
                  <ul className="text-muted-foreground text-sm leading-relaxed mb-8 list-none space-y-1">
                    {item.highlights.split(" | ").map((h, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-brand-blue">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-auto">
                  <Link href={item.link} className="flex-1">
                    <button className="w-full py-3 border-2 border-brand-blue/20 text-brand-blue font-bold rounded-xl hover:bg-brand-blue hover:text-white transition-all duration-300">
                      Know more
                    </button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full py-3 bg-brand-blue text-white hover:bg-brand-orange border-2 border-transparent font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-brand-orange/30">
                      Contact us
                    </button>
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
            className="space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Connect with us</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create a win-win opportunity: gain practical AI expertise and unlock new income streams with our innovative Train-the-Trainer program!
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-background/50 rounded-2xl border border-slate-100/80 flex items-center gap-4 shadow-sm">
                  <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-xl shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Call us</div>
                    <div className="text-sm font-semibold text-foreground">+91-9392707596</div>
                    <div className="text-sm font-semibold text-foreground">+91-8188824440</div>
                  </div>
                </div>

                <div className="p-4 bg-background/50 rounded-2xl border border-slate-100/80 flex items-center gap-4 shadow-sm">
                  <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mail us</div>
                    <div className="text-sm font-semibold text-foreground break-all">admin@mentormeright.in</div>
                  </div>
                </div>

                <div className="p-4 bg-background/50 rounded-2xl border border-slate-100/80 flex items-center gap-4 shadow-sm sm:col-span-2">
                  <div className="p-3 bg-green-500/10 text-green-600 rounded-xl shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</div>
                    <div className="text-sm font-semibold text-foreground">Hyderabad, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Card filling space */}
            <div className="bg-background/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-lg relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full -z-10"></div>
              <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
                What Happens Next?
              </h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Submit Application", desc: "Fill out the form with your program of interest and contact details." },
                  { step: "2", title: "Expert Callback", desc: "Our executive partner/counselor will connect with you within 24 hours." },
                  { step: "3", title: "Tailored Access", desc: "Receive customized curriculum details, fee structure, and batch schedule." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-sm shadow-inner">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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

                  {/* I am a - User Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">I am a <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "school", label: "🏫 School Student" },
                        { value: "college", label: "🎓 College Student" },
                        { value: "professional", label: "💼 Working Professional" },
                      ].map((opt) => (
                        <label key={opt.value} className="relative cursor-pointer">
                          <input required type="radio" name="userType" value={opt.value} className="peer sr-only" />
                          <div className="w-full text-center p-3 rounded-xl border-2 border-slate-200 bg-background text-sm font-medium text-muted-foreground transition-all peer-checked:border-brand-blue peer-checked:bg-brand-blue/5 peer-checked:text-brand-blue hover:border-brand-blue/40">
                            {opt.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Interested Course or Department */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interested Course / Department <span className="text-red-500">*</span></label>
                    <select required className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-brand-blue focus:outline-none text-sm">
                      <option value="">Select your interest...</option>
                      <optgroup label="School Programs">
                        <option value="ai-school">Future AI Leaders Program</option>
                        <option value="robotics">Robotics &amp; STEM Learning</option>
                        <option value="vedic-maths">Smart Maths with Vedic Techniques</option>
                        <option value="career-counseling-school">Career Counseling (School)</option>
                      </optgroup>
                      <optgroup label="College Programs">
                        <option value="ai-college">Advanced AI &amp; Machine Learning</option>
                        <option value="fullstack">Full Stack Web Development</option>
                        <option value="data-science">Data Science &amp; Analytics</option>
                        <option value="crt">Campus Recruitment Training (CRT)</option>
                        <option value="career-counseling-college">Career Counseling (College)</option>
                      </optgroup>
                      <optgroup label="Professional">
                        <option value="career-pivot">Career Change / Pivot</option>
                        <option value="leadership">Leadership Coaching</option>
                        <option value="study-abroad">Study Abroad Guidance</option>
                        <option value="other">Other</option>
                      </optgroup>
                    </select>
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

      {selectedInstitution !== null && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedInstitution(null)}
          />
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                      <img
                        src={institutions[selectedInstitution].logo}
                        alt={institutions[selectedInstitution].name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{institutions[selectedInstitution].name}</h3>
                      {institutions[selectedInstitution].website && (
                        <a
                          href={institutions[selectedInstitution].website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue font-semibold hover:underline text-sm mt-1 inline-block"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInstitution(null)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {institutions[selectedInstitution].description}
                </p>
                {(institutions[selectedInstitution] as any).program && (
                  <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{(institutions[selectedInstitution] as any).tagline}</h4>
                    <h4 className="text-xl font-bold text-brand-blue mb-3">{(institutions[selectedInstitution] as any).program}</h4>
                    {(institutions[selectedInstitution] as any).programOverview && (institutions[selectedInstitution] as any).programOverview.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Program Overview</p>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {(institutions[selectedInstitution] as any).programOverview.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="text-brand-orange mt-0.5">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {(institutions[selectedInstitution] as any).keyAreas && (institutions[selectedInstitution] as any).keyAreas.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Key Areas Covered</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {(institutions[selectedInstitution] as any).keyAreas.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100">
                          <span className="text-blue-500 mt-0.5 shrink-0">◆</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(institutions[selectedInstitution] as any).outcomes && (institutions[selectedInstitution] as any).outcomes.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Outcomes</p>
                    <div className="grid gap-2">
                      {(institutions[selectedInstitution] as any).outcomes.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-green-50 p-2.5 rounded-lg border border-green-100">
                          <span className="text-green-600 mt-0.5 shrink-0">✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(institutions[selectedInstitution] as any).partnershipHighlights && (
                  <div className="mt-5 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Partnership Highlights</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{(institutions[selectedInstitution] as any).partnershipHighlights}</p>
                  </div>
                )}
                {(institutions[selectedInstitution] as any).images && (institutions[selectedInstitution] as any).images.length > 0 && (
                  <div className="mt-5 space-y-3">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Program Gallery</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(institutions[selectedInstitution] as any).images.map((src: string, i: number) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                          <img
                            src={src}
                            alt={`${institutions[selectedInstitution].name} - Photo ${i + 1}`}
                            className="w-full h-60 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {institutions[selectedInstitution].contact && institutions[selectedInstitution].contact.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {institutions[selectedInstitution].contact.map((c: { label: string; value: string; href?: string }, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Globe2 className="text-brand-orange shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.label}</p>
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-blue hover:underline">{c.value}</a>
                          ) : (
                            <p className="text-sm font-medium text-slate-900">{c.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
