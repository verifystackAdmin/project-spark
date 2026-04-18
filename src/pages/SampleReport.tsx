import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustScoreGauge from "@/components/TrustScoreGauge";
import VerificationResultCard from "@/components/VerificationResultCard";
import {
  Phone, CheckCircle, Lock, Star, ArrowRight,
  Download, Share2, Calendar, MapPin,
  UserCheck, FileSearch, Shield, Globe, AlertTriangle,
  Briefcase, BadgeCheck, Zap
} from "lucide-react";

// ── Locked overlay for premium sections ──
const LockedSection = ({ label }: { label: string }) => (
  <div className="relative rounded-xl border border-border/50 overflow-hidden">
    {/* Blurred preview */}
    <div className="p-5 select-none pointer-events-none" style={{ filter: "blur(6px)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 bg-muted rounded" />
            <div className="h-2.5 w-20 bg-muted rounded" />
          </div>
        </div>
        <div className="h-5 w-16 bg-muted rounded" />
      </div>
      <div className="h-2.5 w-full bg-muted rounded mt-4" />
      <div className="h-2.5 w-4/5 bg-muted rounded mt-1.5" />
    </div>
    {/* Lock overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        <Lock className="w-4 h-4 text-primary" />
      </div>
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">Unlock with Full Report</p>
    </div>
  </div>
);

// ── Score blur overlay ──
const LockedScore = () => (
  <div className="relative">
    <div style={{ filter: "blur(8px)", pointerEvents: "none", userSelect: "none" }}>
      <TrustScoreGauge score={87} size="lg" />
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
        <Lock className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm font-bold text-foreground">Score Hidden</p>
      <p className="text-xs text-muted-foreground mt-1 text-center max-w-[140px]">Upgrade to see the full TrustScore</p>
    </div>
  </div>
);

const SampleReport = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Report Header ── */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2">
            <div>
              {/* Free tier badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  <Star className="w-3 h-3 fill-primary" />
                  Free TrustScore (Limited)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                  <BadgeCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Sample TrustScore Report
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Generated: Mar 13, 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Mumbai, Maharashtra
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  Powered by VerifyStack AI
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" disabled className="opacity-50">
                <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
              </Button>
              <Button variant="outline" size="sm" disabled className="opacity-50">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download PDF
              </Button>
            </div>
          </div>

          {/* Free tier notice */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                You are viewing a Free Report — 2 of 8 checks unlocked
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upgrade to Full Report to unlock identity verification, criminal records, document authenticity, social risk analysis, and more.
              </p>
            </div>
            <Link to="/pricing" className="flex-shrink-0">
              <Button size="sm" className="btn-glow text-xs">
                Upgrade <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Main Report Body ── */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Left Column — Score + Subject ── */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border/50 p-8 sticky top-24">
                <h2 className="text-sm font-semibold text-muted-foreground text-center mb-5 uppercase tracking-widest">
                  Overall TrustScore
                </h2>

                {/* Locked score gauge */}
                <LockedScore />

                {/* Risk Level — FREE, visible */}
                <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-mono">Basic Risk Level</p>
                  <p className="text-2xl font-extrabold text-yellow-400">MEDIUM</p>
                  <p className="text-xs text-muted-foreground mt-1">Some signals require attention</p>
                </div>

                {/* Subject details */}
                <div className="mt-6 pt-5 border-t border-border/50">
                  <h3 className="font-semibold text-foreground mb-3 text-sm">Subject Details</h3>
                  <div className="space-y-2.5">
                    {[
                      { k: "Name", v: "Rahul Sharma" },
                      { k: "Age", v: "32 years" },
                      { k: "Location", v: "Mumbai, MH" },
                      { k: "Phone", v: "+91 98XXX XXXXX" },
                      { k: "Check Type", v: "Free TrustScore" },
                    ].map((row) => (
                      <div key={row.k} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.k}</span>
                        <span className="font-medium text-foreground">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upgrade CTA */}
                <div className="mt-6 pt-5 border-t border-border/50 space-y-2">
                  <Link to="/pricing">
                    <Button className="w-full btn-glow text-sm">
                      Unlock Full Report <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                  <Link to="/run-check">
                    <Button variant="outline" className="w-full text-sm border-border/50">
                      Run Your Own Check
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Right Column — Checks ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* FREE: Phone Check */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-foreground">Phone Credibility Check</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                    <CheckCircle className="w-3 h-3" /> Included Free
                  </span>
                </div>
                <VerificationResultCard
                  icon={Phone}
                  title="Phone Credibility"
                  description="Number verified & active"
                  status="verified"
                  details="Phone number active for 5+ years. Registered under the same name. No spam, fraud, or scam reports found in national databases. SIM linked to matching Aadhaar record."
                />
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Account Age", value: "5+ Years" },
                    { label: "Spam Reports", value: "0 Found" },
                    { label: "Fraud Flags", value: "None" },
                  ].map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-green-500/5 border border-green-500/15">
                      <p className="text-sm font-bold text-green-400">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FREE: Basic Risk Summary */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-foreground">Basic Risk Summary</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                    <CheckCircle className="w-3 h-3" /> Included Free
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: "Overall Risk", value: "Medium", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
                    { label: "Phone Risk", value: "Low", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
                    { label: "Data Coverage", value: "2 / 8", color: "text-primary", bg: "bg-primary/10 border-primary/20" },
                  ].map((s, i) => (
                    <div key={i} className={`p-4 rounded-xl border text-center ${s.bg}`}>
                      <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on the free checks completed (phone credibility), this subject shows <strong className="text-foreground">low risk signals</strong> on available data. However, identity, criminal, and employment data has not been checked. Upgrade for a complete risk assessment.
                </p>
              </div>

              {/* LOCKED: All premium checks */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-foreground">Full Verification Results</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border">
                    <Lock className="w-3 h-3" /> 6 Checks Locked
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <LockedSection label="Identity Verification" />
                  <LockedSection label="Document Authenticity" />
                  <LockedSection label="Criminal Record Check" />
                  <LockedSection label="Social Media Analysis" />
                  <LockedSection label="Fraud Database Check" />
                  <LockedSection label="Employment Verification" />
                </div>
                <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Unlock all 6 checks</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Get identity, criminal, employment, document, social, and fraud results</p>
                  </div>
                  <Link to="/pricing" className="flex-shrink-0">
                    <Button className="btn-glow text-xs">
                      Upgrade Now <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* LOCKED: Score Breakdown */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-foreground">TrustScore Breakdown</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                </div>
                <div className="space-y-3 relative">
                  <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none" }}>
                    {[
                      { label: "Identity Verification", score: 95, weight: "25%" },
                      { label: "Background Risk", score: 88, weight: "30%" },
                      { label: "Employment Integrity", score: 82, weight: "20%" },
                      { label: "Social Footprint", score: 72, weight: "15%" },
                      { label: "Document Authenticity", score: 98, weight: "10%" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-sm text-muted-foreground">{item.weight}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${item.score}%` }} />
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-foreground w-10 text-right">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Locked</p>
                    <p className="text-xs text-muted-foreground mt-1">Upgrade to view full breakdown</p>
                    <Link to="/pricing" className="mt-3">
                      <Button size="sm" className="btn-glow text-xs">Unlock Breakdown</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upgrade Banner ── */}
      <section className="py-16 bg-secondary/20 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Get the Full Picture
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              This free report shows 2 of 8 checks. Upgrade to unlock identity verification, criminal records, document authenticity, employment history, social risk analysis, and a complete AI TrustScore.
            </p>

            {/* Feature comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
              <div className="p-5 rounded-xl bg-card border border-border/50">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Free Report</p>
                <ul className="space-y-2">
                  {[
                    { label: "Phone Check", free: true },
                    { label: "Basic Risk Level", free: true },
                    { label: "Identity Verification", free: false },
                    { label: "Criminal Record Check", free: false },
                    { label: "Document Authenticity", free: false },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      {item.free
                        ? <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        : <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                      <span className={item.free ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-primary/5 border border-primary/30 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">FULL</span>
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Full Report</p>
                <ul className="space-y-2">
                  {[
                    "Phone Check",
                    "Basic Risk Level",
                    "Identity Verification",
                    "Criminal Record Check",
                    "Document Authenticity",
                    "Employment Verification",
                    "Social Risk Analysis",
                    "AI TrustScore (0–100)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="btn-glow">
                  Upgrade to Full Report <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/run-check">
                <Button variant="outline" size="lg" className="border-border/50">
                  Run a New Check
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SampleReport;
