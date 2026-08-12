import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function getFirstParagraph(content: string) {
  const trimmed = content.trim();
  const firstHeading = trimmed.indexOf("\n## ");
  if (firstHeading === -1) {
    return trimmed;
  }
  const intro = trimmed.slice(0, firstHeading).trim();
  const paragraphs = intro.split(/\n{2,}/);
  return paragraphs[0] || intro;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const summary = getFirstParagraph(post.content);

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

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Link href="/blogs">
            <Button variant="outline" className="mb-8">
              <ArrowLeft size={16} className="mr-2" /> Back to Blogs
            </Button>
          </Link>

          <article className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <p>{summary}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
