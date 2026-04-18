import { Link } from "react-router-dom";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ShieldCheck, ArrowRight, Lock, Fingerprint, ScanLine,
  BadgeCheck, AlertTriangle, Eye, Zap, FileCheck, Brain,
  CheckCircle, Shield
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Government ID Authentication",
    description: "Instantly verify Aadhaar, PAN, Passport, Driving Licence, and Voter ID against live government databases.",
  },
  {
    icon: ScanLine,
    title: "Document Authenticity Check",
    description: "AI scans every document for tampering, forgery, font anomalies, and metadata mismatches.",
  },
  {
    icon: Eye,
    title: "Liveness Detection",
    description: "Biometric liveness checks ensure the person presenting the ID is physically present — not a photo or deepfake.",
  },
  {
    icon: Brain,
    title: "AI Face Match",
    description: "98%+ accuracy facial recognition cross-matches the document photo against a live selfie in real time.",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Signal Detection",
    description: "Flags stolen identities, duplicate ID submissions, blacklisted individuals, and watchlist matches instantly.",
  },
  {
    icon: FileCheck,
    title: "Instant Verification Certificate",
    description: "Every successful check generates a tamper-proof digital certificate — audit-ready and court-admissible.",
  },
];

const useCases = [
  { label: "Employee Onboarding", desc: "Verify every new hire's identity before day one." },
  { label: "Tenant Screening", desc: "Confirm who is moving into your property." },
  { label: "Domestic Staff Hiring", desc: "Know exactly who you are inviting into your home." },
  { label: "KYC & Customer Onboarding", desc: "Compliant digital KYC for fintech, lending, and platforms." },
  { label: "Dating & Social Platforms", desc: "Authenticate real users and eliminate fake profiles." },
  { label: "Vendor & Partner Onboarding", desc: "Verify business representatives before signing contracts." },
];

const stats = [
  { value: "98.4%", label: "Face Match Accuracy" },
  { value: "< 60s", label: "Average Verification Time" },
  { value: "10M+", label: "IDs Verified" },
  { value: "0%", label: "Data Stored Post-Check" },
];

const VerifyStackShield = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">VerifyStack Shield</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            >
              Your First Line of Defence{" "}
              <span className="gradient-text">Against Identity Fraud</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              VerifyStack Shield is an AI-powered identity and document verification layer that authenticates who someone is — instantly and with certainty. From Aadhaar to Passport, from face match to fraud detection, Shield stops bad actors before they get through the door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Link to="/run-check?type=shield">
                <Button size="lg" className="w-full sm:w-auto group btn-glow">
                  Start Verifying <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50" asChild>
                <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Request a Demo
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
            >
              {[
                { icon: Lock, label: "AES-256 Encrypted" },
                { icon: BadgeCheck, label: "DPDP 2023 Compliant" },
                { icon: ShieldCheck, label: "Zero Data Retention" },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-full border border-border/40">
                  <b.icon className="w-3.5 h-3.5 text-primary" />
                  {b.label}
                </span>
              ))}
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
                <p className="text-3xl font-extrabold gradient-text mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Shield Does */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              What VerifyStack Shield Does
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              A complete identity verification suite — from document scanning to biometric confirmation
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 h-full border border-border/50 hover:border-primary/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses Shield */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Who Uses VerifyStack Shield
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Any time you need to confirm who someone is — Shield is the answer
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {useCases.map((uc, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 glass-card rounded-xl border border-border/50 hover:border-primary/20 transition-all">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{uc.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{uc.desc}</p>
                  </div>
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
                Activate VerifyStack Shield Today
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Stop fake identities at the source. Deploy Shield via our dashboard or API in minutes — no lengthy setup required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/run-check?type=shield">
                  <Button size="lg" className="btn-glow">Get Started <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="border-border/50">View Pricing</Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-10 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-5 text-center">
            Explore Other Products
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/product/verifystack-riskengine">
              <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50">VerifyStack RiskEngine</Button>
            </Link>
            <Link to="/product/verifystack-trustscore">
              <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50">VerifyStack TrustScore</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VerifyStackShield;
