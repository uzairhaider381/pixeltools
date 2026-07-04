import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

export default function Post4() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">What is Image DPI</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 mb-5">Concepts</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          What is Image DPI and Why Does It Matter?
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 19, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 6 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            DPI — dots per inch — is one of those technical terms that sounds complicated but is actually quite straightforward once you understand the core concept. More importantly, knowing when DPI matters (and when it doesn't) will save you from printing blurry photos and oversized web files.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">DPI vs PPI — What's the Difference?</h2>
          <p>
            Technically, <strong>DPI</strong> refers to printer dots per inch — how many physical ink dots a printer places per inch of paper. <strong>PPI</strong> (pixels per inch) refers to screen pixels. However, in common usage, DPI is used interchangeably for both. When people say "DPI of an image," they almost always mean PPI.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">What DPI Actually Controls</h2>
          <p>
            DPI tells output devices (printers, monitors) how to interpret your image's pixel dimensions. It doesn't change the number of pixels — it just sets how large those pixels are displayed or printed.
          </p>
          <p>
            Here's a concrete example: a 2400 × 3000 pixel image printed at 300 DPI will be 8 × 10 inches. The same image printed at 72 DPI would be 33 × 41 inches — but it would look terrible because the pixels are being stretched so large you can see them individually.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">DPI Standards You Should Know</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>72 DPI</strong> — Standard for web and screen displays. This is the default for most monitors.</li>
            <li><strong>150 DPI</strong> — Acceptable for large-format prints viewed from a distance (banners, posters).</li>
            <li><strong>300 DPI</strong> — The standard for high-quality print (photos, magazines, business cards).</li>
            <li><strong>600+ DPI</strong> — Used for very detailed print work (fine art, technical drawings).</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">DPI Does NOT Affect Screen Display</h2>
          <p>
            Here's the most commonly misunderstood fact about DPI: <strong>it has no effect on how an image looks on a screen</strong>. Monitors display images based on pixel dimensions only. A 1000 × 1000px image looks exactly the same on screen whether it's set to 72 DPI or 300 DPI. The DPI metadata is only read by printers.
          </p>
          <p>
            This means: if someone tells you to "make your image 300 DPI" for a website, they're either confused or they want you to increase the actual pixel dimensions.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">What Actually Determines Print Quality</h2>
          <p>
            Print quality is determined by your image's pixel dimensions relative to the print size. To calculate the pixel dimensions you need for a print at 300 DPI, multiply the size in inches by 300:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>4 × 6 inch photo at 300 DPI → 1200 × 1800 pixels needed</li>
            <li>8 × 10 inch photo at 300 DPI → 2400 × 3000 pixels needed</li>
            <li>5 × 7 inch photo at 300 DPI → 1500 × 2100 pixels needed</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">How to Check and Change DPI</h2>
          <p>
            You can check an image's DPI in file properties on any OS. To change the dimensions (and therefore the effective DPI for a given print size), use our{" "}
            <Link href="/resize" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Resizer</Link>
            {" "}to scale your image to the required pixel dimensions.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Quick Reference</h2>
          <p>
            <strong>Web/screen use:</strong> DPI doesn't matter, focus on pixel dimensions.<br />
            <strong>Print use:</strong> Aim for 300 DPI. Calculate required pixels: width (inches) × 300 = width in pixels.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/resize-images-for-social-media" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/remove-background-from-images-free" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
