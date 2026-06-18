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
          <h2 className="text-xl font-bold text-foreground pt-4">Third Party Advertisements</h2>
          <p>
            We use Google AdSense to display advertisements on our website to support our services. Google AdSense may use cookies to serve ads based on your visits to this and other websites. You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings.
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
