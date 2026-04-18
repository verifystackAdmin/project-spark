import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  Shield,
  CheckCircle,
  Cpu,
  ArrowRight,
} from "lucide-react";

const IndividualVerification = () => {
  const supportedDocuments = [
    { name: "Aadhaar Card", icon: FileText },
    { name: "PAN Card", icon: FileText },
    { name: "Passport", icon: FileText },
    { name: "Driving License", icon: FileText },
    { name: "Voter ID", icon: FileText },
    { name: "Educational Certificates", icon: FileText },
  ];

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Forgery Detection",
      description:
        "Our advanced AI scans for digital tampering, inconsistencies, and signs of forgery to ensure document authenticity.",
    },
    {
      icon: CheckCircle,
      title: "Data Extraction & Validation",
      description:
        "Automatically extract key information and validate it against official databases for maximum accuracy.",
    },
    {
      icon: Cpu,
      title: "Instant Results",
      description:
        "Get verification results in minutes, not days. Our automated process provides near-instant feedback.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Individual Verification
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Securely verify individual identities with our AI-powered document
            verification service. Upload documents with confidence and get instant, reliable
            results.
          </p>
        </section>

        {/* Supported Documents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Supported Documents
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {supportedDocuments.map((doc, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border text-center flex flex-col items-center"
              >
                <doc.icon className="w-10 h-10 text-primary mb-3" />
                <p className="font-semibold text-foreground">{doc.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Verify?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start your verification process now. It's fast, secure, and easy.
          </p>
          <Link to="/run-check">
            <Button size="lg">
              Start Individual Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndividualVerification;
