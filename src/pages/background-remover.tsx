import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Download, RefreshCw, Eraser, Trash2, Brush, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";

export default function BackgroundRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"key" | "erase">("key");
  const [tolerance, setTolerance] = useState(30);
  const [brushSize, setBrushSize] = useState(25);
  const [keyColor, setKeyColor] = useState<{ r: number; g: number; b: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const loadImage = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setHasProcessed(false);
    setKeyColor(null);
    setProcessedUrl(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const displayCanvas = displayCanvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      displayCanvas.width = img.width;
      displayCanvas.height = img.height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const dCtx = displayCanvas.getContext("2d")!;
      dCtx.drawImage(img, 0, 0);
    };
    img.src = url;
  };

  // Run the color-keying transparency calculation
  const applyColorKey = (r: number, g: number, b: number) => {
    if (!canvasRef.current || !displayCanvasRef.current) return;
    setIsProcessing(true);

    setTimeout(() => {
      const canvas = canvasRef.current!;
      const displayCanvas = displayCanvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const dCtx = displayCanvas.getContext("2d")!;

      const width = canvas.width;
      const height = canvas.height;

      // Reset display canvas with original image
      dCtx.clearRect(0, 0, width, height);
      dCtx.drawImage(canvas, 0, 0);

      const imgData = dCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const pr = data[i];
        const pg = data[i + 1];
        const pb = data[i + 2];

        // Euclidean distance in RGB color space
        const diff = Math.sqrt((pr - r) ** 2 + (pg - g) ** 2 + (pb - b) ** 2);
        if (diff < tolerance * 2.5) {
          data[i + 3] = 0; // Set transparent
        }
      }

      dCtx.putImageData(imgData, 0, 0);
      setHasProcessed(true);
      setIsProcessing(false);
    }, 50);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== "key" || !displayCanvasRef.current) return;
    const canvas = displayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Calculate scaling since visual display might be smaller than actual canvas
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const ctx = canvas.getContext("2d")!;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = { r: pixel[0], g: pixel[1], b: pixel[2] };
    setKeyColor(color);
    applyColorKey(color.r, color.g, color.b);
  };

  // Erase drawing handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== "erase" || !displayCanvasRef.current) return;
    drawingRef.current = true;
    draw(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || mode !== "erase") return;
    draw(e);
  };

  const handleMouseUp = () => {
    drawingRef.current = false;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = displayCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize * (canvas.width / rect.width), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    setHasProcessed(true);
  };

  const download = () => {
    if (!displayCanvasRef.current || !file) return;
    const canvas = displayCanvasRef.current;
    const url = canvas.toDataURL("image/png");
    const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_removed_background.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (!canvasRef.current || !displayCanvasRef.current) return;
    const canvas = canvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    const dCtx = displayCanvas.getContext("2d")!;
    dCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    dCtx.drawImage(canvas, 0, 0);
    setKeyColor(null);
    setHasProcessed(false);
  };

  return (
    <Layout>
      <div className="p-4 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Background Remover</h1>
            <p className="text-muted-foreground">Remove background from your images directly in your browser. Totally offline, private, and fast.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {!originalUrl && (
                <Card className="border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-6 md:p-12 text-center min-h-[240px] md:h-[360px]"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && loadImage(e.dataTransfer.files[0]); }}
                  onDragOver={(e) => e.preventDefault()}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6"><UploadCloud size={32} /></div>
                  <div className="text-lg font-semibold mb-2">Drag and drop an image</div>
                  <p className="text-sm text-muted-foreground mb-6">Supports JPG, PNG, WebP</p>
                  <Button variant="outline">Browse Files</Button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadImage(e.target.files[0])} />
                </Card>
              )}
              {originalUrl && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon size={20} className="text-muted-foreground" />Editor</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={reset}><Trash2 size={16} /> Reset</Button>
                      <Button variant="ghost" size="sm" onClick={() => { setFile(null); setOriginalUrl(null); }}>Change Image</Button>
                    </div>
                  </div>
                  <Card className="p-4 bg-muted/10 flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
                    <div
                      className="relative border bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGlucyB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlZWUiLz48aW5zIHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWVlIi8+PC9zdmc+')] bg-repeat rounded-md overflow-hidden max-w-full"
                    >
                      <canvas
                        ref={displayCanvasRef}
                        onClick={handleCanvasClick}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className={`max-h-[450px] max-w-full object-contain cursor-crosshair`}
                      />
                    </div>
                    {mode === "key" && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">Click on the image color you want to key out/remove.</p>
                    )}
                    {mode === "erase" && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">Click and drag over the image to erase areas manually.</p>
                    )}
                  </Card>
                  {hasProcessed && (
                    <Button size="lg" className="w-full mt-2 font-semibold" onClick={download}><Download className="mr-2" size={20} /> Download PNG (Transparent)</Button>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!originalUrl ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold flex items-center gap-2">Remover Settings</h2>
                <div className="flex gap-2">
                  <Button
                    variant={mode === "key" ? "default" : "outline"}
                    className="flex-1 flex items-center gap-1.5"
                    onClick={() => setMode("key")}
                  >
                    <Target size={16} /> Color Key
                  </Button>
                  <Button
                    variant={mode === "erase" ? "default" : "outline"}
                    className="flex-1 flex items-center gap-1.5"
                    onClick={() => setMode("erase")}
                  >
                    <Eraser size={16} /> Manual Brush
                  </Button>
                </div>
                {mode === "key" && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Tolerance Threshold</Label>
                      <span className="text-xs font-medium">{tolerance}</span>
                    </div>
                    <Slider value={[tolerance]} min={1} max={100} step={1} onValueChange={(v) => setTolerance(v[0])} />
                    {keyColor && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Selected color:</span>
                        <div
                          className="w-4 h-4 rounded-sm border border-black/20"
                          style={{ backgroundColor: `rgb(${keyColor.r}, ${keyColor.g}, ${keyColor.b})` }}
                        />
                        <span className="text-xs font-mono">rgb({keyColor.r},{keyColor.g},{keyColor.b})</span>
                      </div>
                    )}
                  </div>
                )}
                {mode === "erase" && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Brush Size</Label>
                      <span className="text-xs font-medium">{brushSize} px</span>
                    </div>
                    <Slider value={[brushSize]} min={5} max={100} step={1} onValueChange={(v) => setBrushSize(v[0])} />
                  </div>
                )}
              </Card>
              <AdBanner slot="5566778899" format="rectangle" />
            </div>
          </div>
          <div className="mt-8 space-y-4 border-t pt-8">
            <h2 className="text-xl font-bold">About Background Remover</h2>
            <div className="text-muted-foreground text-sm space-y-4 leading-relaxed">
              <p>Removing a background is genuinely one of the more annoying tasks in image editing. The good tools cost money, the free ones either have limits or watermarks, and most of them send your images to a server somewhere. This one doesn't.</p>
              <p>There are two ways to use it. The colour key method works best when the background is a single colour — a white studio backdrop, a green screen, a solid-coloured wall. Click the eye-dropper, tap the background colour on the image, and it becomes transparent. There's a tolerance slider so you can widen or narrow the selection to catch edge pixels or avoid pulling in parts of the subject you want to keep.</p>
              <p>The manual eraser works when the background is complicated. It's a brush you paint directly on the image. Adjust the brush size, zoom in if you need precision, and erase what you don't want. It's slower but gives you full control.</p>
              <p>For images with clean, simple backgrounds the colour key approach is fast. Twenty seconds and you're done. For more complex backgrounds it takes a bit more work, but you can get good results without any subscription or account.</p>
              <p>The output is a PNG with a transparent background — the right format for placing the subject onto something else, whether that's a different background, a design, a presentation slide, or a product listing. Everything processes in your browser. The image stays on your device.</p>
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
