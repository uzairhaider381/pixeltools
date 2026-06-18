import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">About PixelTools</h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of browser-based image utilities built for speed, utility, and absolute privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-12">
          <Card className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit"><Shield size={24} /></div>
            <h3 className="text-xl font-bold">100% Private</h3>
            <p className="text-sm text-muted-foreground">
              Your files never leave your device. All processing happens locally in your browser using standard client APIs. No uploads, no storage.
            </p>
          </Card>

          <Card className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit"><Zap size={24} /></div>
            <h3 className="text-xl font-bold">Blazing Fast</h3>
            <p className="text-sm text-muted-foreground">
              Without wait times for uploading or downloading files to a remote server, operations finish instantly using your local hardware.
            </p>
          </Card>

          <Card className="p-6 flex flex-col gap-3">
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit"><Sparkles size={24} /></div>
            <h3 className="text-xl font-bold">No Limits & Free</h3>
            <p className="text-sm text-muted-foreground">
              Completely free to use with no account or registration required. Use all features as much as you like without restrictions.
            </p>
          </Card>
        </div>

        <div className="max-w-2xl text-muted-foreground text-sm space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">How It Works</h2>
          <p>
            PixelTools is designed using modern web capabilities, primarily the HTML5 Canvas API, File Reader interfaces, and client side web workers. By executing tasks locally, we guarantee your absolute data security. If you disconnect your internet after loading the page, the tools will continue to work perfectly.
          </p>
        </div>
      </div>
    </Layout>
  );
}
