import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Eligibility</h2>
              <p>Refund requests must be submitted within 7 days of purchase. We review each request on a case-by-case basis.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Non-Refundable</h2>
              <p>Completed verification reports that have already been generated and delivered are non-refundable, as the service has been rendered.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">How to Request</h2>
              <p>
                Email us at{" "}
                <a href="mailto:support@verifystack.in" className="text-primary hover:underline">
                  support@verifystack.in
                </a>{" "}
                with your order details and reason for the refund.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Processing Time</h2>
              <p>Approved refunds are processed within 5–10 business days to the original payment method.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
