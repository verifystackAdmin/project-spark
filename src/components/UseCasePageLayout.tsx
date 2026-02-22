import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Shield, CheckCircle, LucideIcon } from "lucide-react";

interface UseCasePageProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  features: { title: string; description: string }[];
  howItWorks: { step: string; title: string; description: string }[];
  ctaLabel?: string;
  ctaLink?: string;
  icon: LucideIcon;
  relatedPages: { label: string; href: string }[];
}

const UseCasePageLayout = ({
  badge,
  title,
  highlight,
  subtitle,
  features,
  howItWorks,
  ctaLabel = "Get Started",
  ctaLink = "/run-check",
  icon: Icon,
  relatedPages,
}: UseCasePageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">{badge}</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            >
              {title}{" "}
              <span className="gradient-text">{highlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link to={ctaLink}>
                <Button size="lg" className="w-full sm:w-auto group btn-glow">
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              What's Included
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 h-full border border-border/50">
                  <CheckCircle className="w-5 h-5 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              How It Works
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto border border-border/50">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Start Verifying Today
              </h2>
              <p className="text-muted-foreground mb-6">
                Enterprise-grade verification. No paperwork. Results in minutes.
              </p>
              <Link to={ctaLink}>
                <Button size="lg" className="btn-glow">
                  {ctaLabel} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Pages - Internal Linking */}
      <section className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4 text-center">
            Related Use Cases
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {relatedPages.map((p, i) => (
              <Link key={i} to={p.href}>
                <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50">
                  {p.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCasePageLayout;
