import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Download, Lock, Unlock, Settings2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AdBanner from "@/components/AdBanner";
import Layout from "@/components/Layout";

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function ResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number; bytes: number }>({ width: 0, height: 0, bytes: 0 });
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [percentage, setPercentage] = useState<number>(100);
  const [format, setFormat] = useState<string>("image/jpeg");
  const [quality, setQuality] = useState<number>(90);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<{ bytes: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) loadOriginalImage(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) loadOriginalImage(e.dataTransfer.files[0]);
  };

  const loadOriginalImage = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    if (selectedFile.type === "image/png") setFormat("image/png");
    else if (selectedFile.type === "image/webp") setFormat("image/webp");
    else setFormat("image/jpeg");
    setResizedImageUrl(null); setResizedSize(null);
    const url = URL.createObjectURL(selectedFile);
    setOriginalImageUrl(url);
    const img = new Image();
    img.onload = () => {
      setOriginalSize({ width: img.width, height: img.height, bytes: selectedFile.size });
      setTargetWidth(img.width); setTargetHeight(img.height); setPercentage(100);
      originalImageRef.current = img;
    };
    img.src = url;
  };

  const updateDimension = (type: "width" | "height", value: number) => {
    if (type === "width") {
      setTargetWidth(value);
      if (lockAspectRatio && originalSize.width) setTargetHeight(Math.round(value * (originalSize.height / originalSize.width)));
      setPercentage(Math.round((value / originalSize.width) * 100));
    } else {
      setTargetHeight(value);
      if (lockAspectRatio && originalSize.height) setTargetWidth(Math.round(value * (originalSize.width / originalSize.height)));
      setPercentage(Math.round((value / originalSize.height) * 100));
    }
  };

  const updatePercentage = (pct: number) => {
    setPercentage(pct);
    if (originalSize.width && originalSize.height) {
      setTargetWidth(Math.round(originalSize.width * (pct / 100)));
      setTargetHeight(Math.round(originalSize.height * (pct / 100)));
    }
  };

  const processImage = () => {
    if (!originalImageRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = targetWidth; canvas.height = targetHeight;
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(originalImageRef.current!, 0, 0, targetWidth, targetHeight);
      canvas.toBlob((blob) => {
        if (blob) { setResizedImageUrl(URL.createObjectURL(blob)); setResizedSize({ bytes: blob.size }); }
        setIsProcessing(false);
      }, format, quality / 100);
    }, 50);
  };

  const downloadImage = () => {
    if (!resizedImageUrl || !file) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const a = document.createElement("a");
    a.href = resizedImageUrl; a.download = `${name}_resized.${ext}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Free Image Resizer</h1>
            <p className="text-muted-foreground">Resize JPG, PNG, WebP, and GIF images online — fast, private, and free. No uploads to any server.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {!originalImageUrl && (
                <Card className="border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center p-12 text-center h-[400px]"
                  onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6"><UploadCloud size={32} /></div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Drag and drop an image</h3>
                  <p className="text-sm text-muted-foreground mb-6">Supports JPG, PNG, WebP, GIF</p>
                  <Button variant="outline">Browse Files</Button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" />
                </Card>
              )}
              {originalImageUrl && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20} className="text-muted-foreground" />Original Image</h2>
                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setOriginalImageUrl(null); }}>Change Image</Button>
                  </div>
                  <Card className="p-4 bg-muted/10 overflow-hidden flex flex-col gap-4">
                    <div className="relative w-full h-[300px] bg-muted/30 rounded-md border border-border flex items-center justify-center overflow-hidden">
                      <img src={originalImageUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                      <span>{originalSize.width} × {originalSize.height} px</span>
                      <span>{formatBytes(originalSize.bytes)}</span>
                    </div>
                  </Card>
                </div>
              )}
              {resizedImageUrl && (
                <div className="flex flex-col gap-4 mt-2">
                  <h2 className="text-lg font-semibold text-primary flex items-center gap-2"><Download size={20} />Resized Result</h2>
                  <Card className="p-4 border-primary/20 bg-primary/5 overflow-hidden flex flex-col gap-4">
                    <div className="relative w-full h-[300px] bg-background/50 rounded-md border border-primary/10 flex items-center justify-center overflow-hidden">
                      <img src={resizedImageUrl} alt="Resized" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex items-center justify-between text-sm px-2">
                      <span className="font-medium text-foreground">{targetWidth} × {targetHeight} px</span>
                      <span className="font-medium text-primary">{resizedSize && formatBytes(resizedSize.bytes)}</span>
                    </div>
                    <Button size="lg" className="w-full mt-2 font-semibold" onClick={downloadImage}>Download Image</Button>
                  </Card>
                  <AdBanner slot="0987654321" format="rectangle" className="mt-2" />
                </div>
              )}
              <div className="mt-8 space-y-4 border-t pt-8">
                <h2 className="text-xl font-bold">About Image Resizer</h2>
                <div className="text-muted-foreground text-sm space-y-4 leading-relaxed">
                  <p>Resizing images sounds simple until you actually need to do it right. You've got a photo that's 4000 pixels wide, your website only needs 800, and suddenly you're downloading some sketchy app or wrestling with Photoshop just to scale one image down. That's what this tool is for.</p>
                  <p>Drop your image in, type the dimensions you want, and you're done. If you want to keep the proportions intact — which you almost always do — just lock the aspect ratio and it'll figure out the other dimension for you. Or if you'd rather think in percentages, drag the slider to 50% and get half the size without doing any math.</p>
                  <p>It works with PNG, JPG, and WebP. The output quality is good. No weird compression artifacts, no colour shifts. What goes in comes out the same, just smaller (or bigger if you need that).</p>
                  <p>One thing worth knowing: this runs entirely in your browser. Nothing gets sent anywhere. You could do this on a plane with no wifi and it'd work the same. The file never leaves your device, which matters more than people realise when you're working with personal photos or client work.</p>
                  <p>Photographers use this before emailing previews. Developers use it to prep assets before pushing to production. Designers use it to test how something looks at different sizes. It's not complicated, it's just useful — and it's free.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!originalImageUrl ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="flex items-center gap-2 mb-2"><Settings2 size={20} className="text-primary" /><h2 className="text-lg font-semibold">Resize Settings</h2></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Dimensions</Label>
                    <div className="flex items-center gap-2">
                      <Switch id="lock-aspect" checked={lockAspectRatio} onCheckedChange={setLockAspectRatio} />
                      <Label htmlFor="lock-aspect" className="text-xs cursor-pointer flex items-center gap-1">
                        {lockAspectRatio ? <Lock size={14} className="text-primary" /> : <Unlock size={14} className="text-muted-foreground" />} Lock Aspect Ratio
                      </Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                    <div className="space-y-1.5">
                      <Label htmlFor="width" className="text-xs text-muted-foreground">Width (px)</Label>
                      <Input id="width" type="number" value={targetWidth || ""} onChange={(e) => updateDimension("width", parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="text-muted-foreground mt-6">×</div>
                    <div className="space-y-1.5">
                      <Label htmlFor="height" className="text-xs text-muted-foreground">Height (px)</Label>
                      <Input id="height" type="number" value={targetHeight || ""} onChange={(e) => updateDimension("height", parseInt(e.target.value) || 0)} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Scale Percentage</Label>
                      <span className="text-xs font-medium">{percentage}%</span>
                    </div>
                    <Slider value={[percentage]} min={1} max={200} step={1} onValueChange={(vals) => updatePercentage(vals[0])} />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger><SelectValue placeholder="Select format" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/jpeg">JPEG (.jpg)</SelectItem>
                      <SelectItem value="image/png">PNG (.png)</SelectItem>
                      <SelectItem value="image/webp">WebP (.webp)</SelectItem>
                    </SelectContent>
                  </Select>
                  {(format === "image/jpeg" || format === "image/webp") && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-muted-foreground">Quality</Label>
                        <span className="text-xs font-medium">{quality}%</span>
                      </div>
                      <Slider value={[quality]} min={1} max={100} step={1} onValueChange={(vals) => setQuality(vals[0])} />
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <Button size="lg" className="w-full font-semibold" onClick={processImage} disabled={!originalImageUrl || isProcessing || targetWidth <= 0 || targetHeight <= 0}>
                    {isProcessing ? <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={18} /> Processing...</span> : "Resize Image"}
                  </Button>
                </div>
              </Card>
              <AdBanner slot="1122334455" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
