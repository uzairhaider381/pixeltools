import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Post7() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">Convert Images to PDF</span>
        </nav>

        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 mb-5">Tutorials</span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
          How to Convert Images to PDF Online
        </h1>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar size={12} /> June 10, 2026</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 4 min read</span>
        </div>

        <div className="text-muted-foreground space-y-5 leading-relaxed">
          <p className="text-base text-foreground/80">
            Turning images into a PDF is one of those tasks that sounds like it should be easy — and it is, once you know the right tool. Whether you're compiling a portfolio, sending scanned documents, or packaging a set of photos into a single shareable file, here's everything you need to know.
          </p>

          <h2 className="text-xl font-bold text-foreground pt-4">Why Convert Images to PDF?</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Universal compatibility:</strong> PDF opens on every device without any special software</li>
            <li><strong>Single file:</strong> Combine multiple images into one document instead of attaching 20 separate files</li>
            <li><strong>Print-ready:</strong> PDFs maintain exact dimensions for professional printing</li>
            <li><strong>Professional appearance:</strong> A PDF looks more polished than a folder of images for presentations or portfolios</li>
            <li><strong>Preservation:</strong> PDFs are an archival format — good for long-term storage of documents</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">How to Convert Using PixelTools</h2>
          <p>
            Our{" "}
            <Link href="/image-to-pdf" className="text-primary underline underline-offset-2 hover:text-primary/80">Image to PDF</Link>
            {" "}tool handles the conversion entirely in your browser — your images never leave your device. Here's how to use it:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Open the Image to PDF tool</li>
            <li>Drag and drop one or more images — you can add as many as you need</li>
            <li>Reorder them by dragging if the sequence matters</li>
            <li>Choose your PDF page size (A4, letter, or fit to image)</li>
            <li>Click "Convert to PDF" and download</li>
          </ol>

          <h2 className="text-xl font-bold text-foreground pt-4">Supported Image Formats</h2>
          <p>You can convert JPG, PNG, WebP, and GIF images to PDF. The tool automatically handles the conversion of each image type.</p>

          <h2 className="text-xl font-bold text-foreground pt-4">Multi-Image PDFs</h2>
          <p>
            If you're combining multiple images (like scanning multiple pages of a document), the tool places each image on a separate PDF page in the order you arranged them. This is useful for:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Multi-page scanned documents</li>
            <li>Photo books or collections</li>
            <li>Design portfolios</li>
            <li>Instruction manuals with screenshots</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">Tips for Better Quality PDFs</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Start with high resolution images:</strong> The PDF will be only as good as your input images. For print quality, use images at 300 DPI or at least 1800px on the short side.</li>
            <li><strong>Use PNG for documents with text:</strong> If your image contains text (like a scanned document), PNG preserves sharp edges better than JPEG.</li>
            <li><strong>Compress first if file size matters:</strong> Use our <Link href="/compress" className="text-primary underline underline-offset-2 hover:text-primary/80">Image Compressor</Link> before converting if you need a smaller PDF.</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground pt-4">Going the Other Way — PDF to Image</h2>
          <p>
            Need to extract images from a PDF instead? Our{" "}
            <Link href="/pdf-to-image" className="text-primary underline underline-offset-2 hover:text-primary/80">PDF to Image</Link>
            {" "}tool converts PDF pages to individual images — also free and browser-based.
          </p>

          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-3">Convert your images to PDF — free, no upload required:</p>
            <Link href="/image-to-pdf">
              <Button className="bg-gradient-to-r from-violet-600 to-primary hover:opacity-90">
                Open Image to PDF Tool <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex items-center justify-between">
          <Link href="/blog/best-ways-to-crop-images-online" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Previous Post
          </Link>
          <Link href="/blog/what-is-image-compression" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            Next Post <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
