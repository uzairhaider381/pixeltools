import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post6() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">Best Ways to Crop Images</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 mb-5">Tutorials</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          Best Ways to Crop Images Online
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 13, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            Cropping sounds simple — you're just cutting away part of an image. But done wrong, it ruins composition, removes key details, or produces an image that doesn't fit where you need it. Done right, it's one of the most powerful tools for improving a photograph.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">What Cropping Actually Does</h2>
          <p>
            Cropping removes the outer portions of an image to focus on a specific area. It reduces the pixel dimensions of the image (the output is smaller than the input). It does not resize the remaining portion — the pixels that stay are exactly the same size as before.
          </p>
          <p>
            This is an important distinction from resizing: cropping changes the composition, resizing changes the scale. Sometimes you need both — crop first to the right composition, then resize to the required dimensions.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Cropping for Composition</h2>
          <p>
            The rule of thirds is a classic composition guide: imagine your image divided into a 3×3 grid. Placing your subject at one of the four intersection points of those grid lines typically produces a more dynamic, visually interesting result than centering.
          </p>
          <p>
            When cropping portraits, give the subject room to look into (empty space in the direction they're facing). When cropping landscapes, decide whether the sky or the ground is more interesting and give that more space.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Cropping for Specific Aspect Ratios</h2>
          <p>Many platforms require specific aspect ratios:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>1:1 (Square)</strong> — Instagram posts, profile photos</li>
            <li><strong>16:9 (Landscape)</strong> — YouTube thumbnails, website banners, presentations</li>
            <li><strong>4:5 (Portrait)</strong> — Instagram portrait posts (best feed performance)</li>
            <li><strong>9:16 (Vertical)</strong> — Stories, TikTok, Reels</li>
            <li><strong>2:3</strong> — Standard print photos (4×6, 8×12)</li>
          </ul>
          <p>
            When you crop to a specific ratio, the aspect ratio stays fixed but you choose which part of the image to keep.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">How to Crop Online Without Software</h2>
          <p>
            Our free{" "}
            <Link href="/crop" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Cropper</Link>
            {" "}lets you drag a crop area over your image and download the result instantly. You can:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Upload your image by dragging it onto the tool</li>
            <li>Drag the corners and edges of the crop box to define your area</li>
            <li>Fine-tune the position by dragging the box itself</li>
            <li>Click Crop and download the result</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4">Cropping vs Resizing — Which Do You Need?</h2>
          <p>
            Ask yourself: do you need to change the <em>composition</em> (what's visible) or the <em>scale</em> (how large the image is)?
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Change composition → Crop</li>
            <li>Change scale → <Link href="/resize" className="text-primary underline underline-offset-2 hover:text-primary/80">Resize</Link></li>
            <li>Change both → Crop first, then resize</li>
          </ul>

          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-3">Crop your image with precise control — free and private:</p>
            <Link href="/crop">
              <Button className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-90">
                Open Image Cropper <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/remove-background-from-images-free" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/convert-images-to-pdf-online" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
