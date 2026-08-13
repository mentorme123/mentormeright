import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import type { ReactElement } from "react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function renderContent(content: string): ReactElement[] {
  const lines = content.split("\n");
  const elements: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-3xl font-bold text-slate-900 mt-12 mb-6">
          {line.replace("## ", "")}
        </h2>
      );
      i++;
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc pl-6 mb-8 text-slate-700 space-y-3 text-lg">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    } else if (line.match(/^\d+\./)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\./)) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s*/, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal pl-6 mb-8 text-slate-700 space-y-3 text-lg">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
    } else if (line === "") {
      i++;
    } else {
      elements.push(
        <p key={i} className="text-slate-700 leading-relaxed mb-8 text-lg">
          {line}
        </p>
      );
      i++;
    }
  }

  return elements;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative w-full bg-brand-blue py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6">
            <ArrowLeft className="mr-2" /> Back to Blogs
          </Link>
          <div className="flex items-center gap-3 text-xs text-white/80 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/20 text-white font-medium">
              {post.category}
            </span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to explore more?</h3>
          <p className="text-slate-300 mb-6">Check out our other blogs and resources for career guidance.</p>
          <Link href="/blogs">
            <Button className="bg-brand-blue hover:opacity-90 text-white border-0 shadow-lg px-8 py-5 rounded-full text-base font-bold">
              Back to Blogs <ArrowLeft className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
