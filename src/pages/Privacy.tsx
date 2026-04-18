import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 15, 2026</p>

            <div className="prose prose-slate max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, including personal identification documents (Aadhaar, PAN, Passport), photographs, contact information, and any chat exports you upload for relationship analysis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Verify identity and documents</li>
                    <li>Generate comprehensive verification reports</li>
                    <li>Provide relationship analysis insights</li>
                    <li>Improve our AI verification algorithms</li>
                    <li>Communicate with you about our services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures including 256-bit SSL encryption, secure data centers, and regular security audits. Your documents are encrypted at rest and in transit.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal data only for as long as necessary to provide our services. Verification reports are stored according to your subscription plan's retention period. You can request deletion of your data at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Data portability</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at privacy@verifystack.in or through our support channels.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
