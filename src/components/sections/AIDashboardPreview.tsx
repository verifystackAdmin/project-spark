import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Activity } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TrustScoreGauge from "@/components/TrustScoreGauge";

const riskFactors = [
  { label: "Identity Match", score: 95, status: "pass" },
  { label: "Criminal Records", score: 100, status: "pass" },
  { label: "Address Verification", score: 88, status: "pass" },
  { label: "Social Footprint", score: 72, status: "warn" },
  { label: "Employment History", score: 91, status: "pass" },
];

const AIDashboardPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4 border border-accent/20 uppercase tracking-widest">
              AI Risk Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              AI-Powered Trust Score Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dynamic risk scoring with transparent AI reasoning. Every decision is explainable.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Verification Report</p>
                  <p className="font-bold text-foreground">Subject: REDACTED-XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-trust animate-pulse" />
                <span className="text-xs text-trust font-mono">LIVE</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Gauge */}
              <div className="flex flex-col items-center justify-center">
                <TrustScoreGauge score={87} size="lg" />
                <div className="flex gap-3 mt-6">
                  <span className="trust-badge">
                    <Shield className="w-3.5 h-3.5" />
                    ID Verified
                  </span>
                  <span className="trust-badge">
                    <CheckCircle className="w-3.5 h-3.5" />
                    No Flags
                  </span>
                </div>
              </div>

              {/* Risk factors */}
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">Risk Factor Analysis</p>
                {riskFactors.map((factor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">{factor.label}</span>
                        <span className={`text-xs font-mono ${factor.status === "pass" ? "text-trust" : "text-warning"}`}>
                          {factor.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${factor.score}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className={`h-full rounded-full ${factor.status === "pass" ? "bg-trust" : "bg-warning"}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AIDashboardPreview;
