import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, UserCheck, ShieldCheck, BrainCircuit } from "lucide-react";
import TrustScoreGauge from "@/components/TrustScoreGauge";

const scoreComponents = [
  {
    icon: FileCheck,
    title: "Document Authenticity",
    description: "Verification of government-issued IDs for forgery and tampering.",
  },
  {
    icon: UserCheck,
    title: "Identity Confirmation",
    description: "Biometric analysis to match the user to the presented document.",
  },
  {
    icon: BrainCircuit,
    title: "Digital Footprint Analysis",
    description:
      "Assessment of online presence and history to detect suspicious patterns.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Signal Detection",
    description:
      "Screening against global watchlists and for adverse media mentions.",
  },
];

const TrustScore = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  The VerifyStack Trust Score
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Go beyond simple pass/fail checks. The Trust Score is a dynamic,
                  AI-powered rating that provides a holistic view of a user's
                  trustworthiness in real-time.
                </p>
              </div>
              <div className="flex justify-center">
                <TrustScoreGauge score={85} size="lg" animated />
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">How the Trust Score Works</h2>
              <p className="text-muted-foreground">
                Our score is calculated from hundreds of data points across multiple vectors.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {scoreComponents.map((feature) => (
                <div key={feature.title} className="bg-card p-6 rounded-lg border">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Make Smarter, Faster Decisions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use the Trust Score to automate approvals, flag high-risk users, and build a safer platform.
            </p>
            <Link to="/run-check">
              <Button size="lg">
                Run Your First Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrustScore;
