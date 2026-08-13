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
        <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
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
        <ul key={i} className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
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
        <ol key={i} className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
    } else if (line === "") {
      i++;
    } else {
      elements.push(
        <p key={i} className="text-slate-700 leading-relaxed mb-6 text-base">
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl">
          <div className="flex gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-brand-blue">Home</Link>
            <span>|</span>
            <Link href="/blogs" className="hover:text-brand-blue">Blogs</Link>
            <span>|</span>
            <span>{post.title}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="relative h-[300px] md:h-[400px] w-full bg-slate-200">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <Link href="/blogs">
            <Button variant="outline" className="mb-8">
              <ArrowLeft size={16} className="mr-2" /> Back to Blogs
            </Button>
          </Link>

          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </div>
      </section>
    </div>
  );
}
