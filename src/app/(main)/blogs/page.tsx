"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogs";
import { ArrowRight } from "lucide-react";
import React from "react";

function BlogCardImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className="h-48 w-full bg-gradient-to-br from-brand-blue/20 to-brand-orange/20 flex items-center justify-center">
        <span className="text-brand-blue font-bold text-lg text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full bg-slate-200">
      <Image src={src} alt={alt} fill className="object-cover" onError={() => setError(true)} />
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
                <BlogCardImage src={post.image} alt={post.title} />
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
