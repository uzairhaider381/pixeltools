import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight, Wrench } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { Button } from "@/components/ui/button";

const categoryColors: Record<string, string> = {
  Guides: "bg-violet-500/10 text-violet-500",
  "Social Media": "bg-blue-500/10 text-blue-500",
  Concepts: "bg-amber-500/10 text-amber-600",
  Tutorials: "bg-green-500/10 text-green-600",
  Resources: "bg-primary/10 text-primary",
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8 text-lg">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-primary">
              <ArrowLeft size={16} className="mr-2" /> Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Related tools based on keywords in slug/category
  const getRelatedTools = () => {
    const tools = [];
    if (slug?.includes("compress") || slug?.includes("jpg")) {
      tools.push({ name: "Image Compressor", href: "/compress", desc: "Reduce file size instantly" });
    }
    if (slug?.includes("resize") || slug?.includes("social") || slug?.includes("dpi")) {
      tools.push({ name: "Image Resizer", href: "/resize", desc: "Scale to exact dimensions" });
    }
    if (slug?.includes("crop")) {
      tools.push({ name: "Image Cropper", href: "/crop", desc: "Crop and reframe photos" });
    }
    if (slug?.includes("background") || slug?.includes("free")) {
      tools.push({ name: "Background Remover", href: "/remove-background", desc: "AI-powered removal" });
    }
    if (slug?.includes("pdf") || slug?.includes("format") || slug?.includes("jpg")) {
      tools.push({ name: "Image Converter", href: "/convert", desc: "Convert formats easily" });
    }
    if (slug?.includes("watermark") || slug?.includes("free")) {
      tools.push({ name: "Watermark Adder", href: "/watermark", desc: "Protect your digital assets" });
    }

    // Default tools if we somehow don't have enough
    if (tools.length < 2) {
      if (!tools.find(t => t.href === '/compress')) tools.push({ name: "Image Compressor", href: "/compress", desc: "Reduce file size instantly" });
      if (!tools.find(t => t.href === '/resize')) tools.push({ name: "Image Resizer", href: "/resize", desc: "Scale to exact dimensions" });
    }

    return tools.slice(0, 3);
  };

  const relatedTools = getRelatedTools();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        {/* Navigation */}
        <div className="mb-10">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="group text-muted-foreground hover:text-foreground border-border/60 hover:bg-muted/50 rounded-full">
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-6 ${categoryColors[post.category] ?? "bg-muted text-muted-foreground"}`}>
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.15]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border/40 pt-6 mt-6">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {post.readTime}</span>
          </div>
        </header>

        {/* Article Content */}
        <article 
          className="prose prose-lg prose-gray dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-li:text-muted-foreground
          prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer / Related Tools */}
        <div className="mt-20 pt-10 border-t border-border/60">
          <h3 className="text-2xl font-bold flex items-center gap-2 mb-8">
            <Wrench size={24} className="text-primary" /> Related Free Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((tool, i) => (
              <Link 
                key={i}
                href={tool.href}
                className="group flex flex-col p-5 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl hover:bg-card/80 hover:border-primary/30 transition-all hover:shadow-[0_8px_20px_-8px_rgba(139,92,246,0.15)] hover:-translate-y-1"
              >
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {tool.name}
                </span>
                <span className="text-sm text-muted-foreground mb-4">
                  {tool.desc}
                </span>
                <span className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1 mt-auto">
                  Use Tool <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
