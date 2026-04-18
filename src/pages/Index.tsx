import { Link } from "react-router-dom";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/HowItWorks";
import AIParticleBackground from "@/components/AIParticleBackground";
import HeroBackground from "@/components/layout/HeroBackground";
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
import TrustStack from "@/components/sections/TrustStack";
import HomeFAQ from "@/components/sections/HomeFAQ";
import { useIsMobile } from "@/hooks/use-mobile";
import { Shield, Sparkles, ArrowRight, Lock, ShieldCheck, MapPin } from "lucide-react";
import AIScanAnimation from "@/components/AIScanAnimation";
import { siteIndia } from "@/lib/siteIdentity";
import heroIndia from "@/assets/hero-verification-india.jpg";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-dvh min-w-0 bg-background">
      <Header />

      {/* Hero Section — Deep Obsidian Dark (padding tuned to fixed h-16 header) */}
      <section className="relative pt-24 pb-14 md:pt-28 md:pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <HeroBackground />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float-slow" />
        </div>
        <AIParticleBackground />

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left — Copy */}
            <div className="text-center md:text-left md:pt-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-5 border border-primary/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-mono uppercase tracking-widest">Trust Infrastructure</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.05] mb-4 tracking-tight"
              >
                AI-Powered Trust &amp;{" "}
                <br />
                <span className="gradient-text">Verification Infrastructure</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-base font-semibold text-foreground/90 mb-2"
              >
                Verify anyone before trusting them.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base md:text-lg text-foreground/80 leading-relaxed mb-7 max-w-xl"
              >
                AI-powered identity authentication, background verification and risk screening — all in one platform. Build secure onboarding workflows in minutes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <Link to="/run-check">
                  <Button size="lg" className="w-full sm:w-auto group btn-glow">
                    Verify Someone Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover-lift border-border/50" asChild>
                  <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                    Request Demo
                  </a>
                </Button>
              </motion.div>

              {/* Trust Badges — immediately below CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start"
              >
                {[
                  { icon: ShieldCheck, text: "DPDP 2023 Compliant" },
                  { icon: Lock, text: "AES-256 Encryption" },
                  { icon: Shield, text: "SOC 2 Ready" },
                  { icon: MapPin, text: "Built in Pune · IST" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/55 font-mono uppercase tracking-wider"
                  >
                    <Icon className="w-3 h-3" />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* Hindi trust line — subtle India anchor */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="mt-3 text-xs text-foreground/45 italic text-center md:text-left"
                lang="hi"
              >
                {siteIndia.trustLineHi}
              </motion.p>
            </div>

            {/* Right — Real product imagery + scan overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:flex w-full items-start justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10">
                <img
                  src={heroIndia}
                  alt="Indian product manager reviewing a VerifyStack background verification dashboard"
                  width={1536}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Frosted edge tint to blend with hero */}
                <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-primary/10" />
                {/* Floating scan animation overlay (kept for AI feel) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="opacity-90">
                    <AIScanAnimation />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* 2 — Trust & Safety Stack (FOLD 2) */}
      <TrustStack />

      {/* 3 — Who It's For */}
      <WhoIsItFor />

      {/* 4 — How It Works */}
      <HowItWorks />

      {/* 5 — AI Dashboard Preview */}
      <AIDashboardPreview />

      {/* 6 — Agency Focus */}
      <AgencyFocus />

      {/* 7 — Housing Societies */}
      <HousingSocieties />

      {/* 8 — Why Trust VerifyStack */}
      <WhyTrustUs />

      {/* 9 — Sample Report */}
      <SampleReport />

      {/* Category Vision */}
      <CategoryVision />

      {/* 10 — Pricing */}
      <LandingPricing />

      {/* 11 — FAQs */}
      <HomeFAQ />

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
