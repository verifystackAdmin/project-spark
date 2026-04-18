import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Fingerprint, ArrowRight, Shield, CheckCircle, Play,
  Lock, FileCheck, Brain, AlertTriangle, Eye, Download,
  ChevronDown, Star, Building, Users, Home,
  BadgeCheck, ScanLine, Zap, Clock
} from "lucide-react";

// ---------- Rotating Dashboard Cards ----------
const dashboardSlides = [
  {
    label: "Identity Validated",
    icon: BadgeCheck,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    fields: [
      { k: "Name", v: "Rahul Sharma" },
      { k: "Aadhaar", v: "XXXX XXXX 4821 ✓" },
      { k: "PAN", v: "BXXPS1234K ✓" },
      { k: "Face Match", v: "98.4% match" },
      { k: "Trust Score", v: "92 / 100" },
    ],
  },
  {
    label: "Document Scan",
    icon: ScanLine,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    fields: [
      { k: "Document Type", v: "Passport" },
      { k: "Issue Date", v: "12 Jan 2019" },
      { k: "Expiry", v: "11 Jan 2029" },
      { k: "Authenticity", v: "Genuine ✓" },
      { k: "OCR Confidence", v: "99.1%" },
    ],
  },
  {
    label: "Fraud Analysis",
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    fields: [
      { k: "Forgery Check", v: "No flags ✓" },
      { k: "Duplicate ID", v: "None found ✓" },
      { k: "Blacklist", v: "Clear ✓" },
      { k: "Risk Level", v: "Low" },
      { k: "Verdict", v: "PASS" },
    ],
  },
];

const reportFeatures = [
  "Identity document validation status",
  "Extracted identity information (Name, DOB, ID Number)",
  "Document authenticity analysis",
  "Fraud and risk indicators",
  "AI-generated Trust Score",
  "Downloadable verification report",
];

const whyCards = [
  {
    icon: Shield,
    title: "Regulatory Compliance & Identity Verification",
    subtitle: "Stay compliant with verification regulations",
    description:
      "VerifyStack helps organizations meet identity verification and background verification requirements. Conduct reliable identity screening to support regulatory compliance, risk management, and secure onboarding processes.",
  },
  {
    icon: Brain,
    title: "Fraud Detection with AI Identity Screening",
    subtitle: "Prevent identity fraud before it becomes a risk",
    description:
      "Detects forged documents, identity mismatches, and suspicious activity using AI-powered identity verification and fraud detection. VerifyStack helps organizations identify potential fraud early and protect their systems from unauthorized access.",
  },
  {
    icon: FileCheck,
    title: "Reliable Identity Verification",
    subtitle: "Confirm identities with trusted verification checks",
    description:
      "VerifyStack validates government-issued identity documents such as Aadhaar, PAN, Passport, and Driving License to confirm that individuals are who they claim to be. This helps businesses, families, and organizations establish trust before engagement.",
  },
];

const steps = [
  {
    step: "01",
    icon: FileCheck,
    title: "Upload Identity Document or Submit ID Number",
    subtitle: "Submit a government-issued ID for verification",
    description:
      "Upload identity documents such as Aadhaar, PAN, Passport, Driving License, or Voter ID through the VerifyStack platform. Our system securely captures and processes the document information.",
  },
  {
    step: "02",
    icon: Brain,
    title: "Automated Document Validation",
    subtitle: "Verify identity data and document authenticity instantly",
    description:
      "VerifyStack automatically extracts identity data, checks document authenticity, and detects tampered or suspicious documents to prevent fraud.",
  },
  {
    step: "03",
    icon: BadgeCheck,
    title: "Get Instant Verification Report",
    subtitle: "Receive a detailed verification report within minutes",
    description:
      "Once the verification process is complete, VerifyStack generates a comprehensive identity verification report including verification status, extracted identity details, fraud signals, and an AI-generated trust score.",
  },
];

