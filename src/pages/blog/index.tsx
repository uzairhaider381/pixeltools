import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogs";

const categoryColors: Record<string, string> = {
  Guides: "bg-violet-500/10 text-violet-500",
  "Social Media": "bg-blue-500/10 text-blue-500",
  Concepts: "bg-amber-500/10 text-amber-600",
  Tutorials: "bg-green-500/10 text-green-600",
  Resources: "bg-primary/10 text-primary",
};

export default function BlogPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <div className="max-w-3xl mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen size={18} />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">PixelTools Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-violet-600 via-primary to-fuchsia-600 bg-clip-text text-transparent pb-1">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Tips, guides and tutorials about image editing. Master your digital assets with our comprehensive resources.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-card/65 backdrop-blur-xs border border-border/70 rounded-3xl p-6 md:p-8 hover:shadow-[0_12px_30px_-5px_rgba(139,92,246,0.12)] hover:bg-card/90 hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer h-full"
            >
              {/* Category */}
              <span className={`self-start text-xs font-semibold px-3 py-1.5 rounded-full mb-5 transition-colors ${categoryColors[post.category] ?? "bg-muted text-muted-foreground"}`}>
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-foreground/90 group-hover:text-primary leading-tight mb-4 transition-colors">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.description}
              </p>

              {/* Meta & CTA */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-foreground/50" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-foreground/50" /> {post.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-primary font-bold group-hover:underline text-sm uppercase tracking-wider">
                  Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
