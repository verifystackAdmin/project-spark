import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UseCaseCard from "@/components/UseCaseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Heart,
  Building,
  Users,
  Briefcase,
  ShoppingBag,
  Globe,
  UserCheck,
  MessageCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

const primaryUseCases = [
  {
    icon: Heart,
    title: "Relationship Background Check",
    description: "Before committing emotionally, verify who you're trusting. Identity checks, social presence review, and AI-powered chat analysis to detect manipulation, lies, or red flags.",
  },
  {
    icon: UserCheck,
    title: "Dating Profile Authenticity",
    description: "Not sure if a dating profile is real? We verify face match, social presence, and identity signals to help you avoid catfishing and scams.",
  },
  {
    icon: MessageCircle,
    title: "Chat Analysis",
    description: "Upload conversations and get AI insights on emotional manipulation, gaslighting, dominance patterns, and overall relationship health.",
  },
];

const secondaryUseCases = [
  {
    icon: Building,
    title: "Tenant Verification",
    description: "Screen potential tenants with identity verification, employment verification, and rental history before handing over your property.",
  },
  {
    icon: Users,
    title: "Domestic Worker Verification",
    description: "Verify household staff including maids, drivers, nannies, and cooks with background checks and identity verification.",
  },
];

const comingSoonUseCases = [
  {
    icon: Briefcase,
    title: "Freelancer Verification",
    description: "Verify freelancers and contractors before hiring — identity, portfolio authenticity, and professional background.",
  },
  {
    icon: ShoppingBag,
    title: "Online Seller Verification",
    description: "Verify e-commerce sellers before large purchases. Check business registration and seller credibility.",
  },
  {
    icon: Globe,
    title: "Global Identity Check",
    description: "Verify identities across borders with international document verification and cross-country validation.",
  },
];

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-semibold">
            🛡️ Trust Before You Trust
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Protect Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Heart & Home
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            AI-powered verification for relationships, dating profiles, and personal safety. 
            Know who you're trusting before you commit.
          </p>
          <Link to="/run-check">
            <Button variant="hero" size="lg" className="gap-2">
              Verify Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Primary Use Cases - Relationship Focus */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Relationship & Dating Verification
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't let uncertainty hold you back. Get the clarity you deserve before making life-changing decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {primaryUseCases.map((useCase, index) => (
              <div key={index} className="relative">
                <UseCaseCard
                  icon={useCase.icon}
                  title={useCase.title}
                  description={useCase.description}
                />
                <div className="mt-4 text-center">
                  <Link to="/run-check">
                    <Button variant="default" size="sm" className="gap-2">
                      Check Before You Trust
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Use Cases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Home & Safety Verification
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Protect your property and loved ones with thorough background checks.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {secondaryUseCases.map((useCase, index) => (
              <div key={index} className="relative">
                <UseCaseCard
                  icon={useCase.icon}
                  title={useCase.title}
                  description={useCase.description}
                />
                <div className="mt-4 text-center">
                  <Link to="/run-check">
                    <Button variant="outline" size="sm" className="gap-2">
                      Verify Now
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon - Enterprise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 gap-2">
              <Clock className="w-3 h-3" />
              Coming Soon for Businesses & Enterprises
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Business Verification Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade verification for hiring, partnerships, and transactions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto opacity-75">
            {comingSoonUseCases.map((useCase, index) => (
              <div key={index} className="relative">
                <UseCaseCard
                  icon={useCase.icon}
                  title={useCase.title}
                  description={useCase.description}
                  className="pointer-events-none"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl">
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    Coming Soon
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Know the Truth?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait until it's too late. Get peace of mind with AI-powered verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/run-check">
              <Button variant="hero" size="lg" className="gap-2">
                Check Before You Trust
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCases;