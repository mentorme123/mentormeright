"use client";

import { useState } from "react";
import { Award, BookOpen, Globe2, Users2, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const leaders = [
    {
      name: "Vijay Kiran Agastya",
      role: "Co-Founder & Managing Director",
      image: "/images/vijay_card.png",
      images: ["/images/leadership/vijay-1.jpg", "/images/leadership/vijay-2.jpg", "/images/leadership/vijay-3.jpg"],
      galleryOpen: false,
    },
    {
      name: "Sirisha Kode",
      role: "Co-Founder & COO",
      image: "/images/sirisha_card.png",
      images: [],
      galleryOpen: false,
    },
    {
      name: "Santhi Vedula",
      role: "Advisory Board Member | Educator | Author | Academic Leader",
      image: "/images/santhi_card.png",
      images: ["/images/leadership/santhi-1.jpg", "/images/leadership/santhi-2.jpg", "/images/leadership/santhi-3.jpg"],
      galleryOpen: false,
    },
  ];

  const [galleryOpen, setGalleryOpen] = useState<Record<number, boolean>>({});
  const toggleGallery = (i: number) => setGalleryOpen(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="bg-brand-blue/5 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-blue">About MentorMe</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">We prioritize using a scientific approach rooted in deep self-awareness to guide career decisions.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Meet Our Leadership Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">The visionaries and experts driving the mission behind MentorMe Right.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {leaders.map((leader, i) => (
              <div key={i} className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 bg-white cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="relative aspect-[334/423] w-full">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-700" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-brand-blue font-semibold mt-1">{leader.role}</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setOpenIndex(openIndex === i ? null : i); }}
                    className="mt-4 px-5 py-2 bg-brand-blue text-white rounded-full font-semibold hover:bg-brand-blue/90 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {openIndex === 0 && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpenIndex(null)} />
              <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900">Shri Vijay Kiran Agastya</h3>
                        <p className="text-brand-blue font-semibold text-lg mt-1">Co-Founder & Managing Director</p>
                        <p className="text-slate-500 mt-1">MentorMe Career Intelligence and Training Pvt. Ltd.</p>
                      </div>
                      <button onClick={() => setOpenIndex(null)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>

              <div className="mt-6 space-y-6">
                <p className="text-lg text-brand-blue font-semibold">Empowering Careers. Enabling Future Leaders.</p>
                <p className="text-slate-700 leading-relaxed">Shri Vijay Kiran Agastya is a distinguished entrepreneur, corporate leader, educator, and career strategist with over <strong>24 years of experience</strong> across consulting, leadership development, digital transformation, and professional education.</p>
                <p className="text-slate-700 leading-relaxed">Before co-founding MentorMe, he built an exceptional corporate career with leading organizations including <strong>Deloitte, Genpact, and Indian Immunologicals Ltd.</strong>, rising to the position of <strong>Vice President at Deloitte</strong>. Today, he combines his industry expertise with a passion for empowering students and professionals to navigate the future of work with confidence.</p>

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
                  ].map((pos, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-brand-blue/5 rounded-xl">
                      <Award className="text-brand-orange shrink-0 mt-1" size={18} />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{pos.split(",")[0]}</p>
                        <p className="text-xs text-slate-500">{pos.split(",").slice(1).join(",")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-slate-900">Leadership in the CMA Profession</h3>
                <p className="text-slate-700 leading-relaxed">As the <strong>Chairman of the Southern India Regional Council (SIRC) of The Institute of Cost Accountants of India</strong>, Vijay Kiran plays a pivotal role in shaping the future of the CMA profession across South India. SIRC serves thousands of students and professionals, driving initiatives in professional education, industry engagement, leadership development, and skill enhancement.</p>
                <p className="text-slate-700 leading-relaxed">His leadership journey within the CMA fraternity has been remarkable. He previously created history as the <strong>youngest Chairman of the Hyderabad Chapter</strong> in its 53-year legacy, demonstrating his commitment to professional excellence, innovation, and community development.</p>

                <h3 className="text-2xl font-bold text-slate-900">Educator • Mentor • Thought Leader</h3>
                <p className="text-slate-700 leading-relaxed">A globally certified trainer and sought-after speaker, Vijay Kiran has delivered <strong>500+ guest lectures</strong>, mentored thousands of learners, and conducted impactful programs on leadership, employability, business transformation, Lean Six Sigma, and career development.</p>
                <p className="text-slate-700 leading-relaxed">At MentorMe, he is committed to bridging the gap between education and industry, ensuring that every learner gains the clarity, confidence, and skills needed to succeed in an ever-changing world.</p>

                <div className="bg-gradient-to-r from-brand-blue/10 to-brand-orange/10 p-6 rounded-2xl border border-brand-blue/20">
                  <h4 className="text-lg font-bold text-brand-blue mb-2">His Vision</h4>
                  <p className="text-slate-700 italic leading-relaxed">"The future belongs to those who continuously learn, adapt, and create value. With the right guidance and mindset, every individual can unlock extraordinary opportunities and build a meaningful career."</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {(galleryOpen[0] ? leaders[0].images : leaders[0].images.slice(0, 1)).map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                        <img src={img} alt={`${leaders[0].name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                  {leaders[0].images.length > 1 && (
                   <div className="mt-3 flex items-center gap-2 text-brand-blue font-semibold hover:underline">
                    {galleryOpen[0] ? "Show less" : `View all ${leaders[0].images.length} photos`}
                      <span className="text-xs">({galleryOpen[0] ? "▲" : "▼"})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {openIndex === 2 && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpenIndex(null)} />
              <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-8 md:p-10">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900">Dr. Santhi Vedula</h3>
                        <p className="text-brand-blue font-semibold text-lg mt-1">Advisory Board Member | Educator | Author | Academic Leader</p>
                      </div>
                      <button onClick={() => setOpenIndex(null)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>

              <div className="mt-6 space-y-6">
                <p className="text-slate-700 leading-relaxed">With over <strong>30 years of distinguished experience in education, academic leadership, and student development</strong>, Dr. Santhi Vedula brings unparalleled expertise to the MentorMe Right Advisory Board.</p>
                <p className="text-slate-700 leading-relaxed">An accomplished academician and lifelong learner, she holds multiple postgraduate degrees including <strong>M.Com, MBA, MA, M.Phil, B.Ed, MA (Indian Knowledge Systems)</strong>, along with several professional diplomas. She is currently pursuing her <strong>Ph.D. in Management from SR University</strong>, reflecting her unwavering commitment to continuous learning and excellence.</p>

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

                <p className="text-slate-700 leading-relaxed">At MentorMe Right, Dr. Santhi Vedula plays a pivotal role in guiding our academic vision, mentoring future leaders, and helping students make informed career choices in a rapidly evolving world.</p>

                <div className="bg-gradient-to-r from-brand-blue/10 to-brand-orange/10 p-6 rounded-2xl border border-brand-blue/20">
                  <h4 className="text-lg font-bold text-brand-blue mb-2">Her Message to Students</h4>
                  <p className="text-slate-700 italic leading-relaxed">"Education is not merely about earning a degree. It is about discovering your strengths, building confidence, and creating a meaningful impact. The future belongs to those who continuously learn, adapt, and lead with purpose."</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {(galleryOpen[2] ? leaders[2].images : leaders[2].images.slice(0, 1)).map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                        <img src={img} alt={`${leaders[2].name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                  {leaders[2].images.length > 1 && (
                    <button onClick={() => toggleGallery(2)} className="mt-3 flex items-center gap-2 text-brand-blue font-semibold hover:underline">
                      {galleryOpen[2] ? "Show less" : `View all ${leaders[2].images.length} photos`}
                      <span className="text-xs">({galleryOpen[2] ? "▲" : "▼"})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
