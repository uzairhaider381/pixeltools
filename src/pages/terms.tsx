import Layout from "@/components/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="max-w-2xl w-full text-muted-foreground text-sm space-y-4">
          <h1 className="text-3xl font-extrabold text-foreground mb-6">Terms & Conditions</h1>
          <p>
            By accessing and using PixelTools, you agree to comply with and be bound by the following terms of service.
          </p>
          <h2 className="text-xl font-bold text-foreground pt-4">Acceptable Use</h2>
          <p>
            You agree to use this site for lawful purposes and in a manner that does not infringe the rights of or restrict the use of this site by any third party.
          </p>
          <h2 className="text-xl font-bold text-foreground pt-4">No Warranties</h2>
          <p>
            PixelTools is provided "as is" without any representations or warranties, express or implied. We do not guarantee that the site or services will always be available, error-free, or meet your exact requirements.
          </p>
          <h2 className="text-xl font-bold text-foreground pt-4">Limit of Liability</h2>
          <p>
            We will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any direct, indirect, special, or consequential loss or damage.
          </p>
        </div>
      </div>
    </Layout>
  );
}
