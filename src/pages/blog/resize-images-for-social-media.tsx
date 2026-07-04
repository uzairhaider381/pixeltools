import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post3() {
  const sizes = [
    { platform: "Instagram", type: "Square Post", size: "1080 × 1080 px" },
    { platform: "Instagram", type: "Portrait Post", size: "1080 × 1350 px" },
    { platform: "Instagram", type: "Story / Reel", size: "1080 × 1920 px" },
    { platform: "Twitter/X", type: "In-feed image", size: "1600 × 900 px" },
    { platform: "Twitter/X", type: "Profile photo", size: "400 × 400 px" },
    { platform: "LinkedIn", type: "Post image", size: "1200 × 627 px" },
    { platform: "LinkedIn", type: "Cover photo", size: "1584 × 396 px" },
    { platform: "LinkedIn", type: "Profile photo", size: "400 × 400 px" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">Resize for Social Media</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 mb-5">Social Media</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          How to Resize Images for Instagram, Twitter and LinkedIn
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 22, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            Every social media platform crops and compresses your images differently. If you've ever uploaded a perfectly composed photo only to have the platform cut off the edges or make it look blurry, you know the problem. Here are the exact dimensions you need, and how to resize quickly.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Exact Dimensions by Platform</h2>
          <div className="overflow-x-auto rounded-xl border border-border/50">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Platform</th>
                  <th className="text-left p-3 font-semibold text-foreground">Type</th>
                  <th className="text-left p-3 font-semibold text-foreground">Size</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((row, i) => (
                  <tr key={i} className="border-t border-border/30">
                    <td className="p-3 font-medium text-foreground">{row.platform}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3 font-mono text-xs">{row.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-foreground pt-4">Why Platform Size Matters</h2>
          <p>
            When you upload an image that doesn't match a platform's expected aspect ratio, the platform will crop it — usually from the edges or center. This can cut off faces, text, or key design elements. Resizing to the correct dimensions before uploading gives you full control over what appears.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Instagram Tips</h2>
          <p>Instagram supports three aspect ratios in the feed: square (1:1), portrait (4:5), and landscape (1.91:1). Portrait (1080 × 1350px) takes up the most screen space in the feed and typically gets more engagement because it's harder to scroll past.</p>
          <p>For Stories and Reels, 1080 × 1920px (9:16) is the standard. Keep important content in the center third of the frame — the top and bottom get partially obscured by the UI.</p>

          <h2 className="text-xl font-bold text-foreground pt-4">Twitter/X Tips</h2>
          <p>Twitter displays images in a 2:1 crop preview in the feed. A 1600 × 900px image fills this perfectly. If you upload a portrait image, Twitter will center-crop it in the preview — but users can tap to see the full image.</p>

          <h2 className="text-xl font-bold text-foreground pt-4">LinkedIn Tips</h2>
          <p>LinkedIn post images at 1200 × 627px (roughly 1.91:1) look the most professional and take up the most space in the feed. The platform is less aggressive about cropping than Instagram, but the dimensions still matter for how your post appears in preview links.</p>

          <h2 className="text-xl font-bold text-foreground pt-4">How to Resize Without Losing Quality</h2>
          <p>
            Use our free{" "}
            <Link href="/resize" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Resizer</Link>
            {" "}to set exact pixel dimensions. Type in the width and height for your target platform, lock the aspect ratio if you want to scale proportionally, or disable it to force exact dimensions. Download and you're done — no blurry resizing, no account needed.
          </p>

          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-3">Resize your images to exact social media dimensions:</p>
            <Link href="/resize">
              <Button className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-90">
                Open Image Resizer <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/jpg-vs-png-vs-webp" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/what-is-image-dpi" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
