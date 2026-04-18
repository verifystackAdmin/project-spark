import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/layout/HeroBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
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
    img: "https://images.pexels.com/photos/7841797/pexels-photo-7841797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/run-check",
  },
  {
    icon: UserCheck,
    title: "Dating Profile Authenticity",
    description: "Not sure if a dating profile is real? We verify face match, social presence, and identity signals to help you avoid catfishing and scams.",
    img: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/run-check",
  },
  {
    icon: MessageCircle,
    title: "Chat Analysis",
    description: "Upload conversations and get AI insights on emotional manipulation, gaslighting, dominance patterns, and overall relationship health.",
    img: "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/run-check",
  },
  {
    icon: Building,
    title: "Tenant Verification",
    description: "Screen potential tenants with identity verification, employment verification, and rental history before handing over your property.",
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/use-cases/tenant-screening",
  },
  {
    icon: Users,
    title: "Domestic Worker Verification",
    description: "Verify household staff including maids, drivers, nannies, and cooks with background checks and identity verification.",
    img: "https://images.pexels.com/photos/9394443/pexels-photo-9394443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/solutions/domestic-worker-verification",
  },
  {
    icon: Briefcase,
    title: "Freelancer Verification",
    description: "Verify freelancers and contractors before hiring — identity, portfolio authenticity, and professional background.",
    img: "https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/use-cases/freelancer-verification",
  },
];

const businessUseCases = [
  {
    icon: Shield,
    title: "Employee Background Check",
    description: "Enterprise-grade pre-employment screening. Verify identity, criminal records, employment history, and education at scale.",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/use-cases/employee-background-check",
  },
  {
    icon: Users,
    title: "Staffing Agency Verification",
    description: "Pre-verify your entire candidate pool. Security guards, housekeeping, delivery partners—every worker gets a verified trust badge.",
    img: "https://images.pexels.com/photos/7645303/pexels-photo-7645303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/use-cases/staffing-agency-verification",
  },
  {
    icon: Home,
    title: "Housing Society Screening",
    description: "Streamline background checks for domestic help, maintenance staff, tenants, and service vendors across hundreds of households.",
    img: "https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/use-cases/housing-society-screening",
  },
  {
    icon: Truck,
    title: "Vendor & Supplier Check",
    description: "Verify business partners, vendors, and suppliers before signing contracts. Company registration, compliance, and reputation checks.",
    img: "https://images.pexels.com/photos/8938923/pexels-photo-8938923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/use-cases/vendor-verification",
  },
  {
    icon: Globe,
    title: "Global Identity Verification",
    description: "Verify identities across borders with international document verification and cross-country validation.",
    img: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/document-verification",
  },
  {
    icon: ShoppingBag,
    title: "Online Seller Verification",
    description: "Verify e-commerce sellers before large purchases. Check business registration and seller credibility.",
    img: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    href: "/business-verification",
  },
];

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative border-b border-border/30 pt-32 pb-16 overflow-hidden">
        <HeroBackground
          imageUrl="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          altText="A diverse team collaborating in a modern office"
        />
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
            <Button variant="outline" size="lg" asChild>
              <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                Request Demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Individual Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-green-500/10 text-green-500 text-sm font-semibold rounded-full mb-4">
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
                <Link to={useCase.href} className="block h-full">
                  <div className="rounded-2xl border border-border bg-card overflow-hidden h-full flex flex-col group transition-shadow hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={useCase.img}
                        alt={useCase.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                          <useCase.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground flex-1">{useCase.description}</p>
                    </div>
                  </div>
                </Link>
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
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-500 text-sm font-semibold rounded-full mb-4">
                For Businesses, Agencies & Societies
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Verify at Scale
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From staffing agencies to housing societies — VerifyStack enables you to run automated background KYC for high-volume hiring and verify renter identities.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {businessUseCases.map((useCase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link to={useCase.href} className="block h-full">
                  <div className="rounded-2xl border border-border bg-card overflow-hidden h-full flex flex-col group transition-shadow hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={useCase.img}
                        alt={useCase.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                          <useCase.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground flex-1">{useCase.description}</p>
                    </div>
                  </div>
                </Link>
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
