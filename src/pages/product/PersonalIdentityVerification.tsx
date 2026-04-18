import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SolutionHeroBackground from "@/components/layout/SolutionHeroBackground";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight, Shield,
  Heart, Smile, Briefcase, ShoppingCart, Fingerprint, Globe,
  Clock, Lock, AlertTriangle, Eye, Zap, UserCheck
} from "lucide-react";
import { solutionGroups } from "@/lib/navigation";

const group = solutionGroups[3];

const features = [
  {
    icon: Heart,
    title: "Relationship Background Check",
    description: "Verify the identity and background of a romantic partner or someone you're building a serious relationship with.",
  },
  {
    icon: Smile,
    title: "Dating Profile Verification",
    description: "Confirm that the person you met online is who they claim to be — name, age, location, and criminal history check.",
  },
  {
    icon: Briefcase,
    title: "Freelancer Verification",
    description: "Verify the credentials, identity, and professional background of freelancers before hiring them for sensitive work.",
  },
  {
    icon: ShoppingCart,
    title: "Online Seller Verification",
    description: "Check the identity and reputation of online sellers before making high-value purchases or business transactions.",
  },
  {
    icon: Fingerprint,
    title: "Identity Verification",
    description: "Verify Aadhaar, PAN, and other government IDs with AI face match and liveness detection in real time.",
  },
  {
    icon: Globe,
    title: "Social Risk Check",
    description: "Scan social media profiles and digital footprints for red flags, fraud indicators, and reputation risks.",
  },
];

const stats = [
  { value: "3 Lakh+", label: "People Verified" },
  { value: "< 2hrs", label: "Digital Check TAT" },
  { value: "97.8%", label: "Identity Match Rate" },
  { value: "85%", label: "Fraud Cases Prevented" },
];

const howItWorks = [
  {
    step: "1",
    title: "Share Basic Details",
    description: "Enter the person's name, phone number, or social profile. Consent is collected digitally before any check begins.",
  },
  {
    step: "2",
    title: "AI Scans 50+ Sources",
    description: "Our AI engine checks identity databases, criminal records, social media, and digital footprints within hours.",
  },
  {
    step: "3",
    title: "Receive Trust Report",
    description: "Get a clear risk-scored report with verified identity details, red flags, and a trust verdict.",
  },
];

const whyChoose = [
  { icon: Zap, title: "Fast Digital Checks", description: "Identity and social checks completed within 2 hours — no waiting." },
  { icon: Lock, title: "Privacy First", description: "Consent-based verification. The subject is informed before any check runs." },
  { icon: AlertTriangle, title: "Fraud Detection", description: "AI flags fake profiles, catfish patterns, stolen identities, and scammers." },
  { icon: Eye, title: "Social Footprint Analysis", description: "Deep scan of social media and online presence for behavioural red flags." },
  { icon: UserCheck, title: "AI Face Match", description: "Liveness detection and AI-powered photo match against government IDs." },
  { icon: Clock, title: "Ongoing Monitoring", description: "Subscribe to continuous monitoring — get alerts if anything changes." },
];

const PersonalIdentityVerification = () => (
  <div className="min-h-screen bg-background">
    <Header />

    {/* Hero */}
    <section className="relative border-b border-border/30 pt-32 pb-20 overflow-hidden">
      <SolutionHeroBackground routePath="/solutions/personal-identity-verification" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="font-mono uppercase tracking-widest">For Individuals &amp; Personal Safety</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Personal Identity{" "}
            <span className="gradient-text">Verification</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Know who you're really dealing with — online and offline. Verify the identity and background of anyone you meet, hire, date, or transact with. Trust, but verify.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/run-check">
              <Button size="lg" className="w-full sm:w-auto group btn-glow">
                Verify Someone <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

    {/* Stats */}
    <section className="py-12 border-y border-border/50 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <p className="text-3xl font-extrabold gradient-text mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Verification Options */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Verification Options
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Personal safety verification for every kind of relationship and transaction
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 h-full border border-border/50 hover:border-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">How It Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Verify anyone in minutes — private, secure, and consent-based
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorks.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Why VerifyStack */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Why Individuals Choose VerifyStack
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Built for personal safety in the digital age — fast, private, and deeply accurate
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyChoose.map((w, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="flex items-start gap-4 p-5 glass-card rounded-xl border border-border/50 hover:border-primary/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <w.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto border border-border/50">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Stay Safe, Stay Informed
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Before you trust someone with your heart, home, or money — verify them. Get a complete identity and background check in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/run-check">
                <Button size="lg" className="btn-glow">
                  Verify Someone <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="border-border/50">View Pricing</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Related Use Cases */}
    <section className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6 text-center">
          Explore Use Cases
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {group.useCases.map((uc, i) => (
            <Link key={i} to={uc.href}>
              <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50 flex items-center gap-1.5">
                <uc.icon className="w-3 h-3" />
                {uc.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default PersonalIdentityVerification;
