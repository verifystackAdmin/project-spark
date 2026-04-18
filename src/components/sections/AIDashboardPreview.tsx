import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, CheckCircle, Activity, Info, TrendingUp, AlertTriangle,
  ShieldCheck, Cpu, BarChart3,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TrustScoreGauge from "@/components/TrustScoreGauge";

// ── Tab definitions ────────────────────────────────────────────────────────
const TABS = [
  {
    key: "shield",
    label: "VerifyStack Shield",
    shortLabel: "Shield",
    icon: ShieldCheck,
    color: "text-primary",
    activeBg: "bg-primary/10 border-primary/40 text-primary",
    score: 87,
    status: "Cleared",
    statusSub: "Identity verified. No fraud signals detected.",
    confidence: "92%",
    confidenceSub: "Based on 12 cross-referenced data sources",
    factors: [
      { label: "Identity Match",      score: 95, status: "pass", tooltip: "Verified across UIDAI and NSDL. AI Confidence: Very High." },
      { label: "Document Authenticity", score: 97, status: "pass", tooltip: "Aadhaar and PAN scanned. No tampering detected." },
      { label: "Face Match",          score: 91, status: "pass", tooltip: "Selfie matched to ID photo with 91% confidence." },
      { label: "Fraud Signals",       score: 100, status: "pass", tooltip: "Zero fraud indicators across all databases." },
      { label: "Duplicate Detection", score: 88, status: "pass", tooltip: "No duplicate identity found in system." },
    ],
  },
  {
    key: "risk",
    label: "VerifyStack RiskEngine",
    shortLabel: "RiskEngine",
    icon: Cpu,
    color: "text-accent",
    activeBg: "bg-accent/10 border-accent/40 text-accent",
    score: 74,
    status: "Low Risk",
    statusSub: "Background check complete. Minor gaps noted.",
    confidence: "85%",
    confidenceSub: "Based on 18 background data sources",
    factors: [
      { label: "Criminal Records",    score: 100, status: "pass", tooltip: "No criminal records found across district, state, and national databases." },
      { label: "Employment History",  score: 91, status: "pass", tooltip: "Confirmed via EPFO records and employer callback." },
      { label: "Address Verification",score: 88, status: "pass", tooltip: "Cross-verified via postal API and utility records." },
      { label: "Social Footprint",    score: 72, status: "warn", tooltip: "Limited social media presence. 2 of 5 platforms verified." },
      { label: "Financial Risk",      score: 79, status: "pass", tooltip: "No default or credit risk signals detected." },
    ],
  },
  {
    key: "trust",
    label: "VerifyStack TrustScore",
    shortLabel: "TrustScore",
    icon: BarChart3,
    color: "text-purple-400",
    activeBg: "bg-purple-500/10 border-purple-500/40 text-purple-400",
    score: 82,
    status: "Trusted",
    statusSub: "High trust level. Recommended for onboarding.",
    confidence: "89%",
    confidenceSub: "Aggregated across identity, risk & behaviour",
    factors: [
      { label: "Identity Score",      score: 95, status: "pass", tooltip: "Strong identity verification signals across all checks." },
      { label: "Risk Score",          score: 81, status: "pass", tooltip: "Low risk across criminal, financial, and social data." },
      { label: "Behavioural Signals", score: 77, status: "pass", tooltip: "Consistent digital behaviour. No anomalies detected." },
      { label: "Verification Depth",  score: 90, status: "pass", tooltip: "4 of 5 verification layers completed." },
      { label: "Overall Trust Index", score: 82, status: "pass", tooltip: "AI-aggregated Trust Score across all data points." },
    ],
  },
] as const;

