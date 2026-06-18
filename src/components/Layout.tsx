import { Link, useLocation } from "wouter";
import { Menu, X, Lock, Shield } from "lucide-react";
import { useState } from "react";
import AdBanner from "./AdBanner";

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-7 h-7 mr-2 select-none"
  >
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#logoGrad)" />
    <circle cx="50" cy="50" r="22" fill="none" stroke="#ffffff" strokeWidth="5" />
    <rect x="42" y="42" width="16" height="16" rx="3" fill="#ffffff" />
    <circle cx="34" cy="34" r="5" fill="#ffffff" opacity="0.8" />
    <circle cx="66" cy="66" r="5" fill="#ffffff" opacity="0.8" />
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const navLinks = [
    { href: "/resize", label: "Resize" },
    { href: "/compress", label: "Compress" },
    { href: "/crop", label: "Crop" },
    { href: "/convert", label: "Convert" },
    { href: "/remove-background", label: "Remove BG" },
    { href: "/image-to-pdf", label: "To PDF" },
    { href: "/pdf-to-image", label: "To Image" },
    { href: "/watermark", label: "Watermark" },
  ];
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans bg-background text-foreground">
      <div className="w-full bg-muted/20 border-b flex justify-center py-2 px-4">
        <div className="w-full max-w-5xl">
          <AdBanner slot="9988776655" format="horizontal" />
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center font-bold text-xl tracking-tight text-primary">
            <LogoIcon />
            <span>PixelTools</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}>Home</Link>
            <div className="relative group">
              <span className="cursor-pointer text-muted-foreground hover:text-primary">Tools</span>
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-popover text-popover-foreground border shadow-md rounded-md py-2 min-w-[150px]">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="px-4 py-2 hover:bg-muted text-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className={location === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary"}>About</Link>
            <Link href="/contact" className={location === "/contact" ? "text-primary" : "text-muted-foreground hover:text-primary"}>Contact</Link>
          </nav>
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden border-b bg-background px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-foreground font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted-foreground pl-4" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/about" className="text-foreground font-medium" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="text-foreground font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </header>
      <main className="flex-1 w-full">
        {children}
      </main>
      <footer className="border-t bg-muted/20">
        <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center font-bold text-xl text-primary">
              <LogoIcon />
              <span>PixelTools</span>
            </Link>
            <p className="text-sm text-muted-foreground">Free, private, and fast online image tools. Processed entirely in your browser.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-primary">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Security badges & connection info */}
        <div className="w-full border-t border-border/40 bg-muted/40 py-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="text-primary w-4 h-4" />
              <span>Secure Connection (SSL Enforced)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-primary w-4 h-4" />
              <span>100% Client-Side Processing (Zero Server Uploads)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>All Systems Secure & Operational</span>
            </div>
          </div>
        </div>

        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          © 2026 PixelTools. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
