import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  BarChart3, ArrowRight, Lock, BadgeCheck, Shield,
  Brain, Eye, TrendingUp, CheckCircle, Zap,
  FileText, Users, Building, Home, HandHelping
} from "lucide-react";

const scoreFactors = [
  {
    icon: BadgeCheck,
    title: "Identity Confidence",
    description: "Weighted score from government ID match, face verification, and liveness detection results.",
    weight: "25%",
  },
  {
    icon: Brain,
    title: "Background Risk",
    description: "Criminal record findings, court history, watchlist matches, and adverse media signals.",
    weight: "30%",
  },
  {
    icon: TrendingUp,
    title: "Employment Integrity",
    description: "Verified employment tenure, title accuracy, and consistency across all past employers.",
    weight: "20%",
  },
  {
    icon: Eye,
    title: "Social & Digital Footprint",
    description: "Social media behaviour analysis, digital presence consistency, and online risk signals.",
    weight: "15%",
  },
  {
    icon: FileText,
    title: "Document Authenticity",
    description: "Tampering analysis, cross-document consistency, and forgery detection scores.",
    weight: "10%",
  },
];

const scoreRanges = [
  { range: "80 – 100", label: "High Trust", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", desc: "Strong identity match, clean background, consistent history. Proceed with confidence." },
  { range: "60 – 79", label: "Moderate Trust", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", desc: "Minor inconsistencies or limited data. Consider additional verification steps." },
  { range: "40 – 59", label: "Elevated Risk", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", desc: "Notable risk signals detected. Review the full report before proceeding." },
  { range: "0 – 39", label: "High Risk", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", desc: "Multiple red flags present. Do not proceed without thorough human review." },
];

const useCases = [
  { icon: Building, label: "HR & Hiring Teams", desc: "Make consistent, defensible hiring decisions with a single score per candidate." },
  { icon: Home, label: "Landlords & Property Owners", desc: "Compare tenant applications side-by-side using objective trust data." },
  { icon: HandHelping, label: "Household Staff Employers", desc: "Know the risk level of every domestic worker before they enter your home." },
  { icon: Users, label: "Platforms & Marketplaces", desc: "Assign trust badges to verified users — increase conversion and safety." },
  { icon: Shield, label: "Banks & Fintechs", desc: "Use TrustScore as a supplementary KYC signal for onboarding and lending." },
  { icon: Eye, label: "Individuals", desc: "Get an objective score on anyone you are about to trust with something valuable." },
];

const stats = [
  { value: "0–100", label: "Standardised Score Range" },
  { value: "5+", label: "Signal Categories Weighted" },
  { value: "< 2min", label: "Score Generation Time" },
  { value: "XAI", label: "Explainable AI Reasoning" },
];

// Animated score display
const ScoreGauge = ({ score }: { score: number }) => {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += 2;
      if (start >= score) { setDisplayed(score); clearInterval(timer); }
      else setDisplayed(start);
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : score >= 40 ? "#f97316" : "#ef4444";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (displayed / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-foreground">{displayed}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
};

const VerifyStackTrustScore = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-primary text-xs font-medium mb-6 border border-primary/20"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="font-mono uppercase tracking-widest">VerifyStack TrustScore</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            >
              One Number That Tells You{" "}
              <span className="gradient-text">Everything</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              VerifyStack TrustScore aggregates identity confidence, background risk, employment integrity, and social signals into a single 0–100 AI-generated score. Stop reading long reports — get one clear, explainable verdict.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Link to="/run-check?type=trust">
                <Button size="lg" className="w-full sm:w-auto group btn-glow">
                  Get a TrustScore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/sample-report">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-border/50">
                  See a Sample Report
                </Button>
              </Link>
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
                { icon: Brain, label: "Explainable AI" },
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

      {/* Score Demo + Range Guide */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              What the Score Means
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Every TrustScore comes with an explanation — not just a number
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            {/* Gauge */}
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-8 border border-border/50 text-center">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-5">Sample TrustScore</p>
                <ScoreGauge score={87} />
                <p className="text-green-400 font-bold mt-4 text-lg">High Trust</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  Strong identity match, clean criminal record, consistent employment history. Proceed with confidence.
                </p>
              </div>
            </ScrollReveal>

            {/* Score ranges */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-3">
                {scoreRanges.map((r, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${r.bg} flex items-start gap-4`}>
                    <div className="flex-shrink-0">
                      <p className={`text-lg font-extrabold ${r.color}`}>{r.range}</p>
                      <p className={`text-xs font-semibold ${r.color}`}>{r.label}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              How the Score is Calculated
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Five weighted signal categories — each explained by our Explainable AI layer
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {scoreFactors.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all group h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <f.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{f.weight}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses It */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Who Uses TrustScore
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Any decision that involves trusting a person or entity benefits from a TrustScore
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {useCases.map((uc, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 glass-card rounded-xl border border-border/50 hover:border-primary/20 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <uc.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
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
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Make Every Decision With Confidence
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Replace gut instinct with a verified, AI-generated TrustScore. Run your first check in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/run-check?type=trust">
                  <Button size="lg" className="btn-glow">Get a TrustScore <ArrowRight className="w-4 h-4 ml-2" /></Button>
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
            <Link to="/product/verifystack-riskengine">
              <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50">VerifyStack RiskEngine</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VerifyStackTrustScore;
