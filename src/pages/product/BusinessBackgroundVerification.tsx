import { useState } from "react";
import { Link } from "react-router-dom";
import { CALENDLY_BOOK_DEMO_URL } from "@/lib/siteLinks";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/layout/HeroBackground";
import SolutionHeroBackground from "@/components/layout/SolutionHeroBackground";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowRight, Building, Shield, Lock, BadgeCheck,
  Briefcase, GraduationCap, Wrench, MapPin, AlertTriangle,
  Fingerprint, FileText, Brain, Clock, ChevronDown,
  CheckCircle, Zap, Users, Star, PhoneCall
} from "lucide-react";

const verifications = [
  {
    number: "01",
    icon: Users,
    title: "Employee Verification",
    description:
      "Get a complete picture of your new hires before day one. Screen candidates quickly and confidently to build a team you can trust.",
    cta: "Explore Employee Screening",
    href: "/use-case/employment-verification",
  },
  {
    number: "02",
    icon: Briefcase,
    title: "Employment Verification",
    description:
      "Don't rely on a resume alone. We authenticate past work experience, validating job titles, tenures, and professional history directly with previous employers.",
    cta: "Verify Past Employment",
    href: "/use-case/employment-verification",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Education Verification",
    description:
      "Protect your company from credential fraud. We directly authenticate degrees, diplomas, and certifications from universities and educational institutions worldwide.",
    cta: "Check Academic Records",
    href: "/use-case/education-verification",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Contractor & Vendor Verification",
    description:
      "Secure your supply chain and B2B relationships. Screen business entities, verify tax registrations, and check financial health before you sign a contract.",
    cta: "Screen Vendors & Partners",
    href: "/use-case/contractor-vendor-verification",
  },
  {
    number: "05",
    icon: MapPin,
    title: "Address Verification",
    description:
      "Ensure the people you hire are exactly where they claim to be. We validate current and permanent physical addresses quickly and accurately.",
    cta: "Validate Addresses",
    href: "/use-case/address-verification",
  },
  {
    number: "06",
    icon: AlertTriangle,
    title: "Criminal Record Check",
    description:
      "Maintain a safe and compliant workplace. We scan court records and legal databases in real-time to identify potential behavioral risks or red flags.",
    cta: "Review Legal Records",
    href: "/use-case/criminal-record-check",
  },
  {
    number: "07",
    icon: Fingerprint,
    title: "Identity Verification",
    description:
      "Stop identity fraud at the front door. Instantly authenticate government-issued IDs (like Aadhaar and PAN) to ensure absolute certainty during onboarding.",
    cta: "Authenticate Identities",
    href: "/use-case/identity-verification",
  },
];

const risks = [
  {
    icon: Shield,
    title: "We Catch Fake Documents and Fraud",
    description:
      "People lie on resumes, and bad vendors hide their true history. Instead of guessing, VerifyStack's AI instantly spots fake IDs, exaggerated job histories, and hidden financial risks before they enter your business.",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    hoverBorder: "hover:border-orange-500/30",
  },
  {
    icon: BadgeCheck,
    title: "We Keep You Out of Legal Trouble",
    description:
      "Hiring dangerous individuals or mishandling sensitive ID documents can lead to heavy fines. VerifyStack automatically keeps your business 100% compliant with government privacy laws (like the DPDP Act) so you don't have to worry about it.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    hoverBorder: "hover:border-primary/30",
  },
  {
    icon: Star,
    title: "We Protect Your Hard-Earned Reputation",
    description:
      "Just one bad employee or a vendor who fails to deliver can ruin the trust you've built with your customers. We give you a clear Trust Score so you only bring reliable, safe people into your company.",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    hoverBorder: "hover:border-green-500/30",
  },
  {
    icon: Zap,
    title: "We Eliminate Slow, Manual Paperwork",
    description:
      "Trying to verify people by making phone calls, Googling names, and collecting paper ID cards wastes hours of your team's time. VerifyStack automates the entire process, giving you accurate background reports in minutes.",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    hoverBorder: "hover:border-purple-500/30",
  },
];

const trustPoints = [
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "Your data is protected by AES-256 encryption and SOC 2-ready cloud hosting.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    hoverBorder: "hover:border-primary/20",
  },
  {
    icon: CheckCircle,
    title: "100% Compliant",
    description: "Fully aligned with India's DPDP 2023 data privacy laws to keep you penalty-free.",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
    hoverBorder: "hover:border-green-500/20",
  },
  {
    icon: Brain,
    title: "Transparent AI",
    description: "We don't just give a score; our Explainable AI shows you exactly why a decision was made.",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    hoverBorder: "hover:border-purple-500/20",
  },
  {
    icon: FileText,
    title: "Audit-Ready Reports",
    description: "Instantly download detailed, legally admissible PDFs for every background check.",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    hoverBorder: "hover:border-orange-500/20",
  },
];

