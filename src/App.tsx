import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import ResizerPage from "@/pages/resizer";
import CompressorPage from "@/pages/compressor";
import CropperPage from "@/pages/cropper";
import ConverterPage from "@/pages/converter";
import BackgroundRemoverPage from "@/pages/background-remover";
import ImageToPdfPage from "@/pages/image-to-pdf";
import PdfToImagePage from "@/pages/pdf-to-image";
import WatermarkPage from "@/pages/watermark";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";

const queryClient = new QueryClient();

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