// ── Main Component ─────────────────────────────────────────────────────────
const AIDashboardPreview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15" />
      <div className="container mx-auto px-4 relative z-10">

        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4 border border-accent/20 uppercase tracking-widest">
              AI Risk Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
              AI-Powered Trust Score Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dynamic risk scoring with transparent AI reasoning. Every decision is explainable.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale">
          <div className="max-w-5xl mx-auto">

            {/* ── Tab Switcher ──────────────────────────────────────────── */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeTab === i
                      ? t.activeBg
                      : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* ── Dashboard Panel ───────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header bar */}
                <div className="glass-card rounded-t-2xl px-4 sm:px-6 py-4 border-b-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-mono uppercase tracking-wider truncate">
                        {tab.label}
                      </p>
                      <p className="font-bold text-foreground text-sm sm:text-base">Subject: REDACTED-XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-trust animate-pulse" />
                    <span className="text-xs text-trust font-mono">LIVE</span>
                  </div>
                </div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-3 gap-px bg-border/30 rounded-b-2xl overflow-hidden">
                  {/* Gauge */}
                  <BentoCard className="md:row-span-2 p-6 flex flex-col items-center justify-center">
                    <TrustScoreGauge score={tab.score} size="lg" />
                    <div className="flex gap-2 mt-6 flex-wrap justify-center">
                      <span className="trust-badge text-xs">
                        <Shield className="w-3 h-3" />
                        ID Verified
                      </span>
                      <span className="trust-badge text-xs">
                        <CheckCircle className="w-3 h-3" />
                        No Flags
                      </span>
                    </div>
                  </BentoCard>

                  {/* Status */}
                  <BentoCard className="p-6">
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
                      Verification Status
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, hsl(152 82% 42%), hsl(185 100% 50%))" }}
                      >
                        <CheckCircle className="w-5 h-5" style={{ color: "hsl(222 47% 5%)" }} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg">{tab.status}</p>
                        <p className="text-xs text-muted-foreground">{tab.statusSub}</p>
                      </div>
                    </div>
                  </BentoCard>

                  {/* AI Confidence */}
                  <BentoCard className="p-6">
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
                      AI Confidence
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-accent font-display">{tab.confidence}</span>
                      <TrendingUp className="w-4 h-4 text-trust" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{tab.confidenceSub}</p>
                  </BentoCard>

                  {/* Risk Factors */}
                  <BentoCard className="md:col-span-2 p-6">
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">
                      Risk Factor Analysis
                    </p>
                    <div className="space-y-3">
                      {tab.factors.map((factor, i) => (
                        <RiskFactorRow key={factor.label + tab.key} factor={factor} index={i} />
                      ))}
                    </div>
                  </BentoCard>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ── Sub Components ─────────────────────────────────────────────────────────
const BentoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`bg-card/60 backdrop-blur-xl border border-border/20 transition-all duration-500 hover:bg-card/80 hover:border-border/40 ${className}`}
    style={{ boxShadow: "inset 0 1px 0 hsl(210 40% 96% / 0.03)" }}
  >
    {children}
  </div>
);

type Factor = { label: string; score: number; status: "pass" | "warn"; tooltip: string };

const RiskFactorRow = ({ factor, index }: { factor: Factor; index: number }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-foreground flex items-center gap-1.5">
              {factor.label}
              <Info className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </span>
            <span className={`text-xs font-mono font-semibold ${factor.status === "pass" ? "text-trust" : "text-warning"}`}>
              {factor.score}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${factor.score}%` }}
              transition={{ duration: 0.9, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`h-full rounded-full ${factor.status === "pass" ? "bg-trust" : "bg-warning"}`}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute left-0 right-0 top-full mt-2 z-20 glass-card rounded-lg p-3 text-xs text-muted-foreground border border-border/50"
            style={{ boxShadow: "0 8px 32px hsl(0 0% 0% / 0.4)" }}
          >
            <div className="flex items-start gap-2">
              {factor.status === "pass" ? (
                <CheckCircle className="w-3.5 h-3.5 text-trust flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" />
              )}
              <span>{factor.tooltip}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIDashboardPreview;
