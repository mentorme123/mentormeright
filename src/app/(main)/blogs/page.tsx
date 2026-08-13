"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogs";
import { ArrowRight, Calendar } from "lucide-react";

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <Link href={`/blogs/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 bg-brand-blue/10 text-brand-blue px-2.5 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>
                  <Link href={`/blogs/${post.slug}`}>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm group/link"
                  >
                    Read More{" "}
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
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
