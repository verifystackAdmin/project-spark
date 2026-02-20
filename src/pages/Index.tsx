import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/HowItWorks";
import UseCaseCard from "@/components/UseCaseCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TrustScoreGauge from "@/components/TrustScoreGauge";
import AIParticleBackground from "@/components/AIParticleBackground";
import TypewriterText from "@/components/TypewriterText";
import ScrollReveal from "@/components/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Shield,
  UserCheck,
  FileSearch,
  Brain,
  Users,
  Building,
  Heart,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Lock,
  Zap,
  Fingerprint,
  ScanFace,
  FileCheck,
  Globe,
  Award,
  Code,
  Linkedin,
  Youtube,
  Facebook,
  Pin,
  Layers,
  Rocket,
} from "lucide-react";

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

  const stats = [
    { value: "50K+", label: "Verifications Done", icon: FileCheck },
    { value: "99.2%", label: "Accuracy Rate", icon: Shield },
    { value: "< 5min", label: "Average Time", icon: Zap },
    { value: "24/7", label: "AI Support", icon: Brain },
  ];

  const features = [
    {
      icon: Fingerprint,
      title: "Identity Verification",
      description: "Confirm identities with official documents and biometrics.",
    },
    {
      icon: Users,
      title: "Social Profile Validation",
      description: "Analyze social media presence and online behavior.",
    },
    {
      icon: Brain,
      title: "AI Risk Scoring",
      description: "Get a comprehensive risk score based on AI analysis.",
    },
    {
      icon: Award,
      title: "Community Reputation",
      description: "Leverage community-driven feedback and ratings.",
    },
    {
      icon: Code,
      title: "API for Developers",
      description: "Integrate our verification services into your own platform.",
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

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 soft-gradient-bg" />
        <AIParticleBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
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
                Know Who You’re Trusting —{" "}
                <span className="gradient-text">Instantly</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                AI-powered background verification for individuals, startups, and enterprises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/run-check">
                  <Button size="xl" className="w-full sm:w-auto group hover-glow">
                    👉 Start Verification
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto hover-lift">
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative bg-card rounded-3xl p-8 border border-border shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <div className="relative mb-6 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&h=400&fit=crop"
                    alt="AI Verification Technology"
                    className="w-full h-48 object-cover hover-scale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-trust/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Verification Status</p>
                        <p className="text-sm font-semibold text-trust">Complete & Verified</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-muted-foreground text-sm font-medium mb-4">Sample Trust Score</h3>
                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <TrustScoreGauge score={87} size="lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: UserCheck, label: "Identity Verified" },
                    { icon: FileSearch, label: "Documents Authentic" },
                    { icon: Shield, label: "No Criminal Records" },
                    { icon: Brain, label: "Social Profile Clean" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.12 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 bg-secondary/50 rounded-xl p-3 hover:bg-secondary transition-colors cursor-default"
                    >
                      <div className="w-10 h-10 rounded-lg bg-trust/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-trust" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                      <CheckCircle className="w-5 h-5 text-trust" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg flex items-center justify-center pulse-glow"
              >
                <Shield className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-teal-300 rounded-xl shadow-lg flex items-center justify-center"
              >
                <Fingerprint className="w-8 h-8 text-primary-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-muted-foreground">Used by founders, recruiters, and communities</h2>
            <div className="flex justify-center items-center gap-8 md:gap-12 mt-6">
              <img src="https://via.placeholder.com/120x40?text=Logo+1" alt="Placeholder logo 1" className="opacity-50" />
              <img src="https://via.placeholder.com/120x40?text=Logo+2" alt="Placeholder logo 2" className="opacity-50" />
              <img src="https://via.placeholder.com/120x40?text=Logo+3" alt="Placeholder logo 3" className="opacity-50" />
              <img src="https://via.placeholder.com/120x40?text=Logo+4" alt="Placeholder logo 4" className="opacity-50" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                {[
                  { icon: Lock, label: "SOC2 (In Progress)" },
                  { icon: CheckCircle, label: "GDPR Compliant" },
                  { icon: Shield, label: "ISO 27001" },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-2 text-muted-foreground text-sm cursor-default"
                  >
                    <div className="w-8 h-8 rounded-full bg-trust/10 flex items-center justify-center">
                      <badge.icon className="w-4 h-4 text-trust" />
                    </div>
                    {badge.label}
                  </motion.div>
                ))}
              </div>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="scale">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered verification has helped thousands make informed decisions
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group text-center p-6 rounded-2xl hover:bg-secondary/50 transition-all duration-300 cursor-default"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Preview */}
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
                From personal relationships to business decisions, verify anyone with confidence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale">
            <div className="mb-12 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop"
                  alt="Team collaboration and verification"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Secure Verifications</h3>
                    <p className="text-primary-foreground/80 max-w-md mx-auto">
                      Bank-grade security with AI-powered accuracy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <UseCaseCard
                  icon={useCase.icon}
                  title={useCase.title}
                  description={useCase.description}
                />
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

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow animation-delay-300" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="scale">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border text-center max-w-4xl mx-auto">
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
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of individuals and businesses who trust VerifyStack for reliable background verification.
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

      {/* Social Links Section */}
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
