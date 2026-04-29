import { programsData } from "@/lib/program-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogsPage() {
  const allBlogs = Object.values(programsData);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Section */}
      <section className="bg-brand-blue/5 pt-20 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-bold uppercase tracking-wider mb-2">
            <BookOpen size={16} /> Latest Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-blue tracking-tight">
            Our Program Blogs
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore deep dives into our comprehensive educational and corporate programs. Discover how we can help you turn your passion into a profession.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((blog) => (
            <Link key={blog.slug} href={`/programs/${blog.slug}`} className="group h-full">
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image 
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow">
                    {blog.description}
                  </p>
                  
                  {/* Footer of Card */}
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-brand-orange font-bold text-sm">
                    Read Full Blog
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global CTA */}
      <section className="bg-brand-blue py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-white">Ready to start your journey?</h2>
          <p className="text-slate-300 text-lg">Take our free psychometric assessment to find out which program is the perfect fit for your career trajectory.</p>
          <div className="pt-4">
            <Link href="/register">
              <Button size="lg" className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-brand-orange/20">
                Get Free Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
