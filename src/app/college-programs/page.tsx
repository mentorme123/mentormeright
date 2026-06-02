"use client";

import Link from "next/link";
import { useState } from "react";

export default function CollegeProgramsPage() {
  const [skillTab, setSkillTab] = useState<"k12" | "college">("college");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center">Skill Training Programs</h2>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setSkillTab("k12")}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${
              skillTab === "k12"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            K-12 Programs
          </button>
          <button
            onClick={() => setSkillTab("college")}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${
              skillTab === "college"
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            College Programs
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillTab === "k12"
            ? [
                {
                  title: "Future AI Leaders Program",
                  subtitle: "AI Classes for School Students",
                  highlights: [
                    "Hands-on projects",
                    "Generative AI ML & NLP",
                    "Ethics & responsible AI",
                    "Teacher upskilling",
                  ],
                },
                {
                  title: "Robotics & STEM Learning for Kids",
                  subtitle: "Robotics Classes for School Students",
                  highlights: [
                    "Hands-on training",
                    "No lab investment",
                    "Robotics Expo",
                    "STEM Integration",
                    "Robotics Lab Upgrade",
                    "Teacher Training",
                  ],
                },
                {
                  title: "Smart Maths with Vedic Techniques",
                  subtitle: "Vedic Maths Classes for School Students",
                  highlights: [
                    "Fast-Track Mental Math",
                    "No Tools Needed",
                    "Expert-Led Sessions",
                    "Certification",
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-1 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="font-medium text-orange-500 mb-6">
                    {item.subtitle}
                  </p>
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800">
                    Key Highlights
                  </h4>
                  <ul className="text-slate-600 text-sm leading-relaxed mb-8 space-y-1">
                    {item.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <Link href="/services" className="flex-1">
                      <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                        Know more
                      </button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        Contact us
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            : [
                {
                  title: "Advanced AI & Machine Learning",
                  subtitle: "AI Certification for College Students",
                  highlights: [
                    "Deep Learning",
                    "Computer Vision",
                    "NLP Projects",
                    "Industry Capstone",
                    "Placement Assistance",
                  ],
                },
                {
                  title: "Full Stack Web Development",
                  subtitle: "Web & App Development Training",
                  highlights: [
                    "MERN Stack",
                    "Next.js",
                    "Cloud Deployment",
                    "Real-world Projects",
                    "Technical Interview Prep",
                  ],
                },
                {
                  title: "Data Science & Analytics",
                  subtitle: "Data Analytics Training Program",
                  highlights: [
                    "Python & SQL",
                    "Tableau & PowerBI",
                    "Predictive Modeling",
                    "Business Analytics",
                    "Live Projects",
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-1 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="font-medium text-orange-500 mb-6">
                    {item.subtitle}
                  </p>
                  <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-slate-800">
                    Key Highlights
                  </h4>
                  <ul className="text-slate-600 text-sm leading-relaxed mb-8 space-y-1">
                    {item.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <Link href="/services" className="flex-1">
                      <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                        Know more
                      </button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        Contact us
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
