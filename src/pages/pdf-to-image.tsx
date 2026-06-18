import { useState, useRef } from "react";
import { UploadCloud, FileText, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";
import * as pdfjsLib from "pdfjs-dist";

// Configure worker using unpkg CDN matching local package version
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageImageUrl, setPageImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadPdf = (f: File) => {
    if (f.type !== "application/pdf") return;
    setFile(f);
    setPdfDoc(null);
    setNumPages(0);
    setCurrentPage(1);
    setPageImageUrl(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        renderPage(pdf, 1);
      } catch (err) {
        console.error("Error parsing PDF: ", err);
        alert("Could not load PDF. Please make sure it is valid.");
        setIsProcessing(false);
      }
    };
    reader.readAsArrayBuffer(f);
  };

  const renderPage = async (pdf: any, pageNum: number) => {
    setIsProcessing(true);
    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 }); // 2.0 for higher quality/retina rendering
      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      const url = canvas.toDataURL("image/png");
      setPageImageUrl(url);
    } catch (err) {
      console.error("Error rendering PDF page: ", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (!pdfDoc) return;
    let newPage = currentPage;
    if (direction === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else if (direction === "next" && currentPage < numPages) {
      newPage = currentPage + 1;
    }
    setCurrentPage(newPage);
    renderPage(pdfDoc, newPage);
  };

  const downloadImage = () => {
    if (!pageImageUrl || !file) return;
    const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const a = document.createElement("a");
    a.href = pageImageUrl;
    a.download = `${name}_page_${currentPage}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">PDF to Image</h1>
            <p className="text-muted-foreground">Convert PDF document pages into high-quality downloadable PNG images entirely within your browser.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {!file && (
                <Card className="border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-12 text-center h-[350px]"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && loadPdf(e.dataTransfer.files[0]); }}
                  onDragOver={(e) => e.preventDefault()}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6"><UploadCloud size={32} /></div>
                  <h3 className="text-lg font-semibold mb-2">Drag and drop a PDF file</h3>
                  <p className="text-sm text-muted-foreground mb-6">Process pages in high-resolution locally</p>
                  <Button variant="outline">Browse Files</Button>
                  <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && loadPdf(e.target.files[0])} />
                </Card>
              )}
              {file && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><FileText size={20} className="text-muted-foreground" />PDF Preview</h2>
                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPdfDoc(null); setPageImageUrl(null); }}>Close PDF</Button>
                  </div>
                  <Card className="p-4 bg-muted/10 flex flex-col items-center justify-center gap-4 relative min-h-[300px]">
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10 rounded-lg">
                        <RefreshCw className="animate-spin text-primary" size={32} />
                      </div>
                    )}
                    {pageImageUrl && (
                      <div className="max-w-full rounded border shadow-sm bg-background p-2 overflow-auto max-h-[500px]">
                        <img src={pageImageUrl} alt={`PDF Page ${currentPage}`} className="max-h-[450px] object-contain" />
                      </div>
                    )}
                    {numPages > 1 && (
                      <div className="flex items-center gap-4 mt-2">
                        <Button variant="outline" size="sm" onClick={() => handlePageChange("prev")} disabled={currentPage === 1 || isProcessing}>
                          <ChevronLeft size={16} /> Previous
                        </Button>
                        <span className="text-sm font-medium">Page {currentPage} of {numPages}</span>
                        <Button variant="outline" size="sm" onClick={() => handlePageChange("next")} disabled={currentPage === numPages || isProcessing}>
                          Next <ChevronRight size={16} />
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!file ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold">Image Download</h2>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">PDF Name:</span><span className="font-medium truncate max-w-[150px]">{file?.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Pages:</span><span className="font-medium">{numPages}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Current Page:</span><span className="font-medium">{currentPage}</span></div>
                </div>
                <Button size="lg" className="w-full font-semibold mt-2" onClick={downloadImage} disabled={!pageImageUrl || isProcessing}>
                  <Download className="mr-2" size={18} /> Download Page {currentPage}
                </Button>
              </Card>
              <AdBanner slot="7788990011" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
