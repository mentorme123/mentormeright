"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { ArrowRight, BookOpen, Lightbulb, Settings, GraduationCap, Database, HeartPulse, TrendingUp } from "lucide-react";

const blogConfig = [
  {
    slug: "advantages-of-career-assessment-tools",
    icon: BookOpen,
    color: "from-brand-blue to-brand-blue/80",
  },
  {
    slug: "offbeat-careers-in-india",
    icon: Lightbulb,
    color: "from-brand-orange to-brand-orange/80",
  },
  {
    slug: "engineering-streams-in-india",
    icon: Settings,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    slug: "career-options-pcm-mpc-stream",
    icon: GraduationCap,
    color: "from-violet-500 to-violet-600",
  },
  {
    slug: "data-scientist-career-in-india",
    icon: Database,
    color: "from-cyan-500 to-blue-600",
  },
  {
    slug: "occupational-therapist-career-in-india",
    icon: HeartPulse,
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "investment-banker-career-in-india",
    icon: TrendingUp,
    color: "from-amber-500 to-amber-700",
  },
];

function BlogCardImage({ slug }: { slug: string }) {
  const config = blogConfig.find((c) => c.slug === slug);
  const Icon = config?.icon || BookOpen;
  const colorClass = config?.color || "from-brand-blue to-brand-blue/80";

  return (
    <div className="p-8 pb-0">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
        <Icon size={28} className="text-white" />
      </div>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-brand-blue py-20 px-4 text-center text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 text-sm text-white/80 mb-6 justify-center">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>|</span>
            <span>Blogs</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Blogs
          </motion.h1>
          <p className="text-white/90 text-lg">
            Insights, guides, and career resources to help you make informed decisions.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <BlogCardImage slug={post.slug} />
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-slate-800 leading-snug">{post.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blogs/${post.slug}`} className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm group">
                    Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
