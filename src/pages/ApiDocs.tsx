import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Code2, Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-4 mb-6 ring-1 ring-primary/20">
            <Code2 className="w-12 h-12 text-primary" aria-hidden />
          </div>
          <Badge variant="secondary" className="mb-4 gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Coming soon
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            API documentation
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Integrate VerifyStack verification and trust signals into your apps. Reference docs, OpenAPI, and SDK
            guidance are on the way.
          </p>

          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 sm:p-10 text-left shadow-sm ring-1 ring-border/60">
            <h2 className="text-lg font-semibold text-foreground mb-2">Early access</h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
              Our HTTP APIs are in active development. If you are building a product integration or need webhooks and
              keys, reach out and we will prioritise your use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
              <Button asChild>
                <a href="mailto:support@verifystack.in">
                  <Mail className="w-4 h-4 mr-2" />
                  Email support@verifystack.in
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Want a walkthrough first?{" "}
            <a
              href={CALENDLY_BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Book a demo
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
