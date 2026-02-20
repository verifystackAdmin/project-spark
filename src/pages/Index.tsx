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
import AIDashboardPreview from "@/components/sections/AIDashboardPreview";
import SampleReport from "@/components/sections/SampleReport";
import LandingPricing from "@/components/sections/LandingPricing";
import { useIsMobile } from "@/hooks/use-mobile";
import { Shield, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float-slow" />
        </div>
        <AIParticleBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-8 border border-primary/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">AI-Powered Verification</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-foreground leading-[0.95] mb-6 tracking-tight"
            >
              Trust, Verified.{" "}
              <br />
              <span className="gradient-text">For Everyone.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Enterprise-grade AI background verification for businesses, agencies,
              housing societies, and individuals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link to="/demo">
                <Button size="lg" className="w-full sm:w-auto group btn-glow">
                  Request Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/run-check">
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover-lift border-border/50">
                  Verify Someone Now
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-xs text-muted-foreground font-mono uppercase tracking-widest"
            >
              Building the Trust Infrastructure for India
            </motion.p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 2 — Who It's For */}
      <WhoIsItFor />

      {/* 3 — How It Works */}
      <HowItWorks />

      {/* 4 — AI Dashboard Preview */}
      <AIDashboardPreview />

      {/* 5 — Agency Focus */}
      <AgencyFocus />

      {/* 6 — Housing Societies */}
      <HousingSocieties />

      {/* 7 — Why Trust VerifyStack */}
      <WhyTrustUs />

      {/* 8 — Sample Report */}
      <SampleReport />

      {/* 9 — Category Vision */}
      <CategoryVision />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* 10 — Pricing */}
      <LandingPricing />

      {/* CTA for Individuals */}
      <IndividualsCTA />

      {/* Footer */}
      <Footer />

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
          <Link to="/run-check">
            <Button size="default" className="w-full btn-glow text-sm">
              Verify Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
