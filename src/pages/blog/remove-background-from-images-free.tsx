import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post5() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">Remove Background Free</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 mb-5">Tutorials</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          How to Remove Background from Images for Free
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 16, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            Removing a background used to require Photoshop and a fair amount of skill. Today you can do it for free, in your browser, in seconds. Here's exactly how — and what to expect from different approaches.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">When Do You Need Background Removal?</h2>
          <p>Background removal is useful in more situations than you might think:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Product photos for e-commerce (white or transparent backgrounds look more professional)</li>
            <li>Profile photos for LinkedIn or business websites</li>
            <li>Creating stickers or graphics with transparent backgrounds</li>
            <li>Placing a subject onto a different background for compositing</li>
            <li>Removing distracting backgrounds from portrait photos</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">Method 1: Browser-Based AI Tools (Automatic)</h2>
          <p>
            The easiest method is to use our{" "}
            <Link href="/remove-background" className="text-primary underline underline-offset-2 hover:text-primary/80">Background Remover</Link>
            {" "}tool. It uses machine learning models that run directly in your browser — no files are uploaded to a server. Here's how:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Open the Background Remover tool</li>
            <li>Upload or drag your image onto the tool</li>
            <li>Wait a few seconds while the AI processes the image</li>
            <li>Download the result as a PNG with a transparent background</li>
          </ol>
          <p>
            This works best on images with clear subject-background separation — portraits, product photos, and objects on solid or simple backgrounds.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">What Results to Expect</h2>
          <p>
            Modern browser-based background removal is impressive but not perfect. It works extremely well for:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>People and portraits (especially with clear background separation)</li>
            <li>Products on simple backgrounds</li>
            <li>Animals with distinct outlines</li>
          </ul>
          <p>It works less well for:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Fine hair or fur at the edges</li>
            <li>Complex backgrounds with similar colors to the subject</li>
            <li>Glass, water, or transparent subjects</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">Tips for Better Results</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Use good lighting:</strong> Images with even, consistent lighting produce the best results</li>
            <li><strong>Avoid similar colors:</strong> If your subject and background are similar colors, the edge detection will struggle</li>
            <li><strong>Use higher resolution images:</strong> More pixels means finer edge detection</li>
            <li><strong>Simple backgrounds work better:</strong> Plain walls or studio backdrops give much cleaner results than cluttered backgrounds</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">After Removing the Background</h2>
          <p>
            Once you have a PNG with a transparent background, you can:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Use it directly on websites (transparent PNGs display on any background color)</li>
            <li>Place it in a design tool like Canva, Figma, or Photoshop on a new background</li>
            <li>Add a solid color background using an image editor</li>
            <li>Convert it to WebP for smaller file sizes using our <Link href="/convert" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Converter</Link></li>
          </ul>

          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-3">Try free background removal — no account needed:</p>
            <Link href="/remove-background">
              <Button className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-90">
                Remove Background Free <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/what-is-image-dpi" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/best-ways-to-crop-images-online" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
