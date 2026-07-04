import Layout from "@/components/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="max-w-2xl w-full text-muted-foreground text-sm space-y-4">
          <h1 className="text-3xl font-extrabold text-foreground mb-6">Privacy Policy</h1>
          <p>
            At PixelTools, we take your privacy extremely seriously. Our fundamental philosophy is that your personal data belongs to you.
          </p>
          <h2 className="text-xl font-bold text-foreground pt-4">No Image Data Uploads</h2>
          <p>
            Unlike other conversion and editing utilities, all tools provided on this site process your images and files entirely within your web browser using HTML5, CSS, and Javascript APIs. No image data is ever uploaded, cached, stored, or processed on any remote server.
          </p>
          <h2 className="text-xl font-bold text-foreground pt-4">Google AdSense and Cookies</h2>
          <p>
            We use Google AdSense to display advertisements on our website to support our free services. This site uses cookies for analytics and personalized advertising. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites on the internet.
          </p>
          <p className="pt-2">
            You can learn more about how Google uses information from sites or apps that use their services by visiting {" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy Policy</a>. You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings.
          </p>
          <h2 className="text-xl font-bold text-foreground pt-4">Contact Information</h2>
          <p>
            If you have any questions or feedback regarding our privacy commitments, feel free to contact us via our Contact page.
          </p>
        </div>
      </div>
    </Layout>
  );
}
