import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/AdBanner";
import {
  Maximize,
  Minimize,
  Crop,
  FileImage,
  Eraser,
  FileText,
  Image,
  Droplet,
  ShieldCheck,
  Sparkles,
  Globe
} from "lucide-react";

export default function HomePage() {
  const tools = [
    { href: "/resize", label: "Image Resizer", desc: "Set exact pixel dimensions or scale by percentage", icon: Maximize },
    { href: "/compress", label: "Image Compressor", desc: "Reduce file size without losing quality", icon: Minimize },
    { href: "/crop", label: "Image Cropper", desc: "Crop to any region with drag-and-drop selection", icon: Crop },
    { href: "/convert", label: "Image Converter", desc: "Convert between PNG, JPG, and WebP instantly", icon: FileImage },
    { href: "/remove-background", label: "Background Remover", desc: "Remove image backgrounds automatically", icon: Eraser },
    { href: "/image-to-pdf", label: "Image to PDF", desc: "Turn one or more images into a PDF document", icon: FileText },
    { href: "/pdf-to-image", label: "PDF to Image", desc: "Convert PDF pages into downloadable images", icon: Image },
    { href: "/watermark", label: "Watermark Adder", desc: "Add text watermarks to protect your images", icon: Droplet },
  ];

  const badges = [
    { text: "100% Private — No uploads", icon: ShieldCheck, color: "text-green-500 bg-green-500/10" },
    { text: "Completely Free", icon: Sparkles, color: "text-amber-500 bg-amber-500/10" },
    { text: "Works in Any Browser", icon: Globe, color: "text-blue-500 bg-blue-500/10" },
  ];

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://pixeltools.online/#website",
                url: "https://pixeltools.online",
                name: "PixelTools",
                description: "Free online image tools suite.",
              },
              {
                "@type": "WebApplication",
                "@id": "https://pixeltools.online/#webapp",
                name: "PixelTools",
                url: "https://pixeltools.online",
                applicationCategory: "MultimediaApplication",
                operatingSystem: "All",
                browserRequirements: "Requires JavaScript",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
            ],
          }),
        }}
      />
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-12 md:mb-18 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight bg-gradient-to-r from-violet-600 via-primary to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm pb-1 select-none">
            Free Online Image Tools
          </h1>
          <p className="text-base md:text-xl text-muted-foreground/90 mb-8 md:mb-10 px-2 leading-relaxed max-w-2xl mx-auto">
            Resize, compress, crop, convert, and more. Fast, private, and 100% browser-based utility suite for creators and developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link href="/resize">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 font-semibold bg-gradient-to-r from-violet-600 to-primary hover:opacity-95 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                Get Started
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8 py-6 font-medium border-border/80 hover:bg-muted/50 hover:border-muted-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer"
              onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
            >
              View All Tools
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14 md:mb-20 max-w-3xl w-full">
          {badges.map(({ text, icon: Icon, color }) => (
            <div key={text} className="flex items-center gap-2 bg-card/60 backdrop-blur-xs px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-border/60 shadow-xs hover:shadow-md transition-shadow duration-300">
              <div className={`p-1 rounded-full ${color}`}>
                <Icon size={14} className="stroke-[2.5]" />
              </div>
              <span className="text-foreground/80">{text}</span>
            </div>
          ))}
        </div>

        {/* Tools Section Header */}
        <div className="w-full max-w-5xl mb-8 flex flex-col gap-1 items-start">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles size={20} className="text-primary animate-pulse" /> Available Tools
          </h2>
          <p className="text-sm text-muted-foreground">Select a tool to process your images directly on your device. No data leaves your browser.</p>
        </div>

        {/* Tools grid */}
        <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full max-w-5xl mb-12 md:mb-20">
          {tools.map(({ href, label, desc, icon: Icon }) => (
            <Link key={href} href={href} className="group flex items-start gap-5 bg-card/65 backdrop-blur-xs border border-border/70 rounded-2xl p-5 md:p-6 hover:shadow-[0_12px_30px_-5px_rgba(139,92,246,0.08)] hover:bg-card/90 transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 active:scale-[0.99] cursor-pointer">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 text-primary group-hover:from-primary group-hover:to-violet-500 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs flex-shrink-0">
                <Icon size={22} className="stroke-[2]" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground/90 group-hover:text-foreground transition-colors">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span className="text-primary text-sm font-semibold mt-3 flex items-center gap-1 group-hover:underline">
                  Use Tool{" "}
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Blog Banner */}
        <div className="w-full max-w-5xl mb-12 bg-card/60 backdrop-blur-md border border-border/80 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_-5px_rgba(139,92,246,0.1)]">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-foreground mb-2">📖 Want to learn more?</h3>
            <p className="text-muted-foreground">Check out our Blog for image editing tips, guides, and tutorials.</p>
          </div>
          <Link href="/blog">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-95 shadow-md shadow-primary/20">
              Read the Blog
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-5xl">
          <AdBanner slot="1122334455" format="rectangle" />
        </div>
      </div>
    </Layout>
  );
}

