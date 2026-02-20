import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UseCaseCard from "@/components/UseCaseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
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
  Shield,
  Home,
  Truck,
} from "lucide-react";

const individualUseCases = [
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
  {
    icon: Briefcase,
    title: "Freelancer Verification",
    description: "Verify freelancers and contractors before hiring — identity, portfolio authenticity, and professional background.",
  },
];

const businessUseCases = [
  {
    icon: Shield,
    title: "Employee Background Check",
    description: "Enterprise-grade pre-employment screening. Verify identity, criminal records, employment history, and education at scale.",
  },
  {
    icon: Users,
    title: "Staffing Agency Verification",
    description: "Pre-verify your entire candidate pool. Security guards, housekeeping, delivery partners—every worker gets a verified trust badge.",
  },
  {
    icon: Home,
    title: "Housing Society Screening",
    description: "Streamline background checks for domestic help, maintenance staff, tenants, and service vendors across hundreds of households.",
  },
  {
    icon: Truck,
    title: "Vendor & Supplier Check",
    description: "Verify business partners, vendors, and suppliers before signing contracts. Company registration, compliance, and reputation checks.",
  },
  {
    icon: Globe,
    title: "Global Identity Verification",
    description: "Verify identities across borders with international document verification and cross-country validation.",
  },
  {
    icon: ShoppingBag,
    title: "Online Seller Verification",
    description: "Verify e-commerce sellers before large purchases. Check business registration and seller credibility.",
  },
];

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-semibold">
            🛡️ Verification for Every Need
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trust, Verified —{" "}
            <span className="gradient-text">For Everyone</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're a hiring manager, an agency owner, or a homeowner — VerifyStack ensures you never trust blindly again. Enterprise-grade background checks accessible to all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/run-check">
              <Button size="lg" className="gap-2 hover-glow">
                👉 Verify Someone Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Individual Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                For Individuals & Families
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Verify Before You Trust
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hiring a nanny, driver, tenant, or service worker? Fake identities and fraud are rising. Get enterprise-grade background checks in minutes—without paperwork or agencies.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {individualUseCases.map((useCase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative h-full">
                  <UseCaseCard icon={useCase.icon} title={useCase.title} description={useCase.description} />
                  <div className="mt-4 text-center">
                    <Link to="/run-check">
                      <Button variant="outline" size="sm" className="gap-2 hover-lift">
                        Run a Check
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business Use Cases */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
                For Businesses, Agencies & Societies
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Verify at Scale
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From staffing agencies to housing societies — VerifyStack enables you to build a trusted ecosystem with pre-verified workforce and secure communities.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {businessUseCases.map((useCase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative h-full">
                  <UseCaseCard icon={useCase.icon} title={useCase.title} description={useCase.description} />
                  <div className="mt-4 text-center">
                    <Link to="/contact">
                      <Button variant="outline" size="sm" className="gap-2 hover-lift">
                        Partner With Us
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal direction="scale">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border max-w-4xl mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6"
              >
                <Shield className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Start Verifying?
              </h2>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
                VerifyStack democratizes trust—making enterprise-grade background verification accessible to businesses, agencies, and everyday individuals.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                VerifyStack is building the Trust Infrastructure for India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="xl" className="group hover-glow">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="xl" className="hover-lift">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCases;
