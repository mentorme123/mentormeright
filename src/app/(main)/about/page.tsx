"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp, GraduationCap, Users2, BookOpen, Award, Globe2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const [expandedLeader, setExpandedLeader] = useState<number | null>(null);
  const [expandedImages, setExpandedImages] = useState<Record<string, boolean>>({});

  const toggleLeader = (index: number) => {
    setExpandedLeader(prev => prev === index ? null : index);
  };

  const toggleImages = (key: string) => {
    setExpandedImages(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const leadership = [
    {
      name: "Vijay Kiran Agastya",
      role: "Co-Founder & Managing Director",
      shortRole: "Co-Founder & Managing Director",
      company: "MentorMe Career Intelligence and Training Pvt. Ltd.",
      tagline: "Empowering Careers. Enabling Future Leaders.",
      desc: "A distinguished entrepreneur, corporate leader, educator, and career strategist with over 24 years of experience across consulting, leadership development, digital transformation, and professional education.",
      image: "/images/vijay_card.png",
      images: ["/images/leadership/vijay-1.jpg", "/images/leadership/vijay-2.jpg", "/images/leadership/vijay-3.jpg"],
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed">
            Before co-founding MentorMe, he built an exceptional corporate career with leading organizations including <strong>Deloitte, Genpact, and Indian Immunologicals Ltd.</strong>, rising to the position of <strong>Vice President at Deloitte</strong>. Today, he combines his industry expertise with a passion for empowering students and professionals to navigate the future of work with confidence.
          </p>

          <h3 className="text-2xl font-bold text-slate-900">Key Leadership Positions</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Co-Founder & Managing Director, MentorMe Career Intelligence and Training Pvt. Ltd.",
              "Chairman (2025-26), Southern India Regional Council (SIRC), The Institute of Cost Accountants of India",
              "Former Vice President, Deloitte U.S India",
              "Functional Consultant & Advisor, Numantec AI & Digital Transformation Solutions",
              "Member, Board of Studies (Commerce), Osmania University",
              "Entrepreneurship Mentor, ICT Academy",
              "Consultant Trainer & Research Associate, National Institute for MSME (ni-msme)",
            ].map((position, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-brand-blue/5 rounded-xl">
                <Award className="text-brand-orange shrink-0 mt-1" size={18} />
                <span className="text-sm font-medium text-slate-700">{position}</span>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-slate-900">Leadership in the CMA Profession</h3>
          <p className="text-slate-700 leading-relaxed">
            As the <strong>Chairman of the Southern India Regional Council (SIRC) of The Institute of Cost Accountants of India</strong>, Vijay Kiran plays a pivotal role in shaping the future of the CMA profession across South India. He previously created history as the <strong>youngest Chairman of the Hyderabad Chapter</strong> in its 53-year legacy.
          </p>

          <h3 className="text-2xl font-bold text-slate-900">Educator • Mentor • Thought Leader</h3>
          <p className="text-slate-700 leading-relaxed">
            A globally certified trainer and sought-after speaker, he has delivered <strong>500+ guest lectures</strong>, mentored thousands of learners, and conducted impactful programs on leadership, employability, business transformation, and career development.
          </p>

          <div className="bg-gradient-to-r from-brand-blue/10 to-brand-orange/10 p-6 rounded-2xl border border-brand-blue/20">
            <h4 className="text-lg font-bold text-brand-blue mb-2">His Vision</h4>
            <p className="text-slate-700 italic leading-relaxed">
              "The future belongs to those who continuously learn, adapt, and create value. With the right guidance and mindset, every individual can unlock extraordinary opportunities and build a meaningful career."
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Gallery</h3>
            <div className="grid grid-cols-3 gap-4">
              {(expandedImages["vijay"] ? leadership[0].images : leadership[0].images.slice(0, 1)).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <Image
                    src={img}
                    alt={`${leadership[0].name} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            {leadership[0].images.length > 1 && (
              <button
                onClick={() => toggleImages("vijay")}
                className="mt-3 flex items-center gap-2 text-brand-blue font-semibold hover:underline"
              >
                {expandedImages["vijay"] ? "Show less" : `View all ${leadership[0].images.length} photos`}
                {expandedImages["vijay"] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      name: "Sirisha Kode",
      role: "Co-Founder & COO",
      shortRole: "Co-Founder & COO",
      tagline: "Ex-Ernst & Young | Corporate Trainer | Women Leader",
      desc: "",
      image: "/images/sirisha_card.png",
      images: [],
      content: null,
    },
    {
      name: "Santhi Vedula",
      role: "Advisory Board Member | Educator | Author | Academic Leader",
      shortRole: "Advisor - Institutional Relationships",
      tagline: "Senior Academician | Author | Research Scholar",
      desc: "With over 30 years of distinguished experience in education, academic leadership, and student development.",
      image: "/images/santhi_card.png",
      images: ["/images/leadership/santhi-1.jpg", "/images/leadership/santhi-2.jpg", "/images/leadership/santhi-3.jpg"],
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 leading-relaxed">
            Dr. Santhi Vedula brings unparalleled expertise to the MentorMe Right Advisory Board. An accomplished academician and lifelong learner, she holds multiple postgraduate degrees including <strong>M.Com, MBA, MA, M.Phil, B.Ed, MA (Indian Knowledge Systems)</strong>, along with several professional diplomas. She is currently pursuing her <strong>Ph.D. in Management from SR University</strong>.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-brand-blue/5 rounded-xl">
              <BookOpen className="text-brand-orange shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900">Prolific Author</h4>
                <p className="text-sm text-slate-700">26 academic textbooks for B.Com and BBA programs published by Kalyani, Himalaya, Usha, and Vikram Publishers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-brand-blue/5 rounded-xl">
              <Globe2 className="text-brand-orange shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900">Research Excellence</h4>
                <p className="text-sm text-slate-700">42 research papers presented at national and international conferences.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-brand-blue/5 rounded-xl">
              <Users2 className="text-brand-orange shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900">Thought Leader</h4>
                <p className="text-sm text-slate-700">Contributions to newspapers, TV discussions, and All India Radio on education and career guidance.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-brand-blue/5 rounded-xl">
              <GraduationCap className="text-brand-orange shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900">Academic Leadership</h4>
                <p className="text-sm text-slate-700">Guiding academic vision and mentoring future leaders at MentorMe Right.</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900">Awards & Recognitions</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "She Inspires Award (2023)",
              "Inspiring Women of the Year (2021)",
              "Global Faculty Award (2022)",
              "Vidya Siromani Award (2015)",
              "Andhra Pradesh Ugadi Puraskaram",
              "Stri Murthy Award for Excellence in Education",
              "Dr. APJ Abdul Kalam Award for Educational Excellence",
              "Best Woman Administrator Award (2026)",
            ].map((award, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 rounded-xl">
                <Award className="text-brand-orange shrink-0" size={18} />
                <span className="text-sm font-medium text-slate-700">{award}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-brand-blue/10 to-brand-orange/10 p-6 rounded-2xl border border-brand-blue/20">
            <h4 className="text-lg font-bold text-brand-blue mb-2">Her Message to Students</h4>
            <p className="text-slate-700 italic leading-relaxed">
              "Education is not merely about earning a degree. It is about discovering your strengths, building confidence, and creating a meaningful impact. The future belongs to those who continuously learn, adapt, and lead with purpose."
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Gallery</h3>
            <div className="grid grid-cols-3 gap-4">
              {(expandedImages["santhi"] ? leadership[2].images : leadership[2].images.slice(0, 1)).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <Image
                    src={img}
                    alt={`${leadership[2].name} ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            {leadership[2].images.length > 1 && (
              <button
                onClick={() => toggleImages("santhi")}
                className="mt-3 flex items-center gap-2 text-brand-blue font-semibold hover:underline"
              >
                {expandedImages["santhi"] ? "Show less" : `View all ${leadership[2].images.length} photos`}
                {expandedImages["santhi"] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <section className="bg-brand-blue/5 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-brand-blue"
          >
            About MentorMe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            We prioritize using a scientific approach rooted in deep self-awareness to guide career decisions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Our Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At MentorMe, our advanced AI technology is instrumental in conducting comprehensive psychometric and aptitude assessments, analyzing an individual's personality, skills, and interests with precision.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Combining this deep data with the expertise of our seasoned counsellors, we ensure students and professionals make highly informed choices. We support our users from self-discovery to employability with training programs that bridge the gap between academic knowledge and industry requirements.
            </p>

            <ul className="space-y-4 pt-6">
              {[
                "Holistic Career Guidance Extensive",
                "Network of Counsellors and Industry Mentors",
                "Extensive Career Database",
                "Study Abroad Support",
                "Future-Ready Skill Development",
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="text-brand-orange" size={24} />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 rounded-3xl blur-3xl transform scale-105" />
            <div className="relative rounded-3xl shadow-2xl border border-white/10 bg-white/90 p-6 overflow-hidden">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-brand-blue font-bold mb-2">COMING LIKE THESE</p>
                  <h3 className="text-2xl font-bold text-slate-900">Real MentorMe sessions in action</h3>
                  <p className="mt-2 text-sm text-slate-500">Browse through our student workshops, counseling moments, and career coaching events.</p>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl bg-slate-50">
                  <Image
                    src="/images/session-6.jpg"
                    alt="MentorMe session example"
                    width={720}
                    height={420}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl shadow-2xl border border-white/10 bg-white/90 p-6">
              <p className="text-xs uppercase tracking-[0.45em] text-brand-blue font-bold mb-4">Scroll through real moments</p>
              <div className="overflow-hidden rounded-3xl">
                <div className="flex gap-4 min-w-max animate-scroll-x py-2">
                  {["/images/session-6.jpg", "/images/session-5.jpg", "/images/session-1.jpg", "/images/session-2.jpg", "/images/session-3.jpg", "/images/session-4.jpg"].map((src, index) => (
                    <div key={index} className="min-w-[260px] flex-shrink-0 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                      <Image
                        src={src}
                        alt={`Gallery ${index + 1}`}
                        width={320}
                        height={220}
                        className="object-cover w-full h-56"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes scroll-x {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-x {
                animation: scroll-x 24s linear infinite;
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Meet Our Leadership Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">The visionaries and experts driving the mission behind MentorMe Right.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {leadership.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 bg-white cursor-pointer"
                onClick={() => toggleLeader(i)}
              >
                <div className="relative aspect-[334/423] w-full">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-700" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-brand-blue font-semibold mt-1">{leader.shortRole}</p>
                  <p className="text-sm text-slate-500 mt-2">{leader.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {expandedLeader !== null && leadership[expandedLeader]?.content && (
              <motion.div
                key={`expanded-${expandedLeader}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-slate-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{leadership[expandedLeader].name}</h3>
                    <p className="text-brand-blue font-semibold text-lg mt-1">{leadership[expandedLeader].role}</p>
                  </div>
                  <button
                    onClick={() => setExpandedLeader(null)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <ChevronUp size={24} className="text-slate-500" />
                  </button>
                </div>
                {leadership[expandedLeader].content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
