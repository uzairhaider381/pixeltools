import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";

// Inline SVG components to ensure compatibility regardless of local lucide-react package version
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && msg) {
      setSubmitted(true);
    }
  };

  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/uzair-haider381/",
      icon: LinkedinIcon,
      color: "hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 hover:text-[#0077b5]",
      iconBg: "bg-[#0077b5]/10 text-[#0077b5]",
      detail: "uzair-haider381"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_uzairhaider/",
      icon: InstagramIcon,
      color: "hover:bg-[#e1306c]/10 hover:border-[#e1306c]/30 hover:text-[#e1306c]",
      iconBg: "bg-[#e1306c]/10 text-[#e1306c]",
      detail: "@_uzairhaider"
    },
    {
      name: "Email",
      href: "mailto:uzairhaider1025@gmail.com",
      icon: Mail,
      color: "hover:bg-[#ea4335]/10 hover:border-[#ea4335]/30 hover:text-[#ea4335]",
      iconBg: "bg-[#ea4335]/10 text-[#ea4335]",
      detail: "uzairhaider1025@gmail.com"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Get in Touch</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a question, feedback, or suggestion? Reach out through the form or connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Contact Info / Socials */}
          <div className="flex flex-col gap-4 justify-between h-full">
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Connect Directly</h2>
              <div className="flex flex-col gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-4 border rounded-xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                    >
                      <div className={`p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 ${social.iconBg}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{social.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{social.detail}</p>
                      </div>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                        Connect →
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Ambient visual card */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-600/5 border-primary/20 flex flex-col gap-2 relative overflow-hidden mt-6 md:mt-0">
              <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-primary/10 blur-xl pointer-events-none" />
              <h3 className="font-bold text-lg text-foreground">100% Client-Side Processing</h3>
              <p className="text-xs text-muted-foreground">
                Your images never leave your browser. All code execution is securely managed by sandbox scripts within this web application environment.
              </p>
            </Card>
          </div>

          {/* Right: Contact Form */}
          <Card className="p-6 flex flex-col justify-between">
            {submitted ? (
              <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 animate-bounce">
                  <Send size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thank you for reaching out. We will read your message and reply as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Send a Message</h2>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hello@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Type your feedback, feature request, or general query here..."
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full font-semibold mt-4 py-6 text-base">
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
