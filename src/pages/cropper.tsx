import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Download, RefreshCw, Crop, ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";

function formatBytes(bytes: number) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type DragType = "move" | "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w" | null;

export default function CropperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0, bytes: 0 });
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBytes, setResultBytes] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayImgRef = useRef<HTMLImageElement>(null);

  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });

  const dragState = useRef<{
    type: DragType;
    startX: number;
    startY: number;
    startCrop: CropRect;
  }>({ type: null, startX: 0, startY: 0, startCrop: { x: 0, y: 0, w: 0, h: 0 } });

  const loadImage = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResultUrl(null);
    setResultBytes(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      setImgNatural({ w: img.naturalWidth, h: img.naturalHeight, bytes: f.size });
      // Wait for DOM layout to get display size
      setTimeout(() => {
        if (displayImgRef.current) {
          const w = displayImgRef.current.clientWidth;
          const h = displayImgRef.current.clientHeight;
          setDisplaySize({ w, h });
          setCrop({
            x: Math.round(w * 0.1),
            y: Math.round(h * 0.1),
            w: Math.round(w * 0.8),
            h: Math.round(h * 0.8),
          });
        }
      }, 200);
    };
    img.src = url;
  };

  const handleMouseDown = (e: React.MouseEvent, type: DragType) => {
    e.preventDefault();
    if (!displaySize.w) return;
    dragState.current = {
      type,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { ...crop },
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { type, startX, startY, startCrop } = dragState.current;
    if (!type) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newCrop = { ...startCrop };

    if (type === "move") {
      newCrop.x = Math.max(0, Math.min(displaySize.w - startCrop.w, startCrop.x + dx));
      newCrop.y = Math.max(0, Math.min(displaySize.h - startCrop.h, startCrop.y + dy));
    } else {
      if (type.includes("w")) {
        const potentialWidth = startCrop.w - dx;
        if (potentialWidth > 30) {
          const newX = startCrop.x + dx;
          if (newX >= 0) {
            newCrop.x = newX;
            newCrop.w = potentialWidth;
          }
        }
      }
      if (type.includes("e")) {
        newCrop.w = Math.max(30, Math.min(displaySize.w - startCrop.x, startCrop.w + dx));
      }
      if (type.includes("n")) {
        const potentialHeight = startCrop.h - dy;
        if (potentialHeight > 30) {
          const newY = startCrop.y + dy;
          if (newY >= 0) {
            newCrop.y = newY;
            newCrop.h = potentialHeight;
          }
        }
      }
      if (type.includes("s")) {
        newCrop.h = Math.max(30, Math.min(displaySize.h - startCrop.y, startCrop.h + dy));
      }
    }
    setCrop(newCrop);
  };

  const handleMouseUp = () => {
    dragState.current.type = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleCrop = () => {
    if (!file || !displayImgRef.current || !canvasRef.current) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const scaleX = img.naturalWidth / displaySize.w;
      const scaleY = img.naturalHeight / displaySize.h;

      const sx = crop.x * scaleX;
      const sy = crop.y * scaleY;
      const sw = crop.w * scaleX;
      const sh = crop.h * scaleY;

      const canvas = canvasRef.current!;
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        canvas.toBlob((blob) => {
          if (blob) {
            setResultUrl(URL.createObjectURL(blob));
            setResultBytes(blob.size);
          }
          setIsProcessing(false);
        }, file.type);
      } else {
        setIsProcessing(false);
      }
    };
    img.src = originalUrl!;
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const name = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${name}_cropped.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8">
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Image Cropper</h1>
            <p className="text-muted-foreground">Crop JPG, PNG, and WebP images online. Drag and resize the crop box to define the area.</p>
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
                  <Card className="p-4 bg-muted/10 flex flex-col items-center justify-center overflow-hidden">
                    <div className="relative border select-none max-w-full bg-muted/30 rounded-md overflow-hidden">
                      <img
                        ref={displayImgRef}
                        src={originalUrl}
                        alt="Original for crop"
                        className="max-h-[450px] object-contain pointer-events-none"
                      />
                      {displaySize.w > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            left: `${crop.x}px`,
                            top: `${crop.y}px`,
                            width: `${crop.w}px`,
                            height: `${crop.h}px`,
                            border: "2px solid hsl(var(--primary))",
                            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                            cursor: "move",
                          }}
                          onMouseDown={(e) => handleMouseDown(e, "move")}
                        >
                          {/* Handles */}
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "nw"); }}
                            style={{ position: "absolute", left: "-5px", top: "-5px", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "nwse-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "ne"); }}
                            style={{ position: "absolute", right: "-5px", top: "-5px", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "nesw-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "sw"); }}
                            style={{ position: "absolute", left: "-5px", bottom: "-5px", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "nesw-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "se"); }}
                            style={{ position: "absolute", right: "-5px", bottom: "-5px", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "nwse-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "n"); }}
                            style={{ position: "absolute", left: "50%", top: "-5px", transform: "translateX(-50%)", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "ns-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "s"); }}
                            style={{ position: "absolute", left: "50%", bottom: "-5px", transform: "translateX(-50%)", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "ns-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "w"); }}
                            style={{ position: "absolute", left: "-5px", top: "50%", transform: "translateY(-50%)", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "ew-resize" }}
                          />
                          <div
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e, "e"); }}
                            style={{ position: "absolute", right: "-5px", top: "50%", transform: "translateY(-50%)", width: "10px", height: "10px", backgroundColor: "white", border: "1.5px solid hsl(var(--primary))", cursor: "ew-resize" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between w-full mt-4 text-sm text-muted-foreground px-2">
                      <span>{imgNatural.w} × {imgNatural.h} px</span>
                      <span>{formatBytes(imgNatural.bytes)}</span>
                    </div>
                  </Card>
                </div>
              )}
              {resultUrl && resultBytes != null && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-primary flex items-center gap-2"><Download size={20} />Cropped Result</h2>
                  <Card className="p-4 border-primary/20 bg-primary/5 flex flex-col gap-4">
                    <div className="w-full h-[260px] bg-background/50 rounded-md border border-primary/10 flex items-center justify-center overflow-hidden">
                      <img src={resultUrl} alt="Cropped" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-sm font-medium">{formatBytes(resultBytes)}</span>
                    </div>
                    <Button size="lg" className="w-full font-semibold" onClick={download}>Download Cropped Image</Button>
                  </Card>
                  <AdBanner slot="3344556677" format="rectangle" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <Card className={`p-6 flex flex-col gap-6 ${!originalUrl ? "opacity-50 pointer-events-none" : ""}`}>
                <h2 className="text-lg font-semibold flex items-center gap-2"><Crop size={20} className="text-primary" />Crop Controls</h2>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Selection X:</span><span className="font-medium">{crop.x} px</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Selection Y:</span><span className="font-medium">{crop.y} px</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Selection Width:</span><span className="font-medium">{crop.w} px</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Selection Height:</span><span className="font-medium">{crop.h} px</span></div>
                </div>
                <Button size="lg" className="w-full font-semibold mt-2" onClick={handleCrop} disabled={!originalUrl || isProcessing}>
                  {isProcessing ? <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={18} />Cropping...</span> : "Apply Crop"}
                </Button>
              </Card>
              <AdBanner slot="3344556677" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </Layout>
  );
}
