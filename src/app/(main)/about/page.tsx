"use client";

import { useState } from "react";
import { Award, BookOpen, Globe2, Users2, GraduationCap } from "lucide-react";
import Image from "next/image";

type Leader = {
  name: string;
  role: string;
  image: string;
  images: string[];
  captions?: string[];
  fullName?: string;
  designation?: string;
  company?: string;
  sections?: {
    heading?: string | null;
    body?: string;
    highlights?: { title: string; detail: string }[];
    awards?: string[];
    quoteLabel?: string;
    quote?: string;
  }[];
};

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [institutionIndex, setInstitutionIndex] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState<Record<number, boolean>>({});
  const toggleGallery = (i: number) =>
    setGalleryOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  type InstitutionContact = {
    label: string;
    value: string;
    href?: string;
  };

  type Institution = {
    name: string;
    logo: string;
    description: string;
    images: string[];
    captions?: string[];
    website?: string;
    contact?: InstitutionContact[];
  };

  const institutions: Institution[] = [
    {
      name: "ELGI School",
      logo: "/images/institutions/elgi-school.png",
      description: "ELGI School, Coimbatore — Aspire & Excel. Established in 1987 with 67 students and 3 teachers, ELGI School has grown into a thriving institution with 1,400 students and 60+ teaching staff, spread across a 4-acre campus with a 200m athletic track. The school follows the CBSE syllabus and emphasizes holistic education, career guidance, club activities, sports, and global exposure.",
      images: [],
      website: "https://www.elgischool.com",
      contact: [
        { label: "Address", value: "Kovai Mahalingapuram, Vellalore, Coimbatore, Tamil Nadu 641111" },
        { label: "Email", value: "info@elgischool.org", href: "mailto:info@elgischool.org" },
        { label: "Phone", value: "0422 241 4194", href: "tel:04222414194" },
      ],
    },
    {
      name: "St. Joseph's Degree & PG College",
      logo: "",
      description: "St. Joseph's Degree & PG College, Hyderabad — A premier institution offering undergraduate and postgraduate programs, known for academic excellence, holistic student development, and strong industry connections. The college is committed to nurturing future leaders through quality education and comprehensive co-curricular programs.",
      images: [],
      website: "https://stjosephspgcollege.ac.in",
      contact: [
        { label: "Location", value: "Hyderabad, Telangana" },
      ],
    },
    {
      name: "Howard Park International",
      logo: "/images/institutions/howard-public-school.png",
      description: "Howard Public School CBSE, Himayathnagar, Hyderabad — Established in 1986, Howard Public School is one of the finest CBSE institutions dedicated to academic excellence, self-discipline, rational thinking, and global vision. The school offers state-of-the-art facilities including science labs, AI lab, library, sports infrastructure, and a wide range of clubs. Celebrating 40 glorious years of educational excellence.",
      images: [],
      website: "https://howardinstitutions.org",
      contact: [
        { label: "Address", value: "H. No. 3-6-568, Street No. 8, Himayathnagar, Hyderabad – 500 029" },
        { label: "Email", value: "howardinstitutions@gmail.com", href: "mailto:howardinstitutions@gmail.com" },
        { label: "Phone", value: "040-27630610", href: "tel:04027630610" },
      ],
    },
    {
      name: "Geetam School",
      logo: "/images/institutions/geetam-school.png",
      description: "Geetam The Next Gen IIT School, Kakinada — Established in 2014 by a visionary educator with decades of teaching experience, Geetam School has emerged as one of Kakinada's most unique and trusted institutions. The school integrates CBSE with IIT foundation programs, offering full-day sessions, varied classes, and a friendly learning environment. Located at 66-5-3, Narasannanagar, near Karanam garu junction, the school is committed to celebrating life and learning.",
      images: [],
      website: "https://www.geetamnextgeniitschool.com",
      contact: [
        { label: "Address", value: "66-5-3, Narasannanagar, near Karanam garu junction, Kakinada" },
        { label: "Phone", value: "0884 235 3144 / +91 8897533222" },
        { label: "Email", value: "geetamschoolkakinada@gmail.com", href: "mailto:geetamschoolkakinada@gmail.com" },
        { label: "Hours", value: "Mon – Sat : 9:00 AM – 5:00 PM" },
      ],
    },
    {
      name: "Pantheon Digital",
      logo: "",
      description: "Pantheon Digital is a digital transformation and technology solutions partner empowering businesses with innovative strategies, branding, and digital excellence.",
      images: [],
      contact: [
        { label: "Website", value: "https://www.pantheondigital.com", href: "https://www.pantheondigital.com" },
      ],
    },
  ];

  const renderInstitutionModal = (institution: Institution, index: number) => {
    const overlay = (
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setInstitutionIndex(null)}
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {institution.logo ? (
                    <div className="w-20 h-20 relative shrink-0 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                      <img
                        src={institution.logo}
                        alt={institution.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ) : null}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{institution.name}</h3>
                    {institution.website ? (
                      <a
                        href={institution.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue font-semibold hover:underline text-sm mt-1 inline-block"
                      >
                        Visit Website →
                      </a>
                    ) : null}
                  </div>
                </div>
                <button
                  onClick={() => setInstitutionIndex(null)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {institution.description}
                </p>

                {institution.contact && institution.contact.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {institution.contact.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                      >
                        <Globe2 className="text-brand-orange shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.label}</p>
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-blue hover:underline">
                              {c.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-slate-900">{c.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {institution.images.length > 0 ? (
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">Gallery</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {institution.images.map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden shadow border border-slate-200">
                          <img src={img} alt={`${institution.name} ${i + 1}`} className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" />
                          {institution.captions && institution.captions[i] ? (
                            <p className="px-2 py-1.5 text-xs text-slate-600 bg-white">{institution.captions[i]}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return <div key={`institution-${index}`}>{overlay}</div>;
  };

  const leaders: Leader[] = [
    {
      name: "Vijay Kiran Agastya",
      role: "Co-Founder & Managing Director",
      image: "/images/vijay_card.png",
      images: ["/images/leadership/gallery-1.jpg", "/images/leadership/gallery-2.jpg", "/images/leadership/gallery-3.jpg", "/images/leadership/gallery-4.jpg", "/images/leadership/gallery-5.jpg", "/images/leadership/gallery-6.jpg"],
      captions: [
        "Post the panel discussion on Budget 2026 at Siva Sivani Institute of Management",
        "Meet with Governor of Telangana Jishnu Dev Varma in 2025",
        "With the management students of Woxsen University",
        "With Member of Parliament, Shri Etela Rajender",
        "Addressing a large gathering of students in Chennai",
        "Meet with Shri Naveen Mittal, Commissioner, Collegiate Education and Technical, Telangana in 2023"
      ],
      fullName: "Shri Vijay Kiran Agastya",
      designation: "Co-Founder & Managing Director",
      company: "MentorMe Career Intelligence and Training Pvt. Ltd.",
      sections: [
        {
          heading: "Empowering Careers. Enabling Future Leaders.",
          body: "Shri Vijay Kiran Agastya is a distinguished entrepreneur, corporate leader, educator, and career strategist with over 24 years of experience across consulting, leadership development, digital transformation, and professional education.",
        },
        {
          heading: "Career Journey",
          body: "Before co-founding MentorMe, he built an exceptional corporate career with leading organizations including Deloitte, Genpact, and Indian Immunologicals Ltd., rising to the position of Vice President at Deloitte. Today, he combines his industry expertise with a passion for empowering students and professionals to navigate the future of work with confidence.",
        },
        {
          heading: "Key Leadership Positions",
          highlights: [
            { title: "Co-Founder & Managing Director", detail: "MentorMe Career Intelligence and Training Pvt. Ltd." },
            { title: "Chairman (2025-26)", detail: "Southern India Regional Council (SIRC), The Institute of Cost Accountants of India" },
            { title: "Former Vice President", detail: "Deloitte U.S India" },
            { title: "Functional Consultant & Advisor", detail: "Numantec AI & Digital Transformation Solutions" },
            { title: "Member, Board of Studies (Commerce)", detail: "Osmania University" },
            { title: "Entrepreneurship Mentor", detail: "ICT Academy" },
            { title: "Consultant Trainer & Research Associate", detail: "National Institute for MSME (ni-msme)" },
          ],
        },
        {
          heading: "Leadership in the CMA Profession",
          body: "As the Chairman of the Southern India Regional Council (SIRC) of The Institute of Cost Accountants of India, Vijay Kiran plays a pivotal role in shaping the future of the CMA profession across South India. SIRC serves thousands of students and professionals, driving initiatives in professional education, industry engagement, leadership development, and skill enhancement. His leadership journey within the CMA fraternity has been remarkable. He previously created history as the youngest Chairman of the Hyderabad Chapter in its 53-year legacy, demonstrating his commitment to professional excellence, innovation, and community development.",
        },
        {
          heading: "Educator • Mentor • Thought Leader",
          body: "A globally certified trainer and sought-after speaker, Vijay Kiran has delivered 500+ guest lectures, mentored thousands of learners, and conducted impactful programs on leadership, employability, business transformation, Lean Six Sigma, and career development. At MentorMe, he is committed to bridging the gap between education and industry, ensuring that every learner gains the clarity, confidence, and skills needed to succeed in an ever-changing world.",
        },
        {
          quoteLabel: "His Vision",
          quote: "The future belongs to those who continuously learn, adapt, and create value. With the right guidance and mindset, every individual can unlock extraordinary opportunities and build a meaningful career.",
        },
      ],
    },
    {
      name: "Sirisha Kode",
      role: "Co-Founder & COO",
      image: "/images/sirisha_card.png",
      images: [],
      fullName: "Sirisha Kode",
      designation: "Co-Founder & COO",
      company: "MentorMe Career Intelligence and Training Pvt. Ltd.",
      sections: [
        {
          heading: "Operations Excellence with a Human Touch",
          body: "Sirisha brings deep operational expertise and a people-first approach to building MentorMe's delivery engine.",
        },
      ],
    },
    {
      name: "Santhi Vedula",
      role: "Advisory Board Member | Educator | Author | Academic Leader",
      image: "/images/santhi_card.png",
      images: ["/images/leadership/santhi-1.jpg", "/images/leadership/santhi-2.jpg", "/images/leadership/santhi-3.jpg"],
      fullName: "Dr. Santhi Vedula",
      designation: "Advisory Board Member | Educator | Author | Academic Leader",
      company: "MentorMe Right",
      sections: [
        {
          heading: null,
          body: "With over 30 years of distinguished experience in education, academic leadership, and student development, Dr. Santhi Vedula brings unparalleled expertise to the MentorMe Right Advisory Board. An accomplished academician and lifelong learner, she holds multiple postgraduate degrees including M.Com, MBA, MA, M.Phil, B.Ed, MA (Indian Knowledge Systems), along with several professional diplomas. She is currently pursuing her Ph.D. in Management from SR University, reflecting her unwavering commitment to continuous learning and excellence.",
        },
        {
          heading: "Highlights",
          highlights: [
            { title: "Prolific Author", detail: "26 academic textbooks for B.Com and BBA programs published by Kalyani, Himalaya, Usha, and Vikram Publishers." },
            { title: "Research Excellence", detail: "42 research papers presented at national and international conferences." },
            { title: "Thought Leader", detail: "Contributions to newspapers, TV discussions, and All India Radio on education and career guidance." },
            { title: "Academic Leadership", detail: "Guiding academic vision and mentoring future leaders at MentorMe Right." },
          ],
        },
        {
          heading: "Awards & Recognitions",
          awards: [
            "She Inspires Award (2023)",
            "Inspiring Women of the Year (2021)",
            "Global Faculty Award (2022)",
            "Vidya Siromani Award (2015)",
            "Andhra Pradesh Ugadi Puraskaram",
            "Stri Murthy Award for Excellence in Education",
            "Dr. APJ Abdul Kalam Award for Educational Excellence",
            "Best Woman Administrator Award (2026)",
          ],
        },
        {
          heading: null,
          body: "At MentorMe Right, Dr. Santhi Vedula plays a pivotal role in guiding our academic vision, mentoring future leaders, and helping students make informed career choices in a rapidly evolving world.",
        },
        {
          quoteLabel: "Her Message to Students",
          quote: "Education is not merely about earning a degree. It is about discovering your strengths, building confidence, and creating a meaningful impact. The future belongs to those who continuously learn, adapt, and lead with purpose.",
        },
      ],
    },
  ];

  const renderModal = (leader: Leader, index: number) => {
    const overlay = (
      <div className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {leader.fullName ?? leader.name}
                  </h3>
                  <p className="text-brand-blue font-semibold text-lg mt-1">
                    {leader.designation ?? leader.role}
                  </p>
                  {leader.company ? (
                    <p className="text-slate-500 mt-1">{leader.company}</p>
                  ) : null}
                </div>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 space-y-6">
                {leader.sections?.map((section, i) => (
                  <div key={i}>
                    {section.heading ? (
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {section.heading}
                      </h3>
                    ) : null}
                    {section.body ? (
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {section.body}
                      </p>
                    ) : null}
                    {section.highlights ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {section.highlights.map((item, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-3 p-4 bg-brand-blue/5 rounded-xl"
                          >
                            <Award
                              className="text-brand-orange shrink-0 mt-1"
                              size={20}
                            />
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {section.awards ? (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {section.awards.map((award, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 rounded-xl"
                          >
                            <Award
                              className="text-brand-orange shrink-0"
                              size={18}
                            />
                            <span className="text-sm font-medium text-slate-700">
                              {award}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {section.quote ? (
                      <div className="bg-gradient-to-r from-brand-blue/10 to-brand-orange/10 p-6 rounded-2xl border border-brand-blue/20">
                        <h4 className="text-lg font-bold text-brand-blue mb-2">
                          {section.quoteLabel ?? ""}
                        </h4>
                        <p className="text-slate-700 italic leading-relaxed">
                          &ldquo;{section.quote}&rdquo;
                        </p>
                      </div>
                    ) : null}
                  </div>
                ))}

                {leader.images.length > 0 ? (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Brand and Eminence
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {(galleryOpen[index] ? leader.images : leader.images.slice(0, 1)).map(
                        (img, i) => (
                          <div
                            key={i}
                            className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white"
                          >
                            <div className="relative w-full aspect-[4/3]">
                              <img
                                src={img}
                                alt={`${leader.name} ${i + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            {leader.captions && leader.captions[i] ? (
                              <p className="mt-2 px-2 pb-2 text-xs text-slate-600 text-center">{leader.captions[i]}</p>
                            ) : null}
                          </div>
                        )
                      )}
                    </div>
                    {leader.images.length > 1 ? (
                      <div
                        onClick={() => toggleGallery(index)}
                        className="mt-3 flex items-center gap-2 text-brand-blue font-semibold hover:underline cursor-pointer"
                      >
                        {galleryOpen[index]
                          ? "Show less"
                          : `View all ${leader.images.length} photos`}
                        <span className="text-xs">
                          ({galleryOpen[index] ? "▲" : "▼"})
                        </span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return <div key={index}>{overlay}</div>;
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="bg-brand-blue/5 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-blue">About MentorMe</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We prioritize using a scientific approach rooted in deep self-awareness to guide career decisions.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The visionaries and experts driving the mission behind MentorMe Right.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {leaders.map((leader, i) => (
              <div
                key={i}
                className="relative rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 bg-white cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
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
                  <p className="text-brand-blue font-semibold mt-1">{leader.role}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(openIndex === i ? null : i);
                    }}
                    className="mt-4 px-5 py-2 bg-brand-blue text-white rounded-full font-semibold hover:bg-brand-blue/90 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {openIndex !== null && renderModal(leaders[openIndex], openIndex)}

          <div className="text-center space-y-4 pt-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Trusted Partners
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Institutions and organisations we collaborate with to empower careers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {institutions.map((inst, i) => (
              <div
                key={i}
                className="group relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 bg-white cursor-pointer flex flex-col items-center justify-center p-6 aspect-square"
                onClick={() => setInstitutionIndex(i)}
              >
                {inst.logo ? (
                  <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                    <img
                      src={inst.logo}
                      alt={inst.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <span className="text-2xl font-extrabold text-brand-blue">
                      {inst.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                )}
                <p className="text-sm font-bold text-slate-900 text-center leading-tight group-hover:text-brand-blue transition-colors">
                  {inst.name}
                </p>
              </div>
            ))}
          </div>

          {institutionIndex !== null && renderInstitutionModal(institutions[institutionIndex], institutionIndex)}
        </div>
      </section>
    </div>
  );
}