const faqs = [
  {
    q: "What is identity screening?",
    a: "Identity screening is the process of verifying that an individual is who they claim to be by validating government-issued identity documents and checking identity information across trusted sources.",
  },
  {
    q: "How does identity verification work?",
    a: "Identity verification works by validating official documents such as Aadhaar, PAN, passport, or driving license. Advanced systems also analyze document authenticity, extract identity data, and detect potential fraud signals.",
  },
  {
    q: "Why is identity screening important?",
    a: "Identity screening helps prevent fraud, reduce security risks, and ensure that individuals being onboarded or verified are genuine. It is commonly used for hiring, tenant verification, driver verification, and background verification.",
  },
  {
    q: "What documents can be used for identity verification?",
    a: "Identity verification can be performed using government-issued documents such as Aadhaar cards, PAN cards, passports, driving licenses, and voter ID cards.",
  },
  {
    q: "How long does identity verification take?",
    a: "Most digital identity screening processes take only a few minutes. Automated verification systems analyze documents and generate verification reports quickly.",
  },
  {
    q: "Can identity screening detect fake documents?",
    a: "Yes. Modern identity verification systems use AI-based fraud detection to identify forged, tampered, or manipulated identity documents.",
  },
  {
    q: "Is identity verification secure?",
    a: "Yes. Secure identity verification platforms use strong encryption and compliance practices to protect sensitive identity information during the verification process.",
  },
  {
    q: "Who can use identity screening?",
    a: "Identity screening can be used by businesses, housing societies, agencies, families, and individuals who want to verify someone's identity before hiring, onboarding, or granting access.",
  },
];

const testimonials = [
  {
    name: "Aditya Mehta",
    role: "HR Manager, TechCorp India",
    avatar: "AM",
    quote:
      "VerifyStack cut our employee onboarding time by 60%. The AI fraud detection caught two cases of fake educational certificates in the first month alone.",
  },
  {
    name: "Priya Nair",
    role: "Property Owner, Bengaluru",
    avatar: "PN",
    quote:
      "I used to rely on gut feeling for tenants. Now I run a VerifyStack identity check before every lease agreement. The trust score gives me real confidence.",
  },
  {
    name: "Suresh Rajan",
    role: "Operations Head, QuickHire",
    avatar: "SR",
    quote:
      "The Explainable AI feature is what sets VerifyStack apart — I can see exactly why a candidate scored what they scored. That transparency matters for compliance.",
  },
];

// ---------- FAQ Item ----------
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
          {a}
        </div>
      )}
    </div>
  );
};

