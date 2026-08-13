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

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg className="relative block w-[calc(133%+1.3px)] h-[40px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.22,199.53,108.14Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="hidden lg:block">
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={500}
                className="relative w-full h-[400px] lg:h-[500px] object-contain"
                priority
              />
            </div>
          </div>
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
