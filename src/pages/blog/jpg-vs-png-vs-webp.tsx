import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post2() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">JPG vs PNG vs WebP</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-500 mb-5">Guides</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          JPG vs PNG vs WebP — Which Format Should You Use?
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 25, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 7 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            Choosing the wrong image format is one of the most common and costly mistakes in web design. A PNG where a JPEG should be used can mean a file 10× larger. Here's how to always choose the right format.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">JPEG — The Workhorse of Photography</h2>
          <p>JPEG uses lossy compression and is ideal for photographs and complex multi-color imagery. At 80–90% quality, most people cannot tell a JPEG from the original. Below 60%, compression artifacts become visible.</p>
          <p><strong>Best for:</strong> Photos, product images, social media photos.<br /><strong>Not great for:</strong> Text, logos, images needing transparency.</p>

          <h2 className="text-xl font-bold text-foreground pt-4">PNG — The Precision Format</h2>
          <p>PNG uses lossless compression — no data is discarded. It supports full transparency (alpha channel), making it essential for logos and UI elements on different backgrounds.</p>
          <p><strong>Best for:</strong> Logos, icons, screenshots, graphics with text.<br /><strong>Not great for:</strong> Photographs (files much larger than JPEG).</p>

          <h2 className="text-xl font-bold text-foreground pt-4">WebP — The Modern Standard</h2>
          <p>Developed by Google, WebP combines lossy and lossless compression, full transparency support, and typically produces files 25–35% smaller than equivalent JPEGs. Browser support is universal in 2026.</p>
          <p><strong>Best for:</strong> Websites, anywhere you want the best compression without quality loss.</p>

          <h2 className="text-xl font-bold text-foreground pt-4">The Simple Decision Rule</h2>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li><strong>Needs transparency?</strong> → PNG or WebP</li>
            <li><strong>Photograph?</strong> → WebP or JPEG</li>
            <li><strong>Graphic/logo/text?</strong> → PNG</li>
            <li><strong>Building for the web?</strong> → Default to WebP</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4">Converting Between Formats</h2>
          <p>
            You can convert between JPEG, PNG, and WebP for free using our{" "}
            <Link href="/convert" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Converter</Link>
            {" "}— no software needed.
          </p>

          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-3">Need to convert your images?</p>
            <Link href="/convert">
              <Button className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-90">
                Try the Free Image Converter <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/compress-images-without-losing-quality" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/resize-images-for-social-media" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
