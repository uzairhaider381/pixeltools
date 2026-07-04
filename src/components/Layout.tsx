import { Link, useLocation } from "wouter";
import { Menu, X, Lock, Shield } from "lucide-react";
import { useState } from "react";
// import AdBanner from "./AdBanner"; // Disabled until AdSense approved

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-7 h-7 mr-2 select-none flex-shrink-0"
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
    <div className="min-h-[100dvh] flex flex-col font-sans bg-background text-foreground relative">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md shadow-[0_2px_20px_-12px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-2">
          <Link href="/" className="group flex items-center font-bold text-lg tracking-tight flex-shrink-0">
            <div className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-12">
              <LogoIcon />
            </div>
            <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">PixelTools</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>Home</Link>
            <div className="relative group">
              <span className="cursor-pointer text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                Tools <span className="text-[10px] opacity-70 group-hover:translate-y-0.5 transition-transform duration-200">▼</span>
              </span>
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-popover/95 backdrop-blur-sm text-popover-foreground border shadow-xl rounded-lg py-2 min-w-[170px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="px-4 py-2 hover:bg-muted text-sm transition-colors font-medium">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className={location === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>About</Link>
            <Link href="/contact" className={location === "/contact" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"}>Contact</Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md px-4 py-4 flex flex-col gap-1">
            <Link href="/" className="px-3 py-3 rounded-md font-medium hover:bg-muted transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <div className="pt-1 pb-1">
              <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tools</p>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-5 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors" onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/about" className="px-3 py-3 rounded-md font-medium hover:bg-muted transition-colors" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="px-3 py-3 rounded-md font-medium hover:bg-muted transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </header>

      {/* Top ad bar - disabled until AdSense approved */}

      <main className="flex-1 w-full relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none -z-10" />
        
        {/* Glow Blobs */}
        <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-glow-blob blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-15%] w-[500px] h-[500px] rounded-full bg-glow-blob blur-[100px] pointer-events-none -z-10" />
        
        {children}
      </main>

      <footer className="border-t bg-muted/20">
        <div className="container mx-auto py-10 px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <Link href="/" className="flex items-center font-bold text-lg text-primary">
              <LogoIcon />
              <span>PixelTools</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">Free, private, and fast online image tools. Processed entirely in your browser.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Tools</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Security badges */}
        <div className="w-full border-t border-border/40 bg-muted/40 py-5">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="text-primary w-3.5 h-3.5 flex-shrink-0" />
              <span>Secure Connection (SSL)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-primary w-3.5 h-3.5 flex-shrink-0" />
              <span>100% Client-Side — Zero Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>

        <div className="border-t py-5 text-center text-xs text-muted-foreground">
          © 2026 PixelTools. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
