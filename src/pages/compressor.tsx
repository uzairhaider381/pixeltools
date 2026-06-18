import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Download, RefreshCw } from "lucide-react";
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

export default function CompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number; bytes: number }>({ width: 0, height: 0, bytes: 0 });
  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState("image/jpeg");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const loadImage = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    if (f.type === "image/png") setFormat("image/png");
    else if (f.type === "image/webp") setFormat("image/webp");
    else setFormat("image/jpeg");
    setResultUrl(null); setResultBytes(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);
    const img = new Image();
    img.onload = () => { setOriginalSize({ width: img.width, height: img.height, bytes: f.size }); imgRef.current = img; };
    img.src = url;
  };

  const compress = () => {
    if (!imgRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = imgRef.current!.width; canvas.height = imgRef.current!.height;
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgRef.current!, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) { setResultUrl(URL.createObjectURL(blob)); setResultBytes(blob.size); }
        setIsProcessing(false);
      }, format, quality / 100);
    }, 50);
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const a = document.createElement("a");
    a.href = resultUrl; a.download = `${name}_compressed.${ext}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const saved = resultBytes != null ? Math.max(0, Math.round((1 - resultBytes / originalSize.bytes) * 100)) : null;

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Image Compressor</h1>
            <p className="text-muted-foreground">Reduce image file size without losing quality. Adjust quality and format to get the best result.</p>
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
                  <p className="text-sm text-muted-foreground mb-6">Supports JPG, PNG, WebP</p>
                  <Button variant="outline">Browse Files</Button>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
                </Card>
              )}
              {originalUrl && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20} className="text-muted-foreground" />Original</h2>
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
                  <h2 className="text-lg font-semibold text-primary flex items-center gap-2"><Download size={20} />Compressed Result</h2>
                  <Card className="p-4 border-primary/20 bg-primary/5 flex flex-col gap-4">
                    <div className="w-full h-[260px] bg-background/50 rounded-md border border-primary/10 flex items-center justify-center overflow-hidden">
                      <img src={resultUrl} alt="Compressed" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-sm font-medium">{formatBytes(resultBytes)}</span>
                      {saved != null && saved > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-semibold px-2 py-1 rounded-full">{saved}% smaller</span>
                      )}
                    </div>
                    <Button size="lg" className="w-full font-semibold" onClick={download}>Download Compressed Image</Button>
                  </Card>
                  <AdBanner slot="2233445566" format="rectangle" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!originalUrl ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold">Compression Settings</h2>
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/jpeg">JPEG (.jpg)</SelectItem>
                      <SelectItem value="image/png">PNG (.png)</SelectItem>
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
                    <p className="text-xs text-muted-foreground">Lower quality = smaller file size. 70–85% is a good balance.</p>
                  </div>
                )}
                <Button size="lg" className="w-full font-semibold mt-2" onClick={compress} disabled={!originalUrl || isProcessing}>
                  {isProcessing ? <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={18} />Processing...</span> : "Compress Image"}
                </Button>
              </Card>
              <AdBanner slot="2233445566" format="rectangle" />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <h2 className="text-xl font-semibold">When should you compress images?</h2>
            <p className="text-sm text-muted-foreground">Compressing images reduces file size, which speeds up websites, reduces storage usage, and makes sharing easier. JPEG and WebP formats offer lossy compression (smaller files, slight quality loss), while PNG offers lossless compression (larger files, no quality loss).</p>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
