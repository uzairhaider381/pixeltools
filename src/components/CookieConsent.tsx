import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // small delay so it doesn't fire before first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem("cookie_consent", "dismissed");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 animate-in slide-in-from-bottom-4 duration-500"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-4xl bg-card/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-2xl shadow-primary/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 p-2.5 rounded-xl bg-primary/10 text-primary">
          <Cookie size={22} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground font-medium leading-relaxed">
            We use cookies for analytics and advertising to keep PixelTools free.
            By continuing, you agree to our{" "}
            <Link
              href="/privacy"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/privacy">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border/60 hover:bg-muted/50"
            >
              Learn More
            </Button>
          </Link>
          <Button
            size="sm"
            className="text-xs bg-gradient-to-r from-violet-600 to-primary hover:opacity-90 shadow-sm shadow-primary/20"
            onClick={accept}
          >
            Accept
          </Button>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
