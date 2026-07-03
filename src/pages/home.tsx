import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/AdBanner";
import { Maximize, Minimize, Crop, FileImage, Eraser, FileText, Image, Droplet } from "lucide-react";

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
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16 flex flex-col items-center">

        {/* Hero */}
        <div className="text-center max-w-3xl mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
            Free Online Image Tools
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-2">
            Resize, compress, crop, convert, and more — all in your browser. Private and instant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/resize">
              <Button size="lg" className="w-full sm:w-auto text-base px-8">Get Started</Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8"
              onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
            >
              View All Tools
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-16 max-w-3xl w-full">
          {["100% Private — No uploads", "Completely Free", "Works in Any Browser"].map(badge => (
            <div key={badge} className="bg-muted/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-border/50">
              {badge}
            </div>
          ))}
        </div>

        {/* Tools grid — 1 col mobile, 2 col tablet+ */}
        <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl mb-10 md:mb-16">
          {tools.map(({ href, label, desc, icon: Icon }) => (
            <Link key={href} href={href} className="group flex items-start gap-4 bg-card border rounded-xl p-4 md:p-6 hover:shadow-md transition-all hover:border-primary/50 active:scale-[0.98]">
              <div className="p-2.5 md:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                <Icon size={22} />
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="text-base md:text-lg font-semibold mb-1">{label}</h2>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <span className="text-primary text-sm font-medium mt-2 group-hover:underline">Use Tool →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full max-w-5xl">
          <AdBanner slot="1122334455" format="rectangle" />
        </div>
      </div>
    </Layout>
  );
}
