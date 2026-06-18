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
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Free Online Image Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Resize, compress, crop, convert, and more — all in your browser. Private and instant.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/resize">
              <Button size="lg" className="text-lg px-8">Get Started</Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}>
              View All Tools
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-16 max-w-4xl w-full">
          {["100% Private — No uploads", "Completely Free", "Works in Any Browser"].map(badge => (
            <div key={badge} className="bg-muted/50 px-4 py-2 rounded-full text-sm font-medium border border-border/50">
              {badge}
            </div>
          ))}
        </div>
        <div id="tools" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-16">
          {tools.map(({ href, label, desc, icon: Icon }) => (
            <div key={href} className="group flex flex-col bg-card border rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{label}</h3>
              </div>
              <p className="text-muted-foreground flex-1 mb-4">{desc}</p>
              <Link href={href} className="text-primary font-medium hover:underline inline-flex items-center gap-1 w-max">
                Use Tool →
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full max-w-5xl">
          <AdBanner slot="1122334455" format="rectangle" />
        </div>
      </div>
    </Layout>
  );
}
