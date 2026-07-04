import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post9() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">How to Add Watermark</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 mb-5">Tutorials</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          How to Add a Watermark to Your Images
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 4, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            If you're an artist, photographer, or business owner sharing work online, watermarking is a quick way to ensure your images retain their source attribution no matter where they end up. Here's a guide to adding professional watermarks without installing complex software.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Why Watermark Images?</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Theft Deterrence:</strong> Makes it harder for others to steal and claim your work as their own.</li>
            <li><strong>Brand Recognition:</strong> Every time your image is shared, your brand gets visibility.</li>
            <li><strong>Client Proofs:</strong> Prevent clients from using unpaid draft images.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">Best Practices for Watermarking</h2>
          <p>A good watermark protects the image without ruining it. Keep these tips in mind:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Opacity:</strong> Keep it semi-transparent (around 30-50%). It should be visible but not distracting.</li>
            <li><strong>Position:</strong> Center watermarks offer the most protection, but bottom-right or bottom-left corners are less intrusive for sharing.</li>
            <li><strong>Consistency:</strong> Use the same font, style, or logo across all your work.</li>
            <li><strong>Color:</strong> White or light gray works best on dark images, and vice versa.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">Adding a Watermark for Free</h2>
          <p>
            You don't need expensive photo editing software. Our{" "}
            <Link href="/watermark" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Watermarker</Link>
            {" "}runs directly in your browser.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Upload the image you want to protect.</li>
            <li>Choose text or image watermark (like your logo).</li>
            <li>Adjust opacity, size, and position.</li>
            <li>Download your watermarked image.</li>
          </ol>

          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-3">Protect your images instantly in your browser:</p>
            <Link href="/watermark">
              <Button className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-90">
                Open Image Watermarker <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/what-is-image-compression" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/top-free-online-image-tools-2026" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
