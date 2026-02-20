import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/HowItWorks";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AIParticleBackground from "@/components/AIParticleBackground";
import ScrollReveal from "@/components/ScrollReveal";
import WhoIsItFor from "@/components/sections/WhoIsItFor";
import AgencyFocus from "@/components/sections/AgencyFocus";
import HousingSocieties from "@/components/sections/HousingSocieties";
import WhyTrustUs from "@/components/sections/WhyTrustUs";
import CategoryVision from "@/components/sections/CategoryVision";
import IndividualsCTA from "@/components/sections/IndividualsCTA";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Shield,
  Sparkles,
  ArrowRight,
  Heart,
  Building,
  Users,
  Briefcase,
  Linkedin,
  Youtube,
  Facebook,
  Pin,
  Layers,
  Rocket,
} from "lucide-react";
import UseCaseCard from "@/components/UseCaseCard";

const Index = () => {
  const isMobile = useIsMobile();

  const useCases = [
    {
      icon: Heart,
      title: "Relationship Verification",
      description: "Analyze chat patterns, detect red flags, and get relationship compatibility insights.",
    },
    {
      icon: Building,
      title: "Tenant Screening",
      description: "Verify potential tenants' identity, background, and rental history before signing.",
    },
    {
      icon: Users,
      title: "Domestic Worker Check",
      description: "Screen household staff with criminal records, identity verification, and references.",
    },
    {
      icon: Briefcase,
      title: "Freelancer Verification",
      description: "Verify freelancers and contractors before hiring for projects.",
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/verifystack/', icon: Linkedin },
    { name: 'Pinterest', href: 'https://www.pinterest.com/verifystack/', icon: Pin },
    { name: 'YouTube', href: 'https://www.youtube.com/@verifyStack', icon: Youtube },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588407292883', icon: Facebook },
    { name: 'Stack Overflow', href: 'https://stackoverflow.com/users/32369956/verifystack', icon: Layers },
    { name: 'Product Hunt', href: 'https://www.producthunt.com/@verifystack', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 1️⃣ Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 soft-gradient-bg" />
        <AIParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-6 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Background Verification
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6"
            >
              Trust, Verified.{" "}
              <span className="gradient-text">For Everyone.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Enterprise-grade background verification for businesses, agencies, housing societies, and individuals—powered by AI and real-time data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/demo">
                <Button size="xl" className="w-full sm:w-auto group hover-glow">
                  Request Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/run-check">
                <Button variant="outline" size="xl" className="w-full sm:w-auto hover-lift">
                  👉 Verify Someone Now
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              VerifyStack is building the Trust Infrastructure for India.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2️⃣ Who It's For */}
      <WhoIsItFor />

      {/* 3️⃣ How It Works */}
      <HowItWorks />

      {/* 4️⃣ Key Use Cases */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Use Cases
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Verification for Every Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hiring | Tenants | Gig Workers | Vendors — verify anyone with confidence.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <UseCaseCard icon={useCase.icon} title={useCase.title} description={useCase.description} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <div className="text-center mt-10">
              <Link to="/use-cases">
                <Button variant="outline" size="lg" className="group hover-lift">
                  View All Use Cases
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5️⃣ Agency Focus */}
      <AgencyFocus />

      {/* 6️⃣ Housing Societies */}
      <HousingSocieties />

      {/* 7️⃣ Why Trust VerifyStack */}
      <WhyTrustUs />

      {/* 8️⃣ Category Vision */}
      <CategoryVision />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* 9️⃣ CTA for Individuals */}
      <IndividualsCTA />

      {/* Social Links */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join Our Community
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow us on our social channels to stay up to date with the latest news and features.
              </p>
            </div>
          </ScrollReveal>
          <div className="flex justify-center items-center flex-wrap gap-4 md:gap-6">
            {socialLinks.map((social, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group w-16 h-16 bg-card rounded-2xl flex items-center justify-center border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 🔟 Footer */}
      <Footer />

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border z-50">
          <Link to="/run-check">
            <Button size="lg" className="w-full">
              Verify Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
