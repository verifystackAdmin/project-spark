import { Link } from "react-router-dom";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Cpu, ArrowRight, Lock, BadgeCheck, Shield,
  AlertTriangle, Briefcase, GraduationCap, MapPin,
  FileSearch, Globe, Zap, Database, TrendingUp,
  CheckCircle, Brain, Network
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Employment History Screening",
    description: "Cross-verifies job titles, tenures, and reasons for leaving directly with past employers — catches resume fraud instantly.",
  },
  {
    icon: GraduationCap,
    title: "Education & Credential Check",
    description: "Authenticates degrees, diplomas, and certifications from institutions worldwide. Eliminates fake credential submissions.",
  },
  {
    icon: AlertTriangle,
    title: "Criminal & Court Record Scan",
    description: "Pan-India search across district courts, high courts, police records, and national criminal databases in real time.",
  },
  {
    icon: MapPin,
    title: "Address & Location Verification",
    description: "Physical address validation with geo-tagging, utility bill cross-matching, and field verification when required.",
  },
  {
    icon: Globe,
    title: "Global Watchlist Screening",
    description: "Screens against INTERPOL, OFAC, UN sanctions, PEP lists, and India-specific blacklists simultaneously.",
  },
  {
    icon: Network,
    title: "Business & Vendor Risk Check",
    description: "Validates GST registrations, MCA filings, director history, financial health, and litigation records for entities.",
  },
  {
    icon: FileSearch,
    title: "Credit & Financial Risk Signal",
    description: "Surfaces financial red flags — defaults, insolvency proceedings, and credit behaviour patterns relevant to your use case.",
  },
  {
    icon: Database,
    title: "200+ Data Source Coverage",
    description: "RiskEngine aggregates data from government portals, private databases, court records, and social signals in one sweep.",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Zap,
    title: "Submit a Check Request",
    description: "Send a candidate or entity's basic details via the dashboard or API. Bulk processing supported for enterprise teams.",
  },
  {
    step: "02",
    icon: Brain,
    title: "RiskEngine Runs Deep Analysis",
    description: "Our AI simultaneously queries 200+ data sources — court records, employer databases, government portals — in parallel.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Structured Risk Report Delivered",
    description: "Receive a categorised risk report with severity levels, source citations, and actionable next steps.",
  },
];

const useCases = [
  { label: "Pre-Employment Screening", desc: "Full background verification before making a hire." },
  { label: "Vendor Due Diligence", desc: "Validate every third party before signing a contract." },
  { label: "Tenant Background Check", desc: "Surface criminal or financial risks before handing over keys." },
  { label: "Domestic Staff Screening", desc: "Deep checks for anyone entering your home." },
  { label: "Executive Risk Assessment", desc: "Enhanced due diligence for leadership and board appointments." },
  { label: "Freelancer & Contractor Vetting", desc: "Verify independent workers before sensitive project access." },
];

const stats = [
  { value: "200+", label: "Data Sources Queried" },
  { value: "< 24hrs", label: "Full Report TAT" },
  { value: "99.2%", label: "Record Accuracy" },
  { value: "50K+", label: "Risk Reports Generated" },
];

const VerifyStackRiskEngine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">VerifyStack RiskEngine</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            >
              The Intelligence Layer{" "}
              <span className="gradient-text">Behind Every Verification</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              VerifyStack RiskEngine is a deep background screening engine that simultaneously queries 200+ data sources — criminal courts, employment databases, global watchlists, financial records — and surfaces every risk signal in a single structured report.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Link to="/run-check?type=risk">
                <Button size="lg" className="w-full sm:w-auto group btn-glow">
                  Run a Background Check <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50" asChild>
                <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Book a Demo
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
                { icon: Zap, label: "API-First Architecture" },
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

      {/* What RiskEngine Covers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              What RiskEngine Covers
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Every risk category — employment, criminal, financial, and reputational — checked in a single request
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card rounded-xl p-5 h-full border border-border/50 hover:border-primary/30 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
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
              From submission to structured risk report in under 24 hours
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-4 border border-primary/20">
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

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Built for Every Risk Use Case
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              One engine. Every scenario where background risk matters.
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
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto border border-border/50">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Run Your First Risk Check Today
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Stop making hiring and onboarding decisions without the full picture. RiskEngine gives you every risk signal — fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/run-check?type=risk">
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
            <Link to="/product/verifystack-shield">
              <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50">VerifyStack Shield</Button>
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

export default VerifyStackRiskEngine;
