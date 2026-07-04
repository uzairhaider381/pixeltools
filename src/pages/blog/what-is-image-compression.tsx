import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

export default function Post8() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">What is Image Compression</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 mb-5">Concepts</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          What is Image Compression and How Does It Work?
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 7, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 7 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            Every time you take a photo on your phone, share an image on social media, or load a website, image compression is working behind the scenes. It's one of the most important technologies in digital media, yet most people have only a vague idea of how it works. This article explains it clearly.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">The Core Problem Compression Solves</h2>
          <p>
            A raw, uncompressed digital image contains an enormous amount of data. A 12-megapixel photo has 12 million pixels. Each pixel stores color information as three values (red, green, blue), each requiring 8 bits of data. That's 12,000,000 × 3 × 8 = 288,000,000 bits, or about 36 megabytes — for a single photo.
          </p>
          <p>
            Compression reduces this to a manageable size (typically 2–8 MB for a JPEG) by finding and eliminating redundant data.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Lossless Compression — No Data Thrown Away</h2>
          <p>
            Lossless compression finds patterns and redundancy in the data and encodes them more efficiently, without discarding any information. The original can be perfectly reconstructed.
          </p>
          <p>
            A simple example: instead of storing "white pixel, white pixel, white pixel, white pixel, white pixel" 500 times, the algorithm stores "500 white pixels" — the same information in far fewer bytes. This is called run-length encoding, one of many lossless techniques.
          </p>
          <p>
            <strong>PNG uses lossless compression.</strong> That's why a PNG can be perfectly restored and why text and sharp edges look pixel-perfect in PNG files.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Lossy Compression — Trading Quality for Size</h2>
          <p>
            Lossy compression achieves much greater size reductions by permanently removing some image data — data that the algorithm judges to be less important to human perception.
          </p>
          <p>
            JPEG compression works by:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Dividing the image into 8×8 pixel blocks</li>
            <li>Converting each block from RGB color space to a different representation that separates brightness from color information</li>
            <li>Applying a mathematical transform (Discrete Cosine Transform) to represent the block as a sum of frequencies</li>
            <li>Discarding high-frequency (fine detail) information based on the quality setting</li>
            <li>Encoding the remaining data efficiently</li>
          </ol>
          <p>
            The key insight: the human visual system is much more sensitive to brightness changes than to color changes, and much more sensitive to low-frequency patterns (gradual tonal shifts) than high-frequency patterns (sharp, fine detail). JPEG exploits this by aggressively compressing information the eye is least likely to notice.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">What Causes JPEG Artifacts</h2>
          <p>
            At high compression (low quality settings), JPEG artifacts become visible — typically as blocky areas, smearing, or ringing around sharp edges. These appear because the algorithm discards too much high-frequency detail, leaving the 8×8 pixel blocks visible and edges unnaturally soft.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">WebP — An Improvement on Both</h2>
          <p>
            WebP uses more sophisticated compression algorithms that achieve better results than JPEG for lossy compression (typically 25–35% smaller for similar quality) and better than PNG for lossless compression. It also adds animated image support and alpha channel (transparency) support that JPEG lacks.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Practical Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>For photos: use JPEG or WebP. Quality 80% is usually indistinguishable from the original.</li>
            <li>For graphics with text or flat colors: use PNG (lossless keeps edges sharp).</li>
            <li>For everything web-related: WebP gives the best compression at the same quality.</li>
            <li>Never compress an already-compressed JPEG again — artifacts compound with each re-compression.</li>
          </ul>
          <p>
            Ready to compress your own images? Our{" "}
            <Link href="/compress" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Compressor</Link>
            {" "}runs entirely in your browser — no uploads, no accounts.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/convert-images-to-pdf-online" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/how-to-add-watermark-to-images" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
