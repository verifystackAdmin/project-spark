import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 15, 2026</p>

            <div className="prose prose-slate max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using VerifyStack services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    VerifyStack provides AI-powered background verification services including identity verification, document authentication, criminal record checks, social media analysis, and relationship pattern analysis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Obtain consent before verifying another person</li>
                    <li>Not misuse or share verification reports inappropriately</li>
                    <li>Maintain the confidentiality of your account</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All payments are due at the time of purchase. Subscription fees are billed in advance on a monthly or annual basis. Prices are subject to change with 30 days notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Refund Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We offer a 7-day money-back guarantee for subscription plans. Single verification checks are non-refundable once processing has begun. Contact support for refund requests.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    VerifyStack provides verification results based on available data sources. We do not guarantee 100% accuracy and are not liable for decisions made based on our reports. Users should use our services as one of multiple factors in their decision-making process.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content, features, and functionality of our services are owned by VerifyStack and are protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact us at legal@verifystack.in or through our support channels.
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

export default Terms;
