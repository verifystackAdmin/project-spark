import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Building, FileCheck, Banknote, Shield } from "lucide-react";

const features = [
  {
    icon: Building,
    title: "Company Registration Details",
    description:
      "Verify company existence, registration number, and legal status directly from official government registries.",
  },
  {
    icon: FileCheck,
    title: "Tax & Financial Records",
    description:
      "Check for valid tax registrations (GST, PAN) and analyze financial health to ensure the legitimacy of a business.",
  },
  {
    icon: Banknote,
    title: "Directorship & Ownership",
    description:
      "Identify key directors and beneficial owners to understand the corporate structure and prevent dealing with shell companies.",
  },
  {
    icon: Shield,
    title: "Compliance & Watchlist Screening",
    description:
      "Screen businesses and owners against global sanctions, blacklists, and adverse media to mitigate regulatory risks.",
  },
];

const BusinessVerification = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Business Verification
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Onboard businesses with confidence. Our comprehensive business
              verification solution helps you comply with regulations and reduce fraud.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Key Features</h2>
              <p className="text-muted-foreground">
                Everything you need to verify a business entity.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
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
              Ready to Secure Your Business Onboarding?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Integrate our business verification API or use our dashboard to start verifying today.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Contact Sales
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

export default BusinessVerification;
