import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

// Lazy load pages to reduce the initial bundle size
const HomePage = lazy(() => import("@/pages/home"));
const ResizerPage = lazy(() => import("@/pages/resizer"));
const CompressorPage = lazy(() => import("@/pages/compressor"));
const CropperPage = lazy(() => import("@/pages/cropper"));
const ConverterPage = lazy(() => import("@/pages/converter"));
const BackgroundRemoverPage = lazy(() => import("@/pages/background-remover"));
const ImageToPdfPage = lazy(() => import("@/pages/image-to-pdf"));
const PdfToImagePage = lazy(() => import("@/pages/pdf-to-image"));
const WatermarkPage = lazy(() => import("@/pages/watermark"));
const AboutPage = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const TermsPage = lazy(() => import("@/pages/terms"));
const NotFound = lazy(() => import("@/pages/not-found"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/resize" component={ResizerPage} />
        <Route path="/compress" component={CompressorPage} />
        <Route path="/crop" component={CropperPage} />
        <Route path="/convert" component={ConverterPage} />
        <Route path="/remove-background" component={BackgroundRemoverPage} />
        <Route path="/image-to-pdf" component={ImageToPdfPage} />
        <Route path="/pdf-to-image" component={PdfToImagePage} />
        <Route path="/watermark" component={WatermarkPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
