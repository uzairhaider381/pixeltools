import { useEffect, useRef } from "react";
type AdFormat = "horizontal" | "rectangle" | "vertical" | "auto";
interface AdBannerProps {
  slot: string;
  format?: AdFormat;
  className?: string;
  label?: string;
}
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
export default function AdBanner({ slot, format = "auto", className = "", label = "Advertisement" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const formatMap: Record<AdFormat, string> = {
    horizontal: "leaderboard",
    rectangle: "rectangle",
    vertical: "vertical",
    auto: "auto",
  };
  useEffect(() => {
    if (pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense not yet loaded
    }
  }, []);
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`} data-testid={`ad-banner-${slot}`}>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 select-none">
        {label}
      </span>
      <div className="w-full overflow-hidden rounded-md border border-dashed border-border/40 bg-muted/10 flex items-center justify-center min-h-[90px]">
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={formatMap[format]}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
