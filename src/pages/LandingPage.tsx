import Header from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustSignals } from "@/components/landing/TrustSignals";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { UseCases } from "@/components/landing/UseCases";
import { Pricing } from "@/components/landing/Pricing";
import { EnterpriseFooter } from "@/components/landing/EnterpriseFooter";
import { AnimatedSection } from "@/components/landing/AnimatedSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AnimatedSection>
          <TrustSignals />
        </AnimatedSection>
        <AnimatedSection>
          <Features />
        </AnimatedSection>
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
          <LiveDemo />
        </AnimatedSection>
        <AnimatedSection>
          <UseCases />
        </AnimatedSection>
        <AnimatedSection>
          <Pricing />
        </AnimatedSection>
      </main>
      <EnterpriseFooter />
    </div>
  );
};

export default LandingPage;