const faqs = [
  {
    q: "What types of background checks can my business run?",
    a: "You can verify both employees and corporate vendors. Our platform allows you to check government IDs (like Aadhaar and PAN), past employment history, education degrees, criminal court records, and business tax registrations.",
  },
  {
    q: "How long does a background check take?",
    a: "Traditional checks take days, but VerifyStack completes them in minutes. Because our platform is completely AI-driven, we can process everything — from basic identity checks to deep criminal and employment records — almost instantly so you never have to delay your onboarding.",
  },
  {
    q: "Is VerifyStack compliant with Indian data privacy laws?",
    a: "Yes. Our platform is built specifically to comply with India's DPDP 2023 regulations. We ensure that all candidate and vendor data is collected, processed, and stored legally and securely so your business is protected from compliance fines.",
  },
  {
    q: "Do I need a tech team to set this up?",
    a: "Not at all. You can start running verifications immediately using our easy-to-use web dashboard. If you do have a tech team, we also offer secure API access so you can plug VerifyStack directly into your existing HR or onboarding software.",
  },
  {
    q: "What happens if a check flags a risk?",
    a: "Our system gives you a detailed, easy-to-read PDF report and an AI-generated Trust Score. If a risk or fake document is detected, the report will clearly explain exactly what was found, giving you the facts you need to make a safe decision.",
  },
  {
    q: "How much does VerifyStack cost?",
    a: "We offer transparent monthly and annual plans based on the volume of verifications you need. Whether you are hiring a few people a month or onboarding thousands of vendors, we have a tier that fits your budget. Contact our team for a custom quote tailored to your exact needs.",
  },
];

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

const BusinessBackgroundVerification = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ── */}
      <section className="relative border-b border-border/30 pt-32 pb-24 overflow-hidden">
        <SolutionHeroBackground routePath="/solutions/business-background-verification" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
            >
              <Building className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">B2B Background Verification</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            >
              Automated Background KYC{" "}
              <span className="gradient-text">for High-Volume Hiring</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              Verify employee, renter, and vendor identities in seconds. VerifyStack automates court record scans, employment history, and address verification so you can onboard at scale without the compliance risk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Button size="lg" className="w-full sm:w-auto group btn-glow" asChild>
                <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Book a Corporate Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Compliance badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
            >
              {[
                { icon: Shield, label: "DPDP 2023 Compliant" },
                { icon: BadgeCheck, label: "SOC 2 Ready" },
                { icon: Lock, label: "Secure Data Encryption" },
                { icon: Zap, label: "Instant API Access" },
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

      {/* ── ONE PLATFORM. EVERY VERIFICATION ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              One Platform.{" "}
              <span className="gradient-text">Every Verification Your Business Needs</span>
            </h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
              Stop juggling multiple vendors. Run comprehensive background checks, validate IDs, and screen corporate partners from a single unified dashboard.
            </p>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-5">
            {verifications.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="glass-card rounded-xl border border-border/50 hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-5 p-6">
                    <div className="flex-shrink-0 flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground w-6">{v.number}</span>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <v.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{v.description}</p>
                      <Link to={v.href}>
                        <Button variant="outline" size="sm" className="text-xs border-primary/30 text-primary hover:bg-primary/5 flex items-center gap-1.5">
                          {v.cta} <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLVE YOUR BIGGEST RISKS ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Eliminate Onboarding Risks &amp;{" "}
              <span className="gradient-text">Accelerate Hiring</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Purpose-built for operations managers and HR teams to verify identities at scale.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {risks.map((r, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`glass-card rounded-xl p-7 border border-border/50 ${r.hoverBorder} transition-all group h-full`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${r.iconBg} flex items-center justify-center flex-shrink-0 group-hover:bg-opacity-20 transition-colors`}>
                      <r.icon className={`w-5 h-5 ${r.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUSINESSES TRUST VERIFYSTACK ── */}
      <section className="py-20 relative overflow-hidden border-y border-border/30">
        <HeroBackground
          imageUrl="https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          altText="Abstract background representing trust and security"
        />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Why Businesses Trust VerifyStack
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Security, compliance, and transparency built into every check
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {trustPoints.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`glass-card rounded-xl p-6 border border-border/50 ${t.hoverBorder} transition-all text-center group h-full`}>
                  <div className={`w-12 h-12 rounded-full ${t.iconBg} flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors`}>
                    <t.icon className={`w-5 h-5 ${t.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 24/7 SUPPORT ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto glass-card rounded-2xl p-10 border border-border/50 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Always Here When You Need Us
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
                Background checks run around the clock, and our team does too. Get 24/7 expert help whenever you need it so your business never experiences downtime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <Button variant="outline" className="border-border/50 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4" /> Contact Support
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="ghost" className="text-primary">
                    Visit Help Center
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-12 max-w-3xl mx-auto border border-border/50">
              <Shield className="w-12 h-12 text-primary mx-auto mb-5" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Build a Safer Business?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Stop leaving your onboarding to chance. Join the companies using VerifyStack to hire smarter, partner safer, and stay 100% compliant.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <a href={CALENDLY_BOOK_DEMO_URL} target="_blank" rel="noopener noreferrer">
                    Book a Free Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Link to="/signup">
                  <Button variant="outline" size="lg" className="border-border/50">
                    Sign Up Now
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
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
              Everything your team needs to know before getting started
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

      {/* ── RELATED USE CASES ── */}
      <section className="py-10 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-5 text-center">
            Explore All Use Cases
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "Employment Verification", href: "/use-case/employment-verification" },
              { label: "Education Verification", href: "/use-case/education-verification" },
              { label: "Contractor & Vendor Verification", href: "/use-case/contractor-vendor-verification" },
              { label: "Address Verification", href: "/use-case/address-verification" },
              { label: "Criminal Record Check", href: "/use-case/criminal-record-check" },
              { label: "Identity Verification", href: "/use-case/identity-verification" },
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

export default BusinessBackgroundVerification;
