import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export const blogPosts = [
  {
    slug: "compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    description: "Learn the best techniques to reduce image file sizes while keeping your photos sharp and crisp. A practical guide for designers, developers, and everyday users.",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    slug: "jpg-vs-png-vs-webp",
    title: "JPG vs PNG vs WebP — Which Format Should You Use?",
    description: "Not all image formats are created equal. Understand the strengths and weaknesses of each format so you always choose the right one for the job.",
    date: "June 25, 2026",
    readTime: "7 min read",
    category: "Guides",
  },
  {
    slug: "resize-images-for-social-media",
    title: "How to Resize Images for Instagram, Twitter and LinkedIn",
    description: "Every social media platform has different image size requirements. This guide gives you the exact dimensions you need and shows you how to resize quickly.",
    date: "June 22, 2026",
    readTime: "5 min read",
    category: "Social Media",
  },
  {
    slug: "what-is-image-dpi",
    title: "What is Image DPI and Why Does It Matter?",
    description: "DPI is one of those terms that confuses a lot of people. Here's a clear, practical explanation of what it is, when it matters, and when it doesn't.",
    date: "June 19, 2026",
    readTime: "6 min read",
    category: "Concepts",
  },
  {
    slug: "remove-background-from-images-free",
    title: "How to Remove Background from Images for Free",
    description: "Background removal doesn't have to cost money or require Photoshop. Here's how to do it right in your browser using completely free tools.",
    date: "June 16, 2026",
    readTime: "5 min read",
    category: "Tutorials",
  },
  {
    slug: "best-ways-to-crop-images-online",
    title: "Best Ways to Crop Images Online",
    description: "Cropping is one of the most used photo editing actions — and one of the most misunderstood. Here's how to crop with precision using free online tools.",
    date: "June 13, 2026",
    readTime: "5 min read",
    category: "Tutorials",
  },
  {
    slug: "convert-images-to-pdf-online",
    title: "How to Convert Images to PDF Online",
    description: "Need to turn your photos or screenshots into a single PDF document? Here's the quickest way to do it without installing any software.",
    date: "June 10, 2026",
    readTime: "4 min read",
    category: "Tutorials",
  },
  {
    slug: "what-is-image-compression",
    title: "What is Image Compression and How Does It Work?",
    description: "Image compression is everywhere — in every photo you take, every website you visit. This article explains the technology behind it in plain language.",
    date: "June 7, 2026",
    readTime: "7 min read",
    category: "Concepts",
  },
  {
    slug: "how-to-add-watermark-to-images",
    title: "How to Add a Watermark to Your Images",
    description: "Watermarking protects your creative work online. Learn how to add professional-looking watermarks to your images without expensive software.",
    date: "June 4, 2026",
    readTime: "5 min read",
    category: "Tutorials",
  },
  {
    slug: "top-free-online-image-tools-2026",
    title: "Top Free Online Image Tools in 2026",
    description: "A curated roundup of the best free, browser-based image tools available today — for resizing, compressing, converting, cropping, and more.",
    date: "June 1, 2026",
    readTime: "8 min read",
    category: "Resources",
  },
];

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
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen size={18} />
            </div>
            <span className="text-sm font-medium text-primary">PixelTools Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-violet-600 via-primary to-fuchsia-600 bg-clip-text text-transparent pb-1">
            Image Tips, Guides & Resources
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Practical guides on image editing, optimization, and best practices — written for designers, developers, and everyone in between.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-card/65 backdrop-blur-xs border border-border/70 rounded-2xl p-6 hover:shadow-[0_12px_30px_-5px_rgba(139,92,246,0.1)] hover:bg-card/90 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Category */}
              <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColors[post.category] ?? "bg-muted text-muted-foreground"}`}>
                {post.category}
              </span>

              {/* Title */}
              <h2 className="text-base font-bold text-foreground/90 group-hover:text-foreground leading-snug mb-3 transition-colors flex-1">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-primary font-semibold group-hover:underline text-xs">
                  Read <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
