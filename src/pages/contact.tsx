import React from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

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
  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/uzair-haider381/",
      icon: LinkedinIcon,
      color: "hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 hover:text-[#0077b5]",
      iconBg: "bg-[#0077b5]/10 text-[#0077b5]",
      detail: "uzair-haider381",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_uzairhaider/",
      icon: InstagramIcon,
      color: "hover:bg-[#e1306c]/10 hover:border-[#e1306c]/30 hover:text-[#e1306c]",
      iconBg: "bg-[#e1306c]/10 text-[#e1306c]",
      detail: "@_uzairhaider",
    },
    {
      name: "Email",
      href: "mailto:uzairhaider1025@gmail.com",
      icon: Mail,
      color: "hover:bg-[#ea4335]/10 hover:border-[#ea4335]/30 hover:text-[#ea4335]",
      iconBg: "bg-[#ea4335]/10 text-[#ea4335]",
      detail: "uzairhaider1025@gmail.com",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Get in Touch</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a question, feedback, or suggestion? Connect directly through any of the channels below.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Social Links */}
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

          {/* Ambient info card */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-600/5 border-primary/20 flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-primary/10 blur-xl pointer-events-none" />
            <h3 className="font-bold text-lg text-foreground">100% Client-Side Processing</h3>
            <p className="text-xs text-muted-foreground">
              Your images never leave your browser. All code execution is securely managed by sandbox scripts within this web application environment.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
