"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { Button } from "@/components/ui/button";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-brand-blue/5 py-12 px-4">
        <div className="max-w-6xl">
          <div className="flex gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            <span>|</span>
            <Link href="/blogs" className="hover:text-brand-blue">Blogs</Link>
            <span>|</span>
            <span>{post.title}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {post.title}
          </motion.h1>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Link href="/blogs">
            <Button variant="outline" className="mb-8">
              <ArrowLeft size={16} className="mr-2" /> Back to Blogs
            </Button>
          </Link>

          <article className="prose prose-lg max-w-none whitespace-pre-line text-slate-700 leading-relaxed">
            {post.content}
          </article>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
