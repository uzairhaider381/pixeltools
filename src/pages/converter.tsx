import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Download, RefreshCw, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";

function formatBytes(bytes: number) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function ConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0, bytes: 0, name: "" });
  const [format, setFormat] = useState("image/png");
  const [quality, setQuality] = useState(90);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const loadImage = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResultUrl(null);
    setResultBytes(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      setOriginalSize({ width: img.width, height: img.height, bytes: f.size, name: f.name });
      imgRef.current = img;
    };
    img.src = url;
  };

  const convertImage = () => {
    if (!imgRef.current || !canvasRef.current) return;
    setIsProcessing(true);

    setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = imgRef.current!.width;
      canvas.height = imgRef.current!.height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgRef.current!, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          setResultUrl(URL.createObjectURL(blob));
          setResultBytes(blob.size);
        }
        setIsProcessing(false);
      }, format, quality / 100);
    }, 100);
  };

  const download = () => {
    if (!resultUrl || !originalSize.name) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const name = originalSize.name.substring(0, originalSize.name.lastIndexOf(".")) || originalSize.name;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${name}_converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Image Converter</h1>
            <p className="text-muted-foreground">Convert images to PNG, JPG, or WebP formats locally and instantly. Your data never leaves your device.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {!originalUrl && (
                <Card className="border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-12 text-center h-[400px]"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && loadImage(e.dataTransfer.files[0]); }}
                  onDragOver={(e) => e.preventDefault()}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6"><UploadCloud size={32} /></div>
                  <h3 className="text-lg font-semibold mb-2">Drag and drop an image</h3>
                  <p className="text-sm text-muted-foreground mb-6">Supports JPG, PNG, WebP, GIF, etc.</p>
                  <Button variant="outline">Browse Files</Button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
                </Card>
              )}
              {originalUrl && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20} className="text-muted-foreground" />Original Image</h2>
                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setOriginalUrl(null); setResultUrl(null); }}>Change Image</Button>
                  </div>
                  <Card className="p-4 bg-muted/10 flex flex-col gap-4">
                    <div className="w-full h-[260px] bg-muted/30 rounded-md border flex items-center justify-center overflow-hidden">
                      <img src={originalUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground px-2">
                      <span>{originalSize.width} × {originalSize.height} px</span>
                      <span>{formatBytes(originalSize.bytes)}</span>
                    </div>
                  </Card>
                </div>
              )}
              {resultUrl && resultBytes != null && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-primary flex items-center gap-2"><Download size={20} />Converted Result</h2>
                  <Card className="p-4 border-primary/20 bg-primary/5 flex flex-col gap-4">
                    <div className="w-full h-[260px] bg-background/50 rounded-md border border-primary/10 flex items-center justify-center overflow-hidden">
                      <img src={resultUrl} alt="Converted" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-sm font-medium">{formatBytes(resultBytes)}</span>
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-semibold px-2 py-1 rounded-full">Success</span>
                    </div>
                    <Button size="lg" className="w-full font-semibold" onClick={download}>Download Converted Image</Button>
                  </Card>
                  <AdBanner slot="4455667788" format="rectangle" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!originalUrl ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold flex items-center gap-2"><Settings size={20} className="text-primary" />Convert Options</h2>
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Target Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/png">PNG (.png)</SelectItem>
                      <SelectItem value="image/jpeg">JPEG (.jpg)</SelectItem>
                      <SelectItem value="image/webp">WebP (.webp)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {format !== "image/png" && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Quality</Label>
                      <span className="text-xs font-medium">{quality}%</span>
                    </div>
                    <Slider value={[quality]} min={1} max={100} step={1} onValueChange={(v) => setQuality(v[0])} />
                  </div>
                )}
                <Button size="lg" className="w-full font-semibold mt-2" onClick={convertImage} disabled={!originalUrl || isProcessing}>
                  {isProcessing ? <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={18} />Converting...</span> : "Convert Image"}
                </Button>
              </Card>
              <AdBanner slot="4455667788" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
