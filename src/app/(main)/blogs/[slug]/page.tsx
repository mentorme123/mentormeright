import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const parseFormattedText = (text: string): (string | ReactElement)[] => {
    if (!text.includes("**")) return [text];
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-4">
          {parseFormattedText(line.replace("### ", ""))}
        </h3>
      );
      i++;
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-3xl font-bold text-slate-900 mt-12 mb-6">
          {parseFormattedText(line.replace("## ", ""))}
        </h2>
      );
      i++;
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("• "))) {
        listItems.push(lines[i].trim().replace(/^[-•]\s*/, ""));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc pl-6 mb-8 text-slate-700 space-y-3 text-lg">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseFormattedText(item)}</li>
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
            <li key={idx}>{parseFormattedText(item)}</li>
          ))}
        </ol>
      );
    } else if (line === "") {
      i++;
    } else {
      elements.push(
        <p key={i} className="text-slate-700 leading-relaxed mb-8 text-lg">
          {parseFormattedText(line)}
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

      <section className="relative w-full bg-slate-900">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-10 rounded-3xl shadow-xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to explore more?</h3>
          <p className="text-slate-300 mb-6 text-base md:text-lg max-w-2xl mx-auto">
            If you are interested, take our MentorMe Career Intelligence Report test to discover your ideal career path.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/payment">
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white border-0 shadow-lg px-8 py-5 rounded-full text-base font-bold transition-all">
                Take MentorMe Career Intelligence Report <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/blogs">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-lg px-8 py-5 rounded-full text-base font-bold transition-all">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
