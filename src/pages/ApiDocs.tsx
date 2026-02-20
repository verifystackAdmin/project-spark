import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Code } from "lucide-react";

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Code className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">API Documentation</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Integrate VerifyStack verification into your applications.
          </p>
          <div className="p-8 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-3">Coming Soon</h2>
            <p className="text-muted-foreground">
              Our API is currently in development. Contact us at{" "}
              <a href="mailto:support@verifystack.in" className="text-primary hover:underline">support@verifystack.in</a>{" "}
              for early access.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
