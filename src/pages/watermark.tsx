import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Download, RefreshCw, Type, AlignLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";

export default function WatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(40);
  const [rotation, setRotation] = useState(-30);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<"center" | "bottom-right" | "bottom-left" | "top-right" | "top-left" | "tile">("center");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const loadImage = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResultUrl(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      applyWatermark(img);
    };
    img.src = url;
  };

  // Re-apply watermark on setting changes
  useEffect(() => {
    if (imgRef.current) {
      applyWatermark(imgRef.current);
    }
  }, [text, fontSize, opacity, rotation, color, position]);

  const applyWatermark = (img: HTMLImageElement) => {
    if (!canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw original
    ctx.drawImage(img, 0, 0);

    // Style text
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // Setup color with opacity
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;

    // Position settings
    if (position === "tile") {
      const spacingX = fontSize * 4;
      const spacingY = fontSize * 3;
      ctx.save();
      for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
        for (let y = -canvas.height; y < canvas.height * 2; y += spacingY) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }
      ctx.restore();
    } else {
      ctx.save();
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      const offset = fontSize * 1.2;

      if (position === "top-left") {
        x = offset;
        y = offset;
        ctx.textAlign = "left";
      } else if (position === "top-right") {
        x = canvas.width - offset;
        y = offset;
        ctx.textAlign = "right";
      } else if (position === "bottom-left") {
        x = offset;
        y = canvas.height - offset;
        ctx.textAlign = "left";
      } else if (position === "bottom-right") {
        x = canvas.width - offset;
        y = canvas.height - offset;
        ctx.textAlign = "right";
      }

      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }

    setResultUrl(canvas.toDataURL(file?.type || "image/jpeg"));
    setIsProcessing(false);
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${name}_watermarked.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Watermark Adder</h1>
            <p className="text-muted-foreground">Add customized text watermarks to your images locally. Protect your work in seconds.</p>
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
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
                </Card>
              )}
              {originalUrl && resultUrl && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20} className="text-muted-foreground" />Preview</h2>
                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setOriginalUrl(null); setResultUrl(null); }}>Change Image</Button>
                  </div>
                  <Card className="p-4 bg-muted/10 flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
                    <div className="relative border bg-background rounded-md overflow-hidden max-w-full">
                      <img src={resultUrl} alt="Watermark Preview" className="max-h-[450px] object-contain" />
                    </div>
                  </Card>
                  <Button size="lg" className="w-full mt-2 font-semibold" onClick={download} disabled={isProcessing}>
                    <Download className="mr-2" size={20} /> Download Watermarked Image
                  </Button>
                  <AdBanner slot="8899001122" format="rectangle" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!originalUrl ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold flex items-center gap-2"><Type size={20} className="text-primary" />Watermark Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="watermark-text" className="text-xs text-muted-foreground">Watermark Text</Label>
                    <Input id="watermark-text" value={text} onChange={(e) => setText(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Text Color</Label>
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-9 rounded border cursor-pointer bg-transparent" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Position</Label>
                      <Select value={position} onValueChange={(val: any) => setPosition(val)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="tile">Tile Grid</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="bottom-left">Bottom Left</SelectItem>
                          <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Font Size</Label>
                      <span className="text-xs font-medium">{fontSize} px</span>
                    </div>
                    <Slider value={[fontSize]} min={12} max={120} step={1} onValueChange={(v) => setFontSize(v[0])} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Opacity</Label>
                      <span className="text-xs font-medium">{opacity}%</span>
                    </div>
                    <Slider value={[opacity]} min={1} max={100} step={1} onValueChange={(v) => setOpacity(v[0])} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Rotation Angle</Label>
                      <span className="text-xs font-medium">{rotation}°</span>
                    </div>
                    <Slider value={[rotation]} min={-180} max={180} step={5} onValueChange={(v) => setRotation(v[0])} />
                  </div>
                </div>
              </Card>
              <AdBanner slot="8899001122" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
