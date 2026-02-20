import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LiveDemo } from "@/components/landing/LiveDemo";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, CheckCircle, Lock, Brain } from "lucide-react";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Live Demo
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                See VerifyStack <span className="gradient-text">In Action</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
                Experience enterprise-grade AI-powered verification firsthand. Enter any email or social media handle to see a sample trust report.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  { icon: CheckCircle, label: "GDPR Ready" },
                  { icon: Lock, label: "256-bit Encryption" },
                  { icon: Brain, label: "AI-Powered" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-7 h-7 rounded-full bg-trust/10 flex items-center justify-center">
                      <badge.icon className="w-3.5 h-3.5 text-trust" />
                    </div>
                    {badge.label}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <LiveDemo />
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