// ---------- Page ----------
const IdentityVerification = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % dashboardSlides.length), 3000);
    return () => clearInterval(t);
  }, []);

  const current = dashboardSlides[slide];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ── */}
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
              <Fingerprint className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">Identity Screening &amp; Background Verification</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            >
              Trust, Verified,{" "}
              <span className="gradient-text">For Everyone</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              VerifyStack isn't just about documents — it's about certainty. We analyze a person's digital, social, and criminal footprint to provide a 360-degree Trust Score, ensuring every interaction is backed by intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Link to="/run-check">
                <Button size="lg" className="w-full sm:w-auto group btn-glow">
                  Start Identity Verification
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50 flex items-center gap-2">
                  <Play className="w-4 h-4" /> Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Compliance badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground"
            >
              {[
                { icon: Shield, label: "DPDP 2023 Compliant" },
                { icon: Lock, label: "AES-256 Encryption" },
                { icon: BadgeCheck, label: "SOC 2 Ready" },
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

      {/* ── REPORTS BUILT FOR ACTION ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
                Reports Built for Action,{" "}
                <span className="gradient-text">Not Just Record-Keeping</span>
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Don't just collect data — understand it. VerifyStack generates dynamic reports that provide a clear "Go/No-Go" signal.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Zap,
                  title: "Live Authenticity Checks",
                  description: "Instant validation of Aadhaar, PAN, and Passport against government databases in real time.",
                },
                {
                  icon: Brain,
                  title: "AI-Generated Trust Score",
                  description: "A 0–100 risk assessment tailored to your context — hiring, tenancy, or personal safety.",
                },
                {
                  icon: Eye,
                  title: "Explainable AI (XAI)",
                  description: "We don't just give a score; we show you the reasoning behind it — transparent and auditable.",
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all group h-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center">
              <Link to="/run-check">
                <Button size="lg" className="btn-glow">
                  Verify Now! <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Why Choose VerifyStack for Identity Screening
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Built for compliance, fraud prevention, and trust — across every industry
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyCards.map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-7 border border-border/50 hover:border-primary/30 transition-all h-full group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{card.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED REPORT + ROTATING DASHBOARD ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
                Detailed Identity Verification Reports
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Get clear and actionable verification reports that help you quickly assess identity authenticity and potential risks.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left — feature list */}
              <ScrollReveal>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    VerifyStack generates comprehensive verification reports after every identity screening. Each report includes verified identity details, document authenticity results, fraud indicators, and an AI-generated trust score to help you make confident decisions.
                  </p>
                  <div className="space-y-3">
                    {reportFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Link to="/sample-report/view">
                      <Button variant="outline" className="border-border/50 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download Sample Report
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right — rotating dashboard */}
              <ScrollReveal delay={0.15}>
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-2xl" />
                  <div className="relative glass-card rounded-2xl p-6 border border-border/50">
                    {/* Tab indicators */}
                    <div className="flex gap-2 mb-5">
                      {dashboardSlides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-primary" : "w-3 bg-border"}`}
                        />
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Card header */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border mb-4 ${current.bg}`}>
                          <current.icon className={`w-4 h-4 ${current.color}`} />
                          <span className={`text-sm font-semibold ${current.color}`}>{current.label}</span>
                        </div>

                        {/* Fields */}
                        <div className="space-y-2.5">
                          {current.fields.map((field, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                              <span className="text-xs text-muted-foreground">{field.k}</span>
                              <span className="text-xs font-medium text-foreground">{field.v}</span>
                            </div>
                          ))}
                        </div>

                        {/* Trust score bar (for first slide) */}
                        {slide === 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Trust Score</span>
                              <span className="text-primary font-bold">92/100</span>
                            </div>
                            <div className="h-2 bg-border rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "92%" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">How It Works</h2>
            <p className="text-muted-foreground text-center mb-2 max-w-xl mx-auto">
              Verify identities in minutes with a simple three-step verification process.
            </p>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto text-sm">
              VerifyStack automates document validation, fraud detection, and identity checks to deliver accurate verification reports instantly.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="flex gap-6 glass-card rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-extrabold text-sm">{s.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <s.icon className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-foreground">{s.title}</h3>
                    </div>
                    <p className="text-xs text-primary font-medium mb-2">{s.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
              <strong>Note:</strong> VerifyStack does not store user data and strictly adheres to government regulations and data protection compliance standards.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link to="/run-check">
                <Button size="lg" className="btn-glow">
                  Start Identity Verification <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="border-border/50 flex items-center gap-2">
                  <Play className="w-4 h-4" /> Watch Demo
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Testimonials</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Trusted by businesses, landlords, and individuals across India
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 border border-border/50 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Everything you need to know about identity screening and verification
            </p>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <FAQItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto border border-border/50">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Start Verifying Identities Today
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Enterprise-grade identity screening. DPDP compliant. Results in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/run-check">
                  <Button size="lg" className="btn-glow">
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* ── RELATED LINKS ── */}
      <section className="py-10 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-5 text-center">
            Related Use Cases
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Address Verification", href: "/use-case/address-verification" },
              { label: "Criminal Record Check", href: "/use-case/criminal-record-check" },
              { label: "Employment Verification", href: "/use-case/employment-verification" },
              { label: "Tenant Verification", href: "/use-case/tenant-verification" },
              { label: "Social Risk Check", href: "/use-case/social-risk-check" },
              { label: "Dating Profile Verification", href: "/use-case/dating-profile-verification" },
            ].map((p) => (
              <Link key={p.href} to={p.href}>
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

export default IdentityVerification;
