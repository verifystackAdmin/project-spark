import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">How We Use Cookies</h2>
              <p>We use cookies for authentication, analytics, and remembering your preferences. We do not use cookies for advertising purposes.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Managing Cookies</h2>
              <p>You can control cookies through your browser settings. Disabling cookies may affect some features of our platform.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p>
                Questions about our cookie policy? Email{" "}
                <a href="mailto:privacy@verifystack.in" className="text-primary hover:underline">
                  privacy@verifystack.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
