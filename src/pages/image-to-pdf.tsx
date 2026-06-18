import { useState, useRef } from "react";
import { UploadCloud, FileText, Download, RefreshCw, X, ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";
import { jsPDF } from "jspdf";

interface ImageFile {
  id: string;
  file: File;
  url: string;
}

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "fit">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState<"none" | "small" | "normal">("none");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      const newImages = filesArr
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          url: URL.createObjectURL(file),
        }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === images.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF({
        orientation: orientation,
        unit: "pt", // points
        format: pageSize === "fit" ? "a4" : pageSize,
      });

      for (let i = 0; i < images.length; i++) {
        const imgObj = images[i];

        // Load image to get its natural dimensions
        const img: HTMLImageElement = await new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = imgObj.url;
        });

        // PDF dimensions
        let pdfWidth = doc.internal.pageSize.getWidth();
        let pdfHeight = doc.internal.pageSize.getHeight();

        if (pageSize === "fit") {
          // Adjust page size to fit the image dimensions exactly
          doc.addPage([img.naturalWidth, img.naturalHeight], orientation);
          pdfWidth = img.naturalWidth;
          pdfHeight = img.naturalHeight;
        } else {
          if (i > 0) {
            doc.addPage(pageSize, orientation);
          }
        }

        // Apply margins
        let m = 0;
        if (margin === "small") m = 15;
        if (margin === "normal") m = 30;

        const usableWidth = pdfWidth - 2 * m;
        const usableHeight = pdfHeight - 2 * m;

        // Calculate aspect ratio fit inside page
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const pageRatio = usableWidth / usableHeight;

        let w = usableWidth;
        let h = usableHeight;
        let x = m;
        let y = m;

        if (imgRatio > pageRatio) {
          h = usableWidth / imgRatio;
          y = m + (usableHeight - h) / 2;
        } else {
          w = usableHeight * imgRatio;
          x = m + (usableWidth - w) / 2;
        }

        // Add image to page
        doc.addImage(img, "JPEG", x, y, w, h);
      }

      // If we used a template format, we need to delete the initial blank page created by constructor if pageSize is fit
      if (pageSize === "fit") {
        doc.deletePage(1); // delete first page
      }

      doc.save("PixelTools_images.pdf");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Image to PDF</h1>
            <p className="text-muted-foreground">Convert images to a PDF file in the browser. Arrange pages, set margin size, orientation, and format.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 text-center"
                onClick={() => fileInputRef.current?.click()}>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4"><UploadCloud size={24} /></div>
                <h3 className="text-md font-semibold mb-1">Upload images to convert</h3>
                <p className="text-xs text-muted-foreground mb-4">Supports JPG, PNG, WebP</p>
                <Button variant="outline" size="sm">Select Images</Button>
                <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              </Card>

              {images.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><FileText size={20} className="text-muted-foreground" /> Selected Images ({images.length})</h2>
                  <div className="flex flex-col gap-3">
                    {images.map((img, index) => (
                      <Card key={img.id} className="p-3 flex items-center gap-4 bg-muted/10 relative group">
                        <div className="w-16 h-16 bg-muted/30 rounded border flex items-center justify-center overflow-hidden shrink-0">
                          <img src={img.url} alt="thumbnail" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-foreground">{img.file.name}</p>
                          <p className="text-xs text-muted-foreground">{index + 1}. Page</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveImage(index, "up")} disabled={index === 0}>
                            <ArrowUp size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveImage(index, "down")} disabled={index === images.length - 1}>
                            <ArrowDown size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeImage(img.id)}>
                            <X size={16} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${images.length === 0 ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold">PDF Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Page Size</Label>
                    <Select value={pageSize} onValueChange={(val: any) => setPageSize(val)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4 (Standard)</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="fit">Fit Image Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {pageSize !== "fit" && (
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Page Orientation</Label>
                      <Select value={orientation} onValueChange={(val: any) => setOrientation(val)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portrait">Portrait</SelectItem>
                          <SelectItem value="landscape">Landscape</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Page Margins</Label>
                    <Select value={margin} onValueChange={(val: any) => setMargin(val)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Margin</SelectItem>
                        <SelectItem value="small">Small Margin</SelectItem>
                        <SelectItem value="normal">Normal Margin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button size="lg" className="w-full font-semibold mt-2" onClick={generatePdf} disabled={images.length === 0 || isProcessing}>
                  {isProcessing ? <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={18} />Generating PDF...</span> : "Generate PDF"}
                </Button>
              </Card>
              <AdBanner slot="6677889900" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
